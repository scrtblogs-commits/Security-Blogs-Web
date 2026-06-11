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
    const obs = new IntersectionObserver(([e]) => { setInView(!!e.isIntersecting) }, { threshold: 0.15 })
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
        <div style={{
          height: 2,
          background: `linear-gradient(90deg, transparent 5%, ${ACCENT} 50%, transparent 95%)`,
          opacity: hovered ? 1 : 0.3, transition: 'opacity 0.4s',
        }} />

        <div style={{ position: 'relative', height: 170, overflow: 'hidden' }}>
          <card.Preview hovered={hovered} inView={inView} accent={ACCENT} />
        </div>

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

/* ── Preview 1 — Search Intent: live keyword bid auction ── */
function SearchIntentPreview({ hovered, inView, accent }: { hovered: boolean; inView: boolean; accent: string }) {
  const targets = [1260, 980, 740]
  const starts = [1840, 1420, 1160]
  const [vals, setVals] = useState(starts)
  const [barWidths, setBarWidths] = useState([0, 0, 0])
  const targetBars = [92, 71, 54]

  useEffect(() => {
    if (!inView) {
      setVals(starts)
      setBarWidths([0, 0, 0])
      return
    }
    const steps = 40
    let step = 0
    const id = setInterval(() => {
      step++
      const p = Math.min(step / steps, 1)
      setVals(starts.map((s, i) => Math.round(s - (s - targets[i]) * p)))
      setBarWidths(targetBars.map(t => Math.round(t * p)))
      if (step >= steps) clearInterval(id)
    }, 40)
    return () => clearInterval(id)
  }, [inView])

  const kws = ['commercial cctv installer', 'access control quote', '24/7 monitored alarm']
  const colors = [accent, '#60a5fa', '#a78bfa']

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'linear-gradient(135deg, #0a1628, #071020)',
      display: 'flex', flexDirection: 'column', padding: '14px 16px', gap: 8,
    }}>
      <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', fontWeight: 700, letterSpacing: 1.5, fontFamily: 'var(--font-mono)', marginBottom: 2 }}>
        KEYWORD AUCTIONS · LIVE
      </div>
      {kws.map((kw, i) => (
        <div key={kw} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 10, color: i === 0 ? accent : 'rgba(255,255,255,0.65)' }}>{kw}</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: colors[i], fontFamily: 'var(--font-mono)' }}>
              ${(vals[i] / 100).toFixed(2)}
            </span>
          </div>
          <div style={{ height: 5, background: 'rgba(255,255,255,0.07)', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${barWidths[i]}%`,
              background: `linear-gradient(90deg, ${colors[i]}, ${colors[i]}88)`,
              borderRadius: 3,
              transition: 'width 0.04s linear',
            }} />
          </div>
        </div>
      ))}
      <div style={{
        marginTop: 4,
        display: 'inline-flex', alignItems: 'center', gap: 5,
        background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)',
        borderRadius: 6, padding: '3px 9px', fontSize: 9.5, color: '#22c55e', fontWeight: 700,
        alignSelf: 'flex-start',
        opacity: inView ? 1 : 0, transition: 'opacity 0.5s 1.6s',
      }}>
        Savings vs competitors: −31%
      </div>
    </div>
  )
}

/* ── Preview 2 — Geo Target: animated suburb map ── */
function GeoTargetPreview({ hovered, inView, accent }: { hovered: boolean; inView: boolean; accent: string }) {
  const pins = [
    { top: 28, left: 35 },
    { top: 48, left: 60 },
    { top: 65, left: 44 },
    { top: 35, left: 72 },
    { top: 58, left: 25 },
  ]
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#060e1f', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(${accent}10 1px, transparent 1px), linear-gradient(90deg, ${accent}10 1px, transparent 1px)`,
        backgroundSize: '32px 32px',
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, transparent 30%, #060e1f 90%)' }} />
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 110, height: 110, borderRadius: '50%',
          border: `1px solid ${accent}40`,
          background: `radial-gradient(circle, ${accent}10 0%, transparent 70%)`,
        }}
      />
      <div style={{ position: 'absolute', top: 10, left: 14, fontSize: 9, color: accent, fontWeight: 700, letterSpacing: 1.5, fontFamily: 'var(--font-mono)', zIndex: 2 }}>
        SYDNEY · 25KM RADIUS
      </div>
      {pins.map((p, i) => (
        <div key={i} style={{ position: 'absolute', top: `${p.top}%`, left: `${p.left}%`, zIndex: 3, transform: 'translate(-50%,-50%)' }}>
          <motion.div
            animate={{ scale: [1, 2.4, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4, ease: 'easeOut' }}
            style={{ position: 'absolute', inset: -5, borderRadius: '50%', background: accent }}
          />
          <motion.div
            animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 + 0.3, ease: 'easeOut' }}
            style={{ position: 'absolute', inset: -9, borderRadius: '50%', border: `1px solid ${accent}` }}
          />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: accent, boxShadow: `0 0 8px ${accent}` }} />
        </div>
      ))}
      <div style={{
        position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)',
        background: 'rgba(6,14,31,0.92)', border: `1px solid ${accent}44`,
        borderRadius: 6, padding: '3px 10px', fontSize: 9.5, color: accent,
        fontWeight: 700, zIndex: 4, fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap',
      }}>
        5 suburbs · 847 impressions today
      </div>
    </div>
  )
}

/* ── Preview 3 — Budget: live spend counter + bars ── */
function BudgetPreview({ hovered, inView, accent }: { hovered: boolean; inView: boolean; accent: string }) {
  const [spend, setSpend] = useState(0)
  const [barW, setBarW] = useState(0)
  const [channelW, setChannelW] = useState([0, 0, 0])
  const targetSpend = 184
  const targetBar = 73
  const targetChannels = [52, 20, 12]

  useEffect(() => {
    if (!inView) {
      setSpend(0); setBarW(0); setChannelW([0, 0, 0]); return
    }
    const steps = 60
    let step = 0
    const id = setInterval(() => {
      step++
      const p = Math.min(step / steps, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setSpend(Math.round(targetSpend * ease))
      setBarW(Math.round(targetBar * ease))
      setChannelW(targetChannels.map(t => Math.round(t * ease)))
      if (step >= steps) clearInterval(id)
    }, 30)
    return () => clearInterval(id)
  }, [inView])

  const channels = [
    { label: 'Search', color: accent },
    { label: 'Display', color: '#22c55e' },
    { label: 'YouTube', color: '#0ea5e9' },
  ]

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'linear-gradient(135deg, #08111f, #0d1a2e)',
      padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10,
    }}>
      <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', fontWeight: 700, letterSpacing: 1.5, fontFamily: 'var(--font-mono)' }}>
        BUDGET ALLOCATION · TODAY
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginBottom: 2 }}>Daily spend</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: accent, fontFamily: 'var(--font-mono)', lineHeight: 1 }}>
            ${spend}
          </div>
        </div>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-mono)' }}>/ $250 budget</div>
      </div>
      <div style={{ height: 8, background: 'rgba(255,255,255,0.07)', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{
          width: `${barW}%`, height: '100%',
          background: `linear-gradient(90deg, ${accent}, ${accent}bb)`,
          borderRadius: 4, transition: 'width 0.03s linear',
        }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        {channels.map((ch, i) => (
          <div key={ch.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 46, fontSize: 9.5, color: ch.color, fontFamily: 'var(--font-mono)' }}>{ch.label}</span>
            <div style={{ flex: 1, height: 5, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{
                width: `${channelW[i]}%`, height: '100%',
                background: ch.color, borderRadius: 3, transition: 'width 0.03s linear',
              }} />
            </div>
            <span style={{ width: 28, fontSize: 9, color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-mono)', textAlign: 'right' }}>{channelW[i]}%</span>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 9.5, color: '#22c55e', fontWeight: 700, fontFamily: 'var(--font-mono)', marginTop: -2 }}>
        ✓ Bid pacing: healthy
      </div>
    </div>
  )
}

/* ── Preview 4 — Funnel: animated conversion funnel ── */
function FunnelPreview({ hovered, inView, accent }: { hovered: boolean; inView: boolean; accent: string }) {
  const targets = [18420, 947, 312, 84]
  const widths = [100, 70, 42, 22]
  const [vals, setVals] = useState([0, 0, 0, 0])
  const [barW, setBarW] = useState([0, 0, 0, 0])
  const labels = ['Impressions', 'Clicks', 'Form views', 'Leads']
  const rates = ['', 'CTR 5.1%', 'Conv 32.9%', 'Conv 8.9%']

  useEffect(() => {
    if (!inView) { setVals([0, 0, 0, 0]); setBarW([0, 0, 0, 0]); return }
    const steps = 60
    let step = 0
    const id = setInterval(() => {
      step++
      const p = Math.min(step / steps, 1)
      const ease = 1 - Math.pow(1 - p, 2)
      setVals(targets.map(t => Math.round(t * ease)))
      setBarW(widths.map(w => Math.round(w * ease)))
      if (step >= steps) clearInterval(id)
    }, 30)
    return () => clearInterval(id)
  }, [inView])

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'linear-gradient(135deg, #080f1c, #0c1627)',
      padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 3,
    }}>
      <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', fontWeight: 700, letterSpacing: 1.5, fontFamily: 'var(--font-mono)', marginBottom: 6 }}>
        CONVERSION FUNNEL
      </div>
      {labels.map((lbl, i) => (
        <div key={lbl} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 58, fontSize: 9.5, color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-mono)', flexShrink: 0 }}>{lbl}</span>
          <div style={{ flex: 1, height: 16, background: 'rgba(255,255,255,0.05)', borderRadius: 3, overflow: 'hidden', position: 'relative' }}>
            <div style={{
              width: `${barW[i]}%`, height: '100%',
              background: i === 3
                ? `linear-gradient(90deg, ${accent}, ${accent}cc)`
                : `linear-gradient(90deg, ${accent}88, ${accent}44)`,
              borderRadius: 3, transition: 'width 0.03s linear',
            }} />
            {rates[i] && (
              <span style={{ position: 'absolute', right: 4, top: '50%', transform: 'translateY(-50%)', fontSize: 8.5, color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-mono)' }}>
                {rates[i]}
              </span>
            )}
          </div>
          <div style={{ width: 44, textAlign: 'right', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 3 }}>
            <span style={{ fontSize: 9.5, fontWeight: 700, color: i === 3 ? accent : 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-mono)' }}>
              {vals[i].toLocaleString()}
            </span>
            {i === 3 && (
              <motion.div
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                style={{ width: 5, height: 5, borderRadius: '50%', background: accent, flexShrink: 0 }}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Preview 5 — Remarketing: audience growth animation ── */
function RemarketingPreview({ hovered, inView, accent }: { hovered: boolean; inView: boolean; accent: string }) {
  const targets = [1240, 820, 3460]
  const [vals, setVals] = useState([0, 0, 0])
  const [barW, setBarW] = useState([0, 0, 0])
  const maxVal = 3460
  const segs = ['Quote page · 7d', 'Pricing · 14d', 'Service page · 30d']

  useEffect(() => {
    if (!inView) { setVals([0, 0, 0]); setBarW([0, 0, 0]); return }
    const steps = 70
    let step = 0
    const id = setInterval(() => {
      step++
      const p = Math.min(step / steps, 1)
      const ease = 1 - Math.pow(1 - p, 2)
      setVals(targets.map(t => Math.round(t * ease)))
      setBarW(targets.map(t => Math.round((t / maxVal) * 100 * ease)))
      if (step >= steps) clearInterval(id)
    }, 30)
    return () => clearInterval(id)
  }, [inView])

  const total = vals.reduce((a, b) => a + b, 0)

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'linear-gradient(135deg, #09101e, #0b1825)',
      padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', fontWeight: 700, letterSpacing: 1.5, fontFamily: 'var(--font-mono)' }}>
          AUDIENCES · BUILDING
        </div>
        <motion.div
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          style={{ width: 6, height: 6, borderRadius: '50%', background: accent, flexShrink: 0 }}
        />
      </div>
      {segs.map((seg, i) => (
        <div key={seg} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.65)' }}>{seg}</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: accent, fontFamily: 'var(--font-mono)' }}>
              {vals[i].toLocaleString()}
            </span>
          </div>
          <div style={{ height: 5, background: 'rgba(255,255,255,0.07)', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{
              width: `${barW[i]}%`, height: '100%',
              background: `linear-gradient(90deg, ${accent}, ${accent}88)`,
              borderRadius: 3, transition: 'width 0.03s linear',
            }} />
          </div>
        </div>
      ))}
      <div style={{
        marginTop: 4, fontSize: 9.5, color: '#22c55e', fontWeight: 700, fontFamily: 'var(--font-mono)',
        background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.25)',
        borderRadius: 6, padding: '3px 9px', alignSelf: 'flex-start',
      }}>
        Total reach: {total.toLocaleString()} buyers
      </div>
    </div>
  )
}

/* ── Preview 6 — Competitor: rising position chart ── */
function CompetitorPreview({ hovered, inView, accent }: { hovered: boolean; inView: boolean; accent: string }) {
  const [yourIS, setYourIS] = useState(0)
  const [position, setPosition] = useState(4)

  useEffect(() => {
    if (!inView) { setYourIS(0); setPosition(4); return }
    const steps = 60
    let step = 0
    const id = setInterval(() => {
      step++
      const p = Math.min(step / steps, 1)
      setYourIS(Math.round(92 * p))
      setPosition(Math.max(1, Math.round(4 - 3 * p)))
      if (step >= steps) clearInterval(id)
    }, 35)
    return () => clearInterval(id)
  }, [inView])

  const competitors = [
    { n: 'rival-cctv.au', is: 64 },
    { n: 'security-co.au', is: 51 },
    { n: 'alarm-firm.au', is: 38 },
  ]

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'linear-gradient(135deg, #090e1a, #0c1420)',
      padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 6,
    }}>
      <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', fontWeight: 700, letterSpacing: 1.5, fontFamily: 'var(--font-mono)', marginBottom: 2 }}>
        AUCTION INSIGHTS
      </div>
      <motion.div
        animate={{ boxShadow: [`0 0 0px ${accent}00`, `0 0 16px ${accent}44`, `0 0 0px ${accent}00`] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '7px 10px', background: `${accent}18`,
          borderRadius: 8, border: `1px solid ${accent}55`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 9, background: accent, color: '#000', borderRadius: 3, padding: '1px 5px', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
            #{position}
          </span>
          <span style={{ fontSize: 10, color: accent, fontWeight: 700 }}>securityblogs.com.au</span>
        </div>
        <span style={{ fontSize: 11, color: accent, fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
          {yourIS}% IS
        </span>
      </motion.div>
      {competitors.map((c, i) => (
        <div key={c.n} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-mono)' }}>#{i + 2}</span>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)' }}>{c.n}</span>
          </div>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono)' }}>{c.is}% IS</span>
        </div>
      ))}
    </div>
  )
}
