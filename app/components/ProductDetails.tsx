"use client";

import { useState, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import { useCurrency } from "../context/CurrencyContext";
import { PRODUCTS_MAP, getProductById } from "../data/products";

interface ProductProps {
  id: string;
}

// ─── Product Database imported from ../data/products ────────
// ─── Star rating renderer ─────────────────────────────────────────────────────
function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star;
        const half = !filled && rating >= star - 0.5;
        return (
          <svg key={star} viewBox="0 0 20 20" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
            {half ? (
              <>
                <defs><linearGradient id={`pd-h-${star}`} x1="0" x2="1" y1="0" y2="0"><stop offset="50%" stopColor="#f59e0b" /><stop offset="50%" stopColor="transparent" /></linearGradient></defs>
                <path d="M10 1l2.39 4.84 5.34.78-3.86 3.76.91 5.32L10 13.27l-4.78 2.51.91-5.32L2.27 6.62l5.34-.78z" fill={`url(#pd-h-${star})`} stroke="#f59e0b" strokeWidth="1.5" strokeLinejoin="round" />
              </>
            ) : (
              <path d="M10 1l2.39 4.84 5.34.78-3.86 3.76.91 5.32L10 13.27l-4.78 2.51.91-5.32L2.27 6.62l5.34-.78z" fill={filled ? "#f59e0b" : "transparent"} stroke="#f59e0b" strokeWidth="1.5" strokeLinejoin="round" />
            )}
          </svg>
        );
      })}
    </span>
  );
}

export function ProductDetails({ id }: ProductProps) {
  const locale = useParams().lang as string;
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [addedToBag, setAddedToBag] = useState(false);
  const { formatPrice, currency } = useCurrency();
  const product = getProductById(id) || PRODUCTS_MAP[id];
  const [activeImage, setActiveImage] = useState(product?.image || "");

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (product) setActiveImage(product.image);
  }, [product]);

  const isDark = mounted && resolvedTheme === "dark";

  if (!product) {
    return (
      <div className="w-full min-h-screen pt-28 pb-24 flex items-center justify-center" style={{ backgroundColor: isDark ? "#000" : "#fff", color: isDark ? "#fff" : "#000" }}>
        <div className="text-center">
          <p className="text-6xl mb-6">🧵</p>
          <h1 className="text-3xl font-[family-name:var(--font-playfair)] mb-4">Product Not Found</h1>
          <Link href={`/${locale}/retail`} className="text-[#d4af37] text-sm uppercase tracking-widest hover:underline">← Back to Collection</Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full min-h-screen pt-28 pb-24 transition-colors duration-300"
      style={{ backgroundColor: isDark ? "#000" : "#fff", color: isDark ? "#fff" : "#000" }}
    >
      <div className="container mx-auto px-6 max-w-6xl">

        {/* ── Breadcrumb ── */}
        <div className={`text-[10px] tracking-[0.3em] uppercase mb-10 font-[family-name:var(--font-inter)] flex items-center gap-2 ${isDark ? "text-white/50" : "text-black/50"}`}>
          <Link href={`/${locale}`} className="hover:text-[#d4af37] transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/${locale}/retail`} className="hover:text-[#d4af37] transition-colors">Retail</Link>
          <span>/</span>
          <span style={{ color: "#d4af37" }}>{product.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

          {/* ── Product Image & Gallery ── */}
          <div className="flex flex-col gap-3">
            <div
              className="relative w-full aspect-[3/4] overflow-hidden rounded-2xl"
              style={{ backgroundColor: isDark ? "#111" : "#f3f4f6" }}
            >
              <Image
                src={activeImage || product.image}
                alt={product.title}
                fill
                className="object-cover object-center transition-all duration-300"
                unoptimized
              />
              <span className="absolute top-5 left-5 text-[9px] tracking-[0.35em] uppercase bg-black/70 text-white px-3 py-1.5 backdrop-blur-sm rounded-full">
                {product.category}
              </span>
            </div>

            {/* Thumbnail selector if multiple images */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-20 aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all ${
                      (activeImage || product.image) === img ? "border-[#d4af37] scale-105" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt={`Angle ${i + 1}`} fill className="object-cover" unoptimized />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Product Info ── */}
          <div className="flex flex-col pt-2 lg:sticky lg:top-28">

            <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-playfair)] mb-2 leading-tight tracking-tight">
              {product.title}
            </h1>
            <p className="text-[11px] tracking-[0.3em] uppercase mb-4 font-[family-name:var(--font-inter)]" style={{ color: "#d4af37" }}>
              {product.fabric}
            </p>

            {/* Price */}
            <div className="flex flex-col gap-2 mb-8">
              <div className="flex items-baseline justify-between flex-wrap gap-3">
                <span className="text-3xl font-[family-name:var(--font-inter)] font-bold">
                  {formatPrice(parseInt(product.price.replace(/\D/g, "")))}
                </span>
              </div>
              {currency !== "INR" && (
                <span className={`text-xs ${isDark ? "text-white/40" : "text-black/40"}`}>
                  {product.price} (original INR)
                </span>
              )}
            </div>

            <div className="w-full h-px mb-8" style={{ backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }} />

            {/* Description */}
            <p className={`text-sm leading-relaxed font-[family-name:var(--font-inter)] mb-8 ${isDark ? "text-white/70" : "text-black/70"}`}>
              {product.description}
            </p>

            {/* CTA */}
            <div className="flex flex-col gap-3 mb-10">
              <button
                onClick={() => {
                  let cart: any[] = [];
                  try {
                    const stored = localStorage.getItem('cart');
                    if (stored) {
                      const parsed = JSON.parse(stored);
                      cart = Array.isArray(parsed) ? parsed : [];
                    }
                  } catch (e) {
                    cart = [];
                  }
                  const item = {
                    id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                    quantity: 1
                  };
                  
                  const existing = cart.find((i: any) => i.id === id);
                  if (existing) {
                    existing.quantity += 1;
                  } else {
                    cart.push(item);
                  }
                  
                  localStorage.setItem('cart', JSON.stringify(cart));
                  window.dispatchEvent(new Event('cartUpdated'));
                  window.dispatchEvent(new Event('openCart'));
                  
                  setAddedToBag(true);
                  setTimeout(() => setAddedToBag(false), 2000);
                }}
                className="w-full py-4 text-[11px] tracking-[0.3em] uppercase font-semibold transition-all duration-300 font-[family-name:var(--font-inter)] rounded-xl flex items-center justify-center gap-2"
                style={{ background: addedToBag ? "#d4af37" : "#b59536", color: "#fff" }}
              >
                {addedToBag ? (
                  <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg> Added to Bag!</>
                ) : "Add to Bag"}
              </button>
              <button
                onClick={() => {
                  // Add to cart first
                  let cart: any[] = [];
                  try {
                    const stored = localStorage.getItem('cart');
                    if (stored) {
                      const parsed = JSON.parse(stored);
                      cart = Array.isArray(parsed) ? parsed : [];
                    }
                  } catch (_) { cart = []; }

                  const existing = cart.find((i: any) => i.id === id);
                  if (existing) {
                    existing.quantity += 1;
                  } else {
                    cart.push({ id, title: product.title, price: product.price, image: product.image, quantity: 1 });
                  }
                  localStorage.setItem('cart', JSON.stringify(cart));
                  window.dispatchEvent(new Event('cartUpdated'));

                  // Navigate to checkout
                  window.location.href = `/${locale}/checkout`;
                }}
                className={`w-full py-4 bg-transparent text-[11px] tracking-[0.3em] uppercase font-semibold transition-colors duration-300 font-[family-name:var(--font-inter)] rounded-xl ${isDark ? "border border-white/30 text-white hover:bg-white/10" : "border border-black/30 text-black hover:bg-black/5"}`}
              >
                Buy it Now
              </button>
            </div>

            {/* Product Details */}
            <div className={`border-t pt-6 ${isDark ? "border-white/10" : "border-black/10"}`}>
              <h3 className="text-[10px] tracking-[0.3em] uppercase font-semibold mb-4 font-[family-name:var(--font-inter)]">Product Details</h3>
              <ul className="space-y-2.5">
                {product.details.map((detail, idx) => (
                  <li key={idx} className={`flex items-start gap-3 text-sm font-[family-name:var(--font-inter)] ${isDark ? "text-white/70" : "text-black/70"}`}>
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#d4af37] shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href={`/${locale}/retail`}
              className="mt-10 inline-flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-[#d4af37]/80 hover:text-[#d4af37] transition-colors font-[family-name:var(--font-inter)] group"
            >
              <span className="w-6 h-px bg-[#d4af37]/50 group-hover:w-10 group-hover:bg-[#d4af37] transition-all duration-500" />
              Back to Collection
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
