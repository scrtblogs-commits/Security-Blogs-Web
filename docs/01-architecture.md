# 01 — Architecture

## What this system is

SecurityBlogs is becoming a **two-process platform**:

1. **Marketing site** — Next.js 15 app, statically rendered. Lives at the
   repo root today. Phase C will rewire it to fetch content from the CMS.
2. **CMS** — Payload 3 (also a Next.js app) running in `cms/`. Houses the
   admin portal, REST/GraphQL API, and PostgreSQL for everything content,
   media, users, and leads.

Both are open-source. You own every byte. Hosted on a single Hostinger VPS
Cloud instance from Phase D onward.

## Why Payload CMS

| Requirement | Met by |
|---|---|
| Open source, self-hostable, no vendor lock-in | MIT-licensed, runs on your server |
| Admin UI with login, RBAC, media library, content CRUD | Ships in the box |
| TypeScript-native + Next.js-native | Same language + framework as your existing frontend |
| Postgres backend | First-class adapter (`@payloadcms/db-postgres`) |
| Migration mobility | One Docker Compose file = anywhere |

Alternatives considered: Strapi (Node, also good but heavier admin),
Directus (Node, more "data-platform"-flavoured), WordPress (PHP — would
mean abandoning the existing frontend), custom Express + React admin
(months of build for no extra value).

## Request flow

```
visitor → securityblogs.com.au → Caddy/nginx (HTTPS) → Next.js (port 3000)
                                                            │ during Phase C
                                                            ▼
                                                   Payload REST/GraphQL
                                                       (port 3001)
                                                            │
                                                            ▼
                                                       PostgreSQL

editor → securityblogs.com.au/admin → Caddy → Payload (port 3001) → PostgreSQL
```

In Phase A, the marketing site is still pure static export — it hasn't
yet been rewired to fetch from the CMS. The CMS runs in isolation; you can
log in, create posts, upload media, manage leads. The next phase wires the
frontend into it.

## Technology choices in one table

| Layer | Tech | Why |
|---|---|---|
| Frontend framework | Next.js 15 (App Router) | Already in use |
| Backend / Admin | Payload CMS 3 | See above |
| Database | PostgreSQL 16 | Industry standard, runs anywhere |
| Auth | Payload built-in (Argon2id passwords, JWT sessions) | No third-party identity provider |
| Email | Hostinger SMTP via nodemailer | Reuse existing inbox; no SaaS |
| Media storage | Local disk on VPS | Self-owned; swap to S3 later if needed |
| Anti-spam (forms) | Honeypot + Cloudflare Turnstile | Both free; no SaaS dependency for ops |
| Analytics | Self-hosted Plausible (Phase D) | GDPR-clean, no Google data leak |
| Reverse proxy + HTTPS | Caddy (Phase D) | Auto Let's Encrypt; simpler than nginx |
| Process manager | systemd (Phase D) | No extra runtime |
| Local dev DB + mail | docker compose | Single command boots the stack |
| Map APIs (kept) | Mapbox + Google Maps Embed | Browser-only; URL-restricted |

## Design principles

- **Single language, single repo.** TypeScript everywhere.
- **No phone-home dependencies.** Nothing on the server needs an
  external SaaS API to operate.
- **Documented migration.** Every operational task (install, deploy,
  backup, restore, migrate) has a Markdown doc you can follow.
- **No code edits for content.** Editors use the admin UI; developers
  never touch a TSX file to change copy or publish a post.
- **Reversible at every phase.** If anything breaks in a phase, the
  previous phase's deploy still works — DNS revert is the rollback.

## What Phase A delivers

- Payload CMS scaffolded in `cms/`
- PostgreSQL configured (via docker-compose for dev; managed Postgres
  on Hostinger VPS in Phase D)
- Authentication with three roles (Super Admin / Admin / Editor)
- Media library (uploads, image variants, alt text)
- Posts collection (full blog management, drafts, scheduled publish,
  rich-text editor, AI Visibility field group)
- Leads collection (CRM-style — pipeline, assignment, timeline,
  closure tracking, email notification on assignment)
- Email transport wired to Hostinger SMTP (MailHog in dev)
- Seed script for the first Super Admin
- This documentation set

Phases B–D below.
