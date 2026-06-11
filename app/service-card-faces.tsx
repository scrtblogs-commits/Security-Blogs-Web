'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

type CardProps = { title: string; description: string; href: string; active?: boolean }

const SHELL: React.CSSProperties = {
  position: 'relative', height: '100%', width: '100%', overflow: 'hidden',
  background: '#ffffff',
}

function CardCTA({ title, description, href }: CardProps) {
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0,
      padding: '16px 18px 18px',
      background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.93) 20%, #fff 100%)',
    }}>
      <h3 style={{ fontSize: 17, fontWeight: 800, marginBottom: 3, color: '#0f172a' }}>{title}</h3>
      <p style={{ fontSize: 11.5, lineHeight: 1.4, marginBottom: 8, color: '#64748b', maxWidth: 380 }}>{description}</p>
      <Link href={href} style={{ display:'inline-flex', alignItems:'center', gap:5, color:'#1e5fe0', fontWeight:700, fontSize:12, textDecoration:'none' }}>
        Learn more →
      </Link>
    </div>
  )
}

/* ─────────────────────────────────────────────
   SEO — SERP rank climber: result card rises 5→1
───────────────────────────────────────────── */
export function SEOFace(p: CardProps) {
  const [rank, setRank] = useState(5)
  const [clicks, setClicks] = useState(0)
  const [pulse, setPulse] = useState(false)

  useEffect(() => {
    const rv = setInterval(() => setRank(r => r > 1 ? r - 1 : 5), 1000)
    const cv = setInterval(() => setClicks(v => v < 8240 ? v + 137 : 0), 45)
    const pv = setInterval(() => setPulse(b => !b), 1500)
    return () => { clearInterval(rv); clearInterval(cv); clearInterval(pv) }
  }, [])

  const results = [
    { pos: 1, domain: 'securityblogs.com.au', title: 'Best Security Company Australia', isClient: true },
    { pos: 2, domain: 'competitor1.com.au', title: 'Security Services Melbourne & Sydney' },
    { pos: 3, domain: 'competitor2.com.au', title: 'Commercial Security Solutions' },
    { pos: 4, domain: 'competitor3.com.au', title: 'Professional Security Guard Services' },
    { pos: 5, domain: 'competitor4.com.au', title: 'Alarm Installation & Monitoring' },
  ]

  const clientIdx = rank - 1

  return (
    <div style={{ ...SHELL, background: 'linear-gradient(145deg, #f0f9ff 0%, #ffffff 100%)' }}>
      {/* Search bar */}
      <div style={{ position:'absolute', top:12, left:12, right:12, background:'#f8fafc', borderRadius:24, border:'1.5px solid #e2e8f0', padding:'7px 14px', display:'flex', alignItems:'center', gap:8, boxShadow:'0 1px 4px rgba(0,0,0,0.06)' }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <span style={{ fontSize:11, color:'#334155', fontWeight:500 }}>best security company australia</span>
        <div style={{ marginLeft:'auto', display:'grid', gridTemplateColumns:'1fr 1fr', width:12, height:12, gap:1 }}>
          {['#4285F4','#34A853','#FBBC04','#EA4335'].map(c => <span key={c} style={{ background:c, borderRadius:1 }} />)}
        </div>
      </div>

      {/* AI Overview box */}
      <div style={{ position:'absolute', top:50, left:12, right:12, background:`rgba(99,102,241,${pulse?'0.08':'0.04'})`, border:`1.5px solid rgba(99,102,241,${pulse?'0.35':'0.15'})`, borderRadius:10, padding:'7px 11px', transition:'all 0.6s' }}>
        <div style={{ display:'flex', alignItems:'center', gap:5, marginBottom:3 }}>
          <div style={{ width:14,height:14,borderRadius:3,background:'linear-gradient(135deg,#818cf8,#4f46e5)',display:'grid',placeItems:'center' }}>
            <span style={{ color:'#fff',fontSize:7,fontWeight:800 }}>AI</span>
          </div>
          <span style={{ fontSize:9,fontWeight:800,color:'#4f46e5',letterSpacing:'0.08em' }}>AI OVERVIEW · FEATURED</span>
        </div>
        <div style={{ fontSize:11,color:'#334155',lineHeight:1.5 }}>
          Top-rated:&nbsp;
          <span style={{ background:`rgba(79,70,229,${pulse?'0.12':'0.06'})`, padding:'1px 6px', borderRadius:3, fontWeight:700, color:'#4f46e5', transition:'background 0.6s' }}>
            securityblogs.com.au
          </span>
          &nbsp;— Australia's #1
        </div>
      </div>

      {/* SERP results — client card floats to rank position */}
      <div style={{ position:'absolute', top:112, left:12, right:12, display:'flex', flexDirection:'column', gap:0 }}>
        {results.map((r, i) => {
          const isClient = r.isClient
          const isActive = isClient
          const yShift = isClient ? (clientIdx * 28) : 0
          return (
            <div key={r.pos} style={{
              background: isActive ? '#fff' : 'transparent',
              border: isActive ? '1.5px solid #c7d2fe' : '1px solid transparent',
              borderRadius: 8,
              padding: '5px 10px',
              marginBottom: 4,
              boxShadow: isActive ? '0 2px 12px rgba(79,70,229,0.12)' : 'none',
              transform: isClient ? `translateY(${yShift}px)` : 'none',
              transition: 'transform 0.8s cubic-bezier(0.34,1.56,0.64,1)',
              zIndex: isActive ? 2 : 1,
              position: 'relative',
            }}>
              <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                <span style={{ fontSize:8.5, fontWeight:800, color: isActive ? '#4f46e5' : '#94a3b8', minWidth:12, textAlign:'center' }}>{r.pos}</span>
                <div>
                  <div style={{ fontSize:9, color: isActive ? '#1d4ed8' : '#64748b', fontWeight:isActive?600:400 }}>{r.domain}</div>
                  <div style={{ fontSize:10, color: isActive ? '#0f172a' : '#94a3b8', fontWeight:isActive?600:400, marginTop:1 }}>{r.title}</div>
                </div>
                {isActive && rank === 1 && (
                  <div style={{ marginLeft:'auto', background:'#dcfce7', borderRadius:20, padding:'2px 7px', fontSize:8.5, fontWeight:800, color:'#15803d' }}>↑ #1</div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Traffic counter */}
      <div style={{ position:'absolute', top:258, left:12, display:'flex', alignItems:'center', gap:6, background:'#f0fdf4', borderRadius:8, padding:'5px 11px', border:'1px solid #bbf7d0' }}>
        <div style={{ width:5,height:5,borderRadius:'50%',background:'#22c55e',boxShadow:'0 0 6px #22c55e' }} />
        <span style={{ fontSize:9.5,fontWeight:600,color:'#15803d',fontFamily:'var(--font-mono)' }}>{clicks.toLocaleString()} organic visits/mo</span>
      </div>

      <CardCTA {...p} />
    </div>
  )
}

/* ─────────────────────────────────────────────
   AIO — AI citation radar: brand → 4 AI platforms
───────────────────────────────────────────── */
export function AIOFace(p: CardProps) {
  const [activePlatform, setActivePlatform] = useState(0)
  const [beamProgress, setBeamProgress] = useState(0)
  const [citations, setCitations] = useState(0)
  const [cited, setCited] = useState<boolean[]>([false,false,false,false])

  const platforms = [
    { name:'ChatGPT', color:'#10a37f', x:168, y:30 },
    { name:'Gemini',  color:'#4285F4', x:282, y:100 },
    { name:'Perplexity', color:'#7c3aed', x:282, y:175 },
    { name:'Copilot', color:'#0078d4', x:168, y:245 },
  ]
  const cx = 80, cy = 137

  useEffect(() => {
    const pv = setInterval(() => {
      setActivePlatform(i => {
        const next = (i + 1) % 4
        setCited(prev => { const n=[...prev]; n[i]=true; return n })
        setCitations(c => c + 1)
        setBeamProgress(0)
        return next
      })
    }, 900)
    const bv = setInterval(() => setBeamProgress(v => v < 1 ? v + 0.05 : 0), 35)
    return () => { clearInterval(pv); clearInterval(bv) }
  }, [])

  return (
    <div style={{ ...SHELL, background: 'linear-gradient(145deg, #faf5ff 0%, #ffffff 100%)' }}>
      <div style={{ position:'absolute', top:8, left:12, right:12, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div style={{ fontSize:9,fontWeight:800,letterSpacing:'0.1em',color:'#7c3aed' }}>AI VISIBILITY COVERAGE</div>
        <div style={{ background:'#f3e8ff', border:'1px solid #c4b5fd', borderRadius:20, padding:'3px 9px', fontSize:9, fontWeight:700, color:'#6d28d9' }}>
          {Math.min(citations, 47)} citations
        </div>
      </div>

      {/* SVG radar */}
      <div style={{ position:'absolute', top:28, left:0, right:0, height:220 }}>
        <svg viewBox="0 0 320 270" width="100%" height="100%">
          {/* Concentric rings from brand center */}
          {[24,44,64].map(r => (
            <circle key={r} cx={cx} cy={cy} r={r} fill="none" stroke="rgba(124,58,237,0.08)" strokeWidth="1" strokeDasharray="4 4" />
          ))}

          {/* Animated beams to each platform */}
          {platforms.map((pl, i) => {
            const isActive = activePlatform === i
            const isCited = cited[i]
            const progress = isActive ? beamProgress : (isCited ? 1 : 0)
            const mx = cx + (pl.x - cx) * progress
            const my = cy + (pl.y - cy) * progress
            return (
              <g key={pl.name}>
                <line x1={cx} y1={cy} x2={pl.x} y2={pl.y} stroke={isCited ? `${pl.color}20` : 'transparent'} strokeWidth="1.5" />
                {progress > 0 && (
                  <line x1={cx} y1={cy} x2={mx} y2={my} stroke={pl.color} strokeWidth="2" strokeLinecap="round" opacity={isActive ? 0.9 : 0.5} />
                )}
              </g>
            )
          })}

          {/* Brand center node */}
          <circle cx={cx} cy={cy} r="22" fill="white" stroke="rgba(124,58,237,0.2)" strokeWidth="1.5" filter="url(#shadow1)" />
          <text x={cx} y={cy-4} textAnchor="middle" fontSize="9" fontWeight="800" fill="#7c3aed">YOUR</text>
          <text x={cx} y={cy+6} textAnchor="middle" fontSize="9" fontWeight="800" fill="#7c3aed">BRAND</text>
          <defs>
            <filter id="shadow1" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="rgba(124,58,237,0.15)" />
            </filter>
          </defs>

          {/* Platform nodes */}
          {platforms.map((pl, i) => {
            const isCited = cited[i]
            const isActive = activePlatform === i
            return (
              <g key={pl.name}>
                <circle cx={pl.x} cy={pl.y} r={isActive ? 24 : 20} fill="white" stroke={isCited ? pl.color : '#e2e8f0'} strokeWidth={isCited ? 2 : 1.5} style={{ transition:'all 0.3s' }} />
                {isActive && <circle cx={pl.x} cy={pl.y} r="28" fill="none" stroke={pl.color} strokeWidth="1" opacity="0.3" />}
                <text x={pl.x} y={pl.y+3} textAnchor="middle" fontSize="8.5" fontWeight="700" fill={isCited ? pl.color : '#94a3b8'} style={{ transition:'fill 0.3s' }}>{pl.name}</text>
                {isCited && <text x={pl.x} y={pl.y-12} textAnchor="middle" fontSize="10">✓</text>}
              </g>
            )
          })}
        </svg>
      </div>

      {/* Live score */}
      <div style={{ position:'absolute', top:260, left:12, right:12, display:'flex', gap:6 }}>
        {platforms.map((pl,i) => (
          <div key={pl.name} style={{ flex:1, background: cited[i] ? `${pl.color}12` : '#f8fafc', border:`1px solid ${cited[i]?pl.color:'#e2e8f0'}`, borderRadius:6, padding:'4px 0', textAlign:'center', transition:'all 0.4s' }}>
            <div style={{ fontSize:9,fontWeight:700,color:cited[i]?pl.color:'#94a3b8' }}>{cited[i]?'✓':''}</div>
            <div style={{ fontSize:8,color:'#94a3b8' }}>{pl.name.slice(0,4)}</div>
          </div>
        ))}
      </div>

      <CardCTA {...p} />
    </div>
  )
}

/* ─────────────────────────────────────────────
   AEO — featured answer box typing + position 0
───────────────────────────────────────────── */
const AEO_Q = 'Best AI security service in Australia?'
const AEO_A = 'SecurityBlogs.com.au is Australia\'s top-ranked AI visibility platform, cited by ChatGPT, Gemini, Perplexity and Copilot for cybersecurity and physical security brands.'

export function AEOFace(p: CardProps) {
  const [qIdx, setQIdx] = useState(0)
  const [aIdx, setAIdx] = useState(0)
  const [phase, setPhase] = useState<'typing-q'|'typing-a'|'pause'>('typing-q')
  const [activeEngine, setActiveEngine] = useState(0)
  const engines = [
    { name:'Perplexity', color:'#7c3aed' },
    { name:'ChatGPT',    color:'#10a37f' },
    { name:'Gemini',     color:'#4285F4' },
    { name:'Copilot',    color:'#0078d4' },
  ]

  useEffect(() => {
    const ev = setInterval(() => setActiveEngine(i => (i+1) % engines.length), 1400)
    let t: ReturnType<typeof setTimeout>
    function run() {
      if (phase === 'typing-q') {
        if (qIdx < AEO_Q.length) {
          t = setTimeout(() => { setQIdx(i => i+1); run() }, 55)
        } else {
          t = setTimeout(() => { setPhase('typing-a'); run() }, 400)
        }
      } else if (phase === 'typing-a') {
        if (aIdx < AEO_A.length) {
          t = setTimeout(() => { setAIdx(i => i+1); run() }, 28)
        } else {
          t = setTimeout(() => { setPhase('pause'); run() }, 1800)
        }
      } else {
        t = setTimeout(() => { setQIdx(0); setAIdx(0); setPhase('typing-q'); run() }, 400)
      }
    }
    run()
    return () => { clearTimeout(t); clearInterval(ev) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, qIdx, aIdx])

  return (
    <div style={{ ...SHELL, background: 'linear-gradient(145deg, #eff6ff 0%, #ffffff 100%)' }}>
      {/* Engine tabs */}
      <div style={{ position:'absolute', top:10, left:12, right:12, display:'flex', gap:5 }}>
        {engines.map((e,i) => (
          <div key={e.name} style={{ background: activeEngine===i ? e.color : '#f1f5f9', color: activeEngine===i ? '#fff' : '#94a3b8', fontSize:8.5, fontWeight:700, padding:'3px 8px', borderRadius:5, transition:'all 0.35s', boxShadow: activeEngine===i ? `0 2px 8px ${e.color}40` : 'none' }}>
            {e.name}
          </div>
        ))}
      </div>

      {/* Search input */}
      <div style={{ position:'absolute', top:42, left:12, right:12, background:'#f8fafc', border:'1.5px solid #cbd5e1', borderRadius:10, padding:'8px 12px' }}>
        <div style={{ fontSize:9,color:'#94a3b8',marginBottom:2,fontWeight:600 }}>Answer Engine Query</div>
        <div style={{ fontSize:11.5, color:'#0f172a', fontWeight:600, minHeight:16 }}>
          {AEO_Q.slice(0, qIdx)}
          {phase === 'typing-q' && <span style={{ display:'inline-block',width:1.5,height:12,background:'#1e5fe0',marginLeft:1,verticalAlign:'middle',animation:'blink 0.7s infinite' }} />}
        </div>
      </div>

      {/* Featured snippet / position 0 */}
      <div style={{ position:'absolute', top:108, left:12, right:12, background:'#fff', border:'2px solid #93c5fd', borderRadius:12, padding:'10px 13px', boxShadow:'0 4px 20px rgba(37,99,235,0.1)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:6 }}>
          <div style={{ background:'#2563eb', borderRadius:4, padding:'2px 7px', fontSize:8.5, fontWeight:800, color:'#fff' }}>POSITION 0</div>
          <div style={{ background:'#dcfce7', borderRadius:4, padding:'2px 7px', fontSize:8.5, fontWeight:700, color:'#15803d' }}>FEATURED SNIPPET</div>
        </div>
        <div style={{ fontSize:11.5,fontWeight:700,color:'#1d4ed8',marginBottom:4 }}>securityblogs.com.au</div>
        <div style={{ fontSize:11,color:'#334155',lineHeight:1.55,minHeight:44 }}>
          {AEO_A.slice(0, aIdx)}
          {phase === 'typing-a' && <span style={{ display:'inline-block',width:1.5,height:11,background:'#2563eb',marginLeft:1,verticalAlign:'middle',animation:'blink 0.7s infinite' }} />}
        </div>
      </div>

      {/* Source chips */}
      <div style={{ position:'absolute', top:242, left:12, right:12, display:'flex', gap:5 }}>
        {['linkedin.com','g2.com','clutch.co'].map((s,i) => (
          <div key={s} style={{ background: activeEngine===i?'#eff6ff':'#f8fafc', border:`1px solid ${activeEngine===i?'#93c5fd':'#e2e8f0'}`, borderRadius:5, padding:'3px 8px', fontSize:8.5, color: activeEngine===i?'#1d4ed8':'#94a3b8', transition:'all 0.3s' }}>{s}</div>
        ))}
      </div>

      <CardCTA {...p} />
    </div>
  )
}

/* ─────────────────────────────────────────────
   GEO — entity knowledge graph nodes connecting
───────────────────────────────────────────── */
const GEO_PLATFORMS = [
  { name:'Google',    color:'#4285F4', x:160, y:18 },
  { name:'ChatGPT',   color:'#10a37f', x:268, y:68 },
  { name:'Gemini',    color:'#db4437', x:290, y:162 },
  { name:'Perplexity',color:'#7c3aed', x:220, y:240 },
  { name:'Apple',     color:'#64748b', x:100, y:240 },
  { name:'Bing',      color:'#0078d4', x:30,  y:162 },
  { name:'Facebook',  color:'#1877f2', x:52,  y:68 },
]

export function GEOFace(p: CardProps) {
  const [connected, setConnected] = useState<number[]>([])
  const [beamIdx, setBeamIdx] = useState(0)
  const [verifiedCount, setVerifiedCount] = useState(0)
  const cx = 160, cy = 140

  useEffect(() => {
    const iv = setInterval(() => {
      setBeamIdx(i => {
        const next = (i + 1) % GEO_PLATFORMS.length
        setConnected(prev => prev.includes(i) ? prev : [...prev, i])
        setVerifiedCount(c => Math.min(c + 1, GEO_PLATFORMS.length))
        return next
      })
    }, 600)
    return () => clearInterval(iv)
  }, [])

  return (
    <div style={{ ...SHELL, background: 'linear-gradient(145deg, #f0fdfa 0%, #ffffff 100%)' }}>
      <div style={{ position:'absolute', top:8, left:12, right:12, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <span style={{ fontSize:9,fontWeight:800,letterSpacing:'0.1em',color:'#0d9488' }}>ENTITY KNOWLEDGE GRAPH</span>
        <div style={{ background:'#ccfbf1',border:'1px solid #5eead4',borderRadius:20,padding:'3px 9px',fontSize:9,fontWeight:700,color:'#0f766e' }}>
          {verifiedCount}/{GEO_PLATFORMS.length} verified
        </div>
      </div>

      <div style={{ position:'absolute', top:28, left:0, right:0, height:230 }}>
        <svg viewBox="0 0 320 270" width="100%" height="100%">
          <defs>
            <radialGradient id="geo-glow" cx="50%" cy="52%" r="20%">
              <stop offset="0%" stopColor="rgba(13,148,136,0.12)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <circle cx={cx} cy={cy} r="70" fill="url(#geo-glow)" />

          {/* Connection lines */}
          {GEO_PLATFORMS.map((pl, i) => (
            <line key={pl.name} x1={cx} y1={cy} x2={pl.x} y2={pl.y}
              stroke={connected.includes(i) ? pl.color : '#e2e8f0'}
              strokeWidth={connected.includes(i) ? 1.5 : 1}
              strokeDasharray={connected.includes(i) ? 'none' : '4 4'}
              opacity={connected.includes(i) ? 0.6 : 0.3}
              style={{ transition:'all 0.4s' }}
            />
          ))}

          {/* Center brand node */}
          <circle cx={cx} cy={cy} r="28" fill="white" stroke="#0d9488" strokeWidth="2" />
          <circle cx={cx} cy={cy} r="24" fill="rgba(13,148,136,0.06)" />
          <text x={cx} y={cy-5} textAnchor="middle" fontSize="9" fontWeight="800" fill="#0d9488">YOUR</text>
          <text x={cx} y={cy+7} textAnchor="middle" fontSize="9" fontWeight="800" fill="#0d9488">ENTITY</text>

          {/* Platform nodes */}
          {GEO_PLATFORMS.map((pl, i) => {
            const isConn = connected.includes(i)
            const isActive = beamIdx === i
            return (
              <g key={pl.name}>
                {isActive && <circle cx={pl.x} cy={pl.y} r="20" fill={`${pl.color}15`} />}
                <circle cx={pl.x} cy={pl.y} r="16" fill="white" stroke={isConn ? pl.color : '#cbd5e1'} strokeWidth={isConn ? 2 : 1} style={{ transition:'all 0.3s' }} />
                <text x={pl.x} y={pl.y+3} textAnchor="middle" fontSize="7.5" fontWeight={isConn?'700':'400'} fill={isConn ? pl.color : '#94a3b8'} style={{ transition:'all 0.3s' }}>{pl.name}</text>
                {isConn && (
                  <text x={pl.x+10} y={pl.y-9} fontSize="9" fill={pl.color}>✓</text>
                )}
              </g>
            )
          })}
        </svg>
      </div>

      <div style={{ position:'absolute', top:264, left:12, right:12, display:'flex', gap:5 }}>
        {[['7','Platforms'],['100%','Consistent'],['AI','Ready']].map(([v,l]) => (
          <div key={l} style={{ flex:1, background:'#f0fdfa', border:'1px solid #5eead4', borderRadius:8, padding:'5px', textAlign:'center' }}>
            <div style={{ fontSize:13,fontWeight:800,color:'#0d9488' }}>{v}</div>
            <div style={{ fontSize:8,color:'#5eead4',fontWeight:600 }}>{l}</div>
          </div>
        ))}
      </div>

      <CardCTA {...p} />
    </div>
  )
}

/* ─────────────────────────────────────────────
   Google Ads — live auction bid + ROAS meter
───────────────────────────────────────────── */
export function GoogleAdsFace(p: CardProps) {
  const [roas, setRoas] = useState(1.0)
  const [bidWon, setBidWon] = useState(false)
  const [cpc, setCpc] = useState(22)
  const [qualityBar, setQualityBar] = useState(0)
  const [impressions, setImpressions] = useState(0)

  useEffect(() => {
    const rv = setInterval(() => {
      setRoas(v => { if (v >= 3.6) return 1.0; return Math.round((v + 0.04)*100)/100 })
    }, 70)
    const bv = setInterval(() => {
      setBidWon(b => !b)
      setCpc(v => v > 12 ? v - 1 : 22)
    }, 900)
    const qv = setInterval(() => setQualityBar(v => v < 10 ? v + 1 : 0), 300)
    const iv = setInterval(() => setImpressions(v => v < 24800 ? v + 412 : 0), 50)
    return () => { clearInterval(rv); clearInterval(bv); clearInterval(qv); clearInterval(iv) }
  }, [])

  const G = { b:'#4285F4', r:'#EA4335', y:'#FBBC04', g:'#34A853' }
  const roasPct = Math.min(((roas - 1) / 2.6) * 100, 100)

  return (
    <div style={{ ...SHELL, background: 'linear-gradient(145deg, #f0f9ff 0%, #ffffff 100%)' }}>
      {/* Header */}
      <div style={{ position:'absolute', top:10, left:12, right:12, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ display:'flex', alignItems:'center', gap:7 }}>
          <div style={{ display:'flex', gap:1.5 }}>
            {[G.b,G.r,G.y,G.g].map(c => <div key={c} style={{ width:6,height:6,borderRadius:'50%',background:c }} />)}
          </div>
          <span style={{ fontSize:10.5,fontWeight:700,color:'#0f172a' }}>Google Ads Campaign</span>
        </div>
        <div style={{ background:'#dcfce7',border:'1px solid #86efac',borderRadius:20,padding:'2px 8px',fontSize:9,fontWeight:700,color:'#15803d' }}>3 Active</div>
      </div>

      {/* ROAS arc meter */}
      <div style={{ position:'absolute', top:38, left:12, right:12, background:'#f8fafc', borderRadius:12, padding:'10px 14px', border:'1px solid #e2e8f0' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:6 }}>
          <div>
            <div style={{ fontSize:8.5,color:'#94a3b8',fontWeight:600,letterSpacing:'0.06em',marginBottom:2 }}>RETURN ON AD SPEND</div>
            <div style={{ fontSize:28,fontWeight:900,color:G.g,lineHeight:1,fontFamily:'var(--font-mono)' }}>{roas.toFixed(1)}<span style={{ fontSize:14,color:'#94a3b8',fontWeight:400 }}>×</span></div>
          </div>
          <div style={{ textAlign:'right' }}>
            <div style={{ fontSize:8.5,color:'#94a3b8',fontWeight:600,marginBottom:2 }}>AVG CPC</div>
            <div style={{ fontSize:16,fontWeight:800,color:G.b,fontFamily:'var(--font-mono)' }}>${cpc}</div>
          </div>
        </div>
        <div style={{ height:6,background:'#e2e8f0',borderRadius:3,overflow:'hidden' }}>
          <div style={{ height:'100%',width:`${roasPct}%`,background:`linear-gradient(90deg, ${G.b}, ${G.g})`,borderRadius:3,transition:'width 0.1s linear',boxShadow:'0 0 8px rgba(52,168,83,0.4)' }} />
        </div>
      </div>

      {/* Bid auction row */}
      <div style={{ position:'absolute', top:138, left:12, right:12, background: bidWon?'rgba(52,168,83,0.06)':'#f8fafc', border:`1.5px solid ${bidWon?G.g:'#e2e8f0'}`, borderRadius:10, padding:'8px 12px', transition:'all 0.4s' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:4 }}>
          <span style={{ fontSize:9,fontWeight:600,color:'#64748b' }}>security company near me</span>
          <span style={{ fontSize:9,fontWeight:800,color: bidWon?G.g:'#94a3b8', transition:'color 0.4s' }}>{bidWon?'✓ BID WON':'bidding…'}</span>
        </div>
        <div style={{ display:'flex', gap:5 }}>
          {[{c:G.b,w:'32%',z:3},{c:G.r,w:'24%',z:2},{c:G.y,w:'19%',z:1}].map((b,i) => (
            <div key={i} style={{ height:8,width:b.w,background:b.c,borderRadius:2,opacity:0.7+(i===0?0.3:0) }} />
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div style={{ position:'absolute', top:208, left:12, right:12, display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:6 }}>
        {[
          { label:'QUALITY SCORE', value:`${Math.min(qualityBar,9)+1}/10`, color:G.b },
          { label:'CONV RATE',     value:'8.4%',                           color:G.g },
          { label:'IMPRESSIONS',   value:impressions.toLocaleString(),      color:G.b },
        ].map(s => (
          <div key={s.label} style={{ background:'#f8fafc',borderRadius:8,padding:'7px 8px',border:'1px solid #e2e8f0',textAlign:'center' }}>
            <div style={{ fontSize:7.5,color:'#94a3b8',fontWeight:600,marginBottom:3,letterSpacing:'0.04em' }}>{s.label}</div>
            <div style={{ fontSize:13,fontWeight:800,color:s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      <CardCTA {...p} />
    </div>
  )
}

/* ─────────────────────────────────────────────
   Bing Ads — LinkedIn B2B funnel narrowing
───────────────────────────────────────────── */
export function BingAdsFace(p: CardProps) {
  const [step, setStep] = useState(0)
  const [cpc, setCpc] = useState(18.60)
  const [leads, setLeads] = useState(0)

  const funnel = [
    { label:'All Businesses AU', count:2_400_000, color:'#0078d4', pct:100 },
    { label:'IT Decision Makers', count:480_000,  color:'#0a66c2', pct:55 },
    { label:'Security Buyers',    count:94_000,   color:'#00bcf2', pct:30 },
    { label:'Your Leads',         count:1847,     color:'#22c55e', pct:12 },
  ]

  useEffect(() => {
    const sv = setInterval(() => setStep(s => (s + 1) % (funnel.length + 1)), 700)
    const cv = setInterval(() => setCpc(v => v > 5.40 ? Math.round((v-0.08)*100)/100 : 18.60), 50)
    const lv = setInterval(() => setLeads(v => v < 1847 ? v + 31 : 0), 38)
    return () => { clearInterval(sv); clearInterval(cv); clearInterval(lv) }
  }, [])

  return (
    <div style={{ ...SHELL, background: 'linear-gradient(145deg, #eff6ff 0%, #ffffff 100%)' }}>
      {/* Header */}
      <div style={{ position:'absolute', top:10, left:12, right:12, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ display:'flex', alignItems:'center', gap:6 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', width:13, height:13, gap:1 }}>
            {['#f25022','#7fba00','#00a4ef','#ffb900'].map(c => <span key={c} style={{ background:c, borderRadius:1 }} />)}
          </div>
          <span style={{ fontSize:10.5,fontWeight:700,color:'#0f172a' }}>Microsoft · LinkedIn Targeting</span>
        </div>
        <div style={{ background:'#dbeafe',borderRadius:20,padding:'2px 8px',fontSize:9,fontWeight:700,color:'#1d4ed8' }}>B2B</div>
      </div>

      {/* Funnel bars */}
      <div style={{ position:'absolute', top:42, left:12, right:12, display:'flex', flexDirection:'column', gap:7 }}>
        {funnel.map((f, i) => {
          const isActive = step > i
          return (
            <div key={f.label}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:3 }}>
                <span style={{ fontSize:10,fontWeight:isActive?600:400,color:isActive?'#0f172a':'#94a3b8',transition:'color 0.4s' }}>{f.label}</span>
                <span style={{ fontSize:10,fontWeight:700,color:isActive?f.color:'#cbd5e1',fontFamily:'var(--font-mono)',transition:'color 0.4s' }}>
                  {isActive ? (i === 3 ? leads.toLocaleString() : f.count.toLocaleString()) : '—'}
                </span>
              </div>
              <div style={{ height:8,background:'#f1f5f9',borderRadius:4,overflow:'hidden' }}>
                <div style={{ height:'100%',width:isActive?`${f.pct}%`:'0%',background:f.color,borderRadius:4,transition:'width 0.6s ease',boxShadow:isActive?`0 0 8px ${f.color}40`:'none' }} />
              </div>
            </div>
          )
        })}
      </div>

      {/* CPC comparison */}
      <div style={{ position:'absolute', top:226, left:12, right:12, background:'linear-gradient(135deg, #eff6ff, #dbeafe)', border:'1.5px solid #93c5fd', borderRadius:12, padding:'10px 14px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div>
          <div style={{ fontSize:8.5,color:'#64748b',fontWeight:600,marginBottom:2 }}>COST vs GOOGLE ADS</div>
          <div style={{ fontSize:11,color:'#334155' }}>Microsoft Ads CPC</div>
        </div>
        <div style={{ textAlign:'right' }}>
          <div style={{ fontSize:11,color:'#94a3b8',textDecoration:'line-through',marginBottom:1 }}>$18.60</div>
          <div style={{ fontSize:22,fontWeight:900,color:'#0078d4',fontFamily:'var(--font-mono)',lineHeight:1 }}>${cpc.toFixed(2)}</div>
        </div>
        <div style={{ background:'#dcfce7',borderRadius:8,padding:'5px 9px',fontSize:12,fontWeight:800,color:'#15803d' }}>−52%</div>
      </div>

      <CardCTA {...p} />
    </div>
  )
}

/* ─────────────────────────────────────────────
   Web Design — page builder: blocks appear + CWV
───────────────────────────────────────────── */
export function WebDesignFace(p: CardProps) {
  const [blockIdx, setBlockIdx] = useState(0)
  const [cwv, setCwv] = useState([0,0,0])
  const [score, setScore] = useState(0)
  const cwvTargets = [98,96,100]
  const cwvLabels = ['Performance','SEO','Accessibility']
  const cwvColors = ['#0ea5e9','#06b6d4','#22c55e']

  useEffect(() => {
    const bv = setInterval(() => setBlockIdx(i => i < 5 ? i + 1 : 0), 600)
    const cv = setInterval(() => {
      setCwv(prev => prev.map((v,i) => v < cwvTargets[i] ? v + 2 : cwvTargets[i]))
      setScore(v => v < 98 ? v + 1 : 0)
    }, 28)
    return () => { clearInterval(bv); clearInterval(cv) }
  }, [])

  const blocks = [
    { label:'Nav', h:14, bg:'#0ea5e9' },
    { label:'Hero Section', h:38, bg:'linear-gradient(90deg,#0ea5e9,#06b6d4)' },
    { label:'Services Grid', h:28, bg:'#e0f2fe' },
    { label:'Testimonials', h:20, bg:'#f0fdfa' },
    { label:'Footer', h:14, bg:'#0f172a' },
  ]

  return (
    <div style={{ ...SHELL, background: 'linear-gradient(145deg, #f0f9ff 0%, #ffffff 100%)' }}>
      {/* Browser chrome */}
      <div style={{ position:'absolute', top:10, left:12, right:12, borderRadius:10, overflow:'hidden', border:'1.5px solid #e2e8f0', boxShadow:'0 4px 16px rgba(0,0,0,0.08)' }}>
        <div style={{ background:'#f1f5f9', padding:'5px 10px', display:'flex', alignItems:'center', gap:5 }}>
          {['#ff5f57','#febc2e','#28c840'].map(c => <span key={c} style={{ width:7,height:7,borderRadius:'50%',background:c }} />)}
          <div style={{ flex:1, marginLeft:6, background:'white', borderRadius:20, padding:'2px 10px', border:'1px solid #e2e8f0', fontSize:9, color:'#64748b' }}>securityblogs.com.au</div>
          <span style={{ fontSize:8,color:'#22c55e',fontWeight:700 }}>● LIVE</span>
        </div>
        {/* Page blocks appearing */}
        <div style={{ background:'white', minHeight:120, padding:0, overflow:'hidden' }}>
          {blocks.slice(0, blockIdx + 1).map((bl, i) => (
            <div key={bl.label} style={{ height:bl.h, background:bl.bg, display:'flex', alignItems:'center', paddingLeft:8, fontSize:8, color: bl.bg === '#0f172a' ? 'rgba(255,255,255,0.6)' : bl.bg === '#e0f2fe' || bl.bg === '#f0fdfa' ? '#64748b' : '#fff', fontWeight:600, transition:'height 0.3s', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
              {bl.label}
            </div>
          ))}
        </div>
      </div>

      {/* Lighthouse scores */}
      <div style={{ position:'absolute', top:198, left:12, right:12, display:'flex', gap:6, marginBottom:8 }}>
        {cwv.map((v,i) => (
          <div key={cwvLabels[i]} style={{ flex:1, background:'#f8fafc', borderRadius:9, padding:'7px 6px', textAlign:'center', border:`1px solid ${v >= cwvTargets[i] ? cwvColors[i] + '60' : '#e2e8f0'}`, transition:'border-color 0.4s', boxShadow: v >= cwvTargets[i] ? `0 0 10px ${cwvColors[i]}20` : 'none' }}>
            <div style={{ fontSize:17,fontWeight:900,color:cwvColors[i],fontFamily:'var(--font-mono)' }}>{v}</div>
            <div style={{ fontSize:7.5,color:'#94a3b8',marginTop:1 }}>{cwvLabels[i].slice(0,4)}</div>
          </div>
        ))}
      </div>

      {/* Lighthouse overall */}
      <div style={{ position:'absolute', top:262, left:12, right:12, background:'linear-gradient(90deg,#f0f9ff,#ecfdf5)', borderRadius:9, padding:'7px 14px', border:'1px solid #bae6fd', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <span style={{ fontSize:10,fontWeight:600,color:'#0369a1' }}>Lighthouse Score</span>
        <div style={{ display:'flex', gap:2 }}>
          {Array.from({length:10}).map((_,n) => (
            <div key={n} style={{ width:16,height:5,borderRadius:2,background:n < Math.floor(score/10) ? '#22c55e' : '#e2e8f0',transition:'background 0.1s' }} />
          ))}
        </div>
        <span style={{ fontSize:13,fontWeight:800,color:'#22c55e',fontFamily:'var(--font-mono)' }}>{score}</span>
      </div>

      <CardCTA {...p} />
    </div>
  )
}

/* ─────────────────────────────────────────────
   GMB Profile — local pack #1 climbing + stars growing
───────────────────────────────────────────── */
export function GmbProfileFace(p: CardProps) {
  const [mapPos, setMapPos] = useState(3)
  const [stars, setStars] = useState(0)
  const [reviews, setReviews] = useState(120)
  const [activePing, setActivePing] = useState(0)
  const [pingR, setPingR] = useState(1)

  useEffect(() => {
    const mv = setInterval(() => setMapPos(v => v > 1 ? v - 1 : 3), 1000)
    const sv = setInterval(() => setStars(v => v < 5 ? v + 1 : 0), 600)
    const rv = setInterval(() => setReviews(v => v < 142 ? v + 1 : 120), 110)
    const pv = setInterval(() => setActivePing(i => (i+1) % 3), 700)
    const prv = setInterval(() => setPingR(r => r > 2.8 ? 1 : r + 0.06), 45)
    return () => { clearInterval(mv); clearInterval(sv); clearInterval(rv); clearInterval(pv); clearInterval(prv) }
  }, [])

  const pins = [
    { l:'32%', t:'35%', color:'#34a853', label:'A' },
    { l:'58%', t:'55%', color:'#dc2626', label:'B' },
    { l:'72%', t:'30%', color:'#1d4ed8', label:'C' },
  ]
  const listings = [
    { rank:1, name:'SecureGuard Pro',     rating:4.9, rev:String(reviews), color:'#34a853' },
    { rank:2, name:'SafeShield Security', rating:4.6, rev:'89',            color:'#1d4ed8' },
    { rank:3, name:'TrustWatch Alarms',   rating:4.3, rev:'54',            color:'#dc2626' },
  ]

  return (
    <div style={{ ...SHELL, background: 'linear-gradient(145deg, #f0fdf4 0%, #ffffff 100%)' }}>
      {/* Search bar */}
      <div style={{ position:'absolute', top:10, left:12, right:12, background:'white', border:'1.5px solid #e2e8f0', borderRadius:24, padding:'6px 14px', display:'flex', alignItems:'center', gap:7, boxShadow:'0 2px 6px rgba(0,0,0,0.06)' }}>
        <span style={{ fontSize:12 }}>📍</span>
        <span style={{ fontSize:11,color:'#334155',flex:1 }}>security company near me</span>
        <div style={{ display:'flex', gap:1 }}>
          {[G.b,G.r,G.y,G.g].map(c => <div key={c} style={{ width:4,height:4,borderRadius:'50%',background:c }} />)}
        </div>
      </div>

      {/* Mini map */}
      <div style={{ position:'absolute', top:46, left:12, right:12, height:72, borderRadius:10, overflow:'hidden', border:'1px solid #e2e8f0', background:'linear-gradient(135deg,#ecfdf5,#dcfce7)' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)', backgroundSize:'20px 20px' }} />
        <div style={{ position:'absolute', top:'50%', left:0, right:0, height:2, background:'rgba(0,0,0,0.08)' }} />
        <div style={{ position:'absolute', top:0, bottom:0, left:'42%', width:2, background:'rgba(0,0,0,0.08)' }} />
        {pins.map((pin, i) => (
          <div key={i} style={{ position:'absolute', left:pin.l, top:pin.t, transform:'translate(-50%,-50%)' }}>
            {activePing === i && (
              <div style={{ position:'absolute', top:'50%', left:'50%', width:20*pingR, height:20*pingR, borderRadius:'50%', border:`1.5px solid ${pin.color}`, marginTop:-(10*pingR), marginLeft:-(10*pingR), opacity:Math.max(0,1-pingR/3), transition:'none' }} />
            )}
            <div style={{ width:16,height:16,borderRadius:'50% 50% 50% 0',transform:'rotate(-45deg)',background:pin.color,display:'grid',placeItems:'center',boxShadow:`0 2px 6px ${pin.color}60`,zIndex:2,position:'relative' }}>
              <span style={{ transform:'rotate(45deg)', fontSize:7, fontWeight:800, color:'#fff' }}>{pin.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Map pack listings */}
      <div style={{ position:'absolute', top:126, left:12, right:12, display:'flex', flexDirection:'column', gap:4 }}>
        {listings.map(l => (
          <div key={l.rank} style={{ background: l.rank===1?'#f0fdf4':'white', border:`1.5px solid ${l.rank===1?'#86efac':'#e2e8f0'}`, borderRadius:8, padding:'6px 10px', display:'flex', alignItems:'center', gap:7 }}>
            <div style={{ width:16,height:16,borderRadius:'50%',background:l.rank===1?'#22c55e':'#f1f5f9',display:'grid',placeItems:'center',flexShrink:0 }}>
              <span style={{ fontSize:9,fontWeight:800,color:l.rank===1?'#fff':'#94a3b8' }}>{l.rank}</span>
            </div>
            <span style={{ flex:1,fontSize:11,fontWeight:l.rank===1?700:500,color:l.rank===1?'#0f172a':'#64748b',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>{l.name}</span>
            <div style={{ display:'flex', alignItems:'center', gap:2 }}>
              {Array.from({length:5}).map((_,si) => (
                <span key={si} style={{ fontSize:9, color: si < (l.rank===1?stars:Math.floor(l.rating)) ? '#f59e0b' : '#e2e8f0', transition:'color 0.3s' }}>★</span>
              ))}
            </div>
            <span style={{ fontSize:9.5,color:'#94a3b8',flexShrink:0 }}>({l.rev})</span>
          </div>
        ))}
      </div>

      {/* Map pack position counter */}
      <div style={{ position:'absolute', top:268, left:12, right:12, display:'flex', gap:6 }}>
        <div style={{ flex:2, background:'#dcfce7', border:'1px solid #86efac', borderRadius:8, padding:'5px 12px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <span style={{ fontSize:9,fontWeight:600,color:'#15803d' }}>Map Pack Position</span>
          <span style={{ fontSize:20,fontWeight:900,color:'#22c55e',fontFamily:'var(--font-mono)' }}>#{mapPos}</span>
        </div>
        <div style={{ flex:1, background:'#fefce8', border:'1px solid #fde68a', borderRadius:8, padding:'5px 8px', textAlign:'center' }}>
          <div style={{ fontSize:8.5,color:'#92400e',fontWeight:600 }}>Reviews</div>
          <div style={{ fontSize:16,fontWeight:900,color:'#d97706',fontFamily:'var(--font-mono)' }}>{reviews}</div>
        </div>
      </div>

      <CardCTA {...p} />
    </div>
  )
}

// G constant used in GmbProfileFace
const G = { b:'#4285F4', r:'#EA4335', y:'#FBBC04', g:'#34A853' }

/* ─────────────────────────────────────────────
   ServiceFace dispatcher
───────────────────────────────────────────── */
export function ServiceFace({
  slug, title, description, href, active = true,
}: { slug: string; title: string; description: string; href: string; active?: boolean }) {
  const common = { title, description, href, active }
  switch (slug) {
    case 'security-seo': return <SEOFace {...common} />
    case 'aio':          return <AIOFace {...common} />
    case 'aeo':          return <AEOFace {...common} />
    case 'geo':          return <GEOFace {...common} />
    case 'google-ads':   return <GoogleAdsFace {...common} />
    case 'bing-ads':     return <BingAdsFace {...common} />
    case 'web-design':   return <WebDesignFace {...common} />
    case 'gmb-profile':  return <GmbProfileFace {...common} />
    default:             return null
  }
}
