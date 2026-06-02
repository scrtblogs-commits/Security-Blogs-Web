'use client'
import CapabilityGrid, { PREVIEW_SHELL, type Capability } from '@/components/ui/CapabilityCard'

const BING = '#0078d4'

const CAPS: Capability[] = [
  { title: 'LinkedIn Audience Targeting', desc: 'Target security buyers by job title, industry, company size and seniority — profile data only Microsoft can offer.', preview: <LinkedInTargetingPreview /> },
  { title: 'Lower CPCs Than Google', desc: 'Less competition on Microsoft means the same high-intent security clicks at roughly half the cost-per-click.', preview: <CPCComparisonPreview /> },
  { title: 'B2B Decision Makers', desc: '41% of B2B buyers use Bing and Microsoft properties — often older, higher-budget commercial decision-makers.', preview: <B2BAudiencePreview /> },
  { title: 'Microsoft Clarity Analytics', desc: 'Free session recordings and heatmaps reveal exactly how security buyers interact with your landing pages.', preview: <ClarityHeatmapPreview /> },
  { title: 'Sequential Remarketing', desc: 'Show buyers a story across the Audience Network — awareness, proof, then offer — until they convert.', preview: <JourneyPreview /> },
  { title: 'Competitor Intelligence', desc: 'Conquest rival security brands and use auction insights to find gaps Google advertisers are ignoring.', preview: <AuctionInsightsPreview /> },
]
export default function BingAdsCapabilities() { return <CapabilityGrid items={CAPS} /> }

function LinkedInTargetingPreview() {
  const filters = [{ k: 'Job title', v: 'CSO / Facilities Mgr' }, { k: 'Industry', v: 'Security · Logistics' }, { k: 'Company size', v: '50+ employees' }, { k: 'Seniority', v: 'Director +' }]
  return (
    <div style={{ ...PREVIEW_SHELL, fontSize: 10.5, gap: 4 }}>
      <div style={{ fontSize: 9, color: '#5f6368', fontWeight: 700, letterSpacing: 1 }}>LINKEDIN FILTERS · LIVE</div>
      {filters.map((f) => (
        <div key={f.k} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 0', borderBottom: '1px solid #f3f4f7' }}>
          <span style={{ width: 70, fontSize: 9, color: '#5f6368', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 600 }}>{f.k}</span>
          <span style={{ flex: 1, fontSize: 10, color: '#202124' }}>{f.v}</span>
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: BING, color: '#fff', fontSize: 7, fontWeight: 700, display: 'grid', placeItems: 'center' }}>✓</span>
        </div>
      ))}
      <div style={{ fontSize: 9.5, color: BING, fontWeight: 700, marginTop: 2 }}>~ 28,400 matched buyers</div>
    </div>
  )
}

function CPCComparisonPreview() {
  return (
    <div style={{ ...PREVIEW_SHELL, fontSize: 10.5, gap: 8 }}>
      <div style={{ fontSize: 9, color: '#5f6368', fontWeight: 700, letterSpacing: 1 }}>AVG CPC · SAME KEYWORDS</div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, marginBottom: 2 }}>
          <span style={{ color: '#202124' }}>Google Ads</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#d93025' }}>$12.40</span>
        </div>
        <div style={{ height: 7, background: '#ececf1', borderRadius: 3 }}>
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg, #fbbc04, #ea4335)', borderRadius: 3 }} />
        </div>
      </div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, marginBottom: 2 }}>
          <span style={{ color: '#202124' }}>Microsoft Ads</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#188038' }}>$5.80</span>
        </div>
        <div style={{ height: 7, background: '#ececf1', borderRadius: 3 }}>
          <div style={{ width: '47%', height: '100%', background: BING, borderRadius: 3 }} />
        </div>
      </div>
      <div style={{ fontSize: 9.5, color: '#188038', fontWeight: 700 }}>↓ 53% lower per click</div>
    </div>
  )
}

function B2BAudiencePreview() {
  return (
    <div style={{ ...PREVIEW_SHELL, fontSize: 10.5, gap: 4 }}>
      <div style={{ fontSize: 9, color: '#5f6368', fontWeight: 700, letterSpacing: 1 }}>BUYER MIX · MICROSOFT</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
        <svg viewBox="0 0 40 40" width={50} height={50}>
          <circle cx="20" cy="20" r="16" fill="none" stroke="#ececf1" strokeWidth="6" />
          <circle cx="20" cy="20" r="16" fill="none" stroke={BING} strokeWidth="6" strokeDasharray="100.5" strokeDashoffset="59.3" transform="rotate(-90 20 20)" strokeLinecap="round" />
          <text x="20" y="23" fontSize="9" fontWeight="800" textAnchor="middle" fill={BING}>41%</text>
        </svg>
        <div style={{ fontSize: 10, color: '#4d5156', lineHeight: 1.4 }}>
          of B2B buyers use Bing + Microsoft properties — older, higher-budget commercial buyers.
        </div>
      </div>
    </div>
  )
}

function ClarityHeatmapPreview() {
  return (
    <div style={{ ...PREVIEW_SHELL, padding: 0, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 12, background: '#fafbfc', borderRadius: 5, border: '1px solid #ececf1' }}>
        <div style={{ position: 'absolute', top: 8, left: 8, right: 8, height: 14, background: '#e5e8eb', borderRadius: 3 }} />
        <div style={{ position: 'absolute', top: 28, left: 8, right: 8, height: 26, background: '#dbe0e6', borderRadius: 3 }} />
        <div style={{ position: 'absolute', top: 60, left: 8, right: 8, height: 38, background: '#e5e8eb', borderRadius: 3 }} />
        {/* heatmap blobs */}
        <div style={{ position: 'absolute', top: 28, left: 14, width: 28, height: 26, borderRadius: 12, background: 'radial-gradient(circle, rgba(234,67,53,0.55), transparent 70%)' }} />
        <div style={{ position: 'absolute', top: 64, left: 50, width: 36, height: 30, borderRadius: 16, background: 'radial-gradient(circle, rgba(251,188,4,0.45), transparent 70%)' }} />
        <div style={{ position: 'absolute', top: 70, right: 16, width: 22, height: 22, borderRadius: 10, background: 'radial-gradient(circle, rgba(0,120,212,0.5), transparent 70%)' }} />
      </div>
      <div style={{ position: 'absolute', top: 4, left: 12, fontSize: 9, color: BING, fontWeight: 700, letterSpacing: 1 }}>● CLARITY HEATMAP</div>
    </div>
  )
}

function JourneyPreview() {
  const steps = [{ k: '1 · Awareness', t: 'Display ad' }, { k: '2 · Proof', t: 'Case study' }, { k: '3 · Offer', t: 'Free quote' }]
  return (
    <div style={{ ...PREVIEW_SHELL, fontSize: 10.5, gap: 4 }}>
      <div style={{ fontSize: 9, color: '#5f6368', fontWeight: 700, letterSpacing: 1 }}>SEQUENTIAL JOURNEY</div>
      {steps.map((s, i) => (
        <div key={s.k} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 18, height: 18, borderRadius: '50%', background: BING, color: '#fff', fontSize: 9, fontWeight: 700, display: 'grid', placeItems: 'center' }}>{i + 1}</span>
          <span style={{ flex: 1, fontSize: 10, color: '#202124' }}><strong>{s.k.split(' · ')[1]}</strong> · {s.t}</span>
          {i < steps.length - 1 && <span style={{ fontSize: 11, color: '#5f6368' }}>→</span>}
        </div>
      ))}
    </div>
  )
}

function AuctionInsightsPreview() {
  return (
    <div style={{ ...PREVIEW_SHELL, fontSize: 10.5 }}>
      <div style={{ fontSize: 9, color: '#5f6368', fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>AUCTION INSIGHTS · MS</div>
      <div className="sb-card-rank" style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 6px', background: 'linear-gradient(180deg, #f1f6ff, #ffffff)', border: `1px solid ${BING}`, borderRadius: 4, marginBottom: 3 }}>
        <span style={{ fontSize: 10, color: BING, fontWeight: 700 }}>★ securityblogs.com.au</span>
        <span style={{ fontSize: 10, color: BING, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>96% IS</span>
      </div>
      {[{ n: 'security-co.au', is: '42%' }, { n: 'rival-firm.au', is: '31%' }].map((c) => (
        <div key={c.n} style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 6px', fontSize: 10, color: '#5f6368' }}>
          <span>{c.n}</span>
          <span style={{ fontFamily: 'var(--font-mono)' }}>{c.is} IS</span>
        </div>
      ))}
    </div>
  )
}
