type Item = {
  title: string
  description: string
  previewVariant?: string
}

type Props = {
  eyebrow?: string
  title: string
  sub?: string
  items?: Item[]
}

// Capabilities grid — 3-column cards. `previewVariant` is a token that
// links to a themed visual in components/previews/*. The frontend keeps
// the mapping intentionally loose: an unknown variant just renders a
// generic accent gradient. This means an editor can add a new
// capability with a new variant string from the admin BEFORE the
// developer ships the matching preview component.
export default function CapabilitiesBlock({ eyebrow, title, sub, items }: Props) {
  if (!items?.length) return null
  return (
    <section className="section section-capabilities">
      <div className="container">
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h2 className="h2" style={{ marginTop: 8 }}>{title}</h2>
        {sub && <p className="lede" style={{ marginTop: 12, maxWidth: 720 }}>{sub}</p>}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
            marginTop: 32,
          }}
        >
          {items.map((it, i) => (
            <div key={i} className="card capability-card" data-variant={it.previewVariant ?? 'generic'}>
              <h3 className="h3">{it.title}</h3>
              <p style={{ marginTop: 10, color: 'var(--text-soft)' }}>{it.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
