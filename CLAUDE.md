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
- No new dependencies without a clear need. shadcn/ui is added per component when needed (`npx shadcn@latest add <component>`).
- Next.js here is a recent major version with possible breaking changes: read `frontend/node_modules/next/dist/docs/` and `frontend/AGENTS.md` before writing Next.js code.

## Frontend (`frontend/`)
- Next.js App Router, React, TypeScript (strict), Tailwind CSS v4, ESLint, npm.
- Import alias: `@/*` -> `src/*`.

```
src/
├── app/          Routes (folder = URL, page.tsx = page, layout.tsx = shared layout)
├── components/   Shared UI components (ui/ reserved for shadcn)
└── lib/          Helpers, API client, utilities
```

### Planned route layout (create when building each feature)
- `(public)` landing, `(auth)` login/register, `(student)` student dashboard, `(admin)` admin dashboard. Route groups in parentheses share layouts without affecting the URL.
- Feature code can live in `src/features/<name>/` once a feature outgrows `components/`.

### Conventions
- Components are Server Components by default; add `"use client"` only for state, effects, or browser events.
- Files: `kebab-case.tsx`; components: `PascalCase`; always named exports except for Next special files (`page`, `layout`).
- Style with Tailwind utility classes; avoid new global CSS.
- Always import via `@/...`, not deep relative paths.
- Authorization (RBAC: student/admin) must be enforced on the server (layouts, route handlers, and the API), never only in the UI.

## Commands (run in `frontend/`)
- `npm run dev` – dev server at http://localhost:3000
- `npm run lint` – ESLint
- `npm run build` – production build (must pass before finishing a task)

## Backend (future)
ASP.NET Core Web API, PostgreSQL, EF Core, in `backend/`. The frontend will talk to it over REST; base URL via `NEXT_PUBLIC_API_URL` in `frontend/.env.local`.
