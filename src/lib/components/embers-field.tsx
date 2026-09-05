"use client"

import { useEffect, useRef } from "react"
import { createProgram, getContext, resizeCanvas, startLoop, stillPreferred } from "@/lib/webgl/core"
import { EMBER_FS, EMBER_VS } from "@/lib/webgl/glsl"
import { flow, listen } from "@/lib/webgl/scroll"

export default function EmbersField({
  count = 260,
  speed = 0.55,
  scale = 1,
  className = "",
}: {
  count?: number
  speed?: number
  scale?: number
  className?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = getContext(canvas, true)
    if (!gl) return
    listen()

    const program = createProgram(gl, EMBER_VS, EMBER_FS)
    if (!program) return

    const seeds = new Float32Array(count)
    for (let i = 0; i < count; i++) seeds[i] = i * 0.61803398875 + 0.311
    const vao = gl.createVertexArray()
    gl.bindVertexArray(vao)
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, seeds, gl.STATIC_DRAW)
    const seedLoc = gl.getAttribLocation(program, "a_seed")
    gl.enableVertexAttribArray(seedLoc)
    gl.vertexAttribPointer(seedLoc, 1, gl.FLOAT, false, 0, 0)

    const uTime = gl.getUniformLocation(program, "u_time")
    const uRes = gl.getUniformLocation(program, "u_res")
    const uScale = gl.getUniformLocation(program, "u_scale")
    const uSpeed = gl.getUniformLocation(program, "u_speed")
    const uFlow = gl.getUniformLocation(program, "u_flow")

    const still = stillPreferred()

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.ONE, gl.ONE)

    const frame = (time: number) => {
      resizeCanvas(canvas, gl)
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.bindVertexArray(vao)
      gl.useProgram(program)
      gl.uniform1f(uTime, still ? 4 : time)
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uScale, Math.min(window.devicePixelRatio || 1, 1.75) * scale)
      gl.uniform1f(uSpeed, speed)
      gl.uniform1f(uFlow, still ? 0 : flow())
      gl.drawArrays(gl.POINTS, 0, count)
    }

    const stop = startLoop(canvas, frame, { still })

    return () => {
      stop()
      gl.deleteProgram(program)
      gl.deleteBuffer(buffer)
      gl.deleteVertexArray(vao)
    }
  }, [count, speed, scale])

  return <canvas ref={canvasRef} className={`pointer-events-none ${className}`} aria-hidden="true" />
}
