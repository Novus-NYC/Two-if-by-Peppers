export default function Sheet({
  children,
  className = "",
  tilt = 0,
  reveal,
}: {
  children: React.ReactNode
  className?: string
  tilt?: number
  reveal?: number
}) {
  return (
    <div
      className={`sheet ${className}`}
      data-reveal={reveal === undefined ? undefined : String(reveal)}
      style={tilt ? { transform: `rotate(${tilt}deg)` } : undefined}
    >
      <div className="sheet-bg" />
      <div className="sheet-body">{children}</div>
    </div>
  )
}
