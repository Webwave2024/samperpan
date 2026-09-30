"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "";

  useEffect(() => {
    // Only apply smooth scrolling on the home page (e.g. "/", "/en", "/ar")
    const segments = pathname.split("/").filter(Boolean);
    const isHome = segments.length <= 1;

    if (!isHome) return;

    gsap.registerPlugin(ScrollTrigger);
    
    const lenis = new Lenis({
      duration: 1.2, // Reduced from 2.5 so it doesn't feel stuck
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.2, // Increased so users don't have to scroll as hard
      touchMultiplier: 2.0,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, [pathname]);

  return <>{children}</>;
}
