import HeroBg from '@/components/ui/HeroBg'
import MagneticButton from '@/components/ui/MagneticButton'
import SectionHead from '@/components/ui/SectionHead'
import Reveal from '@/components/ui/Reveal'
import Breadcrumb from '@/components/ui/Breadcrumb'
import StatsStrip from '@/components/ui/StatsStrip'
import FAQAccordion from '@/components/ui/FAQAccordion'
import ContactForm from '@/components/ui/ContactForm'
import JsonLd from '@/components/JsonLd'
import { serviceSchema } from '@/lib/schema'
import GmbHeroVisual from './GmbHeroVisual'
import GmbDashboardVisual from './GmbDashboardVisual'
import GmbHowItWorks from './GmbHowItWorks'
import PromoVideoSection from '@/components/ui/PromoVideoSection'

const ACCENT = '#34a853'

export const metadata = {
  title: 'GMB Profile — Google Business Profile Setup & Local SEO',
  description:
    'Full Google Business Profile setup, verification, optimisation and management for security businesses. Rank #1 on Google Maps and dominate every local search in your service area.',
  alternates: { canonical: '/services/gmb-profile/' },
  openGraph: {
    title: 'Google Business Profile Setup & Local SEO for Security Companies | SecurityBlogs',
    description: 'Full GBP setup, verification and management for security businesses. Rank #1 in Google Maps local pack and dominate every local search in your service area.',
    url: '/services/gmb-profile/',
    siteName: 'SecurityBlogs Australia',
    type: 'website',
    locale: 'en_AU',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'GMB Profile & Local SEO — SecurityBlogs' }],
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Google Business Profile Setup & Local SEO for Security Companies',
    description: 'Full GBP setup, verification and management. Rank #1 in Google Maps local pack.',
    images: ['/logo.png'],
  },
}

const capabilities = [
  { icon: '📋', title: 'GBP Setup & Registration', desc: 'Full Google Business Profile creation with accurate NAP, categories, service areas and business description crafted for local SEO.' },
  { icon: '✅', title: 'Verification Support', desc: 'We guide you through Google\'s verification process — postcard, phone, video or instant — so your listing goes live fast.' },
  { icon: '🗂️', title: 'Category Optimisation', desc: 'Primary and secondary category selection researched for your service type, ensuring Google matches your listing to the right searches.' },
  { icon: '📍', title: 'Service Area Setup', desc: 'Define every suburb and region you serve so your profile appears in local pack results across your full coverage area.' },
  { icon: '🖼️', title: 'Photos & Media', desc: 'Professional photo strategy covering team, vehicles, installations and premises — images are a ranking factor and conversion driver.' },
  { icon: '⭐', title: 'Review Strategy', desc: 'A systemised review acquisition process that builds 5-star ratings organically and responds to every review on your behalf.' },
  { icon: '📝', title: 'Posts & Updates', desc: 'Regular Google Posts (offers, news, events) keep your profile active and signal freshness to Google\'s local algorithm.' },
  { icon: '📊', title: 'Monthly Performance Reporting', desc: 'Transparent monthly reports covering profile views, search queries, direction requests, calls and map ranking improvements.' },
]

const steps = [
  { title: 'Audit & Claim Your Profile', desc: 'We audit any existing listing, claim ownership, and build a fully optimised profile from scratch — or repair an under-performing one.' },
  { title: 'Verify & Go Live', desc: 'We manage the Google verification process end-to-end, ensuring your listing is live, trusted and eligible for the Map Pack.' },
  { title: 'Optimise Every Signal', desc: 'Categories, service areas, attributes, photos, Q&A, products, hours — every element is optimised to maximise Map Pack rankings.' },
  { title: 'Manage & Grow Monthly', desc: 'Regular posts, review responses, citation building and monthly reporting keep your profile ranking and converting month after month.' },
]

const stats = [
  { num: '#1', label: 'Average Map Pack position in 90 days' },
  { num: '+62%', label: 'Average increase in profile views' },
  { num: '4.9★', label: 'Average review rating achieved' },
  { num: '3×', label: 'More direction requests and calls' },
]

const faqs = [
  { q: 'What is a Google Business Profile?', a: 'Google Business Profile (formerly Google My Business) is your free listing that appears in Google Maps and the local search "3-pack". It\'s the most visible local SEO asset a security business can own.' },
  { q: 'My business already has a GBP. Can you still help?', a: 'Absolutely. Most security business profiles are incomplete or poorly optimised. We audit your existing listing, rebuild every element and turn it into a ranking machine.' },
  { q: 'How long until I rank in the Map Pack?', a: 'Most security businesses see movement in 4–6 weeks after full optimisation. Reaching position 1–3 in the Map Pack typically takes 8–12 weeks for competitive areas.' },
  { q: 'Do you handle the Google verification?', a: 'Yes. We guide you through every step — whether Google sends a postcard, requests a video, or offers instant verification — until your profile is fully confirmed.' },
  { q: 'Is Google Business Profile free?', a: 'Creating a Google Business Profile is free. Our service covers the setup, optimisation, content, review management and monthly maintenance work that turns it into a lead generator.' },
  { q: 'What\'s included in monthly management?', a: 'Weekly Google Posts, review response management, Q&A updates, photo additions, citation monitoring and a monthly performance report with ranking and engagement data.' },
]

const included = [
  'Full GBP setup & category research',
  'Google Maps registration & service area config',
  'Verification process management',
  'NAP consistency audit across the web',
  'Photo strategy & media optimisation',
  'Business description & attributes',
  'Services and products listing',
  'Review acquisition strategy',
  'Monthly Google Posts',
  'Competitor Map Pack analysis',
  'Monthly performance reports',
  'Citation building (50+ directories)',
]

export default function GmbProfilePage() {
  return (
    <>
      <JsonLd data={serviceSchema({
        name: 'GMB Profile — Google Business Profile',
        description: 'Full Google Business Profile setup, verification, optimisation and management for security businesses.',
        slug: 'gmb-profile',
        serviceType: 'Local SEO',
      })} />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <HeroBg grid>
        <div className="grid-2" style={{ alignItems: 'center', gap: 48 }}>
          <Reveal>
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services/' }, { label: 'GMB Profile' }]} />
            <span className="badge" style={{ marginBottom: 22, color: ACCENT, borderColor: `${ACCENT}55`, background: `${ACCENT}14` }}>
              <span className="dot dot-pulse" /> GOOGLE BUSINESS PROFILE
            </span>
            <h1 className="h1" style={{ marginBottom: 20 }}>
              Rank #1 on Google Maps — and{' '}
              <span style={{ color: ACCENT, fontStyle: 'italic' }}>Own Your Local Market</span>
            </h1>
            <p className="lead" style={{ maxWidth: 560, marginBottom: 28 }}>
              We handle everything — from profile setup and Google verification to category optimisation, reviews and monthly management — so your security business dominates every local search.
            </p>
            <div className="flex flex-wrap gap-3">
              <MagneticButton href="/contact/" className="btn btn-primary btn-lg">Get your free GBP audit →</MagneticButton>
              <MagneticButton href="/book-strategy-call/" className="btn btn-outline btn-lg">Book a strategy call</MagneticButton>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <GmbHeroVisual />
          </Reveal>
        </div>
      </HeroBg>

      {/* ── What's included ───────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="What's included"
            title="Everything your security business needs to dominate local search."
            sub="A complete local SEO programme built around Google Business Profile — from first setup to sustained Map Pack dominance."
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginTop: 40 }}>
            {capabilities.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.05}>
                <div style={{
                  background: '#fff', borderRadius: 16,
                  border: '1px solid #e8edf7',
                  boxShadow: '0 2px 16px -4px rgba(18,42,86,0.07)',
                  padding: '22px 22px',
                  height: '100%',
                }}>
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{c.icon}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#0f2244', marginBottom: 8 }}>{c.title}</div>
                  <div style={{ fontSize: 14, color: '#46546e', lineHeight: 1.65 }}>{c.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Dashboard visual section ───────────────────────────────────── */}
      <section className="section" style={{ background: '#f8faff', paddingTop: 72, paddingBottom: 72 }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'start', gap: 48 }}>
            <Reveal>
              <span className="eyebrow">Real results</span>
              <h2 className="h2" style={{ margin: '12px 0 16px' }}>
                Your Google Business Profile becomes a{' '}
                <span style={{ color: ACCENT }}>lead generation engine.</span>
              </h2>
              <p className="lead" style={{ marginBottom: 28 }}>
                A fully optimised profile generates calls, direction requests and website visits around the clock — even while you sleep. We track every metric monthly so you can see the ROI.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  'Profile views, searches and map views tracked weekly',
                  'Review count and rating monitored against competitors',
                  'Phone clicks and direction requests measured monthly',
                  'Map Pack position tracked across all target keywords',
                ].map((b) => (
                  <div key={b} className="flex items-center gap-2 text-soft" style={{ fontSize: 15 }}>
                    <span style={{ color: ACCENT }}>✓</span>{b}
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <GmbDashboardVisual />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────── */}

      {/* ── Everything included list ─────────────────────────────────── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'start', gap: 48 }}>
            <Reveal>
              <SectionHead
                eyebrow="Everything included"
                title="No hidden extras. No lock-in. Everything you need in one programme."
                sub="Our GMB management service covers every deliverable from day one, with clear monthly reporting on every metric."
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 32 }}>
                {included.map((item) => (
                  <div key={item} className="flex items-center gap-2" style={{ fontSize: 14, color: '#2d3a52' }}>
                    <span style={{ color: ACCENT, fontWeight: 700, flexShrink: 0 }}>✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div style={{
                background: `linear-gradient(135deg, ${ACCENT}0e 0%, #1e5fe008 100%)`,
                borderRadius: 20, border: `1.5px solid ${ACCENT}22`,
                padding: '32px 28px',
              }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: ACCENT, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: 16 }}>
                  Why GBP matters for security businesses
                </div>
                {[
                  { stat: '46%', label: 'of all Google searches have local intent' },
                  { stat: '88%', label: 'of local searches result in a call or visit within 24 hours' },
                  { stat: '70%', label: 'of customers visit a business they found on Google Maps' },
                  { stat: '5×', label: 'more views for fully optimised profiles vs incomplete ones' },
                ].map((s) => (
                  <div key={s.stat} style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18, paddingBottom: 18, borderBottom: '1px solid rgba(15,34,68,0.07)' }}>
                    <div style={{ fontSize: 28, fontWeight: 900, color: ACCENT, fontFamily: 'var(--font-mono)', lineHeight: 1, flexShrink: 0 }}>{s.stat}</div>
                    <div style={{ fontSize: 14, color: '#46546e', lineHeight: 1.55 }}>{s.label}</div>
                  </div>
                ))}
                <div style={{ marginTop: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 18 }}>📍</span>
                  <span style={{ fontSize: 13, color: '#0f2244', fontWeight: 600 }}>
                    Security businesses that rank in the top 3 Map Pack spots capture the majority of local leads.
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Stats ──────────────────────────────────────────────────────── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="The results" title="What our security clients see on Google Maps." />
          <StatsStrip items={stats} />
        </div>
      </section>

      {/* ── FAQs ───────────────────────────────────────────────────────── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <SectionHead eyebrow="FAQ" title="Google Business Profile questions, answered." />
          <FAQAccordion items={faqs} />
        </div>
      </section>

      {/* ── Contact form ─────────────────────────────────────────────── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'start', gap: 40 }}>
            <Reveal>
              <span className="eyebrow">Let&rsquo;s talk</span>
              <h2 className="h2" style={{ margin: '12px 0 14px' }}>Get your free Google Business Profile audit.</h2>
              <p className="lead" style={{ marginBottom: 22 }}>
                We&rsquo;ll review your current listing, identify every gap, and show you exactly what it takes to rank #1 in your local Map Pack.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {['Free profile audit included', 'No lock-in contracts', 'Built for security businesses'].map((b) => (
                  <div key={b} className="flex items-center gap-2 text-soft" style={{ fontSize: 15 }}>
                    <span style={{ color: ACCENT }}>✓</span>{b}
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <ContactForm submitLabel="Request my GBP audit →" />
            </Reveal>
          </div>
        </div>
      </section>

      <PromoVideoSection
        eyebrow="See GMB management in action"
        title="Rank #1 on Google Maps and own your local market"
        subtitle="From profile setup to Google verification, category optimisation and monthly management — we turn your Google Business Profile into your highest-converting marketing channel."
        accent={ACCENT}
      />

      <GmbHowItWorks />
    </>
  )
}
