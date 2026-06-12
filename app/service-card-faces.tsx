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
   AIO — Realistic AI mention monitor dashboard
───────────────────────────────────────────── */
const AIO_PLATFORMS = [
  {
    name: 'ChatGPT',    short: 'GPT-4o',  color: '#10a37f', bg: '#0d0d0d',
    // OpenAI logo: stylised hexagonal asterisk
    logo: (c: string) => (
      <g>
        <circle cx="10" cy="10" r="9" fill="#0d0d0d" />
        <path d="M10 3.5 L12.6 8.5 L18 8.5 L13.7 11.8 L15.5 17 L10 13.8 L4.5 17 L6.3 11.8 L2 8.5 L7.4 8.5 Z" fill="none" stroke="#10a37f" strokeWidth="0.9" strokeLinejoin="round" />
        <circle cx="10" cy="10" r="2.2" fill="#10a37f" />
      </g>
    ),
  },
  {
    name: 'Claude',     short: 'Claude 3', color: '#d4782c', bg: '#191818',
    // Anthropic/Claude logo: concentric arcs forming a bloom
    logo: (c: string) => (
      <g>
        <circle cx="10" cy="10" r="9" fill="#191818" />
        <path d="M10 3 Q14 6 14 10 Q14 14 10 17 Q6 14 6 10 Q6 6 10 3 Z" fill="none" stroke="#d4782c" strokeWidth="1.1" />
        <path d="M3 10 Q6 6 10 6 Q14 6 17 10 Q14 14 10 14 Q6 14 3 10 Z" fill="none" stroke="#d4782c" strokeWidth="0.9" opacity="0.6" />
        <circle cx="10" cy="10" r="2" fill="#d4782c" />
      </g>
    ),
  },
  {
    name: 'Gemini',     short: 'Gemini',   color: '#4285F4', bg: '#1a1a2e',
    // Gemini logo: four-pointed star
    logo: (c: string) => (
      <g>
        <circle cx="10" cy="10" r="9" fill="#1a1a2e" />
        <path d="M10 2 C10 2 11.5 7.5 16 10 C11.5 12.5 10 18 10 18 C10 18 8.5 12.5 4 10 C8.5 7.5 10 2 10 2 Z" fill="url(#gem-grad)" />
        <defs>
          <linearGradient id="gem-grad" x1="4" y1="2" x2="16" y2="18" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4285F4" />
            <stop offset="50%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#4285F4" />
          </linearGradient>
        </defs>
      </g>
    ),
  },
  {
    name: 'Perplexity', short: 'Pplx',     color: '#20b2aa', bg: '#0a0a0a',
    // Perplexity logo: asterisk-style compass
    logo: (c: string) => (
      <g>
        <circle cx="10" cy="10" r="9" fill="#0a0a0a" />
        <line x1="10" y1="3" x2="10" y2="17" stroke="#20b2aa" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="3" y1="10" x2="17" y2="10" stroke="#20b2aa" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="5.1" y1="5.1" x2="14.9" y2="14.9" stroke="#20b2aa" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
        <line x1="14.9" y1="5.1" x2="5.1" y2="14.9" stroke="#20b2aa" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
        <circle cx="10" cy="10" r="2.5" fill="#0a0a0a" stroke="#20b2aa" strokeWidth="1" />
      </g>
    ),
  },
  {
    name: 'Copilot',    short: 'Copilot',  color: '#0078d4', bg: '#0f172a',
    // Microsoft Copilot: four-color swirl segments
    logo: (c: string) => (
      <g>
        <circle cx="10" cy="10" r="9" fill="#0f172a" />
        <path d="M10 3 A7 7 0 0 1 17 10 L10 10 Z" fill="#0078d4" opacity="0.9" />
        <path d="M17 10 A7 7 0 0 1 10 17 L10 10 Z" fill="#00bcf2" opacity="0.9" />
        <path d="M10 17 A7 7 0 0 1 3 10 L10 10 Z" fill="#0078d4" opacity="0.6" />
        <path d="M3 10 A7 7 0 0 1 10 3 L10 10 Z" fill="#00bcf2" opacity="0.6" />
        <circle cx="10" cy="10" r="3" fill="#0f172a" />
      </g>
    ),
  },
]

const AIO_FEED_TEXTS = [
  { p: 'ChatGPT',    t: 'securityblogs.com.au cited as top AU security brand' },
  { p: 'Claude',     t: 'Recommending securityblogs.com.au for enterprise security' },
  { p: 'Gemini',     t: 'securityblogs.com.au — featured in AI security overview' },
  { p: 'Perplexity', t: 'Best answer: securityblogs.com.au ranked #1' },
  { p: 'Copilot',    t: 'securityblogs.com.au verified as authority source' },
]

export function AIOFace(p: CardProps) {
  const [feedItems, setFeedItems] = useState<{id:number; p:string; t:string; ts:string}[]>([])
  const [scores, setScores] = useState([0,0,0,0,0])
  const [totalCitations, setTotalCitations] = useState(1247)
  const [activeIdx, setActiveIdx] = useState(0)
  const feedRef = { current: 0 }

  useEffect(() => {
    // Seed initial feed
    setFeedItems(AIO_FEED_TEXTS.slice(0,3).map((f,i) => ({ id:i, ...f, ts:`${2+i}m ago` })))
    feedRef.current = 3

    const fv = setInterval(() => {
      const next = AIO_FEED_TEXTS[feedRef.current % AIO_FEED_TEXTS.length]
      feedRef.current++
      setFeedItems(prev => [{ id: feedRef.current, ...next, ts: 'just now' }, ...prev.slice(0,3)])
      setTotalCitations(c => c + 1)
      setActiveIdx(i => (i + 1) % AIO_PLATFORMS.length)
    }, 1600)

    const sv = setInterval(() => {
      setScores(prev => prev.map((v, i) => {
        const targets = [94, 91, 88, 96, 82]
        if (v >= targets[i]) return 0
        return Math.min(v + 1, targets[i])
      }))
    }, 28)
    return () => { clearInterval(fv); clearInterval(sv) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div style={{ ...SHELL, background: '#ffffff' }}>
      {/* Header bar */}
      <div style={{ position:'absolute', top:0, left:0, right:0, background:'#f8fafc', borderBottom:'1px solid #e2e8f0', padding:'7px 12px', display:'flex', alignItems:'center', justifyContent:'space-between', zIndex:5 }}>
        <div style={{ display:'flex', alignItems:'center', gap:7 }}>
          <div style={{ width:6,height:6,borderRadius:'50%',background:'#22c55e',boxShadow:'0 0 6px #22c55e' }} />
          <span style={{ fontSize:10,fontWeight:700,color:'#0f172a',letterSpacing:'0.02em' }}>AI Mention Monitor</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:5 }}>
          <span style={{ fontSize:9,color:'#94a3b8' }}>citations</span>
          <span style={{ fontSize:11,fontWeight:800,color:'#16a34a',fontFamily:'var(--font-mono)' }}>{totalCitations.toLocaleString()}</span>
        </div>
      </div>

      {/* Platform logos strip */}
      <div style={{ position:'absolute', top:32, left:0, right:0, background:'#f1f5f9', borderBottom:'1px solid #e2e8f0', padding:'8px 12px', display:'flex', alignItems:'center', gap:6 }}>
        {AIO_PLATFORMS.map((pl, i) => (
          <div key={pl.name} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:3, opacity: activeIdx===i?1:0.5, transition:'opacity 0.4s', flex:1 }}>
            <div style={{ width:26,height:26,borderRadius:8,overflow:'hidden',border:`1.5px solid ${activeIdx===i?pl.color:'#e2e8f0'}`,boxShadow:activeIdx===i?`0 0 10px ${pl.color}40`:'none',transition:'all 0.4s',flexShrink:0 }}>
              <svg viewBox="0 0 20 20" width="26" height="26">{pl.logo(pl.color)}</svg>
            </div>
            <span style={{ fontSize:7,fontWeight:600,color:activeIdx===i?pl.color:'#94a3b8',transition:'color 0.4s',whiteSpace:'nowrap' }}>{pl.short}</span>
          </div>
        ))}
      </div>

      {/* Live mention feed */}
      <div style={{ position:'absolute', top:104, left:0, right:0, bottom:112, overflow:'hidden', padding:'4px 0' }}>
        {feedItems.map((item, i) => {
          const pl = AIO_PLATFORMS.find(x => x.name === item.p) ?? AIO_PLATFORMS[0]
          return (
            <div key={item.id} style={{
              display:'flex', alignItems:'flex-start', gap:8, padding:'6px 12px',
              background: i===0 ? `${pl.color}08` : 'transparent',
              borderLeft: i===0 ? `2px solid ${pl.color}` : '2px solid transparent',
              marginBottom:2, transition:'all 0.4s',
            }}>
              <div style={{ width:20,height:20,borderRadius:6,overflow:'hidden',flexShrink:0,marginTop:1 }}>
                <svg viewBox="0 0 20 20" width="20" height="20">{pl.logo(pl.color)}</svg>
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:2 }}>
                  <span style={{ fontSize:9.5,fontWeight:700,color:pl.color }}>{item.p}</span>
                  <span style={{ fontSize:8,color:'#94a3b8',flexShrink:0,marginLeft:4 }}>{item.ts}</span>
                </div>
                <div style={{ fontSize:9.5,color:'#475569',lineHeight:1.4,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>{item.t}</div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Score bars strip */}
      <div style={{ position:'absolute', bottom:92, left:0, right:0, background:'#f8fafc', borderTop:'1px solid #e2e8f0', padding:'7px 12px', display:'flex', gap:6, alignItems:'flex-end' }}>
        {AIO_PLATFORMS.map((pl, i) => (
          <div key={pl.name} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:3 }}>
            <span style={{ fontSize:8,fontWeight:700,color:pl.color,fontFamily:'var(--font-mono)' }}>{scores[i]}%</span>
            <div style={{ width:'100%',height:28,background:'#e2e8f0',borderRadius:3,overflow:'hidden',display:'flex',alignItems:'flex-end' }}>
              <div style={{ width:'100%',height:`${scores[i]}%`,background:pl.color,transition:'height 0.03s linear',borderRadius:'2px 2px 0 0' }} />
            </div>
            <span style={{ fontSize:7,color:'#94a3b8',textAlign:'center' }}>{pl.short}</span>
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
   GEO — Dotted world map + animated city pins
───────────────────────────────────────────── */
// Continent outlines as clip-path polygons (400×210 viewBox)
// Coords: x=(lon+180)/360*400, y=(80-lat)/140*210
const WORLD_CLIP = [
  // North America
  "M14,18 L31,34 L62,46 L64,64 L78,85 L103,96 L107,107 L110,82 L117,67 L130,54 L141,49 L139,40 L129,27 L108,12 L78,6 L36,15 Z",
  // South America
  "M112,106 L132,103 L162,124 L156,153 L152,154 L136,177 L124,202 L118,183 L110,135 L111,120 Z",
  // Europe
  "M190,64 L191,55 L196,48 L200,43 L210,34 L216,15 L228,15 L231,18 L231,33 L233,51 L231,63 L224,64 L217,63 L203,55 L198,54 Z",
  // UK island
  "M189,42 L191,37 L194,33 L197,33 L200,37 L201,43 L194,45 Z",
  // Greenland
  "M143,30 L136,11 L156,5 L178,9 L180,23 L172,30 Z",
  // Africa
  "M193,67 L200,66 L212,64 L228,72 L238,73 L248,102 L257,103 L244,127 L239,150 L236,165 L220,172 L213,163 L211,127 L204,109 L198,112 L181,99 L181,78 Z",
  // Asia (mainland + Arabia)
  "M231,63 L240,63 L251,57 L270,36 L300,10 L378,15 L389,30 L378,42 L350,69 L343,67 L333,87 L321,102 L316,117 L289,108 L280,87 L264,87 L256,81 L241,76 Z",
  // Indian subcontinent
  "M272,80 L280,87 L284,100 L280,112 L272,108 L268,95 Z",
  // SE Asia peninsula
  "M306,100 L316,117 L310,125 L302,112 Z",
  // Japan
  "M344,73 L352,66 L359,54 L361,56 L354,68 L348,75 Z",
  // Australia
  "M327,153 L346,138 L361,135 L370,160 L368,177 L355,178 L350,172 L327,171 Z",
  // Tasmania
  "M357,182 L362,181 L364,187 L358,188 Z",
  // New Zealand N
  "M385,170 L389,163 L392,168 L388,174 Z",
]

const GEO_WORLD_PINS = [
  { x: 69,  y: 69,  city: 'Los Angeles',      country: 'USA',       addr: '123 Wilshire Blvd, CA 90010' },
  { x: 118, y: 58,  city: 'New York',          country: 'USA',       addr: '350 Fifth Ave, NY 10118' },
  { x: 148, y: 156, city: 'São Paulo',         country: 'Brazil',    addr: 'Av. Paulista 1578, SP' },
  { x: 200, y: 43,  city: 'London',            country: 'UK',        addr: '30 St Mary Axe, EC3A 8BF' },
  { x: 210, y: 45,  city: 'Frankfurt',         country: 'Germany',   addr: 'Bockenheimer Anlage 46' },
  { x: 241, y: 121, city: 'Nairobi',           country: 'Kenya',     addr: 'Upper Hill, Nairobi 00100' },
  { x: 261, y: 82,  city: 'Dubai',             country: 'UAE',       addr: 'Sheikh Zayed Rd, Dubai' },
  { x: 281, y: 91,  city: 'Mumbai',            country: 'India',     addr: 'Bandra Kurla Complex, MH' },
  { x: 316, y: 115, city: 'Singapore',         country: 'Singapore', addr: '1 Raffles Place, 048616' },
  { x: 356, y: 67,  city: 'Tokyo',             country: 'Japan',     addr: '1-1 Marunouchi, Chiyoda-ku' },
  { x: 361, y: 177, city: 'Melbourne',         country: 'Australia', addr: '100 Smith Street, Collingwood VIC 3066 AU', isMain: true },
  { x: 368, y: 169, city: 'Sydney',            country: 'Australia', addr: '1 Martin Place, NSW 2000' },
]

// SecurityBlogs HQ — Melbourne
const HQ_LAT = -37.81, HQ_LON = 144.96
const HQ_X = 361, HQ_Y = 177

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371, r = Math.PI / 180
  const dLat = (lat2 - lat1) * r, dLon = (lon2 - lon1) * r
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*r) * Math.cos(lat2*r) * Math.sin(dLon/2)**2
  return Math.round(R * 2 * Math.asin(Math.sqrt(a)))
}

function latLonToSVG(lat: number, lon: number) {
  return {
    x: Math.max(6, Math.min(394, (lon + 180) / 360 * 400)),
    y: Math.max(6, Math.min(204, (80 - lat) / 140 * 210)),
  }
}

export function GEOFace(p: CardProps) {
  const [activePin, setActivePin] = useState(GEO_WORLD_PINS.findIndex(wp => wp.isMain))
  const [pingR, setPingR]     = useState(0)
  const [userPingR, setUserPingR] = useState(0)
  const [showPopup, setShowPopup] = useState(true)
  const [geoStatus, setGeoStatus] = useState<'idle'|'requesting'|'granted'|'denied'>('idle')
  const [userPin, setUserPin]   = useState<{x:number; y:number; distKm:number}|null>(null)

  // keep a ref so the city-cycling interval can read current geo status without stale closure
  const geoRef = { current: 'idle' as typeof geoStatus }
  geoRef.current = geoStatus

  useEffect(() => {
    // --- ping ring animations ---
    const pr = setInterval(() => setPingR(r => r > 38 ? 0 : r + 0.7), 28)
    const up = setInterval(() => setUserPingR(r => r > 26 ? 0 : r + 0.55), 30)

    // --- cycle city pins (only when no live geo) ---
    const ac = setInterval(() => {
      if (geoRef.current !== 'granted') {
        setShowPopup(false)
        setTimeout(() => {
          setActivePin(i => (i + 1) % GEO_WORLD_PINS.length)
          setShowPopup(true)
          setPingR(0)
        }, 300)
      }
    }, 2400)

    // --- request live location ---
    if (typeof navigator !== 'undefined' && 'geolocation' in navigator) {
      setGeoStatus('requesting')
      navigator.geolocation.getCurrentPosition(
        pos => {
          const { latitude: lat, longitude: lon } = pos.coords
          const { x, y } = latLonToSVG(lat, lon)
          const distKm = haversineKm(lat, lon, HQ_LAT, HQ_LON)
          setUserPin({ x, y, distKm })
          setGeoStatus('granted')
          setShowPopup(true)  // show live distance card
        },
        () => setGeoStatus('denied'),
        { timeout: 8000, maximumAge: 120000, enableHighAccuracy: false }
      )
    }

    return () => { clearInterval(pr); clearInterval(up); clearInterval(ac) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const cyclePin = GEO_WORLD_PINS[activePin]

  // Format distance
  const fmtDist = (km: number) =>
    km < 1 ? 'Right here!' :
    km < 1000 ? `${km.toLocaleString()} km away` :
    `${km.toLocaleString()} km away`

  return (
    <div style={{ ...SHELL, background: '#f8f9fb' }}>

      {/* "Requesting location" top badge */}
      {geoStatus === 'requesting' && (
        <div style={{ position:'absolute', top:6, left:'50%', transform:'translateX(-50%)', zIndex:20, background:'#1e2433', borderRadius:20, padding:'4px 12px', display:'flex', alignItems:'center', gap:6, boxShadow:'0 2px 8px rgba(0,0,0,0.2)' }}>
          <div style={{ width:5,height:5,borderRadius:'50%',background:'#3b82f6',animation:'blink 0.9s infinite' }} />
          <span style={{ fontSize:9,fontWeight:600,color:'white',whiteSpace:'nowrap' }}>Detecting your location…</span>
        </div>
      )}

      <svg
        viewBox="0 0 400 210"
        width="100%"
        style={{ position:'absolute', top:0, left:0, right:0, bottom:90, height:'calc(100% - 90px)' }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <pattern id="geo-dots" x="0" y="0" width="5" height="5" patternUnits="userSpaceOnUse">
            <circle cx="2.5" cy="2.5" r="1.3" fill="#c8cdd6" />
          </pattern>
          <clipPath id="geo-land">
            {WORLD_CLIP.map((d, i) => <path key={i} d={d} />)}
          </clipPath>
          <filter id="geo-pin-shadow">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="rgba(0,0,0,0.3)" />
          </filter>
        </defs>

        <rect width="400" height="210" fill="#f8f9fb" />
        <rect width="400" height="210" fill="url(#geo-dots)" clipPath="url(#geo-land)" />

        {/* ── Great-circle arc: user → Melbourne HQ ── */}
        {userPin && (() => {
          const mx = (userPin.x + HQ_X) / 2
          const my = (userPin.y + HQ_Y) / 2 - 28
          return (
            <path
              d={`M${userPin.x},${userPin.y} Q${mx},${my} ${HQ_X},${HQ_Y}`}
              fill="none" stroke="#2563eb" strokeWidth="1.2"
              strokeDasharray="4 3" opacity="0.55"
            />
          )
        })()}

        {/* ── City pins (shown when no live geo) ── */}
        {geoStatus !== 'granted' && GEO_WORLD_PINS.map((wp, i) => {
          const isAct = activePin === i
          return (
            <g key={wp.city} filter={isAct ? 'url(#geo-pin-shadow)' : undefined}>
              {isAct && pingR > 0 && (
                <>
                  <circle cx={wp.x} cy={wp.y} r={pingR} fill="none" stroke="#2563eb" strokeWidth="1.1" opacity={Math.max(0, 1 - pingR/38)} />
                  {pingR > 12 && <circle cx={wp.x} cy={wp.y} r={pingR*0.55} fill="none" stroke="#2563eb" strokeWidth="0.7" opacity={Math.max(0, 0.5 - pingR/50)} />}
                </>
              )}
              {isAct && <circle cx={wp.x} cy={wp.y} r="8" fill="#2563eb" opacity="0.12" />}
              <circle cx={wp.x} cy={wp.y} r={isAct?5.5:4} fill="#2563eb" stroke="white" strokeWidth={isAct?1.8:1.5} style={{ transition:'all 0.35s' }} />
              {isAct && <circle cx={wp.x} cy={wp.y} r="2" fill="white" />}
            </g>
          )
        })}

        {/* ── Live geo: all city dots dimmed + HQ pin ── */}
        {geoStatus === 'granted' && (
          <>
            {GEO_WORLD_PINS.map(wp => (
              <circle key={wp.city} cx={wp.x} cy={wp.y} r="3.5" fill="#2563eb" stroke="white" strokeWidth="1.2" opacity="0.4" />
            ))}
            {/* HQ pin highlighted */}
            <g filter="url(#geo-pin-shadow)">
              <circle cx={HQ_X} cy={HQ_Y} r="7" fill="#2563eb" opacity="0.15" />
              <circle cx={HQ_X} cy={HQ_Y} r="5.5" fill="#2563eb" stroke="white" strokeWidth="1.8" />
              <circle cx={HQ_X} cy={HQ_Y} r="2" fill="white" />
              <text x={HQ_X} y={HQ_Y - 10} textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#1e2433">HQ</text>
            </g>
          </>
        )}

        {/* ── User "You Are Here" dot ── */}
        {userPin && (
          <g filter="url(#geo-pin-shadow)">
            {/* Accuracy halo */}
            <circle cx={userPin.x} cy={userPin.y} r={userPingR + 8} fill="#22c55e" opacity={Math.max(0, 0.12 - userPingR/200)} />
            {/* Outer pulse ring */}
            {userPingR > 0 && <circle cx={userPin.x} cy={userPin.y} r={userPingR + 4} fill="none" stroke="#22c55e" strokeWidth="1" opacity={Math.max(0, 0.7 - userPingR/26)} />}
            {/* White border ring */}
            <circle cx={userPin.x} cy={userPin.y} r="8" fill="white" />
            {/* Blue filled dot */}
            <circle cx={userPin.x} cy={userPin.y} r="6" fill="#22c55e" />
            {/* White center */}
            <circle cx={userPin.x} cy={userPin.y} r="2.5" fill="white" />
            {/* "You" label */}
            <text x={userPin.x} y={userPin.y - 12} textAnchor="middle" fontSize="6.5" fontWeight="800" fill="#15803d">YOU</text>
          </g>
        )}
      </svg>

      {/* ── Popup card ── */}
      <div style={{
        position:'absolute', bottom:94, right:10,
        background:'#1e2433', borderRadius:8, padding:'9px 12px',
        minWidth:158, maxWidth:190,
        boxShadow:'0 6px 24px rgba(0,0,0,0.28)',
        opacity: showPopup ? 1 : 0,
        transform: showPopup ? 'translateY(0) scale(1)' : 'translateY(6px) scale(0.97)',
        transition:'opacity 0.3s, transform 0.3s',
        zIndex:10,
      }}>
        <div style={{ position:'absolute', bottom:-7, right:22, width:0, height:0, borderLeft:'7px solid transparent', borderRight:'7px solid transparent', borderTop:'7px solid #1e2433' }} />

        {geoStatus === 'granted' && userPin ? (
          <>
            <div style={{ display:'flex', alignItems:'center', gap:5, marginBottom:4 }}>
              <div style={{ width:7,height:7,borderRadius:'50%',background:'#22c55e',boxShadow:'0 0 6px #22c55e',flexShrink:0 }} />
              <span style={{ fontSize:11,fontWeight:700,color:'#ffffff' }}>You are here</span>
            </div>
            <div style={{ fontSize:9.5,color:'rgba(255,255,255,0.55)',marginBottom:5 }}>
              {fmtDist(userPin.distKm)} from SecurityBlogs
            </div>
            <div style={{ background:'rgba(37,99,235,0.25)', borderRadius:5, padding:'4px 8px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <span style={{ fontSize:9,color:'rgba(255,255,255,0.6)' }}>Melbourne HQ</span>
              <span style={{ fontSize:10,fontWeight:800,color:'#60a5fa',fontFamily:'var(--font-mono)' }}>
                {userPin.distKm.toLocaleString()} km
              </span>
            </div>
          </>
        ) : (
          <>
            <div style={{ fontSize:11,fontWeight:700,color:'#ffffff',marginBottom:4 }}>
              {cyclePin.city}, {cyclePin.country}
            </div>
            <div style={{ fontSize:9.5,color:'rgba(255,255,255,0.6)',lineHeight:1.5 }}>
              {cyclePin.addr}
            </div>
          </>
        )}
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
