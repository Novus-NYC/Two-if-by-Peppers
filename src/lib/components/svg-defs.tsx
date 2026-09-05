export default function SvgDefs() {
  return (
    <svg aria-hidden="true" focusable="false" width="0" height="0" className="absolute" style={{ position: "absolute" }}>
      <defs>
        <clipPath id="archClipUnits" clipPathUnits="objectBoundingBox">
          <path d="M0.055,0.9615 V0.35 A0.445,0.3423 0 0 1 0.945,0.35 V0.9615 Z" />
        </clipPath>
        <filter id="deckle" x="-8%" y="-8%" width="116%" height="116%">
          <feTurbulence type="fractalNoise" baseFrequency="0.014 0.036" numOctaves="4" seed="11" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="9" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <radialGradient id="lanternHalo">
          <stop offset="0" stopColor="#ffd489" stopOpacity=".95" />
          <stop offset=".5" stopColor="#ff9a3c" stopOpacity=".38" />
          <stop offset="1" stopColor="#ff6b23" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="lanternFlame" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff3cd" />
          <stop offset=".42" stopColor="#ffc148" />
          <stop offset="1" stopColor="#e0451c" />
        </linearGradient>
      </defs>
    </svg>
  )
}
