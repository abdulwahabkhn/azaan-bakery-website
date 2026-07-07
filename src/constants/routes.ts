import type { NavItem } from '@/types/navigation';

export const routes = {
  home: '/',
  products: '/products',
  about: '/about',
  contact: '/contact',
} as const;

export const navItems: readonly NavItem[] = [
  { label: 'Home', path: routes.home },
  { label: 'About', path: routes.about },
  { label: 'Contact', path: routes.contact },
] as const;
