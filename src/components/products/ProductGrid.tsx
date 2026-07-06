import { AnimatePresence, motion } from 'framer-motion';

import { ProductCard } from '@/components/products/ProductCard';

import type { Product } from '@/types/product';

export interface ProductGridProps {
  favorites: ReadonlySet<string>;
  catalogLayout?: boolean;
  premiumLayout?: boolean;
  products: readonly Product[];
  onFavoriteToggle: (productId: string) => void;
}

export const ProductGrid = ({
  catalogLayout = false,
  favorites,
  onFavoriteToggle,
  premiumLayout = false,
  products,
}: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-10 text-center shadow-luxury">
        <h2 className="font-display text-3xl text-ink">No products matched that selection.</h2>
        <p className="mt-3 text-muted">Try another category or search term.</p>
      </div>
    );
  }

  return (
    <motion.div
      layout
      className={
        premiumLayout
          ? 'grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'
          : catalogLayout
            ? 'grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            : 'grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4'
      }
    >
      <AnimatePresence mode="popLayout">
        {products.map((product) => (
          <motion.div
            key={product.id}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            initial={{ opacity: 0, scale: 0.97 }}
            className="h-full min-w-0"
            transition={{ duration: 0.28 }}
          >
            <ProductCard
              isFavorite={favorites.has(product.id)}
              onFavoriteToggle={onFavoriteToggle}
              premium={premiumLayout}
              product={product}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};
