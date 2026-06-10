// Admin session management — in-memory store (single-process VPS).
// Sessions survive restarts only if ADMIN_SESSION_SECRET is stable.
// Tokens are crypto.randomBytes(32) → 64-char hex strings.

import crypto from 'node:crypto'

const SESSION_TTL_MS = 24 * 60 * 60 * 1000  // 24 hours
export const SESSION_COOKIE = 'sb_admin_session'

const ADMIN_USERNAME = process.env.ADMIN_USERNAME ?? 'admin'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? ''

type Session = { username: string; expiresAt: number }
const sessions = new Map<string, Session>()

// Warn loudly if admin password is not configured
if (!ADMIN_PASSWORD) {
  console.warn(
    '\n⚠️  [admin] ADMIN_PASSWORD env var is not set.' +
    '\n   Set it in .env.local to secure the admin panel.' +
    '\n   Default fallback is disabled — login will fail until you set it.\n',
  )
}

export function adminLogin(username: string, password: string): string | null {
  if (!ADMIN_PASSWORD) return null   // refuse login if no password configured
  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) return null
  const token = crypto.randomBytes(32).toString('hex')
  sessions.set(token, { username, expiresAt: Date.now() + SESSION_TTL_MS })
  return token
}

export function validateSession(token: string | undefined): boolean {
  if (!token) return false
  const s = sessions.get(token)
  if (!s) return false
  if (Date.now() > s.expiresAt) { sessions.delete(token); return false }
  return true
}

export function getSessionUser(token: string | undefined): string | null {
  if (!token) return null
  const s = sessions.get(token)
  if (!s || Date.now() > s.expiresAt) return null
  return s.username
}

export function revokeSession(token: string) {
  sessions.delete(token)
}

// Prune expired sessions — call lazily, e.g. on every login attempt
export function pruneExpired() {
  const now = Date.now()
  for (const [k, v] of sessions) if (v.expiresAt < now) sessions.delete(k)
}
