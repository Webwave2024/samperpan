"use client";

import React, { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Hero3DModelProps {
  modelRef: React.RefObject<THREE.Group | null>;
}

// Pre-cached mesh data — avoids scene.traverse() on every frame (performance fix)
type MeshData = {
  mesh: THREE.Mesh;
  origPos: THREE.Vector3;
  origRot: THREE.Euler;
  dir: THREE.Vector3;
};

let cachedMeshData: MeshData[] = [];

export function Hero3DModel({ modelRef }: Hero3DModelProps) {
  const { scene } = useGLTF("/mainmodel.glb");
  const innerGroupRef = useRef<THREE.Group>(null);
  const explodeProgressRef = useRef(0);
  const isInitialized = useRef(false);
  // Track whether the intro spin is done so useFrame doesn't fight GSAP
  const introSpinDone = useRef(false);
  const introRotationY = useRef(0);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    // ─── Cache all mesh data once on mount ───────────────────────────────
    cachedMeshData = [];
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        // Start fully invisible for the reveal
        if (mesh.material) {
          const materials = Array.isArray(mesh.material)
            ? mesh.material
            : [mesh.material];
          materials.forEach((mat) => {
            mat.transparent = true;
            mat.opacity = 0;
            mat.needsUpdate = true;
          });
        }

        cachedMeshData.push({
          mesh,
          origPos: mesh.position.clone(),
          origRot: mesh.rotation.clone(),
          dir: new THREE.Vector3(
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2
          ).normalize(),
        });
      }
    });

    if (!innerGroupRef.current) return;

    const group = innerGroupRef.current;

    // ── Start: invisible, scale=0, position centered ─────────────────────
    group.scale.setScalar(0);
    group.position.set(0, 0, 0);
    introSpinDone.current = false;
    introRotationY.current = 0;

    // ── Timeline: scale up → fade in → 360° spin → stop ─────────────────
    const tl = gsap.timeline({ delay: 0.15 });

    // Step 1: Scale up from 0 → 1 (model "produces" from screen center)
    tl.to(group.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 0.9,
      ease: "back.out(1.4)",
    });

    // Step 2: Fade in materials simultaneously with scale
    const animState = { opacity: 0 };
    gsap.to(animState, {
      opacity: 1,
      duration: 1.0,
      delay: 0.15,
      ease: "power2.inOut",
      onUpdate: () => {
        cachedMeshData.forEach(({ mesh }) => {
          if (mesh.material) {
            const materials = Array.isArray(mesh.material)
              ? mesh.material
              : [mesh.material];
            materials.forEach((mat) => {
              mat.opacity = animState.opacity;
              if (animState.opacity >= 1) {
                mat.transparent = false;
                mat.needsUpdate = true;
              }
            });
          }
        });
      },
    });

    // Step 3: One full 360° Y rotation (driven via ref so useFrame reads it)
    const spinState = { ry: 0 };
    tl.to(
      spinState,
      {
        ry: Math.PI * 2, // full 360°
        duration: 1.4,
        ease: "power2.inOut",
        onUpdate: () => {
          introRotationY.current = spinState.ry;
          if (group) group.rotation.y = spinState.ry;
        },
        onComplete: () => {
          // Snap back to 0 (same visual position after full circle)
          introRotationY.current = 0;
          if (group) group.rotation.y = 0;
          introSpinDone.current = true;
        },
      },
      "-=0.1" // overlap slightly with scale
    );

    // ─── Scroll → explode effect ──────────────────────────────────────────
    const trigger = ScrollTrigger.create({
      trigger: document.getElementById("hero") ?? document.body,
      start: "top top",
      end: "+=200%",
      scrub: 1.5,
      onUpdate: (self) => {
        explodeProgressRef.current = self.progress;
      },
    });

    return () => {
      trigger.kill();
      tl.kill();
      cachedMeshData = [];
      isInitialized.current = false;
    };
  }, [scene, modelRef]);

  useFrame(() => {
    if (!modelRef.current) return;

    const progress = explodeProgressRef.current;

    // ─── Optimized: iterate pre-cached array instead of traverse() ────────
    if (progress > 0.01) {
      const strength = 2.0;
      for (const { mesh, origPos, origRot, dir } of cachedMeshData) {
        mesh.position.x = THREE.MathUtils.lerp(
          mesh.position.x,
          origPos.x + dir.x * progress * strength,
          0.08
        );
        mesh.position.y = THREE.MathUtils.lerp(
          mesh.position.y,
          origPos.y + dir.y * progress * strength,
          0.08
        );
        mesh.position.z = THREE.MathUtils.lerp(
          mesh.position.z,
          origPos.z + dir.z * progress * strength,
          0.08
        );
        mesh.rotation.x = THREE.MathUtils.lerp(
          mesh.rotation.x,
          origRot.x + dir.x * progress * 0.2,
          0.05
        );
        mesh.rotation.y = THREE.MathUtils.lerp(
          mesh.rotation.y,
          origRot.y + dir.y * progress * 0.2,
          0.05
        );
      }
    }
  });

  return (
    <group ref={modelRef} dispose={null}>
      <group ref={innerGroupRef}>
        {/* scale & position tuned so full garment is visible */}
        <primitive object={scene} scale={2.2} position={[0, -1.2, 0]} />
      </group>
    </group>
  );
}

useGLTF.preload("/mainmodel.glb");
