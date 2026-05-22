import Link from 'next/link'
import { services, knowledgeHub, publishWithUs, companyLinks } from '@/lib/site'

const socials = ['LinkedIn', 'Facebook', 'Instagram', 'YouTube']

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-soft)', borderTop: '1px solid var(--line)', marginTop: 40 }}>
      <div className="container" style={{ padding: '64px 24px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr 1fr', gap: 32 }} className="sg-footer-grid">
          <div>
            <Link href="/" className="flex items-center gap-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 19, marginBottom: 14 }}>
              <span style={{ width: 30, height: 30, borderRadius: 9, background: 'linear-gradient(135deg, var(--blue), var(--violet))', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 16 }}>S</span>
              <span><span className="accent">Security</span>Growth</span>
            </Link>
            <p className="text-soft" style={{ fontSize: 14, maxWidth: 280, marginBottom: 18 }}>
              The AI Visibility Platform for Security Brands.
            </p>
            <div className="flex gap-2">
              {socials.map((s) => (
                <span key={s} title={s} style={{ width: 36, height: 36, borderRadius: 10, border: '1px solid var(--line)', background: 'var(--bg-card)', display: 'grid', placeItems: 'center', fontSize: 11, fontWeight: 600, color: 'var(--text-dim)' }}>{s[0]}</span>
              ))}
            </div>
          </div>

          <FooterCol title="SEO & AI Services" links={services.map((s) => ({ title: s.title, href: `/services/${s.slug}/` }))} />
          <FooterCol title="Publish With Us" links={publishWithUs} />
          <FooterCol title="Resources" links={[{ title: 'Knowledge Hub', href: '/knowledge-hub/' }, ...knowledgeHub.slice(0, 3), { title: 'Free Tools', href: '/free-tools/' }, { title: 'Directory', href: '/security-directory/' }]} />
          <FooterCol title="Company" links={companyLinks} />
        </div>

        <div style={{ borderTop: '1px solid var(--line)', marginTop: 40, paddingTop: 22, display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }} className="text-dim">
          <span>© {new Date().getFullYear()} SecurityGrowth. All rights reserved.</span>
          <div className="flex flex-wrap gap-3">
            <Link href="/privacy-policy/">Privacy Policy</Link>
            <Link href="/terms-of-service/">Terms of Service</Link>
            <Link href="/content-guidelines/">Content Guidelines</Link>
            <Link href="/publish-with-us/advertise/">Advertise</Link>
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 900px){ .sg-footer-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>
    </footer>
  )
}

function FooterCol({ title, links }: { title: string; links: { title: string; href: string }[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <strong style={{ fontSize: 13.5, fontFamily: 'var(--font-display)' }}>{title}</strong>
      {links.map((l) => (
        <Link key={l.href} href={l.href} className="text-soft" style={{ fontSize: 13.5 }}>{l.title}</Link>
      ))}
    </div>
  )
}
