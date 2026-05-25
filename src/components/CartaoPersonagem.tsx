import { memo } from "react";
import { useFavoritos } from "../contexts/FavoritosContext";
import { Personagem } from "../types/rickandmorty";

const CartaoPersonagem = memo(function CartaoPersonagem({
  personagem,
}: {
  personagem: Personagem;
}) {
  const { isFavorito, toggleFavorito } = useFavoritos();
  const favorito = isFavorito(personagem.id);
  const classeBadge =
    personagem.status === "Alive"
      ? "badge-alive"
      : personagem.status === "Dead"
        ? "badge-dead"
        : "badge-unknown";

  return (
    <article className={`card ${favorito ? "card-favorito" : ""}`}>
      <button
        className="btn-favorito"
        onClick={() => toggleFavorito(personagem.id)}
        aria-label={favorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      >
        {favorito ? "❤️" : "🤍"}
      </button>
      <img src={personagem.image} alt={personagem.name} className="card-img" />
      <div className="card-body">
        <h4 className="card-nome">{personagem.name}</h4>
        <p className="card-especie">{personagem.species}</p>
        <span className={`badge ${classeBadge}`}>{personagem.status}</span>
      </div>
    </article>
  );
});

export default CartaoPersonagem;
