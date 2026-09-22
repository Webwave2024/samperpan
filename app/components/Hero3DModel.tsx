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
  const explodeProgressRef = useRef(0);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    // ─── Cache all mesh data once on mount (major performance fix) ───
    cachedMeshData = [];
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

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

    // ─── Entrance animation: model fades/scales in from slightly below ───
    if (modelRef.current) {
      modelRef.current.scale.setScalar(0.3);
      gsap.to(modelRef.current.scale, {
        x: 0.85,
        y: 0.85,
        z: 0.85,
        duration: 1.8,
        delay: 0.5,
        ease: "power3.out",
      });
    }

    // ─── Scroll → explode effect ───────────────────────────────────────
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
      cachedMeshData = [];
      isInitialized.current = false;
    };
  }, [scene, modelRef]);

  useFrame(() => {
    if (!modelRef.current) return;

    const progress = explodeProgressRef.current;

    // ─── Optimized: iterate pre-cached array instead of traverse() ───
    if (progress > 0.01) {
      const strength = 2.0;
      for (const { mesh, origPos, origRot, dir } of cachedMeshData) {
        mesh.position.x = THREE.MathUtils.lerp(
          mesh.position.x, origPos.x + dir.x * progress * strength, 0.08
        );
        mesh.position.y = THREE.MathUtils.lerp(
          mesh.position.y, origPos.y + dir.y * progress * strength, 0.08
        );
        mesh.position.z = THREE.MathUtils.lerp(
          mesh.position.z, origPos.z + dir.z * progress * strength, 0.08
        );
        mesh.rotation.x = THREE.MathUtils.lerp(
          mesh.rotation.x, origRot.x + dir.x * progress * 0.2, 0.05
        );
        mesh.rotation.y = THREE.MathUtils.lerp(
          mesh.rotation.y, origRot.y + dir.y * progress * 0.2, 0.05
        );
      }
    }

    // ─── Scale driven by scroll (hero zoom-out) ───────────────────────
    // Note: initial scale is controlled by EditorialHome ScrollTrigger.
    // We only handle fade-out here so both cooperate cleanly.
  });

  return (
    <group ref={modelRef} dispose={null}>
      {/* Float gives a gentle breathing motion — very subtle for premium feel */}
      <Float
        speed={0.8}
        rotationIntensity={0.04}
        floatIntensity={0.25}
        floatingRange={[-0.05, 0.05]}
      >
        <primitive object={scene} scale={2.5} position={[0, -1.5, 0]} />
      </Float>
    </group>
  );
}

useGLTF.preload("/mainmodel.glb");
