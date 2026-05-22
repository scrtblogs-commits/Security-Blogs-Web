'use client'
import { useEffect, useRef } from 'react'

const LAYERS = [3, 5, 5, 3]
const COLORS = ['#1e5fe0', '#6f4dff', '#f6c715']

export default function NeuralNetworkCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const cv = ref.current
    if (!cv) return
    const ctx = cv.getContext('2d')!
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let raf = 0, t = 0
    const resize = () => { cv.width = cv.offsetWidth * dpr; cv.height = cv.offsetHeight * dpr }
    resize(); window.addEventListener('resize', resize)

    const nodes = () => {
      const w = cv.width, h = cv.height
      const pad = 60 * dpr
      const colW = (w - pad * 2) / (LAYERS.length - 1)
      return LAYERS.map((count, li) =>
        Array.from({ length: count }, (_, ni) => ({
          x: pad + li * colW,
          y: (h / (count + 1)) * (ni + 1),
        }))
      )
    }

    const draw = () => {
      const w = cv.width, h = cv.height
      ctx.clearRect(0, 0, w, h)
      const layers = nodes()
      // edges + signals
      for (let li = 0; li < layers.length - 1; li++) {
        layers[li].forEach((a) => {
          layers[li + 1].forEach((b) => {
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = 'rgba(120,140,180,0.16)'; ctx.lineWidth = 1 * dpr; ctx.stroke()
            const phase = (t + li * 0.25) % 1
            const sx = a.x + (b.x - a.x) * phase
            const sy = a.y + (b.y - a.y) * phase
            ctx.beginPath(); ctx.arc(sx, sy, 2.6 * dpr, 0, Math.PI * 2)
            ctx.fillStyle = COLORS[(li) % COLORS.length]; ctx.globalAlpha = 1 - Math.abs(phase - 0.5) * 1.4
            ctx.fill(); ctx.globalAlpha = 1
          })
        })
      }
      // nodes
      layers.forEach((layer, li) => layer.forEach((n) => {
        ctx.beginPath(); ctx.arc(n.x, n.y, 7 * dpr, 0, Math.PI * 2)
        ctx.fillStyle = COLORS[li % COLORS.length]; ctx.fill()
        ctx.beginPath(); ctx.arc(n.x, n.y, 12 * dpr, 0, Math.PI * 2)
        ctx.strokeStyle = COLORS[li % COLORS.length]; ctx.globalAlpha = 0.25; ctx.lineWidth = 2 * dpr; ctx.stroke(); ctx.globalAlpha = 1
      }))
      t += 0.008
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} style={{ width: '100%', height: '100%', minHeight: 320, display: 'block' }} />
}
