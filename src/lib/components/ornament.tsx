function Star({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={className} fill="currentColor">
      <path d="M8 .6 9.9 6h5.7l-4.6 3.5 1.8 5.6L8 11.6 3.2 15.1 5 9.5.4 6h5.7Z" />
    </svg>
  )
}

export function StarRule({ className = "", stars = 13 }: { className?: string; stars?: number }) {
  return (
    <div className={`flex items-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-px flex-1 bg-current opacity-30" />
      <span className="flex items-center gap-[3px] opacity-60">
        {Array.from({ length: stars }).map((_, i) => (
          <Star key={i} className="h-[7px] w-[7px]" />
        ))}
      </span>
      <span className="h-px flex-1 bg-current opacity-30" />
    </div>
  )
}

export function Fleuron({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`} aria-hidden="true">
      <span className="h-px flex-1 bg-current opacity-25" />
      <svg viewBox="0 0 40 16" className="h-4 w-10 opacity-70" fill="currentColor">
        <path d="M20 2c2.6 0 4.4 2 4.4 4.3 0 2-1.3 3.4-3 3.9 1.7.6 2.6 1.9 2.6 3.3 0 .3 0 .5-.1.8-.9-1.6-2.3-2.4-3.9-2.4s-3 .8-3.9 2.4c-.1-.3-.1-.5-.1-.8 0-1.4.9-2.7 2.6-3.3-1.7-.5-3-1.9-3-3.9C15.6 4 17.4 2 20 2Zm0 1.7a2.6 2.6 0 1 0 0 5.2 2.6 2.6 0 0 0 0-5.2Z" />
        <path d="M13.4 8.2c-2 0-3.6-.9-4.7-2.2 1.1-1.3 2.7-2.2 4.7-2.2.5 0 1 .1 1.4.2-.7.9-1.1 2-1.1 3.2v.8c-.1 0-.2.2-.3.2Z" />
        <path d="M26.6 8.2c2 0 3.6-.9 4.7-2.2-1.1-1.3-2.7-2.2-4.7-2.2-.5 0-1 .1-1.4.2.7.9 1.1 2 1.1 3.2v.8c.1 0 .2.2.3.2Z" />
      </svg>
      <span className="h-px flex-1 bg-current opacity-25" />
    </div>
  )
}

export function Corners({ className = "" }: { className?: string }) {
  const corner = "absolute h-5 w-5 border-current opacity-40"
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      <span className={`${corner} left-0 top-0 border-l border-t`} />
      <span className={`${corner} right-0 top-0 border-r border-t`} />
      <span className={`${corner} bottom-0 left-0 border-b border-l`} />
      <span className={`${corner} bottom-0 right-0 border-b border-r`} />
    </div>
  )
}

const sealEdge =
  "M48 4c6 0 8 5 13 6s10-2 14 2 1 9 4 13 8 5 8 11-5 8-6 13 2 10-2 14-9 1-13 4-5 8-11 8-8-5-13-6-10 2-14-2-1-9-4-13-8-5-8-11 5-8 6-13-2-10 2-14 9-1 13-4 5-8 11-8Z"

export function WaxSeal({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
      <path d={sealEdge} fill="#8f2418" />
      <path d={sealEdge} fill="none" stroke="#5e1409" strokeWidth="1.5" opacity=".6" />
      <circle cx="48" cy="48" r="31" fill="none" stroke="#f0e5cd" strokeWidth="1.1" opacity=".4" />
      <circle cx="48" cy="48" r="27.5" fill="none" stroke="#f0e5cd" strokeWidth=".6" opacity=".26" />
      <g stroke="#f0e5cd" strokeOpacity=".45" strokeWidth="1" strokeLinecap="round">
        <path d="M41 33h14M41 64h14" />
      </g>
      <g
        fill="#f0e5cd"
        fillOpacity=".85"
        textAnchor="middle"
        style={{ fontFamily: "'IM Fell English SC', Georgia, serif", fontSize: "10px", letterSpacing: ".5px" }}
      >
        <text x="48" y="46">two if</text>
        <text x="48" y="58">by pepper</text>
      </g>
    </svg>
  )
}
