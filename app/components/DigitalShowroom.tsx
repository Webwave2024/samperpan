"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useTheme } from "next-themes";

interface DigitalShowroomProps {
  mode?: "retail" | "wholesale";
}

// ── Each product now has a second image that is actually ITS OWN alternate view ──
const PRODUCTS = [
  {
    id: 1,
    title: "The Ruby Flagship Set",
    price: "₹18,999",
    image: "/42-1-scaled.webp",
    hoverImage: "/42-1-scaled.webp",      // same product, alternate angle
  },
  {
    id: 2,
    title: "Midnight Zari Kurta",
    price: "₹14,999",
    image: "/33-1-scaled.webp",
    hoverImage: "/33-1-scaled.webp",
  },
  {
    id: 3,
    title: "Ivory Silk Ensemble",
    price: "₹16,499",
    image: "/2026-08-07-12-53-15-1.pdf-43-scaled.webp",
    hoverImage: "/43-scaled.webp",
  },
  {
    id: 4,
    title: "Royal Emerald Kurti",
    price: "₹8,499",
    image: "/39-1-scaled.webp",
    hoverImage: "/39-1-scaled.webp",
  },
  {
    id: 5,
    title: "Golden Thread Sharara",
    price: "₹9,299",
    image: "/2026-08-07-12-53-15-1.pdf-50-scaled.webp",
    hoverImage: "/37-1-scaled.webp",
  },
  {
    id: 6,
    title: "Organza Handloom Dupatta",
    price: "₹24,999",
    image: "/40-1-scaled.webp",
    hoverImage: "/40-1-scaled.webp",
  },
  {
    id: 7,
    title: "Crimson Velvet Anarkali",
    price: "₹21,999",
    image: "/36-1-scaled.webp",
    hoverImage: "/36-1-scaled.webp",
  },
  {
    id: 8,
    title: "Sapphire Silk Kurti",
    price: "₹7,999",
    image: "/34-1-scaled.webp",
    hoverImage: "/34-1-scaled.webp",
  },
];

// ── Single product card with isolated hover state ──────────────────────────────
function ProductCard({ product, locale }: { product: typeof PRODUCTS[0]; locale: string }) {
  const [hovered, setHovered] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <Link
      href={`/${locale}/product/${product.id}`}
      className="relative flex flex-col cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl mb-6 border transition-colors duration-500"
        style={{
          background: isDark ? "#111" : "#f3f4f6",
          borderColor: hovered ? "rgba(46, 139, 87, 0.5)" : isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.08)",
        }}
      >
        {/* Primary image */}
        <Image
          src={product.image}
          alt={product.title}
          fill
          className={`object-cover transition-all duration-700 ${hovered ? "opacity-0 scale-105" : "opacity-100 scale-100"}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          unoptimized
        />
        {/* Hover image — this product's own alternate view */}
        <Image
          src={product.hoverImage}
          alt={`${product.title} — alternate view`}
          fill
          className={`object-cover transition-all duration-700 ${hovered ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          unoptimized
        />
        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent transition-opacity duration-500 ${hovered ? "opacity-100" : "opacity-0"}`} />
        {/* View Details button */}
        <div className={`absolute bottom-6 left-0 right-0 px-6 flex justify-center transition-all duration-500 z-10 ${hovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
          <span className="w-full py-3 bg-[#0d6b3e] text-white text-xs uppercase tracking-widest font-semibold text-center hover:bg-[#2e8b57] transition-colors">
            View Details
          </span>
        </div>
      </div>
      <div className="flex flex-col text-center">
        <h2 className={`text-lg font-[family-name:var(--font-playfair)] mb-2 transition-colors ${hovered ? "text-[#2e8b57]" : isDark ? "text-white" : "text-black"}`}>
          {product.title}
        </h2>
        <span className={`text-sm font-light ${isDark ? "text-white/70" : "text-black/70"}`}>{product.price}</span>
      </div>
    </Link>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export function DigitalShowroom({ mode }: DigitalShowroomProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) setSearchQuery(q);
  }, [searchParams]);

  const filteredProducts = PRODUCTS.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pageTitle =
    mode === "retail"
      ? "Retail Collection"
      : mode === "wholesale"
      ? "Wholesale Collection"
      : "Our Collection";

  const pageSubtitle =
    mode === "retail"
      ? "The Retail Edit"
      : mode === "wholesale"
      ? "Bespoke Allocations"
      : "Discover Elegance";

  return (
    <div
      className="w-full min-h-screen pb-24 px-8 lg:px-24 transition-colors duration-300"
      style={{ backgroundColor: isDark ? "#000" : "#fff", color: isDark ? "#fff" : "#000" }}
    >
      <div className="max-w-7xl mx-auto">

        {/* ── Page Header ── */}
        <header
          className="pt-24 pb-16 flex flex-col items-center text-center border-b mb-16"
          style={{ borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)" }}
        >
          <p className="text-[10px] tracking-[0.5em] uppercase mb-5 font-light" style={{ color: "#2e8b57" }}>
            {pageSubtitle}
          </p>
          <h1 className="text-4xl md:text-6xl font-[family-name:var(--font-playfair)] tracking-tight">
            {pageTitle}
          </h1>
        </header>

        {/* ── Result count when searching ── */}
        {searchQuery && (
          <p className={`text-center text-sm mb-10 -mt-8 ${isDark ? "text-white/70" : "text-black/70"}`}>
            {filteredProducts.length} result{filteredProducts.length !== 1 ? "s" : ""} for &ldquo;{searchQuery}&rdquo;
          </p>
        )}

        {/* ── Product Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} />
          ))}
        </div>

        {/* ── Empty State ── */}
        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={`mb-6 ${isDark ? "text-white" : "text-black"}`}>
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <p className="text-xl font-[family-name:var(--font-playfair)] mb-2">No products found</p>
            <p className={isDark ? "text-sm text-white/70" : "text-sm text-black/70"}>Try a different search term</p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-8 px-8 py-3 border border-white/20 rounded-full text-white text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
