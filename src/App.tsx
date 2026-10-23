import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getPokemonList } from "./Api/pokemon";
import type { PokemonListItem } from "./Api/types";
import Layout from "./components/Layout/Layout";
import About from "./pages/About/About";
import Favorites from "./pages/Favorites/Favorites";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import PokemonDetail from "./pages/PokemonDetail/PokemonDetail";

function App() {
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);

  useEffect(() => {
    getPokemonList().then((data) => {
      console.log("Список:", data.results);
      setPokemons(data.results);
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="about" element={<About />} />
          <Route path="pokemon/:name" element={<PokemonDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
