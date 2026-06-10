import { Suspense, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer, Sparkles } from '@react-three/drei'
import Particles from './Particles'
import MarbleForm from './MarbleForm'
import { viewport } from '../../lib/viewport'
import { lerp } from '../../lib/utils'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'

/** Per-frame controller: smooths the pointer and drifts the camera for depth. */
function Rig({ reduce }: { reduce: boolean }) {
  const { camera } = useThree()
  useFrame(() => {
    viewport.smoothPointer.x = lerp(viewport.smoothPointer.x, viewport.pointer.x, 0.06)
    viewport.smoothPointer.y = lerp(viewport.smoothPointer.y, viewport.pointer.y, 0.06)

    if (reduce) return
    camera.position.x = lerp(camera.position.x, viewport.smoothPointer.x * 0.7, 0.04)
    camera.position.y = lerp(camera.position.y, viewport.smoothPointer.y * 0.5, 0.04)
    camera.lookAt(0, 0, 0)
  })
  return null
}

/** A hand-built studio environment — gives the marble form real reflections,
 *  fully offline (no HDRI download needed). */
function StudioEnvironment() {
  return (
    <Environment resolution={256}>
      <group>
        {/* Soft key panel from above */}
        <Lightformer form="rect" intensity={3} position={[0, 4, -3]} scale={[10, 5, 1]} color="#FFF8EC" />
        {/* Cool fill from the left */}
        <Lightformer form="rect" intensity={1.4} position={[-5, 0, 1]} scale={[3, 8, 1]} color="#EDEAE3" />
        {/* Warm sage rim from the right */}
        <Lightformer form="circle" intensity={2.2} position={[5, -1, 2]} scale={5} color="#9FB098" />
        {/* Subtle underlight for translucency */}
        <Lightformer form="rect" intensity={0.8} position={[0, -4, 1]} scale={[8, 3, 1]} color="#F6F3EE" />
      </group>
    </Environment>
  )
}

export default function Atmosphere() {
  const reduce = usePrefersReducedMotion()

  const count = useMemo(() => {
    if (typeof window === 'undefined') return 900
    const w = window.innerWidth
    if (reduce) return 320
    if (w < 640) return 600
    if (w < 1100) return 1000
    return 1500
  }, [reduce])

  return (
    <Canvas
      className="!fixed inset-0"
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 6], fov: 35 }}
    >
      <fogExp2 attach="fog" args={['#F6F3EE', 0.075]} />

      {/* Direct lights work alongside the environment for contrast + shadow shape */}
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 5, 4]} intensity={1.6} color="#FFFDF7" />
      <directionalLight position={[-4, -1, -2]} intensity={0.5} color="#70826B" />
      <pointLight position={[2, 2, 3]} intensity={9} color="#FFF3DE" distance={14} />
      <pointLight position={[-3, -2, 1]} intensity={5} color="#9FB098" distance={12} />

      <Suspense fallback={null}>
        <StudioEnvironment />
        <MarbleForm />

        {/* Two dust layers: fine far motes + larger soft near motes for depth */}
        <Particles count={count} color="#70826B" size={30} depth={8} />
        <Particles count={Math.round(count * 0.18)} color="#E6E0D4" size={70} depth={5} />

        {/* A whisper of premium shimmer */}
        {!reduce && (
          <Sparkles count={45} scale={[11, 9, 5]} size={3} speed={0.3} opacity={0.5} color="#C9A86A" />
        )}
      </Suspense>

      <Rig reduce={reduce} />
    </Canvas>
  )
}
