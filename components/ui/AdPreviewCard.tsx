export type AdData = {
  badge?: string
  badgeColor?: string
  url: string
  headline: string
  headline2?: string
  desc: string
  desc2?: string
  sitelinks?: string[]
  callouts?: string[]
}

export default function AdPreviewCard({ ad, mobile = false }: { ad: AdData; mobile?: boolean }) {
  return (
    <div className="card" style={{ maxWidth: mobile ? 380 : '100%', margin: mobile ? '0 auto' : undefined, padding: 22 }}>
      <div className="flex items-center gap-2" style={{ marginBottom: 8 }}>
        <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 5, border: `1px solid ${ad.badgeColor || 'var(--green)'}`, color: ad.badgeColor || 'var(--green)' }}>{ad.badge || 'Ad'}</span>
        <span className="text-soft" style={{ fontSize: 13, fontFamily: 'var(--font-mono)' }}>{ad.url}</span>
      </div>
      <a style={{ color: '#1a0dab', fontSize: mobile ? 17 : 20, fontWeight: 500, fontFamily: 'var(--font-display)', display: 'block', lineHeight: 1.3 }} href="#" onClick={(e) => e.preventDefault()}>{ad.headline}</a>
      {ad.headline2 && <div style={{ color: '#1a0dab', fontSize: mobile ? 15 : 17 }}>{ad.headline2}</div>}
      <p className="text-soft" style={{ fontSize: 13.5, margin: '6px 0' }}>{ad.desc}</p>
      {ad.desc2 && <p className="text-soft" style={{ fontSize: 13.5 }}>{ad.desc2}</p>}
      {ad.sitelinks && (
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(4,1fr)', gap: 8, marginTop: 12 }}>
          {ad.sitelinks.map((s) => <a key={s} href="#" onClick={(e) => e.preventDefault()} style={{ color: '#1a0dab', fontSize: 13 }}>{s}</a>)}
        </div>
      )}
      {ad.callouts && (
        <div className="flex flex-wrap gap-2" style={{ marginTop: 12 }}>
          {ad.callouts.map((c) => <span key={c} className="chip">{c}</span>)}
        </div>
      )}
    </div>
  )
}
