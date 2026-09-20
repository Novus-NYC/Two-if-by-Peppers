import SignalHero from "@/lib/components/signal-hero"
import { Fleuron } from "@/lib/components/ornament"

export default function HomePage() {
  return (
    <>
      <SignalHero />
      <section className="night px-6 py-24 sm:px-10 lg:py-32">
        <div data-reveal="0" className="mx-auto max-w-3xl text-center text-parchment">
          <h2 className="display text-[clamp(2rem,5vw,3.4rem)] uppercase leading-[1.05]">
            Forged in Rebellion. Fueled by Flavor.
          </h2>
          <Fleuron className="mx-auto mt-8 text-parchment" />
          <p className="mx-auto mt-9 max-w-measure leading-8 text-parchment/75">
            Two If By Pepper crafts small-batch hot sauces born from a love of bold heat and handcrafted balance.
            Each bottle carries the spirit of independence and a rebellious refusal to settle for bland. From the
            first flame to the final pour, each sauce carries the torch of bold flavor, igniting your taste buds and
            fueling your own Flavor Rebellion.
          </p>
        </div>
      </section>
    </>
  )
}
