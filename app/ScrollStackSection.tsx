'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { services } from '@/lib/site'
import { ServiceFace } from './service-card-faces'

// Scroll-hijack carousel:
// The outer div is (services.length * 100vh) tall.
// The inner div is sticky — it locks to the viewport while the user scrolls.
// Scroll progress maps directly to which card is shown:
//   0% scroll → card 0   |   100% scroll → last card
// Each card enters from the RIGHT as you scroll down.

const CARD_H   = 340
const SIDE_H   = 272
const SIDE_OP  = 0.65
const SIDE_SC  = 0.88

export default function ScrollStackSection() {
  const outerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target:  outerRef,
    offset: ['start start', 'end end'],
  })

  // Map 0→1 scroll to 0→(total-1) card index (as a float)
  const total    = services.length
  const floatIdx = useTransform(scrollYProgress, [0, 1], [0, total - 1])

  return (
    // Outer: tall enough so scroll gives time for each card
    <div
      ref={outerRef}
      style={{ height: `${total * 100}vh`, position: 'relative' }}
    >
      {/* Sticky viewport-locked stage */}
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        paddingBottom: 40,
      }}>

        {/* Counter — "3 / 7" */}
        <motion.div style={{ marginBottom: 20, fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-dim)' }}>
          {services.map((_, i) => (
            <CardCounter key={i} index={i} floatIdx={floatIdx} total={total} />
          ))}
        </motion.div>

        {/* 3-up card stage */}
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: 1100,
          height: CARD_H,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 20,
          padding: '0 clamp(12px, 4vw, 60px)',
        }}>
          {services.map((s, i) => (
            <AnimatedCard
              key={s.slug}
              index={i}
              floatIdx={floatIdx}
              service={s}
              total={total}
            />
          ))}
        </div>

        {/* Dot indicators */}
        <div style={{ display: 'flex', gap: 8, marginTop: 28 }}>
          {services.map((_, i) => (
            <DotIndicator key={i} index={i} floatIdx={floatIdx} />
          ))}
        </div>

        {/* Scroll hint */}
        <motion.p
          style={{ marginTop: 14, fontSize: 12, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ↓ scroll to explore
        </motion.p>
      </div>
    </div>
  )
}

// Each card — visible only when it's the active one (±1 for side previews)
function AnimatedCard({
  index,
  floatIdx,
  service,
  total,
}: {
  index: number
  floatIdx: ReturnType<typeof useTransform>
  service: (typeof services)[0]
  total: number
}) {
  // Offset of this card from the current float index (-2…+2)
  // We render left(-1), center(0), right(+1) — others are invisible
  const x = useTransform(floatIdx, (fi) => {
    const offset = index - fi
    if (Math.abs(offset) > 1.5) return offset > 0 ? 900 : -900
    if (Math.abs(offset) < 0.01) return 0
    return offset * (360 + 20)   // card width + gap
  })

  const scale = useTransform(floatIdx, (fi) => {
    const d = Math.abs(index - fi)
    if (d > 1.5)  return 0.7
    if (d < 0.05) return 1
    return 1 - d * (1 - SIDE_SC)
  })

  const opacity = useTransform(floatIdx, (fi) => {
    const d = Math.abs(index - fi)
    if (d > 1.4)  return 0
    if (d < 0.05) return 1
    return SIDE_OP
  })

  const height = useTransform(floatIdx, (fi) => {
    const d = Math.abs(index - fi)
    return d < 0.05 ? CARD_H : SIDE_H
  })

  const zIndex = useTransform(floatIdx, (fi) => {
    const d = Math.abs(index - fi)
    return d < 0.05 ? 10 : 5
  })

  return (
    <motion.div
      style={{
        position: 'absolute',
        width: 'clamp(260px, 38vw, 380px)',
        height,
        x,
        scale,
        opacity,
        zIndex,
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        boxShadow: '0 20px 60px -16px rgba(18,42,86,0.22)',
        flexShrink: 0,
      }}
      transition={{ type: 'spring', stiffness: 240, damping: 30 }}
    >
      <ServiceFace
        slug={service.slug}
        title={service.title}
        description={service.desc}
        href={`/services/${service.slug}/`}
        active={true}
      />
    </motion.div>
  )
}

// Shows "2 / 7" — only the active card's counter is visible
function CardCounter({
  index,
  floatIdx,
  total,
}: {
  index: number
  floatIdx: ReturnType<typeof useTransform>
  total: number
}) {
  const opacity = useTransform(floatIdx, (fi) => (Math.abs(index - fi) < 0.5 ? 1 : 0))
  return (
    <motion.span style={{ position: 'absolute', opacity }}>
      {index + 1} / {total}
    </motion.span>
  )
}

// Dot — filled when active
function DotIndicator({
  index,
  floatIdx,
}: {
  index: number
  floatIdx: ReturnType<typeof useTransform>
}) {
  const width = useTransform(floatIdx, (fi) => (Math.abs(index - fi) < 0.5 ? 26 : 8))
  const bg    = useTransform(floatIdx, (fi) =>
    Math.abs(index - fi) < 0.5 ? 'var(--blue)' : 'var(--line)',
  )
  return (
    <motion.div
      style={{
        height: 8, borderRadius: 999,
        width, background: bg,
        transition: 'all 0.3s ease',
      }}
    />
  )
}
