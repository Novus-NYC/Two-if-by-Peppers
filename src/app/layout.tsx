import type { Metadata } from "next"
import "./globals.css"
import Navbar from "@/lib/components/navbar"
import Footer from "@/lib/components/footer"
import Reveal from "@/lib/components/reveal"
import SvgDefs from "@/lib/components/svg-defs"

export const metadata: Metadata = {
  metadataBase: new URL("https://twoifbypepper.com"),
  title: { default: "Two If By Pepper | Forged in Rebellion, Fueled by Flavor", template: "%s | Two If By Pepper" },
  description:
    "Forged in rebellion, fueled by flavor. Small-batch hot sauce from two cooks who decided a ration ought to be worth sitting down for.",
  icons: { icon: "/brand-mark.svg" },
  openGraph: {
    title: "Two If By Pepper",
    description: "Small-batch hot sauce. Forged in rebellion, fueled by flavor.",
    images: ["/Bonney Mango Label.PNG"],
    type: "website",
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <SvgDefs />
        <Reveal />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
