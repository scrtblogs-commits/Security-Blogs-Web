'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion'
import { services } from '@/lib/site'
import { ServiceFace } from './service-card-faces'

// Horizontal scroll-driven carousel.
// Outer div = services.length × 100vh → gives scroll room per card.
// Sticky inner locks to viewport. Card strip translates left as user scrolls,
// one card centering per scroll segment.

const CARD_W = 480
const CARD_H = 560
const GAP    = 36

export default function ScrollStackSection() {
  const outerRef = useRef<HTMLDivElement>(null)
  const [vw, setVw] = useState(1200)

  useEffect(() => {
    const update = () => setVw(window.innerWidth)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const total = services.length
  const step  = CARD_W + GAP

  const { scrollYProgress } = useScroll({
    target:  outerRef,
    offset: ['start start', 'end end'],
  })

  // Card strip x: card 0 centred at scroll=0, last card centred at scroll=1
  const startX = vw / 2 - CARD_W / 2
  const endX   = startX - (total - 1) * step

  const rawX = useTransform(scrollYProgress, [0, 1], [startX, endX])
  const x    = useSpring(rawX, { stiffness: 80, damping: 22, mass: 0.6 })

  // Which card index is "active" (centred)
  const floatIdx = useTransform(scrollYProgress, [0, 1], [0, total - 1])

  return (
    <div ref={outerRef} style={{ height: `${total * 100}vh`, position: 'relative' }}>
      <div style={{
        position: 'sticky', top: 0, height: '100vh',
        overflow: 'hidden',
        background: '#f0f5ff',
        display: 'flex', flexDirection: 'column',
      }}>

        {/* Subtle dot grid */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, rgba(30,95,224,0.12) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 90% 80% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 50%, black 40%, transparent 100%)',
        }} />

        {/* Header */}
        <div style={{ textAlign: 'center', paddingTop: 44, flexShrink: 0, position: 'relative', zIndex: 2 }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em',
            color: 'var(--blue)', textTransform: 'uppercase', opacity: 0.7,
          }}>
            Our Services
          </span>
          {/* Animated active title */}
          <div style={{ position: 'relative', height: 36, marginTop: 6 }}>
            {services.map((s, i) => (
              <ServiceTitle key={s.slug} index={i} floatIdx={floatIdx} title={s.title} />
            ))}
          </div>
        </div>

        {/* Horizontal card strip */}
        <motion.div
          style={{
            x,
            position: 'absolute',
            top: `calc(50vh - ${CARD_H / 2}px + 20px)`,
            left: 0,
            display: 'flex',
            gap: GAP,
            willChange: 'transform',
          }}
        >
          {services.map((s, i) => (
            <Card key={s.slug} index={i} floatIdx={floatIdx} service={s} />
          ))}
        </motion.div>

        {/* Bottom: dots + counter + scroll hint */}
        <div style={{
          position: 'absolute', bottom: 28, left: 0, right: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
          zIndex: 2,
        }}>
          {/* Dot indicators */}
          <div style={{ display: 'flex', gap: 7 }}>
            {services.map((_, i) => (
              <DotIndicator key={i} index={i} floatIdx={floatIdx} />
            ))}
          </div>

          {/* Counter */}
          <div style={{ position: 'relative', height: 16, width: 50 }}>
            {services.map((_, i) => (
              <CounterLabel key={i} index={i} floatIdx={floatIdx} total={total} />
            ))}
          </div>

          {/* Scroll nudge */}
          <motion.div
            style={{ display: 'flex', alignItems: 'center', gap: 5 }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span style={{ fontSize: 10.5, color: 'var(--blue)', fontFamily: 'var(--font-mono)', opacity: 0.6, letterSpacing: '0.06em' }}>
              SCROLL TO EXPLORE
            </span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              style={{ color: 'var(--blue)', opacity: 0.5, fontSize: 13 }}
            >→</motion.span>
          </motion.div>
        </div>

      </div>
    </div>
  )
}

function Card({ index, floatIdx, service }: {
  index: number
  floatIdx: MotionValue<number>
  service: typeof services[0]
}) {
  const isActive = useTransform(floatIdx, fi => Math.abs(index - fi) < 0.35)

  const scale = useTransform(floatIdx, fi => {
    const d = Math.abs(index - fi)
    if (d < 0.05) return 1
    if (d < 1)    return 1 - d * 0.07
    return 0.9
  })

  const opacity = useTransform(floatIdx, fi => {
    const d = Math.abs(index - fi)
    if (d < 0.05) return 1
    if (d < 1.5)  return 1 - d * 0.25
    return 0.35
  })

  const shadow = useTransform(floatIdx, fi =>
    Math.abs(index - fi) < 0.3
      ? '0 32px 80px -16px rgba(30,95,224,0.28), 0 0 0 1px rgba(30,95,224,0.10)'
      : '0 8px 24px -8px rgba(18,42,86,0.12)'
  )

  return (
    <motion.div style={{ scale, opacity, flexShrink: 0 }}>
      <motion.div style={{
        width: CARD_W, height: CARD_H,
        borderRadius: 24,
        overflow: 'hidden',
        boxShadow: shadow,
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

function ServiceTitle({ index, floatIdx, title }: { index: number; floatIdx: MotionValue<number>; title: string }) {
  const opacity = useTransform(floatIdx, fi => Math.abs(index - fi) < 0.5 ? 1 : 0)
  const y       = useTransform(floatIdx, fi => Math.abs(index - fi) < 0.5 ? 0 : 8)
  return (
    <motion.h3 style={{
      position: 'absolute', inset: 0, opacity, y,
      fontFamily: 'var(--font-display)', fontWeight: 800,
      fontSize: 'clamp(17px,2vw,22px)', color: 'var(--text)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      margin: 0, whiteSpace: 'nowrap',
    }}>
      {title}
    </motion.h3>
  )
}

function DotIndicator({ index, floatIdx }: { index: number; floatIdx: MotionValue<number> }) {
  const w  = useTransform(floatIdx, fi => Math.abs(index - fi) < 0.5 ? 26 : 7)
  const bg = useTransform(floatIdx, fi =>
    Math.abs(index - fi) < 0.5 ? 'var(--blue)' : 'rgba(30,95,224,0.22)'
  )
  return <motion.div style={{ height: 7, borderRadius: 999, width: w, background: bg }} />
}

function CounterLabel({ index, floatIdx, total }: { index: number; floatIdx: MotionValue<number>; total: number }) {
  const opacity = useTransform(floatIdx, fi => Math.abs(index - fi) < 0.5 ? 1 : 0)
  return (
    <motion.span style={{
      position: 'absolute', inset: 0, opacity,
      fontFamily: 'var(--font-mono)', fontSize: 11,
      color: 'var(--text-dim)', textAlign: 'center',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {index + 1} / {total}
    </motion.span>
  )
}
