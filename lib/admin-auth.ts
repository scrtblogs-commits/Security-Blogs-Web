// Server-side auth helper for admin pages.
// Call at the top of any protected server component or API route.

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { validateSession, getSessionUser, SESSION_COOKIE } from './admin-session'

export async function requireAdminAuth(): Promise<string> {
  const jar   = await cookies()
  const token = jar.get(SESSION_COOKIE)?.value
  if (!validateSession(token)) redirect('/admin/login')
  return getSessionUser(token) ?? 'admin'
}

export async function getAdminToken(): Promise<string | undefined> {
  const jar = await cookies()
  return jar.get(SESSION_COOKIE)?.value
}
