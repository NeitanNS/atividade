import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import BarraBusca from "./components/BarraBusca";
import BotoesStatus from "./components/BotoesStatus";
import CartaoPersonagem from "./components/CartaoPersonagem";
import Paginacao from "./components/Paginacao";
import { useFavoritos } from "./contexts/FavoritosContext";
import { useDebounce } from "./hooks/useDebounce";
import { useFetch } from "./hooks/useFetch";
import { FiltroStatus, RespostaAPI } from "./types/rickandmorty";

function App() {
  const [pagina, setPagina] = useState(1);
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<FiltroStatus>("all");
  const buscaRef = useRef<HTMLInputElement>(null);
  const buscaDebounced = useDebounce(busca, 400);
  const statusQuery = filtroStatus === "all" ? "" : `&status=${filtroStatus}`;
  const url = `https://rickandmortyapi.com/api/character?page=${pagina}${statusQuery}`;
  const { dados, loading, erro } = useFetch<RespostaAPI>(url);
  const { totalFavoritos } = useFavoritos();
  const personagensFiltrados = useMemo(
    () =>
      (dados?.results ?? []).filter((p) =>
        p.name.toLowerCase().includes(buscaDebounced.toLowerCase())
      ),
    [dados, buscaDebounced]
  );
  useEffect(() => buscaRef.current?.focus(), [filtroStatus]);

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>🧬 Painel de Personagens</h1>
          <p className="subtitulo">Dados consumidos da Rick and Morty API</p>
        </div>
        <div className="contador">{totalFavoritos} favoritos</div>
      </header>
      <div className="controles">
        <BarraBusca value={busca} onChange={setBusca} inputRef={buscaRef} />
        <BotoesStatus
          filtroStatus={filtroStatus}
          onChange={(status) => {
            setFiltroStatus(status);
            setPagina(1);
          }}
        />
      </div>
      {loading && <p className="status loading">⏳ Carregando personagens...</p>}
      {erro && <p className="status erro">❌ {erro}</p>}
      {!loading && !erro && (
        <div className="grid">
          {personagensFiltrados.length > 0 ? (
            personagensFiltrados.map((p) => <CartaoPersonagem key={p.id} personagem={p} />)
          ) : (
            <p className="vazio">Nenhum personagem encontrado.</p>
          )}
        </div>
      )}
      {dados?.info && !loading && (
        <Paginacao
          info={dados.info}
          pagina={pagina}
          onPaginaAnterior={() => setPagina((p) => p - 1)}
          onProximaPagina={() => setPagina((p) => p + 1)}
        />
      )}
    </div>
  );
}

export default App;
