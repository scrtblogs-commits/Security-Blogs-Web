type Item = { q: string; a: string }
type Props = { eyebrow?: string; title: string; items?: Item[] }

// Renders to native <details>/<summary> so it works without JS, and so
// the FAQPage JSON-LD generated from this same data stays trustable —
// the visible answer text matches what's in the structured data.
export default function FaqsBlock({ eyebrow, title, items }: Props) {
  if (!items?.length) return null
  return (
    <section className="section section-faqs">
      <div className="container">
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h2 className="h2" style={{ marginTop: 8 }}>{title}</h2>
        <div style={{ marginTop: 24, display: 'grid', gap: 12, maxWidth: 820 }}>
          {items.map((f, i) => (
            <details key={i} className="card faq-item">
              <summary style={{ cursor: 'pointer', fontWeight: 600, padding: 4 }}>{f.q}</summary>
              <p style={{ marginTop: 12, color: 'var(--text-soft)', lineHeight: 1.7 }}>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
