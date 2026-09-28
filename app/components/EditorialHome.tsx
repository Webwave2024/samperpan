"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Royal green palette ──────────────────────────────────────────────────────
// Primary royal green: #1a5c38 / #145c38 / #0d6b3e
// Accent lighter green: #2e8b57
// Gold accent retained for fine details: #c9a96e

// ─── Video Slider ─────────────────────────────────────────────────────────────
const HERO_VIDEOS = [
  "/mainvideo1.mp4",
  "/WhatsApp Video 2026-09-17 at 10.05.41 AM.mp4",
  "/WhatsApp Video 2026-09-17 at 10.07.22 AM.mp4",
];

function VideoSlider() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const goTo = useCallback(
    (idx: number) => {
      if (animating || idx === current) return;
      setAnimating(true);
      setPrev(current);
      setCurrent(idx);
      setTimeout(() => {
        setPrev(null);
        setAnimating(false);
      }, 900);
    },
    [animating, current]
  );

  const next = useCallback(() => {
    goTo((current + 1) % HERO_VIDEOS.length);
  }, [current, goTo]);

  // Auto-advance every 5 seconds
  useEffect(() => {
    intervalRef.current = setInterval(next, 10000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [next]);

  // Auto-play the active video
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === current) {
        v.currentTime = 0;
        v.play().catch(() => { });
      } else {
        v.pause();
      }
    });
  }, [current]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      {/* Video layers */}
      {HERO_VIDEOS.map((src, i) => (
        <video
          key={src}
          ref={(el) => { videoRefs.current[i] = el; }}
          src={src}
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[900ms]"
          style={{
            opacity: i === current ? 1 : 0,
            zIndex: i === current ? 2 : prev === i ? 1 : 0,
          }}
        />
      ))}

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Royal green accent bar at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[3px] z-20"
        style={{ background: "linear-gradient(90deg, #0d6b3e, #2e8b57, #0d6b3e)" }}
      />

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {HERO_VIDEOS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="group relative flex items-center justify-center"
            aria-label={`Go to slide ${i + 1}`}
          >
            <span
              className="block rounded-full transition-all duration-500"
              style={{
                width: i === current ? "28px" : "8px",
                height: "8px",
                background: i === current ? "#2e8b57" : "rgba(255,255,255,0.35)",
              }}
            />
          </button>
        ))}
      </div>

      {/* Nav arrows */}
      <button
        onClick={() => goTo((current - 1 + HERO_VIDEOS.length) % HERO_VIDEOS.length)}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center border border-white/20 hover:border-[#2e8b57] hover:bg-[#0d6b3e]/60 transition-all duration-300 backdrop-blur-sm"
        aria-label="Previous video"
      >
        <span className="text-white text-sm">←</span>
      </button>
      <button
        onClick={() => goTo((current + 1) % HERO_VIDEOS.length)}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center border border-white/20 hover:border-[#2e8b57] hover:bg-[#0d6b3e]/60 transition-all duration-300 backdrop-blur-sm"
        aria-label="Next video"
      >
        <span className="text-white text-sm">→</span>
      </button>
    </div>
  );
}

function JaliPartnerSection({ locale }: { locale: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const router = useRouter();

  useEffect(() => {
    // GSAP removed to prevent scroll freeze conflict
  }, []);

  return (
    <section
      ref={sectionRef}
      id="partnerships"
      className="w-full py-32 px-4 md:px-12 transition-colors duration-300 bg-gray-50 dark:bg-[#0a0a0a] text-black dark:text-white relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "url('/marble-texture-dark.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="max-w-[1200px] mx-auto relative z-10 flex flex-col items-center">
        
        {/* Abstract connector at the top center */}
        <div className="relative w-full max-w-3xl flex justify-center mb-8">
           <div className="bg-white dark:bg-[#1a2b22] border border-[#2e8b57]/40 rounded-full px-6 py-2 flex flex-col items-center shadow-[0_0_15px_rgba(46,139,87,0.4)] backdrop-blur-md relative z-20 transition-colors duration-300">
              <span className="text-[10px] tracking-widest text-[#4ade80] uppercase font-bold mb-1">Atelier Sync: Active</span>
              <span className="text-[10px] tracking-widest text-black dark:text-white dark:text-white uppercase transition-colors duration-300">Craftsmanship Status: Seamless</span>
           </div>
        </div>

        {/* Cards Container */}
        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-8 w-full">
          
          {/* ── Left Card: Boutique & Direct ── */}
          <button
            type="button"
            onClick={() => router.push(`/${locale}/retail`)}
            className="partner-card group relative w-full lg:w-1/2 max-w-[550px] aspect-[1.4] rounded-[2rem] p-[2px] bg-gradient-to-b from-black/10 to-transparent dark:from-white/30 dark:to-white/5 overflow-hidden backdrop-blur-xl shadow-2xl transition-colors duration-300"
          >
            {/* Top Label */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 px-8 py-2 bg-gray-100 dark:bg-[#0a0a0a] rounded-b-xl border-x border-b border-black/10 dark:border-white/10 z-20 transition-colors duration-300">
              <span className="text-[11px] tracking-[0.2em] text-black dark:text-white dark:text-white uppercase font-medium transition-colors duration-300">Curated Retail</span>
            </div>
            
            <div className="w-full h-full rounded-[30px] bg-white/90 dark:bg-black/90 relative overflow-hidden p-8 flex flex-col justify-center transition-colors duration-500 group-hover:bg-gray-50 dark:group-hover:bg-[#0a0a0a]">
               {/* Inner glowing border */}
               <div className="absolute inset-3 rounded-[24px] border-[1.5px] border-[#4ade80] shadow-[0_0_20px_rgba(74,222,128,0.1)_inset,0_0_20px_rgba(74,222,128,0.1)] transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(74,222,128,0.3)_inset,0_0_30px_rgba(74,222,128,0.3)] pointer-events-none" />
               <div className="absolute inset-0 bg-gradient-to-br from-[#1a5c38]/40 via-transparent to-[#1a5c38]/10 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

               <div className="relative z-10 mt-8 w-full flex flex-col items-center">
                 <div className="text-center mb-6">
                   <span className="text-[11px] tracking-[0.3em] uppercase text-[#4ade80] font-semibold mb-2 block">Heritage Partners</span>
                   <h3 className="text-4xl sm:text-5xl font-bold tracking-tight text-black dark:text-white transition-colors duration-300" style={{ fontFamily: "var(--font-playfair)" }}>Couture Access</h3>
                 </div>
                 
                 <div className="text-center w-full px-4 sm:px-8 space-y-4">
                    <p className="text-sm text-black dark:text-white dark:text-white font-light leading-relaxed transition-colors duration-300">
                      Exclusive access to our handcrafted collections. Designed for boutique retailers who appreciate meticulous attention to detail and traditional artistry.
                    </p>
                    <div className="inline-flex items-center gap-3 text-[#4ade80] text-xs tracking-widest uppercase mt-4">
                      <span>Explore Partnership</span>
                      <span className="w-8 h-[1px] bg-[#4ade80] group-hover:w-12 transition-all duration-300"></span>
                    </div>
                 </div>
               </div>
            </div>
          </button>

          {/* ── Right Card: High Volume ── */}
          <button
            type="button"
            onClick={() => router.push(`/${locale}/wholesale`)}
            className="partner-card group relative w-full lg:w-1/2 max-w-[550px] aspect-[1.4] rounded-[2rem] p-[2px] bg-gradient-to-b from-black/10 to-transparent dark:from-white/30 dark:to-white/5 overflow-hidden backdrop-blur-xl shadow-2xl transition-colors duration-300"
          >
            {/* Top Label */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 px-8 py-2 bg-gray-100 dark:bg-[#0a0a0a] rounded-b-xl border-x border-b border-black/10 dark:border-white/10 z-20 transition-colors duration-300">
              <span className="text-[11px] tracking-[0.2em] text-black dark:text-white dark:text-white uppercase font-medium transition-colors duration-300">Enterprise Partners</span>
            </div>
            
            <div className="w-full h-full rounded-[30px] bg-white/90 dark:bg-black/90 relative overflow-hidden p-8 flex flex-col justify-center transition-colors duration-500 group-hover:bg-gray-50 dark:group-hover:bg-[#0a0a0a]">
               {/* Inner glowing border */}
               <div className="absolute inset-3 rounded-[24px] border-[1.5px] border-[#fde047] shadow-[0_0_20px_rgba(253,224,71,0.1)_inset,0_0_20px_rgba(253,224,71,0.1)] transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(253,224,71,0.3)_inset,0_0_30px_rgba(253,224,71,0.3)] pointer-events-none" />
               <div className="absolute inset-0 bg-gradient-to-br from-[#c9a96e]/20 via-transparent to-transparent pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

               <div className="relative z-10 mt-8 w-full flex flex-col items-center">
                 <div className="text-center mb-6">
                   <span className="text-[11px] tracking-[0.3em] uppercase text-black dark:text-white dark:text-white font-semibold mb-2 block transition-colors duration-300">Artisanal Wholesale</span>
                   <h3 className="text-4xl sm:text-5xl font-bold tracking-tight text-black dark:text-white transition-colors duration-300" style={{ fontFamily: "var(--font-playfair)" }}>Global Access</h3>
                 </div>
                 
                 <div className="text-center w-full px-4 sm:px-8 space-y-4">
                    <p className="text-sm text-black dark:text-white dark:text-white font-light leading-relaxed transition-colors duration-300">
                      Scale your offerings with our high-volume production capabilities. Maintaining uncompromising quality and heritage craftsmanship for global distribution.
                    </p>
                    <div className="inline-flex items-center gap-3 text-[#fde047] text-xs tracking-widest uppercase mt-4">
                      <span>Join Global Network</span>
                      <span className="w-8 h-[1px] bg-[#fde047] group-hover:w-12 transition-all duration-300"></span>
                    </div>
                 </div>
               </div>
            </div>
          </button>

        </div>
      </div>
    </section>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export function LuxuryExperience() {
  const locale = useLocale();
  const heroRef = useRef<HTMLElement>(null);
  const heroTitleRef = useRef<HTMLDivElement>(null);
  const heroMetaRef = useRef<HTMLParagraphElement>(null);
  const heroScrollHintRef = useRef<HTMLDivElement>(null);

  const statementRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);

  const storyRef = useRef<HTMLElement>(null);
  const storyTextRef = useRef<HTMLDivElement>(null);

  const horizontalRef = useRef<HTMLElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);

  const craftDetails = [
    { label: "01", title: "FABRIC", desc: "Premium mulmul, chanderi & pure silk — chosen for breathability and royal drape.", img: "/41-scaled.webp", slug: "the-nawab" },
    { label: "02", title: "CUT", desc: "Each kurta and suit is pattern-drafted to your exact measurements by hand.", img: "/42-1-scaled.webp", slug: "the-regal" },
    // { label: "03", title: "EMBROIDERY", desc: "Zardozi, chikankari & thread work — each stitch placed with purpose.", img: "/43-scaled.webp", slug: "the-rosette" },
    // { label: "04", title: "FIT", desc: "Two fittings per garment. One silhouette that is entirely yours.", img: "/36-1-scaled.webp", slug: "the-rosette" },
    // { label: "05", title: "FINISH", desc: "Hand-pressed, pearl-button detailing, and a signature embroidered cuff.", img: "/37-1-scaled.webp", slug: "the-regal" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ─── HERO: entry animations
      gsap.set([heroTitleRef.current, heroMetaRef.current, heroScrollHintRef.current], {
        opacity: 0,
        y: 40,
      });
      const heroTL = gsap.timeline({ delay: 0.4 });
      heroTL
        .to(heroTitleRef.current, { opacity: 1, y: 0, duration: 1.4, ease: "power3.out" })
        .to(heroMetaRef.current, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=0.8")
        .to(heroScrollHintRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.5");

      // ─── BRAND STATEMENT
      gsap.fromTo(
        line1Ref.current,
        { opacity: 0, x: -80, filter: "blur(8px)" },
        {
          opacity: 1, x: 0, filter: "blur(0px)", duration: 1,
          scrollTrigger: { trigger: statementRef.current, start: "top 80%", end: "30% 60%", scrub: 1.5 },
        }
      );
      gsap.fromTo(
        line2Ref.current,
        { opacity: 0, x: 80, filter: "blur(8px)" },
        {
          opacity: 1, x: 0, filter: "blur(0px)", duration: 1,
          scrollTrigger: { trigger: statementRef.current, start: "20% 70%", end: "50% 50%", scrub: 1.5 },
        }
      );

      // Story text reveal
      const storyLines = storyTextRef.current?.querySelectorAll(".reveal-line");
      if (storyLines) {
        storyLines.forEach((el, i) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 30 },
            {
              opacity: 1, y: 0, duration: 0.8,
              scrollTrigger: { trigger: storyRef.current, start: `${15 + i * 12}% 70%`, end: `${35 + i * 12}% 50%`, scrub: 1 },
            }
          );
        });
      }

      // ─── HORIZONTAL CRAFT SECTION
      if (horizontalTrackRef.current && horizontalRef.current) {
        gsap.to(horizontalTrackRef.current, {
          x: () => -(horizontalTrackRef.current!.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: horizontalRef.current,
            start: "top top",
            end: () => `+=${horizontalTrackRef.current!.scrollWidth - window.innerWidth}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      }
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <div className="relative z-10 font-[family-name:var(--font-inter)] transition-colors duration-300 bg-white text-black dark:bg-[#000] dark:text-white">

        {/* ═══════════════════════════ HERO VIDEO SLIDER ═══════════════════════ */}
        <section
          ref={heroRef}
          id="hero"
          className="relative h-screen w-full overflow-hidden select-none"
          style={{ userSelect: "none" }}
        >
          {/* Full-screen video slider */}
          <VideoSlider />

          {/* Hero text overlay */}
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="w-full md:w-[55%] px-8 md:px-16 lg:px-20 flex flex-col justify-center">
              <p
                ref={heroMetaRef}
                className="text-[10px] tracking-[0.5em] uppercase mb-8 font-light"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                SS 2025 — Suits & Ethnic Luxury
              </p>

              <div ref={heroTitleRef}>
                <h1
                  className="text-[15vw] sm:text-[11vw] md:text-[8.5vw] lg:text-[7.5vw] font-light tracking-[-0.03em] leading-[0.9] text-white"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Crafted
                  <br />
                  <em className="not-italic" style={{ color: "#2e8b57" }}>For The</em>
                  <br />
                  Heritage Look.
                </h1>
              </div>

              <p className="mt-8 text-[10px] tracking-[0.4em] uppercase leading-loose" style={{ color: "rgba(255,255,255,0.4)" }}>
                Suits · Kurtis · Ethnic Luxury
              </p>

              <div className="mt-12">
                <Link
                  href={`/${locale}/collections`}
                  className="inline-flex items-center gap-4 text-[10px] tracking-[0.4em] uppercase transition-colors duration-500 group"
                  style={{ color: "#2e8b57" }}
                >
                  Explore Collection
                  <span
                    className="w-8 h-px group-hover:w-14 transition-all duration-700"
                    style={{ background: "#2e8b57" }}
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div
            ref={heroScrollHintRef}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-30"
          >
            <span className="text-[9px] tracking-[0.4em] uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>
              Scroll
            </span>
            <div
              className="w-px h-10 animate-pulse"
              style={{ background: "linear-gradient(to bottom, rgba(46,139,87,0.6), transparent)" }}
            />
          </div>
        </section>

        {/* ═══════════════════════ BRAND STATEMENT ════════════════════════════ */}
        <section
          ref={statementRef}
          id="statement"
          className="min-h-screen w-full flex items-center justify-start px-8 md:px-20 transition-colors duration-300 bg-white dark:bg-[#000]"
        >
          <div className="max-w-4xl">
            <p className="text-[10px] tracking-[0.5em] uppercase mb-12" style={{ color: "#2e8b57" }}>
              Our Craft
            </p>
            <div
              className="text-[9vw] md:text-[6vw] font-light leading-[1.05] tracking-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              <span ref={line1Ref} className="block text-black dark:text-white dark:text-white">
                Every thread holds
              </span>
              <span className="block italic text-[7vw] md:text-[5vw]" style={{ color: "#2e8b57" }}>
                &nbsp;&nbsp;&nbsp;a tradition.
              </span>
              <span ref={line2Ref} className="block text-black dark:text-white mt-4">
                Ours begins
              </span>
              <span className="block text-black dark:text-white dark:text-white">with heritage.</span>
            </div>
          </div>
        </section>

        {/* ════════════════════ PARTNER WITH US (after heritage) ══════════════ */}
        <JaliPartnerSection locale={locale} />

        {/* ════════════════════ 3D PRODUCT STORY ══════════════════════════════ */}
        <section
          ref={storyRef}
          id="story"
          className="min-h-screen w-full flex items-center px-8 md:px-20 transition-colors duration-300 bg-gray-50 dark:bg-[#050505]"
        >
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-16">
            {/* Left: Text */}
            <div ref={storyTextRef} className="max-w-lg flex-shrink-0">
              <span
                className="reveal-line block text-[10px] tracking-[0.5em] uppercase mb-12"
                style={{ color: "#2e8b57" }}
              >
                The Art of Ethnic Wear
              </span>
              <h2
                className="reveal-line text-[11vw] md:text-[7vw] font-bold tracking-tighter leading-[0.9] mb-10 text-black dark:text-white transition-colors duration-300"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                THE ART
                <br />
                OF
                <br />
                ELEGANCE
              </h2>
              <p className="reveal-line text-base leading-relaxed mb-6 font-light max-w-sm text-black dark:text-white dark:text-white transition-colors duration-300">
                Woven from pure chanderi and mulmul, each kurta and suit is a study in
                refined proportion. Every pleat deliberate. Every embroidery intentional.
              </p>
              <p className="reveal-line text-base leading-relaxed font-light max-w-sm text-black dark:text-white dark:text-white transition-colors duration-300">
                From the first drape of fabric to the final hand-press, your garment
                is shaped through 80 hours of artisan craftsmanship.
              </p>
              <Link
                href={`/${locale}/collections`}
                className="reveal-line inline-flex items-center gap-4 mt-12 text-[11px] tracking-[0.35em] uppercase transition-colors duration-500 group"
                style={{ color: "#2e8b57" }}
              >
                Discover the craft
                <span
                  className="w-8 h-px group-hover:w-16 transition-all duration-500"
                  style={{ background: "#2e8b57" }}
                />
              </Link>
            </div>

            {/* Right: Product Image */}
            <div className="hidden md:block flex-1 max-w-[420px] w-full">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] shadow-2xl">
                <img
                  src="/goldensuit.jpeg"
                  alt="The Art of Elegance"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Green accent bar */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[3px]"
                  style={{ background: "linear-gradient(90deg, #0d6b3e, #2e8b57, transparent)" }}
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                {/* Label badge */}
                <span className="absolute top-5 left-5 text-[9px] tracking-[0.35em] uppercase bg-black/60 text-[#2e8b57] px-3 py-1.5 backdrop-blur-sm rounded-full">
                  Festive 2025
                </span>
              </div>
            </div>
          </div>
        </section>


        {/* ═══════════════ HORIZONTAL CRAFT SECTION ═══════════════════════════ */}
        <section
          ref={horizontalRef}
          id="craft"
          className="w-full overflow-hidden transition-colors duration-300 bg-gray-100 dark:bg-[#080808]"
          style={{ height: "100vh" }}
        >
          <div
            ref={horizontalTrackRef}
            className="flex h-full items-center"
            style={{ width: `${craftDetails.length * 100}vw` }}
          >
            {craftDetails.map((item) => (
              <div
                key={item.title}
                className="w-screen h-full flex items-center justify-between px-16 md:px-24 shrink-0"
                style={{ borderRight: "1px solid rgba(255,255,255,0.04)" }}
              >
                <div className="flex flex-col gap-8 flex-1">
                  <span
                    className="text-[10px] tracking-[0.5em] uppercase font-light"
                    style={{ color: "#2e8b57" }}
                  >
                    {item.label} / {craftDetails.length.toString().padStart(2, "0")}
                  </span>
                  <h3
                    className="text-[15vw] md:text-[10vw] font-bold tracking-tighter leading-none text-black dark:text-white transition-colors duration-300"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-base font-light max-w-xs leading-relaxed text-black dark:text-white dark:text-white transition-colors duration-300">
                    {item.desc}
                  </p>
                </div>
                <Link
                  href={`/${locale}/product/${item.slug}`}
                  className="hidden md:block w-[30vw] max-w-[450px] aspect-[3/4] shrink-0 relative mr-20 overflow-hidden rounded-[2rem] shadow-2xl"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                >
                  <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════ SIGNATURE COLLECTION ════════════════════════════ */}
        <section
          id="collection"
          className="w-full py-24 px-8 md:px-20 transition-colors duration-300 bg-white dark:bg-[#000]"
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end justify-between mb-12">
              <h2
                className="text-[7vw] md:text-[4.5vw] font-light leading-none tracking-tighter"
                style={{ fontFamily: "var(--font-playfair)", color: "#2e8b57" }}
              >
                Signature
                <br />
                Collection
              </h2>
              <span
                className="text-[10px] tracking-[0.5em] uppercase pb-2 text-black dark:text-white dark:text-white transition-colors duration-300"
              >
                Festive 2025
              </span>
            </div>

            {/* Editorial cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {[
                { num: "01", name: "Ivory Chanderi Kurta Set", label: "The Regal", slug: "the-regal", img: "/33-1-scaled.webp", hoverImg: "/35-1-scaled.webp" },
                { num: "02", name: "Deep Navy Sherwani Suit", label: "The Nawab", slug: "the-nawab", img: "/34-1-scaled.webp", hoverImg: "/41-scaled.webp" },
                { num: "03", name: "Blush Pink Anarkali Kurta", label: "The Rosette", slug: "the-rosette", img: "/35-1-scaled.webp", hoverImg: "/36-1-scaled.webp" },
              ].map((item, i) => (
                <Link
                  key={item.num}
                  href={`/${locale}/product/${item.slug}`}
                  className={`group relative cursor-pointer block max-w-sm mx-auto w-full ${i === 1 ? "md:mt-16" : ""}`}
                >
                  <div className="relative overflow-hidden aspect-[3/4] transition-all duration-500 group-hover:rounded-2xl" style={{ background: "#111" }}>
                    <img
                      src={item.img}
                      alt={item.label}
                      className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-105 transition-all duration-[1200ms] ease-out opacity-100 group-hover:opacity-0"
                    />
                    <img
                      src={item.hoverImg}
                      alt={`${item.label} — back view`}
                      className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-all duration-[1200ms] ease-out opacity-0 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700" />
                    {/* Green accent on hover */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: "linear-gradient(90deg, #0d6b3e, #2e8b57)" }}
                    />
                    <span
                      className="absolute bottom-4 right-5 text-[5rem] font-bold leading-none select-none"
                      style={{ color: "rgba(255,255,255,0.06)", fontFamily: "var(--font-playfair)" }}
                    >
                      {item.num}
                    </span>
                  </div>
                  <div className="mt-6 flex justify-between items-end">
                    <div>
                      <span className="text-[9px] tracking-[0.4em] uppercase block mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                        {item.num}
                      </span>
                      <h3
                        className="text-2xl font-light tracking-tight text-black dark:text-white transition-colors duration-300"
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        {item.label}
                      </h3>
                      <span className="text-xs mt-1 block text-black dark:text-white dark:text-white/35 transition-colors duration-300">
                        {item.name}
                      </span>
                    </div>
                    <span
                      className="text-[9px] tracking-[0.35em] uppercase flex items-center gap-2 transition-colors duration-300 group-hover:text-white"
                      style={{ color: "#2e8b57" }}
                    >
                      View
                      <span className="w-0 h-px group-hover:w-6 transition-all duration-500" style={{ background: "#2e8b57" }} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════ FINAL CTA ═══════════════════════════════════ */}
        <section
          id="cta"
          className="h-screen w-full flex flex-col items-center justify-center text-center px-8 relative overflow-hidden transition-colors duration-300 bg-white dark:bg-[#000]"
        >
          {/* Green glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(13,107,62,0.12) 0%, transparent 70%)",
            }}
          />
          <p className="text-[10px] tracking-[0.5em] uppercase mb-12 relative z-10" style={{ color: "#2e8b57" }}>
            Wear Your Heritage
          </p>
          <h2
            className="text-[15vw] md:text-[10vw] font-bold tracking-tighter leading-[0.85] mb-16 text-black dark:text-white relative z-10 transition-colors duration-300"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            DRESS
            <br />
            <span className="italic font-light" style={{ color: "#2e8b57" }}>with</span>
            <br />
            PRIDE.
          </h2>
          <Link
            href={`/${locale}/collections`}
            className="inline-flex items-center gap-5 px-12 py-5 text-[11px] tracking-[0.4em] uppercase rounded-full group transition-all duration-700 relative z-10"
            style={{
              border: "1px solid rgba(46,139,87,0.4)",
              color: "#2e8b57",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#0d6b3e";
              (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "#0d6b3e";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
              (e.currentTarget as HTMLAnchorElement).style.color = "#2e8b57";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(46,139,87,0.4)";
            }}
          >
            Shop the Collection
            <span className="w-4 h-px bg-current group-hover:w-8 transition-all duration-500" />
          </Link>
        </section>
      </div>
    </>
  );
}
