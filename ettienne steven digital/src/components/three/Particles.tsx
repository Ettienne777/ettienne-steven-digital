import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { particlesVertex, particlesFragment } from './shaders/particles'
import { viewport } from '../../lib/viewport'

interface ParticlesProps {
  count?: number
  color?: string
  size?: number
  depth?: number
}

const RANGE = 16

/** A drifting field of light motes rendered as a single GPU point cloud. */
export default function Particles({
  count = 900,
  color = '#70826B',
  size = 32,
  depth = 8,
}: ParticlesProps) {
  const matRef = useRef<THREE.ShaderMaterial>(null)
  const { gl } = useThree()

  const { positions, scales, speeds, offsets } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const scales = new Float32Array(count)
    const speeds = new Float32Array(count)
    const offsets = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 14
      positions[i * 3 + 1] = (Math.random() - 0.5) * RANGE
      positions[i * 3 + 2] = (Math.random() - 0.5) * depth
      scales[i] = Math.random() * 0.85 + 0.15
      speeds[i] = Math.random() * 0.5 + 0.12
      offsets[i] = Math.random() * Math.PI * 2
    }
    return { positions, scales, speeds, offsets }
  }, [count, depth])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: size },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uColor: { value: new THREE.Color(color) },
      uRange: { value: RANGE },
    }),
    [color, gl, size],
  )

  useFrame((_, delta) => {
    if (!matRef.current) return
    const u = matRef.current.uniforms
    u.uTime.value += delta
    u.uPointer.value.set(viewport.smoothPointer.x, viewport.smoothPointer.y)
  })

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
        <bufferAttribute attach="attributes-aSpeed" args={[speeds, 1]} />
        <bufferAttribute attach="attributes-aOffset" args={[offsets, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        vertexShader={particlesVertex}
        fragmentShader={particlesFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  )
}
