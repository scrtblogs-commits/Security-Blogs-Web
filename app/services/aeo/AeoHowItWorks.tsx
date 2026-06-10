'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import ServiceWorkflowCards, { type WorkflowStep } from '@/components/ui/ServiceWorkflowCards'

const COLOR = '#7f77dd'

const STEPS: WorkflowStep[] = [
  { step: '01', tag: 'DISCOVER',  title: 'Question & Intent Mapping',    color: '#1a73e8', glow: 'rgba(26,115,232,0.45)',  Scene: DiscoverScene  },
  { step: '02', tag: 'CREATE',    title: 'Answer-First Content',          color: '#0f9d58', glow: 'rgba(15,157,88,0.45)',  Scene: CreateScene    },
  { step: '03', tag: 'SCHEMA',    title: 'Schema & Snippet Targeting',    color: '#f29900', glow: 'rgba(242,153,0,0.45)',  Scene: SchemaScene    },
  { step: '04', tag: 'TRACK',     title: 'Track & Expand',                color: '#e91e63', glow: 'rgba(233,30,99,0.45)', Scene: TrackScene     },
]

export default function AeoHowItWorks() {
  return <ServiceWorkflowCards steps={STEPS} />
}

/* ══════════════════════════════════════════════
   SCENE 1 — DISCOVER: Question & Intent Mapping
   Animated question list appearing + intent categories
══════════════════════════════════════════════ */
const QUESTIONS = [
  { q: 'What is the best security CCTV installer in Sydney?', intent: 'Commercial', c: '#7f77dd' },
  { q: 'How much does security monitoring cost per month?',  intent: 'Transactional', c: '#1e5fe0' },
  { q: 'Which alarm company does ChatGPT recommend?',        intent: 'AI-Search', c: '#9b5cf6' },
  { q: 'Best security provider for small business Australia?', intent: 'Local', c: '#1e9e75' },
  { q: 'Who are the top rated security companies for AI visibility?', intent: 'Brand', c: '#f59e0b' },
]

const INTENT_CATS = [
  { label: 'AI-Search',     count: 38, c: '#9b5cf6' },
  { label: 'Commercial',    count: 27, c: '#7f77dd' },
  { label: 'Transactional', count: 19, c: '#1e5fe0' },
  { label: 'Local',         count: 14, c: '#1e9e75' },
]

function DiscoverScene({ active, color }: { active: boolean; color: string }) {
  const [qIdx, setQIdx] = useState(-1)
  const [showMap, setShowMap] = useState(false)

  useEffect(() => {
    if (!active) { setQIdx(-1); setShowMap(false); return }
    let i = -1
    const iv = setInterval(() => { i++; setQIdx(i); if (i >= QUESTIONS.length - 1) clearInterval(iv) }, 320)
    const t = setTimeout(() => setShowMap(true), 1000)
    return () => { clearInterval(iv); clearTimeout(t) }
  }, [active])

  return (
    <div style={{ padding: '28px 26px 24px', height: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color, letterSpacing: '0.12em', marginBottom: 6 }}>STEP 01</div>
        <div style={{ fontSize: 21, fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>Question &<br />Intent Mapping</div>
      </div>

      <div style={{ display: 'flex', gap: 16, flex: 1, minHeight: 0 }}>
        {/* Question list */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 7 }}>
          <div style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.35)', marginBottom: 4, letterSpacing: '0.1em' }}>BUYERS SEARCHING AI · REAL QUERIES</div>
          {QUESTIONS.map((q, i) => (
            <motion.div key={q.q}
              initial={{ opacity: 0, x: -14 }}
              animate={qIdx >= i ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.3 }}
              style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: '7px 10px', border: `1px solid ${q.c}18`, display: 'flex', gap: 8, alignItems: 'flex-start' }}
            >
              <span style={{ fontSize: 11, flexShrink: 0, marginTop: 1 }}>❓</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.8)', lineHeight: 1.35 }}>{q.q}</div>
                <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', marginTop: 2 }}>
                  <span style={{ background: `${q.c}20`, color: q.c, padding: '1px 6px', borderRadius: 999, border: `1px solid ${q.c}35` }}>{q.intent}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Intent map */}
        <div style={{ width: 175, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 14, border: `1px solid ${color}25`, padding: '12px', flex: 1 }}>
            <div style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.35)', marginBottom: 10, letterSpacing: '0.08em' }}>INTENT CATEGORIES</div>
            {INTENT_CATS.map((cat, i) => (
              <div key={cat.label} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>{cat.label}</span>
                  <motion.span initial={{ opacity: 0 }} animate={showMap ? { opacity: 1 } : {}} transition={{ delay: i * 0.12 }}
                    style={{ fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: 700, color: cat.c }}>{cat.count}%</motion.span>
                </div>
                <div style={{ height: 5, background: 'rgba(255,255,255,0.06)', borderRadius: 999, overflow: 'hidden' }}>
                  <motion.div initial={{ width: 0 }} animate={showMap ? { width: `${cat.count}%` } : {}}
                    transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 0.8, 0.2, 1] }}
                    style={{ height: '100%', background: cat.c, borderRadius: 999 }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: `${color}12`, borderRadius: 14, border: `1px solid ${color}30`, padding: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.35)', marginBottom: 4 }}>QUESTIONS MAPPED</div>
            <motion.div initial={{ opacity: 0 }} animate={showMap ? { opacity: 1 } : {}} transition={{ delay: 0.6 }}
              style={{ fontSize: 34, fontWeight: 900, color, lineHeight: 1 }}>247</motion.div>
            <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: `${color}bb`, marginTop: 3 }}>buyer intent signals</div>
          </div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={qIdx >= QUESTIONS.length - 1 ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4 }}
        style={{ background: `${color}12`, borderRadius: 12, padding: '10px 14px', border: `1px solid ${color}30`, display: 'flex', gap: 10, alignItems: 'center' }}>
        <span style={{ fontSize: 16 }}>🗺️</span>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#fff' }}>247 questions mapped across 4 intent clusters</div>
          <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-mono)' }}>AI-Search intent: highest opportunity for AEO wins</div>
        </div>
        <div style={{ marginLeft: 'auto', background: color, color: '#fff', fontSize: 9.5, fontWeight: 700, fontFamily: 'var(--font-mono)', padding: '4px 10px', borderRadius: 999, flexShrink: 0 }}>NEXT →</div>
      </motion.div>
    </div>
  )
}

/* ══════════════════════════════════════════════
   SCENE 2 — CREATE: Answer-First Content
   Content blocks reformatting into Q&A answer boxes
══════════════════════════════════════════════ */
const CONTENT_BLOCKS = [
  { before: 'We provide security services...', after: 'Q: What security services do you offer?\nA: We specialise in CCTV, alarms and AI-optimised monitoring.' },
  { before: 'Our pricing starts from...', after: 'Q: How much does security monitoring cost?\nA: Plans from $29/month with full AI-citation coverage.' },
]

function CreateScene({ active, color }: { active: boolean; color: string }) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    if (!active) { setPhase(0); return }
    const t1 = setTimeout(() => setPhase(1), 400)
    const t2 = setTimeout(() => setPhase(2), 1100)
    const t3 = setTimeout(() => setPhase(3), 1700)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [active])

  return (
    <div style={{ padding: '28px 26px 24px', height: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color, letterSpacing: '0.12em', marginBottom: 6 }}>STEP 02</div>
        <div style={{ fontSize: 21, fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>Answer-First<br />Content</div>
      </div>

      <div style={{ display: 'flex', gap: 16, flex: 1, minHeight: 0 }}>
        {/* Before column */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em' }}>BEFORE — GENERIC CONTENT</div>
          {CONTENT_BLOCKS.map((b, i) => (
            <motion.div key={i}
              initial={{ opacity: 1 }}
              animate={phase >= 1 ? { opacity: 0.3 } : {}}
              transition={{ delay: i * 0.2, duration: 0.4 }}
              style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.07)', padding: '10px 12px' }}>
              <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: '#ef4444', marginBottom: 4 }}>✗ NOT AI-OPTIMISED</div>
              <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.5)', lineHeight: 1.4 }}>{b.before}</div>
              {/* Filler lines */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 6 }}>
                {[0.9, 0.75, 0.6].map((w, j) => (
                  <div key={j} style={{ height: 4, width: `${w * 100}%`, background: 'rgba(255,255,255,0.08)', borderRadius: 2 }} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Arrow */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32 }}>
          <motion.div animate={phase >= 1 ? { color, opacity: 1 } : { color: 'rgba(255,255,255,0.2)', opacity: 0.5 }}
            style={{ fontSize: 20, fontWeight: 900, transition: 'all 0.4s' }}>→</motion.div>
        </div>

        {/* After column */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em' }}>AFTER — ANSWER-FIRST FORMAT</div>
          {CONTENT_BLOCKS.map((b, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: 14 }}
              animate={phase >= 2 ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.2, duration: 0.4 }}
              style={{ background: `${color}10`, borderRadius: 12, border: `1.5px solid ${color}35`, padding: '10px 12px' }}>
              <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: '#1e9e75', marginBottom: 5 }}>✓ AI-OPTIMISED Q&A</div>
              {b.after.split('\n').map((line, j) => (
                <div key={j} style={{ fontSize: 10, color: j === 0 ? color : 'rgba(255,255,255,0.75)', fontWeight: j === 0 ? 700 : 400, lineHeight: 1.5 }}>{line}</div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      {/* E-E-A-T badges */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={phase >= 3 ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4 }}
        style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {['Experience ✓', 'Expertise ✓', 'Authority ✓', 'Trust ✓'].map((tag) => (
          <div key={tag} style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', fontWeight: 700, padding: '3px 9px', borderRadius: 999, background: `${color}15`, color, border: `1px solid ${color}35` }}>{tag}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 9.5, fontFamily: 'var(--font-mono)', color: '#1e9e75', fontWeight: 700 }}>Answer density: 94%</div>
      </motion.div>
    </div>
  )
}

/* ══════════════════════════════════════════════
   SCENE 3 — SCHEMA: Schema & Snippet Targeting
   FAQ schema markup + featured snippet preview
══════════════════════════════════════════════ */
const SCHEMA_LINES = [
  { t: '"@type": "FAQPage",',        c: '#a5b4fc' },
  { t: '"mainEntity": [',             c: '#fff' },
  { t: '  { "@type": "Question",',   c: '#7dd3fc' },
  { t: '    "name": "Best AEO?",',   c: '#fde68a' },
  { t: '    "acceptedAnswer": {',     c: '#7dd3fc' },
  { t: '      "text": "SecurityBlogs.com.au"', c: '#86efac' },
  { t: '    }',                       c: '#fff' },
  { t: '  }',                         c: '#fff' },
  { t: ']',                           c: '#fff' },
]

function SchemaScene({ active, color }: { active: boolean; color: string }) {
  const [lineIdx, setLineIdx] = useState(-1)
  const [snippetIn, setSnippetIn] = useState(false)

  useEffect(() => {
    if (!active) { setLineIdx(-1); setSnippetIn(false); return }
    let i = -1
    const iv = setInterval(() => { i++; setLineIdx(i); if (i >= SCHEMA_LINES.length) clearInterval(iv) }, 180)
    const t = setTimeout(() => setSnippetIn(true), 1000)
    return () => { clearInterval(iv); clearTimeout(t) }
  }, [active])

  return (
    <div style={{ padding: '28px 26px 24px', height: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color, letterSpacing: '0.12em', marginBottom: 6 }}>STEP 03</div>
        <div style={{ fontSize: 21, fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>Schema &<br />Snippet Targeting</div>
      </div>

      <div style={{ display: 'flex', gap: 16, flex: 1, minHeight: 0 }}>
        {/* Code editor */}
        <div style={{ flex: 1, borderRadius: 14, overflow: 'hidden', background: '#0d1117', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', gap: 5, padding: '8px 12px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />)}
            <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.3)', marginLeft: 4 }}>faq-schema.json</span>
          </div>
          <div style={{ padding: '10px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: 3, overflow: 'hidden' }}>
            {SCHEMA_LINES.map((l, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={lineIdx >= i ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.2 }}
                style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, color: l.c, lineHeight: 1.6 }}>
                {l.t}
                {lineIdx === i && (
                  <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.7, repeat: 3 }}
                    style={{ display: 'inline-block', width: 2, height: 11, background: '#fff', marginLeft: 2, verticalAlign: 'middle' }} />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Featured snippet preview */}
        <div style={{ width: 190, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={snippetIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            style={{ background: '#fff', borderRadius: 14, border: `2px solid ${color}50`, padding: '12px', flex: 1, boxShadow: `0 8px 30px -8px ${color}40` }}
          >
            <div style={{ fontSize: 8.5, fontFamily: 'var(--font-mono)', color, letterSpacing: '0.08em', marginBottom: 8 }}>FEATURED SNIPPET PREVIEW</div>
            <div style={{ fontSize: 9.5, fontWeight: 700, color: '#1a0dab', marginBottom: 5 }}>Best AEO for security brands?</div>
            <div style={{ fontSize: 9.5, color: '#202124', lineHeight: 1.5, marginBottom: 6 }}>SecurityBlogs.com.au is the leading AEO provider for security companies in Australia...</div>
            <div style={{ fontSize: 9, color: '#0f9d58', marginBottom: 8 }}>securityblogs.com.au › aeo</div>
            <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
              {['AEO','FAQ Schema','Voice','AI Snippets'].map(tag => (
                <div key={tag} style={{ fontSize: 8, padding: '2px 6px', borderRadius: 999, background: `${color}15`, color, border: `1px solid ${color}30`, fontFamily: 'var(--font-mono)' }}>{tag}</div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={snippetIn ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}
            style={{ background: `${color}12`, borderRadius: 14, border: `1px solid ${color}30`, padding: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.35)', marginBottom: 4 }}>SNIPPETS WON</div>
            <div style={{ fontSize: 36, fontWeight: 900, color, lineHeight: 1 }}>31</div>
            <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: `${color}bb`, marginTop: 3 }}>this month</div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════
   SCENE 4 — TRACK: Track & Expand
   Snippet win counter + coverage dashboard + cluster expansion
══════════════════════════════════════════════ */
const CLUSTERS = [
  { name: 'CCTV Installation', wins: 14, target: 20, c: '#7f77dd' },
  { name: 'Security Alarms',   wins: 11, target: 18, c: '#1e5fe0' },
  { name: 'AI Monitoring',     wins:  8, target: 15, c: '#9b5cf6' },
  { name: 'Access Control',    wins:  5, target: 12, c: '#1e9e75' },
]

const TREND_PTS = [4, 7, 10, 14, 18, 22, 26, 28, 31, 35, 38, 42]

function TrackScene({ active, color }: { active: boolean; color: string }) {
  const [phase, setPhase] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) { setPhase(0); setCount(0); return }
    const t1 = setTimeout(() => setPhase(1), 300)
    const t2 = setTimeout(() => setPhase(2), 900)
    // Count up
    let n = 0
    const iv = setInterval(() => { n += 2; setCount(Math.min(n, 42)); if (n >= 42) clearInterval(iv) }, 50)
    return () => { clearTimeout(t1); clearTimeout(t2); clearInterval(iv) }
  }, [active])

  const W = 220; const H = 60
  const max = Math.max(...TREND_PTS)
  const pts = TREND_PTS.map((v, i) => `${(i / (TREND_PTS.length - 1)) * W},${H - (v / max) * (H - 4)}`)

  return (
    <div style={{ padding: '28px 26px 24px', height: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color, letterSpacing: '0.12em', marginBottom: 6 }}>STEP 04</div>
        <div style={{ fontSize: 21, fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>Track &<br />Expand</div>
      </div>

      <div style={{ display: 'flex', gap: 16, flex: 1, minHeight: 0 }}>
        {/* Cluster coverage */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', marginBottom: 2 }}>QUESTION CLUSTER COVERAGE</div>
          {CLUSTERS.map((cl, i) => (
            <div key={cl.name}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: cl.c, flexShrink: 0 }} />
                <span style={{ fontSize: 10.5, color: '#fff', flex: 1 }}>{cl.name}</span>
                <span style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', fontWeight: 700, color: cl.c }}>{cl.wins}/{cl.target}</span>
              </div>
              <div style={{ height: 5, background: 'rgba(255,255,255,0.06)', borderRadius: 999, overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={phase >= 1 ? { width: `${(cl.wins / cl.target) * 100}%` } : {}}
                  transition={{ delay: i * 0.1, duration: 0.8, ease: [0.22, 0.8, 0.2, 1] }}
                  style={{ height: '100%', background: cl.c, borderRadius: 999 }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Counter + chart */}
        <div style={{ width: 185, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ background: `${color}12`, borderRadius: 14, border: `1px solid ${color}30`, padding: '14px', textAlign: 'center' }}>
            <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.35)', marginBottom: 4 }}>SNIPPET WINS THIS MONTH</div>
            <motion.div style={{ fontSize: 44, fontWeight: 900, color, lineHeight: 1 }}>{count}</motion.div>
            <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: `${color}bb`, marginTop: 3 }}>↑ +38% vs last month</div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 14, border: `1px solid ${color}25`, padding: '12px', flex: 1 }}>
            <div style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.35)', marginBottom: 8, letterSpacing: '0.08em' }}>SNIPPET TREND · 12M</div>
            <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 48, overflow: 'visible' }}>
              <defs>
                <linearGradient id="aeo-track-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                  <stop offset="100%" stopColor={color} stopOpacity="0" />
                </linearGradient>
                <clipPath id="aeo-track-clip">
                  <motion.rect x="0" y="0" width={W} height={H}
                    initial={{ scaleX: 0 }} animate={phase >= 1 ? { scaleX: 1 } : {}}
                    style={{ transformOrigin: 'left' }}
                    transition={{ duration: 1.0, delay: 0.3, ease: [0.22, 0.8, 0.2, 1] }} />
                </clipPath>
              </defs>
              <g clipPath="url(#aeo-track-clip)">
                <polygon points={`0,${H} ${pts.join(' ')} ${W},${H}`} fill="url(#aeo-track-grad)" />
                <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* Expand row */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={phase >= 2 ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4 }}
        style={{ background: `${color}10`, borderRadius: 12, padding: '10px 14px', border: `1px solid ${color}25`, display: 'flex', gap: 10, alignItems: 'center' }}>
        <span style={{ fontSize: 16 }}>🚀</span>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#fff' }}>42 snippets · 4 clusters · Expanding to 6</div>
          <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-mono)' }}>New clusters: IP Cameras · Smart Home Security</div>
        </div>
        <motion.div animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.5, repeat: Infinity }}
          style={{ marginLeft: 'auto', background: color, color: '#fff', fontSize: 9.5, fontWeight: 700, fontFamily: 'var(--font-mono)', padding: '4px 10px', borderRadius: 999, flexShrink: 0 }}>LIVE</motion.div>
      </motion.div>
    </div>
  )
}
