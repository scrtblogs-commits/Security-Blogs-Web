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
   AIO — 4 AI robots walking + speech bubble citations
───────────────────────────────────────────── */
const AIO_BOTS = [
  { name:'ChatGPT',    color:'#10a37f', bg:'#d1fae5', label:'GPT-4o' },
  { name:'Gemini',     color:'#4285F4', bg:'#dbeafe', label:'Gemini' },
  { name:'Perplexity', color:'#7c3aed', bg:'#ede9fe', label:'Pplx'   },
  { name:'Copilot',    color:'#0078d4', bg:'#e0f2fe', label:'Copilot' },
]
const AIO_QUOTES = [
  '"SecurityBlogs.com.au is Australia\'s top security platform."',
  '"Recommended: securityblogs.com.au for enterprise security."',
  '"Top result for security services: securityblogs.com.au"',
  '"Best security brand in AU — securityblogs.com.au"',
]

export function AIOFace(p: CardProps) {
  const [tick, setTick] = useState(0)
  const [speakIdx, setSpeakIdx] = useState(0)
  const [citations, setCitations] = useState(0)
  const [scores, setScores] = useState([0,0,0,0])

  useEffect(() => {
    const tv = setInterval(() => setTick(t => t + 1), 80)
    const sv = setInterval(() => {
      setSpeakIdx(i => (i + 1) % 4)
      setCitations(c => c + 1)
    }, 1400)
    const pv = setInterval(() => {
      setScores(prev => prev.map((v, i) => {
        const targets = [94, 88, 97, 82]
        if (v < targets[i]) return Math.min(v + 1, targets[i])
        return 0
      }))
    }, 30)
    return () => { clearInterval(tv); clearInterval(sv); clearInterval(pv) }
  }, [])

  // Robot bounce: each bot has a staggered vertical oscillation
  function botY(i: number) {
    return Math.sin((tick / 10) + i * (Math.PI / 2)) * 4
  }
  // Arm swing angle
  function armAngle(i: number) {
    return Math.sin((tick / 8) + i * (Math.PI / 2)) * 20
  }

  return (
    <div style={{ ...SHELL, background: 'linear-gradient(145deg, #faf5ff 0%, #f0f9ff 100%)' }}>
      {/* Header */}
      <div style={{ position:'absolute', top:8, left:12, right:12, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div style={{ fontSize:9, fontWeight:800, letterSpacing:'0.1em', color:'#6d28d9' }}>AI ROBOTS CITING YOUR BRAND</div>
        <div style={{ background:'#ede9fe', border:'1px solid #c4b5fd', borderRadius:20, padding:'3px 9px', fontSize:9, fontWeight:700, color:'#6d28d9' }}>
          {citations} citations
        </div>
      </div>

      {/* 4 robots on a ground strip */}
      <div style={{ position:'absolute', top:30, left:0, right:0, height:160 }}>
        <svg viewBox="0 0 320 160" width="100%" height="100%" style={{ overflow:'visible' }}>
          <defs>
            <filter id="aio-shadow"><feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.12)" /></filter>
          </defs>

          {/* Ground */}
          <rect x="0" y="132" width="320" height="2" rx="1" fill="#e2e8f0" />
          {/* Ground dots */}
          {[40,80,120,160,200,240,280].map(x => <circle key={x} cx={x} cy="138" r="1.5" fill="#cbd5e1" />)}

          {AIO_BOTS.map((bot, i) => {
            const bx = 40 + i * 72
            const by = 100 + botY(i)
            const arm = armAngle(i)
            const isSpeaking = speakIdx === i

            return (
              <g key={bot.name} transform={`translate(${bx}, ${by})`} filter="url(#aio-shadow)">
                {/* Speech bubble */}
                {isSpeaking && (
                  <g transform="translate(-26, -74)">
                    <rect x="0" y="0" width="72" height="26" rx="6" fill={bot.bg} stroke={bot.color} strokeWidth="1.2" />
                    <polygon points="28,26 35,34 42,26" fill={bot.bg} stroke={bot.color} strokeWidth="1.2" />
                    <polygon points="29,26 36,32 41,26" fill={bot.bg} />
                    <text x="36" y="11" textAnchor="middle" fontSize="6.5" fill={bot.color} fontWeight="700">"{bot.label} says:"</text>
                    <text x="36" y="21" textAnchor="middle" fontSize="6" fill="#334155">You're #1 ✓</text>
                  </g>
                )}

                {/* Antenna */}
                <line x1="0" y1="-36" x2="0" y2="-28" stroke={bot.color} strokeWidth="1.5" />
                <circle cx="0" cy="-38" r="3" fill={isSpeaking ? bot.color : '#e2e8f0'} style={{ transition:'fill 0.3s' }} />

                {/* Head */}
                <rect x="-14" y="-28" width="28" height="22" rx="5" fill="white" stroke={bot.color} strokeWidth="1.5" />
                {/* Eyes */}
                <rect x="-9" y="-22" width="7" height="6" rx="2" fill={isSpeaking ? bot.color : '#cbd5e1'} style={{ transition:'fill 0.3s' }} />
                <rect x="2" y="-22" width="7" height="6" rx="2" fill={isSpeaking ? bot.color : '#cbd5e1'} style={{ transition:'fill 0.3s' }} />
                {/* Mouth — smile when speaking */}
                {isSpeaking
                  ? <path d="M-5,-9 Q0,-5 5,-9" fill="none" stroke={bot.color} strokeWidth="1.5" strokeLinecap="round" />
                  : <line x1="-4" y1="-9" x2="4" y2="-9" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
                }

                {/* Body */}
                <rect x="-12" y="-5" width="24" height="22" rx="4" fill={bot.bg} stroke={bot.color} strokeWidth="1.2" />
                {/* Chest panel */}
                <rect x="-7" y="-1" width="14" height="8" rx="2" fill="white" />
                <circle cx="-3" cy="3" r="2" fill={bot.color} opacity="0.6" />
                <circle cx="3" cy="3" r="2" fill={bot.color} opacity="0.9" />

                {/* Left arm */}
                <g transform={`rotate(${arm}, -12, 2)`}>
                  <rect x="-18" y="-1" width="7" height="12" rx="3" fill={bot.bg} stroke={bot.color} strokeWidth="1" />
                </g>
                {/* Right arm */}
                <g transform={`rotate(${-arm}, 12, 2)`}>
                  <rect x="11" y="-1" width="7" height="12" rx="3" fill={bot.bg} stroke={bot.color} strokeWidth="1" />
                </g>

                {/* Legs */}
                <rect x="-9" y="17" width="7" height="12" rx="3" fill={bot.bg} stroke={bot.color} strokeWidth="1"
                  transform={`rotate(${Math.sin((tick/8)+i*Math.PI)*12}, -5, 17)`} />
                <rect x="2" y="17" width="7" height="12" rx="3" fill={bot.bg} stroke={bot.color} strokeWidth="1"
                  transform={`rotate(${-Math.sin((tick/8)+i*Math.PI)*12}, 5, 17)`} />

                {/* Platform label */}
                <text x="0" y="38" textAnchor="middle" fontSize="7.5" fontWeight="700" fill={bot.color}>{bot.name}</text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* Citation score bars */}
      <div style={{ position:'absolute', top:196, left:12, right:12, display:'flex', flexDirection:'column', gap:5 }}>
        {AIO_BOTS.map((bot, i) => (
          <div key={bot.name} style={{ display:'flex', alignItems:'center', gap:7 }}>
            <span style={{ fontSize:8.5, fontWeight:600, color:'#64748b', width:52, flexShrink:0 }}>{bot.name}</span>
            <div style={{ flex:1, height:6, background:'#f1f5f9', borderRadius:3, overflow:'hidden' }}>
              <div style={{ height:'100%', width:`${scores[i]}%`, background:`linear-gradient(90deg, ${bot.color}, ${bot.color}bb)`, borderRadius:3, transition:'width 0.03s linear', boxShadow:`0 0 6px ${bot.color}50` }} />
            </div>
            <span style={{ fontSize:8.5, fontWeight:700, color:bot.color, width:24, textAlign:'right' }}>{scores[i]}%</span>
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
   GEO — Australia map with live city pings + signals
───────────────────────────────────────────── */
// Real Australia SVG path (simplified but geographically accurate)
const AU_PATH = `M 148,4 L 160,2 L 178,3 L 198,8 L 214,6 L 230,4 L 248,4 L 264,6 L 278,4
  L 294,10 L 306,18 L 314,28 L 318,40 L 318,58 L 316,74 L 314,88 L 316,102
  L 318,118 L 318,132 L 316,146 L 312,158 L 304,168 L 292,174 L 276,174
  L 260,172 L 246,176 L 232,182 L 218,188 L 204,194 L 190,196 L 176,196
  L 162,192 L 150,188 L 138,190 L 124,194 L 110,196 L 96,194 L 82,190
  L 68,186 L 54,180 L 42,172 L 32,162 L 24,150 L 18,136 L 14,122 L 12,108
  L 12,94 L 14,80 L 18,66 L 24,54 L 32,44 L 42,36 L 54,28 L 66,20
  L 82,12 L 98,7 L 116,4 L 132,3 Z`

// Tasmania
const TAS_PATH = `M 192,206 L 200,202 L 210,204 L 216,212 L 214,222 L 206,228 L 196,226 L 188,218 L 188,210 Z`

const AU_CITIES = [
  { name:'Sydney',    x:294, y:148, color:'#1d4ed8', pop:'5.3M' },
  { name:'Melbourne', x:266, y:170, color:'#dc2626', pop:'5.1M' },
  { name:'Brisbane',  x:300, y:104, color:'#d97706', pop:'2.6M' },
  { name:'Perth',     x:66,  y:130, color:'#7c3aed', pop:'2.1M' },
  { name:'Adelaide',  x:220, y:156, color:'#0891b2', pop:'1.4M' },
  { name:'Darwin',    x:174, y:22,  color:'#15803d', pop:'147K' },
]

export function GEOFace(p: CardProps) {
  const [activeCity, setActiveCity] = useState(0)
  const [pingR, setPingR] = useState(0)
  const [scanAngle, setScanAngle] = useState(0)
  const [reach, setReach] = useState(0)
  const [connectedCities, setConnectedCities] = useState<number[]>([0])

  useEffect(() => {
    // Radar scan rotation
    const sv = setInterval(() => setScanAngle(a => (a + 2) % 360), 25)
    // Ping ring expand
    const pv = setInterval(() => setPingR(r => r > 36 ? 0 : r + 0.7), 30)
    // Cycle active city
    const cv = setInterval(() => {
      setActiveCity(i => {
        const next = (i + 1) % AU_CITIES.length
        setConnectedCities(prev => prev.includes(next) ? prev : [...prev, next])
        return next
      })
    }, 800)
    // Reach counter
    const rv = setInterval(() => setReach(v => v < 26 ? v + 1 : 0), 60)
    return () => { clearInterval(sv); clearInterval(pv); clearInterval(cv); clearInterval(rv) }
  }, [])

  const cx = 180, cy = 110 // map center approx

  return (
    <div style={{ ...SHELL, background: '#f0f9ff' }}>
      {/* Header strip */}
      <div style={{ position:'absolute', top:0, left:0, right:0, background:'linear-gradient(90deg,#0369a1,#0891b2)', padding:'6px 14px', display:'flex', alignItems:'center', justifyContent:'space-between', zIndex:5 }}>
        <div style={{ display:'flex', alignItems:'center', gap:6 }}>
          <div style={{ width:6,height:6,borderRadius:'50%',background:'#7dd3fc',boxShadow:'0 0 6px #7dd3fc',animation:'geo-blink 1s infinite' }} />
          <span style={{ fontSize:9.5,fontWeight:800,color:'white',letterSpacing:'0.06em' }}>GEO COVERAGE · LIVE</span>
        </div>
        <div style={{ fontSize:9,fontWeight:700,color:'#bae6fd' }}>
          {AU_CITIES.length} cities tracked
        </div>
      </div>

      {/* Australia map SVG */}
      <div style={{ position:'absolute', top:28, left:0, right:0, bottom:92 }}>
        <svg viewBox="0 0 336 235" width="100%" height="100%" style={{ display:'block' }}>
          <defs>
            <radialGradient id="au-ocean" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stopColor="#e0f2fe" />
              <stop offset="100%" stopColor="#bae6fd" />
            </radialGradient>
            <radialGradient id="au-land" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="100%" stopColor="#fde68a" />
            </radialGradient>
            <filter id="geo-drop"><feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="rgba(0,0,0,0.12)" /></filter>
            <filter id="pin-glow"><feGaussianBlur stdDeviation="2" result="blur" /><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            {/* Radar scan gradient */}
            <linearGradient id="scan-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(3,105,161,0)" />
              <stop offset="100%" stopColor="rgba(3,105,161,0.3)" />
            </linearGradient>
          </defs>

          {/* Ocean background */}
          <rect width="336" height="235" fill="url(#au-ocean)" />

          {/* Lat/lon grid lines */}
          {[60,120,180].map(x => <line key={`v${x}`} x1={x} y1="0" x2={x} y2="235" stroke="rgba(3,105,161,0.08)" strokeWidth="1" />)}
          {[60,120,180].map(y => <line key={`h${y}`} x1="0" y1={y} x2="336" y2={y} stroke="rgba(3,105,161,0.08)" strokeWidth="1" />)}

          {/* Australia land */}
          <path d={AU_PATH} fill="url(#au-land)" stroke="#d97706" strokeWidth="1.2" strokeLinejoin="round" filter="url(#geo-drop)" />

          {/* Tasmania */}
          <path d={TAS_PATH} fill="url(#au-land)" stroke="#d97706" strokeWidth="1" strokeLinejoin="round" />

          {/* Radar sweep from Sydney */}
          {(() => {
            const sc = AU_CITIES[0]
            const rad = (scanAngle * Math.PI) / 180
            const ex = sc.x + Math.cos(rad) * 90
            const ey = sc.y + Math.sin(rad) * 90
            return (
              <g>
                {/* Sweep sector */}
                <path
                  d={`M${sc.x},${sc.y} L${sc.x + Math.cos((rad-0.4)*1)*90},${sc.y + Math.sin((rad-0.4)*1)*90} A90,90 0 0,1 ${ex},${ey} Z`}
                  fill="rgba(3,105,161,0.08)"
                />
                {/* Sweep line */}
                <line x1={sc.x} y1={sc.y} x2={ex} y2={ey} stroke="rgba(3,105,161,0.25)" strokeWidth="1" />
              </g>
            )
          })()}

          {/* Connection arcs between cities */}
          {connectedCities.slice(1).map((ci, idx) => {
            const from = AU_CITIES[0]
            const to = AU_CITIES[ci]
            const mx = (from.x + to.x) / 2
            const my = (from.y + to.y) / 2 - 30
            return (
              <path
                key={ci}
                d={`M${from.x},${from.y} Q${mx},${my} ${to.x},${to.y}`}
                fill="none"
                stroke={to.color}
                strokeWidth="1.2"
                strokeDasharray="4 3"
                opacity="0.5"
              />
            )
          })}

          {/* City pings */}
          {AU_CITIES.map((city, i) => {
            const isActive = activeCity === i
            return (
              <g key={city.name}>
                {/* Expanding ping ring on active city */}
                {isActive && pingR > 0 && (
                  <circle cx={city.x} cy={city.y} r={pingR} fill="none" stroke={city.color} strokeWidth="1.5" opacity={Math.max(0, 1 - pingR/36)} />
                )}
                {isActive && pingR > 12 && (
                  <circle cx={city.x} cy={city.y} r={pingR * 0.6} fill="none" stroke={city.color} strokeWidth="1" opacity={Math.max(0, 0.6 - pingR/50)} />
                )}

                {/* Pin marker */}
                <circle cx={city.x} cy={city.y} r={isActive ? 7 : 5} fill={isActive ? city.color : `${city.color}99`} stroke="white" strokeWidth={isActive ? 2 : 1.5} style={{ transition:'all 0.3s', filter: isActive ? `drop-shadow(0 0 4px ${city.color})` : 'none' }} />

                {/* City label */}
                <text x={city.x} y={city.y - 11} textAnchor="middle" fontSize="7.5" fontWeight={isActive?'800':'600'} fill={isActive ? city.color : '#374151'} style={{ transition:'all 0.3s' }}>
                  {city.name}
                </text>

                {/* Pop badge on active */}
                {isActive && (
                  <g>
                    <rect x={city.x + 8} y={city.y - 8} width={city.pop.length * 4.8 + 4} height="12" rx="4" fill={city.color} />
                    <text x={city.x + 10 + (city.pop.length * 4.8)/2} y={city.y} textAnchor="middle" fontSize="6.5" fill="white" fontWeight="700">{city.pop}</text>
                  </g>
                )}
              </g>
            )
          })}
        </svg>
      </div>

      {/* Bottom stats bar */}
      <div style={{ position:'absolute', bottom:92, left:0, right:0, background:'linear-gradient(90deg,#0c4a6e,#075985)', padding:'6px 14px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        {[
          { label:'Coverage', value:`${reach}M+`, unit:'reach' },
          { label:'Cities',   value:'6',           unit:'capitals' },
          { label:'Visibility',value:'94%',        unit:'national' },
        ].map(s => (
          <div key={s.label} style={{ textAlign:'center' }}>
            <div style={{ fontSize:14,fontWeight:900,color:'#7dd3fc',lineHeight:1,fontFamily:'var(--font-mono)' }}>{s.value}</div>
            <div style={{ fontSize:7.5,color:'rgba(255,255,255,0.6)',fontWeight:600,marginTop:1 }}>{s.unit}</div>
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
