'use client'
import { useEffect, useRef } from 'react'

// Global Signal Network background
// Concept: your SEO/AI content radiating outward across the world like live signals
//
// Layers:
//  1. Faint world map dot-grid (latitude/longitude mapped to canvas)
//  2. Named hub nodes — AI platforms + major tech cities
//  3. Animated signal arcs — curved bezier paths between hubs
//  4. Data packets racing along arcs (glow trail)
//  5. Pulse rings expanding from nodes on packet arrival
//  6. Scroll drives signal speed + new connections lighting up

type Node = {
  id: string
  label: string
  lat: number
  lon: number
  color: string
  x: number   // canvas px, computed at runtime
  y: number
  pulses: { r: number; alpha: number }[]
}

type Arc = {
  from: number
  to: number
  active: boolean
  packets: { t: number; speed: number }[]  // t = 0..1 along arc
  color: string
  activateAt: number  // scroll progress to activate (0..1)
}

// Real-world lat/lon for nodes
const NODE_DEFS: Omit<Node, 'x' | 'y' | 'pulses'>[] = [
  { id: 'sf',       label: 'San Francisco',    lat:  37.77, lon: -122.42, color: '#1e5fe0' },
  { id: 'nyc',      label: 'New York',         lat:  40.71, lon:  -74.00, color: '#1e5fe0' },
  { id: 'london',   label: 'London',           lat:  51.51, lon:   -0.13, color: '#6f4dff' },
  { id: 'dubai',    label: 'Dubai',            lat:  25.20, lon:   55.27, color: '#e23744' },
  { id: 'sydney',   label: 'Sydney',           lat: -33.87, lon:  151.21, color: '#1e9e75' },
  { id: 'sg',       label: 'Singapore',        lat:   1.35, lon:  103.82, color: '#0ea5e9' },
  { id: 'tokyo',    label: 'Tokyo',            lat:  35.69, lon:  139.69, color: '#6f4dff' },
  { id: 'berlin',   label: 'Berlin',           lat:  52.52, lon:   13.40, color: '#1e5fe0' },
  { id: 'chatgpt',  label: 'ChatGPT',          lat:  37.39, lon: -121.97, color: '#10a37f' },
  { id: 'claude',   label: 'Claude AI',        lat:  37.45, lon: -122.18, color: '#d97706' },
  { id: 'gemini',   label: 'Gemini',           lat:  37.42, lon: -122.08, color: '#4285f4' },
  { id: 'perp',     label: 'Perplexity',       lat:  37.33, lon: -121.88, color: '#20b2aa' },
]

// Arc connections: [fromIdx, toIdx, activateAt]
const ARC_DEFS: [number, number, number, string][] = [
  [0, 1, 0.00, '#1e5fe0'],   // SF → NYC
  [0, 2, 0.05, '#6f4dff'],   // SF → London
  [1, 3, 0.08, '#e23744'],   // NYC → Dubai
  [2, 3, 0.10, '#6f4dff'],   // London → Dubai
  [3, 5, 0.15, '#0ea5e9'],   // Dubai → Singapore
  [5, 4, 0.18, '#1e9e75'],   // Singapore → Sydney
  [5, 6, 0.20, '#6f4dff'],   // Singapore → Tokyo
  [2, 7, 0.12, '#1e5fe0'],   // London → Berlin
  [0, 8, 0.02, '#10a37f'],   // SF → ChatGPT (close)
  [0, 9, 0.03, '#d97706'],   // SF → Claude
  [0,10, 0.04, '#4285f4'],   // SF → Gemini
  [0,11, 0.06, '#20b2aa'],   // SF → Perplexity
  [8, 2, 0.22, '#10a37f'],   // ChatGPT → London
  [9, 3, 0.25, '#d97706'],   // Claude → Dubai
  [10, 5, 0.28, '#4285f4'],  // Gemini → Singapore
  [11, 4, 0.30, '#20b2aa'],  // Perplexity → Sydney
  [6, 4, 0.35, '#1e9e75'],   // Tokyo → Sydney
  [7, 3, 0.38, '#e23744'],   // Berlin → Dubai
  [1, 2, 0.42, '#6f4dff'],   // NYC → London
  [4, 3, 0.48, '#0ea5e9'],   // Sydney → Dubai
]

// Mercator projection (simple equirectangular)
function latLonToXY(lat: number, lon: number, W: number, H: number) {
  const x = (lon + 180) / 360 * W
  const y = (90 - lat)  / 180 * H
  return { x, y }
}

// Bezier control point arcing upward between two nodes
function arcCtrl(x1: number, y1: number, x2: number, y2: number) {
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2
  const dx = x2 - x1
  const dy = y2 - y1
  const len = Math.hypot(dx, dy)
  const lift = Math.min(len * 0.35, 200)
  return { cx: mx - dy * 0.1, cy: my - lift }
}

function bezierPoint(t: number, x1: number, y1: number, cx: number, cy: number, x2: number, y2: number) {
  const mt = 1 - t
  return {
    x: mt*mt*x1 + 2*mt*t*cx + t*t*x2,
    y: mt*mt*y1 + 2*mt*t*cy + t*t*y2,
  }
}

// Rough world landmass mask (simplified rectangles per continent — just enough
// to skip obvious ocean-only areas for the dot grid)
const LAND: [number, number, number, number][] = [
  // [x1%, y1%, x2%, y2%] as fraction of map
  [0.09, 0.10, 0.36, 0.62],   // North + South America
  [0.44, 0.07, 0.72, 0.55],   // Europe + Africa
  [0.62, 0.05, 0.95, 0.70],   // Asia + Oceania
]

function isOnLand(xFrac: number, yFrac: number) {
  return LAND.some(([x1, y1, x2, y2]) =>
    xFrac >= x1 && xFrac <= x2 && yFrac >= y1 && yFrac <= y2
  )
}

export default function GlobalSignalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const scrollRef  = useRef(0)

  useEffect(() => {
    const cv = canvasRef.current
    if (!cv) return
    const ctx = cv.getContext('2d')!
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0

    const resize = () => {
      cv.width  = window.innerWidth  * dpr
      cv.height = window.innerHeight * dpr
    }
    resize()

    const W = () => cv.width
    const H = () => cv.height

    // Build nodes with canvas coordinates
    const nodes: Node[] = NODE_DEFS.map(n => ({
      ...n,
      ...latLonToXY(n.lat, n.lon, W(), H()),
      pulses: [],
    }))

    // Build arcs
    const arcs: Arc[] = ARC_DEFS.map(([from, to, activateAt, color]) => ({
      from, to, active: false,
      packets: [],
      color,
      activateAt,
    }))

    // Pre-seed some packets so it's not empty on load
    arcs.slice(0, 6).forEach(arc => {
      arc.active = true
      arc.packets.push({ t: Math.random(), speed: 0.0018 + Math.random() * 0.001 })
    })

    // World map dots (pre-computed grid)
    const DOT_SPACING = 18 * dpr
    const dots: { x: number; y: number }[] = []

    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      scrollRef.current = maxScroll > 0 ? window.scrollY / maxScroll : 0
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const buildDots = () => {
      dots.length = 0
      const cols = Math.ceil(W() / DOT_SPACING)
      const rows = Math.ceil(H() / DOT_SPACING)
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const xf = c / cols
          const yf = r / rows
          if (isOnLand(xf, yf)) {
            dots.push({ x: c * DOT_SPACING + DOT_SPACING/2, y: r * DOT_SPACING + DOT_SPACING/2 })
          }
        }
      }
    }
    buildDots()

    const handleResize = () => {
      resize()
      // Recompute node positions
      nodes.forEach((n, i) => {
        const pos = latLonToXY(NODE_DEFS[i].lat, NODE_DEFS[i].lon, W(), H())
        n.x = pos.x; n.y = pos.y
      })
      buildDots()
    }
    window.addEventListener('resize', handleResize)

    let frame = 0

    const draw = () => {
      ctx.clearRect(0, 0, W(), H())
      frame++

      const scroll = scrollRef.current
      const speedMult = 1 + scroll * 4  // scroll makes signals faster

      // ── 1. World map dots ──────────────────────────────────────────────────
      ctx.fillStyle = 'rgba(30,95,224,0.10)'
      for (const d of dots) {
        ctx.beginPath()
        ctx.arc(d.x, d.y, 1.2 * dpr, 0, Math.PI * 2)
        ctx.fill()
      }

      // ── 2. Activate arcs based on scroll progress ─────────────────────────
      for (const arc of arcs) {
        if (!arc.active && scroll >= arc.activateAt) {
          arc.active = true
          arc.packets.push({ t: 0, speed: 0.0018 + Math.random() * 0.0012 })
        }
      }

      // ── 3. Draw arcs + animate packets ────────────────────────────────────
      for (const arc of arcs) {
        if (!arc.active) continue
        const A = nodes[arc.from]
        const B = nodes[arc.to]
        const { cx, cy } = arcCtrl(A.x, A.y, B.x, B.y)

        // Arc line (faint)
        ctx.beginPath()
        ctx.moveTo(A.x, A.y)
        ctx.quadraticCurveTo(cx, cy, B.x, B.y)
        ctx.strokeStyle = arc.color + '28'
        ctx.lineWidth = 1 * dpr
        ctx.stroke()

        // Spawn new packets occasionally
        if (!reduced && Math.random() < 0.004 * speedMult && arc.packets.length < 3) {
          arc.packets.push({ t: 0, speed: 0.0018 + Math.random() * 0.0012 })
        }

        // Move + draw packets
        for (let pi = arc.packets.length - 1; pi >= 0; pi--) {
          const pkt = arc.packets[pi]
          if (!reduced) pkt.t += pkt.speed * speedMult

          if (pkt.t >= 1) {
            arc.packets.splice(pi, 1)
            // Trigger pulse at destination
            nodes[arc.to].pulses.push({ r: 0, alpha: 0.9 })
            continue
          }

          // Draw glowing trail
          const TRAIL = 12
          for (let ti = 0; ti < TRAIL; ti++) {
            const tt = Math.max(0, pkt.t - ti * 0.012)
            const pos = bezierPoint(tt, A.x, A.y, cx, cy, B.x, B.y)
            const alpha = ((TRAIL - ti) / TRAIL) * 0.85
            const r = (1.5 + (TRAIL - ti) * 0.15) * dpr
            ctx.beginPath()
            ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2)
            ctx.fillStyle = arc.color + Math.round(alpha * 255).toString(16).padStart(2, '0')
            ctx.fill()
          }

          // Bright head
          const head = bezierPoint(pkt.t, A.x, A.y, cx, cy, B.x, B.y)
          ctx.beginPath()
          ctx.arc(head.x, head.y, 3 * dpr, 0, Math.PI * 2)
          ctx.fillStyle = '#fff'
          ctx.globalAlpha = 0.9
          ctx.fill()
          ctx.globalAlpha = 1
        }
      }

      // ── 4. Node pulses ─────────────────────────────────────────────────────
      for (const node of nodes) {
        for (let pi = node.pulses.length - 1; pi >= 0; pi--) {
          const pulse = node.pulses[pi]
          if (!reduced) { pulse.r += 1.4 * dpr; pulse.alpha -= 0.018 }
          if (pulse.alpha <= 0) { node.pulses.splice(pi, 1); continue }
          ctx.beginPath()
          ctx.arc(node.x, node.y, pulse.r, 0, Math.PI * 2)
          ctx.strokeStyle = node.color
          ctx.globalAlpha = pulse.alpha
          ctx.lineWidth = 1.2 * dpr
          ctx.stroke()
          ctx.globalAlpha = 1
        }
      }

      // ── 5. Node dots + labels ──────────────────────────────────────────────
      for (const node of nodes) {
        // Outer ring
        ctx.beginPath()
        ctx.arc(node.x, node.y, 5.5 * dpr, 0, Math.PI * 2)
        ctx.strokeStyle = node.color + '55'
        ctx.lineWidth = 1.2 * dpr
        ctx.stroke()

        // Inner dot
        ctx.beginPath()
        ctx.arc(node.x, node.y, 2.8 * dpr, 0, Math.PI * 2)
        ctx.fillStyle = node.color
        ctx.globalAlpha = 0.85
        ctx.fill()
        ctx.globalAlpha = 1

        // Label
        ctx.font = `${10 * dpr}px monospace`
        ctx.fillStyle = node.color + 'bb'
        ctx.textAlign = 'left'
        ctx.fillText(node.label, node.x + 8 * dpr, node.y + 4 * dpr)
      }

      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    />
  )
}
