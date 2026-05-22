'use client'
import PlatformTabs from '@/components/ui/PlatformTabs'

type Trend = { title: string; stat: string; analysis: string }

const aiVisibility: Trend[] = [
  { title: 'AI answers replace the shortlist', stat: '60% of queries', analysis: 'Buyers increasingly skip the SERP entirely, asking AI for a ranked provider list. Entity authority becomes the new page one.' },
  { title: 'Citation rate is the new ranking', stat: '3× weight', analysis: 'How often an engine names you now matters more than position. Brands track share of citation across engines.' },
  { title: 'Structured data goes mainstream', stat: '+45% adoption', analysis: 'Security sites ship richer schema as AI crawlers reward machine-readable, well-attributed content.' },
  { title: 'Multi-engine optimisation matters', stat: '5+ engines', analysis: 'Winning means being cited across ChatGPT, Gemini, Perplexity, Copilot and AI Overviews — not just Google.' },
]

const physical: Trend[] = [
  { title: 'Mobile credentials overtake badges', stat: '54% of new deployments', analysis: 'Enterprises retire physical cards as phone-based access becomes the default for new builds.' },
  { title: 'Edge AI video analytics scale', stat: '2.1× growth', analysis: 'On-device inference cuts bandwidth and addresses privacy concerns, accelerating smart-camera rollouts.' },
  { title: 'Cloud VMS becomes standard', stat: '70% cloud-first', analysis: 'Recurring-revenue models push integrators toward cloud-managed video surveillance.' },
  { title: 'Converged physical-cyber teams', stat: '1 in 3 enterprises', analysis: 'Security operations centers increasingly unify physical and cyber monitoring under one roof.' },
]

const cyber: Trend[] = [
  { title: 'AI-driven threat detection', stat: '40% faster MTTD', analysis: 'Machine learning shrinks mean time to detect, but adversaries adopt the same tooling.' },
  { title: 'Identity becomes the perimeter', stat: '80% of breaches', analysis: 'Credential-based attacks dominate, pushing zero-trust and passwordless to the top of budgets.' },
  { title: 'Supply-chain scrutiny rises', stat: '+38% audits', analysis: 'Buyers demand SBOMs and vendor attestations before integrating third-party security tools.' },
  { title: 'Ransomware targets monitoring', stat: '2× incidents', analysis: 'Connected security infrastructure becomes a high-value target, raising resilience requirements.' },
]

const regulation: Trend[] = [
  { title: 'Biometric-consent laws spread', stat: '12 jurisdictions', analysis: 'Explicit opt-in for facial templates becomes table stakes across more US states and the EU.' },
  { title: 'AI transparency mandates', stat: 'Q4 deadlines', analysis: 'Regulators require disclosure of AI use in monitoring and decisioning workflows.' },
  { title: 'Data-retention limits tighten', stat: '−30% windows', analysis: 'Shorter video and event retention reshape storage architecture and compliance tooling.' },
  { title: 'Licensing standards modernise', stat: 'New SIA rules', analysis: 'Industry bodies update credentialing to cover data handling and AI ethics.' },
]

const market: Trend[] = [
  { title: 'Consolidation accelerates', stat: '$8B+ in deals', analysis: 'Platform vendors and PE rollups absorb fragmented installers and monitoring firms.' },
  { title: 'Recurring revenue premium', stat: '4× multiple', analysis: 'Valuations reward subscription and RMR models over one-time install revenue.' },
  { title: 'SMB demand surges', stat: '+22% spend', analysis: 'Cloud-native, self-serve security tools open the small-business segment to new entrants.' },
  { title: 'Marketing budgets shift to AI visibility', stat: '1 in 4 dollars', analysis: 'Security brands reallocate spend toward being found and cited by answer engines.' },
]

function TrendList({ items }: { items: Trend[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 18 }}>
      {items.map((t, i) => (
        <div key={i} className="card" style={{ height: '100%' }}>
          <div className="flex items-center gap-2" style={{ marginBottom: 10, justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: 17 }}>{t.title}</h3>
            <span className="chip" style={{ color: 'var(--blue)', borderColor: 'var(--blue)', whiteSpace: 'nowrap' }}>{t.stat}</span>
          </div>
          <p className="text-soft" style={{ fontSize: 14 }}>{t.analysis}</p>
        </div>
      ))}
    </div>
  )
}

export default function TrendTabs() {
  return (
    <PlatformTabs
      tabs={[
        { label: 'AI Visibility', content: <TrendList items={aiVisibility} /> },
        { label: 'Physical Security', content: <TrendList items={physical} /> },
        { label: 'Cyber', content: <TrendList items={cyber} /> },
        { label: 'Regulation', content: <TrendList items={regulation} /> },
        { label: 'Market', content: <TrendList items={market} /> },
      ]}
    />
  )
}
