// Only an anonymous event ID is transmitted. Never pass form values here.
let lastAttemptAt = -Infinity;

export const trackCheckoutAttempt = (): void => {
  try {
    // Avoid double clicks while still allowing a later checkout attempt.
    const now = Date.now();
    if (now - lastAttemptAt < 5000) return;
    lastAttemptAt = now;
    const body = JSON.stringify({ eventId: crypto.randomUUID() });
    const send = (): Promise<Response> =>
      fetch('/api/checkout-attempts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        keepalive: true,
        signal: AbortSignal.timeout(5000),
      });
    // Reuse the ID on a network retry so a lost response cannot double count.
    void send()
      .catch(() => send())
      .catch(() => undefined);
  } catch {
    // Analytics must never prevent the customer from opening WhatsApp.
  }
};
