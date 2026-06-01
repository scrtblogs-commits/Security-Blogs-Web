'use client'
import { motion, MotionValue, useTransform } from 'framer-motion'

// Stage 0 (0 -> ~0.18 scroll): clean sky-blue gradient with drifting cloud
// shapes. As progress moves past 0.10, clouds part (move outward and fade)
// to reveal the globe layer underneath. Pure CSS/SVG — zero asset weight.
export default function CloudOpening({ progress }: { progress: MotionValue<number> }) {
  // Background sky fades from full opacity to 0 between 0.12 -> 0.22.
  const skyOpacity = useTransform(progress, [0, 0.12, 0.22], [1, 1, 0])
  // Clouds part outward and fade. We combine "scroll-driven part" with a
  // slow continuous drift so they feel alive even when the user isn't scrolling.
  const leftX = useTransform(progress, [0, 0.18, 1], [0, -260, -300])
  const rightX = useTransform(progress, [0, 0.18, 1], [0, 260, 300])
  const cloudsOpacity = useTransform(progress, [0, 0.10, 0.20], [1, 1, 0])
  const heroOpacity = useTransform(progress, [0, 0.05, 0.12], [1, 1, 0])
  const heroY = useTransform(progress, [0, 0.12], [0, -40])

  return (
    <motion.div
      aria-hidden
      style={{
        position: 'absolute', inset: 0,
        opacity: skyOpacity,
        background:
          'linear-gradient(180deg, #c9e4ff 0%, #e7f3ff 35%, #ffffff 70%, #f0f7ff 100%)',
        zIndex: 5,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Sun glow */}
      <div
        style={{
          position: 'absolute', top: '6%', left: '50%', transform: 'translateX(-50%)',
          width: 420, height: 420, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,247,200,0.55) 0%, rgba(255,236,160,0.18) 40%, transparent 70%)',
          filter: 'blur(8px)',
        }}
      />

      {/* Left-side cloud group */}
      <motion.div
        style={{
          position: 'absolute', top: '18%', left: '-2%', display: 'flex', gap: 30,
          x: leftX,
          opacity: cloudsOpacity,
        }}
      >
        <Cloud w={220} blur={3} />
        <Cloud w={160} blur={2} />
      </motion.div>

      {/* Right-side cloud group */}
      <motion.div
        style={{
          position: 'absolute', top: '32%', right: '-2%', display: 'flex', gap: 30,
          x: rightX,
          opacity: cloudsOpacity,
        }}
      >
        <Cloud w={180} blur={2} />
        <Cloud w={240} blur={3.5} />
      </motion.div>

      {/* Centre wisp */}
      <motion.div
        style={{
          position: 'absolute', top: '52%', left: '32%',
          opacity: cloudsOpacity,
        }}
      >
        <Cloud w={300} blur={5} />
      </motion.div>

      {/* Top-aligned headline (fades out as we descend) */}
      <motion.div
        style={{
          position: 'absolute', top: '46%', left: '50%',
          translateX: '-50%', translateY: '-50%',
          y: heroY,
          textAlign: 'center',
          color: '#0f2244',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          opacity: heroOpacity,
          pointerEvents: 'none',
          width: 'min(720px, 92vw)',
        }}
      >
        <div style={{ fontSize: 12.5, letterSpacing: 2.5, color: '#1e5fe0', fontWeight: 600, marginBottom: 12 }}>
          ● LIVE AI VISIBILITY ENGINE
        </div>
        <h1 style={{ fontSize: 'clamp(34px, 5.4vw, 72px)', lineHeight: 1.05, margin: 0, color: '#0f2244', fontWeight: 700 }}>
          Find where your brand<br />
          is <span style={{ color: '#1e5fe0', fontStyle: 'italic' }}>invisible</span>.
        </h1>
        <p style={{ marginTop: 18, fontSize: 16, color: '#46546e', maxWidth: 540, marginInline: 'auto' }}>
          Scroll down. We&apos;ll fly you from orbit to your street and show you exactly where customers don&apos;t see you.
        </p>
        <div style={{ marginTop: 26, fontSize: 12, color: '#5f6f8a', fontFamily: 'var(--font-mono, monospace)' }}>
          ↓ Scroll to begin
        </div>
      </motion.div>
    </motion.div>
  )
}

function Cloud({ w, blur = 2 }: { w: number; blur?: number }) {
  return (
    <svg viewBox="0 0 200 80" width={w} style={{ filter: `blur(${blur}px)`, opacity: 0.95 }}>
      <defs>
        <linearGradient id={`cg-${w}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="100%" stopColor="#e3edff" stopOpacity="0.95" />
        </linearGradient>
      </defs>
      <path
        d="M30 60 Q15 60 15 45 Q15 30 33 30 Q33 14 55 14 Q72 14 76 30 Q92 18 110 28 Q130 14 148 32 Q174 30 178 50 Q188 56 178 66 Q172 70 30 60 Z"
        fill={`url(#cg-${w})`}
      />
    </svg>
  )
}
