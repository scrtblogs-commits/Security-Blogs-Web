'use client'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { services } from '@/lib/site'

const ACCENT: Record<string, string> = {
  'security-seo': '#1e9e75',
  'aio': '#6f4dff',
  'aeo': '#7f77dd',
  'geo': '#e23744',
  'google-ads': '#f6c715',
  'bing-ads': '#0078d4',
  'web-design': '#1e5fe0',
}

const benefits: Record<string, string[]> = {
  'security-seo': [
    'Rank for high-intent buyer keywords',
    'Technical + on-page + content built for security',
    'Local & national domination',
  ],
  aio: [
    'Engineered to be cited by ChatGPT & Perplexity',
    'Entity & schema foundations',
    'Citable, authoritative content assets',
  ],
  aeo: [
    'Win featured answers & snippets',
    'Structured FAQ & Q&A optimisation',
    'Answer-first content architecture',
  ],
  geo: [
    'Build a verified knowledge-graph entity',
    'Cross-platform authority signals',
    'Wikidata & directory presence',
  ],
  'google-ads': [
    'Security-buyer keyword targeting',
    'Conversion-optimised landing pages',
    'Transparent ROAS reporting',
  ],
  'bing-ads': [
    'Reach 41% of B2B Microsoft searchers',
    'Lower CPCs, higher-intent clicks',
    'Cross-network retargeting',
  ],
  'web-design': [
    'AI-ready, schema-rich builds',
    'Fast, Core Web Vitals optimised',
    'Conversion-focused UX',
  ],
}

const statChip: Record<string, string> = {
  'security-seo': '+180% organic traffic',
  aio: '87% AI citation rate',
  aeo: '3.4× featured answers',
  geo: 'Verified entity in 90 days',
  'google-ads': '3.2× average ROAS',
  'bing-ads': '41% lower CPC',
  'web-design': '2.1× conversion lift',
}

export default function ServiceBenefitCards() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
      {services.map((s, i) => (
        <BenefitCard key={s.slug} s={s} index={i} />
      ))}
    </div>
  )
}

function BenefitCard({ s, index }: { key?: React.Key; s: typeof services[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const [inView, setInView] = useState(false)

  const color = ACCENT[s.slug] ?? '#1e5fe0'

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
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 + Math.floor(index / 3) * 0.12, ease: [0.22, 0.8, 0.2, 1] }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      style={{
        rotateX: rotX, rotateY: rotY,
        transformStyle: 'preserve-3d',
        transformPerspective: 800,
        cursor: 'default',
      }}
    >
      <motion.div
        animate={{
          boxShadow: hovered
            ? `0 20px 50px -12px ${color}44, 0 0 0 1px ${color}25`
            : '0 4px 20px -8px rgba(18,42,86,0.15), 0 0 0 1px rgba(255,255,255,0.06)',
        }}
        transition={{ duration: 0.3 }}
        style={{
          background: 'linear-gradient(145deg, #0e1829 0%, #0a1220 100%)',
          borderRadius: 18,
          overflow: 'hidden',
          position: 'relative',
          padding: '22px 20px',
          display: 'flex', flexDirection: 'column', gap: 10,
        }}
      >
        {/* Top accent line */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0.5 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 2,
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            zIndex: 2,
          }}
        />

        {/* Service name */}
        <div style={{ fontWeight: 700, fontSize: 15, color: '#fff', letterSpacing: '-0.01em' }}>{s.title}</div>

        {/* Stat chip */}
        <div style={{
          alignSelf: 'flex-start',
          background: `${color}18`,
          border: `1px solid ${color}40`,
          borderRadius: 999,
          padding: '3px 10px',
          fontSize: 11.5, fontWeight: 700,
          color: color,
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.04em',
        }}>
          📊 {statChip[s.slug]}
        </div>

        {/* Benefits list */}
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {benefits[s.slug].map((b, i) => (
            <li key={i} style={{ fontSize: 13, color: 'rgba(255,255,255,0.72)', display: 'flex', alignItems: 'flex-start', gap: 7 }}>
              <span style={{ color: color, flexShrink: 0, marginTop: 1 }}>✓</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>

        {/* Learn more link */}
        <a
          href={`/services/${s.slug}/`}
          style={{
            marginTop: 4, fontSize: 12.5, fontWeight: 600,
            color: color, textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center', gap: 4,
            letterSpacing: '0.02em',
          }}
        >
          Learn more →
        </a>
      </motion.div>
    </motion.div>
  )
}
