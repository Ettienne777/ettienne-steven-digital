import { Suspense, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import Particles from './Particles'
import MarbleForm from './MarbleForm'
import { viewport } from '../../lib/viewport'
import { lerp } from '../../lib/utils'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'

/** Per-frame controller: smooths the pointer and drifts the camera for depth. */
function Rig({ reduce }: { reduce: boolean }) {
  const { camera } = useThree()
  useFrame(() => {
    // Smooth the raw pointer for everything downstream.
    viewport.smoothPointer.x = lerp(viewport.smoothPointer.x, viewport.pointer.x, 0.06)
    viewport.smoothPointer.y = lerp(viewport.smoothPointer.y, viewport.pointer.y, 0.06)

    if (reduce) return
    // Parallax the camera a touch toward the pointer, then re-frame the form.
    camera.position.x = lerp(camera.position.x, viewport.smoothPointer.x * 0.55, 0.04)
    camera.position.y = lerp(camera.position.y, viewport.smoothPointer.y * 0.4, 0.04)
    camera.lookAt(0, 0, 0)
  })
  return null
}

export default function Atmosphere() {
  const reduce = usePrefersReducedMotion()

  // Scale the particle field to the viewport for performance.
  const count = useMemo(() => {
    if (typeof window === 'undefined') return 700
    const w = window.innerWidth
    if (reduce) return 280
    if (w < 640) return 420
    if (w < 1100) return 700
    return 1000
  }, [reduce])

  return (
    <Canvas
      className="!fixed inset-0"
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 6], fov: 35 }}
    >
      <fogExp2 attach="fog" args={['#F6F3EE', 0.085]} />

      <ambientLight intensity={0.85} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} color="#FFFDF7" />
      <directionalLight position={[-4, -2, -3]} intensity={0.4} color="#70826B" />
      <pointLight position={[0, 2, 3]} intensity={6} color="#E9E6E1" distance={12} />

      <Suspense fallback={null}>
        <MarbleForm />
        <Particles count={count} />
      </Suspense>

      <Rig reduce={reduce} />
    </Canvas>
  )
}
