import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { gazette } from "@/lib/brand"
import LanternReveal from "@/lib/components/lantern-reveal"
import Lantern from "@/lib/components/lantern"
import Sheet from "@/lib/components/sheet"
import { Fleuron, StarRule } from "@/lib/components/ornament"

export const metadata: Metadata = {
  title: "The Story",
  description: "The Pepper Gazette — how two cooks turned a bland ration into a signal in a window.",
}

export default function StoryPage() {
  return (
    <>
      <section className="night-deep vignette relative overflow-hidden px-6 pb-20 pt-28 sm:px-10 lg:pb-24 lg:pt-36">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(50rem 30rem at 50% 4%, rgba(255,150,60,.15), transparent 66%)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-broadside text-center text-parchment">
          <div className="flex justify-center gap-5">
            <Lantern className="h-14 w-10 text-brass" />
            <Lantern delay={1.1} className="h-14 w-10 text-brass" />
          </div>
          <h1 className="display mx-auto mt-9 max-w-3xl text-[clamp(2.1rem,6vw,4rem)] uppercase leading-[1.03]">
            The Pepper Gazette
          </h1>
          <StarRule className="mx-auto mt-8 max-w-md" />
          <p className="sc mt-6 text-gold/80">{gazette.dateline.toLowerCase()}</p>
        </div>
      </section>

      <section className="night px-6 py-16 sm:px-10 lg:py-24">
        <Sheet reveal={0} className="mx-auto max-w-5xl p-6 sm:p-14 lg:p-20">
          <header className="text-center">
            <p className="sc opacity-60">printed for the flavour faithful — price, one pepper</p>
            <h2 className="display mt-4 text-[clamp(1.7rem,4.6vw,3rem)] uppercase leading-none">
              Two Lanterns Over the Harbour
            </h2>
            <hr className="rule-double mt-6" />
            <p className="fell mt-4 text-[1.05rem] italic opacity-75">
              An account of two cooks, one harbour, and the two lanterns that started it
            </p>
            <hr className="rule-hair mt-4" />
          </header>

          <div className="columns-gazette mt-12 text-[1.01rem] leading-8 sm:columns-2">
            {gazette.chapters.map((chapter, index) => (
              <div key={chapter.number} className={index === 0 ? "" : "mt-8"}>
                <h3 className="display text-lg uppercase tracking-[.14em]">
                  {chapter.number}. {chapter.title}
                </h3>
                <p className={`mt-3 ${index === 0 ? "dropcap" : ""}`}>{chapter.body}</p>
              </div>
            ))}
          </div>

          <Fleuron className="mt-12" />

          <div className="mt-12 grid gap-10 sm:grid-cols-[1.1fr_.9fr] sm:items-center">
            <div className="relative aspect-[5/4] overflow-hidden border border-ink/25 bg-night-900">
              <Image
                src="/Transparant Logo.png"
                alt="Two pepper-shaped lanterns burning in a window"
                fill
                sizes="(max-width: 640px) 100vw, 44vw"
                className="object-contain p-6"
              />
            </div>
            <figcaption className="text-[.95rem] leading-7">
              <p className="sc opacity-60">the mark itself</p>
              <p className="mt-3 opacity-80">
                Two peppers, two flames, one window. Cut from tin and hung where the water could see them — which
                is to say, hung where everyone could see them, and only some would understand.
              </p>
            </figcaption>
          </div>
        </Sheet>
      </section>

      <section className="night-deep relative overflow-hidden border-y border-parchment/10">
        <LanternReveal>
          <div className="relative mx-auto max-w-broadside px-6 py-28 text-center text-parchment sm:px-10 lg:py-40">
            <p className="sc text-gold/70">hold the lantern up</p>
            <p className="display mx-auto mt-8 max-w-4xl text-[clamp(1.5rem,4.2vw,2.9rem)] uppercase leading-[1.18]">
              In a dark window, two flames. To the harbour it was a warning. To anyone hungry it was an invitation.
              It has meant the second thing ever since.
            </p>
            <div className="mt-14 flex justify-center gap-6">
              <Lantern className="h-20 w-14 text-brass" />
              <Lantern delay={1.3} className="h-20 w-14 text-brass" />
            </div>
          </div>
        </LanternReveal>
      </section>

      <section className="night px-6 py-24 sm:px-10 lg:py-32">
        <div className="mx-auto grid max-w-broadside items-center gap-14 lg:grid-cols-[1fr_.9fr]">
          <div data-reveal="0" className="text-parchment">
            <p className="sc text-gold/80">your place in it</p>
            <h2 className="display mt-5 text-[clamp(1.9rem,4.8vw,3.1rem)] uppercase leading-[1.06]">
              The signal is still lit
            </h2>
            <StarRule className="mt-8 max-w-xs" />
            <p className="mt-8 max-w-measure leading-8 text-parchment/70">
              It stopped meaning <em className="italic">come quickly</em> and started meaning{" "}
              <em className="italic">come hungry</em>, and it has meant that ever since. Casual heat-seeker or
              full-blown spice revolutionary — the door is open either way.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/sauces" className="btn btn-ember">
                find your sauce
              </Link>
              <Link href="/wholesale" className="btn btn-outline text-parchment">
                stock the rebellion
              </Link>
            </div>
          </div>

          <div data-reveal="1" className="relative aspect-square overflow-hidden bg-night-900">
            <Image
              src="/Tom Sage's Lantern Fuel Label.PNG"
              alt="Tom Sage’s Lantern Fuel label"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-center"
            />
            <div
              className="absolute inset-0"
              style={{ background: "radial-gradient(24rem 20rem at 50% 45%, rgba(255,120,40,.2), transparent 70%)" }}
            />
          </div>
        </div>
      </section>
    </>
  )
}
