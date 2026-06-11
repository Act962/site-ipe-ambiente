# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

> The import above is load-bearing: this repo runs **Next.js 16**, whose APIs and conventions differ from older versions. Before writing any Next.js code, read the relevant guide under `node_modules/next/dist/docs/` (start with `01-app/`).

## Commands

Package manager is **pnpm** (`pnpm-lock.yaml`). There is no test suite.

- `pnpm dev` — dev server (Turbopack) at http://localhost:3000
- `pnpm build` — production build; also runs `tsc` type-checking, so this is the way to verify the whole project compiles
- `pnpm lint` — ESLint (`eslint-config-next`)

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript (strict) · React Compiler enabled (`next.config.ts`). Tailwind v4 is installed but **not used** — all styling is hand-written CSS. The `@/*` import alias maps to `./src/*`.

## Architecture

This is a single-page institutional site for **IPÊ Educação Ambiental**, recreated from a Claude Design (claude.ai/design) HTML/CSS handoff. The whole page is static — there is no data fetching or routing beyond `/`.

**Composition.** `src/app/page.tsx` stitches the page together from one component per section, in order: `Nav → Hero → (main: About → Values → Areas → Differentials → Esg → Gallery → CtaFinal) → Footer → ScrollReveal`. Section components live in `src/app/_components/` — the `_` prefix marks it a Next private folder, so nothing there becomes a route.

**Styling is plain global CSS, deliberately not CSS Modules** (`src/styles/`, imported via `@/styles/<name>.css`):
- `globals.css` holds the design system: CSS-variable tokens (green palette, `--font-*-stack`) plus shared primitives reused across sections (`.wrap`, `.eyebrow`, `.btn*`, `.section-head`, `.reveal`). It's imported once in `src/app/layout.tsx`.
- Each section has its own stylesheet (`hero.css`, `about.css`, …) imported by its component, containing only that section's rules.
- Class names are intentionally **global (unhashed)** because (a) `ScrollReveal` queries them and (b) sections override shared primitives by descendant selector (e.g. `.esg .eyebrow`). Switching to CSS Modules would break both — keep it global.

**Fonts** are loaded in `layout.tsx` via `next/font/google` (Instrument Serif / DM Sans / JetBrains Mono), exposed as CSS variables on `<html>`. `globals.css` wraps each as `--font-serif-stack` / `--font-sans-stack` / `--font-mono-stack`. Use those variables in CSS; do not hardcode `font-family` names or re-add a Google Fonts `<link>`.

**Interactivity** is isolated to two `"use client"` components; everything else is a server component:
- `Nav.tsx` — toggles the `scrolled` class on scroll and runs the mobile menu.
- `ScrollReveal.tsx` — renders nothing; on mount it runs an `IntersectionObserver` over `.reveal:not(.in)` and adds `.in` to trigger the entrance animation defined in `globals.css`.

**Content** for repeated blocks (values, areas, stats, ODS chips, gallery tiles, nav links) is defined as local data arrays at the top of each section component and mapped into markup — edit the array, not duplicated JSX.

**Assets** live in `public/assets/` and are referenced as `/assets/...` from both CSS backgrounds and `next/image`. Contact details in `Footer.tsx` and the `mailto:` in `CtaFinal.tsx` are placeholders (`+55 (00) 0000-0000`, `CNPJ 00.000.000/0001-00`).
