'use client'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, MotionValue, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'

const SplineScene = dynamic(
  () => import('@/components/ui/splite').then(m => m.SplineScene),
  { ssr: false }
)

export type WorkflowStep = {
  step: string
  tag: string
  title: string
  color: string
  glow: string
  Scene: (props: { active: boolean; color: string }) => React.ReactElement | null
}

const GAP    = 32
const SPLINE = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode'

export default function ServiceWorkflowCards({
  steps,
  cardW = 660,
  cardH = 490,
  sideXOffset = 700,
  sectionBg = '#f8f9fb',
  footerSlot,
}: {
  steps: WorkflowStep[]
  cardW?: number
  cardH?: number
  sideXOffset?: number
  sectionBg?: string
  footerSlot?: React.ReactNode
}) {
  const outerRef = useRef<HTMLDivElement>(null)
  const [vw, setVw] = useState(1200)
  const [vh, setVh] = useState(800)

  useEffect(() => {
    const up = () => { setVw(window.innerWidth); setVh(window.innerHeight) }
    up()
    window.addEventListener('resize', up)
    return () => window.removeEventListener('resize', up)
  }, [])

  const total       = steps.length
  const hasFooter   = Boolean(footerSlot)
  // Phases: 1 intro + N cards + (1 footer if present)
  const totalPhases = 1 + total + (hasFooter ? 1 : 0)

  const { scrollYProgress } = useScroll({ target: outerRef, offset: ['start start', 'end end'] })

  // ── Scroll phase boundaries ──────────────────────────────
  const introEnd  = 1 / totalPhases                                       // ~0.17 for 4+footer
  const cardsEnd  = (1 + total) / totalPhases                             // ~0.83
  // footerEnd = 1.0

  // ── Entry overlay: fades out as intro phase ends ─────────
  const entryOp = useTransform(scrollYProgress, [introEnd * 0.55, introEnd], [1, 0])

  // ── Card progress: 0 … total (footer is index=total) ─────
  const rawCardP = useTransform(
    scrollYProgress,
    [introEnd, cardsEnd],
    [0, hasFooter ? total : total - 1]
  )
  const floatIdx = rawCardP

  // ── Horizontal strip position ─────────────────────────────
  // Center card in full viewport; footer card (width=vw) also centered
  const startX    = vw / 2 - cardW / 2
  const lastCardX = startX - (total - 1) * (cardW + GAP)
  // Footer needs the strip shifted one more step
  const footerX   = hasFooter ? startX - total * (cardW + GAP) : lastCardX
  const endX      = hasFooter ? footerX : lastCardX

  const rawX = useTransform(rawCardP, [0, hasFooter ? total : total - 1], [startX, endX])
  const x    = useSpring(rawX, { stiffness: 70, damping: 22, mass: 0.6 })

  // ── Card strip fade-in (enters during intro→card transition) ──
  const stripOp = useTransform(scrollYProgress, [introEnd * 0.75, introEnd], [0, 1])

  // ── Orb: center → left transition ───────────────────────────
  // Orb is absolutely positioned at 50%/50% of viewport; we translate it
  // From center (0,0) to left side during intro exit
  const rawOrbX = useTransform(
    scrollYProgress,
    [introEnd * 0.5, introEnd],
    [0, -(vw / 2 - 130)]
  )
  const orbX = useSpring(rawOrbX, { stiffness: 55, damping: 20 })

  const rawOrbScale = useTransform(scrollYProgress, [introEnd * 0.5, introEnd], [1, 0.52])
  const orbScale    = useSpring(rawOrbScale, { stiffness: 55, damping: 20 })

  const rawOrbOp = useTransform(
    scrollYProgress,
    hasFooter ? [cardsEnd * 0.95, cardsEnd] : [0.95, 1],
    [1, 0]
  )
  const orbOp = useSpring(rawOrbOp, { stiffness: 70, damping: 24 })

  // ── Nav/header fades out during footer phase ─────────────
  const navOp = useTransform(
    scrollYProgress,
    hasFooter ? [cardsEnd, cardsEnd + 0.04] : [0.96, 1],
    [1, 0]
  )

  // ── Footer slide-in: numeric spring then → % string ──────
  const rawFooterY    = useTransform(
    scrollYProgress,
    hasFooter ? [cardsEnd, 1] : [0.9, 1],
    [100, 0]
  )
  const footerYNum    = useSpring(rawFooterY, { stiffness: 90, damping: 26 })
  const footerY       = useTransform(footerYNum, (v: number) => `${v}%`)

  return (
    <div ref={outerRef} style={{ height: `${totalPhases * 100}vh`, position: 'relative' }}>
      <div style={{
        position: 'sticky', top: 0, height: '100vh', overflow: 'hidden',
        background: sectionBg,
      }}>

        {/* ── Subtle dot grid ── */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
          backgroundImage: 'radial-gradient(circle, rgba(111,77,255,0.07) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)',
        }} />

        {/* ── Ambient glow that follows active step color ── */}
        <GlowOrb floatIdx={floatIdx} steps={steps} />

        {/* ══════════════════════════════════════════════════
            ENTRY OVERLAY — visible only during intro phase
        ══════════════════════════════════════════════════ */}
        <motion.div
          style={{
            position: 'absolute', inset: 0, zIndex: 10,
            opacity: entryOp,
            pointerEvents: 'none', // so it doesn't block scroll
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 0,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ textAlign: 'center', maxWidth: 560, padding: '0 24px', zIndex: 2, position: 'relative' }}
          >
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 10.5,
              letterSpacing: '0.18em', color: 'rgba(111,77,255,0.7)',
              textTransform: 'uppercase', display: 'block', marginBottom: 14,
            }}>
              How It Works
            </span>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 800,
              color: 'var(--text, #0f2244)', lineHeight: 1.18,
              letterSpacing: '-0.025em', marginBottom: 16,
            }}>
              Your AI Visibility<br />
              <span style={{ color: '#6f4dff' }}>Journey Starts Here</span>
            </h2>
            <p style={{
              fontSize: 16, color: 'var(--text-soft, #46546e)',
              lineHeight: 1.65, marginBottom: 32, maxWidth: 440, marginInline: 'auto',
            }}>
              Scroll to step through each phase of our proven AIO process — from audit to citation growth.
            </p>
            {/* Scroll indicator */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, opacity: 0.55 }}
            >
              <div style={{
                width: 26, height: 42, borderRadius: 999,
                border: '2px solid rgba(111,77,255,0.4)',
                display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: 5,
              }}>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ width: 5, height: 5, borderRadius: '50%', background: '#6f4dff' }}
                />
              </div>
              <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: '#6f4dff', letterSpacing: '0.12em' }}>
                SCROLL TO BEGIN
              </span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ══════════════════════════════════════════════════
            3D ROBOT ORB — centered on entry, drifts left
        ══════════════════════════════════════════════════ */}
        <motion.div
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            translateX: '-50%',
            translateY: '-50%',
            x: orbX,
            scale: orbScale,
            opacity: orbOp,
            zIndex: 5,
            pointerEvents: 'none',
          }}
        >
          <RobotOrb />
        </motion.div>

        {/* ══════════════════════════════════════════════════
            CARD STRIP — fades in as intro exits
        ══════════════════════════════════════════════════ */}
        <motion.div style={{ opacity: stripOp }}>
          {/* Step label above cards */}
          <motion.div style={{
            position: 'absolute', top: 36, left: 0, right: 0,
            textAlign: 'center', zIndex: 6, opacity: navOp,
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.14em', color: 'rgba(111,77,255,0.55)', textTransform: 'uppercase' }}>
              How It Works
            </span>
            <div style={{ position: 'relative', height: 32, marginTop: 5 }}>
              {steps.map((s, i) => (
                <ActiveTitle key={i} index={i} floatIdx={floatIdx as MotionValue<number>} step={s} />
              ))}
            </div>
          </motion.div>

          {/* The horizontal strip */}
          <motion.div style={{
            x,
            position: 'absolute',
            top: `calc(50vh - ${cardH / 2}px + 12px)`,
            left: 0,
            display: 'flex',
            gap: GAP,
            willChange: 'transform',
          }}>
            {steps.map((s, i) => (
              <SceneCard
                key={i}
                index={i}
                floatIdx={floatIdx as MotionValue<number>}
                data={s}
                cardH={cardH}
                cardW={cardW}
                sideXOffset={sideXOffset}
              />
            ))}

            {/* Footer as the last "card" in the strip — width = full viewport */}
            {hasFooter && (
              <FooterCard cardH={cardH} vw={vw} floatIdx={floatIdx as MotionValue<number>} footerIdx={total}>
                {footerSlot}
              </FooterCard>
            )}
          </motion.div>

          {/* Step pills + scroll nudge */}
          <motion.div style={{
            opacity: navOp,
            position: 'absolute', bottom: 22, left: 0, right: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, zIndex: 6,
          }}>
            <div style={{ display: 'flex', gap: 8 }}>
              {steps.map((s, i) => (
                <StepPill key={i} index={i} floatIdx={floatIdx as MotionValue<number>} step={s} />
              ))}
              {hasFooter && (
                <FooterPill floatIdx={floatIdx as MotionValue<number>} footerIdx={total} />
              )}
            </div>
            <motion.div
              animate={{ opacity: [0.35, 0.9, 0.35] }}
              transition={{ duration: 2.4, repeat: Infinity }}
              style={{ display: 'flex', alignItems: 'center', gap: 6 }}
            >
              <span style={{ fontSize: 9.5, color: '#a0adc0', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
                SCROLL TO ADVANCE
              </span>
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.3, repeat: Infinity }}
                style={{ color: '#a0adc0', fontSize: 12 }}>→</motion.span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ══════════════════════════════════════════════════
            FOOTER PANEL — slides up from below
            (separate from footer "card" — this covers the
            full viewport when scroll reaches footer phase)
        ══════════════════════════════════════════════════ */}
        {hasFooter && (
          <motion.div
            style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '100%',
              y: footerY,
              zIndex: 30,
              overflowY: 'auto',
              background: 'var(--bg-soft, #f8f9fb)',
            }}
          >
            {footerSlot}
          </motion.div>
        )}
      </div>
    </div>
  )
}

/* ── Pure-CSS 3D robot orb — no external deps, premium look ── */
function RobotOrb() {
  return (
    <div style={{ width: 320, height: 320, position: 'relative' }}>
      {/* Outer ambient glow */}
      <div style={{
        position: 'absolute', inset: -40,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(111,77,255,0.12) 0%, transparent 70%)',
        animation: 'orb-breathe 4s ease-in-out infinite',
      }} />

      {/* Ring 1 — tilted X */}
      <div style={{
        position: 'absolute', inset: '8%',
        borderRadius: '50%',
        border: '1.5px solid rgba(111,77,255,0.25)',
        transform: 'rotateX(72deg)',
        animation: 'orb-ring-a 9s linear infinite',
      }}>
        <div style={{ position: 'absolute', top: -4, left: '50%', marginLeft: -4, width: 8, height: 8, borderRadius: '50%', background: '#a78bfa', boxShadow: '0 0 8px #a78bfa' }} />
      </div>

      {/* Ring 2 — tilted Y */}
      <div style={{
        position: 'absolute', inset: '8%',
        borderRadius: '50%',
        border: '1.5px solid rgba(30,95,224,0.22)',
        transform: 'rotateY(65deg)',
        animation: 'orb-ring-b 12s linear infinite reverse',
      }}>
        <div style={{ position: 'absolute', bottom: -4, right: '20%', width: 7, height: 7, borderRadius: '50%', background: '#60a5fa', boxShadow: '0 0 8px #60a5fa' }} />
      </div>

      {/* Ring 3 — equatorial */}
      <div style={{
        position: 'absolute', inset: '15%',
        borderRadius: '50%',
        border: '1px solid rgba(111,77,255,0.15)',
        transform: 'rotateX(10deg) rotateZ(25deg)',
        animation: 'orb-ring-c 7s linear infinite',
      }} />

      {/* Core sphere */}
      <div style={{
        position: 'absolute', inset: '28%',
        borderRadius: '50%',
        background: 'radial-gradient(circle at 36% 32%, #c4b5fd, #6f4dff 45%, #1e5fe0 80%)',
        boxShadow: '0 0 32px rgba(111,77,255,0.5), 0 0 64px rgba(111,77,255,0.18), inset 0 0 24px rgba(255,255,255,0.12)',
        animation: 'orb-breathe 3.2s ease-in-out infinite',
      }}>
        {/* Inner highlight */}
        <div style={{
          position: 'absolute', top: '18%', left: '20%',
          width: '30%', height: '22%',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.28)',
          filter: 'blur(3px)',
        }} />
      </div>

      {/* Floating data nodes */}
      {[
        { top: '10%', left: '72%', delay: '0s',   size: 6,  color: '#a78bfa' },
        { top: '78%', left: '15%', delay: '0.8s', size: 5,  color: '#60a5fa' },
        { top: '20%', left: '8%',  delay: '1.4s', size: 4,  color: '#34d399' },
        { top: '65%', left: '80%', delay: '0.4s', size: 5,  color: '#f472b6' },
        { top: '88%', left: '55%', delay: '1.8s', size: 4,  color: '#a78bfa' },
      ].map((n, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: n.top, left: n.left,
          width: n.size, height: n.size,
          borderRadius: '50%',
          background: n.color,
          boxShadow: `0 0 6px ${n.color}`,
          animation: `orb-float-node 3.5s ease-in-out infinite`,
          animationDelay: n.delay,
        }} />
      ))}

      {/* CSS keyframes */}
      <style>{`
        @keyframes orb-breathe {
          0%,100% { transform: scale(1); }
          50%      { transform: scale(1.06); }
        }
        @keyframes orb-ring-a {
          from { transform: rotateX(72deg) rotateZ(0deg); }
          to   { transform: rotateX(72deg) rotateZ(360deg); }
        }
        @keyframes orb-ring-b {
          from { transform: rotateY(65deg) rotateZ(0deg); }
          to   { transform: rotateY(65deg) rotateZ(360deg); }
        }
        @keyframes orb-ring-c {
          from { transform: rotateX(10deg) rotateZ(25deg); }
          to   { transform: rotateX(10deg) rotateZ(385deg); }
        }
        @keyframes orb-float-node {
          0%,100% { transform: translateY(0px) scale(1); opacity: 0.8; }
          50%      { transform: translateY(-8px) scale(1.3); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="orb-"], [style*="orb-"] * { animation: none !important; }
        }
      `}</style>
    </div>
  )
}

/* ── Footer card — rendered in the strip as last slide ── */
function FooterCard({ cardH, vw, floatIdx, footerIdx, children }: {
  cardH: number; vw: number; floatIdx: MotionValue<number>; footerIdx: number; children: React.ReactNode
}) {
  const opacity = useTransform(floatIdx, (fi: number) => {
    const d = Math.abs(footerIdx - fi)
    return d < 0.05 ? 1 : d < 1.5 ? 1 - d * 0.35 : 0
  })
  const scale = useTransform(floatIdx, (fi: number) => {
    const d = Math.abs(footerIdx - fi)
    return d < 0.05 ? 1 : Math.max(0.9, 1 - d * 0.05)
  })

  return (
    <motion.div style={{ scale, opacity, flexShrink: 0 }}>
      <div style={{
        width: vw,
        height: cardH,
        borderRadius: '28px 28px 0 0',
        overflow: 'hidden',
        background: 'var(--bg-soft, #f8f9fb)',
        border: '1.5px solid rgba(111,77,255,0.12)',
        boxShadow: '0 -8px 40px -12px rgba(111,77,255,0.12)',
        overflowY: 'auto',
      }}>
        {children}
      </div>
    </motion.div>
  )
}

/* ── Ambient glow orb ── */
function GlowOrb({ floatIdx, steps }: { floatIdx: MotionValue<number>; steps: WorkflowStep[] }) {
  const [col, setCol] = useState(steps[0].glow)
  useEffect(() => {
    const unsub = floatIdx.on('change', (fi: number) => {
      const i = Math.round(Math.max(0, Math.min(steps.length - 1, fi)))
      setCol(steps[i].glow)
    })
    return unsub
  }, [floatIdx, steps])
  return (
    <div aria-hidden style={{
      position: 'absolute', top: '40%', left: '50%',
      transform: 'translate(-50%,-50%)',
      width: 700, height: 700, borderRadius: '50%',
      background: col, filter: 'blur(160px)',
      opacity: 0.06, transition: 'background 1s ease',
      pointerEvents: 'none', zIndex: 0,
    }} />
  )
}

/* ── Animated step title ── */
function ActiveTitle({ index, floatIdx, step }: { key?: React.Key; index: number; floatIdx: MotionValue<number>; step: WorkflowStep }) {
  const opacity = useTransform(floatIdx, (fi: number) => Math.abs(index - fi) < 0.45 ? 1 : 0)
  const y       = useTransform(floatIdx, (fi: number) => Math.abs(index - fi) < 0.45 ? 0 : 8)
  return (
    <motion.div style={{ position: 'absolute', inset: 0, opacity, y, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: step.color, opacity: 0.85 }}>{step.tag}</span>
      <span style={{ color: 'rgba(15,34,68,0.15)' }}>·</span>
      <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--text, #0f2244)' }}>{step.title}</span>
    </motion.div>
  )
}

/* ── Step progress pill ── */
function StepPill({ index, floatIdx, step }: { key?: React.Key; index: number; floatIdx: MotionValue<number>; step: WorkflowStep }) {
  const [active, setActive] = useState(index === 0)
  useEffect(() => {
    const unsub = floatIdx.on('change', (fi: number) => setActive(Math.abs(index - fi) < 0.45))
    return unsub
  }, [floatIdx, index])
  return (
    <div style={{
      padding: '5px 12px', borderRadius: 999, fontSize: 10,
      fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '0.08em',
      transition: 'all 0.4s ease',
      background: active ? step.color : 'rgba(15,34,68,0.06)',
      color: active ? '#fff' : '#8896af',
      border: `1px solid ${active ? step.color : 'rgba(15,34,68,0.10)'}`,
      boxShadow: active ? `0 0 18px -4px ${step.glow}` : 'none',
    }}>
      {step.step}
    </div>
  )
}

/* ── Footer progress pill ── */
function FooterPill({ floatIdx, footerIdx }: { floatIdx: MotionValue<number>; footerIdx: number }) {
  const [active, setActive] = useState(false)
  useEffect(() => {
    const unsub = floatIdx.on('change', (fi: number) => setActive(Math.abs(footerIdx - fi) < 0.45))
    return unsub
  }, [floatIdx, footerIdx])
  return (
    <div style={{
      padding: '5px 12px', borderRadius: 999, fontSize: 10,
      fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '0.08em',
      transition: 'all 0.4s ease',
      background: active ? '#6f4dff' : 'rgba(15,34,68,0.06)',
      color: active ? '#fff' : '#8896af',
      border: `1px solid ${active ? '#6f4dff' : 'rgba(15,34,68,0.10)'}`,
    }}>
      05
    </div>
  )
}

/* ── Scene card ── */
function SceneCard({ index, floatIdx, data, cardH, cardW, sideXOffset }: {
  key?: React.Key; index: number; floatIdx: MotionValue<number>; data: WorkflowStep; cardH: number; cardW: number; sideXOffset: number
}) {
  const [active, setActive] = useState(index === 0)
  useEffect(() => {
    const unsub = floatIdx.on('change', (fi: number) => setActive(Math.abs(index - fi) < 0.4))
    return unsub
  }, [floatIdx, index])

  const scale   = useTransform(floatIdx, (fi: number) => { const d = Math.abs(index - fi); return d < 0.05 ? 1 : d < 1 ? 1 - d * 0.05 : 0.9 })
  const opacity = useTransform(floatIdx, (fi: number) => { const d = Math.abs(index - fi); return d < 0.05 ? 1 : d < 1.5 ? 1 - d * 0.25 : 0.15 })
  const shadow  = useTransform(floatIdx, (fi: number) =>
    Math.abs(index - fi) < 0.3
      ? `0 0 60px -20px ${data.glow}, 0 0 0 1.5px ${data.color}30, 0 24px 60px -16px rgba(18,42,86,0.12)`
      : '0 4px 28px -8px rgba(18,42,86,0.08), 0 0 0 1px rgba(18,42,86,0.06)'
  )
  const { Scene } = data

  return (
    <motion.div style={{ scale, opacity, flexShrink: 0 }}>
      <motion.div style={{
        width: cardW, height: cardH,
        borderRadius: 24, overflow: 'hidden',
        boxShadow: shadow,
        background: '#fff',
        border: `1px solid ${data.color}18`,
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 3,
          background: `linear-gradient(90deg, transparent 5%, ${data.color} 50%, transparent 95%)`,
          opacity: active ? 1 : 0.2, transition: 'opacity 0.5s',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(160deg, ${data.color}05 0%, transparent 50%)`,
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: 16, right: 16, zIndex: 10,
          fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
          color: data.color, letterSpacing: '0.1em',
          background: `${data.color}10`, border: `1px solid ${data.color}28`,
          borderRadius: 7, padding: '3px 8px',
        }}>
          {data.tag}
        </div>
        <Scene active={active} color={data.color} />
      </motion.div>
    </motion.div>
  )
}
