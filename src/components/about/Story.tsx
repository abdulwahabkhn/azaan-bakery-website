import { LazyImage } from '@/components/common/LazyImage';
import { Reveal } from '@/components/common/Reveal';
import { SectionHeading } from '@/components/common/SectionHeading';
import { bakeryImages } from '@/data/productImages';

export const Story = () => (
  <section data-nav-theme="light" className="section-padding bg-ivory">
    <div className="container-luxury grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <Reveal>
        <div className="overflow-hidden rounded-[1.8rem] shadow-luxury">
          <LazyImage
            alt="Azaan Bakers bakery building exterior"
            className="aspect-[4/5]"
            src={bakeryImages.building}
          />
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <SectionHeading
          eyebrow="Our story"
          title="A bakery built around patient detail."
          description="Azaan Bakers began with celebration cakes made for family tables, then grew into a trusted Jaranwala bakery for families who care about texture, balance, and presentation."
        />
        <p className="mt-6 text-coffee/78">
          Every cake is treated like a composed object: measured soak, controlled crumb, restrained
          sweetness, and a finish that photographs beautifully without feeling theatrical. The goal
          is simple: a dessert that arrives calm, generous, and memorable.
        </p>
      </Reveal>
    </div>
  </section>
);
