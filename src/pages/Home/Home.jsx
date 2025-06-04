import { useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./home.css";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      <div className="home-container">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
    </>
  );
}
