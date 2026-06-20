import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getPostBySlug, allPostSlugs, posts } from '@/lib/posts'
import JsonLd from '@/components/JsonLd'

// Static, self-contained blog post route (no CMS dependency).
// Renders posts from lib/posts.ts.

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return allPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: 'Blog · Knowledge Hub' }
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: `/knowledge-hub/blogs/${post.slug}/` },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `/knowledge-hub/blogs/${post.slug}/`,
      siteName: 'SecurityBlogs',
      type: 'article',
      publishedTime: post.date,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const related = posts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'SecurityBlogs' },
    publisher: { '@type': 'Organization', name: 'SecurityBlogs' },
    mainEntityOfPage: `https://securityblogs.com.au/knowledge-hub/blogs/${post.slug}/`,
  }

  return (
    <>
      <JsonLd data={articleSchema} />
      <article>
        <section className="section" style={{ paddingBottom: 0 }}>
          <div className="container" style={{ maxWidth: 760 }}>
            <div style={{ marginBottom: 16, fontSize: 13.5 }}>
              <Link href="/knowledge-hub/blogs/" style={{ color: 'var(--blue)' }}>← Back to the blog</Link>
            </div>
            <div className="flex items-center gap-2" style={{ marginBottom: 14 }}>
              <span className="chip" style={{ color: 'var(--blue)', borderColor: 'var(--blue)' }}>{post.category}</span>
              <span className="text-dim" style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5 }}>
                {new Date(post.date).toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })} · {post.read} read
              </span>
            </div>
            <h1 className="h1" style={{ marginBottom: 16 }}>{post.title}</h1>
            <p className="lead" style={{ marginBottom: 0 }}>{post.excerpt}</p>
          </div>
        </section>

        <section className="section">
          <div className="container prose" style={{ maxWidth: 760 }} dangerouslySetInnerHTML={{ __html: post.body }} />
        </section>

        {related.length > 0 && (
          <section className="section" style={{ paddingTop: 0 }}>
            <div className="container" style={{ maxWidth: 760 }}>
              <h2 className="h3" style={{ marginBottom: 18 }}>Related reads</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                {related.map((r) => (
                  <Link key={r.slug} href={`/knowledge-hub/blogs/${r.slug}/`} className="card" style={{ textDecoration: 'none', display: 'block', padding: 16 }}>
                    <span className="chip" style={{ color: 'var(--blue)', borderColor: 'var(--blue)', marginBottom: 8 }}>{r.category}</span>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>{r.title}</div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </>
  )
}
