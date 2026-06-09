'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import AIVisibilityScore from '@/components/ui/AIVisibilityScore'

// Two completely separate elements stacked in a relative container:
//
//   ┌──────────────────────────────┐
//   │  [VIDEO]  ← z-index: 0      │  slides out from behind on scroll
//   │  [CARD ]  ← z-index: 2      │  sits on top, fully independent
//   └──────────────────────────────┘
//
// On page load the video sits directly behind the card (invisible).
// As the section scrolls into view the video slides out to the right
// and down, revealing itself as a standalone promo element.

export default function AIScoreWithVideo() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  })

  // Video slides from behind card → fully revealed beside/below it
  const rawX = useTransform(scrollYProgress, [0, 1], [0, 260])
  const rawY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const rawS = useTransform(scrollYProgress, [0, 1], [0.88, 1])
  const rawO = useTransform(scrollYProgress, [0, 0.3, 1], [0, 0.6, 1])

  const videoX = useSpring(rawX, { stiffness: 60, damping: 20 })
  const videoY = useSpring(rawY, { stiffness: 60, damping: 20 })
  const videoScale   = useSpring(rawS, { stiffness: 60, damping: 20 })
  const videoOpacity = useSpring(rawO, { stiffness: 60, damping: 20 })

  return (
    <div
      ref={sectionRef}
      style={{
        position: 'relative',
        maxWidth: 700,
        margin: '0 auto',
        // Height accommodates card + video sliding down
        minHeight: 480,
      }}
    >
      {/* ── ELEMENT 1: Promotional video (behind, slides out) ── */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          maxWidth: 440,
          borderRadius: 20,
          overflow: 'hidden',
          zIndex: 0,
          x: videoX,
          y: videoY,
          scale: videoScale,
          opacity: videoOpacity,
          boxShadow: '0 24px 64px -16px rgba(18,42,86,0.28)',
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: '100%',
            display: 'block',
            borderRadius: 20,
          }}
          src="/score-bg.mp4"
        />
        {/* Promo label on the video */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '20px 18px 16px',
          background: 'linear-gradient(to top, rgba(8,15,30,0.85) 0%, transparent 100%)',
          borderRadius: '0 0 20px 20px',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            background: 'rgba(255,255,255,0.12)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 999,
            padding: '4px 12px',
            marginBottom: 8,
          }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#e23744', display: 'inline-block', animation: 'pulse 1.6s ease-in-out infinite' }} />
            <span style={{ color: '#fff', fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 600, letterSpacing: '0.08em' }}>
              PROMOTIONAL VIDEO
            </span>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, margin: 0, fontFamily: 'var(--font-body)' }}>
            Client spotlight — your brand here
          </p>
        </div>
      </motion.div>

      {/* ── ELEMENT 2: AI Visibility Card (on top, fully independent) ── */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <AIVisibilityScore />
      </div>
    </div>
  )
}
