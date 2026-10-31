# Fluenseafy – Project Guide

## Overview
English-learning SaaS platform. Monorepo with a single Git repository at the root.

```
fluenseafy/
├── frontend/   Next.js (App Router) + TypeScript + Tailwind CSS
├── backend/    ASP.NET Core Web API + PostgreSQL + EF Core (future, not created yet)
├── index.html, css/, img/, content.txt   LEGACY landing page
```

## Rules
- **Do not modify or delete legacy files** (`index.html`, `css/`, `img/`, `content.txt`) until the landing page migration task. They are the design reference.
- Never run `git init` inside `frontend/` or `backend/`. Do not commit/push unless asked.
- No new dependencies without a clear need. shadcn/ui (radix, `radix-nova` style) is installed; add components on demand with `npx shadcn@latest add <component>`.
- Next.js here is a recent major version with possible breaking changes: read `frontend/node_modules/next/dist/docs/` and `frontend/AGENTS.md` before writing Next.js code.

## Frontend (`frontend/`)
- Next.js App Router, React, TypeScript (strict), Tailwind CSS v4 (with Preflight, standard 16px rem), shadcn/ui, lucide-react icons, ESLint, npm.
- Import alias: `@/*` -> `src/*`.

```
src/
├── app/          Routes (folder = URL, page.tsx = page, layout.tsx = shared layout)
├── components/
│   ├── ui/       shadcn components (customised to the tokens below)
│   ├── layout/   Container, Section, Logo, header, mobile nav, footer
│   └── landing/  Landing page sections
└── lib/          Helpers, API client, utilities
```

### Planned route layout (create when building each feature)
- `(public)` landing, `(auth)` login/register, `(student)` student dashboard, `(admin)` admin dashboard. Route groups in parentheses share layouts without affecting the URL.
- Feature code can live in `src/features/<name>/` once a feature outgrows `components/`.

### Conventions
- Components are Server Components by default; add `"use client"` only for state, effects, or browser events.
- Files: `kebab-case.tsx`; components: `PascalCase`; always named exports except for Next special files (`page`, `layout`).
- Style with Tailwind utilities and the semantic tokens below; avoid new global CSS and hardcoded hex values.
- Only `components/layout/mobile-nav.tsx` and shadcn primitives are Client Components.
- Do not present unimplemented features as working: Login, Register and the assessment form are disabled until auth/backend exist.
- Always import via `@/...`, not deep relative paths.
- Authorization (RBAC: student/admin) must be enforced on the server (layouts, route handlers, and the API), never only in the UI.

## Commands (run in `frontend/`)
- `npm run dev` – dev server at http://localhost:3000
- `npm run lint` – ESLint
- `npm run build` – production build (must pass before finishing a task)

## Backend (future)
ASP.NET Core Web API, PostgreSQL, EF Core, in `backend/`. The frontend will talk to it over REST; base URL via `NEXT_PUBLIC_API_URL` in `frontend/.env.local`.

## Design system
Tokens live in `frontend/src/app/globals.css` (`:root` + `@theme inline`). Light-only for now.

| Token | Hex | Use |
|---|---|---|
| `primary` | #cc1855 (legacy brand crimson) | Main CTA, accents (5.5:1 on white) |
| `brand-strong` | #a31344 (legacy) | Primary hover, wordmark |
| `foreground` / `secondary` | #001f3f (legacy navy) | Headings, secondary CTA |
| `navy-deep` | #001120 (legacy) | Footer |
| `brand-blue` | #2388cc (legacy) | Focus ring, plan accent |
| `brand-blue-strong` | #1c6da3 (legacy) | Blue text/icons (5.5:1; plain blue fails AA) |
| `muted-foreground` | #4a5766 (new; legacy #212529 body) | Body copy (7:1) |
| `background` / `surface` | #ffffff / #f5fafd (legacy) | Page / alternate sections |
| `accent` | #e4f0f9 (from legacy #d3e7f5) | Hover and highlight surfaces |
| `brand-rose` | #f9e9ef (from legacy #f6e7ec) | Rose tint |
| `border` / `input` | #dde6ee / #8a9db2 (new) | Dividers / form control borders |

- Font: Inter (`next/font`, with optical-size axis). Headings bold with tight tracking; body 16-18px.
- Radius: `--radius` 0.75rem; cards `rounded-2xl`, hero/CTA panels `rounded-3xl`. Shadows: `shadow-card`, `shadow-card-hover`.
- Layout: `Container` (max-w-6xl) and `Section` (`py-16 sm:py-20 lg:py-28`, optional `tone="surface"`).
- Buttons: `default` (crimson), `secondary` (navy), `outline`, `ghost`, `link`; sizes `default`, `sm`, `lg`, `icon`.
- Motion: CSS transitions only; `.reveal` uses scroll-driven animations and is skipped for reduced motion/unsupported browsers.
