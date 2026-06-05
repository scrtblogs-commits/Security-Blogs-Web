// Seed Redirects from the current public/.htaccess file.
// Parses every `RedirectMatch 301 "<from>" "<to>"` line and inserts it.
// Idempotent: upserts by fromPath.
//
// This means redirects can be managed from the admin going forward, while
// the .htaccess file stays in place as a fallback during the Phase D
// cut-over period.
import 'dotenv/config'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { getPayload } from 'payload'
import config from '../../payload.config'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const HTACCESS_PATH = path.resolve(__dirname, '..', '..', '..', 'public', '.htaccess')

function parseHtaccess(text: string): Array<{ fromPath: string; toPath: string; statusCode: '301' | '302'; isRegex: boolean }> {
  // Matches:  RedirectMatch 301 "^/aio/?$"    "/services/aio/"
  const re = /RedirectMatch\s+(301|302)\s+"([^"]+)"\s+"([^"]+)"/g
  const out: Array<{ fromPath: string; toPath: string; statusCode: '301' | '302'; isRegex: boolean }> = []
  let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) {
    const status = m[1] as '301' | '302'
    const from = m[2]
    const to = m[3]
    // Heuristic: if the source contains regex metachars, mark as regex.
    const isRegex = /[\^\$\(\)\[\]\|\\\?\*\+]|\\./.test(from)
    out.push({ fromPath: from, toPath: to, statusCode: status, isRegex })
  }
  return out
}

async function main() {
  const payload = await getPayload({ config })

  let raw = ''
  try {
    raw = readFileSync(HTACCESS_PATH, 'utf8')
  } catch (err) {
    console.error(`Could not read .htaccess at ${HTACCESS_PATH}`)
    process.exit(1)
  }

  const rules = parseHtaccess(raw)
  console.log(`Parsed ${rules.length} RedirectMatch rules from .htaccess`)

  let created = 0
  let updated = 0
  for (const r of rules) {
    const existing = await payload.find({
      collection: 'redirects',
      where: { fromPath: { equals: r.fromPath } },
      limit: 1,
    })

    const data = {
      fromPath: r.fromPath,
      toPath: r.toPath,
      statusCode: r.statusCode,
      isRegex: r.isRegex,
      isActive: true,
      note: 'Imported from public/.htaccess',
    }

    if (existing.totalDocs > 0) {
      await payload.update({ collection: 'redirects', id: existing.docs[0].id, data, overrideAccess: true })
      updated += 1
    } else {
      await payload.create({ collection: 'redirects', data, overrideAccess: true })
      created += 1
    }
  }
  console.log(`✓ Redirects: ${created} created, ${updated} updated.`)
  process.exit(0)
}

main().catch((err) => { console.error(err); process.exit(1) })
