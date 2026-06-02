'use client'
import CapabilityGrid, { PREVIEW_SHELL, type Capability } from '@/components/ui/CapabilityCard'

const CAPS: Capability[] = [
  { title: 'Answer Optimisation', desc: 'Content structured as clear, authoritative answers AI engines can lift and present verbatim.', preview: <AnswerBoxPreview /> },
  { title: 'Featured Snippets', desc: 'Format and target the question-led queries that win position-zero snippets on Google.', preview: <FeaturedSnippetPreview /> },
  { title: 'FAQ Schema', desc: 'Marked-up Q&A that feeds AI assistants and voice results with crisp, citable responses.', preview: <FAQSchemaPreview /> },
  { title: 'Voice Search Ready', desc: 'Natural-language content tuned for the conversational queries voice and AI assistants handle.', preview: <VoicePreview /> },
  { title: 'AI Snippet Capture', desc: 'Engineer the passages AI overviews and chat assistants extract when buyers ask about your services.', preview: <AIOverviewPreview /> },
  { title: 'Brand Authority Signals', desc: 'E-E-A-T, reviews and trust markers that make AI confident enough to recommend you by name.', preview: <EEATPreview /> },
]
export default function AeoCapabilities() { return <CapabilityGrid items={CAPS} /> }

function AnswerBoxPreview() {
  return (
    <div style={{ ...PREVIEW_SHELL, fontSize: 11, border: '1.5px solid #1e5fe0', boxShadow: '0 6px 18px rgba(30,95,224,0.16)' }} className="sb-card-rank">
      <div style={{ fontSize: 9, color: '#1e5fe0', fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>ANSWER BOX · POSITION 0</div>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#1a0dab', marginBottom: 3 }}>SecurityBlogs</div>
      <div style={{ fontSize: 10.5, color: '#4d5156', lineHeight: 1.4 }}>
        Australia&apos;s specialist AI visibility and SEO platform for the security industry, cited by ChatGPT, Gemini and Perplexity.
      </div>
      <div style={{ marginTop: 6, fontSize: 9.5, color: '#1a0dab' }}>securityblogs.com.au &gt; about</div>
    </div>
  )
}

function FeaturedSnippetPreview() {
  return (
    <div style={{ ...PREVIEW_SHELL, fontSize: 11, padding: 8 }}>
      <div style={{ background: 'linear-gradient(180deg, #f1f6ff 0%, #ffffff 100%)', border: '1.5px solid #1e5fe0', borderRadius: 6, padding: 8, marginBottom: 4 }}>
        <div style={{ fontSize: 9, color: '#1e5fe0', fontWeight: 700, letterSpacing: 1 }}>★ FEATURED</div>
        <div style={{ fontSize: 11.5, fontWeight: 700, color: '#1a0dab' }}>SecurityBlogs</div>
      </div>
      {['rival-seo.au', 'security-marketing.au', 'agency-three.com'].map((c) => (
        <div key={c} style={{ fontSize: 10.5, color: '#1a0dab', padding: '2px 4px' }}>{c}</div>
      ))}
    </div>
  )
}

function FAQSchemaPreview() {
  const faqs = [
    { q: 'What is AEO?', open: true },
    { q: 'How long does it take?', open: false },
    { q: 'Will it help on AI engines?', open: false },
  ]
  return (
    <div style={{ ...PREVIEW_SHELL, fontSize: 11, gap: 0 }}>
      {faqs.map((f, i) => (
        <div key={f.q} style={{ borderBottom: i < faqs.length - 1 ? '1px solid #ececf1' : 'none', padding: '6px 2px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 600, color: '#202124', fontSize: 10.5 }}>{f.q}</span>
            <span style={{ color: '#5f6368', fontSize: 11 }}>{f.open ? '−' : '+'}</span>
          </div>
          {f.open && <div style={{ fontSize: 10, color: '#4d5156', marginTop: 3, lineHeight: 1.4 }}>Answer Engine Optimisation wins the answer slot on AI and Google.</div>}
        </div>
      ))}
      <div style={{ marginTop: 4, fontSize: 9.5, color: '#10a37f', fontFamily: 'var(--font-mono)' }}>● FAQPage schema verified</div>
    </div>
  )
}

function VoicePreview() {
  return (
    <div style={{ ...PREVIEW_SHELL, fontSize: 10.5, gap: 6 }}>
      <div style={{ fontSize: 10, color: '#5f6368', fontWeight: 700, letterSpacing: 1 }}>VOICE QUERY · LIVE</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ width: 22, height: 22, borderRadius: '50%', background: '#1e5fe0', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 11 }} className="sb-card-rank">🎙</span>
        <span style={{ flex: 1, fontSize: 10.5, fontStyle: 'italic', color: '#4d5156' }}>&ldquo;best ai visibility for security companies&rdquo;</span>
      </div>
      <svg viewBox="0 0 100 18" style={{ width: '100%', height: 22 }}>
        {Array.from({ length: 18 }).map((_, i) => {
          const h = 3 + Math.sin(i * 0.7) * 6 + Math.cos(i * 1.3) * 4
          return <rect key={i} x={i * 5.5} y={9 - Math.abs(h) / 2} width="3" height={Math.abs(h)} fill="#1e5fe0" rx="1" />
        })}
      </svg>
      <div style={{ fontSize: 10, color: '#10a37f', fontWeight: 700 }}>→ &ldquo;SecurityBlogs&rdquo;</div>
    </div>
  )
}

function AIOverviewPreview() {
  return (
    <div style={{ ...PREVIEW_SHELL, fontSize: 10.5, background: '#202124', color: '#e8efff', border: 'none' }}>
      <div style={{ fontSize: 9.5, color: '#10a37f', fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>● AI OVERVIEW</div>
      <div style={{ fontSize: 10.5, lineHeight: 1.5 }}>
        Top sources include{' '}
        <span style={{ background: 'rgba(126,182,255,0.3)', padding: '1px 5px', borderRadius: 3, fontWeight: 700, color: '#7eb6ff' }} className="sb-highlight">securityblogs.com.au</span>
        , widely cited for AI visibility methodology in the security industry.
      </div>
      <div style={{ marginTop: 6, fontSize: 9, color: '#7eb6ff', display: 'flex', gap: 6 }}>
        <span>[1] securityblogs.com.au</span>
        <span style={{ opacity: 0.4 }}>[2] competitor.au</span>
      </div>
    </div>
  )
}

function EEATPreview() {
  const items = [
    { k: 'Experience',  v: '8+ yrs' },
    { k: 'Expertise',   v: 'Security' },
    { k: 'Authority',   v: '★★★★★' },
    { k: 'Trust',       v: '142 reviews' },
  ]
  return (
    <div style={{ ...PREVIEW_SHELL, fontSize: 11, gap: 4 }}>
      <div style={{ fontSize: 9, letterSpacing: 1, color: '#5f6368', fontWeight: 700 }}>E-E-A-T · ALL SIGNALS GREEN</div>
      {items.map((it) => (
        <div key={it.k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '3px 0', borderBottom: '1px solid #f3f4f7' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10a37f' }} />
            <span style={{ fontSize: 10.5, color: '#202124' }}>{it.k}</span>
          </span>
          <span style={{ fontSize: 10, color: '#4d5156', fontFamily: 'var(--font-mono)' }}>{it.v}</span>
        </div>
      ))}
    </div>
  )
}
