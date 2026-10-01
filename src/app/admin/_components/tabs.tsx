"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ADMIN_SECTIONS, type SectionId } from "./sections";
import UnsavedDialog from "./UnsavedDialog";

/**
 * Estado das abas do painel: qual seção está na tela e quais têm edição ainda
 * não salva. Todos os formulários continuam montados — trocar de aba só esconde
 * o card. Sair de uma seção com edição pendente (trocar de aba, encerrar a
 * sessão) passa por `guard`, que pergunta antes: salvar, descartar ou ficar.
 * Fechar ou recarregar a página cai no aviso do próprio navegador.
 */

/** O que cada formulário expõe para o aviso poder salvar ou descartar por ele. */
export type SectionControls = {
  /** Devolve `false` se a gravação falhou — aí o aviso não deixa sair. */
  save: () => Promise<boolean>;
  discard: () => void;
};

type TabsState = {
  active: SectionId;
  select: (id: SectionId) => void;
  dirty: ReadonlySet<SectionId>;
  setDirty: (id: SectionId, isDirty: boolean) => void;
  registerControls: (id: SectionId, controls: SectionControls) => void;
  /** Executa `action` — depois de perguntar, se a seção aberta tem edição pendente. */
  guard: (action: () => void) => void;
};

const TabsContext = createContext<TabsState | null>(null);

export function TabsProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<SectionId>(ADMIN_SECTIONS[0].id);
  const [dirty, setDirtySet] = useState<ReadonlySet<SectionId>>(new Set());
  // Ação que ficou esperando a resposta do aviso (trocar de aba, sair…).
  const [pending, setPending] = useState<(() => void) | null>(null);
  const controls = useRef(new Map<SectionId, SectionControls>());

  const hasDirty = dirty.size > 0;
  const activeDirty = dirty.has(active);

  const guard = useCallback(
    (action: () => void) => {
      if (activeDirty) setPending(() => action);
      else action();
    },
    [activeDirty],
  );

  const select = useCallback(
    (id: SectionId) => {
      if (id === active) return;
      guard(() => {
        setActive(id);
        // A seção nova começa do topo, não na altura em que a anterior foi deixada.
        window.scrollTo({ top: 0 });
      });
    },
    [active, guard],
  );

  const setDirty = useCallback((id: SectionId, isDirty: boolean) => {
    setDirtySet((prev) => {
      if (prev.has(id) === isDirty) return prev;
      const next = new Set(prev);
      if (isDirty) next.add(id);
      else next.delete(id);
      return next;
    });
  }, []);

  const registerControls = useCallback(
    (id: SectionId, sectionControls: SectionControls) => {
      controls.current.set(id, sectionControls);
    },
    [],
  );

  // Fechar a aba, recarregar ou ir para outro endereço: quem avisa é o navegador
  // (o texto do aviso é dele, não dá para personalizar).
  useEffect(() => {
    if (!hasDirty) return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [hasDirty]);

  const proceed = () => {
    const action = pending;
    setPending(null);
    action?.();
  };

  const saveAndProceed = async () => {
    const saved = (await controls.current.get(active)?.save()) ?? false;
    if (saved) proceed();
    return saved;
  };

  const discardAndProceed = () => {
    controls.current.get(active)?.discard();
    proceed();
  };

  const activeLabel =
    ADMIN_SECTIONS.find((section) => section.id === active)?.label ?? "";

  return (
    <TabsContext.Provider
      value={{ active, select, dirty, setDirty, registerControls, guard }}
    >
      {children}
      {pending ? (
        <UnsavedDialog
          section={activeLabel}
          onSave={saveAndProceed}
          onDiscard={discardAndProceed}
          onStay={() => setPending(null)}
        />
      ) : null}
    </TabsContext.Provider>
  );
}

export function useTabs(): TabsState {
  const state = useContext(TabsContext);
  if (!state) throw new Error("useTabs precisa estar dentro de <TabsProvider>.");
  return state;
}
