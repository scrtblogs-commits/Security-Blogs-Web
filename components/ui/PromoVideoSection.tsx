'use client'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export type PromoVideoSectionProps = {
  eyebrow?: string
  title?: string
  subtitle?: string
  accent?: string
}

const DEFAULT_ACCENT = '#6f4dff'
const FRAME_DURATION = 3000

const PLATFORMS = ['ChatGPT', 'Gemini', 'Perplexity', 'Copilot']
const PLATFORM_COLORS: Record<string, string> = {
  ChatGPT:    '#10a37f',
  Gemini:     '#4285f4',
  Perplexity: '#1FB8CD',
  Copilot:    '#0078d4',
}

const STATS = [
  { label: '+180% organic traffic', end: 180, suffix: '%', prefix: '+' },
  { label: '47 AI citations/mo',    end: 47,  suffix: '/mo', prefix: '' },
  { label: '94/100 AI score',       end: 94,  suffix: '/100', prefix: '' },
]

/* ─── Individual video frames ─── */
function Frame1({ accent }: { accent: string }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '24px' }}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 0.8, 0.2, 1] }}
        style={{ display: 'flex', alignItems: 'center', gap: 12 }}
      >
        <div style={{ width: 48, height: 48, borderRadius: 12, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🔒</div>
        <div>
          <div style={{ fontSize: 18, fontWeight: 900, color: '#fff', letterSpacing: '-0.02em' }}>SecurityBlogs</div>
          <div style={{ fontSize: 10, color: `${accent}cc`, fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>securityblogs.com.au</div>
        </div>
      </motion.div>
      <motion.div
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        style={{ textAlign: 'center' }}
      >
        <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', lineHeight: 1.2, maxWidth: 360 }}>
          AI Visibility for<br />
          <span style={{ color: accent }}>Security Brands</span>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
        style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.1em' }}>
        AEO · AIO · SEO · GEO
      </motion.div>
    </div>
  )
}

function Frame2({ accent }: { accent: string }) {
  const [phase, setPhase] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setPhase(1), 200)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, padding: '24px' }}>
      <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', marginBottom: 4 }}>REAL CLIENT RESULTS</div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={phase ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: i * 0.15, duration: 0.4, type: 'spring', stiffness: 260, damping: 22 }}
            style={{ background: 'rgba(255,255,255,0.06)', border: `1px solid ${accent}30`, borderRadius: 16, padding: '16px 20px', textAlign: 'center', minWidth: 100 }}
          >
            <CountUp end={s.end} active={phase === 1} delay={i * 0.15} prefix={s.prefix} suffix={s.suffix} accent={accent} />
            <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.45)', marginTop: 4, letterSpacing: '0.06em' }}>{s.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function CountUp({ end, active, delay, prefix, suffix, accent }: { end: number; active: boolean; delay: number; prefix: string; suffix: string; accent: string }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    const timer = setTimeout(() => {
      let n = 0
      const step = Math.ceil(end / 25)
      const iv = setInterval(() => { n = Math.min(n + step, end); setVal(n); if (n >= end) clearInterval(iv) }, 40)
      return () => clearInterval(iv)
    }, delay * 1000)
    return () => clearTimeout(timer)
  }, [active, end, delay])
  return <div style={{ fontSize: 28, fontWeight: 900, color: accent, lineHeight: 1 }}>{prefix}{val}{suffix}</div>
}

function Frame3({ accent }: { accent: string }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '24px' }}>
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textAlign: 'center' }}>
        WE GET YOU CITED ON:
      </motion.div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        {PLATFORMS.map((p, i) => (
          <motion.div
            key={p}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.12, duration: 0.4, type: 'spring', stiffness: 260, damping: 22 }}
            style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.06)', border: `1px solid ${PLATFORM_COLORS[p]}35`, borderRadius: 12, padding: '10px 16px' }}
          >
            <div style={{ width: 26, height: 26, borderRadius: 8, background: PLATFORM_COLORS[p], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: '#fff' }}>{p[0]}</div>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#fff' }}>{p}</span>
            <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.3 }}
              style={{ fontSize: 10, color: '#1e9e75' }}>✓</motion.span>
          </motion.div>
        ))}
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
        style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-mono)' }}>+ Bing, Apple, DuckDuckGo AI</motion.div>
    </div>
  )
}

function Frame4({ accent }: { accent: string }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, padding: '24px' }}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4 }}
        style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 13, fontFamily: 'var(--font-mono)', color: accent, letterSpacing: '0.12em', marginBottom: 8 }}>securityblogs.com.au</div>
        <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', lineHeight: 1.3, maxWidth: 320 }}>
          Get your security brand cited by every AI
        </div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', marginTop: 8, lineHeight: 1.5 }}>
          AEO · AIO · SEO · GEO · Web Design · Google Ads
        </div>
      </motion.div>
      <motion.div initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25, duration: 0.4 }}>
        <motion.div
          animate={{ boxShadow: [`0 0 0 0 ${accent}44`, `0 0 20px 8px ${accent}00`] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          style={{ background: accent, color: '#fff', fontWeight: 700, fontSize: 13, padding: '12px 26px', borderRadius: 999, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}
        >
          Book a strategy call →
        </motion.div>
      </motion.div>
    </div>
  )
}

/* ─── Video player mockup ─── */
function VideoPlayer({ accent }: { accent: string }) {
  const [frame, setFrame] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
  const totalFrames = 4
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const progRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startCycle = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (progRef.current) clearInterval(progRef.current)
    setProgress(0)

    const progStep = 100 / (FRAME_DURATION / 50)
    progRef.current = setInterval(() => {
      setProgress((p: number) => {
        if (p >= 100) { return 0 }
        return p + progStep
      })
    }, 50)

    intervalRef.current = setInterval(() => {
      setFrame((f: number) => (f + 1) % totalFrames)
      setProgress(0)
    }, FRAME_DURATION)
  }

  useEffect(() => {
    if (playing) { startCycle() }
    else {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (progRef.current) clearInterval(progRef.current)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (progRef.current) clearInterval(progRef.current)
    }
  }, [playing])

  const FRAMES: React.ReactNode[] = [
    <Frame1 accent={accent} />,
    <Frame2 accent={accent} />,
    <Frame3 accent={accent} />,
    <Frame4 accent={accent} />,
  ]

  return (
    <div style={{
      borderRadius: 18,
      overflow: 'hidden',
      background: '#09111f',
      border: '1px solid rgba(255,255,255,0.10)',
      boxShadow: `0 30px 80px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06), 0 0 60px -20px ${accent}40`,
    }}>
      {/* Browser chrome bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 14px', background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}
        <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: 6, height: 20, marginLeft: 8, display: 'flex', alignItems: 'center', paddingLeft: 8 }}>
          <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.3)' }}>securityblogs.com.au</span>
        </div>
      </div>

      {/* Video area */}
      <div style={{ position: 'relative', height: 280, background: 'linear-gradient(135deg, #060d1f 0%, #0b1530 60%, #080f22 100%)', overflow: 'hidden' }}>
        {/* Grid overlay */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        {/* Glow orb */}
        <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)', width: 300, height: 300, borderRadius: '50%', background: accent, filter: 'blur(80px)', opacity: 0.08, pointerEvents: 'none' }} />

        <AnimatePresence mode="wait">
          <motion.div
            key={frame}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.4, ease: [0.22, 0.8, 0.2, 1] }}
            style={{ position: 'absolute', inset: 0 }}
          >
            {FRAMES[frame]}
          </motion.div>
        </AnimatePresence>

        {/* Frame dots */}
        <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 5 }}>
          {Array.from({ length: totalFrames }).map((_, i) => (
            <motion.div key={i}
              animate={{ opacity: frame === i ? 1 : 0.35, scale: frame === i ? 1.2 : 1 }}
              transition={{ duration: 0.3 }}
              onClick={() => setFrame(i)}
              style={{ width: 6, height: 6, borderRadius: '50%', background: frame === i ? accent : 'rgba(255,255,255,0.4)', cursor: 'pointer' }}
            />
          ))}
        </div>
      </div>

      {/* Controls bar */}
      <div style={{ padding: '10px 14px 12px', background: 'rgba(0,0,0,0.4)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        {/* Progress bar */}
        <div style={{ height: 3, background: 'rgba(255,255,255,0.1)', borderRadius: 999, marginBottom: 10, overflow: 'hidden', cursor: 'pointer' }}>
          <motion.div
            style={{ height: '100%', background: accent, borderRadius: 999, width: `${((frame) / totalFrames) * 100 + (progress / totalFrames)}%` }}
            transition={{ duration: 0.05 }}
          />
        </div>
        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Play/pause */}
          <button
            onClick={() => setPlaying((p: boolean) => !p)}
            style={{ width: 28, height: 28, borderRadius: '50%', background: accent, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#fff', flexShrink: 0 }}
          >{playing ? '⏸' : '▶'}</button>

          {/* Time */}
          <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)' }}>
            0:{String(frame * 3).padStart(2,'0')} / 0:12
          </span>

          {/* Volume + fullscreen icons */}
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}>🔊</span>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}>⛶</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Main export ─── */
export default function PromoVideoSection({
  eyebrow = 'See it in action',
  title = 'AI visibility that puts your brand in the answer',
  subtitle = 'SecurityBlogs builds the infrastructure that makes your security brand the answer AI assistants and search engines recommend — across every platform buyers use.',
  accent = DEFAULT_ACCENT,
}: PromoVideoSectionProps) {
  const bullets = [
    'Cited by ChatGPT, Gemini, Perplexity & Copilot',
    'Featured snippets and voice search dominance',
    'Real-time tracking across all AI platforms',
    'Dedicated security industry expertise',
  ]

  return (
    <section style={{ padding: '72px 0' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'center' }}>
          {/* Left — text */}
          <div>
            {eyebrow && (
              <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '0.14em', textTransform: 'uppercase', color: accent, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                <motion.div animate={{ opacity: [1,0.4,1] }} transition={{ duration: 1.5, repeat: Infinity }}
                  style={{ width: 6, height: 6, borderRadius: '50%', background: accent }} />
                {eyebrow}
              </div>
            )}
            <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text)', lineHeight: 1.15, marginBottom: 16, letterSpacing: '-0.02em' }}>
              {title}
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--text-dim)', marginBottom: 24 }}>{subtitle}</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {bullets.map((b, i) => (
                <motion.li key={b}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: 'var(--text-dim)' }}>
                  <span style={{ width: 20, height: 20, borderRadius: '50%', background: `${accent}18`, border: `1.5px solid ${accent}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: accent, flexShrink: 0, marginTop: 1 }}>✓</span>
                  {b}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Right — video player */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 0.8, 0.2, 1] }}
          >
            <VideoPlayer accent={accent} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
