'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import { services } from '@/lib/site'
import { ServiceFace } from './service-card-faces'

// Scroll-hijack: outer div = services.length × 100vh (gives scroll room per card)
// Inner div is sticky — locks to viewport while user scrolls through all cards.
// Cards are large: center card fills ~55% of screen width, side cards ~35%.

const CENTER_W = 'min(580px, 55vw)'
const SIDE_W   = 'min(360px, 32vw)'
const CENTER_H = 'min(480px, 62vh)'
const SIDE_H   = 'min(380px, 50vh)'

export default function ScrollStackSection() {
  const outerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target:  outerRef,
    offset: ['start start', 'end end'],
  })

  const total    = services.length
  const floatIdx = useTransform(scrollYProgress, [0, 1], [0, total - 1])

  return (
    <div ref={outerRef} style={{ height: `${total * 100}vh`, position: 'relative' }}>

      {/* Sticky stage */}
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        gap: 28,
      }}>

        {/* Counter badge */}
        <div style={{ height: 22, position: 'relative', width: 60, flexShrink: 0 }}>
          {services.map((_, i) => (
            <CounterLabel key={i} index={i} floatIdx={floatIdx} total={total} />
          ))}
        </div>

        {/* 3-up card stage */}
        <div style={{
          position: 'relative',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          {services.map((s, i) => (
            <Card
              key={s.slug}
              index={i}
              floatIdx={floatIdx}
              service={s}
              total={total}
            />
          ))}
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
          {services.map((_, i) => (
            <DotIndicator key={i} index={i} floatIdx={floatIdx} />
          ))}
        </div>

        {/* Scroll hint */}
        <motion.p
          style={{ fontSize: 12, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', margin: 0, flexShrink: 0 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        >
          ↓ scroll to explore
        </motion.p>
      </div>
    </div>
  )
}

function Card({
  index,
  floatIdx,
  service,
}: {
  index: number
  floatIdx: MotionValue<number>
  service: (typeof services)[0]
  total: number
}) {
  // offset from current float index
  const x = useTransform(floatIdx, (fi) => {
    const off = index - fi
    const absOff = Math.abs(off)

    // hide cards more than 1.5 away
    if (absOff > 1.6) return off > 0 ? 1400 : -1400

    // center card: x = 0
    // left card:   x = -(centerW/2 + sideW/2 + gap)
    // right card:  x = +(centerW/2 + sideW/2 + gap)
    // We use 420px as gap approximation; actual sizing is CSS so this is visual offset only
    return off * 500
  })

  const scale = useTransform(floatIdx, (fi) => {
    const d = Math.abs(index - fi)
    if (d > 1.5) return 0.75
    if (d < 0.05) return 1
    return 1 - d * 0.12
  })

  const opacity = useTransform(floatIdx, (fi) => {
    const d = Math.abs(index - fi)
    if (d > 1.45) return 0
    if (d < 0.05) return 1
    return 0.6
  })

  const zIndex = useTransform(floatIdx, (fi) => {
    const d = Math.abs(index - fi)
    return d < 0.1 ? 10 : 4
  })

  const isCenter = useTransform(floatIdx, (fi) => Math.abs(index - fi) < 0.1)

  return (
    <motion.div
      style={{
        position: 'absolute',
        x,
        scale,
        opacity,
        zIndex,
        borderRadius: 24,
        overflow: 'hidden',
        boxShadow: '0 24px 72px -16px rgba(18,42,86,0.22)',
        willChange: 'transform',
      }}
    >
      {/* Size switches between center and side */}
      <motion.div style={{
        width:  useTransform(floatIdx, (fi) => Math.abs(index - fi) < 0.1 ? CENTER_W : SIDE_W),
        height: useTransform(floatIdx, (fi) => Math.abs(index - fi) < 0.1 ? CENTER_H : SIDE_H),
        transition: 'width 0.4s ease, height 0.4s ease',
      }}>
        <ServiceFace
          slug={service.slug}
          title={service.title}
          description={service.desc}
          href={`/services/${service.slug}/`}
          active={true}
        />
      </motion.div>
    </motion.div>
  )
}

function CounterLabel({ index, floatIdx, total }: { index: number; floatIdx: MotionValue<number>; total: number }) {
  const opacity = useTransform(floatIdx, (fi) => (Math.abs(index - fi) < 0.5 ? 1 : 0))
  return (
    <motion.span
      style={{
        position: 'absolute', inset: 0, opacity,
        fontFamily: 'var(--font-mono)', fontSize: 13,
        color: 'var(--text-dim)', textAlign: 'center',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      {index + 1} / {total}
    </motion.span>
  )
}

function DotIndicator({ index, floatIdx }: { index: number; floatIdx: MotionValue<number> }) {
  const width  = useTransform(floatIdx, (fi) => Math.abs(index - fi) < 0.5 ? 26 : 8)
  const bg     = useTransform(floatIdx, (fi) =>
    Math.abs(index - fi) < 0.5 ? 'var(--blue)' : 'var(--line)',
  )
  return <motion.div style={{ height: 8, borderRadius: 999, width, background: bg }} />
}
