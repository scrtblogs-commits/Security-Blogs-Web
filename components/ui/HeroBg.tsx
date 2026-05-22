import { ReactNode } from 'react'

export default function HeroBg({ children, grid = true, blobs = true }: { children: ReactNode; grid?: boolean; blobs?: boolean }) {
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
