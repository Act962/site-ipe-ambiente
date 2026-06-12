"use client";

import { useState, type ReactNode } from "react";
import { DEFAULTS, type SiteContent } from "@/content/defaults";
import { saveContent, uploadImage } from "@/content/actions";

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

/* ───────── estado de edição de uma seção ───────── */
type Status = "idle" | "saving" | "saved" | "error";
type Patch = Parameters<typeof saveContent>[0];

export function useSectionForm<K extends keyof SiteContent>(
  section: K,
  initial: SiteContent[K],
) {
  const [draft, setDraft] = useState<SiteContent[K]>(initial);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const set = (path: string, value: unknown) => {
    setDraft((d) => setPath(d, path, value));
    setStatus("idle");
  };

  const save = async () => {
    setStatus("saving");
    setError(null);
    try {
      await saveContent({ [section]: draft } as Patch);
      setStatus("saved");
    } catch {
      setStatus("error");
      setError("Não foi possível salvar. Tente novamente.");
    }
  };

  const reset = async () => {
    setStatus("saving");
    setError(null);
    try {
      await saveContent({ [section]: {} } as Patch);
      setDraft(structuredClone(DEFAULTS[section]));
      setStatus("saved");
    } catch {
      setStatus("error");
      setError("Não foi possível restaurar o padrão.");
    }
  };

  return { draft, set, save, reset, status, error };
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
    setUploading(true);
    setErr(null);
    const fd = new FormData();
    fd.append("file", file);
    const res = await uploadImage(fd);
    setUploading(false);
    if ("error" in res) {
      setErr(res.error);
      return;
    }
    onChange(res.url);
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
  const busy = status === "saving";
  return (
    <section id={id} className="card">
      <div className="card-head">
        <span className="af-eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      <div className="card-body">{children}</div>
      <div className="card-foot">
        <button className="admin-btn" onClick={onSave} disabled={busy}>
          {busy ? "Salvando…" : "Salvar seção"}
        </button>
        <button
          type="button"
          className="admin-link"
          onClick={onReset}
          disabled={busy}
        >
          Restaurar padrão
        </button>
        {status === "saved" ? <span className="af-saved">Salvo ✓</span> : null}
        {status === "error" ? (
          <span className="af-error">{error ?? "Erro ao salvar."}</span>
        ) : null}
      </div>
    </section>
  );
}

/** Sub-bloco rotulado para itens repetidos (um valor, uma área, um tile…). */
export function ItemGroup({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <fieldset className="af-group">
      <legend>{title}</legend>
      {children}
    </fieldset>
  );
}
