"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, PerspectiveCamera, ContactShadows } from "@react-three/drei";
import { Hero3DModel } from "./Hero3DModel";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

// A simple rig that moves the camera based on mouse position
function CameraRig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    // Parallax effect: smoothly move the camera rig group based on pointer
    const targetX = state.pointer.x * 2;
    const targetY = state.pointer.y * 2;
    
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, targetX, 0.05);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, targetY, 0.05);
    // Also add a slight rotation
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -state.pointer.y * 0.1, 0.05);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, state.pointer.x * 0.1, 0.05);
  });

  return <group ref={group}>{children}</group>;
}

export function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const modelGroupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scroll Animation for the 3D Model
    setTimeout(() => {
      if (modelGroupRef.current) {
        // Start zoomed in
        gsap.set(modelGroupRef.current.scale, { x: 2, y: 2, z: 2 });

        // As we scroll, zoom out (scale down) and push back
        gsap.to(modelGroupRef.current.scale, {
          x: 0.8,
          y: 0.8,
          z: 0.8,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });

        gsap.to(modelGroupRef.current.position, {
          y: 1.5, // move up slightly
          z: -5, // push back
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
        
        gsap.to(modelGroupRef.current.rotation, {
          x: Math.PI / 4,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });

        gsap.to(canvasContainerRef.current, {
          opacity: 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "center top", // fade out towards the end
            end: "bottom top",
            scrub: true,
          }
        });
      }
    }, 100);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#0d0d0d] flex items-center justify-center">
      {/* 3D Canvas Layer */}
      <div ref={canvasContainerRef} className="absolute inset-0 z-10 cursor-move">
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
          
          <CameraRig>
            <Hero3DModel modelRef={modelGroupRef} />
            <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={20} blur={2} far={4} />
          </CameraRig>
          
          <Environment preset="city" />
        </Canvas>
      </div>
    </div>
  );
}
