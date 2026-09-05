export const NOISE = `
float hash21(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }

float vnoise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash21(i), hash21(i + vec2(1.0, 0.0)), u.x),
             mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++){ v += a * vnoise(p); p = p * 2.02 + 11.7; a *= 0.5; }
  return v;
}
`

export const QUAD_VS = `#version 300 es
in vec2 a_pos;
void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }
`

/* ------------------------------------------------------------------ *
 * The harbour seen through the tower window: dusk sky, drifting cloud
 * banks, stars, and a sea that carries the reflection of whichever
 * lanterns are lit.
 * ------------------------------------------------------------------ */
export const HARBOUR_FS = `#version 300 es
precision highp float;

uniform vec2  u_res;
uniform float u_time;
uniform float u_l1;
uniform float u_l2;
uniform float u_drift;
uniform float u_exit;
out vec4 fragColor;

${NOISE}

const float HORIZON = 0.360;
const vec3  WARM    = vec3(1.0, 0.60, 0.22);

vec3 skyColour(vec2 uv, float drift, float starAmount, float hz, float dusk){
  float sy = clamp((uv.y - hz) / (1.0 - hz), 0.0, 1.0);

  vec3 deep  = vec3(0.014, 0.028, 0.070);
  vec3 mid   = vec3(0.075, 0.090, 0.215);
  vec3 low   = vec3(0.340, 0.180, 0.270);
  vec3 blaze = mix(vec3(0.880, 0.430, 0.150), vec3(0.130, 0.075, 0.150), dusk);

  vec3 col = mix(low, mid, smoothstep(0.0, 0.42, sy));
  col = mix(col, deep, smoothstep(0.38, 0.95, sy));
  col = mix(blaze, col, smoothstep(-0.015, 0.20, sy));

  // stratified cloud banks, wider and warmer as they near the horizon
  vec2 cp = vec2(uv.x * 1.9 + drift * 0.05 + u_time * 0.010, sy * 4.2);
  float band = fbm(cp * 1.7);
  band += 0.35 * fbm(cp * 4.1 + vec2(u_time * 0.02, 0.0));
  float cloud = smoothstep(0.52, 1.05, band) * smoothstep(0.98, 0.10, sy);
  vec3 lit = mix(vec3(0.30, 0.19, 0.28), vec3(1.0, 0.63, 0.27), smoothstep(0.40, 0.0, sy));
  col = mix(col, lit * mix(1.0, 0.35, dusk), cloud * 0.60);

  // stars, thinning out toward the glow - and multiplying as the light goes
  vec2 gp = uv * vec2(120.0, 155.0);
  vec2 gi = floor(gp), gf = fract(gp);
  float rnd = hash21(gi);
  vec2 centre = vec2(hash21(gi + 1.7), hash21(gi + 4.3));
  float star = step(0.974 - dusk * 0.012, rnd) * smoothstep(0.17, 0.0, length(gf - centre));
  float twinkle = 0.45 + 0.55 * sin(u_time * 2.4 + rnd * 60.0);
  col += vec3(0.82, 0.87, 1.0) * star * twinkle * smoothstep(0.22, 0.80, sy) * 0.9
       * starAmount * (1.0 + dusk * 0.8);

  return col;
}

// A lantern's reflection: a wavering column of light broken into glints.
float reflectionColumn(vec2 uv, float lx, float depth, float dusk){
  float wobble = fbm(vec2(uv.x * 5.0, uv.y * 34.0 - u_time * 1.15)) - 0.5;
  float x = uv.x - lx + wobble * 0.055 * (0.25 + depth);
  float w = 0.014 + depth * 0.115;
  float column = exp(-(x * x) / (2.0 * w * w));

  float glint = fbm(vec2(uv.x * 6.5, uv.y * 96.0 - u_time * 2.4));
  glint = smoothstep(0.40, 0.80, glint);

  // the column reaches further down the water as the sky darkens
  return column * mix(0.28, 1.0, glint) * exp(-depth * (1.45 - dusk * 0.55));
}

// Shafts of light spilling down from a lit lantern.
float godRays(vec2 uv, vec2 src, float aspect){
  vec2 d = (uv - src) * vec2(aspect, 1.0);
  float r = length(d);
  float a = atan(d.x, -d.y);
  float shafts = fbm(vec2(a * 3.1 + 4.0, u_time * 0.12));
  shafts = smoothstep(0.30, 1.05, shafts);
  float cone = smoothstep(1.6, 0.35, abs(a));
  return shafts * cone * exp(-r * 5.6);
}

void main(){
  vec2 uv = gl_FragCoord.xy / u_res;
  float aspect = u_res.x / u_res.y;

  // scrolling away from the window lets the night in: the tide comes up,
  // the last of the sunset drains out, and the stars take over.
  float dusk = clamp(u_exit, 0.0, 1.0);
  float hz = HORIZON + dusk * 0.085;

  vec2 lamp1 = vec2(0.325, 0.672);
  vec2 lamp2 = vec2(0.675, 0.672);

  vec3 col;

  if (uv.y > hz) {
    col = skyColour(uv, u_drift, 1.0, hz, dusk);
  } else {
    // the sea mirrors the sky through a rippling surface
    float depth = clamp((hz - uv.y) / hz, 0.0, 1.0);
    float ripple = fbm(vec2(uv.x * 4.0, uv.y * 44.0 - u_time * 0.85)) - 0.5;
    float my = hz + (hz - uv.y) * (0.72 + depth * 0.5) + ripple * 0.02 * (0.2 + depth);
    vec3 mirrored = skyColour(vec2(uv.x + ripple * 0.03 * depth, my), u_drift, 0.0, hz, dusk);

    vec3 water = vec3(0.030, 0.045, 0.105);
    col = mix(mirrored * 0.42, water, smoothstep(0.0, 0.85, depth));

    float r1 = reflectionColumn(uv, lamp1.x, depth, dusk) * u_l1;
    float r2 = reflectionColumn(uv, lamp2.x, depth, dusk) * u_l2;
    col += WARM * (r1 + r2) * 3.1;

    // scattered surface glitter picking up the last of the sunset
    float chop = fbm(vec2(uv.x * 14.0, uv.y * 120.0 - u_time * 1.8));
    col += vec3(1.0, 0.72, 0.36) * smoothstep(0.76, 0.95, chop) * exp(-depth * 3.4)
         * 0.30 * (1.0 - dusk * 0.7);
  }

  // the horizon itself burns
  col += WARM * exp(-abs(uv.y - hz) * 52.0) * 0.20 * (1.0 - dusk * 0.75);

  // haloes and shafts from each lit lantern
  float halo1 = exp(-length((uv - lamp1) * vec2(aspect, 1.0)) * 6.5) * u_l1;
  float halo2 = exp(-length((uv - lamp2) * vec2(aspect, 1.0)) * 6.5) * u_l2;
  col += WARM * (halo1 + halo2) * 0.85;
  col += WARM * (godRays(uv, lamp1, aspect) * u_l1 + godRays(uv, lamp2, aspect) * u_l2) * 0.22;

  // sea fog gathering at the sill as the window recedes
  col = mix(col, vec3(0.045, 0.055, 0.095), smoothstep(0.34, 0.0, uv.y) * dusk * 0.55);

  // glass: a faint vertical sheen plus grime in the corners
  float sheen = smoothstep(0.75, 0.0, abs(fract(uv.x * 0.5 + 0.28) - 0.5) * 2.0);
  col += vec3(0.55, 0.62, 0.85) * sheen * 0.012;
  vec2 q = uv - 0.5;
  col *= 1.0 - smoothstep(0.35, 0.78, length(q * vec2(1.0, 0.82))) * 0.55;

  col *= 1.0 - dusk * 0.42;
  col = pow(max(col, 0.0), vec3(0.92));
  fragColor = vec4(col, 1.0);
}
`

/* ------------------------------------------------------------------ *
 * Embers. Every particle is derived on the GPU from a seed and the
 * clock, so nothing is uploaded per frame.
 * ------------------------------------------------------------------ */
export const EMBER_VS = `#version 300 es
precision highp float;

in float a_seed;
uniform float u_time;
uniform vec2  u_res;
uniform float u_scale;
uniform float u_speed;
uniform float u_flow;
out float v_alpha;
out float v_heat;

float h11(float x){ return fract(sin(x * 127.1) * 43758.5453); }

void main(){
  float seed = a_seed;
  float r1 = h11(seed * 1.7);
  float r2 = h11(seed * 3.3 + 5.0);
  float r3 = h11(seed * 7.1 + 11.0);

  float life = 5.0 + r2 * 7.0;
  float t = fract((u_time * u_speed + r1 * 97.0) / life);

  // rise, with two out-of-phase sways standing in for a curl field.
  // scrolling drags the air with it, fanning the embers sideways and up.
  float gust = abs(u_flow);
  float x = r1
          + sin(t * 5.4 + r3 * 6.28) * 0.055 * (0.35 + t) * (1.0 + gust * 1.5)
          + sin(t * 13.1 + r2 * 6.28) * 0.018;
  float y = mix(-0.06, 1.10, pow(t, 0.86)) - u_flow * 0.20 * (0.35 + r2);

  v_heat = r3;
  v_alpha = smoothstep(0.0, 0.10, t) * smoothstep(1.0, 0.62, t) * (0.35 + r2 * 0.65)
          * (1.0 + gust * 0.85);

  gl_Position = vec4(fract(x) * 2.0 - 1.0, y * 2.0 - 1.0, 0.0, 1.0);
  gl_PointSize = (1.4 + r2 * 3.4) * u_scale * (1.25 - t * 0.45) * (1.0 + gust * 0.35);
}
`

export const EMBER_FS = `#version 300 es
precision highp float;

in float v_alpha;
in float v_heat;
out vec4 fragColor;

void main(){
  float d = length(gl_PointCoord - 0.5) * 2.0;
  if (d > 1.0) discard;
  float core = smoothstep(1.0, 0.0, d);
  float glow = pow(core, 3.2);

  vec3 hot  = vec3(1.00, 0.86, 0.55);
  vec3 cool = vec3(0.95, 0.35, 0.10);
  vec3 col = mix(cool, hot, v_heat * glow + glow * 0.55);

  fragColor = vec4(col * v_alpha * (glow * 0.85 + core * 0.35), 1.0);
}
`

/* ------------------------------------------------------------------ *
 * Label artwork seen through rising heat. Idles at a shimmer and
 * intensifies on hover.
 * ------------------------------------------------------------------ */
export const ART_VS = `#version 300 es
in vec2 a_pos;
out vec2 v_uv;
void main(){
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`

export const ART_FS = `#version 300 es
precision highp float;

in vec2 v_uv;
uniform sampler2D u_tex;
uniform float u_time;
uniform float u_hover;
uniform float u_reveal;
uniform vec2  u_uvScale;
uniform vec2  u_uvOffset;
out vec4 fragColor;

${NOISE}

void main(){
  vec2 uv = vec2(v_uv.x, 1.0 - v_uv.y);

  // heat pools at the base and thins as it rises
  float heat = smoothstep(1.05, 0.10, uv.y);
  float amp = (0.0020 + u_hover * 0.0085) * heat;

  float n1 = fbm(vec2(uv.x * 4.5, uv.y * 6.5 - u_time * 0.34));
  float n2 = fbm(vec2(uv.x * 10.0 + 3.7, uv.y * 15.0 - u_time * 0.78));
  vec2 warp = vec2((n1 - 0.5) * 1.7, (n2 - 0.5) * 0.9) * amp;

  vec2 t = clamp((uv + warp) * u_uvScale + u_uvOffset, 0.0, 1.0);
  float split = u_hover * 0.0020 * heat;

  vec4 base = texture(u_tex, t);
  vec3 col;
  col.r = texture(u_tex, clamp(t + vec2(split, 0.0), 0.0, 1.0)).r;
  col.g = base.g;
  col.b = texture(u_tex, clamp(t - vec2(split, 0.0), 0.0, 1.0)).b;

  // embers of light lifting off the surface
  float lift = fbm(vec2(uv.x * 7.0, uv.y * 9.0 - u_time * 1.05));
  col += vec3(1.0, 0.52, 0.20) * smoothstep(0.68, 1.0, lift) * heat * u_hover * 0.22;

  // the artwork burns into view as it scrolls up, along a ragged front
  float grain = fbm(vec2(uv.x * 3.2, uv.y * 3.6));
  float front = grain * 0.62 + (1.0 - uv.y) * 0.38;
  float burned = smoothstep(front - 0.16, front + 0.04, u_reveal);
  float ember = smoothstep(0.0, 0.45, burned) * smoothstep(1.0, 0.55, burned);
  col += vec3(1.0, 0.42, 0.10) * ember * 1.6;

  float a = base.a * burned;
  fragColor = vec4(col * a, a);
}
`

/* ------------------------------------------------------------------ *
 * The lantern held up in a dark room: an opaque veil punched through
 * by a flickering, noise-edged pool of light that follows the pointer.
 * ------------------------------------------------------------------ */
export const LANTERN_FS = `#version 300 es
precision highp float;

uniform vec2  u_res;
uniform float u_time;
uniform vec2  u_point;
uniform float u_radius;
out vec4 fragColor;

${NOISE}

void main(){
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 d = (uv - u_point) * vec2(u_res.x / u_res.y, 1.0);
  float r = length(d);

  // the flame is never quite steady
  float flicker = 0.90
    + 0.06 * sin(u_time * 7.3)
    + 0.05 * sin(u_time * 3.1 + 1.7)
    + 0.05 * (fbm(vec2(u_time * 1.4, 0.0)) - 0.5);

  // and its edge is ragged, not a clean circle
  float edge = fbm(vec2(atan(d.y, d.x) * 2.4, u_time * 0.35)) - 0.5;
  float radius = u_radius * flicker * (1.0 + edge * 0.16);

  float pool = 1.0 - smoothstep(radius * 0.18, radius, r);
  float spill = exp(-r / (radius * 0.85)) * 0.45;
  float light = clamp(pool + spill, 0.0, 1.0);

  vec3 veil = vec3(0.020, 0.031, 0.059);
  float alpha = (1.0 - light) * 0.985;

  // warm wash across everything the light touches
  vec3 warm = vec3(1.0, 0.60, 0.24);
  float wash = light * (1.0 - light) * 2.6;
  vec3 col = mix(veil, warm, clamp(wash, 0.0, 1.0) * 0.55);
  alpha = max(alpha, wash * 0.20);

  fragColor = vec4(col * alpha, alpha);
}
`
