# 3D Hero — Archive

Stashed on 2026-05-08 to clear runway for the var-1 / var-2 ecommerce build. The work was solid (scroll-driven MacBook lid open + slide + port-rotate over 500vh), reactivate when needed.

## What's in here

```
_archive/3d-hero/
  page.tsx                      ← old app/page.tsx (just renders <HeroSection />)
  _components/
    HeroSection.tsx             ← the 5-section sticky scroll narrative
    Scene.tsx                   ← R3F Canvas wrapper (lights, camera, env)
    HeroLaptop.tsx              ← GLTF loader + animation logic
    DebugHUD.tsx                ← live progress overlay (dev-only)
    scroll-state.ts             ← motion values: openProgress, shiftProgress, portFocusProgress
    debug-state.ts              ← debug toggle state
  _inspect/
    Macbook.tsx                 ← gltfjsx output for macbook.glb (mesh tree reference)
    MacbookRigged.tsx           ← gltfjsx output for macbook-rigged.glb
  scripts/
    BLENDER_BRIEF.md            ← brief used to rig the macbook (hinge animation)
    render-laptop-sequence.py   ← Blender Python script for fallback frame-sequence render
```

## What stayed in place (intentional)

- `app/lib/motion.ts` — generic easing tokens (`easeOutExpo`, `easeInOutCubic`, `reveal`, `pageTransition`). Reusable for ecommerce, not 3D-specific.
- `public/protech/models/*.glb` — heavy binaries, path-stable means restore "just works".
- All deps in `package.json` — keep `@react-three/fiber`, `drei`, `three`, `motion`, `gsap`, `lenis`. Ecommerce build will use motion + lenis + gsap regardless.

## External assets (NOT moved — still live in `public/`)

```
public/protech/models/
  macbook.glb
  macbook-rigged.glb
public/protech/frames/
  README.md  (placeholder — was for image-sequence fallback)
```

These stay in place because:
1. They're heavy binaries — pointless to move
2. Path-stable means restoring just works
3. Next.js doesn't ship `public/` files until referenced, so cost is zero

## Stack used

- `@react-three/fiber` ^9.6.1
- `@react-three/drei` ^10.7.7
- `three` ^0.184.0
- `motion` ^12.38.0 (formerly framer-motion — `useScroll`, `useMotionValueEvent`, `motion-values`)
- `gsap` ^3.15.0 (installed but minimally used here)
- `lenis` ^1.3.23 (installed for smooth scroll, not yet wired in this version)

All still in `package.json`. **Don't uninstall** — they'll be needed for the ecommerce build's 3D moments anyway.

## How to restore (when the ecommerce shell is ready and we want to drop the 3D hero into a route)

### Option A — full restore as homepage
```bash
# from protech-fe/
mv _archive/3d-hero/page.tsx       app/page.tsx
mkdir -p app/_components
mv _archive/3d-hero/_components/*  app/_components/
mv _archive/3d-hero/_inspect       _inspect
mv _archive/3d-hero/scripts        scripts
rmdir _archive/3d-hero/_components _archive/3d-hero
```

### Option B — drop into a sub-route (recommended for ecommerce build)
The hero is a great PDP centerpiece. Put it under `/products/[slug]` or a marketing route:

```bash
mkdir -p app/products/macbook-pro/_components
mv _archive/3d-hero/_components/* app/products/macbook-pro/_components/
mv _archive/3d-hero/page.tsx       app/products/macbook-pro/page.tsx
# update import paths inside HeroSection.tsx if needed (relative './_components/...' is unchanged)
```

### Option C — turn into a reusable section
Wrap `HeroSection` so it accepts product data + copy as props, then it can be used across multiple PDPs.

## Caveats / things to fix on restore

1. `HeroSection.tsx` has hard-coded copy ("Built for the work that runs Mongolia.", "Order in fleet", etc.) — extract to props.
2. The trust-logos grid is placeholder — wire to CMS.
3. `Scene.tsx` uses fixed lights and DPR — verify on lower-end devices before shipping.
4. `DebugHUD` is unconditionally imported in dev — guard with `process.env.NODE_ENV === 'development'` if it isn't already.
5. Sticky 500vh section + `useScroll` works fine alone but conflicts with Lenis if Lenis lands later — Lenis hooks into scroll events and motion's `useScroll` may need the Lenis scroll proxy instead of native.
6. Scroll snap on inner `<article>` cards (`snap-start`) requires snap on a parent container — looked unwired in the old version. Check whether snap should live on `<html>`, the section, or get removed entirely.

## Why this got archived (context for future-self)

May 8, 2026 — moodboard research finalized for var-1 (Combine theme, B&O-like editorial) and var-2 (Apple, frosted-corporate). Decision: build the actual ecommerce shell first (PLP grid, PDP layout, cart drawer, nav system), then drop this 3D hero into the most-relevant PDP once the system is ready. Building in order: structure → motion details → 3D moments.

Don't lose the GLBs. Don't uninstall the deps. The work is solid.
