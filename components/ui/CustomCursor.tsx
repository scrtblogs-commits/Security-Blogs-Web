'use client'
import { useEffect, useRef } from 'react'

const EFFECTS_DISABLED = process.env.NEXT_PUBLIC_DISABLE_EFFECTS === 'true'

/**
 * CustomCursor — Lusion-style trailing ring cursor.
 * Fine pointer / desktop only. Hidden under reduced-motion.
 * Contextual labels: "read" over articles, "view" over cards/links.
 * Never replaces cursor on form fields.
 */
export default function CustomCursor() {
  const dotRef   = useRef<HTMLDivElement>(null)
  const ringRef  = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (EFFECTS_DISABLED) return
    if (typeof window === 'undefined') return
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const dot   = dotRef.current!
    const ring  = ringRef.current!
    const label = labelRef.current!

    document.body.classList.add('has-custom-cursor')

    let mx = 0, my = 0, rx = 0, ry = 0
    let hovered = false
    let rafId = 0

    function getLabel(el: Element | null): string {
      if (!el) return ''
      if (el.closest('article, .blog-card, [data-cursor="read"]')) return 'read'
      if (el.closest('a[href], button, .card, [data-cursor="view"]')) return 'view'
      return ''
    }

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      dot.style.transform = `translate(${mx - 4}px,${my - 4}px)`
      const tag = (e.target as HTMLElement)?.tagName
      ring.style.opacity = (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') ? '0' : '1'
    }

    const onOver = (e: MouseEvent) => {
      const lbl = getLabel(e.target as Element)
      hovered = lbl !== ''
      label.textContent = lbl
    }

    const loop = () => {
      rafId = requestAnimationFrame(loop)
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      const scale = hovered ? 1.8 : 1
      ring.style.transform = `translate(${rx - 20}px,${ry - 20}px) scale(${scale})`
      label.style.opacity = hovered ? '1' : '0'
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    rafId = requestAnimationFrame(loop)

    return () => {
      document.body.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 9999,
          width: 8, height: 8, borderRadius: '50%',
          background: 'var(--blue)', pointerEvents: 'none',
          mixBlendMode: 'difference',
          transform: 'translate(-9999px,-9999px)',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 9998,
          width: 40, height: 40, borderRadius: '50%',
          border: '1.5px solid var(--blue)', pointerEvents: 'none',
          mixBlendMode: 'difference',
          transition: 'transform .0s, opacity .15s',
          transform: 'translate(-9999px,-9999px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <span
          ref={labelRef}
          style={{
            fontSize: 9, fontWeight: 700, letterSpacing: '.08em',
            textTransform: 'uppercase', color: 'var(--blue)',
            opacity: 0, transition: 'opacity .15s',
            userSelect: 'none', pointerEvents: 'none',
          }}
        />
      </div>
    </>
  )
}
