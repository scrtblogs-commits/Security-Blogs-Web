// Admin layout — renders a full-viewport overlay that covers the main site
// Navbar/Footer so the admin panel feels like its own separate app.
// Auth is checked per-page via requireAdminAuth() so the login page
// (which does NOT call requireAdminAuth) renders freely without the shell.

import { cookies } from 'next/headers'
import { validateSession, getSessionUser, SESSION_COOKIE } from '@/lib/admin-session'
import AdminSidebar from './AdminSidebar'

export const metadata = {
  title: 'Admin — SecurityBlogs',
  robots: { index: false, follow: false },
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const jar   = await cookies()
  const token = jar.get(SESSION_COOKIE)?.value
  const isAuth = validateSession(token)
  const user   = getSessionUser(token) ?? 'admin'

  return (
    // Fixed full-viewport overlay sits above the main site (z-index > navbar's 100)
    <div style={{
      position: 'fixed', inset: 0, zIndex: 300,
      background: '#f4f6f9',
      display: 'flex', overflow: 'hidden',
      fontFamily: 'var(--font-sans, system-ui, sans-serif)',
    }}>
      {/* Show sidebar only when authenticated */}
      {isAuth && <AdminSidebar user={user} />}

      {/* Page content */}
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  )
}
