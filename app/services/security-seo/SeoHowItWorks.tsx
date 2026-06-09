'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import ServiceWorkflowCards, { type WorkflowStep } from '@/components/ui/ServiceWorkflowCards'

const STEPS: WorkflowStep[] = [
  { step: '01', tag: 'FOUNDATION', title: 'SEO Audit & Keyword Research', color: '#1e5fe0', glow: 'rgba(30,95,224,0.45)',   Scene: Scene1 },
  { step: '02', tag: 'OPTIMISE',   title: 'Technical Fixes & On-Page',   color: '#1e9e75', glow: 'rgba(30,158,117,0.45)', Scene: Scene2 },
  { step: '03', tag: 'AUTHORITY',  title: 'Content & Link Building',     color: '#0ea5e9', glow: 'rgba(14,165,233,0.45)', Scene: Scene3 },
  { step: '04', tag: 'RESULTS',    title: 'Monitor & Scale',             color: '#f59e0b', glow: 'rgba(245,158,11,0.45)', Scene: Scene4 },
]

export default function SeoHowItWorks() {
  return <ServiceWorkflowCards steps={STEPS} />
}

/* ══════════════════════════════════════════════
   SCENE 1 — SEO Audit & Keyword Research
══════════════════════════════════════════════ */
const AUDIT_ITEMS = [
  { icon: '⚡', label: 'Page Speed', note: '2.1 s → 0.8 s' },
  { icon: '📋', label: 'Title Tags', note: '3 missing · fixed' },
  { icon: '🔗', label: 'Broken Links', note: '12 errors · resolved' },
  { icon: '📊', label: 'Schema Markup', note: 'LocalBusiness + FAQ' },
  { icon: '🔍', label: 'Crawl Errors', note: '47 issues · cleared' },
]

const KWDS = [
  { t: 'CCTV installation Melbourne', w: 700 },
  { t: 'security camera experts',     w: 400 },
  { t: 'access control systems AU',   w: 300 },
  { t: 'alarm monitoring services',   w: 220 },
  { t: 'security companies near me',  w: 180 },
  { t: 'CCTV repairs',                w: 110 },
  { t: 'intercom installation',       w: 90  },
  { t: 'security audit Melbourne',    w: 75  },
]

function Scene1({ active, color }: { active: boolean; color: string }) {
  const [tick, setTick] = useState(-1)
  const [volIn, setVolIn] = useState(false)

  useEffect(() => {
    if (!active) { setTick(-1); setVolIn(false); return }
    let t = -1
    const iv = setInterval(() => {
      t++; setTick(t)
      if (t >= AUDIT_ITEMS.length) clearInterval(iv)
    }, 350)
    const vol = setTimeout(() => setVolIn(true), 600)
    return () => { clearInterval(iv); clearTimeout(vol) }
  }, [active])

  return (
    <div style={{ padding: '28px 26px 24px', height: '100%', display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div>
        <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: color, letterSpacing: '0.12em', marginBottom: 6 }}>STEP 01</div>
        <div style={{ fontSize: 21, fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>SEO Audit &<br />Keyword Research</div>
      </div>

      <div style={{ display: 'flex', gap: 16, flex: 1, minHeight: 0 }}>

        {/* Audit checklist */}
        <div style={{ flex: '0 0 auto', width: 258, display: 'flex', flexDirection: 'column', gap: 7 }}>
          <div style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.35)', marginBottom: 2, letterSpacing: '0.1em' }}>SITE AUDIT</div>
          {AUDIT_ITEMS.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -14 }}
              animate={tick >= i ? { opacity: 1, x: 0 } : { opacity: 0, x: -14 }}
              transition={{ duration: 0.3 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: 'rgba(255,255,255,0.03)', borderRadius: 10,
                padding: '7px 9px', border: `1px solid ${color}18`,
              }}
            >
              <div style={{ width: 24, height: 24, borderRadius: 7, background: `${color}18`, border: `1px solid ${color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, flexShrink: 0 }}>{item.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#fff' }}>{item.label}</div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.38)', fontFamily: 'var(--font-mono)' }}>{item.note}</div>
              </div>
              <motion.span
                initial={{ scale: 0, rotate: -45 }}
                animate={tick > i ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -45 }}
                transition={{ duration: 0.25, delay: 0.12 }}
                style={{ color: '#1e9e75', fontWeight: 700, fontSize: 15, flexShrink: 0 }}
              >✓</motion.span>
            </motion.div>
          ))}
        </div>

        {/* Keyword universe */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0, borderRadius: 14, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
          <div style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.35)', padding: '9px 12px', borderBottom: '1px solid rgba(255,255,255,0.05)', letterSpacing: '0.1em' }}>KEYWORD UNIVERSE · 280 mapped</div>
          <div style={{ padding: '10px 12px 0', display: 'flex', flexWrap: 'wrap', gap: 5, flex: 1 }}>
            {KWDS.map((kw, i) => (
              <motion.span
                key={kw.t}
                initial={{ opacity: 0, scale: 0.75 }}
                animate={volIn ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.75 }}
                transition={{ delay: volIn ? i * 0.1 : 0, duration: 0.35, ease: [0.22, 0.8, 0.2, 1] }}
                style={{
                  fontSize: i === 0 ? 12 : i < 3 ? 11 : 9.5,
                  fontWeight: i < 2 ? 700 : 500,
                  padding: '3px 7px', borderRadius: 6, whiteSpace: 'nowrap',
                  background: i === 0 ? `${color}20` : 'rgba(255,255,255,0.04)',
                  color: i === 0 ? color : i < 3 ? `${color}bb` : 'rgba(255,255,255,0.45)',
                  border: `1px solid ${i === 0 ? color + '40' : 'rgba(255,255,255,0.07)'}`,
                }}
              >{kw.t}</motion.span>
            ))}
          </div>
          {/* Volume bars */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, padding: '8px 12px 10px', height: 52 }}>
            {KWDS.map((kw, i) => {
              const pct = kw.w / 700
              return (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0 }}
                  animate={volIn ? { scaleY: 1 } : { scaleY: 0 }}
                  transition={{ delay: volIn ? 0.4 + i * 0.06 : 0, duration: 0.5, ease: [0.22, 0.8, 0.2, 1] }}
                  style={{
                    flex: 1, height: `${Math.max(6, pct * 34)}px`, transformOrigin: 'bottom',
                    background: i === 0 ? color : `${color}${Math.round(40 + pct * 80).toString(16).padStart(2,'0')}`,
                    borderRadius: '3px 3px 0 0',
                  }}
                />
              )
            })}
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: 10 }}>
        {[{ v: '47', l: 'Issues Found' }, { v: '280', l: 'Keywords' }, { v: '12', l: 'Competitors' }].map((s, i) => (
          <motion.div
            key={s.l}
            initial={{ opacity: 0, y: 10 }}
            animate={tick >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: i * 0.1, duration: 0.35 }}
            style={{
              flex: 1, textAlign: 'center', background: `${color}0d`, borderRadius: 12,
              padding: '10px 8px', border: `1px solid ${color}25`,
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color, lineHeight: 1 }}>{s.v}</div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', marginTop: 3 }}>{s.l}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════
   SCENE 2 — Technical Fixes & On-Page
══════════════════════════════════════════════ */
const CODE_LINES = [
  { text: '<title>CCTV Installation Melbourne | #1 Experts</title>', color: '#7dd3fc' },
  { text: '<meta name="description" content="Licensed CCTV', color: '#a5b4fc' },
  { text: '  installation across Melbourne. Free site survey."/>', color: '#a5b4fc' },
  { text: '<script type="application/ld+json">', color: '#86efac' },
  { text: '  { "@type": "LocalBusiness",', color: '#fde68a' },
  { text: '    "name": "SecurityBlogs.com.au" }', color: '#fde68a' },
  { text: '</script>', color: '#86efac' },
]

const VITALS = [
  { label: 'LCP', before: '3.8s', after: '1.2s', pct: 88 },
  { label: 'CLS', before: '0.24', after: '0.03', pct: 94 },
  { label: 'INP', before: '320ms', after: '68ms', pct: 91 },
]

function Scene2({ active, color }: { active: boolean; color: string }) {
  const [codeIdx, setCodeIdx] = useState(-1)
  const [vitalsIn, setVitalsIn] = useState(false)
  const [speed, setSpeed] = useState(23)

  useEffect(() => {
    if (!active) { setCodeIdx(-1); setVitalsIn(false); setSpeed(23); return }
    let c = -1
    const ci = setInterval(() => { c++; setCodeIdx(c); if (c >= CODE_LINES.length) clearInterval(ci) }, 200)
    const vt = setTimeout(() => setVitalsIn(true), 1000)
    let s = 23
    const si = setInterval(() => { s = Math.min(94, s + 3); setSpeed(s); if (s >= 94) clearInterval(si) }, 60)
    return () => { clearInterval(ci); clearTimeout(vt); clearInterval(si) }
  }, [active])

  return (
    <div style={{ padding: '28px 26px 24px', height: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color, letterSpacing: '0.12em', marginBottom: 6 }}>STEP 02</div>
        <div style={{ fontSize: 21, fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>Technical Fixes<br />&amp; On-Page SEO</div>
      </div>

      <div style={{ display: 'flex', gap: 16, flex: 1, minHeight: 0 }}>
        {/* Code editor */}
        <div style={{ flex: 1, borderRadius: 14, overflow: 'hidden', background: '#0d1117', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.03)' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f57' }} />
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#febc2e' }} />
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#28c840' }} />
            <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.3)', marginLeft: 4 }}>index.html — optimised</span>
          </div>
          <div style={{ padding: '10px 14px', flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
            {CODE_LINES.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={codeIdx >= i ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
                style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: line.color, lineHeight: 1.6, whiteSpace: 'nowrap' }}
              >
                {line.text}
                {codeIdx === i && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.7, repeat: 3 }}
                    style={{ display: 'inline-block', width: 2, height: 12, background: '#fff', marginLeft: 2, verticalAlign: 'middle' }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div style={{ width: 180, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {/* Speed score */}
          <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 14, border: `1px solid ${color}25`, padding: '14px 14px 10px', textAlign: 'center' }}>
            <div style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', marginBottom: 8 }}>SPEED SCORE</div>
            <div style={{ position: 'relative', width: 70, height: 70, margin: '0 auto 8px' }}>
              <svg viewBox="0 0 70 70" style={{ width: 70, height: 70, transform: 'rotate(-90deg)' }}>
                <circle cx="35" cy="35" r="28" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
                <motion.circle
                  cx="35" cy="35" r="28" fill="none" stroke={color} strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 28}`}
                  animate={{ strokeDashoffset: active ? 2 * Math.PI * 28 * (1 - speed / 100) : 2 * Math.PI * 28 }}
                  transition={{ duration: 0.1 }}
                />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800, color: '#fff' }}>{speed}</div>
            </div>
            <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: color }}>23 → {speed} ↑</div>
          </div>

          {/* Core Web Vitals */}
          <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 14, border: '1px solid rgba(255,255,255,0.06)', padding: '12px 12px', flex: 1 }}>
            <div style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', marginBottom: 10 }}>CORE WEB VITALS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {VITALS.map((v, i) => (
                <div key={v.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 10, fontWeight: 600, color: '#fff', fontFamily: 'var(--font-mono)' }}>{v.label}</span>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={vitalsIn ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ delay: i * 0.15 }}
                      style={{ fontSize: 9.5, color: color, fontFamily: 'var(--font-mono)', fontWeight: 700 }}
                    >{v.after} ✓</motion.span>
                  </div>
                  <div style={{ height: 5, borderRadius: 999, background: 'rgba(255,255,255,0.07)', overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={vitalsIn ? { width: `${v.pct}%` } : { width: 0 }}
                      transition={{ delay: 0.1 + i * 0.12, duration: 0.7, ease: [0.22, 0.8, 0.2, 1] }}
                      style={{ height: '100%', background: `linear-gradient(90deg, ${color}, ${color}88)`, borderRadius: 999 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Schema badge */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={vitalsIn ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        style={{ display: 'flex', gap: 10, alignItems: 'center', background: `${color}10`, borderRadius: 12, padding: '10px 16px', border: `1px solid ${color}30` }}
      >
        <span style={{ fontSize: 16 }}>📋</span>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#fff' }}>Schema Markup Applied</div>
          <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-mono)' }}>LocalBusiness · FAQPage · BreadcrumbList · Service</div>
        </div>
        <div style={{ marginLeft: 'auto', background: color, color: '#fff', fontSize: 9.5, fontWeight: 700, fontFamily: 'var(--font-mono)', padding: '4px 10px', borderRadius: 999 }}>LIVE ✓</div>
      </motion.div>
    </div>
  )
}

/* ══════════════════════════════════════════════
   SCENE 3 — Content & Link Building
══════════════════════════════════════════════ */
const EEAT = ['Experience', 'Expertise', 'Authority', 'Trust']

const BACKLINKS = [
  { domain: 'securitypro.com.au',     da: 58, type: 'Editorial' },
  { domain: 'industryreview.net',     da: 52, type: 'Resource' },
  { domain: 'ausbuildings.com.au',    da: 47, type: 'Partnership' },
  { domain: 'techwire.io',            da: 44, type: 'Guest Post' },
  { domain: 'safehomeguide.com',      da: 39, type: 'Citation' },
]

function Scene3({ active, color }: { active: boolean; color: string }) {
  const [eeIn, setEeIn] = useState(false)
  const [blIdx, setBlIdx] = useState(-1)
  const [dr, setDr] = useState(12)

  useEffect(() => {
    if (!active) { setEeIn(false); setBlIdx(-1); setDr(12); return }
    const ee = setTimeout(() => setEeIn(true), 400)
    let b = -1
    const bi = setInterval(() => { b++; setBlIdx(b); if (b >= BACKLINKS.length) clearInterval(bi) }, 380)
    let d = 12
    const di = setInterval(() => { d = Math.min(48, d + 1); setDr(d); if (d >= 48) clearInterval(di) }, 80)
    return () => { clearTimeout(ee); clearInterval(bi); clearInterval(di) }
  }, [active])

  return (
    <div style={{ padding: '28px 26px 24px', height: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color, letterSpacing: '0.12em', marginBottom: 6 }}>STEP 03</div>
        <div style={{ fontSize: 21, fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>Content &<br />Link Building</div>
      </div>

      <div style={{ display: 'flex', gap: 16, flex: 1, minHeight: 0 }}>
        {/* Article visual */}
        <div style={{ flex: 1, background: 'rgba(255,255,255,0.02)', borderRadius: 14, border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ background: `${color}15`, borderBottom: `1px solid ${color}20`, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 11 }}>✍️</span>
            <span style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em' }}>NEW ARTICLE PUBLISHING</span>
          </div>
          <div style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {/* Title bar */}
            <motion.div initial={{ width: 0 }} animate={active ? { width: '100%' } : { width: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              style={{ height: 10, background: `${color}80`, borderRadius: 5 }} />
            {/* Body lines */}
            {[0.9, 1.0, 0.7, 0.85, 0.6].map((w, i) => (
              <motion.div key={i} initial={{ width: 0 }} animate={active ? { width: `${w * 100}%` } : { width: 0 }}
                transition={{ duration: 0.5, delay: 0.35 + i * 0.1 }}
                style={{ height: 6, background: 'rgba(255,255,255,0.12)', borderRadius: 3 }} />
            ))}
            {/* Sub-heading */}
            <motion.div initial={{ width: 0 }} animate={active ? { width: '60%' } : { width: 0 }} transition={{ duration: 0.4, delay: 0.9 }}
              style={{ height: 8, background: `${color}55`, borderRadius: 4, marginTop: 4 }} />
            {[0.95, 0.8, 0.7].map((w, i) => (
              <motion.div key={i} initial={{ width: 0 }} animate={active ? { width: `${w * 100}%` } : { width: 0 }}
                transition={{ duration: 0.4, delay: 1.0 + i * 0.09 }}
                style={{ height: 6, background: 'rgba(255,255,255,0.09)', borderRadius: 3 }} />
            ))}
          </div>
          {/* E-E-A-T badges */}
          <div style={{ padding: '8px 14px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {EEAT.map((tag, i) => (
              <motion.div key={tag} initial={{ opacity: 0, scale: 0.7 }} animate={eeIn ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
                style={{ fontSize: 9, fontFamily: 'var(--font-mono)', fontWeight: 700, padding: '3px 8px', borderRadius: 999, background: `${color}18`, color, border: `1px solid ${color}35` }}
              >{tag} ✓</motion.div>
            ))}
          </div>
        </div>

        {/* Backlinks + DR */}
        <div style={{ width: 196, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {/* DR meter */}
          <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 14, border: `1px solid ${color}25`, padding: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', marginBottom: 6 }}>DOMAIN RATING</div>
            <div style={{ fontSize: 38, fontWeight: 900, color, lineHeight: 1 }}>{dr}</div>
            <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)', marginTop: 3 }}>12 → {dr} ↑</div>
          </div>

          {/* Backlink list */}
          <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 14, border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden', flex: 1 }}>
            <div style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.35)', padding: '8px 10px', borderBottom: '1px solid rgba(255,255,255,0.05)', letterSpacing: '0.08em' }}>NEW BACKLINKS</div>
            <div style={{ padding: '6px 0' }}>
              {BACKLINKS.map((bl, i) => (
                <motion.div key={bl.domain} initial={{ opacity: 0, x: 12 }} animate={blIdx >= i ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
                  transition={{ duration: 0.25 }}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5px 10px', gap: 6 }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 9.5, color: '#fff', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{bl.domain}</div>
                    <div style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-mono)' }}>DA {bl.da} · {bl.type}</div>
                  </div>
                  <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color, fontWeight: 700, flexShrink: 0 }}>+1</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════
   SCENE 4 — Monitor & Scale
══════════════════════════════════════════════ */
const SERP_ROWS = [
  { kw: 'CCTV installation Melbourne',      pos: [18, 12, 5, 1] },
  { kw: 'security camera installation AU',   pos: [24, 15, 7, 2] },
  { kw: 'access control systems Melbourne', pos: [31, 20, 9, 3] },
  { kw: 'alarm monitoring Melbourne',       pos: [19, 11, 6, 2] },
]

const AI_PLATFORMS = [
  { name: 'ChatGPT', pct: 87, c: '#10a37f' },
  { name: 'Gemini',  pct: 74, c: '#4285f4' },
  { name: 'Perplexity', pct: 68, c: '#20b2aa' },
  { name: 'Claude',  pct: 61, c: '#d97706' },
]

const TRAFFIC_PTS = [12, 18, 24, 30, 42, 55, 72, 88, 100]

function Scene4({ active, color }: { active: boolean; color: string }) {
  const [phase, setPhase] = useState(0)
  const [leads, setLeads] = useState(0)

  useEffect(() => {
    if (!active) { setPhase(0); setLeads(0); return }
    const t1 = setTimeout(() => setPhase(1), 200)
    const t2 = setTimeout(() => setPhase(2), 800)
    const t3 = setTimeout(() => setPhase(3), 1200)
    let l = 0
    const li = setInterval(() => { l = Math.min(47, l + 1); setLeads(l); if (l >= 47) clearInterval(li) }, 60)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearInterval(li) }
  }, [active])

  const W = 260
  const H = 80
  const pts = TRAFFIC_PTS
  const maxV = Math.max(...pts)
  const polyline = pts.map((v, i) => `${(i / (pts.length - 1)) * W},${H - (v / maxV) * H}`).join(' ')
  const area = `${polyline} ${W},${H} 0,${H}`

  return (
    <div style={{ padding: '28px 26px 24px', height: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color, letterSpacing: '0.12em', marginBottom: 6 }}>STEP 04</div>
        <div style={{ fontSize: 21, fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>Monitor, Scale<br />&amp; AI Visibility</div>
      </div>

      <div style={{ display: 'flex', gap: 16, flex: 1, minHeight: 0 }}>
        {/* SERP ranking table */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0, background: 'rgba(255,255,255,0.02)', borderRadius: 14, border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
          <div style={{ padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: 9.5, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em' }}>SERP POSITIONS</div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            {SERP_ROWS.map((row, ri) => {
              const curPos = phase === 0 ? row.pos[0] : phase === 1 ? row.pos[1] : phase === 2 ? row.pos[2] : row.pos[3]
              const isOne = curPos === 1 || curPos <= 3
              return (
                <div key={row.kw} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <motion.div
                    animate={{ color: isOne ? color : '#fff', scale: isOne ? 1.1 : 1 }}
                    transition={{ duration: 0.4 }}
                    style={{ fontFamily: 'var(--font-mono)', fontWeight: 900, fontSize: 18, width: 28, textAlign: 'center', flexShrink: 0 }}
                  >#{curPos}</motion.div>
                  <div style={{ flex: 1, fontSize: 10, color: 'rgba(255,255,255,0.6)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.kw}</div>
                  {isOne && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      style={{ fontSize: 8.5, fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#fff', background: color, padding: '2px 7px', borderRadius: 999, flexShrink: 0 }}>
                      TOP {curPos}
                    </motion.div>
                  )}
                </div>
              )
            })}
          </div>
          {/* Traffic sparkline */}
          <div style={{ padding: '8px 12px 10px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.3)', marginBottom: 5 }}>ORGANIC TRAFFIC · +180%</div>
            <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 50, overflow: 'visible' }}>
              <defs>
                <linearGradient id="tg4" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                  <stop offset="100%" stopColor={color} stopOpacity="0" />
                </linearGradient>
                <clipPath id="chart4clip">
                  <motion.rect x="0" y="0" width={W} height={H}
                    initial={{ scaleX: 0 }} animate={phase >= 1 ? { scaleX: 1 } : { scaleX: 0 }}
                    style={{ transformOrigin: 'left center' }}
                    transition={{ duration: 1.2, ease: [0.22, 0.8, 0.2, 1] }} />
                </clipPath>
              </defs>
              <g clipPath="url(#chart4clip)">
                <polygon points={area} fill="url(#tg4)" />
                <polyline points={polyline} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            </svg>
          </div>
        </div>

        {/* Right: AI citations + leads */}
        <div style={{ width: 178, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {/* AI platforms */}
          <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 14, border: `1px solid ${color}25`, padding: '12px', flex: 1 }}>
            <div style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', marginBottom: 10 }}>AI CITATIONS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {AI_PLATFORMS.map((p, i) => (
                <div key={p.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                    <span style={{ fontSize: 10, fontWeight: 600, color: '#fff' }}>{p.name}</span>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={phase >= 2 ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ delay: i * 0.1 }}
                      style={{ fontSize: 9.5, color: p.c, fontFamily: 'var(--font-mono)', fontWeight: 700 }}
                    >{p.pct}%</motion.span>
                  </div>
                  <div style={{ height: 4, borderRadius: 999, background: 'rgba(255,255,255,0.07)', overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={phase >= 2 ? { width: `${p.pct}%` } : { width: 0 }}
                      transition={{ delay: 0.1 + i * 0.1, duration: 0.7, ease: [0.22, 0.8, 0.2, 1] }}
                      style={{ height: '100%', background: p.c, borderRadius: 999 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leads counter */}
          <div style={{ background: `${color}12`, borderRadius: 14, border: `1px solid ${color}30`, padding: '14px', textAlign: 'center' }}>
            <div style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', marginBottom: 6 }}>LEADS THIS MONTH</div>
            <div style={{ fontSize: 42, fontWeight: 900, color, lineHeight: 1 }}>{leads}</div>
            <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: `${color}bb`, marginTop: 4 }}>↑ 3.2× vs last month</div>
          </div>
        </div>
      </div>
    </div>
  )
}
