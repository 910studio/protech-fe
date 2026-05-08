'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import * as THREE from 'three'
import { debugState } from './debug-state'

export type Snapshot = {
  camPos: [number, number, number]
  camRot: [number, number, number]
  laptopPos: [number, number, number]
  laptopRot: [number, number, number]
  lidPivotRot: [number, number, number] | null
}

export type DebugRefs = {
  text: React.RefObject<HTMLPreElement | null>
  snapshot: React.RefObject<Snapshot | null>
}

// In-canvas reader — writes live camera + laptop info to a DOM ref each frame.
// Bypasses React render cycle to avoid 60fps re-renders.
export function SceneLogger({ refs }: { refs: DebugRefs }) {
  const { camera, scene } = useThree()
  useFrame(() => {
    const p = camera.position
    const r = camera.rotation

    // Find the laptop root group (the one with many descendants — the GLB tree).
    let laptopObj: THREE.Object3D | null = null
    let lidPivot: THREE.Object3D | null = null
    scene.traverse((obj) => {
      if (!laptopObj && obj.type === 'Group' && obj.children.length > 50) {
        laptopObj = obj
      }
      if (!lidPivot && obj.name === 'LidPivot') {
        lidPivot = obj
      }
    })

    const lp = laptopObj as THREE.Object3D | null
    const lpPos = lp?.position ?? new THREE.Vector3()
    const lpRot = lp?.rotation ?? new THREE.Euler()
    const lidRot = (lidPivot as THREE.Object3D | null)?.rotation ?? null

    if (refs.snapshot.current) {
      refs.snapshot.current = {
        camPos: [p.x, p.y, p.z],
        camRot: [r.x, r.y, r.z],
        laptopPos: [lpPos.x, lpPos.y, lpPos.z],
        laptopRot: [lpRot.x, lpRot.y, lpRot.z],
        lidPivotRot: lidRot ? [lidRot.x, lidRot.y, lidRot.z] : null,
      }
    }

    if (refs.text.current) {
      const fmt = (n: number) => n.toFixed(2)
      const deg = (rad: number) => `${((rad * 180) / Math.PI).toFixed(1)}°`
      refs.text.current.textContent =
`CAMERA
  pos:  [${fmt(p.x)}, ${fmt(p.y)}, ${fmt(p.z)}]
  rot:  [${deg(r.x)}, ${deg(r.y)}, ${deg(r.z)}]

LAPTOP (root group)
  pos:  [${fmt(lpPos.x)}, ${fmt(lpPos.y)}, ${fmt(lpPos.z)}]
  rot:  [${deg(lpRot.x)}, ${deg(lpRot.y)}, ${deg(lpRot.z)}]

LID PIVOT
  rot:  ${lidRot ? `[${deg(lidRot.x)}, ${deg(lidRot.y)}, ${deg(lidRot.z)}]` : 'not found'}`
    }
  })
  return null
}

// Out-of-canvas overlay panel with sliders + snapshot button.
export function DebugHUD({ refs }: { refs: DebugRefs }) {
  const [lidEnabled, setLidEnabled] = useState(false)
  const [lidDeg, setLidDeg] = useState(105)
  const [yEnabled, setYEnabled] = useState(false)
  const [yDeg, setYDeg] = useState(0)

  useEffect(() => {
    debugState.lidOverride = lidEnabled
    debugState.lidAngleRad = (lidDeg * Math.PI) / 180
  }, [lidEnabled, lidDeg])

  useEffect(() => {
    debugState.yOverride = yEnabled
    debugState.yAngleRad = (yDeg * Math.PI) / 180
  }, [yEnabled, yDeg])

  return (
    <div className="fixed top-4 left-4 z-50 bg-black/85 text-white p-4 rounded-lg backdrop-blur min-w-[320px] font-mono text-xs space-y-3 shadow-xl border border-white/10">
      <div className="font-bold tracking-wide text-[11px] text-white/90">
        DEBUG · drag the canvas to orbit
      </div>

      <pre
        ref={refs.text}
        className="text-[10px] leading-snug whitespace-pre opacity-90 bg-white/5 p-2 rounded"
      >
        waiting for first frame…
      </pre>

      <div className="space-y-1.5">
        <label className="flex items-center justify-between gap-2 text-[11px]">
          <span className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={lidEnabled}
              onChange={(e) => setLidEnabled(e.target.checked)}
            />
            <span>Lid rotation X override</span>
          </span>
          <span className="font-bold tabular-nums">{lidDeg}°</span>
        </label>
        <input
          type="range"
          min="-180"
          max="180"
          step="1"
          value={lidDeg}
          onChange={(e) => setLidDeg(+e.target.value)}
          className="w-full accent-white"
        />
      </div>

      <div className="space-y-1.5">
        <label className="flex items-center justify-between gap-2 text-[11px]">
          <span className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={yEnabled}
              onChange={(e) => setYEnabled(e.target.checked)}
            />
            <span>Laptop rotation Y override</span>
          </span>
          <span className="font-bold tabular-nums">{yDeg}°</span>
        </label>
        <input
          type="range"
          min="-180"
          max="180"
          step="1"
          value={yDeg}
          onChange={(e) => setYDeg(+e.target.value)}
          className="w-full accent-white"
        />
      </div>

      <button
        type="button"
        onClick={() => {
          const s = refs.snapshot.current
          if (!s) return
          const deg = (rad: number) => +((rad * 180) / Math.PI).toFixed(1)
          const fmt = (n: number) => +n.toFixed(2)
          const log = {
            camera: {
              position: s.camPos.map(fmt),
              rotationDeg: s.camRot.map(deg),
            },
            laptopRoot: {
              position: s.laptopPos.map(fmt),
              rotationDeg: s.laptopRot.map(deg),
            },
            lidPivot: s.lidPivotRot
              ? { rotationDeg: s.lidPivotRot.map(deg) }
              : null,
            overrides: { lidEnabled, lidDeg, yEnabled, yDeg },
          }
          const json = JSON.stringify(log, null, 2)
          // eslint-disable-next-line no-console
          console.log('[DEBUG SNAPSHOT]', json)
          navigator.clipboard?.writeText(json).catch(() => {})
        }}
        className="w-full bg-white text-black text-[11px] font-medium px-3 py-2 rounded hover:bg-white/90 transition-colors"
      >
        Log + copy snapshot
      </button>

      <p className="opacity-60 text-[10px] leading-snug">
        Drag = orbit · right-drag = pan · scroll = zoom · check a slider to
        freeze that axis while you reframe.
      </p>
    </div>
  )
}
