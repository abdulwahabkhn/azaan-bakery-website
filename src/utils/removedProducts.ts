const removedProductKeys = new Set([
  'variety-cake',
  'single-boti-sandwich',
  'double-boti-sandwich',
  'simple-chicken-single',
  'simple-chicken-double',
  'club-sandwich',
  'fry-sandwich',
  'chicken-drum-stick',
  'chicken-tikka-stick',
  'chicken-roll',
  'chicken-pastry-half',
  'chicken-cutlas-half',
  'chicken-patties',
  'chicken-cheese-patties',
  'chapli-kabab',
  'bread-roll',
  'full-pizza-snack',
  'half-pizza-slice',
  'half-burger',
  'boneless',
  'pizza-bite',
  'russian-salad-1kg',
  'nan-khatai',
  'nankhatai',
  'butter-flower',
]);

const normalizeProductIdentity = (value: string): string =>
  value
    .normalize('NFKC')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-');

export const isRemovedProductName = (name: string): boolean =>
  removedProductKeys.has(normalizeProductIdentity(name));
