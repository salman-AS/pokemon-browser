import { memo } from "react";
import type { PokemonDetails as PokemonDetailsType } from "../types/pokemon";
import "./PokemonDetails.css";

interface PokemonDetailsProps {
  readonly pokemon: PokemonDetailsType;
}

function PokemonDetails({ pokemon }: Readonly<PokemonDetailsProps>) {
  return (
    <section className="pokemon-details">
      <header className="pokemon-details-header">
        <h2 className="pokemon-details-name">{pokemon.name}</h2>
        <span className="pokemon-details-number" aria-label={`Pokemon number ${pokemon.id}`}>
          #{String(pokemon.id).padStart(3, '0')}
        </span>
      </header>
      
      <div className="pokemon-details-images">
        <div className="sprite-container">
          <img src={pokemon.sprites.front_default} alt={`${pokemon.name} front view`} />
          <span>Front View</span>
        </div>
        {pokemon.sprites.back_default && (
          <div className="sprite-container">
            <img src={pokemon.sprites.back_default} alt={`${pokemon.name} back view`} />
            <span>Back View</span>
          </div>
        )}
      </div>

      <div className="pokemon-details-types">
        {pokemon.types.map(({ type }) => (
          <span key={type.name} className={`type-badge ${type.name}`}>
            {type.name}
          </span>
        ))}
      </div>

      <div className="pokemon-details-info">
        <div className="info-group">
          <span role="text">Height</span>
          <span>{(pokemon.height / 10).toFixed(1)}m</span>
        </div>
        <div className="info-group">
          <span role="text">Weight</span>
          <span>{(pokemon.weight / 10).toFixed(1)}kg</span>
        </div>
        <div className="info-group">
          <span role="text">Base Experience</span>
          <span>{pokemon.base_experience}</span>
        </div>
      </div>

      <div className="pokemon-details-section">
        <h4>Abilities</h4>
        <div className="abilities-list">
          {pokemon.abilities.map(({ ability, is_hidden }) => (
            <span key={ability.name} className={`ability-badge ${is_hidden ? 'hidden-ability' : ''}`}>
              {ability.name.replace('-', ' ')}
              {is_hidden && ' (Hidden)'}
            </span>
          ))}
        </div>
      </div>

      <div className="pokemon-details-section">
        <h4>Base Stats</h4>
        <div className="stats-grid">
          {pokemon.stats.map(({ stat, base_stat }) => (
            <div key={stat.name} className="stat-group">
              <span role="text">{stat.name.replace('-', ' ')}</span>
              <div className="stat-bar-container">
                <div 
                  className="stat-bar" 
                  style={{ width: `${(base_stat / 255) * 100}%` }}
                  title={`${base_stat}/255`}
                />
                <span className="stat-value">{base_stat}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Memoize the component to prevent unnecessary re-renders
export default memo(PokemonDetails);

