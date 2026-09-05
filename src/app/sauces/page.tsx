import type { Metadata } from "next"
import Link from "next/link"
import { sauces } from "@/lib/brand"
import HeatScale from "@/lib/components/heat-scale"
import SauceArt from "@/lib/components/sauce-art"
import Sheet from "@/lib/components/sheet"
import { Corners, Fleuron, StarRule } from "@/lib/components/ornament"

export const metadata: Metadata = {
  title: "The Sauces",
  description:
    "Tom Sage’s Lantern Fuel and Bonney Mango — two small-batch hot sauces, two entirely different arguments.",
}

export default function SaucesPage() {
  return (
    <>
      <section className="night-deep vignette relative overflow-hidden px-6 pb-20 pt-28 sm:px-10 lg:pb-24 lg:pt-36">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(52rem 32rem at 50% 0%, rgba(255,140,50,.16), transparent 68%)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-broadside text-center text-parchment">
          <p className="sc text-gold/80">the roster</p>
          <h1 className="display mx-auto mt-6 max-w-3xl text-[clamp(2.2rem,6.4vw,4.2rem)] uppercase leading-[1.02]">
            Two sauces. Two entirely different arguments.
          </h1>
          <StarRule className="mx-auto mt-9 max-w-md" />
          <p className="mx-auto mt-8 max-w-measure leading-8 text-parchment/65">
            One smoulders. One arrives all at once. Neither of them apologises. Find the character that suits your
            table and let the rest sort itself out.
          </p>
        </div>
      </section>

      {sauces.map((sauce, index) => (
        <section
          key={sauce.slug}
          id={sauce.slug}
          className={`${index % 2 === 0 ? "night" : "night-deep"} scroll-mt-24 border-t border-parchment/10 px-6 py-20 sm:px-10 lg:py-28`}
        >
          <div
            className={`mx-auto grid max-w-broadside items-center gap-12 lg:gap-16 ${
              index % 2 === 0 ? "lg:grid-cols-[.95fr_1.05fr]" : "lg:grid-cols-[1.05fr_.95fr]"
            }`}
          >
            <div data-reveal="0" className={`relative ${index % 2 === 1 ? "lg:order-2" : ""}`}>
              <div
                className="relative overflow-hidden border border-parchment/12 bg-night-900"
                style={{ aspectRatio: sauce.labelAspect.replace("/", " / ") }}
              >
                <SauceArt
                  src={sauce.image}
                  alt={`${sauce.name} label`}
                  fit="contain"
                  priority={index === 0}
                  sizes="(max-width: 1024px) 100vw, 48vw"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: `radial-gradient(30rem 24rem at 50% 55%, ${sauce.accent}22, transparent 72%)` }}
                />
                <Corners className="m-5 text-parchment/45" />
              </div>
              <div className="mt-8 flex items-end justify-between gap-6 text-parchment">
                <HeatScale value={sauce.heat} label={sauce.heatName} />
                <p className="display text-4xl tracking-[.24em] text-parchment/30">{sauce.number}</p>
              </div>
            </div>

            <div data-reveal="1" className={`text-parchment ${index % 2 === 1 ? "lg:order-1" : ""}`}>
              <p className="sc text-gold/80">dossier no. {sauce.number.toLowerCase()}</p>
              <h2 className="display mt-5 text-[clamp(1.9rem,5vw,3.3rem)] uppercase leading-[1.04]">{sauce.name}</h2>
              <p className="fell mt-4 text-[1.15rem] italic text-parchment/65">{sauce.epithet}</p>

              <hr className="rule-hair my-9" />

              <p className="max-w-measure leading-8 text-parchment/75">{sauce.dossier}</p>

              <div className="mt-10 grid gap-9 sm:grid-cols-2">
                <div>
                  <p className="sc text-gold/70">tasting notes</p>
                  <ul className="mt-4 space-y-2 text-[.98rem] text-parchment/75">
                    {sauce.notes.map((note) => (
                      <li key={note} className="flex gap-3">
                        <span className="mt-[.6em] h-1 w-1 shrink-0 rotate-45 bg-brass" aria-hidden="true" />
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="sc text-gold/70">muster with</p>
                  <ul className="mt-4 space-y-2 text-[.98rem] text-parchment/75">
                    {sauce.muster.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-[.6em] h-1 w-1 shrink-0 rotate-45 bg-brass" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10 border-l-2 border-brass/50 pl-6">
                <p className="fell text-[1.2rem] italic leading-8 text-parchment/85">“{sauce.report}”</p>
                <p className="sc mt-3 text-parchment/45">{sauce.reporter.toLowerCase()}</p>
              </div>

              <p className="mt-9 max-w-measure text-[.96rem] leading-8 text-parchment/55">{sauce.build}</p>

              <Link href="/contact" className="btn btn-ember mt-9">
                ask about this one
              </Link>
            </div>
          </div>
        </section>
      ))}

      <section className="night-deep border-t border-parchment/10 px-6 py-24 sm:px-10 lg:py-32">
        <div className="mx-auto max-w-broadside">
          <div data-reveal="0" className="mx-auto max-w-xl text-center text-parchment">
            <p className="sc text-gold/80">side by side</p>
            <h2 className="display mt-5 text-[clamp(1.8rem,4.4vw,2.8rem)] uppercase leading-tight">The ledger</h2>
            <Fleuron className="mt-7" />
          </div>

          <Sheet reveal={1} className="mx-auto mt-14 max-w-4xl p-6 sm:p-14">
            <div className="-mx-1 overflow-x-auto px-1">
            <table className="w-full min-w-[32rem] text-left align-top">
              <caption className="sr-only">A comparison of the two sauces</caption>
              <thead>
                <tr className="border-b-2 border-ink/40">
                  <th scope="col" className="sc pb-4 opacity-60">
                    &nbsp;
                  </th>
                  {sauces.map((sauce) => (
                    <th key={sauce.slug} scope="col" className="display pb-4 pl-5 text-lg uppercase leading-tight sm:text-xl">
                      {sauce.shortName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-[.95rem]">
                <tr className="border-b border-ink/15">
                  <th scope="row" className="sc py-5 opacity-60">
                    heat
                  </th>
                  {sauces.map((sauce) => (
                    <td key={sauce.slug} className="py-5 pl-5 text-ink">
                      <HeatScale value={sauce.heat} size="sm" />
                      <span className="mt-2 block italic opacity-70">{sauce.heatName}</span>
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-ink/15">
                  <th scope="row" className="sc py-5 opacity-60">
                    character
                  </th>
                  {sauces.map((sauce) => (
                    <td key={sauce.slug} className="py-5 pl-5 leading-7">
                      {sauce.tagline}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-ink/15">
                  <th scope="row" className="sc py-5 opacity-60">
                    leads with
                  </th>
                  {sauces.map((sauce) => (
                    <td key={sauce.slug} className="py-5 pl-5 leading-7">
                      {sauce.notes.slice(0, 3).join(", ")}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row" className="sc py-5 opacity-60">
                    best on
                  </th>
                  {sauces.map((sauce) => (
                    <td key={sauce.slug} className="py-5 pl-5 leading-7">
                      {sauce.muster.slice(0, 2).join(", ")}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
            </div>
          </Sheet>

          <div data-reveal="2" className="mt-16 text-center">
            <p className="fell text-[1.2rem] italic text-parchment/70">Or settle it the honest way and take both.</p>
            <Link href="/contact" className="btn btn-ember mt-7">
              light your lantern
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
