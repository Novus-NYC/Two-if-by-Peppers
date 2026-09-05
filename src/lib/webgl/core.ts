export type GL = WebGL2RenderingContext

export function createProgram(gl: GL, vertexSrc: string, fragmentSrc: string): WebGLProgram | null {
  const compile = (type: number, src: string) => {
    const shader = gl.createShader(type)
    if (!shader) return null
    gl.shaderSource(shader, src)
    gl.compileShader(shader)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      if (process.env.NODE_ENV !== "production") {
        console.error(gl.getShaderInfoLog(shader), src)
      }
      gl.deleteShader(shader)
      return null
    }
    return shader
  }

  const vs = compile(gl.VERTEX_SHADER, vertexSrc)
  const fs = compile(gl.FRAGMENT_SHADER, fragmentSrc)
  if (!vs || !fs) return null

  const program = gl.createProgram()
  if (!program) return null
  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)
  gl.deleteShader(vs)
  gl.deleteShader(fs)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    if (process.env.NODE_ENV !== "production") {
      console.error(gl.getProgramInfoLog(program))
    }
    gl.deleteProgram(program)
    return null
  }
  return program
}

export function fullscreenTriangle(gl: GL, program: WebGLProgram) {
  const vao = gl.createVertexArray()
  gl.bindVertexArray(vao)
  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const loc = gl.getAttribLocation(program, "a_pos")
  gl.enableVertexAttribArray(loc)
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
  gl.bindVertexArray(null)
  return { vao, buffer }
}

export function resizeCanvas(canvas: HTMLCanvasElement, gl: GL, maxDpr = 1.75) {
  const dpr = Math.min(window.devicePixelRatio || 1, maxDpr)
  const width = Math.max(1, Math.round(canvas.clientWidth * dpr))
  const height = Math.max(1, Math.round(canvas.clientHeight * dpr))
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width
    canvas.height = height
    gl.viewport(0, 0, width, height)
    return true
  }
  return false
}

export function stillPreferred() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function getContext(canvas: HTMLCanvasElement, alpha: boolean): GL | null {
  return canvas.getContext("webgl2", {
    alpha,
    antialias: false,
    depth: false,
    stencil: false,
    premultipliedAlpha: true,
    powerPreference: "low-power",
    failIfMajorPerformanceCaveat: false,
  }) as GL | null
}

/**
 * Runs `frame` on rAF while the canvas is on screen and the tab is visible.
 * Returns a teardown that also releases the GPU context.
 */
export function startLoop(
  canvas: HTMLCanvasElement,
  frame: (time: number, dt: number) => void,
  options: { still?: boolean } = {}
) {
  let raf = 0
  let last = performance.now()
  let time = 0
  let onScreen = true
  let stopped = false

  const tick = (now: number) => {
    if (stopped) return
    const dt = Math.min((now - last) / 1000, 1 / 30)
    last = now
    time += dt
    frame(time, dt)
    raf = requestAnimationFrame(tick)
  }

  const play = () => {
    if (stopped || raf || !onScreen || document.hidden) return
    last = performance.now()
    raf = requestAnimationFrame(tick)
  }
  const pause = () => {
    if (raf) cancelAnimationFrame(raf)
    raf = 0
  }

  frame(0, 0)

  // A still scene draws once, so it must redraw whenever the element is
  // measured or resized - otherwise it keeps whatever size it had at mount.
  const sizeObserver = new ResizeObserver(() => {
    if (!stopped && (options.still || !raf)) frame(0, 0)
  })
  sizeObserver.observe(canvas)

  if (!options.still) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting
        onScreen ? play() : pause()
      },
      { rootMargin: "120px" }
    )
    observer.observe(canvas)

    const onVisibility = () => (document.hidden ? pause() : play())
    document.addEventListener("visibilitychange", onVisibility)
    play()

    return () => {
      stopped = true
      pause()
      observer.disconnect()
      sizeObserver.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }

  return () => {
    stopped = true
    pause()
    sizeObserver.disconnect()
  }
}
