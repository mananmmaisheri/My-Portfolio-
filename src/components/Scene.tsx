import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei';

function AnimatedSphere() {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[1, 100, 200]} scale={2.4}>
        <MeshDistortMaterial
          color="#FB3640"
          attach="material"
          distort={0.4}
          speed={1.5}
          roughness={0}
          metalness={1}
        />
      </Sphere>
    </Float>
  );
}

export default function Scene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} color="#FB3640" intensity={2} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Suspense fallback={null}>
          <AnimatedSphere />
        </Suspense>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
