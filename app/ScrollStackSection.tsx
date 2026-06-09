'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import { services } from '@/lib/site'
import { ServiceFace } from './service-card-faces'

// Each card sticks as you scroll — the next card slides up from below and
// covers it, creating a smooth stacking illusion through all 7 service cards.
export default function ScrollStackSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    // Outer container height drives how long the sticky phase lasts.
    // 100vh per card gives each card enough scroll room.
    <div ref={containerRef} style={{ height: `${services.length * 90}vh` }}>
      <div
        style={{
          position: 'sticky',
          top: '10vh',
          height: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: 560,
            height: 340,
          }}
        >
          {services.map((s, i) => (
            <StackCard
              key={s.slug}
              index={i}
              total={services.length}
              scrollYProgress={scrollYProgress}
              service={s}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function StackCard({
  index,
  total,
  scrollYProgress,
  service,
}: {
  index: number
  total: number
  scrollYProgress: MotionValue<number>
  service: (typeof services)[0]
}) {
  // Each card enters during its own scroll window
  const enter = index / total
  const peak  = (index + 0.6) / total

  const y       = useTransform(scrollYProgress, [enter - 0.08, enter], ['110%', '0%'])
  const scale   = useTransform(scrollYProgress, [enter, peak],          [1,      0.95])
  const opacity = useTransform(scrollYProgress, [enter - 0.04, enter],  [0,      1])

  return (
    <motion.div
      style={{
        position: 'absolute',
        inset: 0,
        y,
        scale,
        opacity,
        zIndex: index + 1,
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        boxShadow: '0 24px 60px -12px rgba(18,42,86,0.22)',
      }}
    >
      <ServiceFace
        slug={service.slug}
        title={service.title}
        description={service.desc}
        href={`/services/${service.slug}/`}
        active
      />
    </motion.div>
  )
}
