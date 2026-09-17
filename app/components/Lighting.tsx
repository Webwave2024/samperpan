import { Environment, SpotLight } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

export function Lighting() {
  const spotLightRef = useRef<THREE.SpotLight>(null);

  return (
    <>
      {/* 
        Very dark environment map to provide PBR reflections without overwhelming 
        the scene with light. 
      */}
      <Environment preset="night" background={false} environmentIntensity={0.2} />

      {/* Key Light: large soft light above/front */}
      <directionalLight
        position={[0, 10, 5]}
        intensity={2.5}
        color="#000000"
        castShadow
        shadow-mapSize={[2048, 2048]}
      />

      {/* Rim Light: strong light behind to outline the silhouette */}
      <SpotLight
        ref={spotLightRef}
        position={[0, 5, -10]}
        angle={Math.PI / 3}
        penumbra={1}
        intensity={50}
        color="#e0e0e0"
        distance={20}
        castShadow
      />

      {/* Fill Light: very weak side fill */}
      <directionalLight
        position={[-10, 0, 5]}
        intensity={0.3}
        color="#8aa1ff" // slight cool tint
      />

      {/* Top Light: subtle overhead highlight */}
      <pointLight position={[0, 10, 0]} intensity={1} color="#000000" />
    </>
  );
}
