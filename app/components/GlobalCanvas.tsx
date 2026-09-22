"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  PerspectiveCamera,
  ContactShadows,
  AccumulativeShadows,
  RandomizedLight,
} from "@react-three/drei";
import { Hero3DModel } from "./Hero3DModel";
import * as THREE from "three";
import { ThreeEvent } from "@react-three/fiber";

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

// Custom control to allow right-click 360 rotation without snapping back
function ModelControls({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);
  const isDragging = useRef(false);
  const previousPosition = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 }); // X is pitch (vertical), Y is yaw (horizontal)

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    if (e.button === 2) { // 2 corresponds to Right Mouse Button
      isDragging.current = true;
      previousPosition.current = { x: e.clientX, y: e.clientY };
      e.stopPropagation();
      try {
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
      } catch (err) {}
    }
  };

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (isDragging.current && groupRef.current) {
      const deltaX = e.clientX - previousPosition.current.x;
      const deltaY = e.clientY - previousPosition.current.y;
      previousPosition.current = { x: e.clientX, y: e.clientY };

      // Drag right = positive deltaX = positive Y rotation (clockwise)
      targetRotation.current.y += deltaX * 0.005;
      
      // Vertical drag = rotate around X axis
      targetRotation.current.x += deltaY * 0.005;
      
      // Prevent flipping by clamping X rotation to +/- 30 degrees (PI/6)
      targetRotation.current.x = THREE.MathUtils.clamp(
        targetRotation.current.x,
        -Math.PI / 6,
        Math.PI / 6
      );
    }
  };

  const handlePointerUp = (e: ThreeEvent<PointerEvent>) => {
    if (e.button === 2 && isDragging.current) {
      isDragging.current = false;
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch (err) {}
    }
  };

  useFrame(() => {
    if (groupRef.current) {
      // Smooth interpolation (damping) towards the target rotation
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotation.current.y,
        0.08
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotation.current.x,
        0.08
      );
    }
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
        onContextMenu={(e) => e.preventDefault()} // Disable right-click menu on the canvas interactions
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
          <ModelControls>
            <Hero3DModel modelRef={modelGroupRef} />
          </ModelControls>
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
