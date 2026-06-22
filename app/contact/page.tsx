import SectionHead from '@/components/ui/SectionHead'
import ContactForm from '@/components/ui/ContactForm'
import AIVisibilityChallenge from '@/components/ui/AIVisibilityChallenge'
import Interactive3D from '@/components/ui/Interactive3D'
import Reveal from '@/components/ui/Reveal'
import JsonLd from '@/components/JsonLd'
import { contactPageSchema } from '@/lib/schema'

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with the AI visibility and SEO team built for the security industry. Response within 24 hours, 100% confidential.',
  alternates: { canonical: '/contact/' },
  openGraph: { siteName: 'SecurityBlogs', url: '/contact/' },
}

const details = [
  { icon: '📍', title: 'Australia', sub: 'Also serving US · UK · UAE · SG' },
  { icon: '📞', title: '+61 411 212 418', sub: 'Mon to Fri, 9am–5pm AEST' },
  { icon: '📧', title: 'info@securityblogs.com.au', sub: 'Email us anytime' },
  { icon: '⏰', title: 'Response within 24 hours', sub: 'Real humans, fast replies' },
  { icon: '🔒', title: '100% confidential, no spam', sub: 'Your data stays private' },
]

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'SecurityBlogs',
  url: 'https://securityblogs.com.au',
  telephone: '',
  email: 'hello@securityblogs.com.au',
  address: { '@type': 'PostalAddress', addressCountry: 'AU', addressRegion: 'NSW', addressLocality: 'Sydney' },
  areaServed: ['AU', 'US', 'UK', 'UAE', 'SG'],
  priceRange: '$$',
  description: 'AI visibility and SEO agency for the Australian security industry.',
}

export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactPageSchema({
        path: '/contact/',
        email: 'info@securityblogs.com.au',
        telephone: '+61411212418',
        contactType: 'customer support',
        areaServed: ['AU', 'US', 'GB', 'AE', 'SG'],
        availableLanguage: ['en-AU'],
      })} />
      <JsonLd data={localBusinessSchema} />
      {/* Full-screen interactive 3D hero */}
      <Interactive3D
        fullScreen
        eyebrow="Before you reach out"
        title={<>Let&apos;s make AI <span style={{ background: 'linear-gradient(180deg,#fff,#9fb4d6)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>recommend you</span></>}
        description="Tell us about your security brand and we'll show you exactly where AI cites your competitors instead of you — and the fastest path to becoming the answer. Drag the 3D model while you're here."
      />

      <section className="section">
        <div className="container" style={{ maxWidth: 760 }}>
          <SectionHead eyebrow="Try it now" title="How visible is your brand to AI?" sub="Answer five quick questions and get an instant AI visibility score plus tailored recommendations." />
          <AIVisibilityChallenge variant="full" />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="Or message us" title="Get in touch." />
          <div className="grid-2" style={{ gap: 40, alignItems: 'start' }}>
            <Reveal>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {details.map((d) => (
                  <div key={d.title} className="card" style={{ padding: 18 }}>
                    <div style={{ fontWeight: 600, fontSize: 15.5 }}>{d.title}</div>
                    <div className="text-soft" style={{ fontSize: 13.5 }}>{d.sub}</div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <ContactForm submitLabel="Send Message →" successMsg="✓ Message received! We'll be in touch within 24 hours." />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
