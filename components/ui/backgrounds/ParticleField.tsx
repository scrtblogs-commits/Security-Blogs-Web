'use client'
import { useEffect, useRef } from 'react'

export default function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const cv = ref.current
    if (!cv) return
    const ctx = cv.getContext('2d')!
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    const mouse = { x: -9999, y: -9999 }

    const resize = () => { cv.width = window.innerWidth * dpr; cv.height = window.innerHeight * dpr }
    resize()

    const count = Math.min(80, Math.floor(window.innerWidth / 18))
    const colors = ['#1e5fe0', '#6f4dff', '#e23744', '#f6c715']
    const pts = Array.from({ length: count }, () => ({
      x: Math.random() * cv.width,
      y: Math.random() * cv.height,
      vx: (Math.random() - 0.5) * 0.35 * dpr,
      vy: (Math.random() - 0.5) * 0.35 * dpr,
      c: colors[Math.floor(Math.random() * colors.length)],
    }))

    const draw = () => {
      ctx.clearRect(0, 0, cv.width, cv.height)
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]
        if (!reduced) { p.x += p.vx; p.y += p.vy }
        if (p.x < 0 || p.x > cv.width) p.vx *= -1
        if (p.y < 0 || p.y > cv.height) p.vy *= -1
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.6 * dpr, 0, Math.PI * 2)
        ctx.fillStyle = p.c; ctx.globalAlpha = 0.55; ctx.fill()
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j]
          const d = Math.hypot(p.x - q.x, p.y - q.y)
          const max = 130 * dpr
          if (d < max) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = p.c; ctx.globalAlpha = (1 - d / max) * 0.16; ctx.lineWidth = 1
            ctx.stroke()
          }
        }
        const dm = Math.hypot(p.x - mouse.x, p.y - mouse.y)
        if (dm < 150 * dpr) {
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y)
          ctx.strokeStyle = p.c; ctx.globalAlpha = (1 - dm / (150 * dpr)) * 0.25; ctx.lineWidth = 1; ctx.stroke()
        }
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }
    draw()

    const onMove = (e: MouseEvent) => { mouse.x = e.clientX * dpr; mouse.y = e.clientY * dpr }
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999 }
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseout', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseout', onLeave)
    }
  }, [])

  return <canvas ref={ref} aria-hidden style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
}
