import { memo } from "react";
import "./pokemonCard.css";
import { Link } from "react-router-dom";

const PokemonCard = memo(function PokemonCard({ pokemon }) {
  // Fonction pour s'assurer que la couleur est bien définie
  const getTypeColor = (type) => {
    if (type && type.color) {
      return type.color;
    }

    // Couleurs basées sur le nom du type
    const typeColors = {
      Normal: "#A8A878",
      Feu: "#F08030",
      Eau: "#6890F0",
      Électrik: "#F8D030",
      Plante: "#78C850",
      Glace: "#98D8D8",
      Combat: "#C03028",
      Poison: "#A040A0",
      Sol: "#E0C068",
      Vol: "#A890F0",
      Psy: "#F85888",
      Insecte: "#A8B820",
      Roche: "#B8A038",
      Spectre: "#705898",
      Dragon: "#7038F8",
      Ténèbres: "#705848",
      Acier: "#B8B8D0",
      Fée: "#EE99AC",
    };

    return typeColors[type.name] || "#777777"; // Gris par défaut
  };

  return (
    <div className="pokemon-card">
      <div className="pokemon-card-image">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          loading="lazy"
          width="150"
          height="150"
        />
      </div>
      <div className="pokemon-card-info">
        <h3 className="pokemon-name">{pokemon.name}</h3>
        <div className="pokemon-id">#{pokemon.id}</div>
        <div className="pokemon-types">
          {pokemon.apiTypes &&
            pokemon.apiTypes.map((type, index) => (
              <span
                key={index}
                className="pokemon-type"
                style={{ backgroundColor: getTypeColor(type) }}>
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
});
export default PokemonCard;
