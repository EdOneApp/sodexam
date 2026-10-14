import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { aeroports } from '../data/aeroports'

function latLonToVec3(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  )
}

function Scene() {
  const group = useRef<THREE.Group>(null)
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.12
  })

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[1.5, 48, 48]} />
        <meshStandardMaterial color="#1f1812" roughness={0.9} metalness={0.1} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.52, 48, 48]} />
        <meshBasicMaterial color="#22D3EE" wireframe transparent opacity={0.12} />
      </mesh>
      {aeroports.map((a) => {
        const pos = latLonToVec3(a.lat, a.lon, 1.53)
        return (
          <mesh key={a.code} position={pos}>
            <sphereGeometry args={[0.028, 12, 12]} />
            <meshBasicMaterial color={a.statut === 'service' ? '#F15A24' : '#22D3EE'} />
          </mesh>
        )
      })}
    </group>
  )
}

export function Globe3D() {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 4.2], fov: 42 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 2, 4]} intensity={1.2} />
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
