import { motion } from 'framer-motion';
import { useCallback, useState } from 'react';
import { FiMenu, FiShoppingBag } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

import { BrandLogo } from '@/components/common/BrandLogo';
import { cartDrawerId } from '@/components/cart/CartDrawer';
import { MobileMenu, mobileMenuId } from '@/components/layout/MobileMenu';
import { brand } from '@/constants/brand';
import { navItems, routes } from '@/constants/routes';
import { useCart } from '@/hooks/useCart';
import { useNavSectionTheme } from '@/hooks/useNavSectionTheme';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { cx } from '@/utils/formatters';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const { cartCount, isCartOpen, openCart } = useCart();
  const hasScrolled = useScrollPosition(18);
  const navTheme = useNavSectionTheme();
  const isOverBlue = navTheme === 'blue';

  return (
    <>
      <motion.header
        animate={{ y: 0 }}
        className={cx(
          'fixed inset-x-0 top-0 z-40 transition-all duration-300',
          hasScrolled ? 'py-3' : 'py-5',
        )}
        initial={{ y: -90 }}
      >
        <div
          className={cx(
            'container-luxury flex h-16 items-center justify-between rounded-full border px-4 backdrop-blur-2xl transition-all duration-500 md:px-5',
            isOverBlue
              ? 'border-gold/35 bg-warm-white/92 shadow-[0_14px_42px_rgb(7_31_61_/_0.2)]'
              : 'border-gold/35 bg-warm-white/90 shadow-[0_14px_42px_rgb(7_31_61_/_0.14)]',
          )}
          data-theme={navTheme}
        >
          <NavLink
            aria-label={`${brand.name} home`}
            className="flex min-w-0 items-center gap-3 rounded-full focus-ring"
            to={routes.home}
          >
            <BrandLogo size="compact" />
            <span className="min-w-0">
              <span
                className={cx(
                  'hidden text-[0.68rem] font-semibold uppercase tracking-[0.16em] sm:block',
                  isOverBlue ? 'text-gold-deep' : 'text-catalog',
                )}
              >
                Taste of Love & Purity
              </span>
            </span>
          </NavLink>

          <nav aria-label="Primary navigation" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    className={({ isActive }) =>
                      cx(
                        'relative rounded-full px-4 py-2 text-sm font-semibold text-navy transition hover:text-catalog',
                        'after:absolute after:inset-x-4 after:bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100',
                        isOverBlue ? 'after:bg-gold' : 'after:bg-catalog',
                        isActive && 'font-bold text-navy after:scale-x-100',
                      )
                    }
                    end={item.path === routes.home}
                    to={item.path}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <NavLink
              className="focus-ring hidden rounded-full border border-gold bg-gold px-4 py-2.5 text-sm font-bold text-navy shadow-[0_10px_24px_rgb(212_175_55_/_0.26)] transition hover:-translate-y-0.5 hover:bg-gold-hover lg:inline-flex"
              to={routes.contact}
            >
              Order now
            </NavLink>
            <button
              aria-controls={cartDrawerId}
              aria-expanded={isCartOpen}
              aria-haspopup="dialog"
              aria-label={`Open cart, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
              className={cx(
                'focus-ring relative grid size-11 place-items-center rounded-full border border-gold/55 bg-navy text-white shadow-[0_10px_24px_rgb(7_31_61_/_0.24)] transition duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-navy-soft',
              )}
              onClick={openCart}
              type="button"
            >
              <FiShoppingBag aria-hidden="true" className="size-4" />
              {cartCount > 0 ? (
                <span className="absolute -right-1 -top-1 grid min-h-5 min-w-5 place-items-center rounded-full border-2 border-white bg-gold px-1 text-[0.65rem] font-black leading-none text-navy">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              ) : null}
            </button>
            <button
              aria-controls={mobileMenuId}
              aria-expanded={isMenuOpen}
              aria-haspopup="dialog"
              aria-label="Open navigation menu"
              className={cx(
                'focus-ring grid size-11 place-items-center rounded-full border border-gold/55 bg-navy text-white shadow-[0_10px_24px_rgb(7_31_61_/_0.24)] transition duration-300 md:hidden',
              )}
              onClick={() => setIsMenuOpen(true)}
              type="button"
            >
              <FiMenu aria-hidden="true" className="size-5" />
            </button>
          </div>
        </div>
      </motion.header>
      <MobileMenu isOpen={isMenuOpen} navTheme={navTheme} onClose={closeMenu} />
    </>
  );
};
