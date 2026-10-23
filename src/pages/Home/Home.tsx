import { useEffect, useState } from "react";
import { getPokemonList } from "../../Api/pokemon";
import type { PokemonListItem } from "../../Api/types";
import Loader from "../../components/Loader/Loader";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import styles from "./Home.module.css";

function Home() {
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getPokemonList();
        setPokemons(data.results);
      } catch {
        setError("Не удалось загрузить покемонов");
      } finally {
        setLoading(false);
      }
    };
    fetchPokemons();
  }, []);
  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;
  
  return (
    <div className={styles.grid}>
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.name} pokemon={pokemon} />
      ))}
    </div>
  );
}

export default Home;
