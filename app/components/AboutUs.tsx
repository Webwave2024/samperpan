"use client";

import Image from "next/image";
import { useTheme } from "./ThemeProvider";

export function AboutUs() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div
      className="w-full min-h-screen pt-32 pb-24 font-[family-name:var(--font-inter)] transition-colors duration-300"
      style={{ backgroundColor: isDark ? "#000" : "#fff", color: isDark ? "#fff" : "#000" }}
    >
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-[family-name:var(--font-playfair)] mb-6">Our Story</h1>
          <p className={`max-w-2xl mx-auto tracking-wide text-lg font-light leading-relaxed ${isDark ? "text-white/60" : "text-black/60"}`}>
            A legacy of craftsmanship. We weave tales of tradition into every silhouette, redefining modern ethnic wear.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl" style={{ background: "#111" }}>
            <Image 
              src="/33-1-scaled.webp" 
              alt="Artisan Craftsmanship"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-3xl font-[family-name:var(--font-playfair)] mb-4">The Artisan's Touch</h2>
              <p className={`leading-relaxed font-light ${isDark ? "text-white/60" : "text-black/60"}`}>
                Every SIDHANT piece is a testament to the skill of our master artisans. By blending generations-old techniques with contemporary aesthetics, we create garments that are not just worn, but cherished. We source the finest silks, velvets, and hand-loomed cottons to ensure an unparalleled experience of luxury.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-[family-name:var(--font-playfair)] mb-4">A Vision of Elegance</h2>
              <p className={`leading-relaxed font-light ${isDark ? "text-white/60" : "text-black/60"}`}>
                Our design philosophy is rooted in the idea that true elegance lies in the details. From the intricate zardozi embroidery to the perfect drape of a dupatta, our focus is always on creating a harmonious balance between opulence and grace.
              </p>
            </div>
          </div>
        </div>

        <div
          className="text-center py-24 px-8 rounded-3xl relative overflow-hidden transition-colors duration-300"
          style={{ backgroundColor: isDark ? "#000" : "#f3f4f6", color: isDark ? "#fff" : "#000" }}
        >
          <div className="relative z-10">
            <h2 className="text-sm tracking-[0.3em] uppercase mb-6 font-semibold" style={{ color: "#2e8b57" }}>Join The Legacy</h2>
            <p className="text-2xl md:text-4xl font-[family-name:var(--font-playfair)] max-w-3xl mx-auto leading-tight">
              Discover the art of fine dressing. <br/> Welcome to the world of SIDHANT.
            </p>
          </div>
          <div
            className="absolute inset-0 opacity-60"
            style={{ background: isDark ? "radial-gradient(ellipse at center, rgba(120, 53, 15, 0.2), #000, #000)" : "radial-gradient(ellipse at center, rgba(120, 53, 15, 0.2), #f3f4f6, #f3f4f6)" }}
          ></div>
        </div>

      </div>
    </div>
  );
}
