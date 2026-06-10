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
import LocalVisibilityCheck from '@/components/immersive/LocalVisibilityCheck'
import JsonLd from '@/components/JsonLd'
import { stats, services } from '@/lib/site'
import { siteConfig } from '@/lib/siteConfig'
import { faqSchema, webPageSchema, itemListSchema } from '@/lib/schema'
import HeroAIIcons from './HeroAIIcons'
import ScrollStackSection from './ScrollStackSection'
import TestimonialsSection from './TestimonialsSection'
import AIScoreWithVideo from './AIScoreWithVideo'

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
          Left  → headline + buttons
          Right → floating AI platform icons
      ───────────────────────────────────────── */}
      <HeroBg>
        <div className="grid-2" style={{ alignItems: 'center', gap: 56 }}>
          <Reveal>
            <span className="badge badge-blue" style={{ marginBottom: 22 }}>
              <span className="dot dot-pulse" /> LIVE · AI VISIBILITY ENGINE
            </span>
            <h1 className="h1" style={{ marginBottom: 20 }}>
              Be the{' '}
              <span style={{ color: 'var(--blue)', fontStyle: 'italic' }}>answer</span>{' '}
              <span style={{ color: 'var(--red)' }}>AI</span> gives.
            </h1>
            <p className="lead" style={{ maxWidth: 520, marginBottom: 28 }}>
              When buyers ask ChatGPT, Gemini or Google AI for the best security
              provider — your brand should be named. We make that happen.
            </p>
            <div className="flex flex-wrap gap-3" style={{ marginBottom: 24 }}>
              <MagneticButton href="/contact/" className="btn btn-primary btn-lg">
                Get your free audit →
              </MagneticButton>
              <MagneticButton href="/free-tools/" className="btn btn-outline btn-lg">
                Try the live score
              </MagneticButton>
            </div>
            <p className="text-dim" style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>
              Trusted across AU · US · UK · UAE · SG
            </p>
          </Reveal>

          {/* Floating AI brand icons with micro-oscillation */}
          <Reveal delay={0.15}>
            <HeroAIIcons />
          </Reveal>
        </div>
      </HeroBg>

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
          <AIScoreWithVideo />
        </div>
      </section>

      {/* ─────────────────────────────────────────
          4. SERVICES — scroll-sticky card stack
          Cards slide up one by one as you scroll
      ───────────────────────────────────────── */}
      <section id="services" style={{ paddingBottom: 0 }}>
        <ScrollStackSection />
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
          "Here's what our users say"
          Scroll-triggered entrance + hover lift
      ───────────────────────────────────────── */}
      <TestimonialsSection items={siteConfig.testimonials} />

      {/* ─────────────────────────────────────────
          7. CTA BAND — animated gradient cycling
      ───────────────────────────────────────── */}
      <CTABand ctaHref="/contact/" />

      {/* ─────────────────────────────────────────
          8. MAP — UNCHANGED
          Who shows up when locals search?
      ───────────────────────────────────────── */}
      <LocalVisibilityCheck service="security companies" />

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
