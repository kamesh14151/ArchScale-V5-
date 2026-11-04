# ArchScale V5 — Multi-Tenant Auth & Authorization Platform

ArchScale V5 is an enterprise-grade multi-tenant authentication and fine-grained authorization (RBAC & RLS) platform. It provides organization and workspace partitioning, hierarchical reporting, multi-factor authentication (MFA/AAL), and PostgreSQL Row-Level Security (RLS) enforcement.

---

## Architecture Overview

- **Frontend SPA**: React 19 + TypeScript + Vite (`client/`).
- **Backend API**: Express 5 + TypeScript (`src/server/index.ts`).
- **Client SDK**: Lightweight consumer library (`sdk/src/index.ts`).
- **Database & Auth**: Supabase PostgreSQL 15+ & Supabase Auth.
- **Unified Origin**: Built frontend assets (`public/`) and API routes (`/api/*`) are served under the same origin.

---

## Directory Structure

```text
ArchScale-V5/
├── .env                  # Environment & Supabase credentials
├── .env.example          # Template environment file
├── client/               # React 19 Frontend SPA
│   ├── index.html
│   └── src/
├── src/                  # Express API Server & Backend AuthZ
│   ├── authz/            # Central deny-by-default permission gates
│   ├── config/           # Environment validation
│   ├── context/          # Transaction-local access contexts & memberships
│   ├── db/               # PostgreSQL connection pool & RLS context wrapper
│   ├── identity/         # Supabase Auth identity provider
│   ├── mail/             # Email dispatch interface
│   ├── server/           # Express server & routes
│   ├── user/             # User mirror synchronization
│   └── utils/            # TOTP & helper utilities
├── sdk/                  # Lightweight client auth SDK (@archscale/xauth-sdk)
├── migrations/           # Database schema migrations (001–016)
├── seeds/                # Baseline roles, permissions & tenant types
├── public/               # Vite production build output
├── server.ts             # Vercel serverless function entrypoint
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── vercel.json           # Vercel deployment configuration
└── vite.config.ts        # Vite configuration
```

---

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment (`.env`)
Copy `.env.example` to `.env` and fill in your Supabase project credentials:
```env
ARCHSCALE_ENV=staging
ARCHSCALE_STAGING_PROJECT_REF=<your-project-ref>
ARCHSCALE_FRONTEND_URL=http://localhost:3000
SUPABASE_URL=https://<your-project-ref>.supabase.co
SUPABASE_ANON_KEY=<your-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
SUPABASE_DB_ADMIN_URL=postgres://postgres.<ref>:<password>@<pooler-host>:5432/postgres
ARCHSCALE_RUNTIME_DB_URL=postgres://postgres.<ref>:<password>@<pooler-host>:5432/postgres
PORT=3000
```

### 3. Build & Run
```bash
# Build both TypeScript backend and Vite frontend
npm run build:vercel

# Start the unified production server
npm start
```
Visit **http://localhost:3000** in your browser.

### 4. Development Mode (Hot Reloading)
```bash
# Terminal 1 (Backend API on port 3000)
npm run dev:server

# Terminal 2 (Vite Frontend with proxy to port 3000)
npm run dev:ui
```

---

## Deployment (Vercel)

The repository is configured for zero-configuration Vercel deployment:
1. Run `vercel link`.
2. Set the environment variables in Vercel Project Settings (`ARCHSCALE_ENV=production`, `ARCHSCALE_PRODUCTION_PROJECT_REF`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `ARCHSCALE_RUNTIME_DB_URL`, `ARCHSCALE_FRONTEND_URL`).
3. Deploy with `vercel --prod`.

