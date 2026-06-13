# DEPLOYMENT_GUIDE

**Target environment:** Hostinger VPS Cloud
**Target architecture:** Dual Next.js apps (marketing + CMS) + managed Postgres + Caddy reverse proxy + systemd
**Status:** Not yet provisioned. This guide covers Phase D operational steps.

---

## 1. Prerequisites

### Provider accounts
| Service | Purpose | Approx cost |
|---|---|---|
| Hostinger VPS Cloud | Compute (4 vCPU / 8GB RAM / 80GB SSD min) | $20–40/mo |
| Hostinger DNS | A records, propagation | Free with VPS |
| Cloudflare (free tier) | DNS proxy + CDN + DDoS | Free |
| Cloudflare Turnstile | Form anti-bot | Free |
| Hostinger Mail | info@securityblogs.com.au mailbox | Existing |
| Backup target (Backblaze B2 / AWS S3 / Hetzner) | Off-site backups | $5/mo |
| Sentry (free tier) | Error tracking | Free up to 5k events/mo |
| BetterStack or UptimeRobot | Uptime monitoring | Free up to 10 monitors |

### Domain DNS state (pre-deploy)
| Record | Current | Target (Phase D cut) |
|---|---|---|
| A `@` | Hostinger shared IP | VPS IP |
| A `www` | redirect to apex | redirect to apex (Caddy handles) |
| A `cms` | (none) | VPS IP |
| A `stats` | (none) | VPS IP |
| MX | Hostinger Mail | unchanged |
| TXT (SPF) | Hostinger Mail | unchanged + harden |
| TXT (DKIM, DMARC) | partial / missing | add full DMARC `p=quarantine; rua=mailto:postmaster@...` |
| CAA | none | `0 issue "letsencrypt.org"` |

## 2. VPS provisioning

### Operating system
Ubuntu 24.04 LTS minimal.

### Initial hardening
```bash
# As root after provisioning
adduser deploy
usermod -aG sudo deploy
# Copy SSH key into /home/deploy/.ssh/authorized_keys

# Disable root SSH + password auth
sed -i 's/^#\?PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config
sed -i 's/^#\?PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
systemctl restart sshd

# Firewall
ufw allow OpenSSH
ufw allow http
ufw allow https
ufw --force enable

# Automatic security updates
apt install -y unattended-upgrades
dpkg-reconfigure --priority=low unattended-upgrades

# fail2ban
apt install -y fail2ban
systemctl enable --now fail2ban
```

### Required packages
```bash
apt update && apt install -y \
  curl ca-certificates \
  postgresql-16 postgresql-contrib \
  caddy \
  rsync git \
  build-essential
```

### Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs
npm install -g pnpm
```

## 3. Postgres setup

```bash
# Create role + DB
sudo -u postgres psql <<'SQL'
CREATE ROLE sb_cms LOGIN PASSWORD 'replace-with-strong-pw';
CREATE DATABASE securityblogs OWNER sb_cms;
GRANT ALL PRIVILEGES ON DATABASE securityblogs TO sb_cms;
SQL

# Tighten pg_hba.conf — only localhost connections
echo "host    securityblogs    sb_cms    127.0.0.1/32    scram-sha-256" >> /etc/postgresql/16/main/pg_hba.conf
systemctl restart postgresql

# Verify
psql "postgres://sb_cms:...@127.0.0.1:5432/securityblogs" -c "SELECT version();"
```

## 4. App deployment

### Directory layout
```
/opt/securityblogs/
├── repo/                                ← git clone
├── env/
│   ├── marketing.env                    ← marketing site env (mode 0600)
│   └── cms.env                          ← CMS env (mode 0600)
├── data/
│   └── media-uploads/                   ← Payload Media local-disk storage
└── logs/
```

### Clone + build
```bash
sudo -u deploy bash <<'BASH'
mkdir -p /opt/securityblogs/{repo,env,data/media-uploads,logs}
cd /opt/securityblogs
git clone https://github.com/Jonaid880/Security-Blogs.git repo
cd repo
git checkout phase-c-frontend-rewire        # or whatever is the production branch
pnpm install --frozen-lockfile
cd cms && pnpm install --frozen-lockfile
BASH
```

### Environment files
**`/opt/securityblogs/env/marketing.env`** (mode 0600, owner deploy):
```bash
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://securityblogs.com.au
CMS_URL=http://127.0.0.1:3001
PAYLOAD_API_KEY=<generated in admin>
NEXT_PUBLIC_TURNSTILE_SITE_KEY=<from Cloudflare>
TURNSTILE_SECRET_KEY=<from Cloudflare>
NEXT_PUBLIC_MAPBOX_TOKEN=<existing>
NEXT_PUBLIC_GMAPS_KEY=<existing>
SENTRY_DSN=<from Sentry>
```

**`/opt/securityblogs/env/cms.env`** (mode 0600, owner deploy):
```bash
NODE_ENV=production
NEXT_PUBLIC_SERVER_URL=https://cms.securityblogs.com.au
NEXT_PUBLIC_SITE_URL=https://securityblogs.com.au
PAYLOAD_SECRET=<48-byte hex; generate with `openssl rand -hex 48`>
DATABASE_URI=postgres://sb_cms:STRONGPW@127.0.0.1:5432/securityblogs
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=info@securityblogs.com.au
SMTP_PASSWORD=<mailbox pw>
EMAIL_FROM_NAME=SecurityBlogs
EMAIL_FROM_ADDRESS=info@securityblogs.com.au
MEDIA_LOCAL_PATH=/opt/securityblogs/data/media-uploads
NEXT_PUBLIC_MEDIA_BASE_URL=https://cms.securityblogs.com.au/media
SEED_ADMIN_EMAIL=yousif@securityblogs.com.au
SEED_ADMIN_NAME=Yousif Jonaid
SEED_ADMIN_PASSWORD=<one-time strong pw — must change on first login>
```

### Build apps
```bash
cd /opt/securityblogs/repo
pnpm build                                # marketing site
cd cms && pnpm build                      # CMS
```

### First-time DB migrate + seed
```bash
cd /opt/securityblogs/repo/cms
set -a; source /opt/securityblogs/env/cms.env; set +a
pnpm payload migrate
pnpm seed:admin                           # creates first Super Admin
pnpm seed:all                             # populates Services, Pages, etc.
```

## 5. systemd units

**`/etc/systemd/system/sb-cms.service`**
```ini
[Unit]
Description=SecurityBlogs CMS (Payload)
After=network.target postgresql.service
Requires=postgresql.service

[Service]
Type=simple
User=deploy
Group=deploy
WorkingDirectory=/opt/securityblogs/repo/cms
EnvironmentFile=/opt/securityblogs/env/cms.env
ExecStart=/usr/bin/pnpm start
Restart=always
RestartSec=5
StandardOutput=append:/opt/securityblogs/logs/cms.log
StandardError=append:/opt/securityblogs/logs/cms.err

[Install]
WantedBy=multi-user.target
```

**`/etc/systemd/system/sb-web.service`**
```ini
[Unit]
Description=SecurityBlogs marketing site (Next.js)
After=network.target sb-cms.service
Requires=sb-cms.service

[Service]
Type=simple
User=deploy
Group=deploy
WorkingDirectory=/opt/securityblogs/repo
EnvironmentFile=/opt/securityblogs/env/marketing.env
ExecStart=/usr/bin/pnpm start
Restart=always
RestartSec=5
StandardOutput=append:/opt/securityblogs/logs/web.log
StandardError=append:/opt/securityblogs/logs/web.err

[Install]
WantedBy=multi-user.target
```

```bash
systemctl daemon-reload
systemctl enable --now sb-cms sb-web
systemctl status sb-cms sb-web
```

## 6. Caddy reverse proxy + TLS

**`/etc/caddy/Caddyfile`**
```caddy
# Marketing site
securityblogs.com.au, www.securityblogs.com.au {
    encode zstd gzip

    # www → apex
    @www host www.securityblogs.com.au
    redir @www https://securityblogs.com.au{uri} permanent

    reverse_proxy 127.0.0.1:3000

    log {
        output file /var/log/caddy/web.log {
            roll_size 100mb
            roll_keep 10
        }
    }
}

# CMS
cms.securityblogs.com.au {
    encode zstd gzip
    reverse_proxy 127.0.0.1:3001

    # Block external access to /api/* except from marketing site
    @api path /api/*
    @cf_internal remote_ip 127.0.0.1/32  # adjust to VPS internal IPs

    log {
        output file /var/log/caddy/cms.log {
            roll_size 100mb
            roll_keep 10
        }
    }
}

# Plausible (Phase D.5)
stats.securityblogs.com.au {
    reverse_proxy 127.0.0.1:8000
}
```

```bash
systemctl reload caddy
# Caddy auto-provisions Let's Encrypt certs on first request
```

## 7. Backups

### Nightly pg_dump cron
**`/etc/cron.daily/sb-pg-backup`** (mode 0755)
```bash
#!/bin/bash
set -euo pipefail
TS=$(date +%F)
DEST=/opt/securityblogs/data/backups
mkdir -p "$DEST"

# Dump
pg_dump --format=custom \
  --no-owner --no-acl \
  --file="$DEST/securityblogs-$TS.dump" \
  postgres://sb_cms:STRONGPW@127.0.0.1:5432/securityblogs

# Encrypt
gpg --batch --yes --passphrase-file /opt/securityblogs/env/backup.passphrase \
  --symmetric --cipher-algo AES256 \
  --output "$DEST/securityblogs-$TS.dump.gpg" \
  "$DEST/securityblogs-$TS.dump"
rm "$DEST/securityblogs-$TS.dump"

# Push to off-site (B2)
rclone copy "$DEST/securityblogs-$TS.dump.gpg" b2:sb-backups/

# Prune local > 7 days
find "$DEST" -name '*.gpg' -mtime +7 -delete
```

### Media daily tar
**`/etc/cron.daily/sb-media-backup`** (mode 0755)
```bash
#!/bin/bash
set -euo pipefail
TS=$(date +%F)
DEST=/opt/securityblogs/data/backups
tar czf "$DEST/media-$TS.tgz" -C /opt/securityblogs/data media-uploads
rclone copy "$DEST/media-$TS.tgz" b2:sb-backups/
find "$DEST" -name 'media-*.tgz' -mtime +7 -delete
```

### Monthly DR drill
1. Spin a throwaway Hostinger VM.
2. Install Postgres + apps from this guide.
3. `rclone copy b2:sb-backups/latest.dump.gpg .`
4. `gpg --decrypt` + `pg_restore` into the VM.
5. Boot CMS, verify admin login + sample content present.
6. Tear down VM. Log result in `/opt/securityblogs/logs/dr-drill.log`.

## 8. Plausible self-host (optional)

```bash
mkdir -p /opt/plausible
cd /opt/plausible
# Use the official docker-compose
curl -L https://github.com/plausible/community-edition/raw/v2.1.5/compose.yml -o compose.yml
# Edit env (base_url=https://stats.securityblogs.com.au)
docker compose up -d
```

Add the snippet to Settings.analytics in CMS:
```html
<script defer data-domain="securityblogs.com.au" src="https://stats.securityblogs.com.au/js/script.js"></script>
```

## 9. Cut-over checklist

48 hours before:
- [ ] Lower DNS TTL on A `@` to 300s
- [ ] Take final `out/` snapshot of current static deploy
- [ ] Sign off Phase C.1 + C.2 locally

24 hours before:
- [ ] Provision VPS, install everything per §2–§7
- [ ] `pnpm payload migrate` + `pnpm seed:all` on prod DB
- [ ] Create first Super Admin
- [ ] Walk every page on `https://staging.securityblogs.com.au` (the VPS IP via /etc/hosts trick) and compare against production

Cut-over hour:
- [ ] Update A record `@` to VPS IP
- [ ] Watch DNS propagation (use `dig +short securityblogs.com.au` from multiple regions)
- [ ] First hit triggers Caddy → Let's Encrypt cert issuance
- [ ] Smoke test: home, /aio/, /contact/ form submit, /sitemap.xml

After cut-over:
- [ ] Tail `/opt/securityblogs/logs/web.err` for first hour
- [ ] Check Sentry for unexpected errors
- [ ] Verify uptime monitor green
- [ ] Keep Hostinger shared static deploy running for 30 days as rollback safety
- [ ] Bump DNS TTL back to 3600s after 48 hours stable

## 10. Rollback procedure

| Scenario | Action |
|---|---|
| App crashes after deploy | `systemctl restart sb-web sb-cms`; check logs |
| Pages 500 globally | Revert A record to old shared host IP (5-min DNS propagation) |
| DB migration broke schema | `systemctl stop sb-cms; pg_restore --clean pre-migrate.dump; systemctl start sb-cms` |
| Lost data after cut | Restore latest off-site backup; data after cut window is lost — minimise window |
| TLS cert issue | `caddy run --config /etc/caddy/Caddyfile` from CLI; watch logs |
| Compromised VPS | Spin a fresh VPS; restore from backup; rotate ALL secrets (Payload secret, DB pw, SMTP pw, API keys) |

## 11. Operational handover

| Owner | Responsibility |
|---|---|
| Engineer on call | systemd unit health, DB backups verified, certificate expiry check |
| Editorial | Admin password rotation 90-day, content publishing |
| Finance | Hostinger / Cloudflare / B2 / Sentry / BetterStack billing |
| Yousif Jonaid (Super Admin) | Role assignment, Settings global edits |

---

*End of DEPLOYMENT_GUIDE.md*
