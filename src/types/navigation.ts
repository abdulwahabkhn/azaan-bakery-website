import type { IconType } from 'react-icons';

export type NavTheme = 'blue' | 'light';

export interface NavItem {
  label: string;
  path: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: IconType;
}
