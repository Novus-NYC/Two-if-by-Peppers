import type { Metadata } from "next"
import Image from "next/image"
import { articles, partnerTypes } from "@/lib/brand"
import DispatchForm from "@/lib/components/dispatch-form"
import Sheet from "@/lib/components/sheet"
import { Fleuron, StarRule, WaxSeal } from "@/lib/components/ornament"

export const metadata: Metadata = {
  title: "Wholesale",
  description: "Articles of association for shops, kitchens and gatherings that would like Two If By Pepper on the shelf.",
}

export default function WholesalePage() {
  return (
    <>
      <section className="night-deep vignette relative overflow-hidden px-6 pb-20 pt-28 sm:px-10 lg:pb-24 lg:pt-36">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(50rem 30rem at 30% 8%, rgba(255,150,60,.14), transparent 66%)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-broadside items-center gap-14 lg:grid-cols-[1.1fr_.9fr]">
          <div className="text-parchment">
            <p className="sc text-gold/80">wholesale &amp; collaboration</p>
            <h1 className="display mt-6 max-w-2xl text-[clamp(2.1rem,6vw,4rem)] uppercase leading-[1.03]">
              Put flavour on the front line
            </h1>
            <StarRule className="mt-9 max-w-md" />
            <p className="mt-8 max-w-measure leading-8 text-parchment/70">
              For independent shops, restaurant kitchens, market tables and events that would rather make a
              statement than take a back seat. Terms below, plainly stated.
            </p>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-sm">
            <div
              className="absolute inset-0"
              style={{ background: "radial-gradient(20rem 20rem at 50% 50%, rgba(255,150,60,.24), transparent 68%)" }}
              aria-hidden="true"
            />
            <Image
              src="/Transparant Logo.png"
              alt="Two If By Pepper emblem"
              fill
              priority
              sizes="(max-width: 1024px) 80vw, 24rem"
              className="object-contain p-8"
            />
          </div>
        </div>
      </section>

      <section className="night px-6 py-20 sm:px-10 lg:py-28">
        <Sheet reveal={0} className="mx-auto max-w-4xl p-6 sm:p-14 lg:p-20">
          <header className="text-center">
            <p className="sc opacity-60">between ourselves and the undersigned</p>
            <h2 className="display mt-4 text-[clamp(1.6rem,4.2vw,2.7rem)] uppercase leading-none">
              Articles of Association
            </h2>
            <hr className="rule-double mt-6" />
          </header>

          <ol className="mt-12 space-y-10">
            {articles.map((article) => (
              <li key={article.number} className="grid gap-5 sm:grid-cols-[4.5rem_1fr]">
                <span className="display text-3xl leading-none text-blood">{article.number}</span>
                <div>
                  <h3 className="display text-lg uppercase tracking-[.12em]">{article.title}</h3>
                  <p className="mt-3 max-w-measure leading-8 opacity-80">{article.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <Fleuron className="mt-14" />

          <div className="mt-12 flex flex-col items-center gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="w-full max-w-xs">
              <span className="block h-px w-full bg-ink/50" />
              <p className="sc mt-3 opacity-55">signed, on behalf of the kitchen</p>
            </div>
            <WaxSeal className="h-28 w-28 shrink-0" />
          </div>
        </Sheet>
      </section>

      <section className="night-deep border-y border-parchment/10 px-6 py-20 sm:px-10 lg:py-28">
        <div className="mx-auto max-w-broadside text-parchment">
          <p data-reveal="0" className="sc text-gold/80">good company</p>
          <div className="mt-10 grid gap-10 sm:grid-cols-3">
            {partnerTypes.map((type, index) => (
              <div key={type.number} data-reveal={index + 1} className="border-t border-parchment/20 pt-6">
                <p className="display text-2xl text-gold">{type.number}</p>
                <h3 className="display mt-5 text-lg uppercase tracking-[.1em]">{type.title}</h3>
                <p className="mt-3 leading-7 text-parchment/65">{type.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="night px-6 py-20 sm:px-10 lg:py-28">
        <Sheet reveal={0} className="mx-auto max-w-3xl p-6 sm:p-14">
          <DispatchForm
            heading="Sign on"
            intro="Tell us about the shelf, the kitchen, or the gathering. Dan reads these himself and answers within a couple of days."
            submitLabel="seal the dispatch"
            subjects={[
              "Wholesale — independent retail",
              "Wholesale — kitchen or bar",
              "Events & gifting",
              "Something else entirely",
            ]}
          />
        </Sheet>
      </section>
    </>
  )
}
