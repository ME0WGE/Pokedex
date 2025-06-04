import { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./home.css";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import axios from "axios";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Call API
  useEffect(() => {
    axios
      .get("https://pokebuildapi.fr/api/v1/pokemon")
      .then((response) => {
        setPokemons(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(`Error : ${error}`);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Filtrer les pokémons selon l'input de l'utilisateur
  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Reload la page
  const handleClick = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="home-container">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      {/* Animation de chargement pendant que les données sont en train d'être récupérées */}
      {loading && (
        <div className="loading-container">
          <div className="pokeball-spinner"></div>
          <p>Les Pokémons se réveillent...</p>
        </div>
      )}

      {/* Afficher le message d'erreur et un bouton pour raffraîchir la page */}
      {error && (
        <div className="error-container">
          <p>Erreur: ${error}</p>
          <button onClick={handleClick}>Réessayer</button>
        </div>
      )}

      {/* Si les données sont chargées et qu'il n'y a pas d'erreur alors on affiche le contenu */}
      {!loading && !error && (
        <div className="pokemon-grid">
          {filteredPokemons.length > 0 ? (
            filteredPokemons.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))
          ) : (
            <div className="no-results">
              <p>Aucun Pokémon ne correspond à votre recherche</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
