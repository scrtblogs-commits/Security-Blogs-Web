'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

// Pure card — no video inside.
// Video lives as a SEPARATE element behind this card (see page.tsx AI score section).

type Metric = { label: string; value: number; pct: number; color: string; bg: string }

const metrics: Metric[] = [
  { label: 'Content structure', value: 3671, pct: 87, color: '#1e9e75', bg: 'rgba(30,158,117,0.08)' },
  { label: 'Entity authority',  value: 3671, pct: 87, color: '#1e5fe0', bg: 'rgba(30,95,224,0.08)'  },
  { label: 'AI citation rate',  value: 3671, pct: 93, color: '#e23744', bg: 'rgba(226,55,68,0.08)'  },
  { label: 'Schema coverage',   value: 3671, pct: 87, color: '#6f4dff', bg: 'rgba(111,77,255,0.08)' },
]

const DONUT_R    = 38
const DONUT_CIRC = 2 * Math.PI * DONUT_R
const segments   = [
  { share: 0.35, color: '#1e9e75' },
  { share: 0.25, color: '#1e5fe0' },
  { share: 0.22, color: '#e23744' },
  { share: 0.18, color: '#6f4dff' },
]

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

function useCountUp(target: number, duration = 1600, started = false) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!started) return
    let start: number | null = null
    let raf: number
    const tick = (ts: number) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      setVal(Math.round(easeOutExpo(p) * target))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration, started])
  return val
}

function DonutChart({ started }: { started: boolean }) {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    if (!started) return
    let start: number | null = null
    let raf: number
    const tick = (ts: number) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / 1600, 1)
      setProgress(easeOutExpo(p))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [started])

  let rot = 0
  return (
    <div style={{ position: 'relative', width: 96, height: 96, flexShrink: 0 }}>
      <svg width={96} height={96} viewBox="0 0 96 96" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={48} cy={48} r={DONUT_R} fill="none" stroke="#f0f4ff" strokeWidth={11} />
        {segments.map((seg, i) => {
          const dash   = seg.share * progress * DONUT_CIRC
          const gap    = DONUT_CIRC - dash
          const rotate = rot * 360
          rot += seg.share
          return (
            <circle key={i} cx={48} cy={48} r={DONUT_R}
              fill="none" stroke={seg.color} strokeWidth={11}
              strokeLinecap="round"
              strokeDasharray={`${dash} ${gap}`}
              style={{ transform: `rotate(${rotate}deg)`, transformOrigin: '48px 48px' }}
            />
          )
        })}
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ fontSize: 18, fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--text)', lineHeight: 1 }}>
          {Math.round(progress * 87)}
        </span>
        <span style={{ fontSize: 10, color: 'var(--text-dim)' }}>/100</span>
      </div>
    </div>
  )
}

function MetricBox({ metric, started }: { metric: Metric; started: boolean }) {
  const count = useCountUp(metric.value, 1600, started)
  return (
    <div style={{
      background: metric.bg, borderRadius: 14,
      padding: '16px 18px', border: `1px solid ${metric.color}22`,
    }}>
      <div style={{ fontSize: 11.5, color: 'var(--text-dim)', marginBottom: 10, fontFamily: 'var(--font-mono)' }}>
        {metric.label}
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 6 }}>
        <span style={{
          fontSize: 'clamp(20px,2.8vw,26px)', fontWeight: 800,
          fontFamily: 'var(--font-display)', color: metric.color,
          lineHeight: 1, fontVariantNumeric: 'tabular-nums',
        }}>
          {count.toLocaleString()}
        </span>
        <span style={{
          fontSize: 12, fontWeight: 700, color: metric.color,
          background: `${metric.color}18`, padding: '3px 8px', borderRadius: 999,
        }}>
          ↑ {metric.pct}%
        </span>
      </div>
    </div>
  )
}

export default function AIVisibilityScore({ externalStarted }: { externalStarted?: boolean } = {}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)

  // If a parent passes externalStarted, use it directly (bypasses IntersectionObserver
  // which fires too early when the card is inside a sticky scroll section).
  useEffect(() => {
    if (externalStarted) setStarted(true)
  }, [externalStarted])

  useEffect(() => {
    if (externalStarted !== undefined) return   // parent controls it
    const io = new IntersectionObserver(
      (e) => { if (e[0].isIntersecting) setStarted(true) },
      { threshold: 0.4 },
    )
    if (cardRef.current) io.observe(cardRef.current)
    return () => io.disconnect()
  }, [externalStarted])

  // Mouse-tracking 3D tilt
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 120, damping: 20 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 120, damping: 20 })

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    mouseX.set((e.clientX - r.left) / r.width  - 0.5)
    mouseY.set((e.clientY - r.top)  / r.height - 0.5)
  }, [mouseX, mouseY])

  const onMouseLeave = useCallback(() => {
    mouseX.set(0)
    mouseY.set(0)
  }, [mouseX, mouseY])

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.65, ease: [0.22, 0.8, 0.2, 1] }}
      style={{
        background: '#fff',
        border: '1px solid rgba(18,42,86,0.10)',
        borderRadius: 24,
        padding: 'clamp(24px,4vw,36px)',
        boxShadow: '0 16px 56px -20px rgba(18,42,86,0.14)',
        rotateX, rotateY,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        cursor: 'default',
        position: 'relative',
        zIndex: 2,
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28, gap: 16 }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(20px,3vw,26px)', color: 'var(--blue)', margin: 0, lineHeight: 1.15 }}>
            AI Visibility Score
          </h3>
          <p style={{ fontSize: 13, color: 'var(--text-dim)', margin: '6px 0 0' }}>Live snapshot</p>
        </div>
        <DonutChart started={started} />
      </div>

      {/* 2×2 metric grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {metrics.map((m) => <MetricBox key={m.label} metric={m} started={started} />)}
      </div>
    </motion.div>
  )
}
