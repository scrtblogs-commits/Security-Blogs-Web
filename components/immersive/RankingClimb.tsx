'use client'
import { motion, MotionValue, useTransform } from 'framer-motion'

// The headline overlay: an animated mock SERP where the user's brand row
// slides up from below the visible list (page-2 territory) all the way to
// position 1, then a featured-snippet card appears on top. Pure illustrative
// markup — no live Google data. Pinned card on the right side of the climax.
const ROW_H = 44
const ROW_GAP = 6
const COMPETITORS = [
  'cctv-pro.com.au',
  'sentinel-security.au',
  'guardian-cam.com.au',
  'safesight.au',
  'aussiealarms.com',
  'metro-security.com.au',
  'shieldwatch.au',
  'aspect-cctv.au',
  'totalsecurityservices.au',
  'localguard-solutions.au',
]

export default function RankingClimb({
  progress,
  brand,
  query,
}: {
  progress: MotionValue<number>
  brand: string
  query: string
}) {
  // Card appears 0.78 -> stays. Brand row vertical position animates
  // 0.82 -> 0.96 from "below list" to "above position 1".
  const opacity = useTransform(progress, [0.78, 0.84, 0.99, 1], [0, 1, 1, 1])
  const x = useTransform(progress, [0.78, 0.84], [80, 0])
  // brand row Y: starts BELOW the list (slot index 11+), ends at the spot
  // where the featured snippet will land (slot 0, above all competitors)
  const brandY = useTransform(
    progress,
    [0.82, 0.96],
    [(COMPETITORS.length + 0.5) * (ROW_H + ROW_GAP), -(ROW_H + ROW_GAP) * 1.1],
  )
  // Featured-snippet card slides in at the very end
  const featuredOp = useTransform(progress, [0.95, 1.0], [0, 1])
  const featuredY = useTransform(progress, [0.95, 1.0], [-10, 0])
  // Brand position label (1..11) — derived from the y to show current slot
  const slotLabel = useTransform(brandY, (y) => {
    const slot = Math.max(0, Math.min(11, Math.round(11 - y / (ROW_H + ROW_GAP))))
    return slot === 0 ? '★' : String(slot)
  })

  return (
    <motion.div
      style={{
        opacity, x,
        position: 'absolute', top: '6%', right: '3%',
        width: 'min(360px, 38vw)',
        background: 'rgba(255,255,255,0.97)',
        borderRadius: 16,
        padding: 16,
        boxShadow: '0 30px 80px rgba(0,0,0,0.18)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        color: '#202124',
        zIndex: 12,
      }}
    >
      {/* Mock Google search bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, padding: '7px 12px', border: '1px solid #dadce0', borderRadius: 24 }}>
        <span style={{ color: '#4285F4', fontWeight: 700, fontFamily: 'serif', fontSize: 16 }}>G</span>
        <span style={{ fontSize: 12, color: '#202124', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{query}</span>
        <span style={{ color: '#5f6368', fontSize: 11 }}>🔎</span>
      </div>

      {/* Featured snippet — slides in at very end */}
      <motion.div
        style={{
          opacity: featuredOp, y: featuredY,
          marginBottom: 8,
          padding: 10,
          border: '1px solid #1e5fe0',
          borderRadius: 10,
          background: 'linear-gradient(180deg, #f1f6ff 0%, #ffffff 100%)',
        }}
      >
        <div style={{ fontSize: 10, color: '#1e5fe0', fontWeight: 700, letterSpacing: 0.4, marginBottom: 3 }}>
          FEATURED SNIPPET · POSITION 0
        </div>
        <div style={{ fontSize: 12.5, fontWeight: 600, color: '#1a0dab' }}>{brand}</div>
        <div style={{ fontSize: 11, color: '#4d5156', marginTop: 2 }}>
          Trusted, fully-licensed provider. Free quote within 24 hours.
        </div>
      </motion.div>

      {/* SERP scroll viewport */}
      <div style={{
        position: 'relative',
        height: COMPETITORS.length * (ROW_H + ROW_GAP),
        overflow: 'hidden',
        borderRadius: 8,
        border: '1px solid #ececf1',
      }}>
        {/* Static competitor list */}
        {COMPETITORS.map((c, i) => (
          <div
            key={c}
            style={{
              position: 'absolute',
              top: i * (ROW_H + ROW_GAP),
              left: 0, right: 0,
              height: ROW_H,
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '0 10px',
              fontSize: 11.5,
              color: '#5f6368',
              borderBottom: '1px solid #f3f4f7',
            }}
          >
            <span style={{ width: 18, fontWeight: 600 }}>{i + 1}</span>
            <span style={{ color: '#1a0dab', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c}</span>
          </div>
        ))}

        {/* Brand row sliding up from below */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0, right: 0,
            height: ROW_H,
            y: brandY,
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '0 10px',
            background: 'linear-gradient(90deg, rgba(30,95,224,0.18), rgba(30,95,224,0.08))',
            border: '1.5px solid rgba(30,95,224,0.65)',
            borderRadius: 8,
            boxShadow: '0 6px 20px rgba(30,95,224,0.25)',
            zIndex: 2,
          }}
        >
          <motion.span style={{ width: 18, fontWeight: 800, color: '#1e5fe0' }}>
            {slotLabel}
          </motion.span>
          <span style={{ color: '#1e5fe0', fontWeight: 700, fontSize: 12.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{brand}</span>
          <span style={{ marginLeft: 'auto', fontSize: 16 }}>↑</span>
        </motion.div>
      </div>

      <div style={{ marginTop: 10, fontSize: 10.5, color: '#5f6368', textAlign: 'center', fontStyle: 'italic' }}>
        Live ranking demo · illustrative
      </div>
    </motion.div>
  )
}
