"use client";

import React, { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Float } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Hero3DModelProps {
  modelRef: React.RefObject<THREE.Group | null>;
}

// Store original positions and rotations of all mesh children for the explode effect
const originalPositions = new Map<string, THREE.Vector3>();
const originalRotations = new Map<string, THREE.Euler>();
const explodeDirections = new Map<string, THREE.Vector3>();

export function Hero3DModel({ modelRef }: Hero3DModelProps) {
  const { scene } = useGLTF("/mainmodel.glb");
  const explodeProgressRef = useRef(0); // 0 = normal, 1 = fully exploded
  const isInitialized = useRef(false);

  // Initialize: collect all meshes and store their original positions/rotations
  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (!originalPositions.has(child.uuid)) {
          originalPositions.set(child.uuid, child.position.clone());
          originalRotations.set(child.uuid, child.rotation.clone());

          // Compute a direction from center — random outward vector per mesh
          const dir = new THREE.Vector3(
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2
          ).normalize();
          explodeDirections.set(child.uuid, dir);
        }
      }
    });

    // GSAP ScrollTrigger: drive explode progress from scroll over the first two sections
    const trigger = ScrollTrigger.create({
      trigger: document.getElementById("hero") ?? document.body,
      start: "top top",
      end: "+=150%", // spread the explosion over hero and start of statement
      scrub: 1.5,
      onUpdate: (self) => {
        // We'll just split it slightly, max progress 1
        explodeProgressRef.current = self.progress;
      },
    });

    return () => {
      trigger.kill();
      originalPositions.clear();
      originalRotations.clear();
      explodeDirections.clear();
      isInitialized.current = false;
    };
  }, [scene]);

  useFrame((state) => {
    if (!modelRef.current) return;

    const progress = explodeProgressRef.current;
    const explodeStrength = 2.0; // reduced distance for a more elegant split

    // Animate each mesh piece outward based on scroll progress
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const orig = originalPositions.get(child.uuid);
        const origRot = originalRotations.get(child.uuid);
        const dir = explodeDirections.get(child.uuid);
        if (orig && origRot && dir) {
          child.position.x = THREE.MathUtils.lerp(
            child.position.x,
            orig.x + dir.x * progress * explodeStrength,
            0.08
          );
          child.position.y = THREE.MathUtils.lerp(
            child.position.y,
            orig.y + dir.y * progress * explodeStrength,
            0.08
          );
          child.position.z = THREE.MathUtils.lerp(
            child.position.z,
            orig.z + dir.z * progress * explodeStrength,
            0.08
          );
          // Rotate each piece as it flies apart
          child.rotation.x = THREE.MathUtils.lerp(
            child.rotation.x,
            origRot.x + dir.x * progress * 0.2,
            0.03
          );
          child.rotation.y = THREE.MathUtils.lerp(
            child.rotation.y,
            origRot.y + dir.y * progress * 0.2,
            0.03
          );
          child.rotation.z = THREE.MathUtils.lerp(
            child.rotation.z,
            origRot.z + dir.z * progress * 0.2,
            0.03
          );
        }
      }
    });

    // Gentle auto-rotation + mouse follow on the parent group
    modelRef.current.rotation.y += 0.003;
    // Base rotation might need to be 0 for this model, we'll just apply mouse parallax on X
    const targetX = (state.pointer.y * Math.PI) / 10;
    modelRef.current.rotation.x = THREE.MathUtils.lerp(
      modelRef.current.rotation.x,
      targetX,
      0.05
    );

    // Scale: zoom in by default, zoom out on scroll
    const targetScale = THREE.MathUtils.lerp(1.6, 0.85, progress);
    modelRef.current.scale.setScalar(
      THREE.MathUtils.lerp(modelRef.current.scale.x, targetScale, 0.06)
    );
  });

  return (
    <group ref={modelRef} dispose={null}>
      <Float speed={1.4} rotationIntensity={0.1} floatIntensity={0.4} floatingRange={[-0.08, 0.08]}>
        <primitive object={scene} scale={2.5} position={[0, -1.5, 0]} />
      </Float>
    </group>
  );
}

useGLTF.preload("/mainmodel.glb");
