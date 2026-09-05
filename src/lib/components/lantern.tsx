export default function Lantern({
  lit = true,
  delay = 0,
  className = "",
}: {
  lit?: boolean
  delay?: number
  className?: string
}) {
  const anim = delay ? { animationDelay: `${delay}s` } : undefined
  return (
    <svg viewBox="0 0 32 52" fill="none" aria-hidden="true" className={className}>
      {lit && (
        <>
          <ellipse cx="16" cy="26.5" rx="11" ry="14" fill="url(#lanternHalo)" className="glow-pulse" style={anim} />
          <path
            className="flame-lit"
            style={anim}
            d="M16 19.4c3.7 4.3 4.7 7.8 3.1 10.9-1.1 2-2.6 3.1-3.1 4.1-.5-1-2-2.1-3.1-4.1-1.6-3.1-.6-6.6 3.1-10.9Z"
            fill="url(#lanternFlame)"
          />
        </>
      )}
      <g
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={lit ? 0.9 : 0.42}
      >
        <path d="M11 7.2c0-4.6 10-4.6 10 0" />
        <path d="M13.2 7.2h5.6v3h-5.6z" />
        <path d="M9 10.2h14l1.7 4.1H7.3z" />
        <path d="M9.7 14.3h12.6v2H9.7z" />
        <path d="M10.1 16.3h11.8v19.8H10.1z" />
        <path d="M8 36.1h16l1.3 4.1H6.7z" />
        <path d="M10.5 40.2h11v4.3h-11z" />
        <path d="M9.9 18.2C7 24 7 30 9.9 34.5" />
        <path d="M22.1 18.2C25 24 25 30 22.1 34.5" />
      </g>
    </svg>
  )
}
