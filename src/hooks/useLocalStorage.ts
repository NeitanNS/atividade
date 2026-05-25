import { useState } from "react";

export function useLocalStorage<T>(chave: string, valorInicial: T) {
  const [valor, setValor] = useState<T>(() => {
    const salvo = localStorage.getItem(chave);
    return salvo ? (JSON.parse(salvo) as T) : valorInicial;
  });

  function setValorEPersistir(
    novoValor: T | ((valorAnterior: T) => T)
  ): void {
    setValor((anterior) => {
      const valorAtualizado =
        novoValor instanceof Function ? novoValor(anterior) : novoValor;
      localStorage.setItem(chave, JSON.stringify(valorAtualizado));
      return valorAtualizado;
    });
  }

  return [valor, setValorEPersistir] as const;
}
