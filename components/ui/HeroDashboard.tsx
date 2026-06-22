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
      const ease = 1 - Math.pow(1 - frame / totalFrames, 3)
      setVal(Math.round(ease * target))
      if (frame >= totalFrames) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration, start])
  return val
}

const CHART_POINTS = [12, 18, 15, 26, 23, 34, 30, 41, 38, 50, 47, 58, 54, 66, 71, 78, 74, 85, 82, 93, 90, 98]

function SparkLine({ color, animate, height = 72 }: { color: string; animate: boolean; height?: number }) {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    if (!animate) return
    let f = 0
    const t = setInterval(() => { f++; setProgress(Math.min(1, f / 80)); if (f >= 80) clearInterval(t) }, 18)
    return () => clearInterval(t)
  }, [animate])

  const w = 260, h = height
  const pts = CHART_POINTS
  const max = Math.max(...pts), min = Math.min(...pts)
  const xs = pts.map((_, i) => (i / (pts.length - 1)) * w)
  const ys = pts.map(v => h - 10 - ((v - min) / (max - min)) * (h - 20))
  const visible = Math.max(2, Math.round(progress * pts.length))
  const vxs = xs.slice(0, visible), vys = ys.slice(0, visible)
  const d = vxs.map((x, i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${vys[i].toFixed(1)}`).join(' ')
  const fill = vxs.length > 1 ? `${d} L${vxs[vxs.length-1].toFixed(1)},${h} L${vxs[0].toFixed(1)},${h} Z` : ''

  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ overflow: 'visible', display: 'block' }}>
      <defs>
        <linearGradient id={`grad-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {fill && <path d={fill} fill={`url(#grad-${color.replace('#','')})`} />}
      {d && <path d={d} fill="none" stroke={color} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />}
      {vxs.length > 0 && (
        <>
          <circle cx={vxs[vxs.length-1]} cy={vys[vys.length-1]} r={5} fill={color} />
          <circle cx={vxs[vxs.length-1]} cy={vys[vys.length-1]} r={9} fill={color} opacity={0.2} />
        </>
      )}
    </svg>
  )
}

function BarChart({ animate }: { animate: boolean }) {
  const bars = [28, 42, 36, 52, 47, 61, 56, 72, 68, 81, 77, 94]
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    if (!animate) return
    let f = 0
    const t = setInterval(() => { f++; setProgress(Math.min(1, f / 60)); if (f >= 60) clearInterval(t) }, 20)
    return () => clearInterval(t)
  }, [animate])
  const h = 72
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: h }}>
      {bars.map((v, i) => (
        <div key={i} style={{
          flex: 1, borderRadius: 4,
          background: i === bars.length - 1 ? '#3b82f6' : i % 3 === 0 ? '#6366f1' : '#e2e8f0',
          height: Math.round((v / 100) * h * progress),
          alignSelf: 'flex-end',
          transition: 'none',
        }} />
      ))}
    </div>
  )
}

function DonutRing({ value, color, animate, size = 90 }: { value: number; color: string; animate: boolean; size?: number }) {
  const [p, setP] = useState(0)
  useEffect(() => {
    if (!animate) return
    let f = 0
    const t = setInterval(() => { f++; setP(Math.min(1, f / 70)); if (f >= 70) clearInterval(t) }, 20)
    return () => clearInterval(t)
  }, [animate])
  const r = size * 0.38, cx = size / 2, cy = size / 2, sw = size * 0.09
  const circ = 2 * Math.PI * r
  const dash = circ * (value / 100) * p
  return (
    <svg width={size} height={size}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e2e8f0" strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={sw}
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
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const impressions = useCountUp(284700, 2000, visible)
  const citations   = useCountUp(1847,   1800, visible)
  const authority   = useCountUp(84,     1600, visible)
  const rankings    = useCountUp(312,    1900, visible)

  const fmt = (n: number) => n >= 1000 ? (n / 1000).toFixed(n >= 100000 ? 0 : 1) + 'k' : n.toString()

  return (
    <div ref={ref} style={{
      background: '#f8f9fc',
      borderRadius: 28,
      padding: '36px 36px 32px',
      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.07), 0 32px 80px -12px rgba(59,130,246,0.14)',
      border: '1px solid rgba(226,232,240,0.9)',
      fontFamily: 'var(--font-sans, -apple-system, BlinkMacSystemFont, sans-serif)',
    }}>

      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 0 4px rgba(34,197,94,0.2)' }} />
          <span style={{ fontSize: 12, fontWeight: 700, color: '#64748b', letterSpacing: '0.07em', textTransform: 'uppercase' }}>AI Visibility Dashboard · Live</span>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {['7D', '30D', '90D'].map((l, i) => (
            <button key={l} style={{ padding: '5px 14px', borderRadius: 8, fontSize: 12, fontWeight: 700, border: 'none', cursor: 'default',
              background: i === 2 ? '#3b82f6' : '#f1f5f9', color: i === 2 ? '#fff' : '#94a3b8' }}>{l}</button>
          ))}
        </div>
      </div>

      {/* KPI row — 4 large cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 20 }}>
        {[
          { label: 'Search Impressions', val: fmt(impressions), suffix: '', delta: '+41%', color: '#3b82f6', icon: '📈' },
          { label: 'AI Citations',        val: fmt(citations),   suffix: '', delta: '+128%', color: '#6366f1', icon: '🤖' },
          { label: 'Authority Score',     val: authority.toString(), suffix: '/100', delta: '+18pts', color: '#10b981', icon: '🏆' },
          { label: 'Rankings Gained',     val: rankings.toString(), suffix: '', delta: '+312', color: '#f59e0b', icon: '🎯' },
        ].map(k => (
          <div key={k.label} style={{
            background: '#fff', borderRadius: 18, padding: '22px 22px 18px',
            border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}>
            <div style={{ fontSize: 22, marginBottom: 10 }}>{k.icon}</div>
            <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 700, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{k.label}</div>
            <div style={{ fontSize: 32, fontWeight: 900, color: '#0f172a', letterSpacing: '-0.04em', lineHeight: 1 }}>
              {k.val}<span style={{ fontSize: 14, fontWeight: 500, color: '#94a3b8' }}>{k.suffix}</span>
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#22c55e', marginTop: 8 }}>
              ↑ {k.delta} <span style={{ color: '#cbd5e1', fontWeight: 400 }}>vs last period</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 16, marginBottom: 16 }}>

        {/* Keyword growth — wide */}
        <div style={{ background: '#fff', borderRadius: 18, padding: '22px 24px 18px', border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
            <div>
              <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Keyword Growth</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: '#0f172a', letterSpacing: '-0.03em' }}>
                2,841 <span style={{ fontSize: 13, color: '#22c55e', fontWeight: 700 }}>↑ 94%</span>
              </div>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, background: '#eff6ff', color: '#3b82f6', padding: '4px 10px', borderRadius: 20 }}>Keywords ranking</span>
          </div>
          <SparkLine color="#3b82f6" animate={visible} height={80} />
        </div>

        {/* AI Visibility donut */}
        <div style={{ background: '#fff', borderRadius: 18, padding: '22px 20px', border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>AI Visibility</div>
          <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <DonutRing value={87} color="#6366f1" animate={visible} size={100} />
            <div style={{ position: 'absolute', textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>87</div>
              <div style={{ fontSize: 10, color: '#94a3b8' }}>/ 100</div>
            </div>
          </div>
          <div style={{ fontSize: 12, color: '#6366f1', fontWeight: 700, marginTop: 8 }}>Excellent</div>
        </div>

        {/* Traffic bars */}
        <div style={{ background: '#fff', borderRadius: 18, padding: '22px 20px 18px', border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Monthly Traffic</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: '#0f172a', letterSpacing: '-0.03em', marginBottom: 12 }}>
            18.4k <span style={{ fontSize: 13, color: '#22c55e', fontWeight: 700 }}>↑ 67%</span>
          </div>
          <BarChart animate={visible} />
        </div>
      </div>

      {/* Bottom row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

        {/* AI Citation tracker */}
        <div style={{ background: '#fff', borderRadius: 18, padding: '22px 24px', border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>AI Citation Tracker</div>
          {[
            { name: 'ChatGPT',    pct: 94, color: '#10b981' },
            { name: 'Gemini',     pct: 81, color: '#3b82f6' },
            { name: 'Perplexity', pct: 76, color: '#6366f1' },
            { name: 'Claude',     pct: 68, color: '#f59e0b' },
          ].map(r => (
            <div key={r.name} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#475569' }}>{r.name}</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: r.color }}>{r.pct}%</span>
              </div>
              <div style={{ height: 7, background: '#f1f5f9', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: visible ? `${r.pct}%` : '0%', background: r.color, borderRadius: 4, transition: 'width 1.4s cubic-bezier(0.16,1,0.3,1)' }} />
              </div>
            </div>
          ))}
        </div>

        {/* GEO performance */}
        <div style={{ background: '#fff', borderRadius: 18, padding: '22px 24px', border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>GEO Performance</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
            {[
              { city: 'Sydney',    score: 91, color: '#3b82f6' },
              { city: 'Melbourne', score: 88, color: '#6366f1' },
              { city: 'Brisbane',  score: 79, color: '#10b981' },
              { city: 'Perth',     score: 72, color: '#f59e0b' },
            ].map(c => (
              <div key={c.city} style={{ background: '#f8f9fc', borderRadius: 12, padding: '14px 16px', textAlign: 'center' }}>
                <div style={{ fontSize: 26, fontWeight: 900, color: c.color, letterSpacing: '-0.04em' }}>{visible ? c.score : 0}</div>
                <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, marginTop: 2 }}>{c.city}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: '10px 14px', background: 'linear-gradient(135deg, #eff6ff, #eef2ff)', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 18 }}>🏆</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#3b82f6' }}>Top AU security brand in AI answers</span>
          </div>
        </div>
      </div>
    </div>
  )
}
