'use client'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const ACCENT = '#7f77dd'

const CARDS = [
  {
    icon: '🎯',
    title: 'Answer Optimisation',
    desc: 'Content structured as clear, authoritative answers AI engines can lift and present verbatim.',
    color: '#7f77dd',
    glow: 'rgba(127,119,221,0.3)',
  },
  {
    icon: '⭐',
    title: 'Featured Snippets',
    desc: 'Format and target the question-led queries that win position-zero snippets on Google.',
    color: '#1e5fe0',
    glow: 'rgba(30,95,224,0.3)',
  },
  {
    icon: '❓',
    title: 'FAQ Schema',
    desc: 'Marked-up Q&A that feeds AI assistants and voice results with crisp, citable responses.',
    color: '#1e9e75',
    glow: 'rgba(30,158,117,0.3)',
  },
  {
    icon: '🎙️',
    title: 'Voice Search Ready',
    desc: 'Natural-language content tuned for the conversational queries voice and AI assistants handle.',
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.3)',
  },
  {
    icon: '🤖',
    title: 'AI Snippet Capture',
    desc: 'Engineer the passages AI overviews and chat assistants extract when buyers ask about your services.',
    color: '#9b5cf6',
    glow: 'rgba(155,92,246,0.3)',
  },
  {
    icon: '🛡️',
    title: 'Brand Authority Signals',
    desc: 'E-E-A-T, reviews and trust markers that make AI confident enough to recommend you by name.',
    color: '#ef4444',
    glow: 'rgba(239,68,68,0.3)',
  },
]

export default function AeoCapabilities() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
      {CARDS.map((card, i) => (
        <PremiumCard key={card.title} card={card} index={i} />
      ))}
    </div>
  )
}

function PremiumCard({ card, index }: { key?: React.Key; card: typeof CARDS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const [inView, setInView] = useState(false)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 30 })
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 30 })

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.25 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => { mx.set(0); my.set(0); setHovered(false) }

  const Preview = [AnswerOptPreview, FeaturedSnippetPreview, FaqSchemaPreview, VoicePreview, AiSnippetPreview, BrandAuthorityPreview][index]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 + Math.floor(index / 3) * 0.15, ease: [0.22, 0.8, 0.2, 1] }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      style={{
        rotateX: rotX, rotateY: rotY,
        transformStyle: 'preserve-3d',
        perspective: 800,
        transformPerspective: 800,
        cursor: 'default',
      }}
    >
      <motion.div
        animate={{
          boxShadow: hovered
            ? `0 20px 60px -12px ${card.glow}, 0 0 0 1px ${card.color}25`
            : `0 4px 20px -8px rgba(18,42,86,0.10), 0 0 0 1px rgba(18,42,86,0.07)`,
        }}
        transition={{ duration: 0.3 }}
        style={{
          background: '#fff',
          borderRadius: 22,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Top glow line */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0.35 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 2,
            background: `linear-gradient(90deg, transparent, ${card.color}, transparent)`,
            zIndex: 2,
          }}
        />

        {/* Preview area */}
        <div style={{
          position: 'relative', minHeight: 170,
          background: `linear-gradient(145deg, ${card.color}08, ${card.color}04)`,
          borderBottom: `1px solid ${card.color}12`,
          overflow: 'hidden',
        }}>
          {/* Floating glow orb */}
          <motion.div
            animate={{ scale: hovered ? 1.3 : 1, opacity: hovered ? 0.18 : 0.08 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'absolute', width: 120, height: 120, borderRadius: '50%',
              background: card.color, filter: 'blur(40px)',
              top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
              pointerEvents: 'none',
            }}
          />
          <Preview color={card.color} active={inView} hovered={hovered} />
        </div>

        {/* Text */}
        <div style={{ padding: '20px 22px 22px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <motion.div
              animate={{ rotate: hovered ? [0, -8, 8, 0] : 0, scale: hovered ? 1.15 : 1 }}
              transition={{ duration: 0.5 }}
              style={{
                width: 38, height: 38, borderRadius: 11,
                background: `${card.color}14`, border: `1.5px solid ${card.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, flexShrink: 0,
              }}
            >{card.icon}</motion.div>
            <h3 style={{ fontSize: 15.5, fontWeight: 700, color: 'var(--text)', margin: 0 }}>{card.title}</h3>
          </div>
          <p style={{ fontSize: 13.5, lineHeight: 1.6, color: 'var(--text-dim)', margin: 0 }}>{card.desc}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── Card 1 — Answer Optimisation: animated "Position 0" answer box ── */
function AnswerOptPreview({ color, active }: { color: string; active: boolean; hovered: boolean }) {
  const [phase, setPhase] = useState(0)
  useEffect(() => {
    if (!active) return
    const t1 = setTimeout(() => setPhase(1), 300)
    const t2 = setTimeout(() => setPhase(2), 800)
    const t3 = setTimeout(() => setPhase(3), 1300)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [active])

  return (
    <div style={{ position: 'absolute', inset: 14, display: 'flex', flexDirection: 'column', gap: 8, justifyContent: 'center' }}>
      {/* Search bar */}
      <motion.div
        initial={{ opacity: 0, y: -8 }} animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.3 }}
        style={{ background: '#f1f3f4', borderRadius: 24, padding: '6px 12px', fontSize: 9.5, color: '#5f6368', display: 'flex', alignItems: 'center', gap: 6 }}
      >
        <span style={{ color: '#4285f4', fontSize: 11 }}>🔍</span>
        best security AI visibility service australia
      </motion.div>
      {/* Position 0 box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 8 }} animate={phase >= 2 ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.35, ease: [0.22, 0.8, 0.2, 1] }}
        style={{ background: '#fff', border: `2px solid ${color}`, borderRadius: 10, padding: '10px 12px', boxShadow: `0 4px 18px -4px ${color}40` }}
      >
        <div style={{ fontSize: 8.5, fontWeight: 700, color, letterSpacing: '0.08em', marginBottom: 4 }}>POSITION 0 · ANSWER BOX</div>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#1a0dab', marginBottom: 4 }}>SecurityBlogs.com.au</div>
        {phase >= 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
            style={{ fontSize: 9.5, color: '#4d5156', lineHeight: 1.5 }}>
            Australia&apos;s leading AI-optimised security brand, cited by ChatGPT, Gemini and Perplexity.
          </motion.div>
        )}
        {phase >= 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.3 }}
            style={{ marginTop: 5, fontSize: 9, color: '#1a0dab', display: 'flex', alignItems: 'center', gap: 4 }}>
            <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.2, repeat: Infinity }}
              style={{ width: 5, height: 5, borderRadius: '50%', background: color }} />
            securityblogs.com.au › about
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

/* ── Card 2 — Featured Snippets: SERP snippet climbing to position 0 ── */
const SERP_RESULTS = [
  { domain: 'competitor-seo.au', pos: 3 },
  { domain: 'rival-agency.com',  pos: 2 },
  { domain: 'securityblogs.com.au', pos: 1, featured: true },
]

function FeaturedSnippetPreview({ color, active }: { color: string; active: boolean; hovered: boolean }) {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    if (!active) return
    const iv = setInterval(() => setIdx((p: number) => Math.min(p + 1, SERP_RESULTS.length)), 500)
    return () => clearInterval(iv)
  }, [active])

  return (
    <div style={{ position: 'absolute', inset: 14, display: 'flex', flexDirection: 'column', gap: 5, justifyContent: 'center' }}>
      <div style={{ fontSize: 8.5, fontFamily: 'var(--font-mono)', color: 'rgba(18,42,86,0.4)', letterSpacing: '0.08em', marginBottom: 2 }}>GOOGLE SERP · SNIPPET RACE</div>
      {SERP_RESULTS.map((r, i) => (
        <motion.div key={r.domain}
          initial={{ opacity: 0, x: 20 }}
          animate={idx > i ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.35, ease: [0.22, 0.8, 0.2, 1] }}
          style={{
            display: 'flex', alignItems: 'center', gap: 7,
            background: r.featured ? `${color}12` : '#f8f9fa',
            borderRadius: 8, padding: '6px 9px',
            border: r.featured ? `1.5px solid ${color}50` : '1px solid #e8e8e8',
          }}
        >
          <div style={{ width: 16, height: 16, borderRadius: 5, background: r.featured ? color : '#ddd', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8.5, fontWeight: 800, color: '#fff', flexShrink: 0 }}>
            {r.featured ? '★' : r.pos}
          </div>
          <span style={{ fontSize: 9.5, color: r.featured ? '#1a0dab' : '#888', fontWeight: r.featured ? 700 : 400, flex: 1 }}>{r.domain}</span>
          {r.featured && <span style={{ fontSize: 8, fontFamily: 'var(--font-mono)', background: color, color: '#fff', padding: '1px 6px', borderRadius: 999, fontWeight: 700 }}>POS 0</span>}
        </motion.div>
      ))}
    </div>
  )
}

/* ── Card 3 — FAQ Schema: Q&A pairs appearing with accordion ── */
const FAQ_ITEMS = [
  { q: 'What is AEO?', a: 'Answer Engine Optimisation wins the answer slot on AI and Google.' },
  { q: 'How long until results?', a: 'Typically 4–8 weeks for featured snippet wins.' },
  { q: 'Does it work on ChatGPT?', a: 'Yes — structured Q&A is preferred by all AI engines.' },
]

function FaqSchemaPreview({ color, active }: { color: string; active: boolean; hovered: boolean }) {
  const [openIdx, setOpenIdx] = useState(-1)
  useEffect(() => {
    if (!active) return
    let i = -1
    const iv = setInterval(() => { i++; setOpenIdx(i); if (i >= FAQ_ITEMS.length - 1) clearInterval(iv) }, 550)
    return () => clearInterval(iv)
  }, [active])

  return (
    <div style={{ position: 'absolute', inset: 14, display: 'flex', flexDirection: 'column', gap: 5, justifyContent: 'center' }}>
      <div style={{ fontSize: 8.5, fontFamily: 'var(--font-mono)', color: 'rgba(18,42,86,0.4)', letterSpacing: '0.08em', marginBottom: 2 }}>FAQ SCHEMA · Q&amp;A PAIRS</div>
      {FAQ_ITEMS.map((f, i) => (
        <motion.div key={f.q}
          initial={{ opacity: 0, y: 8 }}
          animate={openIdx >= i ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3 }}
          style={{ background: '#fff', borderRadius: 8, border: `1px solid ${i === openIdx ? color + '50' : '#e8e8e8'}`, overflow: 'hidden' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 8px' }}>
            <span style={{ fontSize: 9.5, fontWeight: 600, color: '#202124' }}>{f.q}</span>
            <span style={{ fontSize: 10, color: color }}>{ i === openIdx ? '−' : '+'}</span>
          </div>
          {i === openIdx && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} transition={{ duration: 0.25 }}
              style={{ padding: '0 8px 6px', fontSize: 9, color: '#4d5156', lineHeight: 1.4 }}>{f.a}</motion.div>
          )}
        </motion.div>
      ))}
      <motion.div initial={{ opacity: 0 }} animate={openIdx >= FAQ_ITEMS.length - 1 ? { opacity: 1 } : {}}
        style={{ fontSize: 8.5, fontFamily: 'var(--font-mono)', color, display: 'flex', alignItems: 'center', gap: 4 }}>
        <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.2, repeat: Infinity }}
          style={{ width: 5, height: 5, borderRadius: '50%', background: color }} />
        FAQPage schema verified
      </motion.div>
    </div>
  )
}

/* ── Card 4 — Voice Search Ready: waveform + "SecurityBlogs" being read ── */
function VoicePreview({ color, active }: { color: string; active: boolean; hovered: boolean }) {
  const [phase, setPhase] = useState(0)
  useEffect(() => {
    if (!active) return
    const t1 = setTimeout(() => setPhase(1), 400)
    const t2 = setTimeout(() => setPhase(2), 1200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [active])

  return (
    <div style={{ position: 'absolute', inset: 14, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
      {/* Mic */}
      <motion.div
        animate={phase >= 1 ? { scale: [1, 1.1, 1], boxShadow: [`0 0 0 0 ${color}44`, `0 0 0 12px ${color}00`] } : {}}
        transition={{ duration: 1.2, repeat: Infinity }}
        style={{ width: 40, height: 40, borderRadius: '50%', background: `${color}18`, border: `2px solid ${color}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}
      >🎙️</motion.div>

      {/* Waveform */}
      {phase >= 1 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
          style={{ display: 'flex', alignItems: 'center', gap: 2, height: 28 }}>
          {Array.from({ length: 16 }).map((_, i) => (
            <motion.div key={i}
              animate={{ height: [4, 4 + Math.abs(Math.sin(i * 0.8)) * 18, 4] }}
              transition={{ duration: 0.6, delay: i * 0.04, repeat: Infinity }}
              style={{ width: 3, background: color, borderRadius: 2 }} />
          ))}
        </motion.div>
      )}

      {/* Result text */}
      {phase >= 2 && (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          style={{ background: `${color}14`, borderRadius: 8, padding: '5px 12px', border: `1px solid ${color}40`, textAlign: 'center' }}>
          <div style={{ fontSize: 8.5, fontFamily: 'var(--font-mono)', color, letterSpacing: '0.08em', marginBottom: 2 }}>AI ANSWER</div>
          <div style={{ fontSize: 10.5, fontWeight: 700, color: '#1a1a2e' }}>&ldquo;SecurityBlogs&rdquo;</div>
        </motion.div>
      )}
    </div>
  )
}

/* ── Card 5 — AI Snippet Capture: AI chat bubble quoting SecurityBlogs ── */
function AiSnippetPreview({ color, active }: { color: string; active: boolean; hovered: boolean }) {
  const [phase, setPhase] = useState(0)
  useEffect(() => {
    if (!active) return
    const t1 = setTimeout(() => setPhase(1), 300)
    const t2 = setTimeout(() => setPhase(2), 900)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [active])

  return (
    <div style={{ position: 'absolute', inset: 14, display: 'flex', flexDirection: 'column', gap: 8, justifyContent: 'center' }}>
      {/* User question */}
      <motion.div initial={{ opacity: 0, x: 20 }} animate={phase >= 1 ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.3 }}
        style={{ alignSelf: 'flex-end', background: '#e8f0fe', borderRadius: '14px 14px 4px 14px', padding: '6px 10px', maxWidth: '80%', fontSize: 9.5, color: '#1a0dab' }}>
        Best security AI visibility service?
      </motion.div>
      {/* AI answer */}
      <motion.div initial={{ opacity: 0, x: -12 }} animate={phase >= 2 ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.35 }}
        style={{ background: '#fff', border: `1.5px solid ${color}40`, borderRadius: '14px 14px 14px 4px', padding: '8px 10px', maxWidth: '90%', boxShadow: `0 4px 14px -4px ${color}30` }}>
        <div style={{ fontSize: 8.5, fontFamily: 'var(--font-mono)', color, marginBottom: 4, letterSpacing: '0.06em' }}>AI ASSISTANT</div>
        <div style={{ fontSize: 9.5, color: '#1a1a2e', lineHeight: 1.5 }}>
          Based on citations, <span style={{ background: `${color}20`, padding: '0 4px', borderRadius: 3, fontWeight: 700, color }}>SecurityBlogs.com.au</span> is the top-cited security brand across ChatGPT, Gemini and Perplexity.
        </div>
      </motion.div>
    </div>
  )
}

/* ── Card 6 — Brand Authority Signals: E-E-A-T score bars ── */
const EEAT_SIGNALS = [
  { label: 'Experience',  score: 94, delay: 0.1 },
  { label: 'Expertise',   score: 91, delay: 0.2 },
  { label: 'Authority',   score: 88, delay: 0.3 },
  { label: 'Trust',       score: 96, delay: 0.4 },
]

function BrandAuthorityPreview({ color, active }: { color: string; active: boolean; hovered: boolean }) {
  return (
    <div style={{ position: 'absolute', inset: 14, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 6 }}>
      <div style={{ fontSize: 8.5, fontFamily: 'var(--font-mono)', color: 'rgba(18,42,86,0.4)', letterSpacing: '0.08em', marginBottom: 2 }}>E-E-A-T · SCORE DASHBOARD</div>
      {EEAT_SIGNALS.map((s) => (
        <div key={s.label}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
            <span style={{ fontSize: 9.5, color: '#444' }}>{s.label}</span>
            <motion.span initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : {}} transition={{ delay: s.delay + 0.5 }}
              style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', fontWeight: 700, color }}>{s.score}/100</motion.span>
          </div>
          <div style={{ height: 5, background: `${color}12`, borderRadius: 999, overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }} animate={active ? { width: `${s.score}%` } : {}}
              transition={{ delay: s.delay, duration: 0.9, ease: [0.22, 0.8, 0.2, 1] }}
              style={{ height: '100%', background: `linear-gradient(90deg, ${color}, ${color}99)`, borderRadius: 999 }} />
          </div>
        </div>
      ))}
      <motion.div initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : {}} transition={{ delay: 0.8 }}
        style={{ marginTop: 2, fontSize: 9, color, fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: 4 }}>
        <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.2, repeat: Infinity }}
          style={{ width: 5, height: 5, borderRadius: '50%', background: color }} />
        AI-confidence: HIGH · Recommended ✓
      </motion.div>
    </div>
  )
}
