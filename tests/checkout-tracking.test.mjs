import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
import ts from 'typescript';

const source = readFileSync(new URL('../src/utils/checkoutTracking.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source.replaceAll('export ', ''), {
  compilerOptions: { target: ts.ScriptTarget.ES2022 },
}).outputText;
const order = {
  customerName: 'Test Customer',
  orderDetails: 'Cake Rusk (500gm) x 2',
  items: [{ name: 'Cake Rusk', category: 'Rusk', quantity: 2, unitPrice: 600, variant: '500gm' }],
};
function setup(fetcher, crypto = { randomUUID: () => '9fc88873-e678-4e08-8f81-5709afc67698' }) {
  let now = 10000;
  const context = vm.createContext({
    fetch: fetcher,
    crypto,
    Date: { now: () => now },
    AbortSignal,
  });
  vm.runInContext(`${compiled}\nglobalThis.track = trackCheckoutAttempt;`, context);
  return {
    track: (value = order) => context.track(value),
    advance: (ms) => {
      now += ms;
    },
  };
}
test('checkout sends requested order fields and suppresses rapid double submissions', () => {
  const calls = [];
  const client = setup((url, init) => {
    calls.push({ url, init });
    return Promise.resolve({ ok: true });
  });
  client.track();
  client.track();
  client.advance(5001);
  client.track();
  assert.equal(calls.length, 2);
  assert.equal(calls[0].url, '/api/checkout-attempts');
  assert.deepEqual(JSON.parse(calls[0].init.body), {
    eventId: '9fc88873-e678-4e08-8f81-5709afc67698',
    order,
  });
  assert.equal(calls[0].init.keepalive, true);
});

test('unrequested customer fields never enter the tracking payload', () => {
  let sent;
  const client = setup((_url, init) => {
    sent = JSON.parse(init.body);
    return Promise.resolve({ ok: true });
  });
  client.track({ ...order, phone: 'private', address: 'private', optionalMessage: 'private' });
  assert.deepEqual(sent.order, order);
});
test('network retries reuse the event ID and never reject into checkout', async () => {
  const calls = [];
  const client = setup((_url, init) => {
    calls.push(init.body);
    return Promise.reject(new Error('Offline'));
  });
  assert.doesNotThrow(() => client.track());
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(calls.length, 2);
  assert.equal(calls[0], calls[1]);
});
test('unsupported browser telemetry APIs cannot interrupt checkout', () => {
  const client = setup(() => {
    throw new Error('Must not be called');
  }, {});
  assert.doesNotThrow(() => client.track());
});
