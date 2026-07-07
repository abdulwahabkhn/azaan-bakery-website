import { HeroCTA } from '@/components/hero/HeroCTA';
import { BrandLogo } from '@/components/common/BrandLogo';

export const HeroContent = () => (
  <div className="max-w-2xl pt-28 lg:pt-0">
    <BrandLogo className="mb-5" size="hero" />
    <p className="inline-flex max-w-full rounded-full border border-gold/45 bg-warm-white/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-gold-deep shadow-sm [overflow-wrap:anywhere]">
      Azaan Bakery Jaranwala
    </p>
    <h1 className="mt-6 text-balance font-display text-4xl font-bold leading-[1.04] text-navy sm:text-6xl lg:text-7xl xl:text-8xl">
      Crafted with Love & Tradition
    </h1>
    <p className="mt-6 max-w-xl text-base leading-8 text-ink/75 sm:text-lg md:text-xl">
      Azaan Bakers brings Jaranwala fresh cakes, pastries, biscuits, fast food, and everyday bakery
      favorites made with care, quality ingredients, and premium taste.
    </p>
    <div className="mt-8">
      <HeroCTA />
    </div>
  </div>
);
