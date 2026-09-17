"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useLayoutEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EffectComposer, Bloom, Vignette, Noise } from "@react-three/postprocessing";
import { Lighting } from "./Lighting";
import { Smoke } from "./Smoke";
import { ProductModel } from "./ProductModel";
import { ProductText } from "./ProductText";
import { PerspectiveCamera } from "@react-three/drei";

gsap.registerPlugin(ScrollTrigger);

export function ProductScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<THREE.Group>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useLayoutEffect(() => {
    if (!containerRef.current || !modelRef.current || !cameraRef.current) return;

    // We use a context to make sure ScrollTrigger gets cleaned up
    const ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // Initial state
      gsap.set(modelRef.current.position, { y: -2, z: -5 });
      gsap.set(cameraRef.current.position, { z: 12 });

      // 1. Scene reveal & polo floating forward (0-20%)
      tl.to(modelRef.current.position, { y: 0, z: 0, duration: 2, ease: "power2.out" }, 0)
        .to("#title-container", { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, 0.5)
      
      // 2. Polo rotation (20-35%)
      tl.to(modelRef.current.rotation, { y: Math.PI * 0.75, duration: 2, ease: "power2.inOut" }, 2)
        .to("#title-container", { opacity: 0, y: -20, duration: 1 }, 2)

      // 4. Garment deconstruction (50-65%)
      const torso = modelRef.current?.getObjectByName("torso");
      const collar = modelRef.current?.getObjectByName("collar");
      const sleeveL = modelRef.current?.getObjectByName("sleeve-left");
      const sleeveR = modelRef.current?.getObjectByName("sleeve-right");

      if (torso && collar && sleeveL && sleeveR) {
        tl.to(collar.position, { y: "+=1.2", duration: 1.5, ease: "power3.inOut" }, 4)
          .to(sleeveL.position, { x: "-=1", y: "+=0.3", duration: 1.5, ease: "power3.inOut" }, 4.1)
          .to(sleeveR.position, { x: "+=1", y: "+=0.3", duration: 1.5, ease: "power3.inOut" }, 4.2)
          .to(torso.position, { y: "-=0.5", duration: 1.5, ease: "power3.inOut" }, 4.3);
          
        // 5. Reassembly (65-80%)
        tl.to(collar.position, { y: "-=1.2", duration: 1.5, ease: "power3.inOut" }, 6)
          .to(sleeveL.position, { x: "+=1", y: "-=0.3", duration: 1.5, ease: "power3.inOut" }, 6)
          .to(sleeveR.position, { x: "-=1", y: "-=0.3", duration: 1.5, ease: "power3.inOut" }, 6)
          .to(torso.position, { y: "+=0.5", duration: 1.5, ease: "power3.inOut" }, 6);
      }

      // 6. Macro camera push-in (80-90%)
      tl.to(cameraRef.current.position, { z: 5, x: -1.2, y: 0.8, duration: 2, ease: "power3.inOut" }, 8)
        .to(modelRef.current.rotation, { y: Math.PI * 0.1, x: Math.PI * 0.05, duration: 2, ease: "power3.inOut" }, 8)
        .to("#macro-text", { opacity: 1, x: 0, duration: 1, ease: "power2.out" }, 8.5)

      // 7. CTA (90-100%)
      tl.to("#cta-container", { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, 10);

    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[600vh] bg-[#ffffff]">
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <ProductText />
        <Canvas
          dpr={[1, 2]}
          gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
          shadows
        >
          <PerspectiveCamera ref={cameraRef} makeDefault fov={40} position={[0, 0, 10]} />
          <Suspense fallback={null}>
            <Lighting />
            <Smoke />
            <ProductModel ref={modelRef} />
            <EffectComposer disableNormalPass>
              <Bloom luminanceThreshold={1} mipmapBlur intensity={0.15} />
              <Vignette eskil={false} offset={0.1} darkness={1.1} />
              <Noise opacity={0.025} />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
