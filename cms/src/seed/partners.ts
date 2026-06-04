// Seed Partners from current case-study clients (each client is also a Partner record).
// Adds links back to their case study and primary service.
// Idempotent: upserts by slug.
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../../payload.config'

type PartnerSeed = {
  slug: string
  name: string
  type: 'client' | 'partner' | 'integrator' | 'vendor' | 'community'
  region: 'AU' | 'US' | 'GB' | 'AE' | 'SG' | 'other'
  summary: string
  caseStudySlug?: string
  serviceSlugs?: string[]
  isFeatured: boolean
  sortOrder: number
}

const PARTNERS: PartnerSeed[] = [
  { slug: 'shieldtech-security',  name: 'ShieldTech Security',   type: 'client',     region: 'AU', summary: 'Security integrator delivering CCTV, access control and monitoring across NSW.',     caseStudySlug: 'shieldtech-security',  serviceSlugs: ['security-seo'], isFeatured: true,  sortOrder: 10 },
  { slug: 'armourguard-au',       name: 'ArmourGuard AU',         type: 'client',     region: 'AU', summary: 'National security monitoring brand running high-intent Google Ads.',                   caseStudySlug: 'armourguard-au',       serviceSlugs: ['google-ads'],   isFeatured: true,  sortOrder: 20 },
  { slug: 'nexus-security-group', name: 'Nexus Security Group',   type: 'client',     region: 'AU', summary: 'Enterprise security group with national AI-visibility footprint.',                     caseStudySlug: 'nexus-security-group', serviceSlugs: ['aio', 'aeo'],   isFeatured: true,  sortOrder: 30 },
  { slug: 'clearvault-cctv',      name: 'ClearVault CCTV',         type: 'client',     region: 'AU', summary: 'Commercial CCTV installer winning the local pack in their service area.',              caseStudySlug: 'clearvault-cctv',      serviceSlugs: ['security-seo'], isFeatured: false, sortOrder: 40 },
  { slug: 'bioentry-systems',     name: 'BioEntry Systems',        type: 'client',     region: 'AU', summary: 'Access-control manufacturer with verified AI knowledge-graph entity.',                  caseStudySlug: 'bioentry-systems',     serviceSlugs: ['geo'],          isFeatured: false, sortOrder: 50 },
  { slug: 'accesspro-au',         name: 'AccessPro AU',           type: 'client',     region: 'AU', summary: 'Integrator running our full SEO + AI visibility + paid-media stack.',                   caseStudySlug: 'accesspro-au',         serviceSlugs: ['security-seo'], isFeatured: false, sortOrder: 60 },
]

async function main() {
  const payload = await getPayload({ config })

  for (const p of PARTNERS) {
    // Resolve relationships by slug.
    let caseStudyId: string | undefined
    if (p.caseStudySlug) {
      const r = await payload.find({ collection: 'case-studies', where: { slug: { equals: p.caseStudySlug } }, limit: 1 })
      caseStudyId = r.docs[0]?.id as string | undefined
    }
    let serviceIds: string[] = []
    if (p.serviceSlugs?.length) {
      for (const slug of p.serviceSlugs) {
        const r = await payload.find({ collection: 'services', where: { slug: { equals: slug } }, limit: 1 })
        if (r.docs[0]?.id) serviceIds.push(r.docs[0].id as string)
      }
    }

    const { caseStudySlug, serviceSlugs, ...rest } = p
    const data = {
      ...rest,
      caseStudy: caseStudyId,
      services: serviceIds,
      status: 'active' as const,
    }

    const existing = await payload.find({ collection: 'partners', where: { slug: { equals: p.slug } }, limit: 1 })

    if (existing.totalDocs > 0) {
      await payload.update({ collection: 'partners', id: existing.docs[0].id, data, overrideAccess: true })
      console.log(`↻ Updated partner: ${p.slug}`)
    } else {
      await payload.create({ collection: 'partners', data, overrideAccess: true })
      console.log(`+ Created partner: ${p.slug}`)
    }
  }
  console.log(`✓ ${PARTNERS.length} partners seeded.`)
  process.exit(0)
}

main().catch((err) => { console.error(err); process.exit(1) })
