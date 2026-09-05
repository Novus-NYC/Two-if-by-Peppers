"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { createProgram, fullscreenTriangle, getContext, resizeCanvas, startLoop, stillPreferred } from "@/lib/webgl/core"
import { ART_FS, ART_VS } from "@/lib/webgl/glsl"

function optimized(src: string) {
  return `/_next/image?url=${encodeURIComponent(src)}&w=1200&q=80`
}

export default function SauceArt({
  src,
  alt,
  fit,
  blend = false,
  priority = false,
  sizes,
  className = "",
}: {
  src: string
  alt: string
  fit: "cover" | "contain"
  blend?: boolean
  priority?: boolean
  sizes: string
  className?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const hoverRef = useRef(0)
  const targetRef = useRef(0)
  const [live, setLive] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = getContext(canvas, true)
    if (!gl) return

    const program = createProgram(gl, ART_VS, ART_FS)
    if (!program) return
    const quad = fullscreenTriangle(gl, program)

    const uTex = gl.getUniformLocation(program, "u_tex")
    const uTime = gl.getUniformLocation(program, "u_time")
    const uHover = gl.getUniformLocation(program, "u_hover")
    const uScale = gl.getUniformLocation(program, "u_uvScale")
    const uOffset = gl.getUniformLocation(program, "u_uvOffset")

    const texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)

    let stop: (() => void) | undefined
    let cancelled = false
    const image = new window.Image()
    image.decoding = "async"

    image.onload = () => {
      if (cancelled) return
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
      gl.generateMipmap(gl.TEXTURE_2D)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR)

      const still = stillPreferred()
      gl.enable(gl.BLEND)
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)

      const frame = (time: number, dt: number) => {
        resizeCanvas(canvas, gl)
        hoverRef.current += (targetRef.current - hoverRef.current) * Math.min(1, dt * 4.5)

        // object-fit, resolved to a uv transform
        const canvasAspect = canvas.width / canvas.height
        const imageAspect = image.naturalWidth / image.naturalHeight
        const wider = fit === "cover" ? imageAspect > canvasAspect : imageAspect < canvasAspect
        const sx = wider ? canvasAspect / imageAspect : 1
        const sy = wider ? 1 : imageAspect / canvasAspect

        gl.clearColor(0, 0, 0, 0)
        gl.clear(gl.COLOR_BUFFER_BIT)
        gl.bindVertexArray(quad.vao)
        gl.useProgram(program)
        gl.uniform1i(uTex, 0)
        gl.activeTexture(gl.TEXTURE0)
        gl.bindTexture(gl.TEXTURE_2D, texture)
        gl.uniform1f(uTime, still ? 2 : time)
        gl.uniform1f(uHover, still ? 0 : hoverRef.current)
        gl.uniform2f(uScale, sx, sy)
        gl.uniform2f(uOffset, (1 - sx) / 2, (1 - sy) / 2)
        gl.drawArrays(gl.TRIANGLES, 0, 3)
      }

      stop = startLoop(canvas, frame, { still })
      setLive(true)
    }

    // fall back to the raw asset if the image optimizer is unavailable
    let retried = false
    image.onerror = () => {
      if (retried || cancelled) return
      retried = true
      image.src = src
    }
    image.src = optimized(src)

    return () => {
      cancelled = true
      stop?.()
      gl.deleteProgram(program)
      gl.deleteTexture(texture)
      gl.deleteBuffer(quad.buffer)
      gl.deleteVertexArray(quad.vao)
    }
  }, [src, fit])

  const objectFit = fit === "contain" ? "object-contain p-6" : "object-cover object-center"

  return (
    <div
      className={`absolute inset-0 ${blend ? "mix-blend-screen" : ""} ${className}`}
      onPointerEnter={() => (targetRef.current = 1)}
      onPointerLeave={() => (targetRef.current = 0)}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={`${objectFit} transition-opacity duration-500 ${live ? "opacity-0" : "opacity-100"}`}
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${
          live ? "opacity-100" : "opacity-0"
        } ${fit === "contain" ? "p-6" : ""}`}
      />
    </div>
  )
}
