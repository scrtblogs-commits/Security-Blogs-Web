'use client'
import { useState, useEffect, useRef } from 'react'
import { ArrowRight, Link as LinkIcon, Zap } from 'lucide-react'

export interface TimelineItem {
  id: number
  title: string
  date: string
  content: string
  category: string
  icon: React.ElementType
  relatedIds: number[]
  status: 'completed' | 'in-progress' | 'pending'
  energy: number
}

export default function RadialOrbitalTimeline({ timelineData }: { timelineData: TimelineItem[] }) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({})
  const [rotationAngle, setRotationAngle] = useState(0)
  const [autoRotate, setAutoRotate] = useState(true)
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({})
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const orbitRef = useRef<HTMLDivElement>(null)

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({})
      setActiveNodeId(null)
      setPulseEffect({})
      setAutoRotate(true)
    }
  }

  const getRelatedItems = (itemId: number): number[] =>
    timelineData.find((i) => i.id === itemId)?.relatedIds ?? []

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const next: Record<number, boolean> = {}
      Object.keys(prev).forEach((k) => { next[+k] = false })
      next[id] = !prev[id]
      if (!prev[id]) {
        setActiveNodeId(id)
        setAutoRotate(false)
        const pulse: Record<number, boolean> = {}
        getRelatedItems(id).forEach((r) => { pulse[r] = true })
        setPulseEffect(pulse)
        const idx = timelineData.findIndex((i) => i.id === id)
        setRotationAngle(270 - (idx / timelineData.length) * 360)
      } else {
        setActiveNodeId(null)
        setAutoRotate(true)
        setPulseEffect({})
      }
      return next
    })
  }

  useEffect(() => {
    if (!autoRotate) return
    const t = setInterval(() => setRotationAngle((p) => Number(((p + 0.3) % 360).toFixed(3))), 50)
    return () => clearInterval(t)
  }, [autoRotate])

  const nodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360
    const radian = (angle * Math.PI) / 180
    const radius = 200
    const x = radius * Math.cos(radian)
    const y = radius * Math.sin(radian)
    const zIndex = Math.round(100 + 50 * Math.cos(radian))
    const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)))
    return { x, y, zIndex, opacity }
  }

  const isRelatedToActive = (id: number) => (activeNodeId ? getRelatedItems(activeNodeId).includes(id) : false)

  const statusStyle = (s: TimelineItem['status']) =>
    s === 'completed'
      ? { color: '#06101f', background: '#fff', border: '1px solid #fff' }
      : s === 'in-progress'
        ? { color: '#fff', background: 'rgba(30,95,224,0.9)', border: '1px solid rgba(255,255,255,0.6)' }
        : { color: '#fff', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.4)' }

  return (
    <div
      ref={containerRef}
      onClick={handleContainerClick}
      style={{
        position: 'relative', width: '100%', height: 620, overflow: 'hidden',
        borderRadius: 'var(--radius-lg)', background: 'radial-gradient(circle at 50% 45%, #0c1a33, #060d1c 70%)',
        border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <div ref={orbitRef} style={{ position: 'absolute', inset: 0 }} onClick={handleContainerClick}>
        {/* center hub */}
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg,#6f4dff,#1e5fe0 60%,#1e9e75)', display: 'grid', placeItems: 'center', zIndex: 10 }}>
          <span className="sg-ping" style={{ position: 'absolute', width: 84, height: 84, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)' }} />
          <span className="sg-ping" style={{ position: 'absolute', width: 104, height: 104, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', animationDelay: '0.6s' }} />
          <span style={{ width: 30, height: 30, borderRadius: '50%', background: 'rgba(255,255,255,0.85)' }} />
        </div>
        {/* orbit ring */}
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 400, height: 400, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)' }} />

        {timelineData.map((item, index) => {
          const pos = nodePosition(index, timelineData.length)
          const isExpanded = !!expandedItems[item.id]
          const isRelated = isRelatedToActive(item.id)
          const isPulsing = !!pulseEffect[item.id]
          const Icon = item.icon
          return (
            <div
              key={item.id}
              onClick={(e) => { e.stopPropagation(); toggleItem(item.id) }}
              style={{
                position: 'absolute', left: '50%', top: '50%',
                transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))`,
                zIndex: isExpanded ? 200 : pos.zIndex, opacity: isExpanded ? 1 : pos.opacity,
                transition: 'transform .7s ease, opacity .7s ease', cursor: 'pointer',
              }}
            >
              <div className={isPulsing ? 'sg-pulse' : ''} style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: item.energy * 0.5 + 40, height: item.energy * 0.5 + 40, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.2), transparent 70%)' }} />
              <div
                style={{
                  width: 44, height: 44, borderRadius: '50%', display: 'grid', placeItems: 'center',
                  transition: 'all .3s', transform: isExpanded ? 'scale(1.4)' : 'scale(1)',
                  color: isExpanded || isRelated ? '#06101f' : '#fff',
                  background: isExpanded ? '#fff' : isRelated ? 'rgba(255,255,255,0.6)' : '#0a1424',
                  border: `2px solid ${isExpanded ? '#fff' : 'rgba(255,255,255,0.4)'}`,
                  boxShadow: isExpanded ? '0 0 20px rgba(255,255,255,0.4)' : 'none',
                }}
              >
                <Icon size={18} />
              </div>
              <div style={{ position: 'absolute', top: 52, left: '50%', transform: `translateX(-50%) ${isExpanded ? 'scale(1.1)' : ''}`, whiteSpace: 'nowrap', fontSize: 11.5, fontWeight: 700, letterSpacing: '0.06em', color: isExpanded ? '#fff' : 'rgba(255,255,255,0.7)', transition: 'all .3s' }}>
                {item.title}
              </div>

              {isExpanded && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{ position: 'absolute', top: 84, left: '50%', transform: 'translateX(-50%)', width: 250, background: 'rgba(6,14,28,0.94)', backdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 12, padding: 16, boxShadow: '0 20px 50px -20px rgba(0,0,0,0.7)', textAlign: 'left' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 999, ...statusStyle(item.status) }}>
                      {item.status === 'completed' ? 'DONE' : item.status === 'in-progress' ? 'ACTIVE' : 'NEXT'}
                    </span>
                    <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.5)' }}>{item.date}</span>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{item.title}</div>
                  <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>{item.content}</p>
                  <div style={{ marginTop: 12, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 5, color: 'rgba(255,255,255,0.8)' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Zap size={11} /> Authority</span>
                      <span style={{ fontFamily: 'var(--font-mono)' }}>{item.energy}%</span>
                    </div>
                    <div style={{ width: '100%', height: 4, borderRadius: 999, background: 'rgba(255,255,255,0.12)', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${item.energy}%`, background: 'linear-gradient(90deg,#1e5fe0,#6f4dff)' }} />
                    </div>
                  </div>
                  {item.relatedIds.length > 0 && (
                    <div style={{ marginTop: 12, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 }}>
                        <LinkIcon size={11} style={{ color: 'rgba(255,255,255,0.7)' }} />
                        <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Connected</span>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {item.relatedIds.map((rid) => {
                          const rel = timelineData.find((i) => i.id === rid)
                          return (
                            <button key={rid} onClick={(e) => { e.stopPropagation(); toggleItem(rid) }}
                              style={{ display: 'inline-flex', alignItems: 'center', gap: 4, height: 24, padding: '0 8px', fontSize: 11, borderRadius: 6, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }}>
                              {rel?.title}<ArrowRight size={9} />
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
      <style>{`
        @keyframes sg-ping { 75%,100% { transform: scale(1.9); opacity: 0; } }
        .sg-ping { animation: sg-ping 1.6s cubic-bezier(0,0,0.2,1) infinite; }
        .sg-pulse { animation: pulse 1.2s cubic-bezier(0.4,0,0.6,1) infinite; }
      `}</style>
    </div>
  )
}
