export const vertex = /* glsl */ `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

/**
 * "The Current of Learning": a few soft translucent ribbons plus three
 * delicate edge lines, all evaluated per pixel from slowly moving sine curves.
 * The pointer flowmap (rg = velocity, b = strength) displaces the coordinates
 * the curves are evaluated at, so every ribbon bends along the pointer's path
 * and relaxes as the flowmap decays. All geometry is in CSS px / hero height.
 */
export const fragment = /* glsl */ `
precision highp float;

uniform sampler2D tFlow;
uniform vec2 uSize;      // hero size in css px
uniform float uTime;     // seconds
uniform float uPush;     // pointer displacement, in hero heights per unit velocity
uniform float uCap;      // maximum displacement, in hero heights
uniform float uTest;
uniform vec4 uTextBox;   // centre.xy, half-size.xy in css px, y up
uniform vec4 uArtBox;
uniform vec3 uCrimson;
uniform vec3 uBlue;
uniform vec3 uRose;

varying vec2 vUv;

float sdBox(vec2 p, vec2 c, vec2 h) {
  vec2 d = abs(p - c) - h;
  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}
// Smooth value noise in -1..1.
float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y) * 2.0 - 1.0;
}

// Centre line of a ribbon at x. Slow noise warps the phase and adds a gentle
// swell, so the motion never settles into an obviously repeating wave.
float curve(float x, float y0, float slope, float a1, float k1, float v1, float ph, float a2, float k2, float v2, float t) {
  float xw = x + 0.16 * vnoise(vec2(x * 0.8 + ph, t * 0.06 + ph));
  float swell = 0.035 * vnoise(vec2(x * 1.1 - ph, t * 0.09 + ph * 2.0));
  return y0 + slope * (x - 0.9) + swell
    + a1 * sin(xw * k1 - t * v1 + ph)
    + a2 * sin(xw * k2 + t * v2 + ph * 1.7);
}

// Soft-edged band (feathered, flat core) for signed distance d and half width w.
float band(float d, float w) {
  return 1.0 - smoothstep(0.3 * w, w, abs(d));
}

float hairline(float d, float px) {
  return 1.0 - smoothstep(0.0, px * 1.25, abs(d));
}

void main() {
  vec2 P = vUv * uSize;                 // css px, y up
  vec3 flow = texture2D(tFlow, vUv).rgb;
  float f = flow.b;

  vec2 p = P / uSize.y;
  // Pointer push: smooth-capped so it bends ribbons instead of tearing them.
  // x counts extra for the curves' phase, so sideways strokes visibly bend the bands.
  vec2 disp = flow.rg * uPush;
  float dm = length(disp);
  disp *= uCap * (1.0 - exp(-dm / uCap)) / max(dm, 1e-5);
  p -= vec2(disp.x * 2.0, disp.y);
  float t = uTime;
  float px = 1.0 / uSize.y;

  // Three ribbons sweeping from lower left, behind the illustration, to upper right.
  float c0 = curve(p.x, 0.40, 0.30, 0.060, 2.1, 0.30, 0.0, 0.025, 4.3, 0.22, t);
  float c1 = curve(p.x, 0.62, 0.22, 0.070, 1.7, 0.24, 2.4, 0.030, 3.6, 0.28, t);
  float c2 = curve(p.x, 0.20, 0.34, 0.050, 2.6, 0.34, 4.1, 0.020, 5.1, 0.20, t);
  float d0 = p.y - c0;
  float d1 = p.y - c1;
  float d2 = p.y - c2;

  float widen = 1.0 + 0.15 * f;
  float w0 = 0.115 * (0.80 + 0.30 * sin(p.x * 1.3 + t * 0.20) + 0.20 * vnoise(vec2(p.x * 0.9, t * 0.08))) * widen;
  float w1 = 0.100 * (0.80 + 0.30 * sin(p.x * 1.1 + 2.0 + t * 0.17) + 0.20 * vnoise(vec2(p.x * 0.8 + 5.0, t * 0.07))) * widen;
  float w2 = 0.085 * (0.80 + 0.40 * sin(p.x * 1.5 + 4.0 + t * 0.23)) * widen;

  float boost = 1.0 + 0.25 * f;
  float a0 = band(d0, w0) * (0.78 + 0.22 * smoothstep(-w0, w0, d0)) * 0.21 * boost; // crimson
  float a1 = band(d1, w1) * (0.78 + 0.22 * smoothstep(w1, -w1, d1)) * 0.23 * boost; // blue
  float a2 = band(d2, w2) * 0.30 * boost;                                          // rose
  a0 += band(d0 - 0.35 * w0, 0.22 * w0) * 0.05;  // silk sheen
  a1 += band(d1 + 0.30 * w1, 0.20 * w1) * 0.05;

  // Three delicate lines along ribbon edges, tapering in and out.
  float taper0 = 0.35 + 0.65 * smoothstep(-0.3, 0.6, sin(p.x * 2.2 + t * 0.25));
  float taper1 = 0.35 + 0.65 * smoothstep(-0.3, 0.6, sin(p.x * 1.9 + 2.0 - t * 0.2));
  float l0 = hairline(d0 - w0 * 1.45, px) * taper0 * 0.30;
  float l1 = hairline(d1 + w1 * 1.45, px) * taper1 * 0.26;
  float l2 = hairline(d0 + w0 * 1.9, px) * taper1 * 0.20;

  // Keep text readable and focus the current around the illustration.
  float mText = mix(0.16, 1.0, smoothstep(-30.0, 110.0, sdBox(P, uTextBox.xy, uTextBox.zw)));
  float mArt = mix(0.55, 1.0, 1.0 - smoothstep(0.0, 320.0, sdBox(P, uArtBox.xy, uArtBox.zw * 1.05)));
  float m = mText * mArt;

  // Layer over-compositing, premultiplied.
  vec3 rgb = vec3(0.0);
  float a = 0.0;
  float la;
  la = a2 * m; rgb = rgb * (1.0 - la) + uRose * la;    a = a * (1.0 - la) + la;
  la = a0 * m; rgb = rgb * (1.0 - la) + uCrimson * la; a = a * (1.0 - la) + la;
  la = a1 * m; rgb = rgb * (1.0 - la) + uBlue * la;    a = a * (1.0 - la) + la;
  la = l0 * m; rgb = rgb * (1.0 - la) + uBlue * la;    a = a * (1.0 - la) + la;
  la = l1 * m; rgb = rgb * (1.0 - la) + uCrimson * la; a = a * (1.0 - la) + la;
  la = l2 * m; rgb = rgb * (1.0 - la) + uBlue * la;    a = a * (1.0 - la) + la;

  // Triangular-ish dither against banding in the soft edges.
  float n = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5;
  a = clamp(a + n / 255.0, 0.0, 1.0);

  vec4 col = vec4(rgb, a); // rgb is already premultiplied by the over-compositing above

  if (uTest > 0.5) {
    // Dev test mode: visualise the flowmap and the protected boxes.
    vec3 viz = vec3(flow.rg * 0.5 + 0.5, f);
    col = mix(col, vec4(viz * 0.9, 0.9), min(1.0, f * 2.0));
    float edgeT = 1.0 - smoothstep(0.0, 2.0, abs(sdBox(P, uTextBox.xy, uTextBox.zw)));
    float edgeA = 1.0 - smoothstep(0.0, 2.0, abs(sdBox(P, uArtBox.xy, uArtBox.zw)));
    col = mix(col, vec4(0.8, 0.1, 0.3, 1.0), edgeT);
    col = mix(col, vec4(0.1, 0.5, 0.8, 1.0), edgeA);
  }
  gl_FragColor = col;
}
`;
