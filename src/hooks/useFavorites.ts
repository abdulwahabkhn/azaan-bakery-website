import { useCallback, useState } from 'react';

export interface UseFavoritesResult {
  favorites: ReadonlySet<string>;
  toggleFavorite: (productId: string) => void;
}

export const useFavorites = (): UseFavoritesResult => {
  const [favorites, setFavorites] = useState<ReadonlySet<string>>(() => new Set<string>());

  const toggleFavorite = useCallback((productId: string): void => {
    setFavorites((currentFavorites) => {
      const nextFavorites = new Set(currentFavorites);

      if (nextFavorites.has(productId)) {
        nextFavorites.delete(productId);
      } else {
        nextFavorites.add(productId);
      }

      return nextFavorites;
    });
  }, []);

  return { favorites, toggleFavorite };
};
