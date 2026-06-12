'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const AC = '#1e5fe0'
const GR = '#10b981'

const PLACEMENTS = [
  { type: 'Homepage Banner',    icon: '🖼️', color: AC,        reach: '180K', metric: 'monthly views' },
  { type: 'Newsletter Sponsor', icon: '📬', color: '#6366f1', reach: '24K',  metric: 'subscribers' },
  { type: 'Category Takeover',  icon: '📂', color: '#f59e0b', reach: '62K',  metric: 'category readers' },
  { type: 'Sponsored Content',  icon: '📝', color: GR,        reach: '3.8K', metric: 'avg views/article' },
]

const COUNTRIES = ['AU', 'US', 'UK', 'UAE', 'SG', 'NZ', 'CA', 'IN']

const CAMPAIGN_FEED = [
  { brand: 'SecureVision AU',   type: 'Homepage Banner',    imp: '12.4k', color: AC  },
  { brand: 'ProTech Security',  type: 'Newsletter Sponsor', imp: '8.1k',  color: '#6366f1' },
  { brand: 'ShieldEdge Corp',   type: 'Category Takeover',  imp: '21.3k', color: '#f59e0b' },
  { brand: 'ClearView Group',   type: 'Sponsored Content',  imp: '4.2k',  color: GR  },
]

export default function AdvertiseHeroVisual() {
  const [activeIdx, setActiveIdx]  = useState(0)
  const [feedIdx, setFeedIdx]      = useState(0)
  const [readers, setReaders]      = useState(0)
  const [countryIdx, setCountryIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setActiveIdx(i => (i + 1) % PLACEMENTS.length), 2400)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setFeedIdx(i => (i + 1) % CAMPAIGN_FEED.length), 2800)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const target = 180000
    let v = 0
    const t = setInterval(() => { v = Math.min(v + 3000, target); setReaders(v); if (v >= target) clearInterval(t) }, 16)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setCountryIdx(i => (i + 1) % COUNTRIES.length), 900)
    return () => clearInterval(t)
  }, [])

  const f = CAMPAIGN_FEED[feedIdx]
  const p = PLACEMENTS[activeIdx]

  return (
    <div style={{
      width: '100%', maxWidth: 440,
      background: '#fff',
      borderRadius: 18,
      overflow: 'hidden',
      boxShadow: '0 20px 56px -10px rgba(30,95,224,0.16), 0 0 0 1.5px rgba(30,95,224,0.08)',
      fontFamily: 'var(--font-sans)',
    }}>
    <style>{`.adv-placements{grid-template-columns:repeat(4,1fr)!important}@media(max-width:400px){.adv-placements{grid-template-columns:repeat(2,1fr)!important}}`}</style>

      {/* Header */}
      <div style={{ background: 'linear-gradient(90deg,#0f1e4a,#1a1060)', padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: GR, boxShadow: `0 0 7px ${GR}` }} />
          <span style={{ fontSize: 11.5, fontWeight: 700, color: '#e2e8f0' }}>Ad Campaign Dashboard</span>
        </div>
        <motion.span
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          style={{ fontSize: 10, fontWeight: 700, color: GR }}
        >● LIVE</motion.span>
      </div>

      {/* Audience reach counter */}
      <div style={{ padding: '12px 14px', borderBottom: '1px solid #e2e8f0', display: 'flex', gap: 0 }}>
        <div style={{ flex: 1, borderRight: '1px solid #e2e8f0', paddingRight: 12 }}>
          <div style={{ fontSize: 9.5, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.07em', marginBottom: 3 }}>MONTHLY READERS</div>
          <div style={{ fontSize: 26, fontWeight: 900, color: AC, fontFamily: 'var(--font-mono)', lineHeight: 1 }}>
            {(readers / 1000).toFixed(0)}K+
          </div>
          <div style={{ fontSize: 10, color: '#64748b' }}>security professionals</div>
        </div>
        <div style={{ paddingLeft: 12 }}>
          <div style={{ fontSize: 9.5, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.07em', marginBottom: 6 }}>COUNTRIES</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, maxWidth: 140 }}>
            {COUNTRIES.map((c, i) => (
              <motion.span
                key={c}
                animate={{ background: countryIdx === i ? `${AC}20` : '#f1f5f9', color: countryIdx === i ? AC : '#64748b' }}
                transition={{ duration: 0.3 }}
                style={{ fontSize: 10, fontWeight: 700, borderRadius: 4, padding: '2px 6px', fontFamily: 'var(--font-mono)' }}
              >{c}</motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* Placement type selector */}
      <div style={{ padding: '11px 14px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ fontSize: 9.5, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.07em', marginBottom: 8 }}>PLACEMENT TYPES</div>
        <div className="adv-placements" style={{ display: 'grid', gap: 5 }}>
          {PLACEMENTS.map((pl, i) => (
            <motion.div
              key={pl.type}
              animate={activeIdx === i
                ? { background: `${pl.color}12`, borderColor: `${pl.color}40`, scale: 1.04 }
                : { background: '#f8fafc', borderColor: '#e2e8f0', scale: 1 }}
              style={{ borderRadius: 8, padding: '7px 5px', border: '1px solid #e2e8f0', textAlign: 'center', cursor: 'default' }}
            >
              <div style={{ fontSize: 15, marginBottom: 3 }}>{pl.icon}</div>
              <div style={{ fontSize: 9, fontWeight: 600, color: activeIdx === i ? pl.color : '#94a3b8', lineHeight: 1.3 }}>
                {pl.type.split(' ')[0]}
              </div>
            </motion.div>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            style={{ marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: `${p.color}08`, borderRadius: 8, padding: '7px 10px', border: `1px solid ${p.color}20` }}
          >
            <div>
              <span style={{ fontSize: 11.5, fontWeight: 700, color: p.color }}>{p.type}</span>
              <span style={{ fontSize: 10.5, color: '#64748b', marginLeft: 6 }}>{p.metric}</span>
            </div>
            <span style={{ fontSize: 15, fontWeight: 900, color: p.color, fontFamily: 'var(--font-mono)' }}>{p.reach}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Live campaign feed */}
      <div style={{ padding: '11px 14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
          <span style={{ fontSize: 9.5, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.07em' }}>LIVE CAMPAIGNS</span>
          <span style={{ fontSize: 10, color: '#64748b', fontFamily: 'var(--font-mono)' }}>{CAMPAIGN_FEED.length} active</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={feedIdx}
            initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.25 }}
            style={{ display: 'flex', alignItems: 'center', gap: 9, background: '#f8fafc', borderRadius: 8, padding: '8px 10px', border: '1px solid #e2e8f0' }}
          >
            <div style={{ width: 28, height: 28, borderRadius: 7, background: `${f.color}18`, border: `1px solid ${f.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: f.color }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#0f172a' }}>{f.brand}</div>
              <div style={{ fontSize: 10.5, color: '#64748b' }}>{f.type}</div>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: f.color, fontFamily: 'var(--font-mono)' }}>{f.imp}</div>
              <div style={{ fontSize: 9.5, color: '#94a3b8' }}>impressions</div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
