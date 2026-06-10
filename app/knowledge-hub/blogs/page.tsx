import HeroBg from '@/components/ui/HeroBg'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHead from '@/components/ui/SectionHead'
import CTABand from '@/components/ui/CTABand'
import Reveal from '@/components/ui/Reveal'
import BlogGrid from './BlogGrid'

export const metadata = {
  title: 'Blog · Knowledge Hub',
  description: 'The SecurityBlogs blog — tactical reads on SEO, AIO, AEO, GEO and paid advertising for security industry brands.',
  alternates: { canonical: '/knowledge-hub/blogs/' },
  openGraph: { siteName: 'SecurityBlogs', url: '/knowledge-hub/blogs/' },
}

export default function BlogsPage() {
  return (
    <>
      <HeroBg>
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Knowledge Hub', href: '/knowledge-hub/' }, { label: 'Blog' }]} />
        <div className="grid-2" style={{ alignItems: 'center', gap: 56 }}>
          <Reveal>
            <span className="badge badge-blue" style={{ marginBottom: 20 }}>THE BLOG</span>
            <h1 className="h1" style={{ marginBottom: 18 }}>
              Security Marketing &amp; <span style={{ color: 'var(--blue)', fontStyle: 'italic' }}>AI Visibility</span> Blog
            </h1>
            <p className="lead" style={{ maxWidth: 520 }}>
              Field-tested tactics from the team that gets security brands cited by ChatGPT,
              ranked on Google and converting on paid. New posts every week.
            </p>
          </Reveal>
          <Reveal delay={0.15} style={{ perspective: 1000 }}>
            <div className="glass" style={{ padding: 22, borderRadius: 'var(--radius-lg)', transform: 'rotateY(-8deg) rotateX(4deg)' }}>
              <div className="eyebrow" style={{ marginBottom: 14 }}>Trending now</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { tag: 'AIO/AEO', title: 'How ChatGPT decides which security vendor to name', slug: 'how-chatgpt-decides-which-security-vendor-to-name' },
                  { tag: 'SEO', title: 'Local SEO for alarm installers: the 2026 checklist', slug: 'local-seo-for-alarm-installers-the-2026-checklist' },
                  { tag: 'GEO', title: 'Building entity authority so AI trusts your brand', slug: 'building-entity-authority-so-ai-trusts-your-brand' },
                ].map((p, i) => (
                  <a key={i} href={`/knowledge-hub/blog/${p.slug}/`} className="card" style={{ padding: 16, textDecoration: 'none' }}>
                    <span className="chip" style={{ marginBottom: 8 }}>{p.tag}</span>
                    <div style={{ fontWeight: 600, fontFamily: 'var(--font-display)', fontSize: 15 }}>{p.title}</div>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </HeroBg>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="All posts" title="Filter by what you need." sub="From classic search to generative engines and paid demand — pick a channel and dive in." />
          <BlogGrid />
        </div>
      </section>

      <CTABand />
    </>
  )
}
