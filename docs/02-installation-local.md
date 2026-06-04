# 02 — Local Installation

Time to a working admin login on your laptop: **~15 minutes** on a clean
machine, faster if you already have Docker and Node.

## Prerequisites

| Tool | Version | Install |
|---|---|---|
| Node.js | 20 LTS or 22 LTS | https://nodejs.org |
| pnpm | 9+ | `npm install -g pnpm` |
| Docker Desktop | latest | https://docker.com |
| git | any recent | usually pre-installed |

Windows users: WSL2 recommended but not required (Docker Desktop runs
natively).

## Step 1 — Clone the repo

```bash
git clone https://github.com/Jonaid880/Security-Blogs.git
cd Security-Blogs
```

## Step 2 — Start Postgres + MailHog

From the repo root:

```bash
docker compose up -d
```

This boots:
- PostgreSQL 16 on `localhost:5432` (user `securityblogs`, password
  `securityblogs`, database `securityblogs`)
- MailHog on `localhost:8025` (web UI to view every outbound email
  the CMS tries to send)

Verify with:

```bash
docker compose ps
```

Both containers should show `Up` and Postgres should show `healthy`.

## Step 3 — Configure CMS env

```bash
cd cms
cp .env.example .env
```

Edit `cms/.env`. For local dev, override:

```env
SMTP_HOST=localhost
SMTP_PORT=1025
SMTP_SECURE=false
SMTP_USER=
SMTP_PASSWORD=
```

(MailHog catches everything — no real auth needed.)

Set a strong PAYLOAD_SECRET:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Paste the output into `PAYLOAD_SECRET=...`.

Keep `SEED_ADMIN_PASSWORD` as the example or pick your own — you'll
change it on first login anyway.

## Step 4 — Install CMS dependencies

```bash
pnpm install
```

(Still inside `cms/`.)

## Step 5 — Run database migrations + seed the first Super Admin

```bash
pnpm payload migrate
pnpm seed:admin
```

Expected output:

```
✓ Created Super Admin: yousif@securityblogs.com.au (id 0193...)
  Log in at http://localhost:3001/admin and change the password immediately.
```

## Step 6 — Start the CMS

```bash
pnpm dev
```

Open http://localhost:3001/admin in your browser.

Log in with:
- Email: whatever you set as `SEED_ADMIN_EMAIL` (default `yousif@securityblogs.com.au`)
- Password: whatever you set as `SEED_ADMIN_PASSWORD`

You should land on the Payload dashboard. The sidebar shows:
- **Access** → Users
- **Library** → Media
- **Content** → Posts
- **Lead Management** → Leads

## Step 7 — Verify the install (5-minute smoke test)

Run through these to confirm everything works:

1. **Account screen** — top right, click your name → My Account → change
   password → save. Log out → log back in with new password.
2. **Create a post** — Posts → Create New → title "Test post", slug
   auto-fills, category "Blog", excerpt "test", write a paragraph in the
   body, save draft, then change status to Published and save.
3. **Upload media** — Media → Create New → drag-drop a small JPG/PNG,
   add alt text "test image", save. Confirm thumbnail variants generate.
4. **Create a test lead** — Leads → Create New → name "Test", email
   "test@example.com", subject "smoke test", source "Manual Entry", save.
   Then assign it to yourself. Check MailHog (http://localhost:8025) — an
   assignment notification email should appear.
5. **Role check** — Users → Create New → invite an Editor account
   (`editor@example.com`, role Editor). Log out, log in as that editor,
   confirm you can create draft posts but cannot delete or change roles.

If all five steps pass, **Phase A is validated**. Sign off in
`05-phases.md` and proceed to Phase B.

## Common issues

| Symptom | Fix |
|---|---|
| `getaddrinfo ENOTFOUND db` when running `pnpm dev` | DATABASE_URI is pointing to `db:5432` but you're running outside docker. Change to `localhost:5432` in `cms/.env` for local dev |
| Migrations fail with "permission denied" | Postgres still starting up — `docker compose ps` should show `healthy` before running migrate |
| Admin page is blank | Check the terminal where `pnpm dev` is running for stack traces. 99% of the time it's a missing env var |
| Login fails silently | Open browser devtools → Network → look at the `/api/users/login` response body for the actual error |
| MailHog shows no emails | Confirm `SMTP_HOST=localhost SMTP_PORT=1025 SMTP_SECURE=false` in `cms/.env` and restart `pnpm dev` |

## Stopping everything

```bash
# Stop the CMS dev server: Ctrl+C in its terminal

# Stop Postgres + MailHog:
docker compose down

# Wipe Postgres data (start fresh):
docker compose down -v
```
