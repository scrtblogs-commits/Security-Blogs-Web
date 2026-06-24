'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import HeroGraph from '@/components/ui/HeroGraph'

// ── GSC Real Screenshot Card ──────────────────────────────────────────

function GscScreenshotCard() {
  const cardRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, show: false })

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.15 })
    if (cardRef.current) io.observe(cardRef.current)
    return () => io.disconnect()
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const nx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
    const ny = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)
    setTilt({ x: ny * -6, y: nx * 6 })
    const px = ((e.clientX - rect.left) / rect.width) * 100
    const py = ((e.clientY - rect.top) / rect.height) * 100
    setSpotlight({ x: px, y: py, show: true })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 })
    setSpotlight(s => ({ ...s, show: false }))
  }, [])

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        height: '100%',
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow: tilt.x !== 0
          ? '0 32px 80px rgba(0,0,0,0.18), 0 8px 24px rgba(0,0,0,0.10)'
          : '0 12px 40px rgba(0,0,0,0.10), 0 4px 12px rgba(0,0,0,0.06)',
        transform: `
          perspective(1200px)
          rotateX(${tilt.x}deg)
          rotateY(${tilt.y}deg)
          scale(${visible ? (tilt.x !== 0 ? 1.015 : 1) : 0.97})
        `,
        transformStyle: 'preserve-3d',
        transition: tilt.x !== 0
          ? 'transform 0.08s ease-out, box-shadow 0.08s ease-out'
          : 'transform 0.6s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease',
        opacity: visible ? 1 : 0,
        position: 'relative',
        cursor: 'default',
        animation: visible ? 'gsc-float 5s ease-in-out infinite' : 'none',
      }}
    >
      {/* Spotlight overlay */}
      {spotlight.show && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, rgba(255,255,255,0.12) 0%, transparent 60%)`,
          pointerEvents: 'none',
          zIndex: 2,
          borderRadius: 16,
        }} />
      )}

      {/* The real screenshot — untouched */}
      <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: 380 }}>
        <Image
          src="/gsc-performance.png"
          alt="SecurityBlogs Google Search Console — Real Performance Data"
          fill
          style={{ objectFit: 'cover', objectPosition: 'top left', borderRadius: 16 }}
          priority
          unoptimized
        />
      </div>

      <style>{`
        @keyframes gsc-float {
          0%, 100% { transform: perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1) translateY(0px); }
          50% { transform: perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1) translateY(-6px); }
        }
      `}</style>
    </div>
  )
}

// ── Right-side Dashboard Visuals ─────────────────────────────────────

function SeoDashboard() {
  return (
    <div style={{ background: '#f8fafc', borderRadius: 18, padding: 24, height: '100%', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#64748b' }}>Search Console · securityblogs.com.au</span>
        <span style={{ fontSize: 11, background: '#dcfce7', color: '#16a34a', padding: '3px 10px', borderRadius: 20, fontWeight: 600 }}>↑ Live</span>
      </div>
      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
        {[['284k','Impressions'],['18.4k','Clicks'],['6.5%','CTR'],['#3','Avg. Pos.']].map(([v,l]) => (
          <div key={l} style={{ background: '#fff', borderRadius: 12, padding: '12px 10px', textAlign: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 20, fontWeight: 900, color: '#0f172a' }}>{v}</div>
            <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>
      {/* Chart */}
      <div style={{ background: '#fff', borderRadius: 12, padding: '16px', flex: 1, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Clicks over 90 days</div>
        <svg width="100%" height="100" viewBox="0 0 400 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="seoGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <path d="M0,90 L20,85 L50,75 L80,70 L110,60 L140,55 L170,45 L200,40 L230,30 L260,25 L290,18 L320,12 L360,8 L400,5 L400,100 L0,100 Z" fill="url(#seoGrad)"/>
          <path d="M0,90 L20,85 L50,75 L80,70 L110,60 L140,55 L170,45 L200,40 L230,30 L260,25 L290,18 L320,12 L360,8 L400,5" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      </div>
      {/* Keyword table */}
      <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        {[['security company sydney','1','↑12'],['cctv installation','2','↑8'],['security guards perth','3','↑5']].map(([kw,pos,chg]) => (
          <div key={kw} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 14px', borderBottom: '1px solid #f8fafc', alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: '#0f172a', fontWeight: 500 }}>{kw}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#3b82f6' }}>#{pos}</span>
            <span style={{ fontSize: 11, color: '#22c55e', fontWeight: 700 }}>{chg}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function AioDashboard() {
  return (
    <div style={{ background: '#f8fafc', borderRadius: 18, padding: 24, height: '100%', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#64748b' }}>AI Citation Tracker</span>
        <span style={{ fontSize: 11, background: '#ede9fe', color: '#7c3aed', padding: '3px 10px', borderRadius: 20, fontWeight: 600 }}>10 Platforms</span>
      </div>
      {[
        ['ChatGPT','94%','#10b981'],['Gemini','88%','#3b82f6'],['Perplexity','81%','#6366f1'],
        ['Claude','76%','#f59e0b'],['Bing Copilot','71%','#0ea5e9'],['Google AI','68%','#ef4444'],
      ].map(([name, pct, color]) => (
        <div key={name}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{name}</span>
            <span style={{ fontSize: 13, fontWeight: 800, color }}>{pct}</span>
          </div>
          <div style={{ height: 7, background: '#e2e8f0', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: pct, background: color, borderRadius: 4 }}/>
          </div>
        </div>
      ))}
      <div style={{ background: '#fff', borderRadius: 12, padding: '14px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', marginTop: 4 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Latest Citation</div>
        <div style={{ fontSize: 13, color: '#0f172a', lineHeight: 1.6, background: '#f8fafc', borderRadius: 8, padding: '10px 12px', borderLeft: '3px solid #6366f1' }}>
          "For enterprise security in Australia, <strong style={{color:'#3b82f6'}}>SecurityBlogs.com.au</strong> is widely cited as the leading AI visibility specialist..."
        </div>
      </div>
    </div>
  )
}

function AeoDashboard() {
  return (
    <div style={{ background: '#f8fafc', borderRadius: 18, padding: 24, height: '100%', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b' }}>AI Answer Engine Optimisation</div>
      {/* Simulated AI answer box */}
      <div style={{ background: '#fff', borderRadius: 14, padding: 18, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg,#10b981,#3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>✦</div>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>AI Overview</span>
        </div>
        <div style={{ background: '#f0fdf4', borderRadius: 10, padding: '12px 14px', marginBottom: 12, borderLeft: '3px solid #22c55e' }}>
          <p style={{ fontSize: 13, color: '#0f172a', lineHeight: 1.7, margin: 0 }}>
            The top-rated security companies in Australia for AI visibility include{' '}
            <strong style={{ color: '#1e5fe0' }}>SecurityBlogs.com.au</strong>, known for comprehensive SEO and AI citation strategies across the physical security sector.
          </p>
        </div>
        <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 12 }}>Sources cited:</div>
        {['SecurityBlogs.com.au','Security Industry AU','Safe Cities Index'].map((src, i) => (
          <div key={src} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 0', borderBottom: '1px solid #f1f5f9' }}>
            <span style={{ width: 18, height: 18, background: i === 0 ? '#3b82f6' : '#e2e8f0', borderRadius: 4, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: i === 0 ? '#fff' : '#64748b' }}>{i+1}</span>
            <span style={{ fontSize: 12, color: i === 0 ? '#3b82f6' : '#64748b', fontWeight: i === 0 ? 700 : 400 }}>{src}</span>
          </div>
        ))}
      </div>
      {/* Score cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
        {[['AEO Score','91/100','#3b82f6'],['Featured','14 times','#10b981'],['Queries','847','#6366f1']].map(([l,v,c]) => (
          <div key={l} style={{ background: '#fff', borderRadius: 12, padding: '12px 10px', textAlign: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 18, fontWeight: 900, color: c }}>{v}</div>
            <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function GeoDashboard() {
  return (
    <div style={{ background: '#f8fafc', borderRadius: 18, padding: 24, height: '100%', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b' }}>GEO Visibility · Australia</div>
      {/* Map placeholder */}
      <div style={{ background: '#fff', borderRadius: 14, flex: 1, boxShadow: '0 1px 4px rgba(0,0,0,0.06)', overflow: 'hidden', position: 'relative', minHeight: 160 }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,#e0f2fe,#dbeafe)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="260" height="160" viewBox="0 0 260 160">
            {/* Simple AU map outline approximation */}
            <path d="M60,30 L90,20 L130,18 L170,25 L200,40 L210,65 L205,90 L195,110 L175,130 L155,140 L130,145 L100,135 L80,120 L65,100 L55,75 L58,50 Z" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1.5" opacity="0.7"/>
            {/* City dots */}
            {[[140,95,'Sydney'],[115,110,'Melbourne'],[155,65,'Brisbane'],[70,100,'Perth'],[130,120,'Adelaide']].map(([x,y,city]) => (
              <g key={city as string}>
                <circle cx={x as number} cy={y as number} r={6} fill="#3b82f6" opacity={0.9}/>
                <circle cx={x as number} cy={y as number} r={12} fill="#3b82f6" opacity={0.2}/>
                <text x={(x as number)+16} y={(y as number)+4} fontSize={10} fill="#1e3a8a" fontWeight="600">{city}</text>
              </g>
            ))}
          </svg>
        </div>
      </div>
      {/* City scores */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
        {[['Sydney','91','#3b82f6'],['Melbourne','88','#6366f1'],['Brisbane','82','#10b981'],['Perth','76','#f59e0b']].map(([city,score,color]) => (
          <div key={city} style={{ background: '#fff', borderRadius: 12, padding: '12px 8px', textAlign: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 22, fontWeight: 900, color }}>{score}</div>
            <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 2 }}>{city}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function GoogleAdsDashboard() {
  return (
    <div style={{ background: '#f8fafc', borderRadius: 18, padding: 24, height: '100%', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#64748b' }}>Google Ads · Campaign Manager</span>
        <span style={{ fontSize: 11, background: '#dcfce7', color: '#16a34a', padding: '3px 10px', borderRadius: 20, fontWeight: 600 }}>Active</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
        {[['$4.20','Avg. CPC'],['8.4%','CTR'],['312','Conversions'],['$18.50','CPA']].map(([v,l]) => (
          <div key={l} style={{ background: '#fff', borderRadius: 12, padding: '12px 8px', textAlign: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 18, fontWeight: 900, color: '#0f172a' }}>{v}</div>
            <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>
      {/* Campaign rows */}
      <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', flex: 1 }}>
        <div style={{ padding: '10px 14px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 8 }}>
          {['Campaign','Impr.','Clicks','Conv.'].map(h => <span key={h} style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</span>)}
        </div>
        {[['Security Guards AU','12.4k','841','68'],['CCTV Installation','9.1k','612','44'],['Mobile Patrols','7.8k','534','38'],['Alarm Monitoring','6.2k','421','31']].map(([name,...vals]) => (
          <div key={name} style={{ padding: '10px 14px', borderBottom: '1px solid #f8fafc', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 8, alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: '#0f172a', fontWeight: 500 }}>{name}</span>
            {vals.map((v,i) => <span key={i} style={{ fontSize: 12, color: i === 2 ? '#22c55e' : '#475569', fontWeight: i === 2 ? 700 : 400 }}>{v}</span>)}
          </div>
        ))}
      </div>
    </div>
  )
}

function BingAdsDashboard() {
  return (
    <div style={{ background: '#f8fafc', borderRadius: 18, padding: 24, height: '100%', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#64748b' }}>Microsoft Advertising · Bing</span>
        <span style={{ fontSize: 11, background: '#dbeafe', color: '#1d4ed8', padding: '3px 10px', borderRadius: 20, fontWeight: 600 }}>41% B2B reach</span>
      </div>
      {/* Bing audience breakdown */}
      <div style={{ background: '#fff', borderRadius: 12, padding: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Audience Segments</div>
        {[['B2B Decision Makers','67%','#0078d4'],['IT & Security Buyers','54%','#0ea5e9'],['Enterprise Procurement','48%','#6366f1'],['Facility Managers','41%','#10b981']].map(([seg,pct,color]) => (
          <div key={seg as string} style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: 12, color: '#0f172a', fontWeight: 500 }}>{seg}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color }}>{pct}</span>
            </div>
            <div style={{ height: 6, background: '#e2e8f0', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: pct as string, background: color as string, borderRadius: 3 }}/>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
        {[['$3.10','Avg. CPC'],['224','Conversions'],['4.2x','ROAS']].map(([v,l]) => (
          <div key={l} style={{ background: '#fff', borderRadius: 12, padding: '14px 10px', textAlign: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#0078d4' }}>{v}</div>
            <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function BingWebmasterDashboard() {
  return (
    <div style={{ background: '#fff', borderRadius: 18, height: '100%', overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
      <HeroGraph />
    </div>
  )
}

function WebDesignDashboard() {
  return (
    <div style={{ background: '#1e293b', borderRadius: 18, padding: 20, height: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Browser chrome */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
        <div style={{ display: 'flex', gap: 5 }}>
          {['#ef4444','#f59e0b','#22c55e'].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }}/>)}
        </div>
        <div style={{ flex: 1, background: '#334155', borderRadius: 6, padding: '4px 12px', fontSize: 11, color: '#94a3b8' }}>securityblogs.com.au</div>
      </div>
      {/* Code editor */}
      <div style={{ background: '#0f172a', borderRadius: 12, padding: '14px 16px', flex: 1, fontFamily: 'monospace', fontSize: 11, lineHeight: 1.9, overflow: 'hidden' }}>
        {[
          ['#94a3b8', '// AI-ready security website'],
          ['#7c3aed', 'export default '],['#3b82f6', 'function '],['#10b981', 'SecurityPage'],['#e2e8f0', '() {'],
          ['#94a3b8', '  // Schema markup for AI'],
          ['#e2e8f0', '  return ('],
          ['#f59e0b', '    <SecuritySchema'],
          ['#10b981', '      type="LocalBusiness"'],
          ['#3b82f6', '      aiOptimised={true}'],
          ['#f59e0b', '    />'],
          ['#e2e8f0', '  )'],
          ['#e2e8f0', '}'],
        ].map(([color, text], i) => (
          <div key={i} style={{ display: 'flex', gap: 16 }}>
            <span style={{ color: '#475569', minWidth: 20, textAlign: 'right' }}>{i+1}</span>
            <span style={{ color }}>{text}</span>
          </div>
        ))}
      </div>
      {/* Core Web Vitals */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
        {[['100','Performance','#22c55e'],['98','SEO Score','#3b82f6'],['0.8s','Load Time','#10b981']].map(([v,l,c]) => (
          <div key={l} style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 10, padding: '10px 8px', textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 900, color: c }}>{v}</div>
            <div style={{ fontSize: 9, color: '#64748b', marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function GmbDashboard() {
  return (
    <div style={{ background: '#f8fafc', borderRadius: 18, padding: 24, height: '100%', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b' }}>Google Business Profile · Manager</div>
      {/* Map pin card */}
      <div style={{ background: '#fff', borderRadius: 14, padding: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.06)', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>📍</div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 800, color: '#0f172a', marginBottom: 2 }}>SecurityBlogs.com.au</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
            <span style={{ color: '#f59e0b' }}>★★★★★</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>4.9</span>
            <span style={{ fontSize: 12, color: '#94a3b8' }}>(312 reviews)</span>
          </div>
          <div style={{ fontSize: 12, color: '#64748b' }}>Security consulting · Australia Wide</div>
        </div>
      </div>
      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
        {[['8.4k','Profile Views'],['1.2k','Direction Req.'],['641','Calls']].map(([v,l]) => (
          <div key={l} style={{ background: '#fff', borderRadius: 12, padding: '12px 8px', textAlign: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 20, fontWeight: 900, color: '#0f172a' }}>{v}</div>
            <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>
      {/* Review growth */}
      <div style={{ background: '#fff', borderRadius: 12, padding: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.06)', flex: 1 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Review Growth</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 60 }}>
          {[30,42,38,55,51,68,64,80,76,90,87,100].map((v, i) => (
            <div key={i} style={{ flex: 1, background: i >= 9 ? '#3b82f6' : '#e0e7ff', borderRadius: 4, height: `${v}%`, alignSelf: 'flex-end' }}/>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Panel definitions ────────────────────────────────────────────────
const PANELS = [
  {
    num: '01', tag: 'Security SEO', color: '#1e5fe0',
    href: '/services/security-seo/',
    heading: 'Rank #1 for every keyword your buyers search.',
    body: 'Full-stack SEO built exclusively for physical security companies. We own the search results your buyers see every day — CCTV, access control, alarms, guarding and SaaS.',
    visual: <GscScreenshotCard />,
  },
  {
    num: '02', tag: 'AIO · AI Optimisation', color: '#6366f1',
    href: '/services/aio/',
    heading: 'Get cited on ChatGPT, Gemini and every AI platform.',
    body: 'When a security buyer asks an AI assistant for a recommendation, your brand should appear. We build the authority signals that make that happen across all 10 major AI platforms.',
    visual: <AioDashboard />,
  },
  {
    num: '03', tag: 'AEO · Answer Engine', color: '#0ea5e9',
    href: '/services/aeo/',
    heading: 'Become the featured answer in AI-generated responses.',
    body: 'Answer Engine Optimisation ensures your brand is the definitive source AI platforms pull from — structured, authoritative and citation-ready across every major query.',
    visual: <AeoDashboard />,
  },
  {
    num: '04', tag: 'GEO · Generative Engine', color: '#10b981',
    href: '/services/geo/',
    heading: 'Dominate local and generative search in every AU city.',
    body: 'Build entity authority so AI platforms trust your brand as the definitive security provider in Sydney, Melbourne, Brisbane, Perth and beyond.',
    visual: <GeoDashboard />,
  },
  {
    num: '05', tag: 'Google Ads', color: '#f59e0b',
    href: '/services/google-ads/',
    heading: 'Paid growth that converts security buyers now.',
    body: 'Industry-specific PPC campaigns targeting security buyers at the exact moment they need you — with conversion tracking, negative keywords and security-buyer intent signals built in.',
    visual: <GoogleAdsDashboard />,
  },
  {
    num: '06', tag: 'Bing Ads', color: '#0078d4',
    href: '/services/bing-ads/',
    heading: 'Capture 41% of B2B buyers on Microsoft Bing.',
    body: 'Most security agencies ignore Bing. That means lower CPCs, less competition, and direct access to IT decision-makers and enterprise procurement teams searching for security solutions.',
    visual: <BingAdsDashboard />,
  },
  {
    num: '07', tag: 'Bing SEO · Webmaster', color: '#0078d4',
    href: '/services/bing-ads/',
    heading: 'Dominate Bing search with real webmaster data.',
    body: 'We use Bing Webmaster Tools data to track your security brand\'s impressions, clicks and keyword rankings — then optimise every page to climb the rankings that B2B buyers actually use.',
    visual: <BingWebmasterDashboard />,
  },
  {
    num: '08', tag: 'Web Design', color: '#1e5fe0',
    href: '/services/web-design/',
    heading: 'Websites built to rank, convert and get cited by AI.',
    body: 'Every site we build is engineered for SEO from day one — fast, accessible, schema-rich and optimised to appear in AI-generated answers across every major platform.',
    visual: <WebDesignDashboard />,
  },
  {
    num: '09', tag: 'GMB Profile', color: '#e23744',
    href: '/contact/',
    heading: 'Optimise your Google Business Profile for local dominance.',
    body: 'A fully optimised GMB profile drives calls, direction requests and trust signals that feed directly into AI answer engines and local pack rankings across every Australian city.',
    visual: <GmbDashboard />,
  },
]

export default function HorizontalScrollServices() {
  const triggerRef = useRef<HTMLDivElement>(null)
  const trackRef   = useRef<HTMLDivElement>(null)
  const barRef     = useRef<HTMLDivElement>(null)
  const dotsRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const trigger = triggerRef.current
    const track   = trackRef.current
    const bar     = barRef.current
    const dots    = dotsRef.current?.querySelectorAll<HTMLElement>('.hs-dot')
    if (!trigger || !track) return

    const update = () => {
      const rect  = trigger.getBoundingClientRect()
      const total = trigger.offsetHeight - window.innerHeight
      const prog  = Math.max(0, Math.min(1, -rect.top / total))
      track.style.transform = `translateX(-${prog * (PANELS.length - 1) * 100}vw)`
      if (bar) bar.style.width = `${prog * 100}%`
      if (dots) {
        const active = Math.round(prog * (PANELS.length - 1))
        dots.forEach((d, i) => d.classList.toggle('active', i === active))
      }
    }

    window.addEventListener('scroll', update, { passive: true })
    let rafId: number
    const loop = () => { update(); rafId = requestAnimationFrame(loop) }
    rafId = requestAnimationFrame(loop)
    return () => { window.removeEventListener('scroll', update); cancelAnimationFrame(rafId) }
  }, [])

  return (
    <>
      {/* ── PINNED HORIZONTAL ──────────────────────────── */}
      <div ref={triggerRef} className="hs-trigger" aria-label="Services overview"
        style={{ height: `${PANELS.length * 100}vh`, position: 'relative' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: '#fff' }}>

          {/* Progress bar */}
          <div ref={barRef} style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--blue)', zIndex: 20, width: '0%', transition: 'width .04s linear' }} />

          {/* Dot indicators */}
          <div ref={dotsRef} style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8, zIndex: 20 }}>
            {PANELS.map((_, i) => (
              <span key={i} className="hs-dot" style={{ width: 7, height: 7, borderRadius: '50%', background: 'rgba(0,0,0,0.15)', display: 'block', transition: 'all .3s' }} />
            ))}
          </div>

          {/* Sliding track */}
          <div ref={trackRef} style={{ display: 'flex', width: `${PANELS.length * 100}vw`, height: '100%', willChange: 'transform' }}>
            {PANELS.map((p) => (
              <div key={p.num} style={{ width: '100vw', height: '100%', flexShrink: 0, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 64px', position: 'relative', overflow: 'hidden' }}>

                {/* Content grid */}
                <div style={{ maxWidth: 1280, width: '100%', display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 72, alignItems: 'center', height: '100%', maxHeight: 640 }}>

                  {/* Left */}
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.14em', textTransform: 'uppercase', color: p.color, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ opacity: 0.4, fontSize: 13 }}>{p.num}</span> {p.tag}
                    </div>
                    <h2 style={{ fontSize: 'clamp(32px, 3.6vw, 58px)', fontWeight: 900, letterSpacing: '-.03em', lineHeight: 1.08, marginBottom: 22, color: '#0f172a' }}>{p.heading}</h2>
                    <p style={{ fontSize: 'clamp(15px, 1.4vw, 18px)', color: '#64748b', lineHeight: 1.75, marginBottom: 36, maxWidth: 480 }}>{p.body}</p>
                    <Link href={p.href} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 15, fontWeight: 800, color: '#fff', background: p.color, borderRadius: 50, padding: '14px 32px', textDecoration: 'none' }}>
                      Learn more →
                    </Link>
                  </div>

                  {/* Right — dashboard visual */}
                  <div style={{ height: '100%', maxHeight: 480 }}>
                    {p.visual}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .hs-dot.active { background: #0f172a !important; transform: scale(1.5); }
        @media (max-width: 768px) {
          .hs-trigger { display: none !important; }
          .hs-fallback { display: block !important; }
        }
      `}</style>

      {/* ── MOBILE FALLBACK ─────────────────────────── */}
      <section className="hs-fallback" style={{ display: 'none', padding: '60px 24px' }}>
        {PANELS.map((p) => (
          <div key={p.num} style={{ background: '#fff', borderRadius: 24, padding: 28, marginBottom: 20, border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', color: p.color, marginBottom: 12 }}>{p.tag}</div>
            <h3 style={{ fontSize: 24, fontWeight: 900, marginBottom: 12, color: '#0f172a' }}>{p.heading}</h3>
            <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.7, marginBottom: 20 }}>{p.body}</p>
            <Link href={p.href} style={{ display: 'inline-block', fontSize: 14, fontWeight: 700, color: p.color, textDecoration: 'none' }}>Learn more →</Link>
          </div>
        ))}
      </section>
    </>
  )
}
