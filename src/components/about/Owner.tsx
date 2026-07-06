import { LazyImage } from '@/components/common/LazyImage';
import { SectionHeading } from '@/components/common/SectionHeading';
import { productImages } from '@/data/productImages';

export const Owner = () => (
  <section data-nav-theme="light" className="section-padding bg-cream">
    <div className="container-luxury grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
      <div>
        <SectionHeading
          eyebrow="Founder's note"
          title="Luxury is restraint, timing, and care."
          description="The studio is led with a simple belief: a cake should never need to shout to feel special."
        />
        <blockquote className="mt-8 border-l border-gold pl-6 text-xl leading-9 text-coffee">
          "We design desserts for real moments: birthdays, dinners, weddings, and quiet gifts. The
          work is in making each one feel calm, fresh, and personal."
        </blockquote>
      </div>
      <div className="overflow-hidden rounded-[1.8rem] shadow-luxury">
        <LazyImage
          alt="Azaan Bakers Red Velvet Cake"
          className="aspect-[4/5]"
          src={productImages['Red Velvet Cake (2 Pound)']}
        />
      </div>
    </div>
  </section>
);
