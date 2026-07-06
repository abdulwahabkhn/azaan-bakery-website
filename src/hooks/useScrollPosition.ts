import { useEffect, useState } from 'react';

export const useScrollPosition = (threshold = 24): boolean => {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    let frameId = 0;

    const handleScroll = (): void => {
      if (frameId !== 0) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        setHasScrolled(window.scrollY > threshold);
        frameId = 0;
      });
    };

    setHasScrolled(window.scrollY > threshold);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.cancelAnimationFrame(frameId);
    };
  }, [threshold]);

  return hasScrolled;
};