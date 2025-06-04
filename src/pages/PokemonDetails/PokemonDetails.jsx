import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./pokemonDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function PokemonDetails() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Call API pour un seul Pokémon
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://pokebuildapi.fr/api/v1/pokemon/${id}`)
      .then((response) => {
        setPokemon(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(`Error : ${error}`);
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  // Si loading, afficher l'animation de loading
  if (loading) {
    return (
      <div className="loading-container">
        <div className="pokeball-spinner"></div>
        <p>Les Pokémons se réveillent...</p>
      </div>
    );
  }

  // Si erreur, afficher le message d'erreur et un lien pour retourner vers la page principale
  if (error) {
    return (
      <div className="error-container">
        <p>Erreur: {error}</p>
        <Link to="/" className="back-link">
          Retour à la liste
        </Link>
      </div>
    );
  }

  // Si le pokémon est introuvable, afficher le message d'erreur et un lien pour retourner vers la page principale
  if (!pokemon) {
    return (
      <div className="error-container">
        <p>Pokémon introuvable</p>
        <Link to="/" className="back-link">
          Retour à la liste
        </Link>
      </div>
    );
  }

  // Si les données sont chargées et qu'il n'y a pas d'erreur alors on affiche le contenu
  return (
    <div className="pokemons-details-container">
      <Link to="/" className="back-link">
        <FontAwesomeIcon icon={faArrowLeft} /> Retour
      </Link>

      {/* Name */}
      <div className="pokemons-details-card">
        <div className="pokemons-details-header">
          <h1>{pokemon.name}</h1>
          <span className="pokemons-details-id">#{pokemon.id}</span>
        </div>

        <div className="pokemons-details-main">
          <div className="pokemons-details-image">
            <img src={pokemon.image} alt={pokemon.name} />
          </div>

          {/* Type */}
          <div className="pokemons-details-info">
            <div className="pokemons-details-types">
              {pokemon.apiTypes.map((type, index) => (
                <span key={index} className="pokemons-type">
                  {type.name}
                </span>
              ))}
            </div>

            {/* HP */}
            <div className="pokemons-details-stats">
              <h3>Statistiques</h3>
              <div className="stat-group">
                <div className="stat">
                  <span className="stat-name">HP</span>
                  <div className="stat-bar-container">
                    <div
                      className="stat-bar"
                      style={{
                        width: `${(pokemon.stats.HP / 255) * 100}%`,
                        backgroundColor: "#ff5959",
                      }}></div>
                  </div>
                  <span className="stat-value">{pokemon.stats.HP}</span>
                </div>

                {/* Attack */}
                <div className="stat">
                  <span className="stat-name">Attaque</span>
                  <div className="stat-bar-container">
                    <div
                      className="stat-bar"
                      style={{
                        width: `${(pokemon.stats.attack / 255) * 100}%`,
                        backgroundColor: "#f5ac78",
                      }}></div>
                  </div>
                  <span className="stat-value">{pokemon.stats.attack}</span>
                </div>

                {/* Defense */}
                <div className="stat">
                  <span className="stat-name">Défense</span>
                  <div className="stat-bar-container">
                    <div
                      className="stat-bar"
                      style={{
                        width: `${(pokemon.stats.defense / 255) * 100}%`,
                        backgroundColor: "#fae078",
                      }}></div>
                  </div>
                  <span className="stat-value">{pokemon.stats.defense}</span>
                </div>

                {/* Special Attack */}
                <div className="stat">
                  <span className="stat-name">Att. Spé</span>
                  <div className="stat-bar-container">
                    <div
                      className="stat-bar"
                      style={{
                        width: `${(pokemon.stats.special_attack / 255) * 100}%`,
                        backgroundColor: "#9db7f5",
                      }}></div>
                  </div>
                  <span className="stat-value">
                    {pokemon.stats.special_attack}
                  </span>
                </div>

                {/* Special Defense */}
                <div className="stat">
                  <span className="stat-name">Déf. Spé</span>
                  <div className="stat-bar-container">
                    <div
                      className="stat-bar"
                      style={{
                        width: `${
                          (pokemon.stats.special_defense / 255) * 100
                        }%`,
                        backgroundColor: "#a7db8d",
                      }}></div>
                  </div>
                  <span className="stat-value">
                    {pokemon.stats.special_defense}
                  </span>
                </div>

                {/* Speed */}
                <div className="stat">
                  <span className="stat-name">Vitesse</span>
                  <div className="stat-bar-container">
                    <div
                      className="stat-bar"
                      style={{
                        width: `${(pokemon.stats.speed / 255) * 100}%`,
                        backgroundColor: "#fa92b2",
                      }}></div>
                  </div>
                  <span className="stat-value">{pokemon.stats.speed}</span>
                </div>
              </div>
            </div>

            {/* Generation */}
            <div className="pokemons-details-extra">
              <div className="detail-item">
                <h4>Génération</h4>
                <p>{pokemon.apiGeneration}</p>
              </div>

              {/* Pre Evolution */}
              {pokemon.apiPreEvolution && (
                <div className="detail-item">
                  <h4>Pré-évolution</h4>
                  <p>{pokemon.apiPreEvolution.name}</p>
                </div>
              )}

              {/* Evolution */}
              {/* Afficher les évolutions si existent */}
              {pokemon.apiEvolutions && pokemon.apiEvolutions.length > 0 && (
                <div className="detail-item">
                  <h4>Évolutions</h4>
                  <div className="evolutions-list">
                    {pokemon.apiEvolutions.map((evolution, index) => (
                      <Link
                        key={index}
                        to={`/pokemon/${evolution.pokedexId}`}
                        className="evolution-item">
                        {evolution.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
