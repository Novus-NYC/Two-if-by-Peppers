import Link from "next/link"
import { brandMotto, facts, gazette, sauces } from "@/lib/brand"
import HeatScale from "@/lib/components/heat-scale"
import SauceArt from "@/lib/components/sauce-art"
import Sheet from "@/lib/components/sheet"
import SignalHero from "@/lib/components/signal-hero"
import { Corners, Fleuron, StarRule } from "@/lib/components/ornament"

export default function HomePage() {
  return (
    <>
      <SignalHero />

      <section className="night border-y border-parchment/10">
        <div className="relative mx-auto flex max-w-broadside flex-col gap-8 px-6 py-9 sm:px-10 md:flex-row md:items-center md:justify-between">
          <p className="fell text-[1.15rem] italic text-parchment/80 sm:text-[1.3rem]">{brandMotto}</p>
          <dl className="flex flex-wrap gap-x-10 gap-y-3">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="sc text-parchment/45">{fact.label.toLowerCase()}</dt>
                <dd className="display mt-1 text-lg uppercase tracking-wide text-gold">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="night-deep px-6 py-20 sm:px-10 lg:py-28">
        <div className="mx-auto max-w-broadside">
          <div data-reveal="0" className="mx-auto max-w-2xl text-center">
            <p className="sc text-gold/80">two of them, and that is the point</p>
            <h2 className="display mt-5 text-[clamp(2rem,5.4vw,3.4rem)] uppercase leading-[1.05] text-parchment">
              Choose your co-conspirator
            </h2>
            <Fleuron className="mt-7 text-parchment" />
          </div>

          <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-14">
            {sauces.map((sauce, index) => (
              <article key={sauce.slug} data-reveal={index + 1} className="group">
                <Link href={`/sauces#${sauce.slug}`} className="block">
                  <div className="relative aspect-[4/3] overflow-hidden border border-parchment/12 bg-night-900">
                    <div
                      className="absolute inset-0"
                      style={{ background: `radial-gradient(24rem 18rem at 50% 50%, ${sauce.accent}26, transparent 72%)` }}
                    />
                    <SauceArt
                      src={sauce.art}
                      alt={`${sauce.name} artwork`}
                      fit={sauce.artFit}
                      blend={sauce.artGlow}
                      sizes="(max-width: 1024px) 100vw, 46vw"
                      className="transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-night-900/70 via-transparent to-transparent" />
                    <Corners className="m-4 text-parchment/40" />
                    <span className="display absolute left-7 top-6 text-xl tracking-[.2em] text-parchment/60">
                      {sauce.number}
                    </span>
                  </div>

                  <h3 className="display mt-7 text-[clamp(1.5rem,3.2vw,2.2rem)] uppercase leading-tight text-parchment transition-colors group-hover:text-gold">
                    {sauce.shortName}
                  </h3>
                  <p className="fell mt-2 text-[1.05rem] italic text-parchment/60">{sauce.epithet}</p>
                </Link>

                <div className="mt-6 flex flex-wrap items-end justify-between gap-6 border-t border-parchment/12 pt-6 text-parchment">
                  <HeatScale value={sauce.heat} label={sauce.heatName} />
                  <Link href={`/sauces#${sauce.slug}`} className="sc text-gold underline decoration-gold/40 underline-offset-8 transition-colors hover:decoration-gold">
                    read the dossier
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="night relative overflow-hidden px-6 py-24 sm:px-10 lg:py-32">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(48rem 30rem at 18% 30%, rgba(255,140,50,.12), transparent 66%)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-broadside items-center gap-14 lg:grid-cols-[1fr_1.05fr]">
          <div data-reveal="0">
            <p className="sc text-gold/80">the origin</p>
            <h2 className="display mt-5 text-[clamp(2rem,5vw,3.2rem)] uppercase leading-[1.06] text-parchment">
              Two rebels.
              <br />
              One signal.
            </h2>
            <StarRule className="mt-8 max-w-xs text-parchment" />
            <p className="mt-8 max-w-measure leading-8 text-parchment/70">
              Their cooking was declared seditious, which was generous — it was mostly just hot. Barred from the
              market and watched at the docks, they needed a way to say <em className="italic text-parchment/90">the
              pot is on</em> without saying anything at all.
            </p>
            <Link href="/story" className="btn btn-outline mt-10 text-parchment">
              read the gazette
            </Link>
          </div>

          <Sheet reveal={1} tilt={-0.6} className="p-6 sm:p-14">
            <p className="sc text-blood">{gazette.dateline.toLowerCase()}</p>
            <hr className="rule-double my-6 text-ink" />
            <h3 className="display text-[clamp(1.5rem,3vw,2.1rem)] uppercase leading-tight">The Signal</h3>
            <p className="dropcap mt-6 text-[1.02rem] leading-8">{gazette.chapters[1].body}</p>
            <hr className="rule-hair my-7 text-ink" />
            <p className="fell text-center text-[1.05rem] italic opacity-70">
              One if by land. Two if by sea. Two, always, if by pepper.
            </p>
          </Sheet>
        </div>
      </section>

      <section className="night-deep border-t border-parchment/10 px-6 py-24 sm:px-10 lg:py-28">
        <div data-reveal="0" className="mx-auto max-w-3xl text-center text-parchment">
          <p className="sc text-gold/80">for shops, kitchens and gatherings</p>
          <h2 className="display mt-5 text-[clamp(1.9rem,4.6vw,3rem)] uppercase leading-[1.08]">
            Make your shelf a rallying point
          </h2>
          <p className="mx-auto mt-7 max-w-measure leading-8 text-parchment/65">
            No minimum so punishing a small shop cannot say yes. We would rather be on ten good shelves than a
            hundred indifferent ones.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/wholesale" className="btn btn-ember">
              stock the rebellion
            </Link>
            <Link href="/contact" className="btn btn-outline">
              send a dispatch
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
