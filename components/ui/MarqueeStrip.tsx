import { aiPlatforms } from '@/lib/site'

export default function MarqueeStrip({ label = 'OPTIMISED TO BE CITED ACROSS EVERY ANSWER ENGINE', items = aiPlatforms }: { label?: string; items?: string[] }) {
  const row = [...items, ...items]
  return (
    <section style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', background: 'var(--bg-soft)', padding: '26px 0' }}>
      <p className="center eyebrow" style={{ marginBottom: 16 }}>{label}</p>
      <div className="marquee">
        <div className="marquee-track">
          {row.map((p, i) => (
            <span key={i} style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: 'var(--text-dim)' }}>{p}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
