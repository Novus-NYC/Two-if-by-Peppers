/**
 * One passive scroll listener for the whole page. Canvases read from it inside
 * the frame loop they already run, so nothing here schedules work of its own.
 */

let lastY = 0
let lastAt = 0
let smoothed = 0
let listening = false

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

function onScroll() {
  const now = performance.now()
  const y = window.scrollY
  const dt = Math.max(now - lastAt, 8) / 1000
  const velocity = (y - lastY) / dt
  smoothed = smoothed * 0.65 + velocity * 0.35
  lastY = y
  lastAt = now
}

export function listen() {
  if (listening || typeof window === "undefined") return
  listening = true
  lastY = window.scrollY
  lastAt = performance.now()
  window.addEventListener("scroll", onScroll, { passive: true })
}

/** Signed, normalised scroll speed. Decays to zero when scrolling stops. */
export function flow() {
  if (!listening) return 0
  const idle = (performance.now() - lastAt) / 1000
  return clamp((smoothed * Math.exp(-idle * 7)) / 2200, -1, 1)
}

export function offset() {
  return listening ? lastY : 0
}

/** 0 while the element is still below the fold, 1 once it has settled into view. */
export function entryProgress(el: Element) {
  const rect = el.getBoundingClientRect()
  const vh = window.innerHeight || 1
  const start = vh * 0.95
  const end = vh * 0.35
  return clamp((start - rect.top) / Math.max(start - end, 1), 0, 1)
}

/** 0 while the element fills the viewport, 1 once it has scrolled away. */
export function exitProgress(el: Element) {
  const rect = el.getBoundingClientRect()
  return clamp(-rect.top / Math.max(rect.height * 0.8, 1), 0, 1)
}
