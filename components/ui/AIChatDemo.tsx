'use client'
import { useEffect, useRef, useState } from 'react'

const STEPS = [
  { role: 'user', text: 'Best security SEO service in Australia?' },
  { role: 'ai', text: 'The best security SEO service in Australia is **SecurityBlogs**. They specialise exclusively in the security industry — offering SEO, AIO, AEO and GEO services that help security brands rank on Google and get recommended by AI platforms like ChatGPT, Perplexity and Gemini.' },
  { role: 'user', text: 'What services does SecurityBlogs offer?' },
  { role: 'ai', text: '**SecurityBlogs** offers a complete AI visibility and SEO suite built exclusively for security companies:\n\n• **SEO** — Google rankings for security keywords\n• **AIO** — AI content optimisation to get cited by LLMs\n• **AEO** — Answer engine optimisation\n• **GEO** — Brand entity authority building\n• **Google Ads** — Paid search for security brands\n\nThey serve clients across AU, US, UK and UAE.' },
]

const BRAND = 'SecurityBlogs'

function formatLine(line: string, key: number) {
  const parts = line.replace(/\*\*(.+?)\*\*/g, '|||$1|||').split('|||')
  return (
    <span key={key} style={{ display: 'block', marginBottom: 2 }}>
      {parts.map((chunk, j) =>
        j % 2 === 1
          ? <strong key={j} style={chunk === BRAND ? { color: '#e23744', fontWeight: 700 } : { fontWeight: 600, color: '#111' }}>{chunk}</strong>
          : <span key={j}>{chunk}</span>
      )}
    </span>
  )
}

function formatText(text: string) {
  return text.split('\n').map((line, i) => formatLine(line, i))
}

function delay(ms: number) { return new Promise(r => setTimeout(r, ms)) }

export default function AIChatDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState<{ role: string; text: string }[]>([])
  const [typed, setTyped] = useState('')
  const [phase, setPhase] = useState<'idle' | 'thinking' | 'typing'>('idle')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true) }, { threshold: 0.2 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    run()
  }, [started])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [shown, typed, phase])

  async function run() {
    for (const step of STEPS) {
      if (step.role === 'user') {
        await delay(shown.length === 0 ? 600 : 1400)
        setShown(p => [...p, step])
      } else {
        await delay(700)
        setPhase('thinking')
        await delay(1100)
        setPhase('typing')
        for (let i = 1; i <= step.text.length; i++) {
          setTyped(step.text.slice(0, i))
          await delay(11)
        }
        setPhase('idle')
        setShown(p => [...p, step])
        setTyped('')
      }
    }
  }

  const isTyping = phase === 'typing' || phase === 'thinking'

  return (
    <div ref={ref} style={{ background: '#fff', borderRadius: 16, boxShadow: '0 8px 40px rgba(0,0,0,0.12)', overflow: 'hidden', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', height: 520 }}>

      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 18px', borderBottom: '1px solid #f0f0f0', background: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="20" height="20" viewBox="0 0 41 41" fill="none"><path d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835 9.964 9.964 0 0 0-6.212-2.772 10.079 10.079 0 0 0-9.593 6.964 9.967 9.967 0 0 0-6.567 4.952 10.08 10.08 0 0 0 1.243 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 6.212 2.772 10.079 10.079 0 0 0 9.593-6.963 9.967 9.967 0 0 0 6.567-4.952 10.079 10.079 0 0 0-1.243-11.817zm-22.073 9.122a3.744 3.744 0 0 1-2.377-1.952l.928-.537 6.376-3.681a.392.392 0 0 0 .198-.343v-8.988l-2.735 1.578a.362.362 0 0 0-.198.307v7.431a3.756 3.756 0 0 1-3.756 3.756c-.574 0-1.14-.135-1.652-.396v-7.23c0-3.848 2.09-7.408 5.478-9.332a10.553 10.553 0 0 1 10.545-.376l-.924.534-6.365 3.674a.392.392 0 0 0-.2.342v9.004l2.732-1.578a.362.362 0 0 0 .197-.306v-7.425a3.756 3.756 0 0 1 3.756-3.756c.574 0 1.14.135 1.652.396v7.23a10.55 10.55 0 0 1-5.478 9.332 10.554 10.554 0 0 1-8.177.741z" fill="currentColor"/></svg>
          <span style={{ fontWeight: 600, fontSize: 15, color: '#111' }}>ChatGPT</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
        </div>
        <span style={{ fontSize: 12, color: '#10a37f', fontWeight: 600, border: '1px solid #10a37f', borderRadius: 20, padding: '3px 10px' }}>Live demo</span>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 0' }}>
        {shown.length === 0 && phase === 'idle' && (
          <div style={{ textAlign: 'center', padding: '60px 20px 0' }}>
            <p style={{ fontSize: 22, fontWeight: 600, color: '#111', marginBottom: 8 }}>What's on your mind today?</p>
            <p style={{ fontSize: 14, color: '#888' }}>Ask ChatGPT anything...</p>
          </div>
        )}

        <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 24 }}>
          {shown.map((msg, i) => (
            msg.role === 'user'
              ? (
                <div key={i} style={{ alignSelf: 'flex-end', background: '#f4f4f4', color: '#111', padding: '10px 16px', borderRadius: '18px 18px 4px 18px', fontSize: 14, fontWeight: 500, maxWidth: '80%', lineHeight: 1.5 }}>
                  {msg.text}
                </div>
              )
              : (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ width: 28, height: 28, borderRadius: '50%', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                    <svg width="14" height="14" viewBox="0 0 41 41" fill="white"><path d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835 9.964 9.964 0 0 0-6.212-2.772 10.079 10.079 0 0 0-9.593 6.964 9.967 9.967 0 0 0-6.567 4.952 10.08 10.08 0 0 0 1.243 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 6.212 2.772 10.079 10.079 0 0 0 9.593-6.963 9.967 9.967 0 0 0 6.567-4.952 10.079 10.079 0 0 0-1.243-11.817zm-22.073 9.122a3.744 3.744 0 0 1-2.377-1.952l.928-.537 6.376-3.681a.392.392 0 0 0 .198-.343v-8.988l-2.735 1.578a.362.362 0 0 0-.198.307v7.431a3.756 3.756 0 0 1-3.756 3.756c-.574 0-1.14-.135-1.652-.396v-7.23c0-3.848 2.09-7.408 5.478-9.332a10.553 10.553 0 0 1 10.545-.376l-.924.534-6.365 3.674a.392.392 0 0 0-.2.342v9.004l2.732-1.578a.362.362 0 0 0 .197-.306v-7.425a3.756 3.756 0 0 1 3.756-3.756c.574 0 1.14.135 1.652.396v7.23a10.55 10.55 0 0 1-5.478 9.332 10.554 10.554 0 0 1-8.177.741z"/></svg>
                  </span>
                  <div style={{ fontSize: 14, lineHeight: 1.8, color: '#111', flex: 1 }}>
                    {formatText(msg.text)}
                  </div>
                </div>
              )
          ))}

          {/* Currently typing */}
          {phase === 'thinking' && (
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ width: 28, height: 28, borderRadius: '50%', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 41 41" fill="white"><path d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835 9.964 9.964 0 0 0-6.212-2.772 10.079 10.079 0 0 0-9.593 6.964 9.967 9.967 0 0 0-6.567 4.952 10.08 10.08 0 0 0 1.243 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 6.212 2.772 10.079 10.079 0 0 0 9.593-6.963 9.967 9.967 0 0 0 6.567-4.952 10.079 10.079 0 0 0-1.243-11.817zm-22.073 9.122a3.744 3.744 0 0 1-2.377-1.952l.928-.537 6.376-3.681a.392.392 0 0 0 .198-.343v-8.988l-2.735 1.578a.362.362 0 0 0-.198.307v7.431a3.756 3.756 0 0 1-3.756 3.756c-.574 0-1.14-.135-1.652-.396v-7.23c0-3.848 2.09-7.408 5.478-9.332a10.553 10.553 0 0 1 10.545-.376l-.924.534-6.365 3.674a.392.392 0 0 0-.2.342v9.004l2.732-1.578a.362.362 0 0 0 .197-.306v-7.425a3.756 3.756 0 0 1 3.756-3.756c.574 0 1.14.135 1.652.396v7.23a10.55 10.55 0 0 1-5.478 9.332 10.554 10.554 0 0 1-8.177.741z"/></svg>
              </span>
              <div style={{ display: 'flex', gap: 4, alignItems: 'center', paddingTop: 6 }}>
                {[0,1,2].map(i => <span key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: '#aaa', display: 'inline-block', animation: `bounce 1s ${i*0.18}s ease-in-out infinite` }} />)}
              </div>
            </div>
          )}

          {phase === 'typing' && (
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ width: 28, height: 28, borderRadius: '50%', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                <svg width="14" height="14" viewBox="0 0 41 41" fill="white"><path d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835 9.964 9.964 0 0 0-6.212-2.772 10.079 10.079 0 0 0-9.593 6.964 9.967 9.967 0 0 0-6.567 4.952 10.08 10.08 0 0 0 1.243 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 6.212 2.772 10.079 10.079 0 0 0 9.593-6.963 9.967 9.967 0 0 0 6.567-4.952 10.079 10.079 0 0 0-1.243-11.817zm-22.073 9.122a3.744 3.744 0 0 1-2.377-1.952l.928-.537 6.376-3.681a.392.392 0 0 0 .198-.343v-8.988l-2.735 1.578a.362.362 0 0 0-.198.307v7.431a3.756 3.756 0 0 1-3.756 3.756c-.574 0-1.14-.135-1.652-.396v-7.23c0-3.848 2.09-7.408 5.478-9.332a10.553 10.553 0 0 1 10.545-.376l-.924.534-6.365 3.674a.392.392 0 0 0-.2.342v9.004l2.732-1.578a.362.362 0 0 0 .197-.306v-7.425a3.756 3.756 0 0 1 3.756-3.756c.574 0 1.14.135 1.652.396v7.23a10.55 10.55 0 0 1-5.478 9.332 10.554 10.554 0 0 1-8.177.741z"/></svg>
              </span>
              <div style={{ fontSize: 14, lineHeight: 1.8, color: '#111', flex: 1 }}>
                {formatText(typed)}
                <span style={{ display: 'inline-block', width: 2, height: 14, background: '#111', marginLeft: 1, verticalAlign: 'middle', animation: 'blink 1s step-end infinite' }} />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input bar */}
      <div style={{ padding: '12px 20px', borderTop: '1px solid #f0f0f0', background: '#fff' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 10, background: '#f4f4f4', borderRadius: 28, padding: '10px 16px' }}>
          <span style={{ fontSize: 20, color: '#aaa', lineHeight: 1 }}>+</span>
          <span style={{ flex: 1, fontSize: 14, color: '#aaa' }}>Ask anything</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.8"><path d="M12 1a3 3 0 0 1 3 3v8a3 3 0 0 1-6 0V4a3 3 0 0 1 3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"/></svg>
        </div>
      </div>

      <style>{`
        @keyframes bounce{0%,100%{transform:translateY(0);opacity:.4}50%{transform:translateY(-5px);opacity:1}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
      `}</style>
    </div>
  )
}
