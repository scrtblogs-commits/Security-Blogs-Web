'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

type Item = { icon: string; title: string; desc: string }

const CARD_W = 300
const CARD_H = 220
const GAP    = 20

export default function SeoCapabilitiesScroll({ items, accent }: { items: Item[]; accent: string }) {
  const outerRef = useRef<HTMLDivElement>(null)
  const total    = items.length

  // Outer div is tall enough to scroll through all cards
  const scrollH  = total * 60  // vh equivalent in px added via style

  const { scrollYProgress } = useScroll({
    target:  outerRef,
    offset: ['start end', 'end start'],
  })

  // Simple horizontal drag-free marquee on scroll
  const maxShift = (total - 3.5) * (CARD_W + GAP)
  const rawX = useTransform(scrollYProgress, [0.1, 0.9], [0, -maxShift])
  const x    = useSpring(rawX, { stiffness: 60, damping: 20, mass: 0.5 })

  return (
    <div ref={outerRef} style={{ overflow: 'hidden', paddingBlock: 8 }}>
      <motion.div
        style={{
          x,
          display: 'flex',
          gap: GAP,
          paddingInline: 'max(32px, calc((100vw - 1200px) / 2))',
          willChange: 'transform',
        }}
      >
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 0.8, 0.2, 1] }}
            style={{
              flexShrink: 0,
              width: CARD_W,
              minHeight: CARD_H,
              background: '#fff',
              borderRadius: 20,
              border: `1.5px solid rgba(30,95,224,0.10)`,
              boxShadow: '0 4px 24px -8px rgba(18,42,86,0.08)',
              padding: '28px 26px',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}
          >
            <div style={{
              width: 46, height: 46, borderRadius: 12,
              background: `${accent}14`,
              border: `1.5px solid ${accent}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22,
            }}>
              {item.icon}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)', marginBottom: 6 }}>
                {item.title}
              </div>
              <div style={{ fontSize: 13.5, color: 'var(--text-dim)', lineHeight: 1.55 }}>
                {item.desc}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
