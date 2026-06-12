import type { Metadata } from 'next'
import Link from 'next/link'
import HeroBg from '@/components/ui/HeroBg'
import MagneticButton from '@/components/ui/MagneticButton'
import MarqueeStrip from '@/components/ui/MarqueeStrip'
import SectionHead from '@/components/ui/SectionHead'
import StatsStrip from '@/components/ui/StatsStrip'
import CTABand from '@/components/ui/CTABand'
import FAQAccordion from '@/components/ui/FAQAccordion'
import Reveal from '@/components/ui/Reveal'
import JsonLd from '@/components/JsonLd'
import { stats, services } from '@/lib/site'
import { siteConfig } from '@/lib/siteConfig'
import { faqSchema, webPageSchema, itemListSchema } from '@/lib/schema'
import HeroDashboardCard from './HeroDashboardCard'
import { DynamicAIScore, DynamicScrollStack, DynamicTestimonials, DynamicLocalCheck } from './DynamicSections'

export const metadata: Metadata = {
  title: 'Security Blogs Australia | SEO, AEO & AI Visibility for Security Companies',
  description:
    'Security Blogs Australia helps security companies grow with SEO, AEO, GEO, AI Visibility, Guest Posting and Digital Marketing services.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Security Blogs Australia | SEO, AEO & AI Visibility for Security Companies',
    description:
      'Security Blogs Australia helps security companies grow with SEO, AEO, GEO, AI Visibility, Guest Posting and Digital Marketing services.',
    url: '/',
    siteName: 'SecurityBlogs Australia',
    type: 'website',
    locale: 'en_AU',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'SecurityBlogs Australia — AI Visibility & SEO for Security Companies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Security Blogs Australia | SEO, AEO & AI Visibility for Security Companies',
    description:
      'Security Blogs Australia helps security companies grow with SEO, AEO, GEO, AI Visibility, Guest Posting and Digital Marketing services.',
    images: ['/logo.png'],
  },
  keywords: [
    'Security Blogs',
    'Security Blogs Australia',
    'Security SEO',
    'SEO for security companies',
    'AEO services',
    'GEO services',
    'AI Visibility',
    'security guest posting',
    'security digital marketing',
    'AI visibility for security brands',
  ],
}

export default function HomePage() {
  return (
    <>
      {/* Structured data */}
      <JsonLd data={webPageSchema({
        path: '/',
        name: 'Security Blogs Australia | SEO, AEO & AI Visibility for Security Companies',
        description: 'Security Blogs Australia helps security companies grow with SEO, AEO, GEO, AI Visibility, Guest Posting and Digital Marketing services.',
      })} />
      <JsonLd data={faqSchema(siteConfig.faqs)} />
      <JsonLd data={itemListSchema({
        name: 'SecurityBlogs Services',
        path: '/',
        items: services.map((s) => ({
          name: s.title,
          url: `/services/${s.slug}/`,
          description: s.desc,
        })),
      })} />

      {/* ─────────────────────────────────────────
          1. HERO
          Centered headline + large dashboard card
      ───────────────────────────────────────── */}
      <section style={{
        position: 'relative',
        paddingTop: 'calc(var(--nav-h) + 72px)',
        paddingBottom: 0,
        background: 'linear-gradient(160deg, #0c1a4e 0%, #1a1060 45%, #0e2a5c 100%)',
        overflow: 'visible',
      }}>
        {/* Grid overlay */}
        <div className="grid-overlay" />

        {/* Ambient glow blobs */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: -120, left: '20%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(30,95,224,0.18) 0%, transparent 70%)', filter: 'blur(32px)' }} />
          <div style={{ position: 'absolute', top: -60, right: '15%', width: 380, height: 380, borderRadius: '50%', background: 'radial-gradient(circle, rgba(111,77,255,0.14) 0%, transparent 70%)', filter: 'blur(28px)' }} />
        </div>

        {/* Centered text */}
        <div className="container z1" style={{ textAlign: 'center', paddingBottom: 48 }}>
          <Reveal>
            <span className="badge" style={{ marginBottom: 22, color: '#60a5fa', borderColor: 'rgba(96,165,250,0.35)', background: 'rgba(96,165,250,0.08)' }}>
              <span className="dot dot-pulse" style={{ background: '#60a5fa' }} /> LIVE · AI VISIBILITY ENGINE
            </span>
            <h1 className="h1" style={{ marginBottom: 20, color: '#fff' }}>
              Be the{' '}
              <span style={{ color: '#60a5fa', fontStyle: 'italic' }}>answer</span>{' '}
              <span style={{ color: '#f87171' }}>AI</span> gives.
            </h1>
            <p className="lead" style={{ maxWidth: 560, marginBottom: 32, color: 'rgba(255,255,255,0.72)', marginInline: 'auto' }}>
              When buyers ask ChatGPT, Gemini or Google AI for the best security
              provider — your brand should be named. We make that happen.
            </p>
            <div className="flex flex-wrap gap-3" style={{ marginBottom: 18, justifyContent: 'center' }}>
              <MagneticButton href="/contact/" className="btn btn-primary btn-lg">
                Get your free audit →
              </MagneticButton>
              <MagneticButton href="/book-strategy-call/" className="btn btn-outline btn-lg hero-outline-btn">
                Book a strategy call
              </MagneticButton>
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'rgba(255,255,255,0.38)', letterSpacing: '0.06em' }}>
              30-day results · No lock-in · Trusted across AU · US · UK · UAE · SG
            </p>
          </Reveal>
        </div>

        {/* Dashboard card — protrudes below hero */}
        <div className="container z1" style={{ paddingBottom: 0, position: 'relative', zIndex: 2 }}>
          <Reveal delay={0.2}>
            <HeroDashboardCard />
          </Reveal>
        </div>

        {/* Fade bottom edge so card blends into next section */}
        <div style={{ height: 80, background: 'linear-gradient(to bottom, transparent, #f6f6f6)', position: 'relative', zIndex: 1, marginTop: -20 }} />
      </section>

      {/* ─────────────────────────────────────────
          2. MARQUEE — AI platforms strip
      ───────────────────────────────────────── */}
      <MarqueeStrip />

      {/* ─────────────────────────────────────────
          3. AI VISIBILITY SCORE + PROMO VIDEO
          Card and video are two separate elements.
          Video slides out from behind the card.
      ───────────────────────────────────────── */}
      <section id="ai-score" style={{ background: '#060d1f', paddingTop: 80, paddingBottom: 0 }}>
        <div className="container">
          <SectionHead
            eyebrow="Live score"
            title="See how visible you are to AI."
            sub="Our engine checks 10+ AI platforms and scores your brand's citation rate in real time."
            dark
          />
          <DynamicAIScore />
        </div>
      </section>

      {/* ─────────────────────────────────────────
          4. SERVICES — scroll-sticky card stack
          Cards slide up one by one as you scroll
      ───────────────────────────────────────── */}
      <section id="services" style={{ paddingBottom: 0 }}>
        <DynamicScrollStack />
      </section>

      {/* ─────────────────────────────────────────
          5. STATS
      ───────────────────────────────────────── */}
      <section className="section" id="stats" style={{ background: '#fff' }}>
        <div className="container">
          <SectionHead eyebrow="The results" title="Numbers our clients brag about." />
          <StatsStrip items={stats} />
        </div>
      </section>

      {/* ─────────────────────────────────────────
          6. TESTIMONIALS
      ───────────────────────────────────────── */}
      <DynamicTestimonials />

      {/* ─────────────────────────────────────────
          7. CTA BAND
      ───────────────────────────────────────── */}
      <CTABand ctaHref="/contact/" />

      {/* ─────────────────────────────────────────
          8. MAP — Who shows up when locals search?
      ───────────────────────────────────────── */}
      <DynamicLocalCheck />

      {/* ─────────────────────────────────────────
          9. SERVICES HUB — keyword-rich internal links
             to all major service pages (SEO)
      ───────────────────────────────────────── */}
      <section className="section" id="all-services" style={{ background: '#f8f9fb', paddingTop: 56, paddingBottom: 56 }}>
        <div className="container">
          <SectionHead
            eyebrow="All Services"
            title="Security Digital Marketing Services"
            sub="Every service built exclusively for security companies — from Security SEO and AI Visibility to Google Ads and Guest Posting."
          />
          <nav aria-label="Service pages" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginTop: 32 }}>
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}/`}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '13px 16px', borderRadius: 10,
                  background: '#fff', border: '1px solid var(--line)',
                  textDecoration: 'none', color: 'var(--text)',
                  fontWeight: 600, fontSize: 14,
                  transition: 'border-color 0.15s, box-shadow 0.15s',
                }}
              >
                <span style={{ fontSize: 18 }}>{s.icon}</span>
                <span style={{ flex: 1 }}>{s.title}</span>
                <span style={{ fontSize: 12, color: 'var(--blue)' }}>→</span>
              </Link>
            ))}
            <Link
              href="/publish-with-us/guest-posting/"
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '13px 16px', borderRadius: 10,
                background: '#fff', border: '1px solid var(--line)',
                textDecoration: 'none', color: 'var(--text)',
                fontWeight: 600, fontSize: 14,
              }}
            >
              <span style={{ fontSize: 18 }}>✍️</span>
              <span style={{ flex: 1 }}>Security Guest Posting</span>
              <span style={{ fontSize: 12, color: 'var(--blue)' }}>→</span>
            </Link>
          </nav>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          10. FAQ
      ───────────────────────────────────────── */}
      <section className="section" id="faq">
        <div className="container">
          <SectionHead
            eyebrow="FAQ"
            title="Frequently Asked Questions"
            sub="Everything you need to know about AI visibility for security brands."
          />
          <div style={{ maxWidth: 780, margin: '0 auto' }}>
            <FAQAccordion items={siteConfig.faqs} />
          </div>
        </div>
      </section>
    </>
  )
}
