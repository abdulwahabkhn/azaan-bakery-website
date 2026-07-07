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
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0]?.label ?? '');
  const { addToCart } = useCart();
  const selectedPrice =
    product.variants?.find((variant) => variant.label === selectedVariant)?.price ?? product.price;

  useEffect(() => {
    setSelectedVariant(product.variants?.[0]?.label ?? '');
  }, [product.variants]);

  useEffect(() => {
    if (!hasAdded) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => setHasAdded(false), 1600);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [hasAdded]);

  if (!product.image) {
    return null;
  }

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
        <LazyImage
          alt={product.name}
          className="transition duration-700 group-hover:scale-105"
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
          src={product.image}
        />
        {product.badge ? (
          <span className="absolute left-1.5 top-1.5 z-10 max-w-[calc(100%-3rem)] rounded-full border border-gold/45 bg-gold/92 px-1.5 py-0.5 text-[0.52rem] font-bold uppercase leading-tight tracking-[0.06em] text-navy shadow-luxury backdrop-blur [overflow-wrap:anywhere] min-[360px]:left-2 min-[360px]:top-2 min-[360px]:px-2 min-[360px]:py-1 min-[360px]:text-[0.58rem] sm:left-4 sm:top-4 sm:max-w-[calc(100%-5rem)] sm:px-3 sm:text-xs sm:tracking-[0.14em]">
            {product.badge}
          </span>
        ) : null}
        <button
          aria-label={isFavorite ? `Remove ${product.name} from favorites` : `Save ${product.name}`}
          aria-pressed={isFavorite}
          className={cx(
            'focus-ring absolute right-1.5 top-1.5 z-20 grid size-8 place-items-center rounded-full border bg-surface/95 shadow-luxury backdrop-blur transition min-[360px]:right-2 min-[360px]:top-2 sm:right-4 sm:top-4 sm:size-10',
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
      <div className="flex flex-1 flex-col p-2 min-[360px]:p-2.5 sm:p-5">
        <div className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
          <div className="min-w-0">
            <p className="inline-flex max-w-full break-words rounded-full bg-navy px-1.5 py-0.5 text-[0.5rem] font-bold uppercase leading-tight tracking-[0.04em] text-white min-[360px]:px-2 min-[360px]:text-[0.55rem] sm:px-2.5 sm:py-1 sm:text-[0.65rem] sm:tracking-[0.12em]">
              {product.category}
            </p>
            <h3 className="mt-1.5 break-words font-display text-[0.9rem] font-bold leading-[1.15] text-navy [overflow-wrap:anywhere] min-[360px]:text-[0.95rem] sm:mt-2 sm:text-xl sm:leading-tight">
              {product.name}
            </h3>
          </div>
          <p className="w-fit max-w-full shrink-0 rounded-full border border-gold/40 bg-gold/12 px-1.5 py-0.5 text-[0.62rem] font-bold leading-tight text-gold-deep [overflow-wrap:anywhere] min-[360px]:px-2 min-[360px]:text-[0.68rem] sm:px-2.5 sm:py-1 sm:text-sm">
            {product.priceUnit || product.variants
              ? formatCartPrice(selectedPrice, product.priceUnit)
              : formatCurrency(selectedPrice)}
          </p>
        </div>
        <p className="mt-3 hidden text-sm text-muted md:block">{product.description}</p>
        {product.variants && product.variants.length > 0 ? (
          <div className="mt-2.5 sm:mt-3">
            <p className="mb-1.5 text-[0.58rem] font-bold uppercase tracking-[0.08em] text-muted sm:mb-2 sm:text-[0.65rem] sm:tracking-[0.12em]">
              Choose option
            </p>
            <div aria-label={`${product.name} options`} className="flex flex-wrap gap-1.5">
              {product.variants.map((variant) => (
                <button
                  aria-pressed={selectedVariant === variant.label}
                  className={cx(
                    'focus-ring max-w-full whitespace-normal rounded-full border px-1.5 py-1.5 text-left text-[0.56rem] font-bold leading-tight transition [overflow-wrap:anywhere] min-[360px]:px-2 min-[360px]:text-[0.6rem] sm:px-3 sm:text-[0.68rem]',
                    selectedVariant === variant.label
                      ? 'border-navy bg-navy text-white shadow-[0_6px_16px_rgb(7_31_61_/_0.2)]'
                      : 'border-gold/50 bg-warm-white text-navy hover:border-gold hover:bg-gold/15',
                  )}
                  key={variant.label}
                  onClick={() => setSelectedVariant(variant.label)}
                  type="button"
                >
                  {variant.label} - {formatCartPrice(variant.price, product.priceUnit)}
                </button>
              ))}
            </div>
          </div>
        ) : null}
        <div className="mt-auto pt-3 sm:pt-5">
          <Button
            className="min-h-9 w-full gap-1 px-1 text-[0.68rem] min-[360px]:px-1.5 min-[360px]:text-xs sm:min-h-10 sm:gap-2 sm:px-4 sm:text-sm [&_span]:whitespace-normal [&_svg]:size-3.5 sm:[&_svg]:size-4"
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
