'use client'
import { useRef, ReactNode } from 'react'

export default function GlassCard({
  children, tilt = true, className = '', style, glow = false,
}: { children: ReactNode; tilt?: boolean; className?: string; style?: React.CSSProperties; glow?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent) => {
    if (!tilt || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    ref.current.style.transform = `perspective(900px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg) translateY(-4px)`
  }
  const reset = () => { if (ref.current) ref.current.style.transform = 'perspective(900px) rotateY(0) rotateX(0) translateY(0)' }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`glass ${glow ? 'glow-border' : ''} ${className}`}
      style={{ padding: 26, transition: 'transform 0.2s ease', willChange: 'transform', ...style }}
    >
      {children}
    </div>
  )
}
