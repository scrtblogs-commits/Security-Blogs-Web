'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CardStack, CardStackItem } from '@/components/ui/card-stack'
import { services } from '@/lib/site'

type ServiceCard = CardStackItem & { color: string; bgImage: string }

// Service-themed background images. Hot-linked from Unsplash with explicit
// transformations (w=720, q=70, auto=format) so they ship as webp where
// supported and stay light-weight. If any of these IDs ever 404, the
// colored gradient still renders underneath as a graceful fallback.
const SERVICE_IMAGES: Record<string, string> = {
  'security-seo': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=720&q=70&auto=format&fit=crop',
  'aio':          'https://images.unsplash.com/photo-1677442136-19af3e687a25?w=720&q=70&auto=format&fit=crop',
  'aeo':          'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=720&q=70&auto=format&fit=crop',
  'geo':          'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=720&q=70&auto=format&fit=crop',
  'google-ads':   'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=720&q=70&auto=format&fit=crop',
  'bing-ads':     'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=720&q=70&auto=format&fit=crop',
  'web-design':   'https://images.unsplash.com/photo-1547658719-da2b51169166?w=720&q=70&auto=format&fit=crop',
}

// On-brand override — all cards use light blue / slate-gray tones instead of
// the rainbow palette in lib/site.ts. Three values rotate across the seven
// cards so adjacent cards never repeat.
const SERVICE_CARD_COLORS: Record<string, string> = {
  'security-seo': '#1e5fe0', // brand blue
  'aio':          '#5b7a9e', // slate gray-blue
  'aeo':          '#4a8cf0', // light blue
  'geo':          '#1e5fe0',
  'google-ads':   '#5b7a9e',
  'bing-ads':     '#4a8cf0',
  'web-design':   '#1e5fe0',
}

const items: ServiceCard[] = services.map((s) => ({
  id: s.slug,
  title: s.title,
  description: s.desc,
  href: `/services/${s.slug}/`,
  color: SERVICE_CARD_COLORS[s.slug] ?? '#1e5fe0',
  bgImage: SERVICE_IMAGES[s.slug] ?? '',
}))

function Face({ item, active }: { item: ServiceCard; active: boolean }) {
  return (
    <div
      style={{
        position: 'relative', height: '100%', width: '100%',
        // Colored gradient base — shows through if the image fails to load.
        background: `linear-gradient(150deg, ${item.color} 0%, ${item.color} 55%, #0c1424 140%)`,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        padding: 26, overflow: 'hidden',
      }}
    >
      {/* Service-themed background image */}
      {item.bgImage && (
        <div
          aria-hidden
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${item.bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.55,
            mixBlendMode: 'luminosity',
          }}
        />
      )}

      {/* Colored tint over the image so each card keeps its brand colour */}
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(150deg, ${item.color}cc 0%, ${item.color}77 50%, rgba(12,20,36,0.55) 130%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Dark wash at the bottom — guarantees readable text over any image */}
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, transparent 35%, rgba(0,0,0,0.55) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Soft top-right highlight (original look) */}
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(120% 80% at 80% 0%, rgba(255,255,255,0.18), transparent 55%)',
          pointerEvents: 'none',
        }}
      />

      {/* Top row — just the SERVICE tag (icon removed) */}
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.95)', textTransform: 'uppercase', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>
          Service
        </span>
      </div>

      {/* Bottom content */}
      <div style={{ position: 'relative' }}>
        <h3 style={{ color: '#fff', fontSize: 24, marginBottom: 8, textShadow: '0 2px 8px rgba(0,0,0,0.45)' }}>{item.title}</h3>
        <p style={{ color: 'rgba(255,255,255,0.95)', fontSize: 14.5, lineHeight: 1.5, marginBottom: 16, maxWidth: 380, textShadow: '0 1px 4px rgba(0,0,0,0.45)' }}>{item.description}</p>
        {item.href ? (
          <Link
            href={item.href}
            style={active
              ? { display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', color: item.color, fontWeight: 700, fontSize: 14, padding: '10px 18px', borderRadius: 10 }
              : { display: 'inline-flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.98)', fontWeight: 600, fontSize: 14, textDecoration: 'underline', textUnderlineOffset: 4, textShadow: '0 1px 4px rgba(0,0,0,0.45)' }
            }
          >
            Learn more →
          </Link>
        ) : null}
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
