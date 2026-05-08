'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, OrbitControls } from '@react-three/drei'
import { Suspense, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { HeroLaptop } from './HeroLaptop'
import { openProgress } from './scroll-state'
import { DebugHUD, SceneLogger, type DebugRefs, type Snapshot } from './DebugHUD'

const deg = (n: number) => (n * Math.PI) / 180

// Top-down hero (closed lid) — baked from Gray's debug snapshot 2026-05-03.
// Z-rotation of ~-180° rolls the camera so the logo reads correctly without
// rotating the model.
const CAM_TOP_POS = new THREE.Vector3(0, 2.72, -0.33)
const CAM_TOP_QUAT = new THREE.Quaternion().setFromEuler(
  new THREE.Euler(deg(-97), deg(-0.1), deg(-179.6), 'XYZ')
)

// Open-lid pose — also top-down, but un-rolled. As the camera transitions
// from CAM_TOP to CAM_FRONT, it slerps off the 180° Z roll, "righting itself"
// while the lid opens. Baked from Gray's debug snapshot 2026-05-03.
const CAM_FRONT_POS = new THREE.Vector3(0, 2.74, 0.06)
const CAM_FRONT_QUAT = new THREE.Quaternion().setFromEuler(
  new THREE.Euler(deg(-88.7), deg(0), deg(0), 'XYZ')
)

function CameraRig() {
  const { camera } = useThree()
  useFrame(() => {
    const t = openProgress.get()
    camera.position.lerpVectors(CAM_TOP_POS, CAM_FRONT_POS, t)
    camera.quaternion.slerpQuaternions(CAM_TOP_QUAT, CAM_FRONT_QUAT, t)
  })
  return null
}

export function Scene() {
  const [debug, setDebug] = useState(false)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDebug(new URLSearchParams(window.location.search).has('debug'))
    }
  }, [])

  const debugRefs: DebugRefs = {
    text: useRef<HTMLPreElement | null>(null),
    snapshot: useRef<Snapshot | null>({
      camPos: [0, 0, 0],
      camRot: [0, 0, 0],
      laptopPos: [0, 0, 0],
      laptopRot: [0, 0, 0],
      lidPivotRot: null,
    }),
  }

  return (
    <>
      <Canvas
        camera={{ position: [CAM_TOP_POS.x, CAM_TOP_POS.y, CAM_TOP_POS.z], fov: 35 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.7} />
          <hemisphereLight args={['#ffffff', '#dde2ee', 0.5]} />
          <directionalLight position={[5, 6, 4]} intensity={1.2} color="#fff7e8" />
          <directionalLight position={[-5, 3, -3]} intensity={0.5} color="#bcd0ff" />
          <directionalLight position={[0, 4, -6]} intensity={0.3} color="#ffffff" />

          <HeroLaptop />

          <ContactShadows
            position={[0, -0.55, 0]}
            opacity={0.45}
            blur={2.4}
            far={3}
            scale={6}
          />

          {!debug && <CameraRig />}
          {debug && <SceneLogger refs={debugRefs} />}
        </Suspense>

        {debug && <OrbitControls makeDefault />}
      </Canvas>

      {debug && <DebugHUD refs={debugRefs} />}
    </>
  )
}
