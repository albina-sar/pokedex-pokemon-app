import { useEffect, useState } from "react";
import type { PokemonListItem } from "../Api/types";

type FavoritesContextType = {
  favorites: PokemonListItem[];
  toggleFavorite: (pokemon: PokemonListItem) => void;
  isFavorite: (name: string) => boolean;
};

function FavoritesContext() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const raw = localStorage.getItem("favorites");
    return raw ? JSON.parse(raw) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);
}
export default FavoritesContext;
