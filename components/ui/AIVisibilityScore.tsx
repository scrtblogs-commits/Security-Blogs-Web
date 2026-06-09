'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// ⚠️  VIDEO: drop your background video at  public/score-bg.mp4
//     It autoplays muted and loops. The card tilts over it as you scroll.
//     If you don't have a video yet, the card still works — it just shows
//     the plain gradient background instead.

const rows = [
  { label: 'Content structure', value: 87, color: 'var(--blue)'   },
  { label: 'Entity authority',  value: 72, color: 'var(--violet)' },
  { label: 'Schema coverage',   value: 91, color: 'var(--green)'  },
  { label: 'AI citation rate',  value: 79, color: 'var(--red)'    },
]

export default function AIVisibilityScore() {
  const wrapRef  = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)

  // Intersection observer — starts the meter animations when card enters view
  useEffect(() => {
    const io = new IntersectionObserver(
      (e) => { if (e[0].isIntersecting) setShow(true) },
      { threshold: 0.3 },
    )
    if (wrapRef.current) io.observe(wrapRef.current)
    return () => io.disconnect()
  }, [])

  // Scroll-driven tilt — rotateX grows from 6° → 22° as you scroll past
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start end', 'end start'],
  })
  const rotateX      = useTransform(scrollYProgress, [0, 0.6],  [6,  22])
  const rotateY      = useTransform(scrollYProgress, [0, 1],    [-4,  4])
  const glassOpacity = useTransform(scrollYProgress, [0.15, 0.55], [0, 0.72])

  return (
    <div
      ref={wrapRef}
      style={{
        position: 'relative',
        maxWidth: 560,
        margin: '0 auto',
        perspective: 1200,
      }}
    >
      {/* ── Background video ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          zIndex: 0,
          background: 'linear-gradient(135deg, var(--blue), var(--violet))',
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
          src="/score-bg.mp4"
        />
        {/* Glassmorphism overlay — fades in on scroll */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            backdropFilter: 'blur(18px) saturate(180%)',
            WebkitBackdropFilter: 'blur(18px) saturate(180%)',
            background: 'rgba(255,255,255,0.52)',
            opacity: glassOpacity,
          }}
        />
      </div>

      {/* ── Tilting card ── */}
      <motion.div
        className="glass"
        style={{
          padding: 32,
          position: 'relative',
          zIndex: 1,
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="flex justify-between items-center" style={{ marginBottom: 24 }}>
          <div>
            <div className="eyebrow">AI Visibility Score</div>
            <div className="text-dim" style={{ fontSize: 13 }}>Live snapshot</div>
          </div>
          <div
            style={{
              fontSize: 52,
              fontWeight: 800,
              fontFamily: 'var(--font-display)',
              color: 'var(--blue)',
              lineHeight: 1,
            }}
          >
            87<span className="text-dim" style={{ fontSize: 20 }}>/100</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {rows.map((r) => (
            <div key={r.label}>
              <div
                className="flex justify-between"
                style={{ fontSize: 13, marginBottom: 7 }}
              >
                <span className="text-soft">{r.label}</span>
                <strong>{r.value}%</strong>
              </div>
              <div className="meter">
                <span
                  style={{
                    width: show ? `${r.value}%` : 0,
                    background: r.color,
                    transition: 'width 1.1s cubic-bezier(.2,.8,.2,1)',
                    display: 'block',
                    height: '100%',
                    borderRadius: 999,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div
          className="badge"
          style={{
            marginTop: 22,
            color: 'var(--green)',
            borderColor: 'rgba(30,158,117,0.3)',
            background: 'rgba(30,158,117,0.1)',
          }}
        >
          ↑ +180% organic
        </div>
      </motion.div>
    </div>
  )
}
