'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { services, knowledgeHub, publishWithUs } from '@/lib/site'

type Drop = { label: string; href: string; items: { title: string; href: string }[] }

const dropdowns: Drop[] = [
  {
    label: 'Services',
    href: '/services/',
    items: [
      { title: 'All Services', href: '/services/' },
      ...services.map((s) => ({ title: s.title, href: `/services/${s.slug}/` })),
    ],
  },
  {
    label: 'Knowledge Hub',
    href: '/knowledge-hub/',
    items: [{ title: 'Overview', href: '/knowledge-hub/' }, ...knowledgeHub],
  },
  {
    label: 'Publish With Us',
    href: '/publish-with-us/',
    items: [{ title: 'Overview', href: '/publish-with-us/' }, ...publishWithUs],
  },
]

const flat = [
  { label: 'Free Tools', href: '/free-tools/' },
  { label: 'Directory', href: '/security-directory/' },
  { label: 'AI Visibility', href: '/ai-visibility-center/' },
  { label: 'About', href: '/about-us/' },
]

function ThemeToggle() {
  const [dark, setDark] = useState(false)
  useEffect(() => {
    setDark(document.documentElement.getAttribute('data-theme') === 'dark')
  }, [])
  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light')
    try { localStorage.setItem('sg-theme', next ? 'dark' : 'light') } catch {}
  }
  return (
    <button onClick={toggle} aria-label="Toggle theme" className="btn btn-outline" style={{ padding: '9px 12px', borderRadius: 10 }}>
      {dark ? '☀️' : '🌙'}
    </button>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const [acc, setAcc] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, height: 'var(--nav-h)',
        display: 'flex', alignItems: 'center',
        background: scrolled ? 'color-mix(in srgb, var(--bg) 78%, transparent)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px) saturate(160%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(14px) saturate(160%)' : 'none',
        borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
        transition: 'all 0.25s ease',
      }}
    >
      <div className="container flex items-center justify-between" style={{ gap: 20 }}>
        <Link href="/" className="flex items-center gap-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 19 }}>
          <span style={{ width: 30, height: 30, borderRadius: 9, background: 'linear-gradient(135deg, var(--blue), var(--violet))', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 16 }}>S</span>
          <span><span className="accent">Security</span>Blogs</span>
        </Link>

        {/* Desktop nav */}
        <nav className="sg-desktop-nav flex items-center" style={{ gap: 6 }}>
          {dropdowns.map((d) => (
            <div key={d.label} style={{ position: 'relative' }} onMouseEnter={() => setActive(d.label)} onMouseLeave={() => setActive(null)}>
              <Link href={d.href} style={{ padding: '8px 12px', fontWeight: 500, fontSize: 14.5, color: 'var(--text-soft)', display: 'inline-flex', gap: 5, alignItems: 'center' }}>
                {d.label} <span style={{ fontSize: 9, opacity: 0.6 }}>▼</span>
              </Link>
              {active === d.label && (
                <div className="glass" style={{ position: 'absolute', top: '100%', left: 0, marginTop: 6, padding: 8, minWidth: 230, borderRadius: 14, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {d.items.map((it) => (
                    <Link key={it.href} href={it.href} style={{ padding: '9px 12px', borderRadius: 9, fontSize: 14, color: 'var(--text-soft)' }} onMouseEnter={(e) => { (e.currentTarget.style.background = 'var(--bg-card-2)'); e.currentTarget.style.color = 'var(--blue)' }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-soft)' }}>
                      {it.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          {flat.map((f) => (
            <Link key={f.href} href={f.href} style={{ padding: '8px 12px', fontWeight: 500, fontSize: 14.5, color: 'var(--text-soft)' }}>{f.label}</Link>
          ))}
        </nav>

        <div className="sg-desktop-nav flex items-center gap-2">
          <ThemeToggle />
          <Link href="/contact/" className="btn btn-primary" style={{ padding: '11px 18px' }}>Free AI Audit</Link>
        </div>

        {/* Mobile toggle */}
        <button className="sg-mobile-btn" onClick={() => setOpen((o) => !o)} aria-label="Menu" style={{ display: 'none', background: 'none', border: '1px solid var(--line)', borderRadius: 10, padding: '8px 11px', fontSize: 18, color: 'var(--text)', cursor: 'pointer' }}>
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="glass" style={{ position: 'absolute', top: 'var(--nav-h)', left: 8, right: 8, padding: 14, borderRadius: 16, maxHeight: '80vh', overflowY: 'auto' }}>
          {dropdowns.map((d) => (
            <div key={d.label} className="acc-item">
              <div className="acc-q" onClick={() => setAcc(acc === d.label ? null : d.label)} style={{ padding: '14px 4px' }}>
                {d.label} <span>{acc === d.label ? '−' : '+'}</span>
              </div>
              {acc === d.label && (
                <div style={{ paddingBottom: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {d.items.map((it) => (
                    <Link key={it.href} href={it.href} onClick={() => setOpen(false)} style={{ padding: '8px 12px', fontSize: 14, color: 'var(--text-soft)' }}>{it.title}</Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          {flat.map((f) => (
            <Link key={f.href} href={f.href} onClick={() => setOpen(false)} className="acc-item" style={{ display: 'block', padding: '14px 4px', fontWeight: 600 }}>{f.label}</Link>
          ))}
          <div className="flex items-center gap-2" style={{ marginTop: 14 }}>
            <ThemeToggle />
            <Link href="/contact/" onClick={() => setOpen(false)} className="btn btn-primary" style={{ flex: 1 }}>Free AI Audit</Link>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 1100px) {
          .sg-desktop-nav { display: none !important; }
          .sg-mobile-btn { display: inline-flex !important; }
        }
      `}</style>
    </header>
  )
}
