import { useEffect, useState, useCallback, useMemo } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./home.css";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import axios from "axios";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemons, setPokemons] = useState(() => {
    // Récupération depuis le localStorage s'il existe pour ne pas gaspiller inutilement les ressources à chaque action de raffraîchissement de la page
    const cachedPokemons = localStorage.getItem("pokemons");
    return cachedPokemons ? JSON.parse(cachedPokemons) : [];
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Call API avec une gestion optimisée des dépendances
  useEffect(() => {
    // Seulement charger les données au premier rendu
    if (!isInitialLoad) return;

    if (pokemons.length > 0) {
      // Si des données sont déjà en cache, ne pas recharger
      setLoading(false);
      setIsInitialLoad(false);
      return;
    }

    setLoading(true);
    axios
      .get("https://pokebuildapi.fr/api/v1/pokemon")
      .then((response) => {
        setPokemons(response.data);
        setLoading(false);
        // Stockage dans localStorage pour les prochaines visites
        localStorage.setItem("pokemons", JSON.stringify(response.data));
        setIsInitialLoad(false);
      })
      .catch((error) => {
        console.log(`Error : ${error}`);
        setError(error.message);
        setLoading(false);
        setIsInitialLoad(false);
      });
  }, [isInitialLoad, pokemons.length]); // Ajout des dépendances nécessaires

  // Utilisation de useMemo pour optimiser le filtrage des pokémons
  const filteredPokemons = useMemo(() => {
    return pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [pokemons, searchTerm]);

  // Reload la page de façon plus propre avec useCallback
  const handleClick = useCallback(() => {
    window.location.reload();
  }, []);

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
          <p>Erreur: {error}</p> {/* Correction de l'interpolation */}
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
