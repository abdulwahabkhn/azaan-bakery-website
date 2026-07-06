import { brand } from '@/constants/brand';

export interface SeoPage {
  title: string;
  description: string;
  path: string;
}

export const defaultSeo = {
  siteName: brand.name,
  title: `${brand.name} Jaranwala | Cakes, Pastries & Three Milk Cake`,
  description:
    'Azaan Bakery in Jaranwala creates premium three milk cakes, celebration cakes, pastries, biscuits, and fresh fast food.',
  image: '/social-preview.jpg',
} as const;

export const seoPages = {
  home: {
    title: defaultSeo.title,
    description: defaultSeo.description,
    path: '/',
  },
  products: {
    title: `Cakes, Pastries & Biscuits in Jaranwala | ${brand.name}`,
    description:
      'Explore three milk cake in Jaranwala, birthday and wedding cakes, pastries, biscuits, coffee cakes, chocolate cakes, and fast food.',
    path: '/products',
  },
  about: {
    title: `Our Story | ${brand.name}`,
    description:
      'Discover the people, ingredients, and bakery craft behind Azaan Bakery Jaranwala.',
    path: '/about',
  },
  contact: {
    title: `Contact & Orders | ${brand.name}`,
    description:
      'Order cakes in Jaranwala, request a custom celebration cake, or connect with Azaan Bakery.',
    path: '/contact',
  },
} satisfies Record<string, SeoPage>;
