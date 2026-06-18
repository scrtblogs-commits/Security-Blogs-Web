import { getGscSnapshot } from '@/lib/gsc'

// Server component — renders the REAL Google Search Console snapshot from the
// Airtable GSC Performance table. If the data source isn't configured yet
// (no AIRTABLE_TOKEN) or has no rows, it shows an honest "connecting" state
// instead of any invented numbers.

function Tile({ value, label }: { value: string; label: string }) {
  return (
    <div className="center" style={{ padding: '24px 16px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--line)', background: 'var(--bg-card)' }}>
      <div style={{ fontSize: 'clamp(28px,4vw,42px)', fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--blue)', lineHeight: 1 }}>{value}</div>
      <div className="text-soft" style={{ marginTop: 10, fontSize: 14 }}>{label}</div>
    </div>
  )
}

export default async function GscSnapshot() {
  const s = await getGscSnapshot()

  const shell = (children: React.ReactNode) => (
    <div className="card" style={{ padding: 'clamp(22px,4vw,34px)' }}>
      <div className="flex items-center justify-between" style={{ marginBottom: 18, flexWrap: 'wrap', gap: 8 }}>
        <span className="eyebrow" style={{ color: 'var(--blue)' }}>● Live · Google Search Console</span>
        {s?.hasData ? <span className="text-dim" style={{ fontSize: 12.5, fontFamily: 'var(--font-mono)' }}>{s.days}-day window</span> : null}
      </div>
      {children}
    </div>
  )

  if (!s || !s.hasData) {
    return shell(
      <p className="text-soft" style={{ fontSize: 15, maxWidth: 560 }}>
        Connecting your real Search Console performance — this fills in automatically as data accumulates.
        We only show measured numbers here, never estimates.
      </p>,
    )
  }

  // Sparkline of impressions by date.
  const pts = s.byDate
  const max = Math.max(1, ...pts.map((d) => d.impressions))
  const w = 100
  const h = 28
  const path = pts.length > 1
    ? pts.map((d, i) => `${(i / (pts.length - 1)) * w},${h - (d.impressions / max) * h}`).join(' ')
    : null

  return shell(
    <>
      <div className="grid-3" style={{ gap: 14 }}>
        <Tile value={s.totalImpressions.toLocaleString()} label="Impressions (measured)" />
        <Tile value={s.totalClicks.toLocaleString()} label="Clicks (measured)" />
        <Tile value={s.avgPosition ? String(s.avgPosition) : '—'} label="Avg. position" />
      </div>

      {path ? (
        <div style={{ marginTop: 22 }}>
          <div className="text-dim" style={{ fontSize: 11, letterSpacing: 1, fontWeight: 700, marginBottom: 6 }}>IMPRESSIONS OVER TIME</div>
          <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ width: '100%', height: 60 }}>
            <polyline points={path} fill="none" stroke="var(--blue)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
      ) : null}

      {s.topQueries.length ? (
        <div style={{ marginTop: 22 }}>
          <div className="text-dim" style={{ fontSize: 11, letterSpacing: 1, fontWeight: 700, marginBottom: 8 }}>TOP QUERIES</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {s.topQueries.map((q) => (
              <div key={q.key} className="flex items-center justify-between" style={{ fontSize: 13.5, borderBottom: '1px solid var(--line)', paddingBottom: 6 }}>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '70%' }}>{q.key}</span>
                <span className="text-soft" style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5 }}>{q.impressions} impr · pos {q.position}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>,
  )
}
