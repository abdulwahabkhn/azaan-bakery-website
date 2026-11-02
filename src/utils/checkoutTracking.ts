export interface CheckoutOrderItem {
  name: string;
  category: string;
  quantity: number;
  unitPrice: number;
  variant: string;
}

export interface CheckoutOrderDetails {
  customerName: string;
  orderDetails: string;
  items: CheckoutOrderItem[];
}

let lastAttemptAt = -Infinity;

export const trackCheckoutAttempt = (order: CheckoutOrderDetails): void => {
  try {
    // Avoid double clicks while still allowing a later checkout attempt.
    const now = Date.now();
    if (now - lastAttemptAt < 5000) return;
    lastAttemptAt = now;
    // Use an explicit allowlist; phone, address and optional message stay in WhatsApp.
    const body = JSON.stringify({
      eventId: crypto.randomUUID(),
      order: {
        customerName: order.customerName,
        orderDetails: order.orderDetails,
        items: order.items.map(({ name, category, quantity, unitPrice, variant }) => ({
          name,
          category,
          quantity,
          unitPrice,
          variant,
        })),
      },
    });
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
