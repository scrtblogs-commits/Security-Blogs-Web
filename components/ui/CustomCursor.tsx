'use client'
import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    document.body.classList.add('has-custom-cursor')
    let rx = 0, ry = 0, mx = 0, my = 0
    let raf = 0

    const move = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      if (dot.current) dot.current.style.transform = `translate(${mx - 4}px, ${my - 4}px)`
    }
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      const interactive = t.closest('a, button, .pill, [data-cursor]')
      if (ring.current) ring.current.style.transform += interactive ? '' : ''
      if (ring.current) ring.current.dataset.hover = interactive ? '1' : '0'
    }
    const loop = () => {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18
      if (ring.current) {
        const s = ring.current.dataset.hover === '1' ? 1.6 : 1
        ring.current.style.transform = `translate(${rx - 16}px, ${ry - 16}px) scale(${s})`
      }
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    raf = requestAnimationFrame(loop)
    return () => {
      document.body.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dot} style={{ position: 'fixed', top: 0, left: 0, width: 8, height: 8, borderRadius: '50%', background: 'var(--blue)', pointerEvents: 'none', zIndex: 300, mixBlendMode: 'difference' }} />
      <div ref={ring} data-hover="0" style={{ position: 'fixed', top: 0, left: 0, width: 32, height: 32, borderRadius: '50%', border: '1.5px solid var(--blue)', pointerEvents: 'none', zIndex: 300, transition: 'width .2s, height .2s', opacity: 0.6 }} />
    </>
  )
}
