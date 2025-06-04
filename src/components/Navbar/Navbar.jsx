import { Link } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  return (
    <>
      <nav className="navbar">
        <Link to="/">
          <h1 className="navbar-title">
            <span className="span-love">Poké</span>Dex
          </h1>
        </Link>
      </nav>
    </>
  );
}
