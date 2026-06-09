import Reveal from './Reveal'

export default function SectionHead({
  eyebrow, title, sub, align = 'center', dark = false,
}: { eyebrow?: string; title: string; sub?: string; align?: 'center' | 'left'; dark?: boolean }) {
  return (
    <Reveal>
      <div style={{ textAlign: align, marginBottom: 48, maxWidth: align === 'center' ? 680 : undefined, marginInline: align === 'center' ? 'auto' : undefined }}>
        {eyebrow && <span className="eyebrow" style={dark ? { color: 'rgba(120,160,255,0.8)', borderColor: 'rgba(120,160,255,0.2)' } : undefined}>{eyebrow}</span>}
        <h2 className="h2" style={{ margin: '12px 0 14px', ...(dark ? { color: '#fff' } : {}) }}>{title}</h2>
        {sub && <p className="lead" style={dark ? { color: 'rgba(255,255,255,0.55)' } : undefined}>{sub}</p>}
      </div>
    </Reveal>
  )
}
