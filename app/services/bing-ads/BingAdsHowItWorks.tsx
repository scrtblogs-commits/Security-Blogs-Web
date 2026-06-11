'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ServiceWorkflowCards, { type WorkflowStep } from '@/components/ui/ServiceWorkflowCards'

/* ── Scene 1 — Import & Audit ── */
function Scene1({ active, color }: { active: boolean; color: string }) {
  return (
    <div style={{ position: 'absolute', inset: 0, padding: 36, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ fontSize: 11, color: 'rgba(120,160,255,0.5)', fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        Campaign Migration
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* Google box */}
        <div style={{
          flex: 1, background: 'rgba(15,34,68,0.04)', border: '1px solid rgba(15,34,68,0.1)',
          borderRadius: 16, padding: 18, textAlign: 'center',
        }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🔴</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(15,34,68,0.7)' }}>Google Ads</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(15,34,68,0.35)', marginTop: 4 }}>existing structure</div>
          <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
            {['12 campaigns', '84 ad groups', '340 keywords'].map(t => (
              <div key={t} style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'rgba(15,34,68,0.4)', background: 'rgba(15,34,68,0.04)', borderRadius: 6, padding: '3px 8px' }}>{t}</div>
            ))}
          </div>
        </div>

        {/* Arrow */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 48, height: 2, background: `linear-gradient(90deg, rgba(15,34,68,0.1), ${color})` }} />
          <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: active ? color : 'rgba(15,34,68,0.3)', transition: 'color 0.4s', textAlign: 'center' }}>IMPORT→<br />RE-TUNE</div>
          <div style={{ width: 48, height: 2, background: `linear-gradient(90deg, ${color}, rgba(15,34,68,0.1))` }} />
        </div>

        {/* Microsoft box */}
        <div style={{
          flex: 1, background: active ? `${color}12` : 'rgba(15,34,68,0.04)',
          border: `1px solid ${active ? color + '44' : 'rgba(15,34,68,0.1)'}`,
          borderRadius: 16, padding: 18, textAlign: 'center',
          transition: 'all 0.4s ease', boxShadow: active ? `0 0 30px -8px ${color}55` : 'none',
        }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🔷</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: active ? color : 'rgba(15,34,68,0.7)', transition: 'color 0.4s' }}>Microsoft Ads</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(15,34,68,0.35)', marginTop: 4 }}>B2B optimised</div>
          <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
            {['12 campaigns ✓', '84 ad groups ✓', '+ LinkedIn layer'].map(t => (
              <div key={t} style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: active ? color : 'rgba(15,34,68,0.4)', background: active ? `${color}12` : 'rgba(15,34,68,0.04)', borderRadius: 6, padding: '3px 8px', transition: 'all 0.4s' }}>{t}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Audit checklist */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 4 }}>
        {['Keyword gaps', 'Bid strategy', 'QS scores', 'Audience gaps'].map(item => (
          <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 11, color: 'rgba(15,34,68,0.55)' }}>
            <span style={{ width: 16, height: 16, borderRadius: '50%', background: active ? color : 'rgba(15,34,68,0.1)', color: '#0f2244', fontSize: 9, display: 'grid', placeItems: 'center', transition: 'background 0.4s', flexShrink: 0 }}>✓</span>
            {item}
          </div>
        ))}
      </div>

      <div style={{ padding: '10px 16px', background: active ? `${color}14` : 'rgba(15,34,68,0.03)', border: `1px solid ${active ? color + '30' : 'rgba(15,34,68,0.07)'}`, borderRadius: 12, fontSize: 12, color: active ? 'rgba(15,34,68,0.7)' : 'rgba(15,34,68,0.35)', transition: 'all 0.4s' }}>
        Running start — no rebuilding from zero.
      </div>
    </div>
  )
}

/* ── Scene 2 — Layer LinkedIn Targeting ── */
function Scene2({ active, color }: { active: boolean; color: string }) {
  const rows = [
    { label: 'Job title', value: 'Security Manager, Facilities Dir' },
    { label: 'Industry', value: 'Physical Security · Logistics' },
    { label: 'Company size', value: '50–500 employees' },
    { label: 'Seniority', value: 'Manager, Director, VP' },
  ]
  return (
    <div style={{ position: 'absolute', inset: 0, padding: 36, display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ width: 30, height: 30, borderRadius: 8, background: '#0a66c2', color: '#0f2244', display: 'grid', placeItems: 'center', fontWeight: 900, fontSize: 14, flexShrink: 0 }}>in</span>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#0f2244' }}>LinkedIn Profile Targeting</div>
          <div style={{ fontSize: 11, color: 'rgba(15,34,68,0.4)', fontFamily: 'var(--font-mono)' }}>Microsoft × LinkedIn data</div>
        </div>
        <div style={{ marginLeft: 'auto', padding: '4px 12px', borderRadius: 999, background: active ? `${color}20` : 'rgba(15,34,68,0.05)', border: `1px solid ${active ? color + '44' : 'rgba(15,34,68,0.1)'}`, fontSize: 10, fontFamily: 'var(--font-mono)', color: active ? color : 'rgba(15,34,68,0.35)', transition: 'all 0.4s' }}>
          LIVE
        </div>
      </div>

      {/* Targeting rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {rows.map((r, i) => (
          <div key={r.label} style={{
            padding: '10px 14px', background: active ? `${color}0d` : 'rgba(15,34,68,0.03)',
            border: `1px solid ${active ? color + '25' : 'rgba(15,34,68,0.07)'}`,
            borderRadius: 12, display: 'flex', alignItems: 'center', gap: 12,
            transition: `all 0.4s ease ${i * 0.06}s`,
          }}>
            <span style={{ width: 72, fontSize: 10, fontFamily: 'var(--font-mono)', color: 'rgba(15,34,68,0.35)', textTransform: 'uppercase', letterSpacing: 0.5, flexShrink: 0 }}>{r.label}</span>
            <span style={{ flex: 1, fontSize: 12, color: active ? 'rgba(15,34,68,0.85)' : 'rgba(15,34,68,0.4)', transition: 'color 0.4s' }}>{r.value}</span>
            <span style={{ width: 18, height: 18, borderRadius: '50%', background: active ? color : 'rgba(15,34,68,0.08)', color: '#0f2244', fontSize: 9, display: 'grid', placeItems: 'center', transition: 'background 0.4s', flexShrink: 0 }}>✓</span>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: 4, padding: '12px 16px', borderRadius: 14,
        background: active ? `${color}14` : 'rgba(15,34,68,0.04)',
        border: `1px solid ${active ? color + '30' : 'rgba(15,34,68,0.07)'}`,
        transition: 'all 0.4s',
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: active ? color : 'rgba(15,34,68,0.4)', transition: 'color 0.4s' }}>~ 28,400 matched buyers</span>
        <span style={{ fontSize: 11, color: 'rgba(15,34,68,0.35)', marginLeft: 10 }}>within your campaign targeting</span>
      </div>

      <div style={{ fontSize: 12, color: 'rgba(15,34,68,0.4)', lineHeight: 1.5 }}>
        Only available on Microsoft Advertising — the unfair advantage Google cannot replicate.
      </div>
    </div>
  )
}

/* ── Scene 3 — Launch & Track ── */
function Scene3({ active, color }: { active: boolean; color: string }) {
  const conversions = [
    { label: 'Form submitted', time: '2m ago', value: '$480 LTV' },
    { label: 'Quote requested', time: '11m ago', value: '$1,200 LTV' },
    { label: 'Phone call (3:42)', time: '28m ago', value: '$860 LTV' },
    { label: 'Demo booked', time: '1h ago', value: '$2,400 LTV' },
  ]
  return (
    <div style={{ position: 'absolute', inset: 0, padding: 36, display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ fontSize: 11, color: 'rgba(120,160,255,0.5)', fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        Live Conversion Feed
      </div>

      {/* Status bar */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
        {[
          { label: 'Microsoft UET', status: 'ACTIVE' },
          { label: 'MS Clarity', status: 'RECORDING' },
          { label: 'Call Tracking', status: 'LIVE' },
        ].map(s => (
          <div key={s.label} style={{
            padding: '8px 10px', background: active ? `${color}10` : 'rgba(15,34,68,0.03)',
            border: `1px solid ${active ? color + '25' : 'rgba(15,34,68,0.07)'}`,
            borderRadius: 10, textAlign: 'center', transition: 'all 0.4s',
          }}>
            <div style={{ fontSize: 8, fontFamily: 'var(--font-mono)', color: active ? color : 'rgba(15,34,68,0.3)', letterSpacing: '0.08em', marginBottom: 3, transition: 'color 0.4s' }}>
              {active ? '● ' : '○ '}{s.status}
            </div>
            <div style={{ fontSize: 9.5, color: 'rgba(15,34,68,0.55)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Conversion feed */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {conversions.map((c, i) => (
          <div key={c.label} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px',
            background: i === 0 && active ? `${color}14` : 'rgba(15,34,68,0.03)',
            border: `1px solid ${i === 0 && active ? color + '35' : 'rgba(15,34,68,0.06)'}`,
            borderRadius: 12, transition: `all 0.4s ease ${i * 0.05}s`,
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: i === 0 && active ? color : 'rgba(15,34,68,0.15)', flexShrink: 0, transition: 'background 0.4s' }} />
            <span style={{ flex: 1, fontSize: 12, color: 'rgba(15,34,68,0.7)' }}>{c.label}</span>
            <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'rgba(15,34,68,0.3)' }}>{c.time}</span>
            <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 700, color: active ? '#22c55e' : 'rgba(15,34,68,0.3)', transition: 'color 0.4s' }}>{c.value}</span>
          </div>
        ))}
      </div>

      <div style={{ padding: '10px 16px', background: active ? 'rgba(34,197,94,0.1)' : 'rgba(15,34,68,0.03)', border: `1px solid ${active ? 'rgba(34,197,94,0.25)' : 'rgba(15,34,68,0.07)'}`, borderRadius: 12, fontSize: 12, color: active ? '#22c55e' : 'rgba(15,34,68,0.35)', fontWeight: 600, transition: 'all 0.4s' }}>
        Every B2B lead measured and attributed to the right keyword.
      </div>
    </div>
  )
}

/* ── Scene 4 — Optimise & Expand ── */
function Scene4({ active, color }: { active: boolean; color: string }) {
  const placements = [
    { label: 'Bing Search', scale: 100, icon: '🔍' },
    { label: 'MSN News Feed', scale: 72, icon: '📰' },
    { label: 'Outlook Sidebar', scale: 60, icon: '📧' },
    { label: 'Edge New Tab', scale: 54, icon: '🌐' },
    { label: 'Partner Sites', scale: 42, icon: '🌐' },
  ]
  return (
    <div style={{ position: 'absolute', inset: 0, padding: 36, display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ fontSize: 11, color: 'rgba(120,160,255,0.5)', fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        Audience Network Expansion
      </div>

      {/* Placement bars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {placements.map((p, i) => (
          <div key={p.label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 14, flexShrink: 0 }}>{p.icon}</span>
            <span style={{ width: 110, fontSize: 11, color: 'rgba(15,34,68,0.6)', flexShrink: 0 }}>{p.label}</span>
            <div style={{ flex: 1, height: 7, background: 'rgba(15,34,68,0.06)', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: 4,
                background: i === 0 ? color : `${color}${Math.round(90 - i * 14).toString(16).padStart(2, '0')}`,
                width: active ? `${p.scale}%` : '0%',
                transition: `width 0.6s ease ${i * 0.08}s`,
              }} />
            </div>
            <span style={{ width: 36, textAlign: 'right', fontSize: 10, fontFamily: 'var(--font-mono)', color: active ? color : 'rgba(15,34,68,0.3)', transition: 'color 0.5s', flexShrink: 0 }}>{p.scale}%</span>
          </div>
        ))}
      </div>

      {/* CPL trend */}
      <div style={{ padding: '14px 16px', background: active ? `${color}10` : 'rgba(15,34,68,0.03)', border: `1px solid ${active ? color + '25' : 'rgba(15,34,68,0.07)'}`, borderRadius: 14, transition: 'all 0.4s' }}>
        <div style={{ fontSize: 11, color: 'rgba(15,34,68,0.35)', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>COST PER B2B LEAD · TREND</div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: 44 }}>
          {[80, 68, 62, 55, 48, 44, 40, 36].map((h, i) => (
            <div key={i} style={{
              flex: 1, borderRadius: '4px 4px 2px 2px',
              background: i === 7 ? color : `${color}${(30 + i * 8).toString(16).padStart(2, '0')}`,
              height: active ? `${h}%` : '0%',
              transition: `height 0.5s ease ${i * 0.05}s`,
            }} />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
          <span style={{ fontSize: 10, color: 'rgba(15,34,68,0.3)', fontFamily: 'var(--font-mono)' }}>Month 1</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: active ? '#22c55e' : 'rgba(15,34,68,0.3)', fontFamily: 'var(--font-mono)', transition: 'color 0.4s' }}>↓ 55% CPL · Month 8</span>
        </div>
      </div>

      <div style={{ fontSize: 12, color: 'rgba(15,34,68,0.4)', lineHeight: 1.5 }}>
        Scale into Edge, MSN and Outlook as cost-per-lead falls and quality compounds.
      </div>
    </div>
  )
}

const STEPS = [
  { step: '01', tag: 'IMPORT', title: 'Import & Audit', color: '#0078d4', glow: 'rgba(0,120,212,0.45)', Scene: Scene1 },
  { step: '02', tag: 'LAYER', title: 'Layer LinkedIn Targeting', color: '#0a66c2', glow: 'rgba(10,102,194,0.45)', Scene: Scene2 },
  { step: '03', tag: 'LAUNCH', title: 'Launch & Track', color: '#107c10', glow: 'rgba(16,124,16,0.45)', Scene: Scene3 },
  { step: '04', tag: 'SCALE', title: 'Optimise & Expand', color: '#5c2d91', glow: 'rgba(92,45,145,0.45)', Scene: Scene4 },
] satisfies WorkflowStep[]

// ─── Bing Ads animated intro: Microsoft dashboard + LinkedIn targeting ──────────
const BING_METRICS = [
  { label: 'CPC vs Google', value: '−52%', color: '#0078d4', icon: '💲' },
  { label: 'B2B Reach',     value: '41%',  color: '#0f9d58', icon: '🎯' },
  { label: 'Conv. Rate',    value: '6.4%', color: '#f29900', icon: '📈' },
  { label: 'Monthly Leads', value: '142',  color: '#e91e63', icon: '🤝' },
]
const LI_TAGS = ['Security Manager', 'Facilities Director', 'Head of Operations', 'Commercial Real Estate', '50–500 employees']

function BingIntroScene() {
  const [shown, setShown] = useState(0)
  useEffect(() => {
    const iv = setInterval(() => setShown(v => Math.min(v + 1, BING_METRICS.length)), 300)
    return () => clearInterval(iv)
  }, [])

  return (
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, #f0f6ff 0%, #f8fbff 100%)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 500, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(0,120,212,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Dashboard header */}
      <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: 480, background: '#fff', borderRadius: 16, border: '1.5px solid rgba(0,120,212,0.15)', padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 4px 20px rgba(0,120,212,0.08)' }}>
        <div style={{ width: 32, height: 32, background: '#0078d4', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>Ⓜ️</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#0f2244' }}>Microsoft Advertising · Security B2B</div>
          <div style={{ fontSize: 11, color: '#46546e', fontFamily: 'var(--font-mono)' }}>Live Campaign · Sydney Metro</div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5 }}>
          <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.2, repeat: Infinity }} style={{ width: 7, height: 7, borderRadius: '50%', background: '#0f9d58' }} />
          <span style={{ fontSize: 11, color: '#0f9d58', fontWeight: 700 }}>LIVE</span>
        </div>
      </div>

      {/* Metric tiles */}
      <div style={{ position: 'absolute', top: '26%', left: '50%', transform: 'translateX(-50%)', width: 480, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {BING_METRICS.map((m, i) => (
          <motion.div key={m.label} initial={{ opacity: 0, y: 14 }} animate={i < shown ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.3 }}
            style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', border: `1.5px solid ${m.color}20`, boxShadow: `0 4px 16px ${m.color}10` }}>
            <div style={{ fontSize: 11, color: '#46546e', marginBottom: 4 }}>{m.icon} {m.label}</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: m.color, fontFamily: 'var(--font-mono)' }}>{m.value}</div>
          </motion.div>
        ))}
      </div>

      {/* LinkedIn targeting badges */}
      <div style={{ position: 'absolute', top: '60%', left: '50%', transform: 'translateX(-50%)', width: 500 }}>
        <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: '#0078d4', marginBottom: 8, textAlign: 'center', letterSpacing: '0.1em' }}>LINKEDIN PROFILE TARGETING</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, justifyContent: 'center' }}>
          {LI_TAGS.map((tag, i) => (
            <motion.div key={tag} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 + i * 0.12, type: 'spring', stiffness: 200 }}
              style={{ background: '#0a66c2', color: '#fff', borderRadius: 999, padding: '5px 12px', fontSize: 11, fontWeight: 600 }}>
              in {tag}
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
        style={{ textAlign: 'center', zIndex: 10, position: 'relative', marginTop: 340 }}>
        <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: '#0078d4', letterSpacing: '0.18em', marginBottom: 10 }}>HOW IT WORKS</div>
        <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', fontWeight: 800, color: '#0f2244', lineHeight: 1.2, marginBottom: 12 }}>Capture B2B Buyers<br /><span style={{ color: '#0078d4' }}>Google Misses</span></h2>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.8, repeat: Infinity }} style={{ marginTop: 18, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, opacity: 0.6 }}>
          <div style={{ width: 24, height: 38, borderRadius: 12, border: '2px solid rgba(0,120,212,0.4)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 5 }}>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.8, repeat: Infinity }} style={{ width: 4, height: 8, borderRadius: 2, background: '#0078d4' }} />
          </div>
          <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: '#0078d4', letterSpacing: '0.14em' }}>SCROLL TO BEGIN</span>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default function BingAdsHowItWorks() {
  return <ServiceWorkflowCards steps={STEPS} introNode={<BingIntroScene />} cardW={1060} cardH={520} sideXOffset={9999} sectionBg="#f0f6ff" />
}
