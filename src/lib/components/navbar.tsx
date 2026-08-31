"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
const links = [{ href: "/sauces", label: "The Sauces" }, { href: "/story", label: "Our Story" }, { href: "/wholesale", label: "Stock the Rebellion" }]
export default function Navbar() {
  const [open, setOpen] = useState(false); const close = () => setOpen(false)
  return <header className="sticky top-0 z-50 border-b border-[#f3eee1]/15 bg-[#081126]/95 text-[#fff9e9] backdrop-blur-md"><nav className="mx-auto flex h-[74px] max-w-7xl items-center justify-between px-5 sm:px-8" aria-label="Primary navigation">
    <Link href="/" className="relative z-10 flex items-center gap-2" onClick={close} aria-label="Two If By Pepper home"><Image src="/Logo.PNG" width={52} height={52} className="h-10 w-10 object-contain" alt="" priority /><span className="display-font text-[.63rem] font-semibold uppercase tracking-[.12em] sm:text-xs">Two If By<br />Pepper</span></Link>
    <div className="hidden items-center gap-7 lg:flex">{links.map((link) => <Link key={link.href} href={link.href} className="mono text-[.69rem] uppercase tracking-[.1em] text-[#f3eee1]/80 transition hover:text-[#e6a339]">{link.label}</Link>)}<Link href="/contact" className="button-primary !py-3">Join the fight <span aria-hidden="true">↗</span></Link></div>
    <button className="relative z-10 grid h-11 w-11 place-items-center border border-[#f3eee1]/30 lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Close navigation menu" : "Open navigation menu"}><span className="mono text-sm">{open ? "×" : "☰"}</span></button>
    {open && <div id="mobile-nav" className="absolute inset-x-0 top-[73px] border-b border-[#f3eee1]/15 bg-[#081126] px-5 py-7 lg:hidden"><div className="flex flex-col gap-6">{links.map((link) => <Link key={link.href} href={link.href} onClick={close} className="display-font text-base uppercase tracking-wide">{link.label}</Link>)}<Link href="/contact" onClick={close} className="button-primary w-fit">Join the fight <span aria-hidden="true">↗</span></Link></div></div>}
  </nav></header>
}
