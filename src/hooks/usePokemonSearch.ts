import { useState, useEffect } from "react";
import { getPokemonDetails } from "../api/pokemonApi";

interface PokemonSearchResult {
  name: string;
  // Add other properties as needed
}

interface PokemonBasic {
  name: string;
}

interface SearchResult {
  result: PokemonSearchResult | null;
  filteredList: PokemonBasic[];
  loading: boolean;
  error: string | null;
}

export function usePokemonSearch(search: string, existingList?: PokemonBasic[]): SearchResult {
  const [result, setResult] = useState<PokemonSearchResult | null>(null);
  const [filteredList, setFilteredList] = useState<PokemonBasic[]>(existingList || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!search) {
      setResult(null);
      setFilteredList(existingList || []);
      setError(null);
      setLoading(false);
      return;
    }

    // Filter existing list
    if (existingList) {
      const filtered = existingList.filter(pokemon => 
        pokemon.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredList(filtered);
    }

    // Search API for specific pokemon
    setLoading(true);
    setError(null);
    getPokemonDetails(search.toLowerCase())
      .then((res) => {
        setResult(res);
        setError(null);
      })
      .catch(() => {
        setResult(null);
        setError("No Pokémon found");
      })
      .finally(() => setLoading(false));
  }, [search, existingList]);

  return { result, filteredList, loading, error };
}
