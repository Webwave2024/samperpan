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

// ─── No parallax camera drift (model stays still unless dragged) ──────────────
function CameraRig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  return <group ref={group}>{children}</group>;
}

// ─── Right-click 360° drag-to-rotate (global listeners = never loses cursor) ──
function ModelControls({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);
  const isDragging = useRef(false);
  const previousPosition = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });

  // ── Register global window listeners once ──────────────────────────────
  React.useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const deltaX = e.clientX - previousPosition.current.x;
      const deltaY = e.clientY - previousPosition.current.y;
      previousPosition.current = { x: e.clientX, y: e.clientY };

      // Horizontal drag = Y-axis rotation (unlimited 360° rotation)
      targetRotation.current.y += deltaX * 0.007;

      // X-axis tilt clamped to prevent flipping
      targetRotation.current.x = THREE.MathUtils.clamp(
        targetRotation.current.x + deltaY * 0.004,
        -Math.PI / 8,
        Math.PI / 8
      );
    };

    const onMouseUp = (e: MouseEvent) => {
      if (e.button === 0) isDragging.current = false;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  // ── Three.js pointer: LEFT CLICK on model starts rotation ─────────────
  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    if (e.button === 0) { // left click = drag to rotate
      isDragging.current = true;
      previousPosition.current = { x: e.clientX, y: e.clientY };
      e.stopPropagation();
    }
  };

  // ── Frame loop: smooth lerp to target ─────────────────────────────────
  useFrame(() => {
    if (!groupRef.current) return;
    currentRotation.current.y = THREE.MathUtils.lerp(
      currentRotation.current.y, targetRotation.current.y, 0.12
    );
    currentRotation.current.x = THREE.MathUtils.lerp(
      currentRotation.current.x, targetRotation.current.x, 0.12
    );
    groupRef.current.rotation.y = currentRotation.current.y;
    groupRef.current.rotation.x = currentRotation.current.x;
  });

  return (
    <group ref={groupRef} onPointerDown={handlePointerDown}>
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
        dpr={[1, 1.5]}
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

        {/* Main directional key light — no shadow for performance */}
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.0}
        />

        {/* Minimal luxury particles — reduced count for performance */}
        <Sparkles
          count={25}
          scale={[12, 14, 8]}
          size={0.7}
          speed={0.03}
          opacity={0.1}
          color="#c9a96e"
          noise={0.1}
        />

        <CameraRig>
          <ModelControls>
            <React.Suspense fallback={null}>
              <Hero3DModel modelRef={modelGroupRef} />
            </React.Suspense>
          </ModelControls>
        </CameraRig>

        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
