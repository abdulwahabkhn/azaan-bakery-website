import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import type { NavTheme } from '@/types/navigation';

const isNavTheme = (value: string | undefined): value is NavTheme =>
  value === 'blue' || value === 'light';

export const useNavSectionTheme = (defaultTheme: NavTheme = 'blue'): NavTheme => {
  const [theme, setTheme] = useState<NavTheme>(defaultTheme);
  const themeRef = useRef(theme);
  const { pathname } = useLocation();

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    let observer: IntersectionObserver | undefined;
    let frameId = 0;

    const setupObserver = (): void => {
      const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-nav-theme]'));

      if (sections.length === 0) {
        return;
      }

      const updateTheme = (): void => {
        const probeY = Math.min(96, window.innerHeight * 0.24);
        const activeSection = sections.find((section) => {
          const bounds = section.getBoundingClientRect();
          return bounds.top <= probeY && bounds.bottom > probeY;
        });
        const nextTheme = activeSection?.dataset.navTheme;

        if (isNavTheme(nextTheme) && nextTheme !== themeRef.current) {
          themeRef.current = nextTheme;
          setTheme(nextTheme);
        }
      };

      observer = new IntersectionObserver(updateTheme, {
        rootMargin: '-72px 0px -70% 0px',
        threshold: [0, 0.01],
      });

      sections.forEach((section) => observer?.observe(section));
      updateTheme();
    };

    frameId = window.requestAnimationFrame(setupObserver);

    return () => {
      window.cancelAnimationFrame(frameId);
      observer?.disconnect();
    };
  }, [pathname]);

  return theme;
};
