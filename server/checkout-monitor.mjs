import { timingSafeEqual } from 'node:crypto';

const TIME_ZONE = 'Asia/Karachi';
const PREFIX = 'azaan:checkout:v1:';
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const RETENTION_MS = 90 * 86400000;
const PAGE_SIZE = 25;
// Deduplication and counters change together, even with concurrent requests.
export const RECORD_SCRIPT = `
if redis.call('EXISTS', KEYS[1]) == 1 or redis.call('EXISTS', KEYS[5]) == 1 then return 0 end
redis.call('SET', KEYS[1], '1', 'EX', 604800)
redis.call('INCR', KEYS[2])
redis.call('EXPIRE', KEYS[2], 34560000)
redis.call('INCR', KEYS[3])
redis.call('SET', KEYS[4], ARGV[1], 'NX')
if ARGV[2] ~= '' then
  redis.call('SET', KEYS[5], ARGV[2], 'EX', 7776000)
  redis.call('ZADD', KEYS[6], 0, ARGV[3])
  redis.call('ZREMRANGEBYLEX', KEYS[6], '-', ARGV[4])
end
return 1`;

const onlyKeys = (value, keys) =>
  value &&
  typeof value === 'object' &&
  !Array.isArray(value) &&
  Object.keys(value).length === keys.length &&
  keys.every((key) => Object.hasOwn(value, key));
const textValue = (value, max, min = 0) =>
  typeof value === 'string' &&
  value.trim().length >= min &&
  value.length <= max &&
  !/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value);

export function normalizeOrder(order) {
  if (
    !onlyKeys(order, ['customerName', 'orderDetails', 'items']) ||
    !textValue(order.customerName, 80, 2) ||
    !textValue(order.orderDetails, 3000, 5) ||
    !Array.isArray(order.items) ||
    order.items.length > 100
  )
    return null;
  const items = [];
  for (const item of order.items) {
    if (
      !onlyKeys(item, ['name', 'category', 'quantity', 'unitPrice', 'variant']) ||
      !textValue(item.name, 140, 1) ||
      !textValue(item.category, 80, 1) ||
      !textValue(item.variant, 80) ||
      !Number.isInteger(item.quantity) ||
      item.quantity < 1 ||
      item.quantity > 10000 ||
      typeof item.unitPrice !== 'number' ||
      !Number.isFinite(item.unitPrice) ||
      item.unitPrice < 0 ||
      item.unitPrice > 100000000
    )
      return null;
    const unitPrice = Math.round(item.unitPrice * 100) / 100;
    items.push({
      name: item.name.trim(),
      category: item.category.trim(),
      quantity: item.quantity,
      unitPrice,
      variant: item.variant.trim(),
      lineTotal: Math.round(unitPrice * item.quantity * 100) / 100,
    });
  }
  return {
    customerName: order.customerName.trim(),
    orderDetails: order.orderDetails.trim(),
    items,
    orderTypes: items.length
      ? [...new Set(items.map((item) => item.category))]
      : ['Custom request'],
    total: items.length
      ? Math.round(items.reduce((sum, item) => sum + item.lineTotal, 0) * 100) / 100
      : null,
    priceStatus: items.length ? 'Cart estimate' : 'To be confirmed',
    currency: 'PKR',
  };
}

export const dayKey = (date) =>
  new Intl.DateTimeFormat('en-CA', {
    timeZone: TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);

const json = (status, value, extraHeaders = {}) =>
  Response.json(value, {
    status,
    headers: { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex', ...extraHeaders },
  });

const authorized = (header, secret) => {
  if (!secret || secret.length < 32) return false;
  const expected = Buffer.from(`Bearer ${secret}`);
  const received = Buffer.from(header || '');
  return expected.length === received.length && timingSafeEqual(expected, received);
};

export async function handleCheckoutRequest(request, options = {}) {
  const env = options.env ?? process.env;
  const fetcher = options.fetcher ?? fetch;
  const now = options.now ?? new Date();
  if (!['GET', 'POST'].includes(request.method)) {
    return json(405, { error: 'Method not allowed' }, { Allow: 'GET, POST' });
  }
  if (
    request.method === 'GET' &&
    !authorized(request.headers.get('authorization'), env.CHECKOUT_MONITOR_TOKEN)
  ) {
    return json(401, { error: 'Monitor access key required' });
  }
  if (request.method === 'POST') {
    const origins = (
      env.CHECKOUT_ALLOWED_ORIGINS || 'https://www.azaanbaker.com,https://azaanbaker.com'
    )
      .split(',')
      .map((origin) => origin.trim());
    if (!origins.includes(request.headers.get('origin')))
      return json(403, { error: 'Origin not allowed' });
    if (!request.headers.get('content-type')?.startsWith('application/json'))
      return json(415, { error: 'JSON required' });
  }

  const redisUrl = env.UPSTASH_REDIS_REST_URL || env.KV_REST_API_URL;
  const redisToken = env.UPSTASH_REDIS_REST_TOKEN || env.KV_REST_API_TOKEN;
  if (!redisUrl || !redisToken) return json(503, { error: 'Tracking storage is not configured' });

  const redis = async (commands) => {
    const response = await fetcher(`${redisUrl.replace(/\/$/, '')}/pipeline`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${redisToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(commands),
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) throw new Error('Storage unavailable');
    const values = await response.json();
    if (
      !Array.isArray(values) ||
      values.length !== commands.length ||
      values.some((item) => item.error)
    ) {
      throw new Error('Storage command failed');
    }
    return values.map((item) => item.result);
  };

  try {
    if (request.method === 'POST') {
      // Bound input before parsing. Never store unspecified form fields.
      const reader = request.body?.getReader();
      let raw = '';
      if (reader) {
        const decoder = new TextDecoder();
        let bytes = 0;
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          bytes += value.byteLength;
          if (bytes > 65536) {
            await reader.cancel();
            return json(413, { error: 'Payload too large' });
          }
          raw += decoder.decode(value, { stream: true });
        }
        raw += decoder.decode();
      }
      let body;
      try {
        body = JSON.parse(raw);
      } catch {
        return json(400, { error: 'Invalid event' });
      }
      if (
        !body ||
        typeof body !== 'object' ||
        !(onlyKeys(body, ['eventId']) || onlyKeys(body, ['eventId', 'order'])) ||
        typeof body.eventId !== 'string' ||
        !UUID.test(body.eventId)
      ) {
        return json(400, { error: 'Invalid event' });
      }
      const order = Object.hasOwn(body, 'order') ? normalizeOrder(body.order) : undefined;
      if (order === null) return json(400, { error: 'Invalid order details' });
      const record = order
        ? { eventId: body.eventId, createdAt: now.toISOString(), ...order }
        : null;
      const [created] = await redis([
        [
          'EVAL',
          RECORD_SCRIPT,
          6,
          `${PREFIX}event:${body.eventId}`,
          `${PREFIX}day:${dayKey(now)}`,
          `${PREFIX}total`,
          `${PREFIX}started`,
          `${PREFIX}record:${body.eventId}`,
          `${PREFIX}records`,
          now.toISOString(),
          record ? JSON.stringify(record) : '',
          `${now.getTime()}:${body.eventId}`,
          `[${now.getTime() - RETENTION_MS}:~`,
        ],
      ]);
      return json(200, { recorded: created === 1 });
    }

    const cursor = new URL(request.url).searchParams.get('before');
    if (cursor && (!/^\d{13}:[0-9a-f-]{36}$/i.test(cursor) || !UUID.test(cursor.slice(14)))) {
      return json(400, { error: 'Invalid page cursor' });
    }
    const dates = Array.from({ length: 30 }, (_, index) =>
      dayKey(new Date(now.getTime() - (29 - index) * 86400000)),
    );
    const [counts, total, startedAt, members] = await redis([
      ['MGET', ...dates.map((date) => `${PREFIX}day:${date}`)],
      ['GET', `${PREFIX}total`],
      ['GET', `${PREFIX}started`],
      [
        'ZREVRANGEBYLEX',
        `${PREFIX}records`,
        cursor ? `(${cursor}` : '+',
        `(${now.getTime() - RETENTION_MS}:~`,
        'LIMIT',
        0,
        PAGE_SIZE + 1,
      ],
    ]);
    if (!Array.isArray(counts) || counts.length !== 30 || !Array.isArray(members))
      throw new Error('Invalid storage result');
    const pageMembers = members.slice(0, PAGE_SIZE);
    const [storedRecords] = pageMembers.length
      ? await redis([
          ['MGET', ...pageMembers.map((member) => `${PREFIX}record:${member.slice(14)}`)],
        ])
      : [[]];
    const records = storedRecords.filter(Boolean).map((record) => JSON.parse(record));
    const daily = dates.map((date, index) => ({ date, attempts: Number(counts[index] || 0) }));
    return json(200, {
      metric: 'Website checkout attempts',
      timeZone: TIME_ZONE,
      generatedAt: now.toISOString(),
      startedAt,
      today: daily.at(-1).attempts,
      last7Days: daily.slice(-7).reduce((sum, day) => sum + day.attempts, 0),
      last30Days: daily.reduce((sum, day) => sum + day.attempts, 0),
      total: Number(total || 0),
      daily,
      records,
      nextCursor: members.length > PAGE_SIZE ? pageMembers.at(-1) : null,
      detailRetentionDays: 90,
    });
  } catch {
    // Never report a fabricated zero or return storage credentials to the browser.
    return json(503, { error: 'Tracking storage is temporarily unavailable' });
  }
}
