import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { viewport } from '../../lib/viewport'
import { lerp } from '../../lib/utils'

/**
 * The sculptural centrepiece. A polished marble-glass form that catches the
 * studio environment for real reflections. It begins organic and resolves
 * toward a calmer, architectural mass as the hero scrolls away.
 */
export default function MarbleForm() {
  const group = useRef<THREE.Group>(null)
  const mat = useRef<any>(null)
  const t = useRef(0)

  useFrame((_, delta) => {
    if (!group.current) return
    t.current += delta
    const p = viewport.heroProgress // 0 at top, 1 once hero has left

    // Ambient rotation, nudged by the pointer for mouse-reactive depth.
    group.current.rotation.y += delta * 0.14
    group.current.rotation.x = lerp(group.current.rotation.x, viewport.smoothPointer.y * 0.3, 0.05)
    group.current.rotation.z = lerp(group.current.rotation.z, viewport.smoothPointer.x * -0.22, 0.05)

    // Drift back as we scroll into the architecture, with a gentle breath.
    group.current.position.z = lerp(group.current.position.z, -p * 1.6, 0.06)
    const breathe = Math.sin(t.current * 0.6) * 0.035
    const target = lerp(1.06, 0.82, p) + breathe
    group.current.scale.setScalar(lerp(group.current.scale.x, target, 0.06))

    // Organic → resolved: distortion eases off as the journey hardens.
    if (mat.current) {
      mat.current.distort = lerp(mat.current.distort ?? 0.5, lerp(0.52, 0.12, p), 0.05)
      mat.current.speed = lerp(mat.current.speed ?? 1.6, lerp(1.7, 0.5, p), 0.05)
    }
  })

  return (
    <Float speed={1.3} rotationIntensity={0.35} floatIntensity={0.9}>
      <group ref={group}>
        <mesh>
          <icosahedronGeometry args={[1.6, 20]} />
          <MeshDistortMaterial
            ref={mat}
            color="#EDEAE3"
            roughness={0.12}
            metalness={0.04}
            clearcoat={1}
            clearcoatRoughness={0.22}
            envMapIntensity={1.5}
            distort={0.52}
            speed={1.7}
          />
        </mesh>
      </group>
    </Float>
  )
}
