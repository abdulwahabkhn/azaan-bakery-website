import { createContext } from 'react';

import type { CartItem } from '@/types/cart';
import type { Product } from '@/types/product';

export interface CartContextValue {
  cartItems: readonly CartItem[];
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  addToCart: (product: Product, selectedVariant?: string) => void;
  removeFromCart: (productId: string, selectedVariant?: string) => void;
  increaseQuantity: (productId: string, selectedVariant?: string) => void;
  decreaseQuantity: (productId: string, selectedVariant?: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

export const CartContext = createContext<CartContextValue | null>(null);
