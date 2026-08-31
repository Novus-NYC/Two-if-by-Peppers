import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { sauces } from "@/lib/brand"

export const metadata: Metadata = { title: "The Sauces", description: "Meet Tom Sage’s Lantern Fuel and Bonney Mango from Two If By Pepper." }

export default function SaucesPage() {
  return <>
    <section className="navy-grain overflow-hidden bg-[#101b3d] px-5 py-16 text-[#fff9e9] sm:px-8 lg:py-24"><div className="mx-auto max-w-7xl"><p className="eyebrow mb-5 text-[#e6a339]">The rebel roster</p><div className="grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-end"><h1 className="display-font max-w-4xl text-4xl font-semibold uppercase leading-[1.06] tracking-[-.06em] sm:text-6xl">Born to wake up your <span className="text-[#e6a339]">whole plate.</span></h1><p className="max-w-lg text-base leading-8 text-[#fff9e9]/75">There are two ways to join the movement. Find the character that calls to your table and let the Flavor Rebellion begin.</p></div></div></section>
    <section className="bg-[#fff9e9] px-5 py-16 sm:px-8 lg:py-24"><div className="mx-auto max-w-7xl space-y-16 lg:space-y-24">{sauces.map((sauce, index) => <article key={sauce.name} className={`grid overflow-hidden border border-[#101b3d]/20 ${index === 0 ? "lg:grid-cols-[.9fr_1.1fr]" : "lg:grid-cols-[1.1fr_.9fr]"}`}>
      <div className={`relative min-h-[360px] overflow-hidden ${index === 1 ? "lg:order-2" : ""}`}><Image src={sauce.image} alt={`${sauce.name} label artwork`} fill className="object-cover" priority={index === 0} sizes="(max-width: 1024px) 100vw, 50vw" /><div className="absolute left-5 top-5 grid h-12 w-12 place-items-center bg-[#fff9e9] mono text-xs text-[#101b3d]">{sauce.number}</div></div>
      <div className={`flex flex-col justify-between p-7 sm:p-10 lg:p-14 ${index === 0 ? "bg-[#e6a339] text-[#101b3d]" : "bg-[#101b3d] text-[#fff9e9]"}`}><div><p className="eyebrow opacity-70">Sauce {sauce.number}</p><h2 className="display-font mt-5 max-w-lg text-3xl font-semibold uppercase leading-[1.08] tracking-[-.05em] sm:text-5xl">{sauce.name}</h2><p className="mt-6 max-w-md text-base leading-8 opacity-80">{sauce.subtitle}. Created for the devoted heat seeker, the curious cook, and anyone with an appetite for a little rebellion.</p></div><div className="mt-12 border-t border-current/30 pt-6"><p className="mono text-[.67rem] uppercase tracking-[.13em] opacity-70">A signal to the flavor faithful</p><Link href="/contact" className="button-secondary mt-5">Ask about this sauce <span aria-hidden="true">↗</span></Link></div></div>
    </article>)}</div></section>
    <section className="bg-[#ca3c27] px-5 py-16 text-[#fff9e9] sm:px-8"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 sm:flex-row sm:items-center"><div><p className="eyebrow mb-2 text-[#e6a339]">Ready to rally?</p><h2 className="display-font text-2xl font-semibold uppercase tracking-[-.04em] sm:text-3xl">Bring the rebellion home.</h2></div><Link href="/contact" className="button-secondary w-fit">Light your lantern <span aria-hidden="true">↗</span></Link></div></section>
  </>
}
