import HeroBg from '@/components/ui/HeroBg'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHead from '@/components/ui/SectionHead'
import ContactForm from '@/components/ui/ContactForm'
import AIVisibilityChallenge from '@/components/ui/AIVisibilityChallenge'
import Interactive3D from '@/components/ui/Interactive3D'
import Reveal from '@/components/ui/Reveal'

export const metadata = {
  title: 'Contact · SecurityGrowth',
  description: 'Get in touch with the AI visibility and SEO team built for the security industry. Response within 24 hours, 100% confidential.',
}

const details = [
  { icon: '📍', title: 'Australia', sub: 'Also serving US · UK · UAE · SG' },
  { icon: '📧', title: 'info@securityblogs.com.au', sub: 'Email us anytime' },
  { icon: '⏰', title: 'Response within 24 hours', sub: 'Real humans, fast replies' },
  { icon: '🔒', title: '100% confidential, no spam', sub: 'Your data stays private' },
]

export default function ContactPage() {
  return (
    <>
      <HeroBg grid blobs>
        <div className="center mx-auto" style={{ maxWidth: 760 }}>
          <Reveal>
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />
            <span className="badge badge-blue" style={{ marginBottom: 22 }}>
              <span className="dot dot-pulse" /> LET&apos;S TALK
            </span>
            <h1 className="h1" style={{ marginBottom: 20 }}>
              Let&apos;s get your brand{' '}
              <span style={{ color: 'var(--blue)', fontStyle: 'italic' }}>cited</span>.
            </h1>
            <p className="lead mx-auto" style={{ maxWidth: 560 }}>
              Take the AI visibility challenge below, or send us a message — we reply within 24 hours.
            </p>
          </Reveal>
        </div>
      </HeroBg>

      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <Reveal>
            <Interactive3D
              eyebrow="Before you reach out"
              title={<>Let&apos;s make AI <span style={{ background: 'linear-gradient(180deg,#fff,#9fb4d6)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>recommend you</span></>}
              description="Tell us about your security brand and we'll show you exactly where AI cites your competitors instead of you — and the fastest path to becoming the answer. Drag the 3D model while you're here."
            />
          </Reveal>
        </div>
      </section>

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
                  <div key={d.title} className="card flex items-center gap-3" style={{ padding: 18 }}>
                    <span style={{ fontSize: 26 }}>{d.icon}</span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 15.5 }}>{d.title}</div>
                      <div className="text-soft" style={{ fontSize: 13.5 }}>{d.sub}</div>
                    </div>
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
