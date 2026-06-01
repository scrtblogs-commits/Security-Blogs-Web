import HeroBg from '@/components/ui/HeroBg'
import MagneticButton from '@/components/ui/MagneticButton'
import SectionHead from '@/components/ui/SectionHead'
import CTABand from '@/components/ui/CTABand'
import Reveal from '@/components/ui/Reveal'
import Breadcrumb from '@/components/ui/Breadcrumb'
import StatsStrip from '@/components/ui/StatsStrip'
import Bento from '@/components/ui/Bento'
import ProcessSteps from '@/components/ui/ProcessSteps'
import FAQAccordion from '@/components/ui/FAQAccordion'
import ContactForm from '@/components/ui/ContactForm'
import ContainerScroll from '@/components/ui/ContainerScroll'
import PlatformTabs from '@/components/ui/PlatformTabs'
import AdPreviewCard from '@/components/ui/AdPreviewCard'
import JsonLd from '@/components/JsonLd'
import { serviceSchema } from '@/lib/schema'

const ACCENT = '#f6c715'

export const metadata = {
  title: 'Google Ads for Security Companies',
  description:
    'High-converting Google Ads campaigns engineered for security buyers. 3.2× average ROAS, transparent reporting and conversion tracking built in.',
  alternates: { canonical: '/services/google-ads/' },
  openGraph: { url: '/services/google-ads/' },
}

function MetricTile({ label, value, delta, positive = true }: { label: string; value: string; delta: string; positive?: boolean }) {
  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--line)', borderRadius: 14, padding: '16px 18px' }}>
      <div className="text-dim" style={{ fontSize: 12, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 800, fontFamily: 'var(--font-display)', margin: '6px 0 2px', lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 12.5, fontWeight: 600, color: positive ? 'var(--green)' : 'var(--red)' }}>{positive ? '▲' : '▼'} {delta}</div>
    </div>
  )
}

function GoogleAdsDashboard() {
  const bars = [42, 58, 49, 71, 64, 83, 78, 96, 88, 100, 92, 84]
  return (
    <div style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
      <div className="flex items-center justify-between" style={{ padding: '14px 18px', borderBottom: '1px solid var(--line)' }}>
        <div className="flex items-center gap-2">
          <span style={{ width: 26, height: 26, borderRadius: 7, display: 'grid', placeItems: 'center', background: `${ACCENT}22`, fontSize: 14 }}>📢</span>
          <strong style={{ fontFamily: 'var(--font-display)', fontSize: 15 }}>Google Ads · Security Campaign</strong>
        </div>
        <span className="chip" style={{ color: 'var(--green)', borderColor: 'var(--green)' }}>● Live</span>
      </div>

      <div style={{ padding: 18 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }} className="ga-tiles">
          <MetricTile label="ROAS" value="3.2×" delta="+0.8× MoM" />
          <MetricTile label="Avg CPC" value="$12.04" delta="9% lower" />
          <MetricTile label="CTR" value="7.1%" delta="+210%" />
          <MetricTile label="Conversions" value="184" delta="+46 MoM" />
        </div>

        <div className="ga-chart-row" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 14, marginTop: 16 }}>
          <div style={{ background: 'var(--bg-card-2)', border: '1px solid var(--line)', borderRadius: 14, padding: 16 }}>
            <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
              <strong style={{ fontSize: 13.5 }}>Conversions · last 12 weeks</strong>
              <span className="chip">Search + Display</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 130 }}>
              {bars.map((b, i) => (
                <div key={i} style={{ flex: 1, height: `${b}%`, borderRadius: '6px 6px 2px 2px', background: `linear-gradient(180deg, ${ACCENT}, ${ACCENT}66)` }} />
              ))}
            </div>
          </div>
          <div style={{ background: 'var(--bg-card-2)', border: '1px solid var(--line)', borderRadius: 14, padding: 16 }}>
            <strong style={{ fontSize: 13.5 }}>Impression share</strong>
            <div style={{ position: 'relative', display: 'grid', placeItems: 'center', margin: '12px auto 8px', width: 120, height: 120, borderRadius: '50%', background: `conic-gradient(${ACCENT} 0 92%, var(--line) 92% 100%)` }}>
              <div style={{ width: 84, height: 84, borderRadius: '50%', background: 'var(--bg-card-2)', display: 'grid', placeItems: 'center' }}>
                <span style={{ fontSize: 24, fontWeight: 800, fontFamily: 'var(--font-display)' }}>92%</span>
              </div>
            </div>
            <p className="text-soft center" style={{ fontSize: 12.5 }}>Top-of-page impression share</p>
          </div>
        </div>
      </div>
      <style>{`@media (max-width:640px){.ga-tiles{grid-template-columns:1fr 1fr!important}.ga-chart-row{grid-template-columns:1fr!important}}`}</style>
    </div>
  )
}

function BannerAd() {
  return (
    <div className="card center" style={{ maxWidth: 728, margin: '0 auto', padding: 0, overflow: 'hidden' }}>
      <div style={{ background: 'linear-gradient(120deg,#11203a,#1742a8)', color: '#fff', padding: '28px 26px', textAlign: 'left', position: 'relative' }}>
        <span style={{ position: 'absolute', top: 10, right: 12, fontSize: 10, opacity: 0.7 }}>Ad · Display Network</span>
        <div className="flex items-center justify-between gap-4" style={{ flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 13, color: ACCENT, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>SECURITYSOLUTIONS.COM.AU</div>
            <div style={{ fontSize: 22, fontWeight: 800, fontFamily: 'var(--font-display)', margin: '6px 0' }}>24/7 Business Security From $49/mo</div>
            <div style={{ fontSize: 13.5, opacity: 0.85 }}>CCTV · Access Control · Monitoring · AS2201 Certified</div>
          </div>
          <span style={{ background: ACCENT, color: '#11203a', padding: '12px 22px', borderRadius: 10, fontWeight: 700, whiteSpace: 'nowrap' }}>Free Site Survey →</span>
        </div>
      </div>
    </div>
  )
}

function YouTubeStoryboard() {
  const frames = [
    { t: '0:00', label: 'Hook', desc: '"Is your business actually protected?"' },
    { t: '0:04', label: 'Problem', desc: 'Break-in footage + alarm fails' },
    { t: '0:08', label: 'Solution', desc: 'AS2201 installers on site' },
    { t: '0:12', label: 'CTA', desc: 'Book a free site survey →' },
  ]
  return (
    <div className="card" style={{ padding: 22 }}>
      <div className="flex items-center gap-2" style={{ marginBottom: 16 }}>
        <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 5, border: '1px solid var(--red)', color: 'var(--red)' }}>Ad</span>
        <span className="text-soft" style={{ fontSize: 13 }}>YouTube · 15-second non-skippable</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }} className="yt-frames">
        {frames.map((f) => (
          <div key={f.t} style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid var(--line)' }}>
            <div style={{ aspectRatio: '16/9', background: 'linear-gradient(135deg,#11203a,#1e5fe0)', position: 'relative', display: 'grid', placeItems: 'center' }}>
              <span style={{ color: '#fff', fontSize: 22 }}>▶</span>
              <span style={{ position: 'absolute', bottom: 6, left: 8, fontSize: 11, color: '#fff', fontFamily: 'var(--font-mono)' }}>{f.t}</span>
            </div>
            <div style={{ padding: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: ACCENT }}>{f.label}</div>
              <div className="text-soft" style={{ fontSize: 12 }}>{f.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <style>{`@media (max-width:640px){.yt-frames{grid-template-columns:1fr 1fr!important}}`}</style>
    </div>
  )
}

function MapsLocalAd() {
  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{ position: 'relative', height: 160, background: 'linear-gradient(135deg,#dbe6f5,#eef3fb)' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px)', backgroundSize: '32px 32px', opacity: 0.6 }} />
        <div style={{ position: 'absolute', top: '42%', left: '46%' }}>
          <div style={{ width: 30, height: 30, borderRadius: '50% 50% 50% 0', transform: 'rotate(-45deg)', background: 'var(--red)', boxShadow: '0 6px 16px -4px rgba(226,55,68,0.6)' }} />
        </div>
        <span style={{ position: 'absolute', top: 10, left: 12, fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 5, background: '#fff', border: '1px solid var(--line)' }}>Ad</span>
      </div>
      <div style={{ padding: 18 }}>
        <strong style={{ fontFamily: 'var(--font-display)', fontSize: 17 }}>Security Solutions — Sydney CBD</strong>
        <div className="flex items-center gap-2" style={{ fontSize: 13, margin: '4px 0' }}>
          <span style={{ color: ACCENT }}>★★★★★</span><span className="text-soft">4.9 (218) · Security system installer</span>
        </div>
        <p className="text-soft" style={{ fontSize: 13.5 }}>Open 24 hours · In-house AS2201 certified installers · 12 min away</p>
        <div className="flex flex-wrap gap-2" style={{ marginTop: 12 }}>
          <span className="chip">Directions</span><span className="chip">Call now</span><span className="chip">Free quote</span>
        </div>
      </div>
    </div>
  )
}

function LocalServicesAd() {
  return (
    <div className="card" style={{ padding: 22, maxWidth: 520, margin: '0 auto' }}>
      <div className="flex items-center gap-2" style={{ marginBottom: 12 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, padding: '4px 9px', borderRadius: 6, background: 'rgba(30,158,117,0.12)', border: '1px solid var(--green)', color: 'var(--green)' }}>
          ✓ Google Guaranteed
        </span>
        <span className="text-soft" style={{ fontSize: 12.5 }}>Local Services Ad</span>
      </div>
      <div className="flex items-center gap-3">
        <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg,#11203a,#1742a8)', display: 'grid', placeItems: 'center', color: '#fff', fontWeight: 800, fontFamily: 'var(--font-display)' }}>SS</div>
        <div>
          <strong style={{ fontFamily: 'var(--font-display)', fontSize: 17 }}>Security Solutions Pty Ltd</strong>
          <div className="flex items-center gap-2" style={{ fontSize: 13 }}>
            <span style={{ color: ACCENT }}>★★★★★</span><span className="text-soft">4.9 · 218 reviews · Sydney NSW</span>
          </div>
        </div>
      </div>
      <p className="text-soft" style={{ fontSize: 13.5, margin: '12px 0' }}>Background-checked & licence-verified by Google. Coverage for missed appointments and unsatisfactory work.</p>
      <div className="flex flex-wrap gap-2">
        <span className="chip">CCTV install</span><span className="chip">Access control</span><span className="chip">24/7 monitoring</span>
      </div>
    </div>
  )
}

const searchAd = {
  badge: 'Ad',
  badgeColor: '#1e9e75',
  url: 'securitysolutions.com.au',
  headline: 'Security Systems Sydney | 24/7 Monitoring From $49/mo',
  headline2: 'Top-Rated CCTV & Access Control | Free Site Survey',
  desc: 'Protect your business with enterprise-grade security. AS2201 certified installers. 500+ installations. Get your free quote today.',
  desc2: 'CCTV • Access Control • Alarms • 24/7 Monitoring. Local experts, fast installation, ongoing support.',
  sitelinks: ['Get Free Quote', 'View CCTV Systems', 'Access Control', 'Contact Us'],
  callouts: ['24/7 Support', 'AS2201 Certified', 'Free Site Survey', 'No Lock-in Contracts'],
}

const bento = [
  { icon: '🎯', title: 'Search Intent Targeting', desc: 'We bid only on keywords with genuine buyer intent — "commercial CCTV installer", "access control quote" — not tyre-kicker traffic.' },
  { icon: '📍', title: 'Geo-Targeting by Suburb', desc: 'Concentrate spend on the suburbs and service radius where your highest-value security jobs actually convert.' },
  { icon: '💰', title: 'Budget & Bid Control', desc: 'Smart bidding tuned to your margins, with day-parting and device adjustments so no dollar is wasted.' },
  { icon: '📊', title: 'Conversion Tracking', desc: 'Calls, forms and quote requests tracked end-to-end so every lead is attributed to the exact keyword and ad.' },
  { icon: '🔁', title: 'Remarketing Audiences', desc: 'Stay in front of buyers who viewed your quote page but didn’t convert across Search, Display and YouTube.' },
  { icon: '⚔️', title: 'Competitor Keyword Targeting', desc: 'Appear above rival security firms when buyers search their brand names — and win the click with a stronger offer.' },
]

const steps = [
  { title: 'Audit & Keyword Research', desc: 'We map your services, margins and the highest-intent security keywords your buyers actually search.' },
  { title: 'Build & Launch', desc: 'Tight ad groups, compelling copy, extensions and conversion tracking — launched to your priority suburbs.' },
  { title: 'Optimise & Scale', desc: 'Weekly bid, budget and search-term refinement to drive CPCs down and ROAS up.' },
  { title: 'Report & Refine', desc: 'Transparent monthly reporting tied to leads and revenue — never vanity metrics.' },
]

const faqs = [
  { q: 'How much should I budget for Google Ads?', a: 'For most security installers we recommend a minimum of $1,500–$3,000/month in ad spend to gather enough conversion data and compete in your suburbs. We’ll model expected leads at a few budget tiers before you commit, so you can start where the numbers make sense and scale once ROAS is proven.' },
  { q: 'How soon do leads start coming in?', a: 'Search ads can generate enquiries within the first 48 hours of launch because you’re showing to people actively searching for security services. The first 4–6 weeks are spent gathering data and optimising, after which cost-per-lead typically drops 20–40% as the campaign matures.' },
  { q: 'Do you manage the whole account?', a: 'Yes. We handle keyword research, ad copywriting, bid and budget management, conversion tracking, negative keywords, A/B testing and reporting. You keep ownership of the Google Ads account — we never hold your data hostage.' },
  { q: 'What is your management fee?', a: 'We charge a transparent flat or percentage-of-spend management fee depending on account size — no hidden markups on your ad spend, and your media budget always goes straight to Google. You’ll see exactly what you pay us versus what reaches the platform.' },
  { q: 'Do you set up conversion tracking?', a: 'Always. Before we spend a dollar we implement call tracking, form-submission tracking and (where relevant) offline conversion import, so every lead is tied back to the keyword, ad and suburb that produced it. Without this you’re flying blind.' },
  { q: 'Can you target specific suburbs?', a: 'Absolutely. We can target by suburb, postcode or a radius around your depot, and apply bid adjustments so your best-performing service areas get a larger share of budget. This is critical for installers who only service certain regions.' },
]

const formFields = [
  { name: 'name', label: 'Name', required: true },
  { name: 'email', label: 'Email', type: 'email' as const, required: true },
  { name: 'phone', label: 'Phone' },
  { name: 'company', label: 'Company' },
  { name: 'website', label: 'Current website URL', placeholder: 'https://' },
  { name: 'budget', label: 'Monthly ad budget', type: 'select' as const, options: ['$0–1.5k', '$1.5k–3k', '$3k–8k', '$8k+'] },
  { name: 'message', label: 'What are your growth goals?', type: 'textarea' as const, required: true, full: true },
]

export default function GoogleAdsPage() {
  return (
    <>
      <JsonLd data={serviceSchema({
        name: 'Google Ads for Security',
        description: 'High-converting Google Ads campaigns engineered for security buyers. 3.2x average ROAS, transparent reporting and conversion tracking built in.',
        slug: 'google-ads',
        serviceType: 'Search Engine Marketing',
      })} />
      <HeroBg grid>
        <Reveal>
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services/' }, { label: 'Google Ads' }]} />
          <span className="badge" style={{ marginBottom: 22, color: ACCENT, borderColor: `${ACCENT}66`, background: `${ACCENT}14` }}>
            <span className="dot dot-pulse" style={{ background: ACCENT }} /> GOOGLE ADS · SECURITY INDUSTRY
          </span>
          <h1 className="h1" style={{ marginBottom: 20, maxWidth: 900 }}>
            Google Ads That Convert{' '}
            <span style={{ color: ACCENT, fontStyle: 'italic' }}>Security Buyers</span>
          </h1>
          <p className="lead" style={{ maxWidth: 640, marginBottom: 28 }}>
            High-intent search campaigns engineered for security installers and providers — every dollar
            tracked to a lead, every lead tied to revenue.
          </p>
          <div className="flex flex-wrap gap-3">
            <MagneticButton href="/contact/" className="btn btn-primary btn-lg">Get your free audit →</MagneticButton>
            <MagneticButton href="/book-strategy-call/" className="btn btn-outline btn-lg">Book a strategy call</MagneticButton>
          </div>
        </Reveal>
      </HeroBg>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <StatsStrip items={[
            { num: '3.2×', label: 'Average ROAS' },
            { num: '$12', label: 'Average CPC' },
            { num: '+210%', label: 'Average CTR lift' },
            { num: '92%', label: 'Impression share achieved' },
          ]} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <ContainerScroll title={<SectionHead eyebrow="Live performance" title="A Google Ads account built to be measured." sub="Real-time visibility into ROAS, CPC, CTR and impression share — the metrics that actually map to revenue." />}>
            <GoogleAdsDashboard />
          </ContainerScroll>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="Ad placements" title="One campaign, every Google surface." sub="See how your security brand shows up across Search, Display, YouTube, Maps and Local Services." />
          <PlatformTabs tabs={[
            { label: 'Google Search Desktop', content: <AdPreviewCard ad={searchAd} /> },
            { label: 'Mobile Search', content: <AdPreviewCard ad={searchAd} mobile /> },
            { label: 'Display Network', content: <BannerAd /> },
            { label: 'YouTube Pre-roll', content: <YouTubeStoryboard /> },
            { label: 'Google Maps', content: <MapsLocalAd /> },
            { label: 'Local Services', content: <LocalServicesAd /> },
          ]} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="What's included" title="Everything that makes the campaign convert." />
          <Bento cells={bento} cols={3} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="How it works" title="From audit to scale in four steps." />
          <ProcessSteps steps={steps} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <SectionHead eyebrow="FAQ" title="Google Ads questions, answered honestly." />
          <FAQAccordion items={faqs} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <SectionHead eyebrow="Get started" title="Request your free Google Ads audit." sub="Tell us about your security business and we'll show you exactly where the wins are." />
          <ContactForm
            fields={formFields}
            submitLabel="Request my free audit →"
            successMsg="✓ Got it! We'll review your account and reply within 24 hours."
          />
        </div>
      </section>

      <CTABand
        title="Ready to turn search clicks into security contracts?"
        subtitle="Get a free Google Ads audit and a forecast of the leads your budget should be generating."
        ctaLabel="Get your free audit →"
        ctaHref="/contact/"
      />
    </>
  )
}
