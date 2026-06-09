'use client'
import Link from 'next/link'
import { services, knowledgeHub, publishWithUs, companyLinks } from '@/lib/site'

type BrandIconProps = { size?: number }

const LinkedinIcon = ({ size = 16 }: BrandIconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
)
const FacebookIcon = ({ size = 16 }: BrandIconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
)
const InstagramIcon = ({ size = 16 }: BrandIconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>
)
const YoutubeIcon = ({ size = 16 }: BrandIconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
)

const socials = [
  { name: 'LinkedIn',  href: 'https://www.linkedin.com/company/security-blogs/',               Icon: LinkedinIcon  },
  { name: 'Facebook',  href: 'https://www.facebook.com/people/Security-Blogs/61576725136537/', Icon: FacebookIcon  },
  { name: 'Instagram', href: 'https://www.instagram.com/securityblogs/',                       Icon: InstagramIcon },
  { name: 'YouTube',   href: 'https://www.youtube.com/@SecurityBlogs',                         Icon: YoutubeIcon   },
]

export default function Footer() {
  return (
    <footer style={{ background: '#080f1e', color: '#c8d4e8', marginTop: 0 }}>

      {/* ── Top band: CTA + newsletter ── */}
      <div style={{
        background: 'linear-gradient(135deg, #1e5fe0 0%, #6f4dff 100%)',
        padding: 'clamp(36px,5vw,56px) 24px',
      }}>
        <div className="container" style={{
          display: 'flex', flexWrap: 'wrap',
          alignItems: 'center', justifyContent: 'space-between', gap: 28,
        }}>
          <div style={{ maxWidth: 480 }}>
            <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: 10 }}>
              Stay Ahead of AI Search
            </div>
            <h3 style={{ fontSize: 'clamp(20px,3vw,28px)', fontFamily: 'var(--font-display)', fontWeight: 700, color: '#fff', lineHeight: 1.2, margin: 0 }}>
              Get the weekly AI visibility edge.<br />Free. No spam.
            </h3>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}
          >
            <input
              type="email"
              placeholder="Your work email"
              style={{
                padding: '12px 18px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.25)',
                background: 'rgba(255,255,255,0.12)', color: '#fff', fontSize: 14,
                fontFamily: 'var(--font-body)', minWidth: 220, outline: 'none',
              }}
            />
            <button
              type="submit"
              style={{
                padding: '12px 24px', borderRadius: 10, border: 'none',
                background: '#fff', color: 'var(--blue)',
                fontWeight: 700, fontFamily: 'var(--font-display)', fontSize: 14,
                cursor: 'pointer', whiteSpace: 'nowrap',
              }}
            >
              Subscribe →
            </button>
          </form>
        </div>
      </div>

      {/* ── Acknowledgement of Country ── */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '28px 24px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 18, alignItems: 'center' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/flags.png?v=2"
              alt="Aboriginal flag and Torres Strait Islander flag"
              style={{ height: 48, width: 'auto', display: 'block', flexShrink: 0, imageRendering: 'crisp-edges', opacity: 0.9 }}
            />
            <p style={{ fontSize: 12.5, lineHeight: 1.65, color: 'rgba(200,212,232,0.7)', margin: 0 }}>
              Security Blogs proudly acknowledges the Traditional Custodians of the lands across Australia where our readers, contributors, and industry partners live and work. We honour Aboriginal and Torres Strait Islander peoples, their cultures, histories, and continuing connection to Country. We pay our respects to Elders past, present, and emerging.
            </p>
          </div>
        </div>
      </div>

      {/* ── Main nav grid ── */}
      <div className="container" style={{ padding: '48px 24px 36px' }}>
        <div className="ft-grid">

          {/* Brand column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Link href="/" aria-label="SecurityBlogs home" style={{ display: 'inline-block' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-footer.webp"
                alt="SecurityBlogs"
                style={{ width: 140, height: 'auto', display: 'block', filter: 'brightness(0) invert(1)', opacity: 0.9 }}
              />
            </Link>
            <p style={{ fontSize: 13, lineHeight: 1.65, color: 'rgba(200,212,232,0.65)', maxWidth: 220, margin: 0 }}>
              Australia&apos;s AI Visibility Platform for Security Brands.
            </p>
            {/* Socials */}
            <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
              {socials.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={name}
                  title={name}
                  style={{
                    width: 34, height: 34, borderRadius: 9,
                    border: '1px solid rgba(255,255,255,0.12)',
                    background: 'rgba(255,255,255,0.06)',
                    display: 'grid', placeItems: 'center',
                    color: '#c8d4e8',
                    transition: 'background 0.18s, border-color 0.18s',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.background = 'rgba(30,95,224,0.35)'
                    el.style.borderColor = 'rgba(30,95,224,0.6)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.background = 'rgba(255,255,255,0.06)'
                    el.style.borderColor = 'rgba(255,255,255,0.12)'
                  }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
            {/* Contact */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
              <a href="mailto:info@securityblogs.com.au" style={{ fontSize: 13, color: 'rgba(200,212,232,0.7)', textDecoration: 'none' }}>
                ✉ info@securityblogs.com.au
              </a>
              <a href="tel:+61411212418" style={{ fontSize: 13, color: 'rgba(200,212,232,0.7)', textDecoration: 'none' }}>
                ✆ +61 411 212 418
              </a>
            </div>
          </div>

          {/* Nav columns */}
          <FooterCol title="SEO & AI Services" links={services.map((s) => ({ title: s.title, href: `/services/${s.slug}/` }))} />
          <FooterCol title="Publish With Us" links={publishWithUs} />
          <FooterCol title="Resources" links={[
            { title: 'Knowledge Hub',  href: '/knowledge-hub/' },
            ...knowledgeHub.slice(0, 3),
            { title: 'Free Tools',     href: '/free-tools/' },
            { title: 'Directory',      href: '/security-directory/' },
          ]} />
          <FooterCol title="Company" links={companyLinks} />
        </div>
      </div>

      {/* ── Bottom strip: copyright + legal ── */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '18px 24px' }}>
        <div className="container" style={{
          display: 'flex', flexWrap: 'wrap', gap: 14,
          justifyContent: 'space-between', alignItems: 'center',
          fontSize: 12.5, color: 'rgba(200,212,232,0.5)',
        }}>
          <span>© {new Date().getFullYear()} SecurityBlogs. All rights reserved.</span>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {[
              { label: 'Privacy Policy',      href: '/privacy-policy/' },
              { label: 'Terms of Service',    href: '/terms-of-service/' },
              { label: 'Content Guidelines',  href: '/content-guidelines/' },
              { label: 'Advertise',           href: '/publish-with-us/advertise/' },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{ color: 'rgba(200,212,232,0.5)', transition: 'color 0.15s' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#fff' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(200,212,232,0.5)' }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .ft-grid {
          display: grid;
          grid-template-columns: 220px repeat(4, 1fr);
          gap: 36px 28px;
          align-items: start;
        }
        @media (max-width: 960px) {
          .ft-grid {
            grid-template-columns: 1fr 1fr 1fr;
          }
          .ft-grid > :first-child { grid-column: 1 / -1; }
        }
        @media (max-width: 600px) {
          .ft-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 420px) {
          .ft-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </footer>
  )
}

function FooterCol({ title, links }: { title: string; links: { title: string; href: string }[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
      <strong style={{
        fontSize: 12,
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'rgba(200,212,232,0.45)',
        marginBottom: 2,
      }}>
        {title}
      </strong>
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          style={{ fontSize: 13.5, color: 'rgba(200,212,232,0.75)', textDecoration: 'none', transition: 'color 0.15s' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#fff' }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(200,212,232,0.75)' }}
        >
          {l.title}
        </Link>
      ))}
    </div>
  )
}
