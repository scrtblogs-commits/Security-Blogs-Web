import Link from 'next/link'
import Breadcrumb from './Breadcrumb'

export default function ArticleLayout({
  breadcrumb,
  title,
  subtitle,
  category,
  date,
  readTime,
  toc,
  children,
}: {
  breadcrumb: { label: string; href?: string }[]
  title: string
  subtitle?: string
  category?: string
  date?: string
  readTime?: string
  toc?: { id: string; label: string }[]
  children: React.ReactNode
}) {
  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })
    : null

  return (
    <>
      {/* Hero */}
      <div className="sg-post-hero">
        <div className="container" style={{ maxWidth: 900, paddingTop: 0, paddingBottom: 40 }}>
          <Breadcrumb items={breadcrumb} />

          {(category || formattedDate || readTime) && (
            <div className="sg-post-meta" style={{ marginTop: 16 }}>
              {category && (
                <span className="chip" style={{ color: 'var(--blue)', borderColor: 'rgba(30,95,224,0.3)', background: 'rgba(30,95,224,0.07)' }}>
                  {category}
                </span>
              )}
              {formattedDate && <><span className="sep">·</span><span>{formattedDate}</span></>}
              {readTime && <><span className="sep">·</span><span>{readTime} read</span></>}
            </div>
          )}

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 5vw, 48px)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: 'var(--text)',
            marginBottom: 20,
            marginTop: 12,
            maxWidth: 820,
          }}>
            {title}
          </h1>

          {subtitle && (
            <p style={{
              fontSize: 'clamp(16px, 2vw, 19px)',
              color: 'var(--text-soft)',
              lineHeight: 1.65,
              maxWidth: 720,
            }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <section className="section" style={{ paddingTop: 40 }}>
        <div
          className="container sg-article-layout"
          style={{
            display: 'grid',
            gridTemplateColumns: toc ? '1fr 280px' : '1fr',
            gap: 48,
            alignItems: 'start',
            maxWidth: 1100,
          }}
        >
          <div className="sg-article">{children}</div>

          {toc && toc.length > 1 && (
            <aside className="sg-sidebar" style={{ position: 'sticky', top: 96 }}>
              <div className="sg-sidebar-widget">
                <div className="sg-sidebar-widget-title">On this page</div>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {toc.map((t) => (
                    <a key={t.id} href={`#${t.id}`} className="sg-toc-link" style={{ paddingLeft: 10 }}>
                      {t.label}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="sg-sidebar-widget" style={{ background: 'linear-gradient(135deg, rgba(30,95,224,0.08) 0%, rgba(30,95,224,0.02) 100%)', borderColor: 'rgba(30,95,224,0.2)' }}>
                <div style={{ fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-display)', marginBottom: 10 }}>
                  Free Visibility Audit
                </div>
                <p style={{ fontSize: 13.5, color: 'var(--text-soft)', marginBottom: 14, lineHeight: 1.55 }}>
                  See exactly where your security brand is missing from Google and AI assistants.
                </p>
                <Link href="/contact/" className="btn btn-primary" style={{ fontSize: 13.5, padding: '10px 16px', width: '100%', justifyContent: 'center', display: 'flex' }}>
                  Book free audit →
                </Link>
              </div>
            </aside>
          )}
        </div>
      </section>
    </>
  )
}
