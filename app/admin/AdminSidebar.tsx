'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

const NAV = [
  { href: '/admin',        label: 'Dashboard',    icon: '📊' },
  { href: '/admin/leads',  label: 'Submissions',  icon: '📨' },
]

const BLUE = '#1e5fe0'
const SIDEBAR_W = 220

export default function AdminSidebar({ user }: { user: string }) {
  const pathname = usePathname()
  const router   = useRouter()
  const [loggingOut, setLoggingOut] = useState(false)

  async function logout() {
    setLoggingOut(true)
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <aside style={{
      width: SIDEBAR_W, minWidth: SIDEBAR_W, height: '100%',
      background: '#fff',
      borderRight: '1px solid #e8ecf2',
      display: 'flex', flexDirection: 'column',
      padding: '0',
      flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: '22px 20px 16px', borderBottom: '1px solid #e8ecf2' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-header.webp" alt="SecurityBlogs" style={{ height: 36, width: 'auto' }} />
        <div style={{ fontSize: 11, color: '#6b7280', marginTop: 4, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Admin Panel</div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {NAV.map(n => {
          const active = n.href === '/admin' ? pathname === '/admin' : pathname.startsWith(n.href)
          return (
            <Link
              key={n.href}
              href={n.href}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 12px', borderRadius: 8, fontSize: 14, fontWeight: 500,
                textDecoration: 'none',
                color:      active ? BLUE    : '#374151',
                background: active ? '#eff4ff' : 'transparent',
                transition: 'background 0.15s, color 0.15s',
              }}
            >
              <span style={{ fontSize: 16 }}>{n.icon}</span>
              {n.label}
            </Link>
          )
        })}
      </nav>

      {/* User + logout */}
      <div style={{ padding: '14px 16px', borderTop: '1px solid #e8ecf2' }}>
        <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 8 }}>
          Signed in as <strong style={{ color: '#111827' }}>{user}</strong>
        </div>
        <button
          onClick={logout}
          disabled={loggingOut}
          style={{
            width: '100%', padding: '8px 12px', borderRadius: 8,
            background: loggingOut ? '#f3f4f6' : '#fef2f2',
            color: '#b91c1c', border: '1px solid #fecaca',
            fontSize: 13, fontWeight: 600, cursor: 'pointer',
          }}
        >
          {loggingOut ? 'Logging out…' : '↩ Log Out'}
        </button>
      </div>
    </aside>
  )
}
