import { API_URL } from "./config";
import type { PokemonDetails, PokemonListResponse } from "./types";

export async function getPokemonList(
  limit: number = 20,
  offset: number = 0,
): Promise<PokemonListResponse> {
  const response = await fetch(
    `${API_URL}/pokemon?limit=${limit}&offset=${offset}`,
  );
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  const result = await response.json();
  return result;
}

export async function getPokemonByName(name: string): Promise<PokemonDetails> {
  const response = await fetch(`${API_URL}/pokemon/${name}`);
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  const result = await response.json();
  return result;
}
