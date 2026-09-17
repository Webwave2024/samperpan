import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Smoke() {
  const smokeRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Basic procedural smoke settings
  const particleCount = 40;
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < particleCount; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -10 + Math.random() * 20;
      const yFactor = -5 + Math.random() * 10;
      const zFactor = -10 + Math.random() * 20;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [particleCount]);

  // Use a soft, transparent material for the smoke
  const smokeMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#000000",
      transparent: true,
      opacity: 0.15,
      roughness: 1,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  useFrame((state) => {
    if (!smokeRef.current) return;
    
    // Slowly animate the smoke particles
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      
      // Update time
      t = particle.t += speed / 2;
      
      // Move dummy
      dummy.position.set(
        (particle.mx / 10) * factor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * factor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * factor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      
      // Scale slightly varies over time
      const s = Math.cos(t) * 2 + 5;
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      
      // Apply to instanced mesh
      smokeRef.current!.setMatrixAt(i, dummy.matrix);
    });
    smokeRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={smokeRef} args={[undefined, smokeMaterial, particleCount]} position={[0, 0, -5]}>
      {/* A simple plane or sphere can act as a smoke puff. 
          For true volumetric smoke, a custom shader is better, but this is a good performant approximation */}
      <sphereGeometry args={[1, 16, 16]} />
    </instancedMesh>
  );
}
