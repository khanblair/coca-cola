"use client";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sphere } from "@react-three/drei";
import * as THREE from "three";

export default function ContactGlobe() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef}>
        {/* Globe Sphere */}
        <Sphere args={[2, 64, 64]}>
          <meshStandardMaterial
            color="#E6242B"
            roughness={0.7}
            metalness={0.1}
            wireframe
          />
        </Sphere>

        {/* Inner solid sphere to hide back wireframes */}
        <Sphere args={[1.98, 64, 64]}>
          <meshBasicMaterial color="#000000" />
        </Sphere>

        {/* Marker for Uganda (Approximate position) */}
        <group rotation={[0, -1.5, 0.5]}>
          <mesh position={[0, 0, 2]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          {/* Pulsing Ring */}
          <mesh position={[0, 0, 2]}>
            <ringGeometry args={[0.1, 0.15, 32]} />
            <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} transparent opacity={0.5} />
          </mesh>
        </group>
      </group>
    </Float>
  );
}
