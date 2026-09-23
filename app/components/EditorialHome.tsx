"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { GlobalCanvas } from "./GlobalCanvas";

gsap.registerPlugin(ScrollTrigger);

// ─── Drag hint: fades after first right-click ─────────────────────────────────
function DragHint() {
  const hintRef = useRef<HTMLDivElement>(null);
  const hasFired = useRef(false);

  useEffect(() => {
    const hide = () => {
      if (hasFired.current || !hintRef.current) return;
      hasFired.current = true;
      gsap.to(hintRef.current, { opacity: 0, duration: 0.8, ease: "power2.out" });
    };
    window.addEventListener("contextmenu", hide);
    window.addEventListener("pointerdown", (e) => { if (e.button === 2) hide(); });
    // Auto-hide after 5s anyway
    const t = setTimeout(hide, 5000);
    return () => {
      window.removeEventListener("contextmenu", hide);
      clearTimeout(t);
    };
  }, []);

  return (
    <div
      ref={hintRef}
      className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none"
    >
      <span className="text-[8px] tracking-[0.5em] uppercase text-white/30">
        Drag to Explore 360°
      </span>
      <div className="flex gap-1 items-center">
        <span className="text-white/20 text-xs">⟵</span>
        <div className="w-6 h-px bg-white/20" />
        <span className="text-white/20 text-xs">⟶</span>
      </div>
    </div>
  );
}

interface LuxuryExperienceProps {
  modelGroupRef: React.RefObject<THREE.Group | null>;
}

export function LuxuryExperience({ modelGroupRef }: LuxuryExperienceProps) {
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
    { label: "03", title: "EMBROIDERY", desc: "Zardozi, chikankari & thread work — each stitch placed with purpose.", img: "/43-scaled.webp", slug: "the-rosette" },
    { label: "04", title: "FIT", desc: "Two fittings per garment. One silhouette that is entirely yours.", img: "/36-1-scaled.webp", slug: "the-rosette" },
    { label: "05", title: "FINISH", desc: "Hand-pressed, pearl-button detailing, and a signature embroidered cuff.", img: "/37-1-scaled.webp", slug: "the-regal" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ─── HERO: entry animations ───────────────────────────────
      gsap.set([heroTitleRef.current, heroMetaRef.current, heroScrollHintRef.current], {
        opacity: 0,
        y: 40,
      });
      const heroTL = gsap.timeline({ delay: 0.6 });
      heroTL
        .to(heroTitleRef.current, { opacity: 1, y: 0, duration: 1.4, ease: "power3.out" })
        .to(heroMetaRef.current, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=0.8")
        .to(heroScrollHintRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.5");

      // ─── SINGLE SOURCE OF TRUTH (Default Transform) ───────────
      const DEFAULT_POSITION = { x: 2.5, y: 0.3, z: 0 };
      const DEFAULT_SCALE = 0.85;

      if (modelGroupRef.current) {
        // Apply default canonical transform initially
        gsap.set(modelGroupRef.current.scale, { x: DEFAULT_SCALE, y: DEFAULT_SCALE, z: DEFAULT_SCALE });
        gsap.set(modelGroupRef.current.position, { x: DEFAULT_POSITION.x, y: DEFAULT_POSITION.y, z: DEFAULT_POSITION.z });

        ScrollTrigger.create({
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
          onUpdate: (self) => {
            if (!modelGroupRef.current) return;
            const p = self.progress;
            // Always calculate relative to the DEFAULT state, never accumulate
            modelGroupRef.current.scale.setScalar(gsap.utils.interpolate(DEFAULT_SCALE, 0.5, p));
            modelGroupRef.current.position.x = gsap.utils.interpolate(DEFAULT_POSITION.x, 0, p);
            modelGroupRef.current.position.y = gsap.utils.interpolate(DEFAULT_POSITION.y, 0, p);
            modelGroupRef.current.position.z = gsap.utils.interpolate(DEFAULT_POSITION.z, -3, p);
          },
        });

        // Fade out hero text on scroll
        gsap.to(heroTitleRef.current, {
          opacity: 0,
          y: -50,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "40% top",
            end: "80% top",
            scrub: 1,
          },
        });
        gsap.to([heroMetaRef.current, heroScrollHintRef.current], {
          opacity: 0,
          y: -30,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "30% top",
            end: "70% top",
            scrub: 1,
          },
        });
      }

      // ─── BRAND STATEMENT: word-by-word reveal ────────────────
      gsap.fromTo(
        line1Ref.current,
        { opacity: 0, x: -80, filter: "blur(8px)" },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 1,
          scrollTrigger: {
            trigger: statementRef.current,
            start: "top 80%",
            end: "30% 60%",
            scrub: 1.5,
          },
        }
      );
      gsap.fromTo(
        line2Ref.current,
        { opacity: 0, x: 80, filter: "blur(8px)" },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 1,
          scrollTrigger: {
            trigger: statementRef.current,
            start: "20% 70%",
            end: "50% 50%",
            scrub: 1.5,
          },
        }
      );

      // Model moves to right for story section
      if (modelGroupRef.current) {
        ScrollTrigger.create({
          trigger: storyRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: 1.5,
          onUpdate: (self) => {
            if (!modelGroupRef.current) return;
            const p = self.progress;
            modelGroupRef.current.position.x = gsap.utils.interpolate(0, 3, p);
            modelGroupRef.current.position.y = gsap.utils.interpolate(0, 0.5, p);
            modelGroupRef.current.position.z = -3; // Maintain z from previous trigger
            modelGroupRef.current.scale.setScalar(0.5); // Maintain scale from previous trigger
          },
        });

        // Model comes back for CTA section (footer)
        ScrollTrigger.create({
          trigger: document.getElementById("cta"),
          start: "top bottom",
          end: "center center",
          scrub: 1.5,
          onUpdate: (self) => {
            if (!modelGroupRef.current) return;
            const p = self.progress;
            modelGroupRef.current.position.x = gsap.utils.interpolate(3, 0, p);
            modelGroupRef.current.position.y = gsap.utils.interpolate(0.5, -0.5, p);
            modelGroupRef.current.position.z = gsap.utils.interpolate(-3, -1, p); // Move it closer
            modelGroupRef.current.scale.setScalar(gsap.utils.interpolate(0.5, 1.2, p)); // Scale up from 0.5 (not 0.85)
          },
        });
      }

      // Story text reveal
      const storyLines = storyTextRef.current?.querySelectorAll(".reveal-line");
      if (storyLines) {
        storyLines.forEach((el, i) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              scrollTrigger: {
                trigger: storyRef.current,
                start: `${15 + i * 12}% 70%`,
                end: `${35 + i * 12}% 50%`,
                scrub: 1,
              },
            }
          );
        });
      }

      // ─── HORIZONTAL CRAFT SECTION ────────────────────────────
      if (horizontalTrackRef.current && horizontalRef.current) {
        const trackWidth = horizontalTrackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        const distance = trackWidth - viewportWidth;

        gsap.to(horizontalTrackRef.current, {
          x: -distance,
          ease: "none",
          scrollTrigger: {
            trigger: horizontalRef.current,
            start: "top top",
            end: `+=${distance}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });
      }
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [modelGroupRef]);

  return (
    <>
      {/* Fixed 3D Canvas behind everything */}
      <GlobalCanvas modelGroupRef={modelGroupRef} />

      {/* HTML Content layers above */}
      <div
        className="relative z-10 text-white font-[family-name:var(--font-inter)]"
        style={{ background: "transparent" }}
      >
        {/* ═══════════════════════════ HERO ═══════════════════════════ */}
        <section
          ref={heroRef}
          id="hero"
          className="relative h-screen w-full flex flex-col justify-center bg-transparent overflow-hidden select-none"
          style={{ userSelect: 'none' }}
        >
          {/* Radial glow behind the product area (pure CSS animated) */}
          <div
            className="absolute inset-0 pointer-events-none animate-bg-shift"
            style={{
              background:
                "radial-gradient(ellipse 65% 80% at 70% 55%, rgba(180,150,100,0.05) 0%, rgba(200,180,140,0.02) 40%, transparent 80%)",
              backgroundSize: "200% 200%",
            }}
          />

          {/* Split layout: Typography (left 45%) + Product space (right 55%) */}
          <div className="relative z-10 w-full h-full flex items-center">
            {/* ── Typography block — left side, never overlaps model ── */}
            <div className="w-full md:w-[48%] px-8 md:px-16 lg:px-20 flex flex-col justify-center">
              <p
                ref={heroMetaRef}
                className="text-[10px] tracking-[0.5em] uppercase text-white/40 mb-8 font-light"
              >
                SS 2025 — Suits & Ethnic Luxury
              </p>

              <div ref={heroTitleRef}>
                <h1
                  className="text-[15vw] sm:text-[11vw] md:text-[8.5vw] lg:text-[7.5vw] font-light tracking-[-0.03em] leading-[0.9]"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Crafted
                  <br />
                  <em className="not-italic text-white/45">For The</em>
                  <br />
                  Heritage Look.
                </h1>
              </div>

              <p className="mt-8 text-[10px] tracking-[0.4em] uppercase text-white/35 leading-loose">
                Suits · Kurtis · Ethnic Luxury
              </p>

              {/* CTA */}
              <div className="mt-12">
                <Link
                  href={`/${locale}/collections`}
                  className="inline-flex items-center gap-4 text-[10px] tracking-[0.4em] uppercase text-white/60 hover:text-white transition-colors duration-500 group"
                >
                  Explore Collection
                  <span className="w-8 h-px bg-white/40 group-hover:w-14 group-hover:bg-white transition-all duration-700" />
                </Link>
              </div>
            </div>

            {/* ── Right side: model lives here in 3D space (not in DOM) ── */}
            {/* This is deliberately empty — the 3D Canvas is fixed and positions the model here */}
            <div className="hidden md:flex md:w-[52%] h-full items-center justify-center relative">
              {/* Drag hint — fades after first interaction */}
              <DragHint />
            </div>
          </div>

          {/* Scroll indicator */}
          <div
            ref={heroScrollHintRef}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          >
            <span className="text-[9px] tracking-[0.4em] uppercase text-white/25">
              Scroll
            </span>
            <div className="w-px h-10 bg-gradient-to-b from-white/25 to-transparent animate-pulse" />
          </div>
        </section>

        {/* ═══════════════════════ BRAND STATEMENT ════════════════════ */}
        <section
          ref={statementRef}
          id="statement"
          className="min-h-screen w-full flex items-center justify-start px-8 md:px-20 bg-black"
        >
          <div className="max-w-4xl">
            <p className="text-[10px] tracking-[0.5em] uppercase text-white/30 mb-12">
              Our Craft
            </p>
            <div
              className="text-[9vw] md:text-[6vw] font-light leading-[1.05] tracking-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              <span ref={line1Ref} className="block text-white/90">
                Every thread holds
              </span>
              <span className="block text-white/30 italic text-[7vw] md:text-[5vw]">
                &nbsp;&nbsp;&nbsp;a tradition.
              </span>
              <span ref={line2Ref} className="block text-white mt-4">
                Ours begins
              </span>
              <span className="block text-white/60">with heritage.</span>
            </div>
          </div>
        </section>

        {/* ════════════════════ 3D PRODUCT STORY ══════════════════════ */}
        <section
          ref={storyRef}
          id="story"
          className="min-h-screen w-full flex items-center px-8 md:px-20 bg-[#0a0a0a]"
        >
          <div ref={storyTextRef} className="max-w-lg">
            <span className="reveal-line block text-[10px] tracking-[0.5em] uppercase text-white/30 mb-12">
              The Art of Ethnic Wear
            </span>
            <h2
              className="reveal-line text-[11vw] md:text-[7vw] font-bold tracking-tighter leading-[0.9] mb-10"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              THE ART
              <br />
              OF
              <br />
              ELEGANCE
            </h2>
            <p className="reveal-line text-base text-white/50 leading-relaxed mb-6 font-light max-w-sm">
              Woven from pure chanderi and mulmul, each kurta and suit is a study in
              refined proportion. Every pleat deliberate. Every embroidery intentional.
            </p>
            <p className="reveal-line text-base text-white/40 leading-relaxed font-light max-w-sm">
              From the first drape of fabric to the final hand-press, your garment
              is shaped through 80 hours of artisan craftsmanship.
            </p>
            <Link
              href={`/${locale}/collections`}
              className="reveal-line inline-flex items-center gap-4 mt-12 text-[11px] tracking-[0.35em] uppercase text-white/60 hover:text-white transition-colors duration-500 group"
            >
              Discover the craft
              <span className="w-8 h-px bg-white/40 group-hover:w-16 group-hover:bg-white transition-all duration-500" />
            </Link>
          </div>
        </section>

        {/* ═══════════════ HORIZONTAL CRAFT SECTION ═══════════════════ */}
        <section
          ref={horizontalRef}
          id="craft"
          className="w-full overflow-hidden bg-[#0f0f0f]"
          style={{ height: "100vh" }}
        >
          <div
            ref={horizontalTrackRef}
            className="flex h-full items-center"
            style={{ width: "500vw" }}
          >
            {craftDetails.map((item, i) => (
              <div
                key={item.title}
                className="w-screen h-full flex items-center justify-between px-16 md:px-24 shrink-0 border-r border-white/5"
              >
                <div className="flex flex-col gap-8 flex-1">
                  <span className="text-[10px] tracking-[0.5em] uppercase text-white/25 font-light">
                    {item.label} / {craftDetails.length.toString().padStart(2, "0")}
                  </span>
                  <h3
                    className="text-[15vw] md:text-[10vw] font-bold tracking-tighter leading-none text-white"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-base text-white/40 font-light max-w-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <Link href={`/${locale}/product/${item.slug}`} className="hidden md:block w-1/3 h-2/3 relative mr-20 overflow-hidden bg-white/5 grayscale hover:grayscale-0 transition-all duration-1000">
                  <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover opacity-80" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════ SELECTED COLLECTION ════════════════════ */}
        <section
          id="collection"
          className="w-full py-40 px-8 md:px-20 bg-[#f5f2ee] text-black"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-24">
              <h2
                className="text-[10vw] md:text-[7vw] font-light leading-none tracking-tighter text-black"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Signature
                <br />
                Collection
              </h2>
              <span className="text-[10px] tracking-[0.5em] uppercase text-black/40 pb-2">
                Festive 2025
              </span>
            </div>

            {/* Editorial cards with real product images */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
              {[
                {
                  num: "01",
                  name: "Ivory Chanderi Kurta Set",
                  label: "The Regal",
                  slug: "the-regal",
                  img: "/33-1-scaled.webp",
                  hoverImg: "/35-1-scaled.webp",
                },
                {
                  num: "02",
                  name: "Deep Navy Sherwani Suit",
                  label: "The Nawab",
                  slug: "the-nawab",
                  img: "/34-1-scaled.webp",
                  hoverImg: "/41-scaled.webp",
                },
                {
                  num: "03",
                  name: "Blush Pink Anarkali Kurta",
                  label: "The Rosette",
                  slug: "the-rosette",
                  img: "/35-1-scaled.webp",
                  hoverImg: "/36-1-scaled.webp",
                },
              ].map((item, i) => (
                <Link
                  key={item.num}
                  href={`/${locale}/product/${item.slug}`}
                  className={`group relative cursor-pointer block ${i === 1 ? "md:mt-24" : ""}`}
                >
                  <div className="relative overflow-hidden bg-[#1a1a1a] aspect-[3/4]">
                    {/* Front image */}
                    <img
                      src={item.img}
                      alt={item.label}
                      className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-105 transition-all duration-[1200ms] ease-out opacity-100 group-hover:opacity-0"
                    />
                    {/* Back / hover image — crossfades in */}
                    <img
                      src={item.hoverImg}
                      alt={`${item.label} — back view`}
                      className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-all duration-[1200ms] ease-out opacity-0 group-hover:opacity-100"
                    />
                    {/* Dark overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700" />
                    {/* Number watermark */}
                    <span
                      className="absolute bottom-4 right-5 text-white/10 text-[5rem] font-bold leading-none select-none"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {item.num}
                    </span>
                  </div>
                  <div className="mt-6 flex justify-between items-end">
                    <div>
                      <span className="text-[9px] tracking-[0.4em] uppercase text-black/40 block mb-1">
                        {item.num}
                      </span>
                      <h3
                        className="text-2xl font-light tracking-tight text-black"
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        {item.label}
                      </h3>
                      <span className="text-xs text-black/40 mt-1 block">{item.name}</span>
                    </div>
                    <span className="text-[9px] tracking-[0.35em] uppercase text-black/40 group-hover:text-black transition-colors duration-300 flex items-center gap-2">
                      View
                      <span className="w-0 h-px bg-black group-hover:w-6 transition-all duration-500" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════ SUIT DETAILS ════════════════════════ */}
        <section
          id="details"
          className="w-full py-40 px-8 md:px-20 bg-[#111111] text-white"
        >
          <div className="max-w-7xl mx-auto">
            <span className="text-[10px] tracking-[0.5em] uppercase text-white/30 mb-16 block">
              The Details
            </span>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-20">
              {[
                { name: "FABRIC", desc: "Pure chanderi, mulmul & raw silk — sourced from Varanasi & Bhopal" },
                { name: "SILHOUETTE", desc: "Straight, Anarkali & A-line cuts tailored to your posture" },
                { name: "EMBROIDERY", desc: "Zardozi, chikankari & gota patti — handcrafted by artisans" },
                { name: "COLLAR", desc: "Mandarin, angrakha & V-neck — chosen per style" },
                { name: "BUTTONS", desc: "Hand-carved bone, resin & antique brass closures" },
                { name: "DUPATTA", desc: "Hand-block printed or embroidered to match" },
                { name: "FIT", desc: "Two-fitting bespoke process, every time" },
                { name: "LINING", desc: "Breathable cotton inner with signature label" },
              ].map((detail) => (
                <div key={detail.name} className="group">
                  <div className="w-8 h-px bg-white/20 mb-6 group-hover:w-16 group-hover:bg-white/60 transition-all duration-500" />
                  <h4
                    className="text-2xl font-bold tracking-tighter mb-3"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {detail.name}
                  </h4>
                  <p className="text-sm text-white/40 leading-relaxed font-light">
                    {detail.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════ FINAL CTA ═══════════════════════════ */}
        <section
          id="cta"
          className="h-screen w-full flex flex-col items-center justify-center text-center px-8 bg-black relative overflow-hidden"
        >
          <p className="text-[10px] tracking-[0.5em] uppercase text-white/30 mb-12">
            Wear Your Heritage
          </p>
          <h2
            className="text-[15vw] md:text-[10vw] font-bold tracking-tighter leading-[0.85] mb-16"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            DRESS
            <br />
            <span className="text-white/30 italic font-light">with</span>
            <br />
            PRIDE.
          </h2>
          <Link
            href={`/${locale}/collections`}
            className="inline-flex items-center gap-5 px-12 py-5 border border-white/15 hover:bg-white hover:text-black transition-all duration-700 text-[11px] tracking-[0.4em] uppercase rounded-full group"
          >
            Shop the Collection
            <span className="w-4 h-px bg-current group-hover:w-8 transition-all duration-500" />
          </Link>
        </section>
      </div>
    </>
  );
}
