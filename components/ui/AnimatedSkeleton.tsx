export default function AnimatedSkeleton({ lines = 4, height = 220 }: { lines?: number; height?: number }) {
  return (
    <div className="card" style={{ minHeight: height, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div className="skeleton" style={{ height: 28, width: '45%' }} />
      <div className="skeleton" style={{ height: 120 }} />
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="skeleton" style={{ height: 12, width: `${90 - i * 12}%` }} />
      ))}
    </div>
  )
}
