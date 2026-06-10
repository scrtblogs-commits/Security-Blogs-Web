'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

const BLUE = '#1e5fe0'
const SIDEBAR_W = 240

type NavItem = { href: string; label: string; icon: string }
type NavSection = { title: string; items: NavItem[] }

const NAV_SECTIONS: NavSection[] = [
  {
    title: 'Overview',
    items: [
      { href: '/admin',        label: 'Dashboard',      icon: '📊' },
      { href: '/admin/leads',  label: 'Submissions',    icon: '📨' },
    ],
  },
  {
    title: 'Website Content',
    items: [
      { href: '/admin/site-settings',  label: 'Site Settings',   icon: '⚙️' },
      { href: '/admin/homepage',       label: 'Homepage',         icon: '🏠' },
      { href: '/admin/services',       label: 'Services',         icon: '🛠️' },
      { href: '/admin/faqs',           label: 'FAQs',             icon: '❓' },
      { href: '/admin/testimonials',   label: 'Testimonials',     icon: '⭐' },
      { href: '/admin/pricing',        label: 'Pricing',          icon: '💰' },
    ],
  },
  {
    title: 'Blog & Media',
    items: [
      { href: '/admin/blog', label: 'Blog Posts', icon: '📝' },
    ],
  },
]

export default function AdminSidebar({ user }: { user: string }) {
  const pathname   = usePathname()
  const router     = useRouter()
  const [loggingOut, setLoggingOut] = useState(false)

  async function logout() {
    setLoggingOut(true)
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  function isActive(href: string) {
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  return (
    <aside style={{
      width: SIDEBAR_W, minWidth: SIDEBAR_W, height: '100%',
      background: '#fff',
      borderRight: '1px solid #e8ecf2',
      display: 'flex', flexDirection: 'column',
      flexShrink: 0,
      overflowY: 'auto',
    }}>
      {/* Logo */}
      <div style={{ padding: '22px 20px 18px', borderBottom: '1px solid #f0f2f7', flexShrink: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-header.webp" alt="SecurityBlogs" style={{ height: 34, width: 'auto' }} />
        <div style={{ fontSize: 10, color: '#a0aec0', marginTop: 5, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Content Management
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '10px 10px', display: 'flex', flexDirection: 'column', gap: 0 }}>
        {NAV_SECTIONS.map(section => (
          <div key={section.title} style={{ marginBottom: 6 }}>
            <div style={{
              fontSize: 10, fontWeight: 700, color: '#b0b8cc', letterSpacing: '0.1em',
              textTransform: 'uppercase', padding: '10px 12px 4px',
            }}>
              {section.title}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {section.items.map(n => {
                const active = isActive(n.href)
                return (
                  <Link
                    key={n.href}
                    href={n.href}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 9,
                      padding: '8px 12px', borderRadius: 8, fontSize: 13.5, fontWeight: 500,
                      textDecoration: 'none',
                      color:      active ? BLUE    : '#374151',
                      background: active ? '#eff4ff' : 'transparent',
                      transition: 'background 0.12s, color 0.12s',
                    }}
                  >
                    <span style={{ fontSize: 15, lineHeight: 1 }}>{n.icon}</span>
                    {n.label}
                    {active && (
                      <span style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', background: BLUE, flexShrink: 0 }} />
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User + logout */}
      <div style={{ padding: '14px 16px', borderTop: '1px solid #f0f2f7', flexShrink: 0 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10,
          padding: '8px 10px', background: '#f8f9fb', borderRadius: 8,
        }}>
          <div style={{
            width: 30, height: 30, borderRadius: '50%', background: BLUE,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 12, fontWeight: 700, flexShrink: 0,
          }}>
            {user.charAt(0).toUpperCase()}
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#111827' }}>{user}</div>
            <div style={{ fontSize: 11, color: '#9ca3af' }}>Administrator</div>
          </div>
        </div>
        <button
          onClick={logout}
          disabled={loggingOut}
          style={{
            width: '100%', padding: '8px 12px', borderRadius: 8,
            background: loggingOut ? '#f3f4f6' : '#fef2f2',
            color: '#b91c1c', border: '1px solid #fecaca',
            fontSize: 12, fontWeight: 600, cursor: 'pointer',
          }}
        >
          {loggingOut ? 'Logging out…' : '↩ Sign Out'}
        </button>
      </div>
    </aside>
  )
}
