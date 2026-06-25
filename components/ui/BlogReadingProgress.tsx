'use client'
import { useEffect, useState } from 'react'

export default function BlogReadingProgress() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById('article-body')
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = el.offsetHeight
      const scrolled = Math.max(0, -rect.top)
      setPct(Math.min(100, (scrolled / (total - window.innerHeight * 0.5)) * 100))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="sg-read-progress"
      style={{ width: `${pct}%` }}
      aria-hidden="true"
    />
  )
}
