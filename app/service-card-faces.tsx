'use client'
import Link from 'next/link'
import { MAPBOX_TOKEN } from '@/lib/env'

// One bespoke "live" face per service. All cards share the same dimensions
// (440x300, controlled by the card stack) and the same shell: a service-
// specific visual fills the upper portion, with title/description/CTA in
// a bottom strip rendered over a dark gradient so text stays readable.
//
// All visuals use CSS keyframes for motion (cheap, mobile-safe) — see
// app/globals.css for the @keyframes definitions added at the bottom of
// the file (sb-card-*).

type CardProps = { title: string; description: string; href: string; active?: boolean }

const SHELL: React.CSSProperties = {
  position: 'relative', height: '100%', width: '100%', overflow: 'hidden',
  background: '#0f172a',
}

function CardCTA({ title, description, href, active }: CardProps) {
  return (
    <div
      style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        padding: '22px 22px 22px',
        background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.55) 35%, rgba(0,0,0,0.85) 100%)',
        color: '#fff',
      }}
    >
      <h3 style={{ fontSize: 22, marginBottom: 6, color: '#fff', textShadow: '0 2px 6px rgba(0,0,0,0.45)' }}>{title}</h3>
      <p style={{ fontSize: 13.5, lineHeight: 1.45, marginBottom: 12, color: 'rgba(255,255,255,0.92)', textShadow: '0 1px 4px rgba(0,0,0,0.45)', maxWidth: 380 }}>{description}</p>
      <Link
        href={href}
        style={active
          ? { display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', color: '#1e5fe0', fontWeight: 700, fontSize: 13, padding: '8px 14px', borderRadius: 8, textDecoration: 'none' }
          : { display: 'inline-flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.95)', fontWeight: 600, fontSize: 13, textDecoration: 'underline', textUnderlineOffset: 4 }
        }
      >
        Learn more →
      </Link>
    </div>
  )
}

const SERVICE_TAG: React.CSSProperties = {
  position: 'absolute', top: 14, right: 16, zIndex: 5,
  fontFamily: 'var(--font-mono, monospace)', fontSize: 10, letterSpacing: '0.14em',
  color: 'rgba(255,255,255,0.92)', textTransform: 'uppercase', textShadow: '0 1px 3px rgba(0,0,0,0.5)',
}

// =============================================================
// SEO — animated Google SERP with brand at position 1
// =============================================================
export function SEOFace(p: CardProps) {
  return (
    <div style={{ ...SHELL, background: 'linear-gradient(180deg, #e8eef7 0%, #d0dceb 100%)' }}>
      <span style={{ ...SERVICE_TAG, color: '#1a3661' }}>Service</span>

      {/* Mock Google chrome */}
      <div style={{ position: 'absolute', top: 18, left: 18, right: 100, padding: '8px 14px', background: '#fff', border: '1px solid #dadce0', borderRadius: 22, display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: '#202124', boxShadow: '0 2px 6px rgba(0,0,0,0.08)' }}>
        <span style={{ color: '#4285F4', fontWeight: 700, fontFamily: 'serif' }}>G</span>
        <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>best security company australia</span>
        <span style={{ fontSize: 10, color: '#5f6368' }}>🔎</span>
      </div>

      {/* SERP results */}
      <div style={{ position: 'absolute', top: 58, left: 18, right: 18, display: 'flex', flexDirection: 'column', gap: 7 }}>
        <div className="sb-card-rank" style={{ background: 'rgba(30,95,224,0.10)', border: '1.5px solid rgba(30,95,224,0.6)', borderRadius: 8, padding: '7px 10px', boxShadow: '0 4px 14px rgba(30,95,224,0.18)' }}>
          <div style={{ fontSize: 10.5, color: '#1e5fe0', fontWeight: 700, marginBottom: 2 }}>★ EXAMPLE RESULT</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#1a0dab' }}>securityblogs.com.au</div>
        </div>
        <SerpRow text="competitor-cctv.com.au" />
        <SerpRow text="rival-security.au" />
        <SerpRow text="guardian-cam.com.au" />
      </div>

      <CardCTA {...p} />
    </div>
  )
}

function SerpRow({ text }: { text: string }) {
  return (
    <div style={{ background: '#fff', borderRadius: 6, padding: '6px 10px', fontSize: 11.5, color: '#1a0dab', border: '1px solid #ececf1' }}>{text}</div>
  )
}

// =============================================================
// AIO — animated AI chat: question + "securityblogs.com.au" reply
// =============================================================
export function AIOFace(p: CardProps) {
  return (
    <div style={{ ...SHELL, background: '#ffffff' }}>
      <span style={{ ...SERVICE_TAG, color: '#6b6b6b', textShadow: 'none' }}>Service</span>

      {/* AI Mode chrome */}
      <div style={{ position: 'absolute', top: 14, left: 16, display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: '#3a3a3a' }}>
        <span style={{ width: 18, height: 18, borderRadius: '50%', background: '#1e5fe0', display: 'grid', placeItems: 'center', color: '#fff', fontWeight: 700, fontSize: 10 }}>AI</span>
        <span style={{ fontWeight: 600 }}>AI Mode</span>
        <span style={{ marginLeft: 6, color: '#1e5fe0', fontSize: 9 }}>● DEMO</span>
      </div>

      {/* User prompt typed */}
      <div style={{ position: 'absolute', top: 46, left: 16, right: 16 }}>
        <div style={{ fontSize: 10.5, color: '#9aa3b8', marginBottom: 4 }}>You</div>
        <div
          className="sb-typewriter"
          style={{
            fontSize: 13, color: '#000', lineHeight: 1.4,
            background: '#f4f4f4', padding: '8px 12px', borderRadius: 8,
            border: '1px solid #e5e7eb',
            display: 'inline-block', maxWidth: '100%',
          }}
        >
          best security service in Australia?
        </div>
      </div>

      {/* AI answer */}
      <div style={{ position: 'absolute', top: 128, left: 16, right: 16 }}>
        <div style={{ fontSize: 10.5, color: '#1e5fe0', marginBottom: 4 }}>AI Mode</div>
        <div style={{ fontSize: 12.5, color: '#000', lineHeight: 1.5 }}>
          A strong AI-visibility example is{' '}
          <span
            className="sb-highlight"
            style={{
              background: 'rgba(30,95,224,0.12)',
              padding: '1px 6px', borderRadius: 4, fontWeight: 700, color: '#1e5fe0',
            }}
          >
            securityblogs.com.au
          </span>
        </div>
      </div>

      <CardCTA {...p} />
    </div>
  )
}

// =============================================================
// AEO — Q & A: featured-answer style with brand cited
// =============================================================
export function AEOFace(p: CardProps) {
  return (
    <div style={{ ...SHELL, background: 'linear-gradient(180deg, #f6f9fc 0%, #dde6f0 100%)' }}>
      <span style={{ ...SERVICE_TAG, color: '#1a3661' }}>Service</span>

      {/* Question card */}
      <div style={{ position: 'absolute', top: 18, left: 18, right: 18, background: '#fff', borderRadius: 10, padding: '10px 14px', boxShadow: '0 4px 12px rgba(0,0,0,0.06)', border: '1px solid #ececf1' }}>
        <div style={{ fontSize: 10, letterSpacing: 1.2, color: '#5f6368', fontWeight: 600, marginBottom: 4 }}>QUESTION</div>
        <div style={{ fontSize: 13, color: '#202124', lineHeight: 1.35 }}>
          Who is the most-recommended security company in Sydney?
        </div>
      </div>

      {/* Featured answer */}
      <div
        className="sb-card-rank"
        style={{
          position: 'absolute', top: 92, left: 18, right: 18,
          background: 'linear-gradient(180deg, #f1f6ff 0%, #ffffff 100%)',
          border: '1.5px solid #1e5fe0', borderRadius: 10, padding: '10px 14px',
          boxShadow: '0 6px 20px rgba(30,95,224,0.18)',
        }}
      >
        <div style={{ fontSize: 9.5, letterSpacing: 1.2, color: '#1e5fe0', fontWeight: 700, marginBottom: 4 }}>FEATURED ANSWER · EXAMPLE</div>
        <div style={{ fontSize: 13, color: '#1a0dab', fontWeight: 700, marginBottom: 4 }}>securityblogs.com.au</div>
        <div style={{ fontSize: 11.5, color: '#4d5156', lineHeight: 1.45 }}>
          Australia&apos;s AI Visibility platform for security brands — built to be cited by ChatGPT, Gemini, Perplexity and Google AI.
        </div>
      </div>

      <CardCTA {...p} />
    </div>
  )
}

// =============================================================
// GEO — Australia map with pulsing pins on all 8 capital cities
// =============================================================
export function GEOFace(p: CardProps) {
  // Centered on Australia at zoom 4.0; 600x408 image matches the card's
  // 440x300 aspect (~1.47), so the tiles fill the card with no crop and
  // pin positions stay accurate. Light style (mapbox/light-v11) makes the
  // continent + state borders pop on a white background.
  const url = MAPBOX_TOKEN
    ? `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/134,-27,4,0/600x408@2x?access_token=${MAPBOX_TOKEN}`
    : ''
  return (
    <div style={{ ...SHELL, background: '#f4f8fc' }}>
      <span style={{ ...SERVICE_TAG, color: '#1a3661', textShadow: '0 1px 3px rgba(255,255,255,0.7)' }}>Service</span>

      {url ? (
        <div
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${url})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            opacity: 1,
          }}
        />
      ) : (
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 60% 60%, rgba(30,95,224,0.18) 0%, transparent 55%)' }} />
      )}

      {/* Pulsing pins on every Australian capital — brand blue on white */}
      {AU_CAPITALS.map((c, i) => (
        <span
          key={c.name}
          className="sb-pin"
          title={c.name}
          style={{
            position: 'absolute',
            top: `${c.top}%`,
            left: `${c.left}%`,
            width: 10, height: 10, borderRadius: '50%',
            background: '#1e5fe0',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 0 0 rgba(30,95,224,0.55), 0 0 0 2px #fff',
            animationDelay: `${i * 0.25}s`,
          }}
        />
      ))}

      {/* Brand chip — uses SecurityBlogs as the live demo */}
      <div style={{
        position: 'absolute', top: 14, left: 16, zIndex: 4,
        background: 'rgba(255,255,255,0.94)',
        padding: '4px 10px', borderRadius: 999,
        fontSize: 10.5, color: '#1a3661', fontWeight: 600,
        border: '1px solid rgba(30,95,224,0.25)',
        boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
      }}>
        ● securityblogs.com.au · 8 capitals
      </div>

      <CardCTA {...p} />
    </div>
  )
}

// Australia's 8 capitals plotted as % positions for the Mapbox static map
// above. Positions are linear approximations against the visible bbox
// (lng 107.7-160.3, lat -9.1 to -44.9) which is close enough for a 440px
// wide card — the largest error is at Hobart and is < 2px.
const AU_CAPITALS = [
  { name: 'Darwin',    top: 9.4,  left: 44.0 },
  { name: 'Brisbane',  top: 51.3, left: 86.2 },
  { name: 'Perth',     top: 63.8, left: 15.5 },
  { name: 'Sydney',    top: 69.2, left: 82.7 },
  { name: 'Adelaide',  top: 72.1, left: 58.7 },
  { name: 'Canberra',  top: 73.1, left: 78.8 },
  { name: 'Melbourne', top: 80.2, left: 70.8 },
  { name: 'Hobart',    top: 94.4, left: 75.3 },
]

// =============================================================
// Google Ads — animated dashboard tiles
// =============================================================
export function GoogleAdsFace(p: CardProps) {
  return (
    <div style={{ ...SHELL, background: 'linear-gradient(180deg, #f6f9fc 0%, #e1ecf6 100%)' }}>
      <span style={{ ...SERVICE_TAG, color: '#1a3661' }}>Service</span>

      {/* Dashboard chrome */}
      <div style={{ position: 'absolute', top: 14, left: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 18, height: 18, borderRadius: 4, background: 'linear-gradient(135deg, #4285F4 0%, #34A853 50%, #FBBC04 75%, #EA4335 100%)' }} />
        <span style={{ fontSize: 11.5, fontWeight: 600, color: '#202124' }}>Example dashboard</span>
      </div>

      {/* Three KPI tiles */}
      <div style={{ position: 'absolute', top: 42, left: 16, right: 16, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
        <KPI label="IMPRESSIONS" value="18.4k" delta="+62%" tone="#1a73e8" />
        <KPI label="CLICKS" value="947" delta="+38%" tone="#188038" />
        <KPI label="CPC" value="$3.82" delta="-31%" tone="#d93025" inverse />
      </div>

      {/* Mini bar chart */}
      <div style={{ position: 'absolute', top: 132, left: 16, right: 16, height: 30, display: 'flex', alignItems: 'flex-end', gap: 4 }}>
        {[24, 36, 30, 48, 56, 64, 78, 84, 90].map((h, i) => (
          <div key={i} className="sb-bar" style={{ flex: 1, height: `${h}%`, background: 'linear-gradient(180deg, #1a73e8 0%, #4285F4 100%)', borderRadius: 2, animationDelay: `${i * 0.08}s` }} />
        ))}
      </div>

      <CardCTA {...p} />
    </div>
  )
}

function KPI({ label, value, delta, tone, inverse = false }: { label: string; value: string; delta: string; tone: string; inverse?: boolean }) {
  return (
    <div style={{ background: '#fff', borderRadius: 8, padding: '7px 10px', border: '1px solid #ececf1', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
      <div style={{ fontSize: 9, letterSpacing: 0.6, color: '#5f6368', fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: 14, fontWeight: 700, color: tone }}>{value}</div>
      <div style={{ fontSize: 9.5, color: inverse ? '#188038' : tone, fontWeight: 600 }}>{delta}</div>
    </div>
  )
}

// =============================================================
// Bing Ads — same dashboard pattern, Microsoft Ads palette
// =============================================================
export function BingAdsFace(p: CardProps) {
  return (
    <div style={{ ...SHELL, background: 'linear-gradient(180deg, #f6fbff 0%, #c6e0f0 100%)' }}>
      <span style={{ ...SERVICE_TAG, color: '#0d4b78' }}>Service</span>

      {/* Microsoft Ads chrome */}
      <div style={{ position: 'absolute', top: 14, left: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', width: 18, height: 18, gap: 1 }}>
          <span style={{ background: '#f25022' }} /><span style={{ background: '#7fba00' }} />
          <span style={{ background: '#00a4ef' }} /><span style={{ background: '#ffb900' }} />
        </div>
        <span style={{ fontSize: 11.5, fontWeight: 600, color: '#0d4b78' }}>Example dashboard</span>
      </div>

      <div style={{ position: 'absolute', top: 42, left: 16, right: 16, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
        <KPI label="IMPRESSIONS" value="9.2k" delta="+44%" tone="#0078d4" />
        <KPI label="CLICKS" value="487" delta="+29%" tone="#107c10" />
        <KPI label="CPC" value="$2.14" delta="-41%" tone="#107c10" inverse />
      </div>

      {/* Mini sparkline */}
      <svg viewBox="0 0 200 40" style={{ position: 'absolute', top: 132, left: 16, right: 16, width: 'calc(100% - 32px)', height: 32 }}>
        <defs>
          <linearGradient id="sb-ms-line" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0078d4" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#0078d4" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 30 L20 26 L40 28 L60 22 L80 18 L100 16 L120 12 L140 14 L160 10 L180 8 L200 6 L200 40 L0 40 Z" fill="url(#sb-ms-line)" />
        <path d="M0 30 L20 26 L40 28 L60 22 L80 18 L100 16 L120 12 L140 14 L160 10 L180 8 L200 6" fill="none" stroke="#0078d4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <CardCTA {...p} />
    </div>
  )
}

// =============================================================
// Web Design — browser frame showing the homepage hero
// =============================================================
export function WebDesignFace(p: CardProps) {
  return (
    <div style={{ ...SHELL, background: '#ffffff' }}>
      <span style={{ ...SERVICE_TAG, color: '#6b6b6b', textShadow: 'none' }}>Service</span>

      {/* Browser frame */}
      <div style={{ position: 'absolute', top: 18, left: 18, right: 18, bottom: 90, borderRadius: 10, overflow: 'hidden', background: '#fff', boxShadow: '0 10px 30px rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.1)' }}>
        {/* tab bar */}
        <div style={{ background: '#f1f3f5', padding: '5px 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f57' }} />
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#febc2e' }} />
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#28c840' }} />
          <span style={{ marginLeft: 8, fontSize: 9.5, color: '#5f6368' }}>securityblogs.com.au</span>
        </div>
        {/* page scroll */}
        <div style={{ height: 'calc(100% - 24px)', overflow: 'hidden', position: 'relative' }}>
          <div className="sb-scroll-loop" style={{ display: 'flex', flexDirection: 'column' }}>
            {[0, 1].map((dup) => (
              <div key={dup} style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#0f2244' }}>Be the answer AI gives.</div>
                <div style={{ fontSize: 10, color: '#5f6f8a', lineHeight: 1.45 }}>AI visibility, SEO and paid media built exclusively for security brands.</div>
                <div style={{ display: 'flex', gap: 4 }}>
                  <span style={{ background: '#1e5fe0', color: '#fff', padding: '3px 8px', borderRadius: 5, fontSize: 9 }}>Free audit</span>
                  <span style={{ background: '#fff', border: '1px solid #d8e0ee', color: '#1e5fe0', padding: '3px 8px', borderRadius: 5, fontSize: 9 }}>Live score</span>
                </div>
                <div style={{ height: 4, background: 'linear-gradient(90deg, #1e5fe0 0%, #6f4dff 100%)', borderRadius: 2, marginTop: 4 }} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
                  <div style={{ height: 14, background: '#e9eef5', borderRadius: 3 }} />
                  <div style={{ height: 14, background: '#e9eef5', borderRadius: 3 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CardCTA {...p} />
    </div>
  )
}

// =============================================================
// ServiceFace — picks the right face by slug. Used by both the
// homepage card stack AND the /services/ index grid so each card
// renders the same live "what this service does" visual everywhere.
// =============================================================
export function ServiceFace({
  slug,
  title,
  description,
  href,
  active = true,
}: {
  slug: string
  title: string
  description: string
  href: string
  active?: boolean
}) {
  const common = { title, description, href, active }
  switch (slug) {
    case 'security-seo': return <SEOFace {...common} />
    case 'aio':          return <AIOFace {...common} />
    case 'aeo':          return <AEOFace {...common} />
    case 'geo':          return <GEOFace {...common} />
    case 'google-ads':   return <GoogleAdsFace {...common} />
    case 'bing-ads':     return <BingAdsFace {...common} />
    case 'web-design':   return <WebDesignFace {...common} />
    default:             return null
  }
}
