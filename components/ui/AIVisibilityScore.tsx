'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

// Matches the PDF design exactly:
// - White card, "AI Visibility Score" in blue
// - Donut chart (87/100) top-right
// - 4 coloured metric boxes in 2×2 grid

const metrics = [
  { label: 'Content structure', value: 3671, pct: 87, color: '#1e9e75', bg: 'rgba(30,158,117,0.07)', icon: '↑' },
  { label: 'Entity authority',  value: 3671, pct: 87, color: '#1e5fe0', bg: 'rgba(30,95,224,0.07)',  icon: '↑' },
  { label: 'AI citation rate',  value: 3671, pct: 93, color: '#e23744', bg: 'rgba(226,55,68,0.07)',  icon: '↑' },
  { label: 'Schema coverage',   value: 3671, pct: 87, color: '#6f4dff', bg: 'rgba(111,77,255,0.07)', icon: '↑' },
]

// Donut segments: content=green, entity=blue, citation=red, schema=violet
const DONUT_R   = 38
const DONUT_C   = 2 * Math.PI * DONUT_R   // 238.76
const segments  = [
  { pct: 0.35, color: '#1e9e75' },
  { pct: 0.25, color: '#1e5fe0' },
  { pct: 0.22, color: '#e23744' },
  { pct: 0.18, color: '#6f4dff' },
]

function DonutChart({ animate }: { animate: boolean }) {
  let offset = 0
  return (
    <div style={{ position: 'relative', width: 96, height: 96, flexShrink: 0 }}>
      <svg width={96} height={96} viewBox="0 0 96 96">
        {/* Track */}
        <circle cx={48} cy={48} r={DONUT_R} fill="none" stroke="#f0f4ff" strokeWidth={11} />
        {/* Segments */}
        {segments.map((s, i) => {
          const dash   = animate ? s.pct * DONUT_C : 0
          const gap    = DONUT_C - dash
          const rotate = offset * 360 - 90
          offset += s.pct
          return (
            <circle
              key={i}
              cx={48} cy={48} r={DONUT_R}
              fill="none"
              stroke={s.color}
              strokeWidth={11}
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={0}
              strokeLinecap="round"
              style={{
                transform: `rotate(${rotate}deg)`,
                transformOrigin: '48px 48px',
                transition: `stroke-dasharray 1.2s cubic-bezier(.2,.8,.2,1) ${i * 0.15}s`,
              }}
            />
          )
        })}
      </svg>
      {/* Centre label */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ fontSize: 18, fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--text)', lineHeight: 1 }}>87</span>
        <span style={{ fontSize: 10, color: 'var(--text-dim)', lineHeight: 1.2 }}>/100</span>
      </div>
    </div>
  )
}

export default function AIVisibilityScore() {
  const ref    = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const io = new IntersectionObserver(
      (e) => { if (e[0].isIntersecting) setShow(true) },
      { threshold: 0.25 },
    )
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <motion.div
      ref={ref}
      className="card"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.22, 0.8, 0.2, 1] }}
      style={{
        background: '#fff',
        border: '1px solid rgba(18,42,86,0.10)',
        borderRadius: 24,
        padding: 'clamp(24px, 4vw, 36px)',
        maxWidth: 640,
        margin: '0 auto',
        boxShadow: '0 16px 56px -20px rgba(18,42,86,0.14)',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28, gap: 16 }}>
        <div>
          <h3 style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 'clamp(20px,3vw,26px)', color: 'var(--blue)',
            margin: 0, lineHeight: 1.15,
          }}>
            AI Visibility Score
          </h3>
          <p style={{ fontSize: 13, color: 'var(--text-dim)', margin: '6px 0 0' }}>Live snapshot</p>
        </div>
        <DonutChart animate={show} />
      </div>

      {/* 2×2 metric grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 12,
      }}>
        {metrics.map((m) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 16 }}
            animate={show ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              background: m.bg,
              borderRadius: 14,
              padding: '16px 18px',
              border: `1px solid ${m.color}22`,
            }}
          >
            <div style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 8, fontFamily: 'var(--font-mono)' }}>
              {m.label}
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 8 }}>
              <span style={{
                fontSize: 'clamp(20px,3vw,26px)',
                fontWeight: 800,
                fontFamily: 'var(--font-display)',
                color: m.color,
                lineHeight: 1,
              }}>
                {m.value.toLocaleString()}
              </span>
              <span style={{
                fontSize: 13, fontWeight: 700,
                color: m.color,
                background: `${m.color}18`,
                padding: '3px 8px',
                borderRadius: 999,
                display: 'flex', alignItems: 'center', gap: 3,
              }}>
                {m.icon} {m.pct}%
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
