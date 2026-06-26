import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import BlogReadingProgress from '@/components/ui/BlogReadingProgress'
import { posts } from '@/lib/posts'

const SLUG = 'content-marketing-security-companies-framework'

export const metadata: Metadata = {
  title: 'Content Marketing for Security Companies: The Complete Framework | SecurityBlogs',
  description:
    'A practical content marketing framework for security companies — topic clusters, buyer journey mapping, E-E-A-T signals and AI-ready formatting that builds rankings and citations.',
  alternates: { canonical: `/knowledge-hub/blogs/${SLUG}/` },
  openGraph: {
    title: 'Content Marketing for Security Companies: The Complete Framework | SecurityBlogs',
    description:
      'A practical content marketing framework for security companies — topic clusters, buyer journey mapping, E-E-A-T signals and AI-ready formatting that builds rankings and citations.',
    url: `/knowledge-hub/blogs/${SLUG}/`,
    siteName: 'SecurityBlogs',
    type: 'article',
    publishedTime: '2026-06-24',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Content Marketing for Security Companies: The Complete Framework',
  description: 'A practical content marketing framework for security companies — topic clusters, buyer journey mapping, E-E-A-T signals and AI-ready formatting that builds rankings and citations.',
  datePublished: '2026-06-24',
  dateModified: '2026-06-24',
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
      name: 'How often should a security company publish content?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Quality matters more than frequency. One genuinely useful, well-researched post per week outperforms five thin posts. For a typical security business starting out, two to four high-quality posts per month is a sustainable starting cadence. Focus on covering your core services and buyer questions first, then maintain a consistent cadence. An irregular burst of 20 posts followed by silence is less effective than steady publication over twelve months.',
      },
    },
    {
      '@type': 'Question',
      name: 'What content performs best for security companies?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Content that answers the real questions buyers have before they enquire performs best. The top-performing types for security companies are: buyer guides ("how to choose a CCTV system"), cost explainers ("what does an alarm system cost for a warehouse"), comparison content ("access control vs traditional keys"), practical how-to guides ("how to improve perimeter security") and compliance or standards explainers. These types attract both organic search traffic and AI citations because they directly match buyer intent.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long should security company blog posts be?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Length should match the depth of the topic, not a target word count. Simple FAQ answers can be 300–500 words; comprehensive buyer guides covering a technical topic (access control systems, monitored alarms) justify 1,500–3,000 words if the detail is genuinely useful. Avoid padding — adding length without adding value makes content worse. Search engines and AI engines both assess quality relative to the query. For most security topics, 800–1,500 words of genuinely useful content outperforms 3,000 padded words.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can AI-generated content rank for security terms?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AI-generated content can rank if it is accurate, genuinely useful and demonstrates real expertise — Google evaluates content by quality, not by how it was produced. However, generic AI output that lacks specific expertise, real-world context or accurate detail tends to produce thin content that underperforms in a trust-intensive industry like security. The most effective approach is to use AI to assist with structure and drafting while having a subject-matter expert review, enrich and verify the content before publication.',
      },
    },
  ],
}

export default function ContentMarketingFrameworkPage() {
  const related = posts
    .filter((p) => p.slug !== SLUG && p.category === 'SEO')
    .slice(0, 3)

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema} />
      <BlogReadingProgress />

      <style>{`
        .cm-hero-grid { display: grid; grid-template-columns: 1fr minmax(0, 380px); gap: 56px; align-items: center; }
        .cm-article-grid { display: grid; grid-template-columns: minmax(0, 1fr) 300px; gap: 56px; align-items: start; }
        .cm-3col { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .cm-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .cm-4col { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
        .cm-sidebar { display: flex; flex-direction: column; gap: 18px; position: sticky; top: 96px; }
        .cm-toc-link { display: block; font-size: 13.5px; padding: 7px 10px; border-radius: 8px; color: var(--text-dim); border-left: 2px solid transparent; line-height: 1.4; transition: all 0.15s ease; text-decoration: none; }
        .cm-toc-link:hover { color: var(--blue); background: rgba(30,95,224,0.07); border-left-color: var(--blue); }
        details summary::-webkit-details-marker { display: none; }
        details[open] summary .cm-faq-icon { transform: rotate(45deg); }
        .cm-faq-icon { transition: transform 0.2s ease; display: inline-block; }
        @media (max-width: 1024px) {
          .cm-hero-grid { grid-template-columns: 1fr; }
          .cm-hero-card { display: none !important; }
        }
        @media (max-width: 900px) {
          .cm-article-grid { grid-template-columns: 1fr; }
          .cm-sidebar { position: static; display: none; }
          .cm-3col { grid-template-columns: 1fr; }
          .cm-2col { grid-template-columns: 1fr; }
          .cm-4col { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 600px) {
          .cm-4col { grid-template-columns: 1fr; }
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
          <div style={{ position: 'absolute', top: '-15%', right: '20%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(30,95,224,0.13) 0%, transparent 65%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '0', left: '8%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 65%)', pointerEvents: 'none' }} />

          <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 24px 64px', position: 'relative', zIndex: 1 }}>
            <div className="cm-hero-grid">
              <div>
                <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'rgba(255,255,255,0.38)', marginBottom: 26, flexWrap: 'wrap' }}>
                  <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
                  <span>/</span>
                  <Link href="/knowledge-hub/" style={{ color: 'inherit', textDecoration: 'none' }}>Knowledge Hub</Link>
                  <span>/</span>
                  <Link href="/knowledge-hub/blogs/" style={{ color: 'inherit', textDecoration: 'none' }}>Blog</Link>
                  <span>/</span>
                  <span style={{ color: 'rgba(255,255,255,0.65)' }}>Content Marketing Framework</span>
                </nav>

                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 26 }}>
                  <span style={{ background: 'rgba(30,95,224,0.22)', color: '#7eb3ff', border: '1px solid rgba(30,95,224,0.35)', borderRadius: 999, padding: '4px 14px', fontSize: 12, fontWeight: 700, letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>SEO</span>
                  <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13 }}>24 June 2026</span>
                  <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
                  <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13 }}>10 min read</span>
                  <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
                  <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13 }}>SecurityBlogs Team</span>
                </div>

                <h1 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(30px, 4vw, 52px)',
                  fontWeight: 800,
                  color: '#ffffff',
                  lineHeight: 1.08,
                  letterSpacing: '-0.025em',
                  marginBottom: 22,
                  maxWidth: 860,
                }}>
                  Content Marketing for Security Companies:{' '}
                  <span style={{ color: '#7eb3ff' }}>The Complete Framework</span>
                </h1>

                <p style={{ fontSize: 'clamp(16px, 1.8vw, 19px)', color: 'rgba(255,255,255,0.62)', lineHeight: 1.68, maxWidth: 720, marginBottom: 34 }}>
                  A practical framework for security brands — topic clusters, buyer journey mapping, E-E-A-T signals and content structured to rank on Google and get cited by AI assistants.
                </p>

                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <Link href="/contact/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 22px', background: 'var(--blue)', borderRadius: 12, fontSize: 14.5, color: '#fff', fontWeight: 600, fontFamily: 'var(--font-display)', textDecoration: 'none' }}>
                    Get a content strategy →
                  </Link>
                  <Link href="/knowledge-hub/blogs/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '12px 18px', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 12, fontSize: 14, color: 'rgba(255,255,255,0.55)', background: 'rgba(255,255,255,0.05)', textDecoration: 'none' }}>
                    ← All articles
                  </Link>
                </div>
              </div>

              {/* Right card */}
              <div className="cm-hero-card" style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 20,
                padding: 28,
                backdropFilter: 'blur(16px)',
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 18 }}>
                  Content That Earns Both Rankings & AI Citations
                </div>
                {[
                  { type: 'Buyer guides', benefit: 'Captures researching buyers + gets cited in AI overviews' },
                  { type: 'Cost explainers', benefit: 'Pre-qualifies leads + answers the #1 buyer question' },
                  { type: 'Comparisons (X vs Y)', benefit: 'Matches comparison search intent + earns featured snippets' },
                  { type: 'FAQ pages', benefit: 'Feeds rich results + direct AI citation source' },
                  { type: 'Standards guides', benefit: 'Builds E-E-A-T authority in a regulated industry' },
                ].map((item) => (
                  <div key={item.type} style={{ marginBottom: 14 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 700, color: '#fff', marginBottom: 3 }}>{item.type}</div>
                    <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.45)', lineHeight: 1.4 }}>{item.benefit}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, background: 'linear-gradient(to bottom, transparent, #fff)', pointerEvents: 'none' }} />
        </div>

        {/* ── Body ── */}
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '48px 32px 0' }} id="article-body">
          <div className="cm-article-grid">
            <div>
              {/* TL;DR */}
              <div style={{ border: '1px solid rgba(245,158,11,0.22)', borderLeft: '4px solid #f59e0b', background: 'rgba(245,158,11,0.04)', borderRadius: '0 16px 16px 0', padding: '22px 26px', marginBottom: 52 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 11.5, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#f59e0b', marginBottom: 14 }}>TL;DR — What you will take away</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
                  {[
                    'A topic cluster (one deep pillar page + focused supporting posts) beats publishing dozens of disconnected articles.',
                    'Buyer-intent mapping is designed to give every piece of content a clear job — educate, compare or convert.',
                    'E-E-A-T signals — real expertise, accurate detail, credible authorship — are what make security content rank and get cited.',
                    'AI-ready formatting (answer-first, clear headings, FAQ schema) turns good content into citable content.',
                  ].map((item, i) => (
                    <li key={i} style={{ display: 'flex', gap: 12, fontSize: 15.5, color: 'var(--text-soft)', alignItems: 'flex-start', lineHeight: 1.6 }}>
                      <span style={{ color: '#f59e0b', fontWeight: 800, fontSize: 15, flexShrink: 0, marginTop: 2 }}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Intro */}
              <p style={{ fontSize: 18.5, lineHeight: 1.78, color: 'var(--text)', marginBottom: 48, maxWidth: 860 }}>
                Content marketing for security companies is not the same as content marketing for a software startup. Security buyers are cautious, research-driven and highly attuned to credibility signals. They read carefully before they call. The content that works in this industry is accurate, practical and structured for trust — not generic or promotional. This framework covers how to plan, produce and format that content.
              </p>

              {/* Section 1: Why security content is different */}
              <section aria-labelledby="why-different">
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(30,95,224,0.1)', border: '1px solid rgba(30,95,224,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  </div>
                  <h2 id="why-different" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(21px, 2.5vw, 28px)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.2, margin: 0 }}>
                    1. Why security content is different
                  </h2>
                </div>
                <p style={{ fontSize: 17, lineHeight: 1.78, color: 'var(--text-soft)', marginBottom: 26, maxWidth: 860 }}>
                  Security is a high-trust, regulated industry. Buyers are often making decisions that involve compliance obligations, personal safety or significant capital expenditure. Generic, thin content does not earn that trust — it actively damages it. Google's E-E-A-T framework (Experience, Expertise, Authoritativeness, Trustworthiness) is especially important here.
                </p>

                <div className="cm-4col" style={{ marginBottom: 48 }}>
                  {[
                    { letter: 'E', label: 'Experience', desc: 'First-hand experience with the installations, systems and scenarios you write about.' },
                    { letter: 'E', label: 'Expertise', desc: 'Demonstrated technical and industry knowledge — correct standards, accurate terminology, real detail.' },
                    { letter: 'A', label: 'Authoritativeness', desc: 'Credible authorship, brand recognition and mentions from other trusted industry sources.' },
                    { letter: 'T', label: 'Trustworthiness', desc: 'Accurate, verifiable claims. No invented statistics. Clear contact details and privacy policies.' },
                  ].map((item, i) => (
                    <div key={i} style={{ border: '1px solid var(--line)', borderRadius: 14, padding: '18px 16px', background: 'var(--bg-card)', textAlign: 'center' }}>
                      <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(30,95,224,0.12)', border: '1px solid rgba(30,95,224,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: 'var(--blue)' }}>{item.letter}</div>
                      <div style={{ fontWeight: 700, fontSize: 14, fontFamily: 'var(--font-display)', marginBottom: 6, color: 'var(--text)' }}>{item.label}</div>
                      <p style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.55, margin: 0 }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              <div style={{ height: 1, background: 'var(--line)', margin: '0 0 48px' }} />

              {/* Section 2: Topic cluster model */}
              <section aria-labelledby="topic-clusters">
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="9" strokeDasharray="3 3"/><line x1="12" y1="3" x2="12" y2="9"/><line x1="12" y1="15" x2="12" y2="21"/><line x1="3" y1="12" x2="9" y2="12"/><line x1="15" y1="12" x2="21" y2="12"/></svg>
                  </div>
                  <h2 id="topic-clusters" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(21px, 2.5vw, 28px)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.2, margin: 0 }}>
                    2. The topic cluster model for security brands
                  </h2>
                </div>
                <p style={{ fontSize: 17, lineHeight: 1.78, color: 'var(--text-soft)', marginBottom: 26, maxWidth: 860 }}>
                  A topic cluster is a comprehensive "pillar" page on a major theme, supported by focused articles that answer specific sub-questions — all interlinked. This structure tells Google you have genuine depth on a subject, which builds the topical authority that lifts rankings across the cluster.
                </p>

                {/* Example cluster */}
                <div style={{ border: '1px solid var(--line)', borderRadius: 16, overflow: 'hidden', marginBottom: 32 }}>
                  <div style={{ background: 'var(--bg-card-2)', padding: '14px 20px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981' }} />
                    <span style={{ fontWeight: 700, fontSize: 14.5, color: 'var(--text)' }}>Example cluster: Access Control</span>
                  </div>
                  <div style={{ padding: '20px' }}>
                    <div style={{ border: '2px solid rgba(16,185,129,0.4)', borderRadius: 12, padding: '14px 18px', background: 'rgba(16,185,129,0.04)', marginBottom: 16 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: '#10b981', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>Pillar page</div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>Access Control Systems: The Complete Buyer&apos;s Guide</div>
                      <div style={{ fontSize: 13, color: 'var(--text-dim)', marginTop: 4 }}>Broad, comprehensive — covers types, costs, installation, compliance, maintenance</div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
                      {[
                        'Access control vs traditional keys: pros and cons',
                        'How much does access control cost in Australia?',
                        'Card readers vs biometrics for commercial buildings',
                        'Access control compliance for Australian workplaces',
                        'Cloud-based vs on-premise access control',
                        'How to choose an access control installer',
                      ].map((item) => (
                        <div key={item} style={{ border: '1px solid rgba(16,185,129,0.2)', borderRadius: 10, padding: '10px 14px', background: 'rgba(16,185,129,0.03)', fontSize: 13.5, color: 'var(--text-soft)' }}>
                          <span style={{ color: '#10b981', marginRight: 6 }}>→</span>{item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--text-soft)', marginBottom: 48, maxWidth: 860 }}>
                  Build one cluster per major service — CCTV, alarms, access control, monitoring, guarding. Start with the pillar, then publish supporting posts that link back to it and to each other.
                </p>
              </section>

              <div style={{ height: 1, background: 'var(--line)', margin: '0 0 48px' }} />

              {/* Section 3: Buyer journey */}
              <section aria-labelledby="buyer-journey">
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
                  </div>
                  <h2 id="buyer-journey" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(21px, 2.5vw, 28px)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.2, margin: 0 }}>
                    3. Map content to the buyer journey
                  </h2>
                </div>
                <p style={{ fontSize: 17, lineHeight: 1.78, color: 'var(--text-soft)', marginBottom: 26, maxWidth: 860 }}>
                  Every piece of content should serve buyers at a specific stage of their journey. Mapping content to intent is designed to give every page a clear purpose — and helps avoid publishing content that serves neither the buyer nor the search engine.
                </p>

                <div className="cm-3col" style={{ marginBottom: 48 }}>
                  {[
                    {
                      stage: 'Awareness',
                      icon: '💡',
                      color: '#6b7280',
                      bg: 'rgba(107,114,128,0.05)',
                      border: 'rgba(107,114,128,0.2)',
                      intent: 'Research & education',
                      examples: [
                        'How does access control work?',
                        'What is a monitored alarm system?',
                        'CCTV vs IP cameras: what\'s the difference?',
                      ],
                      cta: 'Build trust, earn newsletter/return visit',
                    },
                    {
                      stage: 'Consideration',
                      icon: '⚖️',
                      color: '#f59e0b',
                      bg: 'rgba(245,158,11,0.05)',
                      border: 'rgba(245,158,11,0.2)',
                      intent: 'Comparison & evaluation',
                      examples: [
                        'Best commercial alarm systems in Australia',
                        'Access control vs traditional keys',
                        'Questions to ask a CCTV installer',
                      ],
                      cta: 'Get them to shortlist you',
                    },
                    {
                      stage: 'Decision',
                      icon: '✅',
                      color: '#10b981',
                      bg: 'rgba(16,185,129,0.05)',
                      border: 'rgba(16,185,129,0.2)',
                      intent: 'Ready to act',
                      examples: [
                        'CCTV installation quote Sydney',
                        'Commercial alarm installer near me',
                        'Access control installation cost',
                      ],
                      cta: 'Convert to enquiry',
                    },
                  ].map((c) => (
                    <div key={c.stage} style={{ border: `1px solid ${c.border}`, borderRadius: 16, padding: '20px 18px', background: c.bg }}>
                      <div style={{ fontSize: 24, marginBottom: 8 }}>{c.icon}</div>
                      <div style={{ fontWeight: 800, fontSize: 16, fontFamily: 'var(--font-display)', color: c.color, marginBottom: 4 }}>{c.stage}</div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-dim)', marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{c.intent}</div>
                      <div style={{ marginBottom: 14 }}>
                        {c.examples.map((e) => (
                          <div key={e} style={{ fontSize: 13.5, color: 'var(--text-soft)', marginBottom: 6, paddingLeft: 12, borderLeft: `2px solid ${c.border}` }}>{e}</div>
                        ))}
                      </div>
                      <div style={{ fontSize: 12.5, fontWeight: 700, color: c.color, background: c.bg, border: `1px solid ${c.border}`, borderRadius: 8, padding: '6px 10px' }}>
                        Goal: {c.cta}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <div style={{ height: 1, background: 'var(--line)', margin: '0 0 48px' }} />

              {/* Section 4: Content types */}
              <section aria-labelledby="content-types">
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(30,95,224,0.1)', border: '1px solid rgba(30,95,224,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                  </div>
                  <h2 id="content-types" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(21px, 2.5vw, 28px)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.2, margin: 0 }}>
                    4. Content types that work for security brands
                  </h2>
                </div>
                <p style={{ fontSize: 17, lineHeight: 1.78, color: 'var(--text-soft)', marginBottom: 26, maxWidth: 860 }}>
                  Not all content serves the same purpose. These types consistently perform well for security companies across both organic search and AI citation.
                </p>

                <div style={{ border: '1px solid var(--line)', borderRadius: 14, overflow: 'hidden', marginBottom: 48 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: 'var(--bg-card-2)' }}>
                        {['Type', 'Best for', 'SEO value', 'AI citation value'].map((h) => (
                          <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 13, fontWeight: 700, color: 'var(--text)', borderBottom: '1px solid var(--line)' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Buyer guides', 'Awareness + consideration', 'High', 'Very high'],
                        ['Cost explainers', 'Consideration', 'High', 'Very high'],
                        ['Comparison articles (X vs Y)', 'Consideration', 'High', 'High'],
                        ['FAQ pages', 'All stages', 'High', 'Very high'],
                        ['Standards/compliance guides', 'Awareness', 'Medium', 'High'],
                        ['How-to installation guides', 'Awareness', 'Medium', 'High'],
                        ['Service/product reviews', 'Consideration', 'Medium', 'Medium'],
                        ['Case studies', 'Decision', 'Low', 'Low'],
                        ['Company news/announcements', 'Brand', 'Low', 'Low'],
                      ].map(([type, bestFor, seo, ai], i) => (
                        <tr key={i} style={{ borderBottom: '1px solid var(--line)' }}>
                          <td style={{ padding: '11px 16px', fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{type}</td>
                          <td style={{ padding: '11px 16px', fontSize: 13.5, color: 'var(--text-dim)' }}>{bestFor}</td>
                          <td style={{ padding: '11px 16px', fontSize: 13.5, fontWeight: 600, color: seo === 'High' ? '#1e5fe0' : seo === 'Medium' ? '#f59e0b' : '#9ca3af' }}>{seo}</td>
                          <td style={{ padding: '11px 16px', fontSize: 13.5, fontWeight: 600, color: ai === 'Very high' ? '#10b981' : ai === 'High' ? '#1e5fe0' : ai === 'Medium' ? '#f59e0b' : '#9ca3af' }}>{ai}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <div style={{ height: 1, background: 'var(--line)', margin: '0 0 48px' }} />

              {/* Section 5: AI-ready formatting */}
              <section aria-labelledby="ai-ready">
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(99,57,224,0.1)', border: '1px solid rgba(99,57,224,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6339e0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>
                  </div>
                  <h2 id="ai-ready" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(21px, 2.5vw, 28px)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.2, margin: 0 }}>
                    5. Format content for AI citability
                  </h2>
                </div>
                <p style={{ fontSize: 17, lineHeight: 1.78, color: 'var(--text-soft)', marginBottom: 26, maxWidth: 860 }}>
                  Good content that is poorly formatted rarely gets cited by AI engines. The structure of each page determines whether AI can extract the right passage — and whether it gets quoted or skipped.
                </p>

                <div className="cm-2col" style={{ marginBottom: 32 }}>
                  {[
                    {
                      title: '5 formatting rules for AI citation',
                      color: '#6339e0',
                      bg: 'rgba(99,57,224,0.05)',
                      border: 'rgba(99,57,224,0.2)',
                      rules: [
                        'Answer first — lead with the direct answer in 1–2 sentences before any context',
                        'Use descriptive H2/H3 headings that state the topic, not just "Introduction"',
                        'Short paragraphs — 3–5 sentences maximum per paragraph',
                        'Use numbered lists for steps; bullet lists for options',
                        'Add FAQPage schema to every page that answers specific questions',
                      ],
                    },
                    {
                      title: 'What AI engines prefer to quote',
                      color: '#10b981',
                      bg: 'rgba(16,185,129,0.05)',
                      border: 'rgba(16,185,129,0.2)',
                      rules: [
                        'Specific, accurate facts (cost ranges, timeframes, standards references)',
                        'Clear definitions that start with the term ("Access control is...")',
                        'Step-by-step processes that are easy to summarise',
                        'Comparisons with clear criteria and conclusions',
                        'Expert opinions that are clearly attributed',
                      ],
                    },
                  ].map((col) => (
                    <div key={col.title} style={{ border: `1px solid ${col.border}`, borderRadius: 14, padding: '20px 22px', background: col.bg }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: col.color, marginBottom: 16 }}>{col.title}</div>
                      {col.rules.map((r, i) => (
                        <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, fontSize: 14, color: 'var(--text-soft)', lineHeight: 1.5 }}>
                          <span style={{ color: col.color, fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                          <span>{r}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Publishing cadence */}
                <div style={{ border: '1px solid rgba(245,158,11,0.25)', borderLeft: '4px solid #f59e0b', background: 'rgba(245,158,11,0.04)', borderRadius: '0 14px 14px 0', padding: '20px 24px', marginBottom: 48 }}>
                  <div style={{ fontWeight: 700, fontSize: 15.5, color: 'var(--text)', marginBottom: 12 }}>Sustainable publishing cadence for a security business</div>
                  <div className="cm-3col">
                    {[
                      { phase: 'Foundation (months 1–2)', action: 'Publish pillar pages for each core service. These are your most important, long-term ranking assets.' },
                      { phase: 'Cluster build (months 3–6)', action: 'Publish 2–3 supporting posts per month per cluster. Prioritise buyer questions you hear in sales conversations.' },
                      { phase: 'Sustain (month 7+)', action: '1–2 quality posts per week. Refresh older content annually. Consistency now beats burst publishing.' },
                    ].map((item) => (
                      <div key={item.phase} style={{ background: 'var(--bg-card)', border: '1px solid var(--line)', borderRadius: 12, padding: '14px 16px' }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#f59e0b', marginBottom: 8 }}>{item.phase}</div>
                        <p style={{ fontSize: 13.5, color: 'var(--text-dim)', lineHeight: 1.55, margin: 0 }}>{item.action}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* CTA */}
              <div style={{ marginTop: 56, padding: '28px 32px', borderRadius: 16, background: 'linear-gradient(135deg, rgba(245,158,11,0.06) 0%, rgba(30,95,224,0.04) 100%)', border: '1px solid rgba(245,158,11,0.2)' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: 'var(--text)', marginBottom: 10 }}>
                  Want a content strategy built for your security brand?
                </h2>
                <p style={{ fontSize: 15, color: 'var(--text-soft)', marginBottom: 18, lineHeight: 1.6 }}>
                  SecurityBlogs creates topic clusters, buyer-journey content plans and AI-optimised copy exclusively for security industry brands in Australia.
                </p>
                <Link href="/contact/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 22px', background: 'var(--blue)', borderRadius: 12, fontSize: 14.5, color: '#fff', fontWeight: 600, fontFamily: 'var(--font-display)', textDecoration: 'none' }}>
                  Book a free content audit →
                </Link>
              </div>

              {/* Author */}
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
                      q: 'How often should a security company publish content?',
                      a: 'Quality matters more than frequency. One genuinely useful, well-researched post per week outperforms five thin posts. For a security business starting out, two to four high-quality posts per month is a sustainable cadence. Focus on covering your core service and buyer questions first, then maintain a consistent pace. An irregular burst of posts followed by silence is less effective than steady publication over twelve months.',
                    },
                    {
                      q: 'What content performs best for security companies?',
                      a: 'Content that answers real buyer questions performs best. The top-performing types are: buyer guides ("how to choose a CCTV system"), cost explainers ("what does an alarm system cost for a warehouse"), comparison content ("access control vs traditional keys") and compliance explainers. These types attract organic traffic and AI citations because they directly match buyer intent.',
                    },
                    {
                      q: 'How long should security company blog posts be?',
                      a: 'Length should match the depth of the topic, not a target word count. Simple FAQ answers can be 300–500 words; comprehensive buyer guides justify 1,500–3,000 words if the detail is genuinely useful. Avoid padding — adding length without adding value makes content worse. For most security topics, 800–1,500 words of genuinely useful content outperforms 3,000 padded words.',
                    },
                    {
                      q: 'Can AI-generated content rank for security terms?',
                      a: 'AI-generated content can rank if it is accurate, genuinely useful and demonstrates real expertise. However, generic AI output that lacks specific expertise, real-world context or accurate detail tends to produce thin content that underperforms in a trust-intensive industry like security. The most effective approach is to use AI to assist with structure and drafting while having a subject-matter expert review, enrich and verify the content before publication.',
                    },
                  ].map((item, i) => (
                    <details key={i} style={{ border: '1px solid var(--line)', borderRadius: 14, overflow: 'hidden' }}>
                      <summary style={{ padding: '16px 20px', fontWeight: 600, fontSize: 15.5, color: 'var(--text)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', listStyle: 'none', userSelect: 'none' }}>
                        {item.q}
                        <span className="cm-faq-icon" style={{ fontSize: 18, color: 'var(--blue)', marginLeft: 12, flexShrink: 0 }}>+</span>
                      </summary>
                      <div style={{ padding: '0 20px 18px', fontSize: 15, color: 'var(--text-soft)', lineHeight: 1.7 }}>{item.a}</div>
                    </details>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="cm-sidebar">
              <div style={{ border: '1px solid var(--line)', borderRadius: 16, padding: '18px 16px', background: 'var(--bg-card)' }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 14 }}>In this guide</div>
                {[
                  { id: 'why-different', label: '1. Why security content is different' },
                  { id: 'topic-clusters', label: '2. Topic cluster model' },
                  { id: 'buyer-journey', label: '3. Buyer journey mapping' },
                  { id: 'content-types', label: '4. Content types that work' },
                  { id: 'ai-ready', label: '5. AI-ready formatting' },
                  { id: 'faq', label: 'FAQ' },
                ].map((item) => (
                  <a key={item.id} href={`#${item.id}`} className="cm-toc-link">{item.label}</a>
                ))}
              </div>

              <div style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(30,95,224,0.04) 100%)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: 16, padding: '18px 16px' }}>
                <div style={{ fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-display)', marginBottom: 10 }}>Free Content Audit</div>
                <p style={{ fontSize: 13.5, color: 'var(--text-soft)', marginBottom: 14, lineHeight: 1.55 }}>Find out exactly what content your security brand needs to rank and get cited by AI.</p>
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

        {related.length > 0 && (
          <section style={{ paddingBottom: 64, paddingTop: 56 }}>
            <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 32px' }}>
              <span className="eyebrow">More from SEO</span>
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
