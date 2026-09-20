"use client"

import { useState } from "react"
import { contactEmail } from "@/lib/brand"
import { WaxSeal } from "./ornament"

type DispatchFormProps = {
  subjects: string[]
  heading: string
  submitLabel: string
  intro: string
  wholesale?: boolean
}

export default function DispatchForm({ subjects, heading, submitLabel, intro, wholesale = false }: DispatchFormProps) {
  const [sealed, setSealed] = useState(false)
  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const get = (key: string) => String(data.get(key) ?? "").trim()
    const fields = wholesale
      ? [["Name", "name"], ["Business Name", "business"], ["Email", "email"], ["Phone", "phone"], ["Business Type", "businessType"], ["Products of Interest", "products"], ["Estimated Order Quantity", "quantity"], ["Tell Us About Your Business / What Are You Looking For?", "message"]]
      : [["Name", "name"], ["Shop or kitchen", "org"], ["Writing from", "place"], ["Message", "message"]]
    const lines = fields.map(([label, key]) => `${label}: ${get(key) || "—"}`).concat("", "— sent from twoifbypepper.com")
    const href = `mailto:${contactEmail}?subject=${encodeURIComponent(get("subject"))}&body=${encodeURIComponent(lines.join("\n"))}`
    setSealed(true)
    window.setTimeout(() => { window.location.href = href }, 900)
  }
  if (sealed) return <div className="flex flex-col items-center py-16 text-center"><WaxSeal className="h-28 w-28 animate-[glow_1.2s_ease-out_1]" /><p className="display mt-8 text-2xl uppercase tracking-wide">Dispatch sealed</p><p className="mt-3 max-w-sm text-[.95rem] italic opacity-70">Your letter is opening in your mail programme.</p><button type="button" onClick={() => setSealed(false)} className="sc mt-7 underline underline-offset-8 opacity-70">write another</button></div>
  return (
    <form onSubmit={onSubmit} className="space-y-7">
      <div><h2 className="display text-2xl uppercase tracking-wide sm:text-3xl">{heading}</h2><p className="mt-3 max-w-measure text-[.98rem] leading-7 opacity-75">{intro}</p></div>
      <div className="grid gap-7 sm:grid-cols-2">
        <label className="block"><span className="sc block opacity-60">your name</span><input name="name" required autoComplete="name" className="field mt-1" placeholder={wholesale ? "Tom Sage" : "Your name"} /></label>
        {wholesale ? <label className="block"><span className="sc block opacity-60">email</span><input name="email" required type="email" autoComplete="email" className="field mt-1" placeholder="you@example.com" /></label> : <label className="block"><span className="sc block opacity-60">writing from</span><input name="place" className="field mt-1" placeholder="Your city" /></label>}
      </div>
      {wholesale ? <><div className="grid gap-7 sm:grid-cols-2"><label className="block"><span className="sc block opacity-60">business name</span><input name="business" required className="field mt-1" /></label><label className="block"><span className="sc block opacity-60">phone (optional)</span><input name="phone" type="tel" autoComplete="tel" className="field mt-1" /></label></div><div className="grid gap-7 sm:grid-cols-2"><label className="block"><span className="sc block opacity-60">business type</span><input name="businessType" required className="field mt-1" placeholder="Retailer, restaurant, or business" /></label><label className="block"><span className="sc block opacity-60">estimated order quantity</span><input name="quantity" className="field mt-1" /></label></div><label className="block"><span className="sc block opacity-60">products of interest</span><input name="products" className="field mt-1" /></label></> : <label className="block"><span className="sc block opacity-60">shop, kitchen or company</span><input name="org" className="field mt-1" placeholder="Optional" /></label>}
      <label className="block"><span className="sc block opacity-60">the matter at hand</span><select name="subject" className="field mt-1" defaultValue={subjects[0]}>{subjects.map((subject) => <option key={subject} value={subject}>{subject}</option>)}</select></label>
      <label className="block"><span className="sc block opacity-60">{wholesale ? "Tell Us About Your Business / What Are You Looking For?" : "your message"}</span><textarea name="message" required rows={5} className="field mt-1 resize-y" placeholder="Tell us what you have in mind." /></label>
      <div className="flex flex-wrap items-center gap-5 pt-2"><button type="submit" className="btn btn-ember">{submitLabel}</button><p className="text-[.82rem] italic opacity-55">Opens in your mail app — nothing is stored here.</p></div>
    </form>
  )
}
