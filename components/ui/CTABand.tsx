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
        <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius-lg)', padding: 'clamp(40px,6vw,68px) 32px', textAlign: 'center', color: '#fff', background: 'linear-gradient(135deg, var(--blue), var(--violet))' }}>
          <div className="blob blob-yellow" style={{ top: -60, right: -40, opacity: 0.25 }} />
          <h2 className="z1" style={{ fontSize: 'clamp(26px,4vw,42px)', marginBottom: 14 }}>{title}</h2>
          <p className="z1 mx-auto" style={{ maxWidth: 560, opacity: 0.92, marginBottom: 26, fontSize: 17 }}>{subtitle}</p>
          <div className="z1">
            <MagneticButton href={ctaHref} className="btn btn-lg" >
              <span style={{ background: '#fff', color: 'var(--blue)', padding: '15px 30px', borderRadius: 12, fontWeight: 600 }}>{ctaLabel}</span>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  )
}
