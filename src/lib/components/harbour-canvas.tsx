"use client"

import { useEffect, useRef } from "react"
import { createProgram, fullscreenTriangle, getContext, resizeCanvas, startLoop, stillPreferred } from "@/lib/webgl/core"
import { EMBER_FS, EMBER_VS, HARBOUR_FS, QUAD_VS } from "@/lib/webgl/glsl"

const EMBER_COUNT = 420

export default function HarbourCanvas({ lit, drift }: { lit: number; drift: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const litRef = useRef(lit)
  const driftRef = useRef(drift)

  litRef.current = lit
  driftRef.current = drift

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = getContext(canvas, false)
    if (!gl) return

    const harbour = createProgram(gl, QUAD_VS, HARBOUR_FS)
    const embers = createProgram(gl, EMBER_VS, EMBER_FS)
    if (!harbour || !embers) return

    const quad = fullscreenTriangle(gl, harbour)

    const seeds = new Float32Array(EMBER_COUNT)
    for (let i = 0; i < EMBER_COUNT; i++) seeds[i] = i * 0.61803398875 + 0.137
    const emberVao = gl.createVertexArray()
    gl.bindVertexArray(emberVao)
    const emberBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, emberBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, seeds, gl.STATIC_DRAW)
    const seedLoc = gl.getAttribLocation(embers, "a_seed")
    gl.enableVertexAttribArray(seedLoc)
    gl.vertexAttribPointer(seedLoc, 1, gl.FLOAT, false, 0, 0)
    gl.bindVertexArray(null)

    const hRes = gl.getUniformLocation(harbour, "u_res")
    const hTime = gl.getUniformLocation(harbour, "u_time")
    const hL1 = gl.getUniformLocation(harbour, "u_l1")
    const hL2 = gl.getUniformLocation(harbour, "u_l2")
    const hDrift = gl.getUniformLocation(harbour, "u_drift")

    const eTime = gl.getUniformLocation(embers, "u_time")
    const eRes = gl.getUniformLocation(embers, "u_res")
    const eScale = gl.getUniformLocation(embers, "u_scale")
    const eSpeed = gl.getUniformLocation(embers, "u_speed")

    const still = stillPreferred()
    let shown1 = 0
    let shown2 = 0

    const frame = (time: number, dt: number) => {
      resizeCanvas(canvas, gl)

      // the two lanterns ease up to their target brightness independently
      const target = litRef.current
      const t1 = target >= 1 ? 1 : 0
      const t2 = target >= 2 ? 1 : 0
      const ease = still ? 1 : Math.min(1, dt * 2.2)
      shown1 += (t1 - shown1) * ease
      shown2 += (t2 - shown2) * ease

      const flicker = still ? 1 : 0.92 + 0.08 * Math.sin(time * 6.1) * Math.sin(time * 2.3)

      gl.bindVertexArray(quad.vao)
      gl.useProgram(harbour)
      gl.uniform2f(hRes, canvas.width, canvas.height)
      gl.uniform1f(hTime, still ? 8 : time)
      gl.uniform1f(hL1, shown1 * flicker)
      gl.uniform1f(hL2, shown2 * flicker)
      gl.uniform1f(hDrift, driftRef.current)
      gl.drawArrays(gl.TRIANGLES, 0, 3)

      const glow = Math.max(shown1, shown2)
      if (glow > 0.02) {
        gl.enable(gl.BLEND)
        gl.blendFunc(gl.ONE, gl.ONE)
        gl.bindVertexArray(emberVao)
        gl.useProgram(embers)
        gl.uniform1f(eTime, still ? 3 : time)
        gl.uniform2f(eRes, canvas.width, canvas.height)
        gl.uniform1f(eScale, Math.min(window.devicePixelRatio || 1, 1.75) * glow)
        gl.uniform1f(eSpeed, 1)
        gl.drawArrays(gl.POINTS, 0, EMBER_COUNT)
        gl.disable(gl.BLEND)
      }

      gl.bindVertexArray(null)
    }

    const stop = startLoop(canvas, frame, { still })

    return () => {
      stop()
      gl.deleteProgram(harbour)
      gl.deleteProgram(embers)
      gl.deleteBuffer(quad.buffer)
      gl.deleteBuffer(emberBuffer)
      gl.deleteVertexArray(quad.vao)
      gl.deleteVertexArray(emberVao)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
}
