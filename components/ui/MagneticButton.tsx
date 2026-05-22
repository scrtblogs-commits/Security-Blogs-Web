'use client'
import { useRef, ReactNode } from 'react'
import Link from 'next/link'

export default function MagneticButton({
  children, href, className = 'btn btn-primary', strength = 0.4, ...rest
}: { children: ReactNode; href?: string; className?: string; strength?: number; onClick?: () => void; type?: 'button' | 'submit' }) {
  const ref = useRef<HTMLSpanElement>(null)

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left - r.width / 2) * strength
    const y = (e.clientY - r.top - r.height / 2) * strength
    el.style.transform = `translate(${x}px, ${y}px)`
  }
  const reset = () => { if (ref.current) ref.current.style.transform = 'translate(0,0)' }

  const inner = (
    <span ref={ref} style={{ display: 'inline-flex', transition: 'transform 0.2s cubic-bezier(.2,.8,.2,1)' }} onMouseMove={onMove} onMouseLeave={reset}>
      {children}
    </span>
  )

  if (href) return <Link href={href} className={className} {...rest}>{inner}</Link>
  return <button className={className} {...rest}>{inner}</button>
}
