import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Text, MeshDistortMaterial, Sphere, Capsule, Box, MeshWobbleMaterial, Torus, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

export default function Hero3D() {
  const groupRef = useRef<THREE.Group>(null);
  const monitorRef = useRef<THREE.Mesh>(null);
  const characterRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t / 4) * 0.1;
      groupRef.current.position.y = Math.sin(t / 2) * 0.1;
    }
    if (monitorRef.current) {
      const material = monitorRef.current.material as any;
      if (material.emissiveIntensity !== undefined) {
        material.emissiveIntensity = 2 + Math.sin(t * 6) * 1;
      }
    }
    if (characterRef.current) {
      characterRef.current.rotation.y = Math.sin(t) * 0.12;
      characterRef.current.position.y = Math.sin(t * 2) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <PerspectiveCamera makeDefault position={[0, 1.2, 6]} fov={35} />
      
      {/* High-End Studio Lighting */}
      <ambientLight intensity={0.7} />
      <pointLight position={[10, 10, 10]} intensity={3} color="#FB3640" />
      <pointLight position={[-10, 5, 5]} intensity={2} color="#4444ff" />
      
      {/* Strong Rim Lighting */}
      <spotLight position={[0, 10, -8]} angle={0.6} penumbra={1} intensity={10} color="#FB3640" />
      <spotLight position={[8, 8, -5]} angle={0.5} penumbra={1} intensity={5} color="#ffffff" />
      
      {/* Key Light */}
      <spotLight position={[4, 8, 8]} angle={0.4} penumbra={1} intensity={5} color="#ffffff" castShadow />

      {/* Stylized 'Memoji' Character */}
      <group ref={characterRef} position={[0, -0.6, 0]}>
        {/* Head */}
        <mesh position={[0, 1.38, 0]}>
          <sphereGeometry args={[0.32, 32, 32]} />
          <meshStandardMaterial color="#e0ac69" roughness={0.2} metalness={0.05} />
        </mesh>

        {/* Ears */}
        <mesh position={[0.32, 1.38, -0.05]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color="#e0ac69" />
        </mesh>
        <mesh position={[-0.32, 1.38, -0.05]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color="#e0ac69" />
        </mesh>

        {/* Nose */}
        <mesh position={[0, 1.32, 0.3]}>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshStandardMaterial color="#e0ac69" />
        </mesh>

        {/* Mouth (Subtle Smile) */}
        <mesh position={[0, 1.2, 0.28]} rotation={[0.2, 0, Math.PI]}>
          <torusGeometry args={[0.06, 0.01, 16, 32, Math.PI]} />
          <meshStandardMaterial color="#8b5a2b" transparent opacity={0.6} />
        </mesh>

        {/* Cap */}
        <group position={[0, 1.56, 0.05]} rotation={[-0.2, 0, 0]}>
          <mesh>
            <sphereGeometry args={[0.33, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#FB3640" metalness={0.4} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0, 0.28]} rotation={[0.2, 0, 0]}>
            <boxGeometry args={[0.42, 0.02, 0.45]} />
            <meshStandardMaterial color="#FB3640" />
          </mesh>
        </group>

        {/* Eyes (Expressive with Pupils) */}
        <group position={[0, 1.45, 0.28]}>
          {/* Left Eye */}
          <mesh position={[-0.13, 0, 0]}>
            <sphereGeometry args={[0.045, 16, 16]} />
            <meshStandardMaterial color="#fff" />
            <mesh position={[0, 0, 0.035]}>
              <sphereGeometry args={[0.02, 16, 16]} />
              <meshStandardMaterial color="#000" />
            </mesh>
          </mesh>
          {/* Right Eye */}
          <mesh position={[0.13, 0, 0]}>
            <sphereGeometry args={[0.045, 16, 16]} />
            <meshStandardMaterial color="#fff" />
            <mesh position={[0, 0, 0.035]}>
              <sphereGeometry args={[0.02, 16, 16]} />
              <meshStandardMaterial color="#000" />
            </mesh>
          </mesh>
        </group>

        {/* Eyebrows */}
        <mesh position={[-0.13, 1.54, 0.28]} rotation={[0, 0, 0.1]}>
          <boxGeometry args={[0.08, 0.015, 0.01]} />
          <meshStandardMaterial color="#4a3728" />
        </mesh>
        <mesh position={[0.13, 1.54, 0.28]} rotation={[0, 0, -0.1]}>
          <boxGeometry args={[0.08, 0.015, 0.01]} />
          <meshStandardMaterial color="#4a3728" />
        </mesh>

        {/* Body / Hoodie (Chunky) */}
        <mesh position={[0, 0.6, 0]}>
          <capsuleGeometry args={[0.4, 0.75, 12, 48]} />
          <meshStandardMaterial color="#080808" roughness={0.4} />
        </mesh>

        {/* Hoodie Strings */}
        <mesh position={[-0.1, 1.05, 0.35]} rotation={[0.1, 0, 0]}>
          <cylinderGeometry args={[0.008, 0.008, 0.25]} />
          <meshStandardMaterial color="#FB3640" />
        </mesh>
        <mesh position={[0.1, 1.05, 0.35]} rotation={[0.1, 0, 0]}>
          <cylinderGeometry args={[0.008, 0.008, 0.25]} />
          <meshStandardMaterial color="#FB3640" />
        </mesh>

        {/* Hoodie Pocket */}
        <mesh position={[0, 0.5, 0.3]} rotation={[0.1, 0, 0]}>
          <boxGeometry args={[0.4, 0.25, 0.1]} />
          <meshStandardMaterial color="#0a0a0a" />
        </mesh>

        {/* Arms */}
        <group position={[0.48, 0.85, 0.2]} rotation={[1.1, 0, -0.4]}>
          <mesh>
            <capsuleGeometry args={[0.12, 0.6, 12, 48]} />
            <meshStandardMaterial color="#080808" />
          </mesh>
        </group>
        <group position={[-0.48, 0.85, 0.2]} rotation={[1.1, 0, 0.4]}>
          <mesh>
            <capsuleGeometry args={[0.12, 0.6, 12, 48]} />
            <meshStandardMaterial color="#080808" />
          </mesh>
        </group>

        {/* Gaming Chair Back */}
        <mesh position={[0, 0.5, -0.5]} rotation={[0.15, 0, 0]}>
          <boxGeometry args={[0.9, 1.1, 0.2]} />
          <meshStandardMaterial color="#020202" roughness={0.05} metalness={0.6} />
        </mesh>
      </group>

      {/* Desk Setup */}
      <group position={[0, -1, 1.2]}>
        {/* Desk Surface (Ultra Glossy) */}
        <mesh receiveShadow>
          <boxGeometry args={[4.5, 0.15, 2.2]} />
          <meshStandardMaterial color="#010101" roughness={0.01} metalness={1} />
        </mesh>
        
        {/* Laptop (Detailed) */}
        <group position={[0, 0.1, 0.5]}>
          {/* Base */}
          <mesh>
            <boxGeometry args={[1.1, 0.06, 0.8]} />
            <meshStandardMaterial color="#0a0a0a" metalness={1} roughness={0.1} />
          </mesh>
          {/* Trackpad */}
          <mesh position={[0, 0.031, 0.25]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.3, 0.18]} />
            <meshStandardMaterial color="#111" />
          </mesh>
          {/* Keyboard Glow */}
          <mesh position={[0, 0.031, -0.08]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[1, 0.5]} />
            <meshStandardMaterial color="#000" emissive="#FB3640" emissiveIntensity={0.6} />
          </mesh>
          {/* Hinge */}
          <mesh position={[0, 0.03, -0.4]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.02, 0.02, 1.1, 16]} />
            <meshStandardMaterial color="#0a0a0a" />
          </mesh>
          {/* Screen */}
          <group position={[0, 0, -0.4]} rotation={[-1.4, 0, 0]}>
            <mesh ref={monitorRef}>
              <boxGeometry args={[1.1, 0.8, 0.05]} />
              <meshStandardMaterial color="#000" emissive="#FB3640" emissiveIntensity={2.5} />
            </mesh>
            {/* Screen Content Glow */}
            <mesh position={[0, 0, 0.026]}>
              <planeGeometry args={[1.05, 0.75]} />
              <meshBasicMaterial color="#FB3640" transparent opacity={0.25} />
            </mesh>
          </group>
        </group>
      </group>

      {/* Branded Floating Elements */}
      <Float speed={4} rotationIntensity={2.5} floatIntensity={3.5}>
        <group position={[-3.2, 2.2, -2]}>
          <Sphere args={[0.25, 32, 32]}>
            <MeshWobbleMaterial color="#FB3640" speed={3} factor={1} />
          </Sphere>
          <Text position={[0, 0, 0.28]} fontSize={0.12} color="white" font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff">
            React
          </Text>
        </group>
      </Float>

      <Float speed={3} rotationIntensity={2} floatIntensity={3}>
        <group position={[3.2, 2.5, -1]}>
          <Sphere args={[0.22, 32, 32]}>
            <MeshDistortMaterial color="#4444ff" speed={5} distort={0.5} radius={1} />
          </Sphere>
          <Text position={[0, 0, 0.25]} fontSize={0.1} color="white">
            Next.js
          </Text>
        </group>
      </Float>

      {/* Floating Geometric Shapes */}
      <Float speed={6} rotationIntensity={4} floatIntensity={5}>
        <Torus args={[0.12, 0.04, 16, 32]} position={[2.5, 0.8, 2.5]}>
          <meshStandardMaterial color="#FB3640" emissive="#FB3640" emissiveIntensity={3} />
        </Torus>
      </Float>

      {/* Glass Code Panels */}
      <Float speed={3} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[-2.5, 0.6, 2.5]} rotation={[0, 0.7, 0]}>
          <planeGeometry args={[1.6, 1]} />
          <meshStandardMaterial color="#FB3640" transparent opacity={0.15} side={THREE.DoubleSide} metalness={1} roughness={0} />
          <Text position={[0, 0, 0.01]} fontSize={0.1} color="white" anchorX="center" anchorY="middle">
            {"const Manan = () => {\n  return <Code />;\n}"}
          </Text>
        </mesh>
      </Float>

      {/* Background Particles (Ultra) */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={5000}
            array={new Float32Array(15000).map(() => (Math.random() - 0.5) * 60)}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.06} color="#FB3640" transparent opacity={0.6} sizeAttenuation />
      </points>

      {/* Floor Grid & Circuit Glow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#000" emissive="#FB3640" emissiveIntensity={0.15} />
      </mesh>
      <gridHelper args={[50, 50, "#FB3640", "#0a0a0a"]} position={[0, -2.99, 0]} />
      
      {/* Circuit Lines on Floor */}
      <group position={[0, -2.98, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        {[...Array(10)].map((_, i) => (
          <mesh key={i} position={[(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, 0]}>
            <planeGeometry args={[Math.random() * 5, 0.02]} />
            <meshBasicMaterial color="#FB3640" transparent opacity={0.3} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
