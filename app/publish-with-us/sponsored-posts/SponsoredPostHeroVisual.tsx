'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const AC = '#1e5fe0'
const GR = '#10b981'

const STAGES = [
  { label: 'Brief received',   icon: '📥', color: '#6366f1', done: true },
  { label: 'Editorial review', icon: '✍️', color: AC,        done: true },
  { label: 'SEO optimised',    icon: '⚙️', color: '#06b6d4', done: true },
  { label: 'Publishing…',      icon: '🚀', color: GR,        done: false },
]

const METRICS = [
  { label: 'Domain Authority', value: 52,  suffix: '',   color: AC },
  { label: 'Monthly Readers',  value: 38400, suffix: '',  color: '#6366f1', format: 'k' },
  { label: 'Dofollow Links',   value: 2,   suffix: '',   color: GR },
  { label: 'Time to Publish',  value: 3,   suffix: 'd',  color: '#f59e0b' },
]

const FEED = [
  { brand: 'SecureVision AU',  action: 'post published',   time: '2m ago',  color: GR  },
  { brand: 'ClearView Group',  action: 'link approved',     time: '18m ago', color: AC  },
  { brand: 'ProTech Security', action: 'brief submitted',   time: '41m ago', color: '#6366f1' },
  { brand: 'ShieldEdge Corp',  action: 'post published',   time: '1h ago',  color: GR  },
  { brand: 'AxisGuard Ltd',    action: 'SEO review done',   time: '2h ago',  color: '#06b6d4' },
]

const WORDS = ['security company', 'CCTV installer', 'access control', 'alarm monitoring']

export default function SponsoredPostHeroVisual() {
  const [stageIdx, setStageIdx]   = useState(0)
  const [typing, setTyping]       = useState('')
  const [wordIdx, setWordIdx]     = useState(0)
  const [charIdx, setCharIdx]     = useState(0)
  const [feedIdx, setFeedIdx]     = useState(0)
  const [pulse, setPulse]         = useState(false)
  const [metricVals, setMetricVals] = useState(METRICS.map(() => 0))

  // Stage cycle
  useEffect(() => {
    const t = setInterval(() => setStageIdx(i => (i + 1) % STAGES.length), 2000)
    return () => clearInterval(t)
  }, [])

  // Typing animation
  useEffect(() => {
    const word = WORDS[wordIdx]
    if (charIdx < word.length) {
      const t = setTimeout(() => {
        setTyping(word.slice(0, charIdx + 1))
        setCharIdx(c => c + 1)
      }, 80)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => {
        setWordIdx(w => (w + 1) % WORDS.length)
        setCharIdx(0)
      }, 1400)
      return () => clearTimeout(t)
    }
  }, [charIdx, wordIdx])

  // Feed cycle
  useEffect(() => {
    const t = setInterval(() => {
      setPulse(true)
      setTimeout(() => { setFeedIdx(i => (i + 1) % FEED.length); setPulse(false) }, 300)
    }, 2600)
    return () => clearInterval(t)
  }, [])

  // Metric count-up
  useEffect(() => {
    const targets = METRICS.map(m => m.value)
    const steps = 60
    let step = 0
    const t = setInterval(() => {
      step++
      setMetricVals(targets.map(target => Math.round((target * step) / steps)))
      if (step >= steps) clearInterval(t)
    }, 22)
    return () => clearInterval(t)
  }, [])

  const fmtVal = (v: number, i: number) =>
    METRICS[i].format === 'k' ? `${(v / 1000).toFixed(1)}k` : `${v}${METRICS[i].suffix}`

  const shownFeed = [
    FEED[feedIdx % FEED.length],
    FEED[(feedIdx + 1) % FEED.length],
    FEED[(feedIdx + 2) % FEED.length],
  ]

  return (
    <div style={{
      width: '100%', maxWidth: 560,
      background: '#fff',
      borderRadius: 22,
      overflow: 'hidden',
      boxShadow: '0 28px 72px -12px rgba(30,95,224,0.18), 0 0 0 1.5px rgba(30,95,224,0.08)',
      fontFamily: 'var(--font-sans)',
    }}>

      {/* ── Top bar ── */}
      <div style={{ background: 'linear-gradient(90deg, #0f1e4a, #1a1060)', padding: '11px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: GR, boxShadow: `0 0 8px ${GR}` }} />
          <span style={{ fontSize: 12, fontWeight: 700, color: '#e2e8f0' }}>SecurityBlogs · Editorial Dashboard</span>
        </div>
        <div style={{ display: 'flex', gap: 5 }}>
          {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />)}
        </div>
      </div>

      {/* ── Article preview ── */}
      <div style={{ padding: '14px 16px 12px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.07em', marginBottom: 6 }}>ARTICLE PREVIEW</div>
        <div style={{ fontSize: 14.5, fontWeight: 700, color: '#0f172a', marginBottom: 5, lineHeight: 1.35 }}>
          Why Your <span style={{ color: AC }}>{typing}</span>
          <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }}>|</motion.span>
          {' '}Business Needs AI Visibility in 2025
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {['Sponsored', 'Security SEO', 'AI Visibility'].map(tag => (
            <span key={tag} style={{ fontSize: 10, fontWeight: 600, background: `${AC}12`, color: AC, borderRadius: 999, padding: '2px 8px', border: `1px solid ${AC}20` }}>{tag}</span>
          ))}
        </div>
      </div>

      {/* ── Pipeline stages ── */}
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.07em', marginBottom: 8 }}>PUBLISHING PIPELINE</div>
        <div style={{ display: 'flex', gap: 4 }}>
          {STAGES.map((s, i) => {
            const active = stageIdx === i
            const past   = i < stageIdx || (stageIdx < i && i <= 2)
            return (
              <div key={s.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <motion.div
                  animate={active ? { scale: [1, 1.15, 1] } : {}}
                  transition={{ duration: 0.5, repeat: active ? Infinity : 0, repeatDelay: 0.8 }}
                  style={{
                    width: 30, height: 30, borderRadius: '50%',
                    background: active ? s.color : past ? `${s.color}22` : '#f1f5f9',
                    border: `2px solid ${active ? s.color : past ? `${s.color}44` : '#e2e8f0'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13,
                    boxShadow: active ? `0 0 14px ${s.color}55` : 'none',
                  }}
                >
                  {s.icon}
                </motion.div>
                <span style={{ fontSize: 9, fontWeight: active ? 700 : 500, color: active ? s.color : '#94a3b8', textAlign: 'center', lineHeight: 1.3 }}>{s.label}</span>
                {i < STAGES.length - 1 && (
                  <div style={{ position: 'absolute', left: 0, top: 0 }} />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Metrics row ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderBottom: '1px solid #e2e8f0' }}>
        {METRICS.map((m, i) => (
          <div key={m.label} style={{ padding: '12px 10px', textAlign: 'center', borderRight: i < 3 ? '1px solid #e2e8f0' : 'none' }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: m.color, lineHeight: 1, fontFamily: 'var(--font-mono)', marginBottom: 3 }}>
              {fmtVal(metricVals[i], i)}
            </div>
            <div style={{ fontSize: 9, color: '#94a3b8', fontWeight: 600, lineHeight: 1.3 }}>{m.label}</div>
          </div>
        ))}
      </div>

      {/* ── Live activity feed ── */}
      <div style={{ padding: '12px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.07em' }}>LIVE ACTIVITY</span>
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            style={{ fontSize: 10, color: GR, fontWeight: 700 }}
          >● LIVE</motion.span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <AnimatePresence mode="popLayout">
            {shownFeed.map((f, i) => (
              <motion.div
                key={`${f.brand}-${feedIdx}-${i}`}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1 - i * 0.28, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.3 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 9,
                  background: i === 0 ? '#f8fafc' : 'transparent',
                  borderRadius: 8, padding: '7px 10px',
                  border: i === 0 ? '1px solid #e2e8f0' : 'none',
                }}
              >
                <div style={{ width: 28, height: 28, borderRadius: 7, background: `${f.color}18`, border: `1px solid ${f.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: f.color }} />
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#0f172a' }}>{f.brand}</span>
                  <span style={{ fontSize: 11, color: '#64748b' }}> — {f.action}</span>
                </div>
                <span style={{ fontSize: 10, color: '#94a3b8', fontFamily: 'var(--font-mono)', flexShrink: 0 }}>{f.time}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
