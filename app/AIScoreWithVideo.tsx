'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import AIVisibilityScore from '@/components/ui/AIVisibilityScore'

// Layout:
//   Left  → AI Visibility Card (tilts on scroll, NO video inside)
//   Right → Promo video slides UP from below as you scroll past the card
//
// Both elements are fully independent — card never touches the video.

export default function AIScoreWithVideo() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // ── Card tilt driven by scroll (not hover) ──────────────────────────────
  // As the section enters the viewport the card tips forward, then levels off
  const rawTiltX = useTransform(scrollYProgress, [0, 0.45, 0.7], [18, 4, 0])
  const rawTiltY = useTransform(scrollYProgress, [0, 0.45, 0.7], [-6, -2, 0])
  const cardTiltX = useSpring(rawTiltX, { stiffness: 50, damping: 16 })
  const cardTiltY = useSpring(rawTiltY, { stiffness: 50, damping: 16 })

  // ── Video slides UP from below as you scroll ────────────────────────────
  // Starts 120px below its final position, invisible → rises into view
  const rawVideoY  = useTransform(scrollYProgress, [0.25, 0.65], [140, 0])
  const rawVideoOp = useTransform(scrollYProgress, [0.25, 0.55], [0, 1])
  const videoY  = useSpring(rawVideoY,  { stiffness: 55, damping: 18 })
  const videoOp = useSpring(rawVideoOp, { stiffness: 55, damping: 18 })

  return (
    <div
      ref={sectionRef}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 40,
        alignItems: 'center',
        maxWidth: 1000,
        margin: '0 auto',
      }}
    >
      {/* ── LEFT: AI Visibility Card — tilts on scroll, clean, no video ── */}
      <div style={{ perspective: 1200 }}>
        <motion.div
          style={{
            rotateX: cardTiltX,
            rotateY: cardTiltY,
            transformStyle: 'preserve-3d',
          }}
        >
          <AIVisibilityScore />
        </motion.div>
      </div>

      {/* ── RIGHT: Promo video — completely separate, slides up on scroll ── */}
      <motion.div
        style={{
          y: videoY,
          opacity: videoOp,
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: '0 28px 72px -16px rgba(18,42,86,0.26)',
          position: 'relative',
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{ width: '100%', display: 'block', borderRadius: 20 }}
          src="/score-bg.mp4"
        />

        {/* Overlay label at bottom */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '32px 20px 18px',
          background: 'linear-gradient(to top, rgba(8,15,30,0.88) 0%, transparent 100%)',
          borderRadius: '0 0 20px 20px',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            background: 'rgba(255,255,255,0.12)',
            border: '1px solid rgba(255,255,255,0.22)',
            borderRadius: 999, padding: '4px 12px', marginBottom: 8,
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: '50%',
              background: '#e23744', display: 'inline-block',
              animation: 'pulse 1.6s ease-in-out infinite',
            }} />
            <span style={{
              color: '#fff', fontSize: 11,
              fontFamily: 'var(--font-mono)', fontWeight: 600,
              letterSpacing: '0.08em',
            }}>
              PROMOTIONAL VIDEO
            </span>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: 13, margin: 0 }}>
            Client spotlight · your brand here
          </p>
        </div>
      </motion.div>

      {/* Responsive: stack on mobile */}
      <style>{`
        @media (max-width: 720px) {
          .ai-score-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
