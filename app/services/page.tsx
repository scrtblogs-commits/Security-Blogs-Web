import HeroBg from '@/components/ui/HeroBg'
import MagneticButton from '@/components/ui/MagneticButton'
import SectionHead from '@/components/ui/SectionHead'
import CTABand from '@/components/ui/CTABand'
import Reveal from '@/components/ui/Reveal'
import Breadcrumb from '@/components/ui/Breadcrumb'
import JsonLd from '@/components/JsonLd'
import { itemListSchema } from '@/lib/schema'
import { services } from '@/lib/site'
import ServicesHeroVisual from './ServicesHeroVisual'
import ServiceFlipShowcase from './ServiceFlipShowcase'
import WhyCards from './WhyCards'

export const metadata = {
  title: 'AI-Powered Growth Services for Security Brands',
  description:
    'From SEO to AI citations, Google Ads to web design — every SecurityBlogs service is engineered exclusively for the security industry.',
  alternates: { canonical: '/services/' },
  openGraph: { siteName: 'SecurityBlogs', url: '/services/' },
}


export default function ServicesPage() {
  return (
    <>
      <HeroBg grid>
        <div className="grid-2" style={{ alignItems: 'center', gap: 48 }}>
          <Reveal>
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Services' }]} />
            <span className="badge badge-blue" style={{ marginBottom: 22 }}>
              <span className="dot dot-pulse" /> 7 SERVICES · ONE GROWTH ENGINE
            </span>
            <h1 className="h1" style={{ marginBottom: 20, maxWidth: 880 }}>
              AI-Powered Growth Services for{' '}
              <span style={{ color: 'var(--blue)', fontStyle: 'italic' }}>Security Brands</span>
            </h1>
            <p className="lead" style={{ maxWidth: 640, marginBottom: 28 }}>
              From SEO to AI citations, Google Ads to web design — every service is built exclusively
              for the security industry.
            </p>
            <div className="flex flex-wrap gap-3">
              <MagneticButton href="/contact/" className="btn btn-primary btn-lg">Get your free audit →</MagneticButton>
              <MagneticButton href="/book-strategy-call/" className="btn btn-outline btn-lg">Book a strategy call</MagneticButton>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <ServicesHeroVisual />
          </Reveal>
        </div>
      </HeroBg>

      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="What we do"
            title="Every channel security buyers use to discover you."
            sub="Scroll through the cards to explore each service in depth."
          />
          <ServiceFlipShowcase />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="Why SecurityBlogs?" title="Built differently — for one industry, for the AI era." />
          <WhyCards />
        </div>
      </section>

      <JsonLd data={itemListSchema({
        name: 'SecurityBlogs services',
        path: '/services/',
        items: services.map(s => ({
          name: s.title,
          url: `/services/${s.slug}/`,
          description: s.desc,
        })),
      })} />
      <CTABand
        title="Not sure which service you need?"
        subtitle="Get a free AI visibility audit and we'll show you exactly which channels will move the needle fastest for your security brand."
        ctaLabel="Get your free audit →"
        ctaHref="/contact/"
      />
    </>
  )
}
