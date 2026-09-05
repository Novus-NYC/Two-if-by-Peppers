# Two If By Pepper

Marketing site for Two If By Pepper — small-batch hot sauce, built around the
brand's own joke: *one if by land, two if by sea, two if by pepper.*

## Tech

Next.js (App Router) · TypeScript · Tailwind · deployed on Vercel.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Structure

```
src/app/                 routes: / · /sauces · /story · /wholesale · /contact
src/app/globals.css      design tokens, paper + night surfaces, ornament, motion
src/lib/brand.ts         all site copy and product data
src/lib/components/      shared UI
src/lib/webgl/           GLSL sources + the small GL runtime they share
public/                  label artwork
```

**`src/lib/brand.ts` holds essentially all the words on the site.** Sauce data,
the Gazette chapters, the wholesale articles, and the fact strip all live there,
so copy changes rarely need a page file.

## Design notes

- **Type** — Libre Caslon Display / Libre Caslon Text (Caslon set the
  Declaration of Independence) with IM Fell English SC for small caps.
- **Surfaces** — the site is dark by default. Parchment is not a page
  background; it is a `<Sheet>`, a physical document lying on a dark table, with
  torn edges from the `#deckle` SVG displacement filter in `svg-defs.tsx`.
- **Heat is measured in lit lanterns**, not chili peppers — `<HeatScale>`.
- **The hero** (`signal-hero.tsx`) kindles one lantern, then the second, then
  resolves the headline.
- The lantern-light cursor reveal on `/story` is deliberately used once.

## The WebGL layer

Raw WebGL2, no Three.js — every effect is a fragment shader over one triangle,
or `gl.POINTS`. Shaders live in `src/lib/webgl/glsl.ts`; `core.ts` holds the
runtime they all share.

| Shader | Where | What it does |
|---|---|---|
| `HARBOUR_FS` | hero window | Dusk sky with drifting cloud banks and twinkling stars over a sea that mirrors it through moving ripples. Each lit lantern casts a wavering, glinting reflection column on the water plus a soft shaft of light through the air. Driven by `u_l1`/`u_l2`, so the water lights up as the lanterns kindle. |
| `EMBER_VS/FS` | hero, footer | Embers rising on additive blending. Position, size, life and colour are all derived on the GPU from one seed float — nothing is uploaded per frame. |
| `ART_FS` | sauce cards, dossiers | The label art seen through rising heat: fbm displacement pooled at the base, chromatic split and an ember lift that intensify on hover. |
| `LANTERN_FS` | `/story` | An opaque veil punched by a flickering, noise-edged pool of light that follows the pointer, and drifts on its own when it does not. |

`core.ts` handles the parts that are easy to get wrong: DPR-capped resizing,
one synchronous first frame so a canvas is never blank, rAF paused by
`IntersectionObserver` and `visibilitychange` so off-screen scenes cost nothing,
a `ResizeObserver` redraw for still scenes, and full teardown of programs,
buffers and VAOs on unmount. It deliberately does **not** call `loseContext()` —
that poisons the canvas across React remounts.

Every scene checks `prefers-reduced-motion` and falls back to a single frozen
frame at a fixed `u_time`. If the context fails to create or a shader fails to
compile, the canvas simply stays transparent and the DOM underneath (real
`<Image>`, real text) carries the page on its own.

## Before launch

Read `FABRICATED-CONTENT.txt`. Heat ratings, ingredients, bottle size, and the
wholesale terms are all placeholder copy written to read as finished, and the
wholesale section in particular makes commitments that need checking.
