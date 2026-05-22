'use client'
import AnimatedCounter from './AnimatedCounter'

type Stat = { value?: number; prefix?: string; suffix?: string; decimals?: number; num?: string; label: string }

export default function StatsStrip({ items, dark = false }: { items: Stat[]; dark?: boolean }) {
  return (
    <div className="grid-4" style={{ gap: 18 }}>
      {items.map((s, i) => (
        <div key={i} className="center" style={{ padding: '28px 16px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--line)', background: dark ? 'rgba(255,255,255,0.04)' : 'var(--bg-card)' }}>
          <div style={{ fontSize: 'clamp(30px,4vw,44px)', fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--blue)', lineHeight: 1 }}>
            {s.num ? s.num : <AnimatedCounter value={s.value || 0} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />}
          </div>
          <div className="text-soft" style={{ marginTop: 10, fontSize: 14 }}>{s.label}</div>
        </div>
      ))}
    </div>
  )
}
