export type PokemonListItem = {
  name: string;
  url: string;
};

export type PokemonListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
};

export type PokemonDetails = {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: {
    slot: number;
    type: { name: string; url: string };
  }[];
  sprites: {
    front_default: string;
  };
  stats: {
    base_stat: number;
    stat: { name: string; url: string };
  }[];
};
