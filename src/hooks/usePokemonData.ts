import { useEffect, useState } from "react";
import { getPokemonList } from "../api/pokemonApi";
import type { PokemonListResponse } from "../types/pokemon";

export default function usePokemonData(offset = 0) {
  const [data, setData] = useState<PokemonListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const result = await getPokemonList(offset);
        setData(result);
      } catch (err) {
        setError(`Failed to load Pokemon data: ${err instanceof Error ? err.message : String(err)}`);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [offset]);

  return { data, loading, error };
}
