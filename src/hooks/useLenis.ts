import Lenis from 'lenis';
import { useEffect } from 'react';

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export const useLenis = (): void => {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined;
    }

    const lenis = new Lenis({
      duration: 1.08,
      easing: (time: number) => Math.min(1, 1.001 - 2 ** (-10 * time)),
      smoothWheel: true,
    });

    let frameId = 0;

    const raf = (time: number): void => {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(raf);
    };

    frameId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, [prefersReducedMotion]);
};
