import HeroBg from '@/components/ui/HeroBg'
import MagneticButton from '@/components/ui/MagneticButton'
import SectionHead from '@/components/ui/SectionHead'
import CTABand from '@/components/ui/CTABand'
import Reveal from '@/components/ui/Reveal'
import Breadcrumb from '@/components/ui/Breadcrumb'
import StatsStrip from '@/components/ui/StatsStrip'
import BingAdsCapabilities from './BingAdsCapabilities'
import BingAdsHowItWorks from './BingAdsHowItWorks'
import FAQAccordion from '@/components/ui/FAQAccordion'
import ContactForm from '@/components/ui/ContactForm'
import ContainerScroll from '@/components/ui/ContainerScroll'
import PlatformTabs from '@/components/ui/PlatformTabs'
import AdPreviewCard from '@/components/ui/AdPreviewCard'
import JsonLd from '@/components/JsonLd'
import { serviceSchema } from '@/lib/schema'
import PromoVideoSection from '@/components/ui/PromoVideoSection'

const ACCENT = '#0078d4'

export const metadata = {
  title: 'Bing Ads for Security Companies',
  description:
    'Microsoft Advertising campaigns that capture the B2B security buyers Google misses — lower CPCs, LinkedIn profile targeting and 41% of business decision-makers.',
  alternates: { canonical: '/services/bing-ads/' },
  openGraph: {
    title: 'Bing Ads for Security Companies — Lower CPC, Higher Intent | SecurityBlogs',
    description: 'Microsoft Advertising campaigns for security businesses — reach B2B buyers Google misses with lower CPCs and LinkedIn profile targeting.',
    url: '/services/bing-ads/',
    siteName: 'SecurityBlogs Australia',
    type: 'website',
    locale: 'en_AU',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'Bing Ads for Security Companies — SecurityBlogs' }],
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Bing Ads for Security Companies — 41% Lower CPC',
    description: 'Microsoft Advertising campaigns for security businesses — reach B2B buyers Google misses.',
    images: ['/logo.png'],
  },
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

function BingAdsDashboard() {
  const bars = [38, 52, 47, 63, 70, 66, 81, 77, 90, 85, 100, 94]
  return (
    <div style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
      <div className="flex items-center justify-between" style={{ padding: '14px 18px', borderBottom: '1px solid var(--line)' }}>
        <div className="flex items-center gap-2">
          <span style={{ width: 26, height: 26, borderRadius: 7, display: 'grid', placeItems: 'center', background: `${ACCENT}22`, fontSize: 14 }}>🔷</span>
          <strong style={{ fontFamily: 'var(--font-display)', fontSize: 15 }}>Microsoft Advertising · B2B Security</strong>
        </div>
        <span className="chip" style={{ color: ACCENT, borderColor: ACCENT }}>● Live</span>
      </div>

      <div style={{ padding: 18 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }} className="ba-tiles">
          <MetricTile label="Avg CPC" value="$8.40" delta="2.1× lower" />
          <MetricTile label="Conv. Rate" value="6.4%" delta="+180%" />
          <MetricTile label="B2B Share" value="41%" delta="of buyers" />
          <MetricTile label="Conversions" value="142" delta="+38 MoM" />
        </div>

        <div className="ba-chart-row" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 14, marginTop: 16 }}>
          <div style={{ background: 'var(--bg-card-2)', border: '1px solid var(--line)', borderRadius: 14, padding: 16 }}>
            <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
              <strong style={{ fontSize: 13.5 }}>B2B conversions · last 12 weeks</strong>
              <span className="chip">Search + Audience</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 130 }}>
              {bars.map((b, i) => (
                <div key={i} style={{ flex: 1, height: `${b}%`, borderRadius: '6px 6px 2px 2px', background: `linear-gradient(180deg, ${ACCENT}, ${ACCENT}55)` }} />
              ))}
            </div>
          </div>
          <div style={{ background: 'var(--bg-card-2)', border: '1px solid var(--line)', borderRadius: 14, padding: 16 }}>
            <strong style={{ fontSize: 13.5 }}>Cost-per-click vs Google</strong>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
              <div>
                <div className="flex justify-between" style={{ fontSize: 12.5, marginBottom: 6 }}><span className="text-soft">Google</span><strong>$17.60</strong></div>
                <div className="meter"><span style={{ width: '100%', background: 'var(--text-dim)' }} /></div>
              </div>
              <div>
                <div className="flex justify-between" style={{ fontSize: 12.5, marginBottom: 6 }}><span className="text-soft">Microsoft</span><strong style={{ color: ACCENT }}>$8.40</strong></div>
                <div className="meter"><span style={{ width: '48%', background: ACCENT }} /></div>
              </div>
            </div>
            <p className="text-soft center" style={{ fontSize: 12.5, marginTop: 14 }}>Same buyer intent, ~52% cheaper</p>
          </div>
        </div>
      </div>
      <style>{`@media (max-width:640px){.ba-tiles{grid-template-columns:1fr 1fr!important}.ba-chart-row{grid-template-columns:1fr!important}}`}</style>
    </div>
  )
}

function NativeArticleAd() {
  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden', maxWidth: 560, margin: '0 auto' }}>
      <div style={{ aspectRatio: '16/8', background: 'linear-gradient(135deg,#11203a,#0078d4)', display: 'grid', placeItems: 'center', color: '#fff', fontSize: 30 }}>🏢</div>
      <div style={{ padding: 18 }}>
        <span className="text-dim" style={{ fontSize: 11.5, fontFamily: 'var(--font-mono)' }}>SPONSORED · Microsoft Audience Network</span>
        <h4 style={{ fontSize: 18, margin: '6px 0 8px' }}>Why Facility Managers Are Switching Security Providers in 2026</h4>
        <p className="text-soft" style={{ fontSize: 13.5 }}>The hidden cost of outdated access control — and how AS2201-certified systems are changing commercial site security.</p>
        <div className="flex items-center gap-2" style={{ marginTop: 12 }}>
          <span className="chip">securityblogs.com.au</span>
          <span className="chip" style={{ color: ACCENT, borderColor: ACCENT }}>Read more →</span>
        </div>
      </div>
    </div>
  )
}

function LinkedInTargeting() {
  const rows = [
    { label: 'Job title', value: 'Security Manager', extra: ['Facilities Director', 'Head of Operations'] },
    { label: 'Industry', value: 'Physical Security', extra: ['Commercial Real Estate', 'Logistics'] },
    { label: 'Company size', value: '50–500 employees', extra: ['500–1,000'] },
    { label: 'Seniority', value: 'Manager & above', extra: ['Director', 'VP'] },
  ]
  return (
    <div className="card" style={{ padding: 22, maxWidth: 620, margin: '0 auto' }}>
      <div className="flex items-center gap-2" style={{ marginBottom: 16 }}>
        <span style={{ width: 26, height: 26, borderRadius: 6, background: '#0a66c2', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: 13 }}>in</span>
        <strong style={{ fontFamily: 'var(--font-display)', fontSize: 16 }}>LinkedIn Profile Targeting</strong>
        <span className="chip" style={{ marginLeft: 'auto' }}>Microsoft × LinkedIn</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {rows.map((r) => (
          <div key={r.label} className="flex items-center gap-3" style={{ flexWrap: 'wrap', paddingBottom: 12, borderBottom: '1px solid var(--line)' }}>
            <span className="text-dim" style={{ fontSize: 12.5, fontFamily: 'var(--font-mono)', width: 110 }}>{r.label}</span>
            <span className="chip" style={{ color: ACCENT, borderColor: ACCENT, fontWeight: 600 }}>{r.value}</span>
            {r.extra.map((e) => <span key={e} className="chip">{e}</span>)}
          </div>
        ))}
      </div>
      <p className="text-soft" style={{ fontSize: 13, marginTop: 14 }}>Reach security decision-makers by their real LinkedIn profile data — only available on Microsoft Advertising.</p>
    </div>
  )
}

function BingMapsAd() {
  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{ position: 'relative', height: 160, background: 'linear-gradient(135deg,#dbeafe,#eef3fb)' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px)', backgroundSize: '32px 32px', opacity: 0.6 }} />
        <div style={{ position: 'absolute', top: '42%', left: '46%' }}>
          <div style={{ width: 30, height: 30, borderRadius: '50% 50% 50% 0', transform: 'rotate(-45deg)', background: ACCENT, boxShadow: `0 6px 16px -4px ${ACCENT}99` }} />
        </div>
        <span style={{ position: 'absolute', top: 10, left: 12, fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 5, background: '#0d1117', color: '#fff' }}>Ad</span>
      </div>
      <div style={{ padding: 18 }}>
        <strong style={{ fontFamily: 'var(--font-display)', fontSize: 17 }}>Security Solutions — Sydney CBD</strong>
        <div className="flex items-center gap-2" style={{ fontSize: 13, margin: '4px 0' }}>
          <span style={{ color: ACCENT }}>★★★★★</span><span className="text-soft">4.9 (218) · Commercial security · Bing Maps</span>
        </div>
        <p className="text-soft" style={{ fontSize: 13.5 }}>Open 24 hours · AS2201 certified installers · 12 min away</p>
        <div className="flex flex-wrap gap-2" style={{ marginTop: 12 }}>
          <span className="chip">Directions</span><span className="chip">Call now</span><span className="chip">Website</span>
        </div>
      </div>
    </div>
  )
}

function EdgeNewTabAd() {
  return (
    <div className="card" style={{ padding: 18, maxWidth: 560, margin: '0 auto' }}>
      <div className="flex items-center gap-2" style={{ marginBottom: 14 }}>
        <span style={{ fontSize: 16 }}>🌐</span>
        <strong style={{ fontFamily: 'var(--font-display)', fontSize: 15 }}>Microsoft Edge · New Tab</strong>
        <span className="text-dim" style={{ fontSize: 11.5, marginLeft: 'auto', fontFamily: 'var(--font-mono)' }}>SPONSORED</span>
      </div>
      <div className="flex items-center gap-3" style={{ background: 'var(--bg-card-2)', border: '1px solid var(--line)', borderRadius: 14, padding: 14 }}>
        <div style={{ width: 64, height: 64, borderRadius: 12, background: 'linear-gradient(135deg,#11203a,#0078d4)', display: 'grid', placeItems: 'center', color: '#fff', fontSize: 24, flexShrink: 0 }}>🛡️</div>
        <div>
          <strong style={{ fontFamily: 'var(--font-display)', fontSize: 15.5 }}>Upgrade Your Building Security in 2026</strong>
          <p className="text-soft" style={{ fontSize: 13, margin: '4px 0' }}>Enterprise CCTV & access control, monitored 24/7. Free site survey for NSW businesses.</p>
          <span style={{ color: ACCENT, fontSize: 12.5, fontWeight: 600 }}>securityblogs.com.au →</span>
        </div>
      </div>
    </div>
  )
}

const searchAd = {
  badge: 'Ad',
  badgeColor: '#0d1117',
  url: 'securityblogs.com.au',
  headline: 'Commercial Security Sydney | 24/7 Monitoring From $49/mo',
  headline2: 'B2B CCTV & Access Control | Free Site Survey',
  desc: 'Trusted by 500+ Australian businesses. AS2201 certified installers, enterprise-grade systems and ongoing support. Request your quote.',
  desc2: 'CCTV • Access Control • Alarms • 24/7 Monitoring. Built for facility & operations managers.',
  sitelinks: ['Get Free Quote', 'View CCTV Systems', 'Access Control', 'Contact Us'],
  callouts: ['24/7 Support', 'AS2201 Certified', 'Free Site Survey', 'No Lock-in Contracts'],
}

const bento = [
  { icon: '💼', title: 'LinkedIn Audience Targeting', desc: 'Target security buyers by job title, industry, company size and seniority — profile data only Microsoft can offer.' },
  { icon: '💲', title: 'Lower CPCs Than Google', desc: 'Less competition on Microsoft means the same high-intent security clicks at roughly half the cost-per-click.' },
  { icon: '🧑‍💼', title: 'B2B Decision Makers', desc: '41% of B2B buyers use Bing and Microsoft properties — often older, higher-budget commercial decision-makers.' },
  { icon: '🔬', title: 'Microsoft Clarity Analytics', desc: 'Free session recordings and heatmaps reveal exactly how security buyers interact with your landing pages.' },
  { icon: '🔁', title: 'Sequential Remarketing', desc: 'Show buyers a story across the Audience Network — awareness, proof, then offer — until they convert.' },
  { icon: '🕵️', title: 'Competitor Intelligence', desc: 'Conquest rival security brands and use auction insights to find gaps Google advertisers are ignoring.' },
]

const steps = [
  { title: 'Import & Audit', desc: 'We import your proven Google structure, then re-tune it for Microsoft’s lower-competition B2B audience.' },
  { title: 'Layer LinkedIn Targeting', desc: 'Add job-title, industry and company-size targeting to put your ads in front of the right decision-makers.' },
  { title: 'Launch & Track', desc: 'Conversion tracking and Microsoft Clarity go live so every B2B lead is measured and attributed.' },
  { title: 'Optimise & Expand', desc: 'Scale into the Audience Network and Edge placements as cost-per-lead drops and quality improves.' },
]

const faqs = [
  { q: 'Why advertise on Bing if Google is bigger?', a: 'Bing and Microsoft properties reach roughly 41% of B2B buyers — often older, higher-budget facility and operations managers — with far less advertiser competition. That means lower CPCs and frequently a cheaper cost-per-lead than Google for the exact same security keywords.' },
  { q: 'How much cheaper are the clicks really?', a: 'In our security accounts Microsoft CPCs typically run 40–55% below Google for equivalent commercial keywords. Your mileage varies by region and competition, but the lower auction pressure consistently produces a more efficient cost-per-lead for B2B security offers.' },
  { q: 'Can you really target by LinkedIn profile?', a: 'Yes — this is Microsoft Advertising’s killer feature. Because Microsoft owns LinkedIn, you can layer targeting by job title (e.g. Security Manager), industry (e.g. Physical Security) and company size onto your search and audience campaigns. No other major ad platform offers this.' },
  { q: 'Do I need to start from scratch?', a: 'No. If you already run Google Ads we import your campaigns directly into Microsoft, then re-optimise bids, keywords and targeting for the different audience. You get a running start instead of rebuilding from zero.' },
  { q: 'What does management cost?', a: 'A transparent management fee scaled to your account size, with no markup on your ad spend — your media budget goes straight to Microsoft. We’ll quote it clearly before you commit so there are no surprises.' },
  { q: 'What is the Microsoft Audience Network?', a: 'It’s Microsoft’s native placement network across MSN, Outlook, Edge and partner sites. We use it for sequential remarketing — showing security buyers awareness, proof and offer creative in sequence until they request a quote.' },
]

const formFields = [
  { name: 'name', label: 'Name', required: true },
  { name: 'email', label: 'Email', type: 'email' as const, required: true },
  { name: 'phone', label: 'Phone' },
  { name: 'company', label: 'Company' },
  { name: 'website', label: 'Current website URL', placeholder: 'https://' },
  { name: 'budget', label: 'Monthly ad budget', type: 'select' as const, options: ['$0–1.5k', '$1.5k–3k', '$3k–8k', '$8k+'] },
  { name: 'message', label: 'What are your B2B growth goals?', type: 'textarea' as const, required: true, full: true },
]

export default function BingAdsPage() {
  return (
    <>
      <JsonLd data={serviceSchema({
        name: 'Bing Ads for Security',
        description: 'Microsoft Advertising campaigns that capture the B2B security buyers Google misses — lower CPCs, LinkedIn profile targeting and 41% of business decision-makers.',
        slug: 'bing-ads',
        serviceType: 'Search Engine Marketing',
      })} />
      <HeroBg grid>
        <Reveal>
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services/' }, { label: 'Bing Ads' }]} />
          <span className="badge" style={{ marginBottom: 22, color: ACCENT, borderColor: `${ACCENT}66`, background: `${ACCENT}14` }}>
            <span className="dot dot-pulse" style={{ background: ACCENT }} /> MICROSOFT ADVERTISING · B2B SECURITY
          </span>
          <h1 className="h1" style={{ marginBottom: 20, maxWidth: 920 }}>
            Capture the B2B Security Buyers{' '}
            <span style={{ color: ACCENT, fontStyle: 'italic' }}>Google Misses</span>
          </h1>
          <p className="lead" style={{ maxWidth: 660, marginBottom: 28 }}>
            Microsoft Advertising puts your security brand in front of 41% of B2B decision-makers — at
            roughly half the cost-per-click of Google, with LinkedIn profile targeting built in.
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
            { num: '2.1×', label: 'Lower CPC than Google' },
            { num: '41%', label: 'Of B2B buyers use Bing/Microsoft' },
            { num: '+180%', label: 'Average conversion rate' },
            { num: '$8.40', label: 'Average CPC' },
          ]} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <ContainerScroll title={<SectionHead eyebrow="Live performance" title="A Microsoft Ads account tuned for B2B." sub="Lower CPCs, higher conversion rates and LinkedIn-grade targeting — measured against your Google baseline." />}>
            <BingAdsDashboard />
          </ContainerScroll>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="Ad placements" title="Every Microsoft surface your buyers use." sub="From Bing Search to LinkedIn targeting, the Audience Network and Edge new-tab placements." />
          <PlatformTabs tabs={[
            { label: 'Bing Search Desktop', content: <AdPreviewCard ad={searchAd} /> },
            { label: 'Bing Mobile Search', content: <AdPreviewCard ad={searchAd} mobile /> },
            { label: 'Microsoft Audience Network', content: <NativeArticleAd /> },
            { label: 'LinkedIn Profile Targeting', content: <LinkedInTargeting /> },
            { label: 'Bing Maps Local Ad', content: <BingMapsAd /> },
            { label: 'Microsoft Edge New Tab', content: <EdgeNewTabAd /> },
          ]} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="What's included" title="The B2B advantages only Microsoft offers." />
          <BingAdsCapabilities />
        </div>
      </section>

      <BingAdsHowItWorks />

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <SectionHead eyebrow="FAQ" title="Bing Ads questions, answered honestly." />
          <FAQAccordion items={faqs} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <SectionHead eyebrow="Get started" title="Request your free Microsoft Ads audit." sub="Tell us about your security business and we'll find the B2B buyers Google is missing." />
          <ContactForm
            fields={formFields}
            submitLabel="Request my free audit →"
            successMsg="✓ Got it! We'll review your account and reply within 24 hours."
          />
        </div>
      </section>

      <PromoVideoSection
        eyebrow="See Bing Ads in action"
        title="Capture the B2B security buyers Google misses"
        subtitle="Microsoft Advertising reaches 41% of business decision-makers your competitors ignore on Google — with lower CPCs, LinkedIn profile targeting, and campaigns built for security brands."
        accent={ACCENT}
      />

      <CTABand
        title="Capture the buyers your competitors ignore →"
        subtitle="Get a free Microsoft Advertising audit and see how much cheaper your B2B security leads could be."
        ctaLabel="Get your free audit →"
        ctaHref="/contact/"
      />
    </>
  )
}
