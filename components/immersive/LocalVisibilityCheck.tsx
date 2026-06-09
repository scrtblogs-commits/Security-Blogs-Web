'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { GMAPS_KEY } from '@/lib/env'

type Loc = {
  city: string; region: string; country: string
  countryCode: string; source: 'ip' | 'precise' | 'fallback'
}

const FALLBACK: Loc = { city: 'Sydney', region: 'New South Wales', country: 'Australia', countryCode: 'AU', source: 'fallback' }

// Location pins spread across continents for the dot-world decorative map
const PINS = [
  { cx: '20%', cy: '38%' }, { cx: '25%', cy: '55%' },
  { cx: '46%', cy: '25%' }, { cx: '48%', cy: '38%' },
  { cx: '52%', cy: '48%' }, { cx: '62%', cy: '32%' },
  { cx: '72%', cy: '42%' }, { cx: '79%', cy: '65%' },
]

export default function LocalVisibilityCheck({ service: defaultService = 'security companies' }: { service?: string }) {
  const [loc, setLoc]             = useState<Loc | null>(null)
  const [searchInput, setInput]   = useState('')
  const [activeQuery, setQuery]   = useState('')
  const sectionRef                = useRef<HTMLElement>(null)
  const inView                    = useInView(sectionRef, { once: true, margin: '0px 0px -10% 0px' })

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const r = await fetch('https://ipapi.co/json/')
        if (!r.ok) throw new Error()
        const d = await r.json()
        if (cancelled || !d?.city) throw new Error()
        setLoc({ city: d.city, region: d.region || '', country: d.country_name || '', countryCode: d.country_code || 'AU', source: 'ip' })
      } catch {
        try {
          const r = await fetch('https://ipwho.is/')
          const d = await r.json()
          if (!cancelled && d?.success && d?.city)
            setLoc({ city: d.city, region: d.region || '', country: d.country || '', countryCode: d.country_code || 'AU', source: 'ip' })
          else if (!cancelled) setLoc(FALLBACK)
        } catch { if (!cancelled) setLoc(FALLBACK) }
      }
    })()
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    if (loc && !activeQuery)
      setQuery(`${defaultService} in ${[loc.city, loc.region].filter(Boolean).join(' ')}`.trim())
  }, [loc, activeQuery, defaultService])

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const typed = searchInput.trim()
    if (typed) setQuery(typed)
    else if (loc) setQuery(`${defaultService} in ${[loc.city, loc.region].filter(Boolean).join(' ')}`.trim())
  }

  const where = loc ?? FALLBACK

  const embedUrl = useMemo(() => {
    if (!GMAPS_KEY || !activeQuery) return ''
    return `https://www.google.com/maps/embed/v1/search?key=${GMAPS_KEY}&q=${encodeURIComponent(activeQuery)}&zoom=12`
  }, [activeQuery])

  return (
    <section ref={sectionRef} style={{ background: '#f6f6f6', padding: '72px 24px 80px', position: 'relative' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          style={{ textAlign: 'center', marginBottom: 28 }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            border: '1px solid rgba(30,95,224,0.3)', borderRadius: 999,
            padding: '5px 14px', marginBottom: 18,
            fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '0.1em',
            color: 'var(--blue)', background: 'rgba(30,95,224,0.05)',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--blue)', display: 'inline-block' }} />
            LIVE · YOUR LOCAL MARKET
          </div>
          <h2 style={{ fontSize: 'clamp(26px,4vw,42px)', fontWeight: 700, lineHeight: 1.1, margin: '0 0 14px', color: 'var(--text)' }}>
            Who shows up when locals search?
          </h2>
          <p style={{ fontSize: 15, color: 'var(--text-soft)', maxWidth: 560, margin: '0 auto', lineHeight: 1.6 }}>
            We detected you&apos;re in{' '}
            <strong style={{ color: 'var(--text)' }}>{where.city}{where.region ? `, ${where.region}` : ''}</strong>.
            {' '}Type a business name or service below — Google Maps shows the live results below it.
          </p>
        </motion.div>

        {/* ── Search bar ── */}
        <motion.form
          initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.08 }}
          onSubmit={submitSearch}
          style={{
            display: 'flex', alignItems: 'center', gap: 0,
            maxWidth: 520, margin: '0 auto 32px',
            background: '#fff',
            border: '1.5px solid rgba(30,95,224,0.18)',
            borderRadius: 12, overflow: 'hidden',
            boxShadow: '0 4px 20px -8px rgba(30,95,224,0.12)',
          }}
        >
          <span style={{ padding: '0 10px 0 14px', color: '#aab', fontSize: 14 }}>🔍</span>
          <input
            value={searchInput}
            onChange={e => setInput(e.target.value)}
            placeholder={`CCTV installer ${where.city} or your business name`}
            style={{ flex: 1, padding: '13px 8px', border: 0, background: 'transparent', fontSize: 14, color: 'var(--text)', outline: 'none' }}
          />
          {searchInput && (
            <button type="button" onClick={() => setInput('')}
              style={{ padding: '0 14px', background: 'transparent', border: 0, color: 'var(--blue)', fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font-mono)' }}>
              Cancel
            </button>
          )}
        </motion.form>

        {/* ── World dot map + Google Map ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.12 }}
          style={{
            borderRadius: 20, overflow: 'hidden',
            border: '1.5px solid rgba(30,95,224,0.12)',
            boxShadow: '0 12px 48px -16px rgba(30,95,224,0.14)',
            background: '#e8eef8',
            marginBottom: 24,
            position: 'relative',
          }}
        >
          {embedUrl ? (
            <iframe
              key={activeQuery}
              src={embedUrl}
              title={`Local search: ${activeQuery}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0, width: '100%', height: 400, display: 'block' }}
              allowFullScreen
            />
          ) : (
            /* Decorative dot world map when no API key */
            <div style={{ position: 'relative', height: 380, overflow: 'hidden' }}>
              <WorldDotMap />
              {PINS.map((p, i) => (
                <div key={i} style={{
                  position: 'absolute', left: p.cx, top: p.cy,
                  transform: 'translate(-50%, -100%)',
                }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--blue)', boxShadow: '0 0 0 3px rgba(30,95,224,0.25)' }} />
                </div>
              ))}
              {/* Highlight tooltip */}
              <div style={{
                position: 'absolute', bottom: '22%', right: '16%',
                background: '#0d1a3a', color: '#fff',
                borderRadius: 10, padding: '10px 14px', maxWidth: 160,
                fontSize: 12.5, lineHeight: 1.45, fontWeight: 500,
              }}>
                Australia's AI Visibility Platform for Security Brands.
                <div style={{ position: 'absolute', bottom: -7, left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '7px solid transparent', borderRight: '7px solid transparent', borderTop: '7px solid #0d1a3a' }} />
              </div>
            </div>
          )}

          {/* LIVE badge */}
          <div style={{
            position: 'absolute', top: 12, right: 12,
            background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(6px)',
            border: '1px solid rgba(30,95,224,0.15)', borderRadius: 999,
            padding: '4px 10px', fontSize: 10, fontFamily: 'var(--font-mono)',
            color: 'var(--blue)', letterSpacing: '0.08em', pointerEvents: 'none',
          }}>
            LIVE · GOOGLE MAPS
          </div>
        </motion.div>

        {/* ── Bottom row: 3 stats + info panel ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1.1fr', gap: 16, alignItems: 'start' }}>
          {[
            { value: '3',     label: 'Avg local pack spots', sub: `Top 3 win 70% of local clicks in ${where.city}` },
            { value: '40+',   label: 'Avg local pack spots', sub: `Top 3 win 70% of local clicks in ${where.city}` },
            { value: '60-90', label: 'Avg local pack spots', sub: `Top 3 win 70% of local clicks in ${where.city}` },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.18 + i * 0.07 }}
              style={{
                background: '#fff', border: '1.5px solid rgba(30,95,224,0.12)',
                borderRadius: 14, padding: '20px 18px',
                boxShadow: '0 2px 12px -4px rgba(30,95,224,0.08)',
              }}
            >
              <div style={{ fontSize: 'clamp(26px,3vw,36px)', fontWeight: 800, color: 'var(--blue)', lineHeight: 1, marginBottom: 8 }}>
                {s.value}
              </div>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 11.5, color: 'var(--text-dim)', lineHeight: 1.5 }}>{s.sub}</div>
            </motion.div>
          ))}

          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.38 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
          >
            {activeQuery && (
              <p style={{ fontSize: 13, color: 'var(--text-soft)', lineHeight: 1.6, margin: 0 }}>
                Showing live results for:{' '}
                <strong style={{ color: 'var(--text)' }}>{activeQuery}</strong>
                {' '}— Google Maps shows the live results below it.
              </p>
            )}
            <a href="/contact/" className="btn btn-primary" style={{ textAlign: 'center', fontSize: 13.5 }}>
              Get Free AI Audit
            </a>
            <a href="/free-tools/" className="btn btn-outline" style={{ textAlign: 'center', fontSize: 13 }}>
              Try The Live Score
            </a>
          </motion.div>
        </div>

      </div>

      <style>{`
        @media (max-width: 860px) {
          .lvc-bottom { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .lvc-bottom { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

// SVG dot-matrix world map (simplified continent shapes as dot grids)
function WorldDotMap() {
  return (
    <svg
      viewBox="0 0 900 420"
      style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
      aria-hidden
    >
      <defs>
        <pattern id="dots" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="4" r="1.6" fill="rgba(100,130,200,0.35)" />
        </pattern>
        {/* Continent masks — rough bounding rects clipped to approximate shapes */}
        <clipPath id="world">
          {/* North America */}
          <ellipse cx="175" cy="170" rx="110" ry="110" />
          {/* South America */}
          <ellipse cx="220" cy="310" rx="65" ry="90" />
          {/* Europe */}
          <ellipse cx="440" cy="140" rx="70" ry="70" />
          {/* Africa */}
          <ellipse cx="455" cy="270" rx="75" ry="90" />
          {/* Asia */}
          <ellipse cx="635" cy="175" rx="160" ry="110" />
          {/* Australia */}
          <ellipse cx="730" cy="320" rx="70" ry="55" />
        </clipPath>
      </defs>
      <rect width="900" height="420" fill="url(#dots)" clipPath="url(#world)" />
    </svg>
  )
}
