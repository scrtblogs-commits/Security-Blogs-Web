'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { GMAPS_KEY } from '@/lib/env'

// Site-styled local-visibility section. Sits directly above the footer.
// Theme-aware: inherits var(--bg) / var(--text) etc. so it matches the rest
// of the site instead of a dedicated dark navy slab.
//
// The search input drives the Google Maps Embed URL DIRECTLY:
//   - empty box   -> "security companies in <auto-detected city>"
//   - typed text  -> use the typed text exactly as the query, no appendix
// The iframe is keyed by the active query so the embed reloads on each
// submit. A visible "Showing live results for: <query>" line confirms what
// the map is actually requesting.

type Loc = {
  city: string
  region: string
  country: string
  countryCode: string
  source: 'ip' | 'precise' | 'fallback'
}

const FALLBACK: Loc = {
  city: 'Sydney',
  region: 'New South Wales',
  country: 'Australia',
  countryCode: 'AU',
  source: 'fallback',
}

export default function LocalVisibilityCheck({
  service: defaultService = 'security companies',
}: {
  service?: string
}) {
  const [loc, setLoc] = useState<Loc | null>(null)
  const [override, setOverride] = useState(false)
  const [overrideVal, setOverrideVal] = useState('')

  // Two pieces of search state:
  //   - searchInput     : what's currently in the textbox (every keystroke)
  //   - activeQuery     : what the map is actually showing right now.
  //                       Only changes when the user presses Enter / Submit.
  const [searchInput, setSearchInput] = useState('')
  const [activeQuery, setActiveQuery] = useState('')

  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '0px 0px -20% 0px' })

  // IP-based location lookup (no permission prompt).
  useEffect(() => {
    let cancelled = false
    const detect = async () => {
      try {
        const r = await fetch('https://ipapi.co/json/')
        if (!r.ok) throw new Error('ipapi.co not ok')
        const d = await r.json()
        if (cancelled) return
        if (d?.city) {
          setLoc({
            city: d.city, region: d.region || '', country: d.country_name || '',
            countryCode: d.country_code || 'AU', source: 'ip',
          })
          return
        }
        throw new Error('ipapi empty')
      } catch {
        try {
          const r = await fetch('https://ipwho.is/')
          const d = await r.json()
          if (cancelled) return
          if (d?.success && d?.city) {
            setLoc({
              city: d.city, region: d.region || '', country: d.country || '',
              countryCode: d.country_code || 'AU', source: 'ip',
            })
            return
          }
        } catch {}
        if (!cancelled) setLoc(FALLBACK)
      }
    }
    detect()
    return () => { cancelled = true }
  }, [])

  // Set a sensible initial active query once the location resolves.
  useEffect(() => {
    if (loc && !activeQuery) {
      setActiveQuery(`${defaultService} in ${[loc.city, loc.region].filter(Boolean).join(' ')}`.trim())
    }
  }, [loc, activeQuery, defaultService])

  const usePreciseLocation = () => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const r = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&zoom=10`,
            { headers: { Accept: 'application/json' } },
          )
          const d = await r.json()
          const addr = d.address || {}
          const next = {
            city: addr.city || addr.town || addr.suburb || addr.village || 'Your location',
            region: addr.state || '',
            country: addr.country || '',
            countryCode: (addr.country_code || 'au').toUpperCase(),
            source: 'precise' as const,
          }
          setLoc(next)
          // Refresh the default active query for the new location, but only
          // if the user hasn't typed anything custom.
          if (!searchInput.trim()) {
            setActiveQuery(`${defaultService} in ${[next.city, next.region].filter(Boolean).join(' ')}`.trim())
          }
        } catch { /* keep ip-based loc */ }
      },
      () => { /* user denied — keep ip-based loc */ },
      { enableHighAccuracy: false, timeout: 6000, maximumAge: 600_000 },
    )
  }

  const submitOverride = (e: React.FormEvent) => {
    e.preventDefault()
    if (!overrideVal.trim()) return
    const next: Loc = { city: overrideVal.trim(), region: '', country: '', countryCode: 'AU', source: 'fallback' }
    setLoc(next)
    setOverride(false)
    setOverrideVal('')
    if (!searchInput.trim()) {
      setActiveQuery(`${defaultService} in ${next.city}`)
    }
  }

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const typed = searchInput.trim()
    if (typed) {
      // Typed text becomes the query verbatim.
      setActiveQuery(typed)
    } else if (loc) {
      // Empty box -> default to the detected area.
      setActiveQuery(`${defaultService} in ${[loc.city, loc.region].filter(Boolean).join(' ')}`.trim())
    }
  }

  const where = loc ?? FALLBACK
  const embedUrl = useMemo(() => {
    if (!GMAPS_KEY || !activeQuery) return ''
    return `https://www.google.com/maps/embed/v1/search?key=${GMAPS_KEY}&q=${encodeURIComponent(activeQuery)}&zoom=12`
  }, [activeQuery])

  return (
    <section
      ref={sectionRef}
      style={{
        // Transparent — inherits the site's body background (matches the
        // rest of the site, light or dark mode).
        padding: '72px 24px',
        position: 'relative',
        color: 'var(--text)',
      }}
    >
      <div style={{ maxWidth: 1180, margin: '0 auto', position: 'relative' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ textAlign: 'center', marginBottom: 28 }}
        >
          <div style={{ fontSize: 12, letterSpacing: 2, color: 'var(--blue)', fontWeight: 700, marginBottom: 10 }}>
            ● LIVE · YOUR LOCAL MARKET
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, lineHeight: 1.1, margin: '0 0 14px', color: 'var(--text)' }}>
            Who shows up when locals search?
          </h2>
          <p style={{ fontSize: 15.5, color: 'var(--text-soft)', maxWidth: 640, margin: '0 auto', lineHeight: 1.55 }}>
            We detected you&apos;re in{' '}
            <strong style={{ color: 'var(--blue)' }}>
              {where.city}{where.region ? `, ${where.region}` : ''}
            </strong>
            . Type a business name or service below — Google Maps shows the live results below it.
          </p>
          <div style={{ marginTop: 12, display: 'flex', justifyContent: 'center', gap: 14, fontSize: 12.5, color: 'var(--text-dim)', flexWrap: 'wrap' }}>
            {where.source !== 'precise' && (
              <button onClick={usePreciseLocation} style={linkBtn}>Use my exact location</button>
            )}
            {!override && (
              <button onClick={() => setOverride(true)} style={linkBtn}>Change location</button>
            )}
          </div>
          {override && (
            <form onSubmit={submitOverride} style={{ marginTop: 12, display: 'flex', justifyContent: 'center', gap: 8 }}>
              <input
                value={overrideVal}
                onChange={(e) => setOverrideVal(e.target.value)}
                placeholder="e.g. Melbourne"
                className="field"
                style={{ width: 220 }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '10px 16px' }}>Update</button>
            </form>
          )}
        </motion.div>

        {/* Search row */}
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.05 }}
          onSubmit={submitSearch}
          style={{
            margin: '0 auto 16px',
            maxWidth: 640,
            display: 'flex', gap: 10,
            background: 'var(--bg-card)',
            border: '1px solid var(--line)',
            borderRadius: 14,
            padding: 8,
            boxShadow: '0 10px 30px -20px var(--glow)',
          }}
        >
          <span style={{ display: 'grid', placeItems: 'center', padding: '0 6px 0 12px', color: 'var(--blue)' }}>🔎</span>
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder={`e.g. CCTV installer ${where.city}, or your business name`}
            style={{
              flex: 1, minWidth: 0,
              padding: '12px 6px', border: 0, background: 'transparent',
              color: 'var(--text)', fontSize: 15, outline: 'none',
            }}
          />
          <button type="submit" className="btn btn-primary" style={{ padding: '10px 18px' }}>Show on map</button>
        </motion.form>

        {/* Active query confirmation */}
        {activeQuery && (
          <div style={{
            textAlign: 'center', marginBottom: 24,
            fontSize: 12.5, color: 'var(--text-dim)',
            fontFamily: 'var(--font-mono)',
          }}>
            Showing live results for: <strong style={{ color: 'var(--text-soft)' }}>{activeQuery}</strong>
          </div>
        )}

        {/* Map + side panel */}
        <div className="lvc-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 28, alignItems: 'stretch' }}>
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            style={{
              borderRadius: 18, overflow: 'hidden',
              background: 'var(--bg-card-2)',
              aspectRatio: '4 / 3',
              boxShadow: '0 18px 50px -22px var(--glow)',
              border: '1px solid var(--line)',
              position: 'relative',
            }}
          >
            {embedUrl ? (
              <>
                <iframe
                  // key tied to activeQuery -> React remounts the iframe and
                  // forces a fresh load whenever the user submits a new search.
                  key={activeQuery}
                  src={embedUrl}
                  title={`Local pack: ${activeQuery}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ border: 0, width: '100%', height: '100%' }}
                  allowFullScreen
                />
                <div style={{
                  position: 'absolute', bottom: 10, right: 10,
                  background: 'var(--bg-card)', color: 'var(--blue)',
                  padding: '5px 10px', borderRadius: 999,
                  fontSize: 10.5, letterSpacing: 1, fontFamily: 'var(--font-mono)',
                  pointerEvents: 'none',
                  border: '1px solid var(--line)',
                }}>
                  LIVE · GOOGLE MAPS
                </div>
              </>
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center', color: 'var(--text-dim)', fontSize: 13, textAlign: 'center', padding: 24 }}>
                {GMAPS_KEY ? 'Type a search above to load the map' : 'Map embed requires NEXT_PUBLIC_GMAPS_KEY in .env.local'}
              </div>
            )}
          </motion.div>

          {/* Side panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
          >
            <Stat label="Avg local pack spots" value="3" sub={`Top 3 win 70% of local clicks in ${where.city}`} />
            <Stat label="Businesses competing for the same keywords" value="40+" sub="Across Maps + organic in your area" />
            <Stat label="Avg time to break into Maps top 3" value="60-90" suffix="days" sub="With a real local SEO strategy" />

            <a href="/book-strategy-call/" className="btn btn-primary" style={{ marginTop: 4, padding: '14px 18px', fontSize: 14.5 }}>
              Get your free local SEO audit →
            </a>
            <a
              href={`https://www.google.com/maps/search/${encodeURIComponent(activeQuery || `${defaultService} ${where.city}`)}`}
              target="_blank" rel="noreferrer noopener"
              className="btn btn-outline"
              style={{ padding: '12px 18px', fontSize: 13.5 }}
            >
              Open full Google Maps results ↗
            </a>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .lvc-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

const linkBtn: React.CSSProperties = {
  background: 'transparent',
  border: 0,
  color: 'var(--blue)',
  textDecoration: 'underline',
  cursor: 'pointer',
  fontSize: 12.5,
  padding: 0,
}

function Stat({ label, value, sub, suffix }: { label: string; value: string; sub: string; suffix?: string }) {
  return (
    <div
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--line)',
        borderRadius: 14,
        padding: '14px 18px',
      }}
    >
      <div style={{ fontSize: 11, letterSpacing: 1, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: 4 }}>
        {label}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
        <span style={{ fontSize: 30, fontWeight: 800, color: 'var(--blue)', lineHeight: 1 }}>{value}</span>
        {suffix && <span style={{ fontSize: 13.5, color: 'var(--text-soft)' }}>{suffix}</span>}
      </div>
      <div style={{ fontSize: 12.5, color: 'var(--text-soft)', lineHeight: 1.4 }}>{sub}</div>
    </div>
  )
}
