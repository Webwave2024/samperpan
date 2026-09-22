"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  PerspectiveCamera,
  ContactShadows,
  Sparkles,
  SpotLight,
} from "@react-three/drei";
import { Hero3DModel } from "./Hero3DModel";
import * as THREE from "three";
import { ThreeEvent } from "@react-three/fiber";

// ─── Subtle parallax camera drift (no rotation of text, only scene moves) ────
function CameraRig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    // Very gentle drift — premium feel without disorientation
    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      state.pointer.x * 0.25,
      0.03
    );
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      state.pointer.y * 0.15,
      0.03
    );
  });
  return <group ref={group}>{children}</group>;
}

// ─── Right-click 360° drag-to-rotate (no React state = no re-renders) ─────────
function ModelControls({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);
  const isDragging = useRef(false);
  const previousPosition = useRef({ x: 0, y: 0 });
  // targetRotation lives in a ref so updates don't trigger React re-renders
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    if (e.button === 2) {
      isDragging.current = true;
      previousPosition.current = { x: e.clientX, y: e.clientY };
      e.stopPropagation();
      try {
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
      } catch (_) {}
    }
  };

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - previousPosition.current.x;
    const deltaY = e.clientY - previousPosition.current.y;
    previousPosition.current = { x: e.clientX, y: e.clientY };

    // Horizontal drag = Y-axis rotation (unlimited 360°)
    targetRotation.current.y += deltaX * 0.006;

    // Vertical drag = small X-axis tilt, clamped to prevent flipping
    targetRotation.current.x = THREE.MathUtils.clamp(
      targetRotation.current.x + deltaY * 0.004,
      -Math.PI / 8, // max tilt back
      Math.PI / 8   // max tilt forward
    );
  };

  const handlePointerUp = (e: ThreeEvent<PointerEvent>) => {
    if (e.button === 2) {
      isDragging.current = false;
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch (_) {}
    }
  };

  useFrame(() => {
    if (!groupRef.current) return;
    // Damped lerp to target — smooth deceleration on release
    currentRotation.current.y = THREE.MathUtils.lerp(
      currentRotation.current.y, targetRotation.current.y, 0.1
    );
    currentRotation.current.x = THREE.MathUtils.lerp(
      currentRotation.current.x, targetRotation.current.x, 0.1
    );
    groupRef.current.rotation.y = currentRotation.current.y;
    groupRef.current.rotation.x = currentRotation.current.x;
  });

  return (
    <group
      ref={groupRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {children}
    </group>
  );
}

// ─── Cinematic radial backlight behind the model ─────────────────────────────
function StudioBacklight() {
  return (
    <>
      {/* Warm key light from top-left */}
      <SpotLight
        position={[-4, 8, 4]}
        angle={0.35}
        penumbra={0.9}
        intensity={2.5}
        color="#fff8f0"
        distance={20}
        castShadow={false}
      />
      {/* Cool rim light from behind */}
      <SpotLight
        position={[0, 2, -8]}
        angle={0.5}
        penumbra={1}
        intensity={1.2}
        color="#8ab4ff"
        distance={18}
        castShadow={false}
      />
      {/* Subtle fill from bottom-right */}
      <pointLight position={[4, -2, 4]} intensity={0.4} color="#ffe4c4" />
    </>
  );
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
        onContextMenu={(e) => e.preventDefault()}
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          // Disable expensive features we don't use
          stencil: false,
          depth: true,
        }}
        style={{ background: "transparent", touchAction: "none" }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={42} />

        {/* Base ambient */}
        <ambientLight intensity={0.2} />

        {/* Studio cinematic lighting */}
        <StudioBacklight />

        {/* Main directional key light */}
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.0}
          castShadow
          shadow-mapSize={[1024, 1024]} // reduced from 2048 for perf
        />

        {/* Subtle luxury dust particles in background — very slow, elegant */}
        <Sparkles
          count={60}
          scale={[12, 14, 8]}
          size={0.6}
          speed={0.04}
          opacity={0.12}
          color="#c9a96e"
          noise={0.1}
        />
        {/* Fine white dust particles */}
        <Sparkles
          count={40}
          scale={[10, 12, 6]}
          size={0.3}
          speed={0.03}
          opacity={0.07}
          color="#ffffff"
          noise={0.2}
        />

        <CameraRig>
          <ModelControls>
            <Hero3DModel modelRef={modelGroupRef} />
          </ModelControls>
          <ContactShadows
            position={[0, -3.2, 0]}
            opacity={0.3}
            scale={14}
            blur={3}
            far={6}
            color="#000000"
          />
        </CameraRig>

        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
