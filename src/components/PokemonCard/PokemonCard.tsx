import { Link } from "react-router-dom";
import styles from "./PokemonCard.module.css";
import type { PokemonCardProps } from "./type";

function PokemonCard({ pokemon }: PokemonCardProps) {
  const id = pokemon.url.split("/").filter(Boolean).pop();
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <Link to={`/pokemon/${pokemon.name}`} className={styles.card}>
      <img src={imageUrl} alt={pokemon.name} />
      <p>{pokemon.name}</p>
    </Link>
  );
}

export default PokemonCard;
