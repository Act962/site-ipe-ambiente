"use client";

import { useEffect, useState } from "react";

/**
 * Aviso de edição pendente: aparece quando o editor tenta sair de uma seção sem
 * salvar. "Salvar e continuar" só segue adiante se a gravação der certo.
 */
export default function UnsavedDialog({
  section,
  onSave,
  onDiscard,
  onStay,
}: {
  section: string;
  onSave: () => Promise<boolean>;
  onDiscard: () => void;
  onStay: () => void;
}) {
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);

  // Esc = continuar editando.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !busy) onStay();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [busy, onStay]);

  const save = async () => {
    setBusy(true);
    setFailed(false);
    const saved = await onSave();
    // Se salvou, o aviso já foi fechado por quem o abriu.
    if (!saved) {
      setBusy(false);
      setFailed(true);
    }
  };

  return (
    <div className="admin-veil">
      <div
        className="admin-dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="unsaved-title"
        aria-describedby="unsaved-text"
      >
        <span className="af-eyebrow">Alterações não salvas</span>
        <h2 id="unsaved-title">Salvar “{section}” antes de sair?</h2>
        <p id="unsaved-text">
          Você editou esta seção e ainda não salvou. Se sair agora sem salvar, o
          que foi digitado será perdido.
        </p>
        {failed ? (
          <p className="af-error">Não foi possível salvar. Tente novamente.</p>
        ) : null}
        <div className="admin-dialog-actions">
          <button
            type="button"
            className="admin-btn"
            onClick={save}
            disabled={busy}
            autoFocus
          >
            {busy ? "Salvando…" : "Salvar e continuar"}
          </button>
          <button
            type="button"
            className="admin-btn-ghost admin-btn-danger"
            onClick={onDiscard}
            disabled={busy}
          >
            Descartar alterações
          </button>
          <button
            type="button"
            className="admin-btn-ghost"
            onClick={onStay}
            disabled={busy}
          >
            Continuar editando
          </button>
        </div>
      </div>
    </div>
  );
}
