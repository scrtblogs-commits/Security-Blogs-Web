'use client'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const WHY_CARDS = [
  {
    icon: '🛡️',
    title: 'Security-exclusive',
    desc: 'We work only with security brands — we know your buyers, your jargon and your compliance.',
    color: '#e23744',
  },
  {
    icon: '🤖',
    title: 'AI-native approach',
    desc: 'Every service is built so AI answer engines discover, trust and cite your brand.',
    color: '#6f4dff',
  },
  {
    icon: '📈',
    title: 'Proven results',
    desc: '50+ security brands, +180% average organic growth and an 87% AI citation rate.',
    color: '#1e9e75',
  },
  {
    icon: '⚙️',
    title: 'Full-stack team',
    desc: 'SEO, AIO, paid media, content and engineering under one roof — no agency hand-offs.',
    color: '#0ea5e9',
  },
]

export default function WhyCards() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
      {WHY_CARDS.map((card, i) => (
        <WhyCard key={card.title} card={card} index={i} />
      ))}
    </div>
  )
}

function WhyCard({ card, index }: { key?: React.Key; card: typeof WHY_CARDS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const [inView, setInView] = useState(false)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 30 })
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 30 })

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.2 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => { mx.set(0); my.set(0); setHovered(false) }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 0.8, 0.2, 1] }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      style={{
        rotateX: rotX, rotateY: rotY,
        transformStyle: 'preserve-3d',
        transformPerspective: 800,
        cursor: 'default',
        height: '100%',
      }}
    >
      <motion.div
        animate={{
          boxShadow: hovered
            ? `0 20px 50px -12px ${card.color}33, 0 0 0 1.5px ${card.color}30`
            : '0 4px 24px -8px rgba(18,42,86,0.10), 0 0 0 1px rgba(18,42,86,0.07)',
        }}
        transition={{ duration: 0.3 }}
        style={{
          background: '#ffffff',
          borderRadius: 18,
          overflow: 'hidden',
          position: 'relative',
          padding: '26px 22px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
        }}
      >
        {/* Top accent line */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0.4 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 2,
            background: `linear-gradient(90deg, transparent, ${card.color}, transparent)`,
            zIndex: 2,
          }}
        />

        {/* Icon with glow orb */}
        <div style={{ position: 'relative', display: 'inline-flex', marginBottom: 16, alignSelf: 'flex-start' }}>
          <motion.div
            animate={{ scale: hovered ? 1.4 : 1, opacity: hovered ? 0.25 : 0.1 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'absolute', inset: -8, borderRadius: '50%',
              background: card.color, filter: 'blur(12px)',
              pointerEvents: 'none',
            }}
          />
          <motion.div
            animate={{ scale: hovered ? 1.15 : 1, rotate: hovered ? [0, -8, 8, 0] : 0 }}
            transition={{ duration: 0.5 }}
            style={{
              width: 48, height: 48, borderRadius: 14,
              background: `${card.color}18`,
              border: `1.5px solid ${card.color}35`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22, position: 'relative', zIndex: 1,
            }}
          >
            {card.icon}
          </motion.div>
        </div>

        <h4 style={{ fontSize: 17, fontWeight: 700, color: '#0f2244', marginBottom: 10, letterSpacing: '-0.01em' }}>
          {card.title}
        </h4>
        <p style={{ fontSize: 13.5, lineHeight: 1.65, color: '#46546e', margin: 0 }}>
          {card.desc}
        </p>
      </motion.div>
    </motion.div>
  )
}
