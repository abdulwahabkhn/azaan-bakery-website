import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { memo, useEffect, useRef } from 'react';
import { FiMinus, FiPlus, FiShoppingBag, FiTrash2, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import { BrandLogo } from '@/components/common/BrandLogo';
import { brand } from '@/constants/brand';
import { routes } from '@/constants/routes';
import { useCart } from '@/hooks/useCart';
import { formatCartPrice, formatRupees } from '@/utils/cart';

import type { CartItem } from '@/types/cart';

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export const cartDrawerId = 'shopping-cart-drawer';

interface CartLineProps {
  item: CartItem;
  onDecrease: (productId: string, selectedVariant?: string) => void;
  onIncrease: (productId: string, selectedVariant?: string) => void;
  onRemove: (productId: string, selectedVariant?: string) => void;
}

const CartLine = memo(({ item, onDecrease, onIncrease, onRemove }: CartLineProps) => (
  <li className="rounded-2xl border border-border bg-white/80 p-3 shadow-[0_10px_30px_rgb(15_23_42_/_0.07)] backdrop-blur">
    <div className="flex gap-3">
      <img
        alt={item.name}
        className="size-20 shrink-0 rounded-xl border border-white object-cover shadow-sm"
        decoding="async"
        loading="lazy"
        src={item.image}
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="break-words font-display text-base font-bold leading-tight text-navy">
              {item.name}
            </h3>
            {item.selectedVariant ? (
              <p className="mt-1 text-xs font-semibold text-muted">{item.selectedVariant}</p>
            ) : null}
            <p className="mt-1 text-xs font-bold text-gold-deep">
              {formatCartPrice(item.price, item.priceUnit)}
            </p>
          </div>
          <button
            aria-label={`Remove ${item.name} from cart`}
            className="focus-ring grid size-8 shrink-0 place-items-center rounded-full border border-red-200 bg-white text-red-700 transition hover:border-red-300 hover:bg-red-50"
            onClick={() => onRemove(item.id, item.selectedVariant)}
            type="button"
          >
            <FiTrash2 aria-hidden="true" className="size-3.5" />
          </button>
        </div>
        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="flex items-center rounded-full border border-border bg-page p-0.5">
            <button
              aria-label={`Decrease quantity of ${item.name}`}
              className="focus-ring grid size-8 place-items-center rounded-full text-navy transition hover:bg-white disabled:cursor-not-allowed disabled:text-navy/55"
              disabled={item.quantity <= 1}
              onClick={() => onDecrease(item.id, item.selectedVariant)}
              type="button"
            >
              <FiMinus aria-hidden="true" className="size-3.5" />
            </button>
            <span
              aria-label={`Quantity ${item.quantity}`}
              className="min-w-8 text-center text-sm font-bold"
            >
              {item.quantity}
            </span>
            <button
              aria-label={`Increase quantity of ${item.name}`}
              className="focus-ring grid size-8 place-items-center rounded-full text-navy transition hover:bg-white"
              onClick={() => onIncrease(item.id, item.selectedVariant)}
              type="button"
            >
              <FiPlus aria-hidden="true" className="size-3.5" />
            </button>
          </div>
          <p className="text-right text-sm font-bold text-navy">
            {formatRupees(item.price * item.quantity)}
          </p>
        </div>
      </div>
    </div>
  </li>
));

CartLine.displayName = 'CartLine';

export const CartDrawer = () => {
  const {
    cartCount,
    cartItems,
    cartTotal,
    clearCart,
    closeCart,
    decreaseQuantity,
    increaseQuantity,
    isCartOpen,
    removeFromCart,
  } = useCart();
  const navigate = useNavigate();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isCartOpen) {
      return undefined;
    }

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.classList.add('cart-open');
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeCart();
        return;
      }

      if (event.key !== 'Tab' || !panelRef.current) {
        return;
      }

      const focusableElements = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      ).filter((element) => !element.hasAttribute('disabled'));
      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);

      if (!firstElement || !lastElement) {
        event.preventDefault();
      } else if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.classList.remove('cart-open');
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocusedRef.current?.focus();
    };
  }, [closeCart, isCartOpen]);

  const placeOrder = (): void => {
    if (cartItems.length === 0) {
      return;
    }

    closeCart();
    void navigate(routes.contact, {
      state: { cartItems: [...cartItems], cartTotal },
    });
  };

  return (
    <AnimatePresence>
      {isCartOpen ? (
        <motion.div
          animate={{ opacity: 1 }}
          aria-labelledby={`${cartDrawerId}-title`}
          aria-modal="true"
          className="fixed inset-0 z-[60] bg-navy/55 backdrop-blur-sm"
          exit={{ opacity: 0 }}
          id={cartDrawerId}
          initial={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeCart();
            }
          }}
          role="dialog"
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.24 }}
        >
          <motion.div
            ref={panelRef}
            animate={{ x: 0 }}
            className="ml-auto flex h-full w-[min(94vw,28rem)] flex-col border-l border-white/70 bg-[linear-gradient(155deg,rgb(255_255_255_/_0.98),rgb(224_242_254_/_0.95))] text-ink shadow-[-28px_0_80px_rgb(15_23_42_/_0.28)] backdrop-blur-3xl"
            exit={{ x: '100%' }}
            initial={{ x: '100%' }}
            onMouseDown={(event) => event.stopPropagation()}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className="flex items-center justify-between border-b border-gold/30 px-5 py-5 sm:px-6">
              <div className="flex items-center gap-3">
                <BrandLogo size="compact" />
                <div>
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-gold-deep">
                    {brand.shortName} Bakers
                  </p>
                  <h2
                    className="font-display text-2xl font-bold text-navy"
                    id={`${cartDrawerId}-title`}
                  >
                    Your cart
                  </h2>
                </div>
              </div>
              <button
                ref={closeButtonRef}
                aria-label="Close cart"
                className="focus-ring grid size-11 place-items-center rounded-full border border-gold/45 bg-white/80 text-navy shadow-sm transition hover:border-gold hover:text-gold-deep"
                onClick={closeCart}
                type="button"
              >
                <FiX aria-hidden="true" className="size-5" />
              </button>
            </header>

            {cartItems.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <span className="grid size-20 place-items-center rounded-full border border-gold/30 bg-white/75 text-gold-deep shadow-luxury">
                  <FiShoppingBag aria-hidden="true" className="size-8" />
                </span>
                <h3 className="mt-6 font-display text-2xl font-bold text-navy">
                  Your cart is empty
                </h3>
                <p className="mt-2 max-w-xs text-sm text-muted">
                  Add something delicious from the Azaan Bakers collection.
                </p>
                <button
                  className="focus-ring mt-6 rounded-full border border-gold/50 bg-white px-5 py-2.5 text-sm font-bold text-gold-deep transition hover:border-gold hover:bg-gold/10"
                  onClick={closeCart}
                  type="button"
                >
                  Continue browsing
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between px-5 pb-2 pt-4 sm:px-6">
                  <p className="text-sm font-semibold text-muted">
                    {cartCount} {cartCount === 1 ? 'item' : 'items'}
                  </p>
                  <button
                    className="focus-ring rounded-lg px-2 py-1 text-xs font-bold text-red-700 transition hover:bg-red-50"
                    onClick={clearCart}
                    type="button"
                  >
                    Clear cart
                  </button>
                </div>
                <ul className="flex-1 space-y-3 overflow-y-auto px-5 py-3 sm:px-6">
                  {cartItems.map((item) => (
                    <CartLine
                      item={item}
                      key={`${item.id}-${item.selectedVariant ?? 'standard'}`}
                      onDecrease={decreaseQuantity}
                      onIncrease={increaseQuantity}
                      onRemove={removeFromCart}
                    />
                  ))}
                </ul>
                <footer className="border-t border-gold/30 bg-white/60 px-5 py-5 backdrop-blur-xl sm:px-6">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
                        Total
                      </p>
                      <p className="mt-1 text-xs text-muted">
                        Delivery charges confirmed separately
                      </p>
                    </div>
                    <p className="font-display text-2xl font-bold text-navy">
                      {formatRupees(cartTotal)}
                    </p>
                  </div>
                  <button
                    className="focus-ring mt-5 w-full rounded-2xl border border-gold bg-gold px-5 py-3.5 font-bold text-navy shadow-[0_14px_30px_rgb(212_175_55_/_0.25)] transition hover:-translate-y-0.5 hover:bg-gold-hover"
                    onClick={placeOrder}
                    type="button"
                  >
                    Place Order
                  </button>
                </footer>
              </>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
