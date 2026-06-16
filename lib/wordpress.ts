/**
 * WordPress REST API client.
 *
 * Drop-in companion to lib/cms.ts — same calling pattern, same ISR tags,
 * but fetches from the WordPress headless backend instead of Payload.
 *
 * Set in .env.local:
 *   WP_URL=https://securityblogs.com.au
 *   NEXT_REVALIDATE_SECRET=same-value-as-in-wp-config.php
 */

const WP_URL = (process.env.WP_URL ?? 'https://securityblogs.com.au').replace(/\/$/, '')
const DEFAULT_REVALIDATE = 60

type FetchOpts = { revalidate?: number | false; tag?: string }

async function wpFetch<T>(path: string, opts: FetchOpts = {}): Promise<T | null> {
  const url = `${WP_URL}${path}`
  const rv  = opts.revalidate === undefined ? DEFAULT_REVALIDATE : opts.revalidate
  const tags = opts.tag ? [opts.tag] : undefined

  try {
    const res = await fetch(url, {
      next: { revalidate: rv === false ? 0 : rv, tags },
    })
    if (res.status === 404) return null
    if (!res.ok) {
      console.error(`[wp] ${res.status} ${res.statusText} → ${url}`)
      return null
    }
    return (await res.json()) as T
  } catch (err) {
    console.error(`[wp] network error → ${url}`, err)
    return null
  }
}

// ── Types ─────────────────────────────────────────────────────────────────────

export type WpPost = {
  id: number
  slug: string
  title: { rendered: string }
  excerpt: { rendered: string }
  content: { rendered: string }
  date: string
  featured_image_url: string | null
  author_name: string | null
  author_title: string | null
  read_time: number | null
  featured_post: boolean
  faq_items: Array<{ question: string; answer: string }> | null
  _embedded?: Record<string, unknown>
}

export type WpCaseStudy = {
  id: number
  slug: string
  title: { rendered: string }
  excerpt: { rendered: string }
  content: { rendered: string }
  date: string
  featured_image_url: string | null
  client_name: string | null
  security_sector: string | null
  result_1_num: string | null
  result_1_label: string | null
  result_2_num: string | null
  result_2_label: string | null
  result_3_num: string | null
  result_3_label: string | null
  client_logo: string | null
  services_used: string[] | null
  campaign_duration: string | null
}

export type WpService = {
  id: number
  slug: string
  title: { rendered: string }
  excerpt: { rendered: string }
  content: { rendered: string }
  service_slug: string | null
  service_icon: string | null
  accent_color: string | null
  hero_headline: string | null
  hero_sub: string | null
  capabilities: Array<{ icon: string; title: string; desc: string }> | null
  process_steps: Array<{ title: string; desc: string }> | null
  featured_image_url: string | null
}

export type WpTeamMember = {
  id: number
  slug: string
  title: { rendered: string }
  content: { rendered: string }
  role: string | null
  photo: string | null
  linkedin_url: string | null
  display_order: number
}

export type WpTestimonial = {
  id: number
  title: { rendered: string }
  content: { rendered: string }
  author_name: string | null
  company: string | null
  author_role: string | null
  author_photo: string | null
  star_rating: '3' | '4' | '5'
  related_service: string | null
}

export type WpSiteSettings = {
  phone: string | null
  email: string | null
  hero_tagline: string | null
  hero_subtext: string | null
  linkedin_url: string | null
  instagram_url: string | null
  facebook_url: string | null
  youtube_url: string | null
  homepage_stats: Array<{ num: string; label: string }> | null
}

export type WpFeaturedPost = {
  id: number
  slug: string
  title: string
  excerpt: string
  date: string
  featured_image: string | null
  author_name: string | null
  author_title: string | null
  read_time: number | null
  link: string
}

// ── Blog Posts ────────────────────────────────────────────────────────────────

export async function getWpPosts(opts?: FetchOpts & { perPage?: number; page?: number }): Promise<WpPost[]> {
  const per  = opts?.perPage ?? 12
  const page = opts?.page ?? 1
  const data = await wpFetch<WpPost[]>(
    `/wp-json/wp/v2/posts?status=publish&per_page=${per}&page=${page}&_fields=id,slug,title,excerpt,content,date,featured_image_url,author_name,author_title,read_time,featured_post,faq_items`,
    { tag: 'wp-posts', ...opts },
  )
  return data ?? []
}

export async function getWpPost(slug: string, opts?: FetchOpts): Promise<WpPost | null> {
  const data = await wpFetch<WpPost[]>(
    `/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&status=publish&_fields=id,slug,title,excerpt,content,date,featured_image_url,author_name,author_title,read_time,featured_post,faq_items`,
    { tag: `wp-post:${slug}`, ...opts },
  )
  return data?.[0] ?? null
}

export async function getWpFeaturedPosts(opts?: FetchOpts): Promise<WpFeaturedPost[]> {
  const data = await wpFetch<WpFeaturedPost[]>('/wp-json/sb/v1/featured-posts', {
    tag: 'wp-featured-posts',
    ...opts,
  })
  return data ?? []
}

// ── Case Studies ──────────────────────────────────────────────────────────────

export async function getWpCaseStudies(opts?: FetchOpts): Promise<WpCaseStudy[]> {
  const data = await wpFetch<WpCaseStudy[]>(
    '/wp-json/wp/v2/case-studies?status=publish&per_page=100&_fields=id,slug,title,excerpt,content,date,featured_image_url,client_name,security_sector,result_1_num,result_1_label,result_2_num,result_2_label,result_3_num,result_3_label,client_logo,services_used,campaign_duration',
    { tag: 'wp-case-studies', ...opts },
  )
  return data ?? []
}

export async function getWpCaseStudy(slug: string, opts?: FetchOpts): Promise<WpCaseStudy | null> {
  const data = await wpFetch<WpCaseStudy[]>(
    `/wp-json/wp/v2/case-studies?slug=${encodeURIComponent(slug)}&status=publish`,
    { tag: `wp-case-study:${slug}`, ...opts },
  )
  return data?.[0] ?? null
}

// ── Services ──────────────────────────────────────────────────────────────────

export async function getWpServices(opts?: FetchOpts): Promise<WpService[]> {
  const data = await wpFetch<WpService[]>(
    '/wp-json/wp/v2/services?status=publish&per_page=50',
    { tag: 'wp-services', ...opts },
  )
  return data ?? []
}

export async function getWpService(slug: string, opts?: FetchOpts): Promise<WpService | null> {
  const data = await wpFetch<WpService[]>(
    `/wp-json/wp/v2/services?slug=${encodeURIComponent(slug)}&status=publish`,
    { tag: `wp-service:${slug}`, ...opts },
  )
  return data?.[0] ?? null
}

// ── Team ──────────────────────────────────────────────────────────────────────

export async function getWpTeam(opts?: FetchOpts): Promise<WpTeamMember[]> {
  const data = await wpFetch<WpTeamMember[]>(
    '/wp-json/wp/v2/team?status=publish&per_page=50&orderby=meta&meta_key=display_order&order=asc',
    { tag: 'wp-team', ...opts },
  )
  return data ?? []
}

// ── Testimonials ──────────────────────────────────────────────────────────────

export async function getWpTestimonials(opts?: FetchOpts & { service?: string }): Promise<WpTestimonial[]> {
  const base = '/wp-json/wp/v2/testimonials?status=publish&per_page=100'
  const url  = opts?.service ? `${base}&related_service=${encodeURIComponent(opts.service)}` : base
  const data = await wpFetch<WpTestimonial[]>(url, { tag: 'wp-testimonials', ...opts })
  return data ?? []
}

// ── Site Settings (global) ────────────────────────────────────────────────────

export async function getWpSiteSettings(opts?: FetchOpts): Promise<WpSiteSettings | null> {
  return wpFetch<WpSiteSettings>('/wp-json/sb/v1/site-settings', {
    tag: 'wp-site-settings',
    revalidate: 300,
    ...opts,
  })
}
