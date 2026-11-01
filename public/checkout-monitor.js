(() => {
  const el = (id) => document.getElementById(id);
  let accessKey = '';
  let pending = false;
  let generation = 0;
  const formatTime = (value) =>
    new Intl.DateTimeFormat('en-PK', {
      timeZone: 'Asia/Karachi',
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(value));

  async function refresh() {
    if (!accessKey || pending) return;
    pending = true;
    const requestGeneration = generation;
    el('load').disabled = true;
    try {
      const response = await fetch('/api/checkout-attempts', {
        headers: { Authorization: `Bearer ${accessKey}` },
        cache: 'no-store',
        signal: AbortSignal.timeout(10000),
      });
      const data = await response.json();
      if (requestGeneration !== generation) return;
      if (!response.ok) throw new Error(data.error || 'Counts could not be loaded');
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
      el('status').dataset.error = 'true';
      el('status').textContent =
        error instanceof Error ? error.message : 'Counts are unavailable. Try again.';
    } finally {
      pending = false;
      el('load').disabled = false;
    }
  }
  el('access').addEventListener('submit', (event) => {
    event.preventDefault();
    accessKey = el('key').value.trim() || accessKey;
    el('key').value = '';
    el('key').required = false;
    void refresh();
  });
  el('lock').addEventListener('click', () => {
    generation++;
    accessKey = '';
    el('key').value = '';
    el('key').required = true;
    el('report').hidden = true;
    el('lock').hidden = true;
    el('days').replaceChildren();
    for (const id of ['today', 'week', 'month', 'total', 'coverage']) el(id).textContent = '';
    el('status').textContent = 'Locked. Enter the access key to view live counts.';
    el('key').focus();
  });
  setInterval(() => {
    if (!document.hidden) void refresh();
  }, 60000);
})();
