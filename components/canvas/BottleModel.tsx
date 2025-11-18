"use client";
import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Float } from "@react-three/drei";
import * as THREE from "three";

interface BottleModelProps {
  mouseX?: number;
  mouseY?: number;
}

export default function BottleModel({ mouseX = 0, mouseY = 0 }: BottleModelProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [targetRotation, setTargetRotation] = useState({ x: 0, y: 0 });

  // Animate rotation based on mouse position with parallax effect
  useEffect(() => {
    setTargetRotation({
      x: mouseY * 0.3, // Subtle vertical tilt
      y: mouseX * 0.5, // More pronounced horizontal rotation
    });
  }, [mouseX, mouseY]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Smooth interpolation to target rotation
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      targetRotation.x,
      0.1
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      targetRotation.y + state.clock.getElapsedTime() * 0.2,
      0.1
    );
  });

  // Placeholder geometry (replace with actual GLTF model when available)
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={meshRef}>
        {/* Bottle body */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.25, 2, 32]} />
          <meshStandardMaterial
            color="#E6242B"
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={0.95}
          />
        </mesh>

        {/* Bottle cap */}
        <mesh position={[0, 1.1, 0]}>
          <cylinderGeometry args={[0.25, 0.3, 0.2, 32]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Label */}
        <mesh position={[0, 0, 0.31]}>
          <planeGeometry args={[1, 0.8]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>
    </Float>
  );
}

// Preload the model (update path when you have actual .glb file)
// useGLTF.preload('/models/bottle.glb');
