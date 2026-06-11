'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const AC = '#0078d4'
const LI = '#0a66c2'

const BARS = [38, 52, 47, 63, 70, 66, 81, 77, 90, 85, 100, 94]
const LI_TAGS = ['Security Manager', 'Facilities Director', 'Head of Operations', '50–500 employees']

export default function BingHeroVisual() {
  const [convs, setConvs] = useState(142)
  const [shown, setShown] = useState(0)
  const [cpcG, setCpcG] = useState(17.6)
  const [cpcM, setCpcM] = useState(17.6)

  useEffect(() => {
    // LinkedIn tags appear staggered
    const ti = setInterval(() => setShown(v => Math.min(v + 1, LI_TAGS.length)), 500)
    // Conversions tick up
    const ci = setInterval(() => setConvs(v => v + 1), 2200)
    // CPC animation: Microsoft drops, Google stays
    const mi = setInterval(() => setCpcM(v => v > 8.4 ? +(v - 0.18).toFixed(2) : 8.4), 60)
    return () => { clearInterval(ti); clearInterval(ci); clearInterval(mi) }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 36, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.35, type: 'spring', stiffness: 120 }}
      style={{ maxWidth: 460, borderRadius: 22, overflow: 'hidden', boxShadow: `0 24px 70px ${AC}22, 0 6px 24px rgba(0,0,0,0.1)`, border: `1.5px solid ${AC}22`, background: '#fff' }}
    >
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #001d3d, #003876)', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 34, height: 34, background: AC, borderRadius: 9, display: 'grid', placeItems: 'center', fontSize: 17, flexShrink: 0 }}>Ⓜ</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Microsoft Advertising</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-mono)' }}>B2B Security · Sydney Metro</div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5 }}>
          <motion.div animate={{ scale: [1, 1.6, 1] }} transition={{ duration: 1.2, repeat: Infinity }} style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e' }} />
          <span style={{ fontSize: 11, color: '#22c55e', fontWeight: 800 }}>LIVE</span>
        </div>
      </div>

      {/* KPI row */}
      <div style={{ padding: '14px 18px 8px', display: 'flex', gap: 10 }}>
        <div style={{ flex: 1, background: `${AC}0e`, border: `1.5px solid ${AC}28`, borderRadius: 13, padding: '11px 14px' }}>
          <div style={{ fontSize: 9.5, color: 'rgba(15,34,68,0.5)' }}>Microsoft CPC</div>
          <div style={{ fontSize: 24, fontWeight: 900, color: AC, fontFamily: 'var(--font-mono)', lineHeight: 1 }}>${cpcM.toFixed(2)}</div>
          <div style={{ fontSize: 10, color: '#22c55e', fontWeight: 700 }}>↓ {Math.round((1 - cpcM / cpcG) * 100)}% vs Google</div>
        </div>
        <div style={{ flex: 1, background: 'rgba(34,197,94,0.07)', border: '1.5px solid rgba(34,197,94,0.28)', borderRadius: 13, padding: '11px 14px' }}>
          <div style={{ fontSize: 9.5, color: 'rgba(15,34,68,0.5)' }}>Conversions</div>
          <div style={{ fontSize: 24, fontWeight: 900, color: '#22c55e', fontFamily: 'var(--font-mono)', lineHeight: 1 }}>{convs}</div>
          <div style={{ fontSize: 10, color: '#22c55e', fontWeight: 700 }}>↑ this month</div>
        </div>
      </div>

      {/* Bar chart */}
      <div style={{ padding: '6px 18px 10px' }}>
        <div style={{ fontSize: 8.5, color: 'rgba(15,34,68,0.38)', fontFamily: 'var(--font-mono)', marginBottom: 5, letterSpacing: '0.08em' }}>B2B CONVERSIONS · LAST 12 WEEKS</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 58 }}>
          {BARS.map((b, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${b}%` }}
              transition={{ duration: 0.7, delay: i * 0.04, ease: 'easeOut' }}
              style={{ flex: 1, borderRadius: '3px 3px 0 0', background: `linear-gradient(180deg, ${AC}, ${AC}66)`, boxShadow: b >= 90 ? `0 0 8px ${AC}55` : 'none' }}
            />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 8, color: 'rgba(15,34,68,0.3)', fontFamily: 'var(--font-mono)', marginTop: 3 }}>
          <span>W1</span><span>W6</span><span>W12 🔺</span>
        </div>
      </div>

      {/* LinkedIn targeting */}
      <div style={{ padding: '8px 18px 16px', borderTop: '1px solid rgba(15,34,68,0.06)' }}>
        <div style={{ fontSize: 9, color: LI, fontFamily: 'var(--font-mono)', fontWeight: 800, marginBottom: 7, letterSpacing: '0.08em' }}>in LINKEDIN TARGETING · EXCLUSIVE</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {LI_TAGS.map((tag, i) => (
            <motion.div
              key={tag}
              initial={{ opacity: 0, scale: 0.75, y: 6 }}
              animate={i < shown ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ type: 'spring', stiffness: 240, damping: 18 }}
              style={{ background: `linear-gradient(135deg, ${LI}, #084c9e)`, color: '#fff', borderRadius: 999, padding: '4px 11px', fontSize: 10.5, fontWeight: 600, boxShadow: `0 2px 8px ${LI}35` }}
            >{tag}</motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
