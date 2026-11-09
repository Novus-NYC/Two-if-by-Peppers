"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import EmbersField from "./embers-field"
import { StarRule } from "./ornament"

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
          <p className="sc-tight font-sc text-[1rem] uppercase tracking-[.2em] text-goldlit">Small Batch Hot Sauce</p>
          <StarRule className="mt-5 max-w-sm text-parchment" />
          <h1 className="mt-8">
            <span
              className={`${lineBase} text-[clamp(2.8rem,9.4vw,6rem)]`}
              style={{
                opacity: stage >= 2 ? 1 : 0,
                transform: stage >= 2 ? "none" : "translateY(20px)",
                color: "var(--goldlit)",
                textShadow: "0 0 46px rgba(255,150,60,.6), 0 0 14px rgba(255,196,90,.4)",
              }}
            >
              Two If
              <br />
              By Pepper
            </span>
          </h1>
          <p
            className="display mt-6 text-[clamp(1.2rem,2.6vw,1.75rem)] uppercase leading-tight text-parchment transition-opacity duration-1000"
            style={{ opacity: stage >= 2 ? 1 : 0, transitionDelay: "150ms" }}
          >
            Forged in Rebellion, Fueled by Flavor
          </p>
          <p
            className="mt-8 max-w-measure text-[1.05rem] leading-8 text-parchment/90 transition-opacity duration-1000"
            style={{ opacity: stage >= 2 ? 1 : 0, transitionDelay: "300ms" }}
          >
            Two If By Pepper crafts small-batch hot sauces born from a love of bold heat and handcrafted balance.
            Each bottle carries the spirit of independence and a rebellious refusal to settle for bland. From the
            first flame to the final pour, each sauce carries the torch of bold flavor, igniting your taste buds and
            fueling your own Flavor Rebellion.
          </p>
          <div
            className="mt-10 flex flex-wrap items-center gap-4 transition-opacity duration-1000"
            style={{ opacity: stage >= 2 ? 1 : 0, transitionDelay: "460ms" }}
          >
            <Link href="/sauces" className="btn btn-ember">
              explore the sauces
            </Link>
            <Link href="/story" className="btn btn-outline text-parchment">
              read the story
            </Link>
          </div>
        </div>

        <div className="relative mx-auto mt-4 w-full max-w-[20rem] sm:max-w-[25rem] lg:mt-0 lg:max-w-[29rem]">
          <div
            className="pointer-events-none absolute -inset-24 transition-opacity duration-[2000ms]"
            style={{
              opacity: stage === 0 ? 0 : stage === 1 ? 0.5 : 1,
              background: "radial-gradient(circle at 50% 44%, rgba(255,160,60,.30), transparent 64%)",
            }}
          />
          <div className="relative aspect-[2/3] overflow-hidden border border-brass/35 shadow-[0_0_45px_rgba(255,150,60,.18)]">
            <Image
              src="/images/Pepper Lantern Window.jpg"
              alt="Two glowing pepper-shaped lanterns in a window"
              fill
              priority
              sizes="(max-width: 1024px) 80vw, 30rem"
              className="object-cover transition-transform duration-[12s] ease-out motion-safe:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
