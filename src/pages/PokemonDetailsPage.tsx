import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getPokemonDetails } from '../api/pokemonApi';
import PokemonDetails from '../components/PokemonDetails';
import type { PokemonDetails as PokemonDetailsType } from '../types/pokemon';
import './PokemonDetailsPage.css';

export default function PokemonDetailsPage() {
  const { name } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [pokemon, setPokemon] = useState<PokemonDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPokemonDetails() {
      if (!name) {
        setError('Pokemon name is required');
        return;
      }

      try {
        const data = await getPokemonDetails(name);
        setPokemon(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch Pokemon details');
        console.error('Error fetching Pokemon details:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemonDetails();
  }, [name]);

  if (loading) {
    return (
      <div className="pokemon-details-page">
        <div className="pokemon-details-container loading">
          <div className="loader">Loading...</div>
        </div>
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="pokemon-details-page">
        <div className="pokemon-details-container error">
          <p className="error-message">{error || 'Pokemon not found'}</p>
          <button className="back-button" onClick={() => navigate('/')}>
            Back to List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pokemon-details-page">
      <div className="pokemon-details-container">
        <button 
          className="back-button" 
          onClick={() => navigate(location.state?.fromPage ? `/?page=${location.state.fromPage}` : '/')}
        >
          ← Back to List
        </button>
        <PokemonDetails pokemon={pokemon} />
      </div>
    </div>
  );
}