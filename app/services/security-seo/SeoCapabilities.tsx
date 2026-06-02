'use client'
import CapabilityGrid, { PREVIEW_SHELL, type Capability } from '@/components/ui/CapabilityCard'

const CAPS: Capability[] = [
  { title: 'On-Page SEO', desc: 'Title tags, headings, internal linking and content optimised around the exact terms your security buyers search.', preview: <OnPagePreview /> },
  { title: 'Technical SEO', desc: 'Crawlability, Core Web Vitals, schema, indexation and site architecture engineered for fast, clean rankings.', preview: <TechnicalSEOPreview /> },
  { title: 'Local SEO', desc: 'Google Business Profile, citations and location pages so you dominate every city and service area you operate in.', preview: <LocalSEOPreview /> },
  { title: 'Content Strategy', desc: 'E-E-A-T-rich content built around buyer intent, compliance topics and high-converting service pages.', preview: <ContentClusterPreview /> },
  { title: 'Link Building', desc: 'Authoritative, industry-relevant backlinks that build trust signals search engines reward.', preview: <BacklinksPreview /> },
  { title: 'Rank Tracking', desc: 'Transparent monthly reporting on every keyword, position movement and traffic gain — no vanity metrics.', preview: <RankTrackingPreview /> },
]
export default function SeoCapabilities() { return <CapabilityGrid items={CAPS} /> }

function OnPagePreview() {
  return (
    <div style={{ ...PREVIEW_SHELL, fontSize: 10.5, gap: 5 }}>
      <div style={{ fontSize: 9, letterSpacing: 1, color: '#5f6368', fontWeight: 700 }}>META · SECURITYBLOGS.COM.AU</div>
      <div>
        <div style={{ fontSize: 12.5, color: '#1a0dab', fontWeight: 600, lineHeight: 1.2 }}>Security SEO Australia | AI Visibility for Security Brands</div>
        <div style={{ fontSize: 10, color: '#188038' }}>securityblogs.com.au &gt; services &gt; security-seo</div>
        <div style={{ fontSize: 10, color: '#4d5156', marginTop: 2, lineHeight: 1.4 }}>Specialist security-industry SEO. Rank for high-intent buyer keywords and get cited by every AI engine. Free audit.</div>
      </div>
      <div style={{ display: 'flex', gap: 4, marginTop: 2 }}>
        <span style={{ background: '#e6f4ea', color: '#188038', padding: '1px 5px', borderRadius: 3, fontSize: 9, fontWeight: 700 }}>TITLE ✓</span>
        <span style={{ background: '#e6f4ea', color: '#188038', padding: '1px 5px', borderRadius: 3, fontSize: 9, fontWeight: 700 }}>META ✓</span>
        <span style={{ background: '#e6f4ea', color: '#188038', padding: '1px 5px', borderRadius: 3, fontSize: 9, fontWeight: 700 }}>H1 ✓</span>
      </div>
    </div>
  )
}

function TechnicalSEOPreview() {
  const scores = [
    { k: 'Performance',   v: 98, color: '#10a37f' },
    { k: 'Accessibility', v: 95, color: '#10a37f' },
    { k: 'Best Pract.',   v: 100, color: '#10a37f' },
    { k: 'SEO',           v: 100, color: '#10a37f' },
  ]
  return (
    <div style={{ ...PREVIEW_SHELL, fontSize: 10.5, gap: 6, padding: 12 }}>
      <div style={{ fontSize: 9, letterSpacing: 1, color: '#5f6368', fontWeight: 700 }}>LIGHTHOUSE · MOBILE</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
        {scores.map((s) => (
          <div key={s.k} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 26, height: 26, borderRadius: '50%', border: `2.5px solid ${s.color}`, display: 'grid', placeItems: 'center', fontSize: 9, fontWeight: 700, color: s.color }}>{s.v}</span>
            <span style={{ fontSize: 9.5, color: '#202124' }}>{s.k}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function LocalSEOPreview() {
  return (
    <div style={{ ...PREVIEW_SHELL, fontSize: 10.5 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#202124' }}>SecurityBlogs</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
        <span style={{ color: '#fbbc04' }}>★★★★★</span>
        <span style={{ fontSize: 10, color: '#5f6368' }}>5.0 · 142 reviews</span>
      </div>
      <div style={{ fontSize: 10, color: '#5f6368', marginTop: 2 }}>AI Visibility Platform · Open · Closes 5pm</div>
      <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
        <span style={{ background: '#1a73e8', color: '#fff', padding: '2px 8px', borderRadius: 4, fontSize: 9, fontWeight: 700 }}>CALL</span>
        <span style={{ background: '#fff', border: '1px solid #1a73e8', color: '#1a73e8', padding: '2px 8px', borderRadius: 4, fontSize: 9, fontWeight: 700 }}>DIRECTIONS</span>
        <span style={{ background: '#fff', border: '1px solid #1a73e8', color: '#1a73e8', padding: '2px 8px', borderRadius: 4, fontSize: 9, fontWeight: 700 }}>WEBSITE</span>
      </div>
      <div style={{ marginTop: 4, fontSize: 9.5, color: '#10a37f', fontFamily: 'var(--font-mono)' }}>● Verified business · Map Pack #1</div>
    </div>
  )
}

function ContentClusterPreview() {
  const nodes = [
    { x: 50, y: 50, label: 'Pillar', primary: true },
    { x: 20, y: 22, label: 'AIO' },
    { x: 80, y: 22, label: 'AEO' },
    { x: 18, y: 78, label: 'SEO' },
    { x: 50, y: 88, label: 'GEO' },
    { x: 82, y: 78, label: 'Ads' },
  ]
  return (
    <div style={{ ...PREVIEW_SHELL, padding: 0 }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
        {nodes.slice(1).map((n, i) => (
          <line key={i} x1="50" y1="50" x2={n.x} y2={n.y} stroke="#1e5fe0" strokeWidth="0.3" opacity="0.6" />
        ))}
        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r={n.primary ? 7 : 4} fill={n.primary ? '#1e5fe0' : '#7eb6ff'} className={n.primary ? 'sb-card-rank' : ''} />
            <text x={n.x} y={n.y + 1.5} fontSize="3" fill="#fff" textAnchor="middle" fontFamily="system-ui" fontWeight="700">{n.label}</text>
          </g>
        ))}
      </svg>
    </div>
  )
}

function BacklinksPreview() {
  const items = [
    { dom: 'security-news.au',   da: 72 },
    { dom: 'cctv-journal.com',   da: 68 },
    { dom: 'integrators.au',     da: 55 },
    { dom: 'industry-mag.com.au', da: 49 },
  ]
  return (
    <div style={{ ...PREVIEW_SHELL, fontSize: 10.5 }}>
      <div style={{ fontSize: 9, letterSpacing: 1, color: '#5f6368', fontWeight: 700, marginBottom: 4 }}>REFERRING DOMAINS · LAST 30D</div>
      {items.map((it, i) => (
        <div key={it.dom} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '3px 0', borderBottom: i < items.length - 1 ? '1px solid #f3f4f7' : 'none' }}>
          <span style={{ fontSize: 10, color: '#1a0dab', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>🔗 {it.dom}</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 9, color: '#5f6368', fontWeight: 600 }}>DR {it.da}</span>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10a37f' }} />
          </span>
        </div>
      ))}
    </div>
  )
}

function RankTrackingPreview() {
  return (
    <div style={{ ...PREVIEW_SHELL, fontSize: 10.5 }}>
      <div style={{ fontSize: 9, letterSpacing: 1, color: '#5f6368', fontWeight: 700, marginBottom: 4 }}>RANK TRENDS · 12 WEEKS</div>
      <svg viewBox="0 0 100 40" style={{ width: '100%', height: 50 }}>
        <defs>
          <linearGradient id="seo-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e5fe0" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1e5fe0" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 32 L12 28 L24 24 L36 18 L48 14 L60 10 L72 6 L84 4 L96 3 L100 3 L100 40 L0 40 Z" fill="url(#seo-fade)" />
        <path d="M0 32 L12 28 L24 24 L36 18 L48 14 L60 10 L72 6 L84 4 L96 3 L100 3" fill="none" stroke="#1e5fe0" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="96" cy="3" r="2" fill="#1e5fe0" className="sb-card-rank" />
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9.5, marginTop: 2 }}>
        <span style={{ color: '#5f6368' }}>Avg pos. <strong style={{ color: '#1e5fe0' }}>2.4</strong></span>
        <span style={{ color: '#10a37f', fontWeight: 700 }}>↑ +18 keywords</span>
      </div>
    </div>
  )
}
