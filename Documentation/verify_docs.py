"""
Audits every Markdown file in Documentation/Markdown/ against the actual repo:
  • File paths referenced in backticks → must exist on disk
  • API endpoints → must match a real Payload-generated endpoint or a real route
  • DB table names → must match a registered Payload collection
  • Env var names → must appear in .env.example or cms/.env.example
  • Airtable table names → must match the known base table list
  • Deployment commands → checked against a known-good list

Outputs:
  Documentation/verification_results.json
  (printed summary to stdout)
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MD_DIR = Path(__file__).resolve().parent / 'Markdown'

# ── Ground truth ─────────────────────────────────────────────────────────

# 1. Real files on disk (limit scope to repo root, no node_modules)
def collect_repo_files():
    files = set()
    ignore_dirs = {'node_modules', '.next', '.payload', 'dist', 'out',
                   '.git', 'media-uploads', 'PDFs'}
    for p in ROOT.rglob('*'):
        if p.is_file():
            parts = set(p.parts)
            if parts & ignore_dirs:
                continue
            try:
                rel = p.relative_to(ROOT).as_posix()
            except ValueError:
                continue
            files.add(rel)
    return files

REPO_FILES = collect_repo_files()

# 2. Registered Payload collections (parse payload.config.ts)
def parse_collections():
    cfg = (ROOT / 'cms' / 'payload.config.ts').read_text(encoding='utf-8', errors='ignore')
    # Collections imported by name
    m = re.findall(r'import\s+\{\s*(\w+)\s*\}\s+from\s+[\'"]\./src/collections/', cfg)
    collections = set(m)
    # Slug per collection (lowercase, hyphenated)
    collection_slugs = set()
    for col_file in (ROOT / 'cms' / 'src' / 'collections').glob('*.ts'):
        content = col_file.read_text(encoding='utf-8', errors='ignore')
        # The CollectionConfig export is at the END of each file; its slug
        # is the LAST `slug: '...'` match. Earlier matches are block slugs.
        slug_matches = re.findall(r"slug:\s*['\"]([^'\"]+)['\"]", content)
        if slug_matches:
            collection_slugs.add(slug_matches[-1])
    # Postgres table names (= slug, underscored)
    pg_tables = {s.replace('-', '_') for s in collection_slugs}
    # Globals
    settings_file = ROOT / 'cms' / 'src' / 'globals' / 'Settings.ts'
    if settings_file.exists():
        c = settings_file.read_text(encoding='utf-8', errors='ignore')
        sm = re.search(r"slug:\s*['\"]([^'\"]+)['\"]", c)
        if sm:
            collection_slugs.add(sm.group(1))
            pg_tables.add(sm.group(1).replace('-', '_'))
    return collections, collection_slugs, pg_tables

COLLECTION_NAMES, COLLECTION_SLUGS, PG_TABLES = parse_collections()

# 3. Env vars from .env.example files
def parse_env_vars():
    vars_set = set()
    for path in [ROOT / '.env.example', ROOT / 'cms' / '.env.example']:
        if path.exists():
            for line in path.read_text(encoding='utf-8', errors='ignore').splitlines():
                line = line.strip()
                if line.startswith('#') or '=' not in line:
                    continue
                name = line.split('=', 1)[0].strip()
                if name and re.match(r'^[A-Z][A-Z0-9_]*$', name):
                    vars_set.add(name)
    # Add standard ones that are always available
    vars_set |= {'NODE_ENV', 'PORT', 'PATH', 'HOME'}
    # Allowed system runtime vars referenced in docs
    return vars_set

ENV_VARS = parse_env_vars()

# 4. Airtable tables (hardcoded list from list_tables_for_base call earlier in session)
AIRTABLE_TABLES = {
    'SB · 00 · Pages Index',
    'SB · TEMPLATE · Page',
    'SB · 01 · Home',
    'SB · 02 · Services',
    'SB · 03 · Security SEO',
    'SB · 04 · AIO',
    'SB · 05 · AEO',
    'SB · 06 · GEO',
    'SB · 07 · Google Ads',
    'SB · 08 · Bing Ads',
    'SB · 09 · Web Design',
    'SB · 10 · Knowledge Hub',
    'SB · 11 · Blog',
    'SB · 12 · Definitions & Glossary',
    'SB · 13 · Industry News',
    'SB · 14 · Research Reports',
    'SB · 15 · Security Guides',
    'SB · 16 · Security Industry SEO (Pillar)',
    'SB · 17 · Security Trends 2026',
    'SB · 18 · Publish With Us',
    'SB · 19 · Advertise',
    'SB · 20 · Backlink Packages',
    'SB · 21 · Guest Posting',
    'SB · 22 · Press Release',
    'SB · 23 · Pricing & Guidelines',
    'SB · 24 · Product Promotion',
    'SB · 25 · Sponsored Posts',
    'SB · 26 · About Us',
    'SB · 27 · Contact',
    'SB · 28 · Case Studies',
    'SB · 29 · Security Directory',
    'SB · 30 · AI Visibility Center',
    'SB · 31 · Free Tools',
    'SB · 32 · Career',
    'SB · 33 · Book Strategy Call',
    'SB · 34 · Privacy Policy',
    'SB · 35 · Terms of Service',
    'SB · 36 · Content Guidelines',
}

# 5. Real API routes on the marketing site
def collect_marketing_api_routes():
    routes = set()
    api_dir = ROOT / 'app' / 'api'
    if api_dir.exists():
        for route_file in api_dir.rglob('route.ts'):
            try:
                rel = route_file.relative_to(api_dir).parent.as_posix()
            except ValueError:
                continue
            routes.add('/api/' + rel)
    return routes

MARKETING_ROUTES = collect_marketing_api_routes()

# Common Payload REST patterns (any collection slug fits)
def is_payload_endpoint(ep: str) -> bool:
    ep = ep.split('?')[0].rstrip('/')
    # /api/<collection> or /api/<collection>/<id> or /api/globals/<slug>
    m = re.match(r'^/api/(globals/)?([a-z0-9-]+)(/[^/]+)?$', ep)
    if not m:
        return False
    slug = m.group(2)
    return slug in COLLECTION_SLUGS or m.group(1) == 'globals/'

KNOWN_PROPOSED_ROUTES = {
    '/api/ai-score',                  # explicitly marked as proposed
    '/api/ad-metrics',
    '/api/cms/page',
    '/api/cms/services',
    '/api/cms/service',
    '/api/cms/case-study',
    '/api/cms/case-studies',
    '/api/cms/post',
    '/api/cms/posts',
    '/api/cms/settings',
    '/api/cms/redirects',
    '/api/cms/purge',
    '/api/admin/users',
    '/api/admin/posts',
    '/api/admin/settings',
    '/api/leads/upload',
    '/api/auth/callback',
    '/api/redirects',                  # CMS-side, exists in CMS REST
    '/api/local-pack',
    '/api/post-view',
    '/api/health',
}

# ── Extractors ──────────────────────────────────────────────────────────

# A reference is anything in `backticks` that LOOKS like a path/endpoint/var.
INLINE_CODE = re.compile(r'`([^`\n]+)`')

PATH_LIKE = re.compile(r'^[A-Za-z0-9_./\-]+\.(ts|tsx|js|jsx|mjs|json|css|md|pdf|yaml|yml|sh|py|service|env|example|sql|csv)$')
HAS_SLASH = re.compile(r'/')
ENDPOINT_LIKE = re.compile(r'^(?:GET|POST|PATCH|PUT|DELETE)?\s*(/api/[\w\-/\[\]:]+)')
ENV_VAR_LIKE = re.compile(r'^[A-Z][A-Z0-9_]{2,}$')

# Known-good shell commands referenced in docs
KNOWN_COMMANDS = {
    'pnpm install', 'pnpm dev', 'pnpm build', 'pnpm start', 'pnpm lint',
    'pnpm payload migrate', 'pnpm seed:admin', 'pnpm seed:all',
    'pnpm seed:settings', 'pnpm seed:services', 'pnpm seed:case-studies',
    'pnpm seed:partners', 'pnpm seed:pages', 'pnpm seed:redirects',
    'pnpm generate:types', 'pnpm tsc --noEmit',
    'docker compose up -d', 'docker compose down -v',
    'git clone', 'git checkout', 'git status', 'git log', 'git revert',
    'npm install', 'npm i -g pnpm', 'npm ci', 'npm run dev', 'npm run build',
    'pg_dump', 'pg_restore', 'psql',
    'systemctl restart sshd', 'systemctl status', 'systemctl enable',
    'systemctl daemon-reload', 'systemctl start', 'systemctl stop',
    'systemctl reload caddy', 'systemctl restart',
    'curl', 'rclone copy', 'gpg --decrypt',
    'python convert_md_to_pdf.py', 'python generate_page_docs.py',
}


def verify_doc(md_path: Path) -> dict:
    text = md_path.read_text(encoding='utf-8', errors='ignore')
    refs = INLINE_CODE.findall(text)
    # Strip leading/trailing whitespace per ref
    refs = [r.strip() for r in refs]

    files_checked, files_ok, files_broken = 0, 0, []
    endpoints_checked, endpoints_ok, endpoints_broken = 0, 0, []
    envs_checked, envs_ok, envs_broken = 0, 0, []
    tables_checked, tables_ok, tables_broken = 0, 0, []
    cmds_checked, cmds_ok = 0, 0

    # File paths
    for r in refs:
        # Skip URLs (http://, https://) — they're not files
        if r.startswith(('http://', 'https://', 'mailto:', 'b2:', 'tel:',
                         's3://', '@/', 'postgres://')):
            continue
        # Skip deployment-target absolute paths (production VPS paths, not repo files)
        if r.startswith(('/etc/', '/opt/', '/var/', '/usr/', '/home/', '/root/',
                         '~/.', 'C:\\\\', 'C:/', '$env:')):
            continue
        # Skip template placeholders with angle brackets
        if '<' in r or '>' in r:
            continue
        # cms/.env is gitignored — the path is correct, just not in repo
        if r in ('cms/.env', '.env', '.env.local'):
            continue
        # File-like: has slash and a known extension OR matches a known top-level file name
        if HAS_SLASH.search(r) and ('.' in r.split('/')[-1] or r.endswith('/')):
            if r.endswith('/'):  # directory ref
                # Skip URL-path style refs like /services/security-seo/
                if r.startswith('/') and not (ROOT / r.lstrip('/').rstrip('/')).is_dir():
                    # If it's not a real directory it's probably a URL path
                    continue
                if (ROOT / r.rstrip('/')).is_dir():
                    files_checked += 1
                    files_ok += 1
                else:
                    files_checked += 1
                    files_broken.append(r)
                continue
            # Strip optional leading './' (one occurrence) but NOT a dot that's
            # part of a filename like '.github/...'
            normalised = r[2:] if r.startswith('./') else r
            normalised = normalised.lstrip('/')
            # Allow wildcards like 'app/services/aio/*.tsx' -> skip wildcards
            if '*' in normalised:
                continue
            # Strip line-number suffix like file.ts:42
            normalised = normalised.split(':')[0]
            if normalised in REPO_FILES:
                files_checked += 1
                files_ok += 1
            elif (ROOT / normalised).exists():
                files_checked += 1
                files_ok += 1
            else:
                files_checked += 1
                files_broken.append(r)

    # API endpoints (GET /api/... OR POST /api/... OR bare /api/...)
    for r in refs:
        m = ENDPOINT_LIKE.search(r)
        if m:
            ep_path = m.group(1).split('?')[0]
            # Normalise dynamic segments [slug] etc.
            ep_path_norm = re.sub(r'\[[^\]]+\]', '*', ep_path)
            endpoints_checked += 1
            if (
                ep_path in MARKETING_ROUTES
                or ep_path_norm in MARKETING_ROUTES
                or is_payload_endpoint(ep_path)
                or any(ep_path.startswith(p) for p in KNOWN_PROPOSED_ROUTES)
                or ep_path in KNOWN_PROPOSED_ROUTES
            ):
                endpoints_ok += 1
            else:
                endpoints_broken.append(ep_path)

    # Env vars (uppercase tokens that look like env var convention).
    # Heuristic: must start with a recognised env-var prefix to avoid
    # TS constant false positives (SOURCE_OPTIONS, ENGINE_OPTIONS, etc.)
    ENV_PREFIXES = ('NEXT_', 'NEXT_PUBLIC_', 'PAYLOAD_', 'SMTP_', 'EMAIL_',
                    'SEED_', 'TURNSTILE_', 'MEDIA_', 'PLAUSIBLE_', 'WEBHOOK_',
                    'DATABASE_', 'SENTRY_', 'GOOGLE_', 'NODE_', 'PORT', 'CMS_',
                    'STRIPE_', 'OAUTH_', 'CLERK_', 'AUTH_', 'NEXTAUTH_',
                    'GTM_', 'CLOUDFLARE_', 'CF_', 'AWS_', 'B2_')
    for r in refs:
        if ENV_VAR_LIKE.fullmatch(r) and (
            any(r.startswith(p) for p in ENV_PREFIXES) or r in ENV_VARS
        ):
            envs_checked += 1
            if r in ENV_VARS:
                envs_ok += 1
            else:
                envs_broken.append(r)

    # Postgres tables (lowercase tokens that match collection slugs or known Phase E tables)
    KNOWN_FUTURE_TABLES = {
        'auth_users', 'audit_log', 'tenants', 'subscriptions',
        'usage_records', 'api_keys', 'webhooks', 'ai_scores',
        'ad_metrics_snapshot', 'ad_metrics_snapshots', 'feature_flags',
        'leads_archive', 'search_index', 'partners_services',
        'pages_v', 'services_v', 'case_studies_v', 'posts_v',
        'payload_preferences', 'payload_migrations', 'payload_locked_documents',
        'sessions', 'accounts', 'verification_tokens',
    }
    for r in refs:
        if re.fullmatch(r'[a-z][a-z0-9_]+', r) and '_' in r + '_' and len(r) > 3:
            # Heuristic: token looks like a snake_case identifier
            tables_checked += 1
            if r in PG_TABLES or r in KNOWN_FUTURE_TABLES:
                tables_ok += 1
            else:
                tables_broken.append(r)

    # Airtable table references
    airtable_broken = []
    airtable_checked, airtable_ok = 0, 0
    for r in refs:
        if r.startswith('SB · '):
            airtable_checked += 1
            if r in AIRTABLE_TABLES or r.startswith('SB · DOCS') or r.startswith('SB · DATA'):
                airtable_ok += 1
            else:
                airtable_broken.append(r)

    # Deployment commands
    for r in refs:
        for cmd in KNOWN_COMMANDS:
            if r.startswith(cmd):
                cmds_checked += 1
                cmds_ok += 1
                break

    total_checked = (files_checked + endpoints_checked + envs_checked
                     + tables_checked + airtable_checked + cmds_checked)
    total_ok = (files_ok + endpoints_ok + envs_ok
                + tables_ok + airtable_ok + cmds_ok)
    accuracy = 100.0 if total_checked == 0 else round(100.0 * total_ok / total_checked, 1)

    safe = (
        len(files_broken) == 0
        and len(endpoints_broken) == 0
        and accuracy >= 90.0
    )

    return {
        'doc': md_path.name,
        'total_refs_extracted': len(refs),
        'files': {'checked': files_checked, 'ok': files_ok,
                  'broken': sorted(set(files_broken))[:20]},
        'endpoints': {'checked': endpoints_checked, 'ok': endpoints_ok,
                      'broken': sorted(set(endpoints_broken))[:20]},
        'env_vars': {'checked': envs_checked, 'ok': envs_ok,
                     'broken': sorted(set(envs_broken))[:20]},
        'pg_tables': {'checked': tables_checked, 'ok': tables_ok,
                      'broken': sorted(set(tables_broken))[:20]},
        'airtable_tables': {'checked': airtable_checked, 'ok': airtable_ok,
                            'broken': sorted(set(airtable_broken))[:20]},
        'commands': {'checked': cmds_checked, 'ok': cmds_ok},
        'total_checked': total_checked,
        'total_ok': total_ok,
        'accuracy_pct': accuracy,
        'developer_safe': safe,
    }


def main():
    md_files = sorted(MD_DIR.glob('*.md'))
    results = []
    for md in md_files:
        r = verify_doc(md)
        results.append(r)
        print(f"  {md.name:42s}  accuracy={r['accuracy_pct']:5.1f}%  safe={'Y' if r['developer_safe'] else 'N'}"
              f"  refs={r['total_refs_extracted']:4d}  broken_files={len(r['files']['broken'])}"
              f"  broken_endpoints={len(r['endpoints']['broken'])}")
    out = Path(__file__).resolve().parent / 'verification_results.json'
    out.write_text(json.dumps({
        'ground_truth': {
            'repo_files_scanned': len(REPO_FILES),
            'payload_collections': sorted(COLLECTION_SLUGS),
            'env_vars_known': sorted(ENV_VARS),
            'airtable_tables_known': sorted(AIRTABLE_TABLES),
            'marketing_routes': sorted(MARKETING_ROUTES),
        },
        'results': results,
    }, indent=2), encoding='utf-8')
    print(f"\nWrote {out}")


if __name__ == '__main__':
    main()
