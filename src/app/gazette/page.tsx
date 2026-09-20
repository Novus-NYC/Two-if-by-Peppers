import type { Metadata } from "next"
import Lantern from "@/lib/components/lantern"
import Sheet from "@/lib/components/sheet"
import { StarRule } from "@/lib/components/ornament"

export const metadata: Metadata = {
  title: "The Pepper Gazette",
  description: "Dispatches from the Flavor Rebellion.",
}

export default function GazettePage() {
  return (
    <>
      <section className="night-deep vignette relative overflow-hidden px-6 pb-20 pt-28 sm:px-10 lg:pb-24 lg:pt-36">
        <div className="relative mx-auto max-w-broadside text-center text-parchment">
          <div className="flex justify-center gap-5"><Lantern className="h-14 w-10 text-brass" /><Lantern delay={1.1} className="h-14 w-10 text-brass" /></div>
          <h1 className="display mx-auto mt-9 max-w-3xl text-[clamp(2.1rem,6vw,4rem)] uppercase leading-[1.03]">The Pepper Gazette</h1>
          <StarRule className="mx-auto mt-8 max-w-md" />
          <p className="sc mt-6 text-gold/80">Dispatches from the Flavor Rebellion</p>
        </div>
      </section>
      <section className="night px-6 py-16 sm:px-10 lg:py-24">
        <Sheet reveal={0} className="mx-auto max-w-3xl p-6 sm:p-14 lg:p-20">
          <p className="sc text-blood">from the press</p>
          <div className="mt-7 space-y-6 text-[1.03rem] leading-8 opacity-85">
            <p>The presses are warming, the lanterns are being lit, and something bold is beginning to stir.</p>
            <p><strong>The Pepper Gazette</strong> is your source for the latest dispatches from the Flavor Rebellion. This is where we’ll share news from Two If By Pepper, including new sauce releases, flavors under development, upcoming events, special announcements, and whatever else our rebels may be plotting behind the scenes.</p>
            <p>There may not be much to report just yet—but don’t mistake the silence for surrender.</p>
            <p>Check back soon for the latest from the Flavor Rebellion.</p>
          </div>
        </Sheet>
      </section>
    </>
  )
}
