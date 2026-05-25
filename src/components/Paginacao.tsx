import { ApiInfo } from "../types/rickandmorty";

interface Props {
  info: ApiInfo;
  pagina: number;
  onPaginaAnterior: () => void;
  onProximaPagina: () => void;
}

function Paginacao({
  info,
  pagina,
  onPaginaAnterior,
  onProximaPagina,
}: Props) {
  return (
    <div className="paginacao">
      <span className="pag-info">
        {info.count} personagens · Página {pagina} de {info.pages}
      </span>
      <div className="pag-botoes">
        <button
          className="btn-pag"
          disabled={!info.prev}
          onClick={onPaginaAnterior}
        >
          ← Anterior
        </button>
        <button
          className={`btn-pag ${info.next ? "proximo" : ""}`}
          disabled={!info.next}
          onClick={onProximaPagina}
        >
          Próxima →
        </button>
      </div>
    </div>
  );
}

export default Paginacao;
