import Link from 'next/link'

export default function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" style={{ marginBottom: 22 }}>
      <ol style={{ display: 'flex', flexWrap: 'wrap', gap: 8, listStyle: 'none', fontSize: 13.5, fontFamily: 'var(--font-mono)' }} className="text-dim">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-2">
            {it.href ? <Link href={it.href} className="text-soft">{it.label}</Link> : <span className="accent">{it.label}</span>}
            {i < items.length - 1 && <span>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}
