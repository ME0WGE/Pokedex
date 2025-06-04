import "./pokemonCard.css";
import { Link } from "react-router-dom";

export default function PokemonCard({ pokemon }) {
  return (
    <div className="pokemon-card">
      <div className="pokemon-card-image">
        <img src={pokemon.image} alt={pokemon.name} loading="lazy" />
        {/* Loading="lazy" permet de ne pas charger les images immédiatement, et de les charger seulement lorsqu'on s'approche de leurs cards */}
      </div>
      <div className="pokemon-card-info">
        <h3 className="pokemon-name">{pokemon.name}</h3>
        <div className="pokemon-id">#{pokemon.id}</div>
        <div className="pokemon-types">
          {pokemon.apiTypes.map((type, index) => (
            <span key={index} className="pokemon-type">
              {type.name}
            </span>
          ))}
        </div>
        <Link to={`/pokemon/${pokemon.id}`} className="details-button">
          Plus de détails
        </Link>
      </div>
    </div>
  );
}
