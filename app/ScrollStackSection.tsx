'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { services } from '@/lib/site'
import { ServiceFace } from './service-card-faces'

// 3-up carousel: left card (small) | CENTER card (featured) | right card (small)
// Cards enter from the RIGHT and slide left continuously through all services.
const INTERVAL = 3800

export default function ScrollStackSection() {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev]       = useState<number | null>(null)
  const total = services.length

  const advance = useCallback(() => {
    setPrev(current)
    setCurrent((c) => (c + 1) % total)
  }, [current, total])

  const goTo = useCallback((idx: number) => {
    setPrev(current)
    setCurrent(idx)
  }, [current])

  // Auto-advance
  useEffect(() => {
    const t = setInterval(advance, INTERVAL)
    return () => clearInterval(t)
  }, [advance])

  const left  = (current - 1 + total) % total
  const right = (current + 1) % total

  return (
    <div style={{ position: 'relative', userSelect: 'none' }}>

      {/* ── Card track ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1.35fr 1fr',
        gap: 20,
        alignItems: 'center',
        overflow: 'hidden',
        padding: '16px 0 24px',
      }}>

        {/* Left side card */}
        <SideCard
          key={`left-${left}`}
          service={services[left]}
          side="left"
          onClick={() => goTo(left)}
        />

        {/* Center featured card */}
        <motion.div
          key={`center-${current}`}
          initial={{ x: 120, opacity: 0, scale: 0.88 }}
          animate={{ x: 0,   opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          style={{
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            height: 340,
            boxShadow: '0 28px 64px -16px rgba(18,42,86,0.28)',
            zIndex: 3,
            position: 'relative',
          }}
        >
          <ServiceFace
            slug={services[current].slug}
            title={services[current].title}
            description={services[current].desc}
            href={`/services/${services[current].slug}/`}
            active
          />
        </motion.div>

        {/* Right side card */}
        <SideCard
          key={`right-${right}`}
          service={services[right]}
          side="right"
          onClick={() => advance()}
        />
      </div>

      {/* ── Dot indicators ── */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 8 }}>
        {services.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Card ${i + 1}`}
            style={{
              width: i === current ? 28 : 8,
              height: 8,
              borderRadius: 999,
              padding: 0,
              border: 'none',
              cursor: 'pointer',
              background: i === current ? 'var(--blue)' : 'var(--line)',
              transition: 'all 0.35s ease',
            }}
          />
        ))}
      </div>

      {/* ── Mobile: single card ── */}
      <style>{`
        @media (max-width: 640px) {
          .scs-grid { grid-template-columns: 1fr !important; }
          .scs-side  { display: none !important; }
        }
        @media (max-width: 900px) and (min-width: 641px) {
          .scs-grid { grid-template-columns: 0.4fr 1fr 0.4fr !important; }
        }
      `}</style>
    </div>
  )
}

// Side card — dimmed, smaller, clickable to become active
function SideCard({
  service,
  side,
  onClick,
}: {
  service: (typeof services)[0]
  side: 'left' | 'right'
  onClick: () => void
}) {
  return (
    <motion.div
      className="scs-side"
      key={service.slug}
      initial={{ x: side === 'right' ? 80 : -80, opacity: 0, scale: 0.82 }}
      animate={{ x: 0, opacity: 0.72, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 220, damping: 26, delay: 0.06 }}
      whileHover={{ opacity: 1, scale: 0.94 }}
      onClick={onClick}
      style={{
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        height: 280,
        cursor: 'pointer',
        zIndex: 2,
        position: 'relative',
        boxShadow: '0 12px 32px -8px rgba(18,42,86,0.14)',
      }}
    >
      <ServiceFace
        slug={service.slug}
        title={service.title}
        description={service.desc}
        href={`/services/${service.slug}/`}
        active={false}
      />
    </motion.div>
  )
}
