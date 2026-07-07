import { useMemo, useRef, useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';

import { LazyImage } from '@/components/common/LazyImage';
import { Reveal } from '@/components/common/Reveal';
import { SEO } from '@/components/common/SEO';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Hero } from '@/components/hero/Hero';
import { ProductGrid } from '@/components/products/ProductGrid';
import { brand } from '@/constants/brand';
import { seoPages } from '@/constants/seo';
import { products } from '@/data/products';
import { useFavorites } from '@/hooks/useFavorites';
import { productCategories } from '@/types/product';
import { cx } from '@/utils/formatters';

import type { ProductCategory } from '@/types/product';

type CategorySelection = ProductCategory | 'All';

interface CategoryCard {
  label: string;
  value: CategorySelection;
  image: string;
  count: number;
}

const homeCategoryOrder = [
  'Premium Cakes',
  'Pizzas',
  'Three Milk Cakes',
  'Burgers',
  'Cakes',
  'Shawarma & Wrap',
  'Pastries',
  'Hot Wings & Nuggets',
  'Desserts',
  'Spring Roll & Sandwich',
  'Sweet',
  'Pasta & Fries',
  'Biscuits',
  'Dry Cakes',
  'Nimko',
  'Bread',
  'Rusk',
] as const satisfies readonly ProductCategory[];

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
  const [selectedCategory, setSelectedCategory] = useState<CategorySelection>('Premium Cakes');
  const productGridRef = useRef<HTMLDivElement | null>(null);

  const categoryCards = useMemo<CategoryCard[]>(() => {
    const categoryProductsByName = new Map(
      productCategories.map((category) => [
        category,
        products.filter((product) => product.category === category),
      ]),
    );
    const orderedCategories = [
      ...homeCategoryOrder,
      ...productCategories.filter((category) => !homeCategoryOrder.includes(category)),
    ];
    const categoryItems = orderedCategories.flatMap<CategoryCard>((category) => {
      const categoryProducts = categoryProductsByName.get(category) ?? [];
      const image = categoryProducts[0]?.image;

      return image
        ? [
            {
              label: category,
              value: category,
              image,
              count: categoryProducts.length,
            },
          ]
        : [];
    });
    const allProductsImage = products[0]?.image;

    return allProductsImage
      ? [
          ...categoryItems,
          {
            label: 'All Products',
            value: 'All',
            image: allProductsImage,
            count: products.length,
          },
        ]
      : categoryItems;
  }, []);

  const selectedProducts = useMemo(
    () =>
      selectedCategory === 'All'
        ? products
        : products.filter((product) => product.category === selectedCategory),
    [selectedCategory],
  );
  const selectedTitle = selectedCategory === 'All' ? 'All Products' : selectedCategory;
  const selectedCountLabel = `${selectedProducts.length} ${
    selectedProducts.length === 1 ? 'item' : 'items'
  }`;

  const handleCategorySelect = (category: CategorySelection): void => {
    setSelectedCategory(category);
    window.requestAnimationFrame(() => {
      productGridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  return (
    <>
      <SEO page={seoPages.home} structuredData={bakeryStructuredData} />
      <Hero />

      <section
        className="section-padding bg-[linear-gradient(180deg,#FFF7E6_0%,#EEF9FE_100%)]"
        data-nav-theme="light"
        id="categories"
      >
        <div className="container-luxury">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="mx-auto inline-flex max-w-full rounded-full border border-gold/45 bg-warm-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-gold-deep shadow-sm [overflow-wrap:anywhere]">
                Azaan Bakery Jaranwala
              </p>
              <SectionHeading
                align="center"
                className="mt-5"
                eyebrow="Fresh catalogue"
                title="Explore Our Categories"
                description="Fresh cakes, bakery items, fast food, pizzas, sweets, and more from Azaan Bakery Jaranwala."
              />
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
            {categoryCards.map((category) => {
              const isSelected = selectedCategory === category.value;

              return (
                <button
                  aria-pressed={isSelected}
                  className={cx(
                    'focus-ring group relative min-w-0 overflow-hidden rounded-2xl border text-left shadow-[0_16px_38px_rgb(7_31_61_/_0.12)] transition duration-300 hover:-translate-y-1 hover:shadow-lift',
                    isSelected ? 'border-gold bg-navy' : 'border-white/80 bg-surface',
                  )}
                  key={category.value}
                  onClick={() => handleCategorySelect(category.value)}
                  type="button"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-light-blue">
                    <LazyImage
                      alt={category.label}
                      className="transition duration-700 group-hover:scale-105"
                      sizes="(min-width: 1280px) 20vw, (min-width: 768px) 25vw, 50vw"
                      src={category.image}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,rgb(7_31_61_/_0.84))]" />
                    <span
                      className={cx(
                        'absolute left-2 top-2 rounded-full border px-2 py-1 text-[0.58rem] font-bold uppercase tracking-[0.08em] shadow-sm sm:left-3 sm:top-3 sm:text-[0.64rem]',
                        isSelected
                          ? 'border-gold bg-gold text-navy'
                          : 'border-white/50 bg-white/90 text-navy',
                      )}
                    >
                      {category.count} {category.count === 1 ? 'item' : 'items'}
                    </span>
                    <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                      <h3 className="break-words font-display text-base font-bold leading-tight text-white [overflow-wrap:anywhere] sm:text-lg">
                        {category.label}
                      </h3>
                      <p className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-soft-gold">
                        View products
                        <FiArrowRight
                          aria-hidden="true"
                          className="size-3 transition group-hover:translate-x-0.5"
                        />
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="scroll-mt-28 pt-12" ref={productGridRef}>
            <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-deep">
                  {selectedCountLabel}
                </p>
                <h2 className="mt-2 break-words font-display text-3xl font-bold leading-tight text-navy [overflow-wrap:anywhere] sm:text-4xl">
                  {selectedTitle}
                </h2>
              </div>
              <p className="max-w-md text-sm text-muted">
                Select your favorite item and add it to cart.
              </p>
            </div>
            <ProductGrid
              catalogLayout={selectedCategory !== 'Premium Cakes'}
              favorites={favorites}
              onFavoriteToggle={toggleFavorite}
              premiumLayout={selectedCategory === 'Premium Cakes'}
              products={selectedProducts}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
