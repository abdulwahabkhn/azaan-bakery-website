import { normalizeSearchTerm } from '@/utils/sanitize';

import type { Product, ProductFilters } from '@/types/product';

const searchProduct = (product: Product, search: string): boolean => {
  const normalized = normalizeSearchTerm(search).toLowerCase();

  if (!normalized) {
    return true;
  }

  const searchable = [
    product.name,
    product.description,
    product.category,
    product.badge ?? '',
    ...product.tags,
    ...(product.variants?.map((variant) => variant.label) ?? []),
  ]
    .join(' ')
    .toLowerCase();

  return searchable.includes(normalized);
};

const compareBySort =
  (sort: ProductFilters['sort']) =>
  (left: Product, right: Product): number => {
    const comparePrices = (direction: 'asc' | 'desc'): number => {
      return direction === 'asc' ? left.price - right.price : right.price - left.price;
    };

    switch (sort) {
      case 'price-asc':
        return comparePrices('asc');
      case 'price-desc':
        return comparePrices('desc');
      case 'name-asc':
        return left.name.localeCompare(right.name);
      case 'signature':
        return (
          Number(right.featured) - Number(left.featured) ||
          Number(right.bestseller) - Number(left.bestseller)
        );
    }
  };

export const filterProducts = (products: readonly Product[], filters: ProductFilters): Product[] =>
  [...products]
    .filter((product) => filters.category === 'All' || product.category === filters.category)
    .filter((product) => searchProduct(product, filters.search))
    .sort(compareBySort(filters.sort));
