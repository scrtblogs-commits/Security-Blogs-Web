'use client'
import Link from 'next/link'
import { useState } from 'react'
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

const avatars = ['JR', 'SM', 'DK', 'LT', 'MP']

function GetStartedForm() {
  const [email, setEmail]     = useState('')
  const [message, setMessage] = useState('')
  return (
    <div style={{
      background: '#fff',
      border: '1px solid var(--line)',
      borderRadius: 20,
      padding: 28,
      boxShadow: '0 8px 32px -8px rgba(18,42,86,0.10)',
    }}>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <div style={{
          width: 48, height: 48, borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--blue), var(--violet))',
          margin: '0 auto 12px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ color: '#fff', fontSize: 22 }}>✦</span>
        </div>
        <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, margin: 0 }}>
          Get Started
        </h4>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div>
          <label className="label">Email</label>
          <input
            type="email"
            className="field"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="label">Message</label>
          <textarea
            className="field"
            placeholder="What do you say?"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ resize: 'none' }}
          />
        </div>
        <button
          onClick={() => {}}
          style={{
            width: '100%', padding: '13px', borderRadius: 12,
            background: 'var(--blue)', color: '#fff', border: 'none',
            fontWeight: 700, fontFamily: 'var(--font-display)', fontSize: 15,
            cursor: 'pointer',
          }}
        >
          Request Demo
        </button>
        <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-dim)', margin: 0 }}>
          → Start Free Trial
        </p>
      </div>
    </div>
  )
}

export default function Footer() {
  const [email, setEmail] = useState('')

  return (
    <footer style={{ background: 'var(--bg-soft)', borderTop: '1px solid var(--line)', color: 'var(--text)' }}>

      {/* ── People are Saying + Get Started ── */}
      <div style={{ borderBottom: '1px solid var(--line)' }}>
        <div className="container" style={{ padding: 'clamp(40px,6vw,72px) 24px' }}>
          <div className="ft-top-grid">

            {/* Left — People are saying */}
            <div>
              <h2 style={{
                fontFamily: 'var(--font-display)', fontWeight: 800,
                fontSize: 'clamp(24px,3.5vw,36px)', lineHeight: 1.2,
                marginBottom: 16,
              }}>
                People are Saying<br />
                <span style={{ color: 'var(--blue)' }}>About SecurityBlogs</span>
              </h2>
              <p style={{ fontSize: 14.5, lineHeight: 1.7, color: 'var(--text-soft)', maxWidth: 400, marginBottom: 24 }}>
                Security Blogs proudly acknowledges the Traditional Custodians of the lands
                across Australia where our readers, contributors, and industry partners
                live and work. We honour Aboriginal and Torres Strait Islander peoples,
                their cultures, histories, and continuing connection to Country.
              </p>

              {/* Flags */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/flags.png?v=2"
                  alt="Aboriginal and Torres Strait Islander flags"
                  style={{ height: 40, width: 'auto', imageRendering: 'crisp-edges' }}
                />
              </div>

              {/* Avatar stack + social proof */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
                <div style={{ display: 'flex' }}>
                  {avatars.map((a, i) => (
                    <div key={a} style={{
                      width: 36, height: 36, borderRadius: '50%',
                      background: `hsl(${220 + i * 25}, 70%, 52%)`,
                      border: '2px solid var(--bg-soft)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', fontSize: 11, fontWeight: 700,
                      marginLeft: i > 0 ? -10 : 0,
                      zIndex: avatars.length - i,
                      position: 'relative',
                    }}>
                      {a}
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ display: 'flex', gap: 2 }}>
                    {'★★★★★'.split('').map((s, i) => (
                      <span key={i} style={{ color: 'var(--yellow)', fontSize: 14 }}>{s}</span>
                    ))}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 2 }}>50+ security brands trust us</div>
                </div>
              </div>

              {/* Logo */}
              <Link href="/" aria-label="SecurityBlogs home">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo-footer.webp"
                  alt="SecurityBlogs"
                  style={{ width: 140, height: 'auto', display: 'block', marginBottom: 14 }}
                />
              </Link>

              {/* Subscribe row */}
              <div style={{ display: 'flex', gap: 8, maxWidth: 360 }}>
                <input
                  type="email"
                  className="field"
                  placeholder="Enter your email here"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ flex: 1, fontSize: 13, padding: '10px 14px' }}
                />
                <button
                  onClick={() => {}}
                  style={{
                    width: 38, height: 38, borderRadius: 10,
                    background: 'var(--blue)', border: 'none',
                    color: '#fff', cursor: 'pointer', fontSize: 16,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  →
                </button>
              </div>
            </div>

            {/* Right — Get Started form */}
            <GetStartedForm />
          </div>
        </div>
      </div>

      {/* ── Nav grid ── */}
      <div className="container" style={{ padding: '40px 24px 28px' }}>
        <div className="ft-nav-grid">
          <FooterCol title="Help centre"          links={[{ title: 'Knowledge Hub', href: '/knowledge-hub/' }, { title: 'Free Tools', href: '/free-tools/' }, { title: 'About Us', href: '/about-us/' }, { title: 'Contact', href: '/contact/' }]} />
          <FooterCol title="Talk to support"      links={[{ title: 'Book Strategy Call', href: '/book-strategy-call/' }, { title: 'Email Us', href: 'mailto:info@securityblogs.com.au' }, { title: 'Client responds', href: '/contact/' }]} />
          <FooterCol title="SEO & AI Services"    links={services.slice(0, 4).map((s) => ({ title: s.title, href: `/services/${s.slug}/` }))} />
          <FooterCol title="Publish With Us"      links={publishWithUs.slice(0, 4)} />
          <FooterCol title="Pricing"              links={[{ title: 'Pricing Guidelines', href: '/pricing-guidelines/' }, { title: 'Advertise', href: '/publish-with-us/advertise/' }, { title: 'Backlink Packages', href: '/publish-with-us/backlink-packages/' }]} />
        </div>
      </div>

      {/* ── Social + contact ── */}
      <div style={{ borderTop: '1px solid var(--line)', padding: '16px 24px' }}>
        <div className="container" style={{
          display: 'flex', flexWrap: 'wrap', gap: 14,
          alignItems: 'center',
        }}>
          <a href="mailto:info@securityblogs.com.au" style={{ fontSize: 13, color: 'var(--text-soft)', textDecoration: 'none' }}>
            ✉ info@securityblogs.com.au
          </a>
          <a href="tel:+61411212418" style={{ fontSize: 13, color: 'var(--text-soft)', textDecoration: 'none' }}>
            ✆ +61 411 212 418
          </a>
          <div style={{ display: 'flex', gap: 6, marginLeft: 'auto' }}>
            {socials.map(({ name, href, Icon }) => (
              <a
                key={name} href={href}
                target="_blank" rel="noreferrer noopener"
                aria-label={name} title={name}
                style={{
                  width: 30, height: 30, borderRadius: 8,
                  border: '1px solid var(--line)', background: 'var(--bg-card)',
                  display: 'grid', placeItems: 'center', color: 'var(--text)',
                  transition: 'border-color 0.15s, color 0.15s',
                }}
              >
                <Icon size={13} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Copyright ── */}
      <div style={{ borderTop: '1px solid var(--line)', padding: '14px 24px' }}>
        <div className="container" style={{
          display: 'flex', flexWrap: 'wrap', gap: 14,
          justifyContent: 'space-between', alignItems: 'center',
          fontSize: 12.5, color: 'var(--text-dim)',
        }}>
          <span>© {new Date().getFullYear()} SecurityBlogs. All rights reserved.</span>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link href="/terms-of-service/"    style={{ color: 'var(--text-dim)' }}>Terms and Conditions</Link>
            <Link href="/privacy-policy/"      style={{ color: 'var(--text-dim)' }}>Privacy Policy</Link>
            <Link href="/content-guidelines/"  style={{ color: 'var(--text-dim)' }}>Content Guidelines</Link>
          </div>
        </div>
      </div>

      <style>{`
        .ft-top-grid {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 48px;
          align-items: start;
        }
        .ft-nav-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 24px 20px;
          align-items: start;
        }
        @media (max-width: 900px) {
          .ft-top-grid { grid-template-columns: 1fr !important; }
          .ft-nav-grid  { grid-template-columns: repeat(3,1fr) !important; }
        }
        @media (max-width: 600px) {
          .ft-nav-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </footer>
  )
}

function FooterCol({ title, links }: { title: string; links: { title: string; href: string }[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <strong style={{
        fontSize: 12, fontFamily: 'var(--font-mono)',
        letterSpacing: '0.08em', textTransform: 'uppercase',
        color: 'var(--text-dim)', marginBottom: 2,
      }}>
        {title}
      </strong>
      {links.map((l) => (
        <Link key={l.href} href={l.href} style={{ fontSize: 13.5, color: 'var(--text-soft)', textDecoration: 'none' }}>
          {l.title}
        </Link>
      ))}
    </div>
  )
}
