type Item = { num: string; label: string; sub?: string }
type Props = { eyebrow?: string; title?: string; items?: Item[] }

export default function StatsBlock({ eyebrow, title, items }: Props) {
  if (!items?.length) return null
  return (
    <section className="section section-stats">
      <div className="container">
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        {title && <h2 className="h2" style={{ marginTop: 8 }}>{title}</h2>}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(auto-fit, minmax(180px, 1fr))`,
            gap: 24,
            marginTop: 24,
          }}
        >
          {items.map((s, i) => (
            <div key={i} className="card stat-card" style={{ textAlign: 'center' }}>
              <div className="h1" style={{ color: 'var(--blue)' }}>{s.num}</div>
              <div style={{ marginTop: 8, fontWeight: 600 }}>{s.label}</div>
              {s.sub && <div style={{ marginTop: 4, fontSize: 13, color: 'var(--text-soft)' }}>{s.sub}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
