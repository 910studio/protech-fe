# Protech — Design Brief

**Client:** Protech (Mongolia)
**Type:** B2B technology procurement platform — landing → PLP → PDP → fleet checkout
**Date:** 2026-05-08
**Studio:** 910studio × Khatun Studio (Gray + Sainaa)

---

## The decision frame

Two directions extracted from real-site research, not vibes. Both built end-to-end at `/v2` (Apple) and skeleton at `/v1` (Combine) so the client can click through, not just look at a spec.

Direction names, by personality:

| | **Quiet Power** (V2 / Apple) | **Studio Restraint** (V1 / Combine) |
|---|---|---|
| Inspiration | apple.com/iphone, /shop/buy-iphone | combine-theme-gadget.myshopify.com (B&O preset) |
| Personality | Frosted-corporate, generous, system-y | Editorial-minimal, dense, restrained |
| Voice | "Built for the work that runs Mongolia." | "MongolIA's hardware. UPPERCASE buttons. Period." |
| Mood sentence | Light, warm, calm, refined, cutting-edge, minimal | Light, cool, calm, editorial, timeless, dense |
| When to pick | Familiar, trust-building, government & enterprise default | Brand-distinctive, premium electronics positioning, agencies & creative studios |

**Recommendation:** Quiet Power as primary because the audience (procurement managers at banks/hospitals/ministries) speaks "Apple" fluently and won't have to learn a new visual language under deadline pressure. Studio Restraint as the harder, sharper direction we keep on standby for when Protech wants to move past "looks like Apple" and own a brand of its own — likely in v2 of the build.

---

## DIRECTION 1: Quiet Power (V2 — Apple)

### Color
```
Background       #FFFFFF              white, no off-white
Background alt   #F5F5F7              tile bg, sectional rhythm
Surface (nav)    rgba(250,250,252,.8) frosted, requires backdrop-filter
Surface curtain  rgba(232,232,237,.4) mega-menu underlay

Text primary     #1D1D1F              never pure black
Text muted       #6E6E73              eyebrow, captions
Text link rest   rgba(0,0,0,0.8)      80% black for links
Border           rgba(0,0,0,0.1)      hairline divider

Accent CTA       #0071E3              primary button + link hover
Accent hover     #0077ED              one-step lighter
```

### Typography
```
Display    Inter (SF Pro Display fallback)   weights 400, 500, 600
Body       Inter (SF Pro Text fallback)      weight 400 default
Mono       JetBrains Mono                    only for code/data tables

Scale       17px base, 1.3 ratio
Line-height 1.4 body / 1.05 display
Tracking    +0.007em on display ≥21px
            -0.022em on body ≤17px ("the Apple tighten")
            -0.005em on h1
```

### Imagery / Aesthetic
- **Mood**: light, warm, calm, refined, cutting-edge, minimal
- **Photography**: studio product shots on white. Real Apple CDN imagery for the moodboard demo (swap to commissioned Mongolian-context photography for prod)
- **Composition**: centered, symmetrical, generous negative space
- **Color grade**: clean, balanced. No moody desaturation.
- **Texture**: zero. Frosted nav is the only "material" texture
- **Motion**: Level 3 — Polished. 320ms `cubic-bezier(0.4, 0, 0.6, 1)` on color/transform. 80ms staggered tile reveal on scroll. Frosted nav has `saturate(1.8) blur(20px)` permanently

### Components

**Buttons:**
- Primary pill: 980px radius, padding 11px/21px, bg `#0071E3`, no shadow, hover bg `#0077ED`
- Secondary: text-only link with `›` chevron, color `#0071E3`, no underline
- Sentence case labels ("Buy", "Order in fleet", "Learn more")

**Cards (tiles):**
- 18–28px radius depending on viewport
- Bg white, tinted, or near-black; product photo bottom-anchored
- 80ms staggered entry on scroll, 320ms duration

**Inputs:**
- 44px tall, 8px radius, border `rgba(0,0,0,0.1)` → `#0071E3` on focus
- Floating label not used; static labels above

**Nav:**
- 48px tall, fixed, frosted (saturate 1.8 + blur 20), z-index 50
- Center-justified text links, `›` arrows on submenus

### Inspiration sources
1. apple.com landing — steal the tile-grid rhythm and 80ms stagger
2. apple.com/shop/buy-iphone — steal the sticky right-rail configurator on PDP
3. apple.com/macbook-pro — steal the marketing-PDP scroll storytelling cadence

---

## DIRECTION 2: Studio Restraint (V1 — Combine)

### Color
```
Header bg        #1E1E1E              near-black, NEVER pure
Header text      #FFFFFF
Header borders   rgba(255,255,255,0.15)

Body bg          #FFFFFF
Body alt         #EEF1F2              cool grey alt sections
Footer bg        #1E1E1E              matches header

Text primary     #000000              pure black (the contrast move)
Text muted       rgba(0,0,0,0.6)      60% black
Borders          rgba(0,0,0,0.1)
Tints            rgba(0,0,0,0.02 / 0.04 / 0.08)   opacity-layered hierarchy

Accent           #000000              monochrome system, accent IS black
Star/rating      #EBBF20              the only chromatic note
```

### Typography
```
Single family    DM Sans              all weights, all sizes
                                      400 for headings (light, editorial)
                                      500 for nav/buttons
                                      600 for emphasis (rare)

Scale       16px base, 1.3 line-height
            h2 80px / line 80px / weight 400 (editorial display)
            h3 36px / line 36px / weight 400
            body 16px / line 20.8px / weight 400
            button 16px / weight 500 / UPPERCASE / tracking normal

Tracking    0 everywhere — DM Sans's natural spacing is the answer
```

### Imagery / Aesthetic
- **Mood**: light, cool, calm, editorial, timeless, dense
- **Photography**: B&O-style. Single product centered, dramatic studio lighting. Product hero photography as art.
- **Composition**: editorial, asymmetric crops, dense alongside generous breathing rooms. Rule-of-thirds beats centered.
- **Color grade**: low-contrast, slight desaturation, honest exposure. No filter aesthetic.
- **Texture**: zero. The discipline IS the texture.
- **Motion**: Level 2 — Subtle. **175ms linear** on almost everything (signature). One overshoot curve `cubic-bezier(0.47, 1.64, 0.41, 0.8)` reserved for `width:0→100%` line draws. Scroll: native, no parallax.

### Components

**Buttons:**
- Primary: 30px radius (pill-ish, not full), padding 14px/24px, bg `#000`, color `#FFF`, **UPPERCASE**, tracking normal, weight 500
- Secondary: identical shape, bg transparent, 1px border `#000`
- No shadow. Ever.

**Cards:**
- 0px radius (sharp corners — the signature)
- 1px border `rgba(0,0,0,0.1)` OR background tint, never both
- Product image: 4:5 ratio, white bg, no tile padding around image
- Hover: product image scales 1→1.02 in 175ms linear, no shadow grow

**Inputs:**
- 48px tall, 10px radius, 1px border, focus = border darkens `rgba(0,0,0,0.6)`
- Inline placeholder labels

**Nav:**
- Permanent dark `#1E1E1E`, never frosted, never reactive
- 1.5em uppercase text links, 0.5em tracking
- Underline on active and hover (line draws via the overshoot curve)

### Inspiration sources
1. combine-theme-gadget.myshopify.com — steal the discipline of single font + linear motion
2. bang-olufsen.com — steal the photography weight (large, editorial, museum-quality)
3. hifish.com / cay-skin.com — steal the dense editorial copy rhythm

---

## Anti-preferences (BOTH directions)

### HARD NO

| Category | Banned | Why |
|---|---|---|
| Color | Stock corporate blue (`#0066CC` family that isn't Apple's exact accent) | Reads as bank stock template |
| Color | Mongolian-flag red/blue/yellow as accent | Cliché, instantly dates the site to a 2018 government tender |
| Type | Roboto, Open Sans, Lato | Default-stack tells |
| Type | Cyrillic without Golos Text or `next/font` Mongolian fallback | Garbled UI on Mongolian content kills trust |
| Type | Heading weight 700+ in V1 (Combine) | Breaks the editorial-restraint personality |
| Layout | Hero carousel | It's 2026 |
| Layout | Right-side cookie banner that covers the configurator | We had this on the old site, never again |
| Motion | Bounce easing on UI elements | Childish; reserve overshoot for decorative lines only |
| Motion | Page-load preloader animations longer than 600ms | We have a build to ship, not an interlude |
| Imagery | Stock photos of handshakes, headsets, "diverse team in glass office" | Generic procurement template energy |
| Imagery | AI-generated product renders | Procurement managers know |
| Components | Glassmorphism cards | One frosted layer (the nav) is enough — don't compound |
| Components | Gradient hero backgrounds | Apple doesn't, B&O doesn't, we don't |
| Content | "Empower your business", "Solutions", "Leverage", "Best-in-class" | LinkedIn corporate poison |
| Content | Exclamation marks anywhere | Confidence comes from product, not punctuation |
| Vibe | "Looks like a SaaS landing template" | If you can name the template in 5 seconds, redo |

### CAREFUL WITH

| Thing | Works when | Breaks when |
|---|---|---|
| Frosted nav (V2) | Hero has rich color/imagery behind it | Hero is solid white — frost becomes invisible noise |
| UPPERCASE buttons (V1) | Buttons are short verbs (BUY, SHOP) | Multi-word labels — "ORDER IN FLEET" reads like a stop sign |
| 80px h2 (V1) | One headline per section, 1–4 words | Used on long marketing copy — feels SHOUTY |
| Mongolian language | Static UI strings only | Long-form body copy without proper Cyrillic font + tracking adjust |

### SMELLS LIKE TEST (before shipping)

- [ ] Not a Shopify Dawn theme with a paint job
- [ ] Not "Apple but in Mongolian"
- [ ] Procurement manager at TDB or Khan Bank takes it seriously in 5 seconds
- [ ] A creative agency's office can put this on their wall without irony
- [ ] No exclamation marks anywhere
- [ ] No template energy (named it in 5 sec? redo)
- [ ] Cyrillic labels render without falling back to system font

---

## Hybrid considerations

For the production build:

- **V2 / Quiet Power** ships as the default Protech identity
- **V1 / Studio Restraint** is held as a "premium editorial" mode that activates for:
  - Marketing campaign pages (new MacBook launch, fleet program announcement)
  - The "fleet" sub-brand at `/v2/fleet` (potentially with V1 typography + V2 layout — still TBD)

Both directions share the same component contract (Tile, ProductCard, PDPConfigurator) — only tokens swap. The data model and routing stay identical between `/v2/*` and `/v1/*`.

---

## What lives where

| | Path |
|---|---|
| Design brief (this file) | `moodboard/DESIGN-BRIEF.md` |
| Interactive moodboard HTML | `moodboard/protech-design-direction.html` |
| V2 motion + token spec (extracted from apple.com) | `moodboard/var-2/apple-research/MOTION-SPEC.md` |
| V1 motion + token spec (extracted from Combine) | `moodboard/var-1/combine-research/MOTION-SPEC.md` |
| Built V2 routes | `app/v2/*` |
| 3D MacBook hero (archived for later) | `_archive/3d-hero/` |
| Live preview | `pnpm dev` → http://localhost:3000/v2 |
