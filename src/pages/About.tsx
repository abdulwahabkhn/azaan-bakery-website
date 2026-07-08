import { ButtonLink } from '@/components/common/Button';
import { BrandLogo } from '@/components/common/BrandLogo';
import { LazyImage } from '@/components/common/LazyImage';
import { SEO } from '@/components/common/SEO';
import { Ingredients } from '@/components/about/Ingredients';
import { Mission } from '@/components/about/Mission';
import { Owner } from '@/components/about/Owner';
import { Story } from '@/components/about/Story';
import { Timeline } from '@/components/about/Timeline';
import { Testimonials } from '@/components/testimonials/Testimonials';
import { routes } from '@/constants/routes';
import { bakeryImages } from '@/data/productImages';
import { FiArrowRight } from 'react-icons/fi';

const awards = ['Private celebrations', 'Wedding ateliers', 'Corporate gifting'] as const;

const About = () => (
  <>
    <SEO
      title="About Azaan Bakers | Bakery in Jaranwala"
      description="Learn about Azaan Bakers, a bakery in Jaranwala serving fresh cakes, bakery items, sweets, fast food, pizzas, burgers, and desserts."
      canonicalPath="/about"
    />
    <section
      data-nav-theme="blue"
      className="relative min-h-[78vh] overflow-hidden bg-cocoa pt-32 text-ivory md:pt-40"
    >
      <div className="absolute inset-0 opacity-44">
        <LazyImage
          alt="Azaan Bakers bakery building"
          className="h-full"
          eager
          src={bakeryImages.building}
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(7_31_61_/_0.92),rgb(11_45_85_/_0.46))]" />
      <div className="container-luxury relative z-10 flex min-h-[calc(78vh-8rem)] items-center">
        <div className="max-w-3xl pb-20">
          <BrandLogo className="mb-7" size="standard" />
          <p className="eyebrow text-primary before:bg-gold">About Azaan Bakery</p>
          <h1 className="mt-6 font-display text-5xl leading-tight md:text-7xl">
            A private bakery studio for intentional celebrations.
          </h1>
          <p className="mt-7 max-w-2xl text-lg text-ivory/78">
            We combine patient baking, modern finishing, and warm hospitality for cakes that feel
            elegant without losing the comfort of handmade food.
          </p>
        </div>
      </div>
    </section>
    <Story />
    <Mission />
    <Timeline />
    <Owner />
    <Ingredients />
    <section data-nav-theme="light" className="section-padding bg-warm-white">
      <div className="container-luxury">
        <p className="eyebrow">Awards placeholders</p>
        <h2 className="mt-5 max-w-2xl font-display text-4xl text-cocoa md:text-6xl">
          Recognition spaces ready for brand milestones.
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {awards.map((award) => (
            <div
              className="rounded-[1.5rem] border border-coffee/10 bg-ivory p-7 shadow-luxury"
              key={award}
            >
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-fig">{award}</p>
              <p className="mt-4 text-sm text-coffee/72">
                A refined content slot for press features, client notes, or event work.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
    <Testimonials />
    <section data-nav-theme="blue" className="section-padding bg-cocoa text-ivory">
      <div className="container-luxury flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="eyebrow text-gold before:bg-gold">Custom work</p>
          <h2 className="mt-5 max-w-2xl font-display text-4xl md:text-6xl">
            Bring the studio a table, a date, and a flavor direction.
          </h2>
        </div>
        <ButtonLink className="w-fit" icon={FiArrowRight} to={routes.contact} variant="gold">
          Start an order
        </ButtonLink>
      </div>
    </section>
  </>
);

export default About;
