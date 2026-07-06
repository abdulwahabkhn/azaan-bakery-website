import { useEffect, useRef, useState } from 'react';

export interface UseInViewOptions extends IntersectionObserverInit {
  once?: boolean;
}

export const useInView = <TElement extends Element>({
  once = true,
  root = null,
  rootMargin = '0px 0px -12% 0px',
  threshold = 0.18,
}: UseInViewOptions = {}) => {
  const ref = useRef<TElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) {
          return;
        }

        setIsInView(entry.isIntersecting);

        if (entry.isIntersecting && once) {
          observer.unobserve(element);
        }
      },
      { root, rootMargin, threshold },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [once, root, rootMargin, threshold]);

  return { ref, isInView };
};
