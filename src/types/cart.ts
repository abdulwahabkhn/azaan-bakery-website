export interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  selectedVariant?: string;
  priceUnit?: 'kg';
}

export interface CartCheckoutState {
  cartItems: CartItem[];
  cartTotal: number;
}
