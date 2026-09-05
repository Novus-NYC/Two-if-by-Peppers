import Lantern from "./lantern"

export default function HeatScale({
  value,
  label,
  size = "md",
  className = "",
}: {
  value: number
  label?: string
  size?: "sm" | "md"
  className?: string
}) {
  const box = size === "sm" ? "h-6 w-4" : "h-9 w-6"
  return (
    <div className={className}>
      <div className="flex items-end gap-2" role="img" aria-label={`Heat, ${value} of five lanterns lit`}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Lantern
            key={i}
            lit={i <= value}
            delay={i * 0.37}
            className={`${box} ${i <= value ? "text-brass" : "opacity-30"}`}
          />
        ))}
      </div>
      {label ? <p className="sc mt-3 opacity-70">{label}</p> : null}
    </div>
  )
}
