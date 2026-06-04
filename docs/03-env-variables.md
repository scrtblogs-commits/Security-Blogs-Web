# 03 — Environment Variables

Every variable consumed by the CMS, where it's read, what it's for,
and what to set it to in each environment.

The file `cms/.env.example` is the canonical template — copy it to
`cms/.env` (gitignored) and fill in values per the table below.

## Required

| Variable | Used by | Example (dev) | Example (prod) | Notes |
|---|---|---|---|---|
| `NODE_ENV` | Next.js + Payload | `development` | `production` | Affects logging, cookie security, schema-push behaviour |
| `PORT` | Next.js | `3001` | `3001` | CMS port. Caddy maps `/admin` + `/api` here in prod |
| `NEXT_PUBLIC_SERVER_URL` | Payload (admin links, emails) | `http://localhost:3001` | `https://securityblogs.com.au` | The URL the CMS thinks it lives at |
| `NEXT_PUBLIC_SITE_URL` | Payload (CORS allow-list) | `http://localhost:3000` | `https://securityblogs.com.au` | The marketing site URL |
| `PAYLOAD_SECRET` | Payload (JWT signing) | 48 random bytes hex | Different 48 random bytes hex | **Never share** — rotates JWT keys |
| `DATABASE_URI` | Postgres adapter | `postgres://securityblogs:securityblogs@localhost:5432/securityblogs` | `postgres://USER:PASS@HOST:5432/securityblogs` | Hostinger VPS Postgres in prod |

## Email (Hostinger SMTP)

| Variable | Dev (MailHog) | Prod (Hostinger) | Notes |
|---|---|---|---|
| `SMTP_HOST` | `localhost` | `smtp.hostinger.com` | |
| `SMTP_PORT` | `1025` | `465` | 465 = SMTPS (implicit TLS) — recommended |
| `SMTP_SECURE` | `false` | `true` | `true` only with port 465 |
| `SMTP_USER` | (blank) | `info@securityblogs.com.au` | Your mailbox |
| `SMTP_PASSWORD` | (blank) | mailbox password | Never commit |
| `EMAIL_FROM_NAME` | `SecurityBlogs` | `SecurityBlogs` | |
| `EMAIL_FROM_ADDRESS` | `info@securityblogs.com.au` | same | Must match `SMTP_USER` on Hostinger |

## Seed (first deploy only)

| Variable | Purpose |
|---|---|
| `SEED_ADMIN_EMAIL` | Email for the first Super Admin user |
| `SEED_ADMIN_NAME` | Display name |
| `SEED_ADMIN_PASSWORD` | Initial password — **change on first login** |

The seed script (`pnpm seed:admin`) is idempotent. After the first run,
these vars can be removed from the production env file.

## Media

| Variable | Dev | Prod | Notes |
|---|---|---|---|
| `MEDIA_LOCAL_PATH` | `./media-uploads` | `/var/securityblogs/uploads` | Where uploads land on disk |
| `NEXT_PUBLIC_MEDIA_BASE_URL` | `http://localhost:3001/media` | `https://securityblogs.com.au/media` | Public URL prefix for serving media |

## Optional

| Variable | When | Notes |
|---|---|---|
| `TURNSTILE_SITE_KEY` | Phase C | Cloudflare Turnstile — anti-bot for the public form endpoint |
| `TURNSTILE_SECRET_KEY` | Phase C | Server-side verification key |
| `PLAUSIBLE_DASHBOARD_URL` | Phase D | URL of your self-hosted Plausible instance (e.g. `https://stats.securityblogs.com.au`) |

## Secrets handling

- **Never** commit `.env` to git. It's already in `.gitignore` (both at
  the repo root and inside `cms/`).
- **Production secrets** live in a systemd `EnvironmentFile=` at
  `/etc/securityblogs/cms.env` with `chmod 600` and root ownership.
  Phase D's deploy script provisions this file from a secret manager
  of your choice (Hostinger VPS' systemd is the default; for stronger
  separation, look at `pass`/`age`/`sops` workflows).
- **Rotate quarterly:** `PAYLOAD_SECRET`, `SMTP_PASSWORD`, any API keys.
  Document rotation in `docs/09-security-checklist.md` (Phase D).

## Where each variable is read

| Variable | Read in | Line |
|---|---|---|
| `DATABASE_URI` | `cms/payload.config.ts` | `postgresAdapter({ pool: { connectionString: ... } })` |
| `PAYLOAD_SECRET` | `cms/payload.config.ts` | `secret: process.env.PAYLOAD_SECRET` |
| `NEXT_PUBLIC_SERVER_URL` | `cms/payload.config.ts` | `serverURL`, CORS allow-list |
| `NEXT_PUBLIC_SITE_URL` | `cms/payload.config.ts` | CORS + CSRF allow-list |
| `SMTP_*`, `EMAIL_FROM_*` | `cms/src/email/transport.ts` | `nodemailer.createTransport({...})` |
| `SEED_ADMIN_*` | `cms/src/seed/admin.ts` | `payload.create({ ... })` |
| `MEDIA_LOCAL_PATH` | `cms/src/collections/Media.ts` | `staticDir` |
| `NEXT_PUBLIC_MEDIA_BASE_URL` | Frontend renderers (Phase C) | url prefix for image URLs |
