"""
Render a 60-frame laptop opening sequence for the Protech PDP hero scroll.

Workflow:
  1. Open Blender. File > Open the .blend or import the GLB/FBX laptop model.
  2. In the Outliner, find the lid/screen object. Note its exact name.
  3. Edit the CONFIG block below — set LID_OBJECT_NAME to that name.
  4. Open Scripting tab. Open Text > Open this file. Press "Run Script".
  5. Frames render to public/protech/frames/0001.png through 0060.png.

Defaults assume the model already has a camera and reasonable lighting.
If the scene is bare, set SETUP_STUDIO=True for a quick 3-point rig.
"""

import bpy
import math
from pathlib import Path

# ============================================================
# CONFIG — edit these
# ============================================================

LID_OBJECT_NAME = "lid"              # exact Outliner name of the lid/screen object
FRAME_COUNT = 60                     # 60 frames @ 60fps = 1s scroll-driven sequence
LID_CLOSED_ROT_X_DEG = -180          # lid rotation X when closed (typically -180 or 0)
LID_OPEN_ROT_X_DEG = -105            # lid rotation X when open (~75deg from flat)
RESOLUTION_X = 2400                  # 2x retina for sharpness; 1200x750 displayed
RESOLUTION_Y = 1500
TRANSPARENT_BG = True                # PNG alpha — composite cleanly in Next.js
ENGINE = 'BLENDER_EEVEE_NEXT'        # fast for iteration; switch to 'CYCLES' for hero
SAMPLES = 32                         # eevee: 32 is plenty; cycles: bump to 128
OUTPUT_DIR = "/Users/graychillin/projects/910studio/khatun-studio/protech-fe/public/protech/frames/"
SETUP_STUDIO = False                 # True = wipe scene cam+lights and add a 3-point rig

# ============================================================
# RENDER SETTINGS
# ============================================================

scene = bpy.context.scene
scene.frame_start = 1
scene.frame_end = FRAME_COUNT

scene.render.resolution_x = RESOLUTION_X
scene.render.resolution_y = RESOLUTION_Y
scene.render.resolution_percentage = 100
scene.render.fps = 60

scene.render.engine = ENGINE
if ENGINE == 'CYCLES':
    scene.cycles.samples = SAMPLES
    scene.cycles.use_denoising = True
elif ENGINE == 'BLENDER_EEVEE_NEXT':
    scene.eevee.taa_render_samples = SAMPLES

scene.render.image_settings.file_format = 'PNG'
scene.render.image_settings.color_mode = 'RGBA' if TRANSPARENT_BG else 'RGB'
scene.render.image_settings.compression = 50
scene.render.film_transparent = TRANSPARENT_BG

Path(OUTPUT_DIR).mkdir(parents=True, exist_ok=True)
scene.render.filepath = OUTPUT_DIR

# ============================================================
# OPTIONAL — quick studio rig if scene is bare
# ============================================================

if SETUP_STUDIO:
    # remove existing cameras + lights
    for obj in list(bpy.data.objects):
        if obj.type in {'CAMERA', 'LIGHT'}:
            bpy.data.objects.remove(obj, do_unlink=True)

    # 3/4 hero camera
    cam_data = bpy.data.cameras.new("HeroCam")
    cam_data.lens = 50
    cam = bpy.data.objects.new("HeroCam", cam_data)
    cam.location = (0.6, -0.9, 0.35)
    cam.rotation_euler = (math.radians(75), 0, math.radians(35))
    bpy.context.collection.objects.link(cam)
    scene.camera = cam

    # key light (warm)
    key_data = bpy.data.lights.new("Key", type='AREA')
    key_data.energy = 800
    key_data.size = 1.5
    key_data.color = (1.0, 0.95, 0.88)
    key = bpy.data.objects.new("Key", key_data)
    key.location = (1.5, -1.0, 1.5)
    key.rotation_euler = (math.radians(45), math.radians(20), 0)
    bpy.context.collection.objects.link(key)

    # fill light (cool, soft)
    fill_data = bpy.data.lights.new("Fill", type='AREA')
    fill_data.energy = 200
    fill_data.size = 2.0
    fill_data.color = (0.85, 0.9, 1.0)
    fill = bpy.data.objects.new("Fill", fill_data)
    fill.location = (-1.5, -0.5, 1.0)
    fill.rotation_euler = (math.radians(60), math.radians(-15), 0)
    bpy.context.collection.objects.link(fill)

    # rim light (back accent)
    rim_data = bpy.data.lights.new("Rim", type='AREA')
    rim_data.energy = 400
    rim_data.size = 1.0
    rim = bpy.data.objects.new("Rim", rim_data)
    rim.location = (0, 1.5, 1.2)
    rim.rotation_euler = (math.radians(-65), 0, 0)
    bpy.context.collection.objects.link(rim)

# ============================================================
# ANIMATE THE LID
# ============================================================

lid = bpy.data.objects.get(LID_OBJECT_NAME)
if not lid:
    available = sorted(o.name for o in bpy.data.objects)
    raise Exception(
        f"\n\nLid object '{LID_OBJECT_NAME}' not found.\n"
        f"Edit LID_OBJECT_NAME at the top of this script to one of:\n  - "
        + "\n  - ".join(available)
    )

# Clear any existing rotation animation on the lid
if lid.animation_data:
    lid.animation_data_clear()

lid.rotation_mode = 'XYZ'

lid.rotation_euler[0] = math.radians(LID_CLOSED_ROT_X_DEG)
lid.keyframe_insert(data_path="rotation_euler", frame=1, index=0)

lid.rotation_euler[0] = math.radians(LID_OPEN_ROT_X_DEG)
lid.keyframe_insert(data_path="rotation_euler", frame=FRAME_COUNT, index=0)

# Smooth ease-in-out so the open feels mechanical, not linear
if lid.animation_data and lid.animation_data.action:
    for fcurve in lid.animation_data.action.fcurves:
        for kp in fcurve.keyframe_points:
            kp.interpolation = 'BEZIER'
            kp.easing = 'EASE_IN_OUT'

# ============================================================
# RENDER
# ============================================================

print(f"\n>>> Rendering {FRAME_COUNT} frames to {OUTPUT_DIR}")
print(f">>> Engine: {ENGINE} @ {RESOLUTION_X}x{RESOLUTION_Y}, {SAMPLES} samples\n")

bpy.ops.render.render(animation=True)

print(f"\n>>> Done. Frames in {OUTPUT_DIR}")
