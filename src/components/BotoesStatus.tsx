import { FiltroStatus } from "../types/rickandmorty";

interface Props {
  filtroStatus: FiltroStatus;
  onChange: (status: FiltroStatus) => void;
}

function BotoesStatus({ filtroStatus, onChange }: Props) {
  return (
    <div className="filtros">
      {(["all", "alive", "dead", "unknown"] as FiltroStatus[]).map((s) => (
        <button
          key={s}
          className={`btn-filtro ${filtroStatus === s ? "ativo" : ""}`}
          onClick={() => onChange(s)}
        >
          {s === "all" ? "Todos" : s.charAt(0).toUpperCase() + s.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default BotoesStatus;
