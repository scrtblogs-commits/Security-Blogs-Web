import Link from 'next/link'

export default function Navbar() {
  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 72,
        display: 'flex',
        alignItems: 'center',
        zIndex: 50,
        backdropFilter: 'saturate(180%) blur(12px)',
        background: 'rgba(251,251,253,0.7)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <div
        className="container"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 800, fontSize: 18 }}>
          <span
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: 'linear-gradient(135deg, var(--blue), var(--purple))',
              display: 'inline-block',
            }}
          />
          Security<span style={{ color: 'var(--blue)' }}>Growth</span>
        </Link>

        <nav style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <Link href="/services/security-seo/" style={{ fontWeight: 600, color: 'var(--muted)' }}>
            Services
          </Link>
          <Link href="/#stats" style={{ fontWeight: 600, color: 'var(--muted)' }}>
            Results
          </Link>
          <Link href="/contact/" className="btn btn-primary" style={{ padding: '10px 18px' }}>
            Book a call
          </Link>
        </nav>
      </div>
    </header>
  )
}
