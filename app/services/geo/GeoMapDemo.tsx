'use client'
import { useState } from 'react'
import { MAPBOX_TOKEN } from '@/lib/env'

// COMPACT live AI-Maps demo. Sits in the GEO hero's right column,
// replacing the orbital KnowledgeGraphCanvas. Three stacked layers:
//   1. Mapbox static of Australia (light style, zoom 4, 600x408 — same
//      proportions as the homepage GEO card so the pin positions match)
//   2. Pulsing brand-blue pins on every state/territory capital
//   3. Compact Google-styled search bar + local-pack snippet with
//      SecurityBlogs at POSITION 1
//
// Positions are pre-computed against the image's lat/lng bounds — no
// runtime scaling so pins land on the real capitals.

const CAPITALS = [
  { name: 'Darwin',    top: 9.4,  left: 44.0 },
  { name: 'Brisbane',  top: 51.3, left: 86.2 },
  { name: 'Perth',     top: 63.8, left: 15.5 },
  { name: 'Sydney',    top: 69.2, left: 82.7 },
  { name: 'Adelaide',  top: 72.1, left: 58.7 },
  { name: 'Canberra',  top: 73.1, left: 78.8 },
  { name: 'Melbourne', top: 80.2, left: 70.8 },
  { name: 'Hobart',    top: 94.4, left: 75.3 },
]

const QUERIES = [
  'security ai visibility platform australia',
  'best ai seo for security companies',
  'security brand citations chatgpt',
  'ai visibility audit security',
]

export default function GeoMapDemo() {
  const [queryIdx, setQueryIdx] = useState(0)

  const url = MAPBOX_TOKEN
    ? `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/134,-27,4,0/600x408@2x?access_token=${MAPBOX_TOKEN}`
    : ''

  return (
    <div
      style={{
        position: 'relative',
        borderRadius: 14,
        overflow: 'hidden',
        background: '#f4f8fc',
        border: '1px solid var(--line)',
        boxShadow: '0 18px 50px -22px rgba(18, 42, 86, 0.30)',
      }}
    >
      {/* LIVE pill — top-right */}
      <div
        style={{
          position: 'absolute', top: 10, right: 10, zIndex: 4,
          background: 'rgba(255,255,255,0.95)',
          padding: '3px 9px', borderRadius: 999,
          fontSize: 9.5, letterSpacing: 1.2, color: '#1e5fe0', fontWeight: 700,
          border: '1px solid rgba(30,95,224,0.25)',
          boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
          fontFamily: 'var(--font-mono)',
        }}
      >
        ● LIVE · GOOGLE MAPS
      </div>

      {/* Search bar — top-left */}
      <button
        type="button"
        onClick={() => setQueryIdx((i) => (i + 1) % QUERIES.length)}
        title="Click to cycle queries"
        style={{
          position: 'absolute', top: 10, left: 10, zIndex: 4,
          width: 'calc(60% - 12px)', maxWidth: 280,
          background: '#fff',
          borderRadius: 20,
          padding: '6px 10px 6px 10px',
          boxShadow: '0 4px 14px rgba(0,0,0,0.10)',
          border: '1px solid #dadce0',
          display: 'flex', alignItems: 'center', gap: 6,
          textAlign: 'left',
          cursor: 'pointer',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <span style={{ color: '#4285F4', fontFamily: 'serif', fontWeight: 700, fontSize: 14 }}>G</span>
        <span style={{ flex: 1, fontSize: 11, color: '#202124', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {QUERIES[queryIdx]}
        </span>
        <span style={{ fontSize: 10, color: '#5f6368' }}>↻</span>
      </button>

      {/* Map background — 600x408 aspect to match the static image, so
          pin % positions land on the real capitals */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '600 / 408',
          width: '100%',
        }}
      >
        {url && (
          <div
            style={{
              position: 'absolute', inset: 0,
              backgroundImage: `url(${url})`,
              backgroundSize: 'cover', backgroundPosition: 'center',
            }}
          />
        )}

        {/* Pulsing pins on capitals */}
        {CAPITALS.map((c, i) => (
          <span
            key={c.name}
            className="sb-pin"
            title={c.name}
            style={{
              position: 'absolute',
              top: `${c.top}%`,
              left: `${c.left}%`,
              width: 10, height: 10, borderRadius: '50%',
              background: '#1e5fe0',
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 0 0 rgba(30,95,224,0.55), 0 0 0 2px #fff',
              animationDelay: `${i * 0.25}s`,
              zIndex: 2,
            }}
          />
        ))}
      </div>

      {/* Compact local-pack snippet — below the map */}
      <div style={{ padding: 10, background: '#fff', borderTop: '1px solid #ececf1' }}>
        <div
          className="sb-card-rank"
          style={{
            background: 'linear-gradient(180deg, #f1f6ff 0%, #ffffff 100%)',
            border: '1.5px solid #1e5fe0',
            borderRadius: 10,
            padding: '8px 10px',
            fontFamily: 'system-ui, sans-serif',
            color: '#202124',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
            <span style={{ fontSize: 10, fontWeight: 800, color: '#1e5fe0' }}>★ POSITION 1</span>
            <span style={{ fontSize: 9.5, color: '#10a37f', fontFamily: 'var(--font-mono)' }}>● VERIFIED</span>
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#1a0dab' }}>SecurityBlogs</div>
          <div style={{ fontSize: 11, color: '#4d5156', marginTop: 1 }}>securityblogs.com.au · ★ 5.0 · 142 reviews</div>
        </div>
      </div>
    </div>
  )
}
