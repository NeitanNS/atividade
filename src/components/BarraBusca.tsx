import { RefObject } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  inputRef?: RefObject<HTMLInputElement | null>;
}

function BarraBusca({ value, onChange, inputRef }: Props) {
  return (
    <input
      ref={inputRef}
      type="text"
      className="campo-busca"
      placeholder="🔍 Buscar por nome..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default BarraBusca;
