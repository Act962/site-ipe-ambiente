"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { DEFAULTS, type SiteContent } from "@/content/defaults";
import { upload } from "@vercel/blob/client";
import { saveContent } from "@/content/actions";
import { MAX_IMAGE_BYTES, UPLOAD_ROUTE, uploadPathFor } from "@/content/upload";
import type { SectionId } from "./sections";
import { useTabs } from "./tabs";

/* ───────── helper: set imutável por caminho ("items.0.title") ───────── */
export function setPath<T>(obj: T, path: string, value: unknown): T {
  const [head, ...rest] = path.split(".");
  const key = /^\d+$/.test(head) ? Number(head) : head;
  const current = obj as Record<string | number, unknown>;
  const newChild = rest.length
    ? setPath(current[key], rest.join("."), value)
    : value;
  if (Array.isArray(obj)) {
    const copy = obj.slice() as unknown[];
    copy[key as number] = newChild;
    return copy as T;
  }
  return { ...current, [key]: newChild } as T;
}

/* ───────── helper: lê um caminho ("items.0.bullets") ───────── */
export function getPath(obj: unknown, path: string): unknown {
  return path
    .split(".")
    .reduce<unknown>(
      (acc, key) =>
        acc == null ? undefined : (acc as Record<string, unknown>)[key],
      obj,
    );
}

/* ───────── operações sobre listas abertas (remover/mover/acrescentar) ───────── */
export const listOps = {
  remove:
    (index: number) =>
    <T,>(list: T[]): T[] =>
      list.filter((_, i) => i !== index),
  move:
    (index: number, direction: -1 | 1) =>
    <T,>(list: T[]): T[] => {
      const target = index + direction;
      if (target < 0 || target >= list.length) return list;
      const copy = list.slice();
      [copy[index], copy[target]] = [copy[target], copy[index]];
      return copy;
    },
  add:
    <I,>(item: I) =>
    <T,>(list: T[]): T[] =>
      [...list, item as unknown as T],
};

/* ───────── estado de edição de uma seção ───────── */
type Status = "idle" | "saving" | "saved" | "error";
type Patch = Parameters<typeof saveContent>[0];

/** Quanto tempo o "Salvo ✓" fica na tela antes de a barra de salvar sumir. */
const SAVED_FLASH_MS = 2500;

export function useSectionForm<K extends keyof SiteContent>(
  section: K,
  initial: SiteContent[K],
) {
  const [draft, setDraft] = useState<SiteContent[K]>(initial);
  // Último estado gravado: o rascunho está "sujo" enquanto for diferente dele.
  const [baseline, setBaseline] = useState<SiteContent[K]>(initial);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  // "Salvo ✓" é passageiro: volta sozinho a "idle", e a barra de salvar some.
  const savedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const flashSaved = () => {
    if (savedTimer.current) clearTimeout(savedTimer.current);
    setStatus("saved");
    savedTimer.current = setTimeout(
      () => setStatus((s) => (s === "saved" ? "idle" : s)),
      SAVED_FLASH_MS,
    );
  };

  const set = (path: string, value: unknown) => {
    setDraft((d) => setPath(d, path, value));
    setStatus("idle");
  };

  /** Edita uma lista aberta do rascunho — use com `listOps`. */
  const setList = <I,>(path: string, fn: (list: I[]) => I[]) => {
    setDraft((d) => setPath(d, path, fn(getPath(d, path) as I[])));
    setStatus("idle");
  };

  /** Grava a seção. Devolve se deu certo (o aviso de saída depende disso). */
  const save = async (): Promise<boolean> => {
    setStatus("saving");
    setError(null);
    try {
      await saveContent({ [section]: draft } as Patch);
      setBaseline(draft);
      flashSaved();
      return true;
    } catch {
      setStatus("error");
      setError("Não foi possível salvar. Tente novamente.");
      return false;
    }
  };

  /** Joga fora o que foi digitado e volta ao último estado gravado. */
  const discard = () => {
    setDraft(baseline);
    setStatus("idle");
    setError(null);
  };

  const reset = async () => {
    setStatus("saving");
    setError(null);
    try {
      await saveContent({ [section]: {} } as Patch);
      const restored = structuredClone(DEFAULTS[section]);
      setDraft(restored);
      setBaseline(restored);
      flashSaved();
    } catch {
      setStatus("error");
      setError("Não foi possível restaurar o padrão.");
    }
  };

  // Avisa as abas, que marcam a seção com edição pendente.
  const { setDirty, registerControls } = useTabs();
  const id = `sec-${String(section)}` as SectionId;
  const isDirty = JSON.stringify(draft) !== JSON.stringify(baseline);
  useEffect(() => {
    setDirty(id, isDirty);
  }, [id, isDirty, setDirty]);

  // Entrega ao aviso de saída o salvar/descartar desta seção, sempre com o
  // rascunho atual.
  useEffect(() => {
    registerControls(id, { save, discard });
  });

  return { draft, set, setList, save, reset, status, error };
}

/* ───────── primitivas de UI ───────── */
export function TextField({
  label,
  value,
  onChange,
  hint,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
  multiline?: boolean;
}) {
  return (
    <label className="af-field">
      <span className="af-label">{label}</span>
      {multiline ? (
        <textarea
          className="af-input"
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          className="af-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {hint ? <span className="af-hint">{hint}</span> : null}
    </label>
  );
}

export function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="af-field">
      <span className="af-label">{label}</span>
      <select
        className="af-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

type RowControls = {
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
  removeLabel: string;
  first: boolean;
  last: boolean;
};

/** Trio mover-para-cima / mover-para-baixo / remover, de um item de lista aberta. */
export function RowActions({
  onMoveUp,
  onMoveDown,
  onRemove,
  removeLabel,
  first,
  last,
}: RowControls) {
  return (
    <div className="af-row-actions">
      <button
        type="button"
        className="af-icon-btn"
        onClick={onMoveUp}
        disabled={first}
        title="Mover para cima"
        aria-label="Mover para cima"
      >
        ↑
      </button>
      <button
        type="button"
        className="af-icon-btn"
        onClick={onMoveDown}
        disabled={last}
        title="Mover para baixo"
        aria-label="Mover para baixo"
      >
        ↓
      </button>
      <button
        type="button"
        className="af-icon-btn af-icon-danger"
        onClick={onRemove}
        title={removeLabel}
        aria-label={removeLabel}
      >
        ✕
      </button>
    </div>
  );
}

/** Uma linha de lista aberta: o campo à esquerda, os controles à direita. */
export function ListRow({
  children,
  ...controls
}: RowControls & { children: ReactNode }) {
  return (
    <div className="af-row">
      <div className="af-row-main">{children}</div>
      <RowActions {...controls} />
    </div>
  );
}

export function AddButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button type="button" className="af-add" onClick={onClick}>
      + {children}
    </button>
  );
}

export function ImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = ""; // permite re-selecionar o mesmo arquivo
    if (!file) return;
    setErr(null);
    if (!file.type.startsWith("image/")) {
      setErr("Envie um arquivo de imagem (JPG, PNG, WebP…).");
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setErr("Imagem muito grande (máximo 8 MB).");
      return;
    }
    setUploading(true);
    try {
      // Vai direto do navegador para o Blob; a rota só emite o token (e é ela,
      // com o Blob, que impõe de verdade o tipo e o tamanho).
      const blob = await upload(uploadPathFor(file.name), file, {
        access: "public",
        handleUploadUrl: UPLOAD_ROUTE,
      });
      onChange(blob.url);
    } catch {
      setErr("Não foi possível enviar a imagem. Tente novamente.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="af-field">
      <span className="af-label">{label}</span>
      <div className="af-image">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="af-thumb" src={value} alt="" />
        <div className="af-image-controls">
          <input type="file" accept="image/*" onChange={onPick} disabled={uploading} />
          {uploading ? <span className="af-hint">Enviando imagem…</span> : null}
          {err ? <span className="af-error">{err}</span> : null}
        </div>
      </div>
    </div>
  );
}

export function SectionCard({
  id,
  eyebrow,
  title,
  status,
  error,
  onSave,
  onReset,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  status: Status;
  error: string | null;
  onSave: () => void;
  onReset: () => void;
  children: ReactNode;
}) {
  const { active, dirty } = useTabs();
  const busy = status === "saving";
  const isDirty = dirty.has(id as SectionId);

  // A barra só existe enquanto há o que dizer: edição pendente, gravação em
  // curso, erro ou o "Salvo ✓" passageiro. Seção intocada = sem barra.
  let state = "";
  let message = "";
  if (busy) message = "Salvando…";
  else if (status === "error") {
    state = " error";
    message = error ?? "Erro ao salvar.";
  } else if (isDirty) {
    state = " dirty";
    message = "Alterações não salvas";
  } else if (status === "saved") {
    state = " saved";
    message = "Salvo ✓";
  }

  // Só a aba ativa aparece; as outras ficam montadas (e com o rascunho) mas ocultas.
  return (
    <section id={id} className="card" hidden={id !== active}>
      <div className="card-head">
        <div>
          <span className="af-eyebrow">{eyebrow}</span>
          <h2>{title}</h2>
        </div>
        <button
          type="button"
          className="admin-link"
          onClick={onReset}
          disabled={busy}
        >
          Restaurar padrão
        </button>
      </div>
      <div className="card-body">{children}</div>
      {/* Barra de salvar: fixa no pé da tela, para não depender de rolar a seção
          inteira. O dock repete a grade do painel e a alinha à coluna do card. */}
      {message ? (
        <div className="savebar-dock">
          <div className="admin-layout">
            <div className={`savebar${state}`}>
              <div className="savebar-state">
                <span className="savebar-dot" />
                <strong>{title}</strong>
                <span className="savebar-msg" role="status">
                  {message}
                </span>
              </div>
              {isDirty || busy ? (
                <button
                  type="button"
                  className="admin-btn"
                  onClick={onSave}
                  disabled={busy}
                >
                  Salvar seção
                </button>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

/** Sub-bloco rotulado para itens repetidos (um valor, uma área, um tile…). */
export function ItemGroup({
  title,
  actions,
  children,
}: {
  title: string;
  /** Controles do bloco inteiro (mover, remover) — só nas listas abertas. */
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <fieldset className="af-group">
      <legend>{title}</legend>
      {actions ? <div className="af-group-actions">{actions}</div> : null}
      {children}
    </fieldset>
  );
}
