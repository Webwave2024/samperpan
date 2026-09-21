"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "none" });
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.35, ease: "power2.out" });
    };

    const onMouseEnterLink = () => {
      gsap.to(ring, { scale: 2.2, opacity: 0.6, duration: 0.3 });
      gsap.to(dot, { scale: 0, duration: 0.2 });
    };

    const onMouseLeaveLink = () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3 });
      gsap.to(dot, { scale: 1, duration: 0.2 });
    };

    document.addEventListener("mousemove", onMouseMove);
    const links = document.querySelectorAll("a, button");
    links.forEach((l) => {
      l.addEventListener("mouseenter", onMouseEnterLink);
      l.addEventListener("mouseleave", onMouseLeaveLink);
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      links.forEach((l) => {
        l.removeEventListener("mouseenter", onMouseEnterLink);
        l.removeEventListener("mouseleave", onMouseLeaveLink);
      });
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 border border-white/50 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
    </>
  );
}
