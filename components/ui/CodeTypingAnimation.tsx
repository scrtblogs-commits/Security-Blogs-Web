'use client'
import { useEffect, useRef, useState } from 'react'

const lines = [
  "import { LocalBusiness } from '@/schema'",
  '',
  'export default function SecuritySite() {',
  '  return (',
  '    <Layout schema={LocalBusiness}>',
  '      <Hero optimisedFor="ai-citation" />',
  '      <Services structuredData />',
  '    </Layout>',
  '  )',
  '}',
]

const statuses = [
  'Analysing security brand…',
  'Building page architecture…',
  'Injecting AI schema markup…',
  'Optimising for Core Web Vitals…',
  'Deploying to edge network…',
  '✓ Your site is live and AI-ready!',
]

export default function CodeTypingAnimation() {
  const ref = useRef<HTMLDivElement>(null)
  const [done, setDone] = useState<number>(-1)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const io = new IntersectionObserver((e) => { if (e[0].isIntersecting) setStarted(true) }, { threshold: 0.3 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    let i = 0
    const iv = setInterval(() => {
      i++; setDone(i)
      setProgress(Math.min(100, Math.round((i / lines.length) * 100)))
      setStatus(Math.min(statuses.length - 1, Math.floor((i / lines.length) * statuses.length)))
      if (i >= lines.length) { clearInterval(iv); setProgress(100); setStatus(statuses.length - 1) }
    }, 320)
    return () => clearInterval(iv)
  }, [started])

  return (
    <div ref={ref} className="grid-2" style={{ gap: 20, alignItems: 'stretch' }}>
      <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: '#0a1322', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="flex items-center gap-2" style={{ padding: '11px 15px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
          <span style={{ marginLeft: 8, fontFamily: 'var(--font-mono)', fontSize: 12, color: '#94a8c8' }}>page.tsx</span>
        </div>
        <pre style={{ margin: 0, padding: 16, fontFamily: 'var(--font-mono)', fontSize: 12.5, lineHeight: 1.7, color: '#cdd9ec', overflowX: 'auto' }}>
          {lines.map((ln, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, opacity: i < done ? 1 : 0.15, transition: 'opacity .2s' }}>
              <span style={{ color: i < done ? '#34d399' : 'transparent' }}>✓</span>
              <span style={{ color: '#5b6b85', width: 18, textAlign: 'right' }}>{i + 1}</span>
              <code>{ln || ' '}</code>
            </div>
          ))}
        </pre>
      </div>
      <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 18 }}>
        <div>
          <div className="flex justify-between" style={{ fontSize: 13, marginBottom: 8 }}><span className="text-soft">Build progress</span><strong className="accent">{progress}%</strong></div>
          <div className="meter"><span style={{ width: `${progress}%`, background: 'linear-gradient(90deg,var(--blue),var(--green))', transition: 'width .3s' }} /></div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {statuses.map((s, i) => (
            <div key={i} className="flex items-center gap-2" style={{ fontSize: 13.5, opacity: i <= status ? 1 : 0.35, color: i === statuses.length - 1 && i <= status ? 'var(--green)' : 'var(--text-soft)' }}>
              <span>{i < status || (i === statuses.length - 1 && status === i) ? '✓' : i === status ? '◐' : '○'}</span> {s}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
