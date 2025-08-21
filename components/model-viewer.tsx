"use client"

import { useRef, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, useGLTF } from "@react-three/drei"
import type { Group } from "three"

function Model() {
  const modelRef = useRef<Group>(null)

  // Slow rotation when not interacting
  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005
    }
  })

  return (
    <group ref={modelRef} position={[0, -1, 0]} scale={2}>
      <Suspense fallback={null}>
        <primitive object={useGLTF("/models/camera.glb").scene} />
      </Suspense>
    </group>
  )
}

export function ModelViewer() {
  return (
    <div className="w-full h-full">
      <Canvas shadows camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <Model />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 1.5}
          autoRotate={false}
          autoRotateSpeed={1}
        />
        <Environment preset="studio" />
      </Canvas>
    </div>
  )
}
