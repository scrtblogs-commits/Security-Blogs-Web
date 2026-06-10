/**
 * Generic JSON-file content store for CMS-managed website content.
 * All data lives in /data/content/{type}.json and falls back to the
 * hardcoded defaults in lib/site.ts and lib/siteConfig.ts.
 */
import fs   from 'node:fs'
import path from 'node:path'
import { services as defaultServices, stats as defaultStats } from './site'
import { siteConfig as defaultSiteConfig } from './siteConfig'

const DATA_DIR = path.join(process.cwd(), 'data', 'content')

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
}

function filePath(type: string) {
  return path.join(DATA_DIR, `${type}.json`)
}

function readContent<T>(type: string, fallback: T): T {
  try {
    const f = filePath(type)
    if (!fs.existsSync(f)) return fallback
    return JSON.parse(fs.readFileSync(f, 'utf8')) as T
  } catch {
    return fallback
  }
}

// Write lock
let _writing = false
const _queue: Array<() => void> = []
function acquireLock(): Promise<void> {
  if (!_writing) { _writing = true; return Promise.resolve() }
  return new Promise(res => _queue.push(res))
}
function releaseLock() {
  const next = _queue.shift()
  if (next) { next() } else { _writing = false }
}

export async function writeContent(type: string, data: unknown): Promise<void> {
  ensureDir()
  await acquireLock()
  const fp  = filePath(type)
  const tmp = fp + '.tmp'
  try {
    fs.writeFileSync(tmp, JSON.stringify(data, null, 2), 'utf8')
    fs.renameSync(tmp, fp)
  } finally {
    releaseLock()
  }
}

/* ─── Typed accessors ──────────────────────────────────────────────────── */

export type SiteSettings = {
  name: string
  tagline: string
  email: string
  phone: string
  phoneHref: string
  ctaPrimary: string
  ctaPrimaryHref: string
  ctaStrategy: string
  ctaStrategyHref: string
  socialTwitter: string
  socialLinkedIn: string
  socialFacebook: string
}

export function getSiteSettings(): SiteSettings {
  return readContent<SiteSettings>('site-settings', {
    name:              defaultSiteConfig.name,
    tagline:           defaultSiteConfig.tagline,
    email:             defaultSiteConfig.email,
    phone:             defaultSiteConfig.phone,
    phoneHref:         defaultSiteConfig.phoneHref,
    ctaPrimary:        defaultSiteConfig.cta.primary.label,
    ctaPrimaryHref:    defaultSiteConfig.cta.primary.href,
    ctaStrategy:       defaultSiteConfig.cta.strategy.label,
    ctaStrategyHref:   defaultSiteConfig.cta.strategy.href,
    socialTwitter:     'https://twitter.com/securityblogs',
    socialLinkedIn:    'https://linkedin.com/company/securityblogs',
    socialFacebook:    '',
  })
}

export type HomepageContent = {
  heroHeadline: string
  heroSubtitle: string
  heroBadge: string
}

export function getHomepageContent(): HomepageContent {
  return readContent<HomepageContent>('homepage', {
    heroHeadline: 'Be the Answer AI Gives.',
    heroSubtitle: 'SecurityBlogs helps security companies rank on Google, get cited by AI, and convert more visitors into leads.',
    heroBadge:    'AI Visibility for Security Brands',
  })
}

export type StatItem = { num: string; label: string }

export function getStats(): StatItem[] {
  return readContent<StatItem[]>('stats', defaultStats)
}

export type FaqItem = { q: string; a: string }

export function getFaqs(): FaqItem[] {
  return readContent<FaqItem[]>('faqs', defaultSiteConfig.faqs)
}

export type TestimonialItem = {
  name: string; role: string; avatar: string; text: string; rating: number
}

export function getTestimonials(): TestimonialItem[] {
  return readContent<TestimonialItem[]>('testimonials', defaultSiteConfig.testimonials)
}

export type ServiceItem = {
  title: string; slug: string; icon: string; color: string; desc: string
}

export function getServices(): ServiceItem[] {
  return readContent<ServiceItem[]>('services', defaultServices)
}

export type PricingSection = {
  id: string
  label: string
  plans: PricingPlan[]
}

export type PricingPlan = {
  name: string
  price: string
  period?: string
  featured?: boolean
  badge?: string
  features: string[]
  cta: string
  ctaHref: string
}

const defaultPricing: PricingSection[] = [
  {
    id: 'marketing', label: 'Marketing Services',
    plans: [
      { name: 'Security SEO', price: 'from $1,500', period: ' /month', features: ['Full technical SEO audit','Keyword mapping & on-page optimisation','Content creation & link building','Local SEO & Google Business Profile','Monthly reporting on every keyword','No lock-in contracts'], cta: 'Book a free SEO audit →', ctaHref: '/services/security-seo/' },
      { name: 'Google Ads', price: 'from $1,500', period: ' /month ad spend', featured: true, badge: '🏆 Fastest ROI', features: ['Recommended min. $1,500–$3,000/mo ad spend','Campaign setup & keyword research','Ad copy, extensions & landing pages','Conversion tracking & bid management','Weekly optimisation & monthly ROAS report','No lock-in contracts'], cta: 'Book a free Ads audit →', ctaHref: '/services/google-ads/' },
      { name: 'GMB Profile', price: 'Custom', period: ' quote', features: ['Full GBP setup & registration','Google Maps verification support','Category & service area optimisation','Photo strategy & review management','Monthly Google Posts & performance report','Citation building (50+ directories)'], cta: 'Get a free GBP audit →', ctaHref: '/services/gmb-profile/' },
    ],
  },
  {
    id: 'ai-services', label: 'AI Visibility Services',
    plans: [
      { name: 'AIO', price: 'Custom', period: ' quote', features: ['AI citation audit across ChatGPT, Gemini & Perplexity','Citable content creation','Entity building & schema markup','Monthly citation rate tracking'], cta: 'Get my AIO audit →', ctaHref: '/services/aio/' },
      { name: 'AEO', price: 'Custom', period: ' quote', features: ['Answer engine optimisation','Featured snippet targeting','Structured Q&A content','AI Overview appearance tracking'], cta: 'Get my AEO audit →', ctaHref: '/services/aeo/' },
      { name: 'GEO', price: 'Custom', period: ' quote', features: ['Entity creation & Wikidata setup','Brand signal distribution','NAP consistency audit','AI platform recognition tracking'], cta: 'Get my GEO audit →', ctaHref: '/services/geo/' },
    ],
  },
  {
    id: 'guest-posting', label: 'Guest Posting',
    plans: [
      { name: 'Standard', price: 'Free', features: ['Editorial review & publication','1 dofollow link','Byline credit & author bio','Min 800 words, original content','Response within 3 business days'], cta: 'Submit your article →', ctaHref: '/publish-with-us/guest-posting/' },
      { name: 'Priority Placement', price: '$99', period: ' AUD', featured: true, badge: '⚡ Fast-Track', features: ['Faster editorial review','Homepage feature for 3 days','2 dofollow links','Priority scheduling','Byline credit & author bio'], cta: 'Choose Priority →', ctaHref: '/publish-with-us/guest-posting/' },
    ],
  },
  {
    id: 'sponsored-posts', label: 'Sponsored Posts',
    plans: [
      { name: 'Standard', price: '$149', period: ' AUD', features: ['1 dofollow link','Permanent placement','Social share across channels','Published within 3 days'], cta: 'Choose Standard →', ctaHref: '/publish-with-us/sponsored-posts/' },
      { name: 'Featured Homepage', price: '$299', period: ' AUD', featured: true, badge: '⭐ Most Popular', features: ['Homepage feature for 7 days','2 dofollow links','Newsletter mention (24K+ subs)','Priority publishing'], cta: 'Choose Featured →', ctaHref: '/publish-with-us/sponsored-posts/' },
      { name: 'Authority Series', price: '$1,250', period: ' AUD', features: ['5-article sponsored series','Homepage + category features','3 dofollow links per article','Dedicated promotion','Quarterly content refresh'], cta: 'Choose Authority →', ctaHref: '/publish-with-us/sponsored-posts/' },
    ],
  },
  {
    id: 'backlink-packages', label: 'Backlink Packages',
    plans: [
      { name: 'Starter', price: '$199', period: ' AUD', features: ['1 sponsored editorial placement','Placed in relevant security content','rel="sponsored" link','Visible disclosure','Permanent placement','Live in ~5 business days'], cta: 'Request a quote →', ctaHref: '/publish-with-us/backlink-packages/' },
      { name: 'Growth', price: '$549', period: ' AUD', featured: true, badge: '⭐ Best Value', features: ['3 sponsored editorial placements','Placed in relevant security content','rel="sponsored" links','Anchor-text preferences','Permanent placement','Placement report included'], cta: 'Request a quote →', ctaHref: '/publish-with-us/backlink-packages/' },
      { name: 'Authority', price: '$1,290', period: ' AUD', features: ['8 sponsored editorial placements','Bespoke articles written in-house','rel="sponsored" with anchor strategy','Priority placement','Permanent placement','Detailed placement report'], cta: 'Request a quote →', ctaHref: '/publish-with-us/backlink-packages/' },
    ],
  },
]

export function getPricing(): PricingSection[] {
  return readContent<PricingSection[]>('pricing', defaultPricing)
}

/* ─── Blog posts ───────────────────────────────────────────────────────── */

export type BlogPost = {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  cat: string
  date: string
  read: string
  featured: boolean
  published: boolean
  author: string
  coverImage?: string
}

const defaultBlogPosts: BlogPost[] = [
  { id: 'bp1', slug: 'what-is-ai-visibility', title: 'What is AI Visibility and Why Security Brands Must Act Now', excerpt: 'AI search is reshaping how buyers find security vendors. Here is what AI Visibility means and how to measure yours.', content: '', cat: 'AIO/AEO', date: '2025-05-10', read: '7 min', featured: true, published: true, author: 'SecurityBlogs' },
  { id: 'bp2', slug: 'security-seo-guide-2025', title: 'The 2025 Security SEO Guide: How to Rank When It Matters', excerpt: 'A complete playbook for security companies ready to dominate Google in 2025.', content: '', cat: 'SEO', date: '2025-04-28', read: '11 min', featured: false, published: true, author: 'SecurityBlogs' },
  { id: 'bp3', slug: 'google-ads-security-companies', title: 'Google Ads for Security Companies: A Proven Framework', excerpt: 'How we consistently achieve 3× ROAS for security brands using intent-led campaign architecture.', content: '', cat: 'Paid Ads', date: '2025-04-14', read: '9 min', featured: false, published: true, author: 'SecurityBlogs' },
]

export function getBlogPosts(onlyPublished = false): BlogPost[] {
  const posts = readContent<BlogPost[]>('blog-posts', defaultBlogPosts)
  return onlyPublished ? posts.filter(p => p.published) : posts
}

export function getBlogPost(id: string): BlogPost | null {
  return getBlogPosts().find(p => p.id === id) ?? null
}

export async function saveBlogPost(post: BlogPost): Promise<void> {
  const posts = getBlogPosts()
  const idx   = posts.findIndex(p => p.id === post.id)
  if (idx >= 0) { posts[idx] = post } else { posts.unshift(post) }
  await writeContent('blog-posts', posts)
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  const posts  = getBlogPosts()
  const filtered = posts.filter(p => p.id !== id)
  if (filtered.length === posts.length) return false
  await writeContent('blog-posts', filtered)
  return true
}
