import { cx } from '@/utils/formatters';

import type { ImgHTMLAttributes } from 'react';

export interface LazyImageProps extends Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'loading' | 'decoding'
> {
  eager?: boolean;
}

export const LazyImage = ({ alt, className, eager = false, ...props }: LazyImageProps) => (
  <img
    alt={alt}
    className={cx('h-full w-full object-cover', className)}
    decoding="async"
    loading={eager ? 'eager' : 'lazy'}
    {...props}
  />
);
