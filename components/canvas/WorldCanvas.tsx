"use client";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei";
import { motion } from "framer-motion";

interface WorldCanvasProps {
  children: React.ReactNode;
  enableOrbitControls?: boolean;
  cameraPosition?: [number, number, number];
  className?: string;
}

export default function WorldCanvas({
  children,
  enableOrbitControls = false,
  cameraPosition = [0, 0, 5],
  className = "w-full h-96",
}: WorldCanvasProps) {
  return (
    <div className={className}>
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={cameraPosition} fov={50} />

        {/* Lighting Setup */}
        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
          castShadow
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        {/* Environment for reflections */}
        <Environment preset="sunset" />

        <Suspense
          fallback={
            <mesh>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="#E6242B" wireframe />
            </mesh>
          }
        >
          {children}
        </Suspense>

        {enableOrbitControls && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
          />
        )}
      </Canvas>
    </div>
  );
}
