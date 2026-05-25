import { useEffect, useState } from "react";

export function useFetch<T>(url: string) {
  const [dados, setDados] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function buscar() {
      setLoading(true);
      setErro(null);

      try {
        const resposta = await fetch(url, { signal: controller.signal });
        if (!resposta.ok) {
          throw new Error("Não foi possível carregar os dados.");
        }
        const json: T = await resposta.json();
        setDados(json);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        setErro(
          error instanceof Error ? error.message : "Erro inesperado ao buscar dados."
        );
      } finally {
        setLoading(false);
      }
    }

    void buscar();
    return () => controller.abort();
  }, [url]);

  return { dados, loading, erro };
}
