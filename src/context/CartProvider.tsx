import { useCallback, useEffect, useMemo, useState } from 'react';

import { CartContext } from '@/context/CartContext';
import { createCartItemKey } from '@/utils/cart';
import { isRemovedProductName } from '@/utils/removedProducts';

import type { ReactNode } from 'react';
import type { CartItem } from '@/types/cart';
import type { Product } from '@/types/product';

const CART_STORAGE_KEY = 'azaan-bakers-cart';

const isCartItem = (value: unknown): value is CartItem => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const item = value as Partial<CartItem>;

  return (
    typeof item.id === 'string' &&
    typeof item.name === 'string' &&
    typeof item.image === 'string' &&
    typeof item.price === 'number' &&
    Number.isFinite(item.price) &&
    item.price >= 0 &&
    typeof item.quantity === 'number' &&
    Number.isInteger(item.quantity) &&
    item.quantity > 0 &&
    (item.selectedVariant === undefined || typeof item.selectedVariant === 'string') &&
    (item.priceUnit === undefined || item.priceUnit === 'kg')
  );
};

const readStoredCart = (): CartItem[] => {
  try {
    const storedValue = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!storedValue) {
      return [];
    }

    const parsedValue: unknown = JSON.parse(storedValue);
    const migratedValue = Array.isArray(parsedValue)
      ? parsedValue.map((value: unknown) => {
          if (!value || typeof value !== 'object') return value;
          const legacyItem = value as CartItem & { selectedSize?: string };
          if (!legacyItem.selectedSize || legacyItem.selectedVariant) return value;
          const { selectedSize, ...item } = legacyItem;
          return { ...item, selectedVariant: selectedSize };
        })
      : parsedValue;

    return Array.isArray(migratedValue) && migratedValue.every(isCartItem)
      ? migratedValue.filter((item) => item.image && !isRemovedProductName(item.name))
      : [];
  } catch {
    return [];
  }
};

export interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(readStoredCart);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // Cart remains usable in memory when storage is blocked or unavailable.
    }
  }, [cartItems]);

  const addToCart = useCallback((product: Product, selectedVariant?: string): void => {
    if (isRemovedProductName(product.name)) {
      return;
    }

    const selectedPrice = selectedVariant
      ? product.variants?.find((variant) => variant.label === selectedVariant)?.price
      : undefined;
    const price = selectedPrice ?? product.price;
    const itemKey = createCartItemKey(product.id, selectedVariant);

    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => createCartItemKey(item.id, item.selectedVariant) === itemKey,
      );

      if (existingItem) {
        return currentItems.map((item) =>
          createCartItemKey(item.id, item.selectedVariant) === itemKey
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [
        ...currentItems,
        {
          id: product.id,
          name: product.name,
          image: product.image,
          price,
          quantity: 1,
          ...(selectedVariant ? { selectedVariant } : {}),
          ...(product.priceUnit ? { priceUnit: product.priceUnit } : {}),
        },
      ];
    });
  }, []);

  const removeFromCart = useCallback((productId: string, selectedVariant?: string): void => {
    const itemKey = createCartItemKey(productId, selectedVariant);
    setCartItems((currentItems) =>
      currentItems.filter((item) => createCartItemKey(item.id, item.selectedVariant) !== itemKey),
    );
  }, []);

  const increaseQuantity = useCallback((productId: string, selectedVariant?: string): void => {
    const itemKey = createCartItemKey(productId, selectedVariant);
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        createCartItemKey(item.id, item.selectedVariant) === itemKey
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  }, []);

  const decreaseQuantity = useCallback((productId: string, selectedVariant?: string): void => {
    const itemKey = createCartItemKey(productId, selectedVariant);
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        createCartItemKey(item.id, item.selectedVariant) === itemKey && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const cartTotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems],
  );
  const cartCount = useMemo(
    () => cartItems.reduce((count, item) => count + item.quantity, 0),
    [cartItems],
  );

  const contextValue = useMemo(
    () => ({
      addToCart,
      cartCount,
      cartItems,
      cartTotal,
      clearCart,
      closeCart,
      decreaseQuantity,
      increaseQuantity,
      isCartOpen,
      openCart,
      removeFromCart,
    }),
    [
      addToCart,
      cartCount,
      cartItems,
      cartTotal,
      clearCart,
      closeCart,
      decreaseQuantity,
      increaseQuantity,
      isCartOpen,
      openCart,
      removeFromCart,
    ],
  );

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};
