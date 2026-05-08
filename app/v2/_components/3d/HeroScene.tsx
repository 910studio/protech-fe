'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows } from '@react-three/drei'
import { Suspense } from 'react'
import * as THREE from 'three'
import { HeroLaptop } from './HeroLaptop'
import { openProgress } from './scroll-state'

const deg = (n: number) => (n * Math.PI) / 180

// Closed lid — top-down view, pulled WAY back so the laptop floats in the
// middle of the canvas with plenty of pastel bg showing around it.
const CAM_TOP_POS = new THREE.Vector3(0, 9, -0.8)
const CAM_TOP_QUAT = new THREE.Quaternion().setFromEuler(
  new THREE.Euler(deg(-97), deg(-0.1), deg(-179.6), 'XYZ'),
)

// Open lid — front-quarter view, also pulled back to keep the laptop
// proportional and bg visible.
const CAM_FRONT_POS = new THREE.Vector3(0, 5.5, 11)
const CAM_FRONT_QUAT = new THREE.Quaternion().setFromEuler(
  new THREE.Euler(deg(-22), deg(0), deg(0), 'XYZ'),
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

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [CAM_TOP_POS.x, CAM_TOP_POS.y, CAM_TOP_POS.z], fov: 30 }}
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
          opacity={0.22}
          blur={3}
          far={3}
          scale={4}
        />

        <CameraRig />
      </Suspense>
    </Canvas>
  )
}
