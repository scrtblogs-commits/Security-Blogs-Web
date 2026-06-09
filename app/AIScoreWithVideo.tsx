'use client'
import { useRef, useState, useEffect } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion'
import AIVisibilityScore from '@/components/ui/AIVisibilityScore'

// Scroll-driven 3D card flip:
//   Phase 1 (scroll 0–15%)  → Card slides up into view
//   Phase 2 (scroll 15–80%) → Card flips on Y-axis (0° → 180°), video revealed on back
//   Phase 3 (scroll 80–100%)→ Video fully visible, slight zoom
//
// The card and the video are the FRONT and BACK of one physical object.

export default function AIScoreWithVideo() {
  const outerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  })

  // ── Flip (0° = card, 180° = video) ──────────────────────────────────────
  const rawFlip = useTransform(scrollYProgress, [0.12, 0.82], [0, 180])
  const flip    = useSpring(rawFlip, { stiffness: 38, damping: 14 })

  // ── Scale dips at 90° midpoint — feels physical ─────────────────────────
  const rawScale = useTransform(scrollYProgress, [0.12, 0.47, 0.82], [1, 0.82, 1])
  const scale    = useSpring(rawScale, { stiffness: 38, damping: 14 })

  // ── Card slides up on entry ──────────────────────────────────────────────
  const rawEntryY = useTransform(scrollYProgress, [0, 0.12], [80, 0])
  const entryY    = useSpring(rawEntryY, { stiffness: 60, damping: 18 })
  const entryOp   = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  // ── Glow burst at flip midpoint ──────────────────────────────────────────
  const glowOp = useTransform(scrollYProgress, [0.38, 0.47, 0.56], [0, 1, 0])

  // ── Background orb colors shift from blue→violet during flip ────────────
  const bgProgress = useTransform(scrollYProgress, [0.12, 0.82], [0, 1])

  // ── Scroll hint fades out once flipping starts ───────────────────────────
  const hintOp = useTransform(scrollYProgress, [0, 0.12], [1, 0])

  // ── Trigger card counters only once user scrolls into this section ────────
  const [cardStarted, setCardStarted] = useState(false)
  useEffect(() => {
    return scrollYProgress.on('change', v => {
      if (v > 0.04) setCardStarted(true)
    })
  }, [scrollYProgress])

  return (
    <div
      ref={outerRef}
      style={{ height: '300vh', position: 'relative' }}
    >
      {/* ── Sticky viewport stage ── */}
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        perspective: 1500,
        perspectiveOrigin: '50% 48%',
        background: 'linear-gradient(160deg, #060d1f 0%, #0b1530 55%, #080f22 100%)',
      }}>

        {/* ── Dark section grid texture ── */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
        }} />

        {/* ── Animated ambient orbs in background ── */}
        <motion.div
          aria-hidden
          style={{
            position: 'absolute', inset: 0,
            pointerEvents: 'none', zIndex: 0,
            background: useTransform(
              bgProgress,
              [0, 0.5, 1],
              [
                'radial-gradient(ellipse 70% 60% at 30% 40%, rgba(30,95,224,0.13) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 80% 70%, rgba(111,77,255,0.08) 0%, transparent 65%)',
                'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(111,77,255,0.18) 0%, transparent 72%)',
                'radial-gradient(ellipse 70% 60% at 70% 40%, rgba(226,55,68,0.10) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 20% 70%, rgba(111,77,255,0.12) 0%, transparent 65%)',
              ]
            ),
          }}
        />

        {/* ── Glow ring burst at flip midpoint ── */}
        <motion.div
          aria-hidden
          style={{
            position: 'absolute',
            width: 600, height: 600,
            borderRadius: '50%',
            border: '1.5px solid rgba(30,95,224,0.5)',
            opacity: glowOp,
            scale: useTransform(scrollYProgress, [0.38, 0.47, 0.56], [0.6, 1.2, 1.6]),
            pointerEvents: 'none', zIndex: 1,
          }}
        />
        <motion.div
          aria-hidden
          style={{
            position: 'absolute',
            width: 400, height: 400,
            borderRadius: '50%',
            border: '2px solid rgba(111,77,255,0.6)',
            opacity: useTransform(scrollYProgress, [0.38, 0.47, 0.56], [0, 0.8, 0]),
            scale: useTransform(scrollYProgress, [0.38, 0.47, 0.56], [0.5, 1.1, 1.5]),
            pointerEvents: 'none', zIndex: 1,
          }}
        />

        {/* ── The flipping object ── */}
        <motion.div
          style={{
            y: entryY,
            opacity: entryOp,
            scale,
            rotateY: flip,
            transformStyle: 'preserve-3d',
            width: 'min(740px, 92vw)',
            height: 'min(640px, 88vh)',
            position: 'relative',
            zIndex: 5,
          }}
        >
          {/* FRONT — AI Visibility Card */}
          <div style={{
            position: 'absolute', inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            borderRadius: 24,
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              background: '#fff',
              borderRadius: 24,
              boxShadow: '0 32px 80px -20px rgba(18,42,86,0.22)',
              padding: 4,
            }}>
              <div style={{ width: '100%' }}>
                <AIVisibilityScore externalStarted={cardStarted} />
              </div>
            </div>
          </div>

          {/* BACK — Promotional video */}
          <div style={{
            position: 'absolute', inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            borderRadius: 24,
            overflow: 'hidden',
            boxShadow: '0 32px 80px -20px rgba(18,42,86,0.30)',
          }}>
            <video
              autoPlay muted loop playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              src="/score-bg.mp4"
            />

            {/* Dark gradient overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(160deg, rgba(8,15,30,0.25) 0%, rgba(8,15,30,0.75) 100%)',
            }} />

            {/* Video label bottom-left */}
            <div style={{ position: 'absolute', bottom: 28, left: 28, right: 28 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                background: 'rgba(255,255,255,0.14)',
                border: '1px solid rgba(255,255,255,0.24)',
                borderRadius: 999, padding: '5px 14px', marginBottom: 12,
              }}>
                <span style={{
                  width: 7, height: 7, borderRadius: '50%',
                  background: '#e23744', display: 'inline-block',
                  animation: 'pulse 1.6s ease-in-out infinite',
                }} />
                <span style={{ color: '#fff', fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 600, letterSpacing: '0.09em' }}>
                  PROMOTIONAL VIDEO
                </span>
              </div>
              <p style={{ color: '#fff', fontSize: 18, fontWeight: 700, fontFamily: 'var(--font-display)', margin: 0, lineHeight: 1.3 }}>
                Client spotlight<br />
                <span style={{ fontWeight: 400, fontSize: 14, color: 'rgba(255,255,255,0.72)' }}>
                  Showcase your brand to 50,000+ security professionals
                </span>
              </p>
            </div>

            {/* Top-right badge */}
            <div style={{
              position: 'absolute', top: 20, right: 20,
              background: 'rgba(30,95,224,0.85)',
              backdropFilter: 'blur(8px)',
              borderRadius: 12, padding: '8px 14px',
            }}>
              <span style={{ color: '#fff', fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                50K+ viewers
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── Scroll hint ── */}
        <motion.div
          style={{
            position: 'absolute', bottom: 32,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            opacity: hintOp, zIndex: 6, pointerEvents: 'none',
          }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: 28, height: 44, borderRadius: 999,
              border: '2px solid rgba(30,95,224,0.4)',
              display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
              padding: 6,
            }}
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--blue)' }}
            />
          </motion.div>
          <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', letterSpacing: '0.1em' }}>
            SCROLL TO FLIP
          </span>
        </motion.div>

      </div>
    </div>
  )
}
