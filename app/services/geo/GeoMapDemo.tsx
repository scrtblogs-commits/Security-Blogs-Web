'use client'
import { useState } from 'react'

// Self-contained GEO hero visual — no external API required.
// Renders a clean SVG map of Australia with pulsing pins on all 8 capitals,
// a live rotating search bar, local-pack snippet and coverage stats.

const QUERIES = [
  'security company near me sydney',
  'best cctv installation melbourne',
  'alarm systems brisbane',
  'ai visibility for security firms australia',
]

// Capital cities as percentage positions on the 360×240 Australia SVG viewBox
const CAPITALS = [
  { name: 'Darwin',    abbr: 'DRW', top: 5.5,  left: 54.2 },
  { name: 'Brisbane',  abbr: 'BNE', top: 56.7, left: 91.4 },
  { name: 'Perth',     abbr: 'PER', top: 67.5, left: 10.6 },
  { name: 'Sydney',    abbr: 'SYD', top: 71.3, left: 88.9 },
  { name: 'Adelaide',  abbr: 'ADL', top: 73.3, left: 63.1 },
  { name: 'Canberra',  abbr: 'CBR', top: 74.2, left: 84.7 },
  { name: 'Melbourne', abbr: 'MEL', top: 82.1, left: 76.4 },
  { name: 'Hobart',    abbr: 'HBA', top: 93.3, left: 80.3 },
]

const AU_OUTLINE = `
  M 18,90 L 14,68 16,44 26,26 42,14 62,8 88,4 118,2 150,0 182,4
  L 198,22 212,18 228,14 246,12 264,12 280,8 300,14
  L 316,22 326,40 332,62 334,88 336,114 338,138
  L 340,160 340,176 336,190 326,202 312,210 296,212
  L 278,212 260,212 244,214 228,218 212,222 196,226
  L 178,228 162,228 148,224 136,220 124,222 110,226
  L 94,228 78,226 62,224 48,222 32,218 20,212
  L 12,202 10,188 10,168 10,148 12,126 14,108 18,90 Z
`

export default function GeoMapDemo() {
  const [queryIdx, setQueryIdx] = useState(0)
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div style={{
      position: 'relative', borderRadius: 16, overflow: 'hidden',
      background: '#f0f7ff',
      border: '1px solid rgba(30,95,224,0.15)',
      boxShadow: '0 20px 60px -24px rgba(18,42,86,0.28)',
    }}>

      {/* LIVE badge */}
      <div style={{
        position: 'absolute', top: 12, right: 12, zIndex: 6,
        background: 'rgba(255,255,255,0.96)',
        padding: '4px 11px', borderRadius: 999,
        fontSize: 10, letterSpacing: '0.12em', color: '#1e5fe0', fontWeight: 700,
        border: '1px solid rgba(30,95,224,0.22)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
        fontFamily: 'var(--font-mono)',
        display: 'flex', alignItems: 'center', gap: 5,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block', animation: 'pulse 1.8s ease-in-out infinite' }} />
        LIVE · GEO TARGETING
      </div>

      {/* Search bar — cycles on click */}
      <button
        type="button"
        onClick={() => setQueryIdx(i => (i + 1) % QUERIES.length)}
        title="Click to cycle example queries"
        style={{
          position: 'absolute', top: 12, left: 12, zIndex: 6,
          width: 'calc(62% - 16px)', maxWidth: 290,
          background: '#fff', borderRadius: 22, padding: '7px 12px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
          border: '1px solid #dadce0',
          display: 'flex', alignItems: 'center', gap: 7,
          cursor: 'pointer', fontFamily: 'system-ui, sans-serif',
        }}
      >
        <span style={{ color: '#4285F4', fontFamily: 'serif', fontWeight: 800, fontSize: 15, lineHeight: 1 }}>G</span>
        <span style={{ flex: 1, fontSize: 11, color: '#202124', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'left' }}>
          {QUERIES[queryIdx]}
        </span>
        <span style={{ fontSize: 11, color: '#5f6368', flexShrink: 0 }}>↻</span>
      </button>

      {/* SVG Australia Map */}
      <div style={{ position: 'relative', aspectRatio: '360 / 240', width: '100%' }}>
        <svg viewBox="0 0 360 240" width="100%" height="100%" style={{ display: 'block' }}>
          <defs>
            <radialGradient id="gmd-land" cx="45%" cy="55%" r="65%">
              <stop offset="0%" stopColor="#dbeafe" />
              <stop offset="100%" stopColor="#bfdbfe" />
            </radialGradient>
            <radialGradient id="gmd-ocean" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stopColor="#eff8ff" />
              <stop offset="100%" stopColor="#dbeafe" />
            </radialGradient>
            <filter id="gmd-pin-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="gmd-halo" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="5" />
            </filter>
          </defs>

          {/* Ocean */}
          <rect width="360" height="240" fill="url(#gmd-ocean)" />

          {/* Subtle grid lines (ocean) */}
          <line x1="0" y1="80"  x2="360" y2="80"  stroke="rgba(147,197,253,0.35)" strokeWidth="0.5" />
          <line x1="0" y1="160" x2="360" y2="160" stroke="rgba(147,197,253,0.35)" strokeWidth="0.5" />
          <line x1="120" y1="0" x2="120" y2="240" stroke="rgba(147,197,253,0.35)" strokeWidth="0.5" />
          <line x1="240" y1="0" x2="240" y2="240" stroke="rgba(147,197,253,0.35)" strokeWidth="0.5" />

          {/* State dividers (approximate) */}
          <path d="M 155,2 L 155,190" stroke="rgba(147,197,253,0.6)" strokeWidth="0.8" strokeDasharray="4,3" />
          <path d="M 265,14 L 265,185" stroke="rgba(147,197,253,0.6)" strokeWidth="0.8" strokeDasharray="4,3" />

          {/* Continent fill */}
          <path d={AU_OUTLINE} fill="url(#gmd-land)" stroke="#93c5fd" strokeWidth="1.8" strokeLinejoin="round" />

          {/* Coverage halos */}
          {[
            { cx: 38, cy: 162, r: 32, color: 'rgba(30,95,224,0.07)' },
            { cx: 200, cy: 172, r: 25, color: 'rgba(30,95,224,0.07)' },
            { cx: 318, cy: 142, r: 20, color: 'rgba(30,95,224,0.07)' },
          ].map((h, i) => (
            <circle key={i} cx={h.cx} cy={h.cy} r={h.r} fill={h.color} stroke="rgba(30,95,224,0.18)" strokeWidth="1" />
          ))}

          {/* Tasmania */}
          <ellipse cx="316" cy="228" rx="11" ry="9" fill="#bfdbfe" stroke="#93c5fd" strokeWidth="1.5" />

          {/* Capital pins */}
          {CAPITALS.map((c, i) => {
            const cx = c.left / 100 * 360
            const cy = c.top  / 100 * 240
            const isHovered = hovered === c.name
            return (
              <g
                key={c.name}
                onMouseEnter={() => setHovered(c.name)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* Pulse ring */}
                <circle cx={cx} cy={cy} r={isHovered ? 14 : 9} fill="rgba(30,95,224,0.14)" className="sb-pin" style={{ animationDelay: `${i * 0.28}s` }} />
                {/* Pin dot */}
                <circle cx={cx} cy={cy} r={isHovered ? 6 : 4} fill="#1e5fe0" stroke="#fff" strokeWidth="1.5" filter="url(#gmd-pin-glow)" />
                {/* City label on hover */}
                {isHovered && (
                  <g>
                    <rect x={cx - 14} y={cy - 20} width={28} height={12} rx={4} fill="#1e5fe0" />
                    <text x={cx} y={cy - 11} textAnchor="middle" fontSize="7" fill="#fff" fontWeight="700" fontFamily="system-ui">{c.abbr}</text>
                  </g>
                )}
              </g>
            )
          })}
        </svg>
      </div>

      {/* Coverage stats strip */}
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '10px 16px', background: '#fff', borderTop: '1px solid rgba(30,95,224,0.1)' }}>
        {[['8', 'Capitals'], ['100%', 'Coverage'], ['500+', 'Clients'], ['★ 4.9', 'Rating']].map(([v, l]) => (
          <div key={l} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#1e5fe0' }}>{v}</div>
            <div style={{ fontSize: 9.5, color: '#64748b', fontWeight: 500 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Local pack snippet */}
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
