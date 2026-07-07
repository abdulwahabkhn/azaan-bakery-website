export const productCategories = [
  'Premium Cakes',
  'Three Milk Cakes',
  'Cakes',
  'Pastries',
  'Desserts',
  'Biscuits',
  'Dry Cakes',
  'Nimko',
  'Bread',
  'Rusk',
  'Pizzas',
  'Burgers',
  'Shawarma & Wrap',
  'Hot Wings & Nuggets',
  'Pasta & Fries',
  'Spring Roll & Sandwich',
] as const;

export type ProductCategory = (typeof productCategories)[number];

export type ProductBadge =
  'Signature' | 'Premium' | 'Seasonal' | 'Limited' | 'Best Seller' | 'New' | 'Celebration';

export type SortOption = 'signature' | 'price-asc' | 'price-desc' | 'name-asc';

export interface ProductVariant {
  label: string;
  price: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: ProductCategory;
  tags: ProductCategory[];
  badge?: ProductBadge;
  featured: boolean;
  bestseller: boolean;
  seasonal: boolean;
  alt: string;
  variants?: readonly ProductVariant[];
  priceUnit?: 'kg';
}

export interface ProductFilters {
  category: ProductCategory | 'All';
  search: string;
  sort: SortOption;
}
