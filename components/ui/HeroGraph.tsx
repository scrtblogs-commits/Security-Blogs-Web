'use client'
import { useEffect, useRef, useState } from 'react'

// ── Data: realistic daily GSC figures Apr 1 → Jun 29 ─────────────────────────
// Moderate natural variance — no exaggerated spikes. Trending upward into June.
const RAW_CLICKS = [
  45,78,52,110,88,130,95,62,140,105,85,155,120,98,170,135,110,185,145,115,
  195,160,125,210,170,140,220,180,148,235,190,155,245,200,162,258,210,172,
  270,218,178,282,228,185,295,238,192,308,248,200,320,258,210,335,268,218,
  348,278,225,362,290,232,375,300,242,388,312,250,402,325,260,415,335,268,
  428,348,276,442,360,285,455,372,292,468,385,300,480,395,308,
]
const RAW_IMPS = [
  1800,3100,2200,4400,3500,5200,3800,2500,5600,4200,3400,6200,4800,3900,
  6800,5400,4400,7400,5800,4600,7800,6400,5000,8400,6800,5600,8800,7200,
  5900,9400,7600,6200,9800,8000,6500,10400,8400,6800,10800,8700,7100,
  11300,9100,7400,11800,9500,7700,12300,9900,8000,12800,10300,8400,13300,
  10700,8700,13800,11100,9000,14400,11600,9300,15000,12000,9700,15500,
  12500,10000,16100,13000,10400,16600,13400,10800,17100,13900,11100,17700,
  14400,11400,18200,14900,11700,18700,15400,12000,19200,15800,12300,
]

const MONTHS = [
  { label: 'April', startIdx: 0,  endIdx: 29 },
  { label: 'May',   startIdx: 30, endIdx: 60 },
  { label: 'June',  startIdx: 61, endIdx: 89 },
]

const TOTAL_CLICKS = 24800
const TOTAL_IMPS   = 1_750_000
const N = RAW_CLICKS.length

// ── Helpers ───────────────────────────────────────────────────────────────────
function fmtCount(n: number) {
  return n.toLocaleString('en-AU')
}

function useCountUp(target: number, active: boolean, duration = 1500) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    let start: number | null = null
    let raf: number
    const step = (ts: number) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      const ease = p < 1 ? 1 - Math.pow(1 - p, 3) : 1
      setVal(Math.round(target * ease))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [active, target, duration])
  return val
}

function polyline(pts: [number, number][]) {
  return pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
}

// ── Tooltip state ─────────────────────────────────────────────────────────────
type Tooltip = { x: number; y: number; clicks: number; imps: number; label: string } | null

// ── Component ─────────────────────────────────────────────────────────────────
export default function HeroGraph() {
  const containerRef = useRef<HTMLDivElement>(null)
  const drawRaf = useRef<number>(0)
  const drawStart = useRef<number | null>(null)
  const [phase, setPhase] = useState<'idle' | 'kpi' | 'draw' | 'live'>('idle')
  const [drawPct, setDrawPct] = useState(0)
  const [visibleMonths, setVisibleMonths] = useState<Set<number>>(new Set())
  const [tooltip, setTooltip] = useState<Tooltip>(null)
  const DRAW_DURATION = 2400

  // Trigger on scroll into view
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setPhase('kpi'); obs.disconnect() } },
      { threshold: 0.25 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Phase sequence
  useEffect(() => {
    if (phase === 'kpi') {
      const t = setTimeout(() => setPhase('draw'), 1600)
      return () => clearTimeout(t)
    }
    if (phase === 'draw') {
      drawStart.current = null
      const step = (ts: number) => {
        if (!drawStart.current) drawStart.current = ts
        const p = Math.min((ts - drawStart.current) / DRAW_DURATION, 1)
        setDrawPct(p)
        // Month labels appear when line reaches their midpoint
        const thresholds = [0.16, 0.5, 0.83]
        setVisibleMonths(prev => {
          const next = new Set(prev)
          thresholds.forEach((t, i) => { if (p >= t) next.add(i) })
          return next
        })
        if (p < 1) drawRaf.current = requestAnimationFrame(step)
        else setPhase('live')
      }
      drawRaf.current = requestAnimationFrame(step)
      return () => cancelAnimationFrame(drawRaf.current)
    }
  }, [phase])

  // ── Geometry ─────────────────────────────────────────────────────────────
  const W = 720, H = 230
  const PAD = { top: 16, right: 52, bottom: 36, left: 48 }
  const iW = W - PAD.left - PAD.right
  const iH = H - PAD.top - PAD.bottom

  const xOf = (i: number) => PAD.left + (i / (N - 1)) * iW
  const yClick = (v: number) => PAD.top + iH - (v / 1000) * iH
  const yImp   = (v: number) => PAD.top + iH - (v / 35000) * iH

  const clickPts: [number, number][] = RAW_CLICKS.map((v, i) => [xOf(i), yClick(v)])
  const impPts:   [number, number][] = RAW_IMPS.map((v, i)   => [xOf(i), yImp(v)])

  const visN = Math.max(2, Math.round(drawPct * (N - 1)) + 1)

  // KPI count-up
  const clicksVal = useCountUp(TOTAL_CLICKS, phase !== 'idle', 1500)
  const impsVal   = useCountUp(TOTAL_IMPS,   phase !== 'idle', 1700)

  // Y-axis ticks — exact match to screenshot
  const clickTicks = [0, 200, 400, 600, 800, 1000]
  const impTicks   = [0, 7000, 14000, 21000, 28000, 35000]

  // Hover: find nearest data index from mouse X
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (phase === 'idle' || phase === 'kpi') return
    const rect = e.currentTarget.getBoundingClientRect()
    const svgX = ((e.clientX - rect.left) / rect.width) * W
    const rawI = Math.round(((svgX - PAD.left) / iW) * (N - 1))
    const i = Math.max(0, Math.min(visN - 1, rawI))
    const x = xOf(i)
    setTooltip({
      x,
      y: clickPts[i][1],
      clicks: RAW_CLICKS[i],
      imps: RAW_IMPS[i],
      label: getDateLabel(i),
    })
  }

  return (
    <div ref={containerRef} style={{
      background: '#fff',
      border: '1px solid #e8eaed',
      borderRadius: 8,
      boxShadow: '0 1px 6px rgba(60,64,67,0.12)',
      overflow: 'hidden',
      fontFamily: '"Google Sans",Roboto,Arial,sans-serif',
      userSelect: 'none',
    }}>

      {/* ── KPI row ── */}
      <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid #e8eaed' }}>
        <KpiCard
          label="Total Clicks"
          value={fmtCount(clicksVal)}
          color="#7b2d8b"
          bg="#f3e8f9"
          active={phase !== 'idle'}
        />
        <KpiCard
          label="Total Impressions"
          value={fmtCount(impsVal)}
          color="#1a73e8"
          bg="#e8f0fe"
          active={phase !== 'idle'}
          border
        />
      </div>

      {/* ── Chart ── */}
      <div style={{ padding: '8px 0 0' }}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          style={{ width: '100%', height: 'auto', display: 'block', cursor: phase === 'live' ? 'crosshair' : 'default' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setTooltip(null)}
          aria-hidden="true"
        >
          {/* Horizontal grid lines */}
          {clickTicks.map((t) => (
            <line key={t}
              x1={PAD.left} y1={yClick(t)}
              x2={W - PAD.right} y2={yClick(t)}
              stroke="#f1f3f4" strokeWidth={1}
            />
          ))}

          {/* Left axis: Clicks */}
          {clickTicks.map((t) => (
            <text key={t}
              x={PAD.left - 8} y={yClick(t) + 4}
              textAnchor="end" fontSize={10} fill="#80868b"
              fontFamily='"Google Sans",Roboto,Arial,sans-serif'>
              {t === 0 ? '0' : t.toLocaleString()}
            </text>
          ))}
          <text
            x={13} y={PAD.top + iH / 2}
            textAnchor="middle" fontSize={10} fill="#80868b"
            fontFamily='"Google Sans",Roboto,Arial,sans-serif'
            transform={`rotate(-90,13,${PAD.top + iH / 2})`}>
            Clicks
          </text>

          {/* Right axis: Impressions */}
          {impTicks.map((t) => (
            <text key={t}
              x={W - PAD.right + 8} y={yImp(t) + 4}
              textAnchor="start" fontSize={10} fill="#80868b"
              fontFamily='"Google Sans",Roboto,Arial,sans-serif'>
              {t === 0 ? '0' : t >= 1000 ? (t / 1000) + 'k' : t}
            </text>
          ))}
          <text
            x={W - 10} y={PAD.top + iH / 2}
            textAnchor="middle" fontSize={10} fill="#80868b"
            fontFamily='"Google Sans",Roboto,Arial,sans-serif'
            transform={`rotate(90,${W - 10},${PAD.top + iH / 2})`}>
            Impressions
          </text>

          {/* Month labels — progressive */}
          {MONTHS.map((m, i) => {
            const midX = xOf((m.startIdx + m.endIdx) / 2)
            return (
              <text key={i}
                x={midX} y={H - 8}
                textAnchor="middle" fontSize={11} fill="#80868b"
                fontFamily='"Google Sans",Roboto,Arial,sans-serif'
                style={{ opacity: visibleMonths.has(i) ? 1 : 0, transition: 'opacity 0.4s ease' }}>
                {m.label}
              </text>
            )
          })}

          {/* Month separator ticks */}
          {MONTHS.slice(1).map((m, i) => (
            <line key={i}
              x1={xOf(m.startIdx)} y1={PAD.top + iH}
              x2={xOf(m.startIdx)} y2={PAD.top + iH + 4}
              stroke="#dadce0" strokeWidth={1}
            />
          ))}

          {/* Impressions line (behind clicks) */}
          {drawPct > 0 && (
            <path
              d={polyline(impPts.slice(0, visN))}
              fill="none"
              stroke="#1a73e8"
              strokeWidth={1.5}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          )}

          {/* Clicks line (in front) */}
          {drawPct > 0 && (
            <path
              d={polyline(clickPts.slice(0, visN))}
              fill="none"
              stroke="#7b2d8b"
              strokeWidth={1.5}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          )}

          {/* Small data points every ~7 steps */}
          {drawPct > 0 && clickPts.slice(0, visN).map(([x, y], i) => {
            if (i % 7 !== 0) return null
            return <circle key={i} cx={x} cy={y} r={2} fill="#7b2d8b" stroke="#fff" strokeWidth={1} />
          })}
          {drawPct > 0 && impPts.slice(0, visN).map(([x, y], i) => {
            if (i % 7 !== 0) return null
            return <circle key={i} cx={x} cy={y} r={2} fill="#1a73e8" stroke="#fff" strokeWidth={1} />
          })}

          {/* Hover crosshair + tooltip */}
          {tooltip && phase === 'live' && (
            <>
              <line
                x1={tooltip.x} y1={PAD.top}
                x2={tooltip.x} y2={PAD.top + iH}
                stroke="#dadce0" strokeWidth={1} strokeDasharray="3 2"
              />
              <circle cx={tooltip.x} cy={tooltip.y} r={4}
                fill="#7b2d8b" stroke="#fff" strokeWidth={1.5} />
              <TooltipBox
                x={tooltip.x} y={tooltip.y}
                clicks={tooltip.clicks} imps={tooltip.imps}
                label={tooltip.label} W={W} PAD={PAD}
              />
            </>
          )}
        </svg>
      </div>

      {/* ── Legend ── */}
      <div style={{
        display: 'flex', gap: 20, justifyContent: 'center',
        padding: '6px 0 12px',
        borderTop: '1px solid #f1f3f4',
      }}>
        <LegendRow color="#7b2d8b" label="Clicks" />
        <LegendRow color="#1a73e8" label="Impressions" />
      </div>
    </div>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function KpiCard({ label, value, color, bg, active, border }: {
  label: string; value: string; color: string; bg: string; active: boolean; border?: boolean
}) {
  return (
    <div style={{
      flex: 1,
      padding: '14px 20px',
      background: bg,
      borderRight: border ? undefined : '1px solid #e8eaed',
      opacity: active ? 1 : 0,
      transition: 'opacity 0.45s ease',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
        {/* Checkbox — matches GSC style */}
        <span style={{
          width: 14, height: 14, borderRadius: 2,
          background: color, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
            <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
        <span style={{ fontSize: 12, color: '#3c4043', fontWeight: 400, fontFamily: '"Google Sans",Roboto,Arial,sans-serif' }}>
          {label}
        </span>
        <span style={{ fontSize: 11, color: '#80868b', marginLeft: 2 }}>ⓘ</span>
      </div>
      <div style={{
        fontSize: 26, fontWeight: 400, color,
        fontFamily: '"Google Sans",Roboto,Arial,sans-serif',
        letterSpacing: '-0.5px', lineHeight: 1.2,
      }}>
        {value}
      </div>
    </div>
  )
}

function LegendRow({ color, label }: { color: string; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#3c4043', fontFamily: '"Google Sans",Roboto,Arial,sans-serif' }}>
      <svg width="32" height="12" viewBox="0 0 32 12">
        <line x1="0" y1="6" x2="32" y2="6" stroke={color} strokeWidth="1.5"/>
        <circle cx="16" cy="6" r="3" fill={color} stroke="white" strokeWidth="1.5"/>
      </svg>
      {label}
    </div>
  )
}

function TooltipBox({ x, y, clicks, imps, label, W, PAD }: {
  x: number; y: number; clicks: number; imps: number; label: string;
  W: number; PAD: { top: number; right: number; bottom: number; left: number }
}) {
  const TW = 140, TH = 64
  const tx = x + 8 + TW > W - PAD.right ? x - TW - 8 : x + 8
  const ty = Math.max(PAD.top, y - TH / 2)
  return (
    <g>
      <rect x={tx} y={ty} width={TW} height={TH} rx={4}
        fill="white" stroke="#dadce0" strokeWidth={1}
        style={{ filter: 'drop-shadow(0 1px 4px rgba(60,64,67,0.15))' }}
      />
      <text x={tx + 8} y={ty + 14} fontSize={10} fill="#80868b" fontFamily='"Google Sans",Roboto,Arial,sans-serif'>{label}</text>
      <circle cx={tx + 10} cy={ty + 28} r={3} fill="#7b2d8b" />
      <text x={tx + 18} y={ty + 32} fontSize={10} fill="#3c4043" fontFamily='"Google Sans",Roboto,Arial,sans-serif'>
        Clicks: {clicks.toLocaleString()}
      </text>
      <circle cx={tx + 10} cy={ty + 46} r={3} fill="#1a73e8" />
      <text x={tx + 18} y={ty + 50} fontSize={10} fill="#3c4043" fontFamily='"Google Sans",Roboto,Arial,sans-serif'>
        Impr: {imps.toLocaleString()}
      </text>
    </g>
  )
}

// Returns "Apr 12" style label for a data index
function getDateLabel(i: number): string {
  const d = new Date(2026, 3, 1) // Apr 1 2026
  d.setDate(d.getDate() + i)
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })
}
