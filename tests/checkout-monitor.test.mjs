import assert from 'node:assert/strict';
import test from 'node:test';
import { dayKey, handleCheckoutRequest, RECORD_SCRIPT } from '../server/checkout-monitor.mjs';

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
    (await handleCheckoutRequest(post({ eventId: 'a'.repeat(200) }), options)).status,
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
  assert.deepEqual(command.slice(0, 3), ['EVAL', RECORD_SCRIPT, 4]);
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
