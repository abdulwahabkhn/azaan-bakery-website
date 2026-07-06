import { FiChevronDown } from 'react-icons/fi';

import type { SortOption } from '@/types/product';

export interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const sortOptions: readonly { label: string; value: SortOption }[] = [
  { label: 'Signature first', value: 'signature' },
  { label: 'Price low to high', value: 'price-asc' },
  { label: 'Price high to low', value: 'price-desc' },
  { label: 'Name A to Z', value: 'name-asc' },
] as const;

export const SortDropdown = ({ value, onChange }: SortDropdownProps) => (
  <div className="relative">
    <label className="sr-only" htmlFor="product-sort">
      Sort products
    </label>
    <select
      className="focus-ring h-12 w-full appearance-none rounded-full border border-border bg-warm-white px-4 pr-10 text-sm font-semibold text-ink focus:border-primary"
      id="product-sort"
      onChange={(event) => onChange(event.target.value as SortOption)}
      value={value}
    >
      {sortOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <FiChevronDown
      aria-hidden="true"
      className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted"
    />
  </div>
);
