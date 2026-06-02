'use client'

// Compact animated icons that replace the static emoji icons on the
// /services/ index grid (and other service-card surfaces). Each is a
// 60x60 cell that visually mirrors what the matching large card on the
// homepage shows — same metaphor, miniature. All motion runs on CSS
// keyframes defined in app/globals.css (sb-li-*).

const WRAP: React.CSSProperties = {
  width: 60, height: 60,
  borderRadius: 16,
  background: 'rgba(30, 95, 224, 0.08)',
  border: '1px solid rgba(30, 95, 224, 0.20)',
  display: 'grid', placeItems: 'center',
  overflow: 'hidden',
  position: 'relative',
}

export default function ServiceLiveIcon({ slug }: { slug: string }) {
  switch (slug) {
    case 'security-seo': return <Wrap><SEOIcon /></Wrap>
    case 'aio':          return <Wrap><AIOIcon /></Wrap>
    case 'aeo':          return <Wrap><AEOIcon /></Wrap>
    case 'geo':          return <Wrap><GEOIcon /></Wrap>
    case 'google-ads':   return <Wrap><GoogleAdsIcon /></Wrap>
    case 'bing-ads':     return <Wrap><BingAdsIcon /></Wrap>
    case 'web-design':   return <Wrap><WebDesignIcon /></Wrap>
    default:             return <Wrap><DefaultIcon /></Wrap>
  }
}

function Wrap({ children }: { children: React.ReactNode }) {
  return <div style={WRAP} aria-hidden>{children}</div>
}

// ─── SEO: magnifying glass + rising rank ticks
function SEOIcon() {
  return (
    <svg viewBox="0 0 60 60" width={40} height={40}>
      <circle cx="24" cy="24" r="11" fill="none" stroke="#1e5fe0" strokeWidth="2.5" />
      <line x1="32" y1="32" x2="44" y2="44" stroke="#1e5fe0" strokeWidth="2.5" strokeLinecap="round" />
      <g className="sb-li-rise">
        <line x1="18" y1="28" x2="18" y2="26" stroke="#1e5fe0" strokeWidth="2" strokeLinecap="round" />
        <line x1="22" y1="28" x2="22" y2="23" stroke="#1e5fe0" strokeWidth="2" strokeLinecap="round" />
        <line x1="26" y1="28" x2="26" y2="20" stroke="#1e5fe0" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  )
}

// ─── AIO: chat bubble with bouncing typing dots
function AIOIcon() {
  return (
    <svg viewBox="0 0 60 60" width={42} height={42}>
      <path
        d="M10 18 a6 6 0 0 1 6 -6 h28 a6 6 0 0 1 6 6 v16 a6 6 0 0 1 -6 6 h-14 l-8 8 v-8 h-6 a6 6 0 0 1 -6 -6 z"
        fill="#1e5fe0"
      />
      <circle cx="22" cy="26" r="2.4" fill="#fff" className="sb-li-dot-1" />
      <circle cx="30" cy="26" r="2.4" fill="#fff" className="sb-li-dot-2" />
      <circle cx="38" cy="26" r="2.4" fill="#fff" className="sb-li-dot-3" />
    </svg>
  )
}

// ─── AEO: answer star pulsing
function AEOIcon() {
  return (
    <svg viewBox="0 0 60 60" width={42} height={42}>
      <path
        className="sb-li-pulse"
        d="M30 12 l5 11 12 1.5 -9 8 2.5 12 -10.5 -6 -10.5 6 2.5 -12 -9 -8 12 -1.5 z"
        fill="#1e5fe0"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
      />
    </svg>
  )
}

// ─── GEO: stylised Australia outline with one pulsing pin
function GEOIcon() {
  return (
    <svg viewBox="0 0 60 60" width={44} height={44}>
      {/* Stylised AU continent — simplified blob */}
      <path
        d="M14 26 q3 -6 9 -6 q4 -3 9 -2 q5 -2 9 1 q5 1 6 6 q3 4 1 8 q1 4 -2 6 q-1 4 -7 4 q-5 3 -10 0 q-5 1 -9 -3 q-5 -1 -6 -7 q-3 -2 0 -7 z"
        fill="#1e5fe0"
        fillOpacity="0.18"
        stroke="#1e5fe0"
        strokeWidth="1.5"
      />
      {/* Pulsing pin — east coast position */}
      <circle
        className="sb-li-pin"
        cx="40" cy="30" r="3"
        fill="#1e5fe0"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
      />
    </svg>
  )
}

// ─── Google Ads: 4 bars growing
function GoogleAdsIcon() {
  return (
    <svg viewBox="0 0 60 60" width={42} height={42}>
      <rect className="sb-li-bar-1" x="12" y="20" width="7" height="24" fill="#4285F4" style={{ transformBox: 'fill-box', transformOrigin: 'bottom' }} />
      <rect className="sb-li-bar-2" x="22" y="20" width="7" height="24" fill="#34A853" style={{ transformBox: 'fill-box', transformOrigin: 'bottom' }} />
      <rect className="sb-li-bar-3" x="32" y="20" width="7" height="24" fill="#FBBC04" style={{ transformBox: 'fill-box', transformOrigin: 'bottom' }} />
      <rect className="sb-li-bar-4" x="42" y="20" width="7" height="24" fill="#EA4335" style={{ transformBox: 'fill-box', transformOrigin: 'bottom' }} />
    </svg>
  )
}

// ─── Bing Ads: sparkline drawing in
function BingAdsIcon() {
  return (
    <svg viewBox="0 0 60 60" width={44} height={44}>
      <path
        d="M10 40 L18 34 L26 36 L34 26 L42 24 L50 18"
        fill="none"
        stroke="#0078d4"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="sb-li-line-draw"
        style={{ strokeDasharray: 70, strokeDashoffset: 0 }}
      />
      <circle cx="50" cy="18" r="3" fill="#0078d4" className="sb-li-pulse" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
    </svg>
  )
}

// ─── Web Design: browser frame with scrolling lines
function WebDesignIcon() {
  return (
    <svg viewBox="0 0 60 60" width={42} height={42}>
      <rect x="8" y="12" width="44" height="36" rx="4" fill="none" stroke="#1e5fe0" strokeWidth="2" />
      <line x1="8" y1="20" x2="52" y2="20" stroke="#1e5fe0" strokeWidth="1.5" />
      <circle cx="12" cy="16" r="1" fill="#1e5fe0" />
      <circle cx="16" cy="16" r="1" fill="#1e5fe0" />
      <g className="sb-li-scroll">
        <rect x="12" y="24" width="20" height="2" rx="1" fill="#1e5fe0" />
        <rect x="12" y="29" width="32" height="2" rx="1" fill="#1e5fe0" opacity="0.6" />
        <rect x="12" y="34" width="24" height="2" rx="1" fill="#1e5fe0" opacity="0.6" />
        <rect x="12" y="39" width="16" height="2" rx="1" fill="#1e5fe0" opacity="0.6" />
        <rect x="12" y="44" width="28" height="2" rx="1" fill="#1e5fe0" opacity="0.6" />
      </g>
    </svg>
  )
}

function DefaultIcon() {
  return (
    <svg viewBox="0 0 60 60" width={36} height={36}>
      <circle cx="30" cy="30" r="14" fill="none" stroke="#1e5fe0" strokeWidth="2.5" />
      <circle cx="30" cy="30" r="4" fill="#1e5fe0" />
    </svg>
  )
}
