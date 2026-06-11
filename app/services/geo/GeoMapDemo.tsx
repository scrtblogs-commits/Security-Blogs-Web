'use client'
import { useState } from 'react'

// GEO hero visual — real OpenStreetMap tile layer via iframe (no API key),
// with pulsing brand pins on all 8 Australian capitals overlaid on top.
// Pin positions are pre-calculated against the map bbox:
//   west=112°E, east=154°E, north=10°S, south=44°S  (42° × 34°)

const QUERIES = [
  'security company near me sydney',
  'best cctv installation melbourne',
  'alarm systems brisbane',
  'ai visibility for security firms australia',
]

// Pixel % positions for each capital within the bbox [112E–154E] × [10S–44S]
// x = (lng - 112) / 42 * 100,  y = (lat - (-10)) / (-34) * 100  (lat flips)
const CAPITALS = [
  { name: 'Darwin',    abbr: 'DRW', lng: 130.8, lat: -12.5 },
  { name: 'Brisbane',  abbr: 'BNE', lng: 153.0, lat: -27.5 },
  { name: 'Perth',     abbr: 'PER', lng: 115.9, lat: -31.9 },
  { name: 'Sydney',    abbr: 'SYD', lng: 151.2, lat: -33.9 },
  { name: 'Adelaide',  abbr: 'ADL', lng: 138.6, lat: -34.9 },
  { name: 'Canberra',  abbr: 'CBR', lng: 149.1, lat: -35.3 },
  { name: 'Melbourne', abbr: 'MEL', lng: 144.9, lat: -37.8 },
  { name: 'Hobart',    abbr: 'HBA', lng: 147.3, lat: -42.9 },
].map(c => ({
  ...c,
  left: ((c.lng - 112) / 42) * 100,
  top:  ((c.lat - (-10)) / (-34)) * 100,
}))

export default function GeoMapDemo() {
  const [queryIdx, setQueryIdx] = useState(0)
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div style={{
      position: 'relative', borderRadius: 16, overflow: 'hidden',
      border: '1px solid rgba(30,95,224,0.18)',
      boxShadow: '0 22px 64px -24px rgba(18,42,86,0.30)',
    }}>

      {/* ── Real OpenStreetMap tile layer ──────────────────────────── */}
      {/* bbox: west=112, south=-44, east=154, north=-10 centres on AU */}
      <div style={{ position: 'relative', aspectRatio: '16 / 10', width: '100%' }}>
        <iframe
          title="Australia Map"
          src="https://www.openstreetmap.org/export/embed.html?bbox=112%2C-44%2C154%2C-10&layer=mapnik"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            border: 'none', display: 'block',
          }}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin"
        />

        {/* ── Pin overlay ───────────────────────────────────────────── */}
        {CAPITALS.map((c, i) => (
          <div
            key={c.name}
            onMouseEnter={() => setHovered(c.name)}
            onMouseLeave={() => setHovered(null)}
            style={{
              position: 'absolute',
              top:  `${c.top}%`,
              left: `${c.left}%`,
              transform: 'translate(-50%, -50%)',
              zIndex: 4,
              cursor: 'pointer',
            }}
          >
            {/* Pulse ring */}
            <span
              className="sb-pin"
              style={{
                position: 'absolute',
                top: '50%', left: '50%',
                transform: 'translate(-50%,-50%)',
                width: 22, height: 22, borderRadius: '50%',
                background: 'rgba(30,95,224,0.22)',
                display: 'block',
                animationDelay: `${i * 0.28}s`,
              }}
            />
            {/* Pin dot */}
            <div style={{
              width: 12, height: 12, borderRadius: '50%',
              background: '#1e5fe0',
              border: '2.5px solid #fff',
              boxShadow: '0 2px 8px rgba(30,95,224,0.55)',
              position: 'relative', zIndex: 5,
            }} />
            {/* Hover label */}
            {hovered === c.name && (
              <div style={{
                position: 'absolute', bottom: '100%', left: '50%',
                transform: 'translateX(-50%) translateY(-4px)',
                background: '#1e5fe0', color: '#fff',
                fontSize: 9.5, fontWeight: 700, padding: '3px 8px',
                borderRadius: 5, whiteSpace: 'nowrap',
                boxShadow: '0 4px 12px rgba(30,95,224,0.4)',
                fontFamily: 'var(--font-mono)',
              }}>
                {c.name}
              </div>
            )}
          </div>
        ))}

        {/* ── Search bar overlay ────────────────────────────────────── */}
        <button
          type="button"
          onClick={() => setQueryIdx(i => (i + 1) % QUERIES.length)}
          title="Click to cycle example queries"
          style={{
            position: 'absolute', top: 10, left: 10, zIndex: 6,
            width: 'calc(62% - 12px)', maxWidth: 300,
            background: '#fff', borderRadius: 22, padding: '7px 12px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.14)',
            border: '1px solid #dadce0',
            display: 'flex', alignItems: 'center', gap: 7,
            cursor: 'pointer', fontFamily: 'system-ui, sans-serif',
          }}
        >
          <span style={{ color: '#4285F4', fontFamily: 'serif', fontWeight: 800, fontSize: 15, lineHeight: 1 }}>G</span>
          <span style={{ flex: 1, fontSize: 11, color: '#202124', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'left' }}>
            {QUERIES[queryIdx]}
          </span>
          <span style={{ fontSize: 11, color: '#9aa3b8', flexShrink: 0 }}>↻</span>
        </button>

        {/* ── LIVE badge ────────────────────────────────────────────── */}
        <div style={{
          position: 'absolute', top: 10, right: 10, zIndex: 6,
          background: 'rgba(255,255,255,0.96)',
          padding: '4px 11px', borderRadius: 999,
          fontSize: 10, letterSpacing: '0.12em', color: '#1e5fe0', fontWeight: 700,
          border: '1px solid rgba(30,95,224,0.22)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          fontFamily: 'var(--font-mono)',
          display: 'flex', alignItems: 'center', gap: 5,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
          LIVE · GEO TARGETING
        </div>
      </div>

      {/* ── Coverage stats strip ─────────────────────────────────────── */}
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '10px 16px', background: '#fff', borderTop: '1px solid rgba(30,95,224,0.1)' }}>
        {[['8', 'Capitals'], ['100%', 'Coverage'], ['500+', 'Clients'], ['★ 4.9', 'Rating']].map(([v, l]) => (
          <div key={l} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#1e5fe0' }}>{v}</div>
            <div style={{ fontSize: 9.5, color: '#64748b', fontWeight: 500 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* ── Local pack snippet ───────────────────────────────────────── */}
      <div style={{ padding: '10px 12px', background: '#fff', borderTop: '1px solid #f0f4f8' }}>
        <div
          className="sb-card-rank"
          style={{
            background: 'linear-gradient(135deg, #f0f7ff 0%, #ffffff 100%)',
            border: '1.5px solid #1e5fe0',
            borderRadius: 10, padding: '9px 12px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
            <span style={{ fontSize: 9.5, fontWeight: 800, color: '#1e5fe0', background: '#dbeafe', padding: '2px 7px', borderRadius: 4 }}>★ POSITION 1</span>
            <span style={{ fontSize: 9, color: '#22c55e', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>● VERIFIED</span>
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#1a0dab', marginBottom: 2 }}>SecurityBlogs Australia</div>
          <div style={{ fontSize: 11, color: '#4d5156' }}>securityblogs.com.au · ★ 5.0 · 142 reviews · AI Visibility & SEO</div>
        </div>
      </div>
    </div>
  )
}
