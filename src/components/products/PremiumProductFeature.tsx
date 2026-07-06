import { useState } from 'react';
import { FiCheck, FiShoppingBag } from 'react-icons/fi';

import threeMilkCakeImage from '@/assets/images/ThreeMilkMangoCake.webp';
import { BrandLogo } from '@/components/common/BrandLogo';
import { Button, ButtonLink } from '@/components/common/Button';
import { GoldenWheat } from '@/components/common/GoldenWheat';
import { LazyImage } from '@/components/common/LazyImage';
import { routes } from '@/constants/routes';
import { premiumPastry, premiumProduct } from '@/data/products';
import { useCart } from '@/hooks/useCart';
import { formatRupees } from '@/utils/cart';

const highlights = ['Three-milk soak', 'Fresh cream finish', 'Made in Jaranwala'] as const;

const PremiumProductVisual = () => (
  <div className="relative order-first h-[400px] overflow-hidden rounded-[2rem] border border-gold/45 bg-[linear-gradient(145deg,#FFF7E6,#ffffff_48%,#EEF9FE)] shadow-[0_28px_70px_rgb(7_31_61_/_0.28)] sm:h-[440px] lg:order-last lg:h-[600px]">
    <LazyImage
      alt="Azaan Bakers 3 Milk Mango Cake"
      className="scale-[1.02] object-cover"
      eager
      src={threeMilkCakeImage}
    />
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-[linear-gradient(180deg,rgb(30_41_59_/_0.04),transparent_48%,rgb(30_41_59_/_0.72))]"
    />
    <div
      aria-hidden="true"
      className="absolute -right-20 -top-20 size-64 rounded-full bg-primary/25 blur-3xl"
    />
    <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/45 bg-white/18 p-4 text-white shadow-luxury backdrop-blur-xl sm:bottom-7 sm:left-7 sm:right-7">
      <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-gold">
        Azaan Signature
      </p>
      <p className="mt-1 font-display text-2xl font-bold">3 Milk Mango Cake</p>
      <p className="mt-1 text-sm text-white/80">Soft sponge · Rich milk blend · Creamy finish</p>
    </div>
  </div>
);

export const PremiumProductFeature = () => {
  const [hasAdded, setHasAdded] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState('1 Pound');
  const { addToCart } = useCart();
  const featuredProduct = premiumProduct;
  const selectedPrice = featuredProduct?.variants?.find(
    (variant) => variant.label === selectedVariant,
  )?.price;

  if (!featuredProduct || selectedPrice === undefined || !featuredProduct.variants) {
    return null;
  }

  return (
    <section
      aria-labelledby="premium-product-title"
      className="bg-cream pb-16 pt-4 md:pb-24"
      data-nav-theme="light"
    >
      <div className="container-luxury">
        <div className="relative grid gap-4 overflow-hidden rounded-[2rem] border border-gold/35 bg-[linear-gradient(135deg,#071F3D_0%,#0B2D55_100%)] p-3 shadow-[0_30px_80px_rgb(7_31_61_/_0.24)] lg:grid-cols-[0.9fr_1.1fr] lg:gap-0">
          <GoldenWheat className="absolute -left-8 -top-10 z-10 hidden h-44 w-28 -rotate-12 opacity-25 md:block" />
          <GoldenWheat className="absolute -bottom-12 right-1/2 z-10 hidden h-40 w-24 rotate-[22deg] opacity-20 lg:block" />
          <div className="order-last flex flex-col justify-center p-5 md:p-10 lg:order-first lg:p-12">
            <div className="flex items-center justify-between gap-4">
              <BrandLogo size="compact" />
              <span className="rounded-full border border-gold/55 bg-gold/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-soft-gold">
                Seasonal
              </span>
            </div>
            <p className="eyebrow mt-7 text-primary before:bg-gold">Our premium product</p>
            <h2
              className="mt-5 text-balance font-display text-4xl font-bold leading-tight text-white md:text-6xl"
              id="premium-product-title"
            >
              3 Milk Mango Cake
            </h2>
            <p className="mt-6 max-w-xl text-white/68">
              Azaan Bakers signature premium dessert made with soft sponge cake soaked in rich three
              milk blend.
            </p>
            <div className="mt-7 grid gap-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {featuredProduct.variants.map((variant) => (
                <button
                  aria-pressed={selectedVariant === variant.label}
                  className={`focus-ring rounded-2xl border px-4 py-3 text-left transition ${
                    selectedVariant === variant.label
                      ? 'border-gold bg-gold/15'
                      : 'border-gold/25 bg-white/8 hover:border-gold/60'
                  }`}
                  key={variant.label}
                  onClick={() => setSelectedVariant(variant.label)}
                  type="button"
                >
                  <p className="text-xs font-bold text-white/75">{variant.label}</p>
                  <p className="mt-1 font-display text-xl font-bold text-soft-gold">
                    {formatRupees(variant.price)}
                  </p>
                </button>
              ))}
              {premiumPastry ? (
                <div className="rounded-2xl border border-gold/25 bg-white/8 px-4 py-3">
                  <p className="text-xs font-bold text-white/58">Pastry</p>
                  <p className="mt-1 font-display text-xl font-bold text-soft-gold">
                    {formatRupees(premiumPastry.price)}
                  </p>
                </div>
              ) : null}
            </div>
            <ul className="mt-7 grid gap-3 text-sm font-semibold text-white/85 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {highlights.map((highlight) => (
                <li className="flex items-center gap-2" key={highlight}>
                  <span className="grid size-6 place-items-center rounded-full bg-primary/15 text-primary">
                    <FiCheck aria-hidden="true" className="size-3.5" />
                  </span>
                  {highlight}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                icon={FiShoppingBag}
                iconPosition="left"
                onClick={() => {
                  addToCart(featuredProduct, selectedVariant);
                  setHasAdded(true);
                }}
                variant="gold"
              >
                {hasAdded ? 'Added to Cart' : 'Add To Cart'}
              </Button>
              <ButtonLink
                onClick={() => addToCart(featuredProduct, selectedVariant)}
                to={routes.contact}
                variant="dark"
              >
                Order Now
              </ButtonLink>
            </div>
            {hasAdded ? (
              <p aria-live="polite" className="mt-3 text-sm font-semibold text-sage">
                3 Milk Mango Cake ({selectedVariant}) added to your cart.
              </p>
            ) : null}
          </div>
          <PremiumProductVisual />
        </div>
      </div>
    </section>
  );
};
