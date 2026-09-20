import Link from "next/link"
import { brandMotto, contactEmail, navLinks } from "@/lib/brand"
import EmbersField from "./embers-field"
import Lantern from "./lantern"
import { StarRule } from "./ornament"

export default function Footer() {
  return (
    <footer className="night-deep relative overflow-hidden border-t border-parchment/10 text-parchment">
      <div
        className="pointer-events-none absolute inset-x-0 -top-24 h-64"
        style={{ background: "radial-gradient(38rem 14rem at 50% 100%, rgba(255,150,60,.14), transparent 70%)" }}
        aria-hidden="true"
      />

      <EmbersField count={90} speed={0.34} scale={0.9} className="absolute inset-0 h-full w-full opacity-45" />

      <div className="relative mx-auto max-w-broadside px-6 pb-10 pt-20 sm:px-10">
        <div className="flex justify-center gap-6">
          <Lantern className="h-16 w-11 text-brass" />
          <Lantern delay={1.1} className="h-16 w-11 text-brass" />
        </div>
        <StarRule className="mx-auto mt-8 max-w-lg text-parchment" />
        <p className="display mx-auto mt-8 max-w-xl text-center text-[clamp(1.4rem,3.4vw,2.1rem)] uppercase leading-tight">
          Forged in Rebellion, Fueled by Flavor
        </p>

        <div className="mt-16 grid gap-12 border-t border-parchment/12 pt-12 sm:grid-cols-3">
          <div>
            <p className="display text-sm uppercase leading-[1.3] tracking-[.22em] text-parchment">
              Two If
              <br />
              By Pepper
            </p>
            <p className="fell mt-5 max-w-xs text-[.98rem] italic leading-7 text-parchment/55">{brandMotto}</p>
          </div>

          <nav aria-label="Footer">
            <p className="sc text-gold/80">explore</p>
            <ul className="mt-4 space-y-2 text-[.95rem] text-parchment/70">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-gold">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact" className="transition-colors hover:text-gold">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <p className="sc text-gold/80">light your lantern</p>
            <a href={`mailto:${contactEmail}`} className="mt-4 block break-all text-[.95rem] text-parchment/70 transition-colors hover:text-gold">
              {contactEmail}
            </a>
            <p className="mt-4 max-w-xs text-[.9rem] leading-7 text-parchment/50">
              Letters are answered by the person who cooked it.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-parchment/12 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="sc text-parchment/40">© {new Date().getFullYear()} two if by pepper</p>
          <a
            href="https://novusnyc.org"
            target="_blank"
            rel="noreferrer"
            className="sc text-parchment/40 transition-colors hover:text-gold"
          >
            made by novus
          </a>
        </div>
      </div>
    </footer>
  )
}
