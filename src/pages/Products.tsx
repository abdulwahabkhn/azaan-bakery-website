import { useCallback, useMemo, useState } from 'react';

import { FilterBar } from '@/components/products/FilterBar';
import { ProductGrid } from '@/components/products/ProductGrid';
import { PremiumProductFeature } from '@/components/products/PremiumProductFeature';
import { GoldenWheat } from '@/components/common/GoldenWheat';
import { SEO } from '@/components/common/SEO';
import { SectionHeading } from '@/components/common/SectionHeading';
import { premiumCakes, products } from '@/data/products';
import { useFavorites } from '@/hooks/useFavorites';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { filterProducts } from '@/utils/productFilters';

import { productCategories } from '@/types/product';

import type { ProductCategory, ProductFilters } from '@/types/product';

const initialFilters: ProductFilters = {
  category: 'All',
  search: '',
  sort: 'signature',
};

const Products = () => {
  const [filters, setFilters] = useState<ProductFilters>(initialFilters);
  const { favorites, toggleFavorite } = useFavorites();
  const debouncedSearch = useDebouncedValue(filters.search, 300);
  const handleFilterChange = useCallback((nextFilters: ProductFilters): void => {
    setFilters(nextFilters);
  }, []);

  const categoryCounts = useMemo(() => {
    const counts = Object.fromEntries(productCategories.map((category) => [category, 0])) as Record<
      ProductCategory,
      number
    >;

    products.forEach((product) => {
      counts[product.category] += 1;
    });

    return counts;
  }, []);

  const catalogSummary = useMemo(
    () => [
      { label: 'Total Items', value: products.length.toString() },
      {
        label: 'Categories',
        value: Object.values(categoryCounts)
          .filter((count) => count > 0)
          .length.toString(),
      },
      { label: 'Premium Cakes', value: premiumCakes.length.toString() },
    ],
    [categoryCounts],
  );

  const filteredProducts = useMemo(
    () =>
      filterProducts(products, {
        category: filters.category,
        search: debouncedSearch,
        sort: filters.sort,
      }),
    [debouncedSearch, filters.category, filters.sort],
  );

  return (
    <>
      <SEO
        title="Products | Azaan Bakers"
        description="Explore cakes, pastries, fast food, gifts, bakarkhani, and bakery products from Azaan Bakers in Jaranwala."
        canonicalPath="/products"
      />
      <section
        data-nav-theme="blue"
        className="relative overflow-hidden bg-[linear-gradient(135deg,#071F3D_0%,#0B2D55_68%,#22B8F0_160%)] pb-14 pt-36 md:pt-44"
      >
        <GoldenWheat className="absolute -left-10 bottom-0 hidden h-60 w-36 -rotate-12 opacity-25 md:block" />
        <GoldenWheat className="absolute -right-8 top-24 hidden h-52 w-32 rotate-12 opacity-20 md:block" />
        <div className="container-luxury relative">
          <SectionHeading
            className="[&_.eyebrow]:text-gold [&_h1]:text-white [&_h1~p]:text-slate-300"
            eyebrow="Azaan Bakers catalogue"
            headingLevel="h1"
            title="Fresh favorites for every Jaranwala table."
            description="Discover premium cakes, pastries, desserts, pizzas, and savoury bakery favorites with clear size and serving prices."
          />
        </div>
      </section>

      <section className="bg-cream py-8 md:py-10" data-nav-theme="light">
        <div className="container-luxury grid gap-3 sm:grid-cols-3">
          {catalogSummary.map((item) => (
            <div
              className="rounded-2xl border border-gold/35 bg-white p-5 shadow-[0_12px_32px_rgb(7_31_61_/_0.08)]"
              key={item.label}
            >
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-muted">
                {item.label}
              </p>
              <p className="mt-2 font-display text-2xl font-bold text-navy">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <PremiumProductFeature />

      <section
        className="section-padding relative overflow-hidden bg-[linear-gradient(145deg,#071F3D_0%,#0B2D55_72%,#083B67_100%)]"
        data-nav-theme="blue"
      >
        <GoldenWheat className="absolute -left-6 top-12 hidden h-72 w-44 -rotate-12 opacity-30 md:block" />
        <GoldenWheat className="absolute -right-6 bottom-2 hidden h-72 w-44 rotate-[18deg] scale-x-[-1] opacity-25 md:block" />
        <div className="container-luxury relative">
          <SectionHeading
            className="[&_.eyebrow]:text-gold [&_h2]:text-white [&_h2~p]:text-white/65"
            eyebrow="Premium Cakes"
            title="Premium Cake Collection"
            description="Seven rich premium cakes for celebrations, gifting, and serious dessert cravings."
          />
          <div className="mt-10">
            <ProductGrid
              favorites={favorites}
              onFavoriteToggle={toggleFavorite}
              premiumLayout
              products={premiumCakes}
            />
          </div>
        </div>
      </section>

      <section data-nav-theme="light" className="section-padding relative overflow-hidden bg-cream">
        <GoldenWheat className="absolute -left-8 top-24 hidden h-64 w-40 -rotate-12 text-gold opacity-18 md:block" />
        <GoldenWheat className="absolute -right-6 bottom-16 hidden h-72 w-44 rotate-[18deg] scale-x-[-1] text-gold opacity-16 md:block" />
        <div className="container-luxury relative">
          <SectionHeading
            className="mb-10"
            eyebrow="Complete bakery menu"
            title="Find a favorite for every craving."
            description="Browse cakes, pastries, desserts, pizzas, and savoury bakery classics, all arranged for quick ordering."
          />
          <FilterBar
            categoryCounts={categoryCounts}
            filters={filters}
            onChange={handleFilterChange}
            resultCount={filteredProducts.length}
            totalCount={products.length}
          />
          <div>
            <ProductGrid
              catalogLayout
              favorites={favorites}
              onFavoriteToggle={toggleFavorite}
              products={filteredProducts}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
