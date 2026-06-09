'use client'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion'

export type WorkflowStep = {
  step: string
  tag: string
  title: string
  color: string
  glow: string
  Scene: (props: { active: boolean; color: string }) => React.ReactElement | null
}

const CARD_W = 660
const CARD_H = 490
const GAP    = 40

export default function ServiceWorkflowCards({ steps }: { steps: WorkflowStep[] }) {
  const outerRef = useRef<HTMLDivElement>(null)
  const [vw, setVw] = useState(1200)

  useEffect(() => {
    const up = () => setVw(window.innerWidth)
    up()
    window.addEventListener('resize', up)
    return () => window.removeEventListener('resize', up)
  }, [])

  const total = steps.length
  const { scrollYProgress } = useScroll({ target: outerRef, offset: ['start start', 'end end'] })

  const startX = vw / 2 - CARD_W / 2
  const endX   = startX - (total - 1) * (CARD_W + GAP)
  const rawX = useTransform(scrollYProgress, [0, 1], [startX, endX])
  const x    = useSpring(rawX, { stiffness: 70, damping: 22, mass: 0.6 })
  const floatIdx = useTransform(scrollYProgress, [0, 1], [0, total - 1])

  return (
    <div ref={outerRef} style={{ height: `${total * 100}vh`, position: 'relative' }}>
      <div style={{
        position: 'sticky', top: 0, height: '100vh', overflow: 'hidden',
        background: 'linear-gradient(160deg, #060d1f 0%, #0b1530 60%, #080f22 100%)',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Grid lines */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(30,95,224,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(30,95,224,0.05) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)',
        }} />

        <GlowOrb floatIdx={floatIdx} steps={steps} />

        {/* Header */}
        <div style={{ textAlign: 'center', paddingTop: 42, flexShrink: 0, position: 'relative', zIndex: 2 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', color: 'rgba(120,160,255,0.65)', textTransform: 'uppercase' }}>
            How It Works
          </span>
          <div style={{ position: 'relative', height: 34, marginTop: 6 }}>
            {steps.map((s, i) => (
              <ActiveTitle key={i} index={i} floatIdx={floatIdx as MotionValue<number>} step={s} />
            ))}
          </div>
        </div>

        {/* Card strip */}
        <motion.div style={{
          x,
          position: 'absolute',
          top: `calc(50vh - ${CARD_H / 2}px + 14px)`,
          left: 0, display: 'flex', gap: GAP, willChange: 'transform',
        }}>
          {steps.map((s, i) => (
            <SceneCard key={i} index={i} floatIdx={floatIdx as MotionValue<number>} data={s} cardH={CARD_H} cardW={CARD_W} />
          ))}
        </motion.div>

        {/* Bottom nav */}
        <div style={{ position: 'absolute', bottom: 26, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, zIndex: 2 }}>
          <div style={{ display: 'flex', gap: 10 }}>
            {steps.map((s, i) => <StepPill key={i} index={i} floatIdx={floatIdx as MotionValue<number>} step={s} />)}
          </div>
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2.2, repeat: Infinity }}
            style={{ display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <span style={{ fontSize: 9.5, color: 'rgba(120,160,255,0.55)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
              SCROLL THROUGH JOURNEY
            </span>
            <motion.span animate={{ x: [0, 6, 0] }} transition={{ duration: 1.3, repeat: Infinity }}
              style={{ color: 'rgba(120,160,255,0.5)', fontSize: 13 }}>→</motion.span>
          </motion.div>
        </div>
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
      opacity: 0.12, transition: 'background 0.8s ease', pointerEvents: 'none', zIndex: 0,
    }} />
  )
}

function ActiveTitle({ index, floatIdx, step }: { key?: React.Key; index: number; floatIdx: MotionValue<number>; step: WorkflowStep }) {
  const opacity = useTransform(floatIdx, (fi: number) => Math.abs(index - fi) < 0.45 ? 1 : 0)
  const y       = useTransform(floatIdx, (fi: number) => Math.abs(index - fi) < 0.45 ? 0 : 8)
  return (
    <motion.div style={{ position: 'absolute', inset: 0, opacity, y, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: step.color, opacity: 0.8 }}>{step.tag}</span>
      <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
      <span style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>{step.title}</span>
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
      background: active ? step.color : 'rgba(255,255,255,0.05)',
      color: active ? '#fff' : 'rgba(255,255,255,0.3)',
      border: `1px solid ${active ? step.color : 'rgba(255,255,255,0.08)'}`,
      boxShadow: active ? `0 0 20px -4px ${step.glow}` : 'none',
    }}>
      {step.step}
    </div>
  )
}

function SceneCard({ index, floatIdx, data, cardH, cardW }: {
  key?: React.Key; index: number; floatIdx: MotionValue<number>; data: WorkflowStep; cardH: number; cardW: number
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
      ? `0 0 80px -10px ${data.glow}, 0 0 0 1px ${data.color}35, 0 40px 80px -20px rgba(0,0,0,0.6)`
      : '0 10px 40px -12px rgba(0,0,0,0.5)'
  )

  const { Scene } = data

  return (
    <motion.div style={{ scale, opacity, flexShrink: 0 }}>
      <motion.div style={{
        width: cardW, height: cardH, borderRadius: 28, overflow: 'hidden',
        boxShadow: shadow,
        background: 'rgba(8,15,34,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${data.color}22`,
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, transparent 5%, ${data.color} 50%, transparent 95%)`,
          opacity: active ? 1 : 0.2, transition: 'opacity 0.5s',
        }} />
        <div style={{
          position: 'absolute', top: 18, right: 18, zIndex: 10,
          fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
          color: data.color, letterSpacing: '0.1em',
          background: `${data.color}15`, border: `1px solid ${data.color}35`,
          borderRadius: 8, padding: '4px 9px',
        }}>
          {data.tag}
        </div>
        <Scene active={active} color={data.color} />
      </motion.div>
    </motion.div>
  )
}
