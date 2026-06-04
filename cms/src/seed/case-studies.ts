// Seed the 6 case studies currently rendered by app/case-studies/CaseGrid.tsx.
// Idempotent: upserts by slug.
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../../payload.config'

type CaseSeed = {
  slug: string
  headline: string
  clientName: string
  serviceSlug: string                   // resolved to a relationship below
  summary: string
  results: Array<{ metric: string; value: string }>
  tags: Array<{ tag: string }>
  sortOrder: number
}

const CASES: CaseSeed[] = [
  {
    slug: 'shieldtech-security',
    clientName: 'ShieldTech Security',
    headline: 'ShieldTech Security — Full Service',
    serviceSlug: 'security-seo',
    summary: '+340% organic traffic; ranking #1 for 28 keywords; results within 8 months.',
    results: [
      { metric: 'Organic traffic', value: '+340%' },
      { metric: 'Top-1 keywords',  value: '28' },
      { metric: 'Time to results', value: '8 months' },
    ],
    tags: [{ tag: 'Integrator' }, { tag: 'Full Service' }],
    sortOrder: 10,
  },
  {
    slug: 'armourguard-au',
    clientName: 'ArmourGuard AU',
    headline: 'ArmourGuard AU — Google Ads',
    serviceSlug: 'google-ads',
    summary: '3.8× ROAS, $9.40 CPC, +280% qualified leads.',
    results: [
      { metric: 'ROAS',           value: '3.8×' },
      { metric: 'Average CPC',    value: '$9.40' },
      { metric: 'Qualified leads', value: '+280%' },
    ],
    tags: [{ tag: 'Monitoring' }, { tag: 'Google Ads' }],
    sortOrder: 20,
  },
  {
    slug: 'nexus-security-group',
    clientName: 'Nexus Security Group',
    headline: 'Nexus Security Group — AIO/AEO',
    serviceSlug: 'aio',
    summary: '91% AI citation rate; 47 AI mentions per month across 6 platforms.',
    results: [
      { metric: 'AI citation rate', value: '91%' },
      { metric: 'AI mentions/mo',   value: '47' },
      { metric: 'Platforms cited',  value: '6' },
    ],
    tags: [{ tag: 'Enterprise' }, { tag: 'AIO/AEO' }],
    sortOrder: 30,
  },
  {
    slug: 'clearvault-cctv',
    clientName: 'ClearVault CCTV',
    headline: 'ClearVault CCTV — Security SEO',
    serviceSlug: 'security-seo',
    summary: '#1 for 28 keywords; +180% organic traffic; 94% client retention.',
    results: [
      { metric: 'Top-1 keywords',  value: '28' },
      { metric: 'Organic traffic', value: '+180%' },
      { metric: 'Client retention', value: '94%' },
    ],
    tags: [{ tag: 'CCTV Installer' }, { tag: 'SEO' }],
    sortOrder: 40,
  },
  {
    slug: 'bioentry-systems',
    clientName: 'BioEntry Systems',
    headline: 'BioEntry Systems — GEO',
    serviceSlug: 'geo',
    summary: 'Entity confirmed on 6 AI platforms; +220% brand searches; knowledge panel won.',
    results: [
      { metric: 'AI platforms cited', value: '6' },
      { metric: 'Brand searches',     value: '+220%' },
      { metric: 'Knowledge panel',    value: 'Won' },
    ],
    tags: [{ tag: 'Access Control' }, { tag: 'GEO' }],
    sortOrder: 50,
  },
  {
    slug: 'accesspro-au',
    clientName: 'AccessPro AU',
    headline: 'AccessPro AU — Full Service',
    serviceSlug: 'security-seo',
    summary: '+410% revenue; 2.1× ROAS; 89% citation rate.',
    results: [
      { metric: 'Revenue',         value: '+410%' },
      { metric: 'ROAS',            value: '2.1×' },
      { metric: 'AI citation rate', value: '89%' },
    ],
    tags: [{ tag: 'Integrator' }, { tag: 'Full Service' }],
    sortOrder: 60,
  },
]

async function main() {
  const payload = await getPayload({ config })

  for (const c of CASES) {
    // Resolve service relationship by slug
    let serviceId: string | undefined
    if (c.serviceSlug) {
      const svc = await payload.find({
        collection: 'services',
        where: { slug: { equals: c.serviceSlug } },
        limit: 1,
      })
      serviceId = svc.docs[0]?.id as string | undefined
    }

    const { serviceSlug, ...rest } = c
    const data = { ...rest, service: serviceId, status: 'published' as const }

    const existing = await payload.find({
      collection: 'case-studies',
      where: { slug: { equals: c.slug } },
      limit: 1,
    })

    if (existing.totalDocs > 0) {
      await payload.update({
        collection: 'case-studies',
        id: existing.docs[0].id,
        data,
        overrideAccess: true,
      })
      console.log(`↻ Updated case study: ${c.slug}`)
    } else {
      await payload.create({
        collection: 'case-studies',
        data,
        overrideAccess: true,
      })
      console.log(`+ Created case study: ${c.slug}`)
    }
  }
  console.log(`✓ ${CASES.length} case studies seeded.`)
  process.exit(0)
}

main().catch((err) => { console.error(err); process.exit(1) })
