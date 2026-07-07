import { HeroCTA } from '@/components/hero/HeroCTA';
import { BrandLogo } from '@/components/common/BrandLogo';

export const HeroContent = () => (
  <div className="max-w-2xl">
    <BrandLogo className="mb-4" size="hero" />
    <p className="inline-flex max-w-full rounded-full border border-gold/45 bg-warm-white/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-gold-deep shadow-sm [overflow-wrap:anywhere]">
      Azaan Bakery Jaranwala
    </p>
    <h1 className="mt-5 text-balance font-display text-[clamp(2rem,6vw,4.5rem)] font-bold leading-[1.04] text-navy">
      Crafted with Love & Tradition
    </h1>
    <p className="mt-4 max-w-xl text-base leading-7 text-ink/75 md:text-lg">
      Fresh cakes, pastries, biscuits, fast food, and everyday bakery favorites made with care in
      Jaranwala.
    </p>
    <div className="mt-6">
      <HeroCTA />
    </div>
  </div>
);
