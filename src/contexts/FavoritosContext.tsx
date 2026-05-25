import {
  createContext,
  ReactNode,
  useContext,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface FavoritosContextType {
  favoritos: number[];
  toggleFavorito: (id: number) => void;
  isFavorito: (id: number) => boolean;
  totalFavoritos: number;
}

const FavoritosContext = createContext<FavoritosContextType | null>(null);

export function FavoritosProvider({ children }: { children: ReactNode }) {
  const [favoritos, setFavoritos] = useLocalStorage<number[]>("favoritos", []);

  function toggleFavorito(id: number) {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  }

  function isFavorito(id: number) {
    return favoritos.includes(id);
  }

  return (
    <FavoritosContext.Provider
      value={{
        favoritos,
        toggleFavorito,
        isFavorito,
        totalFavoritos: favoritos.length,
      }}
    >
      {children}
    </FavoritosContext.Provider>
  );
}

export function useFavoritos() {
  const context = useContext(FavoritosContext);
  if (!context) {
    throw new Error("useFavoritos deve ser usado dentro de FavoritosProvider.");
  }
  return context;
}
