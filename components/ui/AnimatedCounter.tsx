'use client'
import { useEffect, useRef, useState } from 'react'

export default function AnimatedCounter({
  value, prefix = '', suffix = '', decimals = 0, duration = 1800,
}: { value: number; prefix?: string; suffix?: string; decimals?: number; duration?: number }) {
  const [n, setN] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf: number

    const start = () => {
      setN(0)
      const t0 = performance.now()
      const tick = (now: number) => {
        const p = Math.min((now - t0) / duration, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        setN(value * eased)
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) start()
    }, { threshold: 0.5, rootMargin: '0px 0px -60px 0px' })

    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [value, duration])

  return (
    <span ref={ref}>
      {prefix}{n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}
    </span>
  )
}
