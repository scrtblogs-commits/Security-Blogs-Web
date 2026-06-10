// File-based lead storage — persists to /data/leads.json.
// Runs only in Node.js (server components + API routes, never client bundle).
// Uses a promise-based write lock so concurrent POSTs don't corrupt the file.

import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'

const DATA_DIR   = path.join(process.cwd(), 'data')
const LEADS_FILE = path.join(DATA_DIR, 'leads.json')

export type LeadStatus = 'new' | 'contacted' | 'closed'

export type Lead = {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  service?: string
  message?: string
  source: string
  status: LeadStatus
  notes?: string
  ip?: string
  userAgent?: string
  createdAt: string
  updatedAt: string
}

// ── Write lock (single-process VPS) ───────────────────────────────────────
let _writing = false
const _queue: Array<() => void> = []
function acquireLock(): Promise<void> {
  return new Promise(resolve => {
    if (!_writing) { _writing = true; resolve() }
    else _queue.push(resolve)
  })
}
function releaseLock() {
  const next = _queue.shift()
  if (next) next()
  else _writing = false
}

// ── I/O helpers ───────────────────────────────────────────────────────────
function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
}

function readAll(): Lead[] {
  ensureDir()
  if (!fs.existsSync(LEADS_FILE)) return []
  try { return JSON.parse(fs.readFileSync(LEADS_FILE, 'utf-8')) as Lead[] }
  catch { return [] }
}

function writeAll(leads: Lead[]) {
  ensureDir()
  // Write to a tmp file then rename for atomicity
  const tmp = LEADS_FILE + '.tmp'
  fs.writeFileSync(tmp, JSON.stringify(leads, null, 2), 'utf-8')
  fs.renameSync(tmp, LEADS_FILE)
}

// ── Public API ─────────────────────────────────────────────────────────────

export async function createLead(
  input: Omit<Lead, 'id' | 'status' | 'createdAt' | 'updatedAt'>,
): Promise<Lead> {
  await acquireLock()
  try {
    const leads = readAll()
    const now   = new Date().toISOString()
    const lead: Lead = { ...input, id: crypto.randomUUID(), status: 'new', createdAt: now, updatedAt: now }
    leads.unshift(lead)
    writeAll(leads)
    return lead
  } finally { releaseLock() }
}

export type LeadsQuery = {
  status?:  LeadStatus
  service?: string
  search?:  string
  page?:    number
  limit?:   number
}

export type LeadsResult = {
  leads: Lead[]
  total: number
  page:  number
  pages: number
  stats: { total: number; new: number; contacted: number; closed: number }
}

export function queryLeads(opts: LeadsQuery = {}): LeadsResult {
  let all = readAll()

  const stats = {
    total:     all.length,
    new:       all.filter(l => l.status === 'new').length,
    contacted: all.filter(l => l.status === 'contacted').length,
    closed:    all.filter(l => l.status === 'closed').length,
  }

  if (opts.status)  all = all.filter(l => l.status === opts.status)
  if (opts.service) all = all.filter(l => l.service === opts.service)
  if (opts.search) {
    const q = opts.search.toLowerCase()
    all = all.filter(l =>
      l.name.toLowerCase().includes(q)         ||
      l.email.toLowerCase().includes(q)        ||
      (l.company  ?? '').toLowerCase().includes(q) ||
      (l.message  ?? '').toLowerCase().includes(q) ||
      (l.phone    ?? '').toLowerCase().includes(q),
    )
  }

  const total  = all.length
  const limit  = opts.limit ?? 30
  const page   = Math.max(1, opts.page ?? 1)
  const pages  = Math.max(1, Math.ceil(total / limit))
  const leads  = all.slice((page - 1) * limit, page * limit)

  return { leads, total, page, pages, stats }
}

export function getLead(id: string): Lead | null {
  return readAll().find(l => l.id === id) ?? null
}

export async function updateLead(
  id: string,
  patch: Partial<Pick<Lead, 'status' | 'notes'>>,
): Promise<Lead | null> {
  await acquireLock()
  try {
    const leads = readAll()
    const idx   = leads.findIndex(l => l.id === id)
    if (idx === -1) return null
    leads[idx] = { ...leads[idx], ...patch, updatedAt: new Date().toISOString() }
    writeAll(leads)
    return leads[idx]
  } finally { releaseLock() }
}

export async function deleteLead(id: string): Promise<boolean> {
  await acquireLock()
  try {
    const leads   = readAll()
    const filtered = leads.filter(l => l.id !== id)
    if (filtered.length === leads.length) return false
    writeAll(filtered)
    return true
  } finally { releaseLock() }
}

export function getAllServices(): string[] {
  const all = readAll()
  const set = new Set(all.map(l => l.service).filter(Boolean) as string[])
  return Array.from(set).sort()
}
