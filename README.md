# Fluenseafy

English-learning SaaS platform.

## Structure

```
fluenseafy/
├── frontend/     Next.js app (landing, auth, student + admin dashboards)
├── backend/      ASP.NET Core Web API (future)
├── index.html    Legacy landing page (to be migrated)
├── css/ img/     Legacy assets (to be migrated)
├── CLAUDE.md
└── README.md
```

## Run the frontend

Requires Node.js 20+.

```bash
cd frontend
npm install
npm run dev      # http://localhost:3000
```

Other commands (run inside `frontend/`):

```bash
npm run lint     # ESLint
npm run build    # production build
npm run start    # serve the production build
```
