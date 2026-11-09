import Link from "next/link"
import { contactEmail, navLinks } from "@/lib/brand"
import EmbersField from "./embers-field"

export default function Footer() {
  return (
    <footer className="night-deep relative overflow-hidden border-t border-parchment/10 text-parchment">
      <div
        className="pointer-events-none absolute inset-x-0 -top-24 h-64"
        style={{ background: "radial-gradient(38rem 14rem at 50% 100%, rgba(255,150,60,.14), transparent 70%)" }}
        aria-hidden="true"
      />

      <EmbersField count={90} speed={0.34} scale={0.9} className="absolute inset-0 h-full w-full opacity-45" />

      <div className="relative mx-auto max-w-broadside px-6 pb-10 pt-16 sm:px-10">
        <div className="grid gap-12 sm:grid-cols-3">
          <div>
            <p className="display text-lg font-bold uppercase leading-[1.3] tracking-[.22em] text-goldlit">
              Two If
              <br />
              By Pepper
            </p>
            <p className="fell mt-5 max-w-xs text-[1.15rem] font-bold italic leading-7 text-parchment">Light Your Lanterns, Raise Your Spoon</p>
          </div>

          <nav aria-label="Footer">
            <p className="sc !text-[.9rem] font-bold text-goldlit">explore</p>
            <ul className="mt-4 space-y-2 text-[1.02rem] font-bold text-parchment">
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
            <p className="sc !text-[.9rem] font-bold text-goldlit">light your lantern</p>
            <a href={`mailto:${contactEmail}`} className="mt-4 block break-all text-[1.02rem] font-bold text-parchment transition-colors hover:text-gold">
              {contactEmail}
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-parchment/12 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="sc text-parchment/75">© {new Date().getFullYear()} two if by pepper</p>
          <a
            href="https://novusnyc.org"
            target="_blank"
            rel="noreferrer"
            className="sc text-parchment/75 transition-colors hover:text-gold"
          >
            made by novus
          </a>
        </div>
      </div>
    </footer>
  )
}
