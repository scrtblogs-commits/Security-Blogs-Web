'use client'
import { useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { MAPBOX_TOKEN } from '@/lib/env'

// Hero-sized "live AI Maps" demo for /services/geo/. Shows what Google Maps
// returns when someone searches an entity-level query in our space — our
// own brand surfacing at position 1 in the local pack, supported by
// pulsing pins on every capital we serve.
//
// The map tile is a real Mapbox static (light style, centred on AU). The
// local-pack panel on the right is a controlled mock — we own the brand
// data, so we present it exactly how a properly-built AI-recognised
// entity would appear.

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
  'security publishing platform australia',
]

const COMPETITORS = [
  { name: 'cybersec-agency.au',   rating: 4.4, reviews: 38 },
  { name: 'security-marketing.au', rating: 4.2, reviews: 21 },
]

export default function GeoMapDemo() {
  const [queryIdx, setQueryIdx] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '0px 0px -20% 0px' })

  const url = MAPBOX_TOKEN
    ? `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/134,-27,4,0/1200x800@2x?access_token=${MAPBOX_TOKEN}`
    : ''

  return (
    <section ref={sectionRef} className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <span className="badge badge-blue" style={{ marginBottom: 14 }}>
            <span className="dot dot-pulse" /> LIVE · GOOGLE MAPS RESULT
          </span>
          <h2 className="h2" style={{ margin: 0 }}>
            Searched on Maps. <span style={{ color: 'var(--blue)', fontStyle: 'italic' }}>SecurityBlogs surfaces.</span>
          </h2>
          <p className="lead" style={{ maxWidth: 660, margin: '12px auto 0' }}>
            This is what AI-recognised entity authority looks like in practice —
            consistent NAP, verified knowledge-graph entry, and pole position
            across every relevant query in our market.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{
            position: 'relative',
            borderRadius: 20,
            overflow: 'hidden',
            border: '1px solid var(--line)',
            boxShadow: '0 30px 80px -30px rgba(18, 42, 86, 0.30)',
            background: '#f4f8fc',
            aspectRatio: '16 / 9',
            minHeight: 420,
          }}
        >
          {/* Map background */}
          {url && (
            <div
              style={{
                position: 'absolute', inset: 0,
                backgroundImage: `url(${url})`,
                backgroundSize: 'cover', backgroundPosition: 'center',
              }}
            />
          )}

          {/* Capital pins */}
          {CAPITALS.map((c, i) => (
            <span
              key={c.name}
              className="sb-pin"
              title={c.name}
              style={{
                position: 'absolute',
                top: `${c.top}%`,
                left: `${c.left * 0.55}%`,
                width: 12, height: 12, borderRadius: '50%',
                background: '#1e5fe0',
                transform: 'translate(-50%, -50%)',
                boxShadow: '0 0 0 0 rgba(30,95,224,0.55), 0 0 0 3px #fff',
                animationDelay: `${i * 0.25}s`,
                zIndex: 2,
              }}
            />
          ))}

          {/* Search bar — top-left of map area */}
          <div
            className="sg-geo-search"
            style={{
              position: 'absolute', top: 18, left: 18,
              width: 'min(360px, 50vw)', zIndex: 3,
              background: '#fff',
              borderRadius: 24,
              padding: '8px 14px 8px 12px',
              boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
              border: '1px solid #dadce0',
              display: 'flex', alignItems: 'center', gap: 10,
            }}
          >
            <span style={{ color: '#4285F4', fontFamily: 'serif', fontWeight: 700, fontSize: 18 }}>G</span>
            <input
              value={QUERIES[queryIdx]}
              readOnly
              style={{
                flex: 1, border: 0, outline: 'none',
                fontSize: 13.5, color: '#202124', background: 'transparent',
                fontFamily: 'system-ui, sans-serif',
              }}
              onClick={() => setQueryIdx((i) => (i + 1) % QUERIES.length)}
              aria-label="Cycle through example queries"
            />
            <span style={{ fontSize: 11, color: '#5f6368', fontFamily: 'var(--font-mono)' }}>↻</span>
          </div>

          {/* Local-pack results panel — right side */}
          <div
            className="sg-geo-pack"
            style={{
              position: 'absolute', top: 18, right: 18, bottom: 18,
              width: 'min(360px, 40vw)', zIndex: 3,
              background: '#fff',
              borderRadius: 14,
              padding: 14,
              boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
              border: '1px solid #dadce0',
              overflow: 'auto',
              fontFamily: 'system-ui, sans-serif',
              color: '#202124',
            }}
          >
            <div style={{ fontSize: 10.5, letterSpacing: 1.2, color: '#5f6368', fontWeight: 700, marginBottom: 8 }}>
              LOCAL PACK · 3 RESULTS
            </div>

            {/* Position 1 — SecurityBlogs (highlighted, pulsing) */}
            <div
              className="sb-card-rank"
              style={{
                background: 'linear-gradient(180deg, #f1f6ff 0%, #ffffff 100%)',
                border: '1.5px solid #1e5fe0',
                borderRadius: 10,
                padding: '10px 12px',
                marginBottom: 8,
                boxShadow: '0 6px 18px rgba(30,95,224,0.16)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#1e5fe0' }}>★ POSITION 1</span>
                <span style={{ fontSize: 10.5, color: '#10a37f', fontFamily: 'var(--font-mono)' }}>● VERIFIED</span>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#1a0dab', marginBottom: 2 }}>SecurityBlogs</div>
              <div style={{ fontSize: 12, color: '#4d5156', marginBottom: 4 }}>securityblogs.com.au</div>
              <div style={{ fontSize: 11.5, color: '#5f6368', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: '#fbbc04' }}>★★★★★</span>
                <span>5.0 · 142 reviews</span>
              </div>
              <div style={{ fontSize: 11.5, color: '#5f6368', marginTop: 4 }}>
                Australia&apos;s AI Visibility Platform for Security Brands
              </div>
            </div>

            {/* Competitors */}
            {COMPETITORS.map((c, i) => (
              <div
                key={c.name}
                style={{
                  background: '#fff',
                  border: '1px solid #ececf1',
                  borderRadius: 8,
                  padding: '8px 12px',
                  marginBottom: i < COMPETITORS.length - 1 ? 6 : 0,
                }}
              >
                <div style={{ fontSize: 11, color: '#5f6368', fontWeight: 600, marginBottom: 2 }}>POSITION {i + 2}</div>
                <div style={{ fontSize: 13, color: '#1a0dab' }}>{c.name}</div>
                <div style={{ fontSize: 11.5, color: '#5f6368', display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                  <span style={{ color: '#fbbc04' }}>★★★★☆</span>
                  <span>{c.rating} · {c.reviews} reviews</span>
                </div>
              </div>
            ))}

            <div style={{ fontSize: 10.5, color: '#5f6368', textAlign: 'center', fontStyle: 'italic', marginTop: 10 }}>
              Illustrative — entity verification varies by AI platform
            </div>
          </div>
        </motion.div>

        {/* Hint below — tap to cycle queries */}
        <div style={{ textAlign: 'center', marginTop: 14, fontSize: 12.5, color: 'var(--text-soft)' }}>
          Click the search box to cycle through example queries this entity is built to win
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .sg-geo-search { width: calc(100% - 36px) !important; top: 14px !important; left: 18px !important; }
          .sg-geo-pack { position: relative !important; inset: auto !important; width: 100% !important; margin-top: 80px; max-height: 340px; }
        }
      `}</style>
    </section>
  )
}
