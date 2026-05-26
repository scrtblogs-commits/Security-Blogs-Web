'use client'
import { useEffect, useRef, useState } from 'react'

// TODO([[FILL: confirm placeholder hero-dashboard values or replace with real data]])
// The hero "AI Visibility Score 87/100", the four sub-scores below, and the
// "↑ +180% organic" badge are currently decorative placeholders. Either wire
// them to a real per-visitor / per-client lookup, or label the widget as a
// "sample dashboard" / "what your dashboard looks like" so it isn't read as
// a real-time live score for the visitor.
const rows = [
  { label: 'Content structure', value: 87, color: 'var(--blue)'   },
  { label: 'Entity authority',  value: 72, color: 'var(--violet)' },
  { label: 'Schema coverage',   value: 91, color: 'var(--green)'  },
  { label: 'AI citation rate',  value: 79, color: 'var(--red)'    },
]

export default function AIVisibilityScore() {
  const ref = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver((e) => { if (e[0].isIntersecting) setShow(true) }, { threshold: 0.3 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className="glass" style={{ padding: 26 }}>
      <div className="flex justify-between items-center" style={{ marginBottom: 20 }}>
        <div>
          <div className="eyebrow">AI Visibility Score</div>
          <div className="text-dim" style={{ fontSize: 13 }}>Live snapshot</div>
        </div>
        <div style={{ fontSize: 46, fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--blue)', lineHeight: 1 }}>87<span className="text-dim" style={{ fontSize: 18 }}>/100</span></div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
        {rows.map((r) => (
          <div key={r.label}>
            <div className="flex justify-between" style={{ fontSize: 13, marginBottom: 6 }}><span className="text-soft">{r.label}</span><strong>{r.value}%</strong></div>
            <div className="meter"><span style={{ width: show ? `${r.value}%` : 0, background: r.color, transition: 'width 1s cubic-bezier(.2,.8,.2,1)' }} /></div>
          </div>
        ))}
      </div>
      <div className="badge" style={{ marginTop: 18, color: 'var(--green)', borderColor: 'rgba(30,158,117,0.3)', background: 'rgba(30,158,117,0.1)' }}>↑ +180% organic</div>
    </div>
  )
}
