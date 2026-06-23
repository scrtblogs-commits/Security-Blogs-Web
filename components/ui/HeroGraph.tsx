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

      {/* ── Bing Webmaster Tools header bar ── */}
      <BingHeader />

      {/* KPI cards — compact, left-aligned, NOT full-width (matching reference) */}
      <div style={{ display: 'flex', gap: 10, padding: '12px 12px 6px', alignItems: 'stretch' }}>
        <KpiCard
          label="Total Clicks"
          value={clicksVal.toLocaleString('en-AU')}
          bg="linear-gradient(120deg,#6b2fa0 0%,#8b52c0 100%)"
          active={phase !== 'idle'}
          font={F}
        />
        <KpiCard
          label="Total impressions"
          value={impsVal.toLocaleString('en-AU')}
          bg="linear-gradient(120deg,#1568b0 0%,#2a9fd4 100%)"
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

// ── Bing Webmaster Tools header bar ──────────────────────────────────────────
// Matches reference: #1267d5 blue, hamburger · Win logo · divider · title | right icons
function BingHeader() {
  const BLUE = '#1267d5'
  const ICO  = { color: 'rgba(255,255,255,0.92)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' } as const

  return (
    <div style={{
      background: BLUE,
      height: 44,
      display: 'flex', alignItems: 'center',
      padding: '0 14px',
      gap: 0,
    }}>
      {/* ── Left side ── */}
      {/* Hamburger */}
      <span style={{ ...ICO, marginRight: 12, cursor: 'default' }}>
        <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
          <rect y="0"  width="18" height="2" rx="1" fill="white"/>
          <rect y="6"  width="18" height="2" rx="1" fill="white"/>
          <rect y="12" width="18" height="2" rx="1" fill="white"/>
        </svg>
      </span>

      {/* Windows logo (4-square grid) */}
      <span style={{ ...ICO, marginRight: 8 }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="0"  y="0"  width="7.2" height="7.2" fill="white"/>
          <rect x="8.8"y="0"  width="7.2" height="7.2" fill="white"/>
          <rect x="0"  y="8.8"width="7.2" height="7.2" fill="white"/>
          <rect x="8.8"y="8.8"width="7.2" height="7.2" fill="white"/>
        </svg>
      </span>

      {/* "Microsoft Bing" bold text */}
      <span style={{
        fontSize: 14, fontWeight: 700, color: '#fff',
        fontFamily: '"Segoe UI",Arial,sans-serif', letterSpacing: '0.01em',
        marginRight: 10,
      }}>
        Microsoft Bing
      </span>

      {/* Vertical divider */}
      <span style={{
        width: 1, height: 18,
        background: 'rgba(255,255,255,0.45)',
        display: 'inline-block',
        marginRight: 10,
        flexShrink: 0,
      }}/>

      {/* "Webmaster Tools" regular text */}
      <span style={{
        fontSize: 14, fontWeight: 400, color: 'rgba(255,255,255,0.92)',
        fontFamily: '"Segoe UI",Arial,sans-serif',
        flex: 1,
      }}>
        Webmaster Tools
      </span>

      {/* ── Right side icons ── */}
      {/* Apps / waffle grid */}
      <span style={{ ...ICO, marginLeft: 6 }}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <rect x="1"  y="1"  width="4.5" height="4.5" rx="0.8" fill="rgba(255,255,255,0.75)"/>
          <rect x="6.75" y="1"  width="4.5" height="4.5" rx="0.8" fill="rgba(255,255,255,0.75)"/>
          <rect x="12.5"  y="1"  width="4.5" height="4.5" rx="0.8" fill="rgba(255,255,255,0.75)"/>
          <rect x="1"  y="6.75" width="4.5" height="4.5" rx="0.8" fill="rgba(255,255,255,0.75)"/>
          <rect x="6.75" y="6.75" width="4.5" height="4.5" rx="0.8" fill="rgba(255,255,255,0.75)"/>
          <rect x="12.5"  y="6.75" width="4.5" height="4.5" rx="0.8" fill="rgba(255,255,255,0.75)"/>
          <rect x="1"  y="12.5"  width="4.5" height="4.5" rx="0.8" fill="rgba(255,255,255,0.75)"/>
          <rect x="6.75" y="12.5"  width="4.5" height="4.5" rx="0.8" fill="rgba(255,255,255,0.75)"/>
          <rect x="12.5"  y="12.5"  width="4.5" height="4.5" rx="0.8" fill="rgba(255,255,255,0.75)"/>
        </svg>
      </span>

      {/* Microsoft Fluent / colourful squares icon */}
      <span style={{ ...ICO, marginLeft: 10 }}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <rect x="0"   y="0"   width="8.2" height="8.2" rx="1.5" fill="#f35325"/>
          <rect x="9.8" y="0"   width="8.2" height="8.2" rx="1.5" fill="#81bc06"/>
          <rect x="0"   y="9.8" width="8.2" height="8.2" rx="1.5" fill="#05a6f0"/>
          <rect x="9.8" y="9.8" width="8.2" height="8.2" rx="1.5" fill="#ffba08"/>
        </svg>
      </span>

      {/* Bell / notification */}
      <span style={{ ...ICO, marginLeft: 10 }}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M9 2a5 5 0 0 1 5 5v3l1.5 2.5H2.5L4 10V7a5 5 0 0 1 5-5Z"
            fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5"/>
          <path d="M7.5 14.5a1.5 1.5 0 0 0 3 0" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5"/>
        </svg>
      </span>

      {/* Question mark / help */}
      <span style={{
        ...ICO, marginLeft: 10,
        fontSize: 15, fontWeight: 600,
        color: 'rgba(255,255,255,0.85)',
        fontFamily: '"Segoe UI",Arial,sans-serif',
        width: 20, height: 20,
      }}>
        ?
      </span>

      {/* Smiley / feedback */}
      <span style={{ ...ICO, marginLeft: 6 }}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="9" r="7.5" stroke="rgba(255,255,255,0.85)" strokeWidth="1.4"/>
          <circle cx="6.5" cy="7.5" r="1" fill="rgba(255,255,255,0.85)"/>
          <circle cx="11.5" cy="7.5" r="1" fill="rgba(255,255,255,0.85)"/>
          <path d="M6 11.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8"
            stroke="rgba(255,255,255,0.85)" strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
      </span>

      {/* Gear / settings */}
      <span style={{ ...ICO, marginLeft: 6 }}>
        <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
          <circle cx="8.5" cy="8.5" r="2.5" stroke="rgba(255,255,255,0.85)" strokeWidth="1.4"/>
          <path d="M8.5 1v2M8.5 14v2M1 8.5h2M14 8.5h2M3.05 3.05l1.41 1.41M12.54 12.54l1.41 1.41M3.05 13.95l1.41-1.41M12.54 4.46l1.41-1.41"
            stroke="rgba(255,255,255,0.85)" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      </span>

      {/* Globe favicon (SecurityBlogs logo placeholder) */}
      <span style={{
        ...ICO, marginLeft: 10,
        width: 26, height: 26, borderRadius: '50%',
        background: 'rgba(255,255,255,0.18)',
        border: '1.5px solid rgba(255,255,255,0.40)',
        fontSize: 11, color: 'rgba(255,255,255,0.80)',
        fontFamily: '"Segoe UI",Arial,sans-serif',
        fontWeight: 700, flexShrink: 0,
      }}>
        SB
      </span>
    </div>
  )
}

function KpiCard({ label, value, bg, active, font }: {
  label: string; value: string; bg: string; active: boolean; font: string
}) {
  return (
    /*
     * Reference measurements (from image, ~840px wide widget):
     *   card width  ≈ 190px   (each card ≈22% of widget)
     *   card height ≈ 78px
     *   border-radius ≈ 13px  (moderate — NOT pill-shaped)
     *   h-padding ≈ 14px, v-padding ≈ 10px top / 12px bottom
     *   checkbox: 14×14px square, 3px radius
     *   label: ~12px, semi-bold, white 90% opacity
     *   info icon: ~12px, circle, after label
     *   number: ~26px, bold, white, mt 4px
     */
    <div style={{
      width: 190,               /* fixed — not stretching full width */
      background: bg,
      borderRadius: 13,         /* moderate radius matching reference */
      padding: '10px 14px 12px',
      flexShrink: 0,
      opacity: active ? 1 : 0,
      transition: 'opacity 0.4s ease',
    }}>
      {/* Top row: checkbox · label · info */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5,
      }}>
        {/* 14×14 checkbox */}
        <span style={{
          width: 14, height: 14, borderRadius: 3,
          background: 'rgba(255,255,255,0.22)',
          border: '1.5px solid rgba(255,255,255,0.80)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
            <path d="M1 3.5L3.5 6L8 1"
              stroke="white" strokeWidth="1.6"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
        {/* Label */}
        <span style={{
          fontSize: 12, fontWeight: 600,
          color: 'rgba(255,255,255,0.90)',
          fontFamily: font, whiteSpace: 'nowrap',
        }}>
          {label}
        </span>
        {/* Info circle */}
        <span style={{
          width: 13, height: 13, borderRadius: '50%',
          border: '1.5px solid rgba(255,255,255,0.50)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 9, color: 'rgba(255,255,255,0.60)',
          fontFamily: font, flexShrink: 0, lineHeight: 1,
          fontStyle: 'italic',
        }}>
          i
        </span>
      </div>
      {/* Number */}
      <div style={{
        fontSize: 26, fontWeight: 700, color: '#ffffff',
        fontFamily: font, letterSpacing: '-0.3px', lineHeight: 1.15,
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
