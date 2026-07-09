import { FiFacebook, FiInstagram, FiPhone, FiSend } from 'react-icons/fi';

import type { BusinessInfo } from '@/types/contact';
import type { SocialLink } from '@/types/navigation';

export const brand = {
  name: 'Azaan Bakers',
  shortName: 'Azaan',
  tagline: 'Taste of Love & Purity',
  location: 'Jaranwala, Pakistan',
} as const;

export const businessInfo: BusinessInfo = {
  address: 'Azaan Bakers, Jaranwala, Pakistan',
  phone: '03061923382',
  email: 'azaanbakers@gmail.com',
  hours: ['Daily 6:00 AM - 1:00 AM'],
};

export const brandSocialLinks: readonly SocialLink[] = [
  {
    label: 'Visit Azaan Bakers on Instagram',
    href: 'https://www.instagram.com/azaanbakers/',
    icon: FiInstagram,
  },
  {
    label: 'Visit Azaan Bakers on Facebook',
    href: 'https://www.facebook.com/p/Azaan-Bakers-61582505100966/',
    icon: FiFacebook,
  },
] as const;

export const socialLinks: readonly SocialLink[] = [
  ...brandSocialLinks,
  {
    label: 'Contact Azaan Bakers on WhatsApp',
    href: 'https://wa.me/923061923382',
    icon: FiPhone,
  },
  {
    label: 'Email Azaan Bakers',
    href: 'mailto:azaanbakers@gmail.com',
    icon: FiSend,
  },
] as const;
