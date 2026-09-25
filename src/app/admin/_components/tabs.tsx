"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { ADMIN_SECTIONS, type SectionId } from "./sections";

/**
 * Estado das abas do painel: qual seção está na tela e quais têm edição ainda
 * não salva. Todos os formulários continuam montados — trocar de aba só esconde
 * o card —, então nada do que foi digitado se perde ao navegar.
 */
type TabsState = {
  active: SectionId;
  select: (id: SectionId) => void;
  dirty: ReadonlySet<SectionId>;
  setDirty: (id: SectionId, isDirty: boolean) => void;
};

const TabsContext = createContext<TabsState | null>(null);

export function TabsProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<SectionId>(ADMIN_SECTIONS[0].id);
  const [dirty, setDirtySet] = useState<ReadonlySet<SectionId>>(new Set());

  const select = useCallback((id: SectionId) => {
    setActive(id);
    // A seção nova começa do topo, não na altura em que a anterior foi deixada.
    window.scrollTo({ top: 0 });
  }, []);

  const setDirty = useCallback((id: SectionId, isDirty: boolean) => {
    setDirtySet((prev) => {
      if (prev.has(id) === isDirty) return prev;
      const next = new Set(prev);
      if (isDirty) next.add(id);
      else next.delete(id);
      return next;
    });
  }, []);

  return (
    <TabsContext.Provider value={{ active, select, dirty, setDirty }}>
      {children}
    </TabsContext.Provider>
  );
}

export function useTabs(): TabsState {
  const state = useContext(TabsContext);
  if (!state) throw new Error("useTabs precisa estar dentro de <TabsProvider>.");
  return state;
}
