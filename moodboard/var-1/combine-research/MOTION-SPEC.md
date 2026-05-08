# Combine (Shopify) — "Gadget" Preset — Motion, Type & Token Spec

Field-extracted reference for moodboard var-1. Pulled live from `combine-theme-gadget.myshopify.com` on 2026-05-08 — landing, PLP (`/collections/headphones`, `/collections/all`), and PDP (`/products/beoplay-h95`, `/products/beosound-a9`).

This is the **Bang & Olufsen-style audio/electronics preset** of the Combine theme by Krown — minimalist, editorial, dark header on white body, oversized type. Useful as a baseline for premium-electronics ecommerce.

---

## 1. The Combine motion philosophy (key insight)

**Combine and Apple are opposites in motion DNA.**

- Apple → almost everything `cubic-bezier(0.4, 0, 0.6, 1)` at 320ms — eased, paced
- Combine → almost everything `linear` at **175ms** — straight, snappy, editorial

Combine has exactly **one** custom curve in the entire codebase: `cubic-bezier(0.47, 1.64, 0.41, 0.8)` — an overshoot used only on `width` transitions (think underlines drawing past then snapping back). Everything else is linear. That's the brand.

If you want to feel Combine-coded, default to `175ms linear` and resist the urge to ease.

---

## 2. Easing palette

| Token | Value | Use for |
|---|---|---|
| `--ease-default` | `linear` | **~90% of transitions.** Color, opacity, transform, border. |
| `--ease-snappy` | `ease-out` | Drawer/popup entries, occasional content fades |
| `--ease-bidirectional` | `ease-in-out` | Reversible transforms (rare) |
| `--ease-overshoot` | `cubic-bezier(0.47, 1.64, 0.41, 0.8)` | Underline/divider draw-in, width-based decorative moves |

Note: Don't use ease-overshoot on properties users interact with directly (clicks, scrolls). It's decorative only — Combine reserves it for line-drawing and width reveals.

---

## 3. Duration scale

Pulled from the actual stylesheet:

| Token | Value | Use for |
|---|---|---|
| `--dur-flash` | `100ms` (`0.1s`) | Border color flash, opacity quick-cuts |
| `--dur-micro` | `120ms` | Hover opacity changes |
| `--dur-base` | `175ms` | **THE signature duration.** Almost everything. |
| `--dur-content` | `300ms` (`0.3s`) | Drawer open/close, modal transitions |
| `--dur-section` | `350ms` (`0.35s`) | Tab switch, accordion |
| `--dur-decorative` | `500ms` (`0.5s`) | Width-overshoot reveals, underlines |
| `--dur-slow` | `700ms` (`0.7s`) | Hero/marketing fades |

There's no 400/600/800/1000ms in the codebase — pick from the scale above only.

---

## 4. Signature transitions (verbatim from stylesheet)

```css
/* The Combine default — this exact pattern repeats hundreds of times */
.combine-element {
  transition: 175ms linear;
}

/* Common multi-property pattern */
.btn, .card, .input {
  transition: opacity 175ms linear, transform 175ms;
}

/* Add-to-cart button (PDP) */
.product-form__cart-submit {
  transition: 0.175s linear;
  border-radius: 30px;
  background: #000;
  color: #FFF;
  padding: 12px 15px;
  font: 600 16px/1 "DM Sans";
  text-transform: uppercase;       /* identity move */
}

/* Drawer / sidebar panel slide-in */
.sidebar-drawer {
  transition: transform 0.3s ease-out, opacity 0.3s linear;
}

/* Underline/divider draw — the only place overshoot lives */
.line-flourish {
  transition: width 0.5s cubic-bezier(0.47, 1.64, 0.41, 0.8);
}

/* Sticky text rail (PDP product info) */
.product-text {
  position: sticky;
  top: 64px;     /* header height offset */
}

/* Image zoom on hover (very subtle) */
.product-card-image {
  transition: transform 175ms linear;
}
.product-card:hover .product-card-image {
  transform: scale(1.02);
}
```

---

## 5. Color tokens (full extract from `:root`)

This is the entire Combine token system — far richer than what we got from Apple.

### Header & footer (dark mode by default)
```css
--color-background-header: #1e1e1e;        /* near-black, NOT pure black */
--color-text-header: #ffffff;
--color-foreground-header: #000;
--color-borders-header: rgba(255, 255, 255, 0.15);

--color-background-footer: #1e1e1e;        /* matches header */
--color-text-footer: #b9b9b9;              /* muted */
--color-borders-footer: rgba(185, 185, 185, 0.15);
```

### Main content (light)
```css
--color-background-main: #ffffff;
--color-secondary-background-main:  rgba(0, 0, 0, 0.08);
--color-third-background-main:      rgba(0, 0, 0, 0.04);
--color-fourth-background-main:     rgba(0, 0, 0, 0.02);

--color-text-main: #000000;
--color-secondary-text-main: rgba(0, 0, 0, 0.6);
--color-foreground-main: #fff;

--color-borders-main: rgba(0, 0, 0, 0.1);
--color-background-main-alternate: #EEF1F2;   /* cool grey alt sections */
```

### Forms
```css
--color-borders-forms-primary:   rgba(0, 0, 0, 0.3);
--color-borders-forms-secondary: rgba(0, 0, 0, 0.6);
```

### Accent
```css
--lxs-rating-icon-color: #EBBF20;          /* gold stars */
```

**Pattern to steal:** Combine layers transparency for hierarchy instead of using a separate grey scale. Background tints are `0.02 / 0.04 / 0.08`. Text muted is `rgba(0,0,0,0.6)`. Borders are `rgba(0,0,0,0.1)`. Three opacity stops do the work of a 9-step neutral scale.

---

## 6. Typography

### Single-family stack
```
--font-stack-headings-primary: "DM Sans", sans-serif;
--font-stack-body-primary:     "DM Sans", sans-serif;
```

DM Sans for *everything*. Headings + body + buttons + nav. Identity comes from **size jumps and weight contrast**, not family contrast.

### Weights (named)
```css
--font-weight-headings-primary:      400;   /* light/regular for big type */
--font-weight-body-primary:          400;
--font-weight-body-primary-medium:   500;   /* nav, buttons */
--font-weight-body-primary-bold:     600;   /* ATC, emphasis */
--font-weight-menu:                  500;
--font-weight-buttons:               500;
```

The **headings are weight 400, not bold**. That's the look — large, light, breathing. Editorial not promotional.

### Live-sampled scale

| Element | Size | Line-height | Weight | Tracking |
|---|---|---|---|---|
| **h2** (hero / section) | 80px | 80px | 400 | normal |
| **h3** (section subhead) | 36px | 36px | 400 | normal |
| **p / body** | 16px | 20.8px (1.3) | 400 | normal |
| **Nav link** | 16px | 16px | 500 | normal |
| **Button (ATC)** | 16px | 1 | 600 | normal, **UPPERCASE** |
| **Price** | 16px | 20.8px | 400 | normal |

### Base sizes (from token)
```css
--base-headings-primary-size: 60;     /* base; multipliers per heading level */
--base-headings-line: 1;              /* tight: line-height = font-size */
--base-headings-spacing: 0.0em;       /* zero letter-spacing on headings */

--base-body-primary-size: 16;
--base-body-secondary-size: 18;
--base-body-line: 1.3;
```

### Type rules
1. **Line-height 1 on headings.** Tight stacking — never breathy.
2. **Letter-spacing 0 everywhere.** Combine doesn't tighten or open up. DM Sans's natural spacing is the answer.
3. **Sentence-case headlines** observed throughout.
4. **UPPERCASE only on buttons** (ATC label, primary CTAs). Never on body or headings.
5. Body line-height is **1.3** — tighter than typical web (1.5 default). Adds editorial density.

---

## 7. Geometry, shape, layout tokens

```css
--theme-max-width: 1440px;            /* page max */
--grid-gap-original-base: 40px;       /* default grid gap */
--container-vertical-space-base: 120px;   /* hefty vertical rhythm */

/* Gutter scale */
--gutter-small:    15px;
--gutter-regular:  25px;
--gutter-large:    50px;
--gutter-xlarge:   80px;
--gutter-container: 40px;

/* Sidebar */
--sidebar-width:  420px;
--sidebar-gutter: 30px;

/* Header rhythm */
--header-vertical-space: 30px;

/* Padding tokens */
--button-padding: .875rem .9375rem;   /* ~14px 15px */
--input-padding:  .75rem;             /* 12px */
```

### Border radius — the tell

```css
--border-radius-cards:        0px;    /* sharp! */
--border-radius-buttons:      30px;   /* pill */
--border-radius-forms:        10px;
--border-radius-widgets:      10px;
--border-radius-product-card: 20px;
```

The contrast — **0px on cards, 30px on buttons** — is signature Combine. Sharp content frames + soft pill CTAs. That mix is what makes it read as "premium electronics" rather than "soft commerce".

### Border widths
```css
--border-width-cards:   px;        /* (intentionally bare, falls back to 0) */
--border-width-buttons: 1px;
--border-width-forms:   1px;
```

---

## 8. Stickies & z-index

```
.sidebar-drawer (cart, menu)        z: 1001    fixed
.sidebar__header                    z: 99      sticky (top:0)
.product-text (PDP info column)     z: auto    sticky (top: 64px)
.stacked-popups (notifications)     z: 999     fixed (right-aligned)
```

PDP uses a **sticky text column** offset by 64px (the header's effective height) — image scrolls, text/CTA stays. Same right-rail pattern as Apple but no shadow, no card.

---

## 9. Micro-interaction inventory

| Interaction | Behavior | Duration | Easing |
|---|---|---|---|
| **Nav link hover** | Underline scale-in from 0 → 100% width | 175ms | linear (or overshoot for the line) |
| **Product card hover** | Image scale 1 → 1.02, no shadow | 175ms | linear |
| **Add-to-cart click** | Brief opacity dip, color stays | 100–175ms | linear |
| **Cart drawer open** | Slide from right + opacity fade | 300ms | ease-out + linear (split per prop) |
| **Variant select** | Border state swap on selected pill | 175ms | linear |
| **Image gallery thumb click** | Main image opacity crossfade | 120–175ms | linear |
| **Filter toggle (PLP)** | Drawer slide + content reveal | 300ms | ease-out |
| **Underline draw (decorative)** | Width 0 → 100% with overshoot then settle | 500ms | `cubic-bezier(0.47, 1.64, 0.41, 0.8)` |
| **Form input focus** | Border color shift `rgba(0,0,0,0.3)` → `rgba(0,0,0,0.6)` | 100ms | linear |
| **Sticky header behavior** | Stays dark `#1E1E1E` across scroll, no shrink/blur | 0 (no transition) | — |

The header **does not blur or change on scroll** — it's permanently dark. That's a distinct choice from Apple's frosted-on-scroll nav. Combine commits to the dark/light split.

---

## 10. Copy / text behaviors observed

1. **All-caps for nav and buttons.** Lowercase or sentence case for headlines and body.
2. **Single-word nav items.** "SHOP", "SPEAKERS", "EARPHONES", "ABOUT". No multi-word or punctuation.
3. **Headings short and declarative.** Often one to four words at 80px.
4. **No exclamation marks. No emoji.** Pure typographic confidence.
5. **Product names = brand + model code.** "Beoplay H95", "Beosound A9". Treat as proper nouns.
6. **Prices unprefixed**, currency symbol attached: `$899` not `USD 899` or `$ 899`.
7. **Button labels are imperative verbs.** "Add to bag", "View product". Always action.

---

## 11. Cheat-sheet — minimum to feel Combine-coded

```css
:root {
  /* easing — keep it ALMOST all linear, that's the move */
  --ease-default: linear;
  --ease-overshoot: cubic-bezier(0.47, 1.64, 0.41, 0.8);

  /* duration — 175ms is the law */
  --dur-base: 175ms;
  --dur-content: 300ms;
  --dur-decorative: 500ms;

  /* color — opacity-layered neutrals */
  --c-header-bg: #1E1E1E;
  --c-header-text: #FFFFFF;
  --c-bg: #FFFFFF;
  --c-bg-alt: #EEF1F2;
  --c-text: #000000;
  --c-text-muted: rgba(0, 0, 0, 0.6);
  --c-border: rgba(0, 0, 0, 0.1);
  --c-bg-tint-1: rgba(0, 0, 0, 0.02);
  --c-bg-tint-2: rgba(0, 0, 0, 0.04);
  --c-bg-tint-3: rgba(0, 0, 0, 0.08);

  /* typography — one family, line-height 1, no tracking */
  --font: "DM Sans", sans-serif;
  --leading-display: 1;
  --leading-body: 1.3;

  /* shape */
  --r-card: 0;
  --r-product-card: 20px;
  --r-button: 30px;
  --r-form: 10px;

  /* layout */
  --max-w: 1440px;
  --gutter-sm: 15px;
  --gutter-md: 25px;
  --gutter-lg: 50px;
  --gutter-xl: 80px;
  --section-y: 120px;
}
```

The single-family + single-default-easing + single-base-duration discipline is what makes Combine feel **resolved**. Drop tokens, not snowflakes.

---

## 12. Files in this folder

| File | What |
|---|---|
| `00-themes-listing.jpeg` | The Shopify theme listing page (origin reference) |
| `01-landing-fullpage.jpeg` | Combine homepage — full scroll |
| `01-landing-viewport.jpeg` | Just hero |
| `02-plp-headphones-fullpage.jpeg` | Headphones collection — full |
| `02-plp-headphones-viewport.jpeg` | Headphones top |
| `03-plp-all-fullpage.jpeg` | "All" collection — full |
| `03-plp-all-viewport.jpeg` | "All" top |
| `04-pdp-h95-fullpage.jpeg` | Beoplay H95 PDP — full |
| `04-pdp-h95-viewport.jpeg` | H95 hero |
| `04-pdp-h95-mid.jpeg` | H95 mid-scroll (specs / accordion area) |
| `05-pdp-a9-fullpage.jpeg` | Beosound A9 PDP — full (different layout flavor) |
| `05-pdp-a9-viewport.jpeg` | A9 hero |

---

## 13. Apple vs Combine — quick contrast (for var-2 vs var-1 conversation)

| Axis | Apple (var-2) | Combine (var-1) |
|---|---|---|
| Default easing | `cubic-bezier(0.4, 0, 0.6, 1)` | `linear` |
| Default duration | 320ms | **175ms** (1.8× faster) |
| Type families | SF Pro Text + SF Pro Display (2) | DM Sans only (1) |
| Heading weight | 600 (semibold) | **400 (regular)** |
| Letter-spacing | Tightens body, opens display | None — `0` everywhere |
| Header behavior | Frosted, color-aware on scroll | Permanently dark #1E1E1E |
| Card radius | Soft (12–18px) | **0px** sharp |
| Button radius | 8 / 980px (block / pill) | 30px (single pill) |
| Button case | Sentence case | **UPPERCASE** |
| Color philosophy | Solid grey scale + accent blue | Opacity-layered neutrals + gold star |
| Brand vibe | Tech-corporate-editorial | Premium-electronics-editorial |

**Use this for the var-1 vs var-2 pitch:** Apple is *systematic* (huge token system, calibrated). Combine is *minimalist* (tight token set, single family, linear motion). For Khatun-Studio's heritage angle, Combine's editorial restraint is closer to the target than Apple's polish — but Khatun should bring its own typeface story rather than DM Sans.

---

*Pulled live 2026-05-08 — values may drift if Krown updates the theme. Re-extract via Chrome DevTools if anything looks off.*
