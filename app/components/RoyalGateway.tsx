"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

export function RoyalGateway() {
  const router = useRouter();
  const locale = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const retailCardRef = useRef<HTMLButtonElement>(null);
  const wholesaleCardRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Elegant fade-in animation
      gsap.fromTo(
        ".gateway-elem",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, stagger: 0.3, ease: "power4.out", scrollTrigger: { trigger: containerRef.current, start: "top 80%" } }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>, ref: React.RefObject<HTMLButtonElement>) => {
    if (!ref.current) return;
    gsap.to(ref.current.querySelector('.card-bg'), { scale: 1.1, duration: 1.5, ease: "power2.out" });
    gsap.to(ref.current.querySelector('.glow-ring'), { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" });
    gsap.to(ref.current.querySelector('.card-content'), { y: -10, duration: 0.5, ease: "power2.out" });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>, ref: React.RefObject<HTMLButtonElement>) => {
    if (!ref.current) return;
    gsap.to(ref.current.querySelector('.card-bg'), { scale: 1, duration: 1.5, ease: "power2.out" });
    gsap.to(ref.current.querySelector('.glow-ring'), { opacity: 0, scale: 0.9, duration: 0.8, ease: "power2.out" });
    gsap.to(ref.current.querySelector('.card-content'), { y: 0, duration: 0.5, ease: "power2.out" });
  };

  return (
    <div ref={containerRef} className="w-full py-16 min-h-[60vh] bg-[#ffffff] text-black flex flex-col items-center justify-center px-8 relative z-10 overflow-hidden">
      
      {/* Royal Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[40rem] h-[40rem] bg-amber-900/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[40rem] h-[40rem] bg-[#ffffff]/30 rounded-full blur-[100px] pointer-events-none" />

      <div className="text-center mb-20 max-w-3xl gateway-elem relative z-10">
        <h2 className="text-sm tracking-[0.4em] uppercase text-amber-500/70 mb-6 font-medium font-[family-name:var(--font-inter)]">
          Welcome to Sidhant
        </h2>
        <p className="text-4xl md:text-6xl font-bold leading-tight font-[family-name:var(--font-playfair)]">
          Ahmedabad's Premier Design House. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600 italic font-light">
            Redefining Modern Heritage.
          </span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 md:gap-12 w-full max-w-6xl relative z-10">
        {/* Retail Option */}
        <button
          ref={retailCardRef}
          onMouseEnter={(e) => handleMouseEnter(e, retailCardRef)}
          onMouseLeave={(e) => handleMouseLeave(e, retailCardRef)}
          onClick={() => router.push(`/${locale}/retail`)}
          className="gateway-elem flex-1 group relative h-80 md:h-[24rem] rounded-2xl overflow-hidden border border-black/10 flex flex-col items-center justify-center text-left"
        >
          {/* Card Background Image */}
          <div className="card-bg absolute inset-0 transition-transform duration-1000 origin-center">
            <Image 
              src="/2026-08-07-12-53-15-1.pdf-47-scaled.webp" 
              alt="Retail" 
              fill 
              className="object-cover opacity-90 group-hover:opacity-100 transition-all duration-1000" 
              unoptimized
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
          
          {/* Royal Glow Ring */}
          <div className="glow-ring absolute inset-6 border border-amber-500/30 rounded-xl opacity-0 scale-90 z-20 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-10" />

          <div className="card-content relative z-30 p-10 flex flex-col items-center justify-end h-full w-full">
            <div className="w-12 h-12 mb-6 rounded-full border border-amber-500/50 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-500">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>
            <h3 className="text-3xl font-[family-name:var(--font-playfair)] mb-4 text-white">Retail Curators</h3>
            <p className="text-zinc-200 font-[family-name:var(--font-inter)] text-sm tracking-wide text-center max-w-xs">Exclusive access for boutique owners & private clients seeking unique pieces.</p>
            
            <div className="mt-8 flex items-center gap-2 text-amber-500 text-xs tracking-[0.2em] uppercase font-bold opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
              Enter Portal <span className="text-lg">→</span>
            </div>
          </div>
        </button>

        {/* Wholesale Option */}
        <button
          ref={wholesaleCardRef}
          onMouseEnter={(e) => handleMouseEnter(e, wholesaleCardRef)}
          onMouseLeave={(e) => handleMouseLeave(e, wholesaleCardRef)}
          onClick={() => router.push(`/${locale}/wholesale`)}
          className="gateway-elem flex-1 group relative h-80 md:h-[24rem] rounded-2xl overflow-hidden border border-black/10 flex flex-col items-center justify-center text-left"
        >
          {/* Card Background Image */}
          <div className="card-bg absolute inset-0 transition-transform duration-1000 origin-center">
            <Image 
              src="/2026-08-07-12-53-15-1.pdf-47-scaled.webp" 
              alt="Wholesale" 
              fill 
              className="object-cover opacity-90 group-hover:opacity-100 transition-all duration-1000" 
              unoptimized
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
          
          {/* Royal Glow Ring */}
          <div className="glow-ring absolute inset-6 border border-emerald-500/30 rounded-xl opacity-0 scale-90 z-20 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-10" />

          <div className="card-content relative z-30 p-10 flex flex-col items-center justify-end h-full w-full">
            <div className="w-12 h-12 mb-6 rounded-full border border-emerald-500/50 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-500">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
            </div>
            <h3 className="text-3xl font-[family-name:var(--font-playfair)] mb-4 text-white">Bespoke Wholesale</h3>
            <p className="text-zinc-200 font-[family-name:var(--font-inter)] text-sm tracking-wide text-center max-w-xs">Dedicated partnerships for high-volume allocations and global distributors.</p>
            
            <div className="mt-8 flex items-center gap-2 text-emerald-500 text-xs tracking-[0.2em] uppercase font-bold opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
              Enter Portal <span className="text-lg">→</span>
            </div>
          </div>
        </button>
      </div>

    </div>
  );
}
