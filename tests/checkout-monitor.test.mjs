import assert from 'node:assert/strict';
import test from 'node:test';
import {
  dayKey,
  handleCheckoutRequest,
  normalizeOrder,
  RECORD_SCRIPT,
} from '../server/checkout-monitor.mjs';

const token = 'test-only-access-key-with-at-least-32-characters';
const env = {
  CHECKOUT_MONITOR_TOKEN: token,
  UPSTASH_REDIS_REST_URL: 'https://redis.example.test',
  UPSTASH_REDIS_REST_TOKEN: 'test-only-redis-key',
};
const now = new Date('2026-10-17T19:01:00Z');
const eventId = '9fc88873-e678-4e08-8f81-5709afc67698';
const post = (body = { eventId }, origin = 'https://www.azaanbaker.com') =>
  new Request('https://www.azaanbaker.com/api/checkout-attempts', {
    method: 'POST',
    headers: { origin, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
const get = (key = token) =>
  new Request('https://www.azaanbaker.com/api/checkout-attempts', {
    headers: { Authorization: `Bearer ${key}` },
  });

test('Pakistan midnight determines the day, independently of UTC', () => {
  assert.equal(dayKey(new Date('2026-10-17T18:59:59Z')), '2026-10-17');
  assert.equal(dayKey(new Date('2026-10-17T19:00:00Z')), '2026-10-18');
});
test('read access is denied before querying storage', async () => {
  const fetcher = () => {
    throw new Error('Must not contact storage');
  };
  const response = await handleCheckoutRequest(get('wrong'), { env, fetcher });
  assert.equal(response.status, 401);
  assert.equal(response.headers.get('cache-control'), 'no-store');
});
test('unconfigured storage is an error, never an empty count', async () => {
  assert.equal((await handleCheckoutRequest(post(), { env: {} })).status, 503);
});
test('rejects unrelated origins, customer fields, invalid IDs, and large payloads', async () => {
  const options = {
    env,
    fetcher: () => {
      throw new Error('Must not contact storage');
    },
  };
  assert.equal(
    (await handleCheckoutRequest(post({ eventId }, 'https://other.test'), options)).status,
    403,
  );
  assert.equal(
    (await handleCheckoutRequest(post({ eventId, name: 'Must not be stored' }), options)).status,
    400,
  );
  assert.equal((await handleCheckoutRequest(post({ eventId: 'invalid' }), options)).status, 400);
  assert.equal(
    (await handleCheckoutRequest(post({ eventId: 'a'.repeat(66000) }), options)).status,
    413,
  );
});
test('writes anonymous IDs and server date using one atomic Redis command; retries reuse the key', async () => {
  const requests = [];
  const fetcher = async (url, init) => {
    assert.equal(url, 'https://redis.example.test/pipeline');
    requests.push(JSON.parse(init.body));
    return Response.json([{ result: requests.length === 1 ? 1 : 0 }]);
  };
  const first = await handleCheckoutRequest(post(), { env, now, fetcher });
  const retry = await handleCheckoutRequest(post(), { env, now, fetcher });
  assert.deepEqual(await first.json(), { recorded: true });
  assert.deepEqual(await retry.json(), { recorded: false });
  assert.deepEqual(requests[0], requests[1]);
  const command = requests[0][0];
  assert.deepEqual(command.slice(0, 3), ['EVAL', RECORD_SCRIPT, 6]);
  assert.equal(command[3], `azaan:checkout:v1:event:${eventId}`);
  assert.equal(command[4], 'azaan:checkout:v1:day:2026-10-18');
});
test('summary includes today in 7/30-day counts and reports lifetime separately', async () => {
  const counts = Array.from({ length: 30 }, (_, i) => (i === 29 ? '3' : i === 25 ? '2' : null));
  const fetcher = async (_url, init) => {
    const commands = JSON.parse(init.body);
    assert.equal(commands[0].length, 31);
    return Response.json([
      { result: counts },
      { result: '15' },
      { result: '2026-10-10T00:00:00Z' },
      { result: [] },
    ]);
  };
  const response = await handleCheckoutRequest(get(), { env, now, fetcher });
  const data = await response.json();
  assert.equal(response.status, 200);
  assert.equal(data.today, 3);
  assert.equal(data.last7Days, 5);
  assert.equal(data.last30Days, 5);
  assert.equal(data.total, 15);
  assert.equal(data.timeZone, 'Asia/Karachi');
  assert.equal(data.daily.at(-1).date, '2026-10-18');
});

const order = {
  customerName: '  Test Customer  ',
  orderDetails: 'Cake Rusk (500gm) x 2',
  items: [{ name: 'Cake Rusk', category: 'Rusk', quantity: 2, unitPrice: 600, variant: '500gm' }],
};
test('validates requested details, calculates prices, and labels unknown custom prices', () => {
  const result = normalizeOrder(order);
  assert.equal(result.customerName, 'Test Customer');
  assert.equal(result.total, 1200);
  assert.equal(result.items[0].lineTotal, 1200);
  assert.deepEqual(result.orderTypes, ['Rusk']);
  assert.equal(result.priceStatus, 'Cart estimate');
  const custom = normalizeOrder({ ...order, items: [] });
  assert.equal(custom.total, null);
  assert.deepEqual(custom.orderTypes, ['Custom request']);
  assert.equal(normalizeOrder({ ...order, phone: 'unrequested' }), null);
  assert.equal(normalizeOrder({ ...order, customerName: 'a'.repeat(81) }), null);
  assert.equal(normalizeOrder({ ...order, items: [{ ...order.items[0], quantity: -1 }] }), null);
  assert.equal(
    normalizeOrder({ ...order, items: [{ ...order.items[0], unitPrice: Infinity }] }),
    null,
  );
});
test('stores full record and timestamp in the same atomic operation as counters', async () => {
  let command;
  const response = await handleCheckoutRequest(post({ eventId, order }), {
    env,
    now,
    fetcher: async (_url, init) => {
      [command] = JSON.parse(init.body);
      return Response.json([{ result: 1 }]);
    },
  });
  assert.equal(response.status, 200);
  assert.equal(command[7], `azaan:checkout:v1:record:${eventId}`);
  const record = JSON.parse(command[10]);
  assert.equal(record.createdAt, now.toISOString());
  assert.equal(record.total, 1200);
  assert.equal(record.customerName, 'Test Customer');
  assert.equal(record.eventId, eventId);
});
test('pages private records without losing attempts sharing one timestamp', async () => {
  const member = `${now.getTime()}:${eventId}`;
  const members = Array.from({ length: 26 }, (_, index) => `${now.getTime() - index}:${eventId}`);
  let calls = 0;
  const fetcher = async (_url, init) => {
    const commands = JSON.parse(init.body);
    calls++;
    if (calls === 1) {
      assert.equal(commands[3][2], `(${member}`);
      return Response.json([
        { result: Array(30).fill('0') },
        { result: '26' },
        { result: null },
        { result: members },
      ]);
    }
    assert.equal(commands[0].length, 26);
    return Response.json([
      { result: Array(25).fill(JSON.stringify({ eventId, ...normalizeOrder(order) })) },
    ]);
  };
  const request = new Request(`https://www.azaanbaker.com/api/checkout-attempts?before=${member}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const response = await handleCheckoutRequest(request, { env, now, fetcher });
  const data = await response.json();
  assert.equal(response.status, 200);
  assert.equal(data.records.length, 25);
  assert.equal(data.nextCursor, members[24]);
  assert.equal(data.detailRetentionDays, 90);
});
test('rejects malformed detail records and cursors before contacting Redis', async () => {
  const fetcher = () => {
    throw new Error('Must not contact storage');
  };
  assert.equal(
    (
      await handleCheckoutRequest(post({ eventId, order: { ...order, address: 'private' } }), {
        env,
        fetcher,
      })
    ).status,
    400,
  );
  const bad = new Request('https://www.azaanbaker.com/api/checkout-attempts?before=invalid', {
    headers: { Authorization: `Bearer ${token}` },
  });
  assert.equal((await handleCheckoutRequest(bad, { env, fetcher })).status, 400);
});
test('network and Redis command errors surface as unavailable', async () => {
  for (const fetcher of [
    async () => {
      throw new Error('Offline');
    },
    async () => Response.json([{ error: 'NOAUTH' }]),
  ]) {
    const response = await handleCheckoutRequest(post(), { env, fetcher });
    assert.equal(response.status, 503);
    assert.ok(!(await response.text()).includes(env.UPSTASH_REDIS_REST_TOKEN));
  }
});
test('unsupported methods cannot write counts', async () => {
  const response = await handleCheckoutRequest(
    new Request('https://example.test', { method: 'DELETE' }),
    { env },
  );
  assert.equal(response.status, 405);
});
