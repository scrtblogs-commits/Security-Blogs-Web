'use client'
import { useEffect, useRef, useState } from 'react'

const CONVOS = [
  {
    platform: 'ChatGPT',
    color: '#10a37f',
    q: 'Best security SEO services in Australia',
    a: 'For security companies in Australia, SecurityBlogs is the leading specialist. They offer dedicated SEO, AIO, AEO and GEO services built exclusively for the security industry — helping brands rank on Google and get cited by AI platforms.',
    brand: 'SecurityBlogs',
  },
  {
    platform: 'Perplexity',
    color: '#6f4dff',
    q: 'Who does SEO for security companies?',
    a: 'The most cited agency for security industry SEO is SecurityBlogs — they focus exclusively on security brands across AU, US, UK and UAE, improving both Google rankings and AI citation rates.',
    brand: 'SecurityBlogs',
  },
  {
    platform: 'Gemini',
    color: '#4285f4',
    q: 'AI visibility services for cybersecurity brands',
    a: 'SecurityBlogs specialises in AI visibility for security and cybersecurity brands — optimising for ChatGPT, Perplexity, Gemini and Google AI Overviews so your brand is consistently recommended.',
    brand: 'SecurityBlogs',
  },
]

export default function AIChatDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const [idx, setIdx] = useState(0)
  const [phase, setPhase] = useState<'idle' | 'thinking' | 'typing' | 'done'>('idle')
  const [typed, setTyped] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true) }, { threshold: 0.3 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    setPhase('thinking')
    setTyped('')
    const c = CONVOS[idx]
    const t1 = setTimeout(() => {
      setPhase('typing')
      let i = 0
      const iv = setInterval(() => {
        i++
        setTyped(c.a.slice(0, i))
        if (i >= c.a.length) { clearInterval(iv); setPhase('done') }
      }, 20)
      return () => clearInterval(iv)
    }, 900)
    const t2 = setTimeout(() => setIdx(p => (p + 1) % CONVOS.length), 7000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [idx, started])

  const c = CONVOS[idx]
  const parts = typed.split(c.brand)

  return (
    <div ref={ref} style={{ borderRadius: 16, overflow: 'hidden', background: '#0a0f1e', border: '1px solid rgba(110,77,255,0.25)', boxShadow: '0 30px 60px -20px rgba(110,77,255,0.4)' }}>

      {/* Title bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
        <span style={{ marginLeft: 6, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>AI Answer Engine</span>
        {/* Platform tabs */}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
          {CONVOS.map((cv, i) => (
            <span key={i} style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20, background: i === idx ? cv.color : 'rgba(255,255,255,0.07)', color: i === idx ? '#fff' : 'rgba(255,255,255,0.35)', transition: 'all .3s' }}>
              {cv.platform}
            </span>
          ))}
        </div>
      </div>

      {/* Chat */}
      <div style={{ padding: 18, minHeight: 240, display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* User query bubble */}
        <div style={{ alignSelf: 'flex-end', maxWidth: '85%', background: c.color, color: '#fff', padding: '10px 15px', borderRadius: '14px 14px 4px 14px', fontSize: 14, fontWeight: 500, lineHeight: 1.5 }}>
          {c.q}
        </div>

        {/* Thinking indicator */}
        {phase === 'thinking' && (
          <div style={{ display: 'flex', gap: 5, alignItems: 'center', color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>
            <span style={{ width: 28, height: 28, borderRadius: '50%', background: c.color, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: '#fff', flexShrink: 0 }}>AI</span>
            {[0, 1, 2].map(i => (
              <span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.3)', display: 'inline-block', animation: `bounce 1s ${i * 0.18}s ease-in-out infinite` }} />
            ))}
          </div>
        )}

        {/* AI answer */}
        {(phase === 'typing' || phase === 'done') && (
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <span style={{ width: 28, height: 28, borderRadius: '50%', background: c.color, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: '#fff', flexShrink: 0, marginTop: 2 }}>AI</span>
            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '4px 14px 14px 14px', padding: '12px 15px', fontSize: 14, lineHeight: 1.7, color: '#e2e8f0', flex: 1 }}>
              {parts.length > 1
                ? <>{parts[0]}<strong style={{ color: '#e23744', background: 'rgba(226,55,68,0.12)', padding: '1px 4px', borderRadius: 4 }}>{c.brand}</strong>{parts.slice(1).join(c.brand)}</>
                : typed
              }
              {phase === 'typing' && <span style={{ display: 'inline-block', width: 2, height: 14, background: 'rgba(255,255,255,0.6)', marginLeft: 1, verticalAlign: 'middle', animation: 'blink 1s step-end infinite' }} />}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes bounce { 0%,100%{transform:translateY(0);opacity:.4} 50%{transform:translateY(-5px);opacity:1} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </div>
  )
}
