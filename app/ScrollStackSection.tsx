'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import { services } from '@/lib/site'
import { ServiceFace } from './service-card-faces'

// Scroll-hijack carousel — maximised card sizes on light #F6F6F6 bg.
// Center card takes up as much screen as possible; side cards peek in.

const CENTER_W = 'min(760px, 72vw)'
const SIDE_W   = 'min(300px, 26vw)'
const CENTER_H = 'min(560px, 68vh)'
const SIDE_H   = 'min(440px, 55vh)'

// Pixel offset to position side cards next to center — approximate, visual
const SIDE_X_OFFSET = 570

export default function ScrollStackSection() {
  const outerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: outerRef, offset: ['start start', 'end end'] })
  const total    = services.length
  const floatIdx = useTransform(scrollYProgress, [0, 1], [0, total - 1])

  return (
    <div ref={outerRef} style={{ height: `${total * 100}vh`, position: 'relative' }}>

      {/* Sticky stage */}
      <div style={{
        position: 'sticky', top: 0, height: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
        background: '#f8f9fb',
        gap: 0,
      }}>

        {/* Subtle dot grid texture */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, rgba(30,95,224,0.12) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 40%, transparent 100%)',
        }} />

        {/* Eyebrow + animated service name */}
        <div style={{ textAlign: 'center', marginBottom: 32, position: 'relative', zIndex: 2 }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 11,
            color: 'var(--blue)', letterSpacing: '0.12em',
            textTransform: 'uppercase', opacity: 0.7,
          }}>
            Our Services
          </span>
          <div style={{ position: 'relative', height: 40, marginTop: 6, width: 360, marginInline: 'auto' }}>
            {services.map((s, i) => (
              <ServiceTitle key={s.slug} index={i} floatIdx={floatIdx} title={s.title} />
            ))}
          </div>
        </div>

        {/* 3-up card stage */}
        <div style={{
          position: 'relative', width: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, height: CENTER_H,
          zIndex: 2,
        }}>
          {services.map((s, i) => (
            <Card key={s.slug} index={i} floatIdx={floatIdx} service={s} total={total} />
          ))}
        </div>

        {/* Dot indicators + counter */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, marginTop: 28, zIndex: 2 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            {services.map((_, i) => (
              <DotIndicator key={i} index={i} floatIdx={floatIdx} />
            ))}
          </div>
          <div style={{ position: 'relative', height: 16, width: 48 }}>
            {services.map((_, i) => (
              <CounterLabel key={i} index={i} floatIdx={floatIdx} total={total} />
            ))}
          </div>
        </div>

        {/* Scroll nudge */}
        <motion.div
          style={{ marginTop: 16, zIndex: 2, display: 'flex', alignItems: 'center', gap: 6 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        >
          <span style={{ fontSize: 11, color: 'var(--blue)', fontFamily: 'var(--font-mono)', opacity: 0.6 }}>
            scroll to explore
          </span>
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.4, repeat: Infinity }}
            style={{ color: 'var(--blue)', opacity: 0.5, fontSize: 12 }}
          >
            →
          </motion.span>
        </motion.div>

      </div>
    </div>
  )
}

function Card({
  index, floatIdx, service,
}: {
  index: number
  floatIdx: MotionValue<number>
  service: (typeof services)[0]
  total: number
}) {
  const x = useTransform(floatIdx, (fi) => {
    const off = index - fi
    if (Math.abs(off) > 1.6) return off > 0 ? 1600 : -1600
    return off * SIDE_X_OFFSET
  })

  const scale = useTransform(floatIdx, (fi) => {
    const d = Math.abs(index - fi)
    if (d > 1.5) return 0.78
    if (d < 0.05) return 1
    return 1 - d * 0.1
  })

  const opacity = useTransform(floatIdx, (fi) => {
    const d = Math.abs(index - fi)
    if (d > 1.45) return 0
    if (d < 0.05) return 1
    return 0.55
  })

  const zIndex = useTransform(floatIdx, (fi) => (Math.abs(index - fi) < 0.1 ? 10 : 4))

  const w = useTransform(floatIdx, (fi) => Math.abs(index - fi) < 0.1 ? CENTER_W : SIDE_W)
  const h = useTransform(floatIdx, (fi) => Math.abs(index - fi) < 0.1 ? CENTER_H : SIDE_H)

  return (
    <motion.div
      style={{
        position: 'absolute', x, scale, opacity, zIndex,
        borderRadius: 24, overflow: 'hidden',
        boxShadow: '0 28px 80px -16px rgba(18,42,86,0.20), 0 0 0 1px rgba(30,95,224,0.07)',
        willChange: 'transform',
      }}
    >
      <motion.div style={{ width: w, height: h, transition: 'width 0.4s ease, height 0.4s ease' }}>
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
  const opacity = useTransform(floatIdx, (fi) => (Math.abs(index - fi) < 0.5 ? 1 : 0))
  const y       = useTransform(floatIdx, (fi) => (Math.abs(index - fi) < 0.5 ? 0 : 10))
  return (
    <motion.h3
      style={{
        position: 'absolute', inset: 0, opacity, y,
        fontFamily: 'var(--font-display)', fontWeight: 800,
        fontSize: 'clamp(18px,2.2vw,24px)', color: 'var(--text)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: 0, whiteSpace: 'nowrap',
      }}
    >
      {title}
    </motion.h3>
  )
}

function CounterLabel({ index, floatIdx, total }: { index: number; floatIdx: MotionValue<number>; total: number }) {
  const opacity = useTransform(floatIdx, (fi) => (Math.abs(index - fi) < 0.5 ? 1 : 0))
  return (
    <motion.span
      style={{
        position: 'absolute', inset: 0, opacity,
        fontFamily: 'var(--font-mono)', fontSize: 11,
        color: 'var(--text-dim)', textAlign: 'center',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      {index + 1} / {total}
    </motion.span>
  )
}

function DotIndicator({ index, floatIdx }: { index: number; floatIdx: MotionValue<number> }) {
  const width = useTransform(floatIdx, (fi) => Math.abs(index - fi) < 0.5 ? 28 : 8)
  const bg    = useTransform(floatIdx, (fi) =>
    Math.abs(index - fi) < 0.5 ? 'var(--blue)' : 'rgba(30,95,224,0.2)',
  )
  return <motion.div style={{ height: 7, borderRadius: 999, width, background: bg }} />
}
