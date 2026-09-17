"use client";

import Image from "next/image";

export function AboutUs() {
  return (
    <div className="w-full min-h-screen bg-[#ffffff] pt-32 pb-24 text-black font-[family-name:var(--font-inter)]">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-[family-name:var(--font-playfair)] mb-6">Our Story</h1>
          <p className="text-black/70 max-w-2xl mx-auto tracking-wide text-lg font-light leading-relaxed">
            A legacy of craftsmanship. We weave tales of tradition into every silhouette, redefining modern ethnic wear.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
          <div className="relative aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden shadow-2xl">
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
              <p className="text-black/70 leading-relaxed font-light">
                Every SIDHANT piece is a testament to the skill of our master artisans. By blending generations-old techniques with contemporary aesthetics, we create garments that are not just worn, but cherished. We source the finest silks, velvets, and hand-loomed cottons to ensure an unparalleled experience of luxury.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-[family-name:var(--font-playfair)] mb-4">A Vision of Elegance</h2>
              <p className="text-black/70 leading-relaxed font-light">
                Our design philosophy is rooted in the idea that true elegance lies in the details. From the intricate zardozi embroidery to the perfect drape of a dupatta, our focus is always on creating a harmonious balance between opulence and grace.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center bg-black text-white py-24 px-8 rounded-3xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-sm tracking-[0.3em] uppercase text-amber-500 mb-6 font-semibold">Join The Legacy</h2>
            <p className="text-2xl md:text-4xl font-[family-name:var(--font-playfair)] max-w-3xl mx-auto leading-tight">
              Discover the art of fine dressing. <br/> Welcome to the world of SIDHANT.
            </p>
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-black to-black opacity-60"></div>
        </div>

      </div>
    </div>
  );
}
