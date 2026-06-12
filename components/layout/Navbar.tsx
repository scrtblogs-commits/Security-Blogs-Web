'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { services, knowledgeHub, publishWithUs } from '@/lib/site'

type Drop = { label: string; href: string; items: { title: string; href: string }[] }

const dropdowns: Drop[] = [
  {
    label: 'Services',
    href: '/services/',
    items: [
      ...services.map((s) => ({ title: s.title, href: `/services/${s.slug}/` })),
      { title: 'Security Guides', href: '/knowledge-hub/security-guides/' },
    ],
  },
  {
    label: 'Knowledge Hub',
    href: '/knowledge-hub/',
    items: knowledgeHub,
  },
  {
    label: 'Publish With Us',
    href: '/publish-with-us/',
    items: publishWithUs,
  },
  {
    label: 'Free Tools',
    href: '/free-tools/',
    items: [
      { title: 'Directory',     href: '/security-directory/' },
      { title: 'AI Visibility', href: '/ai-visibility-center/' },
    ],
  },
]

const flatLinks = [
  { label: 'Pricing', href: '/pricing/' },
  { label: 'About',   href: '/about-us/' },
]

// Delay (ms) before closing on mouse-leave — prevents closing when crossing
// the small gap between the trigger button and the dropdown panel.
const LEAVE_DELAY = 120

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open,     setOpen]     = useState(false)        // mobile menu
  const [active,   setActive]   = useState<string | null>(null)  // desktop open dropdown
  const [acc,      setAcc]      = useState<string | null>(null)  // mobile accordion

  // Ref to track the pending close timer so we can cancel it on re-enter
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close desktop dropdown on outside click
  useEffect(() => {
    if (!active) return
    const handler = (e: MouseEvent) => {
      const nav = document.getElementById('sg-desktop-nav')
      if (nav && !nav.contains(e.target as Node)) setActive(null)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [active])

  // Close mobile menu on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      const menu  = document.getElementById('sg-mobile-menu')
      const burger = document.getElementById('sg-burger')
      if (
        menu   && !menu.contains(e.target as Node) &&
        burger && !burger.contains(e.target as Node)
      ) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const openDropdown  = (label: string) => {
    if (leaveTimer.current) { clearTimeout(leaveTimer.current); leaveTimer.current = null }
    setActive(label)
  }
  const scheduleClose = () => {
    leaveTimer.current = setTimeout(() => setActive(null), LEAVE_DELAY)
  }
  const cancelClose   = () => {
    if (leaveTimer.current) { clearTimeout(leaveTimer.current); leaveTimer.current = null }
  }
  const toggleDropdown = (label: string) => {
    cancelClose()
    setActive((prev) => (prev === label ? null : label))
  }

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, height: 'var(--nav-h)',
      display: 'flex', alignItems: 'center',
      background: 'rgba(255,255,255,0.96)',
      backdropFilter: 'blur(16px) saturate(180%)',
      WebkitBackdropFilter: 'blur(16px) saturate(180%)',
      borderBottom: '1px solid rgba(18,42,86,0.09)',
      boxShadow: scrolled ? '0 4px 24px -8px rgba(18,42,86,0.10)' : '0 1px 0 rgba(18,42,86,0.06)',
      transition: 'box-shadow 0.25s ease',
    }}>
      <div className="container flex items-center justify-between" style={{ gap: 20 }}>

        {/* Logo */}
        <Link href="/" aria-label="SecurityBlogs home" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-header.webp" alt="SecurityBlogs" className="sg-logo-img" style={{ height: 52, width: 'auto', display: 'block' }} />
        </Link>

        {/* Desktop nav */}
        <nav id="sg-desktop-nav" className="sg-desktop-nav flex items-center" style={{ gap: 2 }}>
          {dropdowns.map((d) => {
            const isOpen = active === d.label
            return (
              <div
                key={d.label}
                style={{ position: 'relative' }}
                onMouseEnter={() => openDropdown(d.label)}
                onMouseLeave={scheduleClose}
              >
                {/* Trigger button — click toggles, arrow rotates */}
                <button
                  onClick={() => toggleDropdown(d.label)}
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  style={{
                    padding: '8px 10px', fontWeight: 500, fontSize: 14,
                    color: isOpen ? 'var(--blue)' : 'var(--text)',
                    display: 'inline-flex', gap: 5, alignItems: 'center',
                    whiteSpace: 'nowrap', background: 'none', border: 'none',
                    cursor: 'pointer', fontFamily: 'inherit',
                    transition: 'color 0.15s ease',
                  }}
                >
                  {d.label}
                  <span style={{
                    fontSize: 9,
                    opacity: isOpen ? 0.9 : 0.6,
                    display: 'inline-block',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease, opacity 0.15s ease',
                  }}>▼</span>
                </button>

                {/* Dropdown panel */}
                {isOpen && (
                  <div
                    className="glass"
                    onMouseEnter={cancelClose}
                    onMouseLeave={scheduleClose}
                    style={{
                      position: 'absolute', top: '100%', left: 0,
                      marginTop: 6, padding: 8,
                      minWidth: 210, borderRadius: 14,
                      display: 'flex', flexDirection: 'column', gap: 2,
                      // Small invisible bridge above the panel so the cursor
                      // doesn't cross "empty space" between trigger and panel
                      paddingTop: 10,
                    }}
                  >
                    {/* Invisible bridge: covers the 6px marginTop gap */}
                    <span style={{
                      position: 'absolute', top: -6, left: 0, right: 0, height: 10,
                      background: 'transparent',
                    }} />
                    {d.items.map((it) => (
                      <Link
                        key={it.href}
                        href={it.href}
                        onClick={() => setActive(null)}
                        style={{
                          padding: '9px 12px', borderRadius: 9, fontSize: 14,
                          color: 'var(--text)', whiteSpace: 'nowrap', textDecoration: 'none',
                          display: 'block',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'var(--bg-card-2)'
                          e.currentTarget.style.color = 'var(--blue)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent'
                          e.currentTarget.style.color = 'var(--text)'
                        }}
                      >
                        {it.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          })}

          {flatLinks.map((f) => (
            <Link
              key={f.href} href={f.href}
              style={{ padding: '8px 10px', fontWeight: 500, fontSize: 14, color: 'var(--text)', whiteSpace: 'nowrap', textDecoration: 'none' }}
            >
              {f.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="sg-desktop-nav flex items-center">
          <Link href="/contact/" className="btn btn-primary" style={{ padding: '11px 18px' }}>
            Contact Us
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          id="sg-burger"
          className="sg-mobile-btn"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
          style={{ display: 'none', background: 'none', border: '1px solid var(--line)', borderRadius: 10, padding: '8px 11px', fontSize: 18, color: 'var(--text)', cursor: 'pointer' }}
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div id="sg-mobile-menu" className="glass" style={{ position: 'absolute', top: 'var(--nav-h)', left: 8, right: 8, padding: 14, borderRadius: 16, maxHeight: '80vh', overflowY: 'auto' }}>
          {dropdowns.map((d) => (
            <div key={d.label} className="acc-item">
              <div
                className="acc-q"
                onClick={() => setAcc(acc === d.label ? null : d.label)}
                style={{ padding: '14px 4px' }}
              >
                {d.label}
                <span style={{
                  display: 'inline-block',
                  transform: acc === d.label ? 'rotate(45deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease',
                }}>+</span>
              </div>
              {acc === d.label && (
                <div style={{ paddingBottom: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {d.items.map((it) => (
                    <Link
                      key={it.href} href={it.href}
                      onClick={() => setOpen(false)}
                      style={{ padding: '8px 12px', fontSize: 14, color: 'var(--text)', textDecoration: 'none' }}
                    >
                      {it.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          {flatLinks.map((f) => (
            <Link
              key={f.href} href={f.href}
              onClick={() => setOpen(false)}
              className="acc-item"
              style={{ display: 'block', padding: '14px 4px', fontWeight: 600, textDecoration: 'none' }}
            >
              {f.label}
            </Link>
          ))}
          <div style={{ marginTop: 14 }}>
            <Link href="/contact/" onClick={() => setOpen(false)} className="btn btn-primary" style={{ display: 'block', textAlign: 'center' }}>
              Contact Us
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 1100px) {
          .sg-desktop-nav { display: none !important; }
          .sg-mobile-btn  { display: inline-flex !important; }
        }
      `}</style>
    </header>
  )
}
