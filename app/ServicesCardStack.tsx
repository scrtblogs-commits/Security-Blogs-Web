'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CardStack, CardStackItem } from '@/components/ui/card-stack'
import { services } from '@/lib/site'
import {
  SEOFace, AIOFace, AEOFace, GEOFace,
  GoogleAdsFace, BingAdsFace, WebDesignFace,
} from './service-card-faces'

type ServiceCard = CardStackItem & { slug: string }

const items: ServiceCard[] = services.map((s) => ({
  id: s.slug,
  slug: s.slug,
  title: s.title,
  description: s.desc,
  href: `/services/${s.slug}/`,
}))

// Each slug renders its own bespoke "live" face — animated SVG/CSS mock-ups
// of what that service actually does (Google SERP, AI chat, dashboards, etc.)
// Card colour shades have been dropped per request — each face owns its
// background and palette in the blue/gray family.
function FaceFor({ slug, item, active }: { slug: string; item: ServiceCard; active: boolean }) {
  const common = {
    title: item.title ?? '',
    description: item.description ?? '',
    href: item.href ?? '/services/',
    active,
  }
  switch (slug) {
    case 'security-seo': return <SEOFace {...common} />
    case 'aio':          return <AIOFace {...common} />
    case 'aeo':          return <AEOFace {...common} />
    case 'geo':          return <GEOFace {...common} />
    case 'google-ads':   return <GoogleAdsFace {...common} />
    case 'bing-ads':     return <BingAdsFace {...common} />
    case 'web-design':   return <WebDesignFace {...common} />
    default:             return <DefaultFace {...common} />
  }
}

function DefaultFace({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <div style={{ height: '100%', padding: 26, background: '#1e5fe0', color: '#fff' }}>
      <h3 style={{ fontSize: 22, marginBottom: 8 }}>{title}</h3>
      <p style={{ fontSize: 14 }}>{description}</p>
      <Link href={href} style={{ color: '#fff' }}>Learn more →</Link>
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
      intervalMs={4200}
      pauseOnHover
      loop
      overlap={0.5}
      spreadDeg={42}
      renderCard={(item, { active }) => (
        <FaceFor slug={(item as ServiceCard).slug} item={item as ServiceCard} active={active} />
      )}
    />
  )
}
