'use client'
import { useEffect, useRef, useState } from 'react'

const ORBIT = ['ChatGPT', 'Perplexity', 'Google AI', 'Gemini', 'Bing Copilot', 'Wikipedia', 'LinkedIn', 'Industry Dirs']
const TERTIARY = ['SearchGPT', 'Claude', 'Meta AI']
const PULSE = ['#1e5fe0', '#f6c715', '#e23744']

export default function KnowledgeGraphCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  const [hover, setHover] = useState(false)
  useEffect(() => {
    const cv = ref.current
    if (!cv) return
    const ctx = cv.getContext('2d')!
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let raf = 0, t = 0
    const resize = () => { cv.width = cv.offsetWidth * dpr; cv.height = cv.offsetHeight * dpr }
    resize(); window.addEventListener('resize', resize)

    const draw = () => {
      const w = cv.width, h = cv.height
      ctx.clearRect(0, 0, w, h)
      const cx = w / 2, cy = h / 2
      const R = Math.min(w, h) * 0.34
      const R2 = Math.min(w, h) * 0.46
      const orbit = ORBIT.map((label, i) => {
        const ang = (i / ORBIT.length) * Math.PI * 2 + t * 0.12
        return { label, x: cx + Math.cos(ang) * R, y: cy + Math.sin(ang) * R }
      })
      const tert = TERTIARY.map((label, i) => {
        const ang = (i / TERTIARY.length) * Math.PI * 2 - t * 0.08 + 0.5
        return { label, x: cx + Math.cos(ang) * R2, y: cy + Math.sin(ang) * R2 }
      })
      // edges to centre + travelling pulses
      orbit.forEach((n, i) => {
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(n.x, n.y)
        ctx.strokeStyle = 'rgba(120,140,180,0.2)'; ctx.lineWidth = 1.2 * dpr; ctx.stroke()
        const phase = (t * 0.5 + i * 0.13) % 1
        const px = cx + (n.x - cx) * phase, py = cy + (n.y - cy) * phase
        ctx.beginPath(); ctx.arc(px, py, 3 * dpr, 0, Math.PI * 2); ctx.fillStyle = PULSE[i % 3]; ctx.fill()
      })
      // cross-links between adjacent orbital nodes
      for (let i = 0; i < 3; i++) {
        const a = orbit[i], b = orbit[i + 1]
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
        ctx.strokeStyle = 'rgba(110,77,255,0.22)'; ctx.lineWidth = 1 * dpr; ctx.stroke()
      }
      // tertiary nodes
      tert.forEach((n) => {
        ctx.beginPath(); ctx.arc(n.x, n.y, 5 * dpr, 0, Math.PI * 2); ctx.fillStyle = 'rgba(120,140,180,0.55)'; ctx.fill()
        ctx.font = `${10 * dpr}px IBM Plex Mono`; ctx.fillStyle = 'rgba(120,140,180,0.7)'; ctx.textAlign = 'center'
        ctx.fillText(n.label, n.x, n.y + 16 * dpr)
      })
      // orbital nodes
      orbit.forEach((n, i) => {
        ctx.beginPath(); ctx.arc(n.x, n.y, 9 * dpr, 0, Math.PI * 2); ctx.fillStyle = PULSE[i % 3]; ctx.globalAlpha = 0.9; ctx.fill(); ctx.globalAlpha = 1
        ctx.font = `600 ${11 * dpr}px IBM Plex Sans`; ctx.fillStyle = '#7a89a3'; ctx.textAlign = 'center'
        ctx.fillText(n.label, n.x, n.y + 22 * dpr)
      })
      // centre YOU node + pulsing halo
      const halo = (Math.sin(t * 2) + 1) / 2
      ctx.beginPath(); ctx.arc(cx, cy, (26 + halo * 10) * dpr, 0, Math.PI * 2); ctx.fillStyle = 'rgba(30,95,224,0.16)'; ctx.fill()
      ctx.beginPath(); ctx.arc(cx, cy, 24 * dpr, 0, Math.PI * 2); ctx.fillStyle = '#1e5fe0'; ctx.fill()
      ctx.font = `700 ${13 * dpr}px Sora`; ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
      ctx.fillText('YOU', cx, cy)
      ctx.textBaseline = 'alphabetic'
      t += 0.012
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: 360 }} onMouseMove={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }} />
      {hover && <span className="badge badge-blue" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, 36px)' }}>entity confirmed ✓</span>}
    </div>
  )
}
