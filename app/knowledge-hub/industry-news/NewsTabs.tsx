'use client'
import PlatformTabs from '@/components/ui/PlatformTabs'

type NewsItem = { date: string; source: string; headline: string; summary: string }

const allNews: NewsItem[] = [
  { date: 'May 20, 2026', source: 'SecurityWeek', headline: 'Cloud access-control vendor raises $120M Series D', summary: 'The round values the mobile-credential platform at $1.4B as enterprises shift off legacy badge systems.' },
  { date: 'May 17, 2026', source: 'IFSEC Global', headline: 'AI Overviews now name security installers by default', summary: 'Google confirms local service queries increasingly return AI-generated provider shortlists.' },
  { date: 'May 14, 2026', source: 'SSI', headline: 'Two regional monitoring firms announce merger', summary: 'The combined entity will serve 400,000 accounts across the US Midwest.' },
  { date: 'May 11, 2026', source: 'TechCrunch', headline: 'New EU regulation tightens video-surveillance data rules', summary: 'Operators face stricter retention limits and consent requirements from Q4.' },
]

const acquisitions: NewsItem[] = [
  { date: 'May 19, 2026', source: 'SDM Magazine', headline: 'Platform vendor acquires cloud-native VMS startup', summary: 'The deal adds AI video analytics to an existing enterprise integration portfolio.' },
  { date: 'May 14, 2026', source: 'SSI', headline: 'Two regional monitoring firms announce merger', summary: 'Consolidation continues among central stations chasing scale and recurring revenue.' },
  { date: 'May 6, 2026', source: 'Security Sales', headline: 'Private equity backs national alarm rollup', summary: 'A new fund targets fragmented residential installers across five states.' },
  { date: 'Apr 28, 2026', source: 'SecurityWeek', headline: 'Identity vendor buys passwordless authentication firm', summary: 'The acquisition strengthens enterprise access-management offerings.' },
]

const launches: NewsItem[] = [
  { date: 'May 18, 2026', source: 'IPVM', headline: 'New edge AI camera ships with on-device analytics', summary: 'Manufacturer promises lower bandwidth and privacy-preserving inference at the edge.' },
  { date: 'May 12, 2026', source: 'SDM Magazine', headline: 'Monitoring platform launches AI alarm triage', summary: 'The feature aims to cut false dispatches by prioritising verified events.' },
  { date: 'May 5, 2026', source: 'Security Sales', headline: 'Installer CRM adds AI proposal generation', summary: 'The tool drafts security system quotes from a site walkthrough video.' },
  { date: 'Apr 30, 2026', source: 'IFSEC Global', headline: 'Cloud access platform debuts visitor-management module', summary: 'Targets multi-tenant offices with mobile check-in workflows.' },
]

const regulation: NewsItem[] = [
  { date: 'May 11, 2026', source: 'TechCrunch', headline: 'EU tightens video-surveillance data rules', summary: 'New retention limits and consent rules take effect across member states in Q4.' },
  { date: 'May 3, 2026', source: 'SecurityWeek', headline: 'US state passes biometric-consent law for access systems', summary: 'Operators must obtain explicit opt-in before storing facial templates.' },
  { date: 'Apr 25, 2026', source: 'IFSEC Global', headline: 'UK updates licensing standards for security firms', summary: 'Revised SIA requirements emphasise data handling and AI transparency.' },
  { date: 'Apr 18, 2026', source: 'SSI', headline: 'Industry body issues AI-monitoring ethics guidance', summary: 'Voluntary framework covers bias testing and human-in-the-loop review.' },
]

const aiTech: NewsItem[] = [
  { date: 'May 17, 2026', source: 'IFSEC Global', headline: 'AI Overviews now name security installers by default', summary: 'Local provider shortlists are increasingly generated rather than ranked.' },
  { date: 'May 9, 2026', source: 'IPVM', headline: 'Open model benchmarks released for security video analytics', summary: 'Independent testing compares detection accuracy across leading vendors.' },
  { date: 'May 2, 2026', source: 'SecurityWeek', headline: 'Perplexity expands citations for B2B service queries', summary: 'Answer engine adds richer source attribution for vendor recommendations.' },
  { date: 'Apr 24, 2026', source: 'TechCrunch', headline: 'Major LLM update improves local-business reasoning', summary: 'Better entity grounding could reshape how AI recommends security firms.' },
]

function NewsList({ items }: { items: NewsItem[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {items.map((n, i) => (
        <div key={i} className="card" style={{ padding: 22 }}>
          <div className="flex items-center gap-2" style={{ marginBottom: 10 }}>
            <span className="text-dim" style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5 }}>{n.date}</span>
            <span className="chip">{n.source}</span>
          </div>
          <h3 style={{ fontSize: 18, marginBottom: 6 }}>{n.headline}</h3>
          <p className="text-soft" style={{ fontSize: 14.5 }}>{n.summary}</p>
        </div>
      ))}
    </div>
  )
}

export default function NewsTabs() {
  return (
    <PlatformTabs
      tabs={[
        { label: 'All News', content: <NewsList items={allNews} /> },
        { label: 'Acquisitions', content: <NewsList items={acquisitions} /> },
        { label: 'Product Launches', content: <NewsList items={launches} /> },
        { label: 'Regulation', content: <NewsList items={regulation} /> },
        { label: 'AI & Tech', content: <NewsList items={aiTech} /> },
      ]}
    />
  )
}
