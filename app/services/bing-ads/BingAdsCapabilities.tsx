'use client'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const ACCENT = '#0078d4'

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

/* ── Card 1 — LinkedIn Audience Targeting ── */
function LinkedInPreview({ hovered, accent }: { hovered: boolean; accent: string }) {
  const filters = [
    { k: 'Job title', v: 'CSO / Facilities Mgr' },
    { k: 'Industry', v: 'Security · Logistics' },
    { k: 'Company size', v: '50+ employees' },
    { k: 'Seniority', v: 'Director+' },
  ]
  return (
    <div style={{ position: 'absolute', inset: 0, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.35)', fontWeight: 700, letterSpacing: '0.1em', fontFamily: 'var(--font-mono)' }}>LINKEDIN FILTERS · LIVE</div>
      {filters.map((f) => (
        <div key={f.k} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <span style={{ width: 80, fontSize: 9, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{f.k}</span>
          <span style={{ flex: 1, fontSize: 10.5, color: '#fff' }}>{f.v}</span>
          <motion.span
            animate={hovered ? { scale: [1, 1.3, 1] } : { scale: 1 }}
            transition={{ duration: 0.4 }}
            style={{ width: 14, height: 14, borderRadius: '50%', background: accent, color: '#fff', fontSize: 8, fontWeight: 700, display: 'grid', placeItems: 'center' }}>✓</motion.span>
        </div>
      ))}
      <div style={{ fontSize: 9.5, color: accent, fontWeight: 700, marginTop: 2 }}>~ 28,400 matched buyers</div>
    </div>
  )
}

/* ── Card 2 — Lower CPCs Than Google ── */
function CPCPreview({ hovered, accent }: { hovered: boolean; accent: string }) {
  return (
    <div style={{ position: 'absolute', inset: 0, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.35)', fontWeight: 700, letterSpacing: '0.1em', fontFamily: 'var(--font-mono)' }}>AVG CPC · SAME KEYWORDS</div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10.5, marginBottom: 4 }}>
          <span style={{ color: 'rgba(255,255,255,0.7)' }}>Google Ads</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#ef4444' }}>$12.40</span>
        </div>
        <div style={{ height: 8, background: 'rgba(255,255,255,0.08)', borderRadius: 4 }}>
          <motion.div
            animate={{ width: hovered ? '100%' : '95%' }}
            transition={{ duration: 0.5 }}
            style={{ height: '100%', background: 'linear-gradient(90deg, #f59e0b, #ef4444)', borderRadius: 4 }} />
        </div>
      </div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10.5, marginBottom: 4 }}>
          <span style={{ color: 'rgba(255,255,255,0.7)' }}>Microsoft Ads</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#22c55e' }}>$5.80</span>
        </div>
        <div style={{ height: 8, background: 'rgba(255,255,255,0.08)', borderRadius: 4 }}>
          <motion.div
            animate={{ width: hovered ? '47%' : '43%' }}
            transition={{ duration: 0.5 }}
            style={{ height: '100%', background: accent, borderRadius: 4 }} />
        </div>
      </div>
      <div style={{ fontSize: 10, color: '#22c55e', fontWeight: 700 }}>↓ 53% lower per click</div>
    </div>
  )
}

/* ── Card 3 — B2B Decision Makers ── */
function B2BPreview({ hovered, accent }: { hovered: boolean; accent: string }) {
  const r = 28
  const circ = 2 * Math.PI * r
  return (
    <div style={{ position: 'absolute', inset: 0, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.35)', fontWeight: 700, letterSpacing: '0.1em', fontFamily: 'var(--font-mono)' }}>BUYER MIX · MICROSOFT</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ position: 'relative', width: 72, height: 72, flexShrink: 0 }}>
          <svg viewBox="0 0 72 72" style={{ width: 72, height: 72, transform: 'rotate(-90deg)' }}>
            <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="7" />
            <motion.circle
              cx="36" cy="36" r={r} fill="none" stroke={accent} strokeWidth="7" strokeLinecap="round"
              strokeDasharray={circ}
              animate={{ strokeDashoffset: hovered ? circ * 0.59 : circ * 0.62 }}
              transition={{ duration: 0.6 }}
            />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, fontWeight: 900, color: accent }}>41%</div>
        </div>
        <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>
          of B2B buyers use Bing + Microsoft properties — older, higher-budget commercial decision-makers.
        </div>
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {['Security Mgr', 'Facilities Dir', 'Head of Ops'].map((tag) => (
          <span key={tag} style={{ fontSize: 9, fontFamily: 'var(--font-mono)', padding: '2px 7px', borderRadius: 999, background: `${accent}18`, color: accent, border: `1px solid ${accent}35` }}>{tag}</span>
        ))}
      </div>
    </div>
  )
}

/* ── Card 4 — Microsoft Clarity Analytics ── */
function ClarityPreview({ hovered, accent }: { hovered: boolean; accent: string }) {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {/* Page mockup */}
      <div style={{ position: 'absolute', inset: '12px 14px', background: '#0d1829', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
        <div style={{ height: 18, background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', padding: '0 8px', gap: 4 }}>
          {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width: 6, height: 6, borderRadius: '50%', background: c }} />)}
        </div>
        <div style={{ padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ height: 8, background: 'rgba(255,255,255,0.12)', borderRadius: 3, width: '70%' }} />
          <div style={{ height: 5, background: 'rgba(255,255,255,0.07)', borderRadius: 2 }} />
          <div style={{ height: 5, background: 'rgba(255,255,255,0.07)', borderRadius: 2, width: '85%' }} />
        </div>
        {/* Heatmap blobs */}
        <motion.div
          animate={{ opacity: hovered ? 0.9 : 0.6 }}
          transition={{ duration: 0.4 }}
          style={{ position: 'absolute', top: 28, left: 18, width: 36, height: 30, borderRadius: 14, background: 'radial-gradient(circle, rgba(239,68,68,0.7), transparent 70%)', filter: 'blur(3px)' }} />
        <motion.div
          animate={{ opacity: hovered ? 0.8 : 0.5 }}
          style={{ position: 'absolute', top: 52, left: 60, width: 44, height: 34, borderRadius: 18, background: 'radial-gradient(circle, rgba(251,188,4,0.6), transparent 70%)', filter: 'blur(3px)' }} />
        <motion.div
          animate={{ opacity: hovered ? 0.7 : 0.4 }}
          style={{ position: 'absolute', top: 60, right: 18, width: 28, height: 28, borderRadius: 12, background: `radial-gradient(circle, ${accent}cc, transparent 70%)`, filter: 'blur(3px)' }} />
      </div>
      <div style={{ position: 'absolute', top: 6, left: 14, fontSize: 8.5, color: accent, fontWeight: 700, letterSpacing: '0.08em', fontFamily: 'var(--font-mono)' }}>● CLARITY HEATMAP</div>
    </div>
  )
}

/* ── Card 5 — Sequential Remarketing ── */
function JourneyPreview({ hovered, accent }: { hovered: boolean; accent: string }) {
  const steps = [
    { n: '1', label: 'Awareness', sub: 'Display ad' },
    { n: '2', label: 'Proof', sub: 'Case study' },
    { n: '3', label: 'Offer', sub: 'Free quote' },
  ]
  return (
    <div style={{ position: 'absolute', inset: 0, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.35)', fontWeight: 700, letterSpacing: '0.1em', fontFamily: 'var(--font-mono)' }}>SEQUENTIAL JOURNEY</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
        {steps.map((s, i) => (
          <React.Fragment key={s.n}>
            <motion.div
              animate={hovered ? { scale: 1.05, boxShadow: `0 0 16px -4px ${accent}88` } : { scale: 1 }}
              transition={{ delay: i * 0.08, duration: 0.3 }}
              style={{ flex: 1, background: `${accent}18`, border: `1px solid ${accent}35`, borderRadius: 10, padding: '8px 6px', textAlign: 'center' }}
            >
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: accent, color: '#fff', fontSize: 10, fontWeight: 700, display: 'grid', placeItems: 'center', margin: '0 auto 4px' }}>{s.n}</div>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>{s.label}</div>
              <div style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-mono)', marginTop: 2 }}>{s.sub}</div>
            </motion.div>
            {i < steps.length - 1 && (
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14, flexShrink: 0 }}>→</span>
            )}
          </React.Fragment>
        ))}
      </div>
      <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.45)', marginTop: 4, fontFamily: 'var(--font-mono)' }}>Avg 3-touch journey to convert B2B buyer</div>
    </div>
  )
}

/* ── Card 6 — Competitor Intelligence ── */
function CompetitorPreview({ hovered, accent }: { hovered: boolean; accent: string }) {
  return (
    <div style={{ position: 'absolute', inset: 0, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.35)', fontWeight: 700, letterSpacing: '0.1em', fontFamily: 'var(--font-mono)', marginBottom: 2 }}>AUCTION INSIGHTS · MS ADS</div>
      <motion.div
        animate={hovered ? { boxShadow: `0 0 18px -4px ${accent}66` } : { boxShadow: 'none' }}
        transition={{ duration: 0.3 }}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 10px', background: `${accent}18`, border: `1px solid ${accent}44`, borderRadius: 8 }}
      >
        <span style={{ fontSize: 10.5, color: accent, fontWeight: 700 }}>★ securityblogs.com.au</span>
        <span style={{ fontSize: 10.5, color: accent, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>96% IS</span>
      </motion.div>
      {[
        { n: 'security-co.au', is: '42%' },
        { n: 'rival-firm.au', is: '31%' },
        { n: 'competitor.au', is: '24%' },
      ].map((c) => (
        <div key={c.n} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 10px', fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>
          <span>{c.n}</span>
          <span style={{ fontFamily: 'var(--font-mono)' }}>{c.is} IS</span>
        </div>
      ))}
    </div>
  )
}
