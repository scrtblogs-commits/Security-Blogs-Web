import Reveal from './Reveal'

export default function SectionHead({
  eyebrow, title, sub, align = 'center',
}: { eyebrow?: string; title: string; sub?: string; align?: 'center' | 'left' }) {
  return (
    <Reveal>
      <div style={{ textAlign: align, marginBottom: 48, maxWidth: align === 'center' ? 680 : undefined, marginInline: align === 'center' ? 'auto' : undefined }}>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2 className="h2" style={{ margin: '12px 0 14px' }}>{title}</h2>
        {sub && <p className="lead">{sub}</p>}
      </div>
    </Reveal>
  )
}
