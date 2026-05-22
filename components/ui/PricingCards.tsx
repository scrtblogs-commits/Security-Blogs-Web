import MagneticButton from './MagneticButton'

export type Plan = { name: string; price: string; period?: string; featured?: boolean; badge?: string; features: string[]; cta?: string; ctaHref?: string }

export default function PricingCards({ plans }: { plans: Plan[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${plans.length}, 1fr)`, gap: 20 }} className="sg-pricing">
      {plans.map((p) => (
        <div key={p.name} className={p.featured ? 'glass glow-border' : 'card'} style={{ padding: 28, position: 'relative', transform: p.featured ? 'scale(1.03)' : undefined }}>
          {p.badge && <span className="badge badge-blue" style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)' }}>{p.badge}</span>}
          <h3 style={{ fontSize: 19, marginBottom: 6 }}>{p.name}</h3>
          <div style={{ fontSize: 34, fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--blue)' }}>{p.price}<span className="text-dim" style={{ fontSize: 15 }}>{p.period}</span></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, margin: '20px 0 24px' }}>
            {p.features.map((f, i) => <div key={i} className="flex items-center gap-2" style={{ fontSize: 14 }}><span className="accent">✓</span>{f}</div>)}
          </div>
          <MagneticButton href={p.ctaHref || '/contact/'} className={p.featured ? 'btn btn-primary' : 'btn btn-outline'}>{p.cta || 'Get started'}</MagneticButton>
        </div>
      ))}
      <style>{`@media (max-width: 860px){ .sg-pricing { grid-template-columns: 1fr !important; } .sg-pricing > * { transform: none !important; } }`}</style>
    </div>
  )
}
