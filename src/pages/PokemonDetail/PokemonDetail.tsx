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
      <h1 className={styles.title}>
        {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
      </h1>
      <img
        className={styles.icon}
        src={pokemon.sprites.front_default}
        alt="pokemon"
      />
      <div className={styles.details}>
        <p>
          <span>Height</span>
          <span>{pokemon.height}</span>
        </p>
        <p>
          <span>Weight</span>
          <span>{pokemon.weight}</span>
        </p>
        <p>
          <span>Experience</span>
          <span>{pokemon.base_experience}</span>
        </p>
        <div className={styles.types}>
          {pokemon.types.map((t) => (
            <span key={t.type.name} className={styles.typeBadge}>
              {t.type.name}
            </span>
          ))}
        </div>
        <div className={styles.stats}>
          {pokemon.stats.map((s) => (
            <div key={s.stat.name} className={styles.statRow}>
              <span className={styles.statName}>{s.stat.name}</span>
              <div className={styles.statBarContainer}>
                <div
                  className={styles.statBarFill}
                  style={{ width: `${(s.base_stat / 150) * 100}%` }}
                />
              </div>
              <span className={styles.statValue}>{s.base_stat}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PokemonDetail;
