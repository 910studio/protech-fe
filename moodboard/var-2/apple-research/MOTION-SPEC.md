# Apple.com — Motion, Easing & Type Spec

Field-extracted reference for moodboard var-2. All values pulled live via Chrome DevTools from apple.com landing, PLP (`/shop/buy-iphone`), and PDP (`/shop/buy-iphone/iphone-17-pro`) on 2026-05-08. Use it as the *baseline* — Khatun ships its own personality on top.

---

## 1. Easing palette

The five curves Apple uses across the entire site. Treat the first one as the default for almost everything.

| Token | cubic-bezier | Feel | Use for |
|---|---|---|---|
| `--ease-default` | `cubic-bezier(0.4, 0, 0.6, 1)` | Symmetric ease-in-out, gentle | **Default** — color/opacity transitions, link hovers, nav state changes |
| `--ease-out-soft` | `cubic-bezier(0.25, 0.1, 0.3, 1)` | Quick start, slow settle | Reveals, accordions, content fade-ins |
| `--ease-out-fine` | `cubic-bezier(0.28, 0.11, 0.32, 1)` | Tighter ease-out | Modal/sheet entries, sticky nav appear |
| `--ease-in-anticip` | `cubic-bezier(1, 0.1, 0, 0.3)` | Anticipation curve, custom | Closing sheets, dismiss animations |
| `linear` | — | — | Spinners, marquee scrollers only |

Note: Apple writes both `cubic-bezier(0.4, 0, 0.6, 1)` and `cubic-bezier(.4,0,.6,1)` — same curve, just different terseness in their compiled CSS.

---

## 2. Duration scale

Apple uses a tight set. Don't get fancy. Pick from this list.

| Token | Value | Use for |
|---|---|---|
| `--dur-instant` | `120ms` | Hover color flash, tap feedback |
| `--dur-fast` | `160ms` | Button press states, focus rings |
| `--dur-snap` | `200ms` | Tooltip appear, small reveals |
| `--dur-base` | `240ms` | Card hover lift, subhead reveal |
| `--dur-default` | `320ms` | **Most transitions** — links, nav, color picker |
| `--dur-tile` | `400ms` | Tile/section content reveal on scroll |
| `--dur-page` | `500ms` | Page transitions, sticky-summary fade |
| `--dur-hero` | `700ms` | Hero element entry, big-image swap |
| `--dur-storytell` | `800ms` | Marketing scroll-driven beats |

Common pairing: `transition: <prop> 0.32s cubic-bezier(0.4, 0, 0.6, 1);` — that's the Apple house default.

---

## 3. Signature transitions (verbatim)

Pulled directly from computed styles — copy-paste safe.

```css
/* Link / nav-link color hover (most-used transition on the site) */
a, .globalnav-link {
  transition: color 0.32s cubic-bezier(0.4, 0, 0.6, 1);
}

/* Tile copy reveal — used on landing page tile headlines/subheads
   The 80ms delay creates a soft stagger when multiple tiles enter */
.tile-copy {
  transition: opacity 0.32s 0.08s, transform 0.32s 0.08s;
}

/* Sticky summary fade-in (PDP) — the 300ms delay holds it back
   until other layout settles, then fades in over 400ms */
.summary-sticky {
  transition: opacity 0.4s ease-in 0.3s;
}
```

---

## 4. Frosted nav — the canonical Apple gesture

This is the part everyone tries to copy and gets wrong. Exact values:

```css
/* Global navigation */
.globalnav {
  position: fixed;
  top: 0;
  z-index: 9999;
  background: rgba(250, 250, 252, 0.8);            /* #FAFAFC @ 80% */
  backdrop-filter: saturate(1.8) blur(20px);
  -webkit-backdrop-filter: saturate(1.8) blur(20px);
}

/* Mega-menu backdrop curtain (covers page when nav opens) */
.globalnav-curtain {
  position: fixed;
  top: 0;
  z-index: 9998;
  background: rgba(232, 232, 237, 0.4);            /* warm grey @ 40% */
  backdrop-filter: blur(20px);
}
```

The `saturate(1.8)` is what makes Apple's nav feel "alive" over colorful hero images — colors behind get *boosted* before being blurred. Most clones omit it and end up flat.

---

## 5. Color tokens

Pulled from PDP/landing computed styles.

| Role | Hex | RGB | Notes |
|---|---|---|---|
| Background | `#FFFFFF` | 255,255,255 | body bg |
| Surface (nav) | `#FAFAFC` @ 80% | 250,250,252 | with frost |
| Surface (curtain) | `#E8E8ED` @ 40% | 232,232,237 | with frost |
| Text primary | `#1D1D1F` | 29,29,31 | almost-black, never pure |
| Text secondary | `rgba(0,0,0,0.8)` | — | links default |
| Text muted | `#6E6E73` | 110,110,115 | tile eyebrow / footnotes |
| Accent (CTA) | `#0071E3` | 0,113,227 | "Apple blue" — primary buttons + links on hover |
| Footnote text | `#1D1D1F` | — | same as primary, smaller size |

---

## 6. Typography (the part you actually want)

Apple's full type system, from real DOM samples.

### Families

```
Display:  "SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif
Text:     "SF Pro Text",    "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif
```

`SF Pro Display` for >= 21px. `SF Pro Text` for everything below ~20px (and for heavy UI labels like nav links). The crossover is at ~21–28px depending on context.

### Scale (sampled from live pages)

| Element | Family | Size | Weight | Line-height | Letter-spacing |
|---|---|---|---|---|---|
| **h1** (PDP) | SF Pro Display | 48px | 600 | (default) | -0.144px |
| **h1** (landing) | SF Pro Text | 34px | 600 | 50px | -0.374px |
| **h2 / tile headline** (landing) | SF Pro Display | 28px | 400 | 32px | +0.196px |
| **h3 / tile subhead** | SF Pro Display | 28px | 400 | 32px | +0.196px |
| **Body large / paragraph (tile)** | SF Pro Display | 28px | 400 | 32px | +0.196px |
| **Body** (PDP, default) | SF Pro Text | 17px | 400 | 25px | -0.374px |
| **Footnote** (landing) | SF Pro Display | 21px | 400 | 25px | +0.231px |
| **Eyebrow / muted label** | SF Pro Text | 12px | 400 | 16px | -0.12px |
| **Nav link** | SF Pro Text | 17px | 600 | 21px | -0.374px |
| **Button label** | SF Pro Text | 17px | 400 | 20px | -0.374px |

### Letter-spacing pattern (the rule)

- **Display sizes (>=21px)** → *positive* tracking (+0.19 to +0.23px). Apple opens up large type slightly.
- **Text sizes (<=17px)** → *negative* tracking (-0.12 to -0.374px). Apple tightens UI labels.
- **Headings >=40px** → very small negative (-0.144px on 48px h1). Almost zero.

In em-units (portable):
```css
--track-display: 0.007em;   /* +7 per 1000 */
--track-h1:     -0.003em;
--track-body:   -0.022em;   /* -22 per 1000, the "Apple tighten" */
--track-eyebrow: -0.01em;
```

---

## 7. Buttons

Two main shapes, both alive on PDP.

```css
/* Primary pill (used for "Buy", "Continue", super-CTA) */
.button-pill {
  padding: 11px 21px;
  border-radius: 980px;       /* ridiculous high number = always pill */
  background: #0071E3;
  color: #FFF;
  font: 400 17px/20px "SF Pro Text";
  letter-spacing: -0.374px;
  transition: background 0.32s cubic-bezier(0.4, 0, 0.6, 1);
}
.button-pill:hover { background: #0077ED; }   /* slightly lighter blue */

/* Block button (used for in-flow CTAs, smaller surfaces) */
.button-block {
  padding: 8px 15px;
  border-radius: 8px;
  background: #0071E3;
  color: #FFF;
  font-size: 14px;
  letter-spacing: -0.224px;
}
```

No box-shadow on Apple buttons. Ever. They lean on color + size to do the work.

---

## 8. Micro-interaction inventory (observed)

| Interaction | Behavior | Approx duration | Easing |
|---|---|---|---|
| **Nav link hover** | Color shifts from `rgba(0,0,0,0.8)` → `#0071E3` | 320ms | `cubic-bezier(0.4, 0, 0.6, 1)` |
| **Mega-menu open** | Curtain fades in + backdrop-blur ramps; flyout content slides down ~12px and fades | ~400ms | `ease-out-soft` |
| **Mega-menu close** | Reverse, slightly faster | ~240ms | `ease-out-soft` |
| **Tile entrance (scroll)** | Each tile: opacity 0→1, translateY 16px→0, **80ms stagger between tiles** | 320ms each | `ease-default` |
| **Color picker swap (PDP)** | Device image cross-fades to new color; price/copy crossfade together | ~500ms | `ease-out-fine` |
| **Sticky summary appear (PDP)** | After scroll past hero, opacity 0→1 with 300ms delay, then 400ms fade | 400ms (+300ms delay) | `ease-in` |
| **Tab change (entertainment carousel)** | Slide horizontal + crossfade | ~600ms | `ease-default` |
| **Card hover (PLP)** | Subtle scale 1→1.01, no shadow | 240ms | `ease-default` |
| **Form input focus** | Border color → blue, no glow, no shadow | 200ms | `ease-default` |
| **Page top scroll-back** | Smooth scroll, native | — | — |

---

## 9. Sticky / z-index tokens

```
globalmessage segment   z: 9999  (top: -40 till shown)
.globalnav              z: 9999  (frosted)
.globalnav-curtain      z: 9998  (mega-menu blur layer)
modal/dialog overlays   z: 10000+
```

PDP has its own sticky right-rail (the price summary) at a much lower z (~10) since it lives inside content.

---

## 10. Text behaviors / copy rules to steal

These are observation-derived, not code-extracted, but they're the half of "Apple feel" no spec sheet captures:

1. **Sentence case headlines, period-terminated.** Always. "Meet the latest iPhone lineup." not "Meet The Latest iPhone Lineup"
2. **Two-line tile copy max.** Headline + 1-line description. If you need three lines, you're explaining too much.
3. **CTAs are verbs, never nouns.** "Buy", "Learn more", "Get your estimate". Not "Buy Now", not "Click here".
4. **Numerics keep monetary precision but drop trivial zeros.** "$1099" not "$1,099.00". Comma added at >=10,000.
5. **Em-dashes for stylistic break, en-dashes for ranges.** "iPhone 13 — or higher" vs "Get $195–$685".
6. **Footnotes are superscripts inside copy** (`¹` `²`) and link to a separate footnote region at page bottom.
7. **No exclamation marks.** Confidence comes from product, not punctuation.

---

## 11. Cheat-sheet — minimum to feel Apple-coded

Copy these tokens into your stylesheet as a baseline, then deviate intentionally:

```css
:root {
  /* easing */
  --ease-default: cubic-bezier(0.4, 0, 0.6, 1);
  --ease-out-soft: cubic-bezier(0.25, 0.1, 0.3, 1);
  --ease-out-fine: cubic-bezier(0.28, 0.11, 0.32, 1);

  /* duration */
  --dur-fast: 160ms;
  --dur-base: 240ms;
  --dur-default: 320ms;
  --dur-tile: 400ms;
  --dur-hero: 700ms;

  /* color */
  --c-bg: #FFFFFF;
  --c-text: #1D1D1F;
  --c-text-muted: #6E6E73;
  --c-accent: #0071E3;
  --c-accent-hover: #0077ED;

  /* surface */
  --c-nav-bg: rgba(250, 250, 252, 0.8);
  --c-curtain-bg: rgba(232, 232, 237, 0.4);
  --frost: saturate(1.8) blur(20px);

  /* typography */
  --font-display: "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif;
  --font-text: "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif;
  --track-display: 0.007em;
  --track-body: -0.022em;
}
```

---

## 12. Files in this folder

| File | What |
|---|---|
| `01-landing-fullpage.jpeg` | Apple homepage, full scroll |
| `01-landing-viewport.jpeg` | Just hero |
| `02-nav-mega-menu-iphone.jpeg` | iPhone mega-menu open state |
| `03-plp-iphone-fullpage.jpeg` | Buy iPhone PLP — full |
| `03-plp-iphone-viewport.jpeg` | Buy iPhone PLP — top |
| `04-plp-mac-fullpage.jpeg` | Buy Mac PLP — full |
| `05-plp-accessories-fullpage.jpeg` | Buy Accessories PLP — full |
| `05-plp-accessories-viewport.jpeg` | Buy Accessories PLP — top |
| `06-plp-cases-grid-fullpage.jpeg` | iPhone cases category PLP — full |
| `06-plp-cases-grid-viewport.jpeg` | iPhone cases category PLP — top |
| `07-pdp-iphone17pro-configurator-fullpage.jpeg` | iPhone 17 Pro configurator — full |
| `07-pdp-iphone17pro-viewport-top.jpeg` | Configurator hero |
| `07-pdp-iphone17pro-viewport-storage.jpeg` | Storage step (mid-scroll) |
| `07-pdp-iphone17pro-viewport-finance.jpeg` | Finance step (deep-scroll) |
| `08-pdp-airpods-fullpage.jpeg` | AirPods 4 PDP — classic single-product layout |
| `08-pdp-airpods-viewport.jpeg` | AirPods PDP top |
| `09-marketing-iphone17pro-viewport-hero.jpeg` | iPhone 17 Pro marketing page hero |
| `10-pdp-color-cosmic-orange.jpeg` | Color picker → orange |
| `10-pdp-color-deep-blue.jpeg` | Color picker → deep blue (compare swap) |

---

*Pulled live 2026-05-08 — values may drift. If something looks off in 6 months, re-extract via Chrome DevTools.*
