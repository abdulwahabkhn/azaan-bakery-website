import { LazyImage } from '@/components/common/LazyImage';
import { Reveal } from '@/components/common/Reveal';
import { SectionHeading } from '@/components/common/SectionHeading';
import { bakeryImages, productImages } from '@/data/productImages';

const galleryItems = [
  {
    src: bakeryImages.building,
    alt: 'Azaan Bakers bakery building',
  },
  {
    src: productImages['Bounty Cake'],
    alt: 'Azaan Bakers Bounty Cake',
  },
  {
    src: productImages['Brownie Cake'],
    alt: 'Azaan Bakers Brownie Cake',
  },
  {
    src: productImages['Dairy Milk Cake'],
    alt: 'Azaan Bakers Dairy Milk Cake',
  },
  {
    src: productImages['KitKat Cake'],
    alt: 'Azaan Bakers KitKat Cake',
  },
  {
    src: productImages['Zinger Burger'],
    alt: 'Azaan Bakers Zinger Burger',
  },
] as const;

export const InstagramGallery = () => (
  <section data-nav-theme="light" className="section-padding bg-light-blue">
    <div className="container-luxury">
      <Reveal>
        <SectionHeading
          align="center"
          eyebrow="Instagram gallery"
          title="From the finishing table."
          description="A quiet look at studio textures, seasonal details, and gift-ready orders."
        />
      </Reveal>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {galleryItems.map((item, index) => (
          <Reveal delay={index * 0.05} key={item.alt}>
            <div className="group overflow-hidden rounded-[1.5rem] shadow-luxury">
              <LazyImage
                alt={item.alt}
                className="aspect-[4/5] transition duration-700 group-hover:scale-105"
                sizes="(min-width: 768px) 33vw, 100vw"
                src={item.src}
              />
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
