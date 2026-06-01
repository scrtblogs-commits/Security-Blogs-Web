import { ReactNode } from 'react'

// Default is `blobs={false}` so heroes render on a clean white background
// (matched with the sitewide particle-network background). Pages that still
// want the colored gradient blobs can opt-in with `<HeroBg blobs>`.
export default function HeroBg({ children, grid = true, blobs = false }: { children: ReactNode; grid?: boolean; blobs?: boolean }) {
  return (
    <section className="hero">
      {blobs && (
        <>
          <div className="blob blob-blue" style={{ top: -260, left: -200 }} />
          <div className="blob blob-red" style={{ bottom: -160, right: -120 }} />
          <div className="blob blob-yellow" style={{ top: '28%', right: '22%' }} />
        </>
      )}
      {grid && <div className="grid-overlay" />}
      <div className="container z1">{children}</div>
    </section>
  )
}
