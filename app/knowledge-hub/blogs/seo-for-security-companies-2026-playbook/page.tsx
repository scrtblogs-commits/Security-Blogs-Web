// PROTOTYPE: Premium editorial layout for "SEO for Security Companies: The 2026 Playbook"
// This static route takes precedence over /[slug]/page.tsx for this specific URL.
// Once approved, this design system will be applied to all posts.

import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import BlogReadingProgress from '@/components/ui/BlogReadingProgress'
import { posts } from '@/lib/posts'

const SLUG = 'seo-for-security-companies-2026-playbook'

export const metadata: Metadata = {
  title: 'SEO for Security Companies: The 2026 Playbook | SecurityBlogs',
  description:
    'A step-by-step SEO playbook for security companies in 2026 — technical foundations, local SEO, content and authority that win high-intent buyers.',
  alternates: { canonical: `/knowledge-hub/blogs/${SLUG}/` },
  openGraph: {
    title: 'SEO for Security Companies: The 2026 Playbook | SecurityBlogs',
    description:
      'A step-by-step SEO playbook for security companies in 2026 — technical foundations, local SEO, content and authority that win high-intent buyers.',
    url: `/knowledge-hub/blogs/${SLUG}/`,
    siteName: 'SecurityBlogs',
    type: 'article',
    publishedTime: '2026-06-18',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'SEO for Security Companies: The 2026 Playbook',
  description:
    'A step-by-step SEO playbook for security companies in 2026 — technical foundations, local SEO, content and authority that win high-intent buyers.',
  datePublished: '2026-06-18',
  dateModified: '2026-06-18',
  image: 'https://securityblogs.com.au/og-image.png',
  author: {
    '@type': 'Person',
    name: 'SecurityBlogs Team',
    url: 'https://securityblogs.com.au/about-us/',
  },
  publisher: { '@type': 'Organization', name: 'SecurityBlogs' },
  mainEntityOfPage: `https://securityblogs.com.au/knowledge-hub/blogs/${SLUG}/`,
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long does SEO take for a security company?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most security companies see measurable improvement in impressions and rankings within 3–4 months of consistent effort. Competitive keywords typically take 6–9 months to reach page one. New domains may take longer to build the domain authority needed for short-tail terms.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the most important SEO factor for security companies?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For local service businesses, Google Business Profile optimisation and NAP consistency deliver the fastest visible return. Technical health — crawlability, Core Web Vitals — is the prerequisite without which even excellent content will underperform.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do security companies need a blog?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, but only if the content is genuinely useful to buyers. Thin or duplicated content does more harm than none. The goal is to answer real questions buyers have before they enquire — installation costs, standards, comparisons, maintenance — and to demonstrate the expertise that earns E-E-A-T recognition.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should security companies invest in SEO or Google Ads?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Both serve different roles. Google Ads delivers leads immediately but stops when the budget does. SEO takes longer to build but compounds over time. For most security businesses, Ads funds short-term growth while SEO builds long-term visibility.',
      },
    },
  ],
}

export default function SeoPlaybookPage() {
  const related = posts
    .filter((p) => p.slug !== SLUG && p.category === 'SEO')
    .slice(0, 3)

  const allRelated = posts.filter((p) => p.slug !== SLUG).slice(0, 3)

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema} />
      <BlogReadingProgress />

      {/* Page-specific responsive overrides */}
      <style>{`
        .proto-hero-grid { display: grid; grid-template-columns: 1fr minmax(0, 380px); gap: 56px; align-items: center; }
        .proto-article-grid { display: grid; grid-template-columns: minmax(0, 1fr) 300px; gap: 56px; align-items: start; }
        .proto-3col { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .proto-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .proto-4col { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
        .proto-2col-tech { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 14px; }
        .proto-sidebar { display: flex; flex-direction: column; gap: 18px; position: sticky; top: 96px; }
        .proto-toc-link { display: block; font-size: 13.5px; padding: 7px 10px; border-radius: 8px; color: var(--text-dim); border-left: 2px solid transparent; line-height: 1.4; transition: all 0.15s ease; text-decoration: none; }
        .proto-toc-link:hover { color: var(--blue); background: rgba(30,95,224,0.07); border-left-color: var(--blue); }
        details summary::-webkit-details-marker { display: none; }
        details[open] summary .proto-faq-icon { transform: rotate(45deg); }
        .proto-faq-icon { transition: transform 0.2s ease; display: inline-block; }
        @media (max-width: 1024px) {
          .proto-hero-grid { grid-template-columns: 1fr; }
          .proto-hero-rank { display: none; }
        }
        @media (max-width: 900px) {
          .proto-article-grid { grid-template-columns: 1fr; }
          .proto-sidebar { position: static; display: none; }
          .proto-3col { grid-template-columns: 1fr; }
          .proto-4col { grid-template-columns: 1fr 1fr; }
          .proto-2col { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .proto-4col { grid-template-columns: 1fr; }
        }
      `}</style>

      <article>

        {/* 
            HERO — dark navy, dot-grid, rank-tracker mockup
         */}
        <div style={{
          background: 'linear-gradient(135deg, #060f1f 0%, #0d1e3d 55%, #071428 100%)',
          padding: 'calc(var(--nav-h) + 60px) 0 0',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Dot grid */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(30,95,224,0.16) 1px, transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none' }} />
          {/* Blue glow blobs */}
          <div style={{ position: 'absolute', top: '-20%', left: '30%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(30,95,224,0.12) 0%, transparent 65%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '0', right: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(30,95,224,0.08) 0%, transparent 65%)', pointerEvents: 'none' }} />

          <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 24px 64px', position: 'relative', zIndex: 1 }}>
            <div className="proto-hero-grid">

              {/* Left: content */}
              <div>
                {/* Breadcrumb */}
                <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'rgba(255,255,255,0.38)', marginBottom: 26, flexWrap: 'wrap' }}>
                  <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
                  <span aria-hidden="true">/</span>
                  <Link href="/knowledge-hub/" style={{ color: 'inherit', textDecoration: 'none' }}>Knowledge Hub</Link>
                  <span aria-hidden="true">/</span>
                  <Link href="/knowledge-hub/blogs/" style={{ color: 'inherit', textDecoration: 'none' }}>Blog</Link>
                  <span aria-hidden="true">/</span>
                  <span style={{ color: 'rgba(255,255,255,0.65)' }}>SEO Playbook 2026</span>
                </nav>

                {/* Meta bar */}
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 26 }}>
                  <span style={{ background: 'rgba(30,95,224,0.22)', color: '#7eb3ff', border: '1px solid rgba(30,95,224,0.35)', borderRadius: 999, padding: '4px 14px', fontSize: 12, fontWeight: 700, letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>SEO</span>
                  <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13 }}>18 June 2026</span>
                  <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
                  <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13 }}>Updated 25 June 2026</span>
                  <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
                  <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13 }}>9 min read</span>
                  <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
                  <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13 }}>SecurityBlogs Team</span>
                </div>

                {/* H1 */}
                <h1 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(32px, 4.5vw, 56px)',
                  fontWeight: 800,
                  color: '#ffffff',
                  lineHeight: 1.07,
                  letterSpacing: '-0.025em',
                  marginBottom: 22,
                  maxWidth: 860,
                }}>
                  SEO for Security Companies:{' '}
                  <span style={{ color: '#7eb3ff' }}>The 2026 Playbook</span>
                </h1>

                {/* Excerpt */}
                <p style={{
                  fontSize: 'clamp(16px, 1.8vw, 19px)',
                  color: 'rgba(255,255,255,0.62)',
                  lineHeight: 1.68,
                  maxWidth: 720,
                  marginBottom: 34,
                }}>
                  A practical, channel-by-channel playbook for ranking a security business on Google in 2026 — from technical foundations to local, content and AI-visibility.
                </p>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <Link href="/contact/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 22px', background: 'var(--blue)', borderRadius: 12, fontSize: 14.5, color: '#fff', fontWeight: 600, fontFamily: 'var(--font-display)', textDecoration: 'none' }}>
                    Get a free audit →
                  </Link>
                  <Link href="/knowledge-hub/blogs/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '12px 18px', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 12, fontSize: 14, color: 'rgba(255,255,255,0.55)', background: 'rgba(255,255,255,0.05)', textDecoration: 'none' }}>
                    ← All articles
                  </Link>
                </div>
              </div>

              {/* Right: Hero image */}
              <div className="proto-hero-rank" style={{
                borderRadius: 20,
                overflow: 'hidden',
                boxShadow: '0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)',
                position: 'relative',
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/blog1.png"
                  alt="Security operations centre with CCTV monitoring screens"
                  style={{
                    width: '100%',
                    height: '100%',
                    minHeight: 320,
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, rgba(6,15,31,0.18) 0%, rgba(6,15,31,0.04) 100%)',
                  borderRadius: 20,
                }} />
              </div>
            </div>
          </div>

          {/* Bottom fade to white */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, background: 'linear-gradient(to bottom, transparent, #fff)', pointerEvents: 'none' }} />
        </div>


        {/* 
            MAIN BODY — Article + Sticky Sidebar
         */}
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '48px 32px 0' }} id="article-body">
          <div className="proto-article-grid">

            {/* 
                ARTICLE COLUMN
             */}
            <div>

              {/* TL;DR  */}
              <div id="tldr" style={{ border: '1px solid rgba(30,95,224,0.22)', borderLeft: '4px solid var(--blue)', background: 'rgba(30,95,224,0.045)', borderRadius: '0 16px 16px 0', padding: '22px 26px', marginBottom: 52 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 11.5, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--blue)', marginBottom: 14 }}>
                  TL;DR — What you will take away
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
                  {[
                    'Fix crawlability and Core Web Vitals before anything else — rankings cap out on sites Google can\'t properly crawl.',
                    'Map every keyword to one of three intent stages: research, comparison, or ready-to-buy — and build dedicated pages for each.',
                    'Google Business Profile optimisation and consistent NAP data remain the fastest local SEO win for installers.',
                    'E-E-A-T content and genuine authority signals compound over 4–9 months — there is no shortcut.',
                  ].map((item, i) => (
                    <li key={i} style={{ display: 'flex', gap: 12, fontSize: 15.5, color: 'var(--text-soft)', alignItems: 'flex-start', lineHeight: 1.6 }}>
                      <span style={{ color: 'var(--blue)', fontWeight: 800, fontSize: 15, flexShrink: 0, marginTop: 2 }}></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Intro  */}
              <p style={{ fontSize: 18.5, lineHeight: 1.78, color: 'var(--text)', marginBottom: 48, fontFamily: 'var(--font-body)', maxWidth: 860 }}>
                Security buyers research carefully before they call. Whether someone is comparing CCTV installers, access-control integrators or monitoring providers, most of that journey now happens in search — and increasingly inside AI assistants. This playbook walks through the SEO foundations that move a security business up the results, in the order we tackle them with clients.
              </p>


              {/*  SECTION 1: Technical Foundations  */}
              <section aria-labelledby="technical-foundations">
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(30,95,224,0.1)', border: '1px solid rgba(30,95,224,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></div>
                  <h2 id="technical-foundations" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(21px, 2.5vw, 28px)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.2, margin: 0 }}>
                    1. Fix the technical foundations first
                  </h2>
                </div>
                <p style={{ fontSize: 17, lineHeight: 1.78, color: 'var(--text-soft)', marginBottom: 26, maxWidth: 860 }}>
                  Rankings cap out fast on a site search engines struggle to crawl. Confirm the basics: HTTPS everywhere, a clean XML sitemap, a sensible robots.txt, fast Core Web Vitals, and mobile-first layouts. Resolve duplicate URLs and make sure every important page is actually indexed in Google Search Console.
                </p>

                {/* Technical checklist grid */}
                <div className="proto-2col-tech" style={{ marginBottom: 48 }}>
                  {[
                    { title: 'HTTPS everywhere', desc: 'All pages on secure connection — no mixed-content warnings or HTTP redirects.' },
                    { title: 'XML sitemap', desc: 'Clean, auto-updating sitemap submitted to Google Search Console.' },
                    { title: 'robots.txt', desc: 'Crawlable service pages, blocked duplicates, correct directives.' },
                    { title: 'Core Web Vitals', desc: 'LCP under 2.5s, FID under 100ms, CLS under 0.1 — tested on mobile.' },
                    { title: 'Mobile-first layout', desc: 'Fully responsive — Google indexes the mobile version of your site.' },
                    { title: 'GSC indexation', desc: 'All priority pages confirmed indexed; coverage errors resolved.' },
                  ].map((item) => (
                    <div key={item.title} style={{
                      border: '1px solid var(--line)',
                      borderRadius: 14,
                      padding: '16px 18px',
                      background: 'var(--bg-card)',
                      display: 'flex',
                      gap: 14,
                      alignItems: 'flex-start',
                      transition: 'border-color 0.15s ease',
                    }}>
                      <span style={{ flexShrink: 0, marginTop: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 22, height: 22, borderRadius: 6, background: 'rgba(30,95,224,0.1)' }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14.5, fontFamily: 'var(--font-display)', marginBottom: 5, color: 'var(--text)' }}>{item.title}</div>
                        <div style={{ fontSize: 13.5, color: 'var(--text-dim)', lineHeight: 1.5 }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section divider */}
              <div style={{ height: 1, background: 'var(--line)', margin: '0 0 48px' }} />

              {/*  SECTION 2: Keyword Intent  */}
              <section aria-labelledby="keyword-intent">
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(217,119,6,0.1)', border: '1px solid rgba(217,119,6,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg></div>
                  <h2 id="keyword-intent" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(21px, 2.5vw, 28px)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.2, margin: 0 }}>
                    2. Map keywords to buyer intent
                  </h2>
                </div>
                <p style={{ fontSize: 17, lineHeight: 1.78, color: 'var(--text-soft)', marginBottom: 28, maxWidth: 860 }}>
                  Group the terms your buyers use by intent: research ("how does monitored alarm work"), comparison ("best access control system Sydney"), and ready-to-buy ("CCTV installation quote"). Build a page for each high-intent theme rather than stuffing everything onto the homepage.
                </p>

                {/* 3-column intent cards */}
                <div className="proto-3col" style={{ marginBottom: 48 }}>
                  {[
                    {
                      stage: '01 — Research',
                      badge: 'Awareness',
                      iconBg: 'rgba(107,114,128,0.12)',
                      borderColor: 'rgba(107,114,128,0.25)',
                      bg: 'rgba(107,114,128,0.04)',
                      accent: '#6b7280',
                      accentBg: 'rgba(107,114,128,0.08)',
                      queries: ['"how does monitored alarm work"', '"CCTV for small business"', '"access control types explained"'],
                      pageType: 'Informational guides & blog posts',
                    },
                    {
                      stage: '02 — Comparison',
                      badge: 'Consideration',
                      iconBg: 'rgba(217,119,6,0.12)',
                      borderColor: 'rgba(217,119,6,0.28)',
                      bg: 'rgba(217,119,6,0.04)',
                      accent: '#d97706',
                      accentBg: 'rgba(217,119,6,0.08)',
                      queries: ['"best access control Sydney"', '"alarm vs monitored alarm"', '"CCTV installer reviews"'],
                      pageType: 'Comparison & service-area pages',
                    },
                    {
                      stage: '03 — Decision',
                      badge: 'Ready to buy',
                      iconBg: 'rgba(30,95,224,0.12)',
                      borderColor: 'rgba(30,95,224,0.28)',
                      bg: 'rgba(30,95,224,0.04)',
                      accent: 'var(--blue)',
                      accentBg: 'rgba(30,95,224,0.08)',
                      queries: ['"CCTV installation quote"', '"alarm company near me"', '"commercial security installer"'],
                      pageType: 'Service pages with clear CTA',
                    },
                  ].map((card) => (
                    <div key={card.stage} style={{ border: `1px solid ${card.borderColor}`, borderRadius: 16, padding: 20, background: card.bg, display: 'flex', flexDirection: 'column', gap: 0 }}>
                      {/* Header */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                        <span style={{ background: card.iconBg, borderRadius: 10, width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 15, color: card.accent }}>{card.stage.split(' — ')[0]}</span>
                        <div>
                          <div style={{ fontFamily: 'var(--font-display)', fontSize: 12.5, fontWeight: 700, color: card.accent }}>{card.stage}</div>
                          <div style={{ background: card.accentBg, color: card.accent, borderRadius: 999, padding: '2px 8px', fontSize: 11, fontWeight: 600, display: 'inline-block', marginTop: 3 }}>{card.badge}</div>
                        </div>
                      </div>
                      {/* Example queries */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 16, flex: 1 }}>
                        {card.queries.map((q) => (
                          <div key={q} style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--text-soft)', background: 'rgba(0,0,0,0.04)', borderRadius: 7, padding: '5px 9px', border: '1px solid rgba(0,0,0,0.07)' }}>{q}</div>
                        ))}
                      </div>
                      {/* Footer */}
                      <div style={{ borderTop: `1px solid ${card.borderColor}`, paddingTop: 12, fontSize: 12.5, color: card.accent, fontWeight: 600 }}>
                        → {card.pageType}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <div style={{ height: 1, background: 'var(--line)', margin: '0 0 48px' }} />

              {/*  SECTION 3: Local SEO  */}
              <section aria-labelledby="local-search">
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(22,163,74,0.1)', border: '1px solid rgba(22,163,74,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div>
                  <h2 id="local-search" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(21px, 2.5vw, 28px)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.2, margin: 0 }}>
                    3. Win local search
                  </h2>
                </div>
                <p style={{ fontSize: 17, lineHeight: 1.78, color: 'var(--text-soft)', marginBottom: 28, maxWidth: 860 }}>
                  For installers and service businesses, local is where the revenue is. Claim and complete your Google Business Profile, keep your name, address and phone (NAP) consistent across directories, and build location and service-area pages that genuinely describe the work you do in each area.
                </p>

                {/* 4-step process */}
                <div className="proto-4col" style={{ marginBottom: 22 }}>
                  {[
                    { step: '01', title: 'Google Business Profile', desc: 'Claim, complete every field, add real photos and keep hours current.' },
                    { step: '02', title: 'NAP Consistency', desc: 'Identical name, address and phone across your site, GBP and all directories.' },
                    { step: '03', title: 'Location Pages', desc: 'Real content for each service area — not thin doorway pages.' },
                    { step: '04', title: 'Genuine Reviews', desc: 'Ask satisfied customers for honest reviews. Never fabricate.' },
                  ].map((item, i) => (
                    <div key={item.step} style={{ border: '1px solid var(--line)', borderRadius: 14, padding: '18px 16px', background: 'var(--bg-card)', textAlign: 'center', position: 'relative' }}>
                      {i < 3 && (
                        <div style={{ display: 'none', position: 'absolute', right: -9, top: '50%', transform: 'translateY(-50%)', zIndex: 2, fontSize: 18, color: 'var(--text-dim)', background: '#fff', padding: '0 2px' }} className="proto-step-arrow">›</div>
                      )}
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--blue)', letterSpacing: '0.12em', marginBottom: 10 }}>{item.step}</div>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(30,95,224,0.08)', border: '1px solid rgba(30,95,224,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14, color: 'var(--blue)' }}>{item.step}</div>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13.5, marginBottom: 7, color: 'var(--text)' }}>{item.title}</div>
                      <div style={{ fontSize: 12.5, color: 'var(--text-dim)', lineHeight: 1.5 }}>{item.desc}</div>
                    </div>
                  ))}
                </div>

                {/* Pro tip callout */}
                <div style={{ border: '1px solid rgba(22,163,74,0.25)', borderLeft: '4px solid #16a34a', background: 'rgba(22,163,74,0.05)', borderRadius: '0 12px 12px 0', padding: '16px 20px', marginBottom: 48 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 11.5, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 7 }}> Pro Tip</div>
                  <p style={{ fontSize: 15, color: 'var(--text-soft)', margin: 0, lineHeight: 1.65 }}>
                    For multi-location businesses, create a separate GBP listing <em>and</em> a unique location page for each area you serve. Consolidated profiles rarely beat dedicated location entries in local pack results.
                  </p>
                </div>
              </section>

              <div style={{ height: 1, background: 'var(--line)', margin: '0 0 48px' }} />

              {/*  SECTION 4: Content & E-E-A-T  */}
              <section aria-labelledby="content-expertise">
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(30,95,224,0.1)', border: '1px solid rgba(30,95,224,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></div>
                  <h2 id="content-expertise" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(21px, 2.5vw, 28px)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.2, margin: 0 }}>
                    4. Publish content that demonstrates expertise
                  </h2>
                </div>
                <p style={{ fontSize: 17, lineHeight: 1.78, color: 'var(--text-soft)', marginBottom: 28, maxWidth: 860 }}>
                  Security is a high-trust, compliance-driven industry. Content that answers real buyer questions — standards, installation considerations, cost factors, maintenance — builds the E-E-A-T signals Google rewards and gives AI engines something credible to cite.
                </p>

                {/* Quote + Checklist */}
                <div className="proto-2col" style={{ marginBottom: 48 }}>
                  {/* Blockquote */}
                  <div style={{ border: '1px solid rgba(30,95,224,0.18)', borderLeft: '4px solid var(--blue)', background: 'rgba(30,95,224,0.04)', borderRadius: '0 14px 14px 0', padding: '22px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ fontSize: 40, color: 'rgba(30,95,224,0.25)', fontFamily: 'Georgia, serif', lineHeight: 1, marginBottom: 12 }}>"</div>
                    <p style={{ fontSize: 16, fontStyle: 'italic', color: 'var(--text)', lineHeight: 1.68, margin: '0 0 14px' }}>
                      Content that explains real-world security decisions — not just product specs — is what Google's E-E-A-T rewards and what AI assistants cite.
                    </p>
                    <div style={{ fontSize: 13, color: 'var(--text-dim)', fontWeight: 600 }}>— SecurityBlogs Editorial Team</div>
                  </div>

                  {/* E-E-A-T Checklist */}
                  <div style={{ border: '1px solid var(--line)', borderRadius: 14, padding: '20px 22px', background: 'var(--bg-card-2)' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-dim)', marginBottom: 14 }}>E-E-A-T Content Checklist</div>
                    {[
                      'Answers the specific questions buyers ask',
                      'References standards, codes and compliance',
                      'Explains real cost factors and ranges',
                      'Covers maintenance, aftercare and support',
                      'Written by — or attributed to — an industry expert',
                    ].map((item) => (
                      <div key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '9px 0', borderBottom: '1px solid var(--line)', fontSize: 14, color: 'var(--text-soft)', lineHeight: 1.45 }}>
                        <span style={{ color: '#16a34a', fontWeight: 800, fontSize: 16, flexShrink: 0, lineHeight: 1.4 }}></span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <div style={{ height: 1, background: 'var(--line)', margin: '0 0 48px' }} />

              {/*  SECTION 5: Authority  */}
              <section aria-labelledby="authority">
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
                  <h2 id="authority" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(21px, 2.5vw, 28px)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.2, margin: 0 }}>
                    5. Earn authority — don&apos;t buy it
                  </h2>
                </div>
                <p style={{ fontSize: 17, lineHeight: 1.78, color: 'var(--text-soft)', marginBottom: 24, maxWidth: 860 }}>
                  Relevant mentions and links from industry publications, associations and local press build trust. Guest articles, original research and genuinely useful tools attract these naturally. Avoid bought-link schemes — they put the whole domain at risk.
                </p>

                {/* Warning callout */}
                <div style={{ border: '1px solid rgba(220,38,38,0.22)', borderLeft: '4px solid #dc2626', background: 'rgba(220,38,38,0.04)', borderRadius: '0 12px 12px 0', padding: '16px 20px', marginBottom: 26 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 11.5, color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 7 }}> Avoid: Paid link networks</div>
                  <p style={{ fontSize: 15, color: 'var(--text-soft)', margin: 0, lineHeight: 1.65 }}>
                    Bought links violate Google's spam policies. A manual penalty can wipe months of ranking progress across the <em>entire domain</em> — not just the page the links pointed to. The risk is never worth it.
                  </p>
                </div>

                {/* 3 legitimate methods */}
                <div className="proto-3col" style={{ marginBottom: 48 }}>
                  {[
                    { title: 'Guest articles', desc: 'Original, vendor-neutral pieces published in security industry media and trade publications. Each article earns a contextual link and brand exposure.' },
                    { title: 'Original research', desc: 'Industry surveys, benchmark data or case studies that give other sites something genuinely worth citing — and that you own exclusively.' },
                    { title: 'Useful tools', desc: 'Calculators, compliance checklists, or specification guides that practitioners bookmark and share organically over time.' },
                  ].map((item) => (
                    <div key={item.title} style={{ border: '1px solid var(--line)', borderRadius: 14, padding: '20px 18px', background: 'var(--bg-card)' }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(30,95,224,0.08)', border: '1px solid rgba(30,95,224,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg></div>
                      <div style={{ fontWeight: 700, fontFamily: 'var(--font-display)', fontSize: 15.5, marginBottom: 8, color: 'var(--text)' }}>{item.title}</div>
                      <div style={{ fontSize: 13.5, color: 'var(--text-dim)', lineHeight: 1.58 }}>{item.desc}</div>
                    </div>
                  ))}
                </div>
              </section>

              <div style={{ height: 1, background: 'var(--line)', margin: '0 0 48px' }} />

              {/*  SECTION 6: Measurement  */}
              <section aria-labelledby="measurement">
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(22,163,74,0.1)', border: '1px solid rgba(22,163,74,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div>
                  <h2 id="measurement" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(21px, 2.5vw, 28px)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.2, margin: 0 }}>
                    6. Measure what matters
                  </h2>
                </div>
                <p style={{ fontSize: 17, lineHeight: 1.78, color: 'var(--text-soft)', marginBottom: 28, maxWidth: 860 }}>
                  Track impressions and positions in Search Console, not vanity metrics. Movement usually appears first as impressions, then improving positions, then clicks as you break onto page one. For a newer domain in a competitive niche, expect a 4–9 month climb.
                </p>

                {/* Measurement Journey — 3-stage panel */}
                <div style={{ border: '1px solid var(--line)', borderRadius: 18, overflow: 'hidden', marginBottom: 48 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
                    {[
                      {
                        num: '1',
                        phase: 'Month 1–3',
                        title: 'Impressions rise',
                        desc: 'Google indexes your pages. Impression counts climb in Search Console — your content is being surfaced, but clicks are still low as you rank below position 10.',
                        accent: '#6b7280',
                        bg: 'rgba(107,114,128,0.05)',
                        borderBottom: 'var(--line)',
                      },
                      {
                        num: '2',
                        phase: 'Month 3–6',
                        title: 'Positions improve',
                        desc: 'Pages move up from 20 → 10 → 5. Clicks begin to increase as you approach page one — especially for lower-competition long-tail terms.',
                        accent: '#d97706',
                        bg: 'rgba(217,119,6,0.05)',
                        borderBottom: 'var(--line)',
                      },
                      {
                        num: '3',
                        phase: 'Month 6–9+',
                        title: 'Clicks compound',
                        desc: 'Breaking into positions 1–3 drives significant click growth. This is where organic leads begin converting at volume — and where the investment pays off.',
                        accent: 'var(--blue)',
                        bg: 'rgba(30,95,224,0.06)',
                        borderBottom: 'none',
                      },
                    ].map((stage) => (
                      <div key={stage.num} style={{ padding: '24px 22px', background: stage.bg, borderRight: `1px solid var(--line)` }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                          <div style={{ width: 32, height: 32, borderRadius: 8, background: stage.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontFamily: 'var(--font-display)', fontSize: 14, flexShrink: 0 }}>{stage.num}</div>
                          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{stage.phase}</div>
                        </div>
                        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, color: stage.accent, marginBottom: 10 }}>{stage.title}</div>
                        <div style={{ fontSize: 13.5, color: 'var(--text-soft)', lineHeight: 1.6 }}>{stage.desc}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: '14px 22px', background: 'rgba(30,95,224,0.04)', borderTop: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 16 }}></span>
                    <span style={{ fontSize: 13.5, color: 'var(--text-soft)' }}>
                      <strong style={{ color: 'var(--text)' }}>Metric to own:</strong> Impressions are the leading indicator — they tell you Google is crawling and considering your pages before clicks confirm it.
                    </span>
                  </div>
                </div>
              </section>


              {/*  CTA Section (original content preserved)  */}
              <div style={{ border: '1px solid rgba(30,95,224,0.22)', borderRadius: 18, padding: 'clamp(24px, 4vw, 40px)', background: 'linear-gradient(135deg, rgba(30,95,224,0.06) 0%, rgba(30,95,224,0.02) 100%)', marginBottom: 56 }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(20px, 2.5vw, 26px)', color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.01em' }}>
                  Want help applying this to your security brand?
                </h2>
                <p style={{ fontSize: 16.5, color: 'var(--text-soft)', lineHeight: 1.65, maxWidth: 760, marginBottom: 24 }}>
                  SecurityBlogs builds SEO, AI-visibility and paid-search programs exclusively for the security industry — CCTV, access control, alarms, monitoring, locksmiths, fencing and more.{' '}
                  <Link href="/contact/" style={{ color: 'var(--blue)', textDecoration: 'underline', textDecorationColor: 'rgba(30,95,224,0.35)', textUnderlineOffset: '3px' }}>
                    Book a free visibility audit
                  </Link>{' '}
                  and we'll show you the highest-impact fixes for your site.
                </p>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <Link href="/contact/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 24px', background: 'var(--blue)', borderRadius: 12, fontSize: 15, color: '#fff', fontWeight: 600, fontFamily: 'var(--font-display)', textDecoration: 'none' }}>
                    Book free visibility audit →
                  </Link>
                  <Link href="/security-directory/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 20px', border: '1px solid var(--line)', borderRadius: 12, fontSize: 14.5, color: 'var(--text-soft)', textDecoration: 'none' }}>
                    Browse security directory
                  </Link>
                </div>
              </div>


              {/*  FAQ  */}
              <section aria-labelledby="faq">
                <h2 id="faq" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(21px, 2.5vw, 28px)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 28 }}>
                  Frequently asked questions
                </h2>

                {[
                  {
                    q: 'How long does SEO take for a security company?',
                    a: 'Most security companies see measurable improvement in impressions and rankings within 3–4 months of consistent effort. Competitive keywords — "CCTV installation Sydney" for example — typically take 6–9 months to reach page one. New domains may take longer to build the domain authority needed for short-tail terms.',
                  },
                  {
                    q: 'What is the most important SEO factor for security companies?',
                    a: 'For local service businesses, Google Business Profile optimisation and NAP consistency deliver the fastest visible return. For organic search, technical health — crawlability, Core Web Vitals — is the prerequisite without which even excellent content will underperform.',
                  },
                  {
                    q: 'Do security companies need a blog?',
                    a: 'Yes, but only if the content is genuinely useful to buyers. Thin, AI-generated, or duplicate content does more harm than no content at all. The goal is to answer the real questions buyers have before they enquire — installation costs, standards, comparisons, maintenance — and to demonstrate the expertise that earns E-E-A-T recognition.',
                  },
                  {
                    q: 'Is local SEO different for security companies?',
                    a: 'The mechanics are the same, but the competitive dynamics differ by niche. Alarm installers in capital cities face more competition than regional access-control specialists. The approach is identical — GBP, NAP, location pages, reviews — but the level of effort needed to reach the map pack varies significantly by geography and service type.',
                  },
                  {
                    q: 'Should security companies invest in SEO or Google Ads?',
                    a: 'Both serve different roles. Google Ads delivers leads immediately but stops when the budget does. SEO takes longer to build but compounds over time — a well-optimised page continues generating enquiries without ongoing spend. For most security businesses, Ads funds short-term growth while SEO builds long-term visibility.',
                  },
                ].map((item, i) => (
                  <details key={i} style={{ borderBottom: '1px solid var(--line)' }}>
                    <summary style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 16,
                      padding: '18px 0',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      fontSize: 16,
                      color: 'var(--text)',
                      listStyle: 'none',
                      userSelect: 'none',
                    }}>
                      <span>{item.q}</span>
                      <span className="proto-faq-icon" style={{ fontSize: 22, color: 'var(--blue)', flexShrink: 0, fontWeight: 300, lineHeight: 1, width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</span>
                    </summary>
                    <div style={{ paddingBottom: 20, paddingRight: 40 }}>
                      <p style={{ fontSize: 15.5, color: 'var(--text-soft)', lineHeight: 1.72, margin: 0 }}>{item.a}</p>
                    </div>
                  </details>
                ))}
              </section>


              {/*  Author Card  */}
              <div style={{
                marginTop: 52,
                padding: '24px 28px',
                borderRadius: 16,
                border: '1px solid var(--line)',
                background: 'var(--bg-card-2)',
                display: 'flex',
                gap: 18,
                alignItems: 'flex-start',
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--blue) 0%, #1742a8 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18,
                  flexShrink: 0,
                }}>
                  SB
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <div style={{ fontWeight: 700, fontFamily: 'var(--font-display)', fontSize: 16 }}>SecurityBlogs Team</div>
                    <span style={{ background: 'rgba(30,95,224,0.1)', color: 'var(--blue)', borderRadius: 999, padding: '2px 9px', fontSize: 11.5, fontWeight: 600, fontFamily: 'var(--font-mono)' }}>Author</span>
                  </div>
                  <div style={{ fontSize: 14.5, color: 'var(--text-dim)', lineHeight: 1.58, marginBottom: 10 }}>
                    We write practical, vendor-neutral guides on SEO, AI visibility and paid advertising for security industry brands in Australia. All articles are reviewed for accuracy before publication.
                  </div>
                  <Link href="/about-us/" style={{ fontSize: 13.5, color: 'var(--blue)', fontWeight: 600, textDecoration: 'none' }}>
                    About us →
                  </Link>
                </div>
              </div>

            </div>


            {/* 
                SIDEBAR
             */}
            <aside className="proto-sidebar">

              {/* Table of Contents */}
              <div style={{ padding: '20px 18px', border: '1px solid var(--line)', borderRadius: 14, background: 'var(--bg-card)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-dim)', marginBottom: 14 }}>On this page</div>
                <nav aria-label="Table of contents">
                  {[
                    { id: 'tldr', label: 'Key takeaways' },
                    { id: 'technical-foundations', label: '1. Technical foundations' },
                    { id: 'keyword-intent', label: '2. Keyword intent mapping' },
                    { id: 'local-search', label: '3. Win local search' },
                    { id: 'content-expertise', label: '4. Expert content' },
                    { id: 'authority', label: '5. Earn authority' },
                    { id: 'measurement', label: '6. Measure what matters' },
                    { id: 'faq', label: 'FAQ' },
                  ].map((item) => (
                    <a key={item.id} href={`#${item.id}`} className="proto-toc-link">{item.label}</a>
                  ))}
                </nav>
              </div>

              {/* CTA Widget */}
              <div style={{
                padding: '20px 18px',
                border: '1px solid rgba(30,95,224,0.22)',
                borderRadius: 14,
                background: 'linear-gradient(135deg, rgba(30,95,224,0.07) 0%, rgba(30,95,224,0.02) 100%)',
              }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15.5, color: 'var(--text)', marginBottom: 8 }}>Free Visibility Audit</div>
                <p style={{ fontSize: 13.5, color: 'var(--text-soft)', lineHeight: 1.58, marginBottom: 16 }}>
                  See exactly where your security brand is missing from Google and AI assistants — free, no obligation.
                </p>
                <Link href="/contact/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '11px 16px', background: 'var(--blue)', borderRadius: 10, color: '#fff', fontWeight: 600, fontSize: 14, fontFamily: 'var(--font-display)', textDecoration: 'none' }}>
                  Book free audit →
                </Link>
              </div>

              {/* Related Reads */}
              {(related.length > 0 ? related : allRelated).length > 0 && (
                <div style={{ padding: '20px 18px', border: '1px solid var(--line)', borderRadius: 14, background: 'var(--bg-card)' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-dim)', marginBottom: 16 }}>Related reads</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {(related.length > 0 ? related : allRelated).map((r) => (
                      <Link key={r.slug} href={`/knowledge-hub/blogs/${r.slug}/`} style={{ display: 'block', textDecoration: 'none', paddingBottom: 14, borderBottom: '1px solid var(--line)' }}>
                        <div style={{ fontSize: 11.5, color: 'var(--blue)', marginBottom: 4, fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{r.category} · {r.read}</div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', lineHeight: 1.38, fontFamily: 'var(--font-display)' }}>{r.title}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Directory Widget */}
              <div style={{ padding: '18px 18px', border: '1px solid var(--line)', borderRadius: 14, background: 'var(--bg-card)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-dim)', marginBottom: 10 }}>Security Directory</div>
                <p style={{ fontSize: 13.5, color: 'var(--text-soft)', lineHeight: 1.55, marginBottom: 12 }}>
                  Find and compare AI-verified security companies across Australia.
                </p>
                <Link href="/security-directory/" style={{ fontSize: 13.5, color: 'var(--blue)', fontWeight: 700, textDecoration: 'none' }}>
                  Browse directory →
                </Link>
              </div>

            </aside>
          </div>
        </div>


        {/* 
            RELATED POSTS — bottom grid (visible on mobile too)
         */}
        <section aria-label="More articles" style={{ maxWidth: 1440, margin: '0 auto', padding: '56px 24px 0' }}>
          <div style={{ marginBottom: 28, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--blue)', marginBottom: 8 }}>Keep reading</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(20px, 3vw, 28px)', color: 'var(--text)', letterSpacing: '-0.02em' }}>
                More from the Knowledge Hub
              </h2>
            </div>
            <Link href="/knowledge-hub/blogs/" style={{ fontSize: 14, color: 'var(--blue)', fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}>
              View all articles →
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20, paddingBottom: 64 }}>
            {(related.length > 0 ? related : allRelated).map((r) => (
              <Link
                key={r.slug}
                href={`/knowledge-hub/blogs/${r.slug}/`}
                style={{
                  display: 'block',
                  border: '1px solid var(--line)',
                  borderRadius: 18,
                  padding: 24,
                  background: 'var(--bg-card)',
                  textDecoration: 'none',
                  transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <span style={{ background: 'rgba(30,95,224,0.08)', color: 'var(--blue)', border: '1px solid rgba(30,95,224,0.2)', borderRadius: 999, padding: '4px 12px', fontSize: 11.5, fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                    {r.category}
                  </span>
                  <span style={{ fontSize: 12, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>{r.read}</span>
                </div>
                <div style={{ fontWeight: 700, fontFamily: 'var(--font-display)', fontSize: 16.5, lineHeight: 1.3, marginBottom: 10, color: 'var(--text)', letterSpacing: '-0.01em' }}>
                  {r.title}
                </div>
                <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.58, margin: '0 0 16px' }}>
                  {r.excerpt.substring(0, 110)}…
                </p>
                <div style={{ fontSize: 13.5, color: 'var(--blue)', fontWeight: 600 }}>Read article →</div>
              </Link>
            ))}
          </div>
        </section>

      </article>
    </>
  )
}
