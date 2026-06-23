import Link from 'next/link'
import HeroBg from '@/components/ui/HeroBg'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHead from '@/components/ui/SectionHead'
import CTABand from '@/components/ui/CTABand'
import Reveal from '@/components/ui/Reveal'
import BlogGrid from './BlogGrid'
import JsonLd from '@/components/JsonLd'
import { itemListSchema } from '@/lib/schema'
import { publicPosts } from '@/lib/posts'

export const metadata = {
  title: 'Blog · Knowledge Hub',
  description: 'The SecurityBlogs blog — tactical reads on SEO, AIO, AEO, GEO and paid advertising for security industry brands.',
  alternates: { canonical: '/knowledge-hub/blogs/' },
  openGraph: { siteName: 'SecurityBlogs', url: '/knowledge-hub/blogs/' },
}

const trending = publicPosts.slice(0, 3)

export default function BlogsPage() {
  return (
    <>
      <JsonLd data={itemListSchema({
        name: 'SecurityBlogs — Blog Articles',
        path: '/knowledge-hub/blogs/',
        items: publicPosts.map((p) => ({
          name: p.title,
          url: `/knowledge-hub/blogs/${p.slug}/`,
          description: p.excerpt,
        })),
      })} />
      <HeroBg>
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Knowledge Hub', href: '/knowledge-hub/' }, { label: 'Blog' }]} />
        <div className="grid-2" style={{ alignItems: 'center', gap: 56 }}>
          <Reveal>
            <span className="badge badge-blue" style={{ marginBottom: 20 }}>THE BLOG</span>
            <h1 className="h1" style={{ marginBottom: 18 }}>
              Security Marketing &amp; <span style={{ color: 'var(--blue)', fontStyle: 'italic' }}>AI Visibility</span> Blog
            </h1>
            <p className="lead" style={{ maxWidth: 520 }}>
              Practical, vendor-neutral guidance from a team focused on the security industry — how to get
              found on Google, cited by AI assistants and converting on paid.
            </p>
          </Reveal>
          <Reveal delay={0.15} style={{ perspective: 1000 }}>
            <div className="glass" style={{ padding: 22, borderRadius: 'var(--radius-lg)', transform: 'rotateY(-8deg) rotateX(4deg)' }}>
              <div className="eyebrow" style={{ marginBottom: 14 }}>Latest posts</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {trending.map((p) => (
                  <Link key={p.slug} href={`/knowledge-hub/blogs/${p.slug}/`} className="card" style={{ padding: 16, textDecoration: 'none', display: 'block' }}>
                    <span className="chip" style={{ marginBottom: 8, color: 'var(--blue)', borderColor: 'var(--blue)' }}>{p.category}</span>
                    <div style={{ fontWeight: 600, fontFamily: 'var(--font-display)', fontSize: 15 }}>{p.title}</div>
                  </Link>
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

      {/* Reader submission / write-for-us */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="card" style={{ padding: 'clamp(28px,5vw,48px)', textAlign: 'center', maxWidth: 820, margin: '0 auto' }}>
            <span className="badge badge-blue" style={{ marginBottom: 16 }}>WRITE FOR US</span>
            <h2 className="h2" style={{ marginBottom: 14 }}>Share your security industry knowledge</h2>
            <p className="text-soft" style={{ maxWidth: 560, margin: '0 auto 24px' }}>
              Are you a security professional, installer or marketer with a genuinely useful guide to share?
              We welcome original, vendor-neutral articles written to help the industry. Submit your idea and,
              if it&apos;s a good fit, we&apos;ll review it and publish it here with full credit to you.
            </p>
            <Link href="/publish-with-us/guest-posting/" className="btn btn-primary btn-lg">Submit your guide →</Link>
            <div className="text-dim" style={{ fontSize: 13, marginTop: 14 }}>
              Original content only · no AI-spun or promotional pieces · editorial review before publishing
            </div>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  )
}
