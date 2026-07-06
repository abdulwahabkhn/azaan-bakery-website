import { productCategories, type ProductCategory } from '@/types/product';
import { cx } from '@/utils/formatters';

export interface CategoryTabsProps {
  activeCategory: ProductCategory | 'All';
  categoryCounts: Readonly<Record<ProductCategory, number>>;
  totalCount: number;
  onChange: (category: ProductCategory | 'All') => void;
}

const categories = ['All', ...productCategories] as const;

export const CategoryTabs = ({
  activeCategory,
  categoryCounts,
  onChange,
  totalCount,
}: CategoryTabsProps) => (
  <div aria-label="Product categories" className="flex gap-2 overflow-x-auto pb-1" role="tablist">
    {categories.map((category) => {
      const isActive = activeCategory === category;

      return (
        <button
          key={category}
          aria-selected={isActive}
          className={cx(
            'focus-ring shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition',
            isActive
              ? 'border-navy bg-navy text-white shadow-[0_8px_20px_rgb(7_31_61_/_0.22)]'
              : 'border-border bg-warm-white text-muted hover:border-primary hover:text-navy',
          )}
          onClick={() => onChange(category)}
          role="tab"
          type="button"
        >
          {category}{' '}
          <span className={cx('ml-1 text-xs', isActive ? 'text-gold' : 'text-muted/80')}>
            ({category === 'All' ? totalCount : categoryCounts[category]})
          </span>
        </button>
      );
    })}
  </div>
);
