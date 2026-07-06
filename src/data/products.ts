import { getProductImage } from '@/data/productImages';

import type { Product, ProductBadge, ProductCategory, ProductVariant } from '@/types/product';

interface MenuItem {
  name: string;
  price?: number;
  priceSmall?: number;
  priceLarge?: number;
  variants?: readonly ProductVariant[];
  category?: ProductCategory;
  description?: string;
  badge?: ProductBadge;
  priceUnit?: 'kg';
}

interface PizzaMenu {
  sizes: Readonly<Record<string, number>>;
  flavors: readonly string[];
}

export const catalogData: {
  premiumCakes: readonly MenuItem[];
  fastFood: readonly MenuItem[];
  cakes: readonly MenuItem[];
  pastries: readonly MenuItem[];
  desserts: readonly MenuItem[];
  bakeryItems: readonly MenuItem[];
  pizzas: Readonly<Record<'regular' | 'special' | 'stuffed', PizzaMenu>>;
} = {
  premiumCakes: [
    {
      name: 'Bounty Cake',
      variants: [
        { label: '1 Pound', price: 1200 },
        { label: '2 Pound', price: 2400 },
      ],
      category: 'Premium Cakes',
      description: 'Delicious coconut cake topped with bounty chocolate and creamy delight',
    },
    {
      name: 'Dairy Milk Cake',
      variants: [
        { label: '1 Pound', price: 1200 },
        { label: '2 Pound', price: 2400 },
      ],
      category: 'Premium Cakes',
      description: 'Smooth chocolate cake made with rich Dairy Milk chocolate',
    },
    {
      name: 'Brownie Cake',
      variants: [
        { label: '1 Pound', price: 1200 },
        { label: '2 Pound', price: 2400 },
      ],
      category: 'Premium Cakes',
      description: 'Fudgy brownie cake with intense chocolate flavor and premium finish',
    },
    {
      name: 'KitKat Cake',
      variants: [
        { label: '1 Pound', price: 1200 },
        { label: '2 Pound', price: 2400 },
      ],
      category: 'Premium Cakes',
      description: 'Irresistible chocolate cake loaded with layers of KitKat crunch and cream',
    },
  ],
  fastFood: [
    { name: 'Zinger Burger', price: 320 },
    { name: 'Pizza Zinger Burger', price: 400 },
    { name: 'Steak Burger', price: 450 },
    { name: 'Azaan Special Burger', price: 550 },
    { name: 'Patty Burger', price: 240 },
    { name: 'Chicken Burger', price: 220 },
    { name: 'Shami Burger', price: 160 },
    { name: 'Zinger Shawarma', price: 280 },
    { name: 'Zinger Paratha', price: 320 },
    { name: 'Pizza Shawarma', price: 300 },
    { name: 'Pizza Paratha', price: 350 },
    { name: 'Kabab Paratha', price: 320 },
    { name: 'Chicken Shawarma', price: 180 },
    { name: 'Chicken Paratha', price: 240 },
    { name: 'Platter Shawarma', price: 400 },
    { name: 'Cheesy Special Wrap', price: 600 },
    { name: 'Tortila Wrap', price: 550 },
    { name: 'Fried Hot Wings (6pc)', price: 350 },
    { name: 'Fried Hot Wings (12pc)', price: 650 },
    { name: 'Oven Baked Wings (6pc)', price: 350 },
    { name: 'Oven Baked Wings (12pc)', price: 650 },
    { name: 'Chicken Nuggets (6pc)', price: 300 },
    { name: 'Chicken Nuggets (12pc)', price: 600 },
    { name: 'Honey Masted Wings (6pc)', price: 400 },
    { name: 'Honey Masted Wings (12pc)', price: 700 },
    { name: 'Azaan Special Roll (4pc)', price: 550 },
    { name: 'Behari Roll (4pc)', price: 500 },
    { name: 'Bar BQ Roll (4pc)', price: 500 },
    { name: 'Azaan Special Sandwich', price: 550 },
    { name: 'Pizza Sandwich', price: 500 },
    { name: 'Malai Boti Sandwich', price: 550 },
    { name: 'Azaan Steaker', price: 600 },
    { name: 'Azaan Special Pasta', priceSmall: 400, priceLarge: 600 },
    { name: 'Crunchy Pasta', priceSmall: 450, priceLarge: 650 },
    { name: 'Creamy & Cheesy Pasta', priceSmall: 450, priceLarge: 700 },
    { name: 'Pizza Loaded Fries', price: 650 },
    { name: 'Cheesy Fries', price: 550 },
    { name: 'Mayo Fries', price: 400 },
    { name: 'French Fries', priceSmall: 200, priceLarge: 350 },
  ],
  cakes: [
    {
      name: '3 Milk Classical Cake',
      category: 'Three Milk Cakes',
      description: 'Classic soft three milk cake from Azaan Bakers.',
      variants: [
        { label: '1 Pound', price: 1200 },
        { label: '2 Pound', price: 2400 },
      ],
    },
    {
      name: '3 Milk Mango Cake',
      category: 'Three Milk Cakes',
      description: 'Soft three milk cake finished with sweet mango flavor.',
      variants: [
        { label: '1 Pound', price: 1200 },
        { label: '2 Pound', price: 2400 },
      ],
    },
    {
      name: 'Lotus Cake',
      variants: [
        { label: '1 Pound', price: 1400 },
        { label: '2 Pound', price: 2800 },
      ],
    },
    {
      name: 'Pista Cake',
      variants: [
        { label: '1 Pound', price: 1400 },
        { label: '2 Pound', price: 2800 },
      ],
    },
    {
      name: 'Dream Cake',
      variants: [
        { label: '1 Pound', price: 1000 },
        { label: '2 Pound', price: 2000 },
      ],
    },
    {
      name: 'Red Velvet Cake',
      variants: [
        { label: '1 Pound', price: 1000 },
        { label: '2 Pound', price: 2000 },
      ],
    },
    {
      name: 'Chocolate Cake',
      variants: [
        { label: '1 Pound', price: 700 },
        { label: '2 Pound', price: 1400 },
      ],
    },
    {
      name: 'Pine Apple Cream Cake',
      variants: [
        { label: '1 Pound', price: 600 },
        { label: '2 Pound', price: 1200 },
      ],
    },
    {
      name: 'Fresh Cream Cake',
      variants: [
        { label: '1 Pound', price: 600 },
        { label: '2 Pound', price: 1200 },
      ],
    },
    {
      name: 'Black Forest Cake',
      variants: [
        { label: '1 Pound', price: 700 },
        { label: '2 Pound', price: 1400 },
      ],
    },
    {
      name: '2 in 1 Chocolate & Mix Fruit Cake',
      variants: [
        { label: '1 Pound', price: 700 },
        { label: '2 Pound', price: 1400 },
      ],
    },
  ],
  pastries: [
    { name: '3 Milk Pastry', price: 300 },
    { name: 'Lotus Pastry', price: 350 },
    { name: 'Brownie Pastry', price: 300 },
    { name: 'Chocolate Pastry', price: 120 },
    { name: 'Pine Apple Pastry', price: 100 },
  ],
  desserts: [
    { name: 'Choco Ball', price: 80 },
    { name: 'Donut', price: 100 },
  ],
  bakeryItems: [
    { name: 'Special Almond Khatai', price: 1800, priceUnit: 'kg', category: 'Biscuits' },
    { name: 'Sugar Free Biscuit', price: 1400, priceUnit: 'kg', category: 'Biscuits' },
    { name: 'Coconut Biscuit', price: 1400, priceUnit: 'kg', category: 'Biscuits' },
    { name: 'Dry Fruit Biscuit', price: 1400, priceUnit: 'kg', category: 'Biscuits' },
    { name: 'Cookies', price: 1200, priceUnit: 'kg', category: 'Biscuits' },
    { name: 'Khatai', price: 1200, priceUnit: 'kg', category: 'Biscuits' },
    { name: 'Mix Biscuits', price: 1000, priceUnit: 'kg', category: 'Biscuits' },
    { name: 'Cake Rusk', price: 1200, priceUnit: 'kg', category: 'Biscuits' },
    { name: 'Almond Cake Rusk', price: 1400, priceUnit: 'kg', category: 'Biscuits' },
    { name: 'Bakerkhani Mix', price: 900, priceUnit: 'kg', category: 'Biscuits' },
    { name: 'Fruit Cake Slice', price: 1000, priceUnit: 'kg', category: 'Biscuits' },
    {
      name: 'Almond Cake',
      category: 'Dry Cakes',
      variants: [
        { label: '1 lb', price: 600 },
        { label: '2 lb', price: 1200 },
      ],
    },
    {
      name: 'Dry Fruit Cake',
      category: 'Dry Cakes',
      variants: [
        { label: '1 lb', price: 800 },
        { label: '2 lb', price: 1600 },
      ],
    },
    { name: 'Fruit Cake Box', price: 220, category: 'Dry Cakes' },
    { name: 'Plain Cake', price: 200, category: 'Dry Cakes' },
    { name: 'Dry Fruit Nimko', price: 1200, priceUnit: 'kg', category: 'Nimko', badge: 'New' },
    { name: 'Mix Nimko', price: 900, priceUnit: 'kg', category: 'Nimko', badge: 'New' },
    { name: 'Sandwich Bread', price: 280, category: 'Bread' },
    { name: 'Milky Bread Large', price: 220, category: 'Bread' },
    { name: 'Milky Bread Small', price: 110, category: 'Bread' },
    { name: 'Plain Bread Large', price: 220, category: 'Bread' },
    { name: 'Plain Bread Small', price: 110, category: 'Bread' },
    { name: 'Brown Bread', price: 150, category: 'Bread' },
    { name: 'Burger Bread (8pc)', price: 220, category: 'Bread' },
    { name: 'Shawarma Bread (4pc)', price: 90, category: 'Bread' },
    { name: 'Sheermall', price: 70, category: 'Bread' },
    { name: 'Sweet Bun', price: 50, category: 'Bread' },
    { name: 'Slice Rusk 500g', price: 260, category: 'Rusk' },
    { name: 'Burger Rusk 500g', price: 260, category: 'Rusk' },
    { name: 'Cutt Rusk 500g', price: 260, category: 'Rusk' },
    { name: 'Goll Rusk 500g', price: 260, category: 'Rusk' },
    { name: 'Slice Rusk 300g', price: 160, category: 'Rusk' },
    { name: 'Baby Rusk 300g', price: 160, category: 'Rusk' },
    { name: 'Brown Rusk', price: 160, category: 'Rusk' },
    { name: 'Special Arabic Sweet', price: 1200, priceUnit: 'kg', category: 'Sweet', badge: 'New' },
  ],
  pizzas: {
    regular: {
      sizes: { S: 500, M: 1050, L: 1450, XL: 2100 },
      flavors: [
        'Chicken Fajita Pizza',
        'Chicken Tikka Pizza',
        'Peri Peri Pizza',
        'Hot n Spicy Pizza',
        'Chicken Supreme',
        'Vege Vibe Pizza',
        'Cheese Lover Pizza',
      ],
    },
    special: {
      sizes: { S: 550, M: 1100, L: 1500, XL: 2250 },
      flavors: [
        'Azaan Special Pizza',
        'Chef Special Pizza',
        'Malai Boti Pizza',
        'Bihari Kabab Pizza',
        'Crunchy Bite Pizza',
        'Bar BQ Pizza',
      ],
    },
    stuffed: {
      sizes: { M: 1150, L: 1650, XL: 2400 },
      flavors: [
        'Kabab Stuffer Pizza',
        'Crown Crust Pizza',
        'Royal Crust Pizza',
        'Kabab Crust Pizza',
        'Chicken Cheese Stuffer',
      ],
    },
  },
};

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const getFastFoodCategory = (name: string): ProductCategory => {
  if (/burger/i.test(name)) return 'Burgers';
  if (/shawarma|paratha|wrap/i.test(name)) return 'Shawarma & Wrap';
  if (/wings|nuggets/i.test(name)) return 'Hot Wings & Nuggets';
  if (/pasta|fries/i.test(name)) return 'Pasta & Fries';
  if (/sandwich|roll|steaker/i.test(name)) return 'Spring Roll & Sandwich';
  throw new Error(`No product category mapping exists for "${name}".`);
};

const getVariants = (item: MenuItem): readonly ProductVariant[] | undefined => {
  if (item.variants) return item.variants;
  if (item.priceSmall === undefined || item.priceLarge === undefined) return undefined;
  const isPasta = /pasta/i.test(item.name);
  return [
    { label: isPasta ? 'F1' : 'Small', price: item.priceSmall },
    { label: isPasta ? 'F2' : 'Large', price: item.priceLarge },
  ];
};

const createProduct = (
  item: MenuItem,
  category: ProductCategory,
  group: string,
  index: number,
): Product => {
  const variants = getVariants(item);
  const numericPrice = item.price ?? variants?.[0]?.price;

  if (numericPrice === undefined) {
    throw new Error(`No price exists for "${item.name}".`);
  }

  return {
    id: `${group}-${index + 1}-${slugify(item.name)}`,
    slug: `${group}-${slugify(item.name)}`,
    name: item.name,
    price: numericPrice,
    description: item.description ?? `${item.name} from Azaan Bakers.`,
    image: getProductImage(item.name),
    category,
    tags: [category],
    ...(item.badge
      ? { badge: item.badge }
      : category === 'Premium Cakes'
      ? { badge: 'Premium' as const }
      : category === 'Three Milk Cakes'
        ? { badge: 'Seasonal' as const }
        : {}),
    featured: category === 'Premium Cakes',
    bestseller: false,
    seasonal: false,
    alt: `${item.name} from Azaan Bakers`,
    ...(variants ? { variants } : {}),
    ...(item.priceUnit ? { priceUnit: item.priceUnit } : {}),
  };
};

export const premiumCakes = catalogData.premiumCakes.map((item, index) =>
  createProduct(item, 'Premium Cakes', 'premium-cake', index),
);

const fastFoodProducts = catalogData.fastFood.map((item, index) =>
  createProduct(item, getFastFoodCategory(item.name), 'fast-food', index),
);

const cakeProducts = catalogData.cakes.map((item, index) =>
  createProduct(item, item.category ?? 'Cakes', 'cake', index),
);

const pastryProducts = catalogData.pastries.map((item, index) =>
  createProduct(item, 'Pastries', 'pastry', index),
);

const dessertProducts = catalogData.desserts.map((item, index) =>
  createProduct(item, 'Desserts', 'dessert', index),
);

const bakeryItemProducts = catalogData.bakeryItems.map((item, index) => {
  if (!item.category) throw new Error(`No bakery category exists for "${item.name}".`);
  return createProduct(item, item.category, 'bakery-item', index);
});

const pizzaProducts = Object.entries(catalogData.pizzas).flatMap(([style, pizzaMenu]) => {
  const variants = Object.entries(pizzaMenu.sizes).map(([label, price]) => ({ label, price }));
  const startingPrice = variants[0]?.price ?? 0;

  return pizzaMenu.flavors.map<Product>((name, index) => ({
    id: `pizza-${style}-${index + 1}-${slugify(name)}`,
    slug: `pizza-${style}-${slugify(name)}`,
    name,
    price: startingPrice,
    description: `${name} available in ${variants.map((variant) => variant.label).join(', ')} sizes.`,
    image: getProductImage(name),
    category: 'Pizzas',
    tags: ['Pizzas'],
    ...(style === 'special' ? { badge: 'Signature' as const } : {}),
    featured: false,
    bestseller: false,
    seasonal: false,
    alt: `${name} from Azaan Bakers`,
    variants,
  }));
});

export const products: Product[] = [
  ...premiumCakes,
  ...cakeProducts,
  ...pastryProducts,
  ...dessertProducts,
  ...bakeryItemProducts,
  ...pizzaProducts,
  ...fastFoodProducts,
];

export const premiumProduct = products.find((product) => product.name === '3 Milk Mango Cake');
export const premiumPastry = products.find((product) => product.name === '3 Milk Pastry');

export const featuredProducts = premiumCakes.slice(0, 4);
export const bestSellerProducts = cakeProducts.slice(0, 4);
export const seasonalProducts: Product[] = [];
