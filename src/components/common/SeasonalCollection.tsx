import { FiArrowRight } from 'react-icons/fi';

import { ButtonLink } from '@/components/common/Button';
import { LazyImage } from '@/components/common/LazyImage';
import { seasonalProducts } from '@/data/products';
import { routes } from '@/constants/routes';
import { formatCurrency } from '@/utils/formatters';

const [seasonalFeature] = seasonalProducts;

export const SeasonalCollection = () => {
  if (!seasonalFeature) {
    return null;
  }

  return (
    <section data-nav-theme="blue" className="section-padding bg-cocoa text-ivory">
      <div className="container-luxury grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="eyebrow text-gold before:bg-gold">Seasonal collection</p>
          <h2 className="mt-5 font-display text-4xl md:text-6xl">
            Mango, fig, and honey notes for warm celebrations.
          </h2>
          <p className="mt-6 max-w-xl text-ivory/72">
            Limited cakes rotate with fruit quality and studio capacity. Each finish is prepared in
            small batches to preserve softness, gloss, and clean flavor.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <ButtonLink icon={FiArrowRight} to={routes.products} variant="gold">
              View collection
            </ButtonLink>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-gold">
              From {formatCurrency(seasonalFeature.price)}
            </p>
          </div>
        </div>
        <div className="overflow-hidden rounded-[1.8rem] border border-ivory/12 shadow-lift">
          <LazyImage
            alt={seasonalFeature.alt}
            className="aspect-[5/4]"
            src={seasonalFeature.image}
          />
        </div>
      </div>
    </section>
  );
};
