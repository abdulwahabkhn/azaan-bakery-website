import { CategoryTabs } from '@/components/products/CategoryTabs';
import { SearchBar } from '@/components/products/SearchBar';
import { SortDropdown } from '@/components/products/SortDropdown';

import type { ProductCategory, ProductFilters } from '@/types/product';

export interface FilterBarProps {
  filters: ProductFilters;
  categoryCounts: Readonly<Record<ProductCategory, number>>;
  totalCount: number;
  resultCount: number;
  onChange: (filters: ProductFilters) => void;
}

export const FilterBar = ({
  categoryCounts,
  filters,
  onChange,
  resultCount,
  totalCount,
}: FilterBarProps) => (
  <div className="mb-10 rounded-2xl border border-gold/40 bg-surface/95 p-4 shadow-[0_20px_60px_rgb(7_31_61_/_0.12)] backdrop-blur-2xl md:mb-12">
    <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
      <SearchBar value={filters.search} onChange={(search) => onChange({ ...filters, search })} />
      <div className="min-w-[13rem]">
        <SortDropdown value={filters.sort} onChange={(sort) => onChange({ ...filters, sort })} />
      </div>
    </div>
    <div className="mt-4">
      <CategoryTabs
        activeCategory={filters.category}
        categoryCounts={categoryCounts}
        onChange={(category) => onChange({ ...filters, category })}
        totalCount={totalCount}
      />
    </div>
    <p className="mt-4 text-sm font-semibold text-muted" aria-live="polite">
      {resultCount} {resultCount === 1 ? 'item' : 'items'} available
    </p>
  </div>
);
