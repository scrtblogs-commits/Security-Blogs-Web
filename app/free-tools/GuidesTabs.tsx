'use client'
import Glyph from '@/components/ui/Glyph'
import { useState } from 'react'

type Step = { icon: string; title: string; desc: string }

const GOOGLE: Step[] = [
  { icon: '🔑', title: 'Keyword research', desc: 'Map every high-intent security query your buyers type into Google.' },
  { icon: '🏗️', title: 'Fix technical SEO', desc: 'Crawlability, sitemaps, HTTPS and a clean site architecture.' },
  { icon: '⚡', title: 'Pass Core Web Vitals', desc: 'Optimise LCP, INP and CLS for fast, stable pages.' },
  { icon: '📄', title: 'Optimise on-page', desc: 'Titles, headings, internal links and intent-matched content.' },
  { icon: '🧩', title: 'Add schema markup', desc: 'Organization, Service, FAQ and Review structured data.' },
  { icon: '📚', title: 'Publish pillar content', desc: 'Deep, authoritative guides that answer buyer questions.' },
  { icon: '📍', title: 'Win local SEO', desc: 'Google Business Profile, NAP consistency and local citations.' },
  { icon: '🔗', title: 'Build backlinks', desc: 'Earn links from security publications and trusted directories.' },
  { icon: '📈', title: 'Track in Search Console', desc: 'Monitor impressions, clicks, rankings and index coverage.' },
  { icon: '🔁', title: 'Iterate monthly', desc: 'Refresh content, prune underperformers and double down on winners.' },
]

const BING: Step[] = [
  { icon: '🧭', title: 'Submit to Bing Webmaster', desc: 'Verify your site and submit your sitemap to Bing.' },
  { icon: '🔑', title: 'Target exact-match keywords', desc: 'Bing rewards precise keyword usage in titles and headings.' },
  { icon: '🏷️', title: 'Optimise meta tags', desc: 'Bing weighs meta keywords and descriptions more heavily than Google.' },
  { icon: '🧩', title: 'Add structured data', desc: 'Schema helps Bing and Copilot understand and cite your pages.' },
  { icon: '🔗', title: 'Earn quality backlinks', desc: 'Authoritative, relevant links remain a strong Bing ranking factor.' },
  { icon: '📱', title: 'Ensure mobile-friendliness', desc: 'Bing prioritises responsive, mobile-ready pages.' },
  { icon: '🌐', title: 'Strengthen social signals', desc: 'Bing factors in social sharing and brand mentions.' },
  { icon: '🖼️', title: 'Optimise images', desc: 'Descriptive alt text and filenames boost Bing image discovery.' },
  { icon: '🤖', title: 'Format for Copilot', desc: 'Clear lists, tables and Q&A make answers easy to extract.' },
  { icon: '📊', title: 'Monitor Bing reports', desc: 'Use Bing Webmaster Tools to track rankings and crawl health.' },
]

export default function GuidesTabs() {
  const [tab, setTab] = useState<'google' | 'bing'>('google')
  const steps = tab === 'google' ? GOOGLE : BING
  const accent = tab === 'google' ? 'var(--blue)' : 'var(--violet)'

  return (
    <div>
      <div className="flex gap-2 center" style={{ justifyContent: 'center', marginBottom: 28 }}>
        <button
          className={`pill ${tab === 'google' ? 'active' : ''}`}
          onClick={() => setTab('google')}
          aria-pressed={tab === 'google'}
        >
          🔍 Google SEO Guide
        </button>
        <button
          className={`pill ${tab === 'bing' ? 'active' : ''}`}
          onClick={() => setTab('bing')}
          aria-pressed={tab === 'bing'}
        >
          🔷 Bing SEO Guide
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
        {steps.map((s, i) => (
          <div key={`${tab}-${i}`} className="card" style={{ display: 'flex', gap: 14 }}>
            <div
              style={{
                flex: '0 0 auto',
                width: 44,
                height: 44,
                borderRadius: 12,
                display: 'grid',
                placeItems: 'center',
                fontWeight: 800,
                fontFamily: 'var(--font-display)',
                background: `color-mix(in srgb, ${accent} 12%, transparent)`,
                color: accent,
                border: `1px solid color-mix(in srgb, ${accent} 28%, transparent)`,
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </div>
            <div>
              <h4 style={{ fontSize: 15.5, marginBottom: 4 }}>
                <span style={{ marginRight: 6 }}><Glyph icon={s.icon} size={22} /></span>
                {s.title}
              </h4>
              <p className="text-soft" style={{ fontSize: 13.5 }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
