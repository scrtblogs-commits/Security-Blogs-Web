'use client'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const ACCENT = '#f6c715'

const CARDS = [
  { icon: '🎯', title: 'Search Intent Targeting', desc: 'We bid only on keywords with genuine buyer intent — "commercial CCTV installer", "access control quote" — not tyre-kicker traffic.', Preview: SearchIntentPreview },
  { icon: '📍', title: 'Geo-Targeting by Suburb', desc: 'Concentrate spend on the suburbs and service radius where your highest-value security jobs actually convert.', Preview: GeoTargetPreview },
  { icon: '💰', title: 'Budget & Bid Control', desc: 'Smart bidding tuned to your margins, with day-parting and device adjustments so no dollar is wasted.', Preview: BudgetPreview },
  { icon: '📊', title: 'Conversion Tracking', desc: 'Calls, forms and quote requests tracked end-to-end so every lead is attributed to the exact keyword and ad.', Preview: FunnelPreview },
  { icon: '🔁', title: 'Remarketing Audiences', desc: "Stay in front of buyers who viewed your quote page but didn't convert across Search, Display and YouTube.", Preview: RemarketingPreview },
  { icon: '⚔️', title: 'Competitor Keyword Targeting', desc: 'Appear above rival security firms when buyers search their brand names — and win the click with a stronger offer.', Preview: CompetitorPreview },
]

export default function GoogleAdsCapabilities() {
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
          background: 'linear-gradient(145deg, #0e1829 0%, #0a1220 100%)',
          border: `1px solid ${ACCENT}22`,
          boxShadow: hovered
            ? `0 0 60px -10px ${ACCENT}55, 0 0 0 1px ${ACCENT}44, 0 30px 60px -20px rgba(0,0,0,0.5)`
            : '0 4px 24px rgba(0,0,0,0.18)',
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
        <div style={{ position: 'relative', height: 160, overflow: 'hidden', background: '#060d1c' }}>
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
          <h3 style={{ fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 8, lineHeight: 1.3 }}>{card.title}</h3>
          <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{card.desc}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── Preview 1 — Search Intent: keyword list with match badges ── */
function SearchIntentPreview({ hovered, accent }: { hovered: boolean; accent: string }) {
  const kws = [
    { kw: 'commercial cctv installer', vol: '4.4K', match: 'EXACT' },
    { kw: 'access control quote',      vol: '2.1K', match: 'PHRASE' },
    { kw: '24/7 monitored alarm',      vol: '1.8K', match: 'EXACT' },
  ]
  return (
    <div style={{ position: 'absolute', inset: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', fontWeight: 700, letterSpacing: 1, marginBottom: 4, fontFamily: 'var(--font-mono)' }}>KEYWORDS · BUYER INTENT</div>
      {kws.map((k, i) => (
        <motion.div
          key={k.kw}
          initial={{ opacity: 0, x: -10 }}
          animate={hovered ? { opacity: 1, x: 0 } : { opacity: 0.7, x: 0 }}
          transition={{ delay: i * 0.08, duration: 0.3 }}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '5px 8px', borderRadius: 8,
            background: 'rgba(255,255,255,0.04)',
            border: `1px solid ${i === 0 ? accent + '44' : 'rgba(255,255,255,0.06)'}`,
          }}
        >
          <span style={{ flex: 1, fontSize: 10.5, color: i === 0 ? accent : 'rgba(255,255,255,0.75)' }}>{k.kw}</span>
          <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-mono)' }}>{k.vol}/mo</span>
          <span style={{ fontSize: 8.5, color: '#060d1c', background: accent, padding: '1px 5px', borderRadius: 3, fontWeight: 700 }}>{k.match}</span>
        </motion.div>
      ))}
    </div>
  )
}

/* ── Preview 2 — Geo Target: dark map with pulsing pins ── */
function GeoTargetPreview({ hovered, accent }: { hovered: boolean; accent: string }) {
  const pins = [{ top: 32, left: 38 }, { top: 52, left: 62 }, { top: 67, left: 47 }, { top: 38, left: 74 }]
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {/* Grid map bg */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(${accent}08 1px, transparent 1px), linear-gradient(90deg, ${accent}08 1px, transparent 1px)`,
        backgroundSize: '28px 28px',
      }} />
      <div style={{ position: 'absolute', top: 8, left: 12, fontSize: 9, color: accent, fontWeight: 700, letterSpacing: 1, fontFamily: 'var(--font-mono)', zIndex: 2 }}>SYDNEY · 25KM RADIUS</div>
      {/* Radius circle */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 90, height: 90, borderRadius: '50%',
        border: `1px solid ${accent}30`,
        background: `radial-gradient(circle, ${accent}08 0%, transparent 70%)`,
        zIndex: 1,
      }} />
      {pins.map((p, i) => (
        <div key={i} style={{ position: 'absolute', top: `${p.top}%`, left: `${p.left}%`, zIndex: 3, transform: 'translate(-50%,-50%)' }}>
          <motion.div
            animate={hovered ? { scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] } : {}}
            transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.3 }}
            style={{ position: 'absolute', inset: -6, borderRadius: '50%', background: accent, opacity: 0.2 }}
          />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: accent, boxShadow: `0 0 6px ${accent}` }} />
        </div>
      ))}
      <div style={{ position: 'absolute', bottom: 8, right: 10, background: 'rgba(6,13,28,0.9)', border: `1px solid ${accent}44`, borderRadius: 6, padding: '3px 8px', fontSize: 9.5, color: accent, fontWeight: 700, zIndex: 2, fontFamily: 'var(--font-mono)' }}>4 active suburbs</div>
    </div>
  )
}

/* ── Preview 3 — Budget & Bid: dark bar allocation ── */
function BudgetPreview({ hovered, accent }: { hovered: boolean; accent: string }) {
  return (
    <div style={{ position: 'absolute', inset: 12, display: 'flex', flexDirection: 'column', gap: 7 }}>
      <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', fontWeight: 700, letterSpacing: 1, fontFamily: 'var(--font-mono)' }}>BUDGET ALLOCATION · TODAY</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
        <span style={{ color: 'rgba(255,255,255,0.7)' }}>Daily spend</span>
        <span style={{ color: accent, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>$184 / $250</span>
      </div>
      <div style={{ height: 10, background: 'rgba(255,255,255,0.07)', borderRadius: 5, overflow: 'hidden', display: 'flex' }}>
        <motion.div animate={{ width: hovered ? '52%' : '40%' }} transition={{ duration: 0.5 }} style={{ background: accent, borderRadius: '5px 0 0 5px' }} />
        <motion.div animate={{ width: hovered ? '20%' : '15%' }} transition={{ duration: 0.5, delay: 0.1 }} style={{ background: '#22c55e' }} />
        <motion.div animate={{ width: hovered ? '12%' : '8%' }} transition={{ duration: 0.5, delay: 0.2 }} style={{ background: '#0ea5e9' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, fontFamily: 'var(--font-mono)' }}>
        <span style={{ color: accent }}>Search 52%</span>
        <span style={{ color: '#22c55e' }}>Display 20%</span>
        <span style={{ color: '#0ea5e9' }}>YouTube 12%</span>
      </div>
      <div style={{ fontSize: 9.5, color: '#22c55e', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>● Bid pacing healthy</div>
    </div>
  )
}

/* ── Preview 4 — Conversion Funnel: dark funnel bars ── */
function FunnelPreview({ hovered, accent }: { hovered: boolean; accent: string }) {
  const steps = [
    { k: 'Impressions', v: '18,420', w: 100 },
    { k: 'Clicks',      v: '947',    w: 70  },
    { k: 'Form views',  v: '312',    w: 42  },
    { k: 'Leads',       v: '84',     w: 22  },
  ]
  return (
    <div style={{ position: 'absolute', inset: 12, display: 'flex', flexDirection: 'column', gap: 5 }}>
      <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', fontWeight: 700, letterSpacing: 1, fontFamily: 'var(--font-mono)' }}>CONVERSION FUNNEL</div>
      {steps.map((s, i) => (
        <div key={s.k} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 60, fontSize: 9.5, color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-mono)' }}>{s.k}</span>
          <div style={{ flex: 1, height: 14, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
            <motion.div
              animate={{ width: hovered ? `${s.w}%` : `${s.w * 0.6}%` }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              style={{ height: '100%', background: `linear-gradient(90deg, ${accent}, ${accent}88)`, borderRadius: 3 }}
            />
          </div>
          <span style={{ width: 42, fontSize: 9.5, fontWeight: 700, color: accent, fontFamily: 'var(--font-mono)', textAlign: 'right' }}>{s.v}</span>
        </div>
      ))}
    </div>
  )
}

/* ── Preview 5 — Remarketing: dark audience segments ── */
function RemarketingPreview({ hovered, accent }: { hovered: boolean; accent: string }) {
  const aud = [
    { n: 'Quote page · 7d',      s: 1240 },
    { n: 'Pricing · 14d',        s: 820  },
    { n: 'Service page · 30d',   s: 3460 },
  ]
  return (
    <div style={{ position: 'absolute', inset: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', fontWeight: 700, letterSpacing: 1, marginBottom: 4, fontFamily: 'var(--font-mono)' }}>AUDIENCES · LIVE</div>
      {aud.map((a, i) => (
        <motion.div
          key={a.n}
          animate={hovered ? { x: 4 } : { x: 0 }}
          transition={{ delay: i * 0.06, duration: 0.25 }}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '6px 8px', borderRadius: 8,
            background: 'rgba(255,255,255,0.04)',
            border: `1px solid rgba(255,255,255,0.07)`,
          }}
        >
          <span style={{
            width: 18, height: 18, borderRadius: '50%',
            background: accent, color: '#000',
            fontSize: 9, display: 'grid', placeItems: 'center', fontWeight: 700, flexShrink: 0,
          }}>{i + 1}</span>
          <span style={{ flex: 1, fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>{a.n}</span>
          <span style={{ fontSize: 9.5, color: accent, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{a.s.toLocaleString()}</span>
        </motion.div>
      ))}
    </div>
  )
}

/* ── Preview 6 — Competitor: dark auction insights table ── */
function CompetitorPreview({ hovered, accent }: { hovered: boolean; accent: string }) {
  return (
    <div style={{ position: 'absolute', inset: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', fontWeight: 700, letterSpacing: 1, marginBottom: 4, fontFamily: 'var(--font-mono)' }}>AUCTION INSIGHTS</div>
      <motion.div
        animate={hovered ? { scale: 1.02 } : { scale: 1 }}
        transition={{ duration: 0.25 }}
        style={{
          display: 'flex', justifyContent: 'space-between', padding: '6px 8px',
          background: `${accent}18`, borderRadius: 8,
          border: `1px solid ${accent}55`,
        }}
      >
        <span style={{ fontSize: 10, color: accent, fontWeight: 700 }}>★ securityblogs.com.au</span>
        <span style={{ fontSize: 10, color: accent, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>92% IS</span>
      </motion.div>
      {[
        { n: 'rival-cctv.au',    is: '64%' },
        { n: 'security-co.au',   is: '51%' },
        { n: 'alarm-firm.au',    is: '38%' },
      ].map((c, i) => (
        <div key={c.n} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 8px', fontSize: 10, color: 'rgba(255,255,255,0.4)', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
          <span>{c.n}</span>
          <span style={{ fontFamily: 'var(--font-mono)' }}>{c.is} IS</span>
        </div>
      ))}
    </div>
  )
}
