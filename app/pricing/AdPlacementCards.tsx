'use client'
import { useState } from 'react'

type Placement = { icon: string; label: string; price: string; desc: string; href: string }

function AdCard({ p }: { p: Placement }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a href={p.href} style={{ textDecoration: 'none' }}>
      <div
        className="card"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          padding: '20px 22px',
          height: '100%',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          transform: hovered ? 'translateY(-4px)' : undefined,
          boxShadow: hovered ? '0 8px 32px -8px rgba(18,42,86,0.14)' : undefined,
        }}
      >
        <div style={{ fontSize: 26, marginBottom: 10 }}>{p.icon}</div>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#0f2244', marginBottom: 4 }}>{p.label}</div>
        <div style={{ fontSize: 13, color: '#46546e', marginBottom: 10, lineHeight: 1.55 }}>{p.desc}</div>
        <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--blue)', fontFamily: 'var(--font-display)' }}>{p.price}</div>
      </div>
    </a>
  )
}

export default function AdPlacementCards({ placements }: { placements: Placement[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 40 }}>
      {placements.map((p) => <AdCard key={p.label} p={p} />)}
    </div>
  )
}
