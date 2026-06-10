'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

// Sequential globe reveal:
//   0–25%  → Globe 1 appears (left)
//   25–50% → Globe 2 appears (centre)
//   50–75% → Globe 3 appears (right)
//   75–100%→ Green signals flow between all three, network grows stronger

const ACCENT  = '#1e9e75'
const GLOBE_S = 200   // px — canvas size per globe

const GLOBE_DATA = [
  {
    label: 'Technical SEO',
    sub: 'Core Web Vitals · Schema · Crawlability',
    color: '#1e5fe0',
  },
  {
    label: 'Content Strategy',
    sub: 'E-E-A-T · Buyer Intent · AI Citations',
    color: ACCENT,
  },
  {
    label: 'Link Building',
    sub: 'Authority · Backlinks · Domain Trust',
    color: '#6f4dff',
  },
]

// Approximate continent polygons [lon, lat]
const CONTINENTS = [
  [[-130,60],[-60,60],[-60,25],[-80,10],[-90,15],[-120,20],[-130,60]],
  [[-80,12],[-50,12],[-35,-10],[-40,-55],[-70,-55],[-80,12]],
  [[0,60],[30,60],[30,40],[10,35],[-10,35],[-10,45],[0,60]],
  [[-18,15],[50,15],[50,-35],[-18,-35],[-18,15]],
  [[30,60],[140,60],[140,0],[100,-10],[80,5],[60,20],[30,30],[30,60]],
  [[115,-20],[155,-20],[155,-45],[115,-45],[115,-20]],
]

function drawGlobe(canvas: HTMLCanvasElement, rotation: number, accentColor: string) {
  const ctx  = canvas.getContext('2d')!
  const dpr  = canvas.width / GLOBE_S
  const cx   = canvas.width / 2
  const cy   = canvas.height / 2
  const r    = canvas.width / 2 - 4

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Atmosphere
  const atm = ctx.createRadialGradient(cx, cy, r * 0.7, cx, cy, r * 1.15)
  atm.addColorStop(0, `${accentColor}00`)
  atm.addColorStop(0.6, `${accentColor}18`)
  atm.addColorStop(1, `${accentColor}00`)
  ctx.beginPath(); ctx.arc(cx, cy, r * 1.15, 0, Math.PI * 2)
  ctx.fillStyle = atm; ctx.fill()

  // Ocean
  const ocean = ctx.createRadialGradient(cx - r * 0.28, cy - r * 0.28, 0, cx, cy, r)
  ocean.addColorStop(0, '#2a6fad')
  ocean.addColorStop(0.55, '#1a4880')
  ocean.addColorStop(1, '#0b2545')
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2)
  ctx.fillStyle = ocean; ctx.fill()

  // Clip to sphere
  ctx.save()
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.clip()

  // Lat/lon grid
  ctx.strokeStyle = 'rgba(255,255,255,0.07)'; ctx.lineWidth = 0.5 * dpr
  for (let lat = -60; lat <= 60; lat += 30) {
    const y = cy - (lat / 90) * r
    ctx.beginPath(); ctx.moveTo(cx - r, y); ctx.lineTo(cx + r, y); ctx.stroke()
  }
  for (let lon = 0; lon < 360; lon += 30) {
    const ax = ((((lon + rotation) % 360) - 180) / 180) * r + cx
    ctx.beginPath(); ctx.moveTo(ax, cy - r); ctx.lineTo(ax, cy + r); ctx.stroke()
  }

  // Continents
  ctx.fillStyle = `${accentColor}70`
  for (const poly of CONTINENTS) {
    ctx.beginPath()
    let first = true
    for (const [lon, lat] of poly) {
      const ax = ((((lon + rotation + 540) % 360) - 180) / 180) * r + cx
      const ay = cy - (lat / 90) * r
      first ? ctx.moveTo(ax, ay) : ctx.lineTo(ax, ay)
      first = false
    }
    ctx.closePath(); ctx.fill()
  }
  ctx.restore()

  // Specular
  const spec = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.32, 0, cx, cy, r)
  spec.addColorStop(0, 'rgba(255,255,255,0.28)')
  spec.addColorStop(0.45, 'rgba(255,255,255,0.05)')
  spec.addColorStop(1, 'transparent')
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2)
  ctx.fillStyle = spec; ctx.fill()

  // Ring glow
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2)
  ctx.strokeStyle = `${accentColor}55`; ctx.lineWidth = 2 * dpr; ctx.stroke()
}

function GlobeCanvas({ color }: { color: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rotRef    = useRef(Math.random() * 360)
  const rafRef    = useRef(0)

  useEffect(() => {
    const cv  = canvasRef.current!
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    cv.width  = GLOBE_S * dpr
    cv.height = GLOBE_S * dpr

    const tick = () => {
      rotRef.current += 0.12
      drawGlobe(cv, rotRef.current, color)
      rafRef.current = requestAnimationFrame(tick)
    }
    tick()
    return () => cancelAnimationFrame(rafRef.current)
  }, [color])

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: GLOBE_S, height: GLOBE_S, borderRadius: '50%', display: 'block',
        boxShadow: `0 0 0 2px ${color}44, 0 12px 48px -12px ${color}66, 0 0 60px -20px ${color}33`,
      }}
    />
  )
}

// Animate a bezier packet using rAF + canvas offscreen — but here we use
// SVG with a moving <circle> driven by motion values for simplicity + quality.
function SignalArc({
  x1, y1, x2, y2, color, progress, packetOffset = 0,
}: {
  x1: number; y1: number; x2: number; y2: number
  color: string; progress: number; packetOffset?: number
}) {
  const mx  = (x1 + x2) / 2
  const cy_  = Math.min(y1, y2) - Math.abs(x2 - x1) * 0.38
  const d   = `M ${x1} ${y1} Q ${mx} ${cy_} ${x2} ${y2}`

  // Packet position along bezier
  const t   = ((progress * 1.6 + packetOffset) % 1)
  const mt  = 1 - t
  const px  = mt * mt * x1 + 2 * mt * t * mx + t * t * x2
  const py  = mt * mt * y1 + 2 * mt * t * cy_ + t * t * y2

  if (progress <= 0) return null

  return (
    <g>
      {/* Glow trace */}
      <path d={d} fill="none" stroke={color} strokeWidth={5} opacity={0.10} strokeLinecap="round"/>
      {/* Main arc */}
      <motion.path
        d={d} fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.7 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
      {/* Packet trail */}
      <circle cx={px} cy={py} r={6}  fill={color} opacity={0.18}/>
      <circle cx={px} cy={py} r={3.5} fill={color} opacity={0.75}/>
      <circle cx={px} cy={py} r={1.5} fill="#fff"  opacity={0.95}/>
    </g>
  )
}

export default function SeoGlobeNetwork() {
  const outerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  })

  // Globe entrance opacities — staggered
  const g1op  = useSpring(useTransform(scrollYProgress, [0.00, 0.18], [0, 1]), { stiffness: 60, damping: 20 })
  const g1sc  = useSpring(useTransform(scrollYProgress, [0.00, 0.18], [0.4, 1]), { stiffness: 60, damping: 20 })
  const g2op  = useSpring(useTransform(scrollYProgress, [0.22, 0.40], [0, 1]), { stiffness: 60, damping: 20 })
  const g2sc  = useSpring(useTransform(scrollYProgress, [0.22, 0.40], [0.4, 1]), { stiffness: 60, damping: 20 })
  const g3op  = useSpring(useTransform(scrollYProgress, [0.44, 0.62], [0, 1]), { stiffness: 60, damping: 20 })
  const g3sc  = useSpring(useTransform(scrollYProgress, [0.44, 0.62], [0.4, 1]), { stiffness: 60, damping: 20 })

  // Signal phase — starts after all globes visible
  const sigPh = useTransform(scrollYProgress, [0.65, 1.0], [0, 1])

const [sigProgress, setSigProgress] = useState(0)
  const [pkt, setPkt] = useState(0)

  useEffect(() => {
    return sigPh.on('change', (v: number) => setSigProgress(v))
  }, [sigPh])

  useEffect(() => {
    let raf: number
    const tick = () => {
      setPkt(p => (p + 0.004) % 1)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div ref={outerRef} style={{ height: '450vh', position: 'relative' }}>
      <div style={{
        position: 'sticky', top: 0, height: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
        background: 'transparent',
      }}>

        {/* Subtle dot texture */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, rgba(30,95,224,0.07) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
        }} />

        {/* Section label */}
        <motion.div
          style={{ opacity: g1op, marginBottom: 40, textAlign: 'center' }}
        >
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em',
            color: '#1e5fe0', textTransform: 'uppercase', opacity: 0.7,
          }}>
            SEO builds a global network · scroll to see it grow
          </span>
        </motion.div>

        {/* Globe row + SVG signals layer */}
        <div style={{ position: 'relative', width: '100%', maxWidth: 900 }}>

          {/* SVG signal arcs — absolutely overlaid */}
          <NetworkSignals
            sigProgress={sigProgress}
            pkt={pkt}
          />

          {/* Globes */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 60px', position: 'relative', zIndex: 2 }}>
            {GLOBE_DATA.map((g, i) => {
              const op = [g1op, g2op, g3op][i]
              const sc = [g1sc, g2sc, g3sc][i]
              return (
                <motion.div
                  key={g.label}
                  style={{ opacity: op, scale: sc, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}
                >
                  <GlobeCanvas color={g.color} />

                  {/* Glow ring behind globe */}
                  <motion.div
                    style={{ opacity: op }}
                    aria-hidden
                  >
                    <div style={{
                      position: 'absolute',
                      width: GLOBE_S + 40, height: GLOBE_S + 40,
                      borderRadius: '50%',
                      background: `radial-gradient(circle, ${g.color}20 0%, transparent 70%)`,
                      top: -20, left: -20,
                      pointerEvents: 'none',
                    }} />
                  </motion.div>

                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      fontFamily: 'var(--font-display)', fontWeight: 700,
                      fontSize: 15, color: '#0f2244', marginBottom: 4,
                    }}>
                      {g.label}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-mono)', fontSize: 10.5,
                      color: '#6b7a99', letterSpacing: '0.04em',
                    }}>
                      {g.sub}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          style={{
            position: 'absolute', bottom: 28,
            opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]),
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: 24, height: 38, borderRadius: 999,
              border: `1.5px solid #1e5fe060`,
              display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: 5,
            }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: 5, height: 5, borderRadius: '50%', background: '#1e5fe0' }}
            />
          </motion.div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#1e5fe0', opacity: 0.6, letterSpacing: '0.1em' }}>
            SCROLL
          </span>
        </motion.div>

      </div>
    </div>
  )
}

// Separate component so it can re-render on pkt changes without re-rendering globes
function NetworkSignals({ sigProgress, pkt }: { sigProgress: number; pkt: number }) {
  if (sigProgress <= 0) return null

  // Globe centers in the 900px-wide maxWidth container with 60px padding
  // Container: 900px, padding 60px each side → inner width 780px
  // Globe centers at: 60 + 100 = 160, 450, 900-60-100 = 740
  // But relative to the SVG (which is absolute over the row div)
  const G = [
    { x: 160, y: 100 },  // left globe center
    { x: 450, y: 100 },  // center globe center
    { x: 740, y: 100 },  // right globe center
  ]

  const arcs = [
    { from: 0, to: 1, color: '#1e9e75', threshold: 0.0, offset: 0 },
    { from: 1, to: 2, color: '#1e9e75', threshold: 0.1, offset: 0.33 },
    { from: 0, to: 2, color: '#6f4dff', threshold: 0.3, offset: 0.66 },
    // Extra packets on existing arcs at higher scroll
    { from: 0, to: 1, color: '#0ea5e9', threshold: 0.5, offset: 0.5 },
    { from: 1, to: 2, color: '#0ea5e9', threshold: 0.6, offset: 0.8 },
  ]

  return (
    <svg
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', pointerEvents: 'none', zIndex: 1 }}
      viewBox="0 0 900 200"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <filter id="sigGlow">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <g filter="url(#sigGlow)">
        {arcs.map((arc, i) => {
          const localProg = Math.max(0, (sigProgress - arc.threshold) / (1 - arc.threshold))
          if (localProg <= 0) return null
          return (
            <SignalArc
              key={i}
              x1={G[arc.from].x} y1={G[arc.from].y}
              x2={G[arc.to].x}   y2={G[arc.to].y}
              color={arc.color}
              progress={localProg}
              packetOffset={arc.offset + pkt}
            />
          )
        })}
      </g>
    </svg>
  )
}

