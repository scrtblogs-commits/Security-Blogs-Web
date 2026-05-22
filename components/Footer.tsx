import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--line)', background: 'var(--surface)' }}>
      <div
        className="container"
        style={{
          padding: '56px 24px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 32,
          justifyContent: 'space-between',
        }}
      >
        <div style={{ maxWidth: 320 }}>
          <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 12 }}>
            Security<span style={{ color: 'var(--blue)' }}>Growth</span>
          </div>
          <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6 }}>
            The AI visibility engine for security brands. We make you the answer search engines and
            AI assistants give.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <strong style={{ fontSize: 14 }}>Services</strong>
          <Link href="/services/security-seo/" style={{ color: 'var(--muted)', fontSize: 14 }}>
            Security SEO
          </Link>
          <Link href="/services/aio/" style={{ color: 'var(--muted)', fontSize: 14 }}>
            AIO
          </Link>
          <Link href="/services/geo/" style={{ color: 'var(--muted)', fontSize: 14 }}>
            GEO
          </Link>
          <Link href="/services/google-ads/" style={{ color: 'var(--muted)', fontSize: 14 }}>
            Google Ads
          </Link>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <strong style={{ fontSize: 14 }}>Company</strong>
          <Link href="/about/" style={{ color: 'var(--muted)', fontSize: 14 }}>
            About
          </Link>
          <Link href="/contact/" style={{ color: 'var(--muted)', fontSize: 14 }}>
            Contact
          </Link>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 32, color: 'var(--muted)', fontSize: 13 }}>
        © {new Date().getFullYear()} SecurityGrowth. All rights reserved.
      </div>
    </footer>
  )
}
