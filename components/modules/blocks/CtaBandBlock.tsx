type Props = {
  title: string
  subtitle?: string
  ctaLabel: string
  ctaHref: string
}

export default function CtaBandBlock({ title, subtitle, ctaLabel, ctaHref }: Props) {
  return (
    <section className="section section-cta-band">
      <div className="container cta-band">
        <div style={{ flex: 1, minWidth: 280 }}>
          <h2 className="h2">{title}</h2>
          {subtitle && <p style={{ marginTop: 8, color: 'var(--text-soft)' }}>{subtitle}</p>}
        </div>
        <a className="btn btn-primary" href={ctaHref} style={{ whiteSpace: 'nowrap' }}>
          {ctaLabel}
        </a>
      </div>
    </section>
  )
}
