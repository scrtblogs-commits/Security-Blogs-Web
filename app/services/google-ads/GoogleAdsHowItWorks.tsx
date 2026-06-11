'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ServiceWorkflowCards, { type WorkflowStep } from '@/components/ui/ServiceWorkflowCards'

/* ── Scene 1 — Audit & Keyword Research ── */
function Scene1({ active, color }: { active: boolean; color: string }) {
  const kws = [
    { kw: 'commercial cctv installer sydney', vol: '4.4K', cmp: 'HIGH' },
    { kw: 'access control quote nsw',         vol: '2.1K', cmp: 'MED'  },
    { kw: '24/7 monitored alarm business',    vol: '1.8K', cmp: 'HIGH' },
    { kw: 'security camera installation cost',vol: '3.2K', cmp: 'MED'  },
    { kw: 'intercom system office',           vol: '1.1K', cmp: 'LOW'  },
  ]
  return (
    <div style={{ position: 'absolute', inset: 0, padding: '52px 36px 28px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'rgba(15,34,68,0.35)', letterSpacing: '0.1em', marginBottom: 4 }}>
        KEYWORD RESEARCH · BUYER INTENT AUDIT
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7, flex: 1 }}>
        {kws.map((k, i) => (
          <div key={k.kw} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '9px 12px', borderRadius: 10,
            background: i === 0 ? `${color}14` : 'rgba(15,34,68,0.04)',
            border: `1px solid ${i === 0 ? color + '44' : 'rgba(15,34,68,0.07)'}`,
            opacity: active ? 1 : 0.5,
            transition: `opacity 0.4s ${i * 0.06}s`,
          }}>
            <span style={{ flex: 1, fontSize: 12.5, color: i === 0 ? color : 'rgba(15,34,68,0.7)', fontFamily: 'var(--font-mono)' }}>{k.kw}</span>
            <span style={{ fontSize: 11, color: 'rgba(15,34,68,0.4)', fontFamily: 'var(--font-mono)' }}>{k.vol}/mo</span>
            <span style={{
              fontSize: 9.5, fontWeight: 700, padding: '2px 7px', borderRadius: 4,
              background: k.cmp === 'HIGH' ? color : k.cmp === 'MED' ? '#f97316' : '#22c55e',
              color: '#000',
            }}>{k.cmp}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
        {[{ l: 'Keywords found', v: '2,840' }, { l: 'Buyer intent', v: '347' }, { l: 'Negative list', v: '92' }].map(m => (
          <div key={m.l} style={{ flex: 1, padding: '10px 12px', borderRadius: 10, background: 'rgba(15,34,68,0.04)', border: '1px solid rgba(15,34,68,0.07)', textAlign: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 800, color, fontFamily: 'var(--font-mono)' }}>{m.v}</div>
            <div style={{ fontSize: 10, color: 'rgba(15,34,68,0.4)', marginTop: 2 }}>{m.l}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Scene 2 — Build & Launch ── */
function Scene2({ active, color }: { active: boolean; color: string }) {
  const adGroups = [
    { name: 'CCTV Install', ads: 3, kws: 18 },
    { name: 'Access Control', ads: 3, kws: 14 },
    { name: 'Monitoring', ads: 2, kws: 11 },
  ]
  return (
    <div style={{ position: 'absolute', inset: 0, padding: '52px 36px 28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'rgba(15,34,68,0.35)', letterSpacing: '0.1em', marginBottom: 4 }}>
        CAMPAIGN STRUCTURE · LIVE
      </div>
      {/* Campaign box */}
      <div style={{ borderRadius: 12, border: `1px solid ${color}44`, background: `${color}08`, padding: '12px 14px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color, marginBottom: 10, fontFamily: 'var(--font-mono)' }}>📢 Security Installers — Sydney</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7, paddingLeft: 12 }}>
          {adGroups.map((ag, i) => (
            <div key={ag.name} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '7px 10px', borderRadius: 8,
              background: 'rgba(15,34,68,0.05)',
              border: '1px solid rgba(15,34,68,0.08)',
              opacity: active ? 1 : 0.5,
              transition: `opacity 0.4s ${i * 0.1}s`,
            }}>
              <span style={{ flex: 1, fontSize: 12.5, color: 'rgba(15,34,68,0.8)' }}>{ag.name}</span>
              <span style={{ fontSize: 10, color: color, fontFamily: 'var(--font-mono)' }}>{ag.ads} ads</span>
              <span style={{ fontSize: 10, color: 'rgba(15,34,68,0.4)', fontFamily: 'var(--font-mono)' }}>{ag.kws} kws</span>
            </div>
          ))}
        </div>
      </div>
      {/* Headline preview */}
      <div style={{ padding: '12px 14px', borderRadius: 12, background: 'rgba(15,34,68,0.04)', border: '1px solid rgba(15,34,68,0.08)' }}>
        <div style={{ fontSize: 10, color: 'rgba(15,34,68,0.35)', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>AD PREVIEW</div>
        <div style={{ fontSize: 13, color: '#4ade80', fontWeight: 700 }}>securityblogs.com.au</div>
        <div style={{ fontSize: 14, color, fontWeight: 700, margin: '4px 0' }}>Commercial CCTV Install Sydney | Free Site Survey</div>
        <div style={{ fontSize: 12, color: 'rgba(15,34,68,0.55)' }}>AS2201 Certified · 500+ Installs · 24/7 Monitoring Available</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
        <span style={{ fontSize: 11, color: '#22c55e', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>Campaign live · conversion tracking active</span>
      </div>
    </div>
  )
}

/* ── Scene 3 — Optimise & Scale ── */
function Scene3({ active, color }: { active: boolean; color: string }) {
  const weeks = [38, 44, 51, 47, 58, 63, 71, 68, 82, 79, 91, 96]
  const cpcs   = [18, 17, 16, 17, 15, 14, 13, 14, 12, 12, 11, 10]
  const maxCpc = 18
  return (
    <div style={{ position: 'absolute', inset: 0, padding: '52px 36px 28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'rgba(15,34,68,0.35)', letterSpacing: '0.1em', marginBottom: 4 }}>
        OPTIMISATION · 12 WEEKS
      </div>
      {/* ROAS chart */}
      <div style={{ padding: '12px 14px', borderRadius: 12, background: 'rgba(15,34,68,0.04)', border: '1px solid rgba(15,34,68,0.08)', flex: 1 }}>
        <div style={{ fontSize: 11, color: 'rgba(15,34,68,0.4)', fontFamily: 'var(--font-mono)', marginBottom: 10 }}>ROAS — rising week on week</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 90 }}>
          {weeks.map((w, i) => (
            <div key={i} style={{
              flex: 1, height: active ? `${w}%` : '20%', borderRadius: '4px 4px 2px 2px',
              background: `linear-gradient(180deg, ${color}, ${color}55)`,
              transition: `height 0.5s ${i * 0.04}s ease-out`,
            }} />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'rgba(15,34,68,0.3)', fontFamily: 'var(--font-mono)', marginTop: 6 }}>
          <span>W1 · 1.8×</span><span>W6 · 2.4×</span><span>W12 · 3.2×</span>
        </div>
      </div>
      {/* CPC chart */}
      <div style={{ padding: '12px 14px', borderRadius: 12, background: 'rgba(15,34,68,0.04)', border: '1px solid rgba(15,34,68,0.08)' }}>
        <div style={{ fontSize: 11, color: 'rgba(15,34,68,0.4)', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>CPC — falling as quality improves</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 52 }}>
          {cpcs.map((c, i) => (
            <div key={i} style={{
              flex: 1, height: active ? `${(c / maxCpc) * 100}%` : '80%', borderRadius: '4px 4px 2px 2px',
              background: '#22c55e55',
              transition: `height 0.5s ${i * 0.04}s ease-out`,
            }} />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'rgba(15,34,68,0.3)', fontFamily: 'var(--font-mono)', marginTop: 5 }}>
          <span>$18</span><span>$14</span><span>$10 ↓</span>
        </div>
      </div>
    </div>
  )
}

/* ── Scene 4 — Report & Refine ── */
function Scene4({ active, color }: { active: boolean; color: string }) {
  const metrics = [
    { l: 'Conversions', v: '184', d: '+46 vs last month', pos: true },
    { l: 'Cost per lead', v: '$28', d: '−$9 vs last month', pos: true },
    { l: 'ROAS', v: '3.2×', d: '+0.8× vs last month', pos: true },
    { l: 'Impression share', v: '92%', d: '+14pp vs last month', pos: true },
  ]
  return (
    <div style={{ position: 'absolute', inset: 0, padding: '52px 36px 28px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'rgba(15,34,68,0.35)', letterSpacing: '0.1em' }}>
          MONTHLY REPORT · MAY 2026
        </div>
        <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', padding: '3px 8px', borderRadius: 5, background: `${color}18`, border: `1px solid ${color}44`, color }}>PDF READY</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {metrics.map((m, i) => (
          <div key={m.l} style={{
            padding: '12px 14px', borderRadius: 12,
            background: 'rgba(15,34,68,0.04)',
            border: '1px solid rgba(15,34,68,0.07)',
            opacity: active ? 1 : 0.4,
            transition: `opacity 0.4s ${i * 0.1}s`,
          }}>
            <div style={{ fontSize: 10, color: 'rgba(15,34,68,0.4)', fontFamily: 'var(--font-mono)', marginBottom: 5 }}>{m.l}</div>
            <div style={{ fontSize: 24, fontWeight: 800, color, fontFamily: 'var(--font-mono)', lineHeight: 1 }}>{m.v}</div>
            <div style={{ fontSize: 10.5, color: '#22c55e', fontWeight: 600, marginTop: 4 }}>▲ {m.d}</div>
          </div>
        ))}
      </div>
      {/* Insight strip */}
      <div style={{ marginTop: 4, padding: '12px 14px', borderRadius: 12, background: `${color}0a`, border: `1px solid ${color}30` }}>
        <div style={{ fontSize: 11, color, fontWeight: 700, fontFamily: 'var(--font-mono)', marginBottom: 5 }}>💡 INSIGHT THIS MONTH</div>
        <p style={{ fontSize: 12, color: 'rgba(15,34,68,0.65)', lineHeight: 1.5, margin: 0 }}>
          "Intruder alarm" +broad drove 23 irrelevant clicks. Moved to EXACT and reallocated $180 to CCTV campaigns. Expect CPL to drop further next month.
        </p>
      </div>
    </div>
  )
}

const STEPS: WorkflowStep[] = [
  { step: '01', tag: 'RESEARCH', title: 'Audit & Keyword Research', color: '#4285f4', glow: 'rgba(66,133,244,0.45)', Scene: Scene1 },
  { step: '02', tag: 'LAUNCH',   title: 'Build & Launch',           color: '#fa7b17', glow: 'rgba(250,123,23,0.45)', Scene: Scene2 },
  { step: '03', tag: 'OPTIMISE', title: 'Optimise & Scale',         color: '#34a853', glow: 'rgba(52,168,83,0.45)',  Scene: Scene3 },
  { step: '04', tag: 'REPORT',   title: 'Report & Refine',          color: '#fbbc04', glow: 'rgba(251,188,4,0.45)', Scene: Scene4 },
]

// ─── Google Ads animated intro: PPC ad with live click counter ───────────────
function GoogleAdsIntroScene() {
  const [clicks, setClicks] = useState(0)
  const [roas, setRoas] = useState(0)
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 80 })
  useEffect(() => {
    const iv = setInterval(() => {
      setClicks(v => v + 1)
      setRoas(v => Math.min(320, v + 4))
      setCursorPos({ x: 45 + Math.random() * 10, y: 55 + Math.random() * 10 })
    }, 800)
    return () => clearInterval(iv)
  }, [])

  return (
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, #f8f9ff 0%, #fafbff 100%)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 500, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(26,115,232,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Google Ads search ad mockup */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}
        style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: 500, background: '#fff', borderRadius: 16, padding: '18px 20px', boxShadow: '0 4px 24px rgba(26,115,232,0.1)', border: '1.5px solid rgba(26,115,232,0.12)' }}>
        {/* Ad badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span style={{ fontSize: 10.5, background: '#1a73e8', color: '#fff', padding: '1px 6px', borderRadius: 4, fontWeight: 700 }}>Ad</span>
          <span style={{ fontSize: 11, color: '#188038', fontFamily: 'var(--font-mono)' }}>securityblogs.com.au</span>
          <motion.span animate={{ scale: [1,1.2,1] }} transition={{ duration: 0.8, repeat: Infinity, delay: clicks * 0.8 }} style={{ marginLeft: 'auto', fontSize: 13 }}>👆</motion.span>
        </div>
        <div style={{ fontSize: 17, fontWeight: 700, color: '#1a0dab', marginBottom: 6, lineHeight: 1.3 }}>
          Commercial CCTV Sydney | 24/7 Security From $49/mo
        </div>
        <div style={{ fontSize: 12.5, color: '#46546e', lineHeight: 1.5 }}>
          AS2201 certified · 500+ businesses protected · Free site survey for NSW businesses
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
          {['Get Free Quote', 'CCTV Systems', 'Access Control', 'Contact'].map(sl => (
            <span key={sl} style={{ fontSize: 11, color: '#1a73e8', textDecoration: 'underline', cursor: 'default' }}>{sl}</span>
          ))}
        </div>
      </motion.div>

      {/* Live stats */}
      <div style={{ position: 'absolute', top: '52%', left: '50%', transform: 'translateX(-50%)', width: 500, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
        {[
          { label: 'Clicks Today', value: clicks, suffix: '', color: '#1a73e8' },
          { label: 'ROAS', value: roas, suffix: '%', color: '#0f9d58' },
          { label: 'Avg CPC', value: '$4.20', suffix: '', color: '#f29900', static: true },
        ].map((m, i) => (
          <motion.div key={m.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 + i * 0.15 }}
            style={{ background: '#fff', borderRadius: 14, padding: '14px', textAlign: 'center', border: `1.5px solid ${m.color}20`, boxShadow: `0 3px 12px ${m.color}10` }}>
            <div style={{ fontSize: 10.5, color: '#46546e', marginBottom: 4 }}>{m.label}</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: m.color, fontFamily: 'var(--font-mono)' }}>{m.static ? m.value : m.value}{m.suffix}</div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
        style={{ textAlign: 'center', zIndex: 10, position: 'relative', marginTop: 320 }}>
        <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: '#1a73e8', letterSpacing: '0.18em', marginBottom: 10 }}>HOW IT WORKS</div>
        <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', fontWeight: 800, color: '#0f2244', lineHeight: 1.2, marginBottom: 12 }}>Turn Clicks into<br /><span style={{ color: '#1a73e8' }}>Security Contracts</span></h2>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.8, repeat: Infinity }} style={{ marginTop: 18, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, opacity: 0.6 }}>
          <div style={{ width: 24, height: 38, borderRadius: 12, border: '2px solid rgba(26,115,232,0.4)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 5 }}>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.8, repeat: Infinity }} style={{ width: 4, height: 8, borderRadius: 2, background: '#1a73e8' }} />
          </div>
          <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: '#1a73e8', letterSpacing: '0.14em' }}>SCROLL TO BEGIN</span>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default function GoogleAdsHowItWorks() {
  return <ServiceWorkflowCards steps={STEPS} introNode={<GoogleAdsIntroScene />} cardW={1060} cardH={520} sideXOffset={9999} sectionBg="#f8f9ff" />
}
