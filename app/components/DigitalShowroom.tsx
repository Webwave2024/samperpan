"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";

interface DigitalShowroomProps {
  mode?: "retail" | "wholesale";
}

const CATEGORIES = ["ALL", "ANARKALIS", "SUIT SETS", "KURTIS", "SHARARAS", "DUPATTAS"];

const PRODUCTS = [
  {
    id: 1,
    title: "The Ruby Flagship Set",
    category: "SUIT SETS",
    price: "₹18,999",
    image: "/42-1-scaled.webp",
    hoverImage: "/41-scaled.webp",
  },
  {
    id: 2,
    title: "Midnight Zari Kurta",
    category: "ANARKALIS",
    price: "₹14,999",
    image: "/33-1-scaled.webp",
    hoverImage: "/35-1-scaled.webp",
  },
  {
    id: 3,
    title: "Ivory Silk Ensemble",
    category: "SUIT SETS",
    price: "₹16,499",
    image: "/2026-08-07-12-53-15-1.pdf-43-scaled.webp",
    hoverImage: "/43-scaled.webp",
  },
  {
    id: 4,
    title: "Royal Emerald Kurti",
    category: "KURTIS",
    price: "₹8,499",
    image: "/39-1-scaled.webp",
    hoverImage: "/34-1-scaled.webp",
  },
  {
    id: 5,
    title: "Golden Thread Sharara",
    category: "SHARARAS",
    price: "₹9,299",
    image: "/2026-08-07-12-53-15-1.pdf-50-scaled.webp",
    hoverImage: "/37-1-scaled.webp",
  },
  {
    id: 6,
    title: "Organza Handloom Dupatta",
    category: "DUPATTAS",
    price: "₹24,999",
    image: "/40-1-scaled.webp",
    hoverImage: "/42-1-scaled.webp",
  },
  {
    id: 7,
    title: "Crimson Velvet Anarkali",
    category: "ANARKALIS",
    price: "₹21,999",
    image: "/36-1-scaled.webp",
    hoverImage: "/35-1-scaled.webp",
  },
  {
    id: 8,
    title: "Sapphire Silk Kurti",
    category: "KURTIS",
    price: "₹7,999",
    image: "/34-1-scaled.webp",
    hoverImage: "/41-scaled.webp",
  }
];

export function DigitalShowroom({ mode }: DigitalShowroomProps) {
  const [activeTab, setActiveTab] = useState(CATEGORIES[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const locale = useLocale();
  const searchParams = useSearchParams();

  // Pre-fill search from URL query param ?q=
  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      setSearchQuery(q);
      setActiveTab("ALL");
    }
  }, [searchParams]);

  const filteredProducts = (activeTab === "ALL" ? PRODUCTS : PRODUCTS.filter(p => p.category === activeTab))
    .filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="w-full min-h-screen bg-[#ffffff] text-black py-24 px-8 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 flex flex-col items-center text-center">
          <h2 className="text-sm tracking-[0.4em] uppercase text-amber-500/70 mb-4 font-light">
            {mode === "retail" ? "The Retail Collection" : mode === "wholesale" ? "Bespoke Allocations" : "Discover Elegance"}
          </h2>
          <h1 className="text-4xl md:text-6xl font-[family-name:var(--font-playfair)] mb-8">
            SHOP BY CATEGORY
          </h1>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 mt-4 border-b border-black/10 pb-4">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`text-sm tracking-[0.15em] transition-all duration-300 pb-2 relative ${
                  activeTab === category ? "text-black font-medium" : "text-black/50 hover:text-black"
                }`}
              >
                {category}
                {activeTab === category && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black"></span>
                )}
              </button>
            ))}
          </div>
        </header>

        {/* Result count */}
        {searchQuery && (
          <p className="text-center text-sm text-black/50 -mt-8 mb-10 font-[family-name:var(--font-inter)]">
            {filteredProducts.length} result{filteredProducts.length !== 1 ? "s" : ""} for &ldquo;{searchQuery}&rdquo;
          </p>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <Link href={`/${locale}/product/${product.id}`} key={product.id} className="group relative flex flex-col cursor-pointer">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-black/5 mb-6 border border-black/5 group-hover:border-black/20 transition-colors duration-500">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition-all duration-1000 group-hover:scale-105 opacity-100 group-hover:opacity-0"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  unoptimized
                />
                <Image
                  src={product.hoverImage}
                  alt={`${product.title} hover view`}
                  fill
                  className="object-cover transition-all duration-1000 scale-105 group-hover:scale-100 opacity-0 group-hover:opacity-100"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  unoptimized
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* View Details Button on Hover */}
                <div className="absolute bottom-6 left-0 right-0 px-6 flex justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
                  <span className="w-full py-3 bg-white text-black text-xs uppercase tracking-widest font-semibold text-center">
                    View Details
                  </span>
                </div>
              </div>
              <div className="flex flex-col text-center">
                <h2 className="text-lg font-[family-name:var(--font-playfair)] mb-2 group-hover:text-black/60 transition-colors">
                  {product.title}
                </h2>
                <div className="flex items-center justify-center gap-4">
                  <span className="text-sm font-light text-black/70">{product.price}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-black/20 mb-6">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <p className="text-xl font-[family-name:var(--font-playfair)] text-black/40 mb-2">No products found</p>
            <p className="text-sm text-black/30 font-[family-name:var(--font-inter)]">Try a different search term or category</p>
            <button
              onClick={() => { setSearchQuery(""); setActiveTab("ALL"); }}
              className="mt-8 px-8 py-3 border border-black/20 rounded-full text-black text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
