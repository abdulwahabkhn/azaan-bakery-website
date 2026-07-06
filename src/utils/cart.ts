import type { CartItem } from '@/types/cart';

const rupeeFormatter = new Intl.NumberFormat('en-PK', {
  maximumFractionDigits: 0,
});

export const formatRupees = (value: number): string => `Rs ${rupeeFormatter.format(value)}`;

export const formatCartPrice = (price: number, priceUnit?: 'kg'): string =>
  `${formatRupees(price)}${priceUnit === 'kg' ? ' / kg' : ''}`;

export const createCartItemKey = (productId: string, selectedVariant?: string): string =>
  `${productId}::${selectedVariant ?? ''}`;

export const formatCartSummary = (cartItems: readonly CartItem[], cartTotal: number): string => {
  const itemLines = cartItems.map((item, index) => {
    const variant = item.selectedVariant ? ` (${item.selectedVariant})` : '';
    const unit = item.priceUnit === 'kg' ? ' / kg' : '';
    const subtotal = item.price * item.quantity;

    return `${index + 1}. ${item.name}${variant} x ${item.quantity} - ${formatRupees(subtotal)}${unit}`;
  });

  return [
    'Order Details:',
    '',
    ...itemLines,
    '',
    `Total: ${formatRupees(cartTotal)}`,
  ].join('\n');
};
