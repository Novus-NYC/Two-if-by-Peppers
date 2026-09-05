"use client"

import { useEffect, useRef, useState } from "react"
import { createProgram, fullscreenTriangle, getContext, resizeCanvas, startLoop, stillPreferred } from "@/lib/webgl/core"
import { LANTERN_FS, QUAD_VS } from "@/lib/webgl/glsl"

export default function LanternReveal({ children }: { children: React.ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const target = useRef({ x: 0.5, y: 0.45 })
  const point = useRef({ x: 0.5, y: 0.45 })
  const chasing = useRef(false)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (stillPreferred()) return
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const gl = getContext(canvas, true)
    if (!gl) return

    const program = createProgram(gl, QUAD_VS, LANTERN_FS)
    if (!program) return
    const quad = fullscreenTriangle(gl, program)

    const uRes = gl.getUniformLocation(program, "u_res")
    const uTime = gl.getUniformLocation(program, "u_time")
    const uPoint = gl.getUniformLocation(program, "u_point")
    const uRadius = gl.getUniformLocation(program, "u_radius")

    const onMove = (event: PointerEvent) => {
      const rect = wrap.getBoundingClientRect()
      chasing.current = true
      target.current = {
        x: (event.clientX - rect.left) / rect.width,
        y: 1 - (event.clientY - rect.top) / rect.height,
      }
    }
    const onLeave = () => (chasing.current = false)
    wrap.addEventListener("pointermove", onMove)
    wrap.addEventListener("pointerleave", onLeave)

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)

    const frame = (time: number, dt: number) => {
      resizeCanvas(canvas, gl)

      // with no pointer, the lantern drifts across the wall on its own
      if (!chasing.current) {
        target.current = {
          x: 0.5 + Math.sin(time * 0.23) * 0.28,
          y: 0.5 + Math.sin(time * 0.17 + 1.2) * 0.16,
        }
      }
      const k = Math.min(1, dt * (chasing.current ? 9 : 2.2))
      point.current.x += (target.current.x - point.current.x) * k
      point.current.y += (target.current.y - point.current.y) * k

      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.bindVertexArray(quad.vao)
      gl.useProgram(program)
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, time)
      gl.uniform2f(uPoint, point.current.x, point.current.y)
      gl.uniform1f(uRadius, 0.34)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    const stop = startLoop(canvas, frame, {})
    setActive(true)

    return () => {
      wrap.removeEventListener("pointermove", onMove)
      wrap.removeEventListener("pointerleave", onLeave)
      stop()
      gl.deleteProgram(program)
      gl.deleteBuffer(quad.buffer)
      gl.deleteVertexArray(quad.vao)
    }
  }, [])

  return (
    <div ref={wrapRef} className="relative">
      {children}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-700 ${
          active ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  )
}
