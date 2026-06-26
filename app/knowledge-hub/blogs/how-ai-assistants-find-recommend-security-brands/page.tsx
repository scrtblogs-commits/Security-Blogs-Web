import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import BlogReadingProgress from '@/components/ui/BlogReadingProgress'
import { posts } from '@/lib/posts'

const SLUG = 'how-ai-assistants-find-recommend-security-brands'

export const metadata: Metadata = {
  title: 'How AI Assistants Find & Recommend Security Brands | SecurityBlogs',
  description:
    'A practical guide to AI visibility for security companies — how ChatGPT, Gemini and Perplexity discover, trust and recommend brands, and the signals you need to build.',
  alternates: { canonical: `/knowledge-hub/blogs/${SLUG}/` },
  openGraph: {
    title: 'How AI Assistants Find & Recommend Security Brands | SecurityBlogs',
    description:
      'A practical guide to AI visibility for security companies — how ChatGPT, Gemini and Perplexity discover, trust and recommend brands, and the signals you need to build.',
    url: `/knowledge-hub/blogs/${SLUG}/`,
    siteName: 'SecurityBlogs',
    type: 'article',
    publishedTime: '2026-06-20',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How AI Assistants Find & Recommend Security Brands',
  description:
    'A practical guide to AI visibility for security companies — how ChatGPT, Gemini and Perplexity discover, trust and recommend brands, and the signals you need to build.',
  datePublished: '2026-06-20',
  dateModified: '2026-06-20',
  image: 'https://securityblogs.com.au/og-image.png',
  author: { '@type': 'Person', name: 'SecurityBlogs Team', url: 'https://securityblogs.com.au/about-us/' },
  publisher: { '@type': 'Organization', name: 'SecurityBlogs' },
  mainEntityOfPage: `https://securityblogs.com.au/knowledge-hub/blogs/${SLUG}/`,
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I get ChatGPT to recommend my security company?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ChatGPT recommends brands it can identify as real, trustworthy entities. The most reliable path is to build consistent entity signals: the same business name, description and contact details across your website, Google Business Profile, LinkedIn and reputable directories. Publish genuinely useful content that answers the questions buyers ask, add Organization schema to your site, and earn citations from industry sources. This builds the corroboration AI engines need to confidently name you.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does having a website help AI engines recommend me?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, but the website alone is not enough. AI engines blend their training data with live web retrieval. Your site needs to clearly identify your business (schema markup, consistent NAP), answer the questions buyers ask (citable content), and be corroborated by mentions elsewhere on the web. A website that Google can crawl and index is the foundation, but entity authority across multiple sources is what makes an AI confident enough to recommend you by name.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is entity SEO and why does it matter for security companies?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Entity SEO is the practice of defining your brand as a clear, machine-readable entity — a distinct "thing" that AI engines and knowledge graphs can identify, describe and connect to other things. For security companies, this means consistent business name, description and attributes across every online presence. When an AI engine has a strong entity model of your brand, it can recommend you with confidence. Without it, you remain an anonymous collection of web pages, indistinguishable from competitors.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to build AI visibility?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AI visibility builds more slowly than paid search but faster than domain authority. Basic entity recognition — where an AI can correctly identify your brand — can improve within 4–8 weeks of consistent signal work. Being actively recommended for competitive queries typically takes 3–6 months of consistent entity building, content publishing and citation earning. The timeline is shorter for brands in less-crowded niches or specific geographic markets.',
      },
    },
  ],
}

export default function AiVisibilityPage() {
  const related = posts
    .filter((p) => p.slug !== SLUG && (p.category === 'AIO/AEO' || p.category === 'GEO'))
    .slice(0, 3)

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema} />
      <BlogReadingProgress />

      <style>{`
        .ai-hero-grid { display: grid; grid-template-columns: 1fr minmax(0, 380px); gap: 56px; align-items: center; }
        .ai-article-grid { display: grid; grid-template-columns: minmax(0, 1fr) 300px; gap: 56px; align-items: start; }
        .ai-3col { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .ai-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .ai-signal-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 14px; }
        .ai-sidebar { display: flex; flex-direction: column; gap: 18px; position: sticky; top: 96px; }
        .ai-toc-link { display: block; font-size: 13.5px; padding: 7px 10px; border-radius: 8px; color: var(--text-dim); border-left: 2px solid transparent; line-height: 1.4; transition: all 0.15s ease; text-decoration: none; }
        .ai-toc-link:hover { color: var(--blue); background: rgba(30,95,224,0.07); border-left-color: var(--blue); }
        details summary::-webkit-details-marker { display: none; }
        details[open] summary .ai-faq-icon { transform: rotate(45deg); }
        .ai-faq-icon { transition: transform 0.2s ease; display: inline-block; }
        @media (max-width: 1024px) {
          .ai-hero-grid { grid-template-columns: 1fr; }
          .ai-hero-card { display: none !important; }
        }
        @media (max-width: 900px) {
          .ai-article-grid { grid-template-columns: 1fr; }
          .ai-sidebar { position: static; display: none; }
          .ai-3col { grid-template-columns: 1fr; }
          .ai-2col { grid-template-columns: 1fr; }
        }
      `}</style>

      <article>
        {/* ── Hero ── */}
        <div style={{
          background: 'linear-gradient(135deg, #060f1f 0%, #0d1e3d 55%, #071428 100%)',
          padding: 'calc(var(--nav-h) + 60px) 0 0',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(30,95,224,0.16) 1px, transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '-20%', left: '30%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,57,224,0.14) 0%, transparent 65%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '0', right: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(30,95,224,0.1) 0%, transparent 65%)', pointerEvents: 'none' }} />

          <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 24px 64px', position: 'relative', zIndex: 1 }}>
            <div className="ai-hero-grid">
              <div>
                <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'rgba(255,255,255,0.38)', marginBottom: 26, flexWrap: 'wrap' }}>
                  <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
                  <span>/</span>
                  <Link href="/knowledge-hub/" style={{ color: 'inherit', textDecoration: 'none' }}>Knowledge Hub</Link>
                  <span>/</span>
                  <Link href="/knowledge-hub/blogs/" style={{ color: 'inherit', textDecoration: 'none' }}>Blog</Link>
                  <span>/</span>
                  <span style={{ color: 'rgba(255,255,255,0.65)' }}>AI Visibility Guide</span>
                </nav>

                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 26 }}>
                  <span style={{ background: 'rgba(99,57,224,0.22)', color: '#c4b5fd', border: '1px solid rgba(99,57,224,0.35)', borderRadius: 999, padding: '4px 14px', fontSize: 12, fontWeight: 700, letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>AIO / AEO</span>
                  <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13 }}>20 June 2026</span>
                  <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
                  <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13 }}>10 min read</span>
                  <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
                  <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13 }}>SecurityBlogs Team</span>
                </div>

                <h1 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(32px, 4.5vw, 54px)',
                  fontWeight: 800,
                  color: '#ffffff',
                  lineHeight: 1.07,
                  letterSpacing: '-0.025em',
                  marginBottom: 22,
                  maxWidth: 860,
                }}>
                  How AI Assistants Find{' '}
                  <span style={{ color: '#c4b5fd' }}>& Recommend</span>{' '}
                  Security Brands
                </h1>

                <p style={{ fontSize: 'clamp(16px, 1.8vw, 19px)', color: 'rgba(255,255,255,0.62)', lineHeight: 1.68, maxWidth: 720, marginBottom: 34 }}>
                  ChatGPT, Gemini and Perplexity are now shortlisting vendors for security buyers. Here is exactly how AI engines discover, evaluate and recommend brands — and the signals your security company needs to build.
                </p>

                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <Link href="/contact/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 22px', background: 'var(--blue)', borderRadius: 12, fontSize: 14.5, color: '#fff', fontWeight: 600, fontFamily: 'var(--font-display)', textDecoration: 'none' }}>
                    Get a free AI audit →
                  </Link>
                  <Link href="/knowledge-hub/blogs/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '12px 18px', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 12, fontSize: 14, color: 'rgba(255,255,255,0.55)', background: 'rgba(255,255,255,0.05)', textDecoration: 'none' }}>
                    ← All articles
                  </Link>
                </div>
              </div>

              {/* Right: AI platforms card */}
              <div className="ai-hero-card" style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 20,
                padding: 28,
                backdropFilter: 'blur(16px)',
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 16 }}>
                  AI Engines Shortlisting Security Brands
                </div>
                {[
                  { name: 'ChatGPT', note: 'Blends training data + live Bing retrieval' },
                  { name: 'Perplexity', note: 'Real-time web search with citations' },
                  { name: 'Gemini', note: 'Google index + Knowledge Graph signals' },
                  { name: 'Bing Copilot', note: 'Microsoft index + LinkedIn data layer' },
                  { name: 'Claude', note: 'Training + tool-use retrieval' },
                  { name: 'Google AI Overviews', note: 'Top of search results, above all links' },
                ].map((item) => (
                  <div key={item.name} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#c4b5fd', flexShrink: 0, marginTop: 6 }} />
                    <div>
                      <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{item.name}</span>
                      <span style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.4)', display: 'block', marginTop: 1 }}>{item.note}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, background: 'linear-gradient(to bottom, transparent, #fff)', pointerEvents: 'none' }} />
        </div>

        {/* ── Article + Sidebar ── */}
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '48px 32px 0' }} id="article-body">
          <div className="ai-article-grid">

            {/* Article */}
            <div>
              {/* TL;DR */}
              <div style={{ border: '1px solid rgba(99,57,224,0.22)', borderLeft: '4px solid #6339e0', background: 'rgba(99,57,224,0.045)', borderRadius: '0 16px 16px 0', padding: '22px 26px', marginBottom: 52 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 11.5, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#6339e0', marginBottom: 14 }}>
                  TL;DR — Key takeaways
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
                  {[
                    'AI engines recommend brands they can clearly identify as real entities — inconsistent or missing signals = invisible.',
                    'Entity signals (consistent name, description, schema, profiles) matter more than keyword density for AI visibility.',
                    'Citable content answers the question in the first two sentences — AI lifts clear, direct passages, not buried paragraphs.',
                    'Corroboration from third-party sources (directories, press, associations) is the most powerful trust signal AI engines use.',
                  ].map((item, i) => (
                    <li key={i} style={{ display: 'flex', gap: 12, fontSize: 15.5, color: 'var(--text-soft)', alignItems: 'flex-start', lineHeight: 1.6 }}>
                      <span style={{ color: '#6339e0', fontWeight: 800, fontSize: 15, flexShrink: 0, marginTop: 2 }}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Intro */}
              <p style={{ fontSize: 18.5, lineHeight: 1.78, color: 'var(--text)', marginBottom: 48, maxWidth: 860 }}>
                When a facilities manager asks Perplexity "who are the best commercial security installers in Sydney", they get a shortlist — not ten blue links. The brands on that list earned their place through signals most security companies have never thought about. This guide explains exactly what those signals are and how to build them.
              </p>

              {/* Section 1 */}
              <section aria-labelledby="why-ai-visibility">
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(99,57,224,0.1)', border: '1px solid rgba(99,57,224,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6339e0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
                  </div>
                  <h2 id="why-ai-visibility" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(21px, 2.5vw, 28px)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.2, margin: 0 }}>
                    1. Why AI visibility now matters for security companies
                  </h2>
                </div>
                <p style={{ fontSize: 17, lineHeight: 1.78, color: 'var(--text-soft)', marginBottom: 26, maxWidth: 860 }}>
                  Buyer behaviour is shifting. Commercial decision-makers — facilities managers, operations directors, procurement teams — increasingly open an AI assistant before Google when they need a shortlist of vendors. The assistant summarises, compares and recommends. If your brand is not part of that answer, you are not considered, regardless of your Google rankings.
                </p>
                <div className="ai-3col" style={{ marginBottom: 48 }}>
                  {[
                    { icon: '🔍', title: 'Discovery without search', desc: 'AI assistants present shortlists directly — buyers never see the ten blue links where you may already rank.' },
                    { icon: '🤝', title: 'Trust transfer', desc: 'A recommendation from ChatGPT carries the perceived authority of the platform — a powerful endorsement for a first touchpoint.' },
                    { icon: '📈', title: 'Compound advantage', desc: 'Brands that build entity authority early are harder to displace as AI models are retrained on their good signals.' },
                  ].map((c) => (
                    <div key={c.title} style={{ border: '1px solid var(--line)', borderRadius: 16, padding: '20px 18px', background: 'var(--bg-card)' }}>
                      <div style={{ fontSize: 28, marginBottom: 10 }}>{c.icon}</div>
                      <div style={{ fontWeight: 700, fontSize: 15, fontFamily: 'var(--font-display)', marginBottom: 6, color: 'var(--text)' }}>{c.title}</div>
                      <p style={{ fontSize: 13.5, color: 'var(--text-dim)', lineHeight: 1.55, margin: 0 }}>{c.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              <div style={{ height: 1, background: 'var(--line)', margin: '0 0 48px' }} />

              {/* Section 2 */}
              <section aria-labelledby="how-ai-discovers">
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(30,95,224,0.1)', border: '1px solid rgba(30,95,224,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>
                  </div>
                  <h2 id="how-ai-discovers" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(21px, 2.5vw, 28px)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.2, margin: 0 }}>
                    2. How AI engines discover and evaluate brands
                  </h2>
                </div>
                <p style={{ fontSize: 17, lineHeight: 1.78, color: 'var(--text-soft)', marginBottom: 26, maxWidth: 860 }}>
                  Most AI assistants use two sources in combination: their training data (a snapshot of the web at a point in time) and live retrieval — fetching current web pages to augment answers. A brand needs to be present and consistent in both. Here is how each works.
                </p>

                {/* Two-column explainer */}
                <div className="ai-2col" style={{ marginBottom: 32 }}>
                  {[
                    {
                      label: 'Training Data',
                      color: '#6339e0',
                      bg: 'rgba(99,57,224,0.05)',
                      border: 'rgba(99,57,224,0.2)',
                      points: [
                        'Compiled from web crawls of billions of pages',
                        'Weighted toward authoritative, oft-cited sources',
                        'Updated periodically — not real-time',
                        'Your brand\'s "reputation at training time"',
                      ],
                    },
                    {
                      label: 'Live Retrieval (RAG)',
                      color: '#1e5fe0',
                      bg: 'rgba(30,95,224,0.05)',
                      border: 'rgba(30,95,224,0.2)',
                      points: [
                        'Fetches current web pages at query time',
                        'Favours well-indexed, fast, structured content',
                        'Looks for clear entity signals on the page',
                        'Your brand\'s "current web presence"',
                      ],
                    },
                  ].map((col) => (
                    <div key={col.label} style={{ border: `1px solid ${col.border}`, borderRadius: 14, padding: '20px 22px', background: col.bg }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: col.color, marginBottom: 14 }}>{col.label}</div>
                      {col.points.map((p) => (
                        <div key={p} style={{ display: 'flex', gap: 10, marginBottom: 10, fontSize: 14, color: 'var(--text-soft)', lineHeight: 1.5 }}>
                          <span style={{ color: col.color, fontWeight: 700, flexShrink: 0 }}>→</span>
                          <span>{p}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--text-soft)', marginBottom: 48, maxWidth: 860 }}>
                  The implication: you need to be visible in both channels. Entity signals and content structured for retrieval address live fetching; corroborated brand mentions across the wider web build training-data representation over time.
                </p>
              </section>

              <div style={{ height: 1, background: 'var(--line)', margin: '0 0 48px' }} />

              {/* Section 3 */}
              <section aria-labelledby="entity-signals">
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18M3 15h18M9 3v18"/></svg>
                  </div>
                  <h2 id="entity-signals" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(21px, 2.5vw, 28px)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.2, margin: 0 }}>
                    3. Build your entity signals
                  </h2>
                </div>
                <p style={{ fontSize: 17, lineHeight: 1.78, color: 'var(--text-soft)', marginBottom: 26, maxWidth: 860 }}>
                  An entity is a distinct, identifiable thing — in this case, your brand. AI engines model entities by comparing how a name, description and attributes are presented across multiple sources. The more consistent and corroborated those signals are, the more confidently an AI can identify and recommend your brand.
                </p>

                <div className="ai-signal-grid" style={{ marginBottom: 48 }}>
                  {[
                    { title: 'Consistent business name', desc: 'Identical across website, GBP, LinkedIn, directories — no abbreviations, no trading-name mismatches.', color: '#10b981' },
                    { title: 'Clear business description', desc: 'A single, accurate one-sentence description of what you do and who you serve — used consistently everywhere.', color: '#10b981' },
                    { title: 'Organization schema', desc: 'Machine-readable structured data on your homepage identifying your business, services, location and contact.', color: '#10b981' },
                    { title: 'Google Business Profile', desc: 'Fully completed profile — primary category, services, hours, photos — the primary local entity signal.', color: '#10b981' },
                    { title: 'LinkedIn company page', desc: 'Active page with accurate industry, description and URL — a high-authority entity signal AI engines trust.', color: '#10b981' },
                    { title: 'Industry directory listings', desc: 'Security association, trade directories and relevant local listings with consistent details.', color: '#10b981' },
                  ].map((item) => (
                    <div key={item.title} style={{ border: '1px solid var(--line)', borderRadius: 14, padding: '16px 18px', background: 'var(--bg-card)', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      <span style={{ flexShrink: 0, marginTop: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 22, height: 22, borderRadius: 6, background: 'rgba(16,185,129,0.1)' }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={item.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </span>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14.5, fontFamily: 'var(--font-display)', marginBottom: 5, color: 'var(--text)' }}>{item.title}</div>
                        <div style={{ fontSize: 13.5, color: 'var(--text-dim)', lineHeight: 1.5 }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <div style={{ height: 1, background: 'var(--line)', margin: '0 0 48px' }} />

              {/* Section 4 */}
              <section aria-labelledby="citable-content">
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                  </div>
                  <h2 id="citable-content" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(21px, 2.5vw, 28px)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.2, margin: 0 }}>
                    4. Create content that AI engines cite
                  </h2>
                </div>
                <p style={{ fontSize: 17, lineHeight: 1.78, color: 'var(--text-soft)', marginBottom: 26, maxWidth: 860 }}>
                  AI engines quote content they can easily extract and verify. The format of your content matters as much as its accuracy. Answer-first writing — where the direct answer comes in the first sentence, before all context — is the single biggest structural change most security websites need.
                </p>

                {/* Before/After comparison */}
                <div className="ai-2col" style={{ marginBottom: 32 }}>
                  <div style={{ border: '1px solid rgba(239,68,68,0.3)', borderRadius: 14, padding: '18px 20px', background: 'rgba(239,68,68,0.04)' }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#ef4444', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>❌ Hard to cite</div>
                    <p style={{ fontSize: 14, color: 'var(--text-soft)', lineHeight: 1.65, margin: 0 }}>
                      &ldquo;At ABC Security, we have been providing access control solutions to businesses across Sydney for over 15 years. Our team of qualified technicians understands that every business has unique security requirements. In this article, we will discuss the cost of access control systems and what factors affect pricing...&rdquo;
                    </p>
                  </div>
                  <div style={{ border: '1px solid rgba(16,185,129,0.3)', borderRadius: 14, padding: '18px 20px', background: 'rgba(16,185,129,0.04)' }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#10b981', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>✅ AI-citable</div>
                    <p style={{ fontSize: 14, color: 'var(--text-soft)', lineHeight: 1.65, margin: 0 }}>
                      &ldquo;Access control systems typically cost between $500 and $5,000 per door for commercial installations in Australia, depending on credential type, controller complexity and installation environment. Card-reader systems sit at the lower end; biometric or multi-factor setups command a premium.&rdquo;
                    </p>
                  </div>
                </div>

                <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--text-soft)', marginBottom: 28, maxWidth: 860 }}>
                  The second passage can be quoted directly. The first cannot — it buries any answer beneath brand context. Apply this principle to every service page, guide and FAQ on your site.
                </p>

                {/* Content formats table */}
                <div style={{ border: '1px solid var(--line)', borderRadius: 14, overflow: 'hidden', marginBottom: 48 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: 'var(--bg-card-2)' }}>
                        {['Content format', 'AI citation potential', 'Why'].map((h) => (
                          <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 13, fontWeight: 700, color: 'var(--text)', borderBottom: '1px solid var(--line)' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Concise FAQ answers', 'Very high', 'Direct question-answer structure is exactly what AI retrieval looks for'],
                        ['Numbered how-to guides', 'High', 'Sequential steps are easy to extract and present in a list format'],
                        ['Definition / explainer pages', 'High', 'AI uses these when a user asks "what is X" queries'],
                        ['Comparison articles', 'High', 'Pros/cons and structured comparisons map to common AI queries'],
                        ['In-depth pillar pages', 'Medium', 'Good for authority building; specific passages get cited, not the whole page'],
                        ['Brand/news/announcement posts', 'Low', 'Promotional content rarely gets cited — lacks the neutral, informational quality AI favours'],
                      ].map(([format, potential, why], i) => (
                        <tr key={i} style={{ borderBottom: '1px solid var(--line)' }}>
                          <td style={{ padding: '12px 16px', fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{format}</td>
                          <td style={{ padding: '12px 16px', fontSize: 14 }}>
                            <span style={{
                              color: potential === 'Very high' ? '#10b981' : potential === 'High' ? '#1e5fe0' : potential === 'Medium' ? '#f59e0b' : '#9ca3af',
                              fontWeight: 600,
                            }}>{potential}</span>
                          </td>
                          <td style={{ padding: '12px 16px', fontSize: 13.5, color: 'var(--text-dim)' }}>{why}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <div style={{ height: 1, background: 'var(--line)', margin: '0 0 48px' }} />

              {/* Section 5 */}
              <section aria-labelledby="schema-ai">
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(30,95,224,0.1)', border: '1px solid rgba(30,95,224,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                  </div>
                  <h2 id="schema-ai" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(21px, 2.5vw, 28px)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.2, margin: 0 }}>
                    5. Schema markup that helps AI engines
                  </h2>
                </div>
                <p style={{ fontSize: 17, lineHeight: 1.78, color: 'var(--text-soft)', marginBottom: 26, maxWidth: 860 }}>
                  Schema markup is machine-readable structured data embedded in your HTML. It removes ambiguity about what your content means — crucial for AI retrieval systems. For security companies, four schema types deliver the highest impact.
                </p>
                <div className="ai-2col" style={{ marginBottom: 48 }}>
                  {[
                    {
                      type: 'Organization',
                      priority: 'Essential',
                      priorityColor: '#10b981',
                      desc: 'Defines your business identity — name, logo, description, contact, social profiles. Goes on every page via a site-wide script. This is the single most important AI entity signal you can add.',
                    },
                    {
                      type: 'LocalBusiness',
                      priority: 'Essential for installers',
                      priorityColor: '#10b981',
                      desc: 'Extends Organization with physical location, service area, opening hours. Especially important for CCTV, alarm and access-control installers — the primary local trust signal.',
                    },
                    {
                      type: 'FAQPage',
                      priority: 'High value',
                      priorityColor: '#1e5fe0',
                      desc: 'Marks up question-and-answer blocks. AI engines index these directly into their answer retrieval. Keep them genuinely useful — never mark up content that isn\'t on the page.',
                    },
                    {
                      type: 'Service',
                      priority: 'High value',
                      priorityColor: '#1e5fe0',
                      desc: 'Identifies each service you offer and connects it to your entity. Helps AI map your brand to the specific services buyers are asking about ("who installs access control in Brisbane").',
                    },
                  ].map((item) => (
                    <div key={item.type} style={{ border: '1px solid var(--line)', borderRadius: 14, padding: '18px 20px', background: 'var(--bg-card)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                        <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 14, color: 'var(--blue)' }}>{item.type}</div>
                        <span style={{ fontSize: 11.5, fontWeight: 700, color: item.priorityColor, background: item.priorityColor === '#10b981' ? 'rgba(16,185,129,0.1)' : 'rgba(30,95,224,0.1)', borderRadius: 99, padding: '2px 9px' }}>{item.priority}</span>
                      </div>
                      <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              <div style={{ height: 1, background: 'var(--line)', margin: '0 0 48px' }} />

              {/* Section 6 */}
              <section aria-labelledby="measuring-ai">
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                  </div>
                  <h2 id="measuring-ai" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(21px, 2.5vw, 28px)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.2, margin: 0 }}>
                    6. Measure and grow your AI mention share
                  </h2>
                </div>
                <p style={{ fontSize: 17, lineHeight: 1.78, color: 'var(--text-soft)', marginBottom: 26, maxWidth: 860 }}>
                  Unlike Google rankings, AI visibility has no single dashboard. The most reliable method is systematic brand-mention testing — periodically asking AI assistants the exact questions your buyers ask, and tracking whether and how your brand appears.
                </p>
                <div style={{ border: '1px solid rgba(245,158,11,0.25)', borderLeft: '4px solid #f59e0b', background: 'rgba(245,158,11,0.045)', borderRadius: '0 14px 14px 0', padding: '22px 26px', marginBottom: 48 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)', marginBottom: 14 }}>A practical AI visibility audit — questions to test monthly</div>
                  {[
                    '"Who are the best CCTV installers in [your city]?"',
                    '"What security companies install access control in [your city]?"',
                    '"Recommend a commercial security company in [your state]"',
                    '"Who installs monitored alarm systems for businesses near me?"',
                  ].map((q, i) => (
                    <div key={i} style={{ display: 'flex', gap: 12, marginBottom: i < 3 ? 10 : 0, fontSize: 14.5, color: 'var(--text-soft)', alignItems: 'flex-start' }}>
                      <span style={{ color: '#f59e0b', fontWeight: 800, flexShrink: 0, marginTop: 2 }}>{i + 1}.</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13.5 }}>{q}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* CTA */}
              <div style={{ marginTop: 56, padding: '28px 32px', borderRadius: 16, background: 'linear-gradient(135deg, rgba(30,95,224,0.06) 0%, rgba(99,57,224,0.04) 100%)', border: '1px solid rgba(30,95,224,0.2)' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: 'var(--text)', marginBottom: 10 }}>
                  Want us to audit your AI visibility?
                </h2>
                <p style={{ fontSize: 15, color: 'var(--text-soft)', marginBottom: 18, lineHeight: 1.6 }}>
                  SecurityBlogs builds AI visibility programs exclusively for security industry brands in Australia — CCTV, access control, alarms, monitoring, guarding and more. We test your current mention share, identify the signal gaps and build a program to fix them.
                </p>
                <Link href="/contact/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 22px', background: 'var(--blue)', borderRadius: 12, fontSize: 14.5, color: '#fff', fontWeight: 600, fontFamily: 'var(--font-display)', textDecoration: 'none' }}>
                  Book a free AI visibility audit →
                </Link>
              </div>

              {/* Author card */}
              <div style={{ marginTop: 48, padding: '24px 28px', borderRadius: 16, border: '1px solid var(--line)', background: 'var(--bg-card-2)', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, flexShrink: 0 }}>SB</div>
                <div>
                  <div style={{ fontWeight: 700, fontFamily: 'var(--font-display)', marginBottom: 4 }}>SecurityBlogs Team</div>
                  <div style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.55 }}>We write practical, vendor-neutral guides on SEO, AI visibility and paid advertising for security industry brands in Australia.</div>
                </div>
              </div>

              {/* FAQ */}
              <section aria-labelledby="faq" style={{ marginTop: 64 }}>
                <h2 id="faq" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 2.5vw, 26px)', fontWeight: 800, marginBottom: 24, color: 'var(--text)' }}>
                  Frequently asked questions
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    {
                      q: 'How do I get ChatGPT to recommend my security company?',
                      a: 'ChatGPT recommends brands it can identify as real, trustworthy entities. The most reliable path is to build consistent entity signals: the same business name, description and contact details across your website, Google Business Profile, LinkedIn and reputable directories. Publish genuinely useful content that answers the questions buyers ask, add Organization schema to your site, and earn citations from industry sources. This builds the corroboration AI engines need to confidently name you.',
                    },
                    {
                      q: 'Does having a website help AI engines recommend me?',
                      a: 'Yes, but the website alone is not enough. AI engines blend their training data with live web retrieval. Your site needs to clearly identify your business (schema markup, consistent NAP), answer the questions buyers ask (citable content), and be corroborated by mentions elsewhere on the web. A website that Google can crawl and index is the foundation, but entity authority across multiple sources is what makes an AI confident enough to recommend you by name.',
                    },
                    {
                      q: 'What is entity SEO and why does it matter for security companies?',
                      a: 'Entity SEO is the practice of defining your brand as a clear, machine-readable entity — a distinct "thing" that AI engines and knowledge graphs can identify, describe and connect to other things. For security companies, this means consistent business name, description and attributes across every online presence. When an AI engine has a strong entity model of your brand, it can recommend you with confidence. Without it, you remain an anonymous collection of web pages.',
                    },
                    {
                      q: 'How long does it take to build AI visibility?',
                      a: 'Basic entity recognition — where an AI can correctly identify your brand — can improve within 4–8 weeks of consistent signal work. Being actively recommended for competitive queries typically takes 3–6 months of consistent entity building, content publishing and citation earning. The timeline is shorter for brands in less-crowded niches or specific geographic markets.',
                    },
                  ].map((item, i) => (
                    <details key={i} style={{ border: '1px solid var(--line)', borderRadius: 14, overflow: 'hidden' }}>
                      <summary style={{ padding: '16px 20px', fontWeight: 600, fontSize: 15.5, color: 'var(--text)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', listStyle: 'none', userSelect: 'none' }}>
                        {item.q}
                        <span className="ai-faq-icon" style={{ fontSize: 18, color: 'var(--blue)', marginLeft: 12, flexShrink: 0 }}>+</span>
                      </summary>
                      <div style={{ padding: '0 20px 18px', fontSize: 15, color: 'var(--text-soft)', lineHeight: 1.7 }}>{item.a}</div>
                    </details>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="ai-sidebar">
              <div style={{ border: '1px solid var(--line)', borderRadius: 16, padding: '18px 16px', background: 'var(--bg-card)' }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 14 }}>In this guide</div>
                {[
                  { id: 'why-ai-visibility', label: '1. Why AI visibility matters' },
                  { id: 'how-ai-discovers', label: '2. How AI engines discover brands' },
                  { id: 'entity-signals', label: '3. Build your entity signals' },
                  { id: 'citable-content', label: '4. Create citable content' },
                  { id: 'schema-ai', label: '5. Schema markup for AI' },
                  { id: 'measuring-ai', label: '6. Measure your AI mention share' },
                  { id: 'faq', label: 'FAQ' },
                ].map((item) => (
                  <a key={item.id} href={`#${item.id}`} className="ai-toc-link">{item.label}</a>
                ))}
              </div>

              <div style={{ background: 'linear-gradient(135deg, rgba(30,95,224,0.08) 0%, rgba(30,95,224,0.02) 100%)', border: '1px solid rgba(30,95,224,0.2)', borderRadius: 16, padding: '18px 16px' }}>
                <div style={{ fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-display)', marginBottom: 10 }}>Free AI Visibility Audit</div>
                <p style={{ fontSize: 13.5, color: 'var(--text-soft)', marginBottom: 14, lineHeight: 1.55 }}>Find out exactly where your security brand stands in ChatGPT, Perplexity and Google AI Overviews.</p>
                <Link href="/contact/" className="btn btn-primary" style={{ fontSize: 13.5, padding: '10px 16px', width: '100%', justifyContent: 'center', display: 'flex' }}>
                  Book free audit →
                </Link>
              </div>

              {related.length > 0 && (
                <div style={{ border: '1px solid var(--line)', borderRadius: 16, padding: '18px 16px', background: 'var(--bg-card)' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 14 }}>Related reads</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {related.map((r) => (
                      <Link key={r.slug} href={`/knowledge-hub/blogs/${r.slug}/`} style={{ display: 'block', textDecoration: 'none' }}>
                        <div style={{ fontSize: 13, color: 'var(--blue)', marginBottom: 3 }}>{r.category}</div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', lineHeight: 1.4 }}>{r.title}</div>
                        <div style={{ fontSize: 12.5, color: 'var(--text-dim)', marginTop: 3 }}>{r.read} read</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>

        {/* Related bottom */}
        {related.length > 0 && (
          <section style={{ paddingBottom: 64, paddingTop: 56 }}>
            <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 32px' }}>
              <span className="eyebrow">More from AIO / AEO</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 700, marginTop: 8, marginBottom: 20 }}>Keep reading</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
                {related.map((r) => (
                  <Link key={r.slug} href={`/knowledge-hub/blogs/${r.slug}/`} className="card" style={{ textDecoration: 'none', display: 'block', padding: 24 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                      <span className="chip" style={{ color: 'var(--blue)', borderColor: 'rgba(30,95,224,0.3)', background: 'rgba(30,95,224,0.07)' }}>{r.category}</span>
                      <span style={{ fontSize: 12.5, color: 'var(--text-dim)' }}>{r.read}</span>
                    </div>
                    <div style={{ fontWeight: 700, fontFamily: 'var(--font-display)', fontSize: 16, lineHeight: 1.3, marginBottom: 8, color: 'var(--text)' }}>{r.title}</div>
                    <p style={{ fontSize: 13.5, color: 'var(--text-dim)', lineHeight: 1.55, margin: 0 }}>{r.excerpt.substring(0, 100)}…</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </>
  )
}
