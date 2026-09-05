"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { navLinks } from "@/lib/brand"
import Lantern from "./lantern"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-500 ${
        scrolled || open ? "bg-night-900/95 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div
        className={`transition-opacity duration-500 ${scrolled || open ? "opacity-100" : "opacity-0"}`}
        aria-hidden="true"
      >
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brass/50 to-transparent" />
      </div>

      <nav
        className="relative mx-auto flex h-[80px] max-w-broadside items-center justify-between px-6 sm:px-10"
        aria-label="Primary"
      >
        <Link href="/" className="group flex items-center gap-3.5" aria-label="Two If By Pepper, home">
          <span className="flex gap-1">
            <Lantern className="h-9 w-6 text-brass" />
            <Lantern delay={1.1} className="h-9 w-6 text-brass" />
          </span>
          <span className="display text-[.78rem] uppercase leading-[1.15] tracking-[.2em] text-parchment transition-colors group-hover:text-gold">
            Two If
            <br />
            By Pepper
          </span>
        </Link>

        <div className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`sc relative transition-colors ${active ? "text-gold" : "text-parchment/70 hover:text-gold"}`}
              >
                {link.label.toLowerCase()}
                <span
                  className={`absolute -bottom-2 left-0 h-px bg-gold transition-all duration-300 ${
                    active ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            )
          })}
          <Link href="/contact" className="btn btn-ember !py-2.5 !text-[.78rem]">
            send a dispatch
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative h-11 w-11 border border-parchment/25 text-parchment lg:hidden"
        >
          <span
            className={`absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 bg-current transition-transform duration-300 ${
              open ? "rotate-45" : "-translate-y-[5px]"
            }`}
          />
          <span
            className={`absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 bg-current transition-transform duration-300 ${
              open ? "-rotate-45" : "translate-y-[5px]"
            }`}
          />
        </button>
      </nav>

      {open && (
        <div id="mobile-nav" className="night-deep fixed inset-x-0 bottom-0 top-[80px] lg:hidden">
          <div className="flex h-full flex-col justify-between px-6 py-12">
            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="display text-3xl uppercase tracking-wide text-parchment">
                  {link.label}
                </Link>
              ))}
              <Link href="/contact" className="display text-3xl uppercase tracking-wide text-gold">
                Contact
              </Link>
            </div>
            <p className="sc text-parchment/45">forged in rebellion — fueled by flavor</p>
          </div>
        </div>
      )}
    </header>
  )
}
