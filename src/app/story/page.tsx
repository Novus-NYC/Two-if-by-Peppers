import type { Metadata } from "next"
import Link from "next/link"
import Lantern from "@/lib/components/lantern"
import Sheet from "@/lib/components/sheet"
import { Fleuron, StarRule } from "@/lib/components/ornament"

export const metadata: Metadata = {
  title: "The Story",
  description: "The story of Tom Sage, Bonney Mango, and the Flavor Rebellion.",
}

const chapters = [
  {
    title: "Every Revolution begins with a Spark",
    paragraphs: [
      "It was the 1770s. Revolution was brewing across the colonies; independence was in the air…and dinner was terribly bland.",
      "While patriots fought for liberty, two unlikely culinary rebels—Tom Sage and Bonney Mango—were waging a rebellion of their own.",
      "Armed with peppers, herbs, fruit, and an unwavering belief that even the humblest ration deserved bold flavor, Tom and Bonney began crafting fiery sauces unlike anything the colonies had tasted before. What started as a simple mission to bring flavor to the table soon became something much bigger.",
      "A spark had been lit. And a rebellion was about to begin.",
    ],
  },
  {
    title: "The Resistance",
    paragraphs: [
      "But flavor, like freedom, has a way of attracting resistance. As word of Tom and Bonney’s fiery creations spread, so did their following. Patriots desperate for something—anything—to rescue their bland rations began seeking out the pair and their increasingly bold blends. Before long, their sauces were doing more than adding a little fire to supper; they were becoming a small but spirited part of the rebellion.",
      "The British, however, were far less enthusiastic. Deeming Tom and Bonney’s creations too bold, too fiery, and entirely too rebellious, they sought to put an end to the growing culinary uprising. But Tom and Bonney had no intention of surrendering. If the patriots could no longer come looking for the flavor, Tom and Bonney would simply have to find another way to get the flavor to them.",
      "And for that, they would need a signal.",
    ],
  },
  {
    title: "The Lantern Signal",
    paragraphs: [
      "Every good rebellion needs a secret code, and Tom and Bonney’s was impossible to mistake. Two glowing, pepper-shaped lanterns placed in a window became a quiet signal to those who knew what to look for. When the lanterns were lit, Tom and Bonney knew another household was ready to join their growing rebellion—and, more importantly, desperately in need of something flavorful for supper.",
      "Under the cover of darkness, their sauces found their way into kitchens, taverns, and rebel camps, passed from one flavor-starved patriot to the next. What began as a secret signal soon became a symbol: two fiery lights in a window meant bold flavor could still be found, even when the opposition wanted it extinguished.",
      "And so, beneath the glow of two pepper-shaped lanterns, the Flavor Rebellion was born.",
    ],
  },
  {
    title: "Join the Flavor Rebellion",
    paragraphs: [
      "The lanterns are lit. The sauces are ready. And there’s always room for one more rebel.",
      "Joining the Flavor Rebellion doesn’t require secret meetings, midnight deliveries, or plotting against the Crown. It simply requires a belief that life is too short for bland food.",
      "Light your lanterns; the Rebellion lives on.",
    ],
  },
]

export default function StoryPage() {
  return (
    <>
      <section className="night-deep vignette relative overflow-hidden px-6 pb-20 pt-28 sm:px-10 lg:pb-24 lg:pt-36">
        <div className="relative mx-auto max-w-broadside text-center text-parchment">
          <div className="flex justify-center gap-5"><Lantern className="h-14 w-10 text-brass" /><Lantern delay={1.1} className="h-14 w-10 text-brass" /></div>
          <h1 className="display mx-auto mt-9 max-w-3xl text-[clamp(2.1rem,6vw,4rem)] uppercase leading-[1.03]">The Story</h1>
          <StarRule className="mx-auto mt-8 max-w-md" />
        </div>
      </section>
      <section className="night px-6 py-16 sm:px-10 lg:py-24">
        <Sheet reveal={0} className="mx-auto max-w-4xl p-6 sm:p-14 lg:p-20">
          {chapters.map((chapter, index) => (
            <article key={chapter.title} className={index ? "mt-14 border-t border-ink/20 pt-14" : ""}>
              <h2 className="display text-[clamp(1.5rem,4vw,2.4rem)] uppercase leading-tight">{chapter.title}</h2>
              <div className="mt-6 space-y-5 leading-8 opacity-85">
                {chapter.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </article>
          ))}
          <Fleuron className="mt-14" />
        </Sheet>
      </section>
      <section className="night-deep px-6 py-20 text-center sm:px-10">
        <Link href="/sauces" className="btn btn-ember">explore the sauces</Link>
      </section>
    </>
  )
}
