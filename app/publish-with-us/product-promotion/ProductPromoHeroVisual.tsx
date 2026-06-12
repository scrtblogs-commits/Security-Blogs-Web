'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const AC = '#1e5fe0'
const GR = '#10b981'
const OR = '#f59e0b'

const PRODUCTS = [
  { name: 'SecureVision Pro 4K', cat: 'CCTV Camera',          rating: 4.8, reviews: 142 },
  { name: 'AccessEdge Controller', cat: 'Access Control',     rating: 4.6, reviews: 89  },
  { name: 'GuardLink Alarm Hub',   cat: 'Alarm System',       rating: 4.9, reviews: 217 },
  { name: 'ShieldNet AI Monitor',  cat: 'AI Monitoring',      rating: 4.7, reviews: 103 },
]

const COMPARE_ATTRS = [
  { label: 'Ease of Install',  scores: [90, 72, 85] },
  { label: 'Build Quality',    scores: [95, 88, 80] },
  { label: 'Value for Money',  scores: [88, 75, 92] },
  { label: 'AI Integration',   scores: [92, 60, 78] },
]

const COMPETITORS = ['Your Product', 'Competitor A', 'Competitor B']
const COMP_COLORS = [AC, '#6366f1', '#94a3b8']

const FORMATS = [
  { icon: '⭐', label: 'Review',    color: OR  },
  { icon: '⚖️', label: 'Compare',  color: AC  },
  { icon: '🎬', label: 'Demo',     color: '#6366f1' },
  { icon: '📘', label: "Buyer's Guide", color: GR },
]

const FEED = [
  { action: 'ProCamera 360 review published',          views: '1.2k',  color: GR  },
  { action: 'AccessGuard vs SmartLock comparison live', views: '3.4k', color: AC  },
  { action: 'NightVision Pro demo featured',           views: '890',   color: '#6366f1' },
  { action: 'ShieldHub buyer guide updated',           views: '5.1k',  color: OR  },
  { action: 'ThermalSec 2025 review indexed',          views: '2.3k',  color: GR  },
]

export default function ProductPromoHeroVisual() {
  const [productIdx, setProductIdx] = useState(0)
  const [starFill, setStarFill]     = useState(0)
  const [barWidths, setBarWidths]   = useState(COMPARE_ATTRS.map(() => [0, 0, 0]))
  const [feedIdx, setFeedIdx]       = useState(0)
  const [reach, setReach]           = useState(0)
  const [activeFormat, setActiveFormat] = useState(0)

  const product = PRODUCTS[productIdx]

  // Product cycle
  useEffect(() => {
    const t = setInterval(() => {
      setProductIdx(i => (i + 1) % PRODUCTS.length)
      setStarFill(0)
    }, 3200)
    return () => clearInterval(t)
  }, [])

  // Star fill-up when product changes
  useEffect(() => {
    setStarFill(0)
    const t = setInterval(() => setStarFill(v => v >= product.rating ? (clearInterval(t), v) : Math.min(v + 0.12, product.rating)), 30)
    return () => clearInterval(t)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productIdx])

  // Bar widths animate in
  useEffect(() => {
    let step = 0
    const t = setInterval(() => {
      step = Math.min(step + 3, 100)
      setBarWidths(COMPARE_ATTRS.map(a => a.scores.map(s => (s * step) / 100)))
      if (step >= 100) clearInterval(t)
    }, 18)
    return () => clearInterval(t)
  }, [])

  // Feed cycle
  useEffect(() => {
    const t = setInterval(() => setFeedIdx(i => (i + 1) % FEED.length), 2800)
    return () => clearInterval(t)
  }, [])

  // Reach count-up
  useEffect(() => {
    const target = 24600
    let v = 0
    const t = setInterval(() => { v = Math.min(v + 500, target); setReach(v); if (v >= target) clearInterval(t) }, 20)
    return () => clearInterval(t)
  }, [])

  // Format cycle
  useEffect(() => {
    const t = setInterval(() => setActiveFormat(i => (i + 1) % FORMATS.length), 1800)
    return () => clearInterval(t)
  }, [])

  const renderStars = (fill: number) =>
    [1, 2, 3, 4, 5].map(n => {
      const pct = Math.min(100, Math.max(0, (fill - (n - 1)) * 100))
      return (
        <span key={n} style={{ position: 'relative', fontSize: 14, color: '#e2e8f0', display: 'inline-block' }}>
          ★
          <span style={{ position: 'absolute', inset: 0, overflow: 'hidden', width: `${pct}%`, color: OR }}>★</span>
        </span>
      )
    })

  return (
    <div style={{
      width: '100%', maxWidth: 540,
      background: '#fff',
      borderRadius: 22,
      overflow: 'hidden',
      boxShadow: '0 28px 72px -12px rgba(30,95,224,0.18), 0 0 0 1.5px rgba(30,95,224,0.08)',
      fontFamily: 'var(--font-sans)',
    }}>

      {/* ── Top bar ── */}
      <div style={{ background: 'linear-gradient(90deg,#0f1e4a,#1a1060)', padding: '11px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: GR, boxShadow: `0 0 8px ${GR}` }} />
          <span style={{ fontSize: 12, fontWeight: 700, color: '#e2e8f0' }}>SecurityBlogs · Product Reviews</span>
        </div>
        <div style={{ display: 'flex', gap: 5 }}>
          {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />)}
        </div>
      </div>

      {/* ── Product card ── */}
      <div style={{ padding: '14px 16px 12px', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.07em', marginBottom: 4 }}>FEATURED REVIEW</div>
            <AnimatePresence mode="wait">
              <motion.div
                key={productIdx}
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
              >
                <div style={{ fontSize: 14.5, fontWeight: 700, color: '#0f172a', lineHeight: 1.3, marginBottom: 3 }}>{product.name}</div>
                <span style={{ fontSize: 10.5, background: `${AC}12`, color: AC, borderRadius: 999, padding: '2px 8px', border: `1px solid ${AC}20`, fontWeight: 600 }}>{product.cat}</span>
              </motion.div>
            </AnimatePresence>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontSize: 26, fontWeight: 900, color: OR, fontFamily: 'var(--font-mono)', lineHeight: 1 }}>{product.rating}</div>
            <div style={{ fontSize: 9.5, color: '#94a3b8' }}>{product.reviews} reviews</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div>{renderStars(starFill)}</div>
          <span style={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>Verified Expert Review</span>
        </div>
      </div>

      {/* ── Comparison bars ── */}
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.07em' }}>COMPARISON</span>
          <div style={{ display: 'flex', gap: 8 }}>
            {COMPETITORS.map((c, i) => (
              <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <div style={{ width: 7, height: 7, borderRadius: 2, background: COMP_COLORS[i] }} />
                <span style={{ fontSize: 9, color: '#64748b' }}>{c}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {COMPARE_ATTRS.map((attr, ai) => (
            <div key={attr.label}>
              <div style={{ fontSize: 10, color: '#64748b', marginBottom: 3 }}>{attr.label}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {attr.scores.map((_, ci) => (
                  <div key={ci} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <div style={{ flex: 1, height: 5, background: '#f1f5f9', borderRadius: 999, overflow: 'hidden' }}>
                      <motion.div
                        style={{ height: '100%', background: COMP_COLORS[ci], borderRadius: 999, width: `${barWidths[ai]?.[ci] ?? 0}%` }}
                        transition={{ duration: 0.1 }}
                      />
                    </div>
                    <span style={{ fontSize: 9, color: COMP_COLORS[ci], fontWeight: 700, width: 22, textAlign: 'right', fontFamily: 'var(--font-mono)' }}>{Math.round(barWidths[ai]?.[ci] ?? 0)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Formats + reach ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ padding: '12px 14px' }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.07em', marginBottom: 8 }}>FORMATS</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}>
            {FORMATS.map((f, i) => (
              <motion.div
                key={f.label}
                animate={activeFormat === i ? { scale: 1.04, background: `${f.color}14` } : { scale: 1, background: '#f8fafc' }}
                style={{ borderRadius: 8, padding: '6px 8px', border: `1px solid ${activeFormat === i ? f.color + '30' : '#e2e8f0'}`, cursor: 'default', transition: 'border-color 0.3s' }}
              >
                <div style={{ fontSize: 13, marginBottom: 1 }}>{f.icon}</div>
                <div style={{ fontSize: 10, fontWeight: 600, color: activeFormat === i ? f.color : '#64748b' }}>{f.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
        <div style={{ background: '#e2e8f0' }} />
        <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.07em', marginBottom: 4 }}>SUBSCRIBER REACH</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: AC, fontFamily: 'var(--font-mono)', lineHeight: 1 }}>
              {(reach / 1000).toFixed(1)}k
            </div>
            <div style={{ fontSize: 10, color: '#64748b' }}>security professionals</div>
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.07em', marginBottom: 4 }}>AVG REVIEW TRAFFIC</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: GR, fontFamily: 'var(--font-mono)', lineHeight: 1 }}>3.8k</div>
            <div style={{ fontSize: 10, color: '#64748b' }}>page views / month</div>
          </div>
        </div>
      </div>

      {/* ── Live feed ── */}
      <div style={{ padding: '11px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.07em' }}>LIVE ACTIVITY</span>
          <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }} style={{ fontSize: 10, color: GR, fontWeight: 700 }}>● LIVE</motion.span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={feedIdx}
            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.28 }}
            style={{ display: 'flex', alignItems: 'center', gap: 9, background: '#f8fafc', borderRadius: 8, padding: '8px 10px', border: '1px solid #e2e8f0' }}
          >
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: FEED[feedIdx].color, boxShadow: `0 0 8px ${FEED[feedIdx].color}`, flexShrink: 0 }} />
            <span style={{ flex: 1, fontSize: 11.5, color: '#334155', fontWeight: 500 }}>{FEED[feedIdx].action}</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: FEED[feedIdx].color, fontFamily: 'var(--font-mono)', flexShrink: 0 }}>{FEED[feedIdx].views} views</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
