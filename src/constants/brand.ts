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
  address: 'Azaan Bakery, Jaranwala, Pakistan',
  phone: '+92 300 1234567',
  email: 'hello@azaanbakery.example',
  hours: ['Mon - Thu 10:00 AM - 10:00 PM', 'Fri - Sun 9:00 AM - 11:00 PM'],
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
    href: 'mailto:hello@azaanbakery.example',
    icon: FiSend,
  },
] as const;
