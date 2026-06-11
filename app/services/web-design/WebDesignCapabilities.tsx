'use client'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const ACCENT = '#6366f1'

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
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 200, damping: 30 })
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 200, damping: 30 })

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
  function handleMouseLeave() { setHovered(false); mx.set(0); my.set(0) }

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }} style={{ perspective: 900 }}>
      <motion.div
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d', borderRadius: 20, overflow: 'hidden', background: '#ffffff', border: `1px solid ${ACCENT}33`,
          boxShadow: hovered ? `0 0 40px -8px ${ACCENT}44, 0 0 0 1px ${ACCENT}44, 0 20px 40px -12px rgba(0,0,0,0.15)` : '0 2px 16px rgba(0,0,0,0.08)', transition: 'box-shadow 0.3s ease', cursor: 'default' }}
        onMouseMove={handleMouseMove} onMouseEnter={() => setHovered(true)} onMouseLeave={handleMouseLeave}>
        <div style={{ height: 2, background: `linear-gradient(90deg, transparent 5%, ${ACCENT} 50%, transparent 95%)`, opacity: hovered ? 1 : 0.35, transition: 'opacity 0.4s' }} />
        <div style={{ position: 'relative', height: 170, overflow: 'hidden', background: 'linear-gradient(135deg, #0a0f1e, #0d1829)' }}>
          <card.Preview hovered={hovered} inView={inView} accent={ACCENT} />
        </div>
        <div style={{ padding: '18px 20px 22px' }}>
          <motion.div animate={hovered ? { scale: 1.12, rotate: -6 } : { scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{ display: 'inline-block', fontSize: 26, marginBottom: 10 }}>{card.icon}</motion.div>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0f2244', marginBottom: 8, lineHeight: 1.3 }}>{card.title}</h3>
          <p style={{ fontSize: 13.5, color: '#46546e', lineHeight: 1.6 }}>{card.desc}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── Preview 1 — Live site being built ── */
function BrowserPreview({ inView, accent }: { hovered: boolean; inView: boolean; accent: string }) {
  const [lineIdx, setLineIdx] = useState(-1)
  const [visitors, setVisitors] = useState(0)
  const lines = [
    { t: '<Hero gradient />', c: accent },
    { t: '  <Services schema />', c: '#8b5cf6' },
    { t: '  <ContactForm />', c: '#10b981' },
  ]
  useEffect(() => {
    if (!inView) return
    let i = -1
    const tv = setInterval(() => { i++; setLineIdx(i); if (i >= lines.length - 1) clearInterval(tv) }, 350)
    const vv = setInterval(() => setVisitors(v => v < 1240 ? v + 18 : v), 28)
    return () => { clearInterval(tv); clearInterval(vv) }
  }, [inView])

  return (
    <div style={{ position: 'absolute', inset: '8px 10px', borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)' }}>
      {/* Browser chrome */}
      <div style={{ background: '#111c2e', padding: '5px 8px', display: 'flex', alignItems: 'center', gap: 4, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        {['#ff5f57', '#febc2e', '#28c840'].map(c => <span key={c} style={{ width: 7, height: 7, borderRadius: '50%', background: c }} />)}
        <div style={{ marginLeft: 5, background: '#0a1525', borderRadius: 4, padding: '2px 8px', flex: 1, fontSize: 8, color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-mono)' }}>securityblogs.com.au</div>
        <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.2, repeat: Infinity }} style={{ fontSize: 8, color: '#22c55e', fontWeight: 700 }}>●</motion.span>
      </div>
      {/* Site hero area */}
      <div style={{ background: 'linear-gradient(135deg, #0f2244, #1a1060)', padding: '8px 10px' }}>
        <motion.div initial={{ width: 0 }} animate={inView ? { width: '72%' } : {}} transition={{ duration: 0.8, delay: 0.3 }}
          style={{ height: 7, background: `linear-gradient(90deg, ${accent}, #8b5cf6)`, borderRadius: 4, marginBottom: 5 }} />
        <motion.div initial={{ width: 0 }} animate={inView ? { width: '50%' } : {}} transition={{ duration: 0.6, delay: 0.55 }}
          style={{ height: 5, background: 'rgba(6,182,212,0.7)', borderRadius: 3, marginBottom: 8 }} />
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.9 }}
          style={{ background: `linear-gradient(135deg, ${accent}, #8b5cf6)`, borderRadius: 5, padding: '3px 9px', fontSize: 9, color: '#fff', fontWeight: 700, display: 'inline-block', boxShadow: `0 2px 10px ${accent}60` }}>
          Get Quote →
        </motion.div>
      </div>
      {/* Code strip */}
      <div style={{ background: '#0d1117', padding: '6px 10px' }}>
        {lines.map((l, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -5 }} animate={lineIdx >= i ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.18 }}
            style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: l.c, lineHeight: 1.7 }}>
            {l.t}{lineIdx === i && <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.6, repeat: Infinity }} style={{ display: 'inline-block', width: 2, height: 9, background: accent, marginLeft: 1, verticalAlign: 'middle' }} />}
          </motion.div>
        ))}
      </div>
      {/* Visitor counter */}
      <div style={{ background: '#060f1e', padding: '5px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-mono)' }}>visitors/mo</span>
        <span style={{ fontSize: 13, fontWeight: 900, color: accent, fontFamily: 'var(--font-mono)' }}>{visitors.toLocaleString()}</span>
      </div>
    </div>
  )
}

/* ── Preview 2 — WordPress block editor live ── */
function WPPreview({ inView, accent }: { hovered: boolean; inView: boolean; accent: string }) {
  const [blockIdx, setBlockIdx] = useState(0)
  const blocks = [
    { type: 'Heading', content: 'CCTV installers in Sydney', c: accent },
    { type: 'Paragraph', content: 'AS2201 certified · 500+ installs', c: 'rgba(255,255,255,0.55)' },
    { type: 'Button', content: 'Get Free Quote', c: '#22c55e' },
    { type: 'Image', content: 'hero-banner.webp ✓', c: '#f59e0b' },
  ]
  useEffect(() => {
    if (!inView) return
    const iv = setInterval(() => setBlockIdx(v => v < blocks.length ? v + 1 : v), 500)
    return () => clearInterval(iv)
  }, [inView])

  return (
    <div style={{ position: 'absolute', inset: '8px 10px', borderRadius: 10, overflow: 'hidden', background: '#0f1c2e', border: '1px solid rgba(255,255,255,0.07)' }}>
      <div style={{ background: '#1d2327', padding: '5px 8px', fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: 6, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <span style={{ width: 8, height: 8, borderRadius: 2, background: accent }} />
        WordPress · Block Editor
        <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ marginLeft: 'auto', fontSize: 8, color: '#22c55e' }}>● saving</motion.span>
      </div>
      <div style={{ padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 5 }}>
        {blocks.map((b, i) => (
          <motion.div key={b.type} initial={{ opacity: 0, x: -8 }} animate={i < blockIdx ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.25 }}
            style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${i === blockIdx - 1 ? accent + '55' : 'rgba(255,255,255,0.07)'}`, padding: '4px 8px', borderRadius: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-mono)' }}>{b.type}</span>
            <span style={{ fontSize: 9.5, color: b.c, fontWeight: 600 }}>{b.content}</span>
          </motion.div>
        ))}
        {blockIdx >= blocks.length && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring' }}
            style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <motion.span animate={{ background: [accent, '#22c55e', accent] }} transition={{ duration: 1.5, repeat: Infinity }}
              style={{ color: '#fff', padding: '3px 9px', borderRadius: 5, fontSize: 9, fontWeight: 700 }}>PUBLISHED ✓</motion.span>
            <span style={{ color: '#22c55e', fontSize: 10 }}>● Live</span>
          </motion.div>
        )}
      </div>
    </div>
  )
}

/* ── Preview 3 — Core Web Vitals live scoring ── */
function CWVPreview({ inView, accent }: { hovered: boolean; inView: boolean; accent: string }) {
  const [lcp, setLcp] = useState(4.2)
  const [inp, setInp] = useState(380)
  const [cls, setCls] = useState(0.24)
  useEffect(() => {
    if (!inView) return
    const il = setInterval(() => setLcp(v => v > 1.1 ? +(v - 0.05).toFixed(2) : 1.1), 60)
    const ii = setInterval(() => setInp(v => v > 98 ? v - 4 : 98), 55)
    const ic = setInterval(() => setCls(v => v > 0.02 ? +(v - 0.003).toFixed(3) : 0.02), 50)
    return () => { clearInterval(il); clearInterval(ii); clearInterval(ic) }
  }, [inView])

  const good = (v: number, threshold: number) => v <= threshold
  const metrics = [
    { k: 'LCP', v: `${lcp.toFixed(1)}s`, ok: good(lcp, 2.5), target: '< 2.5s' },
    { k: 'INP', v: `${inp}ms`,           ok: good(inp, 200),  target: '< 200ms' },
    { k: 'CLS', v: `${cls.toFixed(3)}`,  ok: good(cls, 0.1),  target: '< 0.1' },
  ]

  return (
    <div style={{ position: 'absolute', inset: '8px 10px', borderRadius: 10, background: '#060f1e', border: '1px solid rgba(255,255,255,0.07)', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.4)', fontWeight: 700, letterSpacing: '0.1em', fontFamily: 'var(--font-mono)' }}>CORE WEB VITALS · LIVE AUDIT</div>
      {metrics.map((m) => (
        <div key={m.k}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, marginBottom: 4 }}>
            <span style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-mono)' }}>{m.k} <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 8.5 }}>{m.target}</span></span>
            <motion.span animate={{ color: m.ok ? '#10b981' : '#ef4444' }} transition={{ duration: 0.3 }}
              style={{ fontFamily: 'var(--font-mono)', fontWeight: 800 }}>{m.v}</motion.span>
          </div>
          <div style={{ height: 7, background: 'rgba(255,255,255,0.07)', borderRadius: 4, overflow: 'hidden' }}>
            <motion.div animate={{ width: m.ok ? '100%' : '35%', background: m.ok ? '#10b981' : '#ef4444' }} transition={{ duration: 0.3 }}
              style={{ height: '100%', borderRadius: 4, boxShadow: m.ok ? '0 0 8px rgba(16,185,129,0.6)' : 'none' }} />
          </div>
        </div>
      ))}
      <motion.div animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.8, repeat: Infinity }}
        style={{ fontSize: 10, color: '#10b981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 5 }}>
        <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.2, repeat: Infinity }} style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
        Optimising to green…
      </motion.div>
    </div>
  )
}

/* ── Preview 4 — Uptime heartbeat monitor ── */
function UptimePreview({ inView, accent }: { hovered: boolean; inView: boolean; accent: string }) {
  const [pulse, setPulse] = useState<number[]>([])
  const [uptime, setUptime] = useState(99.97)
  useEffect(() => {
    if (!inView) return
    const iv = setInterval(() => {
      setPulse(p => [...p.slice(-28), 50 + Math.sin(Date.now() / 300) * 30 + Math.random() * 10])
    }, 120)
    return () => clearInterval(iv)
  }, [inView])

  const days = Array.from({ length: 30 })

  return (
    <div style={{ position: 'absolute', inset: '8px 10px', borderRadius: 10, background: '#060f1e', border: '1px solid rgba(255,255,255,0.07)', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.4)', fontWeight: 700, letterSpacing: '0.1em', fontFamily: 'var(--font-mono)' }}>UPTIME MONITOR</div>
        <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.2, repeat: Infinity }} style={{ fontSize: 9, color: '#10b981', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>● LIVE</motion.div>
      </div>
      {/* Heartbeat line */}
      <div style={{ height: 42, position: 'relative', overflow: 'hidden', background: 'rgba(16,185,129,0.05)', borderRadius: 6, border: '1px solid rgba(16,185,129,0.12)' }}>
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 100 42" preserveAspectRatio="none">
          {pulse.length > 1 && (
            <motion.polyline
              points={pulse.map((v, i) => `${(i / 28) * 100},${42 - v * 0.35}`).join(' ')}
              fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round"
            />
          )}
        </svg>
      </div>
      {/* 30-day status */}
      <div style={{ display: 'flex', gap: 1.5 }}>
        {days.map((_, i) => (
          <motion.div key={i} initial={{ scaleY: 0 }} animate={inView ? { scaleY: 1 } : {}} transition={{ duration: 0.2, delay: i * 0.015 }}
            style={{ flex: 1, height: 14, background: '#10b981', borderRadius: 1.5, transformOrigin: 'bottom', boxShadow: i >= 28 ? '0 0 4px rgba(16,185,129,0.6)' : 'none' }} />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10 }}>
        <span style={{ color: 'rgba(255,255,255,0.35)' }}>0 incidents · 30 days</span>
        <span style={{ color: '#10b981', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>100.00% ↑</span>
      </div>
    </div>
  )
}

/* ── Preview 5 — AI schema entity graph ── */
function SchemaPreview({ inView, accent }: { hovered: boolean; inView: boolean; accent: string }) {
  const [drawn, setDrawn] = useState(0)
  const nodes = [
    { x: 50, y: 50, label: 'Org', primary: true },
    { x: 20, y: 18, label: 'Service' },
    { x: 80, y: 18, label: 'FAQ' },
    { x: 15, y: 80, label: 'Article' },
    { x: 80, y: 78, label: 'Person' },
    { x: 50, y: 88, label: 'Review' },
  ]
  useEffect(() => {
    if (!inView) return
    const iv = setInterval(() => setDrawn(v => v < nodes.length - 1 ? v + 1 : v), 300)
    return () => clearInterval(iv)
  }, [inView])

  return (
    <div style={{ position: 'absolute', inset: '8px 10px', borderRadius: 10, background: '#060f1e', border: '1px solid rgba(255,255,255,0.07)', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 7, left: 10, fontSize: 8.5, color: accent, fontWeight: 700, letterSpacing: '0.08em', fontFamily: 'var(--font-mono)' }}>AI SCHEMA GRAPH · LIVE</div>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
        {nodes.slice(1).map((n, i) => (
          <motion.line key={i} x1="50" y1="50" x2={n.x} y2={n.y} stroke={accent} strokeWidth="0.7"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={i < drawn ? { pathLength: 1, opacity: 0.7 } : {}}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          />
        ))}
        {/* Pulse circles on edges */}
        {nodes.slice(1).map((n, i) => (
          i < drawn && (
            <motion.circle key={`p${i}`} r="1.5" fill={accent}
              animate={{ cx: [50, n.x], cy: [50, n.y], opacity: [0.9, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3 }}
            />
          )
        ))}
        {nodes.map((n, i) => (
          <g key={i}>
            <motion.circle cx={n.x} cy={n.y} r={n.primary ? 9 : 5.5}
              fill={n.primary ? accent : `${accent}55`}
              animate={n.primary ? { r: [8, 10, 8] } : i < drawn ? { r: 5.5 } : { r: 0 }}
              transition={n.primary ? { duration: 2, repeat: Infinity } : { duration: 0.3 }}
            />
            {(n.primary || i < drawn) && (
              <text x={n.x} y={n.y + 2.5} fontSize="3.2" fill="#fff" textAnchor="middle" fontFamily="system-ui" fontWeight="700">{n.label}</text>
            )}
          </g>
        ))}
      </svg>
    </div>
  )
}

/* ── Preview 6 — Before/After redesign with live scores ── */
function BeforeAfterPreview({ inView, accent }: { hovered: boolean; inView: boolean; accent: string }) {
  const [afterScore, setAfterScore] = useState(32)
  const [beforeLcp, setBeforeLcp] = useState(4.2)
  useEffect(() => {
    if (!inView) return
    const ia = setInterval(() => setAfterScore(v => v < 98 ? v + 1 : v), 28)
    return () => clearInterval(ia)
  }, [inView])

  return (
    <div style={{ position: 'absolute', inset: '8px 10px', borderRadius: 10, background: '#060f1e', border: '1px solid rgba(255,255,255,0.07)', padding: 9, display: 'flex', gap: 7 }}>
      {/* Before */}
      <div style={{ flex: 1, background: 'rgba(239,68,68,0.07)', borderRadius: 7, padding: 7, border: '1px solid rgba(239,68,68,0.18)' }}>
        <div style={{ fontSize: 8, color: '#ef4444', fontWeight: 800, letterSpacing: '0.1em', marginBottom: 5 }}>BEFORE</div>
        <div style={{ background: 'rgba(255,255,255,0.1)', height: 5, borderRadius: 2, marginBottom: 3 }} />
        <div style={{ background: 'rgba(255,255,255,0.06)', height: 4, borderRadius: 2, marginBottom: 3, width: '70%' }} />
        <div style={{ background: 'rgba(255,255,255,0.04)', height: 4, borderRadius: 2, marginBottom: 6, width: '85%' }} />
        <div style={{ fontSize: 8.5, color: '#ef4444', fontWeight: 700 }}>LCP {beforeLcp.toFixed(1)}s</div>
        <div style={{ fontSize: 8.5, color: '#ef4444' }}>CLS 0.18</div>
        <div style={{ marginTop: 5, fontSize: 12, fontWeight: 900, color: '#ef4444', fontFamily: 'var(--font-mono)' }}>32</div>
        <div style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.3)' }}>page score</div>
      </div>
      {/* Arrow */}
      <motion.span animate={{ x: [0, 3, 0], scale: [1, 1.2, 1] }} transition={{ duration: 1.4, repeat: Infinity }}
        style={{ alignSelf: 'center', fontSize: 16, color: accent, fontWeight: 700, flexShrink: 0 }}>→</motion.span>
      {/* After */}
      <motion.div animate={{ borderColor: `${accent}70`, boxShadow: `0 0 12px ${accent}25` }} transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
        style={{ flex: 1, background: `${accent}0d`, borderRadius: 7, padding: 7, border: `1px solid ${accent}55` }}>
        <div style={{ fontSize: 8, color: accent, fontWeight: 800, letterSpacing: '0.1em', marginBottom: 5 }}>AFTER</div>
        <motion.div animate={{ width: '100%' }} initial={{ width: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
          style={{ background: accent, height: 5, borderRadius: 2, marginBottom: 3 }} />
        <motion.div animate={{ width: '70%' }} initial={{ width: 0 }} transition={{ duration: 0.7, delay: 0.7 }}
          style={{ background: `${accent}66`, height: 4, borderRadius: 2, marginBottom: 3 }} />
        <motion.div animate={{ width: '85%' }} initial={{ width: 0 }} transition={{ duration: 0.7, delay: 0.85 }}
          style={{ background: `${accent}44`, height: 4, borderRadius: 2, marginBottom: 6 }} />
        <div style={{ fontSize: 8.5, color: '#10b981', fontWeight: 700 }}>LCP 1.1s</div>
        <div style={{ fontSize: 8.5, color: '#10b981' }}>CLS 0.02</div>
        <motion.div style={{ marginTop: 5, fontSize: 12, fontWeight: 900, color: accent, fontFamily: 'var(--font-mono)' }}>{afterScore}</motion.div>
        <div style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.3)' }}>page score</div>
      </motion.div>
    </div>
  )
}
