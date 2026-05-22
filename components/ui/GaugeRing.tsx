'use client'

export function tierFor(score: number) {
  if (score < 25) return { label: 'Invisible', color: 'var(--red)' }
  if (score < 50) return { label: 'Emerging', color: 'var(--yellow)' }
  if (score < 75) return { label: 'Visible', color: 'var(--blue)' }
  return { label: 'Authority', color: 'var(--green)' }
}

export default function GaugeRing({ score, size = 200 }: { score: number; size?: number }) {
  const r = size / 2 - 14
  const circ = 2 * Math.PI * r
  const tier = tierFor(score)
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--bg-card-2)" strokeWidth={14} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={tier.color} strokeWidth={14} strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={circ - (circ * score) / 100} style={{ transition: 'stroke-dashoffset 0.6s ease, stroke 0.3s' }} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center' }}>
        <div>
          <div style={{ fontSize: size * 0.26, fontWeight: 800, fontFamily: 'var(--font-display)', lineHeight: 1, color: tier.color }}>{Math.round(score)}</div>
          <div className="eyebrow" style={{ color: tier.color }}>{tier.label}</div>
        </div>
      </div>
    </div>
  )
}
