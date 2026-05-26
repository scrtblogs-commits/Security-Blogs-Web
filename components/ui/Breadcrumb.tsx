import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import { breadcrumbSchema } from '@/lib/schema'

export default function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <>
      <JsonLd data={breadcrumbSchema(items)} />
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
    </>
  )
}
