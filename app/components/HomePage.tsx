"use client";

import { useRef } from "react";
import * as THREE from "three";
import { LuxuryExperience } from "./EditorialHome";

export function HomePage() {
  const modelGroupRef = useRef<THREE.Group>(null);

  return (
    <div className="bg-[#0d0d0d] min-h-screen">
      <LuxuryExperience modelGroupRef={modelGroupRef} />
    </div>
  );
}
