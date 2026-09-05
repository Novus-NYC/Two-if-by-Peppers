"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

export default function Reveal() {
  const pathname = usePathname()

  useEffect(() => {
    const root = document.documentElement
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.removeAttribute("data-motion")
      return
    }
    root.setAttribute("data-motion", "on")

    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          const step = Number(el.dataset.reveal) || 0
          el.style.transitionDelay = `${step * 0.11}s`
          el.classList.add("revealed")
          observer.unobserve(el)
        })
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
    )

    targets.forEach((el) => {
      el.classList.remove("revealed")
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [pathname])

  return null
}
