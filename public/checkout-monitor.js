(() => {
  const el = (id) => document.getElementById(id);
  let accessKey = '';
  let pending = false;
  let generation = 0;
  let activeCursor = null;
  let nextCursor = null;
  const formatTime = (value) =>
    new Intl.DateTimeFormat('en-PK', {
      timeZone: 'Asia/Karachi',
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(value));

  const money = (value) =>
    `Rs ${Number(value).toLocaleString('en-PK', { maximumFractionDigits: 2 })}`;
  function element(tag, text, className) {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (className) node.className = className;
    return node;
  }
  function renderOrders(records) {
    el('orders').replaceChildren(
      ...records.map((order) => {
        const card = element('article', undefined, 'record');
        const heading = element('div', undefined, 'record-header');
        heading.append(
          element('h3', order.customerName),
          element(
            'span',
            order.total === null ? 'Price to be confirmed' : money(order.total),
            'price',
          ),
        );
        card.append(
          heading,
          element('p', `${formatTime(order.createdAt)} · ${order.orderTypes.join(', ')}`),
          element('p', `${order.priceStatus} · Checkout attempt`, 'note'),
        );
        const details = element('details');
        details.append(element('summary', 'View order details'));
        if (order.items.length) {
          const items = element('ul');
          for (const item of order.items) {
            items.append(
              element(
                'li',
                `${item.name}${item.variant ? ` (${item.variant})` : ''} × ${item.quantity} · ${money(item.unitPrice)} each = ${money(item.lineTotal)}`,
              ),
            );
          }
          details.append(items);
        }
        // Treat all customer text as plain text, never as HTML.
        details.append(element('pre', order.orderDetails));
        card.append(details);
        return card;
      }),
    );
    if (!records.length)
      el('orders').append(
        element(
          'p',
          'No detailed attempts on this page. New checkout submissions will appear here.',
        ),
      );
  }

  async function refresh(cursor = activeCursor) {
    if (!accessKey || pending) return;
    pending = true;
    const requestGeneration = generation;
    el('load').disabled = true;
    el('older').disabled = true;
    el('newest').disabled = true;
    try {
      const response = await fetch(
        `/api/checkout-attempts${cursor ? `?before=${encodeURIComponent(cursor)}` : ''}`,
        {
          headers: { Authorization: `Bearer ${accessKey}` },
          cache: 'no-store',
          signal: AbortSignal.timeout(10000),
        },
      );
      const data = await response.json();
      if (requestGeneration !== generation) return;
      if (!response.ok) throw new Error(data.error || 'Counts could not be loaded');
      activeCursor = cursor;
      nextCursor = data.nextCursor;
      renderOrders(data.records || []);
      el('older').hidden = !nextCursor;
      el('newest').hidden = !activeCursor;
      for (const [id, field] of [
        ['today', 'today'],
        ['week', 'last7Days'],
        ['month', 'last30Days'],
        ['total', 'total'],
      ]) {
        el(id).textContent = data[field].toLocaleString('en-PK');
      }
      el('days').replaceChildren(
        ...data.daily
          .slice()
          .reverse()
          .map((day) => {
            const row = document.createElement('tr');
            for (const value of [day.date, day.attempts.toLocaleString('en-PK')]) {
              const cell = document.createElement('td');
              cell.textContent = value;
              row.append(cell);
            }
            return row;
          }),
      );
      el('coverage').textContent = data.startedAt
        ? `First recorded attempt: ${formatTime(data.startedAt)}. Earlier days are outside tracking coverage.`
        : 'Storage is connected. No checkout attempts have been recorded yet.';
      el('report').hidden = false;
      el('lock').hidden = false;
      el('status').dataset.error = 'false';
      el('status').textContent = `Updated ${formatTime(data.generatedAt)} · Asia/Karachi`;
    } catch (error) {
      if (requestGeneration !== generation) return;
      el('report').hidden = true;
      el('orders').replaceChildren();
      el('status').dataset.error = 'true';
      el('status').textContent =
        error instanceof Error ? error.message : 'Counts are unavailable. Try again.';
    } finally {
      pending = false;
      el('load').disabled = false;
      el('older').disabled = false;
      el('newest').disabled = false;
    }
  }
  el('access').addEventListener('submit', (event) => {
    event.preventDefault();
    if (pending) return;
    accessKey = el('key').value.trim() || accessKey;
    el('key').value = '';
    el('key').required = false;
    void refresh(null);
  });
  el('lock').addEventListener('click', () => {
    generation++;
    accessKey = '';
    activeCursor = null;
    nextCursor = null;
    el('key').value = '';
    el('key').required = true;
    el('report').hidden = true;
    el('lock').hidden = true;
    el('days').replaceChildren();
    el('orders').replaceChildren();
    for (const id of ['today', 'week', 'month', 'total', 'coverage']) el(id).textContent = '';
    el('status').textContent = 'Locked. Enter the access key to view live counts.';
    el('key').focus();
  });
  el('older').addEventListener('click', () => {
    if (nextCursor) void refresh(nextCursor);
  });
  el('newest').addEventListener('click', () => {
    void refresh(null);
  });
  setInterval(() => {
    if (!document.hidden) void refresh();
  }, 60000);
})();
