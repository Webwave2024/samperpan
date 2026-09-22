"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";

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
  const product = PRODUCTS[id] ?? { ...FALLBACK, name: `SIDHANT — ${id}` };
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  return (
    <div className="w-full min-h-screen bg-[#faf9f7] pt-28 pb-24 text-black">
      <div className="container mx-auto px-6 max-w-7xl">

        {/* ── Breadcrumb ─────────────────────────────────────────────── */}
        <div className="text-[10px] tracking-[0.3em] uppercase text-black/40 mb-10 font-[family-name:var(--font-inter)] flex items-center gap-2">
          <Link href={`/${locale}`} className="hover:text-black transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/${locale}#collection`} className="hover:text-black transition-colors">Collection</Link>
          <span>/</span>
          <span className="text-black/70">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* ── Image Gallery ──────────────────────────────────────────── */}
          <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative w-full aspect-[3/4] bg-[#f0ece4] overflow-hidden">
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
                      ? "ring-2 ring-black ring-offset-1"
                      : "opacity-55 hover:opacity-90"
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
            <p className="text-[10px] tracking-[0.4em] uppercase text-black/40 mb-3 font-[family-name:var(--font-inter)]">
              {product.label}
            </p>
            <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-playfair)] mb-2 leading-tight tracking-tight">
              {product.name}
            </h1>
            <p className="text-[11px] tracking-[0.3em] uppercase text-black/40 mb-6 font-[family-name:var(--font-inter)]">
              {product.fabric}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-2xl font-[family-name:var(--font-inter)] font-semibold text-black">
                {product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-black/35 line-through font-[family-name:var(--font-inter)]">
                  {product.originalPrice}
                </span>
              )}
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-black/8 mb-8" />

            {/* Description */}
            <p className="text-sm text-black/65 leading-relaxed font-[family-name:var(--font-inter)] mb-10 max-w-lg">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-5">
                <span className="text-[10px] tracking-[0.25em] uppercase font-semibold font-[family-name:var(--font-inter)]">
                  Select Size {selectedSize && <span className="text-black/50 ml-2">— {selectedSize}</span>}
                </span>
                <button className="text-[10px] text-black/40 hover:text-black transition-colors tracking-wider uppercase underline underline-offset-4">
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
                        ? "border-black bg-black text-white"
                        : "border-black/20 hover:border-black text-black/70 hover:text-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 mb-12">
              <button className="w-full py-4 bg-black text-white text-[11px] tracking-[0.3em] uppercase font-semibold hover:bg-black/80 transition-colors duration-300 font-[family-name:var(--font-inter)]">
                Add to Bag
              </button>
              <button className="w-full py-4 bg-transparent border border-black text-black text-[11px] tracking-[0.3em] uppercase font-semibold hover:bg-black/5 transition-colors duration-300 font-[family-name:var(--font-inter)]">
                Buy it Now
              </button>
            </div>

            {/* Product Details Accordion */}
            <div className="border-t border-black/10">
              <div className="py-6 border-b border-black/10">
                <h3 className="text-[10px] tracking-[0.3em] uppercase font-semibold mb-5 font-[family-name:var(--font-inter)]">
                  Product Details
                </h3>
                <ul className="space-y-2.5">
                  {product.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-black/60 font-[family-name:var(--font-inter)]">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-black/30 shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="py-5 border-b border-black/10">
                <h3 className="text-[10px] tracking-[0.3em] uppercase font-semibold font-[family-name:var(--font-inter)] flex justify-between items-center">
                  Shipping & Returns
                  <span className="text-lg font-light">+</span>
                </h3>
              </div>
              <div className="py-5 border-b border-black/10">
                <h3 className="text-[10px] tracking-[0.3em] uppercase font-semibold font-[family-name:var(--font-inter)] flex justify-between items-center">
                  Care Instructions
                  <span className="text-lg font-light">+</span>
                </h3>
              </div>
            </div>

            {/* Back link */}
            <Link
              href={`/${locale}#collection`}
              className="mt-8 inline-flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-black/40 hover:text-black transition-colors font-[family-name:var(--font-inter)] group"
            >
              <span className="w-6 h-px bg-black/30 group-hover:w-10 group-hover:bg-black transition-all duration-500" />
              Back to Collection
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
