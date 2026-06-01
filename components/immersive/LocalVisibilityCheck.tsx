'use client'
import { useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { GMAPS_KEY } from '@/lib/env'

// Focused single-section widget. Goes below the H1 hero on /services/security-seo/.
// Auto-detects the visitor's city via IP geolocation (no permission prompt),
// then loads the Google Maps Embed local-pack for "<service> in <city>". A
// small mock SERP ranking-climb sits to the right as a teaser of what we do.
//
// Designed to be light: no scroll-pinning, no globe, no clouds — one clean
// section that fits inside a normal page flow.

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
  service: initialService = 'security companies',
}: {
  service?: string
}) {
  const [loc, setLoc] = useState<Loc | null>(null)
  const [override, setOverride] = useState(false)
  const [overrideVal, setOverrideVal] = useState('')
  // Editable search query — user can type their business name or any
  // service category and the embedded map updates instantly.
  const [service, setService] = useState(initialService)
  const [serviceDraft, setServiceDraft] = useState(initialService)
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '0px 0px -20% 0px' })

  // IP-based geolocation — no browser permission required. ipapi.co's free
  // tier returns city/region/country with reasonable accuracy. Fallback
  // chain: ipapi.co -> ipwho.is -> hard-coded default (Sydney).
  useEffect(() => {
    let cancelled = false
    const detect = async () => {
      try {
        const r = await fetch('https://ipapi.co/json/')
        if (!r.ok) throw new Error('ipapi.co not ok')
        const d = await r.json()
        if (cancelled) return
        if (d && d.city) {
          setLoc({
            city: d.city,
            region: d.region || d.region_code || '',
            country: d.country_name || 'Australia',
            countryCode: d.country_code || 'AU',
            source: 'ip',
          })
          return
        }
        throw new Error('ipapi empty')
      } catch {
        try {
          const r = await fetch('https://ipwho.is/')
          const d = await r.json()
          if (cancelled) return
          if (d && d.success && d.city) {
            setLoc({
              city: d.city,
              region: d.region || '',
              country: d.country || 'Australia',
              countryCode: d.country_code || 'AU',
              source: 'ip',
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

  const usePreciseLocation = () => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        // Reverse-geocode via Nominatim (free, no key, light rate limit). For
        // production scale switch to Mapbox or Google reverse geocode.
        try {
          const r = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&zoom=10`,
            { headers: { Accept: 'application/json' } },
          )
          const d = await r.json()
          const addr = d.address || {}
          setLoc({
            city: addr.city || addr.town || addr.suburb || addr.village || 'Your location',
            region: addr.state || '',
            country: addr.country || '',
            countryCode: (addr.country_code || 'au').toUpperCase(),
            source: 'precise',
          })
        } catch {
          /* keep ip-based loc */
        }
      },
      () => { /* user denied — keep ip-based loc */ },
      { enableHighAccuracy: false, timeout: 6000, maximumAge: 600_000 },
    )
  }

  const submitOverride = (e: React.FormEvent) => {
    e.preventDefault()
    if (!overrideVal.trim()) return
    setLoc({
      city: overrideVal.trim(),
      region: '',
      country: '',
      countryCode: 'AU',
      source: 'fallback',
    })
    setOverride(false)
    setOverrideVal('')
  }

  const where = loc ?? FALLBACK
  const queryStr = `${service} in ${[where.city, where.region, where.country].filter(Boolean).join(' ')}`.trim()
  const embedUrl = GMAPS_KEY
    ? `https://www.google.com/maps/embed/v1/search?key=${GMAPS_KEY}&q=${encodeURIComponent(queryStr)}&zoom=12`
    : ''

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '72px 24px',
        background: 'linear-gradient(180deg, #0a1428 0%, #12203f 100%)',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* subtle grid */}
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0,
          backgroundImage:
            'linear-gradient(rgba(126, 182, 255, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(126, 182, 255, 0.06) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at 50% 40%, black 0%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 40%, black 0%, transparent 70%)',
        }}
      />

      <div style={{ maxWidth: 1180, margin: '0 auto', position: 'relative' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ textAlign: 'center', marginBottom: 36 }}
        >
          <div style={{ fontSize: 12, letterSpacing: 2, color: '#7eb6ff', fontWeight: 600, marginBottom: 10 }}>
            ● LIVE · YOUR LOCAL MARKET
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, lineHeight: 1.1, margin: '0 0 14px' }}>
            Who shows up when locals search?
          </h2>
          <p style={{ fontSize: 15.5, color: '#9aa3b8', maxWidth: 620, margin: '0 auto', lineHeight: 1.55 }}>
            We detected you&apos;re in{' '}
            <strong style={{ color: '#7eb6ff' }}>
              {where.city}{where.region ? `, ${where.region}` : ''}
            </strong>
            . Here&apos;s the live Google Maps local pack — the businesses you&apos;re actually competing against.
          </p>
          <div style={{ marginTop: 12, display: 'flex', justifyContent: 'center', gap: 14, fontSize: 12.5, color: '#7c87a3', flexWrap: 'wrap' }}>
            {where.source !== 'precise' && (
              <button
                onClick={usePreciseLocation}
                style={{ background: 'transparent', border: 0, color: '#7eb6ff', textDecoration: 'underline', cursor: 'pointer', fontSize: 12.5 }}
              >
                Use my exact location
              </button>
            )}
            {!override && (
              <button
                onClick={() => setOverride(true)}
                style={{ background: 'transparent', border: 0, color: '#7eb6ff', textDecoration: 'underline', cursor: 'pointer', fontSize: 12.5 }}
              >
                Change location
              </button>
            )}
          </div>
          {override && (
            <form onSubmit={submitOverride} style={{ marginTop: 12, display: 'flex', justifyContent: 'center', gap: 8 }}>
              <input
                value={overrideVal}
                onChange={(e) => setOverrideVal(e.target.value)}
                placeholder="e.g. Melbourne"
                style={{
                  padding: '8px 12px', borderRadius: 10,
                  border: '1px solid #2c3a5a', background: 'rgba(255,255,255,0.06)',
                  color: '#fff', fontSize: 13.5, width: 200,
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '8px 14px', borderRadius: 10,
                  border: 0, background: '#1e5fe0', color: '#fff', cursor: 'pointer',
                  fontSize: 13.5, fontWeight: 600,
                }}
              >
                Update
              </button>
            </form>
          )}
        </motion.div>

        {/* Search row — user types their business name or service category */}
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.05 }}
          onSubmit={(e) => { e.preventDefault(); setService(serviceDraft.trim() || 'security companies') }}
          style={{
            margin: '0 auto 28px',
            maxWidth: 620,
            display: 'flex',
            gap: 10,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(126, 182, 255, 0.25)',
            borderRadius: 14,
            padding: 8,
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
        >
          <span style={{ display: 'grid', placeItems: 'center', padding: '0 6px 0 12px', color: '#7eb6ff' }}>
            🔎
          </span>
          <input
            value={serviceDraft}
            onChange={(e) => setServiceDraft(e.target.value)}
            placeholder="Your business name or service (e.g. CCTV installer)"
            style={{
              flex: 1, minWidth: 0,
              padding: '12px 6px', border: 0, background: 'transparent',
              color: '#fff', fontSize: 15, outline: 'none',
            }}
          />
          <button
            type="submit"
            style={{
              padding: '10px 18px', borderRadius: 10,
              border: 0, background: '#1e5fe0', color: '#fff', cursor: 'pointer',
              fontSize: 14, fontWeight: 700, whiteSpace: 'nowrap',
            }}
          >
            Show results
          </button>
        </motion.form>

        {/* Map + side panel */}
        <div className="lvc-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 28, alignItems: 'stretch' }}>
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            style={{
              borderRadius: 18, overflow: 'hidden',
              background: '#000', aspectRatio: '4 / 3',
              boxShadow: '0 30px 80px rgba(0,0,0,0.55)',
              border: '1px solid rgba(126, 182, 255, 0.18)',
              position: 'relative',
            }}
          >
            {embedUrl ? (
              <>
                <iframe
                  src={embedUrl}
                  title={`Local pack: ${queryStr}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ border: 0, width: '100%', height: '100%' }}
                  allowFullScreen
                />
                <div style={{
                  position: 'absolute', bottom: 10, right: 10,
                  background: 'rgba(15,20,30,0.85)', color: '#7eb6ff',
                  padding: '5px 10px', borderRadius: 999,
                  fontSize: 10.5, letterSpacing: 1, fontFamily: 'var(--font-mono, monospace)',
                  pointerEvents: 'none',
                }}>
                  LIVE · GOOGLE MAPS
                </div>
              </>
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center', color: '#9aa3b8', fontSize: 13, textAlign: 'center', padding: 24 }}>
                Map embed requires <code>NEXT_PUBLIC_GMAPS_KEY</code> in <code>.env.local</code>.
              </div>
            )}
          </motion.div>

          {/* Side panel: stats + CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
          >
            <Stat
              label="Avg local pack spots"
              value="3"
              sub={`Top 3 win 70% of local clicks in ${where.city}`}
            />
            <Stat
              label="Businesses competing for the same keywords"
              value="40+"
              sub="Across Maps + organic in your area"
            />
            <Stat
              label="Avg time to break into Maps top 3"
              value="60-90"
              suffix="days"
              sub="With a real local SEO strategy"
            />

            <a
              href="/book-strategy-call/"
              style={{
                display: 'block',
                marginTop: 4,
                padding: '14px 18px',
                background: 'linear-gradient(135deg, #1e5fe0 0%, #1742a8 100%)',
                color: '#fff',
                borderRadius: 14,
                textAlign: 'center',
                fontWeight: 700,
                fontSize: 14.5,
                textDecoration: 'none',
                boxShadow: '0 10px 28px rgba(30, 95, 224, 0.45)',
              }}
            >
              Get your free local SEO audit →
            </a>
            <a
              href={`https://www.google.com/maps/search/${encodeURIComponent(queryStr)}`}
              target="_blank"
              rel="noreferrer noopener"
              style={{
                display: 'block',
                padding: '12px 18px',
                background: 'transparent',
                color: '#7eb6ff',
                border: '1px solid rgba(126, 182, 255, 0.4)',
                borderRadius: 14,
                textAlign: 'center',
                fontWeight: 600,
                fontSize: 13.5,
                textDecoration: 'none',
              }}
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

function Stat({
  label, value, sub, suffix,
}: {
  label: string
  value: string
  sub: string
  suffix?: string
}) {
  return (
    <div
      style={{
        background: 'rgba(126, 182, 255, 0.05)',
        border: '1px solid rgba(126, 182, 255, 0.15)',
        borderRadius: 14,
        padding: '14px 18px',
      }}
    >
      <div style={{ fontSize: 11, letterSpacing: 1, color: '#7c87a3', textTransform: 'uppercase', marginBottom: 4 }}>
        {label}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
        <span style={{ fontSize: 30, fontWeight: 800, color: '#7eb6ff', lineHeight: 1 }}>{value}</span>
        {suffix && <span style={{ fontSize: 13.5, color: '#9aa3b8' }}>{suffix}</span>}
      </div>
      <div style={{ fontSize: 12.5, color: '#9aa3b8', lineHeight: 1.4 }}>{sub}</div>
    </div>
  )
}
