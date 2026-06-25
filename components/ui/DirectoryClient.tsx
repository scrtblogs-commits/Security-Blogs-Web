'use client'
import { useState, useMemo, useEffect, useRef } from 'react'
import Link from 'next/link'

// ── Types ────────────────────────────────────────────────────────────
type Company = {
  id: number
  name: string
  logo: string
  category: string
  services: string[]
  state: string
  city: string
  size: 'Small' | 'Medium' | 'Large' | 'Enterprise'
  rating: number
  reviews: number
  aiScore: number
  website: string
  email: string
  phone: string
  specialisations: string[]
  serviceAreas: string[]
  description: string
  featured?: boolean
}

// ── Mock Company Data ────────────────────────────────────────────────
const COMPANIES: Company[] = [
  {
    id: 1, name: 'Sentinel Guard Systems', logo: 'SG', category: 'Security Guards',
    services: ['Security Guards', 'Mobile Patrols', 'Event Security'],
    state: 'NSW', city: 'Sydney', size: 'Large', rating: 4.8, reviews: 142, aiScore: 92,
    website: 'sentinelguard.com.au', email: 'info@sentinelguard.com.au', phone: '02 9000 1234',
    specialisations: ['Corporate Security', 'Construction Security', 'Retail Security'],
    serviceAreas: ['Sydney CBD', 'North Shore', 'Western Sydney', 'Parramatta'],
    description: 'Leading provider of professional security services across Greater Sydney since 2005.',
    featured: true,
  },
  {
    id: 2, name: 'Apex Surveillance Co.', logo: 'AS', category: 'CCTV Monitoring',
    services: ['CCTV Monitoring', 'Alarm Monitoring', 'Access Control'],
    state: 'VIC', city: 'Melbourne', size: 'Medium', rating: 4.6, reviews: 98, aiScore: 88,
    website: 'apexsurveillance.com.au', email: 'contact@apexsurveillance.com.au', phone: '03 9000 5678',
    specialisations: ['Remote Monitoring', 'Retail CCTV', 'Body Worn Cameras'],
    serviceAreas: ['Melbourne CBD', 'Southbank', 'St Kilda', 'Richmond'],
    description: 'Advanced surveillance and monitoring solutions for residential and commercial clients.',
    featured: true,
  },
  {
    id: 3, name: 'Fortress Patrol Services', logo: 'FP', category: 'Mobile Patrols',
    services: ['Mobile Patrols', 'Security Guards', 'Alarm Response'],
    state: 'QLD', city: 'Brisbane', size: 'Medium', rating: 4.7, reviews: 76, aiScore: 85,
    website: 'fortresspatrol.com.au', email: 'ops@fortresspatrol.com.au', phone: '07 3000 9012',
    specialisations: ['24/7 Mobile Patrols', 'Alarm Response', 'Construction Security'],
    serviceAreas: ['Brisbane CBD', 'Gold Coast', 'Sunshine Coast', 'Ipswich'],
    description: 'Reliable mobile patrol services protecting Queensland businesses around the clock.',
  },
  {
    id: 4, name: 'Shield Concierge Security', logo: 'SC', category: 'Concierge Security',
    services: ['Concierge Security', 'Corporate Security', 'Access Control'],
    state: 'NSW', city: 'Sydney', size: 'Small', rating: 4.9, reviews: 54, aiScore: 81,
    website: 'shieldconcierge.com.au', email: 'hello@shieldconcierge.com.au', phone: '02 9000 3456',
    specialisations: ['Hotel Security', 'Corporate Concierge', 'Luxury Residential'],
    serviceAreas: ['Sydney CBD', 'Eastern Suburbs', 'Lower North Shore'],
    description: 'Premium concierge security services tailored for corporate and luxury residential properties.',
  },
  {
    id: 5, name: 'HealthGuard Security', logo: 'HG', category: 'Healthcare Security',
    services: ['Healthcare Security', 'Security Guards', 'Mental Health Security'],
    state: 'VIC', city: 'Melbourne', size: 'Large', rating: 4.5, reviews: 203, aiScore: 87,
    website: 'healthguard.com.au', email: 'info@healthguard.com.au', phone: '03 9000 7890',
    specialisations: ['Hospital Security', 'Aged Care Security', 'Mental Health Facilities'],
    serviceAreas: ['Melbourne Metro', 'Geelong', 'Ballarat', 'Bendigo'],
    description: 'Specialist healthcare security provider with trauma-informed guard training.',
    featured: true,
  },
  {
    id: 6, name: 'EventShield Australia', logo: 'EA', category: 'Event Security',
    services: ['Event Security', 'Crowd Control', 'VIP Protection'],
    state: 'NSW', city: 'Sydney', size: 'Medium', rating: 4.6, reviews: 87, aiScore: 79,
    website: 'eventshield.com.au', email: 'events@eventshield.com.au', phone: '02 9000 4567',
    specialisations: ['Concerts & Festivals', 'Corporate Events', 'Sporting Events'],
    serviceAreas: ['Sydney', 'Newcastle', 'Wollongong', 'Central Coast'],
    description: "Australia's event security specialists — from intimate corporate functions to major festivals.",
  },
  {
    id: 7, name: 'BuildSafe Security', logo: 'BS', category: 'Construction Security',
    services: ['Construction Security', 'Mobile Patrols', 'CCTV Monitoring'],
    state: 'QLD', city: 'Gold Coast', size: 'Small', rating: 4.4, reviews: 41, aiScore: 74,
    website: 'buildsafe.com.au', email: 'jobs@buildsafe.com.au', phone: '07 5000 1234',
    specialisations: ['Construction Site Security', 'Equipment Protection', 'After-Hours Patrol'],
    serviceAreas: ['Gold Coast', 'Tweed Heads', 'Byron Bay', 'Murwillumbah'],
    description: 'Protecting construction sites and equipment across South East Queensland.',
  },
  {
    id: 8, name: 'RetailGuard Solutions', logo: 'RG', category: 'Retail Security',
    services: ['Retail Security', 'Loss Prevention', 'CCTV Monitoring'],
    state: 'WA', city: 'Perth', size: 'Medium', rating: 4.7, reviews: 65, aiScore: 82,
    website: 'retailguard.com.au', email: 'perth@retailguard.com.au', phone: '08 9000 5678',
    specialisations: ['Shopping Centre Security', 'Loss Prevention', 'Undercover Security'],
    serviceAreas: ['Perth CBD', 'Fremantle', 'Joondalup', 'Rockingham'],
    description: 'Retail security and loss prevention specialists serving major shopping centres in WA.',
  },
  {
    id: 9, name: 'Alpha Alarm Monitoring', logo: 'AA', category: 'Alarm Monitoring',
    services: ['Alarm Monitoring', 'CCTV Monitoring', 'Alarm Response'],
    state: 'SA', city: 'Adelaide', size: 'Small', rating: 4.8, reviews: 33, aiScore: 76,
    website: 'alphaalarm.com.au', email: 'monitor@alphaalarm.com.au', phone: '08 8000 9012',
    specialisations: ['24/7 Alarm Monitoring', 'Duress Monitoring', 'Medical Alerts'],
    serviceAreas: ['Adelaide Metro', 'Mount Gambier', 'Port Augusta', 'Whyalla'],
    description: 'Grade A1 alarm monitoring centre servicing South Australia and regional areas.',
  },
  {
    id: 10, name: 'Vanguard Corporate Security', logo: 'VC', category: 'Corporate Security',
    services: ['Corporate Security', 'Concierge Security', 'Access Control', 'CCTV Monitoring'],
    state: 'NSW', city: 'Sydney', size: 'Enterprise', rating: 4.9, reviews: 312, aiScore: 95,
    website: 'vanguardcorp.com.au', email: 'corporate@vanguardcorp.com.au', phone: '02 9000 6789',
    specialisations: ['C-Suite Protection', 'Board Meeting Security', 'Data Centre Security'],
    serviceAreas: ['Australia Wide', 'New Zealand'],
    description: 'Enterprise-grade corporate security for ASX-listed companies and government bodies.',
    featured: true,
  },
  {
    id: 11, name: 'Rapid Response Patrols', logo: 'RR', category: 'Mobile Patrols',
    services: ['Mobile Patrols', 'Alarm Response', 'Security Guards'],
    state: 'VIC', city: 'Melbourne', size: 'Small', rating: 4.3, reviews: 28, aiScore: 70,
    website: 'rapidresponse.com.au', email: 'dispatch@rapidresponse.com.au', phone: '03 9000 3456',
    specialisations: ['After-Hours Response', 'Industrial Patrols', 'Vacant Property'],
    serviceAreas: ['Melbourne Metro', 'Mornington Peninsula', 'Dandenong'],
    description: 'Fast response mobile patrol services for commercial and industrial properties.',
  },
  {
    id: 12, name: 'Pacific Coast Security', logo: 'PC', category: 'Security Guards',
    services: ['Security Guards', 'Event Security', 'Concierge Security'],
    state: 'QLD', city: 'Cairns', size: 'Small', rating: 4.6, reviews: 22, aiScore: 71,
    website: 'pacificcoastsecurity.com.au', email: 'info@pacificcoastsecurity.com.au', phone: '07 4000 7890',
    specialisations: ['Tourism Security', 'Hotel Security', 'Resort Security'],
    serviceAreas: ['Cairns', 'Port Douglas', 'Townsville', 'Mackay'],
    description: "Tropical North Queensland's trusted security provider for tourism and hospitality.",
  },
]

const SERVICE_TYPES = [
  'Security Guards', 'Mobile Patrols', 'Alarm Monitoring', 'CCTV Monitoring',
  'Concierge Security', 'Event Security', 'Construction Security', 'Retail Security',
  'Healthcare Security', 'Corporate Security', 'Access Control', 'VIP Protection',
]

const STATES = ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT']
const SIZES = ['Small', 'Medium', 'Large', 'Enterprise']

const PURPOSE_OPTIONS = [
  'Looking for a security provider',
  'Comparing security companies',
  'Research / Market analysis',
  'Partnership opportunity',
  'Other',
]

// Mask company name: show first 3 chars + dashes
function maskName(name: string): string {
  if (name.length <= 3) return name + '***'
  return name.slice(0, 3) + '**************'
}

// ── Star Rating ──────────────────────────────────────────────────────
function Stars({ rating }: { rating: number }) {
  return (
    <span style={{ color: '#f59e0b', fontSize: 13, letterSpacing: 1 }}>
      {'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}
    </span>
  )
}

// ── Blur Placeholder ─────────────────────────────────────────────────
function Locked({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ filter: 'blur(5px)', userSelect: 'none', pointerEvents: 'none' }}>{children}</span>
  )
}

// ── 4-Field Access Modal ─────────────────────────────────────────────
function AccessModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: '', email: '', company: '', purpose: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0',
    borderRadius: 10, fontSize: 14, outline: 'none', boxSizing: 'border-box',
    color: '#0f172a', background: '#fff',
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.company || !form.purpose) {
      setError('Please fill in all fields.')
      return
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      setError('Please enter a valid business email address.')
      return
    }
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/directory-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.ok) {
        if (data.alreadyApproved) {
          localStorage.setItem('sg-dir-verified', 'true')
          localStorage.setItem('sg-dir-email', form.email)
          window.location.reload()
        } else {
          setSent(true)
        }
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 999, background: 'rgba(15,23,42,0.72)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
      onClick={onClose}
    >
      <div
        style={{ background: '#fff', borderRadius: 24, padding: '44px 40px', maxWidth: 500, width: '100%', boxShadow: '0 32px 80px rgba(0,0,0,0.22)', position: 'relative' }}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 20, background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#94a3b8', lineHeight: 1 }}>
          ✕
        </button>

        {sent ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              background: 'linear-gradient(135deg, #10b981, #3b82f6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px', fontSize: 32, color: '#fff',
            }}>
              ✓
            </div>
            <h3 style={{ fontSize: 22, fontWeight: 900, color: '#0f172a', marginBottom: 10 }}>Request submitted!</h3>
            <p style={{ color: '#475569', lineHeight: 1.65, marginBottom: 20 }}>
              Your request has been received. Our team will review it and send an approval
              email to <strong>{form.email}</strong> within 1 business day.
            </p>
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, padding: '14px 18px', fontSize: 13, color: '#166534', fontWeight: 600 }}>
              Once approved, you will receive an email with a link to unlock full access.
            </div>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: 28 }}>
              <span style={{
                display: 'inline-block', fontSize: 11, fontWeight: 800,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: '#3b82f6', marginBottom: 10,
              }}>
                Free access
              </span>
              <h3 style={{ fontSize: 24, fontWeight: 900, color: '#0f172a', marginBottom: 8, lineHeight: 1.2 }}>
                Unlock the full directory
              </h3>
              <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                Request access to direct contact details, phone numbers, websites and AI visibility scores
                for all 200+ verified Australian security companies. Reviewed and approved within 1 business day.
              </p>
            </div>

            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6 }}>Full Name</label>
                <input
                  type="text" required placeholder="Jane Smith" value={form.name}
                  onChange={set('name')} style={inputStyle}
                  onFocus={e => e.target.style.borderColor = '#3b82f6'}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6 }}>Business Email Address</label>
                <input
                  type="email" required placeholder="jane@company.com" value={form.email}
                  onChange={set('email')} style={inputStyle}
                  onFocus={e => e.target.style.borderColor = '#3b82f6'}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6 }}>Company Name</label>
                <input
                  type="text" required placeholder="Acme Corp" value={form.company}
                  onChange={set('company')} style={inputStyle}
                  onFocus={e => e.target.style.borderColor = '#3b82f6'}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6 }}>Purpose of Inquiry</label>
                <select
                  required value={form.purpose} onChange={set('purpose')}
                  style={{ ...inputStyle, cursor: 'pointer', appearance: 'auto' }}
                  onFocus={e => (e.target as HTMLSelectElement).style.borderColor = '#3b82f6'}
                  onBlur={e => (e.target as HTMLSelectElement).style.borderColor = '#e2e8f0'}
                >
                  <option value="">Select a reason...</option>
                  {PURPOSE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>

              {error && (
                <div style={{ fontSize: 13, color: '#dc2626', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '10px 14px' }}>
                  {error}
                </div>
              )}

              <button
                type="submit" disabled={loading}
                style={{
                  width: '100%', padding: '14px', marginTop: 4,
                  background: loading ? '#94a3b8' : 'linear-gradient(135deg, #3b82f6, #6366f1)',
                  color: '#fff', border: 'none', borderRadius: 12,
                  fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'opacity 0.15s',
                }}
              >
                {loading ? 'Submitting request...' : 'Request access →'}
              </button>
            </form>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 16, flexWrap: 'wrap' }}>
              {['No spam', 'Secure', 'Free forever'].map(t => (
                <span key={t} style={{ fontSize: 12, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ color: '#10b981' }}>✓</span> {t}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ── Company Row ───────────────────────────────────────────────────────
function CompanyCard({ company, isVerified, onUnlock }: { company: Company; isVerified: boolean; onUnlock: () => void }) {
  return (
    <div
      style={{
        background: '#fff', borderRadius: 12, border: '1px solid #e8edf3',
        padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 16,
        transition: 'box-shadow 0.15s',
      }}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.07)')}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
    >
      {/* Logo */}
      <div style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg, #3b82f6, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 900, color: '#fff', flexShrink: 0 }}>
        {company.logo}
      </div>

      {/* Name + location */}
      <div style={{ flex: '0 0 220px', minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {isVerified ? company.name : maskName(company.name)}
        </div>
        <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 1 }}>{company.city}, {company.state}</div>
      </div>

      {/* Category */}
      <div style={{ flex: '0 0 160px' }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: '#1e5fe0', background: '#eff6ff', padding: '3px 10px', borderRadius: 20, border: '1px solid #bfdbfe', whiteSpace: 'nowrap' }}>
          {company.category}
        </span>
      </div>

      {/* AI Score */}
      <div style={{ flex: '0 0 120px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ flex: 1, height: 5, background: '#e2e8f0', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${company.aiScore}%`, background: 'linear-gradient(90deg, #1e5fe0, #6366f1)', borderRadius: 3 }} />
        </div>
        <span style={{ fontSize: 12, fontWeight: 700, color: '#1e5fe0', flexShrink: 0 }}>{company.aiScore}</span>
      </div>

      {/* Rating — blurred for locked */}
      <div style={{ flex: '0 0 100px', display: 'flex', alignItems: 'center', gap: 6 }}>
        {isVerified ? (
          <>
            <Stars rating={company.rating} />
            <span style={{ fontSize: 12, color: '#64748b' }}>({company.reviews})</span>
          </>
        ) : (
          <span style={{ fontSize: 12, color: '#64748b' }}>
            <Locked><Stars rating={company.rating} /> ({company.reviews})</Locked>
          </span>
        )}
      </div>

      {/* Contact / lock — push to right */}
      <div style={{ marginLeft: 'auto', flexShrink: 0 }}>
        {isVerified ? (
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <a href={`https://${company.website}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: '#3b82f6', textDecoration: 'none', fontWeight: 600 }}>
              🌐 Website
            </a>
            <span style={{ fontSize: 12, color: '#475569' }}>📞 {company.phone}</span>
          </div>
        ) : (
          <button
            onClick={onUnlock}
            style={{ fontSize: 12, color: '#3b82f6', fontWeight: 700, background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 8, padding: '6px 14px', cursor: 'pointer', whiteSpace: 'nowrap' }}
          >
            🔒 Unlock
          </button>
        )}
      </div>
    </div>
  )
}

// ── Main Directory Client ─────────────────────────────────────────────
export default function DirectoryClient() {
  const [search, setSearch] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [filterService, setFilterService] = useState('')
  const [filterState, setFilterState] = useState('')
  const [filterSize, setFilterSize] = useState('')
  const [filterRating, setFilterRating] = useState('')
  const [isVerified, setIsVerified] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setIsVerified(localStorage.getItem('sg-dir-verified') === 'true')
  }, [])

  // Autocomplete suggestions
  useEffect(() => {
    if (!search.trim()) { setSuggestions([]); return }
    const q = search.toLowerCase()
    const matches = SERVICE_TYPES.filter(s => s.toLowerCase().includes(q))
    const nameMatches = COMPANIES.filter(c => c.name.toLowerCase().includes(q)).map(c => c.name)
    setSuggestions([...new Set([...matches, ...nameMatches])].slice(0, 6))
  }, [search])

  const filtered = useMemo(() => {
    return COMPANIES.filter(c => {
      const q = search.toLowerCase()
      const matchSearch = !q ||
        c.name.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.services.some(s => s.toLowerCase().includes(q)) ||
        c.specialisations.some(s => s.toLowerCase().includes(q)) ||
        c.city.toLowerCase().includes(q)
      const matchService = !filterService || c.services.includes(filterService)
      const matchState = !filterState || c.state === filterState
      const matchSize = !filterSize || c.size === filterSize
      const matchRating = !filterRating || c.rating >= parseFloat(filterRating)
      return matchSearch && matchService && matchState && matchSize && matchRating
    }).sort((a, b) => b.aiScore - a.aiScore)
  }, [search, filterService, filterState, filterSize, filterRating])

  const activeFilterCount = [filterService, filterState, filterSize, filterRating].filter(Boolean).length

  return (
    <>
      {showModal && <AccessModal onClose={() => setShowModal(false)} />}

      <div style={{ background: '#f8f9fc', minHeight: '60vh' }}>
        <div className="container" style={{ paddingTop: 48, paddingBottom: 80 }}>

          {/* Status banner */}
          {isVerified ? (
            <div style={{ background: 'linear-gradient(135deg, #ecfdf5, #eff6ff)', border: '1px solid #bbf7d0', borderRadius: 14, padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
              <span style={{ fontSize: 20 }}>✅</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#166534' }}>
                Full directory access — contact details, phone numbers and profiles are unlocked.
              </span>
            </div>
          ) : (
            <div style={{ background: 'linear-gradient(135deg, #eff6ff, #eef2ff)', border: '1px solid #bfdbfe', borderRadius: 14, padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 20 }}>🔒</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#1e40af' }}>
                  Request access to unlock full company profiles, contact details and ratings — approved within 1 business day.
                </span>
              </div>
              <button
                onClick={() => setShowModal(true)}
                style={{ padding: '9px 20px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}
              >
                Get Full Access — Free
              </button>
            </div>
          )}

          {/* Search bar */}
          <div style={{ position: 'relative', marginBottom: 16 }}>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)', fontSize: 18, pointerEvents: 'none' }}>🔍</span>
              <input
                ref={searchRef}
                type="text"
                placeholder="Search by company name, service type, location..."
                value={search}
                onChange={e => { setSearch(e.target.value); setShowSuggestions(true) }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                style={{ width: '100%', padding: '18px 18px 18px 52px', fontSize: 16, border: '2px solid #e2e8f0', borderRadius: 16, background: '#fff', outline: 'none', boxSizing: 'border-box', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}
                onFocusCapture={e => (e.target as HTMLInputElement).style.borderColor = '#3b82f6'}
                onBlurCapture={e => (e.target as HTMLInputElement).style.borderColor = '#e2e8f0'}
              />
              {search && (
                <button onClick={() => setSearch('')} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: '#94a3b8' }}>✕</button>
              )}
            </div>

            {/* Autocomplete */}
            {showSuggestions && suggestions.length > 0 && (
              <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, boxShadow: '0 8px 32px rgba(0,0,0,0.1)', zIndex: 50, overflow: 'hidden', marginTop: 4 }}>
                {suggestions.map(s => (
                  <button key={s} onMouseDown={() => { setSearch(s); setShowSuggestions(false) }}
                    style={{ display: 'block', width: '100%', padding: '12px 18px', textAlign: 'left', background: 'none', border: 'none', fontSize: 14, color: '#0f172a', cursor: 'pointer', borderBottom: '1px solid #f8f9fc' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#f8f9fc')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'none')}>
                    🔍 {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Filter toggle + quick chips */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
            <button onClick={() => setShowFilters(!showFilters)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 16px', background: showFilters ? '#3b82f6' : '#fff', color: showFilters ? '#fff' : '#475569', border: '1px solid #e2e8f0', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
              ⚙️ Filters {activeFilterCount > 0 && <span style={{ background: showFilters ? 'rgba(255,255,255,0.3)' : '#3b82f6', color: '#fff', borderRadius: '50%', width: 18, height: 18, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>{activeFilterCount}</span>}
            </button>
            {SERVICE_TYPES.slice(0, 5).map(s => (
              <button key={s} onClick={() => setFilterService(filterService === s ? '' : s)}
                style={{ padding: '8px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: 'pointer', border: '1px solid', borderColor: filterService === s ? '#3b82f6' : '#e2e8f0', background: filterService === s ? '#eff6ff' : '#fff', color: filterService === s ? '#3b82f6' : '#64748b' }}>
                {s}
              </button>
            ))}
          </div>

          {/* Expanded filters */}
          {showFilters && (
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: '20px 24px', marginBottom: 20, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 8 }}>Service Type</label>
                <select value={filterService} onChange={e => setFilterService(e.target.value)} style={{ width: '100%', padding: '9px 12px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 13, color: '#0f172a', background: '#fff', cursor: 'pointer' }}>
                  <option value="">All Services</option>
                  {SERVICE_TYPES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 8 }}>State</label>
                <select value={filterState} onChange={e => setFilterState(e.target.value)} style={{ width: '100%', padding: '9px 12px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 13, color: '#0f172a', background: '#fff', cursor: 'pointer' }}>
                  <option value="">All States</option>
                  {STATES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 8 }}>Company Size</label>
                <select value={filterSize} onChange={e => setFilterSize(e.target.value)} style={{ width: '100%', padding: '9px 12px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 13, color: '#0f172a', background: '#fff', cursor: 'pointer' }}>
                  <option value="">All Sizes</option>
                  {SIZES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 8 }}>Min Rating</label>
                <select value={filterRating} onChange={e => setFilterRating(e.target.value)} style={{ width: '100%', padding: '9px 12px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 13, color: '#0f172a', background: '#fff', cursor: 'pointer' }}>
                  <option value="">Any Rating</option>
                  <option value="4.5">4.5+ ⭐</option>
                  <option value="4.0">4.0+ ⭐</option>
                  <option value="3.5">3.5+ ⭐</option>
                </select>
              </div>
              {activeFilterCount > 0 && (
                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <button onClick={() => { setFilterService(''); setFilterState(''); setFilterSize(''); setFilterRating('') }}
                    style={{ padding: '9px 16px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Results count */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <p style={{ fontSize: 14, color: '#64748b', fontWeight: 500 }}>
              Showing <strong style={{ color: '#0f172a' }}>{filtered.length}</strong> of {COMPANIES.length} companies
              {search && <> for &ldquo;<strong style={{ color: '#3b82f6' }}>{search}</strong>&rdquo;</>}
            </p>
            {!isVerified && (
              <button onClick={() => setShowModal(true)} style={{ fontSize: 13, color: '#3b82f6', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
                Unlock full access →
              </button>
            )}
          </div>

          {/* Company list */}
          {filtered.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid #e8edf3', borderRadius: 14, overflow: 'hidden' }}>
              {/* Header row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '10px 20px', background: '#f8f9fc', borderBottom: '1px solid #e8edf3' }}>
                <div style={{ width: 40, flexShrink: 0 }} />
                <div style={{ flex: '0 0 220px', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Company</div>
                <div style={{ flex: '0 0 160px', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Category</div>
                <div style={{ flex: '0 0 120px', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>AI Score</div>
                <div style={{ flex: '0 0 100px', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Rating</div>
                <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Contact</div>
              </div>
              {filtered.map((company, i) => (
                <div key={company.id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                  <CompanyCard company={company} isVerified={isVerified} onUnlock={() => setShowModal(true)} />
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '80px 20px', color: '#94a3b8' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#475569', marginBottom: 8 }}>No companies found</h3>
              <p>Try adjusting your search or filters.</p>
              <button onClick={() => { setSearch(''); setFilterService(''); setFilterState(''); setFilterSize(''); setFilterRating('') }}
                style={{ marginTop: 16, padding: '10px 20px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                Clear search
              </button>
            </div>
          )}

          {/* Bottom unlock CTA for non-verified */}
          {!isVerified && filtered.length > 0 && (
            <div style={{ marginTop: 48, background: 'linear-gradient(135deg, #eff6ff, #eef2ff)', borderRadius: 24, padding: '40px 36px', textAlign: 'center', border: '1px solid #bfdbfe' }}>
              <h3 style={{ fontSize: 26, fontWeight: 900, color: '#0f172a', marginBottom: 12 }}>
                See full profiles for all {COMPANIES.length} companies
              </h3>
              <p style={{ color: '#475569', maxWidth: 480, margin: '0 auto 24px', lineHeight: 1.6 }}>
                Submit a quick access request. Our team reviews every request and approves genuine buyers,
                researchers and industry professionals within 1 business day.
              </p>
              <button
                onClick={() => setShowModal(true)}
                style={{ padding: '16px 36px', background: 'linear-gradient(135deg, #3b82f6, #6366f1)', color: '#fff', border: 'none', borderRadius: 14, fontSize: 16, fontWeight: 700, cursor: 'pointer' }}
              >
                🔓 Request Full Directory Access
              </button>
              <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 12 }}>Takes under 60 seconds. Approved within 1 business day.</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
