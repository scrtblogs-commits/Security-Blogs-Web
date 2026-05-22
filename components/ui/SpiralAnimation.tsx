'use client'
import { useEffect, useRef } from 'react'

export default function SpiralAnimation({ tint = '#1e5fe0' }: { tint?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const cv = ref.current
    if (!cv) return
    const ctx = cv.getContext('2d')!
    let raf = 0, t = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const resize = () => {
      cv.width = cv.offsetWidth * dpr
      cv.height = cv.offsetHeight * dpr
    }
    resize()
    window.addEventListener('resize', resize)
    const arms = 5, dots = 90
    const draw = () => {
      const w = cv.width, h = cv.height
      ctx.clearRect(0, 0, w, h)
      const cx = w / 2, cy = h / 2
      for (let a = 0; a < arms; a++) {
        for (let i = 0; i < dots; i++) {
          const prog = i / dots
          const angle = prog * Math.PI * 6 + (a / arms) * Math.PI * 2 + t
          const radius = prog * Math.min(w, h) * 0.5
          const x = cx + Math.cos(angle) * radius
          const y = cy + Math.sin(angle) * radius
          const size = (1 - prog) * 3.4 * dpr + 0.5
          ctx.beginPath()
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fillStyle = tint
          ctx.globalAlpha = (1 - prog) * 0.5
          ctx.fill()
        }
      }
      ctx.globalAlpha = 1
      t += 0.0024
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [tint])

  return <canvas ref={ref} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.55 }} />
}
