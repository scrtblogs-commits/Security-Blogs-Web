'use client'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const ACCENT = '#6f4dff'

const CARDS = [
  {
    icon: '🏷️',
    title: 'Schema Markup',
    desc: 'Structured schema that tells AI systems exactly what your security brand does, serves and is trusted for.',
    color: '#6f4dff',
    glow: 'rgba(111,77,255,0.3)',
  },
  {
    icon: '🧠',
    title: 'Semantic Content Mapping',
    desc: 'Content modelled around the topics, entities and questions AI engines associate with your niche.',
    color: '#1e5fe0',
    glow: 'rgba(30,95,224,0.3)',
  },
  {
    icon: '🗂️',
    title: 'Structured Data',
    desc: 'Clean, machine-readable data layers so answer engines can parse and cite your information.',
    color: '#1e9e75',
    glow: 'rgba(30,158,117,0.3)',
  },
  {
    icon: '🔗',
    title: 'Entity Signal Building',
    desc: 'Consistent signals across the web that establish your brand as a recognised, authoritative entity.',
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.3)',
  },
  {
    icon: '🔄',
    title: 'Content Freshness',
    desc: 'Ongoing updates and new assets that keep your brand current in fast-moving AI indexes.',
    color: '#ef4444',
    glow: 'rgba(239,68,68,0.3)',
  },
  {
    icon: '📡',
    title: 'Citation Monitoring',
    desc: 'Track when and where ChatGPT, Perplexity and Gemini mention your brand — and grow the share.',
    color: '#10a37f',
    glow: 'rgba(16,163,127,0.3)',
  },
]

export default function AioCapabilities() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
      {CARDS.map((card, i) => (
        <PremiumCard key={card.title} card={card} index={i} />
      ))}
    </div>
  )
}

function PremiumCard({ card, index }: { key?: React.Key; card: typeof CARDS[0]; index: number }) {
  const ref    = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const [inView, setInView]   = useState(false)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]),  { stiffness: 200, damping: 30 })
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]),  { stiffness: 200, damping: 30 })
  const glow = useSpring(useTransform(mx, [-0.5, 0.5], [0, 1]),    { stiffness: 200, damping: 30 })

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.25 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top)  / r.height - 0.5)
  }
  const onLeave = () => { mx.set(0); my.set(0); setHovered(false) }

  const Preview = [Schema, SemanticMap, StructuredData, EntitySignals, ContentFresh, Citations][index]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 + Math.floor(index / 3) * 0.15, ease: [0.22, 0.8, 0.2, 1] }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      style={{
        rotateX: rotX, rotateY: rotY,
        transformStyle: 'preserve-3d',
        perspective: 800,
        transformPerspective: 800,
        cursor: 'default',
      }}
    >
      <motion.div
        animate={{
          boxShadow: hovered
            ? `0 20px 60px -12px ${card.glow}, 0 0 0 1px ${card.color}25`
            : `0 4px 20px -8px rgba(18,42,86,0.10), 0 0 0 1px rgba(18,42,86,0.07)`,
        }}
        transition={{ duration: 0.3 }}
        style={{
          background: '#fff',
          borderRadius: 22,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Top glow line that brightens on hover */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0.35 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 2,
            background: `linear-gradient(90deg, transparent, ${card.color}, transparent)`,
            zIndex: 2,
          }}
        />

        {/* Preview area */}
        <div style={{
          position: 'relative', minHeight: 170,
          background: `linear-gradient(145deg, ${card.color}08, ${card.color}04)`,
          borderBottom: `1px solid ${card.color}12`,
          overflow: 'hidden',
        }}>
          {/* Floating glow orb behind preview */}
          <motion.div
            animate={{ scale: hovered ? 1.3 : 1, opacity: hovered ? 0.18 : 0.08 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'absolute', width: 120, height: 120, borderRadius: '50%',
              background: card.color, filter: 'blur(40px)',
              top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
              pointerEvents: 'none',
            }}
          />
          <Preview color={card.color} active={inView} hovered={hovered} />
        </div>

        {/* Text */}
        <div style={{ padding: '20px 22px 22px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <motion.div
              animate={{ rotate: hovered ? [0, -8, 8, 0] : 0, scale: hovered ? 1.15 : 1 }}
              transition={{ duration: 0.5 }}
              style={{
                width: 38, height: 38, borderRadius: 11,
                background: `${card.color}14`, border: `1.5px solid ${card.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, flexShrink: 0,
              }}
            >{card.icon}</motion.div>
            <h3 style={{ fontSize: 15.5, fontWeight: 700, color: 'var(--text)', margin: 0 }}>{card.title}</h3>
          </div>
          <p style={{ fontSize: 13.5, lineHeight: 1.6, color: 'var(--text-dim)', margin: 0 }}>{card.desc}</p>

          {/* Bottom "learn more" row */}
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── Card 1 — Schema Markup: animated JSON code lines ── */
function Schema({ color, active }: { color: string; active: boolean; hovered: boolean }) {
  const lines = [
    { k: '"@context"', v: '"schema.org"',        kc: '#9b5cf6' },
    { k: '"@type"',    v: '"Organization"',       kc: '#9b5cf6' },
    { k: '"name"',     v: '"SecurityBlogs"',      kc: '#6f4dff' },
    { k: '"url"',      v: '"securityblogs.com.au"', kc: '#6f4dff' },
    { k: '"areaServed"', v: '["AU","US","UK"]',   kc: '#a78bfa' },
  ]
  const [idx, setIdx] = useState(-1)
  useEffect(() => {
    if (!active) return
    let i = -1
    const iv = setInterval(() => { i++; setIdx(i); if (i >= lines.length - 1) clearInterval(iv) }, 280)
    return () => clearInterval(iv)
  }, [active])

  return (
    <div style={{ position: 'absolute', inset: 14, background: '#0d1117', borderRadius: 12, padding: '12px 14px', fontFamily: 'var(--font-mono)', fontSize: 10.5, display: 'flex', flexDirection: 'column', gap: 5, border: '1px solid rgba(255,255,255,0.07)' }}>
      <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', marginBottom: 3, letterSpacing: '0.08em' }}>SCHEMA · JSON-LD</div>
      {lines.map((l, i) => (
        <motion.div key={l.k} initial={{ opacity: 0, x: -8 }} animate={idx >= i ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.25 }}
          style={{ display: 'flex', gap: 5 }}>
          <span style={{ color: l.kc }}>{l.k}</span>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>:</span>
          <span style={{ color: '#86efac' }}>{l.v}</span>
        </motion.div>
      ))}
      {idx >= lines.length - 1 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          style={{ marginTop: 4, fontSize: 9, color: '#1e9e75', display: 'flex', alignItems: 'center', gap: 4 }}>
          <motion.div animate={{ scale: [1,1.4,1] }} transition={{ duration: 1.2, repeat: Infinity }}
            style={{ width: 6, height: 6, borderRadius: '50%', background: '#1e9e75' }} />
          Validated on 4 AI engines
        </motion.div>
      )}
    </div>
  )
}

/* ── Card 2 — Semantic Map: animated node graph ── */
const NODES = [
  { cx: 50, cy: 50, r: 9, label: 'SecurityBlogs', primary: true },
  { cx: 18, cy: 22, r: 5.5, label: 'AI Visibility', primary: false },
  { cx: 82, cy: 22, r: 5.5, label: 'SEO',           primary: false },
  { cx: 14, cy: 78, r: 5.5, label: 'CCTV',          primary: false },
  { cx: 86, cy: 78, r: 5.5, label: 'AEO',           primary: false },
  { cx: 50, cy: 14, r: 4.5, label: 'Schema',         primary: false },
]

function SemanticMap({ color, active }: { color: string; active: boolean; hovered: boolean }) {
  const [lineIn, setLineIn] = useState(false)
  const [nodesIn, setNodesIn] = useState(false)
  useEffect(() => {
    if (!active) return
    setTimeout(() => setLineIn(true), 200)
    setTimeout(() => setNodesIn(true), 500)
  }, [active])
  return (
    <div style={{ position: 'absolute', inset: 14, borderRadius: 12, overflow: 'hidden', background: `linear-gradient(135deg, ${color}08, transparent)`, border: `1px solid ${color}15` }}>
      <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
        <defs>
          <radialGradient id={`ng-${color.replace('#','')}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="48" fill={`url(#ng-${color.replace('#','')})`} />
        {NODES.slice(1).map((n, i) => (
          <motion.line key={i}
            x1={NODES[0].cx} y1={NODES[0].cy} x2={n.cx} y2={n.cy}
            stroke={color} strokeWidth="0.5" opacity="0"
            animate={lineIn ? { opacity: 0.5, pathLength: 1 } : {}}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          />
        ))}
        {NODES.map((n, i) => (
          <motion.g key={i} initial={{ scale: 0, opacity: 0 }} animate={nodesIn ? { scale: 1, opacity: 1 } : {}}
            style={{ transformOrigin: `${n.cx}px ${n.cy}px` }} transition={{ delay: i * 0.08, duration: 0.35, type: 'spring', stiffness: 260, damping: 20 }}>
            <circle cx={n.cx} cy={n.cy} r={n.r + 3} fill={color} opacity="0.12" />
            <circle cx={n.cx} cy={n.cy} r={n.r} fill={n.primary ? color : '#fff'} stroke={color} strokeWidth="0.8" />
            <text x={n.cx} y={n.cy + n.r + 5} fontSize="3.8" fill={n.primary ? '#fff' : color} textAnchor="middle" fontWeight={n.primary ? '700' : '400'}>{n.label}</text>
          </motion.g>
        ))}
        {nodesIn && (
          <motion.circle cx={NODES[0].cx} cy={NODES[0].cy} r={NODES[0].r + 2}
            fill="none" stroke={color} strokeWidth="1.5"
            animate={{ r: [NODES[0].r + 2, NODES[0].r + 9, NODES[0].r + 2], opacity: [0.8, 0, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }} />
        )}
      </svg>
    </div>
  )
}

/* ── Card 3 — Structured Data: schema types checklist ── */
const SD_ROWS = [
  { k: 'LocalBusiness',    v: '✓', delay: 0.1 },
  { k: 'FAQPage',         v: '✓', delay: 0.2 },
  { k: 'Service',         v: '✓', delay: 0.3 },
  { k: 'BreadcrumbList', v: '✓', delay: 0.4 },
  { k: 'Person',          v: '✓', delay: 0.5 },
]

function StructuredData({ color, active }: { color: string; active: boolean; hovered: boolean }) {
  return (
    <div style={{ position: 'absolute', inset: 14, background: '#fff', borderRadius: 12, border: `1.5px solid ${color}20`, padding: '10px 12px', overflow: 'hidden' }}>
      <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'rgba(18,42,86,0.4)', letterSpacing: '0.1em', marginBottom: 8 }}>SCHEMA.ORG TYPES ACTIVE</div>
      {SD_ROWS.map((r, i) => (
        <motion.div key={r.k}
          initial={{ opacity: 0, x: -10 }} animate={active ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: r.delay, duration: 0.3 }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0', borderBottom: i < SD_ROWS.length - 1 ? `1px solid ${color}10` : 'none' }}
        >
          <span style={{ fontSize: 11, color: '#1a0dab', fontFamily: 'var(--font-mono)' }}>{r.k}</span>
          <motion.div
            initial={{ scale: 0 }} animate={active ? { scale: 1 } : {}}
            transition={{ delay: r.delay + 0.15, type: 'spring', stiffness: 300, damping: 20 }}
            style={{ width: 18, height: 18, borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#fff', fontWeight: 700 }}>✓</motion.div>
        </motion.div>
      ))}
    </div>
  )
}

/* ── Card 4 — Entity Signals: animated progress bars ── */
const SIGNALS = [
  { name: 'Wikidata',     pct: 100, delay: 0.1 },
  { name: 'Crunchbase',  pct: 88,  delay: 0.2 },
  { name: 'LinkedIn',    pct: 84,  delay: 0.3 },
  { name: 'Google KG',   pct: 76,  delay: 0.4 },
]

function EntitySignals({ color, active }: { color: string; active: boolean; hovered: boolean }) {
  return (
    <div style={{ position: 'absolute', inset: 14, background: '#fff', borderRadius: 12, border: `1.5px solid ${color}20`, padding: '10px 12px' }}>
      <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'rgba(18,42,86,0.4)', letterSpacing: '0.1em', marginBottom: 10 }}>ENTITY COVERAGE SCORE</div>
      {/* Big score ring */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 10 }}>
        <div style={{ position: 'relative', width: 48, height: 48, flexShrink: 0 }}>
          <svg viewBox="0 0 48 48" style={{ width: 48, height: 48, transform: 'rotate(-90deg)' }}>
            <circle cx="24" cy="24" r="19" fill="none" stroke={`${color}15`} strokeWidth="5" />
            <motion.circle cx="24" cy="24" r="19" fill="none" stroke={color} strokeWidth="5" strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 19}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 19 }}
              animate={active ? { strokeDashoffset: 2 * Math.PI * 19 * 0.07 } : {}}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 0.8, 0.2, 1] }} />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 900, color }}>93</div>
        </div>
        <div>
          <div style={{ fontSize: 10, color: '#888', fontFamily: 'var(--font-mono)' }}>ENTITY SCORE</div>
          <div style={{ fontSize: 10.5, fontWeight: 700, color }}>Top 5% of security brands</div>
        </div>
      </div>
      {SIGNALS.map((s) => (
        <div key={s.name} style={{ marginBottom: 6 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
            <span style={{ fontSize: 10, color: '#444' }}>{s.name}</span>
            <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: 700, color }}>{s.pct}%</span>
          </div>
          <div style={{ height: 4, background: `${color}12`, borderRadius: 999, overflow: 'hidden' }}>
            <motion.div initial={{ width: 0 }} animate={active ? { width: `${s.pct}%` } : {}}
              transition={{ delay: s.delay, duration: 0.8, ease: [0.22, 0.8, 0.2, 1] }}
              style={{ height: '100%', background: `linear-gradient(90deg, ${color}, ${color}99)`, borderRadius: 999 }} />
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Card 5 — Content Freshness: animated calendar / publish feed ── */
const FEED = [
  { t: 'Today',     title: 'AI Visibility Guide 2026',  time: '9:41 AM' },
  { t: 'Yesterday', title: 'CCTV SEO Case Study',       time: '2:15 PM' },
  { t: '2d ago',    title: 'Schema Markup Explained',   time: '11:00 AM' },
  { t: '4d ago',    title: 'AEO for Security Brands',   time: '3:30 PM' },
]

function ContentFresh({ color, active }: { color: string; active: boolean; hovered: boolean }) {
  return (
    <div style={{ position: 'absolute', inset: 14, background: '#fff', borderRadius: 12, border: `1.5px solid ${color}20`, padding: '10px 12px', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'rgba(18,42,86,0.4)', letterSpacing: '0.1em' }}>CONTENT PUBLISH FEED</div>
        <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.4, repeat: Infinity }}
          style={{ fontSize: 8.5, fontFamily: 'var(--font-mono)', color, display: 'flex', alignItems: 'center', gap: 3 }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: color }} />LIVE
        </motion.div>
      </div>
      {FEED.map((f, i) => (
        <motion.div key={f.title}
          initial={{ opacity: 0, y: 8 }} animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 + i * 0.12, duration: 0.35 }}
          style={{ display: 'flex', gap: 8, alignItems: 'flex-start', padding: '5px 0', borderBottom: i < FEED.length - 1 ? `1px solid ${color}10` : 'none' }}
        >
          <div style={{ width: 4, height: 4, borderRadius: '50%', background: i === 0 ? color : `${color}55`, marginTop: 5, flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 10.5, fontWeight: i === 0 ? 700 : 500, color: i === 0 ? '#1a1a2e' : '#555', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.title}</div>
            <div style={{ fontSize: 9, color: '#aaa', fontFamily: 'var(--font-mono)' }}>{f.t} · {f.time}</div>
          </div>
          {i === 0 && (
            <div style={{ fontSize: 8.5, fontFamily: 'var(--font-mono)', color: '#fff', background: color, padding: '2px 6px', borderRadius: 999, flexShrink: 0 }}>NEW</div>
          )}
        </motion.div>
      ))}
    </div>
  )
}

/* ── Card 6 — Citation Monitoring: platform citation bars ── */
const PLATFORMS = [
  { name: 'ChatGPT',    count: 47, color: '#10a37f', delay: 0.1 },
  { name: 'Perplexity', count: 32, color: '#1FB8CD', delay: 0.2 },
  { name: 'Gemini',     count: 28, color: '#4285f4', delay: 0.3 },
  { name: 'Claude',     count: 19, color: '#d97706', delay: 0.4 },
]

function Citations({ color, active }: { color: string; active: boolean; hovered: boolean }) {
  const max = 47
  return (
    <div style={{ position: 'absolute', inset: 14, background: '#fff', borderRadius: 12, border: `1.5px solid ${color}20`, padding: '10px 12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
        <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'rgba(18,42,86,0.4)', letterSpacing: '0.1em' }}>CITATIONS THIS MONTH</div>
        <motion.div
          initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : {}} transition={{ delay: 0.6 }}
          style={{ fontSize: 16, fontWeight: 900, color, fontFamily: 'var(--font-mono)', lineHeight: 1 }}>126</motion.div>
      </div>
      {PLATFORMS.map((p) => (
        <div key={p.name} style={{ marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 3 }}>
            <div style={{ width: 14, height: 14, borderRadius: 4, background: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, color: '#fff', fontWeight: 700, flexShrink: 0 }}>{p.name[0]}</div>
            <span style={{ fontSize: 10.5, flex: 1 }}>{p.name}</span>
            <motion.span initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : {}} transition={{ delay: p.delay + 0.5 }}
              style={{ fontSize: 11, fontWeight: 700, color: p.color, fontFamily: 'var(--font-mono)' }}>{p.count}</motion.span>
          </div>
          <div style={{ height: 6, background: `${p.color}12`, borderRadius: 999, overflow: 'hidden' }}>
            <motion.div initial={{ width: 0 }} animate={active ? { width: `${(p.count / max) * 100}%` } : {}}
              transition={{ delay: p.delay, duration: 0.9, ease: [0.22, 0.8, 0.2, 1] }}
              style={{ height: '100%', background: `linear-gradient(90deg, ${p.color}, ${p.color}aa)`, borderRadius: 999 }} />
          </div>
        </div>
      ))}
    </div>
  )
}
