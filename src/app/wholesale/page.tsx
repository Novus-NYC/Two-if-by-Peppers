import type { Metadata } from "next"
import Image from "next/image"
import DispatchForm from "@/lib/components/dispatch-form"
import Sheet from "@/lib/components/sheet"
import { StarRule } from "@/lib/components/ornament"

export const metadata: Metadata = { title: "Wholesale", description: "Bring the Flavor Rebellion to your shelves." }

export default function WholesalePage() {
  return (
    <>
      <section className="night-deep vignette relative overflow-hidden px-6 pb-20 pt-28 sm:px-10 lg:pb-24 lg:pt-36">
        <div className="relative mx-auto grid max-w-broadside items-center gap-14 lg:grid-cols-[1.1fr_.9fr]">
          <div className="text-parchment">
            <p className="sc text-gold/80">wholesale &amp; collaboration</p>
            <h1 className="display mt-6 max-w-2xl text-[clamp(2.1rem,6vw,4rem)] uppercase leading-[1.03]">Bring the Flavor Rebellion to Your Shelves</h1>
            <StarRule className="mt-9 max-w-md" />
            <p className="mt-8 max-w-measure leading-8 text-parchment/70">Looking to add bold, small-batch flavor to your store, restaurant, or business? Two If By Pepper is always looking for new allies in the fight against bland.</p>
            <p className="mt-5 max-w-measure leading-8 text-parchment/70">Whether you&apos;re interested in carrying a few cases or building an ongoing wholesale partnership, we&apos;d love to learn more about your business and find an option that works for you.</p>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-sm"><div className="absolute inset-0" style={{ background: "radial-gradient(20rem 20rem at 50% 50%, rgba(255,150,60,.24), transparent 68%)" }} /><Image src="/Transparant Logo.png" alt="Two If By Pepper emblem" fill priority sizes="(max-width: 1024px) 80vw, 24rem" className="object-contain p-8" /></div>
        </div>
      </section>
      <section className="night px-6 py-20 sm:px-10 lg:py-28"><Sheet reveal={0} className="mx-auto max-w-3xl p-6 sm:p-14"><DispatchForm wholesale heading="Tell Us About Your Outpost" intro="Every business is different—and so are its wholesale needs. Rather than taking a one-size-fits-all approach, we&apos;d love to learn a little about your business, the products you&apos;re interested in, and the quantities you anticipate ordering. Share a few details below, and we&apos;ll work with you to provide wholesale options and pricing appropriate for your needs." submitLabel="Send the dispatch" subjects={["Wholesale inquiry", "Wholesale partnership", "Products and pricing"]} /></Sheet></section>
    </>
  )
}
