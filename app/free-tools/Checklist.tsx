'use client'
import { useState } from 'react'
import GaugeRing, { tierFor } from '@/components/ui/GaugeRing'
import MagneticButton from '@/components/ui/MagneticButton'

const GROUPS: { title: string; icon: string; items: string[] }[] = [
  {
    title: 'Technical SEO',
    icon: '⚙️',
    items: [
      'Site is mobile-responsive and passes Core Web Vitals',
      'HTTPS enabled with a valid SSL certificate',
      'XML sitemap submitted to Google & Bing',
      'Clean, crawlable URL structure with no broken links',
      'Page speed under 2.5s Largest Contentful Paint',
    ],
  },
  {
    title: 'Content',
    icon: '📝',
    items: [
      '10+ long-form, in-depth guides published',
      'Service pages target high-intent buyer keywords',
      'Content answers real buyer questions (FAQ-style)',
      'Published new content in the last 30 days',
      'Each page has a clear, single search intent',
    ],
  },
  {
    title: 'Authority',
    icon: '🏆',
    items: [
      'Listed on 3+ reputable industry directories',
      'Earned backlinks from security publications',
      'Consistent NAP (name, address, phone) everywhere',
      'Genuine client reviews on Google & third parties',
      'Wikipedia or Wikidata entry for your brand',
    ],
  },
  {
    title: 'AI-Specific',
    icon: '🤖',
    items: [
      'Structured schema markup (Organization, FAQ, Service)',
      'Entity-rich “About” and author bios',
      'Content formatted for AI extraction (lists, tables, Q&A)',
      'Brand mentioned by ChatGPT or Perplexity',
      'Monitoring AI citations and branded answers',
    ],
  },
]

const TOTAL = GROUPS.reduce((n, g) => n + g.items.length, 0) // 20

const recoByTier: Record<string, string[]> = {
  Invisible: [
    'Start with technical foundations: schema markup, sitemaps and Core Web Vitals.',
    'Get listed across the top security directories to seed authority signals.',
    'Publish your first long-form, citable guides answering buyer questions.',
  ],
  Emerging: [
    'Build entity authority — claim Wikidata and align NAP signals everywhere.',
    'Expand to 10+ in-depth guides AI engines can quote directly.',
    'Establish a consistent weekly publishing cadence.',
  ],
  Visible: [
    'Format content for AI extraction with FAQ, how-to and comparison tables.',
    'Earn authoritative backlinks from recognised security publications.',
    'Begin monitoring and defending your branded AI mentions.',
  ],
  Authority: [
    'Protect and scale your AI citations across every answer engine.',
    'Dominate adjacent keyword clusters before competitors do.',
    'Expand into new markets with localised entities and content.',
  ],
}

export default function Checklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const count = Object.values(checked).filter(Boolean).length
  const score = Math.round((count / TOTAL) * 100)
  const tier = tierFor(score)

  const toggle = (key: string) =>
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }))

  return (
    <div className="grid-2" style={{ gap: 36, alignItems: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {GROUPS.map((g) => (
          <div key={g.title} className="card">
            <div className="flex items-center gap-2" style={{ marginBottom: 14 }}>
              <span style={{ fontSize: 20 }}>{g.icon}</span>
              <h4 style={{ fontSize: 16 }}>{g.title}</h4>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {g.items.map((item, i) => {
                const key = `${g.title}-${i}`
                const on = !!checked[key]
                return (
                  <label
                    key={key}
                    className="flex items-start gap-2"
                    style={{ fontSize: 14, cursor: 'pointer', userSelect: 'none' }}
                  >
                    <span
                      onClick={() => toggle(key)}
                      style={{
                        flex: '0 0 auto',
                        width: 20,
                        height: 20,
                        borderRadius: 6,
                        display: 'grid',
                        placeItems: 'center',
                        fontSize: 12,
                        marginTop: 1,
                        background: on ? 'var(--blue)' : 'transparent',
                        color: '#fff',
                        border: `1px solid ${on ? 'var(--blue)' : 'var(--line)'}`,
                        transition: 'all .15s',
                      }}
                      role="checkbox"
                      aria-checked={on}
                    >
                      {on ? '✓' : ''}
                    </span>
                    <span className={on ? '' : 'text-soft'} style={{ textDecoration: on ? 'none' : 'none' }}>
                      {item}
                    </span>
                  </label>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div
        className="glass center"
        style={{ padding: 34, position: 'sticky', top: 'calc(var(--nav-h, 72px) + 16px)' }}
      >
        <span className="eyebrow">Your readiness score</span>
        <div className="flex justify-center" style={{ margin: '18px 0' }}>
          <GaugeRing score={score} size={220} />
        </div>
        <p className="text-soft" style={{ fontSize: 14, marginBottom: 18 }}>
          You&apos;ve completed <strong style={{ color: tier.color }}>{count}/{TOTAL}</strong> — you&apos;re in the{' '}
          <strong style={{ color: tier.color }}>{tier.label}</strong> tier.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'left', marginBottom: 24 }}>
          {recoByTier[tier.label].map((r, i) => (
            <div key={i} className="card flex items-start gap-2" style={{ padding: 13 }}>
              <span style={{ color: tier.color, fontSize: 16 }}>→</span>
              <span style={{ fontSize: 13.5 }}>{r}</span>
            </div>
          ))}
        </div>
        <MagneticButton href="/contact/" className="btn btn-primary btn-lg">
          Get a full audit →
        </MagneticButton>
      </div>
    </div>
  )
}
