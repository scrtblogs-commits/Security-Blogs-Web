'use client'
import { useEffect, useRef, useState } from 'react'

function useCountUp(target: number, duration = 1800, start = false) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!start) return
    let frame = 0
    const totalFrames = Math.round(duration / 16)
    const timer = setInterval(() => {
      frame++
      const progress = frame / totalFrames
      const ease = 1 - Math.pow(1 - progress, 3)
      setVal(Math.round(ease * target))
      if (frame >= totalFrames) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration, start])
  return val
}

const CHART_POINTS = [12, 18, 15, 24, 22, 31, 29, 38, 36, 45, 43, 54, 52, 63, 68, 74, 71, 82, 79, 91, 88, 96]

function SparkLine({ color, animate }: { color: string; animate: boolean }) {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    if (!animate) return
    let f = 0
    const total = 80
    const t = setInterval(() => {
      f++
      setProgress(f / total)
      if (f >= total) clearInterval(t)
    }, 18)
    return () => clearInterval(t)
  }, [animate])

  const w = 200, h = 56
  const pts = CHART_POINTS
  const max = Math.max(...pts), min = Math.min(...pts)
  const xs = pts.map((_, i) => (i / (pts.length - 1)) * w)
  const ys = pts.map(v => h - 8 - ((v - min) / (max - min)) * (h - 16))
  const visible = Math.max(2, Math.round(progress * pts.length))
  const vxs = xs.slice(0, visible)
  const vys = ys.slice(0, visible)
  const d = vxs.map((x, i) => `${i === 0 ? 'M' : 'L'}${x},${vys[i]}`).join(' ')
  const fill = vxs.length > 1
    ? `${d} L${vxs[vxs.length - 1]},${h} L${vxs[0]},${h} Z`
    : ''

  return (
    <svg width={w} height={h} style={{ overflow: 'visible' }}>
      {fill && <path d={fill} fill={color} opacity={0.12} />}
      {d && <path d={d} fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />}
      {vxs.length > 0 && (
        <circle cx={vxs[vxs.length - 1]} cy={vys[vys.length - 1]} r={4} fill={color} />
      )}
    </svg>
  )
}

function BarChart({ animate }: { animate: boolean }) {
  const bars = [32, 48, 41, 58, 53, 67, 62, 78, 74, 88, 85, 94]
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    if (!animate) return
    let f = 0
    const t = setInterval(() => { f++; setProgress(Math.min(1, f / 60)); if (f >= 60) clearInterval(t) }, 20)
    return () => clearInterval(t)
  }, [animate])
  const h = 48
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: h }}>
      {bars.map((v, i) => (
        <div key={i} style={{
          width: 12, borderRadius: 3,
          background: i === bars.length - 1 ? '#3b82f6' : i % 3 === 0 ? '#6366f1' : '#e2e8f0',
          height: Math.round((v / 100) * h * progress),
          transition: 'none',
          alignSelf: 'flex-end',
        }} />
      ))}
    </div>
  )
}

function DonutRing({ value, color, animate }: { value: number; color: string; animate: boolean }) {
  const [p, setP] = useState(0)
  useEffect(() => {
    if (!animate) return
    let f = 0
    const t = setInterval(() => { f++; setP(Math.min(1, f / 70)); if (f >= 70) clearInterval(t) }, 20)
    return () => clearInterval(t)
  }, [animate])
  const r = 28, cx = 34, cy = 34, stroke = 6
  const circ = 2 * Math.PI * r
  const dash = circ * (value / 100) * p
  return (
    <svg width={68} height={68}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e2e8f0" strokeWidth={stroke} />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cy})`} />
    </svg>
  )
}

export default function HeroDashboard() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const impressions = useCountUp(284700, 2000, visible)
  const citations = useCountUp(1847, 1800, visible)
  const authority = useCountUp(84, 1600, visible)
  const rankImprove = useCountUp(312, 1900, visible)

  const fmt = (n: number) => n >= 1000 ? (n / 1000).toFixed(n >= 100000 ? 0 : 1) + 'k' : n.toString()

  return (
    <div ref={ref} style={{
      background: '#f8f9fc',
      borderRadius: 24,
      padding: '28px 28px 24px',
      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.07), 0 20px 60px -10px rgba(59,130,246,0.12)',
      border: '1px solid rgba(226,232,240,0.8)',
      maxWidth: 820,
      margin: '0 auto',
      fontFamily: 'var(--font-sans, -apple-system, BlinkMacSystemFont, sans-serif)',
    }}>

      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 0 3px rgba(34,197,94,0.2)' }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: '#64748b', letterSpacing: '0.06em', textTransform: 'uppercase' }}>AI Visibility Dashboard · Live</span>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {['7D','30D','90D'].map((l, i) => (
            <button key={l} style={{ padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600, border: 'none', cursor: 'default',
              background: i === 2 ? '#3b82f6' : 'transparent', color: i === 2 ? '#fff' : '#94a3b8' }}>{l}</button>
          ))}
        </div>
      </div>

      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
        {[
          { label: 'Search Impressions', val: fmt(impressions), suffix: '', delta: '+41%', color: '#3b82f6' },
          { label: 'AI Citations', val: fmt(citations), suffix: '', delta: '+128%', color: '#6366f1' },
          { label: 'Authority Score', val: authority.toString(), suffix: '/100', delta: '+18pts', color: '#10b981' },
          { label: 'Rankings Gained', val: rankImprove.toString(), suffix: '', delta: '+312', color: '#f59e0b' },
        ].map(k => (
          <div key={k.label} style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{k.label}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em' }}>
              {k.val}<span style={{ fontSize: 12, fontWeight: 500, color: '#94a3b8' }}>{k.suffix}</span>
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#22c55e', marginTop: 4 }}>↑ {k.delta} <span style={{ color: '#cbd5e1', fontWeight: 400 }}>vs last period</span></div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 12 }}>

        {/* Keyword growth chart */}
        <div style={{ background: '#fff', borderRadius: 14, padding: '16px', border: '1px solid #f1f5f9', gridColumn: 'span 1' }}>
          <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Keyword Growth</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 10 }}>2,841 <span style={{ fontSize: 11, color: '#22c55e', fontWeight: 700 }}>↑ 94%</span></div>
          <SparkLine color="#3b82f6" animate={visible} />
        </div>

        {/* AI Visibility score donut */}
        <div style={{ background: '#fff', borderRadius: 14, padding: '16px', border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>AI Visibility</div>
          <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <DonutRing value={87} color="#6366f1" animate={visible} />
            <span style={{ position: 'absolute', fontSize: 16, fontWeight: 800, color: '#0f172a' }}>87</span>
          </div>
          <div style={{ fontSize: 11, color: '#6366f1', fontWeight: 700, marginTop: 4 }}>Excellent</div>
        </div>

        {/* Monthly traffic bars */}
        <div style={{ background: '#fff', borderRadius: 14, padding: '16px', border: '1px solid #f1f5f9' }}>
          <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Monthly Traffic</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 10 }}>18.4k <span style={{ fontSize: 11, color: '#22c55e', fontWeight: 700 }}>↑ 67%</span></div>
          <BarChart animate={visible} />
        </div>
      </div>

      {/* Bottom row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>

        {/* AI Citation tracker */}
        <div style={{ background: '#fff', borderRadius: 14, padding: '16px', border: '1px solid #f1f5f9' }}>
          <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>AI Citation Tracker</div>
          {[
            { name: 'ChatGPT', pct: 94, color: '#10b981' },
            { name: 'Gemini', pct: 81, color: '#3b82f6' },
            { name: 'Perplexity', pct: 76, color: '#6366f1' },
            { name: 'Claude', pct: 68, color: '#f59e0b' },
          ].map(r => (
            <div key={r.name} style={{ marginBottom: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#475569' }}>{r.name}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: r.color }}>{r.pct}%</span>
              </div>
              <div style={{ height: 5, background: '#f1f5f9', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: visible ? `${r.pct}%` : '0%', background: r.color, borderRadius: 3, transition: 'width 1.4s cubic-bezier(0.16,1,0.3,1)' }} />
              </div>
            </div>
          ))}
        </div>

        {/* GEO + Local scores */}
        <div style={{ background: '#fff', borderRadius: 14, padding: '16px', border: '1px solid #f1f5f9' }}>
          <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>GEO Performance</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[
              { city: 'Sydney', score: 91, color: '#3b82f6' },
              { city: 'Melbourne', score: 88, color: '#6366f1' },
              { city: 'Brisbane', score: 79, color: '#10b981' },
              { city: 'Perth', score: 72, color: '#f59e0b' },
            ].map(c => (
              <div key={c.city} style={{ background: '#f8f9fc', borderRadius: 10, padding: '10px 12px', textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: c.color }}>{visible ? c.score : 0}</div>
                <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 600 }}>{c.city}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 10, padding: '8px 12px', background: 'linear-gradient(135deg, #eff6ff, #eef2ff)', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 16 }}>🏆</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#3b82f6' }}>Top AU security brand in AI answers</span>
          </div>
        </div>
      </div>
    </div>
  )
}
