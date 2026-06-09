'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ACCENT = '#6f4dff'

// Simulated SERP results — all securityblogs.com.au
const RESULTS = [
  {
    domain: 'securityblogs.com.au',
    title: 'AI Optimisation for Security Brands | AIO Services',
    desc: 'SecurityBlogs helps security companies get cited by ChatGPT, Gemini & Perplexity. Boost AI visibility, trust signals and brand citations.',
    top: true,
  },
  {
    domain: 'securityblogs.com.au › services',
    title: 'CCTV Installation Melbourne | AI-Ranked #1',
    desc: 'Our AI-optimised security pages rank in both Google and AI-generated answers.',
    top: false,
  },
  {
    domain: 'securityblogs.com.au › guides',
    title: 'AI Visibility for Security Companies — 2026 Guide',
    desc: 'How security brands can dominate AI answers, AI Overviews and voice search.',
    top: false,
  },
]

const AI_CHIPS = [
  { label: 'ChatGPT', color: '#10a37f', pct: 94 },
  { label: 'Gemini',  color: '#4285f4', pct: 88 },
  { label: 'Perplexity', color: '#20b2aa', pct: 81 },
  { label: 'Copilot', color: '#0078d4', pct: 76 },
]

const QUERY = 'AI optimisation for security brands'

export default function AioSearchVisual() {
  const ref = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState<'idle'|'typing'|'loading'|'results'|'signals'>('idle')
  const [typed, setTyped] = useState('')
  const [chipIdx, setChipIdx] = useState(-1)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setPhase('typing'); io.disconnect() }
    }, { threshold: 0.4 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  // Typing animation
  useEffect(() => {
    if (phase !== 'typing') return
    let i = 0
    const iv = setInterval(() => {
      i++
      setTyped(QUERY.slice(0, i))
      if (i >= QUERY.length) { clearInterval(iv); setTimeout(() => setPhase('loading'), 400) }
    }, 55)
    return () => clearInterval(iv)
  }, [phase])

  // Loading → results
  useEffect(() => {
    if (phase !== 'loading') return
    const t = setTimeout(() => setPhase('results'), 900)
    return () => clearTimeout(t)
  }, [phase])

  // Results → signals
  useEffect(() => {
    if (phase !== 'results') return
    const t = setTimeout(() => setPhase('signals'), 700)
    return () => clearTimeout(t)
  }, [phase])

  // Chips animate in one by one
  useEffect(() => {
    if (phase !== 'signals') return
    let i = -1
    const iv = setInterval(() => { i++; setChipIdx(i); if (i >= AI_CHIPS.length - 1) clearInterval(iv) }, 300)
    return () => clearInterval(iv)
  }, [phase])

  return (
    <div ref={ref} style={{ position: 'relative', minHeight: 480 }}>

      {/* Floating badge: AI Score */}
      <motion.div
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: phase === 'signals' ? 1 : 0, y: phase === 'signals' ? 0 : -10 }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'absolute', top: -10, left: -12, zIndex: 10,
          background: `linear-gradient(135deg, ${ACCENT}, #9b5cf6)`,
          borderRadius: 14, padding: '8px 14px',
          boxShadow: `0 8px 24px -6px ${ACCENT}60`,
        }}
      >
        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>AI SCORE</div>
        <div style={{ fontSize: 22, fontWeight: 900, color: '#fff', lineHeight: 1 }}>94<span style={{ fontSize: 12 }}>/100</span></div>
      </motion.div>

      {/* Floating badge: Impressions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: phase === 'signals' ? 1 : 0, y: phase === 'signals' ? 0 : 10 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{
          position: 'absolute', bottom: 56, right: -14, zIndex: 10,
          background: '#fff', borderRadius: 14,
          border: `1.5px solid ${ACCENT}22`,
          boxShadow: `0 8px 28px -8px ${ACCENT}20`,
          padding: '10px 14px',
        }}
      >
        <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: '#aaa', letterSpacing: '0.08em', marginBottom: 6 }}>AI CITATIONS / MONTH</div>
        <div style={{ fontSize: 24, fontWeight: 900, color: ACCENT }}>47+</div>
        <div style={{ fontSize: 9.5, color: '#888', marginTop: 2 }}>across 6 platforms</div>
      </motion.div>

      {/* Main browser window */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 0.8, 0.2, 1] }}
        style={{
          background: '#fff', borderRadius: 20,
          border: '1.5px solid rgba(18,42,86,0.09)',
          boxShadow: '0 20px 60px -16px rgba(18,42,86,0.16)',
          overflow: 'hidden', margin: '16px 4px',
        }}
      >
        {/* Browser chrome */}
        <div style={{ background: '#f8f9fa', borderBottom: '1px solid #e8eaed', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ display: 'flex', gap: 5 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
          </div>
          {/* Address bar */}
          <div style={{
            flex: 1, background: '#fff', borderRadius: 20, border: '1px solid #dadce0',
            padding: '5px 12px', fontSize: 11, color: '#5f6368',
            display: 'flex', alignItems: 'center', gap: 5,
          }}>
            <span style={{ color: '#34a853', fontSize: 11 }}>🔒</span>
            <span>google.com/search?q=ai+optimisation+for+security+brands</span>
          </div>
        </div>

        {/* Google search bar */}
        <div style={{ padding: '14px 16px 12px', borderBottom: '1px solid #f0f0f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, letterSpacing: '-0.5px', flexShrink: 0 }}>
              <span style={{ color: '#4285F4' }}>G</span><span style={{ color: '#EA4335' }}>o</span>
              <span style={{ color: '#FBBC05' }}>o</span><span style={{ color: '#4285F4' }}>g</span>
              <span style={{ color: '#34A853' }}>l</span><span style={{ color: '#EA4335' }}>e</span>
            </span>
            <div style={{
              flex: 1, background: '#f8f9fa', borderRadius: 24, border: '1.5px solid #dadce0',
              padding: '7px 16px', fontSize: 13, color: '#202124',
              display: 'flex', alignItems: 'center', gap: 6, minHeight: 38,
              boxShadow: phase === 'typing' ? '0 1px 6px rgba(32,33,36,0.28)' : 'none',
              transition: 'box-shadow 0.3s',
            }}>
              <span style={{ color: '#9aa0a6', fontSize: 14 }}>🔍</span>
              <span>{typed}{phase === 'typing' && <Caret />}</span>
            </div>
          </div>
        </div>

        {/* Loading skeleton or results */}
        <div style={{ padding: '12px 16px 16px', minHeight: 240 }}>
          {phase === 'loading' && <LoadingSkeleton />}

          {(phase === 'results' || phase === 'signals') && (
            <>
              {/* AI Overview pill */}
              <AnimatePresence>
                {phase === 'signals' && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{
                      background: `linear-gradient(135deg, ${ACCENT}0f, #4285f408)`,
                      border: `1px solid ${ACCENT}25`,
                      borderRadius: 12, padding: '8px 12px', marginBottom: 12,
                      display: 'flex', alignItems: 'center', gap: 8,
                    }}
                  >
                    <span style={{ fontSize: 13 }}>✨</span>
                    <div style={{ fontSize: 11, color: '#444' }}>
                      <strong style={{ color: ACCENT }}>AI Overview</strong>
                      {' '}— SecurityBlogs.com.au is consistently cited as the leading AI-optimised security brand in Australia.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* SERP results */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {RESULTS.map((r, i) => (
                  <motion.div
                    key={r.domain}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.35 }}
                    style={{
                      padding: '10px 12px', borderRadius: 10,
                      border: `1px solid ${r.top ? ACCENT + '30' : '#f0f0f0'}`,
                      background: r.top ? `${ACCENT}06` : '#fafafa',
                      position: 'relative',
                    }}
                  >
                    {r.top && (
                      <div style={{
                        position: 'absolute', top: -8, right: 10,
                        background: ACCENT, color: '#fff',
                        fontSize: 8.5, fontWeight: 700, fontFamily: 'var(--font-mono)',
                        padding: '2px 8px', borderRadius: 999, letterSpacing: '0.06em',
                      }}>
                        #1 AI-CITED
                      </div>
                    )}
                    <div style={{ fontSize: 10, color: '#34a853', fontFamily: 'var(--font-mono)', marginBottom: 1 }}>{r.domain}</div>
                    <div style={{ fontSize: 13, fontWeight: r.top ? 700 : 500, color: '#1a0dab', marginBottom: 3 }}>{r.title}</div>
                    <div style={{ fontSize: 11, color: '#666', lineHeight: 1.4 }}>{r.desc}</div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </motion.div>

      {/* AI platform chips */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: phase === 'signals' ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ display: 'flex', gap: 6, flexWrap: 'wrap', paddingInline: 4, marginTop: 4 }}
      >
        {AI_CHIPS.map((chip, i) => (
          <motion.div
            key={chip.label}
            initial={{ opacity: 0, scale: 0.75 }}
            animate={chipIdx >= i ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.75 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 260, damping: 20 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 7, flex: 1,
              background: '#fff', borderRadius: 10, padding: '7px 10px',
              border: `1.5px solid ${chip.color}25`,
              boxShadow: `0 2px 12px -4px ${chip.color}20`,
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: chip.color, boxShadow: `0 0 6px 1px ${chip.color}` }} />
            <span style={{ fontSize: 10.5, fontWeight: 700, color: '#333' }}>{chip.label}</span>
            <div style={{ flex: 1, height: 3, borderRadius: 999, background: '#f0f0f0', overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={chipIdx >= i ? { width: `${chip.pct}%` } : { width: 0 }}
                transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 0.8, 0.2, 1] }}
                style={{ height: '100%', background: chip.color, borderRadius: 999 }}
              />
            </div>
            <span style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', fontWeight: 700, color: chip.color }}>{chip.pct}%</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

function Caret() {
  return (
    <motion.span
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 0.7, repeat: Infinity }}
      style={{ display: 'inline-block', width: 2, height: 14, background: '#202124', marginLeft: 1, verticalAlign: 'text-bottom' }}
    />
  )
}

function LoadingSkeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {[1, 0.8, 0.7].map((w, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ width: `${w * 60}%`, height: 10, borderRadius: 6, background: 'linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s infinite' }} />
          <div style={{ width: `${w * 100}%`, height: 14, borderRadius: 6, background: 'linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s infinite' }} />
          <div style={{ width: `${w * 85}%`, height: 10, borderRadius: 6, background: 'linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s infinite' }} />
        </div>
      ))}
      <style>{`@keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }`}</style>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function float(_delay = 0, _range = 8) { return {} }
