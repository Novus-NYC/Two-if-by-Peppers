"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import EmbersField from "./embers-field"
import HarbourCanvas from "./harbour-canvas"
import Lantern from "./lantern"
import { StarRule } from "./ornament"
import { listen, offset } from "@/lib/webgl/scroll"

function Ship() {
  return (
    <g>
      <path d="M0 0h62l-7 8H7z" />
      <path d="M62 0 74-6" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <g stroke="currentColor" strokeWidth="1.8" fill="none">
        <path d="M14 0v-32M33 0v-46M51 0v-30" />
      </g>
      <path d="M5-28q9 2 18 0v9q-9 2-18 0z" />
      <path d="M24-43q9 2 19 0v10q-9 2-19 0z" />
      <path d="M24-29q9 2 19 0v10q-9 2-19 0z" />
      <path d="M43-26q8 2 16 0v9q-8 2-16 0z" />
    </g>
  )
}

function WindowFrame() {
  const farRef = useRef<SVGGElement>(null)
  const nearRef = useRef<SVGGElement>(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    listen()
    let queued = 0
    const apply = () => {
      queued = 0
      const drift = Math.min(offset(), 900) * 0.06
      farRef.current?.setAttribute("transform", `translate(${drift * -0.45} 0)`)
      nearRef.current?.setAttribute("transform", `translate(${drift * -1.05} 0)`)
    }
    const onScroll = () => {
      if (!queued) queued = window.requestAnimationFrame(apply)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    apply()
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (queued) window.cancelAnimationFrame(queued)
    }
  }, [])

  return (
    <svg
      viewBox="0 0 400 520"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <g clipPath="url(#archClipUnits)">
        <g ref={farRef} fill="#0a1120" color="#0a1120" opacity=".9">
          <g transform="translate(46 333) scale(.5)">
            <Ship />
          </g>
        </g>
        <g ref={nearRef} fill="#0d1526" color="#0d1526">
          <g transform="translate(244 337) scale(.72)">
            <Ship />
          </g>
        </g>
      </g>

      <g fill="none" stroke="#c9963f" strokeLinecap="round">
        <path d="M22 500V182a178 178 0 0 1 356 0v318" strokeWidth="7" opacity=".5" />
        <path d="M22 500V182a178 178 0 0 1 356 0v318" strokeWidth="2" opacity=".8" />
        <path d="M200 40v460" strokeWidth="4" opacity=".4" />
        <path d="M40 262h320M40 380h320" strokeWidth="4" opacity=".4" />
        <path d="M60 182a140 140 0 0 1 280 0" strokeWidth="2" opacity=".26" />
        <path d="M92 150 200 40l108 110" strokeWidth="2" opacity=".24" />
      </g>
    </svg>
  )
}

export default function SignalHero() {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStage(2)
      return
    }
    const first = window.setTimeout(() => setStage(1), 900)
    const second = window.setTimeout(() => setStage(2), 1900)
    return () => {
      window.clearTimeout(first)
      window.clearTimeout(second)
    }
  }, [])

  const lineBase = "block broadside-line transition-[opacity,transform] duration-[1200ms] ease-out"

  return (
    <section className="night-deep vignette relative overflow-hidden">
      <EmbersField count={170} speed={0.4} scale={1.1} className="absolute inset-0 h-full w-full opacity-50" />

      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-[2200ms]"
        style={{
          opacity: stage === 0 ? 0 : stage === 1 ? 0.5 : 1,
          background:
            "radial-gradient(58rem 38rem at 72% 44%, rgba(255,140,50,.20), transparent 64%), radial-gradient(30rem 24rem at 78% 40%, rgba(255,190,90,.14), transparent 66%)",
        }}
      />

      <div className="relative mx-auto grid max-w-broadside items-center gap-12 px-6 py-20 sm:px-10 lg:grid-cols-[1.02fr_.98fr] lg:py-24">
        <div className="relative z-10">
          <p className="sc text-gold/85">the signal from the tower</p>
          <StarRule className="mt-5 max-w-sm text-parchment" />

          <h1 className="mt-8">
            <span
              className={`${lineBase} text-parchment/55 text-[clamp(1.7rem,4.6vw,2.9rem)]`}
              style={{ opacity: stage >= 1 ? 1 : 0, transform: stage >= 1 ? "none" : "translateY(14px)" }}
            >
              One if by land.
            </span>
            <span
              className={`${lineBase} text-parchment/75 text-[clamp(1.7rem,4.6vw,2.9rem)]`}
              style={{
                opacity: stage >= 1 ? 1 : 0,
                transform: stage >= 1 ? "none" : "translateY(14px)",
                transitionDelay: "220ms",
              }}
            >
              Two if by sea.
            </span>
            <span
              className={`${lineBase} mt-3 text-[clamp(2.5rem,8.4vw,5.2rem)]`}
              style={{
                opacity: stage >= 2 ? 1 : 0,
                transform: stage >= 2 ? "none" : "translateY(20px)",
                color: "var(--goldlit)",
                textShadow: "0 0 46px rgba(255,150,60,.6), 0 0 14px rgba(255,196,90,.4)",
              }}
            >
              Two if by pepper.
            </span>
          </h1>

          <p
            className="mt-8 max-w-measure text-[1.02rem] leading-8 text-parchment/70 transition-opacity duration-1000"
            style={{ opacity: stage >= 2 ? 1 : 0, transitionDelay: "300ms" }}
          >
            Two cooks, one harbour, and a heresy — that a ration ought to be worth sitting down for. Hot sauce
            cooked in batches small enough to taste, for anyone who thinks blandness had it coming.
          </p>

          <div
            className="mt-10 flex flex-wrap items-center gap-4 transition-opacity duration-1000"
            style={{ opacity: stage >= 2 ? 1 : 0, transitionDelay: "460ms" }}
          >
            <Link href="/sauces" className="btn btn-ember">
              meet the two
            </Link>
            <Link href="/story" className="btn btn-outline text-parchment">
              read the story
            </Link>
          </div>
        </div>

        <div className="relative mx-auto mt-4 w-full max-w-[17rem] sm:max-w-[21rem] lg:mt-0 lg:max-w-[25rem]">
          <div
            className="pointer-events-none absolute -inset-24 transition-opacity duration-[2000ms]"
            style={{
              opacity: stage === 0 ? 0 : stage === 1 ? 0.5 : 1,
              background: "radial-gradient(circle at 50% 44%, rgba(255,160,60,.30), transparent 64%)",
            }}
          />

          <div className="relative aspect-[400/520]">
            <div className="absolute inset-0 overflow-hidden" style={{ clipPath: "url(#archClipUnits)" }}>
              <HarbourCanvas lit={stage} />
            </div>

            <WindowFrame />

            <div
              className="absolute left-[26%] top-[24%] w-[13%] transition-opacity duration-[1400ms]"
              style={{ opacity: stage >= 1 ? 1 : 0.3 }}
            >
              <span className="absolute inset-x-1/2 -top-[38%] h-[38%] w-px bg-brass/50" />
              <Lantern lit={stage >= 1} className="w-full text-brass" />
            </div>

            <div
              className="absolute right-[26%] top-[24%] w-[13%] transition-opacity duration-[1400ms]"
              style={{ opacity: stage >= 2 ? 1 : 0.3 }}
            >
              <span className="absolute inset-x-1/2 -top-[38%] h-[38%] w-px bg-brass/50" />
              <Lantern lit={stage >= 2} delay={0.9} className="w-full text-brass" />
            </div>
          </div>

          <p
            className="sc mt-6 text-center text-parchment/45 transition-opacity duration-1000"
            style={{ opacity: stage >= 2 ? 1 : 0, transitionDelay: "600ms" }}
          >
            the kitchen is open
          </p>
        </div>
      </div>
    </section>
  )
}
