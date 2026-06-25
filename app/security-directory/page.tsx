import HeroBg from '@/components/ui/HeroBg'
import MagneticButton from '@/components/ui/MagneticButton'
import CTABand from '@/components/ui/CTABand'
import Reveal from '@/components/ui/Reveal'
import Breadcrumb from '@/components/ui/Breadcrumb'
import JsonLd from '@/components/JsonLd'
import DirectoryClient from '@/components/ui/DirectoryClient'
import DirectoryHowItWorks from '@/components/ui/DirectoryHowItWorks'
import DirectoryListBusiness from '@/components/ui/DirectoryListBusiness'
import { serviceSchema } from '@/lib/schema'

export const metadata = {
  title: "Australia's #1 AI-Verified Security Company Directory",
  description:
    'Find and compare verified Australian security companies ranked by AI visibility score, client reviews and industry authority.',
  alternates: { canonical: '/security-directory/' },
  openGraph: { siteName: 'SecurityBlogs', url: '/security-directory/' },
}

export default function SecurityDirectoryPage() {
  return (
    <>
      <JsonLd data={serviceSchema({
        name: 'Security Directory Listing',
        description: "AI-verified directory listing service for Australian security companies. Get your business listed, verified, scored on AI visibility and discovered by buyers on SecurityBlogs's directory.",
        path: '/security-directory/',
        serviceType: 'Business Directory Listing',
      })} />

      {/* 1 ── Hero */}
      <HeroBg grid>
        <Reveal>
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Directory' }]} />
          <span className="badge badge-blue" style={{ marginBottom: 22 }}>
            <span className="dot dot-pulse" /> 200+ VERIFIED COMPANIES
          </span>
          <h1 className="h1" style={{ marginBottom: 20, maxWidth: 900 }}>
            Australia's <span style={{ color: 'var(--blue)' }}>#1</span> AI-Verified Security Company{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--violet)' }}>Directory</span>
          </h1>
          <p className="lead" style={{ maxWidth: 660, marginBottom: 28 }}>
            Find and compare verified security companies ranked by AI visibility score, client reviews
            and industry authority. Subscribe free to unlock full contact details.
          </p>
          <div className="flex flex-wrap gap-3">
            <MagneticButton href="#directory" className="btn btn-primary btn-lg">Browse the directory →</MagneticButton>
            <MagneticButton href="#list-your-business" className="btn btn-outline btn-lg">List my business free</MagneticButton>
          </div>
        </Reveal>
      </HeroBg>

      {/* 2 ── Company listings */}
      <div id="directory">
        <DirectoryClient />
      </div>

      {/* 3 ── How it works (visitor journey) */}
      <DirectoryHowItWorks />

      {/* 4 ── Get your business listed */}
      <DirectoryListBusiness />

      {/* 5 ── Final CTA above footer */}
      <CTABand
        title="Ready to get your security business found?"
        subtitle="Join 200+ verified Australian security companies already listed. Free to start, live in minutes."
        ctaLabel="List my business free →"
        ctaHref="/contact/"
      />
    </>
  )
}
