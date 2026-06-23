'use client'
import { useEffect, useRef, useState } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// Data traced directly from the uploaded screenshot.
// Irregular spikes — NOT smoothed, NOT trended. This is what the image shows.
// 90 points: April (0–29) | May (30–60) | June (61–89)
// Left axis:  Clicks  0–1000
// Right axis: Impr    0–35 000
// ─────────────────────────────────────────────────────────────────────────────
const CLICKS: number[] = [
  // April
   50, 120,  80, 350, 100, 200, 150, 820, 180,  90,
  450, 120, 200, 100, 380, 150, 300, 100, 200, 420,
  150, 100, 350, 200, 130, 410,  90, 200, 150, 250,
  // May
  180, 100, 320, 150, 200, 100, 360, 180,  80, 280,
  150, 200, 120, 860, 180, 100, 310, 150, 200, 120,
  280, 150,  90, 400, 200, 150, 320,  90, 200, 150,
  // June
  200, 380, 150, 300, 200, 520, 150, 310, 200, 900,
  620, 200, 400, 150, 320, 600, 200, 420, 150, 500,
  380, 200, 310, 600, 420, 350, 220, 480, 320, 820,
]

const IMPS: number[] = [
  // April
    900, 2800, 1800, 9800, 2200, 5500, 3200,22000, 4500, 2100,
  12000, 3200, 5800, 2800,10500, 4200, 8200, 2600, 5500,11500,
   3800, 2500, 9800, 5500, 3200,11200, 2400, 5500, 3800, 6800,
  // May
   4800, 2600, 8800, 3800, 5200, 2500, 9600, 4800, 2200, 7500,
   3800, 5200, 3200,23000, 4500, 2600, 8300, 3800, 5200, 3200,
   7500, 3800, 2400,10500, 5200, 3800, 8500, 2300, 5200, 3900,
  // June
   5200,10200, 3800, 8200, 5200,14000, 3800, 8500, 5200,24500,
  16500, 5200,10800, 3800, 8500,16000, 5200,11200, 3800,13200,
  10000, 5200, 8300,16000,11200, 9500, 5800,12800, 8500,22000,
]

const TOTAL_CLICKS = 24800
const TOTAL_IMPS   = 1_750_000
const N = CLICKS.length

function useCountUp(target: number, active: boolean, duration = 1400) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    let t0: number | null = null
    let raf: number
    const tick = (ts: number) => {
      if (!t0) t0 = ts
      const p = Math.min((ts - t0) / duration, 1)
      const e = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(target * e))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, target, duration])
  return val
}

function buildPath(
  data: number[],
  count: number,
  xFn: (i: number) => number,
  yFn: (v: number) => number,
) {
  return data
    .slice(0, count)
    .map((v, i) => `${i === 0 ? 'M' : 'L'}${xFn(i).toFixed(1)},${yFn(v).toFixed(1)}`)
    .join(' ')
}

export default function HeroGraph() {
  const ref    = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const t0Ref  = useRef<number | null>(null)
  const DRAW_MS = 2600

  const [phase,  setPhase]  = useState<'idle' | 'kpi' | 'draw' | 'live'>('idle')
  const [pct,    setPct]    = useState(0)
  const [months, setMonths] = useState<number[]>([])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setPhase('kpi'); obs.disconnect() } },
      { threshold: 0.2 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (phase === 'kpi') {
      const t = setTimeout(() => setPhase('draw'), 1500)
      return () => clearTimeout(t)
    }
    if (phase === 'draw') {
      t0Ref.current = null
      const step = (ts: number) => {
        if (!t0Ref.current) t0Ref.current = ts
        const p = Math.min((ts - t0Ref.current) / DRAW_MS, 1)
        setPct(p)
        const show: number[] = []
        if (p >= 0.16) show.push(0)
        if (p >= 0.50) show.push(1)
        if (p >= 0.83) show.push(2)
        setMonths(show)
        if (p < 1) rafRef.current = requestAnimationFrame(step)
        else setPhase('live')
      }
      rafRef.current = requestAnimationFrame(step)
      return () => cancelAnimationFrame(rafRef.current)
    }
  }, [phase])

  // ── Geometry ── matches the screenshot aspect ratio ──────────────────────
  const W = 760, H = 260
  const PL = 56, PR = 60, PT = 22, PB = 38
  const IW = W - PL - PR
  const IH = H - PT - PB

  const xOf = (i: number) => PL + (i / (N - 1)) * IW
  const yCl = (v: number) => PT + IH - (v / 1000)  * IH
  const yIm = (v: number) => PT + IH - (v / 35000) * IH

  const visN = Math.max(2, Math.round(pct * (N - 1)) + 1)

  const clicksVal = useCountUp(TOTAL_CLICKS, phase !== 'idle', 1400)
  const impsVal   = useCountUp(TOTAL_IMPS,   phase !== 'idle', 1700)

  const clTicks = [0, 200, 400, 600, 800, 1000]
  const imTicks = [0, 7000, 14000, 21000, 28000, 35000]

  // Month label positions — midpoint index of each month
  const MONTHS = [
    { label: 'April', idx: 14.5 },
    { label: 'May',   idx: 45.0 },
    { label: 'June',  idx: 75.0 },
  ]

  const F = '"Nunito","Segoe UI",Arial,sans-serif'

  return (
    <div ref={ref} style={{
      background: '#fff',
      borderRadius: 16,
      boxShadow: '0 2px 18px rgba(0,0,0,0.09)',
      overflow: 'hidden',
      fontFamily: F,
      userSelect: 'none',
    }}>

      {/* KPI cards */}
      <div style={{ display: 'flex', padding: '10px 10px 4px', gap: 10 }}>
        <KpiCard
          label="Total Clicks"
          value={clicksVal.toLocaleString('en-AU')}
          g1="#5b2d8e" g2="#8457c8"
          active={phase !== 'idle'}
          font={F}
        />
        <KpiCard
          label="Total impressions"
          value={impsVal.toLocaleString('en-AU')}
          g1="#0d6eaa" g2="#27a9c8"
          active={phase !== 'idle'}
          font={F}
        />
      </div>

      {/* Chart */}
      <div style={{ padding: '2px 0 0' }}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          style={{ width: '100%', height: 'auto', display: 'block' }}
          aria-hidden="true"
        >
          {/* Grid */}
          {clTicks.map(t => (
            <line key={t} x1={PL} y1={yCl(t)} x2={W - PR} y2={yCl(t)}
              stroke="#ebebeb" strokeWidth={0.9} />
          ))}

          {/* Left axis label + ticks */}
          <text x={PL - 8} y={PT - 7} fontSize={10} fill="#999"
            textAnchor="end" fontFamily={F}>Clicks</text>
          {clTicks.map(t => (
            <text key={t} x={PL - 8} y={yCl(t) + 4}
              fontSize={10} fill="#999" textAnchor="end" fontFamily={F}>
              {t === 0 ? '0' : t.toLocaleString()}
            </text>
          ))}

          {/* Right axis label + ticks */}
          <text x={W - PR + 8} y={PT - 7} fontSize={10} fill="#999"
            textAnchor="start" fontFamily={F}>Impresssions</text>
          {imTicks.map(t => (
            <text key={t} x={W - PR + 8} y={yIm(t) + 4}
              fontSize={10} fill="#999" textAnchor="start" fontFamily={F}>
              {t === 0 ? '0' : (t / 1000) + 'k'}
            </text>
          ))}

          {/* Month labels */}
          {MONTHS.map((m, i) => (
            <text key={i}
              x={xOf(m.idx)} y={H - 8}
              fontSize={11} fill="#777" textAnchor="middle" fontFamily={F}
              style={{ opacity: months.includes(i) ? 1 : 0, transition: 'opacity 0.5s ease' }}>
              {m.label}
            </text>
          ))}

          {/* Impressions line (behind) */}
          {pct > 0 && (
            <path
              d={buildPath(IMPS, visN, xOf, yIm)}
              fill="none" stroke="#5ba3d9" strokeWidth={1.5}
              strokeLinejoin="miter" strokeLinecap="round"
            />
          )}

          {/* Clicks line (front) */}
          {pct > 0 && (
            <path
              d={buildPath(CLICKS, visN, xOf, yCl)}
              fill="none" stroke="#4a2f8a" strokeWidth={1.5}
              strokeLinejoin="miter" strokeLinecap="round"
            />
          )}

          {/* Dots — every 6 steps, small white-filled circles */}
          {pct > 0 && CLICKS.slice(0, visN).map((v, i) => {
            if (i % 6 !== 0) return null
            return <circle key={`c${i}`} cx={xOf(i)} cy={yCl(v)} r={2.5}
              fill="#fff" stroke="#4a2f8a" strokeWidth={1.5} />
          })}
          {pct > 0 && IMPS.slice(0, visN).map((v, i) => {
            if (i % 6 !== 0) return null
            return <circle key={`m${i}`} cx={xOf(i)} cy={yIm(v)} r={2.5}
              fill="#fff" stroke="#5ba3d9" strokeWidth={1.5} />
          })}
        </svg>
      </div>

      {/* Legend */}
      <div style={{
        display: 'flex', gap: 28, justifyContent: 'center',
        padding: '4px 0 14px', fontSize: 12, color: '#555', fontFamily: F,
      }}>
        <LegendItem stroke="#4a2f8a" label="Clicks" />
        <LegendItem stroke="#5ba3d9" label="Impresssions" />
      </div>
    </div>
  )
}

function KpiCard({ label, value, g1, g2, active, font }: {
  label: string; value: string; g1: string; g2: string; active: boolean; font: string
}) {
  return (
    <div style={{
      flex: 1,
      background: `linear-gradient(135deg, ${g1} 0%, ${g2} 100%)`,
      borderRadius: 12,
      padding: '14px 20px 16px',
      opacity: active ? 1 : 0,
      transition: 'opacity 0.4s ease',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
        <span style={{
          width: 16, height: 16, borderRadius: 3,
          border: '2px solid rgba(255,255,255,0.7)',
          background: 'rgba(255,255,255,0.15)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L4 7L9 1" stroke="white" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.92)', fontFamily: font, fontWeight: 600 }}>
          {label}
        </span>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', marginLeft: 1 }}>ⓘ</span>
      </div>
      <div style={{
        fontSize: 30, fontWeight: 700, color: '#fff',
        fontFamily: font, letterSpacing: '-0.3px', lineHeight: 1.2,
      }}>
        {value}
      </div>
    </div>
  )
}

function LegendItem({ stroke, label }: { stroke: string; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
      <svg width="34" height="12" viewBox="0 0 34 12">
        <line x1="0" y1="6" x2="34" y2="6" stroke={stroke} strokeWidth="1.5"/>
        <circle cx="17" cy="6" r="3.5" fill="white" stroke={stroke} strokeWidth="1.5"/>
      </svg>
      {label}
    </div>
  )
}
