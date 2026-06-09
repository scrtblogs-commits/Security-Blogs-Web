'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

// Animated CSS background — no video file needed.
// Drop public/score-bg.mp4 later to use a real video instead.

const rows = [
  { label: 'Content structure', value: 87, color: 'var(--blue)'   },
  { label: 'Entity authority',  value: 72, color: 'var(--violet)' },
  { label: 'Schema coverage',   value: 91, color: 'var(--green)'  },
  { label: 'AI citation rate',  value: 79, color: 'var(--red)'    },
]

export default function AIVisibilityScore() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [show, setShow]   = useState(false)
  const [hasVideo, setHasVideo] = useState(false)

  // Meter animation — fires once when visible
  useEffect(() => {
    const io = new IntersectionObserver(
      (e) => { if (e[0].isIntersecting) setShow(true) },
      { threshold: 0.25 },
    )
    if (sectionRef.current) io.observe(sectionRef.current)
    return () => io.disconnect()
  }, [])

  // Check if the video file actually exists
  useEffect(() => {
    fetch('/score-bg.mp4', { method: 'HEAD' })
      .then((r) => { if (r.ok) setHasVideo(true) })
      .catch(() => {})
  }, [])

  // Scroll-based tilt — tracks this section's position in the viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  })

  // useSpring makes the tilt feel organic, not snappy
  const rawRotateX = useTransform(scrollYProgress, [0, 1], [14, 0])
  const rawRotateY = useTransform(scrollYProgress, [0, 1], [-6, 0])
  const glassOp    = useTransform(scrollYProgress, [0, 0.7], [0, 0.65])

  const rotateX = useSpring(rawRotateX, { stiffness: 60, damping: 18 })
  const rotateY = useSpring(rawRotateY, { stiffness: 60, damping: 18 })

  return (
    <div
      ref={sectionRef}
      style={{
        maxWidth: 600,
        margin: '0 auto',
        /* perspective must be on the PARENT of the element that rotates */
        perspective: 1400,
        perspectiveOrigin: '50% 50%',
      }}
    >
      {/* ── Animated / video background ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          zIndex: 0,
          background: 'linear-gradient(135deg, #0a1628 0%, #1e3a6e 50%, #0d1f44 100%)',
        }}
      >
        {hasVideo ? (
          <video
            autoPlay muted loop playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55 }}
            src="/score-bg.mp4"
          />
        ) : (
          /* CSS animated data-grid fallback */
          <div style={{ position: 'absolute', inset: 0 }}>
            <div className="score-grid-bg" />
            {/* Drifting orbs */}
            <div className="score-orb score-orb-1" />
            <div className="score-orb score-orb-2" />
            <div className="score-orb score-orb-3" />
          </div>
        )}

        {/* Glassmorphism overlay that deepens as you scroll */}
        <motion.div
          style={{
            position: 'absolute', inset: 0,
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            background: 'rgba(255,255,255,0.48)',
            opacity: glassOp,
          }}
        />
      </div>

      {/* ── Tilting glass card ── */}
      <motion.div
        className="glass"
        style={{
          padding: 'clamp(24px, 4vw, 36px)',
          position: 'relative',
          zIndex: 1,
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        {/* Header row */}
        <div className="flex justify-between items-center" style={{ marginBottom: 28 }}>
          <div>
            <div className="eyebrow">AI Visibility Score</div>
            <div className="text-dim" style={{ fontSize: 13, marginTop: 4 }}>Live snapshot</div>
          </div>
          <div style={{
            fontSize: 'clamp(42px, 6vw, 56px)',
            fontWeight: 800,
            fontFamily: 'var(--font-display)',
            color: 'var(--blue)',
            lineHeight: 1,
          }}>
            87<span className="text-dim" style={{ fontSize: 20 }}>/100</span>
          </div>
        </div>

        {/* Meters */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {rows.map((r) => (
            <div key={r.label}>
              <div className="flex justify-between" style={{ fontSize: 13, marginBottom: 8 }}>
                <span className="text-soft">{r.label}</span>
                <strong>{r.value}%</strong>
              </div>
              <div className="meter">
                <span style={{
                  display: 'block', height: '100%', borderRadius: 999,
                  width: show ? `${r.value}%` : '0%',
                  background: r.color,
                  transition: 'width 1.2s cubic-bezier(.2,.8,.2,1)',
                }} />
              </div>
            </div>
          ))}
        </div>

        <div className="badge" style={{
          marginTop: 24,
          color: 'var(--green)',
          borderColor: 'rgba(30,158,117,0.3)',
          background: 'rgba(30,158,117,0.1)',
        }}>
          ↑ +180% organic
        </div>
      </motion.div>

      <style>{`
        .score-grid-bg {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(30,95,224,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(30,95,224,0.15) 1px, transparent 1px);
          background-size: 36px 36px;
          animation: score-grid-scroll 12s linear infinite;
        }
        @keyframes score-grid-scroll {
          from { background-position: 0 0; }
          to   { background-position: 36px 36px; }
        }
        .score-orb {
          position: absolute; border-radius: 50%;
          filter: blur(50px); pointer-events: none;
        }
        .score-orb-1 {
          width: 240px; height: 240px; top: -40px; right: -40px;
          background: radial-gradient(circle, rgba(30,95,224,0.55), transparent 70%);
          animation: score-drift 8s ease-in-out infinite;
        }
        .score-orb-2 {
          width: 180px; height: 180px; bottom: -20px; left: 10%;
          background: radial-gradient(circle, rgba(111,77,255,0.45), transparent 70%);
          animation: score-drift 11s ease-in-out 2s infinite reverse;
        }
        .score-orb-3 {
          width: 140px; height: 140px; top: 30%; right: 20%;
          background: radial-gradient(circle, rgba(30,158,117,0.35), transparent 70%);
          animation: score-drift 9s ease-in-out 4s infinite;
        }
        @keyframes score-drift {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(20px,-20px) scale(1.15); }
        }
      `}</style>
    </div>
  )
}
