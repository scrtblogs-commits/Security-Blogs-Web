'use client'
import CapabilityGrid, { PREVIEW_SHELL, type Capability } from '@/components/ui/CapabilityCard'

const CAPS: Capability[] = [
  { title: 'Search Intent Targeting', desc: 'We bid only on keywords with genuine buyer intent — "commercial CCTV installer", "access control quote" — not tyre-kicker traffic.', preview: <KeywordsPreview /> },
  { title: 'Geo-Targeting by Suburb', desc: 'Concentrate spend on the suburbs and service radius where your highest-value security jobs actually convert.', preview: <GeoPreview /> },
  { title: 'Budget & Bid Control', desc: 'Smart bidding tuned to your margins, with day-parting and device adjustments so no dollar is wasted.', preview: <BidPreview /> },
  { title: 'Conversion Tracking', desc: 'Calls, forms and quote requests tracked end-to-end so every lead is attributed to the exact keyword and ad.', preview: <FunnelPreview /> },
  { title: 'Remarketing Audiences', desc: 'Stay in front of buyers who viewed your quote page but didn’t convert across Search, Display and YouTube.', preview: <RemarketingPreview /> },
  { title: 'Competitor Keyword Targeting', desc: 'Appear above rival security firms when buyers search their brand names — and win the click with a stronger offer.', preview: <CompetitorPreview /> },
]
export default function GoogleAdsCapabilities() { return <CapabilityGrid items={CAPS} /> }

function KeywordsPreview() {
  const kws = [
    { kw: 'commercial cctv installer', vol: '4.4K', match: 'EXACT' },
    { kw: 'access control quote',      vol: '2.1K', match: 'PHRASE' },
    { kw: '24/7 monitored alarm',      vol: '1.8K', match: 'EXACT' },
  ]
  return (
    <div style={{ ...PREVIEW_SHELL, fontSize: 10.5 }}>
      <div style={{ fontSize: 9, color: '#5f6368', fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>KEYWORDS · BUYER INTENT</div>
      {kws.map((k, i) => (
        <div key={k.kw} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '3px 0', borderBottom: i < kws.length - 1 ? '1px solid #f3f4f7' : 'none' }}>
          <span style={{ flex: 1, fontSize: 10.5, color: '#1a0dab' }}>{k.kw}</span>
          <span style={{ fontSize: 9, color: '#5f6368' }}>{k.vol}/mo</span>
          <span style={{ fontSize: 8.5, color: '#188038', background: '#e6f4ea', padding: '1px 5px', borderRadius: 3, fontWeight: 700 }}>{k.match}</span>
        </div>
      ))}
    </div>
  )
}

function GeoPreview() {
  const pins = [{ top: 30, left: 35 }, { top: 50, left: 60 }, { top: 65, left: 45 }, { top: 35, left: 75 }]
  return (
    <div style={{ ...PREVIEW_SHELL, padding: 0 }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 60%, #cce0f5 0%, #ffffff 70%)' }} />
      <div style={{ position: 'absolute', top: 8, left: 10, fontSize: 9, color: '#5f6368', fontWeight: 700, letterSpacing: 1, zIndex: 2 }}>SYDNEY · 25KM RADIUS</div>
      {pins.map((p, i) => (
        <span key={i} className="sb-pin" style={{ position: 'absolute', top: `${p.top}%`, left: `${p.left}%`, width: 10, height: 10, borderRadius: '50%', background: '#1e5fe0', transform: 'translate(-50%,-50%)', boxShadow: '0 0 0 0 rgba(30,95,224,0.6), 0 0 0 2px #fff', animationDelay: `${i * 0.3}s`, zIndex: 2 }} />
      ))}
      <div style={{ position: 'absolute', bottom: 8, right: 10, background: '#fff', border: '1px solid #dadce0', borderRadius: 4, padding: '3px 6px', fontSize: 9.5, color: '#1e5fe0', fontWeight: 700, zIndex: 2 }}>4 active suburbs</div>
    </div>
  )
}

function BidPreview() {
  return (
    <div style={{ ...PREVIEW_SHELL, fontSize: 10.5, gap: 6 }}>
      <div style={{ fontSize: 9, color: '#5f6368', fontWeight: 700, letterSpacing: 1 }}>BUDGET ALLOCATION · TODAY</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
        <span style={{ color: '#202124' }}>Daily spend</span>
        <span style={{ color: '#1e5fe0', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>$184 / $250</span>
      </div>
      <div style={{ height: 8, background: '#ececf1', borderRadius: 4, overflow: 'hidden', display: 'flex' }}>
        <div style={{ width: '52%', background: '#1a73e8' }} />
        <div style={{ width: '20%', background: '#34A853' }} />
        <div style={{ width: '12%', background: '#FBBC04' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: '#5f6368', marginTop: -2 }}>
        <span>Search 52%</span>
        <span>Display 20%</span>
        <span>YouTube 12%</span>
      </div>
      <div style={{ fontSize: 9.5, color: '#10a37f', fontWeight: 700 }}>● Bid pacing healthy</div>
    </div>
  )
}

function FunnelPreview() {
  const steps = [{ k: 'Impressions', v: '18,420', w: 100 }, { k: 'Clicks', v: '947', w: 70 }, { k: 'Form views', v: '312', w: 42 }, { k: 'Leads', v: '84', w: 22 }]
  return (
    <div style={{ ...PREVIEW_SHELL, fontSize: 10.5, gap: 4 }}>
      <div style={{ fontSize: 9, color: '#5f6368', fontWeight: 700, letterSpacing: 1 }}>CONVERSION FUNNEL</div>
      {steps.map((s) => (
        <div key={s.k} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 60, fontSize: 9.5, color: '#202124' }}>{s.k}</span>
          <div style={{ flex: 1, height: 14, background: '#ececf1', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ width: `${s.w}%`, height: '100%', background: 'linear-gradient(90deg, #1a73e8, #34A853)' }} />
          </div>
          <span style={{ width: 42, fontSize: 9.5, fontWeight: 700, color: '#1e5fe0', fontFamily: 'var(--font-mono)', textAlign: 'right' }}>{s.v}</span>
        </div>
      ))}
    </div>
  )
}

function RemarketingPreview() {
  const aud = [{ n: 'Quote page · 7d', s: 1240 }, { n: 'Pricing · 14d', s: 820 }, { n: 'Service page · 30d', s: 3460 }]
  return (
    <div style={{ ...PREVIEW_SHELL, fontSize: 10.5 }}>
      <div style={{ fontSize: 9, color: '#5f6368', fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>AUDIENCES · LIVE</div>
      {aud.map((a, i) => (
        <div key={a.n} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 0', borderBottom: i < aud.length - 1 ? '1px solid #f3f4f7' : 'none' }}>
          <span style={{ width: 16, height: 16, borderRadius: '50%', background: '#1e5fe0', color: '#fff', fontSize: 8, display: 'grid', placeItems: 'center', fontWeight: 700 }}>{i + 1}</span>
          <span style={{ flex: 1, fontSize: 10, color: '#202124' }}>{a.n}</span>
          <span style={{ fontSize: 9.5, color: '#1e5fe0', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{a.s.toLocaleString()}</span>
        </div>
      ))}
    </div>
  )
}

function CompetitorPreview() {
  return (
    <div style={{ ...PREVIEW_SHELL, fontSize: 10.5 }}>
      <div style={{ fontSize: 9, color: '#5f6368', fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>AUCTION INSIGHTS</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0', background: 'linear-gradient(180deg, #f1f6ff 0%, #ffffff 100%)', borderRadius: 4, paddingLeft: 4, paddingRight: 4, border: '1px solid #1e5fe0' }} className="sb-card-rank">
        <span style={{ fontSize: 10, color: '#1e5fe0', fontWeight: 700 }}>★ securityblogs.com.au</span>
        <span style={{ fontSize: 10, color: '#1e5fe0', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>92% IS</span>
      </div>
      {[{ n: 'rival-cctv.au', is: '64%' }, { n: 'security-co.au', is: '51%' }, { n: 'alarm-firm.au', is: '38%' }].map((c) => (
        <div key={c.n} style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 6px', fontSize: 10, color: '#5f6368' }}>
          <span>{c.n}</span>
          <span style={{ fontFamily: 'var(--font-mono)' }}>{c.is} IS</span>
        </div>
      ))}
    </div>
  )
}
