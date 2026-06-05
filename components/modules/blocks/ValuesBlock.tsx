import Glyph from '@/components/ui/Glyph'

type Item = { iconToken?: string; title: string; description: string }
type Props = { eyebrow?: string; title: string; items?: Item[] }

// Values grid — uses the existing <Glyph> component to translate emoji
// tokens into Lucide SVG icons (the same path body copy uses), so the
// icons remain crisp at any size and respect the site's accent colour.
export default function ValuesBlock({ eyebrow, title, items }: Props) {
  if (!items?.length) return null
  return (
    <section className="section section-values">
      <div className="container">
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h2 className="h2" style={{ marginTop: 8 }}>{title}</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 20,
            marginTop: 24,
          }}
        >
          {items.map((v, i) => (
            <div key={i} className="card value-card">
              {v.iconToken && (
                <div style={{ marginBottom: 12, color: 'var(--blue)' }}>
                  <Glyph token={v.iconToken} size={28} />
                </div>
              )}
              <h3 className="h3">{v.title}</h3>
              <p style={{ marginTop: 8, color: 'var(--text-soft)' }}>{v.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
