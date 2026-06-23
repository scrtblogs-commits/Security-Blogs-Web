'use client'
import { useEffect, useRef, useState } from 'react'

// ── Data ──────────────────────────────────────────────────────────────────────
// 90 daily data points spanning Apr 1 → Jun 29 (realistic GSC-style variance)
const RAW_CLICKS = [
  62,120,188,95,210,340,155,88,260,410,195,310,540,280,165,390,620,
  245,180,430,700,310,220,480,800,355,260,590,380,195,440,760,290,210,
  520,840,370,255,610,410,225,480,780,330,245,570,390,210,460,730,295,
  230,540,860,395,275,630,420,235,490,800,345,255,580,395,220,470,750,
  310,245,555,870,400,280,645,435,250,505,820,355,260,595,405,228,485,
  810,360,268,620,
]
const RAW_IMPS = RAW_CLICKS.map((c, i) =>
  Math.round(c * (18 + Math.sin(i * 0.4) * 4 + Math.random() * 3))
)

// Month boundary indices (0-based)
const MONTHS = [
  { label: 'April', start: 0, end: 29 },
  { label: 'May',   start: 30, end: 60 },
  { label: 'June',  start: 61, end: 89 },
]

const TOTAL_CLICKS = 24800
const TOTAL_IMPS   = 1750000

function fmt(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'
  if (n >= 1_000)     return (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'k'
  return String(n)
}

function useCountUp(target: number, active: boolean, duration = 1600) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    let start: number | null = null
    let raf: number
    const step = (ts: number) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(target * ease))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [active, target, duration])
  return val
}

// ── SVG helpers ───────────────────────────────────────────────────────────────
function buildPath(points: [number, number][]) {
  return points
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`)
    .join(' ')
}

export default function HeroGraph() {
  const [phase, setPhase] = useState<'idle' | 'kpi' | 'draw' | 'live'>('idle')
  const [drawPct, setDrawPct] = useState(0)      // 0→1 line draw progress
  const [visibleMonths, setVisibleMonths] = useState<number[]>([])
  const [pulseIdx, setPulseIdx] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const drawRaf = useRef<number>(0)
  const drawStart = useRef<number | null>(null)
  const DRAW_DURATION = 2200

  // IntersectionObserver triggers the sequence
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setPhase('kpi'); obs.disconnect() } },
      { threshold: 0.3 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Phase transitions
  useEffect(() => {
    if (phase === 'kpi') {
      const t = setTimeout(() => setPhase('draw'), 1800)
      return () => clearTimeout(t)
    }
    if (phase === 'draw') {
      drawStart.current = null
      const step = (ts: number) => {
        if (!drawStart.current) drawStart.current = ts
        const p = Math.min((ts - drawStart.current) / DRAW_DURATION, 1)
        setDrawPct(p)

        // Reveal month labels as lines cross their midpoint
        const midpoints = [0.17, 0.5, 0.83]
        setVisibleMonths(midpoints.map((m, i) => (p >= m ? i : -1)).filter((i) => i >= 0))

        if (p < 1) drawRaf.current = requestAnimationFrame(step)
        else setPhase('live')
      }
      drawRaf.current = requestAnimationFrame(step)
      return () => cancelAnimationFrame(drawRaf.current)
    }
    if (phase === 'live') {
      // Cycle pulsing dots
      let idx = RAW_CLICKS.length - 1
      const id = setInterval(() => {
        idx = Math.max(0, idx - Math.floor(Math.random() * 3 + 1))
        if (idx <= 0) idx = RAW_CLICKS.length - 1
        setPulseIdx(idx)
      }, 900)
      return () => clearInterval(id)
    }
  }, [phase])

  // ── Chart geometry ────────────────────────────────────────────────────────
  const W = 700, H = 220
  const PAD = { top: 18, right: 28, bottom: 32, left: 50 }
  const innerW = W - PAD.left - PAD.right
  const innerH = H - PAD.top - PAD.bottom

  const N = RAW_CLICKS.length
  const maxC = Math.max(...RAW_CLICKS)
  const maxI = Math.max(...RAW_IMPS)

  const cx = (i: number) => PAD.left + (i / (N - 1)) * innerW
  const cy = (v: number, max: number) => PAD.top + innerH - (v / max) * innerH

  const clickPts: [number, number][] = RAW_CLICKS.map((v, i) => [cx(i), cy(v, maxC)])
  const impPts:   [number, number][] = RAW_IMPS.map((v, i)   => [cx(i), cy(v, maxI)])

  // Clip visible portion by drawPct
  const visibleN = Math.max(2, Math.round(drawPct * (N - 1)) + 1)
  const clickPath = buildPath(clickPts.slice(0, visibleN))
  const impPath   = buildPath(impPts.slice(0, visibleN))

  // Y-axis ticks
  const clickTicks = [0, 200, 400, 600, 800, 1000]
  const impTicks   = [0, 7000, 14000, 21000, 28000, 35000]

  // KPI count-up values
  const clicksVal = useCountUp(TOTAL_CLICKS, phase !== 'idle')
  const impsVal   = useCountUp(TOTAL_IMPS,   phase !== 'idle', 1900)

  return (
    <div ref={containerRef} style={{
      background: '#f8f9fc',
      borderRadius: 16,
      border: '1px solid #e2e8f0',
      boxShadow: '0 4px 32px rgba(0,0,0,0.07)',
      padding: '20px 24px 16px',
      userSelect: 'none',
    }}>
      {/* KPI Cards */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 18, flexWrap: 'wrap' }}>
        <KpiCard
          label="Total Clicks"
          value={fmt(clicksVal)}
          color1="#6b21a8"
          color2="#4f46e5"
          active={phase !== 'idle'}
        />
        <KpiCard
          label="Total Impressions"
          value={fmt(impsVal)}
          color1="#0369a1"
          color2="#0ea5e9"
          active={phase !== 'idle'}
        />
      </div>

      {/* Chart */}
      <div style={{ position: 'relative', width: '100%', overflowX: 'hidden' }}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          style={{ width: '100%', height: 'auto', display: 'block' }}
          aria-hidden="true"
        >
          {/* Horizontal grid lines */}
          {clickTicks.map((t, i) => (
            <line
              key={i}
              x1={PAD.left} y1={cy(t, maxC)}
              x2={W - PAD.right} y2={cy(t, maxC)}
              stroke="#e2e8f0" strokeWidth={0.8}
            />
          ))}

          {/* Left Y-axis — Clicks */}
          {clickTicks.map((t, i) => (
            <text key={i} x={PAD.left - 6} y={cy(t, maxC) + 4}
              textAnchor="end" fontSize={9} fill="#94a3b8" fontFamily="system-ui,sans-serif">
              {t === 0 ? '0' : t >= 1000 ? t / 1000 + 'k' : t}
            </text>
          ))}
          <text x={PAD.left - 34} y={PAD.top + innerH / 2} textAnchor="middle"
            fontSize={9} fill="#94a3b8" fontFamily="system-ui,sans-serif"
            transform={`rotate(-90,${PAD.left - 34},${PAD.top + innerH / 2})`}>
            Clicks
          </text>

          {/* Right Y-axis — Impressions */}
          {impTicks.map((t, i) => (
            <text key={i} x={W - PAD.right + 6} y={cy(t, maxI) + 4}
              textAnchor="start" fontSize={9} fill="#94a3b8" fontFamily="system-ui,sans-serif">
              {t === 0 ? '0' : t >= 1000 ? t / 1000 + 'k' : t}
            </text>
          ))}
          <text x={W - PAD.right + 38} y={PAD.top + innerH / 2} textAnchor="middle"
            fontSize={9} fill="#94a3b8" fontFamily="system-ui,sans-serif"
            transform={`rotate(90,${W - PAD.right + 38},${PAD.top + innerH / 2})`}>
            Impressions
          </text>

          {/* Month labels — appear progressively */}
          {MONTHS.map((m, i) => {
            const midX = cx((m.start + m.end) / 2)
            const visible = visibleMonths.includes(i)
            return (
              <text key={i} x={midX} y={H - 4} textAnchor="middle"
                fontSize={10} fill="#64748b" fontFamily="system-ui,sans-serif"
                style={{
                  opacity: visible ? 1 : 0,
                  transition: 'opacity 0.5s ease',
                }}>
                {m.label}
              </text>
            )
          })}

          {/* Area fills (subtle) */}
          {drawPct > 0 && (
            <>
              <path
                d={`${impPath} L${cx(visibleN - 1)},${PAD.top + innerH} L${PAD.left},${PAD.top + innerH} Z`}
                fill="url(#fillImp)" opacity={0.18}
              />
              <path
                d={`${clickPath} L${cx(visibleN - 1)},${PAD.top + innerH} L${PAD.left},${PAD.top + innerH} Z`}
                fill="url(#fillClick)" opacity={0.22}
              />
            </>
          )}

          {/* Lines */}
          {drawPct > 0 && (
            <>
              <path d={impPath}   fill="none" stroke="#60a5fa" strokeWidth={1.8} strokeLinejoin="round" strokeLinecap="round" />
              <path d={clickPath} fill="none" stroke="#7c3aed" strokeWidth={2}   strokeLinejoin="round" strokeLinecap="round" />
            </>
          )}

          {/* Data points — appear as line reaches them */}
          {clickPts.slice(0, visibleN).filter((_, i) => i % 6 === 0).map(([x, y], i) => {
            const dataIdx = i * 6
            const isPulse = pulseIdx !== null && Math.abs(dataIdx - pulseIdx) <= 3
            return (
              <circle key={i} cx={x} cy={y} r={isPulse ? 4 : 2.5}
                fill={isPulse ? '#7c3aed' : '#fff'}
                stroke="#7c3aed" strokeWidth={isPulse ? 2 : 1.5}
                style={{ transition: 'r 0.3s ease' }}
              />
            )
          })}
          {impPts.slice(0, visibleN).filter((_, i) => i % 6 === 0).map(([x, y], i) => {
            const dataIdx = i * 6
            const isPulse = pulseIdx !== null && Math.abs(dataIdx - pulseIdx) <= 3
            return (
              <circle key={i} cx={x} cy={y} r={isPulse ? 3.5 : 2}
                fill={isPulse ? '#60a5fa' : '#fff'}
                stroke="#60a5fa" strokeWidth={isPulse ? 2 : 1.5}
                style={{ transition: 'r 0.3s ease' }}
              />
            )
          })}

          <defs>
            <linearGradient id="fillClick" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="fillImp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: 24, justifyContent: 'center', marginTop: 8 }}>
        <LegendItem color="#7c3aed" label="Clicks" />
        <LegendItem color="#60a5fa" label="Impressions" />
      </div>
    </div>
  )
}

function KpiCard({ label, value, color1, color2, active }: {
  label: string; value: string; color1: string; color2: string; active: boolean
}) {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${color1}, ${color2})`,
      borderRadius: 12,
      padding: '12px 20px',
      minWidth: 180,
      flex: 1,
      opacity: active ? 1 : 0,
      transform: active ? 'translateY(0)' : 'translateY(8px)',
      transition: 'opacity 0.5s ease, transform 0.5s ease',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
        <span style={{
          width: 14, height: 14, borderRadius: 3, border: '2px solid rgba(255,255,255,0.7)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ width: 7, height: 7, background: 'white', borderRadius: 1 }} />
        </span>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', fontFamily: 'system-ui,sans-serif', fontWeight: 500 }}>{label}</span>
      </div>
      <div style={{ fontSize: 28, fontWeight: 800, color: 'white', letterSpacing: '-0.02em', fontFamily: 'system-ui,sans-serif', lineHeight: 1.1 }}>
        {value}
      </div>
    </div>
  )
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 11, color: '#64748b', fontFamily: 'system-ui,sans-serif' }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
        <svg width="28" height="10" viewBox="0 0 28 10">
          <line x1="0" y1="5" x2="28" y2="5" stroke={color} strokeWidth="2" />
          <circle cx="14" cy="5" r="3" fill="white" stroke={color} strokeWidth="1.5" />
        </svg>
      </span>
      {label}
    </div>
  )
}
