'use client'
import { useEffect, useRef } from 'react'

// Option D: Faint floating browser/search wireframes
// - Ghost browser windows drifting in 3D
// - Animated search bars with blinking cursors
// - Ranking list skeletons (pos 1, 2, 3 bars)
// - All very low opacity so content stays readable

type Shape = {
  type: 'browser' | 'search' | 'ranking'
  x: number
  y: number
  w: number
  h: number
  vx: number
  vy: number
  rot: number
  vrot: number
  opacity: number
  scale: number
  phase: number  // for internal animations
}

export default function WebWireframeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = canvasRef.current
    if (!cv) return
    const ctx = cv.getContext('2d')!
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let t = 0

    const resize = () => {
      cv.width  = window.innerWidth  * dpr
      cv.height = window.innerHeight * dpr
    }
    resize()

    const W = () => cv.width
    const H = () => cv.height

    // Spawn shapes distributed across screen
    const shapes: Shape[] = []
    const types: Shape['type'][] = ['browser', 'search', 'ranking']
    for (let i = 0; i < 14; i++) {
      const type = types[i % 3]
      const w = type === 'browser' ? 180 * dpr : type === 'search' ? 160 * dpr : 120 * dpr
      const h = type === 'browser' ? 120 * dpr : type === 'search' ?  44 * dpr :  90 * dpr
      shapes.push({
        type,
        x: Math.random() * W(),
        y: Math.random() * H(),
        w, h,
        vx: (Math.random() - 0.5) * 0.18 * dpr,
        vy: (Math.random() - 0.5) * 0.18 * dpr,
        rot: (Math.random() - 0.5) * 18,   // degrees
        vrot: (Math.random() - 0.5) * 0.015,
        opacity: 0.06 + Math.random() * 0.07,
        scale: 0.7 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
      })
    }

    const BLUE   = 'rgba(30,95,224,'
    const VIOLET = 'rgba(111,77,255,'

    function drawBrowser(s: Shape) {
      const { w, h } = s
      const r = 6 * dpr
      const barH = 22 * dpr
      const color = BLUE

      // Window chrome
      ctx.beginPath()
      ctx.roundRect(-w/2, -h/2, w, h, r)
      ctx.strokeStyle = color + s.opacity + ')'
      ctx.lineWidth = 1.2 * dpr
      ctx.stroke()

      // Title bar separator
      ctx.beginPath()
      ctx.moveTo(-w/2, -h/2 + barH)
      ctx.lineTo( w/2, -h/2 + barH)
      ctx.strokeStyle = color + (s.opacity * 0.7) + ')'
      ctx.lineWidth = 0.8 * dpr
      ctx.stroke()

      // 3 traffic light dots
      const dotR = 3.5 * dpr
      const dotY = -h/2 + barH/2
      for (let d = 0; d < 3; d++) {
        ctx.beginPath()
        ctx.arc(-w/2 + 10*dpr + d*11*dpr, dotY, dotR, 0, Math.PI*2)
        ctx.strokeStyle = color + s.opacity + ')'
        ctx.lineWidth = 0.8 * dpr
        ctx.stroke()
      }

      // URL bar
      const urlX = -w/2 + 48*dpr
      const urlW = w - 58*dpr
      const urlH = 12*dpr
      ctx.beginPath()
      ctx.roundRect(urlX, dotY - urlH/2, urlW, urlH, 4*dpr)
      ctx.strokeStyle = color + (s.opacity * 0.5) + ')'
      ctx.lineWidth = 0.7 * dpr
      ctx.stroke()

      // Content skeleton lines
      const lineY0 = -h/2 + barH + 14*dpr
      const lineWidths = [0.85, 0.6, 0.75, 0.4]
      lineWidths.forEach((lw, idx) => {
        ctx.beginPath()
        ctx.roundRect(-w/2 + 10*dpr, lineY0 + idx*14*dpr, (w - 20*dpr)*lw, 7*dpr, 3*dpr)
        ctx.fillStyle = color + (s.opacity * 0.35) + ')'
        ctx.fill()
      })

      // Blinking cursor on last line (uses global t)
      if (Math.sin(t * 0.04 + s.phase) > 0) {
        const cursorX = -w/2 + 10*dpr + (w - 20*dpr) * lineWidths[3] + 4*dpr
        const cursorY = lineY0 + 3*14*dpr
        ctx.beginPath()
        ctx.rect(cursorX, cursorY, 1.5*dpr, 7*dpr)
        ctx.fillStyle = color + s.opacity + ')'
        ctx.fill()
      }
    }

    function drawSearch(s: Shape) {
      const { w, h } = s
      const color = VIOLET
      const r = h / 2

      // Search bar pill
      ctx.beginPath()
      ctx.roundRect(-w/2, -h/2, w, h, r)
      ctx.strokeStyle = color + s.opacity + ')'
      ctx.lineWidth = 1.2 * dpr
      ctx.stroke()

      // Search icon circle (magnifier)
      const icX = -w/2 + 14*dpr
      const icR = 5.5*dpr
      ctx.beginPath()
      ctx.arc(icX, 0, icR, 0, Math.PI*2)
      ctx.strokeStyle = color + (s.opacity * 0.8) + ')'
      ctx.lineWidth = 1.2*dpr
      ctx.stroke()
      // handle
      ctx.beginPath()
      ctx.moveTo(icX + icR * 0.7, icR * 0.7)
      ctx.lineTo(icX + icR * 1.5, icR * 1.5)
      ctx.stroke()

      // Placeholder text skeleton
      ctx.beginPath()
      ctx.roundRect(-w/2 + 30*dpr, -4*dpr, (w - 50*dpr) * 0.55, 8*dpr, 3*dpr)
      ctx.fillStyle = color + (s.opacity * 0.3) + ')'
      ctx.fill()

      // Blinking cursor
      if (Math.sin(t * 0.05 + s.phase) > 0) {
        const cx = -w/2 + 30*dpr + (w - 50*dpr) * 0.55 + 4*dpr
        ctx.beginPath()
        ctx.rect(cx, -5*dpr, 1.5*dpr, 10*dpr)
        ctx.fillStyle = color + s.opacity + ')'
        ctx.fill()
      }
    }

    function drawRanking(s: Shape) {
      const { w, h } = s
      const color = BLUE
      const rows = 3
      const rowH = h / (rows + 0.5)
      const widths = [0.9, 0.7, 0.55]

      // Position badge + bar for each rank
      for (let i = 0; i < rows; i++) {
        const rowY = -h/2 + i * rowH + rowH * 0.3

        // Rank number badge
        const badgeR = 7*dpr
        ctx.beginPath()
        ctx.arc(-w/2 + badgeR + 4*dpr, rowY + badgeR, badgeR, 0, Math.PI*2)
        ctx.strokeStyle = color + s.opacity + ')'
        ctx.lineWidth = 0.9*dpr
        ctx.stroke()

        // Title bar
        ctx.beginPath()
        ctx.roundRect(-w/2 + 22*dpr, rowY + 2*dpr, (w - 26*dpr)*widths[i], 8*dpr, 3*dpr)
        ctx.fillStyle = color + (s.opacity * 0.4) + ')'
        ctx.fill()

        // Sub bar (URL)
        ctx.beginPath()
        ctx.roundRect(-w/2 + 22*dpr, rowY + 14*dpr, (w - 26*dpr)*widths[i]*0.55, 5*dpr, 2*dpr)
        ctx.fillStyle = color + (s.opacity * 0.2) + ')'
        ctx.fill()
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, W(), H())
      t++

      for (const s of shapes) {
        if (!reduced) {
          s.x  += s.vx
          s.y  += s.vy
          s.rot += s.vrot
        }

        // Wrap around edges with margin
        const margin = Math.max(s.w, s.h)
        if (s.x < -margin)    s.x = W() + margin * 0.5
        if (s.x > W() + margin) s.x = -margin * 0.5
        if (s.y < -margin)    s.y = H() + margin * 0.5
        if (s.y > H() + margin) s.y = -margin * 0.5

        ctx.save()
        ctx.translate(s.x, s.y)
        ctx.rotate((s.rot * Math.PI) / 180)
        ctx.scale(s.scale, s.scale)

        if (s.type === 'browser')  drawBrowser(s)
        if (s.type === 'search')   drawSearch(s)
        if (s.type === 'ranking')  drawRanking(s)

        ctx.restore()
      }

      raf = requestAnimationFrame(draw)
    }
    draw()

    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
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
