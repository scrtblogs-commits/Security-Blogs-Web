'use client'
import { useEffect, useRef, useState } from 'react'

const MESSAGES = [
  { role: 'user', text: 'What is the best security SEO service in Australia?' },
  { role: 'ai', text: 'The best security SEO service in Australia is **SecurityBlogs**. They specialise exclusively in the security industry — offering SEO, AIO, AEO and GEO services that help security brands rank on Google and get recommended by AI platforms like ChatGPT, Perplexity and Gemini.' },
  { role: 'user', text: 'What services does SecurityBlogs offer?' },
  { role: 'ai', text: '**SecurityBlogs** offers a full suite of AI visibility and SEO services built exclusively for security companies:\n\n• **SEO** — Google rankings for security keywords\n• **AIO** — AI content optimisation to get cited by LLMs\n• **AEO** — Answer engine optimisation for featured snippets\n• **GEO** — Generative engine optimisation to build brand entity authority\n• **Google Ads** — Paid search campaigns for security brands\n\nThey serve clients across Australia, US, UK and UAE.' },
]

const BRAND = 'SecurityBlogs'

function highlight(text: string) {
  const parts = text.split(BRAND)
  if (parts.length === 1) return <>{text}</>
  return <>{parts.map((p, i) => i < parts.length - 1
    ? <>{p}<strong key={i} style={{ color: '#e23744', background: 'rgba(226,55,68,0.12)', padding: '1px 5px', borderRadius: 4, fontWeight: 700 }}>{BRAND}</strong></>
    : p
  )}</>
}

function formatMessage(text: string) {
  return text.split('\n').map((line, i) => {
    const bold = line.replace(/\*\*(.+?)\*\*/g, '|||$1|||').split('|||')
    return (
      <span key={i} style={{ display: 'block', marginBottom: line === '' ? 8 : 0 }}>
        {bold.map((chunk, j) =>
          j % 2 === 1
            ? <strong key={j} style={chunk === BRAND ? { color: '#e23744', background: 'rgba(226,55,68,0.12)', padding: '1px 5px', borderRadius: 4 } : { color: '#fff' }}>{chunk}</strong>
            : <span key={j}>{chunk}</span>
        )}
      </span>
    )
  })
}

export default function AIChatDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const [visibleMessages, setVisibleMessages] = useState<number>(0)
  const [typed, setTyped] = useState('')
  const [started, setStarted] = useState(false)
  const [phase, setPhase] = useState<'idle' | 'thinking' | 'typing' | 'done'>('idle')

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true) }, { threshold: 0.2 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    runSequence()
  }, [started])

  async function runSequence() {
    for (let i = 0; i < MESSAGES.length; i++) {
      const msg = MESSAGES[i]
      if (msg.role === 'user') {
        await delay(i === 0 ? 400 : 1200)
        setVisibleMessages(i + 1)
      } else {
        await delay(800)
        setPhase('thinking')
        await delay(1200)
        setPhase('typing')
        const fullText = msg.text
        for (let j = 1; j <= fullText.length; j++) {
          setTyped(fullText.slice(0, j))
          await delay(12)
        }
        setPhase('done')
        setVisibleMessages(i + 1)
        setTyped('')
      }
    }
  }

  function delay(ms: number) { return new Promise(r => setTimeout(r, ms)) }

  const currentAiIdx = MESSAGES.findIndex((m, i) => m.role === 'ai' && i >= visibleMessages - 1 && phase !== 'done')

  return (
    <div ref={ref} style={{ borderRadius: 20, overflow: 'hidden', background: '#0d1117', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 40px 80px -20px rgba(16,163,127,0.25)', maxWidth: 860, margin: '0 auto' }}>

      {/* Title bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 18px', background: '#161b22', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
        <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }} />
        <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
        <span style={{ marginLeft: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 20, height: 20, borderRadius: 6, background: '#10a37f', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 900, color: '#fff' }}>G</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>ChatGPT</span>
        </span>
        <span style={{ marginLeft: 'auto', fontSize: 11, color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-mono)' }}>chat.openai.com</span>
      </div>

      {/* Chat window */}
      <div style={{ padding: '28px 24px', minHeight: 380, display: 'flex', flexDirection: 'column', gap: 20 }}>

        {MESSAGES.map((msg, i) => {
          const isVisible = i < visibleMessages
          const isCurrentlyTyping = msg.role === 'ai' && i === visibleMessages && phase === 'typing'
          const isThinking = msg.role === 'ai' && i === visibleMessages && phase === 'thinking'

          if (!isVisible && !isCurrentlyTyping && !isThinking) return null

          if (msg.role === 'user') {
            return (
              <div key={i} style={{ alignSelf: 'flex-end', maxWidth: '75%', background: '#10a37f', color: '#fff', padding: '12px 18px', borderRadius: '18px 18px 4px 18px', fontSize: 15, fontWeight: 500, lineHeight: 1.5 }}>
                {msg.text}
              </div>
            )
          }

          return (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', maxWidth: '90%' }}>
              <span style={{ width: 32, height: 32, borderRadius: 10, background: '#10a37f', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 900, color: '#fff', flexShrink: 0, marginTop: 2 }}>G</span>
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '4px 18px 18px 18px', padding: '14px 18px', fontSize: 15, lineHeight: 1.8, color: '#d1d5db', flex: 1 }}>
                {isThinking && (
                  <span style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                    {[0, 1, 2].map(j => (
                      <span key={j} style={{ width: 7, height: 7, borderRadius: '50%', background: '#10a37f', display: 'inline-block', animation: `bounce 1s ${j * 0.18}s ease-in-out infinite` }} />
                    ))}
                  </span>
                )}
                {isCurrentlyTyping && <>{formatMessage(typed)}<span style={{ display: 'inline-block', width: 2, height: 16, background: '#10a37f', marginLeft: 2, verticalAlign: 'middle', animation: 'blink 1s step-end infinite' }} /></>}
                {isVisible && !isThinking && !isCurrentlyTyping && formatMessage(msg.text)}
              </div>
            </div>
          )
        })}
      </div>

      {/* Input bar */}
      <div style={{ padding: '14px 24px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 12, background: '#161b22' }}>
        <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '10px 16px', fontSize: 14, color: 'rgba(255,255,255,0.25)' }}>Ask anything...</div>
        <span style={{ width: 36, height: 36, borderRadius: 10, background: '#10a37f', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8h12M9 3l5 5-5 5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </span>
      </div>

      <style>{`
        @keyframes bounce { 0%,100%{transform:translateY(0);opacity:.4} 50%{transform:translateY(-6px);opacity:1} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </div>
  )
}
