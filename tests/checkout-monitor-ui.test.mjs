import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';

class Element {
  children = [];
  listeners = {};
  dataset = {};
  value = '';
  hidden = false;
  text = '';
  set textContent(value) {
    this.text = String(value);
    this.children = [];
  }
  get textContent() {
    return this.text + this.children.map((child) => child.textContent).join(' ');
  }
  set innerHTML(_value) {
    throw new Error('Customer content must not be rendered as HTML');
  }
  append(...nodes) {
    this.children.push(...nodes);
  }
  replaceChildren(...nodes) {
    this.text = '';
    this.children = nodes;
  }
  addEventListener(name, fn) {
    this.listeners[name] = fn;
  }
  focus() {}
}
const source = readFileSync(new URL('../public/checkout-monitor.js', import.meta.url), 'utf8');
function setup(data, status = 200) {
  const nodes = new Map();
  const el = (id) => {
    if (!nodes.has(id)) nodes.set(id, new Element());
    return nodes.get(id);
  };
  vm.runInNewContext(source, {
    document: { getElementById: el, createElement: () => new Element(), hidden: false },
    Intl,
    Date,
    AbortSignal,
    encodeURIComponent,
    setInterval: () => {},
    fetch: async () => ({ ok: status === 200, json: async () => data }),
  });
  return {
    el,
    load: async () => {
      el('key').value = 'synthetic-test-only-access-key-with-32-characters';
      el('access').listeners.submit({ preventDefault() {} });
      await new Promise((resolve) => setImmediate(resolve));
    },
  };
}
test('renders customer text literally with item quantities and prices, then removes it on Lock', async () => {
  const ui = setup({
    today: 1,
    last7Days: 1,
    last30Days: 1,
    total: 1,
    daily: [{ date: '2026-11-02', attempts: 1 }],
    generatedAt: '2026-11-02T12:00:00Z',
    startedAt: null,
    records: [
      {
        customerName: '<script>not executable</script>',
        total: 1200,
        createdAt: '2026-11-02T12:00:00Z',
        orderTypes: ['Rusk'],
        priceStatus: 'Cart estimate',
        orderDetails: '<img src=x onerror=alert(1)>',
        items: [
          { name: 'Cake Rusk', variant: '500gm', quantity: 2, unitPrice: 600, lineTotal: 1200 },
        ],
      },
    ],
    nextCursor: null,
  });
  await ui.load();
  assert.equal(ui.el('report').hidden, false);
  assert.ok(ui.el('orders').textContent.includes('<script>not executable</script>'));
  assert.ok(ui.el('orders').textContent.includes('<img src=x onerror=alert(1)>'));
  assert.ok(ui.el('orders').textContent.includes('Cake Rusk (500gm) × 2 · Rs 600 each = Rs 1,200'));
  assert.equal(ui.el('key').value, '');
  ui.el('lock').listeners.click();
  assert.equal(ui.el('orders').textContent, '');
  assert.equal(ui.el('report').hidden, true);
});
test('failed authentication never displays customer records', async () => {
  const ui = setup({ error: 'Monitor access key required' }, 401);
  await ui.load();
  assert.equal(ui.el('report').hidden, true);
  assert.equal(ui.el('orders').textContent, '');
  assert.equal(ui.el('status').textContent, 'Monitor access key required');
});
