'use client'
import type React from 'react'
import { useState } from 'react'
import { services } from '@/lib/site'
import { ServiceFace } from '../service-card-faces'

export default function ServiceCardsGrid() {
  return (
    <>
      <style>{`
        @keyframes cardFloat0 { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-5px); } }
        @keyframes cardFloat1 { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-5px); } }
        @keyframes cardFloat2 { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-5px); } }
        @keyframes cardFloat3 { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-5px); } }
        @keyframes cardFloat4 { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-5px); } }
        @keyframes cardFloat5 { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-5px); } }
        @keyframes cardFloat6 { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-5px); } }
      `}</style>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 22 }}>
        {services.map((s, i) => (
          <ServiceCard key={s.slug} s={s} index={i} />
        ))}
      </div>
    </>
  )
}

function ServiceCard({ s, index }: { key?: React.Key; s: typeof services[0]; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        height: 320,
        borderRadius: 18,
        overflow: 'hidden',
        boxShadow: hovered
          ? '0 24px 48px -12px rgba(30,95,224,0.35), 0 0 0 2px rgba(30,95,224,0.25)'
          : '0 12px 30px -10px rgba(18,42,86,0.18)',
        border: '1px solid var(--line)',
        transform: hovered ? 'translateY(-8px)' : undefined,
        animation: hovered ? undefined : `cardFloat${index} ${2.8 + index * 0.3}s ease-in-out ${index * 0.18}s infinite`,
        transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease',
      }}
    >
      <ServiceFace
        slug={s.slug}
        title={s.title}
        description={s.desc}
        href={`/services/${s.slug}/`}
      />
    </div>
  )
}
