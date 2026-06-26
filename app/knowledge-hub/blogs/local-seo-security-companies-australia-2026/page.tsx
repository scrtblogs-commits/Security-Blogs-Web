import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import BlogReadingProgress from '@/components/ui/BlogReadingProgress'
import { posts } from '@/lib/posts'

const SLUG = 'local-seo-security-companies-australia-2026'

export const metadata: Metadata = {
  title: 'Local SEO for Security Companies in Australia: The 2026 Guide | SecurityBlogs',
  description:
    'A complete local SEO guide for Australian security companies — Google Business Profile mastery, service-area pages, NAP consistency, reviews and local schema that win the map pack.',
  alternates: { canonical: `/knowledge-hub/blogs/${SLUG}/` },
  openGraph: {
    title: 'Local SEO for Security Companies in Australia: The 2026 Guide | SecurityBlogs',
    description:
      'A complete local SEO guide for Australian security companies — Google Business Profile mastery, service-area pages, NAP consistency, reviews and local schema that win the map pack.',
    url: `/knowledge-hub/blogs/${SLUG}/`,
    siteName: 'SecurityBlogs',
    type: 'article',
    publishedTime: '2026-06-22',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Local SEO for Security Companies in Australia: The 2026 Guide',
  description: 'A complete local SEO guide for Australian security companies — Google Business Profile mastery, service-area pages, NAP consistency, reviews and local schema that win the map pack.',
  datePublished: '2026-06-22',
  dateModified: '2026-06-22',
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
      name: 'How do I get my security business to appear on Google Maps in Australia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'To appear on Google Maps, claim and verify your Google Business Profile at business.google.com. Choose the most accurate primary category (e.g. "Security System Supplier", "Security Guard Service"), complete every field — service area, hours, description, services — and upload genuine photos. Consistent NAP details across your website and key directories (Yellow Pages, True Local, StartLocal), combined with a steady stream of genuine customer reviews, are the strongest signals for map pack visibility.',
      },
    },
    {
      '@type': 'Question',
      name: 'What Google Business Profile category should a security company choose in Australia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Choose the primary category that most accurately describes your main service. Common options include: "Security System Supplier" or "Security System Installer" for CCTV and alarm businesses; "Security Guard Service" for guarding and patrol; "Locksmith" for locksmithing; "Home Security Company" for residential alarm providers. You can add secondary categories to cover additional services. Accuracy matters more than breadth — the primary category is the strongest local ranking signal.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need a physical address to rank locally in Australia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For service-area businesses (those that travel to customers rather than receiving them at a shopfront), Google allows you to hide your physical address and define a service area instead. You can still appear in local results and the map pack without a visible address. However, having a real, verified physical address — even a small office — generally provides stronger local ranking signals than a service-area-only profile.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many Google reviews does a security company need to rank in the map pack?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'There is no fixed number, and Google has not confirmed a threshold. In competitive markets like Sydney or Melbourne, map pack leaders often have 20–100+ reviews. In regional areas, 10–20 genuine reviews can be sufficient. More important than volume is recency and velocity — a steady flow of new reviews signals an active business. Response rate (replying to reviews) is also a positive engagement signal. Focus on earning honest reviews consistently rather than chasing a specific number.',
      },
    },
  ],
}

export default function LocalSeoAustraliaPage() {
  const related = posts
    .filter((p) => p.slug !== SLUG && p.category === 'SEO')
    .slice(0, 3)

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema} />
      <BlogReadingProgress />

      <style>{`
        .lseo-hero-grid { display: grid; grid-template-columns: 1fr minmax(0, 380px); gap: 56px; align-items: center; }
        .lseo-article-grid { display: grid; grid-template-columns: minmax(0, 1fr) 300px; gap: 56px; align-items: start; }
        .lseo-3col { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .lseo-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .lseo-check-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 14px; }
        .lseo-sidebar { display: flex; flex-direction: column; gap: 18px; position: sticky; top: 96px; }
        .lseo-toc-link { display: block; font-size: 13.5px; padding: 7px 10px; border-radius: 8px; color: var(--text-dim); border-left: 2px solid transparent; line-height: 1.4; transition: all 0.15s ease; text-decoration: none; }
        .lseo-toc-link:hover { color: var(--blue); background: rgba(30,95,224,0.07); border-left-color: var(--blue); }
        details summary::-webkit-details-marker { display: none; }
        details[open] summary .lseo-faq-icon { transform: rotate(45deg); }
        .lseo-faq-icon { transition: transform 0.2s ease; display: inline-block; }
        @media (max-width: 1024px) {
          .lseo-hero-grid { grid-template-columns: 1fr; }
          .lseo-hero-card { display: none !important; }
        }
        @media (max-width: 900px) {
          .lseo-article-grid { grid-template-columns: 1fr; }
          .lseo-sidebar { position: static; display: none; }
          .lseo-3col { grid-template-columns: 1fr; }
          .lseo-2col { grid-template-columns: 1fr; }
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
          <div style={{ position: 'absolute', top: '-10%', left: '20%', width: 550, height: 550, borderRadius: '50%', background: 'radial-gradient(circle, rgba(30,158,117,0.12) 0%, transparent 65%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '0', right: '8%', width: 380, height: 380, borderRadius: '50%', background: 'radial-gradient(circle, rgba(30,95,224,0.1) 0%, transparent 65%)', pointerEvents: 'none' }} />

          <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 24px 64px', position: 'relative', zIndex: 1 }}>
            <div className="lseo-hero-grid">
              <div>
                <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'rgba(255,255,255,0.38)', marginBottom: 26, flexWrap: 'wrap' }}>
                  <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
                  <span>/</span>
                  <Link href="/knowledge-hub/" style={{ color: 'inherit', textDecoration: 'none' }}>Knowledge Hub</Link>
                  <span>/</span>
                  <Link href="/knowledge-hub/blogs/" style={{ color: 'inherit', textDecoration: 'none' }}>Blog</Link>
                  <span>/</span>
                  <span style={{ color: 'rgba(255,255,255,0.65)' }}>Local SEO Australia</span>
                </nav>

                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 26 }}>
                  <span style={{ background: 'rgba(30,95,224,0.22)', color: '#7eb3ff', border: '1px solid rgba(30,95,224,0.35)', borderRadius: 999, padding: '4px 14px', fontSize: 12, fontWeight: 700, letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>SEO</span>
                  <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13 }}>22 June 2026</span>
                  <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
                  <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13 }}>11 min read</span>
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
                  Local SEO for Security Companies{' '}
                  <span style={{ color: '#7eb3ff' }}>in Australia</span>:{' '}
                  The 2026 Guide
                </h1>

                <p style={{ fontSize: 'clamp(16px, 1.8vw, 19px)', color: 'rgba(255,255,255,0.62)', lineHeight: 1.68, maxWidth: 720, marginBottom: 34 }}>
                  The complete playbook for winning the Google map pack and local results as a security installer or service business in Australia — Google Business Profile, service-area pages, NAP, reviews and schema.
                </p>

                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <Link href="/contact/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 22px', background: 'var(--blue)', borderRadius: 12, fontSize: 14.5, color: '#fff', fontWeight: 600, fontFamily: 'var(--font-display)', textDecoration: 'none' }}>
                    Get a free local SEO audit →
                  </Link>
                  <Link href="/knowledge-hub/blogs/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '12px 18px', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 12, fontSize: 14, color: 'rgba(255,255,255,0.55)', background: 'rgba(255,255,255,0.05)', textDecoration: 'none' }}>
                    ← All articles
                  </Link>
                </div>
              </div>

              {/* Right card */}
              <div className="lseo-hero-card" style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 20,
                padding: 28,
                backdropFilter: 'blur(16px)',
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 16 }}>
                  Local SEO Priority Checklist
                </div>
                {[
                  { label: 'Google Business Profile verified', done: true },
                  { label: 'Primary category accurate', done: true },
                  { label: 'Service area pages published', done: false },
                  { label: 'NAP consistent across 10+ directories', done: false },
                  { label: '15+ genuine Google reviews', done: false },
                  { label: 'LocalBusiness schema on site', done: false },
                  { label: 'Responding to all reviews', done: false },
                ].map((item) => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <div style={{ width: 18, height: 18, borderRadius: 5, border: `2px solid ${item.done ? '#10b981' : 'rgba(255,255,255,0.25)'}`, background: item.done ? 'rgba(16,185,129,0.2)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {item.done && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                    </div>
                    <span style={{ fontSize: 13.5, color: item.done ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.45)' }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, background: 'linear-gradient(to bottom, transparent, #fff)', pointerEvents: 'none' }} />
        </div>

        {/* ── Body ── */}
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '48px 32px 0' }} id="article-body">
          <div className="lseo-article-grid">
            <div>
              {/* TL;DR */}
              <div style={{ border: '1px solid rgba(16,185,129,0.22)', borderLeft: '4px solid #10b981', background: 'rgba(16,185,129,0.04)', borderRadius: '0 16px 16px 0', padding: '22px 26px', marginBottom: 52 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 11.5, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#10b981', marginBottom: 14 }}>TL;DR — What you will take away</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
                  {[
                    'Google Business Profile optimisation is the single highest-ROI local SEO action for Australian security installers.',
                    'NAP consistency across directories matters because AI engines and Google cross-reference your details to verify your entity.',
                    'Genuine service-area pages — not thin doorway pages — win "[service] in [suburb]" queries.',
                    'Review velocity (steady new reviews) outperforms a single burst of reviews gathered years ago.',
                  ].map((item, i) => (
                    <li key={i} style={{ display: 'flex', gap: 12, fontSize: 15.5, color: 'var(--text-soft)', alignItems: 'flex-start', lineHeight: 1.6 }}>
                      <span style={{ color: '#10b981', fontWeight: 800, fontSize: 15, flexShrink: 0, marginTop: 2 }}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Intro */}
              <p style={{ fontSize: 18.5, lineHeight: 1.78, color: 'var(--text)', marginBottom: 48, maxWidth: 860 }}>
                Most security installations are local jobs. A buyer in Parramatta looking for an alarm installer is not comparing national brands — they are searching locally. Local SEO is how your business appears when they do. Done well, it drives a consistent flow of qualified local enquiries without any per-click cost once the foundations are set.
              </p>

              {/* Section 1: GBP */}
              <section aria-labelledby="gbp-mastery">
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(30,95,224,0.1)', border: '1px solid rgba(30,95,224,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <h2 id="gbp-mastery" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(21px, 2.5vw, 28px)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.2, margin: 0 }}>
                    1. Google Business Profile — the map pack foundation
                  </h2>
                </div>
                <p style={{ fontSize: 17, lineHeight: 1.78, color: 'var(--text-soft)', marginBottom: 26, maxWidth: 860 }}>
                  Your Google Business Profile (GBP) is the primary local signal Google uses to match your business to nearby searches. An incomplete or neglected GBP is the single most common reason security businesses miss the map pack — often outranked by competitors with weaker websites but better-maintained profiles.
                </p>

                <div className="lseo-check-grid" style={{ marginBottom: 32 }}>
                  {[
                    { title: 'Verify ownership', desc: 'Claim and verify via Google — phone, postcard or video verification. Unverified profiles have no map-pack eligibility.' },
                    { title: 'Accurate primary category', desc: 'Choose the most specific category that describes your main service (e.g. "Security System Installer", not just "Business Service").' },
                    { title: 'Add secondary categories', desc: 'Cover your additional services — CCTV, access control, guarding — with secondary categories to appear in more searches.' },
                    { title: 'Complete service list', desc: 'Add every service you offer with descriptions. These feed search matching and help buyers understand your offer at a glance.' },
                    { title: 'Real photos', desc: 'Genuine team, vehicle and installation photos build trust and engagement. Update regularly.' },
                    { title: 'Service area settings', desc: 'If you travel to customers, add your service areas rather than hiding your address — this expands your local footprint.' },
                  ].map((item) => (
                    <div key={item.title} style={{ border: '1px solid var(--line)', borderRadius: 14, padding: '16px 18px', background: 'var(--bg-card)', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      <span style={{ flexShrink: 0, marginTop: 3, width: 22, height: 22, borderRadius: 6, background: 'rgba(30,95,224,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </span>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14.5, fontFamily: 'var(--font-display)', marginBottom: 5, color: 'var(--text)' }}>{item.title}</div>
                        <div style={{ fontSize: 13.5, color: 'var(--text-dim)', lineHeight: 1.5 }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* GBP posts tip */}
                <div style={{ border: '1px solid rgba(30,95,224,0.22)', borderLeft: '4px solid var(--blue)', background: 'rgba(30,95,224,0.045)', borderRadius: '0 12px 12px 0', padding: '16px 20px', marginBottom: 48 }}>
                  <strong style={{ fontSize: 14.5, color: 'var(--text)' }}>GBP Posts: </strong>
                  <span style={{ fontSize: 14.5, color: 'var(--text-soft)' }}>Use GBP Posts monthly to share updates, promotions and completed jobs. Activity signals to Google that your business is live and engaged — a consistent positive local ranking factor.</span>
                </div>
              </section>

              <div style={{ height: 1, background: 'var(--line)', margin: '0 0 48px' }} />

              {/* Section 2: Service area pages */}
              <section aria-labelledby="service-area-pages">
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  </div>
                  <h2 id="service-area-pages" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(21px, 2.5vw, 28px)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.2, margin: 0 }}>
                    2. Service-area pages that actually rank
                  </h2>
                </div>
                <p style={{ fontSize: 17, lineHeight: 1.78, color: 'var(--text-soft)', marginBottom: 26, maxWidth: 860 }}>
                  Service-area pages target queries like "CCTV installation Penrith" or "commercial alarm system installer Geelong". Done well, each page ranks independently for its local query. Done poorly, they are near-identical templates Google treats as thin, low-value content.
                </p>

                {/* Good vs bad */}
                <div className="lseo-2col" style={{ marginBottom: 32 }}>
                  <div style={{ border: '1px solid rgba(239,68,68,0.3)', borderRadius: 14, padding: '18px 20px', background: 'rgba(239,68,68,0.04)' }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#ef4444', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>❌ Thin doorway page</div>
                    {[
                      'Title tag: "CCTV Installation [City] | ABC Security"',
                      'Content: homepage copy with city name swapped in',
                      'No local context, no area-specific detail',
                      'Duplicated across 50 suburbs',
                    ].map((p, i) => (
                      <div key={i} style={{ fontSize: 13.5, color: 'var(--text-dim)', marginBottom: 7, paddingLeft: 14, borderLeft: '2px solid rgba(239,68,68,0.3)' }}>{p}</div>
                    ))}
                  </div>
                  <div style={{ border: '1px solid rgba(16,185,129,0.3)', borderRadius: 14, padding: '18px 20px', background: 'rgba(16,185,129,0.04)' }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#10b981', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>✅ Genuinely useful page</div>
                    {[
                      'Describes the actual work done in that area',
                      'Mentions local considerations (building types, regulations)',
                      'Local-specific testimonial or job example',
                      'Links to related suburb and service pages',
                    ].map((p, i) => (
                      <div key={i} style={{ fontSize: 13.5, color: 'var(--text-dim)', marginBottom: 7, paddingLeft: 14, borderLeft: '2px solid rgba(16,185,129,0.3)' }}>{p}</div>
                    ))}
                  </div>
                </div>

                <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--text-soft)', marginBottom: 48, maxWidth: 860 }}>
                  Start with your highest-value areas and build genuine pages. Ten real, useful pages outperform fifty thin ones — and they will not trigger spam filters.
                </p>
              </section>

              <div style={{ height: 1, background: 'var(--line)', margin: '0 0 48px' }} />

              {/* Section 3: NAP */}
              <section aria-labelledby="nap-consistency">
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.08 3.4 2 2 0 0 1 3.05 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z"/></svg>
                  </div>
                  <h2 id="nap-consistency" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(21px, 2.5vw, 28px)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.2, margin: 0 }}>
                    3. NAP consistency — name, address, phone
                  </h2>
                </div>
                <p style={{ fontSize: 17, lineHeight: 1.78, color: 'var(--text-soft)', marginBottom: 26, maxWidth: 860 }}>
                  Google and AI engines verify your identity by cross-referencing your business details across multiple sources. If your name, address or phone number varies between your website, GBP and directories, that inconsistency weakens both your local rankings and your entity signals.
                </p>

                {/* AU directories table */}
                <div style={{ border: '1px solid var(--line)', borderRadius: 14, overflow: 'hidden', marginBottom: 32 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: 'var(--bg-card-2)' }}>
                        {['Directory', 'Priority for security', 'Notes'].map((h) => (
                          <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 13, fontWeight: 700, color: 'var(--text)', borderBottom: '1px solid var(--line)' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Google Business Profile', 'Essential', 'The primary local entity signal — must be verified and complete'],
                        ['Yellow Pages (yellowpages.com.au)', 'Essential', 'High-authority AU directory; widely scraped by AI engines'],
                        ['True Local', 'High', 'AU-specific, well-indexed; strong for local service businesses'],
                        ['Bing Places', 'High', 'Powers Bing Maps and Copilot local recommendations'],
                        ['StartLocal', 'Medium', 'AU local directory with good domain authority'],
                        ['HiPages', 'Medium', 'Tradespeople directory; relevant for installers'],
                        ['LinkedIn Company Page', 'High', 'B2B entity signal; Microsoft/Copilot data source'],
                        ['Industry associations (e.g. ASIAL)', 'High', 'Security-specific trust signal; AI engines weight these'],
                      ].map(([dir, priority, note], i) => (
                        <tr key={i} style={{ borderBottom: '1px solid var(--line)' }}>
                          <td style={{ padding: '11px 16px', fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{dir}</td>
                          <td style={{ padding: '11px 16px', fontSize: 14 }}>
                            <span style={{ color: priority === 'Essential' ? '#10b981' : priority === 'High' ? '#1e5fe0' : '#f59e0b', fontWeight: 600 }}>{priority}</span>
                          </td>
                          <td style={{ padding: '11px 16px', fontSize: 13.5, color: 'var(--text-dim)' }}>{note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ fontSize: 15, color: 'var(--text-soft)', lineHeight: 1.65, marginBottom: 48, maxWidth: 860 }}>
                  Use exactly the same legal business name, full address format and phone number (including the area code) on every listing. Even small variations — "St" vs "Street", mobile vs landline as primary — can dilute the signal.
                </p>
              </section>

              <div style={{ height: 1, background: 'var(--line)', margin: '0 0 48px' }} />

              {/* Section 4: Reviews */}
              <section aria-labelledby="reviews-strategy">
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  </div>
                  <h2 id="reviews-strategy" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(21px, 2.5vw, 28px)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.2, margin: 0 }}>
                    4. Reviews — the honest way to build local trust
                  </h2>
                </div>
                <p style={{ fontSize: 17, lineHeight: 1.78, color: 'var(--text-soft)', marginBottom: 26, maxWidth: 860 }}>
                  Reviews influence both local rankings and buyer decisions. Google uses review count, rating and recency as local signals. In the security industry — where buyers are making trust-sensitive decisions — genuine reviews from real customers carry exceptional weight. Never fabricate or incentivise reviews: it breaches Google's terms, the Australian Consumer Law and platforms' policies.
                </p>

                <div className="lseo-3col" style={{ marginBottom: 48 }}>
                  {[
                    {
                      stage: 'Ask at the right moment',
                      color: '#1e5fe0',
                      bg: 'rgba(30,95,224,0.05)',
                      border: 'rgba(30,95,224,0.2)',
                      desc: 'Request a review at job completion — when the customer is satisfied and the experience is fresh. Make it easy with a short link directly to your GBP review page.',
                    },
                    {
                      stage: 'Maintain steady velocity',
                      color: '#10b981',
                      bg: 'rgba(16,185,129,0.05)',
                      border: 'rgba(16,185,129,0.2)',
                      desc: 'A consistent trickle of new reviews signals an active business. A burst of 30 reviews in one week followed by silence can look suspicious to both Google and buyers.',
                    },
                    {
                      stage: 'Respond to everything',
                      color: '#f59e0b',
                      bg: 'rgba(245,158,11,0.05)',
                      border: 'rgba(245,158,11,0.2)',
                      desc: 'Thank positive reviewers. Respond calmly to negative ones — take the conversation offline where appropriate. Unresponded reviews show a disengaged business.',
                    },
                  ].map((c) => (
                    <div key={c.stage} style={{ border: `1px solid ${c.border}`, borderRadius: 16, padding: '20px 18px', background: c.bg }}>
                      <div style={{ fontWeight: 700, fontSize: 15, fontFamily: 'var(--font-display)', color: c.color, marginBottom: 10 }}>{c.stage}</div>
                      <p style={{ fontSize: 13.5, color: 'var(--text-soft)', lineHeight: 1.6, margin: 0 }}>{c.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              <div style={{ height: 1, background: 'var(--line)', margin: '0 0 48px' }} />

              {/* Section 5: Local schema */}
              <section aria-labelledby="local-schema">
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(99,57,224,0.1)', border: '1px solid rgba(99,57,224,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6339e0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                  </div>
                  <h2 id="local-schema" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(21px, 2.5vw, 28px)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.2, margin: 0 }}>
                    5. Local schema markup for Australian security businesses
                  </h2>
                </div>
                <p style={{ fontSize: 17, lineHeight: 1.78, color: 'var(--text-soft)', marginBottom: 26, maxWidth: 860 }}>
                  Schema markup makes your business identity machine-readable — used by Google for rich results and by AI engines during retrieval. LocalBusiness schema on your homepage is the most important single technical local SEO action most security websites are missing.
                </p>

                {/* Schema snippet example */}
                <div style={{ border: '1px solid rgba(99,57,224,0.25)', borderRadius: 14, overflow: 'hidden', marginBottom: 32 }}>
                  <div style={{ background: 'rgba(99,57,224,0.08)', padding: '10px 16px', borderBottom: '1px solid rgba(99,57,224,0.15)', fontSize: 12, fontWeight: 700, color: '#6339e0', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    LocalBusiness schema — key fields for security companies
                  </div>
                  <div style={{ padding: '16px 18px', fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.8, color: 'var(--text-soft)', overflowX: 'auto' }}>
                    <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{`{
  "@type": "LocalBusiness",
  "name": "Your Security Company Name",
  "description": "One clear sentence about what you do",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Example St",
    "addressLocality": "Sydney",
    "addressRegion": "NSW",
    "postalCode": "2000",
    "addressCountry": "AU"
  },
  "telephone": "+61-X-XXXX-XXXX",
  "areaServed": ["Sydney", "Parramatta", "Liverpool"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Security Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "CCTV Installation" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Alarm Systems" } }
    ]
  }
}`}</pre>
                  </div>
                </div>
                <p style={{ fontSize: 15, color: 'var(--text-soft)', lineHeight: 1.65, marginBottom: 48, maxWidth: 860 }}>
                  Keep every field accurate and consistent with your GBP. The <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13.5, background: 'var(--bg-card-2)', padding: '1px 6px', borderRadius: 4 }}>areaServed</code> field specifically helps AI engines connect your brand to location-based queries.
                </p>
              </section>

              <div style={{ height: 1, background: 'var(--line)', margin: '0 0 48px' }} />

              {/* Section 6: Tracking */}
              <section aria-labelledby="tracking-local">
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(30,95,224,0.1)', border: '1px solid rgba(30,95,224,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                  </div>
                  <h2 id="tracking-local" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(21px, 2.5vw, 28px)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.2, margin: 0 }}>
                    6. Tracking local SEO performance
                  </h2>
                </div>
                <p style={{ fontSize: 17, lineHeight: 1.78, color: 'var(--text-soft)', marginBottom: 26, maxWidth: 860 }}>
                  Local SEO progress is measured differently from organic rankings. The metrics that matter most are GBP-specific — and free.
                </p>
                <div className="lseo-2col" style={{ marginBottom: 48 }}>
                  {[
                    {
                      label: 'GBP Insights',
                      items: ['Searches (how many found you via GBP)', 'Calls and direction requests — the real conversion metrics', 'Photo views and profile completion score'],
                    },
                    {
                      label: 'Google Search Console',
                      items: ['Clicks and impressions for local queries', 'Position for "[service] [suburb]" terms', 'Click-through rate by query — spot opportunities to improve titles'],
                    },
                  ].map((col) => (
                    <div key={col.label} style={{ border: '1px solid var(--line)', borderRadius: 14, padding: '18px 20px', background: 'var(--bg-card)' }}>
                      <div style={{ fontWeight: 700, fontSize: 15, fontFamily: 'var(--font-display)', color: 'var(--blue)', marginBottom: 12 }}>{col.label}</div>
                      {col.items.map((item) => (
                        <div key={item} style={{ display: 'flex', gap: 10, marginBottom: 8, fontSize: 14, color: 'var(--text-soft)', lineHeight: 1.5 }}>
                          <span style={{ color: 'var(--blue)', fontWeight: 700, flexShrink: 0 }}>→</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </section>

              {/* CTA */}
              <div style={{ marginTop: 56, padding: '28px 32px', borderRadius: 16, background: 'linear-gradient(135deg, rgba(16,185,129,0.06) 0%, rgba(30,95,224,0.04) 100%)', border: '1px solid rgba(16,185,129,0.2)' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: 'var(--text)', marginBottom: 10 }}>
                  Not sure where to start on local SEO?
                </h2>
                <p style={{ fontSize: 15, color: 'var(--text-soft)', marginBottom: 18, lineHeight: 1.6 }}>
                  SecurityBlogs audits your local SEO foundations — GBP, NAP, service-area pages and schema — and builds a prioritised plan for Australian security businesses.
                </p>
                <Link href="/contact/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 22px', background: '#10b981', borderRadius: 12, fontSize: 14.5, color: '#fff', fontWeight: 600, fontFamily: 'var(--font-display)', textDecoration: 'none' }}>
                  Book a free local SEO audit →
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
                      q: 'How do I get my security business to appear on Google Maps in Australia?',
                      a: 'Claim and verify your Google Business Profile at business.google.com. Choose the most accurate primary category (e.g. "Security System Supplier", "Security Guard Service"), complete every field — service area, hours, description, services — and upload genuine photos. Consistent NAP details across your website and key directories (Yellow Pages, True Local, StartLocal), combined with a steady stream of genuine customer reviews, are the strongest signals for map pack visibility.',
                    },
                    {
                      q: 'What Google Business Profile category should a security company choose in Australia?',
                      a: 'Choose the primary category that most accurately describes your main service. Common options include: "Security System Supplier" or "Security System Installer" for CCTV and alarm businesses; "Security Guard Service" for guarding and patrol; "Locksmith" for locksmithing; "Home Security Company" for residential alarm providers. You can add secondary categories to cover additional services. Accuracy matters more than breadth — the primary category is the strongest local ranking signal.',
                    },
                    {
                      q: 'Do I need a physical address to rank locally in Australia?',
                      a: 'For service-area businesses that travel to customers, Google allows you to hide your physical address and define a service area instead. You can still appear in local results and the map pack without a visible address. However, having a real, verified physical address generally provides stronger local ranking signals than a service-area-only profile.',
                    },
                    {
                      q: 'How many Google reviews does a security company need to rank in the map pack?',
                      a: 'In competitive markets like Sydney or Melbourne, map pack leaders often have 20–100+ reviews. In regional areas, 10–20 genuine reviews can be sufficient. More important than volume is recency and velocity — a steady flow of new reviews signals an active business. Focus on earning honest reviews consistently rather than chasing a specific number.',
                    },
                  ].map((item, i) => (
                    <details key={i} style={{ border: '1px solid var(--line)', borderRadius: 14, overflow: 'hidden' }}>
                      <summary style={{ padding: '16px 20px', fontWeight: 600, fontSize: 15.5, color: 'var(--text)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', listStyle: 'none', userSelect: 'none' }}>
                        {item.q}
                        <span className="lseo-faq-icon" style={{ fontSize: 18, color: 'var(--blue)', marginLeft: 12, flexShrink: 0 }}>+</span>
                      </summary>
                      <div style={{ padding: '0 20px 18px', fontSize: 15, color: 'var(--text-soft)', lineHeight: 1.7 }}>{item.a}</div>
                    </details>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="lseo-sidebar">
              <div style={{ border: '1px solid var(--line)', borderRadius: 16, padding: '18px 16px', background: 'var(--bg-card)' }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 14 }}>In this guide</div>
                {[
                  { id: 'gbp-mastery', label: '1. Google Business Profile' },
                  { id: 'service-area-pages', label: '2. Service-area pages' },
                  { id: 'nap-consistency', label: '3. NAP consistency' },
                  { id: 'reviews-strategy', label: '4. Reviews strategy' },
                  { id: 'local-schema', label: '5. Local schema markup' },
                  { id: 'tracking-local', label: '6. Tracking performance' },
                  { id: 'faq', label: 'FAQ' },
                ].map((item) => (
                  <a key={item.id} href={`#${item.id}`} className="lseo-toc-link">{item.label}</a>
                ))}
              </div>

              <div style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(30,95,224,0.04) 100%)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 16, padding: '18px 16px' }}>
                <div style={{ fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-display)', marginBottom: 10 }}>Free Local SEO Audit</div>
                <p style={{ fontSize: 13.5, color: 'var(--text-soft)', marginBottom: 14, lineHeight: 1.55 }}>Find out exactly what is holding your security business back from the map pack.</p>
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
