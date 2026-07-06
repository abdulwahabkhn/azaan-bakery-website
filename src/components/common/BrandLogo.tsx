import { useState } from 'react';

import logoImage from '@/assets/images/Logo.webp';
import { brand } from '@/constants/brand';
import { cx } from '@/utils/formatters';

export interface BrandLogoProps {
  className?: string;
  size?: 'compact' | 'standard' | 'hero';
}

const sizeClasses: Record<NonNullable<BrandLogoProps['size']>, string> = {
  compact: 'h-12 md:h-16',
  standard: 'h-20 md:h-24',
  hero: 'h-28 md:h-36',
};

export const BrandLogo = ({ className, size = 'standard' }: BrandLogoProps) => {
  const [hasImageError, setHasImageError] = useState(false);

  return (
    <span
      className={cx(
        'inline-flex shrink-0 items-center justify-center bg-transparent',
        className,
      )}
    >
      {hasImageError ? (
        <span
          className={cx(
            'inline-flex items-center text-center font-display text-xs font-bold leading-tight text-dark',
            sizeClasses[size],
          )}
        >
          {brand.name}
        </span>
      ) : (
        <img
          alt="Azaan Bakers logo"
          className={cx('block w-auto max-w-none object-contain', sizeClasses[size])}
          decoding="async"
          onError={() => setHasImageError(true)}
          src={logoImage}
        />
      )}
    </span>
  );
};
