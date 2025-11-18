"use client";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";

interface LocationMarkerProps {
  position: [number, number, number];
  label: string;
}

function LocationMarker({ position, label }: LocationMarkerProps) {
  const markerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!markerRef.current) return;
    // Pulsing animation
    const scale = 1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.2;
    markerRef.current.scale.set(scale, scale, scale);
  });

  return (
    <mesh ref={markerRef} position={position}>
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshStandardMaterial color="#E6242B" emissive="#E6242B" emissiveIntensity={0.8} />
    </mesh>
  );
}

export default function ContactGlobe() {
  const globeRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!globeRef.current) return;
    // Slow auto-rotation
    globeRef.current.rotation.y += delta * 0.1;
  });

  // Office locations (converted to 3D sphere coordinates)
  const locations: LocationMarkerProps[] = [
    { position: [0, 0.8, 0.8], label: "Kampala HQ" },
    { position: [0.8, 0.3, 0.5], label: "Nairobi Office" },
    { position: [-0.7, 0.4, 0.6], label: "Kigali Branch" },
  ];

  return (
    <group>
      {/* Globe sphere with wireframe effect */}
      <Sphere ref={globeRef} args={[2, 64, 64]}>
        <meshStandardMaterial
          color="#1a73e8"
          wireframe
          transparent
          opacity={0.3}
        />
      </Sphere>

      {/* Solid inner sphere */}
      <Sphere args={[1.95, 32, 32]}>
        <meshStandardMaterial
          color="#0d47a1"
          transparent
          opacity={0.1}
        />
      </Sphere>

      {/* Location markers */}
      {locations.map((location, idx) => (
        <LocationMarker key={idx} {...location} />
      ))}
    </group>
  );
}
