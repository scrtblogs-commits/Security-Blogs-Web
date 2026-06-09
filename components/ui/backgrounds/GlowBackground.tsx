'use client'
import { useEffect, useRef } from 'react'

// Enhanced sitewide background:
//   1. Soft animated aurora blobs (blue, violet, teal, pink)
//   2. Subtle dot grid that drifts slowly
//   3. Canvas particle network with mouse interaction
//   4. Fine noise grain texture overlay

export default function GlowBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = canvasRef.current
    if (!cv) return
    const ctx = cv.getContext('2d')!
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    const mouse = { x: -9999, y: -9999 }

    const resize = () => {
      cv.width  = window.innerWidth  * dpr
      cv.height = window.innerHeight * dpr
    }
    resize()

    // More particles, brighter connections, interactive mouse
    const count  = Math.min(120, Math.floor(window.innerWidth / 14))
    const colors = ['#1e5fe0', '#6f4dff', '#1e9e75', '#e23744', '#0ea5e9']
    const pts = Array.from({ length: count }, () => ({
      x:  Math.random() * cv.width,
      y:  Math.random() * cv.height,
      vx: (Math.random() - 0.5) * 0.4 * dpr,
      vy: (Math.random() - 0.5) * 0.4 * dpr,
      r:  (1.4 + Math.random() * 1.6) * dpr,
      c:  colors[Math.floor(Math.random() * colors.length)],
    }))

    const draw = () => {
      ctx.clearRect(0, 0, cv.width, cv.height)

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]
        if (!reduced) { p.x += p.vx; p.y += p.vy }
        if (p.x < 0 || p.x > cv.width)  p.vx *= -1
        if (p.y < 0 || p.y > cv.height) p.vy *= -1

        // Draw dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle  = p.c
        ctx.globalAlpha = 0.65
        ctx.fill()

        // Connect nearby dots
        for (let j = i + 1; j < pts.length; j++) {
          const q   = pts[j]
          const d   = Math.hypot(p.x - q.x, p.y - q.y)
          const max = 150 * dpr
          if (d < max) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle  = p.c
            ctx.globalAlpha  = (1 - d / max) * 0.20
            ctx.lineWidth    = 1
            ctx.stroke()
          }
        }

        // Connect to mouse
        const dm  = Math.hypot(p.x - mouse.x * dpr, p.y - mouse.y * dpr)
        const maxM = 180 * dpr
        if (dm < maxM) {
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(mouse.x * dpr, mouse.y * dpr)
          ctx.strokeStyle  = p.c
          ctx.globalAlpha  = (1 - dm / maxM) * 0.35
          ctx.lineWidth    = 1.2
          ctx.stroke()
        }
      }

      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }
    draw()

    const onMove  = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY }
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999 }
    window.addEventListener('resize',    resize)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseout',  onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize',    resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseout',  onLeave)
    }
  }, [])

  return (
    <>
      {/* ── Layer 1: Aurora blobs ── */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <div className="gb-blob gb-blob-1" />
        <div className="gb-blob gb-blob-2" />
        <div className="gb-blob gb-blob-3" />
        <div className="gb-blob gb-blob-4" />
      </div>

      {/* ── Layer 2: Dot grid ── */}
      <div aria-hidden className="gb-grid" />

      {/* ── Layer 3: Particle canvas ── */}
      <canvas
        ref={canvasRef}
        aria-hidden
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />

      <style>{`
        /* Aurora blobs */
        .gb-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          will-change: transform;
          pointer-events: none;
        }
        .gb-blob-1 {
          width: 65vw; height: 65vw;
          top: -18vw; left: -10vw;
          background: radial-gradient(circle, rgba(30,95,224,0.20) 0%, transparent 65%);
          animation: gb-drift-a 24s ease-in-out infinite;
        }
        .gb-blob-2 {
          width: 55vw; height: 55vw;
          top: 10vh; right: -12vw;
          background: radial-gradient(circle, rgba(111,77,255,0.17) 0%, transparent 65%);
          animation: gb-drift-b 30s ease-in-out infinite;
        }
        .gb-blob-3 {
          width: 45vw; height: 45vw;
          bottom: -12vw; left: 25vw;
          background: radial-gradient(circle, rgba(14,165,233,0.14) 0%, transparent 65%);
          animation: gb-drift-c 26s ease-in-out infinite;
        }
        .gb-blob-4 {
          width: 38vw; height: 38vw;
          top: 40vh; left: 45vw;
          background: radial-gradient(circle, rgba(30,158,117,0.10) 0%, transparent 65%);
          animation: gb-drift-d 32s ease-in-out infinite;
        }
        @keyframes gb-drift-a { 0%,100%{transform:translate(0,0)  scale(1)}   50%{transform:translate(8vw,  6vh)  scale(1.14)} }
        @keyframes gb-drift-b { 0%,100%{transform:translate(0,0)  scale(1)}   50%{transform:translate(-7vw, 9vh)  scale(1.10)} }
        @keyframes gb-drift-c { 0%,100%{transform:translate(0,0)  scale(1)}   50%{transform:translate(5vw, -5vh)  scale(1.18)} }
        @keyframes gb-drift-d { 0%,100%{transform:translate(0,0)  scale(1)}   50%{transform:translate(-6vw,-7vh)  scale(1.12)} }

        /* Dot grid */
        .gb-grid {
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(30,95,224,0.18) 1px, transparent 1px);
          background-size: 32px 32px;
          opacity: 0.55;
          animation: gb-grid-shift 40s linear infinite;
        }
        @keyframes gb-grid-shift {
          from { background-position: 0 0; }
          to   { background-position: 32px 32px; }
        }

        /* Reduce motion */
        @media (prefers-reduced-motion: reduce) {
          .gb-blob, .gb-grid { animation: none !important; }
        }
      `}</style>
    </>
  )
}
