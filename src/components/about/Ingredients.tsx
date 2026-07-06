import { LazyImage } from '@/components/common/LazyImage';
import { ButtonLink } from '@/components/common/Button';
import { craftValues } from '@/data/about';
import { productImages } from '@/data/productImages';
import { routes } from '@/constants/routes';
import { FiArrowRight } from 'react-icons/fi';

export const Ingredients = () => (
  <section data-nav-theme="light" className="section-padding bg-ivory">
    <div className="container-luxury grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <div className="overflow-hidden rounded-[1.8rem] shadow-luxury">
        <LazyImage
          alt="Azaan Bakers Brownie Cake"
          className="aspect-[5/4]"
          src={productImages['Brownie Cake']}
        />
      </div>
      <div>
        <p className="eyebrow">Ingredients</p>
        <h2 className="mt-5 font-display text-4xl text-cocoa md:text-6xl">
          Freshness you can taste before the sweetness.
        </h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {craftValues.map((value) => (
            <div className="rounded-[1.2rem] border border-coffee/10 bg-warm-white p-5" key={value}>
              <p className="text-sm font-semibold text-coffee">{value}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <ButtonLink icon={FiArrowRight} to={routes.contact} variant="primary">
            Discuss a custom cake
          </ButtonLink>
        </div>
      </div>
    </div>
  </section>
);
