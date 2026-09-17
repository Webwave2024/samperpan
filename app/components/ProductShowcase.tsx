"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 1,
    image: "/35-1-scaled.webp",
    tag: "Festive",
    tagKey: "festive",
    color: "from-transparent to-transparent",
    accent: "#c8973a",
  },
  {
    id: 2,
    image: "/39-1-scaled.webp",
    tag: "Bridal",
    tagKey: "bridal",
    color: "from-transparent to-transparent",
    accent: "#c8973a",
  },
  {
    id: 3,
    image: "/33-1-scaled.webp",
    tag: "Everyday",
    tagKey: "everyday",
    color: "from-transparent to-transparent",
    accent: "#c8973a",
  },
  {
    id: 4,
    image: "/2026-08-07-12-53-15-1.pdf-42-scaled (1).webp",
    tag: "Heritage",
    tagKey: "heritage",
    color: "from-transparent to-transparent",
    accent: "#c8973a",
  },
];

export function ProductShowcase() {
  const t = useTranslations("products");
  const locale = useLocale();
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(headingRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
        },
      });

      gsap.from(lineRef.current, {
        scaleX: 0,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: lineRef.current,
          start: "top 85%",
        },
      });

      gsap.from(subRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: subRef.current,
          start: "top 88%",
        },
      });

      // Card stagger animation
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          y: 100,
          opacity: 0,
          duration: 1,
          ease: "power4.out",
          delay: i * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
          },
        });

        // Floating animation on each card
        gsap.to(card, {
          y: "-=8",
          duration: 2 + i * 0.3,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.4,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="collections" className="relative w-full py-16 bg-[#ffffff]">
      {/* Ambient glow bg */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-black/[0.02] blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-black/[0.02] blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div ref={headingRef}>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-black font-[family-name:var(--font-playfair)] leading-tight">
              {t("heading")}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c8973a] to-amber-200">
                {" "}{t("headingAccent")}
              </span>
            </h2>
          </div>
          <div
            ref={lineRef}
            className="mx-auto mt-6 h-px bg-gradient-to-r from-transparent via-black/30 to-transparent w-64 origin-center"
          />
          <p ref={subRef} className="mt-6 text-black/70 text-base md:text-lg max-w-xl mx-auto font-[family-name:var(--font-inter)] leading-relaxed">
            {t("subheading")}
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-2 isolate">
          {products.map((product, i) => (
            <Link
              href={`/${locale}/product/${product.id}`}
              key={product.id}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer border border-black/5 hover:border-black/20 transition-all duration-500"
              style={{ aspectRatio: "3/4" }}
            >
              {/* Product Image */}
              <div className="absolute inset-0">
                <Image
                  src={product.image}
                  alt={product.tag}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  unoptimized
                />
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className={`absolute inset-0 bg-gradient-to-t ${product.color}`} />

              {/* Glow ring on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ boxShadow: `inset 0 0 30px 0 ${product.accent}30` }}
              />

              {/* Tag badge */}
              <div className="absolute top-4 left-4">
                <span
                  className="px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-semibold backdrop-blur-md border"
                  style={{
                    color: product.accent,
                    borderColor: `${product.accent}40`,
                    backgroundColor: `${product.accent}15`,
                  }}
                >
                  {t(product.tagKey)}
                </span>
              </div>

              {/* Bottom content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-white font-semibold text-lg font-[family-name:var(--font-playfair)] mb-1">
                  SIDHANT {t(product.tagKey)}
                </h3>
                <p className="text-white/80 text-xs tracking-wider mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {t("viewCollection")}
                </p>
                <button
                  className="w-full py-2.5 rounded-full text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0"
                  style={{
                    backgroundColor: `${product.accent}20`,
                    border: `1px solid ${product.accent}50`,
                    color: product.accent,
                  }}
                >
                  {t("explore")}
                </button>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="relative z-10 text-center mt-32 mb-12">
          <button className="group px-12 py-4 border border-black/20 rounded-full text-black text-sm uppercase tracking-[0.25em] hover:bg-black hover:text-white transition-all duration-500 font-[family-name:var(--font-inter)]">
            <span className="flex items-center gap-3">
              {t("viewAll")}
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">→</span>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
