import "server-only";

import type { CSSProperties } from "react";
import { DEFAULTS, type SiteContent } from "./defaults";
import { readOverrides } from "./store";

export type DeepPartial<T> = T extends (infer U)[]
  ? DeepPartial<U>[]
  : T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Sobrepõe `override` sobre `base`, campo a campo, preservando o padrão quando o
 * override está ausente. Strings vazias/em branco contam como "não definido", de
 * modo que limpar um campo no painel reverte para o texto original.
 */
function merge<T>(base: T, override: unknown): T {
  if (override === undefined || override === null) return base;

  if (typeof base === "string") {
    return typeof override === "string" && override.trim() !== ""
      ? (override as T)
      : base;
  }

  if (Array.isArray(base)) {
    if (!Array.isArray(override)) return base;
    // Contagens são fixas: faz o merge item a item, mantendo o padrão nos índices ausentes.
    return base.map((item, i) => merge(item, override[i])) as T;
  }

  if (isPlainObject(base)) {
    const out = { ...(base as Record<string, unknown>) };
    for (const key of Object.keys(base as Record<string, unknown>)) {
      out[key] = merge((base as Record<string, unknown>)[key], (override as Record<string, unknown>)?.[key]);
    }
    return out as T;
  }

  // números, booleanos, etc.
  return override as T;
}

export function resolveContent(overrides: DeepPartial<SiteContent>): SiteContent {
  return merge(DEFAULTS, overrides);
}

/**
 * Conteúdo efetivo do site (padrões + overrides do editor). Lê SEMPRE fresco do
 * Blob — sem cache — para que toda edição apareça na próxima carga, tanto no site
 * quanto no painel. As páginas que chamam isto são dinâmicas (`force-dynamic`).
 */
export async function getContent(): Promise<SiteContent> {
  return resolveContent(await readOverrides());
}

/**
 * Helper para imagens que ficam em `background-image` no CSS. Define a custom
 * property `--bg` inline a partir da URL resolvida; o CSS usa `var(--bg, <url
 * original>)`, então sem override o fallback do próprio CSS assume.
 */
export function bgVar(url: string | undefined): CSSProperties {
  return url ? ({ ["--bg"]: `url(${JSON.stringify(url)})` } as CSSProperties) : {};
}
