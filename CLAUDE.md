# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

> The import above is load-bearing: this repo runs **Next.js 16**, whose APIs and conventions differ from older versions. Before writing any Next.js code, read the relevant guide under `node_modules/next/dist/docs/` (start with `01-app/`). Example: Middleware is now **Proxy** (`src/proxy.ts`, exported function `proxy`).

## Commands

Package manager is **pnpm** (`pnpm-lock.yaml`). There is no test suite. A fresh worktree has no `node_modules`, so run `pnpm install` first — the Next.js docs mentioned above only exist after that.

- `pnpm dev`: dev server (Turbopack) at http://localhost:3000; the editor is at `/admin`
- `pnpm build`: production build. It also runs `tsc` type-checking, so use it to verify that the whole project compiles
- `pnpm lint`: ESLint (`eslint-config-next`)
- `node scripts/hash-password.mjs "<senha>"`: generates `ADMIN_PASSWORD_HASH` (a bcrypt hash, **base64-encoded**)

The dev server is also registered in `.claude/launch.json` as `Next.js dev server` (port 3000).

The env vars are listed in `.env.example` (copy it to `.env.local`). Without the KV credentials the site still runs in defaults-only mode, but saving from the panel throws an error. Without `BLOB_READ_WRITE_TOKEN` image uploads fail. Without `SESSION_SECRET`/`ADMIN_*` you can't log in.

`README.md` is the untouched `create-next-app` boilerplate (it even mentions Geist, which this project doesn't use). Don't treat it as documentation.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript (strict) · React Compiler enabled (`next.config.ts`). Tailwind v4 is installed but **not used**: all styling is hand-written CSS. The `@/*` import alias maps to `./src/*`. The code comments and UI text are in Portuguese (pt-BR).

## Architecture

There are two parts. One is a single-page institutional site for **IPÊ Educação Ambiental** (`/`), recreated from a Claude Design HTML/CSS handoff. The other is a password-protected **content editor** (`/admin`) that lets the client change texts and images without a deploy.

### Content model (defaults + overrides)

All editable copy and images come from `src/content/`, not from the components:

- `defaults.ts`: the `SiteContent` type and `DEFAULTS`. This is the single source of truth for the page's structure and its fallback copy — with no overrides, the site renders exactly as the original design. Item counts are fixed everywhere **except `areas.items` and its `bullets`**, which the panel can shorten, extend and reorder (a service leaving the portfolio has to actually disappear).
- `store.ts`: reads and writes a single JSON document of **overrides** under one key (`site-content:overrides`) in Vercel KV / Upstash Redis (`KV_REST_API_*` or `UPSTASH_REDIS_REST_*`). The text content moved away from Vercel Blob because Blob had no read-after-write consistency. Don't move it back. There are two reads on purpose: `readOverrides()` is for rendering and swallows every error (a KV outage shows up as the site silently falling back to the defaults), while `readOverridesOrThrow()` is for the save path. **Never write back the result of the lenient read** — a failed read would erase every other section.
- `get.ts`: `getContent()` deep-merges `DEFAULTS` ← overrides. A blank or whitespace string counts as unset, so clearing a field in the panel reverts it to the default. **Arrays merge index by index only while the override has the same length**; a different length means the editor added or removed items, and then the override's list wins whole — otherwise a deleted item would come straight back from the defaults. `bgVar()` sets a `--bg` custom property for CSS background images, and the stylesheets use `var(--bg, url(<original>))`.
- `actions.ts`: Server Actions. `saveContent(patch)` reads the stored document and replaces whole top-level sections (read-modify-write, no locking).
- `upload.ts` + `src/app/admin/upload/route.ts`: image uploads go **from the browser straight to Vercel Blob** (`upload()` from `@vercel/blob/client` in `ImageField`). The route handler only checks the session and issues the client token, which carries the rules (8 MB, `image/*`, path `uploads/<uuid>.<ext>`). Don't route the file through a Server Action: its body is capped at 1 MB by default, and Vercel Functions at about 4.5 MB. `next.config.ts` allows `*.public.blob.vercel-storage.com` for `next/image`.

What the granularity means in practice:

- **A saved section is stored whole.** The panel sends the full draft of the section (`useSectionForm` → `saveContent({ [section]: draft })`), not a diff. Once the client has saved a section, editing its text in `DEFAULTS` no longer changes the live site; only blank fields and never-saved sections still follow the defaults. "Restaurar padrão" stores `{}` for the section.
- **The merge only walks keys that exist in `DEFAULTS`.** An override key missing from `DEFAULTS` is dropped, so a new field has to be added there first.
- **Open lists skip the merge when their length differs.** A stored `areas.items` with a different length is used as-is, so a field added to the item type later is `undefined` on those stored items. Render it defensively (as `Areas.tsx` does with `ICON_SVG[area.icon] ?? ICON_SVG.educacao`).

`/` and `/admin` use `export const dynamic = "force-dynamic"` and read fresh content on every request, with no cache or revalidation. Some of the text is stale and should not be trusted over the code: `docs/DEPLOY.md` (describes Blob `content.json` + `revalidateTag`, and its env table lacks the KV variables), the "fresh from Blob" comments in `get.ts` and `admin/page.tsx`, and the header of `defaults.ts` (claims no list can grow or shrink). KV plus force-dynamic is the current mechanism.

**To add or change an editable field**, touch every layer: the `SiteContent` type and `DEFAULTS` in `defaults.ts` → the section component that renders it → the matching form in `src/app/admin/_components/Editor.tsx` (built from the `form-kit.tsx` primitives: `useSectionForm`, `TextField`, `SelectField`, `ImageField`, `SectionCard`, `ItemGroup`; open lists add `setList` + `listOps`, `ListRow`/`RowActions` and `AddButton`). A new section also needs an entry in `sections.ts` and a form mounted in `Editor`. Not every `SiteContent` field has a form control: link `href`s, gallery tile `key`s and social `network` names are in the type but only editable in code. Structural pieces stay hardcoded in the components: SVG shapes, social icons and gallery grid spans. Area icons are picked **by key** (`AREA_ICON_KEYS`, drawn in `Areas.tsx`), not by position — an area can be removed or reordered without shifting everyone's icon. `Areas.tsx` also drops blank bullets and untitled areas, so a half-filled row in the panel never renders.

### Public site

`src/app/page.tsx` loads the content and passes each slice as `data` into one component per section, in order: `Nav → Hero → (main: About → Values → Areas → Differentials → Esg → Gallery → CtaFinal) → Footer → ScrollReveal`. `contact` is a shared slice that `CtaFinal` and `Footer` both use. The page also builds an Organization JSON-LD from live content and skips placeholder values (`#` social links, phone numbers containing `0000`). Section components live in `src/app/_components/` (the `_` makes it a private folder, not a route).

Only `Nav.tsx` (scroll class + mobile menu) and `ScrollReveal.tsx` (IntersectionObserver that adds `.in` to `.reveal` elements) are client components on the public site.

SEO identity (`SITE_URL` from `NEXT_PUBLIC_SITE_URL`, name, title, description, `absoluteUrl`) lives in `src/lib/site.ts`. `layout.tsx` metadata, `robots.ts` and `sitemap.ts` use it.

### Admin panel and auth

- One editor only, with credentials in env vars: `ADMIN_EMAIL` + `ADMIN_PASSWORD_HASH`. The hash is stored in base64 because a raw `$2b$12$…` hash gets corrupted by `.env` variable expansion. `credentials.ts` also accepts a raw hash.
- Sessions are HS256 JWTs (`jose`) stored in the HttpOnly cookie `ipe_session`, lasting 7 days. `server/auth/jwt.ts` deliberately avoids `server-only`/`next/headers` so that `proxy.ts` can import it.
- `src/proxy.ts` (matcher `/admin/:path*`) is only an optimistic redirect. The real check is `verifySession()` from `server/auth/dal.ts`, which **must be called at the top of every protected page and Server Action**.
- The panel is **tabbed**: `tabs.tsx` (`TabsProvider`/`useTabs`) holds the active section and the set with unsaved edits. `Sidebar` and `MobileNav` switch tabs; `SectionCard` renders with `hidden` unless it is the active one — every form stays **mounted**, so a draft survives switching tabs (don't conditionally render the forms). `useSectionForm` compares the draft against the last saved state and reports it, which drives the red dot on the tab. It also registers the section's `save`/`discard` with the provider (`registerControls`).
- **Leaving a dirty section is guarded.** `SectionCard` renders the save bar as a `position: fixed` dock at the bottom of the viewport (the dock repeats `.admin-layout` so the bar lines up with the card column). The bar is mounted **only while there is something to say** — unsaved edits, saving, an error, or the "Salvo ✓" flash, which `useSectionForm` clears after `SAVED_FLASH_MS`; an untouched section shows no bar. "Restaurar padrão" lives in the card header for that reason. Anything that leaves the open section — `select()`, `LogoutButton` — must go through `guard(action)` from `useTabs`: with unsaved edits it opens `UnsavedDialog` (save and continue / discard / stay) instead of running the action. Closing or reloading the page is covered by a `beforeunload` listener in `TabsProvider`. A new way out of the panel needs the same `guard`. Section ids follow `sec-<SiteContent key>` (`sections.ts`); `useSectionForm` derives the id from the key, so keep that pattern.
- `GUIA-DO-PAINEL.md` is the client-facing user guide (pt-BR). `docs/DEPLOY.md` is the deploy and env-var checklist.

### Styling

Styling is plain global CSS in `src/styles/`, imported as `@/styles/<name>.css`. **It deliberately does not use CSS Modules.**

- `globals.css` holds the design tokens (green palette, `--font-*-stack`) and the shared primitives (`.wrap`, `.eyebrow`, `.btn*`, `.section-head`, `.reveal`). It is imported once in `src/app/layout.tsx`.
- Each section has its own stylesheet, imported by its component. `admin.css` is imported by `admin/layout.tsx`.
- Class names must stay global (unhashed) for two reasons: `ScrollReveal` queries them, and sections override the shared primitives through descendant selectors (e.g. `.esg .eyebrow`).
- Fonts come from `next/font/google` in `layout.tsx` (Instrument Serif / DM Sans / JetBrains Mono) as CSS variables. In CSS, use `--font-serif-stack` / `--font-sans-stack` / `--font-mono-stack`. Don't hardcode font names or add a Google Fonts `<link>`.

Static assets live in `public/assets/` and are referenced as `/assets/...`. Uploaded images are full Blob URLs.
