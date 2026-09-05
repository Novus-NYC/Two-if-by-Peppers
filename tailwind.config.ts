import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        night: { 900: "#05080f", 800: "#0a1020", 700: "#101a30", 600: "#18243f", 500: "#22314f" },
        parchment: { DEFAULT: "#f0e5cd", dim: "#e2d2ae", deep: "#cbb98f" },
        ember: "#ff6b23",
        flame: "#e0451c",
        gold: "#e8a93a",
        goldlit: "#ffd489",
        brass: "#c9963f",
        blood: "#8f2418",
        ink: "#04070d",
      },
      fontFamily: {
        display: ['"Libre Caslon Display"', "Georgia", "serif"],
        body: ['"Libre Caslon Text"', "Georgia", "serif"],
        sc: ['"IM Fell English SC"', "Georgia", "serif"],
        fell: ['"IM Fell English"', "Georgia", "serif"],
      },
      maxWidth: { measure: "34rem", broadside: "78rem" },
    },
  },
  plugins: [],
}
export default config
