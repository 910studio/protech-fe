'use client'

import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { openProgress, shiftProgress, portFocusProgress } from './scroll-state'
import { debugState } from './debug-state'

const MODEL_URL = '/protech/models/macbook-rigged.glb'

// Hinge tuning. Open = current GLB default pose. Closed = lid flat on base.
// Sign + magnitude tuned by visual iteration; flip sign if lid swings the wrong way.
const OPEN_ROT_X = 0
const CLOSED_ROT_X = Math.PI / 1.75 // ~ +103deg — flip sign here if lid swings the wrong direction

// Baseline Y rotation for the whole laptop. 0 = screen faces camera at end (front view).
// Logo orientation in top-down hero is a model-authoring quirk; fixable separately if needed.
const BASE_ROT_Y = 0

// Final left-shift in world units. At cam (0, 2.74, 0.06) fov 35 / 16:9 the
// viewport at y=0 is ~3.07 units wide — half is 1.54. -0.78 places the laptop
// center at ~25% from the left edge, fully inside the left half.
const SHIFT_X_MAX = -0.78

// Y-rotation revealing side ports. ~30deg max — enough to see the I/O without
// breaking silhouette legibility from the right column reader.
const PORT_ROT_Y_MAX = Math.PI / 6

useGLTF.preload(MODEL_URL)

export function HeroLaptop() {
  const { scene } = useGLTF(MODEL_URL)
  const rootRef = useRef<THREE.Group>(null)
  const lidPivotRef = useRef<THREE.Object3D | null>(null)

  useEffect(() => {
    let pivot = scene.getObjectByName('LidPivot') ?? null

    if (!pivot) {
      // Fallback: locate the group at the known hinge offset (0, -0.35, -11.82).
      scene.traverse((obj) => {
        if (pivot) return
        const p = obj.position
        if (
          Math.abs(p.x) < 0.05 &&
          Math.abs(p.y + 0.35) < 0.1 &&
          Math.abs(p.z + 11.82) < 0.5
        ) {
          pivot = obj
        }
      })
    }

    if (pivot) {
      lidPivotRef.current = pivot
      pivot.rotation.x = CLOSED_ROT_X
      // eslint-disable-next-line no-console
      console.log('[HeroLaptop] LidPivot locked:', pivot.name || '(unnamed)', {
        position: pivot.position.toArray(),
        initialRotX: CLOSED_ROT_X,
      })
    } else {
      // eslint-disable-next-line no-console
      console.warn('[HeroLaptop] LidPivot NOT found — lid will stay static')
    }
  }, [scene])

  useFrame(() => {
    const open = openProgress.get()
    const shift = shiftProgress.get()
    const port = portFocusProgress.get()

    if (lidPivotRef.current) {
      lidPivotRef.current.rotation.x = debugState.lidOverride
        ? debugState.lidAngleRad
        : THREE.MathUtils.lerp(CLOSED_ROT_X, OPEN_ROT_X, open)
    }
    if (rootRef.current) {
      rootRef.current.position.x = THREE.MathUtils.lerp(0, SHIFT_X_MAX, shift)
      rootRef.current.rotation.y = debugState.yOverride
        ? debugState.yAngleRad
        : BASE_ROT_Y + THREE.MathUtils.lerp(0, PORT_ROT_Y_MAX, port)
    }
  })

  return <primitive ref={rootRef} object={scene} scale={0.12} />
}
