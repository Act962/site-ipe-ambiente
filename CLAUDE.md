# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

> The import above is load-bearing: this repo runs **Next.js 16**, whose APIs and conventions differ from older versions. Before writing any Next.js code, read the relevant guide under `node_modules/next/dist/docs/` (start with `01-app/`). Example: Middleware is now **Proxy** (`src/proxy.ts`, exported function `proxy`).

## Commands

Package manager is **pnpm** (`pnpm-lock.yaml`). There is no test suite.

- `pnpm dev`: dev server (Turbopack) at http://localhost:3000; the editor is at `/admin`
- `pnpm build`: production build. It also runs `tsc` type-checking, so use it to verify that the whole project compiles
- `pnpm lint`: ESLint (`eslint-config-next`)
- `node scripts/hash-password.mjs "<senha>"`: generates `ADMIN_PASSWORD_HASH` (a bcrypt hash, **base64-encoded**)

The env vars are listed in `.env.example` (copy it to `.env.local`). Without the KV credentials the site still runs in defaults-only mode, but saving from the panel throws an error. Without `SESSION_SECRET`/`ADMIN_*` you can't log in.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript (strict) · React Compiler enabled (`next.config.ts`). Tailwind v4 is installed but **not used**: all styling is hand-written CSS. The `@/*` import alias maps to `./src/*`. The code comments and UI text are in Portuguese (pt-BR).

## Architecture

There are two parts. One is a single-page institutional site for **IPÊ Educação Ambiental** (`/`), recreated from a Claude Design HTML/CSS handoff. The other is a password-protected **content editor** (`/admin`) that lets the client change texts and images without a deploy.

### Content model (defaults + overrides)

All editable copy and images come from `src/content/`, not from the components:

- `defaults.ts`: the `SiteContent` type and `DEFAULTS`. This is the single source of truth for the page's structure and its fallback copy — with no overrides, the site renders exactly as the original design. Item counts are fixed everywhere **except `areas.items` and its `bullets`**, which the panel can shorten, extend and reorder (a service leaving the portfolio has to actually disappear).
- `store.ts`: reads and writes a single JSON document of **overrides** (only the fields that changed) under one key in Vercel KV / Upstash Redis (`KV_REST_API_*` or `UPSTASH_REDIS_REST_*`). The text content moved away from Vercel Blob because Blob had no read-after-write consistency. Don't move it back.
- `get.ts`: `getContent()` deep-merges `DEFAULTS` ← overrides. A blank or whitespace string counts as unset, so clearing a field in the panel reverts it to the default. **Arrays merge index by index only while the override has the same length**; a different length means the editor added or removed items, and then the override's list wins whole — otherwise a deleted item would come straight back from the defaults. `bgVar()` sets a `--bg` custom property for CSS background images, and the stylesheets use `var(--bg, url(<original>))`.
- `actions.ts`: Server Actions. `saveContent(patch)` does a shallow merge per top-level section. `uploadImage` puts the file in Vercel Blob under `uploads/` and returns the public URL; `next.config.ts` allows `*.public.blob.vercel-storage.com` for `next/image`.

`/` and `/admin` use `export const dynamic = "force-dynamic"` and read fresh content on every request, with no cache or revalidation. Some comments and `docs/DEPLOY.md` still mention Blob and `revalidateTag` for text content. That is stale: KV plus force-dynamic is the current mechanism.

**To add or change an editable field**, touch every layer: the `SiteContent` type and `DEFAULTS` in `defaults.ts` → the section component that renders it → the matching form in `src/app/admin/_components/Editor.tsx` (built from the `form-kit.tsx` primitives: `useSectionForm`, `TextField`, `SelectField`, `ImageField`, `SectionCard`, `ItemGroup`; open lists add `setList` + `listOps`, `ListRow`/`RowActions` and `AddButton`). Structural pieces stay hardcoded in the components: SVG shapes, social icons and gallery grid spans. Area icons are picked **by key** (`AREA_ICON_KEYS`, drawn in `Areas.tsx`), not by position — an area can be removed or reordered without shifting everyone's icon. `Areas.tsx` also drops blank bullets and untitled areas, so a half-filled row in the panel never renders.

### Public site

`src/app/page.tsx` loads the content and passes each slice as `data` into one component per section, in order: `Nav → Hero → (main: About → Values → Areas → Differentials → Esg → Gallery → CtaFinal) → Footer → ScrollReveal`. `contact` is a shared slice that `CtaFinal` and `Footer` both use. The page also builds an Organization JSON-LD from live content and skips placeholder values (`#` social links, phone numbers containing `0000`). Section components live in `src/app/_components/` (the `_` makes it a private folder, not a route).

Only `Nav.tsx` (scroll class + mobile menu) and `ScrollReveal.tsx` (IntersectionObserver that adds `.in` to `.reveal` elements) are client components on the public site.

SEO identity (`SITE_URL` from `NEXT_PUBLIC_SITE_URL`, name, title, description, `absoluteUrl`) lives in `src/lib/site.ts`. `layout.tsx` metadata, `robots.ts` and `sitemap.ts` use it.

### Admin panel and auth

- One editor only, with credentials in env vars: `ADMIN_EMAIL` + `ADMIN_PASSWORD_HASH`. The hash is stored in base64 because a raw `$2b$12$…` hash gets corrupted by `.env` variable expansion. `credentials.ts` also accepts a raw hash.
- Sessions are HS256 JWTs (`jose`) stored in the HttpOnly cookie `ipe_session`, lasting 7 days. `server/auth/jwt.ts` deliberately avoids `server-only`/`next/headers` so that `proxy.ts` can import it.
- `src/proxy.ts` (matcher `/admin/:path*`) is only an optimistic redirect. The real check is `verifySession()` from `server/auth/dal.ts`, which **must be called at the top of every protected page and Server Action**.
- `admin/_components/sections.ts` holds the sidebar's section list. Its `id`s must stay in sync with the `SectionCard` ids in `Editor.tsx`.
- `GUIA-DO-PAINEL.md` is the client-facing user guide (pt-BR). `docs/DEPLOY.md` is the deploy and env-var checklist.

### Styling

Styling is plain global CSS in `src/styles/`, imported as `@/styles/<name>.css`. **It deliberately does not use CSS Modules.**

- `globals.css` holds the design tokens (green palette, `--font-*-stack`) and the shared primitives (`.wrap`, `.eyebrow`, `.btn*`, `.section-head`, `.reveal`). It is imported once in `src/app/layout.tsx`.
- Each section has its own stylesheet, imported by its component. `admin.css` is imported by `admin/layout.tsx`.
- Class names must stay global (unhashed) for two reasons: `ScrollReveal` queries them, and sections override the shared primitives through descendant selectors (e.g. `.esg .eyebrow`).
- Fonts come from `next/font/google` in `layout.tsx` (Instrument Serif / DM Sans / JetBrains Mono) as CSS variables. In CSS, use `--font-serif-stack` / `--font-sans-stack` / `--font-mono-stack`. Don't hardcode font names or add a Google Fonts `<link>`.

Static assets live in `public/assets/` and are referenced as `/assets/...`. Uploaded images are full Blob URLs.
