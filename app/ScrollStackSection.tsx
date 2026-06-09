'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { services } from '@/lib/site'
import { ServiceFace } from './service-card-faces'

// Horizontal carousel — cards enter from the right and exit to the left.
// Auto-advances every 4 s; dots + arrows for manual control.
// Shows 3 cards on desktop, 2 on tablet, 1 on mobile.

const INTERVAL = 4000
const GAP      = 20

export default function ScrollStackSection() {
  const [current,  setCurrent]  = useState(0)
  const [dir,      setDir]      = useState<1 | -1>(1)
  const [cardW,    setCardW]    = useState(360)
  const [visible,  setVisible]  = useState(3)
  const containerRef = useRef<HTMLDivElement>(null)

  // Responsive card width
  useEffect(() => {
    const calc = () => {
      if (!containerRef.current) return
      const w = containerRef.current.offsetWidth
      const v = w > 860 ? 3 : w > 560 ? 2 : 1
      setVisible(v)
      setCardW((w - GAP * (v - 1)) / v)
    }
    calc()
    const ro = new ResizeObserver(calc)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  const go = useCallback((nextIdx: number) => {
    setDir(nextIdx > current ? 1 : -1)
    setCurrent(nextIdx)
  }, [current])

  const next = useCallback(() => go((current + 1) % services.length), [current, go])
  const prev = useCallback(() => go((current - 1 + services.length) % services.length), [current, go])

  // Auto-advance
  useEffect(() => {
    const t = setInterval(next, INTERVAL)
    return () => clearInterval(t)
  }, [next])

  // Build the visible indices (wraps around)
  const indices = Array.from({ length: visible }, (_, i) => (current + i) % services.length)

  const cardVariants = {
    enter: (d: number) => ({
      x: d > 0 ? cardW + GAP : -(cardW + GAP),
      opacity: 0,
      scale: 0.92,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: [0.22, 0.8, 0.2, 1] },
    },
    exit: (d: number) => ({
      x: d > 0 ? -(cardW + GAP) : cardW + GAP,
      opacity: 0,
      scale: 0.88,
      transition: { duration: 0.4, ease: [0.22, 0.8, 0.2, 1] },
    }),
  }

  return (
    <div style={{ position: 'relative' }}>
      {/* Card track */}
      <div
        ref={containerRef}
        style={{
          overflow: 'hidden',
          position: 'relative',
          height: 320,
          borderRadius: 'var(--radius-lg)',
        }}
      >
        <div style={{ display: 'flex', gap: GAP, height: '100%' }}>
          <AnimatePresence initial={false} custom={dir} mode="popLayout">
            {indices.map((idx) => (
              <motion.div
                key={`${idx}-${current}`}
                custom={dir}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                style={{
                  flex: `0 0 ${cardW}px`,
                  height: '100%',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  cursor: 'grab',
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) next()
                  else if (info.offset.x > 60) prev()
                }}
              >
                <ServiceFace
                  slug={services[idx].slug}
                  title={services[idx].title}
                  description={services[idx].desc}
                  href={`/services/${services[idx].slug}/`}
                  active={idx === current}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        aria-label="Previous service"
        style={{
          position: 'absolute', top: '50%', left: -20,
          transform: 'translateY(-50%)',
          width: 42, height: 42, borderRadius: '50%',
          background: 'var(--bg-card)', border: '1px solid var(--line)',
          cursor: 'pointer', fontSize: 20, color: 'var(--text)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)', zIndex: 3,
          transition: 'background 0.18s, border-color 0.18s',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--blue)' }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--line)' }}
      >
        ‹
      </button>
      <button
        onClick={next}
        aria-label="Next service"
        style={{
          position: 'absolute', top: '50%', right: -20,
          transform: 'translateY(-50%)',
          width: 42, height: 42, borderRadius: '50%',
          background: 'var(--bg-card)', border: '1px solid var(--line)',
          cursor: 'pointer', fontSize: 20, color: 'var(--text)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)', zIndex: 3,
          transition: 'background 0.18s, border-color 0.18s',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--blue)' }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--line)' }}
      >
        ›
      </button>

      {/* Dot indicators */}
      <div style={{
        display: 'flex', justifyContent: 'center',
        gap: 8, marginTop: 22,
      }}>
        {services.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Go to card ${i + 1}`}
            style={{
              width: i === current ? 26 : 8,
              height: 8,
              borderRadius: 999,
              padding: 0,
              border: 'none',
              cursor: 'pointer',
              background: i === current ? 'var(--blue)' : 'var(--line)',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  )
}
