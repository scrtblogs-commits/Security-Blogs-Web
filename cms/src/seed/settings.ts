// Seed the Settings global with current production values.
// Idempotent: updates the existing global row each time.
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../../payload.config'

async function main() {
  const payload = await getPayload({ config })
  await payload.updateGlobal({
    slug: 'settings',
    data: {
      siteName: 'SecurityBlogs',
      tagline: "Australia's AI Visibility Platform for Security Brands.",
      contactEmail: 'info@securityblogs.com.au',
      contactPhone: '+61 411 212 418',
      businessHours: 'Mon to Fri, 9am–5pm AEST',
      addressCountry: 'AU',
      areaServed: ['AU', 'US', 'GB', 'AE', 'SG'],
      social: [
        { platform: 'linkedin',  url: 'https://www.linkedin.com/company/security-blogs/' },
        { platform: 'facebook',  url: 'https://www.facebook.com/people/Security-Blogs/61576725136537/' },
        { platform: 'instagram', url: 'https://www.instagram.com/securityblogs/' },
        { platform: 'youtube',   url: 'https://www.youtube.com/@SecurityBlogs' },
      ],
      footerColumns: [
        {
          heading: 'SEO & AI Services',
          links: [
            { label: 'Security SEO', href: '/services/security-seo/' },
            { label: 'AIO',          href: '/services/aio/' },
            { label: 'AEO',          href: '/services/aeo/' },
            { label: 'GEO',          href: '/services/geo/' },
            { label: 'Google Ads',   href: '/services/google-ads/' },
            { label: 'Bing Ads',     href: '/services/bing-ads/' },
            { label: 'Web Design',   href: '/services/web-design/' },
          ],
        },
        {
          heading: 'Publish With Us',
          links: [
            { label: 'Guest Posting',                  href: '/publish-with-us/guest-posting/' },
            { label: 'Sponsored Posts',                href: '/publish-with-us/sponsored-posts/' },
            { label: 'Product Promotion',              href: '/publish-with-us/product-promotion/' },
            { label: 'Press Release',                  href: '/publish-with-us/press-release/' },
            { label: 'Sponsored Editorial Placements', href: '/publish-with-us/backlink-packages/' },
            { label: 'Pricing Guidelines',             href: '/publish-with-us/pricing-guidelines/' },
            { label: 'Advertise',                      href: '/publish-with-us/advertise/' },
          ],
        },
        {
          heading: 'Resources',
          links: [
            { label: 'Knowledge Hub', href: '/knowledge-hub/' },
            { label: 'Blog',          href: '/knowledge-hub/blogs/' },
            { label: 'Free Tools',    href: '/free-tools/' },
            { label: 'Directory',     href: '/security-directory/' },
          ],
        },
        {
          heading: 'Company',
          links: [
            { label: 'About Us',     href: '/about-us/' },
            { label: 'Case Studies', href: '/case-studies/' },
            { label: 'Career',       href: '/career/' },
            { label: 'AI Visibility Center', href: '/ai-visibility-center/' },
            { label: 'Contact',      href: '/contact/' },
          ],
        },
      ],
      acknowledgement:
        'Security Blogs proudly acknowledges the Traditional Custodians of the lands across Australia where our readers, contributors, and industry partners live and work. We honour Aboriginal and Torres Strait Islander peoples, their cultures, histories, and continuing connection to Country. We pay our respects to Elders past, present, and emerging and are committed to supporting a diverse, inclusive, and respectful security industry for all Australians.',
      copyrightText: '© {{year}} SecurityBlogs. All rights reserved.',
      defaultMetaTitle: 'SecurityBlogs — The AI Visibility Platform for Security Brands',
      titleSuffix: ' | SecurityBlogs',
      defaultMetaDescription:
        'AI visibility, SEO and paid media built exclusively for the security industry. Rank #1 on Google and get cited by ChatGPT, Perplexity, Gemini and every AI answer engine.',
      twitterHandle: '@SecurityBlogs',
      languageLocale: 'en-AU',
      gtmId: 'GTM-KS9SXB2K',
      plausibleDomain: 'securityblogs.com.au',
      cookieBannerEnabled: true,
      maintenanceMode: false,
    },
  })
  console.log('✓ Settings seeded')
  process.exit(0)
}

main().catch((err) => { console.error(err); process.exit(1) })
