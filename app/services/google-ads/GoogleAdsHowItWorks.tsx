'use client'
import ServiceWorkflowCards, { type WorkflowStep } from '@/components/ui/ServiceWorkflowCards'

/* ── Scene 1 — Audit & Keyword Research ── */
function Scene1({ active, color }: { active: boolean; color: string }) {
  const kws = [
    { kw: 'commercial cctv installer sydney', vol: '4.4K', cmp: 'HIGH' },
    { kw: 'access control quote nsw',         vol: '2.1K', cmp: 'MED'  },
    { kw: '24/7 monitored alarm business',    vol: '1.8K', cmp: 'HIGH' },
    { kw: 'security camera installation cost',vol: '3.2K', cmp: 'MED'  },
    { kw: 'intercom system office',           vol: '1.1K', cmp: 'LOW'  },
  ]
  return (
    <div style={{ position: 'absolute', inset: 0, padding: '52px 36px 28px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', marginBottom: 4 }}>
        KEYWORD RESEARCH · BUYER INTENT AUDIT
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7, flex: 1 }}>
        {kws.map((k, i) => (
          <div key={k.kw} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '9px 12px', borderRadius: 10,
            background: i === 0 ? `${color}14` : 'rgba(255,255,255,0.04)',
            border: `1px solid ${i === 0 ? color + '44' : 'rgba(255,255,255,0.07)'}`,
            opacity: active ? 1 : 0.5,
            transition: `opacity 0.4s ${i * 0.06}s`,
          }}>
            <span style={{ flex: 1, fontSize: 12.5, color: i === 0 ? color : 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-mono)' }}>{k.kw}</span>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-mono)' }}>{k.vol}/mo</span>
            <span style={{
              fontSize: 9.5, fontWeight: 700, padding: '2px 7px', borderRadius: 4,
              background: k.cmp === 'HIGH' ? color : k.cmp === 'MED' ? '#f97316' : '#22c55e',
              color: '#000',
            }}>{k.cmp}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
        {[{ l: 'Keywords found', v: '2,840' }, { l: 'Buyer intent', v: '347' }, { l: 'Negative list', v: '92' }].map(m => (
          <div key={m.l} style={{ flex: 1, padding: '10px 12px', borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', textAlign: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 800, color, fontFamily: 'var(--font-mono)' }}>{m.v}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{m.l}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Scene 2 — Build & Launch ── */
function Scene2({ active, color }: { active: boolean; color: string }) {
  const adGroups = [
    { name: 'CCTV Install', ads: 3, kws: 18 },
    { name: 'Access Control', ads: 3, kws: 14 },
    { name: 'Monitoring', ads: 2, kws: 11 },
  ]
  return (
    <div style={{ position: 'absolute', inset: 0, padding: '52px 36px 28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', marginBottom: 4 }}>
        CAMPAIGN STRUCTURE · LIVE
      </div>
      {/* Campaign box */}
      <div style={{ borderRadius: 12, border: `1px solid ${color}44`, background: `${color}08`, padding: '12px 14px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color, marginBottom: 10, fontFamily: 'var(--font-mono)' }}>📢 Security Installers — Sydney</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7, paddingLeft: 12 }}>
          {adGroups.map((ag, i) => (
            <div key={ag.name} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '7px 10px', borderRadius: 8,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              opacity: active ? 1 : 0.5,
              transition: `opacity 0.4s ${i * 0.1}s`,
            }}>
              <span style={{ flex: 1, fontSize: 12.5, color: 'rgba(255,255,255,0.8)' }}>{ag.name}</span>
              <span style={{ fontSize: 10, color: color, fontFamily: 'var(--font-mono)' }}>{ag.ads} ads</span>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-mono)' }}>{ag.kws} kws</span>
            </div>
          ))}
        </div>
      </div>
      {/* Headline preview */}
      <div style={{ padding: '12px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>AD PREVIEW</div>
        <div style={{ fontSize: 13, color: '#4ade80', fontWeight: 700 }}>securityblogs.com.au</div>
        <div style={{ fontSize: 14, color, fontWeight: 700, margin: '4px 0' }}>Commercial CCTV Install Sydney | Free Site Survey</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>AS2201 Certified · 500+ Installs · 24/7 Monitoring Available</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
        <span style={{ fontSize: 11, color: '#22c55e', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>Campaign live · conversion tracking active</span>
      </div>
    </div>
  )
}

/* ── Scene 3 — Optimise & Scale ── */
function Scene3({ active, color }: { active: boolean; color: string }) {
  const weeks = [38, 44, 51, 47, 58, 63, 71, 68, 82, 79, 91, 96]
  const cpcs   = [18, 17, 16, 17, 15, 14, 13, 14, 12, 12, 11, 10]
  const maxCpc = 18
  return (
    <div style={{ position: 'absolute', inset: 0, padding: '52px 36px 28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', marginBottom: 4 }}>
        OPTIMISATION · 12 WEEKS
      </div>
      {/* ROAS chart */}
      <div style={{ padding: '12px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', flex: 1 }}>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-mono)', marginBottom: 10 }}>ROAS — rising week on week</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 90 }}>
          {weeks.map((w, i) => (
            <div key={i} style={{
              flex: 1, height: active ? `${w}%` : '20%', borderRadius: '4px 4px 2px 2px',
              background: `linear-gradient(180deg, ${color}, ${color}55)`,
              transition: `height 0.5s ${i * 0.04}s ease-out`,
            }} />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono)', marginTop: 6 }}>
          <span>W1 · 1.8×</span><span>W6 · 2.4×</span><span>W12 · 3.2×</span>
        </div>
      </div>
      {/* CPC chart */}
      <div style={{ padding: '12px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>CPC — falling as quality improves</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 52 }}>
          {cpcs.map((c, i) => (
            <div key={i} style={{
              flex: 1, height: active ? `${(c / maxCpc) * 100}%` : '80%', borderRadius: '4px 4px 2px 2px',
              background: '#22c55e55',
              transition: `height 0.5s ${i * 0.04}s ease-out`,
            }} />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono)', marginTop: 5 }}>
          <span>$18</span><span>$14</span><span>$10 ↓</span>
        </div>
      </div>
    </div>
  )
}

/* ── Scene 4 — Report & Refine ── */
function Scene4({ active, color }: { active: boolean; color: string }) {
  const metrics = [
    { l: 'Conversions', v: '184', d: '+46 vs last month', pos: true },
    { l: 'Cost per lead', v: '$28', d: '−$9 vs last month', pos: true },
    { l: 'ROAS', v: '3.2×', d: '+0.8× vs last month', pos: true },
    { l: 'Impression share', v: '92%', d: '+14pp vs last month', pos: true },
  ]
  return (
    <div style={{ position: 'absolute', inset: 0, padding: '52px 36px 28px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em' }}>
          MONTHLY REPORT · MAY 2026
        </div>
        <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', padding: '3px 8px', borderRadius: 5, background: `${color}18`, border: `1px solid ${color}44`, color }}>PDF READY</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {metrics.map((m, i) => (
          <div key={m.l} style={{
            padding: '12px 14px', borderRadius: 12,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.07)',
            opacity: active ? 1 : 0.4,
            transition: `opacity 0.4s ${i * 0.1}s`,
          }}>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-mono)', marginBottom: 5 }}>{m.l}</div>
            <div style={{ fontSize: 24, fontWeight: 800, color, fontFamily: 'var(--font-mono)', lineHeight: 1 }}>{m.v}</div>
            <div style={{ fontSize: 10.5, color: '#22c55e', fontWeight: 600, marginTop: 4 }}>▲ {m.d}</div>
          </div>
        ))}
      </div>
      {/* Insight strip */}
      <div style={{ marginTop: 4, padding: '12px 14px', borderRadius: 12, background: `${color}0a`, border: `1px solid ${color}30` }}>
        <div style={{ fontSize: 11, color, fontWeight: 700, fontFamily: 'var(--font-mono)', marginBottom: 5 }}>💡 INSIGHT THIS MONTH</div>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5, margin: 0 }}>
          "Intruder alarm" +broad drove 23 irrelevant clicks. Moved to EXACT and reallocated $180 to CCTV campaigns. Expect CPL to drop further next month.
        </p>
      </div>
    </div>
  )
}

const STEPS: WorkflowStep[] = [
  { step: '01', tag: 'RESEARCH', title: 'Audit & Keyword Research', color: '#4285f4', glow: 'rgba(66,133,244,0.45)', Scene: Scene1 },
  { step: '02', tag: 'LAUNCH',   title: 'Build & Launch',           color: '#fa7b17', glow: 'rgba(250,123,23,0.45)', Scene: Scene2 },
  { step: '03', tag: 'OPTIMISE', title: 'Optimise & Scale',         color: '#34a853', glow: 'rgba(52,168,83,0.45)',  Scene: Scene3 },
  { step: '04', tag: 'REPORT',   title: 'Report & Refine',          color: '#fbbc04', glow: 'rgba(251,188,4,0.45)', Scene: Scene4 },
]

export default function GoogleAdsHowItWorks() {
  return <ServiceWorkflowCards steps={STEPS} />
}
