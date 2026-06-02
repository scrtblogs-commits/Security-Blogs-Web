import Glyph from '@/components/ui/Glyph'
import { Stagger, Item } from './Reveal'

export type BentoCell = { title: string; desc?: string; icon?: string }

export default function Bento({ cells, cols = 3 }: { cells: BentoCell[]; cols?: number }) {
  return (
    <Stagger style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 18 }} className="sg-bento">
      {cells.map((c, i) => (
        <Item key={i}>
          <div className="card" style={{ height: '100%' }}>
            {c.icon && <div style={{ fontSize: 26, marginBottom: 12 }}><Glyph icon={c.icon} size={22} /></div>}
            <h4 style={{ fontSize: 17, marginBottom: 6 }}>{c.title}</h4>
            {c.desc && <p className="text-soft" style={{ fontSize: 14 }}>{c.desc}</p>}
          </div>
        </Item>
      ))}
      <style>{`@media (max-width: 860px){ .sg-bento { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 520px){ .sg-bento { grid-template-columns: 1fr !important; } }`}</style>
    </Stagger>
  )
}
