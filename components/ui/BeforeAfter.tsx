export default function BeforeAfter({
  before, after, beforeTitle = 'Before', afterTitle = 'After',
}: { before: string[]; after: string[]; beforeTitle?: string; afterTitle?: string }) {
  return (
    <div className="grid-2 glow-border" style={{ gap: 0, padding: 0, overflow: 'hidden', borderRadius: 'var(--radius-lg)' }}>
      <div style={{ padding: 28, borderRight: '1px solid var(--line)' }}>
        <h4 style={{ marginBottom: 16, color: 'var(--red)' }}>{beforeTitle}</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {before.map((b, i) => <div key={i} className="flex items-center gap-2 text-soft" style={{ fontSize: 14.5 }}><span style={{ color: 'var(--red)' }}>✗</span>{b}</div>)}
        </div>
      </div>
      <div style={{ padding: 28, background: 'rgba(30,158,117,0.05)' }}>
        <h4 style={{ marginBottom: 16, color: 'var(--green)' }}>{afterTitle}</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {after.map((a, i) => <div key={i} className="flex items-center gap-2" style={{ fontSize: 14.5 }}><span style={{ color: 'var(--green)' }}>✓</span>{a}</div>)}
        </div>
      </div>
    </div>
  )
}
