"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function ScrollMotion() {
  const pathname = usePathname()

  useEffect(() => {
    const root = document.documentElement
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section"))

    if (reduceMotion || !sections.length) {
      sections.forEach((section) => section.classList.add("is-revealed"))
      return
    }

    const revealNow = () => sections.forEach((section) => {
      if (section.getBoundingClientRect().top < window.innerHeight * 0.9) section.classList.add("is-revealed")
    })

    revealNow()
    root.dataset.motion = "ready"

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed")
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.08, rootMargin: "0px 0px -6%" })

    sections.forEach((section) => { if (!section.classList.contains("is-revealed")) observer.observe(section) })
    return () => { observer.disconnect(); delete root.dataset.motion }
  }, [pathname])

  return null
}
