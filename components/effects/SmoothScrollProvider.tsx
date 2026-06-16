'use client'
import { useEffect, useRef, createContext, useContext, ReactNode } from 'react'
import Lenis from 'lenis'
import { _emitVelocity } from '@/hooks/useVelocity'

// ── Kill switch ─────────────────────────────────────────────────────────────
const EFFECTS_DISABLED = process.env.NEXT_PUBLIC_DISABLE_EFFECTS === 'true'

// ── Context (exposes Lenis instance to children) ─────────────────────────────
const LenisContext = createContext<Lenis | null>(null)
export const useLenis = () => useContext(LenisContext)

interface Props { children: ReactNode }

export default function SmoothScrollProvider({ children }: Props) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Never run on server, never run under reduced-motion or kill switch
    if (EFFECTS_DISABLED) return
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      lerp: 0.1,           // gentle inertia — matches Lusion feel
      smoothWheel: true,
      touchMultiplier: 0,  // no touch hijack (native on mobile)
    })
    lenisRef.current = lenis

    // ── Velocity tracking ────────────────────────────────────────────────────
    // We track lenis scroll velocity + pointer velocity in ONE shared rAF loop.
    // All cursor lerp, VelocityFocus, and WebGL sync read from _emitVelocity().
    let scrollVel  = 0
    let pointerVel = 0
    let px = 0, py = 0, ppx = 0, ppy = 0
    let rafId = 0

    const onPointer = (e: PointerEvent) => { px = e.clientX; py = e.clientY }
    window.addEventListener('pointermove', onPointer, { passive: true })

    const tick = (time: number) => {
      lenis.raf(time)

      // Lenis exposes velocity (signed) — take abs
      scrollVel = Math.abs((lenis as unknown as { velocity: number }).velocity ?? 0)

      // Pointer velocity (px/frame, normalised)
      const dPtr = Math.sqrt((px - ppx) ** 2 + (py - ppy) ** 2)
      ppx = px; ppy = py
      pointerVel += (dPtr - pointerVel) * 0.25

      // Combined, normalised 0–1 (cap at reasonable max)
      const combined = Math.min((scrollVel * 0.08 + pointerVel * 0.04), 1)
      _emitVelocity(combined)

      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    // Pause rAF when tab is hidden
    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(rafId)
      else rafId = requestAnimationFrame(tick)
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('pointermove', onPointer)
      document.removeEventListener('visibilitychange', onVisibility)
      lenis.destroy()
    }
  }, [])

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  )
}
