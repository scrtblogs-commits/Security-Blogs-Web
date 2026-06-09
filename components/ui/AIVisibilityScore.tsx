'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

// ─── Types ────────────────────────────────────────────────────────────────────
type Metric = { label: string; value: number; pct: number; color: string; bg: string }

// ─── Data ─────────────────────────────────────────────────────────────────────
const metrics: Metric[] = [
  { label: 'Content structure', value: 3671, pct: 87, color: '#1e9e75', bg: 'rgba(30,158,117,0.08)' },
  { label: 'Entity authority',  value: 3671, pct: 87, color: '#1e5fe0', bg: 'rgba(30,95,224,0.08)'  },
  { label: 'AI citation rate',  value: 3671, pct: 93, color: '#e23744', bg: 'rgba(226,55,68,0.08)'  },
  { label: 'Schema coverage',   value: 3671, pct: 87, color: '#6f4dff', bg: 'rgba(111,77,255,0.08)' },
]

// Donut segments — must sum to 1.0
const DONUT_R    = 38
const DONUT_CIRC = 2 * Math.PI * DONUT_R   // 238.76
const segments   = [
  { share: 0.35, color: '#1e9e75' },
  { share: 0.25, color: '#1e5fe0' },
  { share: 0.22, color: '#e23744' },
  { share: 0.18, color: '#6f4dff' },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────
function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

function useCountUp(target: number, duration = 1800, started = false) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!started) return
    let start: number | null = null
    let raf: number
    const step = (ts: number) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      setVal(Math.round(easeOutExpo(progress) * target))
      if (progress < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, duration, started])
  return val
}

// ─── Donut chart with build animation ─────────────────────────────────────────
function DonutChart({ started }: { started: boolean }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!started) return
    let start: number | null = null
    let raf: number
    const duration = 1600
    const step = (ts: number) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      setProgress(easeOutExpo(p))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [started])

  let rotationOffset = 0

  return (
    <div style={{ position: 'relative', width: 96, height: 96, flexShrink: 0 }}>
      <svg width={96} height={96} viewBox="0 0 96 96" style={{ transform: 'rotate(-90deg)' }}>
        {/* Background track */}
        <circle cx={48} cy={48} r={DONUT_R} fill="none" stroke="#f0f4ff" strokeWidth={11} />

        {segments.map((seg, i) => {
          const visibleShare = seg.share * progress
          const dash  = visibleShare * DONUT_CIRC
          const gap   = DONUT_CIRC - dash
          const rotate = rotationOffset * 360
          rotationOffset += seg.share

          return (
            <circle
              key={i}
              cx={48} cy={48} r={DONUT_R}
              fill="none"
              stroke={seg.color}
              strokeWidth={11}
              strokeLinecap="round"
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={0}
              style={{
                transform: `rotate(${rotate}deg)`,
                transformOrigin: '48px 48px',
              }}
            />
          )
        })}
      </svg>

      {/* Centre label — counts up from 0 to 87 */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{
          fontSize: 18, fontWeight: 800,
          fontFamily: 'var(--font-display)',
          color: 'var(--text)', lineHeight: 1,
        }}>
          {Math.round(progress * 87)}
        </span>
        <span style={{ fontSize: 10, color: 'var(--text-dim)', lineHeight: 1.3 }}>/100</span>
      </div>
    </div>
  )
}

// ─── Single metric box ────────────────────────────────────────────────────────
function MetricBox({ metric, started }: { metric: Metric; started: boolean }) {
  const count = useCountUp(metric.value, 1600, started)
  return (
    <div style={{
      background: metric.bg,
      borderRadius: 14,
      padding: '16px 18px',
      border: `1px solid ${metric.color}22`,
    }}>
      <div style={{
        fontSize: 11.5,
        color: 'var(--text-dim)',
        marginBottom: 10,
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.03em',
      }}>
        {metric.label}
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 6 }}>
        <span style={{
          fontSize: 'clamp(20px,2.8vw,26px)',
          fontWeight: 800,
          fontFamily: 'var(--font-display)',
          color: metric.color,
          lineHeight: 1,
          fontVariantNumeric: 'tabular-nums',
        }}>
          {count.toLocaleString()}
        </span>
        <span style={{
          fontSize: 12, fontWeight: 700,
          color: metric.color,
          background: `${metric.color}18`,
          padding: '3px 8px',
          borderRadius: 999,
          whiteSpace: 'nowrap',
        }}>
          ↑ {metric.pct}%
        </span>
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function AIVisibilityScore() {
  const cardRef  = useRef<HTMLDivElement>(null)
  const [started, setStarted]   = useState(false)
  const [hovered, setHovered]   = useState(false)

  // Trigger animations when card enters viewport
  useEffect(() => {
    const io = new IntersectionObserver(
      (e) => { if (e[0].isIntersecting) setStarted(true) },
      { threshold: 0.3 },
    )
    if (cardRef.current) io.observe(cardRef.current)
    return () => io.disconnect()
  }, [])

  // ── Mouse-tracking tilt ──────────────────────────────────────────────────
  const mouseX      = useMotionValue(0)
  const mouseY      = useMotionValue(0)
  // Video is always visible (0.28 rest, 1.0 on hover)
  const videoTarget = useMotionValue(0.28)

  const rotateX      = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), { stiffness: 120, damping: 20 })
  const rotateY      = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { stiffness: 120, damping: 20 })
  const videoOpacity = useSpring(videoTarget, { stiffness: 80, damping: 18 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top)  / rect.height - 0.5)
  }, [mouseX, mouseY])

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0)
    mouseY.set(0)
    setHovered(false)
    videoTarget.set(0.28)
  }, [mouseX, mouseY, videoTarget])

  return (
    <div
      style={{
        maxWidth: 640,
        margin: '0 auto',
        perspective: 1200,
        perspectiveOrigin: '50% 50%',
      }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => { setHovered(true); videoTarget.set(1.0) }}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.65, ease: [0.22, 0.8, 0.2, 1] }}
        style={{
          position: 'relative',
          background: '#fff',
          border: '1px solid rgba(18,42,86,0.10)',
          borderRadius: 24,
          padding: 'clamp(24px,4vw,36px)',
          boxShadow: '0 16px 56px -20px rgba(18,42,86,0.14)',
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          overflow: 'hidden',
          cursor: 'default',
        }}
      >
        {/* ── Video background — fades in on hover / tilt ── */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            opacity: videoOpacity,
            borderRadius: 24,
            overflow: 'hidden',
            pointerEvents: 'none',
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 1,
            }}
            src="/score-bg.mp4"
          />
          {/* Frosted glass overlay so card content stays readable */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(255,255,255,0.45)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
          }} />
        </motion.div>

        {/* ── Card content (above video) ── */}
        <div style={{ position: 'relative', zIndex: 1 }}>

          {/* Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 28,
            gap: 16,
          }}>
            <div>
              <h3 style={{
                fontFamily: 'var(--font-display)', fontWeight: 800,
                fontSize: 'clamp(20px,3vw,26px)', color: 'var(--blue)',
                margin: 0, lineHeight: 1.15,
              }}>
                AI Visibility Score
              </h3>
              <p style={{ fontSize: 13, color: 'var(--text-dim)', margin: '6px 0 0' }}>
                Live snapshot
              </p>
            </div>
            <DonutChart started={started} />
          </div>

          {/* 2×2 metric grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 12,
          }}>
            {metrics.map((m) => (
              <MetricBox key={m.label} metric={m} started={started} />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
