import { motion } from 'framer-motion';
import { memo, useEffect, useState } from 'react';
import { FiHeart, FiShoppingBag } from 'react-icons/fi';

import { Button } from '@/components/common/Button';
import { LazyImage } from '@/components/common/LazyImage';
import { useCart } from '@/hooks/useCart';
import { formatCartPrice } from '@/utils/cart';
import { formatCurrency, cx } from '@/utils/formatters';

import type { Product } from '@/types/product';

export interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  premium?: boolean;
  onFavoriteToggle: (productId: string) => void;
}

const ProductCardComponent = ({
  isFavorite,
  onFavoriteToggle,
  premium = false,
  product,
}: ProductCardProps) => {
  const [hasAdded, setHasAdded] = useState(false);
  const [hasImageError, setHasImageError] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0]?.label ?? '');
  const { addToCart } = useCart();
  const selectedPrice =
    product.variants?.find((variant) => variant.label === selectedVariant)?.price ?? product.price;

  useEffect(() => {
    setHasImageError(false);
    setSelectedVariant(product.variants?.[0]?.label ?? '');
  }, [product.image, product.variants]);

  useEffect(() => {
    if (!hasAdded) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => setHasAdded(false), 1600);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [hasAdded]);

  return (
    <motion.article
      layout
      className={cx(
        'group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border bg-surface shadow-[0_14px_38px_rgb(7_31_61_/_0.1)] transition duration-300 hover:-translate-y-1 hover:shadow-lift sm:rounded-2xl',
        premium
          ? 'border-gold/45 bg-cream hover:border-gold'
          : 'border-border hover:border-catalog/70',
      )}
    >
      <div
        className={cx(
          'relative overflow-hidden',
          premium ? 'aspect-[5/4] bg-cream' : 'aspect-[4/3] bg-light-blue',
        )}
      >
        {product.image && !hasImageError ? (
          <LazyImage
            alt={product.name}
            className="transition duration-700 group-hover:scale-105"
            onError={() => setHasImageError(true)}
            sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
            src={product.image}
          />
        ) : (
          <div
            className="absolute inset-0 grid place-items-center bg-[linear-gradient(145deg,#FFFCF5,#FFF7E6)] p-5 text-center"
            data-missing-image={product.name}
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-deep">
                Image needed
              </p>
              <p className="mt-2 text-sm font-semibold text-navy/65">{product.name}</p>
            </div>
          </div>
        )}
        {product.badge ? (
          <span className="absolute left-2 top-2 z-10 max-w-[calc(100%-3.5rem)] truncate rounded-full border border-gold/45 bg-gold/92 px-2 py-1 text-[0.58rem] font-bold uppercase tracking-[0.08em] text-navy shadow-luxury backdrop-blur sm:left-4 sm:top-4 sm:max-w-[calc(100%-5rem)] sm:px-3 sm:text-xs sm:tracking-[0.14em]">
            {product.badge}
          </span>
        ) : null}
        <button
          aria-label={isFavorite ? `Remove ${product.name} from favorites` : `Save ${product.name}`}
          aria-pressed={isFavorite}
          className={cx(
            'focus-ring absolute right-2 top-2 z-20 grid size-8 place-items-center rounded-full border bg-surface/95 shadow-luxury backdrop-blur transition sm:right-4 sm:top-4 sm:size-10',
            isFavorite
              ? 'border-catalog bg-light-blue text-catalog'
              : 'border-white/70 text-ink hover:border-catalog hover:text-catalog',
          )}
          onClick={() => onFavoriteToggle(product.id)}
          type="button"
        >
          <FiHeart
            aria-hidden="true"
            className={cx('size-3.5 sm:size-4', isFavorite && 'fill-current')}
          />
        </button>
      </div>
      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
          <div className="min-w-0">
            <p className="inline-flex max-w-full truncate rounded-full bg-navy px-2.5 py-1 text-[0.58rem] font-bold uppercase tracking-[0.08em] text-white sm:text-[0.65rem] sm:tracking-[0.12em]">
              {product.category}
            </p>
            <h3 className="mt-2 break-words font-display text-base font-bold leading-tight text-navy sm:text-xl">
              {product.name}
            </h3>
          </div>
          <p className="shrink-0 rounded-full border border-gold/40 bg-gold/12 px-2.5 py-1 text-xs font-bold text-gold-deep sm:text-sm">
            {product.priceUnit || product.variants
              ? formatCartPrice(selectedPrice, product.priceUnit)
              : formatCurrency(selectedPrice)}
          </p>
        </div>
        <p className="mt-3 hidden text-sm text-muted md:line-clamp-2">{product.description}</p>
        {product.variants && product.variants.length > 0 ? (
          <div className="mt-3">
            <p className="mb-2 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-muted">
              Choose size
            </p>
            <div aria-label={`${product.name} size options`} className="flex flex-wrap gap-1.5">
              {product.variants.map((variant) => (
                <button
                  aria-pressed={selectedVariant === variant.label}
                  className={cx(
                    'focus-ring rounded-full border px-3 py-1.5 text-[0.68rem] font-bold transition',
                    selectedVariant === variant.label
                      ? 'border-navy bg-navy text-white shadow-[0_6px_16px_rgb(7_31_61_/_0.2)]'
                      : 'border-gold/50 bg-warm-white text-navy hover:border-gold hover:bg-gold/15',
                  )}
                  key={variant.label}
                  onClick={() => setSelectedVariant(variant.label)}
                  type="button"
                >
                  {variant.label}
                </button>
              ))}
            </div>
          </div>
        ) : null}
        <div className="mt-auto pt-4 sm:pt-5">
          <Button
            className="w-full px-2 sm:px-4"
            icon={FiShoppingBag}
            iconPosition="left"
            onClick={() => {
              addToCart(product, selectedVariant || undefined);
              setHasAdded(true);
            }}
            size="sm"
            variant="gold"
          >
            {hasAdded ? 'Added' : 'Add to cart'}
          </Button>
          {hasAdded ? (
            <span className="sr-only" role="status">
              {product.name} added to cart.
            </span>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
};

export const ProductCard = memo(ProductCardComponent);
