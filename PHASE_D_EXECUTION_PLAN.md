# PHASE_D_EXECUTION_PLAN

**Goal:** Convert the documented architecture into a running backend on this Windows machine.
**Approach:** Direct local install (no Docker), then boot Payload CMS, migrate schema, seed admin + content, verify.
**Date:** 2026-06-14
**Status:** Executing now — see `BOOT_REPORT.md` for results.

---

## Environment inventory (pre-execution)

| Component | Status | Path |
|---|---|---|
| Node.js | ✅ 22.13.1 portable | `C:\Users\jonaid\AppData\Local\node-portable\node-v22.13.1-win-x64\` |
| npm | ✅ 10.9.2 | (bundled with node) |
| pnpm | ❌ not installed | (will install globally) |
| Docker / Docker Desktop | ❌ not installed | — |
| PostgreSQL | ❌ not installed | (will install via winget) |
| Python 3.12 + reportlab | ✅ installed earlier | for PDF pipeline (unused here) |
| Git + Bash | ✅ via Git for Windows | |
| winget | ✅ available | |

## Decision: skip Docker, install Postgres directly

Docker Desktop install on Windows requires WSL2/Hyper-V backend toggling and likely a reboot. **Postgres direct install via winget is faster and gives the same end result for the CMS.** The `docker-compose.yml` in the repo can stay as documentation for future Docker users; we proceed without it.

For email capture in dev, the CMS will use `SMTP_HOST=localhost` with no SMTP server — Payload's email adapter is graceful when SMTP can't connect (logs error, continues). We will NOT install MailHog; the `req.payload.sendEmail` call from `Leads.afterChange` hook will silently fail, which is acceptable for dev verification. We'll record this gap honestly in `BOOT_REPORT.md`.

---

## Execution steps

### Step 1 — Install PostgreSQL 16
```powershell
winget install --id PostgreSQL.PostgreSQL.16 -e --silent --accept-source-agreements --accept-package-agreements `
  --override "--mode unattended --superpassword postgres --serverport 5432 --servicepassword postgres"
```
Expect:
- Install location: `C:\Program Files\PostgreSQL\16\`
- Service running: `postgresql-x64-16`
- Superuser `postgres` with password `postgres`
- Listening on `localhost:5432`

### Step 2 — Create database + role
```sql
CREATE ROLE securityblogs LOGIN PASSWORD 'securityblogs';
CREATE DATABASE securityblogs OWNER securityblogs;
GRANT ALL PRIVILEGES ON DATABASE securityblogs TO securityblogs;
```
Run via `psql -U postgres`.

### Step 3 — Install pnpm
```powershell
npm install -g pnpm
```

### Step 4 — Install CMS dependencies
```powershell
cd cms
pnpm install --no-frozen-lockfile
```
Allow lockfile drift on first install (no lockfile exists yet).

### Step 5 — Create `cms\.env`
```bash
NODE_ENV=development
PORT=3001
NEXT_PUBLIC_SERVER_URL=http://localhost:3001
NEXT_PUBLIC_SITE_URL=http://localhost:3000
PAYLOAD_SECRET=dev-only-secret-replace-in-production-48-bytes-hex
DATABASE_URI=postgres://securityblogs:securityblogs@localhost:5432/securityblogs
SMTP_HOST=localhost
SMTP_PORT=1025
SMTP_SECURE=false
SMTP_USER=
SMTP_PASSWORD=
EMAIL_FROM_NAME=SecurityBlogs
EMAIL_FROM_ADDRESS=info@securityblogs.com.au
SEED_ADMIN_EMAIL=yousif@securityblogs.com.au
SEED_ADMIN_NAME=Yousif Jonaid
SEED_ADMIN_PASSWORD=ChangeMeOnFirstLogin2026!
MEDIA_LOCAL_PATH=./media-uploads
NEXT_PUBLIC_MEDIA_BASE_URL=http://localhost:3001/media
```

### Step 6 — Run migrations
```powershell
cd cms
pnpm payload migrate
```
Expected: Postgres tables created for all 9 collections + Settings global + Payload internals.

### Step 7 — Seed first admin
```powershell
pnpm seed:admin
```
Expected: One row in `users` table (Super Admin).

### Step 8 — Seed all content
```powershell
pnpm seed:all
```
Expected: 1 Settings row, 7 Services, 6 Case Studies, 6 Partners, 10 Pages, ~40 Redirects.

### Step 9 — Boot CMS dev server
```powershell
pnpm dev
```
Expected: Server listening at `http://localhost:3001`. Admin UI at `http://localhost:3001/admin`.

### Step 10 — Verify via preview tool
- HTTP GET `http://localhost:3001/api/users/login` returns Payload's login endpoint shape.
- Open `http://localhost:3001/admin` → login screen renders.
- Submit admin credentials → dashboard renders.
- Navigate sidebar: Users, Media, Pages, Services, CaseStudies, Partners, Posts, Leads, Redirects, Settings.
- Open a seeded Service → fields populated.

### Step 11 — Test media upload
- Admin → Media → Create new
- Upload a small image
- Verify variants (thumbnail/small/medium/large) generated
- Verify file lands in `cms/media-uploads/`

### Step 12 — Test email config (limited — no MailHog)
- Edit a seeded Lead, set `assignedTo`
- Check CMS logs for SMTP send attempt
- Expected: log shows connection refused to `localhost:1025` (no MailHog running)
- This proves the email pipeline TRIES to send; full verification requires MailHog or real SMTP

### Step 13 — Capture URLs + write BOOT_REPORT.md
Document everything observed.

---

## Stop-conditions

| If this fails | Document and stop |
|---|---|
| Postgres install errors | Note error, skip remaining steps, write report with what worked |
| `pnpm install` fails (peer dep / corepack issues) | Note specific error, attempt one workaround, then stop |
| `payload migrate` errors | Capture full stack trace, stop |
| `pnpm dev` won't bind to 3001 | Try alternate port, note in report |

---

*This plan executes in `BOOT_REPORT.md`.*
