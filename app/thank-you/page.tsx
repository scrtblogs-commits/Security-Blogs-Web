import type { Metadata } from 'next'
import HeroBg from '@/components/ui/HeroBg'
import Breadcrumb from '@/components/ui/Breadcrumb'
import Reveal from '@/components/ui/Reveal'
import MagneticButton from '@/components/ui/MagneticButton'

export const metadata: Metadata = {
  title: 'Thank You',
  description: 'Your enquiry has been received. We will be in touch within one business day.',
  alternates: { canonical: '/thank-you/' },
  openGraph: { url: '/thank-you/' },
  // Thank-you page is reachable only post-submit. It carries no
  // standalone search value, so we keep it out of the index but let
  // crawlers follow the outbound CTAs.
  robots: { index: false, follow: true },
}

export default function ThankYouPage() {
  return (
    <HeroBg grid>
      <div className="center mx-auto" style={{ maxWidth: 720 }}>
        <Reveal>
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Thank You' }]} />
          <span className="badge badge-blue" style={{ marginBottom: 22 }}>
            <span className="dot dot-pulse" /> ENQUIRY RECEIVED
          </span>
          <h1 className="h1" style={{ marginBottom: 18 }}>
            Thanks — we&apos;ll be in touch{' '}
            <span style={{ color: 'var(--blue)', fontStyle: 'italic' }}>within one business day</span>.
          </h1>
          <p className="lead mx-auto" style={{ maxWidth: 580, marginBottom: 32 }}>
            Your message has landed in our inbox. While you wait, here are three reads worth your time.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <MagneticButton href="/case-studies/"          className="btn btn-outline btn-lg">Case studies →</MagneticButton>
            <MagneticButton href="/services/aio/"          className="btn btn-outline btn-lg">AI Optimisation →</MagneticButton>
            <MagneticButton href="/services/security-seo/" className="btn btn-primary btn-lg">Security SEO →</MagneticButton>
          </div>
        </Reveal>
      </div>
    </HeroBg>
  )
}
