import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPokemonByName } from "../../Api/pokemon";
import type { PokemonDetails } from "../../Api/types";
import Loader from "../../components/Loader/Loader";
import styles from "./PokemonDetail.module.css";

function PokemonDetail() {
  const { name } = useParams<{ name: string }>();

  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!name) return;
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        const data = await getPokemonByName(name);
        setPokemon(data);
      } catch {
        setError("Не удалось загрузить покемона");
      } finally {
        setLoading(false);
      }
    };
    fetchPokemon();
  }, [name]);

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;
  if (!pokemon) return null;

  return (
    <div className={styles.card}>
      <h1 className={styles.title}>{pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</h1>
      <img src={pokemon.sprites.front_default} alt="pokemon" />
      <div className={styles.details}>
        <p>
          <span>Height</span>
          <span>{pokemon.height}</span>
        </p>
        <p>
          <span>Weight</span>
          <span>{pokemon.weight}</span>
        </p>
        <p><span>Experience</span><span>{pokemon.base_experience}</span></p>
        <ul>
          {pokemon.types.map((t) => (
            <li key={t.type.name}>{t.type.name}</li>
          ))}
        </ul>
        <ul>{pokemon.stats.map((s) => (
          <li key={s.stat.name}>{s.stat.name}</li>
        ))}</ul>
      </div>
    </div>
  );
}

export default PokemonDetail;
