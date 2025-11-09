import type { PokemonDetails, PokemonListResponse } from "../types/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

export async function getPokemonList(offset = 0, limit = 20): Promise<PokemonListResponse> {
  const res = await fetch(`${BASE_URL}?offset=${offset}&limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch Pokemon list");
  return res.json();
}

export async function getPokemonDetails(name: string): Promise<PokemonDetails> {
  const res = await fetch(`${BASE_URL}/${name}`);
  if (!res.ok) throw new Error("Failed to fetch Pokemon details");
  return res.json();
}
