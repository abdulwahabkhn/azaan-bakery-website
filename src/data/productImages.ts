type ImageExtension = 'webp' | 'png' | 'jpg' | 'jpeg';

const imageModules = import.meta.glob<string>('../assets/images/*.{webp,png,jpg,jpeg}', {
  eager: true,
  import: 'default',
  query: '?url',
});

const extensionPriority: Readonly<Record<ImageExtension, number>> = {
  webp: 4,
  png: 3,
  jpg: 2,
  jpeg: 1,
};

export const normalizeImageLookupKey = (value: string): string =>
  value
    .toLowerCase()
    .replace(/['&()[\]{}]/g, '')
    .replace(/[^a-z0-9]/g, '');

const getFileName = (path: string): string => path.split(/[\\/]/).pop() ?? path;

const getFileStem = (path: string): string => getFileName(path).replace(/\.[^.]+$/, '');

const getExtension = (path: string): ImageExtension => {
  const extension = getFileName(path).split('.').pop()?.toLowerCase();
  return extension === 'webp' || extension === 'png' || extension === 'jpg' || extension === 'jpeg'
    ? extension
    : 'jpeg';
};

const imageByLookupKey = Object.entries(imageModules).reduce<Record<string, string>>(
  (images, [path, url]) => {
    const lookupKey = normalizeImageLookupKey(getFileStem(path));
    const existingUrl = images[lookupKey];

    if (!existingUrl) {
      images[lookupKey] = url;
      return images;
    }

    const existingPath = Object.entries(imageModules).find(([, existing]) => existing === existingUrl)?.[0];
    const existingPriority = existingPath ? extensionPriority[getExtension(existingPath)] : 0;
    const nextPriority = extensionPriority[getExtension(path)];

    if (nextPriority > existingPriority) {
      images[lookupKey] = url;
    }

    return images;
  },
  {},
);

const manualImageKeys = {
  '3 Milk Classical Cake': 'ClassicalThreeMilkCake',
  'Classical Three Milk Cake': 'ClassicalThreeMilkCake',
  '3 Milk Mango Cake': 'ThreeMilkMangoCake',
  '3 Milk Pastry': 'ThreeMilkPastry',
  'Three Milk Pastry': 'ThreeMilkPastry',
  '2 in 1 Chocolate & Mix Fruit Cake': '2in1ChocolateFruitCake',
  'Azaan Special Roll': 'AzaanSpecialRoll4pc',
  'Azaan Special Roll (4pc)': 'AzaanSpecialRoll4pc',
  'Baby Rusk 300g': 'Babyrusk',
  'Bar BQ Roll': 'BarBQRoll4pc',
  'Bar BQ Roll (4pc)': 'BarBQRoll4pc',
  'Behari Roll': 'BehariRoll4pc',
  'Behari Roll (4pc)': 'BehariRoll4pc',
  'Burger Rusk 500g': 'BurgerRusk',
  'Chicken Burger': 'ChickenBuger',
  'Chicken Cheese Stuffer': 'KababCheeseStuffer',
  'Creamy & Cheesy Pasta': 'CreamyCheesyPasta',
  'Cutt Rusk 500g': 'CuttRusk',
  'Fried Hot Wings': 'FriedHotWings6pc',
  'Fried Hot Wings (6pc)': 'FriedHotWings6pc',
  'Fried Hot Wings (12pc)': 'FriedHotWings12pc',
  'Goll Rusk 500g': 'GollRusk',
  'Honey Masted Wings': 'HoneyMastedWings6pc',
  'Honey Masted Wings (6pc)': 'HoneyMastedWings6pc',
  'Honey Masted Wings (12pc)': 'HoneyMastedWings12pc',
  'Hot n Spicy Pizza': 'HotnSpicyPizza',
  'Kabab Stuffer Pizza': 'KebabStuffer',
  'Milky Bread Large': 'MilkyBread',
  'Milky Bread Small': 'MilkyBreadSmall',
  'Oven Baked Wings': 'OvenBakedWings6pc',
  'Oven Baked Wings (6pc)': 'OvenBakedWings6pc',
  'Oven Baked Wings (12pc)': 'OvenBakedWings12pc',
  'Plain Bread Large': 'PlainBread',
  'Plain Bread Small': 'PlainBread',
  'Red Velvet Cake (2 Pound)': 'RedVelvetCake',
  'Shawarma Bread (4pc)': 'ShawarmaBread',
  'Slice Rusk 300g': 'SliceRusk',
  'Slice Rusk 500g': 'SliceRusk',
  'Special Arabic Sweet': 'SpecialArabicSweet',
  'Tortilla Wrap': 'TortilaWrap',
} as const satisfies Readonly<Record<string, string>>;

const resolveImage = (lookupValue: string): string =>
  imageByLookupKey[normalizeImageLookupKey(lookupValue)] ?? '';

export const getProductImage = (name: string, imageKey?: string): string =>
  (imageKey ? resolveImage(imageKey) : '') ||
  resolveImage(name) ||
  resolveImage(manualImageKeys[name as keyof typeof manualImageKeys] ?? '');

const legacyProductImages = Object.fromEntries(
  Object.keys(manualImageKeys).map((name) => [name, getProductImage(name)]),
);

export const productImages: Readonly<Record<string, string>> = new Proxy(legacyProductImages, {
  get(target, property) {
    if (typeof property !== 'string') {
      return Reflect.get(target, property);
    }

    return target[property] ?? getProductImage(property);
  },
});

export const bakeryImages = {
  building: resolveImage('BakeryBuilding'),
  classicalThreeMilkCake: getProductImage('3 Milk Classical Cake'),
  logo: resolveImage('Logo'),
  threeMilkMangoCake: getProductImage('3 Milk Mango Cake'),
} as const;
