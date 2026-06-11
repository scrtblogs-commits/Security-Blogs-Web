'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ServiceWorkflowCards, { type WorkflowStep } from '@/components/ui/ServiceWorkflowCards'

/* ── Scene 1: Discovery & UX Strategy ── */
function Scene1({ active, color }: { active: boolean; color: string }) {
  const nodes = [
    { x: 50, y: 18, label: 'Home' },
    { x: 22, y: 50, label: 'Services' },
    { x: 78, y: 50, label: 'About' },
    { x: 22, y: 82, label: 'CCTV' },
    { x: 78, y: 82, label: 'Contact' },
  ]
  const edges = [
    [50, 18, 22, 50],
    [50, 18, 78, 50],
    [22, 50, 22, 82],
    [78, 50, 78, 82],
  ]
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 14, padding: '12px 0' }}>
      {/* Sitemap */}
      <div style={{ flex: 1, position: 'relative' }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
          {edges.map(([x1, y1, x2, y2], i) => (
            <motion.line
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={color} strokeWidth="0.7"
              animate={{ opacity: active ? 0.75 : 0.25 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            />
          ))}
          {nodes.map((n, i) => (
            <g key={i}>
              <motion.rect
                x={n.x - 7} y={n.y - 4} width="14" height="8" rx="1.5"
                fill={i === 0 ? color : `${color}33`}
                stroke={color} strokeWidth="0.5"
                animate={{ opacity: active ? 1 : 0.4, scale: active && i === 0 ? 1.1 : 1 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              />
              <text x={n.x} y={n.y + 1.5} fontSize="2.8" fill="#fff" textAnchor="middle" fontFamily="system-ui" fontWeight="700">{n.label}</text>
            </g>
          ))}
        </svg>
      </div>
      {/* Buyer journey tags */}
      <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap' }}>
        {['Awareness', 'Consideration', 'Decision'].map((stage, i) => (
          <motion.span
            key={stage}
            animate={{ opacity: active ? 1 : 0.4, y: active ? 0 : 4 }}
            transition={{ duration: 0.3, delay: 0.1 + i * 0.08 }}
            style={{ fontSize: 9, padding: '3px 9px', borderRadius: 20, border: `1px solid ${color}66`, color, fontWeight: 700, background: `${color}0d` }}
          >{stage}</motion.span>
        ))}
      </div>
      {/* Competitor analysis row */}
      <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
        {['Competitor A', 'Your Brand', 'Competitor B'].map((label, i) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <motion.div
              animate={{ height: active ? [i === 1 ? 36 : 22, i === 1 ? 40 : 22] : 14 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.07 }}
              style={{ width: 28, background: i === 1 ? color : 'rgba(15,34,68,0.1)', borderRadius: 3, margin: '0 auto 3px' }}
            />
            <span style={{ fontSize: 7, color: i === 1 ? color : 'rgba(15,34,68,0.35)' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Scene 2: Design & Brand System ── */
function Scene2({ active, color }: { active: boolean; color: string }) {
  const palette = ['#1e5fe0', '#8b5cf6', '#0ea5e9', '#10b981', '#f59e0b']
  const weights = ['Thin', 'Regular', 'Bold', 'Black']
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 12, padding: '10px 0' }}>
      {/* Color palette */}
      <div>
        <div style={{ fontSize: 8, color: 'rgba(15,34,68,0.35)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>COLOUR PALETTE</div>
        <div style={{ display: 'flex', gap: 5 }}>
          {palette.map((c, i) => (
            <motion.div
              key={c}
              animate={{ scale: active ? 1 : 0.8, opacity: active ? 1 : 0.4 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              style={{ flex: 1, height: 26, borderRadius: 5, background: c, border: c === color ? `2px solid #fff` : 'none' }}
            />
          ))}
        </div>
      </div>
      {/* Typography */}
      <div>
        <div style={{ fontSize: 8, color: 'rgba(15,34,68,0.35)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>TYPOGRAPHY</div>
        <div style={{ display: 'flex', gap: 5, alignItems: 'flex-end' }}>
          {weights.map((w, i) => (
            <motion.span
              key={w}
              animate={{ opacity: active ? 1 : 0.3, y: active ? 0 : 3 }}
              transition={{ duration: 0.3, delay: 0.1 + i * 0.06 }}
              style={{ fontSize: 8 + i * 2, fontWeight: [100, 400, 700, 900][i], color: '#0f2244', lineHeight: 1 }}
            >Aa</motion.span>
          ))}
        </div>
      </div>
      {/* Component library row */}
      <div>
        <div style={{ fontSize: 8, color: 'rgba(15,34,68,0.35)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>COMPONENTS</div>
        <div style={{ display: 'flex', gap: 5 }}>
          <motion.span animate={{ opacity: active ? 1 : 0.4 }} transition={{ duration: 0.3 }} style={{ background: color, color: '#0f2244', padding: '3px 10px', borderRadius: 5, fontSize: 9, fontWeight: 700 }}>Button</motion.span>
          <motion.span animate={{ opacity: active ? 1 : 0.4 }} transition={{ duration: 0.3, delay: 0.05 }} style={{ border: `1px solid ${color}`, color, padding: '3px 10px', borderRadius: 5, fontSize: 9 }}>Outline</motion.span>
          <motion.span animate={{ opacity: active ? 1 : 0.4 }} transition={{ duration: 0.3, delay: 0.1 }} style={{ background: `${color}1a`, color, padding: '3px 10px', borderRadius: 5, fontSize: 9 }}>Ghost</motion.span>
        </div>
      </div>
      {/* Card preview */}
      <motion.div
        animate={{ borderColor: active ? color : `${color}33`, opacity: active ? 1 : 0.5 }}
        transition={{ duration: 0.3 }}
        style={{ border: `1px solid ${color}33`, borderRadius: 7, padding: '6px 8px', background: `${color}08` }}
      >
        <div style={{ height: 3, background: color, borderRadius: 2, marginBottom: 4 }} />
        <div style={{ height: 3, background: 'rgba(15,34,68,0.15)', borderRadius: 2, marginBottom: 3, width: '80%' }} />
        <div style={{ height: 3, background: 'rgba(15,34,68,0.1)', borderRadius: 2, width: '60%' }} />
      </motion.div>
    </div>
  )
}

/* ── Scene 3: Development & Testing ── */
function Scene3({ active, color }: { active: boolean; color: string }) {
  const lines = [
    { text: 'export function HeroSection() {', indent: 0 },
    { text: '  const schema = buildSchema({', indent: 1 },
    { text: "    '@type': 'LocalBusiness',", indent: 2 },
    { text: "    name: 'SecureMax CCTV',", indent: 2 },
    { text: '  })', indent: 1 },
    { text: '  return <main>{/* … */}</main>', indent: 1 },
    { text: '}', indent: 0 },
  ]
  const cwv = [{ k: 'LCP', v: '1.2s' }, { k: 'INP', v: '110ms' }, { k: 'CLS', v: '0.03' }]
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 10, padding: '8px 0' }}>
      {/* Code editor */}
      <div style={{ background: '#0a0f1e', border: '1px solid rgba(15,34,68,0.08)', borderRadius: 8, padding: '8px 10px', flex: 1 }}>
        <div style={{ display: 'flex', gap: 4, marginBottom: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff5f57' }} />
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#febc2e' }} />
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#28c840' }} />
          <span style={{ marginLeft: 4, fontSize: 7.5, color: 'rgba(15,34,68,0.3)', fontFamily: 'var(--font-mono)' }}>hero-section.tsx</span>
        </div>
        {lines.map((line, i) => (
          <motion.div
            key={i}
            animate={{ opacity: active ? 1 : 0.2, x: active ? 0 : -4 }}
            transition={{ duration: 0.25, delay: 0.05 + i * 0.04 }}
            style={{ fontSize: 7.5, fontFamily: 'var(--font-mono)', color: i === 0 ? color : i >= 2 && i <= 4 ? '#f59e0b' : 'rgba(15,34,68,0.65)', paddingLeft: line.indent * 6, lineHeight: 1.7 }}
          >{line.text}</motion.div>
        ))}
      </div>
      {/* CWV scores */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 5 }}>
        {cwv.map((m, i) => (
          <motion.div
            key={m.k}
            animate={{ scale: active ? 1 : 0.9, opacity: active ? 1 : 0.4 }}
            transition={{ duration: 0.3, delay: 0.2 + i * 0.06 }}
            style={{ textAlign: 'center', padding: '4px 2px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.35)', borderRadius: 5 }}
          >
            <div style={{ fontSize: 7.5, color: '#10b981', fontWeight: 700 }}>{m.k}</div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#10b981', fontFamily: 'var(--font-mono)' }}>{m.v}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ── Scene 4: Launch & Optimisation ── */
function Scene4({ active, color }: { active: boolean; color: string }) {
  const pipeline = ['Build', 'Test', 'Preview', 'Deploy']
  const rankings = [
    { kw: 'security cameras sydney', pos: 1 },
    { kw: 'cctv installation', pos: 2 },
    { kw: 'alarm monitoring', pos: 3 },
  ]
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 12, padding: '8px 0' }}>
      {/* Deployment pipeline */}
      <div>
        <div style={{ fontSize: 8, color: 'rgba(15,34,68,0.35)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>DEPLOYMENT PIPELINE</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          {pipeline.map((step, i) => (
            <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 3, flex: 1 }}>
              <motion.div
                animate={{ background: active ? (i < 3 ? '#10b981' : color) : 'rgba(15,34,68,0.1)', scale: active ? 1 : 0.85 }}
                transition={{ duration: 0.3, delay: 0.05 + i * 0.08 }}
                style={{ borderRadius: 5, padding: '4px 0', textAlign: 'center', flex: 1, fontSize: 8, fontWeight: 700, color: '#0f2244' }}
              >{step}</motion.div>
              {i < pipeline.length - 1 && <span style={{ fontSize: 8, color: 'rgba(15,34,68,0.25)' }}>→</span>}
            </div>
          ))}
        </div>
      </div>
      {/* Live metrics */}
      <div style={{ display: 'flex', gap: 8 }}>
        {[{ label: 'Visitors', val: '1,240', delta: '+18%' }, { label: 'Leads', val: '34', delta: '+41%' }].map((m, i) => (
          <motion.div
            key={m.label}
            animate={{ opacity: active ? 1 : 0.4, y: active ? 0 : 4 }}
            transition={{ duration: 0.3, delay: 0.2 + i * 0.08 }}
            style={{ flex: 1, background: `${color}0d`, border: `1px solid ${color}33`, borderRadius: 7, padding: '6px 8px' }}
          >
            <div style={{ fontSize: 7.5, color: 'rgba(15,34,68,0.4)', marginBottom: 2 }}>{m.label}</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#0f2244', fontFamily: 'var(--font-mono)' }}>{m.val}</div>
            <div style={{ fontSize: 8, color: '#10b981', fontWeight: 700 }}>{m.delta} this week</div>
          </motion.div>
        ))}
      </div>
      {/* Rankings */}
      <div>
        <div style={{ fontSize: 8, color: 'rgba(15,34,68,0.35)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 5, fontFamily: 'var(--font-mono)' }}>GOOGLE RANKINGS</div>
        {rankings.map((r, i) => (
          <motion.div
            key={r.kw}
            animate={{ opacity: active ? 1 : 0.3, x: active ? 0 : -6 }}
            transition={{ duration: 0.3, delay: 0.3 + i * 0.07 }}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}
          >
            <span style={{ fontSize: 8, color: 'rgba(15,34,68,0.6)' }}>{r.kw}</span>
            <span style={{ fontSize: 8, fontWeight: 800, color: color, fontFamily: 'var(--font-mono)', background: `${color}1a`, padding: '1px 6px', borderRadius: 3 }}>#{r.pos}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const STEPS: WorkflowStep[] = [
  { step: '01', tag: 'STRATEGY', title: 'Discovery & UX Strategy', color: '#146ef5', glow: 'rgba(20,110,245,0.45)', Scene: Scene1 },
  { step: '02', tag: 'DESIGN', title: 'Design & Brand System', color: '#a259ff', glow: 'rgba(162,89,255,0.45)', Scene: Scene2 },
  { step: '03', tag: 'BUILD', title: 'Development & Testing', color: '#1abcfe', glow: 'rgba(26,188,254,0.45)', Scene: Scene3 },
  { step: '04', tag: 'LAUNCH', title: 'Launch & Optimisation', color: '#0acf83', glow: 'rgba(10,207,131,0.45)', Scene: Scene4 },
]

// ─── Web Design animated intro: browser being built ──────────────────────────
const DESIGN_STEPS_ANIM = [
  { label: 'UX Wireframe', icon: '📐', delay: 0 },
  { label: 'Brand System', icon: '🎨', delay: 0.4 },
  { label: 'Components',   icon: '🧩', delay: 0.8 },
  { label: 'AI-Ready',     icon: '🤖', delay: 1.2 },
]
const CODE_LINES = [
  { t: '<SecurityPage />', c: '#a5b4fc' },
  { t: '  <Hero cta="Get Quote" />', c: '#6ee7b7' },
  { t: '  <Services schema={true} />', c: '#fde68a' },
  { t: '  <ContactForm ai-ready />', c: '#6ee7b7' },
  { t: '</SecurityPage>', c: '#a5b4fc' },
]

function WebDesignIntroScene() {
  const [lineIdx, setLineIdx] = useState(-1)
  useEffect(() => {
    let i = -1
    const iv = setInterval(() => { i++; setLineIdx(i); if (i >= CODE_LINES.length) clearInterval(iv) }, 220)
    return () => clearInterval(iv)
  }, [])

  return (
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, #f5f0ff 0%, #faf8ff 100%)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 500, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Browser frame */}
      <div style={{ position: 'absolute', top: '8%', left: '50%', transform: 'translateX(-50%)', width: 500, background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 8px 40px rgba(99,102,241,0.12)', border: '1.5px solid rgba(99,102,241,0.15)' }}>
        {/* Browser chrome */}
        <div style={{ background: '#f1f3f9', padding: '9px 14px', borderBottom: '1px solid rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', gap: 8 }}>
          {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />)}
          <div style={{ flex: 1, background: '#fff', borderRadius: 20, padding: '4px 12px', fontSize: 11, color: '#46546e', fontFamily: 'var(--font-mono)', border: '1px solid rgba(99,102,241,0.1)' }}>
            securityblogs.com.au
          </div>
        </div>
        {/* Page preview */}
        <div style={{ padding: '14px', background: '#0f2244', minHeight: 120 }}>
          <motion.div initial={{ width: 0 }} animate={{ width: '70%' }} transition={{ duration: 0.6, delay: 0.3 }} style={{ height: 10, background: 'rgba(255,255,255,0.9)', borderRadius: 5, marginBottom: 8 }} />
          <motion.div initial={{ width: 0 }} animate={{ width: '45%' }} transition={{ duration: 0.5, delay: 0.5 }} style={{ height: 7, background: 'rgba(99,102,241,0.8)', borderRadius: 4, marginBottom: 12 }} />
          <div style={{ display: 'flex', gap: 8 }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} style={{ background: '#6366f1', borderRadius: 8, padding: '6px 14px', fontSize: 11, color: '#fff', fontWeight: 700 }}>Get Quote</motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 8, padding: '6px 14px', fontSize: 11, color: '#fff', fontWeight: 700, border: '1px solid rgba(255,255,255,0.2)' }}>Learn More</motion.div>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} style={{ marginTop: 10, display: 'flex', gap: 6 }}>
            {['CCTV','Access','Alarms','Monitoring'].map(t => (
              <div key={t} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 999, padding: '3px 10px', fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>{t}</div>
            ))}
          </motion.div>
        </div>
        {/* Code editor */}
        <div style={{ background: '#1e1e2e', padding: '10px 14px' }}>
          {CODE_LINES.map((l, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={lineIdx >= i ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.2 }}
              style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: l.c, lineHeight: 1.7 }}>
              {l.t}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Design step badges */}
      <div style={{ position: 'absolute', top: '70%', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 10 }}>
        {DESIGN_STEPS_ANIM.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: s.delay, type: 'spring', stiffness: 200 }}
            style={{ background: '#fff', border: '1.5px solid rgba(99,102,241,0.2)', borderRadius: 12, padding: '8px 12px', textAlign: 'center', boxShadow: '0 2px 12px rgba(99,102,241,0.08)' }}>
            <div style={{ fontSize: 18, marginBottom: 3 }}>{s.icon}</div>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#6366f1', whiteSpace: 'nowrap' }}>{s.label}</div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
        style={{ textAlign: 'center', zIndex: 10, position: 'relative', marginTop: 350 }}>
        <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: '#6366f1', letterSpacing: '0.18em', marginBottom: 10 }}>HOW IT WORKS</div>
        <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', fontWeight: 800, color: '#0f2244', lineHeight: 1.2, marginBottom: 12 }}>Websites That Rank,<br /><span style={{ color: '#6366f1' }}>Convert & Get Cited</span></h2>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.8, repeat: Infinity }} style={{ marginTop: 18, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, opacity: 0.6 }}>
          <div style={{ width: 24, height: 38, borderRadius: 12, border: '2px solid rgba(99,102,241,0.4)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 5 }}>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.8, repeat: Infinity }} style={{ width: 4, height: 8, borderRadius: 2, background: '#6366f1' }} />
          </div>
          <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: '#6366f1', letterSpacing: '0.14em' }}>SCROLL TO BEGIN</span>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default function WebDesignHowItWorks() {
  return <ServiceWorkflowCards steps={STEPS} introNode={<WebDesignIntroScene />} cardW={1060} cardH={520} sideXOffset={9999} sectionBg="#f5f0ff" />
}
