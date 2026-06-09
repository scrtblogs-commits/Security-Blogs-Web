'use client'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const ACCENT = '#1e5fe0'

const CARDS = [
  { icon: '🛡️', title: 'Security Website Design', desc: 'Conversion-focused websites built specifically for security installers, monitoring firms and product brands — designed to turn visitors into qualified enquiries.', Preview: BrowserPreview },
  { icon: '🧩', title: 'WordPress Development', desc: 'Fast, secure, easy-to-edit WordPress builds with custom themes and blocks so your team can update content without touching code.', Preview: WPPreview },
  { icon: '⚡', title: 'Core Web Vitals Optimisation', desc: 'Every site is engineered for green Core Web Vitals — fast loads, stable layouts and instant interactivity that Google and buyers reward.', Preview: CWVPreview },
  { icon: '🔧', title: 'Hosting & Maintenance', desc: 'Managed edge hosting, security patching, backups and uptime monitoring so your site stays fast, safe and online — hands-off for you.', Preview: UptimePreview },
  { icon: '🤖', title: 'AI Search Architecture', desc: 'Schema-rich, entity-mapped, answer-first architecture so AI engines like ChatGPT and Perplexity can understand and cite your brand.', Preview: SchemaPreview },
  { icon: '🎨', title: 'Website Redesign', desc: 'Modernise an ageing security site without losing rankings — we migrate carefully, preserve equity and lift conversions and speed.', Preview: BeforeAfterPreview },
]

export default function WebDesignCapabilities() {
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

/* ── Preview 1 — Browser mockup with dark theme ── */
function BrowserPreview({ hovered, accent }: { hovered: boolean; accent: string }) {
  return (
    <div style={{ position: 'absolute', inset: 10, borderRadius: 10, overflow: 'hidden', background: '#0a1525', border: '1px solid rgba(255,255,255,0.07)' }}>
      {/* Browser chrome */}
      <div style={{ background: '#111c2e', padding: '5px 8px', display: 'flex', alignItems: 'center', gap: 4, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#ff5f57' }} />
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#febc2e' }} />
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#28c840' }} />
        <div style={{ marginLeft: 6, background: '#0a1525', borderRadius: 4, padding: '2px 8px', flex: 1, fontSize: 8, color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-mono)' }}>securityblogs.com.au</div>
      </div>
      {/* Site preview */}
      <div style={{ padding: '10px 12px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#fff', marginBottom: 5 }}>Be the answer AI gives.</div>
        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.45)', marginBottom: 8 }}>AI visibility &amp; SEO for security brands.</div>
        <div style={{ display: 'flex', gap: 5 }}>
          <span style={{ background: accent, color: '#fff', padding: '3px 9px', borderRadius: 5, fontSize: 9, fontWeight: 700 }}>Free audit</span>
          <span style={{ background: 'transparent', border: `1px solid ${accent}55`, color: accent, padding: '3px 9px', borderRadius: 5, fontSize: 9 }}>Live score</span>
        </div>
        <motion.div
          animate={{ width: hovered ? '80%' : '40%' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ height: 3, background: `${accent}44`, borderRadius: 2, marginTop: 10 }}
        />
        <div style={{ height: 3, background: 'rgba(255,255,255,0.07)', borderRadius: 2, marginTop: 4, width: '65%' }} />
      </div>
    </div>
  )
}

/* ── Preview 2 — Dark WordPress block editor ── */
function WPPreview({ hovered, accent }: { hovered: boolean; accent: string }) {
  return (
    <div style={{ position: 'absolute', inset: 10, borderRadius: 10, overflow: 'hidden', background: '#0f1c2e', border: '1px solid rgba(255,255,255,0.07)' }}>
      {/* Admin bar */}
      <div style={{ background: '#1d2327', padding: '5px 8px', fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: 6, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <span style={{ width: 8, height: 8, borderRadius: 2, background: accent }} />
        WordPress · Block Editor
      </div>
      {/* Editor area */}
      <div style={{ padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 5 }}>
        <motion.div
          animate={{ borderColor: hovered ? accent : `${accent}44` }}
          transition={{ duration: 0.3 }}
          style={{ background: 'rgba(255,255,255,0.03)', padding: '4px 7px', border: `1px dashed ${accent}44`, borderRadius: 4, fontSize: 9, color: accent, fontWeight: 700 }}
        >
          + Heading block
        </motion.div>
        <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', padding: '4px 7px', borderRadius: 4, fontSize: 10, color: 'rgba(255,255,255,0.75)' }}>Security CCTV installers in Sydney</div>
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', padding: '4px 7px', borderRadius: 4, fontSize: 9, color: 'rgba(255,255,255,0.4)' }}>Built on WP. Editable in 30 seconds.</div>
        <div style={{ display: 'flex', gap: 5, marginTop: 2 }}>
          <motion.span
            animate={{ background: hovered ? accent : `${accent}cc` }}
            transition={{ duration: 0.3 }}
            style={{ color: '#fff', padding: '2px 7px', borderRadius: 4, fontSize: 8, fontWeight: 700 }}
          >PUBLISH ✓</motion.span>
          <span style={{ color: '#28c840', fontSize: 9 }}>● Live</span>
        </div>
      </div>
    </div>
  )
}

/* ── Preview 3 — Core Web Vitals dark grid ── */
function CWVPreview({ hovered }: { hovered: boolean; accent: string }) {
  const metrics = [{ k: 'LCP', v: '1.2s' }, { k: 'INP', v: '120ms' }, { k: 'CLS', v: '0.04' }]
  return (
    <div style={{ position: 'absolute', inset: 10, borderRadius: 10, background: '#060f1e', border: '1px solid rgba(255,255,255,0.07)', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', fontWeight: 700, letterSpacing: '0.1em', fontFamily: 'var(--font-mono)' }}>CORE WEB VITALS · MOBILE</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
        {metrics.map((m, i) => (
          <motion.div
            key={m.k}
            animate={{ scale: hovered && i === 0 ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
            style={{ textAlign: 'center', padding: '6px 4px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.35)', borderRadius: 7 }}
          >
            <div style={{ fontSize: 9, color: '#10b981', fontWeight: 700 }}>{m.k}</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#10b981', fontFamily: 'var(--font-mono)' }}>{m.v}</div>
          </motion.div>
        ))}
      </div>
      <motion.div
        animate={{ opacity: hovered ? 1 : 0.7 }}
        style={{ fontSize: 9.5, color: '#10b981', textAlign: 'center', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}
      >
        <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.2, repeat: Infinity }}
          style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
        All metrics GREEN
      </motion.div>
    </div>
  )
}

/* ── Preview 4 — Uptime monitor dark ── */
function UptimePreview({ hovered, accent }: { hovered: boolean; accent: string }) {
  const days = Array.from({ length: 30 })
  return (
    <div style={{ position: 'absolute', inset: 10, borderRadius: 10, background: '#060f1e', border: '1px solid rgba(255,255,255,0.07)', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', fontWeight: 700, letterSpacing: '0.1em', fontFamily: 'var(--font-mono)' }}>UPTIME · LAST 30 DAYS</div>
      <div style={{ display: 'flex', gap: 1.5, marginTop: 2 }}>
        {days.map((_, i) => (
          <motion.span
            key={i}
            animate={{ height: hovered && i === days.length - 1 ? 22 : 18 }}
            transition={{ duration: 0.3 }}
            style={{ flex: 1, height: 18, background: '#10b981', borderRadius: 1.5, display: 'block' }}
          />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10 }}>
        <span style={{ color: 'rgba(255,255,255,0.35)' }}>0 incidents</span>
        <span style={{ color: '#10b981', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>100.00%</span>
      </div>
      <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-mono)' }}>Backups · Patches · TLS auto-renewed</div>
    </div>
  )
}

/* ── Preview 5 — Schema entity graph dark ── */
function SchemaPreview({ hovered, accent }: { hovered: boolean; accent: string }) {
  const nodes = [
    { x: 50, y: 50, label: 'Org', primary: true },
    { x: 22, y: 22, label: 'Service' },
    { x: 78, y: 22, label: 'FAQ' },
    { x: 22, y: 78, label: 'Article' },
    { x: 78, y: 78, label: 'Person' },
  ]
  return (
    <div style={{ position: 'absolute', inset: 10, borderRadius: 10, background: '#060f1e', border: '1px solid rgba(255,255,255,0.07)', overflow: 'hidden' }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
        {nodes.slice(1).map((n, i) => (
          <motion.line
            key={i}
            x1="50" y1="50" x2={n.x} y2={n.y}
            stroke={accent} strokeWidth="0.6"
            animate={{ opacity: hovered ? 0.8 : 0.35 }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
          />
        ))}
        {nodes.map((n, i) => (
          <g key={i}>
            <motion.circle
              cx={n.x} cy={n.y} r={n.primary ? 9 : 5.5}
              fill={n.primary ? accent : `${accent}55`}
              animate={{ r: n.primary && hovered ? 10 : n.primary ? 9 : 5.5 }}
              transition={{ duration: 0.3 }}
            />
            <text x={n.x} y={n.y + 2.5} fontSize="3.5" fill="#fff" textAnchor="middle" fontFamily="system-ui" fontWeight="700">{n.label}</text>
          </g>
        ))}
      </svg>
    </div>
  )
}

/* ── Preview 6 — Before/After redesign dark ── */
function BeforeAfterPreview({ hovered, accent }: { hovered: boolean; accent: string }) {
  return (
    <div style={{ position: 'absolute', inset: 10, borderRadius: 10, background: '#060f1e', border: '1px solid rgba(255,255,255,0.07)', padding: 8, display: 'flex', gap: 6 }}>
      {/* Before */}
      <div style={{ flex: 1, background: 'rgba(255,255,255,0.04)', borderRadius: 7, padding: 7, border: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.35)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 5 }}>BEFORE</div>
        <div style={{ background: 'rgba(255,255,255,0.1)', height: 5, borderRadius: 2, marginBottom: 3 }} />
        <div style={{ background: 'rgba(255,255,255,0.07)', height: 4, borderRadius: 2, marginBottom: 3, width: '70%' }} />
        <div style={{ background: 'rgba(255,255,255,0.05)', height: 4, borderRadius: 2, marginBottom: 3, width: '85%' }} />
        <div style={{ fontSize: 8, color: '#ef4444', fontWeight: 700, marginTop: 5 }}>LCP 4.2s</div>
        <div style={{ fontSize: 8, color: '#ef4444' }}>CLS 0.18</div>
      </div>
      {/* Arrow */}
      <motion.span
        animate={{ x: hovered ? 2 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ alignSelf: 'center', fontSize: 14, color: accent, fontWeight: 700 }}
      >→</motion.span>
      {/* After */}
      <motion.div
        animate={{ borderColor: hovered ? accent : `${accent}55` }}
        transition={{ duration: 0.3 }}
        style={{ flex: 1, background: `${accent}0d`, borderRadius: 7, padding: 7, border: `1px solid ${accent}55` }}
      >
        <div style={{ fontSize: 8, color: accent, fontWeight: 700, letterSpacing: '0.1em', marginBottom: 5 }}>AFTER</div>
        <div style={{ background: accent, height: 5, borderRadius: 2, marginBottom: 3 }} />
        <div style={{ background: `${accent}66`, height: 4, borderRadius: 2, marginBottom: 3, width: '70%' }} />
        <div style={{ background: `${accent}44`, height: 4, borderRadius: 2, marginBottom: 3, width: '85%' }} />
        <div style={{ fontSize: 8, color: '#10b981', fontWeight: 700, marginTop: 5 }}>LCP 1.2s</div>
        <div style={{ fontSize: 8, color: '#10b981' }}>CLS 0.04</div>
      </motion.div>
    </div>
  )
}
