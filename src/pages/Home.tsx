import { FiArrowRight } from 'react-icons/fi';

import { ButtonLink } from '@/components/common/Button';
import { BakeryBuilding } from '@/components/common/BakeryBuilding';
import { InstagramGallery } from '@/components/common/InstagramGallery';
import { NewsletterSection } from '@/components/contact/NewsletterSection';
import { Reveal } from '@/components/common/Reveal';
import { SEO } from '@/components/common/SEO';
import { SeasonalCollection } from '@/components/common/SeasonalCollection';
import { SectionHeading } from '@/components/common/SectionHeading';
import { WhyChooseUs } from '@/components/common/WhyChooseUs';
import { Hero } from '@/components/hero/Hero';
import { ProductGrid } from '@/components/products/ProductGrid';
import { Testimonials } from '@/components/testimonials/Testimonials';
import { brand } from '@/constants/brand';
import { routes } from '@/constants/routes';
import { seoPages } from '@/constants/seo';
import { bestSellerProducts, featuredProducts } from '@/data/products';
import { useFavorites } from '@/hooks/useFavorites';

const bakeryStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Bakery',
  name: brand.name,
  address: brand.location,
  servesCuisine: 'Bakery, Cakes, Patisserie',
  priceRange: '$$',
} as const;

const Home = () => {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <>
      <SEO page={seoPages.home} structuredData={bakeryStructuredData} />
      <Hero />

      <section data-nav-theme="light" className="section-padding bg-light-blue">
        <div className="container-luxury">
          <Reveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeading
                eyebrow="Fresh from Azaan Bakery"
                title="Beautiful bakes, made to be remembered."
                description="Our signature cakes pair soft textures, balanced sweetness, and careful finishing for Jaranwala celebrations of every size."
              />
              <ButtonLink
                className="w-fit"
                icon={FiArrowRight}
                to={routes.products}
                variant="secondary"
              >
                Full catalogue
              </ButtonLink>
            </div>
          </Reveal>
          <div className="mt-12">
            <ProductGrid
              favorites={favorites}
              onFavoriteToggle={toggleFavorite}
              products={featuredProducts}
            />
          </div>
        </div>
      </section>

      <WhyChooseUs />

      <BakeryBuilding />

      <section data-nav-theme="light" className="section-padding bg-light-blue">
        <div className="container-luxury">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Best sellers"
              title="Client favorites for elegant celebrations."
              description="Reliable textures, photogenic finishes, and flavors that stay graceful after the first bite."
            />
          </Reveal>
          <div className="mt-12">
            <ProductGrid
              favorites={favorites}
              onFavoriteToggle={toggleFavorite}
              products={bestSellerProducts}
            />
          </div>
        </div>
      </section>

      <SeasonalCollection />
      <Testimonials />
      <InstagramGallery />
      <NewsletterSection />
    </>
  );
};

export default Home;
