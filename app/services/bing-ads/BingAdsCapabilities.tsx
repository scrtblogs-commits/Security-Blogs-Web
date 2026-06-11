'use client'
import type React from 'react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const ACCENT = '#0078d4'
const LI = '#0a66c2'

const CARDS = [
  { icon: '💼', title: 'LinkedIn Audience Targeting', desc: 'Target security buyers by job title, industry, company size and seniority — profile data only Microsoft can offer.', Preview: LinkedInPreview },
  { icon: '💲', title: 'Lower CPCs Than Google', desc: 'Less competition on Microsoft means the same high-intent security clicks at roughly half the cost-per-click.', Preview: CPCPreview },
  { icon: '🧑‍💼', title: 'B2B Decision Makers', desc: '41% of B2B buyers use Bing and Microsoft properties — often older, higher-budget commercial decision-makers.', Preview: B2BPreview },
  { icon: '🔬', title: 'Microsoft Clarity Analytics', desc: 'Free session recordings and heatmaps reveal exactly how security buyers interact with your landing pages.', Preview: ClarityPreview },
  { icon: '🔁', title: 'Sequential Remarketing', desc: 'Show buyers a story across the Audience Network — awareness, proof, then offer — until they convert.', Preview: JourneyPreview },
  { icon: '🕵️', title: 'Competitor Intelligence', desc: 'Conquest rival security brands and use auction insights to find gaps Google advertisers are ignoring.', Preview: CompetitorPreview },
]

export default function BingAdsCapabilities() {
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
        <div style={{ position: 'relative', height: 170, overflow: 'hidden', background: 'linear-gradient(135deg, #0d1829, #091422)' }}>
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

/* ── Card 1 — LinkedIn Audience Targeting ── */
function LinkedInPreview({ inView, accent }: { hovered: boolean; inView: boolean; accent: string }) {
  const [count, setCount] = useState(28400)
  const [shown, setShown] = useState(0)
  const filters = [
    { k: 'Job title', v: 'CSO / Facilities Mgr' },
    { k: 'Industry', v: 'Security · Logistics' },
    { k: 'Company size', v: '50+ employees' },
    { k: 'Seniority', v: 'Director+' },
  ]
  useEffect(() => {
    if (!inView) return
    const si = setInterval(() => setShown(v => Math.min(v + 1, filters.length)), 280)
    const ci = setInterval(() => setCount(v => v + 3), 800)
    return () => { clearInterval(si); clearInterval(ci) }
  }, [inView])

  return (
    <div style={{ position: 'absolute', inset: 0, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 5 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
        <div style={{ width: 20, height: 20, borderRadius: 5, background: LI, display: 'grid', placeItems: 'center', fontSize: 11, fontWeight: 900, color: '#fff', flexShrink: 0 }}>in</div>
        <span style={{ fontSize: 9, color: accent, fontWeight: 800, letterSpacing: '0.08em', fontFamily: 'var(--font-mono)' }}>LINKEDIN PROFILE TARGETING</span>
        <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ marginLeft: 'auto', fontSize: 8, color: '#22c55e', fontWeight: 700 }}>● LIVE</motion.span>
      </div>
      {filters.map((f, i) => (
        <motion.div key={f.k} initial={{ opacity: 0, x: -10 }} animate={i < shown ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.3 }}
          style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 8px', background: `${accent}12`, border: `1px solid ${accent}28`, borderRadius: 7 }}>
          <span style={{ width: 72, fontSize: 8.5, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 0.4, fontFamily: 'var(--font-mono)', flexShrink: 0 }}>{f.k}</span>
          <span style={{ flex: 1, fontSize: 10, color: '#fff', fontWeight: 600 }}>{f.v}</span>
          <span style={{ width: 14, height: 14, borderRadius: '50%', background: accent, color: '#fff', fontSize: 8, fontWeight: 700, display: 'grid', placeItems: 'center', flexShrink: 0 }}>✓</span>
        </motion.div>
      ))}
      <motion.div animate={{ color: [accent, '#22c55e', accent] }} transition={{ duration: 2, repeat: Infinity }}
        style={{ fontSize: 11, fontWeight: 800, marginTop: 2, fontFamily: 'var(--font-mono)' }}>
        ~ {count.toLocaleString()} matched buyers
      </motion.div>
    </div>
  )
}

/* ── Card 2 — Lower CPCs Than Google ── */
function CPCPreview({ inView, accent }: { hovered: boolean; inView: boolean; accent: string }) {
  const [cpcM, setCpcM] = useState(17.6)
  useEffect(() => {
    if (!inView) return
    const iv = setInterval(() => setCpcM(v => v > 5.8 ? +(v - 0.14).toFixed(2) : 5.8), 55)
    return () => clearInterval(iv)
  }, [inView])

  const saving = Math.round((1 - cpcM / 17.6) * 100)

  return (
    <div style={{ position: 'absolute', inset: 0, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.4)', fontWeight: 700, letterSpacing: '0.1em', fontFamily: 'var(--font-mono)' }}>CPC COMPARISON · LIVE</div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10.5, marginBottom: 5 }}>
          <span style={{ color: 'rgba(255,255,255,0.7)' }}>Google Ads</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#ef4444' }}>$17.60</span>
        </div>
        <div style={{ height: 9, background: 'rgba(255,255,255,0.07)', borderRadius: 5 }}>
          <motion.div animate={{ width: '100%' }} transition={{ duration: 0.6 }}
            style={{ height: '100%', background: 'linear-gradient(90deg, #f59e0b, #ef4444)', borderRadius: 5 }} />
        </div>
      </div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10.5, marginBottom: 5 }}>
          <span style={{ color: 'rgba(255,255,255,0.7)' }}>Microsoft Ads</span>
          <motion.span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#22c55e' }}>${cpcM.toFixed(2)}</motion.span>
        </div>
        <div style={{ height: 9, background: 'rgba(255,255,255,0.07)', borderRadius: 5, overflow: 'hidden' }}>
          <motion.div animate={{ width: `${(cpcM / 17.6) * 100}%` }} transition={{ duration: 0.1 }}
            style={{ height: '100%', background: `linear-gradient(90deg, ${accent}, #00bcf2)`, borderRadius: 5, boxShadow: `0 0 10px ${accent}88` }} />
        </div>
      </div>
      <motion.div animate={{ scale: saving > 50 ? [1, 1.06, 1] : 1 }} transition={{ duration: 1, repeat: Infinity }}
        style={{ fontSize: 13, color: '#22c55e', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
        ↓ {saving}% cheaper per click
      </motion.div>
    </div>
  )
}

/* ── Card 3 — B2B Decision Makers ── */
function B2BPreview({ inView, accent }: { hovered: boolean; inView: boolean; accent: string }) {
  const [pct, setPct] = useState(0)
  const r = 28, circ = 2 * Math.PI * r
  useEffect(() => {
    if (!inView) return
    const iv = setInterval(() => setPct(v => v < 41 ? v + 1 : v), 40)
    return () => clearInterval(iv)
  }, [inView])

  const tags = ['Security Mgr', 'Facilities Dir', 'Head of Ops', 'Procurement']
  const [tagShown, setTagShown] = useState(0)
  useEffect(() => {
    if (!inView) return
    const iv = setInterval(() => setTagShown(v => (v + 1) % (tags.length + 1) || tags.length), 600)
    return () => clearInterval(iv)
  }, [inView])

  return (
    <div style={{ position: 'absolute', inset: 0, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.4)', fontWeight: 700, letterSpacing: '0.1em', fontFamily: 'var(--font-mono)' }}>B2B BUYER MIX · MICROSOFT</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ position: 'relative', width: 76, height: 76, flexShrink: 0 }}>
          <svg viewBox="0 0 72 72" style={{ width: 76, height: 76, transform: 'rotate(-90deg)' }}>
            <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="7" />
            <motion.circle cx="36" cy="36" r={r} fill="none" stroke={accent} strokeWidth="7" strokeLinecap="round"
              strokeDasharray={circ}
              animate={{ strokeDashoffset: circ * (1 - pct / 100) }}
              transition={{ duration: 0.05 }}
            />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 900, color: accent, fontFamily: 'var(--font-mono)' }}>{pct}%</div>
        </div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', lineHeight: 1.55 }}>
          of B2B buyers use Bing + Microsoft — higher-budget commercial decision-makers.
        </div>
      </div>
      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
        {tags.map((tag, i) => (
          <motion.span key={tag} initial={{ opacity: 0, scale: 0.8 }} animate={i < tagShown ? { opacity: 1, scale: 1 } : { opacity: 0.3, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            style={{ fontSize: 9, fontFamily: 'var(--font-mono)', padding: '3px 8px', borderRadius: 999, background: `${accent}20`, color: accent, border: `1px solid ${accent}40` }}>
            {tag}
          </motion.span>
        ))}
      </div>
    </div>
  )
}

/* ── Card 4 — Microsoft Clarity Analytics ── */
function ClarityPreview({ inView, accent }: { hovered: boolean; inView: boolean; accent: string }) {
  const [cursor, setCursor] = useState({ x: 50, y: 50 })
  const [clicks, setClicks] = useState(0)
  useEffect(() => {
    if (!inView) return
    const iv = setInterval(() => {
      setCursor({ x: 20 + Math.random() * 60, y: 25 + Math.random() * 50 })
      if (Math.random() > 0.6) setClicks(v => v + 1)
    }, 700)
    return () => clearInterval(iv)
  }, [inView])

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <div style={{ position: 'absolute', inset: '10px 12px', background: '#0d1829', borderRadius: 8, border: '1px solid rgba(255,255,255,0.07)', overflow: 'hidden' }}>
        <div style={{ height: 18, background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', padding: '0 8px', gap: 4 }}>
          {['#ff5f57', '#febc2e', '#28c840'].map(c => <div key={c} style={{ width: 5, height: 5, borderRadius: '50%', background: c }} />)}
        </div>
        {/* Simulated page content */}
        <div style={{ padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 5, position: 'relative' }}>
          <div style={{ height: 8, background: 'rgba(255,255,255,0.12)', borderRadius: 3, width: '70%' }} />
          <div style={{ height: 5, background: 'rgba(255,255,255,0.06)', borderRadius: 2 }} />
          <div style={{ height: 5, background: 'rgba(255,255,255,0.06)', borderRadius: 2, width: '85%' }} />
          <div style={{ display: 'flex', gap: 5, marginTop: 2 }}>
            <div style={{ height: 18, width: 52, background: `${accent}55`, borderRadius: 4 }} />
            <div style={{ height: 18, width: 44, background: 'rgba(255,255,255,0.08)', borderRadius: 4 }} />
          </div>
        </div>
        {/* Static heatmap blobs */}
        <div style={{ position: 'absolute', top: 28, left: 22, width: 40, height: 34, borderRadius: 18, background: 'radial-gradient(circle, rgba(239,68,68,0.65), transparent 70%)', filter: 'blur(4px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 58, left: 65, width: 50, height: 36, borderRadius: 18, background: 'radial-gradient(circle, rgba(251,188,4,0.55), transparent 70%)', filter: 'blur(4px)', pointerEvents: 'none' }} />
        <motion.div style={{ position: 'absolute', top: 66, right: 18, width: 30, height: 30, borderRadius: 14, background: `radial-gradient(circle, ${accent}cc, transparent 70%)`, filter: 'blur(3px)', pointerEvents: 'none' }}
          animate={{ opacity: [0.5, 0.9, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }} />
        {/* Moving cursor */}
        <motion.div
          animate={{ left: `${cursor.x}%`, top: `${cursor.y}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{ position: 'absolute', fontSize: 12, transform: 'translate(-50%,-50%)', pointerEvents: 'none', zIndex: 10 }}>
          🖱️
        </motion.div>
      </div>
      <div style={{ position: 'absolute', top: 6, left: 12, fontSize: 8.5, color: accent, fontWeight: 700, letterSpacing: '0.08em', fontFamily: 'var(--font-mono)' }}>● CLARITY HEATMAP · {clicks} clicks</div>
    </div>
  )
}

/* ── Card 5 — Sequential Remarketing ── */
function JourneyPreview({ inView, accent }: { hovered: boolean; inView: boolean; accent: string }) {
  const [active, setActive] = useState(0)
  const steps = [
    { n: '1', label: 'Awareness', sub: 'Display ad', icon: '📢' },
    { n: '2', label: 'Proof',     sub: 'Case study', icon: '📋' },
    { n: '3', label: 'Offer',     sub: 'Free quote', icon: '✅' },
  ]
  useEffect(() => {
    if (!inView) return
    const iv = setInterval(() => setActive(v => (v + 1) % steps.length), 1200)
    return () => clearInterval(iv)
  }, [inView])

  return (
    <div style={{ position: 'absolute', inset: 0, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.4)', fontWeight: 700, letterSpacing: '0.1em', fontFamily: 'var(--font-mono)' }}>BUYER JOURNEY · LIVE</div>
      {/* Progress bar */}
      <div style={{ height: 3, background: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' }}>
        <motion.div animate={{ width: `${((active + 1) / steps.length) * 100}%` }} transition={{ duration: 0.6 }}
          style={{ height: '100%', background: `linear-gradient(90deg, ${accent}, #22c55e)`, borderRadius: 2 }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'stretch', gap: 4, flex: 1 }}>
        {steps.map((s, i) => (
          <Fragment key={s.n}>
            <motion.div animate={{ background: i === active ? `${accent}25` : `${accent}0d`, borderColor: i === active ? `${accent}66` : `${accent}22`, scale: i === active ? 1.04 : 1 }}
              transition={{ duration: 0.4 }}
              style={{ flex: 1, border: `1px solid ${accent}22`, borderRadius: 10, padding: '8px 5px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
              <div style={{ fontSize: 16 }}>{s.icon}</div>
              <div style={{ width: 18, height: 18, borderRadius: '50%', background: i === active ? accent : `${accent}30`, color: '#fff', fontSize: 9, fontWeight: 700, display: 'grid', placeItems: 'center' }}>{s.n}</div>
              <div style={{ fontSize: 10, fontWeight: 700, color: i === active ? '#fff' : 'rgba(255,255,255,0.5)', lineHeight: 1.2 }}>{s.label}</div>
              <div style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-mono)' }}>{s.sub}</div>
            </motion.div>
            {i < steps.length - 1 && (
              <motion.span animate={{ color: i < active ? accent : 'rgba(255,255,255,0.2)', x: i < active ? [0, 3, 0] : 0 }} transition={{ duration: 0.6, repeat: Infinity }}
                style={{ alignSelf: 'center', fontSize: 14, flexShrink: 0 }}>→</motion.span>
            )}
          </Fragment>
        ))}
      </div>
      <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-mono)' }}>Step {active + 1}/3 · avg 3-touch to convert</div>
    </div>
  )
}

/* ── Card 6 — Competitor Intelligence ── */
function CompetitorPreview({ inView, accent }: { hovered: boolean; inView: boolean; accent: string }) {
  const competitors = [
    { name: 'securityblogs.com.au', is: 96, you: true },
    { name: 'security-co.au',       is: 42, you: false },
    { name: 'rival-firm.au',        is: 31, you: false },
    { name: 'competitor.au',        is: 24, you: false },
  ]
  const [animated, setAnimated] = useState(false)
  useEffect(() => { if (inView) setTimeout(() => setAnimated(true), 200) }, [inView])

  return (
    <div style={{ position: 'absolute', inset: 0, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.4)', fontWeight: 700, letterSpacing: '0.1em', fontFamily: 'var(--font-mono)', marginBottom: 2 }}>AUCTION INSIGHTS · IMPRESSION SHARE</div>
      {competitors.map((c, i) => (
        <div key={c.name}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, marginBottom: 3 }}>
            <span style={{ color: c.you ? accent : 'rgba(255,255,255,0.5)', fontWeight: c.you ? 700 : 400 }}>{c.you ? '★ ' : ''}{c.name}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: c.you ? accent : 'rgba(255,255,255,0.4)' }}>{c.is}%</span>
          </div>
          <div style={{ height: 6, background: 'rgba(255,255,255,0.07)', borderRadius: 3, overflow: 'hidden' }}>
            <motion.div
              animate={{ width: animated ? `${c.is}%` : '0%' }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: 'easeOut' }}
              style={{ height: '100%', background: c.you ? `linear-gradient(90deg, ${accent}, #22c55e)` : 'rgba(255,255,255,0.25)', borderRadius: 3, boxShadow: c.you ? `0 0 10px ${accent}80` : 'none' }}
            />
          </div>
        </div>
      ))}
      <motion.div animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity }}
        style={{ fontSize: 10, color: '#22c55e', fontWeight: 700, marginTop: 2 }}>
        🏆 Dominating the auction
      </motion.div>
    </div>
  )
}
