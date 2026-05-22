import Breadcrumb from './Breadcrumb'
import HeroBg from './HeroBg'

export default function ArticleLayout({
  breadcrumb, title, subtitle, toc, children,
}: { breadcrumb: { label: string; href?: string }[]; title: string; subtitle?: string; toc?: { id: string; label: string }[]; children: React.ReactNode }) {
  return (
    <>
      <HeroBg grid blobs>
        <Breadcrumb items={breadcrumb} />
        <h1 className="h1" style={{ maxWidth: 820 }}>{title}</h1>
        {subtitle && <p className="lead" style={{ maxWidth: 680, marginTop: 14 }}>{subtitle}</p>}
      </HeroBg>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: toc ? '240px 1fr' : '1fr', gap: 48, alignItems: 'start' }}>
          {toc && (
            <aside style={{ position: 'sticky', top: 100 }} className="sg-toc">
              <div className="eyebrow" style={{ marginBottom: 12 }}>On this page</div>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {toc.map((t) => <a key={t.id} href={`#${t.id}`} className="text-soft" style={{ fontSize: 14 }}>{t.label}</a>)}
              </nav>
            </aside>
          )}
          <div className="sg-article" style={{ maxWidth: 760, lineHeight: 1.75 }}>{children}</div>
        </div>
      </section>
      <style>{`
        .sg-article h2 { font-size: 26px; margin: 36px 0 12px; }
        .sg-article h3 { font-size: 19px; margin: 26px 0 10px; }
        .sg-article p { color: var(--text-soft); margin-bottom: 16px; }
        .sg-article ul { color: var(--text-soft); margin: 0 0 16px 22px; display: flex; flex-direction: column; gap: 8px; }
        .sg-article a { color: var(--blue); }
        @media (max-width: 860px){ .sg-toc { display: none; } .container:has(.sg-article) { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  )
}
