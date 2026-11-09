import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { contactEmail } from "@/lib/brand"
import DispatchForm from "@/lib/components/dispatch-form"
import Lantern from "@/lib/components/lantern"
import Sheet from "@/lib/components/sheet"
import { StarRule } from "@/lib/components/ornament"

export const metadata: Metadata = {
  title: "Send a Dispatch",
  description: "Questions, wholesale ideas, or a proper salute to the rebellion — write to Two If By Pepper.",
}

export default function ContactPage() {
  return (
    <>
      <section className="night-deep vignette relative overflow-hidden px-6 pb-20 pt-28 sm:px-10 lg:pb-24 lg:pt-36">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(48rem 28rem at 60% 6%, rgba(255,150,60,.15), transparent 66%)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-broadside items-center gap-14 lg:grid-cols-[1.05fr_.95fr]">
          <div className="text-parchment">
            <p className="sc !text-[1.05rem] font-bold text-goldlit">a message from the front</p>
            <h1 className="display mt-6 max-w-2xl text-[clamp(2.1rem,6vw,4rem)] uppercase leading-[1.03]">
              Send a dispatch
            </h1>
            <StarRule className="mt-9 max-w-md" />
            <p className="mt-8 max-w-measure leading-8 text-parchment/70">
              Sauce questions? Shop inquiries? Reports of weeping Redcoats? You&rsquo;ve come to the right place.
              Drop us a line&mdash;we&rsquo;d love to hear from you.
            </p>
            <div className="mt-10 flex gap-5">
              <Lantern className="h-16 w-11 text-brass" />
              <Lantern delay={1.1} className="h-16 w-11 text-brass" />
            </div>
          </div>

          <div className="relative aspect-[5/4] w-full overflow-hidden bg-night-900">
            <Image
              src="/images/Parchment.jpg"
              alt="Two If By Pepper parchment artwork"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night-900/70 to-transparent" />
          </div>
        </div>
      </section>

      <section className="night px-6 py-20 sm:px-10 lg:py-28">
        <div className="mx-auto grid max-w-broadside gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
          <aside data-reveal="0" className="text-parchment">
            <p className="sc text-gold/80">direct correspondence</p>
            <a
              href={`mailto:${contactEmail}`}
              className="display mt-5 block break-all text-xl uppercase leading-tight transition-colors hover:text-gold sm:text-2xl"
            >
              {contactEmail}
            </a>
            <hr className="rule-hair my-8" />
            <p className="max-w-xs leading-7 text-parchment/65">
              For a faster start, say where you are writing from and what sort of rebellion you have in mind.
            </p>
            <Link href="/sauces" className="sc mt-10 inline-block text-gold underline decoration-gold/40 underline-offset-8">
              view the sauces
            </Link>
          </aside>

          <Sheet reveal={1} className="p-6 sm:p-12">
            <DispatchForm
              heading="Write to the kitchen"
              intro="Everything below composes a letter in your own mail app — nothing is stored on this site."
              submitLabel="seal the dispatch"
              subjects={[
                "A question about the sauces",
                "Wholesale or stocking",
                "Events & gifting",
                "Just saying hello",
              ]}
            />
          </Sheet>
        </div>
      </section>
    </>
  )
}
