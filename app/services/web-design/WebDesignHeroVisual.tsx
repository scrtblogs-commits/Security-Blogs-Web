'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const AC = '#6366f1'
const VI = '#8b5cf6'
const SK = '#06b6d4'
const GR = '#10b981'

const CODE_LINES = [
  { t: '<SecurityPage />', c: AC },
  { t: '  <Hero gradient cta="Get Quote" />', c: VI },
  { t: '  <Services schema ai-ready />', c: SK },
  { t: '  <ContactForm seo-optimised />', c: GR },
  { t: '</SecurityPage>', c: AC },
]
const CWV = [
  { k: 'LCP', v: '1.1s', c: GR },
  { k: 'INP', v: '98ms', c: SK },
  { k: 'CLS', v: '0.02', c: VI },
]

export default function WebDesignHeroVisual() {
  const [score, setScore] = useState(42)
  const [lineIdx, setLineIdx] = useState(-1)
  const [visitors, setVisitors] = useState(0)

  useEffect(() => {
    const sv = setInterval(() => setScore(v => v < 98 ? v + 1 : v), 26)
    let i = -1
    const tv = setInterval(() => { i++; setLineIdx(i); if (i >= CODE_LINES.length - 1) clearInterval(tv) }, 270)
    const vv = setInterval(() => setVisitors(v => v < 1240 ? v + 20 : v), 30)
    return () => { clearInterval(sv); clearInterval(tv); clearInterval(vv) }
  }, [])

  const scoreColor = score > 90 ? GR : score > 70 ? '#f59e0b' : '#ef4444'

  return (
    <motion.div
      initial={{ opacity: 0, y: 36, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.35, type: 'spring', stiffness: 120 }}
      style={{ maxWidth: 460, borderRadius: 22, overflow: 'hidden', boxShadow: `0 24px 70px ${AC}18, 0 6px 24px rgba(0,0,0,0.08)`, border: `2px solid ${AC}20`, background: '#fff' }}
    >
      {/* Browser chrome */}
      <div style={{ background: `linear-gradient(90deg, ${AC}14, ${VI}10)`, padding: '9px 14px', borderBottom: `1px solid ${AC}12`, display: 'flex', alignItems: 'center', gap: 7 }}>
        {['#ff5f57', '#febc2e', '#28c840'].map(c => <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />)}
        <div style={{ flex: 1, background: 'rgba(255,255,255,0.7)', borderRadius: 20, padding: '3px 12px', fontSize: 10.5, color: '#46546e', fontFamily: 'var(--font-mono)', border: `1px solid ${AC}15` }}>
          securityblogs.com.au
        </div>
        <div style={{ fontSize: 10, color: GR, fontWeight: 700 }}>● LIVE</div>
      </div>

      {/* Hero section */}
      <div style={{ background: 'linear-gradient(135deg, #0f2244, #1a1060)', padding: '16px' }}>
        <motion.div initial={{ width: 0 }} animate={{ width: '72%' }} transition={{ duration: 0.7, delay: 0.4 }}
          style={{ height: 11, background: `linear-gradient(90deg, ${AC}, ${VI})`, borderRadius: 6, marginBottom: 8 }} />
        <motion.div initial={{ width: 0 }} animate={{ width: '48%' }} transition={{ duration: 0.6, delay: 0.65 }}
          style={{ height: 7, background: `${SK}90`, borderRadius: 4, marginBottom: 12 }} />
        <div style={{ display: 'flex', gap: 7 }}>
          <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.9, type: 'spring' }}
            style={{ background: `linear-gradient(135deg, ${AC}, ${VI})`, borderRadius: 7, padding: '5px 14px', fontSize: 10.5, color: '#fff', fontWeight: 800, boxShadow: `0 4px 14px ${AC}55` }}>
            Get Quote
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
            style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 7, padding: '5px 14px', fontSize: 10.5, color: 'rgba(255,255,255,0.85)', fontWeight: 700, border: '1px solid rgba(255,255,255,0.2)' }}>
            Learn More
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
          style={{ marginTop: 10, display: 'flex', gap: 5 }}>
          {['CCTV', 'Access', 'Alarms', 'AI-Ready'].map(t => (
            <div key={t} style={{ background: `${AC}30`, borderRadius: 999, padding: '2px 9px', fontSize: 9.5, color: SK, fontWeight: 600, border: `1px solid ${SK}30` }}>{t}</div>
          ))}
        </motion.div>
      </div>

      {/* Code editor */}
      <div style={{ background: '#0d1117', padding: '10px 14px' }}>
        {CODE_LINES.map((l, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={lineIdx >= i ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.2 }}
            style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, color: l.c, lineHeight: 1.75 }}>
            {l.t}
            {lineIdx === i && <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.6, repeat: Infinity }} style={{ display: 'inline-block', width: 2, height: 10, background: AC, marginLeft: 1, verticalAlign: 'middle' }} />}
          </motion.div>
        ))}
      </div>

      {/* Score + CWV strip */}
      <div style={{ padding: '10px 14px', display: 'flex', gap: 10, alignItems: 'center', borderTop: `1px solid ${AC}12` }}>
        <div style={{ textAlign: 'center', minWidth: 54 }}>
          <div style={{ fontSize: 8.5, color: 'rgba(15,34,68,0.45)', marginBottom: 1 }}>PAGE SCORE</div>
          <div style={{ fontSize: 26, fontWeight: 900, color: scoreColor, fontFamily: 'var(--font-mono)', lineHeight: 1, transition: 'color 0.3s' }}>{score}</div>
          <div style={{ height: 4, background: 'rgba(15,34,68,0.07)', borderRadius: 2, marginTop: 3, overflow: 'hidden' }}>
            <motion.div animate={{ width: `${score}%` }} transition={{ duration: 0.1 }} style={{ height: '100%', background: `linear-gradient(90deg, ${AC}, ${GR})`, borderRadius: 2 }} />
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', gap: 6 }}>
          {CWV.map((m, i) => (
            <motion.div key={m.k}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.9 + i * 0.15, type: 'spring', stiffness: 220 }}
              style={{ flex: 1, textAlign: 'center', background: `${m.c}14`, border: `1.5px solid ${m.c}38`, borderRadius: 9, padding: '5px 2px', boxShadow: `0 2px 8px ${m.c}18` }}>
              <div style={{ fontSize: 8, color: m.c, fontWeight: 800 }}>{m.k}</div>
              <div style={{ fontSize: 11.5, fontWeight: 900, color: m.c, fontFamily: 'var(--font-mono)' }}>{m.v}</div>
            </motion.div>
          ))}
        </div>
        <div style={{ textAlign: 'center', minWidth: 54 }}>
          <div style={{ fontSize: 8.5, color: 'rgba(15,34,68,0.45)', marginBottom: 1 }}>Visitors/mo</div>
          <div style={{ fontSize: 18, fontWeight: 900, color: AC, fontFamily: 'var(--font-mono)', lineHeight: 1 }}>{visitors.toLocaleString()}</div>
          <div style={{ fontSize: 8.5, color: GR, fontWeight: 700 }}>↑ +18%</div>
        </div>
      </div>
    </motion.div>
  )
}
