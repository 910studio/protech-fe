# Brief — rig macbook.glb for scroll-driven hinge animation

**For:** Claude with Blender MCP attached
**From:** Claude in Cursor working in `/Users/graychillin/projects/910studio/khatun-studio/protech-fe/`

## Context

We're building a B2B laptop PDP hero where a 3D MacBook starts closed, opens as the user scrolls, then translates to the left half of the viewport while spec content scrolls in on the right. We're rendering with React Three Fiber at runtime (not a baked image sequence) so we have live control over camera, materials, scroll progress.

The downloaded GLB is unrigged — 60+ flat meshes (`Object_10` … `Object_131`) parented under one root group. There's no separate lid object to hinge. We need you to add the rig in Blender so we can rotate **one node** in R3F and have the entire lid swing on the hinge.

## Input

- File: `/Users/graychillin/projects/910studio/khatun-studio/protech-fe/public/protech/models/macbook.glb`
- Source: Sketchfab "macbook pro M3 16 inch 2024" by jackbaeten, CC-BY-4.0 (~11MB)
- Probably in OPEN pose by default (lid raised at typical viewing angle)

## Task

1. **Open the GLB in Blender.**

2. **Identify lid meshes** — every mesh that's part of the screen assembly (display panel, lid back/aluminum housing, screen bezel, camera notch, Apple logo, antenna strips on the lid edge). The base/keyboard/trackpad/ports/feet/speakers stay separate.
   - Easiest method: switch to side view, box-select everything above the hinge line. Verify in the Outliner.
   - Or sort by Z (or whichever axis is "up" in this GLB's coord system) — meshes whose centroid sits above the hinge plane = lid.

3. **Create an Empty named `LidPivot`** at the **hinge axis**:
   - Position: along the back edge of the keyboard base, at the height where the lid meets the base (the literal hinge cylinder location).
   - Orientation: doesn't matter for the empty itself, but its rotation X (or whichever local axis runs left-right along the hinge) is what we'll animate.

4. **Parent all lid meshes to `LidPivot`** using "Set Parent → Object (Keep Transform)" so positions don't shift.

5. **Sanity-check** by rotating `LidPivot` ±30° on the hinge axis. Lid should swing. Base, keyboard, trackpad, ports stay still. If the lid clips through the base or rotates around the wrong point, adjust the Empty's position and/or its parent rotation.

6. **Leave the lid in its OPEN default pose.** We'll animate from open → closed → open in R3F. This way the GLB renders correctly out-of-the-box without our code.

7. **Export** as GLB binary:
   - Output: `/Users/graychillin/projects/910studio/khatun-studio/protech-fe/public/protech/models/macbook-rigged.glb`
   - Include: Custom Properties ✓, Selected Objects only ✗ (export everything), +Y Up (gltf default), Compression: Draco if you can (cuts size 60–80%, R3F's drei `useGLTF` decodes it natively)

## What I need to know back

After export, drop these into the chat:

- **Confirmation** that `LidPivot` is in the GLB hierarchy (visible in Blender's Outliner).
- **Hinge axis** — which local axis of `LidPivot` opens/closes the lid (`x`, `y`, or `z`)? And which sign (positive or negative) opens it more?
- **Open angle** — what's the lid's current rotation on the hinge axis when fully open in this pose? (Usually somewhere between 100° and 130° from closed.)
- **Closed angle** — what rotation value makes the lid sit flat against the base?
- **Final filesize** — sanity check on the export.

I'll wire those into R3F as constants and the lid will animate cleanly off scroll progress.

## Notes

- Don't bake any animation into the GLB. We drive rotation in code.
- Don't simplify materials or geometry. Keep the source quality.
- If Draco compression breaks anything weird (rare), export uncompressed — we can compress later via `gltf-transform`.
- If the laptop's "up" axis is +Z instead of +Y in Blender's coord system, that's fine — drei's `useGLTF` handles whatever the GLB ships. Just tell me which `LidPivot` axis is the hinge and we're good.

## Why this matters

Once this lands, our R3F code is:

```ts
const { nodes } = useGLTF('/protech/models/macbook-rigged.glb')
const lidPivot = nodes.LidPivot
useFrame(() => {
  lidPivot.rotation.x = THREE.MathUtils.lerp(CLOSED, OPEN, scrollProgress)
})
```

Three lines. Versus 50 lines of runtime bounding-box classification + manual reparenting that might fail on the model's coord conventions. **You handling the rig in Blender saves us hours of debug + makes the runtime code clean.**

Thanks bro.
