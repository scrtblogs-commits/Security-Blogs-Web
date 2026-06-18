import MagneticButton from './MagneticButton'

export default function CTABand({
  title = 'Ready to be the answer AI gives?',
  subtitle = 'Get a free AI visibility audit and see exactly where your security brand wins — and where competitors get cited instead of you.',
  ctaLabel = 'Get your free audit →',
  ctaHref = '/book-strategy-call/',
}: { title?: string; subtitle?: string; ctaLabel?: string; ctaHref?: string }) {
  return (
    <section className="section">
      <div className="container">
        <div style={{ textAlign: 'center', padding: 'clamp(8px,2vw,16px) 0' }}>
          <h2 style={{ fontSize: 'clamp(26px,4vw,42px)', marginBottom: 14, color: 'var(--text)' }}>{title}</h2>
          <p style={{ maxWidth: 560, margin: '0 auto 26px', fontSize: 17, color: 'var(--text-soft)' }}>{subtitle}</p>
          <MagneticButton href={ctaHref} className="btn btn-primary btn-lg">{ctaLabel}</MagneticButton>
        </div>
      </div>
    </section>
  )
}
