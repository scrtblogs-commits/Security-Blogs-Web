# SYSTEM_ARCHITECTURE

**Repository:** github.com/Jonaid880/Security-Blogs
**Architecture model:** Hybrid (Postgres-primary, Airtable as documentation + lightweight content layer)
**Date:** 2026-06-14

---

## 1. Topology

```
                  ┌─────────────────────────────────────────────────┐
                  │  PUBLIC INTERNET (browsers + AI crawlers)        │
                  └────────────────────┬────────────────────────────┘
                                       │
                                       │ HTTPS
                                       ▼
                  ┌─────────────────────────────────────────────────┐
                  │  CADDY REVERSE PROXY (Phase D)                  │
                  │  • TLS termination (Let's Encrypt)              │
                  │  • Routes by hostname                            │
                  │     securityblogs.com.au       → marketing site │
                  │     cms.securityblogs.com.au   → CMS admin      │
                  │     stats.securityblogs.com.au → Plausible      │
                  └─────────┬───────────────┬──────────────────┬────┘
                            │               │                  │
              ┌─────────────▼──────┐  ┌─────▼────────┐   ┌─────▼────────┐
              │  MARKETING SITE    │  │  CMS APP     │   │  PLAUSIBLE   │
              │  Next.js 15 ISR    │  │  Payload 3   │   │  (self-host) │
              │  Port 3000         │  │  Port 3001   │   │  Port 8000   │
              │                    │  │              │   │              │
              │  • Public pages    │  │  • /admin    │   │  • Analytics │
              │  • SEO files       │  │  • REST API  │   │  dashboard   │
              │  • /api/leads      │  │  • GraphQL   │   │              │
              │  • Middleware      │  │              │   │              │
              └─────────┬──────────┘  └──────┬───────┘   └──────────────┘
                        │                    │
                        │                    │
              ┌─────────▼────────────────────▼────────┐
              │  POSTGRES 16 (PRIMARY DATA STORE)     │
              │  • All Payload CMS collections        │
              │  • Auth users + sessions              │
              │  • Audit log                          │
              │  • Leads pipeline                     │
              │  • Future SaaS feature tables         │
              └────────────────┬──────────────────────┘
                               │
                               │ Backup cron (pg_dump)
                               ▼
              ┌──────────────────────────────────────┐
              │  OFF-SITE BACKUPS (S3 / B2)          │
              └──────────────────────────────────────┘

           ┌───────────────────────────────────────────────┐
           │  AIRTABLE — DOCUMENTATION + LIGHTWEIGHT CMS    │
           │  Base: Securityblogs.com.au.                  │
           │                                                │
           │  • 36 per-page tables (each page's spec)      │
           │  • Master Pages Index                          │
           │  • Reusable Page Template                      │
           │  • Optional editorial content sync             │
           │                                                │
           │  Sync via /api/cms/airtable-* endpoints        │
           │  Cache: 600s ISR + tag-purge on webhook        │
           └───────────────────────────────────────────────┘
```

## 2. Component inventory

| Layer | Component | Purpose | Source of truth |
|---|---|---|---|
| Frontend | Next.js 15 marketing site | Public-facing website | Code in `app/`, `components/`, `lib/` |
| Frontend | React 19 + Tailwind 4 | UI rendering | |
| Frontend | Lucide React, Framer Motion, Mapbox GL | Visual elements | |
| Backend | Payload CMS 3 | Editorial admin + REST/GraphQL API | `cms/` directory |
| Backend | Next.js API routes | Form submission, CMS aggregator, redirect hit-counter | `app/api/` |
| Backend | Middleware (Edge) | CMS-driven redirects, rate limit, ISR cache | `middleware.ts` |
| Data | Postgres 16 | All transactional + content data | `cms/` schemas auto-migrate |
| Data | Airtable (`app4m6OOzymaqPKHX`) | Documentation, page-by-page implementation specs | 38 tables today |
| Auth | Payload built-in auth (Argon2id + JWT) | Editorial users | `cms/src/collections/Users.ts` |
| Auth | NextAuth (future) | End-user / SaaS auth | Phase E |
| Email | Hostinger SMTP via nodemailer | Lead notifications | `cms/src/email/transport.ts` |
| Email | MailHog (dev) | Catches mail locally | `docker-compose.yml` |
| Edge | Cloudflare Turnstile | Anti-bot on forms | `components/Turnstile.tsx` |
| Edge | Cloudflare (proposed) | CDN + WAF in Phase D | TBD |
| Analytics | GTM (current) + Plausible (planned) | Site analytics | `Settings.analytics.gtmId` |
| Maps | Mapbox + Google Maps | GEO map + local SEO widget | `lib/env.ts` (referrer-restricted) |
| Search | Ahrefs Brand Radar MCP | AI visibility scoring (future) | Server-side only |

## 3. Data flow patterns

### 3.1 Public page request (ISR-cached)

```
Browser
  → Cloudflare CDN (Phase D)
  → Caddy
  → Next.js server (marketing site, port 3000)
  → middleware.ts checks CMS redirect rules (60s cache)
  → page.tsx async server component
  → lib/cms.ts → Payload REST /api/<collection> (60–600s cache)
  → Postgres SELECT via Payload ORM
  → renders HTML
  → Cloudflare CDN caches
  → returns to browser
```

### 3.2 Form submission (lead capture)

```
Browser POST /api/leads with JSON body + Turnstile token
  → middleware.ts (no redirect match, passes through)
  → app/api/leads/route.ts handler
  → Honeypot check (silent OK if bot)
  → Cloudflare Turnstile siteverify (server-to-server)
  → Per-IP rate limit (15 req/15 min, in-memory)
  → Shape validation (zod-equivalent inline)
  → lib/cms.ts createLead() → POST /api/leads on CMS (with PAYLOAD_API_KEY)
  → Payload validates + writes to Postgres `leads` table
  → afterChange hook sends email to assignedTo via Hostinger SMTP
  → return { ok: true, id: leadId } to browser
```

### 3.3 Editorial change

```
Editor logs into /admin (CMS port 3001)
  → Payload checks Argon2id hash + issues JWT + sets cookie
  → Edits a Page record's blocks
  → Autosave fires every 2s → POST /api/pages/:id (draft)
  → On Publish → status=published, publishedAt=now (hook)
  → Optional: afterChange hook calls /api/cms/purge?tag=page:home on marketing site
  → Marketing site revalidates next request
```

### 3.4 Documentation update

```
Engineer edits Documentation/Markdown/PAGE_X.md
  → Commits to git
  → Pushes to phase-c-frontend-rewire branch
  → GitHub Action (planned) runs convert_md_to_pdf.py
  → PDFs appear in Documentation/PDFs/
  → Optional: webhook updates Airtable record with PDF attachment URL
```

## 4. Trust boundaries

| Boundary | What crosses it | Validation |
|---|---|---|
| Browser → Marketing site | Form submissions, page requests | Turnstile, honeypot, rate limit, shape validation |
| Marketing site → CMS | Server-to-server API calls with `PAYLOAD_API_KEY` | TLS, API key auth, Payload access policies |
| CMS → Postgres | Direct DB connection | Connection string with credentials in env |
| Marketing site → Airtable | Documentation sync | PAT token, server-side only |
| Admin → CMS UI | Editorial work | Argon2id + JWT + role-based access |
| Hostinger SMTP → Inbox | Outbound mail | SPF / DKIM / DMARC (Phase D) |
| MCP tool calls (AI scoring) | API key passed server-side | Never exposed to browser |

## 5. Hostnames and ports

| Hostname (prod) | Internal port | Purpose |
|---|---|---|
| `securityblogs.com.au` | 3000 (internal) | Marketing site |
| `www.securityblogs.com.au` | 3000 | Redirects to apex |
| `cms.securityblogs.com.au` | 3001 (internal) | Payload admin + API |
| `stats.securityblogs.com.au` | 8000 (internal) | Plausible self-host |
| (internal) | 5432 | Postgres (not exposed externally) |
| (dev) | 1025 / 8025 | MailHog (dev only) |

## 6. Environment-by-environment matrix

| Aspect | Local dev | Staging (proposed) | Production (Phase D) |
|---|---|---|---|
| Marketing site URL | http://localhost:3000 | https://staging.securityblogs.com.au | https://securityblogs.com.au |
| CMS URL | http://localhost:3001 | https://cms.staging.securityblogs.com.au | https://cms.securityblogs.com.au |
| Postgres | Docker container `db` | Managed Postgres (Hostinger / Neon) | Managed Postgres |
| Email | MailHog at localhost:8025 | MailHog or test inbox | Hostinger SMTP (info@) |
| Turnstile | Empty key → skipped | Test site keys | Real site keys |
| ISR revalidate | 0 (off) or 60s | 60s | 60–600s by tag |
| Sentry / monitoring | Off | On (test DSN) | On (prod DSN) |
| Plausible | Off | On (subdomain) | On (stats.) |

## 7. Repository layout

```
Security-Blogs/                              ← repo root
├── app/                                     ← FRONTEND — Next.js App Router pages
│   ├── api/
│   │   └── leads/route.ts                   ← form submission endpoint
│   ├── services/[slug]/page.tsx             ← dynamic service page (CMS)
│   ├── case-studies/[slug]/page.tsx         ← dynamic case study (CMS)
│   ├── knowledge-hub/[category]/
│   │   └── [slug]/page.tsx                  ← dynamic blog post (CMS)
│   ├── sitemap.ts                           ← CMS-aware sitemap
│   ├── robots.ts                            ← CMS-aware robots
│   ├── llms.txt/route.ts                    ← CMS-aware llms.txt
│   └── [36 hardcoded legacy pages]          ← migrated in Phase C.2
├── components/                              ← FRONTEND — React components
│   ├── layout/Navbar.tsx
│   ├── layout/Footer.tsx
│   ├── modules/ModuleRenderer.tsx           ← block-based page renderer
│   ├── modules/blocks/*.tsx                 ← 9 block components
│   ├── modules/LexicalRenderer.tsx          ← Lexical JSON → JSX walker
│   ├── Turnstile.tsx                        ← Cloudflare widget
│   └── […service-page previews, hero variants…]
├── lib/                                     ← FRONTEND — utilities
│   ├── cms.ts                               ← typed Payload REST client
│   ├── cmsTypes.ts                          ← read-shape types
│   ├── submitForm.ts                        ← form helper (calls /api/leads)
│   ├── site.ts                              ← hardcoded constants (Phase C.2 deletes)
│   └── env.ts                               ← public env wrappers
├── middleware.ts                            ← Edge middleware (CMS redirects)
├── next.config.mjs                          ← ISR config; output:'export' removed
├── package.json                             ← marketing site deps
│
├── cms/                                     ← BACKEND — Payload CMS app
│   ├── app/(payload)/                       ← Next.js routes hosting Payload
│   ├── src/
│   │   ├── collections/                     ← 9 collections
│   │   ├── globals/Settings.ts              ← 1 global
│   │   ├── access/                          ← role helpers
│   │   ├── lib/aiVisibilityFields.ts        ← shared field group
│   │   ├── email/transport.ts               ← nodemailer adapter
│   │   └── seed/                            ← 8 idempotent seeds
│   ├── payload.config.ts                    ← central Payload config
│   └── package.json                         ← CMS deps
│
├── docker-compose.yml                       ← Postgres 16 + MailHog
├── docs/                                    ← Phase-based engineering docs
│   ├── 01-architecture.md
│   ├── 02-installation-local.md
│   ├── 03-env-variables.md
│   ├── 04-admin-portal-guide.md
│   ├── 05-phases.md
│   └── 06-frontend-data-flow.md
│
├── Documentation/                           ← THIS deliverable
│   ├── Markdown/                            ← .md sources
│   ├── PDFs/                                ← generated .pdf
│   ├── convert_md_to_pdf.py                 ← converter
│   └── DOCUMENTATION_INDEX.csv              ← Airtable import
│
├── BACKEND_AUDIT_REPORT.md                  ← static analysis snapshot
├── AIRTABLE_SCHEMA_MAP.md                   ← if Airtable were primary CMS
├── COMPLETE_SYSTEM_ARCHITECTURE.md          ← (this deliverable in MD form)
└── public/                                  ← static assets (favicon, logos)
```

## 8. Production-readiness rollup

| System | Current % | Production-ready | Critical blockers |
|---|---|---|---|
| Frontend (visual) | 100 | Yes | None |
| Frontend (CMS integration) | 15 | No | Phase C.2 per-page migration |
| SEO surface | 100 | Yes | None |
| Static deployment | 100 | Yes (current) / No (this branch) | Branch broke static export; needs Phase D VPS |
| Node.js backend (CMS) | 85 | No | Never booted; needs runtime validation |
| Postgres schema | 80 | No | First migrate not run |
| Admin panel | 95 | No | Boot not verified |
| Production server | 0 | No | Whole Phase D pending |
| Dynamic content | 25 | No | CMS not yet authoritative for pages |
| Future SaaS platform | 0 | No | Not started; auth + billing + tenant model TBD |

## 9. Recommended next actions

1. Validate Phase A + B + C.1 locally (5h). Boot Docker, migrate, seed, walk admin.
2. Phase C.2 per-page migration (30–45h). Home → about → contact → services delete → knowledge-hub category landings.
3. Multipart `/api/leads/upload` for CV (4–6h).
4. CMS-side `/api/redirects/:id/hit` companion endpoint (2h).
5. Phase D infrastructure (40–60h). VPS, Caddy, systemd, backups, Plausible, secrets vault.
6. Tests (16–24h). Contract tests on `lib/cms.ts`, Playwright happy-path.
7. Cut-over (4–6h). DNS TTL drop, deploy, DNS swap, 24h watch.

Total: **~95–140 hours** to production-ready.

---

*End of SYSTEM_ARCHITECTURE.md*
