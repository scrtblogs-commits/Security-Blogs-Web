'use client'
import { useEffect, useState } from 'react'
import { CardStack, CardStackItem } from '@/components/ui/card-stack'
import { services } from '@/lib/site'
import { ServiceFace } from './service-card-faces'

type ServiceCard = CardStackItem & { slug: string }

const items: ServiceCard[] = services.map((s) => ({
  id: s.slug,
  slug: s.slug,
  title: s.title,
  description: s.desc,
  href: `/services/${s.slug}/`,
}))

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
      intervalMs={4200}
      pauseOnHover
      loop
      overlap={0.5}
      spreadDeg={42}
      renderCard={(item, { active }) => (
        <ServiceFace
          slug={(item as ServiceCard).slug}
          title={item.title ?? ''}
          description={item.description ?? ''}
          href={item.href ?? '/services/'}
          active={active}
        />
      )}
    />
  )
}
