'use client'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, MotionValue, AnimatePresence } from 'framer-motion'

export type WorkflowStep = {
  step: string
  tag: string
  title: string
  color: string
  glow: string
  Scene: (props: { active: boolean; color: string }) => React.ReactElement | null
}

const GAP = 32

export default function ServiceWorkflowCards({
  steps,
  cardW = 660,
  cardH = 490,
  sideXOffset = 700,
  sectionBg = '#ffffff',
  footerSlot,
}: {
  steps: WorkflowStep[]
  cardW?: number
  cardH?: number
  sideXOffset?: number
  sectionBg?: string
  footerSlot?: React.ReactNode
}) {
  const outerRef  = useRef<HTMLDivElement>(null)
  const [vw, setVw] = useState(1200)
  // "entered" = user has clicked the first card; unlocks full scroll experience
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    const up = () => setVw(window.innerWidth)
    up()
    window.addEventListener('resize', up)
    return () => window.removeEventListener('resize', up)
  }, [])

  // Footer counts as one extra slide when provided
  const hasFooter  = Boolean(footerSlot)
  const total      = steps.length
  // scrollable phases: one per card + one for footer
  const totalPhases = total + (hasFooter ? 1 : 0)

  const { scrollYProgress } = useScroll({ target: outerRef, offset: ['start start', 'end end'] })

  // Map scroll to card index (0 … total-1)
  const cardProgress = useTransform(scrollYProgress, [0, hasFooter ? total / totalPhases : 1], [0, total - 1])
  const floatIdx     = cardProgress

  const startX = vw / 2 - cardW / 2
  const endX   = startX - (total - 1) * (cardW + GAP)
  const rawX   = useTransform(cardProgress, [0, total - 1], [startX, endX])
  const x      = useSpring(rawX, { stiffness: 70, damping: 22, mass: 0.6 })

  // Footer slide-up: last phase (footerProgress 0→1)
  const footerProgress = hasFooter
    ? useTransform(scrollYProgress, [total / totalPhases, 1], [0, 1])
    : null
  const footerY = footerProgress
    ? useSpring(useTransform(footerProgress, [0, 1], ['100%', '0%']), { stiffness: 80, damping: 24 })
    : null

  // Header fades out as footer comes in
  const headerOp = footerProgress
    ? useTransform(footerProgress, [0, 0.3], [1, 0])
    : undefined
  const navOp = headerOp

  // Click the first card: scroll outerRef to top of viewport to "enter"
  function handleEnter() {
    if (!outerRef.current) return
    const rect = outerRef.current.getBoundingClientRect()
    if (rect.top !== 0) {
      outerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setEntered(true)
  }

  return (
    <div ref={outerRef} style={{ height: `${totalPhases * 100}vh`, position: 'relative' }}>
      <div style={{
        position: 'sticky', top: 0, height: '100vh', overflow: 'hidden',
        background: sectionBg,
        display: 'flex', flexDirection: 'column',
      }}>

        {/* Dot grid texture */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, rgba(30,95,224,0.09) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)',
        }} />

        <GlowOrb floatIdx={floatIdx} steps={steps} />

        {/* Header — fades out when footer arrives */}
        <motion.div style={{ opacity: headerOp, textAlign: 'center', paddingTop: 42, flexShrink: 0, position: 'relative', zIndex: 2 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', color: '#8896af', textTransform: 'uppercase' }}>
            How It Works
          </span>
          <div style={{ position: 'relative', height: 34, marginTop: 6 }}>
            {steps.map((s, i) => (
              <ActiveTitle key={i} index={i} floatIdx={floatIdx as MotionValue<number>} step={s} />
            ))}
          </div>
        </motion.div>

        {/* Card strip */}
        <motion.div style={{
          x,
          position: 'absolute',
          top: `calc(50vh - ${cardH / 2}px + 14px)`,
          left: 0, display: 'flex', gap: GAP, willChange: 'transform',
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
              onEnterClick={i === 0 ? handleEnter : undefined}
              entered={entered}
            />
          ))}
        </motion.div>

        {/* Bottom nav — fades out with header */}
        <motion.div style={{ opacity: navOp, position: 'absolute', bottom: 26, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, zIndex: 2 }}>
          <div style={{ display: 'flex', gap: 10 }}>
            {steps.map((s, i) => <StepPill key={i} index={i} floatIdx={floatIdx as MotionValue<number>} step={s} />)}
          </div>
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2.2, repeat: Infinity }}
            style={{ display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <span style={{ fontSize: 9.5, color: '#a0adc0', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
              SCROLL THROUGH JOURNEY
            </span>
            <motion.span animate={{ x: [0, 6, 0] }} transition={{ duration: 1.3, repeat: Infinity }}
              style={{ color: '#a0adc0', fontSize: 13 }}>→</motion.span>
          </motion.div>
        </motion.div>

        {/* Footer slide — slides up from below after all cards are done */}
        {hasFooter && footerY && (
          <motion.div
            style={{
              position: 'absolute', inset: 0,
              y: footerY,
              zIndex: 20,
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
      position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)',
      width: 600, height: 600, borderRadius: '50%',
      background: col, filter: 'blur(140px)',
      opacity: 0.07, transition: 'background 0.8s ease', pointerEvents: 'none', zIndex: 0,
    }} />
  )
}

function ActiveTitle({ index, floatIdx, step }: { key?: React.Key; index: number; floatIdx: MotionValue<number>; step: WorkflowStep }) {
  const opacity = useTransform(floatIdx, (fi: number) => Math.abs(index - fi) < 0.45 ? 1 : 0)
  const y       = useTransform(floatIdx, (fi: number) => Math.abs(index - fi) < 0.45 ? 0 : 8)
  return (
    <motion.div style={{ position: 'absolute', inset: 0, opacity, y, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: step.color, opacity: 0.9 }}>{step.tag}</span>
      <span style={{ color: 'rgba(15,34,68,0.18)' }}>·</span>
      <span style={{ fontSize: 18, fontWeight: 700, color: '#0f2244' }}>{step.title}</span>
    </motion.div>
  )
}

function StepPill({ index, floatIdx, step }: { key?: React.Key; index: number; floatIdx: MotionValue<number>; step: WorkflowStep }) {
  const [active, setActive] = useState(index === 0)
  useEffect(() => {
    const unsub = floatIdx.on('change', (fi: number) => setActive(Math.abs(index - fi) < 0.45))
    return unsub
  }, [floatIdx, index])
  return (
    <div style={{
      padding: '5px 12px', borderRadius: 999, fontSize: 10, fontFamily: 'var(--font-mono)',
      fontWeight: 700, letterSpacing: '0.08em', transition: 'all 0.4s ease',
      background: active ? step.color : 'rgba(15,34,68,0.05)',
      color: active ? '#fff' : '#8896af',
      border: `1px solid ${active ? step.color : 'rgba(15,34,68,0.10)'}`,
      boxShadow: active ? `0 0 20px -4px ${step.glow}` : 'none',
    }}>
      {step.step}
    </div>
  )
}

function SceneCard({ index, floatIdx, data, cardH, cardW, sideXOffset, onEnterClick, entered }: {
  key?: React.Key
  index: number
  floatIdx: MotionValue<number>
  data: WorkflowStep
  cardH: number
  cardW: number
  sideXOffset: number
  onEnterClick?: () => void
  entered?: boolean
}) {
  const [active, setActive] = useState(index === 0)

  useEffect(() => {
    const unsub = floatIdx.on('change', (fi: number) => setActive(Math.abs(index - fi) < 0.4))
    return unsub
  }, [floatIdx, index])

  const scale   = useTransform(floatIdx, (fi: number) => { const d = Math.abs(index - fi); return d < 0.05 ? 1 : d < 1 ? 1 - d * 0.06 : 0.88 })
  const opacity = useTransform(floatIdx, (fi: number) => { const d = Math.abs(index - fi); return d < 0.05 ? 1 : d < 1.5 ? 1 - d * 0.28 : 0.22 })
  const shadow  = useTransform(floatIdx, (fi: number) =>
    Math.abs(index - fi) < 0.3
      ? `0 0 60px -20px ${data.glow}, 0 0 0 1.5px ${data.color}30, 0 24px 60px -16px rgba(18,42,86,0.14)`
      : '0 4px 32px -8px rgba(18,42,86,0.09), 0 0 0 1px rgba(18,42,86,0.07)'
  )

  const { Scene } = data
  const isFirst = index === 0

  return (
    <motion.div
      style={{ scale, opacity, flexShrink: 0, position: 'relative' }}
      // Click-to-enter: zoom punch on click
      whileTap={onEnterClick ? { scale: 1.03 } : undefined}
      onClick={onEnterClick}
    >
      <motion.div style={{
        width: cardW, height: cardH, borderRadius: 28, overflow: 'hidden',
        boxShadow: shadow,
        background: '#ffffff',
        border: `1px solid ${data.color}20`,
        position: 'relative',
        cursor: onEnterClick ? 'pointer' : 'default',
      }}>
        {/* Accent top bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 3,
          background: `linear-gradient(90deg, transparent 5%, ${data.color} 50%, transparent 95%)`,
          opacity: active ? 1 : 0.25, transition: 'opacity 0.5s',
        }} />
        {/* Subtle colour wash */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(160deg, ${data.color}06 0%, transparent 55%)`,
          pointerEvents: 'none',
        }} />
        {/* Tag badge */}
        <div style={{
          position: 'absolute', top: 18, right: 18, zIndex: 10,
          fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
          color: data.color, letterSpacing: '0.1em',
          background: `${data.color}12`, border: `1px solid ${data.color}30`,
          borderRadius: 8, padding: '4px 9px',
        }}>
          {data.tag}
        </div>
        <Scene active={active} color={data.color} />

        {/* "Enter" overlay on card 0 before user has scrolled in */}
        <AnimatePresence>
          {isFirst && !entered && (
            <motion.div
              key="enter-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'absolute', inset: 0, zIndex: 20,
                background: `linear-gradient(160deg, ${data.color}cc 0%, ${data.color}99 100%)`,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 16,
                backdropFilter: 'blur(2px)',
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 2.2, repeat: Infinity }}
                style={{
                  width: 72, height: 72, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.18)',
                  border: '2px solid rgba(255,255,255,0.55)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <span style={{ fontSize: 28, color: '#fff' }}>→</span>
              </motion.div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', marginBottom: 4 }}>Explore How It Works</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-mono)' }}>Click to enter · scroll to advance</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
