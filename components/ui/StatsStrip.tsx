'use client'
import AnimatedCounter from './AnimatedCounter'

type Stat = { value?: number; prefix?: string; suffix?: string; decimals?: number; num?: string; label: string }

export default function StatsStrip({ items, dark = false }: { items: Stat[]; dark?: boolean }) {
  return (
    <div className="grid-4 stats-strip-grid" style={{ gap: 18 }}>
      {items.map((s, i) => (
        <div
          key={i}
          style={{
            padding: '32px 20px',
            borderRadius: 'var(--radius-lg)',
            background: dark ? 'rgba(255,255,255,0.05)' : '#ffffff',
            border: '1.5px solid rgba(30,95,224,0.12)',
            boxShadow: '0 4px 24px -8px rgba(30,95,224,0.10)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Top accent line */}
          <div style={{
            position: 'absolute', top: 0, left: '20%', right: '20%', height: 2,
            background: 'linear-gradient(90deg, transparent, rgba(30,95,224,0.5), rgba(111,77,255,0.5), transparent)',
            borderRadius: '0 0 4px 4px',
          }} />

          <div style={{
            fontSize: 'clamp(32px,4vw,48px)',
            fontWeight: 800,
            fontFamily: 'var(--font-display)',
            color: 'var(--blue)',
            lineHeight: 1,
          }}>
            {s.num
              ? s.num
              : <AnimatedCounter value={s.value || 0} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
            }
          </div>
          <div style={{ marginTop: 10, fontSize: 14, color: 'var(--text-dim)' }}>
            {s.label}
          </div>
        </div>
      ))}
    </div>
  )
}
