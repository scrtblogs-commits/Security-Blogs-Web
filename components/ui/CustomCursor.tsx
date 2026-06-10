'use client'
import { useEffect, useRef } from 'react'

/*
  Shield cursor — replaces the default pointer with a tiny SVG shield.
  · Default : hollow shield outline (brand blue)
  · Hover   : filled shield + blue glow (over links, buttons, [role="button"])
  · Click   : shield shrinks 15% on mousedown
  Only activates on true pointer devices (not touch screens).
*/

export default function CustomCursor() {
  const shieldRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only on devices with a real mouse pointer
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    document.body.classList.add('has-custom-cursor')

    let cx = -120, cy = -120
    let raf = 0
    let isHover = false

    const onMove = (e: MouseEvent) => {
      cx = e.clientX
      cy = e.clientY
    }

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest(
        'a, button, [role="button"], label, .pill, input[type="submit"], input[type="button"]'
      )
      isHover = !!el
      const s = shieldRef.current
      if (!s) return
      if (isHover) {
        s.style.filter = 'drop-shadow(0 0 6px rgba(30,95,224,0.65))'
        // swap to filled shield via opacity on inner rects
        s.querySelector<SVGPathElement>('.sh-fill')!.style.opacity = '1'
        s.querySelector<SVGPathElement>('.sh-outline')!.style.opacity = '0'
      } else {
        s.style.filter = 'drop-shadow(0 0 3px rgba(30,95,224,0.30))'
        s.querySelector<SVGPathElement>('.sh-fill')!.style.opacity = '0'
        s.querySelector<SVGPathElement>('.sh-outline')!.style.opacity = '1'
      }
    }

    const onDown = () => {
      if (shieldRef.current) shieldRef.current.style.transform =
        `translate(${cx - 9}px, ${cy - 2}px) scale(0.82)`
    }
    const onUp = () => {
      if (shieldRef.current) shieldRef.current.style.transform =
        `translate(${cx - 9}px, ${cy - 2}px) scale(1)`
    }

    const loop = () => {
      if (shieldRef.current) {
        shieldRef.current.style.transform = `translate(${cx - 9}px, ${cy - 2}px) scale(${isHover ? 1.12 : 1})`
      }
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    raf = requestAnimationFrame(loop)

    return () => {
      document.body.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={shieldRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        width: 18,
        height: 22,
        willChange: 'transform',
        transition: 'filter 0.18s ease',
        filter: 'drop-shadow(0 0 3px rgba(30,95,224,0.30))',
      }}
    >
      <svg
        viewBox="0 0 18 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%' }}
      >
        {/* Filled variant — shown on hover */}
        <path
          className="sh-fill"
          d="M9 1L2 4v6c0 4.5 3.1 8.7 7 10 3.9-1.3 7-5.5 7-10V4L9 1z"
          fill="#1e5fe0"
          style={{ opacity: 0, transition: 'opacity 0.18s ease' }}
        />
        {/* Checkmark on filled */}
        <path
          className="sh-fill"
          d="M6 11l2 2 4-4"
          stroke="#fff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ opacity: 0, transition: 'opacity 0.18s ease' }}
        />

        {/* Outline variant — shown by default */}
        <path
          className="sh-outline"
          d="M9 1L2 4v6c0 4.5 3.1 8.7 7 10 3.9-1.3 7-5.5 7-10V4L9 1z"
          stroke="#1e5fe0"
          strokeWidth="1.6"
          strokeLinejoin="round"
          fill="rgba(30,95,224,0.08)"
          style={{ opacity: 1, transition: 'opacity 0.18s ease' }}
        />
        {/* Subtle inner line on outline */}
        <path
          className="sh-outline"
          d="M9 4.5L4.5 6.5V10c0 2.8 2 5.4 4.5 6.3C11.5 15.4 13.5 12.8 13.5 10V6.5L9 4.5z"
          stroke="#1e5fe0"
          strokeWidth="0.7"
          strokeLinejoin="round"
          fill="none"
          opacity="0.35"
          style={{ opacity: 0.35, transition: 'opacity 0.18s ease' }}
        />
      </svg>
    </div>
  )
}
