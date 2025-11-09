// ...existing code...
import { useNavigate } from "react-router-dom";
import "./PokemonCard.css";

interface PokemonCardProps {
  readonly name: string;
  readonly currentPage: number;
}

function PokemonCard({ name, currentPage }: Readonly<PokemonCardProps>) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pokemon/${name}`, { 
      state: { fromPage: currentPage },
      // Preserve the existing scroll position when navigating
      preventScrollReset: true
    });
  };

  return (
    <article className="pokemon-card">
      <h2 className="pokemon-card-name">{name}</h2>
      <button 
        className="pokemon-card-button" 
        onClick={handleClick}
        aria-label={`View details for ${name}`}
      >
        View Details
      </button>
    </article>
  );
}


export default PokemonCard;


