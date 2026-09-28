"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useTheme } from "next-themes";

interface ProductProps {
  id: string;
}

// ─── Product Database ─────────────────────────────────────────────────────────
const PRODUCTS: Record<string, {
  name: string;
  label: string;
  price: string;
  originalPrice?: string;
  category: string;
  fabric: string;
  description: string;
  details: string[];
  sizes: string[];
  images: string[];
}> = {
  "the-regal": {
    name: "The Regal",
    label: "Ivory Chanderi Kurta Set",
    price: "₹12,500",
    originalPrice: "₹15,000",
    category: "Kurta Set",
    fabric: "Pure Chanderi Silk",
    description:
      "The Regal is an ode to quiet opulence. Woven from pure chanderi silk sourced from Madhya Pradesh, this ivory kurta set features hand-embroidered zardozi on the neckline and cuffs. Its straight silhouette drapes effortlessly, making it perfect for festive occasions, weddings, and formal events.",
    details: [
      "Pure chanderi silk — sourced from Chanderi, Madhya Pradesh",
      "Hand-embroidered zardozi neckline and cuffs",
      "Straight silhouette with side slits",
      "Comes with matching palazzo pants & dupatta",
      "Dry clean only",
      "Made in India — artisan-crafted",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: [
      "/33-1-scaled.webp",
      "/35-1-scaled.webp",
      "/36-1-scaled.webp",
      "/37-1-scaled.webp",
    ],
  },
  "the-nawab": {
    name: "The Nawab",
    label: "Deep Navy Sherwani Suit",
    price: "₹28,000",
    originalPrice: "₹34,000",
    category: "Sherwani Suit",
    fabric: "Premium Wool Blend",
    description:
      "The Nawab commands presence. Tailored from a premium wool-silk blend in a deep navy colourway, this sherwani suit features intricate thread-work on the collar and sleeves. A structured silhouette with a bandhgala collar and hand-stitched buttonholes makes this the definitive choice for wedding seasons and celebrations.",
    details: [
      "Premium wool-silk blend fabric",
      "Hand-stitched bandhgala (Nehru) collar",
      "Intricate silver thread embroidery on collar & cuffs",
      "Fully lined with breathable bemberg silk",
      "Custom trouser with side seam detailing included",
      "Two fittings included with bespoke orders",
      "Dry clean only",
      "Made in India — master tailor crafted",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "/34-1-scaled.webp",
      "/33-1-scaled.webp",
      "/41-scaled.webp",
      "/42-1-scaled.webp",
    ],
  },
  "the-rosette": {
    name: "The Rosette",
    label: "Blush Pink Anarkali Kurta",
    price: "₹9,800",
    originalPrice: "₹12,000",
    category: "Anarkali Kurta",
    fabric: "Georgette & Mulmul",
    description:
      "The Rosette is femininity in motion. Crafted from layered georgette over a mulmul inner, this blush pink Anarkali flows with every step. Delicate chikankari embroidery across the bodice and hem is done entirely by hand by artisans from Lucknow. A timeless piece that transitions seamlessly from celebrations to intimate gatherings.",
    details: [
      "Layered georgette over mulmul base",
      "Lucknowi chikankari embroidery — 100% handcrafted",
      "Flared Anarkali silhouette with full sweep",
      "Includes matching churidar & organza dupatta",
      "Pearl button closures at back neck",
      "Dry clean recommended; hand wash in cold water",
      "Made in India — Lucknow artisan collective",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "/35-1-scaled.webp",
      "/36-1-scaled.webp",
      "/37-1-scaled.webp",
      "/34-1-scaled.webp",
    ],
  },
};

const FALLBACK = {
  name: "SIDHANT Collection Piece",
  label: "Ethnic Luxury",
  price: "₹14,500",
  category: "Ethnic Wear",
  fabric: "Premium Fabric",
  description:
    "An exquisite piece crafted with precision, blending timeless heritage with modern elegance. Featuring delicate embroidery and luxurious fabric.",
  details: [
    "Hand-embroidered details",
    "Premium Silk Blend",
    "Dry clean only",
    "Made in India",
  ],
  sizes: ["XS", "S", "M", "L", "XL"],
  images: ["/35-1-scaled.webp", "/39-1-scaled.webp", "/33-1-scaled.webp", "/34-1-scaled.webp"],
};

export function ProductDetails({ id }: ProductProps) {
  const locale = useLocale();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const product = PRODUCTS[id] ?? { ...FALLBACK, name: `SIDHANT — ${id}` };
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  return (
    <div
      className="w-full min-h-screen pt-28 pb-24 transition-colors duration-300"
      style={{ backgroundColor: isDark ? "#000" : "#fff", color: isDark ? "#fff" : "#000" }}
    >
      <div className="container mx-auto px-6 max-w-7xl">

        {/* ── Breadcrumb ─────────────────────────────────────────────── */}
        <div className={`text-[10px] tracking-[0.3em] uppercase mb-10 font-[family-name:var(--font-inter)] flex items-center gap-2 ${isDark ? "text-white/70" : "text-black/70"}`}>
          <Link href={`/${locale}`} className="hover:text-[#2e8b57] transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/${locale}#collection`} className="hover:text-[#2e8b57] transition-colors">Collection</Link>
          <span>/</span>
          <span>{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* ── Image Gallery ──────────────────────────────────────────── */}
          <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative w-full aspect-[3/4] overflow-hidden" style={{ backgroundColor: isDark ? "#111" : "#f3f4f6" }}>
              <Image
                src={product.images[activeImage]}
                alt={product.name}
                fill
                className="object-cover object-center transition-opacity duration-500"
                unoptimized
              />
              {/* Category badge */}
              <span className="absolute top-5 left-5 text-[9px] tracking-[0.35em] uppercase bg-black/70 text-white px-3 py-1.5 backdrop-blur-sm">
                {product.category}
              </span>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative aspect-[3/4] overflow-hidden transition-all duration-300 ${
                    activeImage === idx
                      ? `ring-2 ring-[#2e8b57] ring-offset-1 ${isDark ? "ring-offset-black" : "ring-offset-white"}`
                      : "opacity-50 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt={`View ${idx + 1}`} fill className="object-cover" unoptimized />
                </button>
              ))}
            </div>
          </div>

          {/* ── Product Info ───────────────────────────────────────────── */}
          <div className="flex flex-col pt-2 lg:sticky lg:top-28">

            {/* Label & Name */}
            <p className={`text-[10px] tracking-[0.4em] uppercase mb-3 font-[family-name:var(--font-inter)] ${isDark ? "text-white/70" : "text-black/70"}`}>
              {product.label}
            </p>
            <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-playfair)] mb-2 leading-tight tracking-tight">
              {product.name}
            </h1>
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#2e8b57] mb-6 font-[family-name:var(--font-inter)]">
              {product.fabric}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-2xl font-[family-name:var(--font-inter)] font-semibold">
                {product.price}
              </span>
              {product.originalPrice && (
                <span className={`text-sm line-through font-[family-name:var(--font-inter)] ${isDark ? "text-white/60" : "text-black/60"}`}>
                  {product.originalPrice}
                </span>
              )}
            </div>

            {/* Divider */}
            <div className="w-full h-px mb-8" style={{ backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }} />

            {/* Description */}
            <p className={`text-sm leading-relaxed font-[family-name:var(--font-inter)] mb-10 max-w-lg ${isDark ? "text-white/70" : "text-black/70"}`}>
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-5">
                <span className={`text-[10px] tracking-[0.25em] uppercase font-semibold font-[family-name:var(--font-inter)] ${isDark ? "text-white" : "text-black"}`}>
                  Select Size {selectedSize && <span className="text-[#2e8b57] ml-2">— {selectedSize}</span>}
                </span>
                <button className={`text-[10px] tracking-wider uppercase underline underline-offset-4 transition-colors ${isDark ? "text-white/70 hover:text-white" : "text-black/70 hover:text-black"}`}>
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 border text-sm font-medium transition-all duration-200 font-[family-name:var(--font-inter)] ${
                      selectedSize === size
                        ? "border-[#2e8b57] bg-[#2e8b57] text-white"
                        : `${isDark ? "border-white/20 hover:border-white text-white" : "border-black/20 hover:border-black text-black"}`
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 mb-12">
              <button className="w-full py-4 bg-[#0d6b3e] text-white text-[11px] tracking-[0.3em] uppercase font-semibold hover:bg-[#2e8b57] transition-colors duration-300 font-[family-name:var(--font-inter)]">
                Add to Bag
              </button>
              <button className={`w-full py-4 bg-transparent text-[11px] tracking-[0.3em] uppercase font-semibold transition-colors duration-300 font-[family-name:var(--font-inter)] ${isDark ? "border border-white/30 text-white hover:bg-white/10" : "border border-black/30 text-black hover:bg-black/10"}`}>
                Buy it Now
              </button>
            </div>

            {/* Product Details Accordion */}
            <div className={`border-t ${isDark ? "border-white/10" : "border-black/10"}`}>
              <div className={`py-6 border-b ${isDark ? "border-white/10" : "border-black/10"}`}>
                <h3 className="text-[10px] tracking-[0.3em] uppercase font-semibold mb-5 font-[family-name:var(--font-inter)]">
                  Product Details
                </h3>
                <ul className="space-y-2.5">
                  {product.details.map((detail, idx) => (
                    <li key={idx} className={`flex items-start gap-3 text-sm font-[family-name:var(--font-inter)] ${isDark ? "text-white/70" : "text-black/70"}`}>
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-[#2e8b57] shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`py-5 border-b ${isDark ? "border-white/10" : "border-black/10"}`}>
                <h3 className="text-[10px] tracking-[0.3em] uppercase font-semibold font-[family-name:var(--font-inter)] flex justify-between items-center">
                  Shipping & Returns
                  <span className="text-lg font-light">+</span>
                </h3>
              </div>
              <div className={`py-5 border-b ${isDark ? "border-white/10" : "border-black/10"}`}>
                <h3 className="text-[10px] tracking-[0.3em] uppercase font-semibold font-[family-name:var(--font-inter)] flex justify-between items-center">
                  Care Instructions
                  <span className="text-lg font-light">+</span>
                </h3>
              </div>
            </div>

            {/* Back link */}
            <Link
              href={`/${locale}#collection`}
              className="mt-8 inline-flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-[#2e8b57]/80 hover:text-[#2e8b57] transition-colors font-[family-name:var(--font-inter)] group"
            >
              <span className="w-6 h-px bg-[#2e8b57]/50 group-hover:w-10 group-hover:bg-[#2e8b57] transition-all duration-500" />
              Back to Collection
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
