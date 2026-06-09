'use client'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const ACCENT = '#e23744'

const CARDS = [
  { icon: '🧩', title: 'Entity Building', desc: 'Establish your security brand as a defined, recognised entity AI systems can identify with confidence.', Preview: EntityPreview },
  { icon: '📋', title: 'Knowledge Panel Optimisation', desc: 'Shape the knowledge panels and brand cards that surface across Google and AI platforms.', Preview: KnowledgePanelPreview },
  { icon: '📡', title: 'Brand Signal Distribution', desc: 'Seed consistent, authoritative signals across the directories and sources AI engines learn from.', Preview: SignalDistributionPreview },
  { icon: '🔁', title: 'Cross-Platform Consistency', desc: 'Align how every AI platform describes your brand so the story is identical everywhere.', Preview: CrossPlatformPreview },
  { icon: '📍', title: 'NAP Consistency', desc: 'Lock in matching Name, Address and Phone data across the web to reinforce entity trust.', Preview: NAPPreview },
  { icon: '🤝', title: 'AI Platform Confirmation', desc: 'Verify and confirm your entity directly with the AI platforms that matter to your buyers.', Preview: ConfirmationPreview },
]

export default function GeoCapabilities() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 28 }}>
      {CARDS.map((card, index) => (
        <PremiumCard key={card.title} card={card} index={index} />
      ))}
    </div>
  )
}

function PremiumCard({ card, index }: { key?: React.Key; card: typeof CARDS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const [inView, setInView] = useState(false)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 30 })
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 30 })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  function handleMouseLeave() {
    setHovered(false)
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      style={{ perspective: 900 }}
    >
      <motion.div
        style={{
          rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d',
          borderRadius: 20, overflow: 'hidden',
          background: '#ffffff',
          border: `1px solid ${ACCENT}33`,
          boxShadow: hovered
            ? `0 0 40px -8px ${ACCENT}44, 0 0 0 1px ${ACCENT}44, 0 20px 40px -12px rgba(0,0,0,0.15)`
            : '0 2px 16px rgba(0,0,0,0.08)',
          transition: 'box-shadow 0.3s ease',
          cursor: 'default',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        {/* Top glow line */}
        <div style={{
          height: 2,
          background: `linear-gradient(90deg, transparent 5%, ${ACCENT} 50%, transparent 95%)`,
          opacity: hovered ? 1 : 0.3, transition: 'opacity 0.4s',
        }} />

        {/* Preview area */}
        <div style={{ position: 'relative', height: 160, overflow: 'hidden', background: '#f4f8fc' }}>
          <card.Preview hovered={hovered} accent={ACCENT} />
        </div>

        {/* Content */}
        <div style={{ padding: '18px 20px 22px' }}>
          <motion.div
            animate={hovered ? { scale: 1.12, rotate: -6 } : { scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{ display: 'inline-block', fontSize: 26, marginBottom: 10 }}
          >
            {card.icon}
          </motion.div>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0f2244', marginBottom: 8, lineHeight: 1.3 }}>{card.title}</h3>
          <p style={{ fontSize: 13.5, color: '#46546e', lineHeight: 1.6 }}>{card.desc}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────
// Per-capability dark-themed animated previews
// ─────────────────────────────────────────────────────────────

function EntityPreview({ hovered, accent }: { hovered: boolean; accent: string }) {
  return (
    <div style={{ position: 'absolute', inset: 10, fontFamily: 'var(--font-mono, monospace)', fontSize: 10.5, color: '#c9d1d9', background: '#0d1117', borderRadius: 10, padding: '10px 12px', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', gap: 4 }}>
      <DarkRow k="@type" v="Organization" valueColor="#f97583" />
      <DarkRow k="name" v={'"SecurityBlogs"'} valueColor="#9ecbff" />
      <DarkRow k="url" v={'"securityblogs.com.au"'} valueColor="#9ecbff" />
      <DarkRow k="areaServed" v={'["AU","US","UK","UAE","SG"]'} valueColor="#9ecbff" />
      <motion.div
        animate={hovered ? { opacity: 1, scale: 1 } : { opacity: 0.5, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        style={{ marginTop: 6, fontFamily: 'system-ui, sans-serif', fontSize: 10, color: '#3fb950', display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(63,185,80,0.12)', borderRadius: 6, padding: '4px 8px', border: '1px solid rgba(63,185,80,0.25)', width: 'fit-content' }}
      >
        <motion.span
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.4, repeat: Infinity }}
          style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: '#3fb950' }}
        />
        Entity verified
      </motion.div>
    </div>
  )
}

function DarkRow({ k, v, valueColor }: { k: string; v: string; valueColor: string }) {
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      <span style={{ color: '#d2a8ff' }}>{k}</span>
      <span style={{ color: 'rgba(255,255,255,0.3)' }}>:</span>
      <span style={{ color: valueColor, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v}</span>
    </div>
  )
}

function KnowledgePanelPreview({ hovered, accent }: { hovered: boolean; accent: string }) {
  return (
    <div style={{ position: 'absolute', inset: 10, background: '#111827', borderRadius: 10, padding: 12, border: '1px solid rgba(255,255,255,0.08)', fontFamily: 'system-ui, sans-serif', display: 'flex', flexDirection: 'column', gap: 5 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: `linear-gradient(135deg, ${accent}, #ff6b7a)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 900, color: '#fff', flexShrink: 0 }}>S</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>SecurityBlogs</div>
          <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.45)' }}>AI Visibility Platform · Security</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10.5 }}>
        <motion.span
          animate={hovered ? { color: '#fbbf24' } : { color: '#f59e0b' }}
          style={{ color: '#f59e0b' }}
        >★★★★★</motion.span>
        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10 }}>5.0 · 142 reviews</span>
      </div>
      <div style={{ fontSize: 10, color: '#60a5fa' }}>securityblogs.com.au</div>
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        <span style={{ background: 'rgba(96,165,250,0.15)', color: '#60a5fa', padding: '2px 6px', borderRadius: 4, fontSize: 9 }}>Website</span>
        <span style={{ background: 'rgba(52,211,153,0.15)', color: '#34d399', padding: '2px 6px', borderRadius: 4, fontSize: 9 }}>Contact</span>
        <span style={{ background: `${accent}20`, color: accent, padding: '2px 6px', borderRadius: 4, fontSize: 9 }}>Services</span>
      </div>
    </div>
  )
}

const SIGNAL_ITEMS = [
  { name: 'Wikidata', status: 'synced' as const },
  { name: 'Crunchbase', status: 'synced' as const },
  { name: 'LinkedIn', status: 'syncing' as const },
  { name: 'Industry dirs', status: 'syncing' as const },
]

function SignalDistributionPreview({ hovered, accent }: { hovered: boolean; accent: string }) {
  return (
    <div style={{ position: 'absolute', inset: 10, fontFamily: 'system-ui, sans-serif', fontSize: 11, background: '#111827', borderRadius: 10, padding: '10px 12px', border: '1px solid rgba(255,255,255,0.08)' }}>
      {SIGNAL_ITEMS.map((it, i) => (
        <div key={it.name} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5.5px 0', borderBottom: i < SIGNAL_ITEMS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
          <span style={{ flex: 1, color: 'rgba(255,255,255,0.75)', fontSize: 11 }}>{it.name}</span>
          {it.status === 'synced' ? (
            <span style={{ fontSize: 9.5, color: '#34d399', display: 'inline-flex', alignItems: 'center', gap: 4, background: 'rgba(52,211,153,0.12)', borderRadius: 5, padding: '2px 7px', border: '1px solid rgba(52,211,153,0.2)' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399' }} />
              SYNCED
            </span>
          ) : (
            <span style={{ fontSize: 9.5, color: '#60a5fa', display: 'inline-flex', alignItems: 'center', gap: 4, background: 'rgba(96,165,250,0.12)', borderRadius: 5, padding: '2px 7px', border: '1px solid rgba(96,165,250,0.2)' }}>
              <motion.span
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3 }}
                style={{ width: 6, height: 6, borderRadius: '50%', background: '#60a5fa', display: 'inline-block' }}
              />
              SYNCING
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

const PLATFORMS_CROSS = [
  { name: 'ChatGPT', bg: '#10a37f', mono: 'AI' },
  { name: 'Gemini', bg: '#4285f4', mono: 'G' },
  { name: 'Claude', bg: '#cc785c', mono: 'C' },
  { name: 'Perplexity', bg: '#1FB8CD', mono: 'P' },
]

function CrossPlatformPreview({ hovered, accent }: { hovered: boolean; accent: string }) {
  return (
    <div style={{ position: 'absolute', inset: 10, fontFamily: 'system-ui, sans-serif', background: '#111827', borderRadius: 10, padding: '10px 12px', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
        {PLATFORMS_CROSS.map((p) => (
          <motion.div
            key={p.name}
            animate={hovered ? { borderColor: `${p.bg}44` } : { borderColor: 'rgba(255,255,255,0.06)' }}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 7px', background: 'rgba(255,255,255,0.03)', borderRadius: 7, border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <span style={{ width: 18, height: 18, borderRadius: 5, background: p.bg, color: '#fff', fontSize: 9, fontWeight: 700, display: 'grid', placeItems: 'center', flexShrink: 0 }}>{p.mono}</span>
            <span style={{ flex: 1, fontSize: 10, color: 'rgba(255,255,255,0.75)' }}>{p.name}</span>
            <span style={{ color: '#34d399', fontSize: 11, fontWeight: 700 }}>✓</span>
          </motion.div>
        ))}
      </div>
      <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.3)', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 5 }}>
        All cite <strong style={{ color: '#60a5fa' }}>securityblogs.com.au</strong>
      </div>
    </div>
  )
}

const NAP_FIELDS = [
  { k: 'Name', v: 'SecurityBlogs' },
  { k: 'Address', v: 'Australia (Remote-first)' },
  { k: 'Phone', v: '+61 411 212 418' },
  { k: 'Email', v: 'info@securityblogs.com.au' },
]

function NAPPreview({ hovered, accent }: { hovered: boolean; accent: string }) {
  return (
    <div style={{ position: 'absolute', inset: 10, fontFamily: 'system-ui, sans-serif', fontSize: 10.5, background: '#111827', borderRadius: 10, padding: '10px 12px', border: '1px solid rgba(255,255,255,0.08)' }}>
      {NAP_FIELDS.map((f, i) => (
        <div key={f.k} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0', borderBottom: i < NAP_FIELDS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
          <span style={{ width: 52, fontSize: 9, color: 'rgba(255,255,255,0.35)', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: 0.5, flexShrink: 0 }}>{f.k}</span>
          <span style={{ flex: 1, fontSize: 10, color: 'rgba(255,255,255,0.7)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>{f.v}</span>
          <motion.span
            animate={hovered ? { scale: 1.15 } : { scale: 1 }}
            style={{ width: 16, height: 16, borderRadius: '50%', background: '#34d399', color: '#fff', fontSize: 9.5, fontWeight: 700, display: 'grid', placeItems: 'center', flexShrink: 0 }}
          >✓</motion.span>
        </div>
      ))}
    </div>
  )
}

const CONFIRM_ITEMS = [
  { name: 'ChatGPT', status: 'verified' as const },
  { name: 'Gemini', status: 'verified' as const },
  { name: 'Perplexity', status: 'verified' as const },
  { name: 'Claude', status: 'pending' as const },
]

function ConfirmationPreview({ hovered, accent }: { hovered: boolean; accent: string }) {
  return (
    <div style={{ position: 'absolute', inset: 10, fontFamily: 'system-ui, sans-serif', fontSize: 11, background: '#111827', borderRadius: 10, padding: '10px 12px', border: '1px solid rgba(255,255,255,0.08)' }}>
      {CONFIRM_ITEMS.map((it, i) => (
        <div key={it.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5.5px 0', borderBottom: i < CONFIRM_ITEMS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
          <span style={{ color: 'rgba(255,255,255,0.75)' }}>{it.name}</span>
          {it.status === 'verified' ? (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 9.5, color: '#34d399', fontWeight: 700, background: 'rgba(52,211,153,0.12)', borderRadius: 5, padding: '2px 7px', border: '1px solid rgba(52,211,153,0.2)' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399' }} />
              VERIFIED
            </span>
          ) : (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 9.5, color: '#fbbf24', fontWeight: 700, background: 'rgba(251,191,36,0.12)', borderRadius: 5, padding: '2px 7px', border: '1px solid rgba(251,191,36,0.2)' }}>
              <motion.span
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.1, repeat: Infinity }}
                style={{ width: 6, height: 6, borderRadius: '50%', background: '#fbbf24', display: 'inline-block' }}
              />
              PENDING
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
