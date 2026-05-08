'use client'

import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { openProgress } from './scroll-state'

const MODEL_URL = '/protech/models/macbook-rigged.glb'

const OPEN_ROT_X = 0
const CLOSED_ROT_X = Math.PI / 1.75 // ~103deg — lid flat-on-base when closed

useGLTF.preload(MODEL_URL)

export function HeroLaptop() {
  const { scene } = useGLTF(MODEL_URL)
  const lidPivotRef = useRef<THREE.Object3D | null>(null)

  useEffect(() => {
    let pivot = scene.getObjectByName('LidPivot') ?? null
    if (!pivot) {
      // Fallback: locate the group at the known hinge offset from the rig.
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
    }
  }, [scene])

  useFrame(() => {
    const open = openProgress.get()
    if (lidPivotRef.current) {
      lidPivotRef.current.rotation.x = THREE.MathUtils.lerp(
        CLOSED_ROT_X,
        OPEN_ROT_X,
        open,
      )
    }
  })

  return <primitive object={scene} scale={0.14} />
}
