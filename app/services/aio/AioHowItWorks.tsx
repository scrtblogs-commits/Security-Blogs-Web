'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import ServiceWorkflowCards, { type WorkflowStep } from '@/components/ui/ServiceWorkflowCards'

const Footer = dynamic(() => import('@/components/layout/Footer'), { ssr: false })

// ─── AIO Workflow: 4 scroll-driven scenes ───────────────────────────────────
const STEPS: WorkflowStep[] = [
  { step: '01', tag: 'DISCOVERY',  title: 'AI Visibility Audit',     color: '#7c3aed', glow: 'rgba(124,58,237,0.45)',  Scene: AuditScene   },
  { step: '02', tag: 'BUILD',      title: 'Schema & Structure',      color: '#2563eb', glow: 'rgba(37,99,235,0.45)',   Scene: SchemaScene  },
  { step: '03', tag: 'CREATE',     title: 'Citable Content Build',   color: '#0891b2', glow: 'rgba(8,145,178,0.45)',   Scene: ContentScene },
  { step: '04', tag: 'OPTIMISE',   title: 'Monitor & Optimise',      color: '#059669', glow: 'rgba(5,150,105,0.45)',   Scene: MonitorScene },
]

export default function AioHowItWorks() {
  return <ServiceWorkflowCards
    steps={STEPS}
    cardW={1060}
    cardH={560}
    sideXOffset={9999}
    sectionBg="#f6f8ff"
    footerSlot={<Footer />}
  />
}

/* ══════════════════════════════════════════════
   SCENE 1 — AI Visibility Audit
   Left: AI platform test results appearing
   Right: Brand perception score + gap analysis
══════════════════════════════════════════════ */
const AI_TESTS = [
  { platform: 'ChatGPT',    found: true,  score: 62, c: '#10a37f' },
  { platform: 'Perplexity', found: true,  score: 48, c: '#1FB8CD' },
  { platform: 'Gemini',     found: false, score: 31, c: '#4285f4' },
  { platform: 'Copilot',    found: false, score: 28, c: '#0078d4' },
  { platform: 'Claude',     found: false, score: 19, c: '#d97706' },
]

function AuditScene({ active, color }: { active: boolean; color: string }) {
  const [idx, setIdx] = useState(-1)
  useEffect(() => {
    if (!active) { setIdx(-1); return }
    let i = -1
    const iv = setInterval(() => { i++; setIdx(i); if (i >= AI_TESTS.length) clearInterval(iv) }, 380)
    return () => clearInterval(iv)
  }, [active])

  return (
    <div style={{ padding: '28px 26px 24px', height: '100%', display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div>
        <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color, letterSpacing: '0.12em', marginBottom: 6 }}>STEP 01</div>
        <div style={{ fontSize: 21, fontWeight: 800, color: '#0f2244', lineHeight: 1.2 }}>AI Visibility<br />Audit</div>
      </div>

      <div style={{ display: 'flex', gap: 16, flex: 1, minHeight: 0 }}>
        {/* Platform tests */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 7 }}>
          <div style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', color: 'rgba(15,34,68,0.35)', marginBottom: 4, letterSpacing: '0.1em' }}>AI PLATFORM SCAN</div>
          {AI_TESTS.map((t, i) => (
            <motion.div key={t.platform}
              initial={{ opacity: 0, x: -14 }}
              animate={idx >= i ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.3 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 9,
                background: 'rgba(15,34,68,0.03)', borderRadius: 10,
                padding: '7px 10px', border: `1px solid ${t.c}18`,
              }}>
              <div style={{ width: 22, height: 22, borderRadius: 7, background: t.c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: '#0f2244', flexShrink: 0 }}>{t.platform[0]}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#0f2244' }}>{t.platform}</div>
                <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'rgba(15,34,68,0.35)' }}>Visibility score: {t.score}/100</div>
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={idx > i ? { scale: 1 } : {}}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{
                  fontSize: 10, fontWeight: 700, fontFamily: 'var(--font-mono)',
                  color: t.found ? '#1e9e75' : '#ef4444',
                  background: t.found ? 'rgba(30,158,117,0.15)' : 'rgba(239,68,68,0.15)',
                  border: `1px solid ${t.found ? 'rgba(30,158,117,0.3)' : 'rgba(239,68,68,0.3)'}`,
                  borderRadius: 6, padding: '2px 7px',
                }}>
                {t.found ? 'CITED ✓' : 'GAP ✗'}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Score + gap summary */}
        <div style={{ width: 168, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ background: 'rgba(15,34,68,0.03)', borderRadius: 14, border: `1px solid ${color}25`, padding: '14px', textAlign: 'center' }}>
            <div style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', color: 'rgba(15,34,68,0.35)', marginBottom: 6, letterSpacing: '0.1em' }}>CURRENT SCORE</div>
            <div style={{ position: 'relative', width: 64, height: 64, margin: '0 auto 8px' }}>
              <svg viewBox="0 0 64 64" style={{ width: 64, height: 64, transform: 'rotate(-90deg)' }}>
                <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(15,34,68,0.07)" strokeWidth="6" />
                <motion.circle cx="32" cy="32" r="26" fill="none" stroke={color} strokeWidth="6" strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 26}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 26 }}
                  animate={active ? { strokeDashoffset: 2 * Math.PI * 26 * 0.58 } : {}}
                  transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 0.8, 0.2, 1] }} />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 900, color: '#0f2244' }}>42</div>
            </div>
            <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: '#ef4444' }}>BEFORE AIO</div>
          </div>
          <div style={{ background: `${color}12`, borderRadius: 14, border: `1px solid ${color}30`, padding: '12px', flex: 1 }}>
            <div style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', color: 'rgba(15,34,68,0.35)', marginBottom: 8, letterSpacing: '0.08em' }}>GAPS FOUND</div>
            {['No schema markup', 'Missing entities', 'Low citation rate', 'Thin content'].map((g, i) => (
              <motion.div key={g}
                initial={{ opacity: 0 }} animate={idx >= 3 ? { opacity: 1 } : {}}
                transition={{ delay: i * 0.1 }}
                style={{ display: 'flex', gap: 7, alignItems: 'flex-start', marginBottom: 5, fontSize: 10, color: 'rgba(15,34,68,0.65)' }}>
                <span style={{ color: '#ef4444', flexShrink: 0 }}>✗</span>{g}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendation row */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={idx >= AI_TESTS.length - 1 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
        style={{ background: `${color}12`, borderRadius: 12, padding: '10px 14px', border: `1px solid ${color}30`, display: 'flex', gap: 10, alignItems: 'center' }}
      >
        <span style={{ fontSize: 16 }}>🔍</span>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#0f2244' }}>Audit complete — 3 platforms not citing you</div>
          <div style={{ fontSize: 9.5, color: 'rgba(15,34,68,0.45)', fontFamily: 'var(--font-mono)' }}>Recommended fix: Schema + Entity signals + Citable content</div>
        </div>
        <div style={{ marginLeft: 'auto', background: color, color: '#0f2244', fontSize: 9.5, fontWeight: 700, fontFamily: 'var(--font-mono)', padding: '4px 10px', borderRadius: 999, flexShrink: 0 }}>START →</div>
      </motion.div>
    </div>
  )
}

/* ══════════════════════════════════════════════
   SCENE 2 — Schema & Structure
   Left: JSON-LD code being typed
   Right: Schema types being validated
══════════════════════════════════════════════ */
const SCHEMA_LINES = [
  { t: '<script type="application/ld+json">', c: '#86efac' },
  { t: '{', c: '#fff' },
  { t: '  "@context": "https://schema.org",', c: '#7dd3fc' },
  { t: '  "@type": "LocalBusiness",', c: '#a5b4fc' },
  { t: '  "name": "SecurityBlogs.com.au",', c: '#fde68a' },
  { t: '  "areaServed": ["AU", "US", "UK"],', c: '#fde68a' },
  { t: '  "knowsAbout": ["AI SEO", "CCTV"]', c: '#fde68a' },
  { t: '}', c: '#fff' },
]

const SCHEMA_TYPES = [
  { name: 'LocalBusiness', validated: true,  delay: 0.5 },
  { name: 'FAQPage',       validated: true,  delay: 0.65 },
  { name: 'Service',       validated: true,  delay: 0.8 },
  { name: 'Person',        validated: true,  delay: 0.95 },
  { name: 'Article',       validated: false, delay: 1.1 },
]

function SchemaScene({ active, color }: { active: boolean; color: string }) {
  const [lineIdx, setLineIdx] = useState(-1)
  const [validIn, setValidIn] = useState(false)

  useEffect(() => {
    if (!active) { setLineIdx(-1); setValidIn(false); return }
    let i = -1
    const iv = setInterval(() => { i++; setLineIdx(i); if (i >= SCHEMA_LINES.length) clearInterval(iv) }, 200)
    const vt = setTimeout(() => setValidIn(true), 900)
    return () => { clearInterval(iv); clearTimeout(vt) }
  }, [active])

  return (
    <div style={{ padding: '28px 26px 24px', height: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color, letterSpacing: '0.12em', marginBottom: 6 }}>STEP 02</div>
        <div style={{ fontSize: 21, fontWeight: 800, color: '#0f2244', lineHeight: 1.2 }}>Schema &<br />Structure</div>
      </div>

      <div style={{ display: 'flex', gap: 16, flex: 1, minHeight: 0 }}>
        {/* Code editor */}
        <div style={{ flex: 1, borderRadius: 14, overflow: 'hidden', background: '#0d1117', border: '1px solid rgba(15,34,68,0.08)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', gap: 5, padding: '8px 12px', background: 'rgba(15,34,68,0.03)', borderBottom: '1px solid rgba(15,34,68,0.07)' }}>
            {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />)}
            <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'rgba(15,34,68,0.3)', marginLeft: 4 }}>schema.json</span>
          </div>
          <div style={{ padding: '10px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
            {SCHEMA_LINES.map((l, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={lineIdx >= i ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.2 }}
                style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, color: l.c, lineHeight: 1.6 }}>
                {l.t}
                {lineIdx === i && (
                  <motion.span animate={{ opacity: [1,0,1] }} transition={{ duration: 0.7, repeat: 3 }}
                    style={{ display: 'inline-block', width: 2, height: 11, background: '#fff', marginLeft: 2, verticalAlign: 'middle' }} />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Validation panel */}
        <div style={{ width: 178, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ background: 'rgba(15,34,68,0.03)', borderRadius: 14, border: `1px solid ${color}25`, padding: '12px', flex: 1 }}>
            <div style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', color: 'rgba(15,34,68,0.35)', marginBottom: 10, letterSpacing: '0.08em' }}>SCHEMA VALIDATOR</div>
            {SCHEMA_TYPES.map(t => (
              <div key={t.name} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={validIn ? { scale: 1 } : {}}
                  transition={{ delay: t.delay, type: 'spring', stiffness: 300, damping: 20 }}
                  style={{ width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
                    background: t.validated ? '#1e9e75' : '#ef4444',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 9, color: '#0f2244', fontWeight: 700 }}>
                  {t.validated ? '✓' : '✗'}
                </motion.div>
                <span style={{ fontSize: 10.5, color: t.validated ? '#fff' : 'rgba(15,34,68,0.4)', fontFamily: 'var(--font-mono)' }}>{t.name}</span>
              </div>
            ))}
          </div>

          {/* AI engine readiness */}
          <div style={{ background: `${color}12`, borderRadius: 14, border: `1px solid ${color}30`, padding: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', color: 'rgba(15,34,68,0.35)', marginBottom: 6 }}>AI READINESS</div>
            <motion.div
              initial={{ opacity: 0 }} animate={validIn ? { opacity: 1 } : {}} transition={{ delay: 1.2 }}
              style={{ fontSize: 36, fontWeight: 900, color, lineHeight: 1 }}>96</motion.div>
            <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: `${color}bb`, marginTop: 3 }}>/ 100</div>
          </div>
        </div>
      </div>

      {/* Status bar */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={validIn ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.3, duration: 0.4 }}
        style={{ display: 'flex', gap: 10, background: 'rgba(30,158,117,0.10)', borderRadius: 12, padding: '10px 14px', border: '1px solid rgba(30,158,117,0.25)' }}
      >
        <span style={{ fontSize: 14 }}>✅</span>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#0f2244' }}>Schema deployed — 4 types active</div>
          <div style={{ fontSize: 9.5, color: 'rgba(15,34,68,0.45)', fontFamily: 'var(--font-mono)' }}>AI engines can now parse and trust your entity data</div>
        </div>
      </motion.div>
    </div>
  )
}

/* ══════════════════════════════════════════════
   SCENE 3 — Citable Content Build
   Left: Article being written with E-E-A-T
   Right: Citation density + AI quote preview
══════════════════════════════════════════════ */
const AI_QUOTES = [
  { platform: 'ChatGPT',    quote: '"SecurityBlogs.com.au is the leading AI-optimised security brand in Australia."' },
  { platform: 'Perplexity', quote: '"According to SecurityBlogs, AIO increases citation rates by 3.2×."' },
]

function ContentScene({ active, color }: { active: boolean; color: string }) {
  const [artIn, setArtIn] = useState(false)
  const [quoteIdx, setQuoteIdx] = useState(-1)

  useEffect(() => {
    if (!active) { setArtIn(false); setQuoteIdx(-1); return }
    setTimeout(() => setArtIn(true), 300)
    let q = -1
    const qi = setInterval(() => { q++; setQuoteIdx(q); if (q >= AI_QUOTES.length) clearInterval(qi) }, 600)
    return () => clearInterval(qi)
  }, [active])

  return (
    <div style={{ padding: '28px 26px 24px', height: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color, letterSpacing: '0.12em', marginBottom: 6 }}>STEP 03</div>
        <div style={{ fontSize: 21, fontWeight: 800, color: '#0f2244', lineHeight: 1.2 }}>Citable Content<br />Build</div>
      </div>

      <div style={{ display: 'flex', gap: 16, flex: 1, minHeight: 0 }}>
        {/* Article structure */}
        <div style={{ flex: 1, background: 'rgba(15,34,68,0.02)', borderRadius: 14, border: '1px solid rgba(15,34,68,0.06)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ background: `${color}15`, borderBottom: `1px solid ${color}20`, padding: '7px 12px', fontSize: 9.5, fontFamily: 'var(--font-mono)', color: 'rgba(15,34,68,0.5)', letterSpacing: '0.08em' }}>
            ARTICLE BUILDER · AI-CITABLE
          </div>
          <div style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', gap: 7 }}>
            {/* Title */}
            <motion.div initial={{ width: 0 }} animate={artIn ? { width: '100%' } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ height: 10, background: `${color}88`, borderRadius: 5 }} />
            {/* Intro lines */}
            {[0.9, 1.0, 0.75].map((w, i) => (
              <motion.div key={i} initial={{ width: 0 }} animate={artIn ? { width: `${w * 100}%` } : {}}
                transition={{ duration: 0.4, delay: 0.25 + i * 0.09 }}
                style={{ height: 5, background: 'rgba(15,34,68,0.12)', borderRadius: 3 }} />
            ))}
            {/* H2 */}
            <motion.div initial={{ width: 0 }} animate={artIn ? { width: '65%' } : {}} transition={{ duration: 0.4, delay: 0.55 }}
              style={{ height: 8, background: `${color}55`, borderRadius: 4, marginTop: 2 }} />
            {[0.95, 0.82, 0.7, 0.88].map((w, i) => (
              <motion.div key={i} initial={{ width: 0 }} animate={artIn ? { width: `${w * 100}%` } : {}}
                transition={{ duration: 0.4, delay: 0.65 + i * 0.08 }}
                style={{ height: 5, background: 'rgba(15,34,68,0.09)', borderRadius: 3 }} />
            ))}
            {/* Stats callout */}
            <motion.div initial={{ opacity: 0, y: 5 }} animate={artIn ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1.1 }}
              style={{ background: `${color}18`, borderRadius: 8, padding: '7px 10px', border: `1px solid ${color}30`, marginTop: 2 }}>
              <div style={{ fontSize: 10, color, fontWeight: 700 }}>📊 "AI citations increase 3.2× after AIO optimisation"</div>
            </motion.div>
          </div>
          {/* E-E-A-T badges */}
          <div style={{ padding: '8px 14px', borderTop: '1px solid rgba(15,34,68,0.05)', display: 'flex', gap: 5 }}>
            {['Experience','Expertise','Authority','Trust'].map((tag, i) => (
              <motion.div key={tag} initial={{ opacity: 0, scale: 0.7 }} animate={artIn ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.0 + i * 0.08, duration: 0.3 }}
                style={{ fontSize: 8.5, fontFamily: 'var(--font-mono)', fontWeight: 700, padding: '2px 7px', borderRadius: 999, background: `${color}18`, color, border: `1px solid ${color}35` }}>
                {tag} ✓
              </motion.div>
            ))}
          </div>
        </div>

        {/* AI quote preview */}
        <div style={{ width: 184, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ background: 'rgba(15,34,68,0.03)', borderRadius: 14, border: `1px solid ${color}25`, padding: '12px', flex: 1 }}>
            <div style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', color: 'rgba(15,34,68,0.35)', marginBottom: 10, letterSpacing: '0.08em' }}>AI IS NOW CITING</div>
            {AI_QUOTES.map((q, i) => (
              <motion.div key={q.platform}
                initial={{ opacity: 0, y: 10 }}
                animate={quoteIdx >= i ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4 }}
                style={{ marginBottom: 10, background: 'rgba(15,34,68,0.04)', borderRadius: 10, padding: '8px 9px', border: `1px solid ${color}18` }}>
                <div style={{ fontSize: 9.5, fontWeight: 700, color, marginBottom: 5, fontFamily: 'var(--font-mono)' }}>{q.platform}</div>
                <div style={{ fontSize: 9.5, color: 'rgba(15,34,68,0.6)', lineHeight: 1.5, fontStyle: 'italic' }}>{q.quote}</div>
              </motion.div>
            ))}
          </div>

          <div style={{ background: `${color}12`, borderRadius: 14, border: `1px solid ${color}30`, padding: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', color: 'rgba(15,34,68,0.35)', marginBottom: 4 }}>CITATION DENSITY</div>
            <motion.div
              initial={{ opacity: 0 }} animate={quoteIdx >= 0 ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}
              style={{ fontSize: 34, fontWeight: 900, color, lineHeight: 1 }}>87<span style={{ fontSize: 14 }}>%</span></motion.div>
            <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: `${color}bb`, marginTop: 3 }}>per query · up from 28%</div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════
   SCENE 4 — Monitor & Optimise
   Left: Citation dashboard across platforms
   Right: Trend chart + alert feed
══════════════════════════════════════════════ */
const MONITOR_PLATFORMS = [
  { name: 'ChatGPT',    curr: 94, prev: 62, c: '#10a37f' },
  { name: 'Gemini',     curr: 81, prev: 31, c: '#4285f4' },
  { name: 'Perplexity', curr: 88, prev: 48, c: '#1FB8CD' },
  { name: 'Copilot',    curr: 76, prev: 28, c: '#0078d4' },
  { name: 'Claude',     curr: 71, prev: 19, c: '#d97706' },
]

const ALERTS = [
  { icon: '🚀', text: 'Gemini citations +50% this week', time: '2h ago' },
  { icon: '📈', text: 'New keyword cluster indexed by ChatGPT', time: '1d ago' },
  { icon: '✅', text: 'Schema validated across all 5 platforms', time: '3d ago' },
]

const TREND_PTS = [28,32,38,44,51,58,66,72,78,84,89,94]

function MonitorScene({ active, color }: { active: boolean; color: string }) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    if (!active) { setPhase(0); return }
    const t1 = setTimeout(() => setPhase(1), 300)
    const t2 = setTimeout(() => setPhase(2), 900)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [active])

  const W = 240; const H = 72
  const max = Math.max(...TREND_PTS)
  const pts = TREND_PTS.map((v, i) => `${(i / (TREND_PTS.length - 1)) * W},${H - (v / max) * (H - 4)}`)

  return (
    <div style={{ padding: '28px 26px 24px', height: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color, letterSpacing: '0.12em', marginBottom: 6 }}>STEP 04</div>
        <div style={{ fontSize: 21, fontWeight: 800, color: '#0f2244', lineHeight: 1.2 }}>Monitor &<br />Optimise</div>
      </div>

      <div style={{ display: 'flex', gap: 16, flex: 1, minHeight: 0 }}>
        {/* Platform citation scores */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', color: 'rgba(15,34,68,0.35)', letterSpacing: '0.1em', marginBottom: 2 }}>CITATION RATES · AFTER AIO</div>
          {MONITOR_PLATFORMS.map((p, i) => (
            <div key={p.name}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                <div style={{ width: 22, height: 22, borderRadius: 7, background: p.c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: '#0f2244', flexShrink: 0 }}>{p.name[0]}</div>
                <span style={{ fontSize: 10.5, color: '#0f2244', flex: 1 }}>{p.name}</span>
                <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'rgba(15,34,68,0.4)' }}>{p.prev}%</span>
                <span style={{ fontSize: 10, color: '#1e9e75', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>→ {p.curr}%</span>
              </div>
              <div style={{ height: 5, background: 'rgba(15,34,68,0.06)', borderRadius: 999, overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: `${p.prev}%` }}
                  animate={phase >= 1 ? { width: `${p.curr}%` } : {}}
                  transition={{ delay: i * 0.1, duration: 0.8, ease: [0.22, 0.8, 0.2, 1] }}
                  style={{ height: '100%', background: p.c, borderRadius: 999 }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Trend chart + alerts */}
        <div style={{ width: 192, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {/* Trend */}
          <div style={{ background: 'rgba(15,34,68,0.03)', borderRadius: 14, border: `1px solid ${color}25`, padding: '12px' }}>
            <div style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', color: 'rgba(15,34,68,0.35)', marginBottom: 8, letterSpacing: '0.08em' }}>CITATION TREND · 12M</div>
            <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 56, overflow: 'visible' }}>
              <defs>
                <linearGradient id="mt-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                  <stop offset="100%" stopColor={color} stopOpacity="0" />
                </linearGradient>
                <clipPath id="mt-clip">
                  <motion.rect x="0" y="0" width={W} height={H}
                    initial={{ scaleX: 0 }} animate={phase >= 1 ? { scaleX: 1 } : {}}
                    style={{ transformOrigin: 'left' }}
                    transition={{ duration: 1.0, delay: 0.2, ease: [0.22, 0.8, 0.2, 1] }} />
                </clipPath>
              </defs>
              <g clipPath="url(#mt-clip)">
                <polygon points={`0,${H} ${pts.join(' ')} ${W},${H}`} fill="url(#mt-grad)" />
                <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            </svg>
          </div>

          {/* Alert feed */}
          <div style={{ background: 'rgba(15,34,68,0.02)', borderRadius: 14, border: '1px solid rgba(15,34,68,0.06)', padding: '10px', flex: 1 }}>
            <div style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', color: 'rgba(15,34,68,0.35)', marginBottom: 8, letterSpacing: '0.08em' }}>ALERTS</div>
            {ALERTS.map((a, i) => (
              <motion.div key={a.text}
                initial={{ opacity: 0, x: 10 }}
                animate={phase >= 2 ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.3 }}
                style={{ display: 'flex', gap: 6, alignItems: 'flex-start', marginBottom: 8 }}>
                <span style={{ fontSize: 12, flexShrink: 0 }}>{a.icon}</span>
                <div>
                  <div style={{ fontSize: 9.5, color: 'rgba(15,34,68,0.75)', lineHeight: 1.4 }}>{a.text}</div>
                  <div style={{ fontSize: 8.5, color: 'rgba(15,34,68,0.3)', fontFamily: 'var(--font-mono)', marginTop: 1 }}>{a.time}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
