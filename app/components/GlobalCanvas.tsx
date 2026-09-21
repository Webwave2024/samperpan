"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  PerspectiveCamera,
  ContactShadows,
  AccumulativeShadows,
  RandomizedLight,
  PresentationControls,
} from "@react-three/drei";
import { Hero3DModel } from "./Hero3DModel";
import * as THREE from "three";

// Camera rig for mouse parallax - subtle luxury effect
function CameraRig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      state.pointer.x * 0.6,
      0.04
    );
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      state.pointer.y * 0.4,
      0.04
    );
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      state.pointer.x * 0.08,
      0.04
    );
  });
  return <group ref={group}>{children}</group>;
}

interface GlobalCanvasProps {
  modelGroupRef: React.RefObject<THREE.Group | null>;
}

export function GlobalCanvas({ modelGroupRef }: GlobalCanvasProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        eventSource={document.body}
        eventPrefix="client"
        shadows
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent", touchAction: 'none' }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={42} />

        {/* Soft premium studio lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <directionalLight position={[-5, 3, -5]} intensity={0.3} color="#b0c4ff" />
        <pointLight position={[0, -3, 3]} intensity={0.5} color="#fff5e0" />

        <CameraRig>
          <PresentationControls
            global={false} // Only drag when clicking ON the model
            cursor={true}
            snap={true} // Snaps back when released (TS expects boolean)
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 2]}
          >
            <Hero3DModel modelRef={modelGroupRef} />
          </PresentationControls>
          <ContactShadows
            position={[0, -3.2, 0]}
            opacity={0.35}
            scale={18}
            blur={2.5}
            far={6}
            color="#000000"
          />
        </CameraRig>

        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
