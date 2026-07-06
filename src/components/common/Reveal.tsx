import gsap from 'gsap';
import { useEffect } from 'react';

import { useInView } from '@/hooks/useInView';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cx } from '@/utils/formatters';

import type { ReactNode } from 'react';

export interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const Reveal = ({ children, className, delay = 0 }: RevealProps) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { ref, isInView } = useInView<HTMLDivElement>();

  useEffect(() => {
    const element = ref.current;

    if (!element || !isInView || prefersReducedMotion) {
      return;
    }

    gsap.fromTo(
      element,
      { autoAlpha: 0, y: 32 },
      { autoAlpha: 1, y: 0, delay, duration: 0.9, ease: 'power3.out' },
    );
  }, [delay, isInView, prefersReducedMotion, ref]);

  return (
    <div ref={ref} className={cx(className)} style={{ opacity: prefersReducedMotion ? 1 : 0 }}>
      {children}
    </div>
  );
};
