import { FiArrowUpRight, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { NewsletterForm } from '@/components/contact/NewsletterForm';
import { BrandLogo } from '@/components/common/BrandLogo';
import { GoldenWheat } from '@/components/common/GoldenWheat';
import { brand, businessInfo, socialLinks } from '@/constants/brand';
import { navItems, routes } from '@/constants/routes';
import { productCategories } from '@/types/product';

export const Footer = () => (
  <footer
    data-nav-theme="blue"
    className="relative overflow-hidden border-t border-gold/40 bg-navy text-white"
  >
    <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top,#22B8F0_0%,transparent_68%)] opacity-12" />
    <GoldenWheat className="absolute -bottom-12 right-2 hidden h-64 w-40 -rotate-12 opacity-30 md:block" />
    <GoldenWheat className="absolute -left-12 top-20 hidden h-52 w-32 rotate-12 opacity-15 lg:block" />
    <div className="container-luxury py-16 md:py-20">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[1.25fr_0.75fr_0.9fr_1fr_1.15fr]">
        <div>
          <Link aria-label={`${brand.name} home`} className="inline-flex" to="/">
            <BrandLogo size="standard" />
          </Link>
          <p className="mt-6 max-w-sm font-display text-lg italic text-white/80">{brand.tagline}</p>
          <p className="mt-2 text-sm font-semibold text-primary">{brand.location}</p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">Explore</h2>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  className="inline-flex items-center gap-2 transition hover:text-gold"
                  to={item.path}
                >
                  {item.label}
                  <FiArrowUpRight aria-hidden="true" className="size-3" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
            Categories
          </h2>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            {productCategories.slice(0, 6).map((category) => (
              <li key={category}>
                <Link className="transition hover:text-primary" to={routes.products}>
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">Contact</h2>
          <ul className="mt-5 space-y-4 text-sm text-white/70">
            <li className="flex gap-3">
              <FiMapPin aria-hidden="true" className="mt-1 size-4 shrink-0 text-primary" />
              <span>{businessInfo.address}</span>
            </li>
            <li>
              <a
                className="flex items-center gap-3 transition hover:text-primary"
                href={`tel:${businessInfo.phone}`}
              >
                <FiPhone aria-hidden="true" className="size-4 shrink-0 text-gold" />
                {businessInfo.phone}
              </a>
            </li>
            <li>
              <a
                className="flex items-center gap-3 break-all transition hover:text-primary"
                href={`mailto:${businessInfo.email}`}
              >
                <FiMail aria-hidden="true" className="size-4 shrink-0 text-gold" />
                {businessInfo.email}
              </a>
            </li>
          </ul>
          <div className="mt-6 flex gap-3">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                aria-label={label}
                className="focus-ring grid size-10 place-items-center rounded-full border border-white/15 text-white/75 transition hover:border-gold hover:text-gold"
                href={href}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Icon aria-hidden="true" className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
            Bakery Notes
          </h2>
          <p className="mt-5 text-sm text-white/70">
            Seasonal drops, tasting appointments, and limited celebration finishes.
          </p>
          <ul className="mt-4 space-y-2 text-xs text-white/55">
            {businessInfo.hours.map((hour) => (
              <li key={hour}>{hour}</li>
            ))}
          </ul>
          <div className="mt-5">
            <NewsletterForm compact />
          </div>
        </div>
      </div>

      <div className="mt-14 flex flex-col gap-4 border-t border-gold/25 pt-7 text-sm text-white/55 md:flex-row md:items-center md:justify-between">
        <p>
          Copyright {new Date().getFullYear()} {brand.name}. All rights reserved.
        </p>
        <p>Taste of Love & Purity | Jaranwala</p>
      </div>
    </div>
  </footer>
);
