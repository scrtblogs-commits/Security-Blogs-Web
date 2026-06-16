'use client'
import { useRef, ReactNode } from 'react'
import Link from 'next/link'

const EFFECTS_DISABLED = process.env.NEXT_PUBLIC_DISABLE_EFFECTS === 'true'
// Cap displacement at 10px per brief
const MAX_PX = 10

/**
 * MagneticButton / Magnetic wrapper.
 * Interactive elements translate toward cursor on hover; ease back on leave.
 * Desktop / fine-pointer only — no effect on touch.
 * Displacement capped at MAX_PX regardless of element size.
 */
export default function MagneticButton({
  children, href, className = 'btn btn-primary', strength = 0.35, ...rest
}: {
  children: ReactNode
  href?: string
  className?: string
  strength?: number
  onClick?: () => void
  type?: 'button' | 'submit'
}) {
  const ref = useRef<HTMLSpanElement>(null)

  const onMove = (e: React.MouseEvent) => {
    if (EFFECTS_DISABLED) return
    if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) return
    const el = ref.current
    if (!el) return
    const r  = el.getBoundingClientRect()
    const dx = (e.clientX - r.left - r.width  / 2) * strength
    const dy = (e.clientY - r.top  - r.height / 2) * strength
    // Cap at MAX_PX
    const x  = Math.max(-MAX_PX, Math.min(MAX_PX, dx))
    const y  = Math.max(-MAX_PX, Math.min(MAX_PX, dy))
    el.style.transition = 'transform 0.08s'
    el.style.transform  = `translate(${x}px,${y}px)`
  }

  const reset = () => {
    if (!ref.current) return
    ref.current.style.transition = 'transform 0.55s cubic-bezier(.34,1.56,.64,1)'
    ref.current.style.transform  = 'translate(0,0)'
  }

  const inner = (
    <span
      ref={ref}
      style={{ display: 'inline-flex' }}
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      {children}
    </span>
  )

  if (href) return <Link href={href} className={className} {...rest}>{inner}</Link>
  return <button className={className} {...rest}>{inner}</button>
}

/**
 * Magnetic — generic wrapper for any element (not just buttons).
 * Use to wrap cards, links, icons, etc.
 */
export function Magnetic({
  children, className, strength = 0.3,
}: { children: ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent) => {
    if (EFFECTS_DISABLED) return
    if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) return
    const el = ref.current
    if (!el) return
    const r  = el.getBoundingClientRect()
    const dx = (e.clientX - r.left - r.width  / 2) * strength
    const dy = (e.clientY - r.top  - r.height / 2) * strength
    const x  = Math.max(-MAX_PX, Math.min(MAX_PX, dx))
    const y  = Math.max(-MAX_PX, Math.min(MAX_PX, dy))
    el.style.transition = 'transform 0.08s'
    el.style.transform  = `translate(${x}px,${y}px)`
  }

  const reset = () => {
    if (!ref.current) return
    ref.current.style.transition = 'transform 0.55s cubic-bezier(.34,1.56,.64,1)'
    ref.current.style.transform  = 'translate(0,0)'
  }

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      {children}
    </div>
  )
}
