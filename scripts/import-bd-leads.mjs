#!/usr/bin/env node
/**
 * Import ZoomInfo lead CSVs into the Airtable "BD Prospects" table,
 * mapped onto OUR schema (not ZoomInfo's columns).
 *
 * SAFE: reads CSVs + creates Airtable rows only. Never sends email, never
 * deletes. Dedupes by email and skips contacts already in BD Prospects, so
 * it's safe to re-run and it won't touch your existing rows.
 *
 * RUN (PowerShell, from the repo folder):
 *   $env:AIRTABLE_PAT="patXXXX"; node scripts/import-bd-leads.mjs
 *
 * Optional: pass a folder as arg1 (defaults to the path below).
 * Requires Node 18+.
 */

import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const PAT = process.env.AIRTABLE_PAT
if (!PAT) { console.error('ERROR: set AIRTABLE_PAT env var.'); process.exit(1) }

const BASE = 'app4m6OOzymaqPKHX'
const TABLE = 'tble3tB5t6MBJO3Xc' // BD Prospects
const LEADS_DIR = process.argv[2] || 'C:/Users/Voltron1/Downloads/Leads'

const headers = { Authorization: `Bearer ${PAT}`, 'Content-Type': 'application/json' }
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// --- minimal RFC-4180 CSV parser (handles quotes, commas, newlines) ---
function parseCSV(text) {
  const rows = []
  let row = [], field = '', inQ = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (inQ) {
      if (c === '"') { if (text[i + 1] === '"') { field += '"'; i++ } else inQ = false }
      else field += c
    } else if (c === '"') inQ = true
    else if (c === ',') { row.push(field); field = '' }
    else if (c === '\n') { row.push(field); rows.push(row); row = []; field = '' }
    else if (c === '\r') { /* skip */ }
    else field += c
  }
  if (field.length || row.length) { row.push(field); rows.push(row) }
  return rows
}

function get(obj, ...names) {
  for (const n of names) if (obj[n] != null && obj[n] !== '') return obj[n]
  return ''
}
function withScheme(url) {
  if (!url) return ''
  return /^https?:\/\//i.test(url) ? url : 'https://' + url
}

async function existingEmails() {
  const seen = new Set()
  let offset
  do {
    const u = new URL(`https://api.airtable.com/v0/${BASE}/${TABLE}`)
    u.searchParams.set('pageSize', '100')
    u.searchParams.set('fields[]', 'Email')
    if (offset) u.searchParams.set('offset', offset)
    const res = await fetch(u, { headers })
    if (!res.ok) throw new Error(`read existing: ${res.status} ${await res.text()}`)
    const d = await res.json()
    for (const r of d.records) { const e = r.fields.Email; if (e) seen.add(String(e).toLowerCase()) }
    offset = d.offset
    await sleep(220)
  } while (offset)
  return seen
}

async function createBatch(records) {
  const res = await fetch(`https://api.airtable.com/v0/${BASE}/${TABLE}`, {
    method: 'POST', headers,
    body: JSON.stringify({ records: records.map((fields) => ({ fields })), typecast: true }),
  })
  if (!res.ok) throw new Error(`create: ${res.status} ${await res.text()}`)
  await sleep(220)
}

async function main() {
  const files = readdirSync(LEADS_DIR).filter((f) => f.toLowerCase().endsWith('.csv'))
  if (!files.length) { console.error('No CSVs found in ' + LEADS_DIR); process.exit(1) }

  const seen = await existingEmails()
  const today = new Date().toISOString().slice(0, 10)
  const toCreate = []
  let totalRows = 0, noEmail = 0, dupes = 0

  for (const f of files) {
    const rows = parseCSV(readFileSync(join(LEADS_DIR, f), 'utf8'))
    if (rows.length < 2) continue
    const head = rows[0]
    for (let r = 1; r < rows.length; r++) {
      const arr = rows[r]
      if (!arr.length || arr.every((x) => !x)) continue
      const o = {}
      head.forEach((h, i) => { o[h] = (arr[i] ?? '').trim() })
      totalRows++
      const email = get(o, 'Email Address').toLowerCase()
      if (!email) { noEmail++; continue }
      if (seen.has(email)) { dupes++; continue }
      seen.add(email)
      const name = `${get(o, 'First Name')} ${get(o, 'Last Name')}`.trim()
      const loc = get(o, 'Full Address') ||
        [get(o, 'Company City', 'Person City'), get(o, 'Company State', 'Person State'), get(o, 'Company Country', 'Country')].filter(Boolean).join(', ')
      toCreate.push({
        Company: get(o, 'Company Name'),
        Website: withScheme(get(o, 'Website')),
        'Contact Name': name,
        Role: get(o, 'Job Title'),
        Email: get(o, 'Email Address'),
        Phone: get(o, 'Direct Phone Number', 'Mobile phone', 'Company HQ Phone'),
        Segment: 'Other',
        Location: loc,
        Source: 'ZoomInfo',
        Status: 'New',
        Notes: `Industry: ${get(o, 'Primary Industry')}; Employees: ${get(o, 'Employees')}; LinkedIn: ${get(o, 'LinkedIn Contact Profile URL')}; Src file: ${f}`,
        'Last Updated': today,
      })
    }
  }

  console.log(`Files: ${files.length} | rows scanned: ${totalRows} | new to import: ${toCreate.length} | skipped (no email): ${noEmail} | skipped (already in table/dupe): ${dupes}\n`)

  let created = 0
  for (let i = 0; i < toCreate.length; i += 10) {
    await createBatch(toCreate.slice(i, i + 10))
    created += Math.min(10, toCreate.length - i)
    process.stdout.write(`\rcreated ${created}/${toCreate.length} rows`)
  }
  console.log('\n\nDONE. Open BD Prospects in Airtable — new rows are Status = New, ready for me to audit + draft in batches.')
}

main().catch((e) => { console.error('\nFAILED:', e.message); process.exit(1) })
