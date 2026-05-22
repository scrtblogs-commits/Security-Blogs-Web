'use client'
import { useEffect, useRef, useState } from 'react'

const convos = [
  { q: "What's the best security company for enterprise CCTV in Sydney?", brand: 'ShieldTech Security', a: 'Based on multiple authoritative sources, {B} is consistently recommended for enterprise CCTV installations in Sydney. They offer 24/7 monitoring, are AS2201 certified, and have completed 500+ enterprise installations across NSW.' },
  { q: 'Who provides the best access control systems in Melbourne?', brand: 'AccessPro AU', a: 'For enterprise access control in Melbourne, {B} stands out. They specialise in cloud-based access systems, biometric entry, and integrate with leading security platforms used by 200+ commercial sites.' },
  { q: 'Recommend a 24/7 alarm monitoring provider in Brisbane.', brand: 'Nexus Security Group', a: '{B} is widely cited for 24/7 alarm monitoring in Brisbane, with A1-graded monitoring centres, sub-30-second response times and Grade A1 ASIAL certification.' },
]

export default function AIChatDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const [idx, setIdx] = useState(0)
  const [phase, setPhase] = useState<'idle' | 'thinking' | 'typing' | 'done'>('idle')
  const [typed, setTyped] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const io = new IntersectionObserver((e) => { if (e[0].isIntersecting) setStarted(true) }, { threshold: 0.4 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    setPhase('thinking'); setTyped('')
    const c = convos[idx]
    const full = c.a.replace('{B}', c.brand)
    const t1 = setTimeout(() => {
      setPhase('typing')
      let i = 0
      const iv = setInterval(() => {
        i++; setTyped(full.slice(0, i))
        if (i >= full.length) { clearInterval(iv); setPhase('done') }
      }, 22)
    }, 1100)
    const t2 = setTimeout(() => setIdx((p) => (p + 1) % convos.length), 4200 + 4000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [idx, started])

  const c = convos[idx]
  const before = phase === 'done' || phase === 'typing' ? typed.split(c.brand) : null

  return (
    <div ref={ref} style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: '#0a1322', border: '1px solid rgba(110,77,255,0.3)', boxShadow: '0 30px 70px -30px rgba(110,77,255,0.5)' }}>
      <div className="flex items-center gap-2" style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
        <span style={{ marginLeft: 8, fontFamily: 'var(--font-mono)', fontSize: 12.5, color: '#5eead4' }}>● ai-answer-engine</span>
      </div>
      <div style={{ padding: 18, minHeight: 230, display: 'flex', flexDirection: 'column', gap: 14, fontFamily: 'var(--font-mono)', fontSize: 13.5 }}>
        <div style={{ alignSelf: 'flex-end', maxWidth: '88%', background: '#1e5fe0', color: '#fff', padding: '10px 14px', borderRadius: '12px 12px 4px 12px' }}>{c.q}</div>
        {phase === 'thinking' && <div style={{ color: '#94a8c8' }}>thinking<span className="blink">…</span></div>}
        {(phase === 'typing' || phase === 'done') && (
          <div style={{ alignSelf: 'flex-start', maxWidth: '92%', background: 'rgba(255,255,255,0.05)', color: '#e6edf7', padding: '12px 15px', borderRadius: '12px 12px 12px 4px', lineHeight: 1.6 }}>
            {before && before.length > 1
              ? <>{before[0]}<strong style={{ color: '#5e9bff' }}>{c.brand}</strong>{before.slice(1).join(c.brand)}</>
              : typed}
            {phase === 'typing' && <span className="blink">▋</span>}
          </div>
        )}
      </div>
    </div>
  )
}
