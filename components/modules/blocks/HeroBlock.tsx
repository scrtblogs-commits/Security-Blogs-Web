import type { CmsMedia } from '@/lib/cmsTypes'

type CTA = { label: string; href: string; style?: 'primary' | 'outline' | 'text' }

type Props = {
  badge?: string
  h1: string
  h1Highlight?: string
  subtitle?: string
  image?: CmsMedia | string | null
  ctas?: CTA[]
}

// Hero — top-of-page block. Highlights an optional substring of the H1
// in the accent colour, supports up to 3 CTA buttons, and renders an
// optional hero image.
export default function HeroBlock({ badge, h1, h1Highlight, subtitle, image, ctas }: Props) {
  const h1Parts = h1Highlight && h1.includes(h1Highlight)
    ? h1.split(h1Highlight)
    : null

  const imageUrl = typeof image === 'string' ? image : image?.url
  const imageAlt = typeof image === 'string' ? '' : (image?.alt ?? '')

  return (
    <section className="section section-hero">
      <div className="container" style={{ display: 'grid', gridTemplateColumns: imageUrl ? '1fr 1fr' : '1fr', gap: 48, alignItems: 'center' }}>
        <div>
          {badge && <div className="eyebrow">{badge}</div>}
          <h1 className="h1" style={{ marginTop: 12 }}>
            {h1Parts
              ? <>{h1Parts[0]}<span className="accent">{h1Highlight}</span>{h1Parts[1]}</>
              : h1}
          </h1>
          {subtitle && <p className="lede" style={{ marginTop: 16, maxWidth: 560 }}>{subtitle}</p>}
          {ctas && ctas.length > 0 && (
            <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
              {ctas.map((c, i) => (
                <a
                  key={i}
                  href={c.href}
                  className={
                    c.style === 'outline' ? 'btn btn-outline'
                  : c.style === 'text'    ? 'btn btn-text'
                  :                          'btn btn-primary'
                  }
                >
                  {c.label}
                </a>
              ))}
            </div>
          )}
        </div>
        {imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt={imageAlt} style={{ width: '100%', borderRadius: 16, boxShadow: '0 24px 64px rgba(0,0,0,0.15)' }} />
        )}
      </div>
    </section>
  )
}
