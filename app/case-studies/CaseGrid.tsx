'use client'
import { useState } from 'react'
import GlassCard from '@/components/ui/GlassCard'
import { Stagger, Item } from '@/components/ui/Reveal'

type CaseStudy = {
  company: string
  industry: string
  service: string
  filters: string[]
  color: string
  metrics: string[]
}

const cases: CaseStudy[] = [
  { company: 'ShieldTech Security', industry: 'Integrator', service: 'Full Service', filters: ['Full Service'], color: 'var(--blue)', metrics: ['+340% organic traffic', '#1 for 28 keywords', '8 months to results'] },
  { company: 'ArmourGuard AU', industry: 'Monitoring', service: 'Google Ads', filters: ['Google Ads'], color: 'var(--yellow)', metrics: ['3.8× ROAS', '$9.40 CPC', '+280% qualified leads'] },
  { company: 'Nexus Security Group', industry: 'Enterprise', service: 'AIO/AEO', filters: ['AIO/AEO'], color: 'var(--violet)', metrics: ['91% AI citation rate', '47 AI mentions/month', '6 platforms'] },
  { company: 'ClearVault CCTV', industry: 'CCTV Installer', service: 'Security SEO', filters: ['SEO'], color: 'var(--green)', metrics: ['#1 for 28 keywords', '+180% organic traffic', '94% retention'] },
  { company: 'BioEntry Systems', industry: 'Access Control', service: 'GEO', filters: ['GEO'], color: 'var(--red)', metrics: ['Entity confirmed on 6 AI platforms', '+220% brand searches', 'Knowledge panel won'] },
  { company: 'AccessPro AU', industry: 'Integrator', service: 'Full Service', filters: ['Full Service'], color: 'var(--blue)', metrics: ['+410% revenue', '2.1× ROAS', '89% citation rate'] },
]

const tabs = ['All', 'SEO', 'Google Ads', 'AIO/AEO', 'GEO', 'Full Service']

export default function CaseGrid() {
  const [active, setActive] = useState('All')
  const visible = active === 'All' ? cases : cases.filter((c) => c.filters.includes(active))

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2" style={{ marginBottom: 40 }}>
        {tabs.map((t) => (
          <button key={t} className={`pill ${active === t ? 'active' : ''}`} onClick={() => setActive(t)}>
            {t}
          </button>
        ))}
      </div>

      <Stagger key={active} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
        {visible.map((c) => (
          <Item key={c.company}>
            <GlassCard tilt style={{ height: '100%' }}>
              <div className="flex justify-between items-center" style={{ marginBottom: 14 }}>
                <h3 style={{ fontSize: 20 }}>{c.company}</h3>
                <span className="badge" style={{ fontSize: 11 }}>{c.industry}</span>
              </div>
              <div className="flex flex-wrap gap-2" style={{ marginBottom: 18 }}>
                {c.metrics.map((m) => <span key={m} className="chip" style={{ borderColor: c.color, color: c.color }}>{m}</span>)}
              </div>
              <div className="flex justify-between items-center">
                <span className="eyebrow" style={{ fontSize: 11 }}>{c.service}</span>
                <span style={{ color: c.color, fontWeight: 600, fontSize: 14 }}>View details →</span>
              </div>
            </GlassCard>
          </Item>
        ))}
      </Stagger>
    </>
  )
}
