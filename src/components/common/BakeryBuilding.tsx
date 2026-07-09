import { useState } from 'react';
import { FiMapPin } from 'react-icons/fi';

import { LazyImage } from '@/components/common/LazyImage';
import { Reveal } from '@/components/common/Reveal';
import { SectionHeading } from '@/components/common/SectionHeading';
import { bakeryImages } from '@/data/productImages';

export const BakeryBuilding = () => {
  const [hasImageError, setHasImageError] = useState(false);

  return (
    <section data-nav-theme="light" className="section-padding overflow-hidden bg-page">
      <div className="container-luxury grid items-center gap-12 lg:grid-cols-[0.72fr_1.28fr]">
        <Reveal>
          <div>
            <SectionHeading
              eyebrow="Our home in Jaranwala"
              title="A neighborhood bakery, finished with care."
              description="Visit Azaan Bakers for fresh bakes, celebration orders, and the familiar warmth of a local bakery made a little more special."
            />
            <p className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-chocolate">
              <FiMapPin aria-hidden="true" className="size-4 text-gold-deep" />
              Jaranwala, Pakistan
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="relative min-h-[22rem] overflow-hidden rounded-3xl border border-border bg-warm-white shadow-luxury sm:min-h-[28rem]">
            {!hasImageError ? (
              <LazyImage
                alt="Azaan Bakers storefront"
                className="absolute inset-0"
                onError={() => setHasImageError(true)}
                sizes="(min-width: 1024px) 60vw, 100vw"
                src={bakeryImages.building}
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center p-8 text-center">
                <p className="font-display text-xl font-bold text-navy">
                  Bakers storefront image missing
                </p>
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_68%,rgb(7_31_61_/_0.28))]" />
            <div className="absolute bottom-5 left-5 rounded-full border border-gold/40 bg-navy/85 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white backdrop-blur sm:bottom-6 sm:left-6">
              Azaan Bakers · Jaranwala
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
