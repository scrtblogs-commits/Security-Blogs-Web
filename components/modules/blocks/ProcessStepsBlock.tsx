type Item = { phase?: string; title: string; description: string }
type Props = { eyebrow?: string; title: string; items?: Item[] }

export default function ProcessStepsBlock({ eyebrow, title, items }: Props) {
  if (!items?.length) return null
  return (
    <section className="section section-process">
      <div className="container">
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h2 className="h2" style={{ marginTop: 8 }}>{title}</h2>
        <ol style={{ marginTop: 24, display: 'grid', gap: 16, listStyle: 'none', padding: 0, counterReset: 'step' }}>
          {items.map((it, i) => (
            <li key={i} className="card process-step" style={{ counterIncrement: 'step', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 20, alignItems: 'flex-start' }}>
              <div
                aria-hidden="true"
                style={{
                  width: 44, height: 44, borderRadius: 12,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'var(--blue)', color: '#fff', fontWeight: 700,
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>
              <div>
                {it.phase && <div className="eyebrow" style={{ marginBottom: 4 }}>{it.phase}</div>}
                <h3 className="h3">{it.title}</h3>
                <p style={{ marginTop: 8, color: 'var(--text-soft)' }}>{it.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
