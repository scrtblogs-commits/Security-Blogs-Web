'use client'
import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const spotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const spot = spotRef.current!
    let tx = -500, ty = -500, cx = -500, cy = -500, raf = 0

    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY }

    const loop = () => {
      raf = requestAnimationFrame(loop)
      cx += (tx - cx) * 0.1
      cy += (ty - cy) * 0.1
      spot.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={spotRef}
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 320,
        height: 320,
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 0,
        background: 'radial-gradient(circle, rgba(30,95,224,0.07) 0%, transparent 70%)',
        transform: 'translate(-9999px,-9999px)',
        willChange: 'transform',
      }}
    />
  )
}
