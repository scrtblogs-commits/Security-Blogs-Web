#!/usr/bin/env node
/**
 * Consolidate the 36 "SB · NN · Page" tables (+ TEMPLATE) into the single
 * "Website Pages" table, after writing a full JSON backup to the repo.
 *
 * SAFE: this script only READS the page tables, WRITES a backup file, and
 * CREATES rows in "Website Pages". It NEVER deletes anything — you delete the
 * old tables yourself in the Airtable UI after you've verified the merge.
 *
 * RUN:
 *   1. Get your Airtable Personal Access Token (the one with write access to
 *      base app4m6OOzymaqPKHX — same token n8n uses).
 *   2. In a terminal, from the repo folder:
 *        AIRTABLE_PAT=patXXXXXXXX node scripts/airtable-consolidate.mjs
 *      (PowerShell:  $env:AIRTABLE_PAT="patXXXX"; node scripts/airtable-consolidate.mjs )
 *   3. Check the printed counts, open Airtable, verify "Website Pages".
 *   4. Then delete the old SB·NN tables + SB·TEMPLATE in the Airtable UI.
 *
 * Requires Node 18+ (uses global fetch).
 */

import { writeFileSync } from 'node:fs'

const PAT = process.env.AIRTABLE_PAT
if (!PAT) {
  console.error('ERROR: set AIRTABLE_PAT env var to your Airtable write token.')
  process.exit(1)
}

const BASE = 'app4m6OOzymaqPKHX'
const TARGET = 'tblqXFPock0QXOYqJ' // "Website Pages"

// tableId -> Page label (36 page tables + the template)
const SOURCES = {
  tbl5zTGn7rIwPDTBj: 'Home',
  tblXQOmcpAiz4nAor: 'Services',
  tbljsrDvVpuqEsj01: 'Security SEO',
  tblwuHRF4fu6htbPA: 'AIO',
  tblAbsKcoEVEISWmb: 'AEO',
  tblVGfVm7iwYUlbpk: 'GEO',
  tblTeSKHuGuGcPRca: 'Google Ads',
  tblcuopoouTYVNLj6: 'Bing Ads',
  tbltKREZzUyku3ul4: 'Web Design',
  tblNuXN5EAtg6MYDF: 'Knowledge Hub',
  tblyknOLk5jJ2qYoy: 'Blog',
  tbl9rFtQeBcqruMRd: 'Definitions & Glossary',
  tbllC1NoMD8rLJ9DH: 'Industry News',
  tblbblMyvshv0MEUR: 'Research Reports',
  tbldeaGe9WDhOxKbX: 'Security Guides',
  tblAgcUCfgXsAycqL: 'Security Industry SEO (Pillar)',
  tblu0JlB15Cm1MUeV: 'Security Trends 2026',
  tblnwiwJmGKJOWWvE: 'Publish With Us',
  tblKLiMmdK7uZxM5l: 'Advertise',
  tbltGpiRhxMrVFzLt: 'Backlink Packages',
  tbleeGo5ymFII4pCi: 'Guest Posting',
  tblkIBXAthj7cElFd: 'Press Release',
  tblc6VC9BvRIRd3Da: 'Pricing & Guidelines',
  tblFaTQ1FRmLwQM4O: 'Product Promotion',
  tblRDV6eT60upyIv9: 'Sponsored Posts',
  tblrwHhHtNS0ENFDV: 'About Us',
  tblzU4G9NdNWZe8cp: 'Contact',
  tblYmmZ4SlW0j7vrr: 'Case Studies',
  tblVFB4tKmhnLEEZn: 'Security Directory',
  tblE4NzX6UKHCetei: 'AI Visibility Center',
  tblf9i1XJ2fEpwHEA: 'Free Tools',
  tblZ2kyjS0jEsLq0Y: 'Career',
  tblCaJR4b2Z985eig: 'Book Strategy Call',
  tblSulw9Fm3RRdcO3: 'Privacy Policy',
  tblScb7owqi7nZDeu: 'Terms of Service',
  tblidMgTChVPqH4zh: 'Content Guidelines',
  tblrFo1eYWzCgUgcy: '_TEMPLATE',
}

// Fields that exist on the target "Website Pages" table (besides Page).
const TARGET_FIELDS = new Set([
  'Section',
  'Order',
  'Type',
  'Frontend - Content / Copy',
  'Frontend - UI / Behaviour',
  'Backend - Data / Logic / APIs',
  'Build notes',
  'Status',
])

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const headers = { Authorization: `Bearer ${PAT}`, 'Content-Type': 'application/json' }

async function readAll(tableId) {
  const out = []
  let offset
  do {
    const url = new URL(`https://api.airtable.com/v0/${BASE}/${tableId}`)
    url.searchParams.set('pageSize', '100')
    if (offset) url.searchParams.set('offset', offset)
    const res = await fetch(url, { headers })
    if (!res.ok) throw new Error(`read ${tableId}: ${res.status} ${await res.text()}`)
    const data = await res.json()
    out.push(...data.records)
    offset = data.offset
    await sleep(220)
  } while (offset)
  return out
}

async function targetCount() {
  const url = new URL(`https://api.airtable.com/v0/${BASE}/${TARGET}`)
  url.searchParams.set('pageSize', '1')
  const res = await fetch(url, { headers })
  const data = await res.json()
  return data.records?.length ?? 0
}

// Map a source record's fields onto the target schema (handles em-dash vs hyphen).
function mapFields(pageLabel, fields) {
  const out = { Page: pageLabel }
  for (const [k, v] of Object.entries(fields)) {
    if (v === null || v === undefined || v === '') continue
    const nk = k.replace(/—/g, '-') // em-dash -> hyphen
    if (TARGET_FIELDS.has(nk)) out[nk] = v
  }
  return out
}

async function createBatch(records) {
  const res = await fetch(`https://api.airtable.com/v0/${BASE}/${TARGET}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ records: records.map((fields) => ({ fields })), typecast: true }),
  })
  if (!res.ok) throw new Error(`create: ${res.status} ${await res.text()}`)
  await sleep(220)
}

async function main() {
  const existing = await targetCount()
  if (existing > 0) {
    console.error('ABORT: "Website Pages" already has rows. Empty it first, or this would duplicate. Exiting.')
    process.exit(1)
  }

  const backup = {}
  const toCreate = []
  let totalRead = 0

  for (const [tableId, label] of Object.entries(SOURCES)) {
    const recs = await readAll(tableId)
    backup[label] = { tableId, records: recs }
    totalRead += recs.length
    for (const r of recs) toCreate.push(mapFields(label, r.fields))
    console.log(`read  ${label.padEnd(34)} ${recs.length} rows`)
  }

  const stamp = new Date().toISOString().slice(0, 10)
  const file = `airtable-page-tables-backup-${stamp}.json`
  writeFileSync(file, JSON.stringify(backup, null, 2))
  console.log(`\nBackup written: ${file} (${totalRead} rows from ${Object.keys(SOURCES).length} tables)\n`)

  let created = 0
  for (let i = 0; i < toCreate.length; i += 10) {
    await createBatch(toCreate.slice(i, i + 10))
    created += Math.min(10, toCreate.length - i)
    process.stdout.write(`\rcreated ${created}/${toCreate.length} rows in "Website Pages"`)
  }
  console.log('\n\nDONE. Verify "Website Pages" in Airtable, then delete the old SB·NN tables + SB·TEMPLATE in the UI.')
}

main().catch((e) => { console.error('\nFAILED:', e.message); process.exit(1) })
