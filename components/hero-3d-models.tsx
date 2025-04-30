"use client"

import { useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { useGLTF, Environment, OrbitControls, Float, Text } from "@react-three/drei"
import { motion } from "framer-motion"
import { Suspense } from "react"

// Individual model component with independent controls
function Model({ position, url, color, scale = 1.5, name }) {
  const { scene } = useGLTF(url)
  const modelRef = useRef()

  // Clone the scene to avoid modifying the original
  const clonedScene = scene.clone()

  // Apply color to all meshes in the scene if color is provided
  if (color) {
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        child.material = child.material.clone()
        child.material.color.set(color)
      }
    })
  }

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position} scale={[scale, scale, scale]} ref={modelRef}>
        <primitive object={clonedScene} />
        <Text position={[0, -1.5, 0]} fontSize={0.2} color="white" anchorX="center" anchorY="middle">
          {name}
        </Text>
      </group>
    </Float>
  )
}

export default function Hero3DModels() {
  return (
    <motion.div
      className="relative w-full h-[400px] md:h-[500px]"
      initial={{ opacity: 0 }}  
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <Canvas camera={{ position: [0, 0, 10], fov: 40 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

          {/* Each model has its own independent controls */}
          <Model position={[-3, 0, 0]} url="/assets/3d/duck.glb" color="#9333ea" name="AR Filters" />

          <Model position={[3, 0, 0]} url="/assets/3d/duck.glb" color="#06b6d4" name="3D Models" />

          <Model position={[-3, -4, 0]} url="/assets/3d/duck.glb" color="#ec4899" name="Animations" />

          <Model position={[3, -4, 0]} url="/assets/3d/duck.glb" color="#f97316" name="Effects" />

          <OrbitControls enableZoom={false} enablePan={false} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </motion.div>
  )
}
