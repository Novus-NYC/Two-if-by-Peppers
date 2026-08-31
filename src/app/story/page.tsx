import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = { title: "The Story", description: "The origin of the Flavor Rebellion and the signal of Two If By Pepper." }

const chapters = [
  ["01", "The spark", "In the heart of the 1770s, while muskets roared and liberty stirred, two culinary rebels decided the colonies deserved more than bland rations."],
  ["02", "The signal", "When their spicy creations were deemed too radical, Tom Sage and Bonney Mango devised a quiet rallying cry: two pepper-shaped lanterns glowing in the window."],
  ["03", "The rebellion", "Those fiery beacons declared allegiance to bold flavor. Today, every bottle carries that torch for anyone ready to defy the dull."],
]

export default function StoryPage() {
  return <>
    <section className="paper-grain overflow-hidden bg-[#f3eee1] px-5 py-16 sm:px-8 lg:py-24"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center"><div><p className="eyebrow mb-5 text-[#ca3c27]">The tale of the two lanterns</p><h1 className="display-font max-w-3xl text-4xl font-semibold uppercase leading-[1.06] tracking-[-.06em] text-[#101b3d] sm:text-6xl">Flavor, like freedom, is worth <span className="text-[#ca3c27]">fighting for.</span></h1><p className="mt-8 max-w-xl text-base leading-8 text-[#101b3d]/80">Two If By Pepper is inspired by the Flavor Rebellion of the American Revolution. It is a spirited tribute to the people who believe a little boldness can change the whole meal.</p></div><div className="relative mx-auto w-full max-w-lg"><div className="absolute inset-0 -rotate-3 border-2 border-[#ca3c27]" /><div className="relative aspect-square overflow-hidden bg-[#101b3d]"><Image src="/Transparant Logo.png" alt="Two glowing pepper-shaped lanterns" fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 45vw" /></div></div></div></section>
    <section className="bg-[#101b3d] px-5 py-16 text-[#fff9e9] sm:px-8 lg:py-24"><div className="mx-auto max-w-7xl"><p className="eyebrow mb-10 text-[#e6a339]">Dispatches from the Flavor Rebellion</p><div className="grid border-y border-[#fff9e9]/25 lg:grid-cols-3">{chapters.map(([number, title, body]) => <article key={number} className="border-b border-[#fff9e9]/25 py-9 last:border-b-0 lg:border-b-0 lg:border-r lg:px-9 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"><p className="display-font text-3xl font-semibold text-[#e6a339]">{number}</p><h2 className="display-font mt-10 text-2xl font-semibold uppercase tracking-[-.05em]">{title}</h2><p className="mt-5 text-sm leading-7 text-[#fff9e9]/75">{body}</p></article>)}</div></div></section>
    <section className="bg-[#fff9e9] px-5 py-16 sm:px-8 lg:py-24"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center"><div className="relative aspect-[4/3] overflow-hidden border border-[#101b3d]/20"><Image src="/Tom Sage's Lantern Fuel Label.PNG" alt="Tom Sage, a Two If By Pepper Flavor Rebellion character" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" /></div><div><p className="eyebrow mb-5 text-[#ca3c27]">Your place in the story</p><h2 className="display-font max-w-2xl text-3xl font-semibold uppercase leading-tight tracking-[-.05em] text-[#101b3d] sm:text-5xl">The movement is still gathering.</h2><p className="mt-6 max-w-xl text-base leading-8 text-[#101b3d]/80">Whether you are a casual heat-seeker or a full-blown spice revolutionary, you are part of the movement now. Light your lanterns. Raise your spoon. The rebellion lives on.</p><Link href="/sauces" className="button-primary mt-8">Find your sauce <span aria-hidden="true">↗</span></Link></div></div></section>
  </>
}
