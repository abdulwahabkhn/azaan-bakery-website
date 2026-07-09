import { brand } from '@/constants/brand';

export interface SeoPage {
  title: string;
  description: string;
  path: string;
}

export const defaultSeo = {
  siteName: brand.name,
  title: 'Azaan Bakers Jaranwala | Cakes, Bakery Items & Fast Food',
  description:
    'Azaan Bakers Jaranwala offers fresh cakes, three milk cakes, pastries, pizzas, burgers, sweets, biscuits, bread, rusk, nimko, and bakery favorites.',
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
      'Discover the people, ingredients, and bakery craft behind Azaan Bakers Jaranwala.',
    path: '/about',
  },
  contact: {
    title: `Contact & Orders | ${brand.name}`,
    description:
      'Order cakes in Jaranwala, request a custom celebration cake, or connect with Azaan Bakers.',
    path: '/contact',
  },
} satisfies Record<string, SeoPage>;
