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
  imageKey?: string;
  priceUnit?: 'kg';
}

interface PizzaMenu {
  sizes: Readonly<Record<string, number>>;
  flavors: readonly string[];
}

const createWeightVariants = (pricePerKg: number): readonly ProductVariant[] => [
  { label: '250gm', price: Math.round(pricePerKg * 0.25) },
  { label: '500gm', price: Math.round(pricePerKg * 0.5) },
  { label: '1kg', price: pricePerKg },
];

const bakarkhaniWeightVariants = createWeightVariants(900);

export const catalogData: {
  premiumCakes: readonly MenuItem[];
  fastFood: readonly MenuItem[];
  cakes: readonly MenuItem[];
  pastries: readonly MenuItem[];
  desserts: readonly MenuItem[];
  bakeryItems: readonly MenuItem[];
  gifts: readonly MenuItem[];
  bakarkhani: readonly MenuItem[];
  pizzas: Readonly<Record<'regular' | 'special' | 'stuffed', PizzaMenu>>;
} = {
  premiumCakes: [
    {
      name: 'Bounty Cake',
      variants: [{ label: '2 Pound', price: 2400 }],
      category: 'Premium Cakes',
      description: 'Delicious coconut cake topped with bounty chocolate and creamy delight',
    },
    {
      name: 'Ferero Cake',
      variants: [{ label: '2 Pound', price: 2400 }],
      category: 'Premium Cakes',
      description: 'Premium chocolate cake finished with Ferero-style crunch and cream',
    },
    {
      name: 'Dairy Milk Cake',
      variants: [{ label: '2 Pound', price: 2400 }],
      category: 'Premium Cakes',
      description: 'Smooth chocolate cake made with rich Dairy Milk chocolate',
    },
    {
      name: 'Brownie Cake',
      variants: [{ label: '2 Pound', price: 2400 }],
      category: 'Premium Cakes',
      description: 'Fudgy brownie cake with intense chocolate flavor and premium finish',
    },
    {
      name: 'KitKat Cake',
      variants: [{ label: '2 Pound', price: 2400 }],
      category: 'Premium Cakes',
      description: 'Irresistible chocolate cake loaded with layers of KitKat crunch and cream',
    },
    {
      name: 'Red Velvet Cake',
      variants: [{ label: '2 Pound', price: 2000 }],
      category: 'Premium Cakes',
      description: 'Soft red velvet cake with a smooth cream finish.',
    },
    {
      name: 'Dream Cake',
      variants: [{ label: '2 Pound', price: 2000 }],
      category: 'Premium Cakes',
      description: 'Rich layered dream cake with a smooth chocolate finish.',
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
    {
      name: 'Fried Hot Wings',
      variants: [
        { label: '6pc', price: 350 },
        { label: '12pc', price: 650 },
      ],
    },
    {
      name: 'Oven Baked Wings',
      variants: [
        { label: '6pc', price: 350 },
        { label: '12pc', price: 650 },
      ],
    },
    {
      name: 'Chicken Nuggets',
      variants: [
        { label: '6pc', price: 300 },
        { label: '12pc', price: 600 },
      ],
    },
    {
      name: 'Honey Masted Wings',
      variants: [
        { label: '6pc', price: 400 },
        { label: '12pc', price: 700 },
      ],
    },
    { name: 'Azaan Special Roll', variants: [{ label: '4pc', price: 550 }] },
    { name: 'Behari Roll', variants: [{ label: '4pc', price: 500 }] },
    { name: 'Bar BQ Roll', variants: [{ label: '4pc', price: 500 }] },
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
    {
      name: 'Mango Pastry',
      price: 300,
      description: 'Soft mango pastry from Azaan Bakers.',
      imageKey: 'ThreeMilkMangoCake',
    },
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
    { name: 'Samosa Chaat', price: 150, category: 'Chaat & Salad' },
    { name: 'Arabic Sweet', price: 1200, priceUnit: 'kg', category: 'Sweet' },
    { name: 'Russian Salad', price: 1000, priceUnit: 'kg', category: 'Chaat & Salad' },
    {
      name: 'Special Arabic Sweet',
      price: 1200,
      priceUnit: 'kg',
      category: 'Sweet',
      badge: 'New',
    },
    {
      name: 'Special Almond Khatai',
      price: 1800,
      priceUnit: 'kg',
      variants: createWeightVariants(1800),
      category: 'Biscuits',
    },
    {
      name: 'Sugar Free Biscuit',
      price: 1400,
      priceUnit: 'kg',
      variants: createWeightVariants(1400),
      category: 'Biscuits',
    },
    {
      name: 'Coconut Biscuit',
      price: 1400,
      priceUnit: 'kg',
      variants: createWeightVariants(1400),
      category: 'Biscuits',
    },
    {
      name: 'Dry Fruit Biscuit',
      price: 1400,
      priceUnit: 'kg',
      variants: createWeightVariants(1400),
      category: 'Biscuits',
    },
    {
      name: 'Cookies',
      price: 1200,
      priceUnit: 'kg',
      variants: createWeightVariants(1200),
      category: 'Biscuits',
    },
    {
      name: 'Khatai',
      price: 1200,
      priceUnit: 'kg',
      variants: createWeightVariants(1200),
      category: 'Biscuits',
    },
    {
      name: 'Cake Rusk',
      price: 1200,
      priceUnit: 'kg',
      variants: createWeightVariants(1200),
      category: 'Biscuits',
    },
    {
      name: 'Almond Cake Rusk',
      price: 1400,
      priceUnit: 'kg',
      variants: createWeightVariants(1400),
      category: 'Biscuits',
    },
    {
      name: 'Fruit Cake Slice',
      price: 1000,
      priceUnit: 'kg',
      variants: createWeightVariants(1000),
      category: 'Biscuits',
    },
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
    { name: 'Plain Cake', price: 200, category: 'Dry Cakes' },
    { name: 'Dry Fruit Nimko', price: 1200, priceUnit: 'kg', category: 'Nimko', badge: 'New' },
    { name: 'Mix Nimko', price: 900, priceUnit: 'kg', category: 'Nimko', badge: 'New' },
    { name: 'Sandwich Bread', price: 280, category: 'Bread' },
    {
      name: 'Milky Bread',
      category: 'Bread',
      variants: [
        { label: 'Small', price: 110 },
        { label: 'Large', price: 220 },
      ],
    },
    {
      name: 'Plain Bread',
      category: 'Bread',
      variants: [
        { label: 'Small', price: 110 },
        { label: 'Large', price: 220 },
      ],
    },
    { name: 'Brown Bread', price: 150, category: 'Bread' },
    { name: 'Shawarma Bread', variants: [{ label: '4pc', price: 90 }], category: 'Bread' },
    { name: 'Sheermall', price: 70, category: 'Bread' },
    { name: 'Sweet Bun', price: 50, category: 'Bread' },
    {
      name: 'Slice Rusk',
      category: 'Rusk',
      variants: [
        { label: '300g', price: 160 },
        { label: '500g', price: 260 },
      ],
    },
    { name: 'Burger Rusk', variants: [{ label: '500g', price: 260 }], category: 'Rusk' },
    { name: 'Cutt Rusk', variants: [{ label: '500g', price: 260 }], category: 'Rusk' },
    { name: 'Goll Rusk', variants: [{ label: '500g', price: 260 }], category: 'Rusk' },
    { name: 'Baby Rusk', variants: [{ label: '300g', price: 160 }], category: 'Rusk' },
    { name: 'Brown Rusk', price: 160, category: 'Rusk' },
  ],
  gifts: [
    {
      name: 'Gift Box 1',
      price: 1000,
      category: 'Gifts',
      badge: 'Celebration',
      imageKey: 'Gift (1)',
    },
    {
      name: 'Gift Box 2',
      price: 1000,
      category: 'Gifts',
      badge: 'Celebration',
      imageKey: 'Gift (2)',
    },
    {
      name: 'Gift Box 3',
      price: 1000,
      category: 'Gifts',
      badge: 'Celebration',
      imageKey: 'Gift (3)',
    },
    {
      name: 'Gift Box 4',
      price: 1000,
      category: 'Gifts',
      badge: 'Celebration',
      imageKey: 'Gift (4)',
    },
    {
      name: 'Gift Box 5',
      price: 1000,
      category: 'Gifts',
      badge: 'Celebration',
      imageKey: 'Gift (5)',
    },
    {
      name: 'Gift Box 6',
      price: 1000,
      category: 'Gifts',
      badge: 'Celebration',
      imageKey: 'Gift (6)',
    },
    {
      name: 'Gift Box 7',
      price: 1000,
      category: 'Gifts',
      badge: 'Celebration',
      imageKey: 'Gift (7)',
    },
    {
      name: 'Gift Box 8',
      price: 1000,
      category: 'Gifts',
      badge: 'Celebration',
      imageKey: 'Gift (8)',
    },
    {
      name: 'Gift Box 9',
      price: 1000,
      category: 'Gifts',
      badge: 'Celebration',
      imageKey: 'Gift (9)',
    },
  ],
  bakarkhani: [
    {
      name: 'Butter Khari',
      price: 900,
      priceUnit: 'kg',
      variants: bakarkhaniWeightVariants,
      category: 'Bakarkhani',
      badge: 'New',
    },
    {
      name: 'Coconut Puff',
      price: 900,
      priceUnit: 'kg',
      variants: bakarkhaniWeightVariants,
      category: 'Bakarkhani',
    },
    {
      name: 'Egg Puff',
      price: 900,
      priceUnit: 'kg',
      variants: bakarkhaniWeightVariants,
      category: 'Bakarkhani',
    },
    {
      name: 'Egg Sticks',
      price: 900,
      priceUnit: 'kg',
      variants: bakarkhaniWeightVariants,
      category: 'Bakarkhani',
      imageKey: 'EggStick',
    },
    {
      name: 'Kalaunji Puff',
      price: 900,
      priceUnit: 'kg',
      variants: bakarkhaniWeightVariants,
      category: 'Bakarkhani',
      imageKey: 'KalvaunjiPuff',
    },
    {
      name: 'Puff Bites',
      price: 900,
      priceUnit: 'kg',
      variants: bakarkhaniWeightVariants,
      category: 'Bakarkhani',
    },
    {
      name: 'Sugar Sticks',
      price: 900,
      priceUnit: 'kg',
      variants: bakarkhaniWeightVariants,
      category: 'Bakarkhani',
    },
    {
      name: 'Til Puff',
      price: 900,
      priceUnit: 'kg',
      variants: bakarkhaniWeightVariants,
      category: 'Bakarkhani',
    },
  ],
  pizzas: {
    regular: {
      sizes: { Small: 500, Medium: 1050, Large: 1450, XL: 2100 },
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
      sizes: { Small: 550, Medium: 1100, Large: 1500, XL: 2250 },
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
      sizes: { Medium: 1150, Large: 1650, XL: 2400 },
      flavors: [
        'Kabab Stuffer Pizza',
        'Crown Crust Pizza',
        'Royal Crust Pizza',
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
    image: getProductImage(item.name, item.imageKey),
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
    ...(item.imageKey ? { imageKey: item.imageKey } : {}),
    ...(variants ? { variants } : {}),
    ...(item.priceUnit ? { priceUnit: item.priceUnit } : {}),
  };
};

const hasProductImage = (product: Product): boolean => Boolean(product.image);

export const premiumCakes = catalogData.premiumCakes
  .map((item, index) => createProduct(item, 'Premium Cakes', 'premium-cake', index))
  .filter(hasProductImage);

const fastFoodProducts = catalogData.fastFood
  .map((item, index) => createProduct(item, getFastFoodCategory(item.name), 'fast-food', index))
  .filter(hasProductImage);

const cakeProducts = catalogData.cakes
  .map((item, index) => createProduct(item, item.category ?? 'Cakes', 'cake', index))
  .filter(hasProductImage);

const pastryProducts = catalogData.pastries
  .map((item, index) => createProduct(item, 'Pastries', 'pastry', index))
  .filter(hasProductImage);

const dessertProducts = catalogData.desserts
  .map((item, index) => createProduct(item, 'Desserts', 'dessert', index))
  .filter(hasProductImage);

const bakeryItemProducts = catalogData.bakeryItems
  .map((item, index) => {
    if (!item.category) throw new Error(`No bakery category exists for "${item.name}".`);
    return createProduct(item, item.category, 'bakery-item', index);
  })
  .filter(hasProductImage);

const giftProducts = catalogData.gifts
  .map((item, index) => {
    if (!item.category) throw new Error(`No gift category exists for "${item.name}".`);
    return createProduct(item, item.category, 'gift', index);
  })
  .filter(hasProductImage);

const bakarkhaniProducts = catalogData.bakarkhani
  .map((item, index) => {
    if (!item.category) throw new Error(`No bakarkhani category exists for "${item.name}".`);
    return createProduct(item, item.category, 'bakarkhani', index);
  })
  .filter(hasProductImage);

const pizzaProducts = Object.entries(catalogData.pizzas).flatMap(([style, pizzaMenu]) => {
  const variants = Object.entries(pizzaMenu.sizes).map(([label, price]) => ({ label, price }));
  const startingPrice = variants[0]?.price ?? 0;

  return pizzaMenu.flavors
    .map<Product>((name, index) => ({
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
    }))
    .filter(hasProductImage);
});

export const products: Product[] = [
  ...premiumCakes,
  ...cakeProducts,
  ...pastryProducts,
  ...dessertProducts,
  ...bakeryItemProducts,
  ...giftProducts,
  ...bakarkhaniProducts,
  ...pizzaProducts,
  ...fastFoodProducts,
];

export const premiumProduct = products.find((product) => product.name === '3 Milk Mango Cake');
export const premiumPastry = products.find((product) => product.name === '3 Milk Pastry');

export const featuredProducts = premiumCakes.slice(0, 4);
export const bestSellerProducts = cakeProducts.slice(0, 4);
export const seasonalProducts: Product[] = [];
