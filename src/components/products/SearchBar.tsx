import { FiSearch } from 'react-icons/fi';

import { normalizeSearchTerm } from '@/utils/sanitize';

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => (
  <div className="relative">
    <label className="sr-only" htmlFor="product-search">
      Search products
    </label>
    <FiSearch
      aria-hidden="true"
      className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted"
    />
    <input
      className="focus-ring h-12 w-full rounded-full border border-border bg-warm-white pl-11 pr-4 text-sm text-ink placeholder:text-muted/70 focus:border-primary"
      id="product-search"
      onChange={(event) => onChange(normalizeSearchTerm(event.target.value))}
      placeholder="Search cakes, pizzas, burgers..."
      type="search"
      value={value}
    />
  </div>
);
