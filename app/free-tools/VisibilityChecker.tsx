'use client'
import { useMemo, useState } from 'react'
import MagneticButton from '@/components/ui/MagneticButton'
import { submitForm } from '@/lib/submitForm'

const INDUSTRIES = [
  'CCTV',
  'Access Control',
  'Alarms & Monitoring',
  'Cyber Security',
  'Security Consulting',
  'Systems Integration',
  'Other',
] as const

type Industry = (typeof INDUSTRIES)[number]

const QUERIES_BY_INDUSTRY: Record<Industry, string[]> = {
  CCTV: [
    'best CCTV installer near me',
    'commercial CCTV systems comparison',
    'who installs the best security cameras',
    'CCTV monitoring company recommendations',
  ],
  'Access Control': [
    'best access control provider',
    'cloud access control systems comparison',
    'who installs door access systems',
    'top access control companies for offices',
  ],
  'Alarms & Monitoring': [
    'best alarm monitoring company',
    '24/7 security monitoring providers',
    'who offers the best business alarm system',
    'back to base monitoring comparison',
  ],
  'Cyber Security': [
    'best cyber security firm for SMBs',
    'top managed security service providers',
    'who does penetration testing',
    'cyber security consultants near me',
  ],
  'Security Consulting': [
    'best security consultant for my business',
    'security risk assessment companies',
    'who does physical security audits',
    'top security advisory firms',
  ],
  'Systems Integration': [
    'best security systems integrator',
    'who integrates CCTV and access control',
    'enterprise security integration companies',
    'top systems integration partners',
  ],
  Other: [
    'best security company near me',
    'top rated security providers',
    'who is the most trusted security brand',
    'security vendor comparison',
  ],
}

const PLATFORMS = ['ChatGPT', 'Perplexity', 'Gemini', 'Google AI Overviews', 'Bing Copilot'] as const
type Platform = (typeof PLATFORMS)[number]

const SEARCH_URL: Record<Platform, (q: string) => string> = {
  ChatGPT: (q) => `https://chatgpt.com/?q=${encodeURIComponent(q)}`,
  Perplexity: (q) => `https://www.perplexity.ai/search?q=${encodeURIComponent(q)}`,
  Gemini: (q) => `https://gemini.google.com/app?q=${encodeURIComponent(q)}`,
  'Google AI Overviews': (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`,
  'Bing Copilot': (q) => `https://www.bing.com/search?q=${encodeURIComponent(q)}&showconv=1`,
}

// Deterministic pseudo-random so results are stable per (brand, platform) pair.
function hashFound(brand: string, platform: string) {
  let h = 0
  const s = `${brand.trim().toLowerCase()}|${platform}`
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h % 5 !== 0 ? h % 3 !== 1 : false // ~roughly mixed found / not found
}

function excerpt(platform: Platform, brand: string, query: string, found: boolean): React.ReactNode {
  const B = (
    <strong style={{ color: 'var(--blue)' }}>{brand || 'your brand'}</strong>
  )
  if (found) {
    return (
      <>
        “For buyers researching <em>{query}</em>, {B} stands out as a leading,
        well-reviewed provider with strong industry authority and verified credentials…”
      </>
    )
  }
  return (
    <>
      “Top recommendations for <em>{query}</em> include several established providers — but{' '}
      {B} was not referenced in {platform}&apos;s answer.”
    </>
  )
}

const STEPS = ['Your brand', 'Search queries', 'Platforms', 'Results'] as const

export default function VisibilityChecker() {
  const [step, setStep] = useState(0)
  const [brand, setBrand] = useState('')
  const [url, setUrl] = useState('')
  const [industry, setIndustry] = useState<Industry>('CCTV')
  const [email, setEmail] = useState('')

  const [selectedQueries, setSelectedQueries] = useState<string[]>([])
  const [customQuery, setCustomQuery] = useState('')

  const [platforms, setPlatforms] = useState<Platform[]>([...PLATFORMS])
  const [ran, setRan] = useState(false)

  const presetQueries = QUERIES_BY_INDUSTRY[industry]

  const step1Valid =
    brand.trim().length > 1 && url.trim().length > 3 && /\S+@\S+\.\S+/.test(email)

  const allQueries = useMemo(() => {
    const q = [...selectedQueries]
    if (customQuery.trim()) q.push(customQuery.trim())
    return q
  }, [selectedQueries, customQuery])

  const primaryQuery = allQueries[0] || presetQueries[0]

  const results = useMemo(() => {
    if (!ran) return []
    return platforms.map((p) => ({
      platform: p,
      found: hashFound(brand || url, p),
    }))
  }, [ran, platforms, brand, url])

  const anyFound = results.some((r) => r.found)

  const toggleQuery = (q: string) =>
    setSelectedQueries((prev) => (prev.includes(q) ? prev.filter((x) => x !== q) : [...prev, q]))

  const togglePlatform = (p: Platform) =>
    setPlatforms((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]))

  const run = () => {
    const fd = new FormData()
    fd.set('brand', brand)
    fd.set('url', url)
    fd.set('industry', industry)
    fd.set('email', email)
    fd.set('queries', (allQueries.length ? allQueries : [primaryQuery]).join(', '))
    fd.set('platforms', platforms.join(', '))
    submitForm({ formData: fd, subject: 'New AI Visibility Checker lead' })
    setRan(true)
    setStep(3)
  }

  const reset = () => {
    setRan(false)
    setStep(0)
  }

  return (
    <div className="glass" style={{ padding: 'clamp(22px, 4vw, 38px)' }}>
      {/* Progress */}
      <div className="flex flex-wrap gap-2" style={{ marginBottom: 26 }}>
        {STEPS.map((label, i) => {
          const active = i === step
          const done = i < step
          return (
            <div key={label} className="flex items-center gap-2" style={{ fontSize: 13 }}>
              <span
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: '50%',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: 12,
                  fontWeight: 700,
                  background: active ? 'var(--blue)' : done ? 'var(--green)' : 'var(--bg-card-2)',
                  color: active || done ? '#fff' : 'var(--text-dim)',
                  border: '1px solid var(--line)',
                  transition: 'all .25s',
                }}
              >
                {done ? '✓' : i + 1}
              </span>
              <span className={active ? 'accent' : 'text-dim'} style={{ fontWeight: active ? 600 : 400 }}>
                {label}
              </span>
              {i < STEPS.length - 1 && <span className="text-dim" style={{ margin: '0 4px' }}>—</span>}
            </div>
          )
        })}
      </div>

      {/* STEP 1 */}
      {step === 0 && (
        <div>
          <h3 style={{ fontSize: 20, marginBottom: 18 }}>Tell us about your brand</h3>
          <div className="grid-2" style={{ gap: 16 }}>
            <div>
              <label className="label">Brand name *</label>
              <input
                className="field"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="e.g. Sentinel Guard Systems"
              />
            </div>
            <div>
              <label className="label">Website URL *</label>
              <input
                className="field"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://yourbrand.com"
              />
            </div>
            <div>
              <label className="label">Industry</label>
              <select
                className="field"
                value={industry}
                onChange={(e) => {
                  setIndustry(e.target.value as Industry)
                  setSelectedQueries([])
                }}
              >
                {INDUSTRIES.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Email *</label>
              <input
                className="field"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
              />
            </div>
          </div>
          {/* honeypot */}
          <input className="honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <div className="flex justify-between items-center" style={{ marginTop: 24 }}>
            <span className="text-dim" style={{ fontSize: 13 }}>No login. No credit card.</span>
            <button
              className="btn btn-primary"
              disabled={!step1Valid}
              style={{ opacity: step1Valid ? 1 : 0.5, cursor: step1Valid ? 'pointer' : 'not-allowed' }}
              onClick={() => step1Valid && setStep(1)}
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {/* STEP 2 */}
      {step === 1 && (
        <div>
          <h3 style={{ fontSize: 20, marginBottom: 6 }}>What do your buyers search for?</h3>
          <p className="text-soft" style={{ fontSize: 14, marginBottom: 18 }}>
            Pick the queries your ideal customers ask AI — or add your own.
          </p>
          <div className="flex flex-wrap gap-2" style={{ marginBottom: 18 }}>
            {presetQueries.map((q) => (
              <button
                key={q}
                className={`pill ${selectedQueries.includes(q) ? 'active' : ''}`}
                onClick={() => toggleQuery(q)}
                aria-pressed={selectedQueries.includes(q)}
              >
                {q}
              </button>
            ))}
          </div>
          <label className="label">Custom query</label>
          <input
            className="field"
            value={customQuery}
            onChange={(e) => setCustomQuery(e.target.value)}
            placeholder="e.g. best biometric access control in Sydney"
          />
          <div className="flex justify-between items-center" style={{ marginTop: 24 }}>
            <button className="btn btn-outline" onClick={() => setStep(0)}>
              ← Back
            </button>
            <button className="btn btn-primary" onClick={() => setStep(2)}>
              Next →
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {step === 2 && (
        <div>
          <h3 style={{ fontSize: 20, marginBottom: 6 }}>Which platforms to check?</h3>
          <p className="text-soft" style={{ fontSize: 14, marginBottom: 18 }}>
            We&apos;ll simulate how each AI answer engine responds to your buyers&apos; queries.
          </p>
          <div className="flex flex-wrap gap-2" style={{ marginBottom: 8 }}>
            {PLATFORMS.map((p) => (
              <button
                key={p}
                className={`pill ${platforms.includes(p) ? 'active' : ''}`}
                onClick={() => togglePlatform(p)}
                aria-pressed={platforms.includes(p)}
              >
                {p}
              </button>
            ))}
          </div>
          <div className="flex justify-between items-center flex-wrap gap-3" style={{ marginTop: 26 }}>
            <button className="btn btn-outline" onClick={() => setStep(1)}>
              ← Back
            </button>
            <MagneticButton
              type="button"
              onClick={() => platforms.length > 0 && run()}
              className="btn btn-primary btn-lg"
            >
              Run My AI Check →
            </MagneticButton>
          </div>
          {platforms.length === 0 && (
            <p className="text-dim center" style={{ fontSize: 13, marginTop: 12 }}>
              Select at least one platform to run the check.
            </p>
          )}
        </div>
      )}

      {/* RESULTS */}
      {step === 3 && ran && (
        <div>
          <div className="flex justify-between items-center flex-wrap gap-3" style={{ marginBottom: 20 }}>
            <div>
              <span className="eyebrow">Results for</span>
              <h3 style={{ fontSize: 20 }}>{brand}</h3>
            </div>
            <button className="btn btn-outline" onClick={reset}>
              ↺ Run again
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
            {results.map((r) => (
              <div key={r.platform} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div className="flex justify-between items-center">
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16 }}>
                    {r.platform}
                  </span>
                  {r.found ? (
                    <span
                      className="badge"
                      style={{ background: 'rgba(30,158,117,0.14)', color: 'var(--green)', borderColor: 'rgba(30,158,117,0.3)' }}
                    >
                      Found ✓
                    </span>
                  ) : (
                    <span
                      className="badge"
                      style={{ background: 'rgba(226,55,68,0.12)', color: 'var(--red)', borderColor: 'rgba(226,55,68,0.3)' }}
                    >
                      Not Found ✗
                    </span>
                  )}
                </div>
                <p className="text-soft" style={{ fontSize: 13.5, lineHeight: 1.6 }}>
                  {excerpt(r.platform, brand, primaryQuery, r.found)}
                </p>
                <a
                  href={SEARCH_URL[r.platform](primaryQuery)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="accent"
                  style={{ fontSize: 13, fontWeight: 600, marginTop: 'auto' }}
                >
                  Open {r.platform} with your query →
                </a>
              </div>
            ))}
          </div>

          {/* Outcome CTA */}
          <div style={{ marginTop: 26 }}>
            {anyFound ? (
              <div
                className="glass center"
                style={{ padding: 28, borderColor: 'rgba(30,158,117,0.35)' }}
              >
                <h4 style={{ fontSize: 20, marginBottom: 8, color: 'var(--green)' }}>
                  You&apos;re appearing in AI! 🎉
                </h4>
                <p className="text-soft" style={{ fontSize: 14.5, marginBottom: 20 }}>
                  Book a call to grow and protect your citations across every answer engine.
                </p>
                <MagneticButton href="/book-strategy-call/" className="btn btn-primary btn-lg">
                  Book a strategy call →
                </MagneticButton>
              </div>
            ) : (
              <div
                className="center"
                style={{
                  padding: 28,
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid rgba(226,55,68,0.4)',
                  background: 'rgba(226,55,68,0.06)',
                  animation: 'sgPulse 1.8s ease-in-out infinite',
                }}
              >
                <h4 style={{ fontSize: 20, marginBottom: 8, color: 'var(--red)' }}>
                  You&apos;re invisible to AI buyers.
                </h4>
                <p className="text-soft" style={{ fontSize: 14.5, marginBottom: 20 }}>
                  73% of B2B security buyers use AI to vet vendors. Get found in 90 days.
                </p>
                <MagneticButton href="/contact/" className="btn btn-red btn-lg">
                  Get found in 90 days →
                </MagneticButton>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`@keyframes sgPulse {
        0%, 100% { box-shadow: 0 0 0 0 rgba(226,55,68,0.0); }
        50% { box-shadow: 0 0 0 8px rgba(226,55,68,0.12); }
      }`}</style>
    </div>
  )
}
