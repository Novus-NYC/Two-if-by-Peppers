"use client"

import { useEffect, useRef } from "react"

const vertexShader = `
  attribute vec2 a_position;
  void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
`

const fragmentShader = `
  precision mediump float;
  uniform vec2 u_resolution;
  uniform vec2 u_pointer;
  uniform float u_time;
  uniform float u_count;

  float hash(float n) { return fract(sin(n) * 43758.5453123); }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    uv.x *= u_resolution.x / u_resolution.y;
    vec2 drift = (u_pointer - 0.5) * 0.045;
    vec3 color = vec3(0.0);

    for (float i = 0.0; i < 22.0; i++) {
      if (i >= u_count) continue;
      float speed = 0.018 + hash(i * 3.4) * 0.045;
      float rise = fract(hash(i * 4.7) + u_time * speed);
      float x = hash(i * 2.1) * (u_resolution.x / u_resolution.y);
      x += sin(u_time * (0.45 + hash(i)) + i * 9.0) * 0.028;
      vec2 ember = vec2(x, rise) + drift * rise;
      float distanceToEmber = length(uv - ember);
      float radius = mix(0.003, 0.012, hash(i * 6.1));
      float glow = 1.0 - smoothstep(radius, radius * 4.5, distanceToEmber);
      vec3 emberColor = mix(vec3(0.79, 0.24, 0.15), vec3(0.96, 0.65, 0.18), hash(i * 8.9));
      color += emberColor * glow * 0.72;
    }

    float haze = 0.08 * (1.0 - uv.y) + 0.03 * sin(uv.x * 7.0 + u_time * 0.16);
    gl_FragColor = vec4(color + vec3(0.88, 0.34, 0.13) * haze, 0.72);
  }
`

export default function HeroEmbers() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!canvas || reduceMotion) return

    const gl = canvas.getContext("webgl", { alpha: true, antialias: false, powerPreference: "low-power" })
    if (!gl) return

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type)
      if (!shader) return null
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null
    }
    const vertex = compile(gl.VERTEX_SHADER, vertexShader)
    const fragment = compile(gl.FRAGMENT_SHADER, fragmentShader)
    if (!vertex || !fragment) return

    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vertex)
    gl.attachShader(program, fragment)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW)
    gl.useProgram(program)

    const position = gl.getAttribLocation(program, "a_position")
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    const resolution = gl.getUniformLocation(program, "u_resolution")
    const pointer = gl.getUniformLocation(program, "u_pointer")
    const time = gl.getUniformLocation(program, "u_time")
    const count = gl.getUniformLocation(program, "u_count")
    const isMobile = window.matchMedia("(max-width: 640px)").matches
    const particles = isMobile ? 9 : 22
    const frameInterval = isMobile ? 1000 / 30 : 0
    let frame = 0
    let lastFrame = 0
    let active = !document.hidden
    let pointerPosition: [number, number] = [0.5, 0.5]

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, isMobile ? 1.15 : 1.5)
      canvas.width = Math.max(1, Math.floor(rect.width * ratio))
      canvas.height = Math.max(1, Math.floor(rect.height * ratio))
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(resolution, canvas.width, canvas.height)
      gl.uniform1f(count, particles)
    }
    const draw = (now: number) => {
      if (!active) return
      frame = requestAnimationFrame(draw)
      if (frameInterval && now - lastFrame < frameInterval) return
      lastFrame = now
      gl.uniform1f(time, now * 0.001)
      gl.uniform2f(pointer, pointerPosition[0], pointerPosition[1])
      gl.drawArrays(gl.TRIANGLES, 0, 6)
    }
    const updatePointer = (event: PointerEvent) => {
      if (isMobile) return
      const rect = canvas.getBoundingClientRect()
      pointerPosition = [(event.clientX - rect.left) / rect.width, 1 - (event.clientY - rect.top) / rect.height]
    }
    const visibility = () => {
      active = !document.hidden
      if (active) { cancelAnimationFrame(frame); frame = requestAnimationFrame(draw) }
    }

    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)
    window.addEventListener("pointermove", updatePointer, { passive: true })
    document.addEventListener("visibilitychange", visibility)
    frame = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      window.removeEventListener("pointermove", updatePointer)
      document.removeEventListener("visibilitychange", visibility)
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
      gl.deleteShader(vertex)
      gl.deleteShader(fragment)
    }
  }, [])

  return <canvas ref={canvasRef} className="hero-embers pointer-events-none absolute inset-0 h-full w-full opacity-70" aria-hidden="true" />
}
