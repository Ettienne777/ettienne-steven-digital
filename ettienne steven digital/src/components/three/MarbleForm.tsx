import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { viewport } from '../../lib/viewport'
import { lerp } from '../../lib/utils'

/**
 * The sculptural centrepiece. Begins as an organic, marble-like form (forest /
 * nature) and resolves toward a calmer, more architectural mass as the hero
 * scrolls away — the mist → marble → architecture arc, in one object.
 */
export default function MarbleForm() {
  const group = useRef<THREE.Group>(null)
  const mat = useRef<any>(null)

  useFrame((_, delta) => {
    if (!group.current) return
    const p = viewport.heroProgress // 0 at top, 1 once hero has left

    // Ambient rotation, nudged by the pointer for mouse-reactive depth.
    group.current.rotation.y += delta * 0.12
    group.current.rotation.x = lerp(
      group.current.rotation.x,
      viewport.smoothPointer.y * 0.25,
      0.05,
    )
    group.current.rotation.z = lerp(
      group.current.rotation.z,
      viewport.smoothPointer.x * -0.18,
      0.05,
    )

    // Drift back and shrink slightly as we scroll into the architecture.
    group.current.position.z = lerp(group.current.position.z, -p * 1.4, 0.06)
    const s = lerp(1, 0.82, p)
    group.current.scale.setScalar(lerp(group.current.scale.x, s, 0.06))

    // Organic → resolved: distortion eases off as the journey hardens.
    if (mat.current) {
      mat.current.distort = lerp(mat.current.distort ?? 0.4, lerp(0.42, 0.1, p), 0.05)
      mat.current.speed = lerp(mat.current.speed ?? 1.2, lerp(1.4, 0.5, p), 0.05)
    }
  })

  return (
    <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.6}>
      <group ref={group}>
        <mesh>
          <icosahedronGeometry args={[1.45, 16]} />
          <MeshDistortMaterial
            ref={mat}
            color="#D9D5CE"
            roughness={0.45}
            metalness={0.12}
            distort={0.42}
            speed={1.4}
            flatShading={false}
          />
        </mesh>
      </group>
    </Float>
  )
}
