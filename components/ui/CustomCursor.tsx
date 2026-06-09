'use client'
import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    document.body.classList.add('has-custom-cursor')

    let tx = -100, ty = -100   // target (dot — instant)
    let rx = -100, ry = -100   // ring position (lagged)
    let raf = 0
    let isHover = false
    let isClick = false

    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY }

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('a, button, [role="button"], .pill, [data-cursor]') as HTMLElement | null
      isHover = !!el
      if (textRef.current) {
        const label = el?.getAttribute('data-cursor') || (el?.tagName === 'A' ? '' : '')
        textRef.current.textContent = label
        textRef.current.style.opacity = label ? '1' : '0'
      }
      if (ringRef.current) {
        ringRef.current.style.width  = isHover ? '52px' : '32px'
        ringRef.current.style.height = isHover ? '52px' : '32px'
        ringRef.current.style.borderColor = isHover ? 'var(--blue)' : 'rgba(30,95,224,0.55)'
        ringRef.current.style.background  = isHover ? 'rgba(30,95,224,0.06)' : 'transparent'
        ringRef.current.style.boxShadow   = isHover ? '0 0 18px 2px rgba(30,95,224,0.20)' : 'none'
      }
    }

    const onDown = () => {
      isClick = true
      if (dotRef.current)  dotRef.current.style.transform  = `translate(${tx - 3}px,${ty - 3}px) scale(0.5)`
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx - 26}px,${ry - 26}px) scale(0.88)`
    }
    const onUp = () => { isClick = false }

    const loop = () => {
      rx += (tx - rx) * 0.14
      ry += (ty - ry) * 0.14

      if (dotRef.current && !isClick)
        dotRef.current.style.transform = `translate(${tx - 4}px,${ty - 4}px) scale(1)`

      if (ringRef.current) {
        const offset = isHover ? 26 : 16
        ringRef.current.style.transform = `translate(${rx - offset}px,${ry - offset}px)`
      }
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup',   onUp)
    raf = requestAnimationFrame(loop)

    return () => {
      document.body.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup',   onUp)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      {/* Solid dot — snaps instantly */}
      <div ref={dotRef} style={{
        position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999,
        width: 8, height: 8, borderRadius: '50%',
        background: 'var(--blue)',
        boxShadow: '0 0 6px 1px rgba(30,95,224,0.55)',
        transition: 'transform 0.08s ease',
        willChange: 'transform',
      }} />

      {/* Lagged ring — transitions size & glow on hover */}
      <div ref={ringRef} style={{
        position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9998,
        width: 32, height: 32, borderRadius: '50%',
        border: '1.5px solid rgba(30,95,224,0.55)',
        background: 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'width 0.22s ease, height 0.22s ease, border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease',
        willChange: 'transform',
      }}>
        <span ref={textRef} style={{
          fontSize: 9, fontFamily: 'var(--font-mono)', fontWeight: 700,
          color: 'var(--blue)', letterSpacing: '0.05em',
          opacity: 0, transition: 'opacity 0.2s ease',
          userSelect: 'none', whiteSpace: 'nowrap',
        }} />
      </div>
    </>
  )
}
