"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";

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
  },
  {
    id: 2,
    title: "Midnight Zari Kurta",
    category: "ANARKALIS",
    price: "₹14,999",
    image: "/33-1-scaled.webp",
  },
  {
    id: 3,
    title: "Ivory Silk Ensemble",
    category: "SUIT SETS",
    price: "₹16,499",
    image: "/2026-08-07-12-53-15-1.pdf-43-scaled.webp",
  },
  {
    id: 4,
    title: "Royal Emerald Kurti",
    category: "KURTIS",
    price: "₹8,499",
    image: "/39-1-scaled.webp",
  },
  {
    id: 5,
    title: "Golden Thread Sharara",
    category: "SHARARAS",
    price: "₹9,299",
    image: "/2026-08-07-12-53-15-1.pdf-50-scaled.webp",
  },
  {
    id: 6,
    title: "Organza Handloom Dupatta",
    category: "DUPATTAS",
    price: "₹24,999",
    image: "/40-1-scaled.webp",
  },
  {
    id: 7,
    title: "Crimson Velvet Anarkali",
    category: "ANARKALIS",
    price: "₹21,999",
    image: "/36-1-scaled.webp",
  },
  {
    id: 8,
    title: "Sapphire Silk Kurti",
    category: "KURTIS",
    price: "₹7,999",
    image: "/34-1-scaled.webp",
  }
];

export function DigitalShowroom({ mode }: DigitalShowroomProps) {
  const [activeTab, setActiveTab] = useState(CATEGORIES[0]);
  const locale = useLocale();

  const filteredProducts = activeTab === "ALL" ? PRODUCTS : PRODUCTS.filter(p => p.category === activeTab);

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
                  activeTab === category ? "text-[#c8973a] font-medium" : "text-black/60 hover:text-black"
                }`}
              >
                {category}
                {/* Active Underline indicator */}
                {activeTab === category && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#c8973a]"></span>
                )}
              </button>
            ))}
          </div>
        </header>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <Link href={`/${locale}/product/${product.id}`} key={product.id} className="group relative flex flex-col cursor-pointer">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-black/5 mb-6 border border-black/5 group-hover:border-black/20 transition-colors duration-500">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
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
      </div>
    </div>
  );
}
