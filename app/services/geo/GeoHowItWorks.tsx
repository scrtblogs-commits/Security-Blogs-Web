'use client'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import ServiceWorkflowCards, { type WorkflowStep } from '@/components/ui/ServiceWorkflowCards'

// ─── Scene 1: Entity Creation & Verification ────────────────────────────────

function Scene1({ active, color }: { active: boolean; color: string }) {
  const fields = [
    { label: '@type', value: 'Organization', valueColor: '#f97583' },
    { label: 'name', value: '"SecurityBlogs"', valueColor: '#9ecbff' },
    { label: 'url', value: '"securityblogs.com.au"', valueColor: '#9ecbff' },
    { label: 'areaServed', value: '["AU","US","UK","UAE"]', valueColor: '#9ecbff' },
    { label: 'sameAs', value: '[wikidata, crunchbase…]', valueColor: '#79c0ff' },
  ]

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'linear-gradient(160deg, #060d1c 0%, #0a1525 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32,
    }}>
      <style>{`
        @keyframes geo-s1-blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes geo-s1-badge { 0%,100%{box-shadow:0 0 0 0 rgba(63,185,80,0.4)} 50%{box-shadow:0 0 0 8px rgba(63,185,80,0)} }
      `}</style>

      <div style={{ width: '100%', maxWidth: 440 }}>
        {/* Editor header */}
        <div style={{
          background: '#161b22', borderRadius: '12px 12px 0 0',
          padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}>
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f57', display: 'inline-block' }} />
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#febc2e', display: 'inline-block' }} />
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#28c840', display: 'inline-block' }} />
          <span style={{ flex: 1, textAlign: 'center', fontSize: 10.5, color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-mono)' }}>
            entity.jsonld
          </span>
        </div>

        {/* Code body */}
        <div style={{
          background: '#0d1117', borderRadius: '0 0 12px 12px',
          padding: '16px 18px', fontFamily: 'var(--font-mono)', fontSize: 12.5,
          color: '#c9d1d9', border: '1px solid rgba(255,255,255,0.08)', borderTop: 'none',
        }}>
          <div style={{ color: 'rgba(255,255,255,0.3)', marginBottom: 10 }}>{'{'}</div>
          {fields.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, x: -10 }}
              animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ delay: i * 0.12, duration: 0.35 }}
              style={{ display: 'flex', gap: 8, paddingLeft: 16, marginBottom: 7 }}
            >
              <span style={{ color: '#d2a8ff' }}>&quot;{f.label}&quot;</span>
              <span style={{ color: 'rgba(255,255,255,0.3)' }}>:</span>
              <span style={{ color: f.valueColor }}>{f.value}</span>
            </motion.div>
          ))}
          <div style={{ color: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', gap: 4 }}>
            {'}'}
            <span style={{
              display: 'inline-block', width: 2, height: 14, background: color,
              animation: active ? 'geo-s1-blink 1s infinite' : 'none',
              verticalAlign: 'middle', marginLeft: 2,
            }} />
          </div>

          {/* Verified badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            style={{
              marginTop: 14, display: 'inline-flex', alignItems: 'center', gap: 7,
              background: 'rgba(63,185,80,0.1)', color: '#3fb950',
              border: '1px solid rgba(63,185,80,0.3)', borderRadius: 8,
              padding: '6px 12px', fontSize: 11, fontFamily: 'system-ui, sans-serif',
              animation: active ? 'geo-s1-badge 2s infinite' : 'none',
            }}
          >
            <span style={{
              width: 8, height: 8, borderRadius: '50%', background: '#3fb950', display: 'inline-block',
            }} />
            Entity verified ✓
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// ─── Scene 2: Signal Distribution Across Platforms ──────────────────────────

function Scene2({ active, color }: { active: boolean; color: string }) {
  const platforms = ['Wikidata', 'Crunchbase', 'LinkedIn', 'Google KB', 'Bing Places', 'Industry Dirs']

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'linear-gradient(160deg, #060d1c 0%, #0a1525 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <style>{`
        @keyframes geo-s2-pulse { 0%{transform:scale(1);opacity:0.8} 60%{transform:scale(2.5);opacity:0} 100%{transform:scale(1);opacity:0} }
        @keyframes geo-s2-travel { 0%{stroke-dashoffset:200;opacity:0} 30%{opacity:1} 100%{stroke-dashoffset:0;opacity:0.7} }
      `}</style>

      {/* Central hub */}
      <div style={{ position: 'relative', width: 380, height: 320 }}>
        {/* SVG lines */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
          {platforms.map((_, i) => {
            const angle = (i / platforms.length) * Math.PI * 2 - Math.PI / 2
            const cx = 190, cy = 160, r = 130
            const x2 = cx + r * Math.cos(angle)
            const y2 = cy + r * Math.sin(angle)
            return (
              <line
                key={i}
                x1={cx} y1={cy} x2={x2} y2={y2}
                stroke={color} strokeWidth={1} strokeOpacity={0.2}
                strokeDasharray="200" strokeDashoffset="0"
              />
            )
          })}
          {active && platforms.map((_, i) => {
            const angle = (i / platforms.length) * Math.PI * 2 - Math.PI / 2
            const cx = 190, cy = 160, r = 130
            const x2 = cx + r * Math.cos(angle)
            const y2 = cy + r * Math.sin(angle)
            return (
              <line
                key={`anim-${i}`}
                x1={cx} y1={cy} x2={x2} y2={y2}
                stroke={color} strokeWidth={2} strokeOpacity={0.9}
                strokeDasharray="200"
                style={{ animation: `geo-s2-travel 2.2s ease-in-out ${i * 0.32}s infinite` }}
              />
            )
          })}
        </svg>

        {/* Central brand node */}
        <div style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%,-50%)',
          width: 64, height: 64, borderRadius: 16,
          background: `linear-gradient(135deg, ${color}, #ff6b7a)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22, fontWeight: 900, color: '#ffffff',
          boxShadow: active ? `0 0 30px -4px ${color}88` : 'none',
          transition: 'box-shadow 0.5s',
          zIndex: 2,
        }}>S</div>

        {/* Pulse rings */}
        {active && [0, 0.6, 1.2].map((delay, i) => (
          <div key={i} style={{
            position: 'absolute', left: '50%', top: '50%',
            width: 64, height: 64, borderRadius: 16,
            border: `2px solid ${color}`,
            transform: 'translate(-50%,-50%)',
            animation: `geo-s2-pulse 2.4s ease-out ${delay}s infinite`,
            pointerEvents: 'none',
          }} />
        ))}

        {/* Platform nodes */}
        {platforms.map((name, i) => {
          const angle = (i / platforms.length) * Math.PI * 2 - Math.PI / 2
          const r = 130
          const left = 190 + r * Math.cos(angle) - 36
          const top = 160 + r * Math.sin(angle) - 16
          return (
            <motion.div
              key={name}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={active ? { opacity: 1, scale: 1 } : { opacity: 0.3, scale: 0.7 }}
              transition={{ delay: i * 0.1 + 0.3, duration: 0.4 }}
              style={{
                position: 'absolute', left, top,
                background: 'rgba(255,255,255,0.12)', border: `1px solid ${color}55`,
                borderRadius: 8, padding: '4px 8px',
                fontSize: 9.5, color: 'rgba(255,255,255,0.85)',
                fontFamily: 'system-ui, sans-serif', whiteSpace: 'nowrap',
              }}
            >{name}</motion.div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Scene 3: Authority Building & Citations ─────────────────────────────────

function Scene3({ active, color }: { active: boolean; color: string }) {
  const [count, setCount] = useState(0)
  const [score, setScore] = useState(24)

  useEffect(() => {
    if (!active) { setCount(0); setScore(24); return }
    let c = 0, s = 24
    const id = setInterval(() => {
      c = Math.min(c + 3, 142)
      s = Math.min(s + 1, 94)
      setCount(c)
      setScore(s)
      if (c >= 142) clearInterval(id)
    }, 60)
    return () => clearInterval(id)
  }, [active])

  const citations = [
    { source: 'TechTarget', type: 'Backlink', strength: 92 },
    { source: 'CSOOnline', type: 'Citation', strength: 87 },
    { source: 'DarkReading', type: 'Mention', strength: 78 },
    { source: 'InfoSecurity', type: 'Citation', strength: 71 },
  ]

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'linear-gradient(160deg, #060d1c 0%, #0a1525 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 28,
    }}>
      <div style={{ width: '100%', maxWidth: 460 }}>
        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
          <div style={{
            background: 'rgba(255,255,255,0.06)', borderRadius: 12,
            padding: '14px 16px', border: `1px solid ${color}22`,
          }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 4, fontFamily: 'system-ui' }}>Total Citations</div>
            <motion.div style={{ fontSize: 38, fontWeight: 800, color, lineHeight: 1 }}>
              {count}
            </motion.div>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.06)', borderRadius: 12,
            padding: '14px 16px', border: '1px solid rgba(34,197,94,0.22)',
          }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 4, fontFamily: 'system-ui' }}>Authority Score</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4 }}>
              <motion.div style={{ fontSize: 38, fontWeight: 800, color: '#22c55e', lineHeight: 1 }}>
                {score}
              </motion.div>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', paddingBottom: 4 }}>/100</span>
            </div>
          </div>
        </div>

        {/* Citation list */}
        {citations.map((c, i) => (
          <motion.div
            key={c.source}
            initial={{ opacity: 0, x: -16 }}
            animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
            transition={{ delay: i * 0.1 + 0.2 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '8px 0',
              borderBottom: i < citations.length - 1 ? '1px solid rgba(15,34,68,0.05)' : 'none',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            <span style={{ flex: 1, fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>{c.source}</span>
            <span style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.08)', borderRadius: 4, padding: '2px 6px' }}>{c.type}</span>
            <div style={{ width: 80, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={active ? { width: `${c.strength}%` } : { width: 0 }}
                transition={{ delay: i * 0.1 + 0.4, duration: 0.7 }}
                style={{ height: '100%', background: color, borderRadius: 3 }}
              />
            </div>
            <span style={{ fontSize: 10, color, width: 24, textAlign: 'right' }}>{c.strength}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ─── Scene 4: AI Confirmation & Monitoring ───────────────────────────────────

function Scene4({ active, color }: { active: boolean; color: string }) {
  const platforms = [
    { name: 'ChatGPT', logo: 'AI', bg: '#10a37f', status: 'confirmed' as const, delay: 0.1 },
    { name: 'Gemini', logo: 'G', bg: '#4285f4', status: 'confirmed' as const, delay: 0.25 },
    { name: 'Perplexity', logo: 'P', bg: '#1FB8CD', status: 'confirmed' as const, delay: 0.4 },
    { name: 'Claude', logo: 'C', bg: '#cc785c', status: 'confirmed' as const, delay: 0.55 },
    { name: 'Copilot', logo: 'M', bg: '#0078d4', status: 'pending' as const, delay: 0.7 },
    { name: 'Meta AI', logo: 'M', bg: '#0866ff', status: 'pending' as const, delay: 0.85 },
  ]

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'linear-gradient(160deg, #060d1c 0%, #0a1525 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 28,
    }}>
      <style>{`
        @keyframes geo-s4-pending { 0%,100%{opacity:1} 50%{opacity:0.25} }
      `}</style>

      <div style={{ width: '100%', maxWidth: 440 }}>
        {/* Header */}
        <div style={{ marginBottom: 16, fontFamily: 'system-ui, sans-serif' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.9)', marginBottom: 3 }}>Entity Confirmation Status</div>
          <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.5)' }}>securityblogs.com.au · Updated live</div>
        </div>

        {/* Platform rows */}
        {platforms.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 10 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: p.delay, duration: 0.35 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '9px 12px', borderRadius: 10,
              background: 'rgba(255,255,255,0.05)',
              border: `1px solid ${p.status === 'confirmed' ? 'rgba(34,197,94,0.15)' : 'rgba(251,191,36,0.12)'}`,
              marginBottom: 7, fontFamily: 'system-ui, sans-serif',
            }}
          >
            <span style={{
              width: 28, height: 28, borderRadius: 8, background: p.bg,
              color: 'rgba(255,255,255,0.7)', fontSize: 11, fontWeight: 700,
              display: 'grid', placeItems: 'center', flexShrink: 0,
            }}>{p.logo}</span>
            <span style={{ flex: 1, fontSize: 12.5, color: 'rgba(255,255,255,0.85)' }}>{p.name}</span>
            {p.status === 'confirmed' ? (
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                fontSize: 9.5, fontWeight: 700, color: '#22c55e',
                background: 'rgba(34,197,94,0.12)', borderRadius: 6,
                padding: '3px 8px', border: '1px solid rgba(34,197,94,0.25)',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                CONFIRMED
              </span>
            ) : (
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                fontSize: 9.5, fontWeight: 700, color: '#fbbf24',
                background: 'rgba(251,191,36,0.1)', borderRadius: 6,
                padding: '3px 8px', border: '1px solid rgba(251,191,36,0.2)',
              }}>
                <span style={{
                  width: 6, height: 6, borderRadius: '50%', background: '#fbbf24', display: 'inline-block',
                  animation: active ? 'geo-s4-pending 1.3s ease-in-out infinite' : 'none',
                }} />
                PENDING
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ─── Steps config ────────────────────────────────────────────────────────────

const STEPS: WorkflowStep[] = [
  {
    step: '01',
    tag: 'DISCOVERY',
    title: 'Entity Creation & Verification',
    color: '#0066cc',
    glow: 'rgba(0,102,204,0.45)',
    Scene: Scene1,
  },
  {
    step: '02',
    tag: 'DISTRIBUTE',
    title: 'Signal Distribution Across Platforms',
    color: '#9c27b0',
    glow: 'rgba(156,39,176,0.45)',
    Scene: Scene2,
  },
  {
    step: '03',
    tag: 'AUTHORITY',
    title: 'Authority Building & Citations',
    color: '#ff6d00',
    glow: 'rgba(255,109,0,0.45)',
    Scene: Scene3,
  },
  {
    step: '04',
    tag: 'CONFIRM',
    title: 'AI Confirmation & Monitoring',
    color: '#00897b',
    glow: 'rgba(0,137,123,0.45)',
    Scene: Scene4,
  },
]

// ─── GEO animated intro: globe with AI signal pulses ─────────────────────────
const GEO_CITIES = [
  { cx: 50, cy: 42, label: 'Sydney', delay: 0 },
  { cx: 28, cy: 38, label: 'London', delay: 0.4 },
  { cx: 74, cy: 35, label: 'Dubai',  delay: 0.8 },
  { cx: 16, cy: 45, label: 'New York', delay: 1.2 },
  { cx: 62, cy: 55, label: 'Singapore', delay: 0.6 },
]

function GeoIntroScene() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, #f0fffe 0%, #f6fffe 100%)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Globe SVG */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -52%)', width: 340, height: 340 }}>
        <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }}>
          {/* Outer circle */}
          <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(0,170,160,0.18)" strokeWidth="1.5" />
          {/* Latitude lines */}
          {[20,40,60,80].map(r => <ellipse key={r} cx="100" cy="100" rx={r} ry={r*0.35} fill="none" stroke="rgba(0,170,160,0.12)" strokeWidth="1" />)}
          {/* Longitude arcs */}
          {[0,40,80,120,160].map((a,i) => (
            <ellipse key={a} cx="100" cy="100" rx="45" ry="90" fill="none" stroke="rgba(0,170,160,0.10)" strokeWidth="1"
              transform={`rotate(${a} 100 100)`} />
          ))}
          {/* City dots */}
          {GEO_CITIES.map((c, i) => (
            <g key={c.label}>
              <circle cx={c.cx * 2} cy={c.cy * 2} r="4" fill="#00aaa0" opacity="0.9">
                <animate attributeName="r" values="4;7;4" dur={`${2+i*0.3}s`} begin={`${c.delay}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.9;0.4;0.9" dur={`${2+i*0.3}s`} begin={`${c.delay}s`} repeatCount="indefinite" />
              </circle>
              <circle cx={c.cx * 2} cy={c.cy * 2} r="12" fill="none" stroke="#00aaa0" strokeWidth="1" opacity="0.3">
                <animate attributeName="r" values="6;18;6" dur={`${2+i*0.3}s`} begin={`${c.delay}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0;0.5" dur={`${2+i*0.3}s`} begin={`${c.delay}s`} repeatCount="indefinite" />
              </circle>
            </g>
          ))}
          {/* Connecting lines to center */}
          {GEO_CITIES.map((c, i) => (
            <line key={c.label} x1={c.cx * 2} y1={c.cy * 2} x2="100" y2="100" stroke="rgba(0,170,160,0.2)" strokeWidth="1" strokeDasharray="3 3">
              <animate attributeName="opacity" values="0.2;0.6;0.2" dur={`${3+i*0.4}s`} begin={`${i*0.3}s`} repeatCount="indefinite" />
            </line>
          ))}
          {/* AI core */}
          <circle cx="100" cy="100" r="8" fill="#00aaa0" opacity="0.9">
            <animate attributeName="r" values="8;11;8" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <text x="100" y="104" textAnchor="middle" fontSize="7" fill="#fff" fontWeight="bold">AI</text>
        </svg>
      </div>

      {/* City labels floating */}
      {GEO_CITIES.map((c, i) => (
        <motion.div key={c.label} style={{ position: 'absolute', left: `${c.cx - 4}%`, top: `${c.cy - 22}%` }}
          animate={{ y: [0, -5, 0] }} transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, delay: c.delay }}>
          <div style={{ background: '#fff', border: '1px solid rgba(0,170,160,0.3)', borderRadius: 8, padding: '3px 8px', fontSize: 10, color: '#0f7a74', fontWeight: 700, whiteSpace: 'nowrap', boxShadow: '0 2px 8px rgba(0,170,160,0.12)' }}>{c.label}</div>
        </motion.div>
      ))}

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
        style={{ textAlign: 'center', zIndex: 10, position: 'relative', marginTop: 200 }}>
        <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: '#00aaa0', letterSpacing: '0.18em', marginBottom: 10 }}>HOW IT WORKS</div>
        <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', fontWeight: 800, color: '#ffffff', marginBottom: 12, lineHeight: 1.2 }}>Get Recommended<br /><span style={{ color: '#00aaa0' }}>Everywhere AI Looks</span></h2>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.8, repeat: Infinity }} style={{ marginTop: 18, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, opacity: 0.6 }}>
          <div style={{ width: 24, height: 38, borderRadius: 12, border: '2px solid rgba(0,170,160,0.4)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 5 }}>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.8, repeat: Infinity }} style={{ width: 4, height: 8, borderRadius: 2, background: '#00aaa0' }} />
          </div>
          <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: '#00aaa0', letterSpacing: '0.14em' }}>SCROLL TO BEGIN</span>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default function GeoHowItWorks() {
  return <ServiceWorkflowCards steps={STEPS} introNode={<GeoIntroScene />} cardW={1060} cardH={520} sideXOffset={9999} sectionBg="#f0fffe" />
}
