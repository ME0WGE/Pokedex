import { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/">
          <h1 className="navbar-title">
            <span className="span-love">Poké</span>Dex
          </h1>
        </Link>
        <button
          className="info-button"
          onClick={toggleModal}
          aria-label="Informations">
          <FontAwesomeIcon icon={faInfoCircle} size="1x"/>
        </button>
      </nav>

      {/* Modal d'informations */}
      {showModal && (
        <div className="info-modal-backdrop" onClick={toggleModal}>
          <div className="info-modal" onClick={(e) => e.stopPropagation()}>
            <div className="info-modal-header">
              <h2>Informations sur les Pokémon</h2>
              <button className="close-button" onClick={toggleModal}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>

            <div className="info-modal-content">
              <div className="info-section">
                <h3>Les types de Pokémon</h3>
                <div className="types-grid">
                  <div
                    className="type-item"
                    style={{ backgroundColor: "#A8A878" }}>
                    Normal
                  </div>
                  <div
                    className="type-item"
                    style={{ backgroundColor: "#F08030" }}>
                    Feu
                  </div>
                  <div
                    className="type-item"
                    style={{ backgroundColor: "#6890F0" }}>
                    Eau
                  </div>
                  <div
                    className="type-item"
                    style={{ backgroundColor: "#A890F0" }}>
                    Psy
                  </div>
                  <div
                    className="type-item"
                    style={{ backgroundColor: "#78C850" }}>
                    Plante
                  </div>
                  <div
                    className="type-item"
                    style={{ backgroundColor: "#F8D030" }}>
                    Électrik
                  </div>
                  <div
                    className="type-item"
                    style={{ backgroundColor: "#F85888" }}>
                    Fée
                  </div>
                  <div
                    className="type-item"
                    style={{ backgroundColor: "#B8A038" }}>
                    Sol
                  </div>
                  <div
                    className="type-item"
                    style={{ backgroundColor: "#E0C068" }}>
                    Roche
                  </div>
                  <div
                    className="type-item"
                    style={{ backgroundColor: "#A040A0" }}>
                    Poison
                  </div>
                  <div
                    className="type-item"
                    style={{ backgroundColor: "#705898" }}>
                    Spectre
                  </div>
                  <div
                    className="type-item"
                    style={{ backgroundColor: "#98D8D8" }}>
                    Glace
                  </div>
                  <div
                    className="type-item"
                    style={{ backgroundColor: "#7038F8" }}>
                    Dragon
                  </div>
                  <div
                    className="type-item"
                    style={{ backgroundColor: "#705848" }}>
                    Combat
                  </div>
                  <div
                    className="type-item"
                    style={{ backgroundColor: "#B8B8D0" }}>
                    Acier
                  </div>
                  <div
                    className="type-item"
                    style={{ backgroundColor: "#A8B820" }}>
                    Insecte
                  </div>
                  <div
                    className="type-item"
                    style={{ backgroundColor: "#A890F0" }}>
                    Vol
                  </div>
                  <div
                    className="type-item"
                    style={{ backgroundColor: "#705848" }}>
                    Ténèbres
                  </div>
                </div>
              </div>

              <div className="info-section">
                <h3>Statistiques générales</h3>
                <ul className="stats-list">
                  <li>
                    <strong>Nombre total de Pokémon:</strong> 898 (jusqu'à la
                    8ème génération)
                  </li>
                  <li>
                    <strong>Nombre de générations:</strong> 8
                  </li>
                  <li>
                    <strong>Premier Pokémon:</strong> Bulbizarre (Pokédex #1)
                  </li>
                  <li>
                    <strong>Pokémon légendaires:</strong> 59
                  </li>
                </ul>
              </div>

              <div className="info-section">
                <h3>À propos de cette application</h3>
                <p>
                  Cette application Pokédex utilise l'API PokeBuild pour
                  afficher les informations sur les Pokémon. Vous pouvez
                  rechercher des Pokémon par leur nom et consulter leurs
                  informations détaillées.
                </p>
                <p>
                  Les données sont obtenues via{" "}
                  <a
                    href="https://pokebuildapi.fr/api/v1"
                    target="_blank"
                    rel="noopener noreferrer">
                    PokeBuild API
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
