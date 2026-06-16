'use client'
import { useEffect, useRef, ReactNode, CSSProperties } from 'react'
import { useVelocityRef } from '@/hooks/useVelocity'

const EFFECTS_DISABLED = process.env.NEXT_PUBLIC_DISABLE_EFFECTS === 'true'

interface Props {
  children: ReactNode
  className?: string
  style?: CSSProperties
  /** Max blur in px at full velocity (default 5) */
  maxBlur?: number
  /** Max chromatic shift in px at full velocity (default 4) */
  maxShift?: number
}

/**
 * VelocityFocus — wraps featured images/media.
 * Applies blur + faint RGB-split (via drop-shadow) proportional to
 * scroll+pointer velocity. When motion stops the image "snaps" back
 * into sharp focus — the Lusion "focus pull" signature effect.
 *
 * Pure CSS filters driven by a CSS var --v; no WebGL required.
 * Degrades to plain wrapper under reduced-motion / kill switch.
 */
export default function VelocityFocus({
  children,
  className,
  style,
  maxBlur  = 5,
  maxShift = 4,
}: Props) {
  const ref      = useRef<HTMLDivElement>(null)
  const velRef   = useVelocityRef()
  const rafRef   = useRef<number>(0)
  const currentV = useRef(0)

  useEffect(() => {
    if (EFFECTS_DISABLED) return
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const el = ref.current
    if (!el) return

    // IntersectionObserver — pause rAF when offscreen
    let visible = true
    const io = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting },
      { rootMargin: '100px' }
    )
    io.observe(el)

    const tick = () => {
      rafRef.current = requestAnimationFrame(tick)
      if (!visible) return

      // Lerp current velocity toward target for smooth ease-out
      currentV.current += (velRef.current - currentV.current) * 0.12
      const v = currentV.current

      const blur  = v * maxBlur
      const shift = v * maxShift

      // Chromatic aberration: stacked drop-shadows in R/B channels
      // Green channel = base image (no shift); R shifts right, B shifts left
      el.style.filter = blur < 0.05
        ? 'none'
        : `blur(${blur.toFixed(2)}px)
           drop-shadow(${shift.toFixed(2)}px 0 0 rgba(255,0,60,0.35))
           drop-shadow(-${shift.toFixed(2)}px 0 0 rgba(0,180,255,0.35))`
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafRef.current)
      io.disconnect()
    }
  }, [maxBlur, maxShift, velRef])

  return (
    <div ref={ref} className={className} style={{ willChange: 'filter', ...style }}>
      {children}
    </div>
  )
}
