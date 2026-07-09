import { brand } from '@/constants/brand';

export interface SeoPage {
  title: string;
  description: string;
  path: string;
}

export const defaultSeo = {
  siteName: brand.name,
  title: 'Azaan Bakers | Bakery in Jaranwala',
  description:
    'Azaan Bakers is a bakery in Jaranwala offering cakes, pastries, fast food, gifts, and bakery items.',
  image: '/social-preview.jpg',
} as const;

export const seoPages = {
  home: {
    title: defaultSeo.title,
    description: defaultSeo.description,
    path: '/',
  },
  products: {
    title: `Products | ${brand.name}`,
    description:
      'Explore cakes, pastries, fast food, gifts, bakarkhani, and bakery products from Azaan Bakers in Jaranwala.',
    path: '/products',
  },
  about: {
    title: `About ${brand.name} | Jaranwala Bakery`,
    description:
      'Learn about Azaan Bakers, a bakery in Jaranwala focused on fresh bakery items, cakes, pastries, and quality service.',
    path: '/about',
  },
  contact: {
    title: `Contact ${brand.name} | Bakery in Jaranwala`,
    description:
      'Contact Azaan Bakers in Jaranwala. Email azaanbakers@gmail.com. Opening hours are 6:00 AM to 1:00 AM.',
    path: '/contact',
  },
} satisfies Record<string, SeoPage>;
