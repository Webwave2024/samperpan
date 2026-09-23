"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  PerspectiveCamera,
  ContactShadows,
  Sparkles,
  SpotLight,
  useProgress,
} from "@react-three/drei";
import { Hero3DModel } from "./Hero3DModel";
import * as THREE from "three";
import { ThreeEvent } from "@react-three/fiber";
import Image from "next/image";

// ─── Runs INSIDE Canvas so useProgress() has access to the R3F context ────────
function LoaderBridge({ onProgress }: { onProgress: (p: number, active: boolean) => void }) {
  const { progress, active } = useProgress();
  React.useEffect(() => {
    onProgress(progress, active);
  }, [progress, active, onProgress]);
  return null;
}

// ─── Full-screen luxury loader overlay ───────────────────────────────────────
function LuxuryLoader({ visible }: { visible: boolean }) {
  const overlayRef = React.useRef<HTMLDivElement>(null);

  // Lock/unlock body scroll
  React.useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [visible]);

  return (
    <div
      ref={overlayRef}
      aria-label="Loading"
      role="status"
      aria-live="polite"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
        pointerEvents: visible ? "all" : "none",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.7s cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      {/* Logo */}
      <Image
        src="/Untitled-design-18.webp"
        alt="Sidhant"
        width={160}
        height={48}
        priority
        className="object-contain brightness-0 invert opacity-90"
        style={{ width: "auto", height: "auto" }}
      />

      {/* Thin circular spinner */}
      <div style={{ position: "relative", width: 56, height: 56 }}>
        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
          style={{ animation: "_loaderSpin 1.6s linear infinite" }}
        >
          {/* Background track */}
          <circle cx="28" cy="28" r="24" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
          {/* Animated arc */}
          <circle
            cx="28"
            cy="28"
            r="24"
            stroke="rgba(201,169,110,0.85)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="40 110"
          />
        </svg>
        <style>{`
          @keyframes _loaderSpin {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
}

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
  const idleIntensity = useRef(1);

  // ── Register global window listeners once ──────────────────────────────
  React.useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const deltaX = e.clientX - previousPosition.current.x;
      const deltaY = e.clientY - previousPosition.current.y;
      previousPosition.current = { x: e.clientX, y: e.clientY };

      // Horizontal drag = Y-axis rotation — slow & luxurious
      targetRotation.current.y += deltaX * 0.003;

      // X-axis tilt clamped to prevent flipping
      targetRotation.current.x = THREE.MathUtils.clamp(
        targetRotation.current.x + deltaY * 0.002,
        -Math.PI / 8,
        Math.PI / 8
      );
    };

    const onMouseUp = (e: MouseEvent) => {
      if (e.button === 0) isDragging.current = false;
    };

    let wasPastHero = window.scrollY > 100;
    const onScroll = () => {
      const isPastHero = window.scrollY > 100;
      // Reset rotation to default mode only when scrolling BACK into the hero section
      if (wasPastHero && !isPastHero) {
        targetRotation.current.x = 0;
        targetRotation.current.y = 0;
      }
      wasPastHero = isPastHero;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("scroll", onScroll);
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
  useFrame((state) => {
    if (!groupRef.current) return;
    currentRotation.current.y = THREE.MathUtils.lerp(
      currentRotation.current.y, targetRotation.current.y, 0.12
    );
    currentRotation.current.x = THREE.MathUtils.lerp(
      currentRotation.current.x, targetRotation.current.x, 0.12
    );
    groupRef.current.rotation.y = currentRotation.current.y;
    groupRef.current.rotation.x = currentRotation.current.x;

    // ─── Subtle Idle floating — lerps gently, never jumps ───────────
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReducedMotion) {
      const targetIntensity = isDragging.current ? 0 : 1;
      idleIntensity.current = THREE.MathUtils.lerp(idleIntensity.current, targetIntensity, 0.03);

      const t = state.clock.getElapsedTime();
      // Lerp position so there's no abrupt jump on first frame
      const targetY = Math.sin(t * 0.8) * 0.03 * idleIntensity.current;
      const targetZ = Math.cos(t * 0.6) * 0.015 * idleIntensity.current;
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.04);
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.04);
    }
  });

  return (
    <group ref={groupRef} onPointerDown={handlePointerDown}>
      {children}
    </group>
  );
}

// ─── Cinematic radial backlight behind the model ─────────────────────────────
function StudioBacklight() {
  const rimLightRef = useRef<THREE.SpotLight>(null);

  useFrame((state) => {
    if (!rimLightRef.current) return;
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReducedMotion) {
      const t = state.clock.getElapsedTime();
      // Slowly move the rim light behind the product
      rimLightRef.current.position.x = Math.sin(t * 0.5) * 2;
      rimLightRef.current.intensity = 1.2 + Math.sin(t * 1.5) * 0.3; // Subtle brightness pulsing
    }
  });

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
        ref={rimLightRef}
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
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const [loaderVisible, setLoaderVisible] = React.useState(true);
  // Track whether we ever completed loading (to not re-show loader on re-renders)
  const hasCompleted = React.useRef(false);

  const handleProgress = React.useCallback((progress: number, active: boolean) => {
    if (hasCompleted.current) return;
    // Hide loader when: progress hit 100 AND drei is no longer active
    if (progress >= 100 && !active) {
      hasCompleted.current = true;
      setLoaderVisible(false);
    }
  }, []);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // ── Fade canvas out when scrolled past CTA / into footer ──────────────
  React.useEffect(() => {
    if (!mounted) return;

    const onScroll = () => {
      if (!wrapperRef.current) return;

      const docH = document.documentElement.scrollHeight;
      const winH = window.innerHeight;
      const scrollY = window.scrollY;
      const maxScroll = docH - winH;

      // CTA section ends roughly at 80% of total scroll — hide after that
      const fadeStart = maxScroll * 0.80;
      const fadeEnd   = maxScroll * 0.92;

      let opacity = 1;
      if (scrollY > fadeEnd) {
        opacity = 0;
      } else if (scrollY > fadeStart) {
        opacity = 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart);
      }

      wrapperRef.current.style.opacity = String(opacity);
      // Disable pointer-events when fully hidden so footer links are clickable
      wrapperRef.current.style.pointerEvents = opacity < 0.05 ? "none" : "none"; // always none
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      {/* Full-screen luxury loader — controlled by real useProgress state */}
      <LuxuryLoader visible={loaderVisible} />

    <div
      ref={wrapperRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ transition: "opacity 0.3s ease" }}
    >
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
        {/* Camera shifted up so garment is centered top-to-bottom */}
        <PerspectiveCamera makeDefault position={[0, 0.0000001, 3]} fov={48} />

        {/* Base ambient */}
        <ambientLight intensity={0.3} />

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

        {/* LoaderBridge runs inside Canvas to access useProgress R3F context */}
        <LoaderBridge onProgress={handleProgress} />
      </Canvas>
    </div>
    </>
  );
}
