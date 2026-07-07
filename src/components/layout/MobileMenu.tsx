import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { FiArrowUpRight, FiHome, FiInfo, FiMail, FiShoppingBag, FiX } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

import { BrandLogo } from '@/components/common/BrandLogo';
import { env } from '@/config/env';
import { brand } from '@/constants/brand';
import { routes } from '@/constants/routes';
import { useCart } from '@/hooks/useCart';
import { cx } from '@/utils/formatters';

import type { IconType } from 'react-icons';
import type { NavTheme } from '@/types/navigation';

export interface MobileMenuProps {
  isOpen: boolean;
  navTheme: NavTheme;
  onClose: () => void;
}

interface MobileNavItem {
  label: string;
  path: string;
  icon: IconType;
  end?: boolean;
}

const mobileNavItems: readonly MobileNavItem[] = [
  { label: 'Home', path: routes.home, icon: FiHome, end: true },
  { label: 'About', path: routes.about, icon: FiInfo },
  { label: 'Contact', path: routes.contact, icon: FiMail },
] as const;

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export const mobileMenuId = 'mobile-navigation-menu';

export const MobileMenu = ({ isOpen, navTheme, onClose }: MobileMenuProps) => {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { cartCount, openCart } = useCart();
  const isOverBlue = navTheme === 'blue';
  const whatsappHref = `https://wa.me/${env.whatsappNumber}?text=${encodeURIComponent(
    `Assalam-o-Alaikum! I'd like to place an order with ${brand.name}.`,
  )}`;

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.classList.add('menu-open');
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());
    const desktopViewport = window.matchMedia('(min-width: 768px)');

    const handleViewportChange = (event: MediaQueryListEvent): void => {
      if (event.matches) {
        onClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
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
        return;
      }

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    desktopViewport.addEventListener('change', handleViewportChange);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.classList.remove('menu-open');
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      document.removeEventListener('keydown', handleKeyDown);
      desktopViewport.removeEventListener('change', handleViewportChange);
      previouslyFocusedRef.current?.focus();
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          animate={{ opacity: 1 }}
          aria-labelledby={`${mobileMenuId}-title`}
          aria-modal="true"
          className="fixed inset-0 z-50 bg-navy/75 backdrop-blur-md md:hidden"
          exit={{ opacity: 0 }}
          id={mobileMenuId}
          initial={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
          role="dialog"
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.25 }}
        >
          <motion.div
            ref={panelRef}
            animate={{ x: 0 }}
            className={cx(
              'relative ml-auto flex h-full w-[min(91vw,25rem)] flex-col overflow-x-hidden overflow-y-auto border-l border-gold/35 p-5 text-white shadow-[-28px_0_80px_rgb(7_31_61_/_0.48)] backdrop-blur-3xl sm:p-6',
              isOverBlue
                ? 'bg-[linear-gradient(155deg,rgb(7_31_61_/_0.98),rgb(11_45_85_/_0.96))]'
                : 'bg-[linear-gradient(155deg,rgb(11_45_85_/_0.98),rgb(7_31_61_/_0.96))]',
            )}
            exit={{ x: '100%' }}
            initial={{ x: '100%' }}
            onMouseDown={(event) => event.stopPropagation()}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.46, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-primary/20 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 -left-24 size-64 rounded-full bg-gold/15 blur-3xl"
            />

            <div className="relative flex items-center justify-between border-b border-gold/35 pb-5">
              <NavLink
                aria-label={`${brand.name} home`}
                className="focus-ring flex items-center gap-3 rounded-2xl"
                onClick={onClose}
                to={routes.home}
              >
                <BrandLogo size="compact" />
                <span>
                  <span className="block font-display text-xl font-bold leading-none text-white">
                    {brand.shortName}
                  </span>
                  <span className="mt-1 block text-[0.58rem] font-bold uppercase tracking-[0.18em] text-gold-deep">
                    Bakers
                  </span>
                </span>
              </NavLink>
              <button
                ref={closeButtonRef}
                aria-label="Close navigation menu"
                className="focus-ring grid size-11 place-items-center rounded-full border border-gold/45 bg-white/10 text-white shadow-[0_10px_30px_rgb(7_31_61_/_0.25)] transition duration-300 hover:rotate-90 hover:border-gold hover:bg-gold hover:text-navy"
                onClick={onClose}
                type="button"
              >
                <FiX aria-hidden="true" className="size-5" />
              </button>
            </div>

            <div className="relative pt-6">
              <p
                className="text-xs font-bold uppercase tracking-[0.2em] text-gold-deep"
                id={`${mobileMenuId}-title`}
              >
                Explore Azaan
              </p>
              <nav aria-label="Mobile navigation" className="mt-3">
                <ul className="space-y-1.5">
                  {mobileNavItems.map(({ end, icon: Icon, label, path }, index) => (
                    <motion.li
                      animate={{ opacity: 1, x: 0 }}
                      initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 24 }}
                      key={label}
                      transition={{
                        delay: prefersReducedMotion ? 0 : 0.1 + index * 0.045,
                        duration: prefersReducedMotion ? 0.01 : 0.34,
                      }}
                    >
                      <NavLink
                        className={({ isActive }) =>
                          cx(
                            'group flex items-center gap-4 rounded-2xl border border-transparent px-4 py-3 text-base font-semibold text-white/85 transition duration-300 hover:border-primary/35 hover:bg-white/8 hover:text-white',
                            isActive &&
                              'border-gold/45 bg-gold/12 text-soft-gold shadow-[0_10px_28px_rgb(7_31_61_/_0.2)]',
                          )
                        }
                        end={end}
                        onClick={onClose}
                        to={path}
                      >
                        <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-gold/30 bg-white/8 text-gold transition group-hover:border-primary/55 group-hover:text-primary">
                          <Icon aria-hidden="true" className="size-4" />
                        </span>
                        <span>{label}</span>
                      </NavLink>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <button
                className="focus-ring mt-4 flex items-center justify-between rounded-2xl border border-gold bg-gold px-4 py-3 text-navy shadow-[0_16px_36px_rgb(212_175_55_/_0.2)] transition duration-300 hover:-translate-y-0.5 hover:bg-gold-hover"
                onClick={() => {
                  onClose();
                  openCart();
                }}
                type="button"
              >
                <span className="flex items-center gap-3 font-semibold">
                  <FiShoppingBag aria-hidden="true" className="size-5 text-navy" />
                  Cart
                </span>
                <span className="text-xs text-navy/65">
                  {cartCount} {cartCount === 1 ? 'item' : 'items'}
                </span>
              </button>
            </div>

            <div className="relative mt-auto pt-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/70" />
                <p className="font-display text-sm italic text-soft-gold">{brand.tagline}</p>
                <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/70" />
              </div>
              <a
                className="focus-ring flex w-full items-center justify-between rounded-2xl border border-primary/45 bg-primary px-4 py-3.5 font-bold text-navy shadow-[0_16px_34px_rgb(34_184_240_/_0.2)] transition duration-300 hover:-translate-y-0.5 hover:bg-primary-hover"
                href={whatsappHref}
                onClick={onClose}
                rel="noreferrer"
                target="_blank"
              >
                <span className="flex items-center gap-3">
                  <FaWhatsapp aria-hidden="true" className="size-5" />
                  Order on WhatsApp
                </span>
                <FiArrowUpRight aria-hidden="true" className="size-4" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
