# Protech hero frame sequence

60 PNG frames (`0001.png` → `0060.png`) of a laptop opening from closed to ~75° open. Driven by scroll progress in the hero section.

## To populate

1. Pick a CC0 / Public Domain laptop model. Recommended sources, in order:
   - **Sketchfab** — search `laptop` + filter "Downloadable" + license "CC0 / Public Domain". Avoid anything labeled MacBook (trademark). Look for "ultrabook", "thin laptop", "notebook computer".
   - **BlenderKit** (free tier, in-Blender) — Asset Browser → Models → search "laptop" → free filter.
   - **Polyhaven** — limited laptop selection but rock-solid CC0.
   - **Free3D** — usable but watch licenses, often "personal use only".

2. Open in Blender. Identify the lid/screen object name in the Outliner.

3. Run `protech-fe/scripts/render-laptop-sequence.py` (Scripting tab → Open → Run).

4. Frames land here. Done.

## Spec

- Resolution: 2400 × 1500 (2x retina; displayed at ~1200 wide)
- Format: PNG with alpha (transparent background — composites over any hero bg)
- Engine default: Eevee Next (fast iteration). Switch to Cycles for the final hero render before pitch.
- Animation: lid rotates from closed (-180°) → ~75° open across 60 frames, ease-in-out.

## Rendering checklist before pitch day

- [ ] Switch script ENGINE to `'CYCLES'` and SAMPLES to `128` for the hero render
- [ ] Verify all 60 frames have alpha (no white background bleeding through)
- [ ] First frame (0001.png) shows fully-closed lid
- [ ] Frame 60 shows ~75° open with screen content visible
- [ ] Filesize per frame under 500KB for fast preload (use TinyPNG batch if heavier)
