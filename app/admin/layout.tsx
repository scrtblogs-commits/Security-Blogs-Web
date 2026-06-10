// Admin layout — full-viewport overlay above the main site.

import { cookies } from 'next/headers'
import { validateSession, getSessionUser, SESSION_COOKIE } from '@/lib/admin-session'
import AdminSidebar from './AdminSidebar'

export const metadata = {
  title: 'Admin — SecurityBlogs',
  robots: { index: false, follow: false },
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const jar    = await cookies()
  const token  = jar.get(SESSION_COOKIE)?.value
  const isAuth = validateSession(token)
  const user   = getSessionUser(token) ?? 'admin'

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 300,
      background: '#f0f2f7',
      display: 'flex', overflow: 'hidden',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif',
    }}>
      {isAuth && <AdminSidebar user={user} />}
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  )
}
