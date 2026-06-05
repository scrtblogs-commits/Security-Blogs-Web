# SecurityBlogs — Documentation Index

This `docs/` directory is your operating manual for the SecurityBlogs platform.
Every guide is plain Markdown and committed to the repo — your dev manager can
read everything they need offline.

## Phase A docs (this repo state)

| # | Doc | For | What it covers |
|---|---|---|---|
| 01 | [Architecture](./01-architecture.md) | New devs / handover | System diagram, request flow, technology choices, why Payload CMS |
| 02 | [Installation — Local](./02-installation-local.md) | Developers | Clone → `docker compose up` → admin login. ~15 minutes |
| 03 | [Environment Variables](./03-env-variables.md) | Ops + devs | Every env var, where it lives, example value |
| 04 | [Admin Portal Guide](./04-admin-portal-guide.md) | **Non-technical staff** | How to log in, write a post, upload media, manage leads |
| 05 | [Phases & Validation](./05-phases.md) | Project owner | Phased delivery contract, what's done, what's next, sign-off checklist |

## Phases B–D docs (delivered later)

Additional guides land here as phases ship:
- `06-deployment.md` — VPS deploy run-book (Phase D)
- `07-database-schema.md` — full ERD + every column (after content migration)
- `08-backup-restore.md` — daily backups + DR drills (Phase D)
- `09-security-checklist.md` — hardening + rotation (Phase D)
- `10-migrate-hosts.md` — move to another VPS (Phase D)
- `11-handover-guide.md` — 30-minute dev handover briefing (Phase D)
- `12-resell-clone-guide.md` — productise for other clients (optional)

## Repository layout (Phase A state)

```
securityblogs/
├── app/, components/, lib/, public/   ← existing marketing frontend (untouched)
├── cms/                                ← NEW: Payload CMS backend (this phase)
│   ├── app/(payload)/                  ← admin UI + REST + GraphQL routes
│   ├── src/
│   │   ├── collections/                ← Users, Media, Posts, Leads
│   │   ├── access/                     ← role-based access policies
│   │   ├── lib/aiVisibilityFields.ts   ← reusable AI Visibility field group
│   │   ├── email/transport.ts          ← Hostinger SMTP via nodemailer
│   │   └── seed/admin.ts               ← first Super Admin seed
│   ├── payload.config.ts               ← central Payload config
│   ├── next.config.mjs
│   ├── package.json
│   └── .env.example
├── docker-compose.yml                  ← Postgres + MailHog for local dev
├── docs/                               ← you are here
└── ...existing files (Next.js marketing site at root)
```

## Getting started

1. Read [01-architecture.md](./01-architecture.md) — 5 minutes
2. Follow [02-installation-local.md](./02-installation-local.md) — 15 minutes
3. Log in to the admin and try things from [04-admin-portal-guide.md](./04-admin-portal-guide.md)
4. When you're satisfied Phase A is solid, read [05-phases.md](./05-phases.md) to sign off and unlock Phase B.

---

**Repository:** github.com/Jonaid880/Security-Blogs
**Owner:** Yousif Jonaid · info@securityblogs.com.au
**Documentation version:** Phase A (CMS foundation)
