"use client"

import { useState } from "react"
import { contactEmail } from "@/lib/brand"
import { WaxSeal } from "./ornament"

export default function DispatchForm({
  subjects,
  heading,
  submitLabel,
  intro,
}: {
  subjects: string[]
  heading: string
  submitLabel: string
  intro: string
}) {
  const [sealed, setSealed] = useState(false)

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const get = (key: string) => String(data.get(key) ?? "").trim()
    const lines = [
      `Name: ${get("name")}`,
      get("org") ? `Shop or kitchen: ${get("org")}` : "",
      `Writing from: ${get("place") || "—"}`,
      "",
      get("message"),
      "",
      "— sent from twoifbypepper.com",
    ].filter(Boolean)

    const href = `mailto:${contactEmail}?subject=${encodeURIComponent(get("subject"))}&body=${encodeURIComponent(
      lines.join("\n")
    )}`

    setSealed(true)
    window.setTimeout(() => {
      window.location.href = href
    }, 900)
  }

  if (sealed) {
    return (
      <div className="flex flex-col items-center py-16 text-center">
        <WaxSeal className="h-28 w-28 animate-[glow_1.2s_ease-out_1]" />
        <p className="display mt-8 text-2xl uppercase tracking-wide">Dispatch sealed</p>
        <p className="mt-3 max-w-sm text-[.95rem] italic opacity-70">
          Your letter is opening in your mail programme. Send it, and Dan will answer it himself.
        </p>
        <button type="button" onClick={() => setSealed(false)} className="sc mt-7 underline underline-offset-8 opacity-70">
          write another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-7">
      <div>
        <h2 className="display text-2xl uppercase tracking-wide sm:text-3xl">{heading}</h2>
        <p className="mt-3 max-w-measure text-[.98rem] leading-7 opacity-75">{intro}</p>
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        <label className="block">
          <span className="sc block opacity-60">your name</span>
          <input name="name" required autoComplete="name" className="field mt-1" placeholder="Paul Revere" />
        </label>
        <label className="block">
          <span className="sc block opacity-60">writing from</span>
          <input name="place" className="field mt-1" placeholder="Boston, Mass." />
        </label>
      </div>

      <label className="block">
        <span className="sc block opacity-60">shop, kitchen or company</span>
        <input name="org" className="field mt-1" placeholder="Optional" />
      </label>

      <label className="block">
        <span className="sc block opacity-60">the matter at hand</span>
        <select name="subject" className="field mt-1" defaultValue={subjects[0]}>
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="sc block opacity-60">your message</span>
        <textarea
          name="message"
          required
          rows={5}
          className="field mt-1 resize-y"
          placeholder="Tell us what you have in mind."
        />
      </label>

      <div className="flex flex-wrap items-center gap-5 pt-2">
        <button type="submit" className="btn btn-ember">
          {submitLabel}
        </button>
        <p className="text-[.82rem] italic opacity-55">Opens in your mail app — nothing is stored here.</p>
      </div>
    </form>
  )
}
