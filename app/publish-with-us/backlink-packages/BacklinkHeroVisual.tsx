'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const AC = '#1e5fe0'
const GR = '#10b981'

const PLACEMENTS = [
  { brand: 'SecureGuard AU',    anchor: 'CCTV installers Melbourne',     url: 'secureguard.com.au',   da: 52 },
  { brand: 'ProTech Security',  anchor: 'access control systems',        url: 'protech-sec.com',      da: 47 },
  { brand: 'ShieldEdge Corp',   anchor: 'alarm monitoring services',     url: 'shieldedge.com.au',    da: 51 },
  { brand: 'ClearView Group',   anchor: 'enterprise security solutions', url: 'clearview-group.com',  da: 55 },
]

const TRUST = [
  { label: 'Google Compliant',  icon: '✓', color: GR },
  { label: 'rel="sponsored"',   icon: '🏷', color: AC },
  { label: 'Permanent',         icon: '♾', color: '#6366f1' },
  { label: 'Indexed',           icon: '⚡', color: '#f59e0b' },
]

export default function BacklinkHeroVisual() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [count, setCount]         = useState(0)
  const [barW, setBarW]           = useState(0)

  useEffect(() => {
    const t = setInterval(() => setActiveIdx(i => (i + 1) % PLACEMENTS.length), 2600)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    setBarW(0)
    const t = setInterval(() => setBarW(v => { if (v >= 100) { clearInterval(t); return v } return v + 4 }), 16)
    return () => clearInterval(t)
  }, [activeIdx])

  useEffect(() => {
    const target = 348
    let v = 0
    const t = setInterval(() => { v = Math.min(v + 5, target); setCount(v); if (v >= target) clearInterval(t) }, 18)
    return () => clearInterval(t)
  }, [])

  const p = PLACEMENTS[activeIdx]

  return (
    <div style={{
      width: '100%', maxWidth: 420,
      background: '#fff',
      borderRadius: 18,
      overflow: 'hidden',
      boxShadow: '0 20px 56px -10px rgba(30,95,224,0.16), 0 0 0 1.5px rgba(30,95,224,0.08)',
      fontFamily: 'var(--font-sans)',
    }}>
    <style>{`.blk-trust{grid-template-columns:repeat(4,1fr)!important}@media(max-width:380px){.blk-trust{grid-template-columns:repeat(2,1fr)!important}}`}</style>

      {/* Header */}
      <div style={{ background: 'linear-gradient(90deg,#0f1e4a,#1a1060)', padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: GR, boxShadow: `0 0 7px ${GR}` }} />
          <span style={{ fontSize: 11.5, fontWeight: 700, color: '#e2e8f0' }}>Placement Tracker</span>
        </div>
        <span style={{ fontSize: 10, fontWeight: 700, color: GR, fontFamily: 'var(--font-mono)' }}>{count} live placements</span>
      </div>

      {/* Live placement card */}
      <div style={{ padding: '13px 14px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.07em', marginBottom: 8 }}>LATEST PLACEMENT</div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 7 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 2 }}>{p.brand}</div>
                <div style={{ fontSize: 11, color: '#64748b' }}>{p.url}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 10, color: '#94a3b8', marginBottom: 1 }}>Site DR</div>
                <div style={{ fontSize: 18, fontWeight: 900, color: AC, fontFamily: 'var(--font-mono)', lineHeight: 1 }}>{p.da}</div>
              </div>
            </div>

            {/* Anchor text pill */}
            <div style={{ background: `${AC}0d`, border: `1px solid ${AC}22`, borderRadius: 7, padding: '5px 10px', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <span style={{ fontSize: 10, color: '#94a3b8', fontWeight: 600 }}>ANCHOR</span>
              <span style={{ fontSize: 11.5, color: AC, fontWeight: 600 }}>"{p.anchor}"</span>
              <span style={{ marginLeft: 'auto', fontSize: 9.5, background: '#fef3c7', color: '#92400e', borderRadius: 4, padding: '1px 6px', fontWeight: 700 }}>sponsored</span>
            </div>

            {/* Progress bar */}
            <div style={{ height: 4, background: '#f1f5f9', borderRadius: 999, overflow: 'hidden' }}>
              <motion.div style={{ height: '100%', width: `${barW}%`, background: `linear-gradient(90deg,${AC},${GR})`, borderRadius: 999 }} transition={{ duration: 0.05 }} />
            </div>
            <div style={{ fontSize: 9.5, color: '#94a3b8', marginTop: 3 }}>Indexing progress</div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Trust signals */}
      <div className="blk-trust" style={{ display: 'grid', borderBottom: '1px solid #e2e8f0' }}>
        {TRUST.map((t, i) => (
          <div key={t.label} style={{ padding: '10px 6px', textAlign: 'center', borderRight: i < 3 ? '1px solid #e2e8f0' : 'none' }}>
            <div style={{ fontSize: 14, marginBottom: 3 }}>{t.icon}</div>
            <div style={{ fontSize: 9, fontWeight: 700, color: t.color, lineHeight: 1.3 }}>{t.label}</div>
          </div>
        ))}
      </div>

      {/* All placements mini-list */}
      <div style={{ padding: '10px 14px' }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.07em', marginBottom: 7 }}>ALL BRANDS</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {PLACEMENTS.map((pl, i) => (
            <div key={pl.brand} style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: i === activeIdx ? 1 : 0.5, transition: 'opacity 0.3s' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: i === activeIdx ? GR : '#cbd5e1', flexShrink: 0, transition: 'background 0.3s' }} />
              <span style={{ fontSize: 11, color: '#334155', fontWeight: i === activeIdx ? 600 : 400, flex: 1 }}>{pl.brand}</span>
              <span style={{ fontSize: 10, color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>DR {pl.da}</span>
              <span style={{ fontSize: 9.5, background: i === activeIdx ? `${GR}18` : '#f1f5f9', color: i === activeIdx ? GR : '#94a3b8', borderRadius: 4, padding: '1px 6px', fontWeight: 600, transition: 'all 0.3s' }}>
                {i === activeIdx ? 'LIVE' : 'placed'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
