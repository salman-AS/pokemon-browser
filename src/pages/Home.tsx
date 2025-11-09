import { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import usePokemonData from "../hooks/usePokemonData";
import { usePokemonSearch } from "../hooks/usePokemonSearch";
import PokemonCard from "../components/PokemonCard";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import "./Home.css";

const ITEMS_PER_PAGE = 20;

type PokemonListItem = { name: string };

type PaginatedGridProps = Readonly<{
  data: PokemonListItem[];
  page: number;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
}>;

function PaginatedGrid({
  data,
  page,
  hasNext,
  onPrev,
  onNext,
}: PaginatedGridProps) {
  return (
    <>
      <div className="home-grid" role="grid">
        {data.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            name={pokemon.name}
            currentPage={page}
          />
        ))}
      </div>
      <Pagination
        onPrev={onPrev}
        onNext={onNext}
        hasPrev={page > 1}
        hasNext={hasNext}
      />
    </>
  );
}

interface PokemonSearchResult {
  name: string;
  // Add other properties as needed
}

type SearchGridProps = Readonly<{
  loading: boolean;
  result: PokemonSearchResult | null;
  filteredList: PokemonListItem[];
  error: string | null;
  page: number;
}>;

function SearchGrid({ loading, result, filteredList = [], error, page }: SearchGridProps) {
  // compute content with if/else to avoid nested ternaries
  const content = (() => {
    if (loading) {
      return <div className="loading-container">Searching...</div>;
    }

    if (result) {
      // Show exact match from API if found
      return (
        <PokemonCard
          key={result.name}
          name={result.name}
          currentPage={page}
        />
      );
    }

    if (filteredList && filteredList.length > 0) {
      // Show filtered results from existing list
      return filteredList.map((pokemon) => (
        <PokemonCard
          key={pokemon.name}
          name={pokemon.name}
          currentPage={page}
        />
      ));
    }

    return (
      <output className="empty-container">{error || "No Pokémon found"}</output>
    );
  })();

  return (
    <div className="home-grid" role="grid">
      {content}
    </div>
  );
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number.parseInt(searchParams.get("page") || "1", 10);
  const offset = (page - 1) * ITEMS_PER_PAGE;
  const { data, loading, error } = usePokemonData(offset);
  const {
    result: searchResult,
    filteredList,
    loading: searchLoading,
    error: searchError,
  } = usePokemonSearch(search, data?.results);

  const handlePageChange = useCallback(
    (newPage: number) => {
      setSearchParams({ page: newPage.toString() });
    },
    [setSearchParams]
  );

  // Early loading/error/empty returns
  if (loading) {
    return (
      <div className="home-container">
        <h1 className="home-title">Pokemon Browser</h1>
        <div className="loading-container" aria-live="polite">
          <p>Loading Pokemon...</p>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="home-container">
        <h1 className="home-title">Pokemon Browser</h1>
        <div className="error-container" role="alert">
          <p className="error-text">{error}</p>
        </div>
      </div>
    );
  }
  if (!data?.results.length) {
    return (
      <div className="home-container">
        <h1 className="home-title">Pokemon Browser</h1>
        <output className="empty-container">No Pokemon available</output>
      </div>
    );
  }

  return (
    <main className="home-container">
      <h1 className="home-title">Pokemon Browser</h1>
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search Pokémon by name..."
      />
      {search ? (
        <SearchGrid
          loading={searchLoading}
          result={searchResult}
          filteredList={filteredList}
          error={searchError}
          page={page}
        />
      ) : (
        <PaginatedGrid
          data={data.results}
          page={page}
          hasNext={!!data.next}
          onPrev={() => handlePageChange(page - 1)}
          onNext={() => handlePageChange(page + 1)}
        />
      )}
    </main>
  );
}
