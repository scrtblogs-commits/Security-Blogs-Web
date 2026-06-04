// Entry point that runs every seed in dependency order.
// Safe to re-run — every individual seed is idempotent.
//
// Usage:
//     pnpm seed:all
//
// Order matters because of foreign keys:
//   1. settings   (no deps)
//   2. services   (no deps)
//   3. case-studies (depends on services)
//   4. partners   (depends on services + case-studies)
//   5. pages      (no FK deps; can run any time)
//   6. redirects  (no deps; reads from public/.htaccess on disk)
import 'dotenv/config'
import { spawn } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const ORDER = [
  'settings.ts',
  'services.ts',
  'case-studies.ts',
  'partners.ts',
  'pages.ts',
  'redirects.ts',
]

async function runOne(file: string): Promise<void> {
  const full = path.join(__dirname, file)
  return new Promise((resolve, reject) => {
    console.log(`\n──────── Running ${file} ────────`)
    const child = spawn('tsx', [full], { stdio: 'inherit', shell: true })
    child.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`${file} exited ${code}`))))
  })
}

async function main() {
  for (const file of ORDER) {
    await runOne(file)
  }
  console.log('\n✓ All seeds complete.')
}

main().catch((err) => { console.error(err); process.exit(1) })
