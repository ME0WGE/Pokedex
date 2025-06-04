import { Route, Routes } from "react-router-dom";
import "./App.css";
import PokemonDetails from "./pages/PokemonDetails/PokemonDetails";
import Layout from "./Layout";
import Home from "./pages/Home/Home";

function App() {
  return (
    <>
      <Routes>
        {/* HOMEPAGE */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/pokemon/:id" element={<PokemonDetails />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
