"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";

export function HeroVideo() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!leftTextRef.current || !rightTextRef.current || !subtitleRef.current || !paragraphRef.current || !buttonRef.current) return;

    gsap.set(leftTextRef.current, { x: "-50vw", opacity: 0 });
    gsap.set(rightTextRef.current, { x: "50vw", opacity: 0 });
    gsap.set(subtitleRef.current, { y: 20, opacity: 0 });
    gsap.set(paragraphRef.current, { y: 20, opacity: 0 });
    gsap.set(buttonRef.current, { scale: 0, opacity: 0 });

    const tl = gsap.timeline({ delay: 0.5 });

    tl.to(leftTextRef.current, { x: 0, opacity: 1, duration: 1.5, ease: "power4.out" }, 0)
      .to(rightTextRef.current, { x: 0, opacity: 1, duration: 1.5, ease: "power4.out" }, 0)
      .to(subtitleRef.current, { y: 0, opacity: 1, duration: 1, ease: "power2.out" }, 1)
      .to(paragraphRef.current, { y: 0, opacity: 1, duration: 1, ease: "power2.out" }, 1.2)
      .to(buttonRef.current, { scale: 1, opacity: 1, duration: 1.2, ease: "elastic.out(1, 0.5)" }, 1.5);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-white flex items-center justify-center">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="/herovideo.mp4"
      />

      {/* Animated Text */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto mt-20">
        <div className="flex flex-wrap justify-center text-4xl md:text-6xl lg:text-[7rem] leading-tight font-bold tracking-tighter font-[family-name:var(--font-playfair)]">
          <div ref={leftTextRef} className="text-white drop-shadow-2xl mr-4 whitespace-nowrap">
            {t("titleLeft")}
          </div>
          <div ref={rightTextRef} className="text-transparent bg-clip-text bg-gradient-to-r from-white/90 to-white/60 drop-shadow-2xl whitespace-nowrap">
            {t("titleRight")}
          </div>
        </div>

        <div ref={subtitleRef} className="mt-8 text-lg md:text-2xl tracking-[0.2em] uppercase text-gray-100 font-[family-name:var(--font-inter)] drop-shadow-md">
          {t("subtitle")}
        </div>

        <p ref={paragraphRef} className="mt-6 text-sm md:text-base text-gray-200 font-[family-name:var(--font-inter)] max-w-3xl leading-relaxed drop-shadow-md">
          {t("paragraph")}
        </p>

        <button
          ref={buttonRef}
          onClick={() => router.push(`/${locale}/contact`)}
          className="mt-12 px-10 py-4 bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-sm rounded-full text-white text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
        >
          {t("button")}
        </button>
      </div>
    </div>
  );
}
