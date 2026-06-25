'use client'
import { useEffect, useState } from 'react'

type Heading = { id: string; label: string; level: number }

function extractHeadings(html: string): Heading[] {
  const headings: Heading[] = []
  const re = /<h([23])[^>]*>(.*?)<\/h[23]>/gi
  let match
  while ((match = re.exec(html)) !== null) {
    const level = parseInt(match[1])
    const raw = match[2].replace(/<[^>]+>/g, '')
    const id = raw.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    headings.push({ id, label: raw, level })
  }
  return headings
}

export default function BlogTOC({ html }: { html: string }) {
  const headings = extractHeadings(html)
  const [active, setActive] = useState('')

  useEffect(() => {
    if (!headings.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) setActive(visible[0].target.id)
      },
      { rootMargin: '-20% 0px -70% 0px' }
    )
    headings.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (headings.length < 2) return null

  return (
    <div className="sg-sidebar-widget" style={{ marginBottom: 20 }}>
      <div className="sg-sidebar-widget-title">On this page</div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {headings.map((h) => (
          <a
            key={h.id}
            href={`#${h.id}`}
            className={`sg-toc-link${active === h.id ? ' active' : ''}`}
            style={{ paddingLeft: h.level === 3 ? 20 : 10 }}
            onClick={(e) => {
              e.preventDefault()
              const el = document.getElementById(h.id)
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
              setActive(h.id)
            }}
          >
            {h.label}
          </a>
        ))}
      </nav>
    </div>
  )
}
