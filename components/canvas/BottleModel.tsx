"use client";
import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

interface BottleModelProps {
  mouseX?: number;
  mouseY?: number;
}

export default function BottleModel({ mouseX = 0, mouseY = 0 }: BottleModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const liquidRef = useRef<THREE.Mesh>(null);

  // Smooth rotation state
  const [targetRotation, setTargetRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setTargetRotation({
      x: mouseY * 0.2,
      y: mouseX * 0.4,
    });
  }, [mouseX, mouseY]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smooth rotation
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotation.x,
      delta * 2
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotation.y + state.clock.getElapsedTime() * 0.1, // Slow spin
      delta * 2
    );

    // Liquid wobble effect
    if (liquidRef.current) {
      liquidRef.current.rotation.x = THREE.MathUtils.lerp(
        liquidRef.current.rotation.x,
        -targetRotation.x * 0.5,
        delta * 5
      );
      liquidRef.current.rotation.z = THREE.MathUtils.lerp(
        liquidRef.current.rotation.z,
        targetRotation.y * 0.5,
        delta * 5
      );
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
      <group ref={groupRef} scale={1.2}>
        {/* --- BOTTLE GLASS --- */}
        <group>
          {/* Body */}
          <mesh position={[0, -0.5, 0]}>
            <cylinderGeometry args={[0.7, 0.7, 2.5, 32]} />
            <MeshTransmissionMaterial
              backside
              samples={4}
              thickness={0.2}
              chromaticAberration={0.05}
              anisotropy={0.1}
              distortion={0.1}
              distortionScale={0.1}
              temporalDistortion={0.1}
              color="#ffffff"
              roughness={0.05}
            />
          </mesh>

          {/* Neck */}
          <mesh position={[0, 1.25, 0]}>
            <cylinderGeometry args={[0.25, 0.7, 1, 32]} />
            <MeshTransmissionMaterial
              backside
              samples={4}
              thickness={0.2}
              chromaticAberration={0.05}
              anisotropy={0.1}
              distortion={0.1}
              distortionScale={0.1}
              temporalDistortion={0.1}
              color="#ffffff"
              roughness={0.05}
            />
          </mesh>

          {/* Rim */}
          <mesh position={[0, 1.8, 0]}>
            <cylinderGeometry args={[0.3, 0.25, 0.1, 32]} />
            <MeshTransmissionMaterial
              backside
              samples={4}
              thickness={0.2}
              color="#ffffff"
              roughness={0.05}
            />
          </mesh>
        </group>

        {/* --- LIQUID --- */}
        <group>
          <mesh ref={liquidRef} position={[0, -0.6, 0]}>
            <cylinderGeometry args={[0.62, 0.62, 2.2, 32]} />
            <meshPhysicalMaterial
              color="#500000" // Deep red liquid
              transmission={0.2}
              roughness={0.1}
              ior={1.33}
              thickness={0.1}
              attenuationColor="#E6242B"
              attenuationDistance={0.5}
            />
          </mesh>
        </group>

        {/* --- LABEL --- */}
        <mesh position={[0, -0.2, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <cylinderGeometry args={[0.71, 0.71, 1.2, 32, 1, true, 0, Math.PI]} />
          <meshStandardMaterial
            color="#E6242B"
            side={THREE.DoubleSide}
            roughness={0.4}
            metalness={0.1}
          />
        </mesh>

        {/* Label Text Placeholder (White Strip) */}
        <mesh position={[0, -0.2, 0.715]} rotation={[0, 0, 0]}>
          <planeGeometry args={[0.8, 0.3]} />
          <meshBasicMaterial color="white" />
        </mesh>

        {/* --- CAP --- */}
        <mesh position={[0, 1.85, 0]}>
          <cylinderGeometry args={[0.32, 0.32, 0.15, 32]} />
          <meshStandardMaterial color="#E6242B" roughness={0.3} metalness={0.5} />
        </mesh>
      </group>
    </Float>
  );
}
