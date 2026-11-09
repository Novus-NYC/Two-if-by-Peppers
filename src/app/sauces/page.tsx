import type { Metadata } from "next"
import { sauces } from "@/lib/brand"
import HeatScale from "@/lib/components/heat-scale"
import SauceArt from "@/lib/components/sauce-art"
import { Corners, StarRule } from "@/lib/components/ornament"

export const metadata: Metadata = {
  title: "The Sauces",
  description: "Small-batch hot sauces inspired by rebellious spirit and handcrafted balance.",
}

const backstories = [
  "Inspired by Tom Sage—the botanist and rebel who knew his way around both the garden and the rebellion—Lantern Fuel is crafted for those who like their flavor bold, their heat unapologetic, and their food anything but bland.",
  "Inspired by Bonney Mango—the fearless rebel whose fiery spirit helped ignite the Flavor Rebellion—this sauce is crafted for those who like their heat with a little sweetness, their flavor unapologetically bold, and their food anything but ordinary.",
]

export default function SaucesPage() {
  return (
    <>
      <section className="night-deep vignette relative overflow-hidden px-6 pb-20 pt-28 sm:px-10 lg:pb-24 lg:pt-36">
        <div className="relative mx-auto max-w-broadside text-center text-parchment">
          <h1 className="display mx-auto max-w-3xl text-[clamp(2.2rem,6.4vw,4.2rem)] uppercase leading-[1.02]">
            Meet the Flavors of the Rebellion
          </h1>
          <StarRule className="mx-auto mt-9 max-w-md" />
          <p className="mx-auto mt-8 max-w-measure leading-8 text-parchment/65">
            Small-batch hot sauces inspired by rebellious spirit, handcrafted balance, and the belief that bold
            flavor is worth fighting for. From bright and savory to sweet and fiery, discover the small-batch sauces
            of Two If By Pepper.
          </p>
        </div>
      </section>

      {sauces.map((sauce, index) => (
        <section
          key={sauce.slug}
          id={sauce.slug}
          className={`${index % 2 === 0 ? "night" : "night-deep"} scroll-mt-24 border-t border-parchment/10 px-6 py-20 sm:px-10 lg:py-28`}
        >
          <div className={`mx-auto grid max-w-broadside items-center gap-12 lg:gap-16 ${index % 2 === 0 ? "lg:grid-cols-[.95fr_1.05fr]" : "lg:grid-cols-[1.05fr_.95fr]"}`}>
            <div data-reveal="0" className={`relative ${index % 2 === 1 ? "lg:order-2" : ""}`}>
              <div className="relative aspect-[4/5] overflow-hidden border border-parchment/12 bg-night-900">
                <SauceArt src={sauce.image} alt={`${sauce.name} bottle`} fit="contain" priority={index === 0} sizes="(max-width: 1024px) 100vw, 48vw" />
                <div className="absolute inset-0" style={{ background: `radial-gradient(30rem 24rem at 50% 55%, ${sauce.accent}22, transparent 72%)` }} />
                <Corners className="m-5 text-parchment/45" />
              </div>
              <div className="mt-8 text-parchment"><HeatScale value={sauce.heat} /></div>
            </div>
            <div data-reveal="1" className={`text-parchment ${index % 2 === 1 ? "lg:order-1" : ""}`}>
              <h2 className="display text-[clamp(1.9rem,5vw,3.3rem)] uppercase leading-[1.04]">{sauce.name}</h2>
              <p className="fell mt-4 text-[1.15rem] italic text-parchment/75">{sauce.epithet}</p>
              <hr className="rule-hair my-9" />
              <p className="max-w-measure leading-8 text-parchment/75">{sauce.dossier}</p>
              <p className="mt-7 max-w-measure leading-8 text-parchment/75">{backstories[index]}</p>
            </div>
          </div>
        </section>
      ))}
    </>
  )
}
