'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ServiceWorkflowCards, { type WorkflowStep } from '@/components/ui/ServiceWorkflowCards'

/* ── Scene 1: Setup & Registration ── */
function Scene1({ active, color }: { active: boolean; color: string }) {
  const fields = [
    { label: 'Business name', val: 'SecureMax CCTV' },
    { label: 'Primary category', val: 'Security System Installer' },
    { label: 'Service area', val: 'Sydney Metro · NSW' },
    { label: 'Phone', val: '(02) 9000 0000' },
    { label: 'Website', val: 'securemax.com.au' },
  ]
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 10, padding: '10px 0' }}>
      <div style={{ fontSize: 8, color: 'rgba(15,34,68,0.35)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 4, fontFamily: 'var(--font-mono)' }}>PROFILE SETUP</div>
      {fields.map((f, i) => (
        <motion.div
          key={f.label}
          animate={{ opacity: active ? 1 : 0.3, x: active ? 0 : -6 }}
          transition={{ duration: 0.3, delay: i * 0.07 }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 10px', background: i === 1 ? `${color}12` : 'rgba(15,34,68,0.03)', borderRadius: 8, border: `1px solid ${i === 1 ? color + '30' : 'rgba(15,34,68,0.07)'}` }}
        >
          <span style={{ fontSize: 9.5, color: 'rgba(15,34,68,0.45)' }}>{f.label}</span>
          <span style={{ fontSize: 10, fontWeight: 700, color: i === 1 ? color : 'rgba(15,34,68,0.75)', fontFamily: 'var(--font-mono)' }}>{f.val}</span>
        </motion.div>
      ))}
      <motion.div
        animate={{ opacity: active ? 1 : 0.3 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}
      >
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#fbbc04', display: 'inline-block' }} />
        <span style={{ fontSize: 9, color: '#fbbc04', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>Pending verification</span>
      </motion.div>
    </div>
  )
}

/* ── Scene 2: Verification ── */
function Scene2({ active, color }: { active: boolean; color: string }) {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 12, padding: '10px 0', alignItems: 'center', justifyContent: 'center' }}>
      {/* Verification postcard */}
      <motion.div
        animate={{ scale: active ? 1 : 0.85, opacity: active ? 1 : 0.4 }}
        transition={{ duration: 0.4 }}
        style={{ width: '100%', background: '#fff', borderRadius: 12, border: `2px solid ${color}40`, boxShadow: `0 8px 24px -8px ${color}30`, padding: '14px 16px', position: 'relative', overflow: 'hidden' }}
      >
        <div style={{ position: 'absolute', top: 0, right: 0, width: 60, height: 60, background: `${color}10`, borderRadius: '0 0 0 60px' }} />
        <div style={{ fontSize: 8, color: 'rgba(15,34,68,0.35)', fontWeight: 700, letterSpacing: '0.1em', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>VERIFICATION CODE</div>
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 10 }}>
          {['4', '8', '2', '7', '1'].map((d, i) => (
            <motion.div
              key={i}
              animate={{ y: active ? 0 : 6, opacity: active ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.15 + i * 0.07 }}
              style={{ width: 28, height: 36, borderRadius: 8, background: `${color}15`, border: `1.5px solid ${color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 900, color, fontFamily: 'var(--font-mono)' }}
            >{d}</motion.div>
          ))}
        </div>
        <div style={{ fontSize: 9, color: 'rgba(15,34,68,0.45)', textAlign: 'center' }}>Enter this code in your Google Business dashboard</div>
      </motion.div>
      <motion.div
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        style={{ display: 'flex', alignItems: 'center', gap: 6 }}
      >
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, display: 'inline-block' }} />
        <span style={{ fontSize: 9, color, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>Verified · Google confirmed</span>
      </motion.div>
    </div>
  )
}

/* ── Scene 3: Optimisation ── */
function Scene3({ active, color }: { active: boolean; color: string }) {
  const items = [
    { label: 'Primary category', score: 100 },
    { label: 'Service areas (12)', score: 95 },
    { label: 'Business hours', score: 100 },
    { label: 'Photos added (18)', score: 90 },
    { label: 'Services listed', score: 100 },
    { label: 'Q&A populated', score: 85 },
  ]
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 8, padding: '10px 0' }}>
      <div style={{ fontSize: 8, color: 'rgba(15,34,68,0.35)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 4, fontFamily: 'var(--font-mono)' }}>OPTIMISATION SCORE</div>
      {items.map((item, i) => (
        <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 9.5, color: 'rgba(15,34,68,0.6)', flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.label}</span>
          <div style={{ width: 60, height: 5, background: 'rgba(15,34,68,0.07)', borderRadius: 3, overflow: 'hidden', flexShrink: 0 }}>
            <motion.div
              animate={{ width: active ? `${item.score}%` : '10%' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              style={{ height: '100%', background: color, borderRadius: 3 }}
            />
          </div>
          <span style={{ fontSize: 9, color, fontWeight: 700, fontFamily: 'var(--font-mono)', minWidth: 24 }}>{item.score}%</span>
        </div>
      ))}
      <motion.div
        animate={{ opacity: active ? 1 : 0.3 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        style={{ marginTop: 6, padding: '8px 10px', background: `${color}10`, borderRadius: 8, border: `1px solid ${color}30` }}
      >
        <span style={{ fontSize: 9, color, fontWeight: 700 }}>Overall profile score: </span>
        <span style={{ fontSize: 11, color, fontWeight: 900, fontFamily: 'var(--font-mono)' }}>95/100</span>
      </motion.div>
    </div>
  )
}

/* ── Scene 4: Ranking & Management ── */
function Scene4({ active, color }: { active: boolean; color: string }) {
  const weeks = [28, 36, 42, 55, 61, 70, 75, 82, 88, 91, 96, 100]
  const rankings = [
    { kw: 'CCTV installer Sydney CBD', pos: 1 },
    { kw: 'security alarm company Sydney', pos: 1 },
    { kw: 'access control Sydney', pos: 2 },
  ]
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 10, padding: '8px 0' }}>
      <div style={{ fontSize: 8, color: 'rgba(15,34,68,0.35)', fontWeight: 700, letterSpacing: '0.1em', fontFamily: 'var(--font-mono)' }}>MAP PACK POSITIONS</div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 52 }}>
        {weeks.map((w, i) => (
          <motion.div
            key={i}
            animate={{ height: active ? `${w}%` : '10%' }}
            transition={{ duration: 0.5, delay: i * 0.04 }}
            style={{ flex: 1, background: `linear-gradient(180deg, ${color}, ${color}55)`, borderRadius: '3px 3px 0 0' }}
          />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: 'rgba(15,34,68,0.35)', fontFamily: 'var(--font-mono)', marginTop: -4 }}>
        <span>Month 1</span><span>Month 3</span>
      </div>
      <div style={{ fontSize: 8, color: 'rgba(15,34,68,0.35)', fontWeight: 700, letterSpacing: '0.1em', fontFamily: 'var(--font-mono)', marginTop: 4 }}>LOCAL KEYWORD RANKINGS</div>
      {rankings.map((r, i) => (
        <motion.div
          key={r.kw}
          animate={{ opacity: active ? 1 : 0.3, x: active ? 0 : -6 }}
          transition={{ duration: 0.3, delay: 0.2 + i * 0.07 }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <span style={{ fontSize: 9, color: 'rgba(15,34,68,0.6)' }}>{r.kw}</span>
          <span style={{ fontSize: 9, fontWeight: 800, color, fontFamily: 'var(--font-mono)', background: `${color}18`, padding: '1px 6px', borderRadius: 4 }}>#{r.pos}</span>
        </motion.div>
      ))}
    </div>
  )
}

const STEPS: WorkflowStep[] = [
  { step: '01', tag: 'SETUP', title: 'Profile Setup & Registration', color: '#34a853', glow: 'rgba(52,168,83,0.45)', Scene: Scene1 },
  { step: '02', tag: 'VERIFY', title: 'Verification & Confirmation', color: '#4285f4', glow: 'rgba(66,133,244,0.45)', Scene: Scene2 },
  { step: '03', tag: 'OPTIMISE', title: 'Full Profile Optimisation', color: '#fa7b17', glow: 'rgba(250,123,23,0.45)', Scene: Scene3 },
  { step: '04', tag: 'RANK', title: 'Ranking & Monthly Management', color: '#ea4335', glow: 'rgba(234,67,53,0.45)', Scene: Scene4 },
]

// ─── GMB animated intro: Google Maps pin + star rating ───────────────────────
function GmbIntroScene() {
  const [stars, setStars] = useState(0)
  const [reviews, setReviews] = useState(0)
  useEffect(() => {
    const t1 = setTimeout(() => setStars(5), 600)
    const iv = setInterval(() => setReviews(v => { if (v >= 218) { clearInterval(iv); return v } return v + 3 }), 20)
    return () => { clearTimeout(t1); clearInterval(iv) }
  }, [])

  return (
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, #fff8f6 0%, #fffaf9 100%)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Map grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(219,68,55,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(219,68,55,0.05) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
      {/* Road lines */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <line x1="0" y1="55%" x2="100%" y2="55%" stroke="rgba(219,68,55,0.08)" strokeWidth="8" />
        <line x1="38%" y1="0" x2="38%" y2="100%" stroke="rgba(219,68,55,0.06)" strokeWidth="12" />
        <line x1="68%" y1="0" x2="68%" y2="100%" stroke="rgba(219,68,55,0.06)" strokeWidth="6" />
      </svg>

      {/* Map pin */}
      <div style={{ position: 'absolute', top: '25%', left: '50%', transform: 'translateX(-50%)' }}>
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: 48, height: 48, borderRadius: '50% 50% 50% 0', transform: 'rotate(-45deg)', background: 'linear-gradient(135deg,#db4437,#ea4335)', boxShadow: '0 8px 24px rgba(219,68,55,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ transform: 'rotate(45deg)', fontSize: 20 }}>📍</span>
          </div>
          {/* Ripple rings */}
          {[1,2,3].map(n => (
            <motion.div key={n} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', borderRadius: '50%', border: '2px solid rgba(219,68,55,0.3)', width: n*32, height: n*32 }}
              animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2, repeat: Infinity, delay: n * 0.4 }} />
          ))}
        </motion.div>
      </div>

      {/* Business card popup */}
      <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.4, duration: 0.5 }}
        style={{ position: 'absolute', top: '48%', left: '50%', transform: 'translateX(-50%)', background: '#fff', borderRadius: 16, padding: '16px 20px', boxShadow: '0 8px 40px rgba(219,68,55,0.15)', border: '1.5px solid rgba(219,68,55,0.12)', width: 260 }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: '#0f2244', marginBottom: 4 }}>SecureMax CCTV Sydney</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
          <div style={{ display: 'flex', gap: 1 }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.span key={i} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: i < stars ? 1 : 0.3, scale: 1 }} transition={{ delay: 0.6 + i * 0.1, type: 'spring' }} style={{ fontSize: 14, color: '#f59e0b' }}>★</motion.span>
            ))}
          </div>
          <span style={{ fontSize: 12, color: '#46546e' }}>{reviews} reviews</span>
        </div>
        <div style={{ fontSize: 11.5, color: '#46546e' }}>📍 Sydney CBD · Open 24/7 · AS2201 Certified</div>
        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
          {['Directions','Website','Call'].map(btn => (
            <div key={btn} style={{ flex: 1, background: 'rgba(219,68,55,0.08)', border: '1px solid rgba(219,68,55,0.2)', borderRadius: 8, padding: '5px', textAlign: 'center', fontSize: 10.5, color: '#db4437', fontWeight: 600, cursor: 'default' }}>{btn}</div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
        style={{ textAlign: 'center', zIndex: 10, position: 'relative', marginTop: 320 }}>
        <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: '#db4437', letterSpacing: '0.18em', marginBottom: 10 }}>HOW IT WORKS</div>
        <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', fontWeight: 800, color: '#0f2244', lineHeight: 1.2, marginBottom: 12 }}>Rank #1 on<br /><span style={{ color: '#db4437' }}>Google Maps</span></h2>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.8, repeat: Infinity }} style={{ marginTop: 18, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, opacity: 0.6 }}>
          <div style={{ width: 24, height: 38, borderRadius: 12, border: '2px solid rgba(219,68,55,0.4)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 5 }}>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.8, repeat: Infinity }} style={{ width: 4, height: 8, borderRadius: 2, background: '#db4437' }} />
          </div>
          <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: '#db4437', letterSpacing: '0.14em' }}>SCROLL TO BEGIN</span>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default function GmbHowItWorks() {
  return <ServiceWorkflowCards steps={STEPS} introNode={<GmbIntroScene />} sectionBg="#fff8f6" />
}
