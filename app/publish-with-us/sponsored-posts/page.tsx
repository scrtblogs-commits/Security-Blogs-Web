import HeroBg from '@/components/ui/HeroBg'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHead from '@/components/ui/SectionHead'
import PricingCards from '@/components/ui/PricingCards'
import ProcessSteps from '@/components/ui/ProcessSteps'
import FAQAccordion from '@/components/ui/FAQAccordion'
import CTABand from '@/components/ui/CTABand'
import Reveal from '@/components/ui/Reveal'
import JsonLd from '@/components/JsonLd'
import { serviceSchema } from '@/lib/schema'

export const metadata = {
  title: 'Sponsored Posts · Publish With Us',
  description:
    'Promote your security brand with sponsored posts on SecurityBlogs. Permanent placement, dofollow links and full editorial promotion from $149 AUD.',
  alternates: { canonical: '/publish-with-us/sponsored-posts/' },
  openGraph: { url: '/publish-with-us/sponsored-posts/' },
}

const plans = [
  {
    name: 'Standard',
    price: '$149',
    period: ' AUD',
    features: ['1 dofollow link', 'Permanent placement', 'Social share', 'Published in 3 days'],
    cta: 'Choose Standard',
    ctaHref: '/contact/',
  },
  {
    name: 'Featured Homepage',
    price: '$299',
    period: ' AUD',
    featured: true,
    badge: '⭐ Most Popular',
    features: ['Homepage feature 7 days', '2 dofollow links', 'Newsletter mention', 'Priority publishing'],
    cta: 'Choose Featured',
    ctaHref: '/contact/',
  },
  {
    name: 'Authority Series',
    price: '$1,250',
    period: ' AUD',
    features: ['5-article series', 'Homepage + category features', '3 dofollow links each', 'Dedicated promotion', 'Quarterly refresh'],
    cta: 'Choose Authority',
    ctaHref: '/contact/',
  },
]

const included = [
  { icon: '🔗', title: 'Dofollow links', desc: 'Editorially-placed, niche-relevant links that pass real SEO authority.' },
  { icon: '♾️', title: 'Permanent placement', desc: 'Your post stays live indefinitely — no expiry, no take-downs.' },
  { icon: '📣', title: 'Social promotion', desc: 'Shared across our social channels to drive immediate referral traffic.' },
  { icon: '✍️', title: 'Editorial polish', desc: 'Our team formats, optimises and proofs your content before it goes live.' },
]

const steps = [
  { title: 'Choose a package', desc: 'Pick the tier that matches your goals and budget.' },
  { title: 'Send your brief', desc: 'Share your draft or topic plus target links and key messages.' },
  { title: 'We produce & review', desc: 'Our editors format, optimise and confirm the final piece with you.' },
  { title: 'Publish & promote', desc: 'Your post goes live and we kick off social and newsletter promotion.' },
]

const faqs = [
  { q: 'Are sponsored posts marked as sponsored?', a: 'Yes. To stay compliant and transparent, sponsored content carries a clear disclosure label, while still passing dofollow link value.' },
  { q: 'How long does placement last?', a: 'All sponsored posts are permanent — they remain live on the site indefinitely with no recurring fees.' },
  { q: 'Can you write the article for me?', a: 'Absolutely. Send us a brief and our editorial team can produce the full piece, or we can polish a draft you provide.' },
  { q: 'What links are allowed?', a: 'Dofollow links to relevant, reputable destinations are included per package. We do not link to spam, adult, gambling or unrelated content.' },
]

export default function SponsoredPostsPage() {
  return (
    <>
      <JsonLd data={serviceSchema({
        name: 'Sponsored Posts',
        description: 'Promote your security brand with sponsored posts on SecurityBlogs. Permanent placement, disclosed sponsored content with transparent labeling.',
        path: '/publish-with-us/sponsored-posts/',
        serviceType: 'Sponsored Content',
      })} />
      <HeroBg grid>
        <Reveal>
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Publish With Us', href: '/publish-with-us/' }, { label: 'Sponsored Posts' }]} />
          <span className="badge badge-blue" style={{ marginBottom: 20 }}>
            <span className="dot dot-pulse" /> SPONSORED CONTENT
          </span>
          <h1 className="h1" style={{ maxWidth: 820, marginBottom: 18 }}>
            Sponsored{' '}
            <span style={{ color: 'var(--blue)', fontStyle: 'italic' }}>Posts</span>.
          </h1>
          <p className="lead" style={{ maxWidth: 640 }}>
            Get your security brand in front of an engaged, in-market audience with permanent,
            editorially-promoted placements that carry real dofollow link authority.
          </p>
        </Reveal>
      </HeroBg>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Pricing" title="Choose your sponsored package." sub="Transparent, one-time pricing in AUD — no recurring fees, no surprises." />
          <PricingCards plans={plans} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="What's included" title="Every sponsored post comes with." />
          <div className="grid-4" style={{ gap: 18 }}>
            {included.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.08}>
                <div className="card" style={{ height: '100%' }}>
                  <div style={{ fontSize: 26, marginBottom: 12 }}>{b.icon}</div>
                  <h4 style={{ fontSize: 16, marginBottom: 6 }}>{b.title}</h4>
                  <p className="text-soft" style={{ fontSize: 13.5 }}>{b.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="How it works" title="From brief to published in days." />
          <ProcessSteps steps={steps} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <SectionHead eyebrow="FAQ" title="Sponsored post questions." />
          <FAQAccordion items={faqs} />
        </div>
      </section>

      <CTABand
        title="Ready to launch your sponsored post?"
        subtitle="Pick a package above or talk to our team about a custom multi-post campaign."
        ctaLabel="Book a placement →"
        ctaHref="/contact/"
      />
    </>
  )
}
