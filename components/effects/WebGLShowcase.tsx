'use client'
import { Suspense, lazy, useEffect, useState, useRef } from 'react'

const EFFECTS_DISABLED = process.env.NEXT_PUBLIC_DISABLE_EFFECTS === 'true'

// Lazy-load the heavy R3F canvas — excluded from initial JS bundle
const R3FCanvas = lazy(() => import('./WebGLCanvas'))

interface Props {
  /** DOM image src shown to crawlers + as fallback */
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  /** Accent colour for the shader tint (hex) */
  accent?: string
}

function canUseWebGL(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch { return false }
}

/**
 * WebGLShowcase — hero/featured image wrapper.
 *
 * On capable desktop (fine pointer + WebGL + no reduced-motion):
 *   renders a lazy-loaded R3F canvas BEHIND the DOM <img>.
 *   The canvas applies velocity-driven motion blur + chromatic aberration.
 *
 * Fallback (touch / no WebGL / reduced-motion / SSR):
 *   renders a plain <img> with VelocityFocus CSS filter.
 *
 * The DOM <img> is ALWAYS present for SEO / a11y — the canvas is purely
 * decorative and aria-hidden.
 */
export default function WebGLShowcase({ src, alt, width, height, className, accent = '#1e5fe0' }: Props) {
  const [useWebGL, setUseWebGL] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (EFFECTS_DISABLED) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (!canUseWebGL()) return
    // Don't run on low-end devices
    if (navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency < 4) return
    setUseWebGL(true)
  }, [])

  return (
    <div ref={containerRef} className={className} style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Decorative WebGL canvas — lazy loaded, aria-hidden */}
      {useWebGL && (
        <Suspense fallback={null}>
          <R3FCanvas
            src={src}
            accent={accent}
            containerRef={containerRef}
          />
        </Suspense>
      )}
      {/* Always-present DOM image — SEO + a11y */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          // Hide behind WebGL canvas on capable devices; visible on fallback
          opacity: useWebGL ? 0 : 1,
          transition: 'opacity 0.4s',
        }}
      />
    </div>
  )
}
