import type { Metadata } from "next"
import "./globals.css"
import Navbar from "@/lib/components/navbar"
import Footer from "@/lib/components/footer"

export const metadata: Metadata = {
  title: { default: "Two If By Pepper | The Flavor Rebellion", template: "%s | Two If By Pepper" },
  description: "Forged in rebellion, fueled by flavor. Bold sauces for the spice revolutionary.",
  icons: { icon: "/brand-mark.svg" },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className="min-h-screen flex flex-col"><Navbar /><main className="flex-1">{children}</main><Footer /></body></html>
}
