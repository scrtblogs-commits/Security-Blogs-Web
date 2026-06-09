'use client'
import ServiceWorkflowCards, { type WorkflowStep } from '@/components/ui/ServiceWorkflowCards'

/* ── Scene 1 — Import & Audit ── */
function Scene1({ active, color }: { active: boolean; color: string }) {
  return (
    <div style={{ position: 'absolute', inset: 0, padding: 36, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ fontSize: 11, color: 'rgba(120,160,255,0.5)', fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        Campaign Migration
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* Google box */}
        <div style={{
          flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 16, padding: 18, textAlign: 'center',
        }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🔴</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>Google Ads</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 4 }}>existing structure</div>
          <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
            {['12 campaigns', '84 ad groups', '340 keywords'].map(t => (
              <div key={t} style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.04)', borderRadius: 6, padding: '3px 8px' }}>{t}</div>
            ))}
          </div>
        </div>

        {/* Arrow */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 48, height: 2, background: `linear-gradient(90deg, rgba(255,255,255,0.1), ${color})` }} />
          <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: active ? color : 'rgba(255,255,255,0.3)', transition: 'color 0.4s', textAlign: 'center' }}>IMPORT→<br />RE-TUNE</div>
          <div style={{ width: 48, height: 2, background: `linear-gradient(90deg, ${color}, rgba(255,255,255,0.1))` }} />
        </div>

        {/* Microsoft box */}
        <div style={{
          flex: 1, background: active ? `${color}12` : 'rgba(255,255,255,0.04)',
          border: `1px solid ${active ? color + '44' : 'rgba(255,255,255,0.1)'}`,
          borderRadius: 16, padding: 18, textAlign: 'center',
          transition: 'all 0.4s ease', boxShadow: active ? `0 0 30px -8px ${color}55` : 'none',
        }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🔷</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: active ? color : 'rgba(255,255,255,0.7)', transition: 'color 0.4s' }}>Microsoft Ads</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 4 }}>B2B optimised</div>
          <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
            {['12 campaigns ✓', '84 ad groups ✓', '+ LinkedIn layer'].map(t => (
              <div key={t} style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: active ? color : 'rgba(255,255,255,0.4)', background: active ? `${color}12` : 'rgba(255,255,255,0.04)', borderRadius: 6, padding: '3px 8px', transition: 'all 0.4s' }}>{t}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Audit checklist */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 4 }}>
        {['Keyword gaps', 'Bid strategy', 'QS scores', 'Audience gaps'].map(item => (
          <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 11, color: 'rgba(255,255,255,0.55)' }}>
            <span style={{ width: 16, height: 16, borderRadius: '50%', background: active ? color : 'rgba(255,255,255,0.1)', color: '#fff', fontSize: 9, display: 'grid', placeItems: 'center', transition: 'background 0.4s', flexShrink: 0 }}>✓</span>
            {item}
          </div>
        ))}
      </div>

      <div style={{ padding: '10px 16px', background: active ? `${color}14` : 'rgba(255,255,255,0.03)', border: `1px solid ${active ? color + '30' : 'rgba(255,255,255,0.07)'}`, borderRadius: 12, fontSize: 12, color: active ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.35)', transition: 'all 0.4s' }}>
        Running start — no rebuilding from zero.
      </div>
    </div>
  )
}

/* ── Scene 2 — Layer LinkedIn Targeting ── */
function Scene2({ active, color }: { active: boolean; color: string }) {
  const rows = [
    { label: 'Job title', value: 'Security Manager, Facilities Dir' },
    { label: 'Industry', value: 'Physical Security · Logistics' },
    { label: 'Company size', value: '50–500 employees' },
    { label: 'Seniority', value: 'Manager, Director, VP' },
  ]
  return (
    <div style={{ position: 'absolute', inset: 0, padding: 36, display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ width: 30, height: 30, borderRadius: 8, background: '#0a66c2', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 900, fontSize: 14, flexShrink: 0 }}>in</span>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>LinkedIn Profile Targeting</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-mono)' }}>Microsoft × LinkedIn data</div>
        </div>
        <div style={{ marginLeft: 'auto', padding: '4px 12px', borderRadius: 999, background: active ? `${color}20` : 'rgba(255,255,255,0.05)', border: `1px solid ${active ? color + '44' : 'rgba(255,255,255,0.1)'}`, fontSize: 10, fontFamily: 'var(--font-mono)', color: active ? color : 'rgba(255,255,255,0.35)', transition: 'all 0.4s' }}>
          LIVE
        </div>
      </div>

      {/* Targeting rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {rows.map((r, i) => (
          <div key={r.label} style={{
            padding: '10px 14px', background: active ? `${color}0d` : 'rgba(255,255,255,0.03)',
            border: `1px solid ${active ? color + '25' : 'rgba(255,255,255,0.07)'}`,
            borderRadius: 12, display: 'flex', alignItems: 'center', gap: 12,
            transition: `all 0.4s ease ${i * 0.06}s`,
          }}>
            <span style={{ width: 72, fontSize: 10, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: 0.5, flexShrink: 0 }}>{r.label}</span>
            <span style={{ flex: 1, fontSize: 12, color: active ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.4)', transition: 'color 0.4s' }}>{r.value}</span>
            <span style={{ width: 18, height: 18, borderRadius: '50%', background: active ? color : 'rgba(255,255,255,0.08)', color: '#fff', fontSize: 9, display: 'grid', placeItems: 'center', transition: 'background 0.4s', flexShrink: 0 }}>✓</span>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: 4, padding: '12px 16px', borderRadius: 14,
        background: active ? `${color}14` : 'rgba(255,255,255,0.04)',
        border: `1px solid ${active ? color + '30' : 'rgba(255,255,255,0.07)'}`,
        transition: 'all 0.4s',
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: active ? color : 'rgba(255,255,255,0.4)', transition: 'color 0.4s' }}>~ 28,400 matched buyers</span>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginLeft: 10 }}>within your campaign targeting</span>
      </div>

      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>
        Only available on Microsoft Advertising — the unfair advantage Google cannot replicate.
      </div>
    </div>
  )
}

/* ── Scene 3 — Launch & Track ── */
function Scene3({ active, color }: { active: boolean; color: string }) {
  const conversions = [
    { label: 'Form submitted', time: '2m ago', value: '$480 LTV' },
    { label: 'Quote requested', time: '11m ago', value: '$1,200 LTV' },
    { label: 'Phone call (3:42)', time: '28m ago', value: '$860 LTV' },
    { label: 'Demo booked', time: '1h ago', value: '$2,400 LTV' },
  ]
  return (
    <div style={{ position: 'absolute', inset: 0, padding: 36, display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ fontSize: 11, color: 'rgba(120,160,255,0.5)', fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        Live Conversion Feed
      </div>

      {/* Status bar */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
        {[
          { label: 'Microsoft UET', status: 'ACTIVE' },
          { label: 'MS Clarity', status: 'RECORDING' },
          { label: 'Call Tracking', status: 'LIVE' },
        ].map(s => (
          <div key={s.label} style={{
            padding: '8px 10px', background: active ? `${color}10` : 'rgba(255,255,255,0.03)',
            border: `1px solid ${active ? color + '25' : 'rgba(255,255,255,0.07)'}`,
            borderRadius: 10, textAlign: 'center', transition: 'all 0.4s',
          }}>
            <div style={{ fontSize: 8, fontFamily: 'var(--font-mono)', color: active ? color : 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', marginBottom: 3, transition: 'color 0.4s' }}>
              {active ? '● ' : '○ '}{s.status}
            </div>
            <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.55)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Conversion feed */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {conversions.map((c, i) => (
          <div key={c.label} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px',
            background: i === 0 && active ? `${color}14` : 'rgba(255,255,255,0.03)',
            border: `1px solid ${i === 0 && active ? color + '35' : 'rgba(255,255,255,0.06)'}`,
            borderRadius: 12, transition: `all 0.4s ease ${i * 0.05}s`,
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: i === 0 && active ? color : 'rgba(255,255,255,0.15)', flexShrink: 0, transition: 'background 0.4s' }} />
            <span style={{ flex: 1, fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>{c.label}</span>
            <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.3)' }}>{c.time}</span>
            <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 700, color: active ? '#22c55e' : 'rgba(255,255,255,0.3)', transition: 'color 0.4s' }}>{c.value}</span>
          </div>
        ))}
      </div>

      <div style={{ padding: '10px 16px', background: active ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.03)', border: `1px solid ${active ? 'rgba(34,197,94,0.25)' : 'rgba(255,255,255,0.07)'}`, borderRadius: 12, fontSize: 12, color: active ? '#22c55e' : 'rgba(255,255,255,0.35)', fontWeight: 600, transition: 'all 0.4s' }}>
        Every B2B lead measured and attributed to the right keyword.
      </div>
    </div>
  )
}

/* ── Scene 4 — Optimise & Expand ── */
function Scene4({ active, color }: { active: boolean; color: string }) {
  const placements = [
    { label: 'Bing Search', scale: 100, icon: '🔍' },
    { label: 'MSN News Feed', scale: 72, icon: '📰' },
    { label: 'Outlook Sidebar', scale: 60, icon: '📧' },
    { label: 'Edge New Tab', scale: 54, icon: '🌐' },
    { label: 'Partner Sites', scale: 42, icon: '🌐' },
  ]
  return (
    <div style={{ position: 'absolute', inset: 0, padding: 36, display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ fontSize: 11, color: 'rgba(120,160,255,0.5)', fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        Audience Network Expansion
      </div>

      {/* Placement bars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {placements.map((p, i) => (
          <div key={p.label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 14, flexShrink: 0 }}>{p.icon}</span>
            <span style={{ width: 110, fontSize: 11, color: 'rgba(255,255,255,0.6)', flexShrink: 0 }}>{p.label}</span>
            <div style={{ flex: 1, height: 7, background: 'rgba(255,255,255,0.06)', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: 4,
                background: i === 0 ? color : `${color}${Math.round(90 - i * 14).toString(16).padStart(2, '0')}`,
                width: active ? `${p.scale}%` : '0%',
                transition: `width 0.6s ease ${i * 0.08}s`,
              }} />
            </div>
            <span style={{ width: 36, textAlign: 'right', fontSize: 10, fontFamily: 'var(--font-mono)', color: active ? color : 'rgba(255,255,255,0.3)', transition: 'color 0.5s', flexShrink: 0 }}>{p.scale}%</span>
          </div>
        ))}
      </div>

      {/* CPL trend */}
      <div style={{ padding: '14px 16px', background: active ? `${color}10` : 'rgba(255,255,255,0.03)', border: `1px solid ${active ? color + '25' : 'rgba(255,255,255,0.07)'}`, borderRadius: 14, transition: 'all 0.4s' }}>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>COST PER B2B LEAD · TREND</div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: 44 }}>
          {[80, 68, 62, 55, 48, 44, 40, 36].map((h, i) => (
            <div key={i} style={{
              flex: 1, borderRadius: '4px 4px 2px 2px',
              background: i === 7 ? color : `${color}${(30 + i * 8).toString(16).padStart(2, '0')}`,
              height: active ? `${h}%` : '0%',
              transition: `height 0.5s ease ${i * 0.05}s`,
            }} />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono)' }}>Month 1</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: active ? '#22c55e' : 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono)', transition: 'color 0.4s' }}>↓ 55% CPL · Month 8</span>
        </div>
      </div>

      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>
        Scale into Edge, MSN and Outlook as cost-per-lead falls and quality compounds.
      </div>
    </div>
  )
}

const STEPS = [
  { step: '01', tag: 'IMPORT', title: 'Import & Audit', color: '#0078d4', glow: 'rgba(0,120,212,0.45)', Scene: Scene1 },
  { step: '02', tag: 'LAYER', title: 'Layer LinkedIn Targeting', color: '#0ea5e9', glow: 'rgba(14,165,233,0.45)', Scene: Scene2 },
  { step: '03', tag: 'LAUNCH', title: 'Launch & Track', color: '#22c55e', glow: 'rgba(34,197,94,0.45)', Scene: Scene3 },
  { step: '04', tag: 'SCALE', title: 'Optimise & Expand', color: '#a855f7', glow: 'rgba(168,85,247,0.45)', Scene: Scene4 },
] satisfies WorkflowStep[]

export default function BingAdsHowItWorks() {
  return <ServiceWorkflowCards steps={STEPS} />
}
