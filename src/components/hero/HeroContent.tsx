import { HeroCTA } from '@/components/hero/HeroCTA';
import { BrandLogo } from '@/components/common/BrandLogo';

const trustIndicators = ['Fresh daily', 'Pure ingredients', 'Made with care'] as const;

export const HeroContent = () => (
  <div className="max-w-2xl pt-28 lg:pt-0">
    <BrandLogo className="mb-6" size="hero" />
    <p className="eyebrow text-catalog before:bg-gold">Azaan Bakers | Jaranwala, Pakistan</p>
    <h1 className="mt-6 text-balance font-display text-5xl font-bold leading-[1.02] text-navy sm:text-6xl lg:text-7xl xl:text-8xl">
      Crafted with Love & Tradition
    </h1>
    <p className="mt-7 max-w-xl text-lg text-ink/75 md:text-xl">
      Azaan Bakers brings Jaranwala fresh cakes, pastries, biscuits, fast food, and everyday bakery
      favorites made with care, quality ingredients, and premium taste.
    </p>
    <div className="mt-9">
      <HeroCTA />
    </div>
    <dl className="mt-10 grid max-w-xl grid-cols-3 gap-3">
      {trustIndicators.map((indicator) => (
        <div
          key={indicator}
          className="rounded-2xl border border-gold/35 bg-warm-white/88 p-4 shadow-[0_12px_30px_rgb(7_31_61_/_0.1)] backdrop-blur"
        >
          <dt className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-gold">
            Our promise
          </dt>
          <dd className="mt-2 text-sm font-semibold text-navy">{indicator}</dd>
        </div>
      ))}
    </dl>
  </div>
);
