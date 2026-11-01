import { timingSafeEqual } from 'node:crypto';

const TIME_ZONE = 'Asia/Karachi';
const PREFIX = 'azaan:checkout:v1:';
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
// Deduplication and counters change together, even with concurrent requests.
export const RECORD_SCRIPT = `
if redis.call('EXISTS', KEYS[1]) == 1 then return 0 end
redis.call('SET', KEYS[1], '1', 'EX', 604800)
redis.call('INCR', KEYS[2])
redis.call('EXPIRE', KEYS[2], 34560000)
redis.call('INCR', KEYS[3])
redis.call('SET', KEYS[4], ARGV[1], 'NX')
return 1`;

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
      // Bound input before parsing; no customer fields are accepted or stored.
      const reader = request.body?.getReader();
      let raw = '';
      if (reader) {
        const decoder = new TextDecoder();
        let bytes = 0;
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          bytes += value.byteLength;
          if (bytes > 128) {
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
        Object.keys(body).length !== 1 ||
        !UUID.test(body.eventId)
      ) {
        return json(400, { error: 'Invalid event' });
      }
      const [created] = await redis([
        [
          'EVAL',
          RECORD_SCRIPT,
          4,
          `${PREFIX}event:${body.eventId}`,
          `${PREFIX}day:${dayKey(now)}`,
          `${PREFIX}total`,
          `${PREFIX}started`,
          now.toISOString(),
        ],
      ]);
      return json(200, { recorded: created === 1 });
    }

    const dates = Array.from({ length: 30 }, (_, index) =>
      dayKey(new Date(now.getTime() - (29 - index) * 86400000)),
    );
    const [counts, total, startedAt] = await redis([
      ['MGET', ...dates.map((date) => `${PREFIX}day:${date}`)],
      ['GET', `${PREFIX}total`],
      ['GET', `${PREFIX}started`],
    ]);
    if (!Array.isArray(counts) || counts.length !== 30) throw new Error('Invalid storage result');
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
    });
  } catch {
    // Never report a fabricated zero or return storage credentials to the browser.
    return json(503, { error: 'Tracking storage is temporarily unavailable' });
  }
}
