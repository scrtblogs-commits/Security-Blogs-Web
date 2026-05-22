'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CardStack, CardStackItem } from '@/components/ui/card-stack'
import { services } from '@/lib/site'

type ServiceCard = CardStackItem & { color: string; icon: string }

const items: ServiceCard[] = services.map((s) => ({
  id: s.slug,
  title: s.title,
  description: s.desc,
  href: `/services/${s.slug}/`,
  color: s.color,
  icon: s.icon,
}))

function Face({ item, active }: { item: ServiceCard; active: boolean }) {
  return (
    <div
      style={{
        position: 'relative', height: '100%', width: '100%',
        background: `linear-gradient(150deg, ${item.color} 0%, ${item.color} 55%, #0c1424 140%)`,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 26,
      }}
    >
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 80% at 80% 0%, rgba(255,255,255,0.22), transparent 55%)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{ width: 56, height: 56, borderRadius: 16, display: 'grid', placeItems: 'center', fontSize: 28, background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(6px)' }}>{item.icon}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.85)', textTransform: 'uppercase' }}>Service</span>
      </div>
      <div style={{ position: 'relative' }}>
        <h3 style={{ color: '#fff', fontSize: 24, marginBottom: 8 }}>{item.title}</h3>
        <p style={{ color: 'rgba(255,255,255,0.88)', fontSize: 14.5, lineHeight: 1.5, marginBottom: 16, maxWidth: 380 }}>{item.description}</p>
        {active && item.href ? (
          <Link href={item.href} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', color: item.color, fontWeight: 700, fontSize: 14, padding: '10px 18px', borderRadius: 10 }}>
            Learn more →
          </Link>
        ) : (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.9)', fontWeight: 600, fontSize: 14 }}>Learn more →</span>
        )}
      </div>
    </div>
  )
}

export default function ServicesCardStack() {
  const [w, setW] = useState(440)
  useEffect(() => {
    const fit = () => setW(Math.max(280, Math.min(440, window.innerWidth - 56)))
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  return (
    <CardStack
      items={items}
      cardWidth={w}
      cardHeight={300}
      autoAdvance
      intervalMs={3400}
      pauseOnHover
      loop
      overlap={0.5}
      spreadDeg={42}
      renderCard={(item, { active }) => <Face item={item} active={active} />}
    />
  )
}
