'use client'

import React, { Suspense, lazy, useEffect, useRef, useState } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

function Fallback({ loading }: { loading?: boolean }) {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: 280, display: 'grid', placeItems: 'center' }}>
      {loading ? (
        <span className="sg-loader" />
      ) : (
        <div style={{ position: 'relative', width: 180, height: 180 }}>
          <div className="float" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'radial-gradient(circle at 35% 30%, #6f4dff, #1e5fe0 60%, transparent 72%)', filter: 'blur(2px)', opacity: 0.9 }} />
          <div style={{ position: 'absolute', inset: -18, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.15)' }} />
          <div style={{ position: 'absolute', inset: -38, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.08)' }} />
        </div>
      )}
    </div>
  )
}

class SplineErrorBoundary extends React.Component<{ children: React.ReactNode }, { failed: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { failed: false }
  }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch() {}
  render() {
    if (this.state.failed) return <Fallback />
    return this.props.children
  }
}

// Decide once per page whether this device should render Spline at all.
// Skip on small screens, reduced-motion preference, and save-data hints.
function shouldRenderSpline(): boolean {
  if (typeof window === 'undefined') return false
  try {
    if (window.matchMedia('(max-width: 820px)').matches) return false
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection
    if (conn?.saveData) return false
    if (conn?.effectiveType && /2g|slow-2g/.test(conn.effectiveType)) return false
  } catch {
    return true
  }
  return true
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (!shouldRenderSpline()) return

    const node = containerRef.current
    if (!node) return

    // Idle delay so hydration + interactive controls (forms, buttons) settle first.
    const kick = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            setShouldLoad(true)
            observer.disconnect()
          }
        },
        { rootMargin: '200px' },
      )
      observer.observe(node)
      return () => observer.disconnect()
    }

    const w = window as Window & {
      requestIdleCallback?: (cb: () => void) => number
      cancelIdleCallback?: (id: number) => void
    }
    let cleanup: (() => void) | undefined
    const usingIdle = typeof w.requestIdleCallback === 'function'
    const id = usingIdle
      ? w.requestIdleCallback!(() => { cleanup = kick() })
      : window.setTimeout(() => { cleanup = kick() }, 600)

    return () => {
      if (usingIdle && typeof w.cancelIdleCallback === 'function') {
        w.cancelIdleCallback(id as number)
      } else {
        clearTimeout(id as number)
      }
      cleanup?.()
    }
  }, [])

  return (
    <div ref={containerRef} className={className} style={{ width: '100%', height: '100%' }}>
      {failed || !shouldLoad ? (
        <Fallback />
      ) : (
        <SplineErrorBoundary>
          <Suspense fallback={<Fallback loading />}>
            <Spline scene={scene} className={className} onError={() => setFailed(true)} />
          </Suspense>
        </SplineErrorBoundary>
      )}
    </div>
  )
}
