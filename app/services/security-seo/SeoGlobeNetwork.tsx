'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'

// 3D Globe Network for Security SEO "What's Included" section.
// Each node = a canvas-drawn 3D Earth globe with a capability label.
// Nodes are connected by glowing green signal arcs that activate progressively as user scrolls.

const ACCENT = '#1e9e75'

// Node layout (percentage positions in the container)
const NODES = [
  { id: 'onpage',    label: 'On-Page SEO',      desc: 'Titles, headings, meta — optimised for security buyer intent.', x: 50,  y: 12,  r: 52, primary: false },
  { id: 'technical', label: 'Technical SEO',     desc: 'Core Web Vitals, schema, crawlability — engineered to rank.', x: 18,  y: 38,  r: 70, primary: true  },
  { id: 'local',     label: 'Local SEO',         desc: 'Google Maps, citations — dominate every city you serve.',      x: 82,  y: 38,  r: 52, primary: false },
  { id: 'content',   label: 'Content Strategy',  desc: 'E-E-A-T content that ranks and gets cited by AI engines.',     x: 50,  y: 62,  r: 70, primary: true  },
  { id: 'links',     label: 'Link Building',      desc: 'Industry backlinks that build domain authority fast.',         x: 18,  y: 80,  r: 48, primary: false },
  { id: 'tracking',  label: 'Rank Tracking',      desc: 'Monthly reports on every keyword — transparent results.',     x: 82,  y: 80,  r: 48, primary: false },
]

// Signal arcs: [from, to, activates at scroll pct]
const ARCS: [number, number, number][] = [
  [0, 1, 0.05],
  [0, 2, 0.12],
  [1, 3, 0.22],
  [2, 3, 0.30],
  [1, 4, 0.40],
  [3, 5, 0.50],
  [2, 5, 0.58],
  [4, 3, 0.66],
  [0, 3, 0.74],
  [1, 2, 0.82],
]

// ── Canvas globe renderer ─────────────────────────────────────────────────────
// Approximate continent polygons in lon/lat (for equirectangular → sphere projection)
const CONTINENTS = [
  // North America (rough)
  [[-130,60],[-60,60],[-60,25],[-80,10],[-90,15],[-120,20],[-130,60]],
  // South America
  [[-80,12],[-50,12],[-35,-10],[-40,-55],[-70,-55],[-80,12]],
  // Europe
  [[0,60],[30,60],[30,40],[10,35],[-10,35],[-10,45],[0,60]],
  // Africa
  [[-18,15],[50,15],[50,-35],[-18,-35],[-18,15]],
  // Asia (simplified)
  [[30,60],[140,60],[140,0],[100,-10],[80,5],[60,20],[30,30],[30,60]],
  // Australia
  [[115,-20],[155,-20],[155,-45],[115,-45],[115,-20]],
]

function drawGlobe(canvas: HTMLCanvasElement, rotation: number, radius: number) {
  const ctx = canvas.getContext('2d')!
  const cx = canvas.width / 2
  const cy = canvas.height / 2
  const r = radius * (canvas.width / (radius * 2 + 8))

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Atmosphere glow
  const atm = ctx.createRadialGradient(cx - r*0.15, cy - r*0.15, r*0.1, cx, cy, r*1.2)
  atm.addColorStop(0, 'rgba(30,158,117,0.08)')
  atm.addColorStop(0.7, 'rgba(30,95,224,0.04)')
  atm.addColorStop(1, 'transparent')
  ctx.beginPath(); ctx.arc(cx, cy, r*1.2, 0, Math.PI*2)
  ctx.fillStyle = atm; ctx.fill()

  // Ocean
  const ocean = ctx.createRadialGradient(cx - r*0.3, cy - r*0.3, 0, cx, cy, r)
  ocean.addColorStop(0, '#2a6496')
  ocean.addColorStop(0.5, '#1a4a7a')
  ocean.addColorStop(1, '#0d2d4f')
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI*2)
  ctx.fillStyle = ocean; ctx.fill()

  // Clip to sphere
  ctx.save()
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI*2); ctx.clip()

  // Grid lines
  ctx.strokeStyle = 'rgba(255,255,255,0.08)'; ctx.lineWidth = 0.5
  for (let lat = -60; lat <= 60; lat += 30) {
    const y = cy - (lat / 90) * r
    ctx.beginPath(); ctx.moveTo(cx - r, y); ctx.lineTo(cx + r, y); ctx.stroke()
  }
  for (let lon = 0; lon < 360; lon += 30) {
    const adjustedLon = ((lon + rotation) % 360) - 180
    const x = cx + (adjustedLon / 180) * r
    ctx.beginPath(); ctx.moveTo(x, cy - r); ctx.lineTo(x, cy + r); ctx.stroke()
  }

  // Continents (equirectangular mapped)
  ctx.fillStyle = 'rgba(30,158,117,0.55)'
  for (const poly of CONTINENTS) {
    ctx.beginPath()
    let first = true
    for (const [lon, lat] of poly) {
      const adjustedLon = ((lon + rotation % 360 + 540) % 360) - 180
      const px = cx + (adjustedLon / 180) * r
      const py = cy - (lat / 90) * r
      if (first) { ctx.moveTo(px, py); first = false }
      else ctx.lineTo(px, py)
    }
    ctx.closePath(); ctx.fill()
  }

  ctx.restore()

  // Specular highlight
  const spec = ctx.createRadialGradient(cx - r*0.35, cy - r*0.35, 0, cx, cy, r)
  spec.addColorStop(0, 'rgba(255,255,255,0.22)')
  spec.addColorStop(0.4, 'rgba(255,255,255,0.04)')
  spec.addColorStop(1, 'transparent')
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI*2)
  ctx.fillStyle = spec; ctx.fill()

  // Equator glow ring
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI*2)
  ctx.strokeStyle = 'rgba(30,158,117,0.25)'; ctx.lineWidth = 1.5; ctx.stroke()
}

// ── Globe Canvas component ────────────────────────────────────────────────────
function GlobeCanvas({ size, primary }: { size: number; primary: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rotRef = useRef(Math.random() * 360)
  const rafRef = useRef(0)

  useEffect(() => {
    const cv = canvasRef.current!
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    cv.width  = size * dpr
    cv.height = size * dpr

    const tick = () => {
      rotRef.current += 0.15
      drawGlobe(cv, rotRef.current, (size * dpr) / 2 - 4)
      rafRef.current = requestAnimationFrame(tick)
    }
    tick()
    return () => cancelAnimationFrame(rafRef.current)
  }, [size])

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: size, height: size,
        borderRadius: '50%',
        boxShadow: primary
          ? `0 0 0 2px ${ACCENT}44, 0 8px 32px -8px ${ACCENT}55`
          : `0 0 0 1.5px rgba(30,158,117,0.25), 0 4px 16px -6px rgba(30,95,224,0.20)`,
        display: 'block',
      }}
    />
  )
}

// ── Bezier helpers ────────────────────────────────────────────────────────────
function arcCtrl(x1: number, y1: number, x2: number, y2: number, containerW: number, containerH: number) {
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2
  const dx = x2 - x1; const dy = y2 - y1
  const len = Math.hypot(dx, dy)
  const lift = Math.min(len * 0.3, containerH * 0.12)
  return { cx: mx - dy * 0.08, cy: my - lift }
}

// ── Main exported component ────────────────────────────────────────────────────
export default function SeoGlobeNetwork() {
  const outerRef   = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<Set<number>>(new Set([0]))
  const [packets, setPackets] = useState<Map<number, number>>(new Map())
  const [hovered, setHovered] = useState<number | null>(null)
  const [dims, setDims]       = useState({ w: 800, h: 600 })

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start 0.8', 'end 0.4'],
  })

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const r = containerRef.current.getBoundingClientRect()
        setDims({ w: r.width, h: r.height })
      }
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    return scrollYProgress.on('change', (v: number) => {
      const next = new Set<number>()
      ARCS.forEach((arc, i) => { if (v >= arc[2]) next.add(i) })
      setActive(next)
    })
  }, [scrollYProgress])

  // Animate packets along active arcs
  useEffect(() => {
    let raf: number
    const tick = () => {
      setPackets((prev: Map<number, number>) => {
        const next = new Map(prev)
        active.forEach((i: number) => {
          const t = (next.get(i) ?? Math.random()) + 0.006
          next.set(i, t > 1 ? 0 : t)
        })
        return next
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active])

  const nodePos = useCallback((n: typeof NODES[0]) => ({
    px: (n.x / 100) * dims.w,
    py: (n.y / 100) * dims.h,
  }), [dims])

  function bezierAt(t: number, x1: number, y1: number, cx: number, cy: number, x2: number, y2: number) {
    const mt = 1 - t
    return { x: mt*mt*x1 + 2*mt*t*cx + t*t*x2, y: mt*mt*y1 + 2*mt*t*cy + t*t*y2 }
  }

  return (
    <div ref={outerRef} style={{ position: 'relative' }}>
      <div
        ref={containerRef}
        style={{ position: 'relative', width: '100%', height: 620, userSelect: 'none' }}
      >
        {/* SVG layer for arcs */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', pointerEvents: 'none' }}>
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {ARCS.map((arc, i) => {
            const A = NODES[arc[0]]; const B = NODES[arc[1]]
            const { px: ax, py: ay } = nodePos(A)
            const { px: bx, py: by } = nodePos(B)
            const { cx, cy } = arcCtrl(ax, ay, bx, by, dims.w, dims.h)
            const isActive = active.has(i)
            const pkt = packets.get(i) ?? 0
            const { x: hx, y: hy } = bezierAt(pkt, ax, ay, cx, cy, bx, by)

            return (
              <g key={i} filter={isActive ? 'url(#glow)' : undefined}>
                {/* Arc line */}
                <motion.path
                  d={`M ${ax} ${ay} Q ${cx} ${cy} ${bx} ${by}`}
                  fill="none"
                  stroke={isActive ? ACCENT : 'rgba(30,158,117,0.10)'}
                  strokeWidth={isActive ? 1.8 : 1}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: isActive ? 1 : 0, opacity: isActive ? 0.65 : 0.15 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  strokeLinecap="round"
                />
                {/* Glow duplicate */}
                {isActive && (
                  <motion.path
                    d={`M ${ax} ${ay} Q ${cx} ${cy} ${bx} ${by}`}
                    fill="none" stroke={ACCENT} strokeWidth={4}
                    initial={{ opacity: 0 }} animate={{ opacity: 0.18 }}
                    transition={{ duration: 0.6 }}
                    strokeLinecap="round"
                  />
                )}
                {/* Packet */}
                {isActive && (
                  <>
                    <circle cx={hx} cy={hy} r={5} fill={ACCENT} opacity={0.25}/>
                    <circle cx={hx} cy={hy} r={3} fill={ACCENT} opacity={0.9}/>
                    <circle cx={hx} cy={hy} r={1.5} fill="#fff" opacity={0.9}/>
                  </>
                )}
              </g>
            )
          })}
        </svg>

        {/* Globe nodes */}
        {NODES.map((node, i) => {
          const { px, py } = nodePos(node)
          const size = node.r
          const isHovered = hovered === i

          return (
            <motion.div
              key={node.id}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              animate={{ scale: isHovered ? 1.08 : 1, y: [0, node.primary ? -8 : -5, 0] }}
              transition={{
                scale: { duration: 0.2 },
                y: { duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 },
              }}
              style={{
                position: 'absolute',
                left: px - size/2, top: py - size/2,
                width: size, height: size,
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                cursor: 'default', zIndex: node.primary ? 3 : 2,
              }}
            >
              <GlobeCanvas size={size} primary={node.primary} />

              {/* Label */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                style={{
                  marginTop: 8, textAlign: 'center',
                  fontFamily: 'var(--font-display)', fontWeight: 700,
                  fontSize: node.primary ? 13 : 11.5,
                  color: isHovered ? ACCENT : 'var(--text)',
                  transition: 'color 0.2s',
                  whiteSpace: 'nowrap',
                }}
              >
                {node.label}
              </motion.div>

              {/* Tooltip on hover */}
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 4, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  style={{
                    position: 'absolute', top: '110%', left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#fff',
                    border: `1px solid ${ACCENT}30`,
                    borderRadius: 10, padding: '8px 12px',
                    fontSize: 11.5, color: 'var(--text-soft)',
                    boxShadow: `0 6px 20px -4px ${ACCENT}25`,
                    width: 200, textAlign: 'center',
                    zIndex: 20, lineHeight: 1.5, pointerEvents: 'none',
                  }}
                >
                  {node.desc}
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, marginTop: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-dim)' }}>
          <div style={{ width: 20, height: 2, background: ACCENT, borderRadius: 2 }}/>
          Signal path active
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-dim)' }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: ACCENT }}/>
          Data packet
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-dim)' }}>
          <span style={{ fontSize: 14 }}>↓</span> Scroll to expand network
        </div>
      </div>
    </div>
  )
}
