"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import { useCurrency } from "../context/CurrencyContext";
import { PRODUCTS, Product } from "../data/products";

interface DigitalShowroomProps {
  mode?: "retail" | "wholesale";
}

// ── WhatsApp Inquiry Modal ──────────────────────────────────────────────────────
const WHATSAPP_NUMBER = "919913679022"; // Replace with actual WhatsApp number

function WhatsAppModal({
  open,
  onClose,
  productTitle,
  type,
}: {
  open: boolean;
  onClose: () => void;
  productTitle: string;
  type: "quote" | "bulk";
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const isDark = mounted && resolvedTheme === "dark";

  useEffect(() => {
    if (!open) return;
    const defaultMsg =
      type === "quote"
        ? `Hi, I would like to request a quote for: ${productTitle}`
        : `Hi, I would like to place a bulk order for: ${productTitle}`;
    setMessage(defaultMsg);
    setName("");
    setPhone("");
  }, [open, productTitle, type]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `*Name:* ${name}\n*Phone:* ${phone}\n*Type:* ${type === "quote" ? "Request Quote" : "Bulk Order"}\n*Product:* ${productTitle}\n*Message:* ${message}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
        style={{ background: isDark ? "#111" : "#fff", border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Green accent top bar */}
        <div className="h-1 w-full" style={{ background: "linear-gradient(90deg,#b59536,#d4af37)" }} />

        {/* Header */}
        <div className="px-6 pt-6 pb-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#d4af37] font-semibold mb-1">
              {type === "quote" ? "Request Quote" : "Bulk Order"}
            </p>
            <h2 className={`text-lg font-bold truncate font-[family-name:var(--font-playfair)] ${isDark ? "text-white" : "text-black"}`}>
              {productTitle}
            </h2>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors ${isDark ? "text-white/60" : "text-black/50"}`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 pb-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className={`text-[11px] uppercase tracking-widest font-semibold ${isDark ? "text-white/60" : "text-black/50"}`}>Your Name *</label>
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rahul Sharma"
              className={`w-full px-4 py-3 rounded-xl text-sm outline-none border transition-colors ${isDark
                  ? "bg-white/5 border-white/10 text-white placeholder-white/30 focus:border-[#d4af37]"
                  : "bg-black/5 border-black/10 text-black placeholder-black/30 focus:border-[#d4af37]"
                }`}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={`text-[11px] uppercase tracking-widest font-semibold ${isDark ? "text-white/60" : "text-black/50"}`}>Phone Number *</label>
            <input
              required
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +91 98765 43210"
              className={`w-full px-4 py-3 rounded-xl text-sm outline-none border transition-colors ${isDark
                  ? "bg-white/5 border-white/10 text-white placeholder-white/30 focus:border-[#d4af37]"
                  : "bg-black/5 border-black/10 text-black placeholder-black/30 focus:border-[#d4af37]"
                }`}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={`text-[11px] uppercase tracking-widest font-semibold ${isDark ? "text-white/60" : "text-black/50"}`}>Message</label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl text-sm outline-none border transition-colors resize-none ${isDark
                  ? "bg-white/5 border-white/10 text-white placeholder-white/30 focus:border-[#d4af37]"
                  : "bg-black/5 border-black/10 text-black placeholder-black/30 focus:border-[#d4af37]"
                }`}
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full py-3.5 rounded-xl text-sm font-semibold uppercase tracking-widest text-white flex items-center justify-center gap-2.5 transition-all duration-300 hover:opacity-90 active:scale-95"
            style={{ background: "linear-gradient(135deg,#b59536,#d4af37)" }}
          >
            {/* WhatsApp icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M11.998 2.001C6.476 2.001 2 6.477 2 12c0 1.99.575 3.847 1.571 5.417L2 22l4.73-1.539A9.958 9.958 0 0 0 12 22c5.523 0 10-4.477 10-10S17.521 2 11.998 2.001zm.002 18.001a8 8 0 0 1-4.079-1.114l-.292-.173-3.027.984.854-2.954-.19-.303A7.969 7.969 0 0 1 4 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
            </svg>
            Send on WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Product catalogue imported from ../data/products ──────────────────────────

// ── Star rating renderer ───────────────────────────────────────────────────────
function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star;
        const half = !filled && rating >= star - 0.5;
        return (
          <svg
            key={star}
            viewBox="0 0 20 20"
            width="13"
            height="13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {half ? (
              <>
                <defs>
                  <linearGradient id={`half-${star}`} x1="0" x2="1" y1="0" y2="0">
                    <stop offset="50%" stopColor="#f59e0b" />
                    <stop offset="50%" stopColor="transparent" />
                  </linearGradient>
                </defs>
                <path
                  d="M10 1l2.39 4.84 5.34.78-3.86 3.76.91 5.32L10 13.27l-4.78 2.51.91-5.32L2.27 6.62l5.34-.78z"
                  fill={`url(#half-${star})`}
                  stroke="#f59e0b"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </>
            ) : (
              <path
                d="M10 1l2.39 4.84 5.34.78-3.86 3.76.91 5.32L10 13.27l-4.78 2.51.91-5.32L2.27 6.62l5.34-.78z"
                fill={filled ? "#f59e0b" : "transparent"}
                stroke="#f59e0b"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            )}
          </svg>
        );
      })}
    </span>
  );
}

// ── Single product card ────────────────────────────────────────────────────────
function ProductCard({
  product,
  locale,
  mode = "retail",
  onOpenModal,
}: {
  product: Product;
  locale: string;
  mode?: "retail" | "wholesale" | "digital";
  onOpenModal?: (productTitle: string, type: "quote" | "bulk") => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const { formatPrice } = useCurrency();
  const isDark = mounted && resolvedTheme === "dark";

  useEffect(() => { setMounted(true); }, []);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Save to localStorage
    let cart: any[] = [];
    try {
      const stored = localStorage.getItem("cart");
      if (stored) {
        const parsed = JSON.parse(stored);
        cart = Array.isArray(parsed) ? parsed : [];
      }
    } catch (_) { cart = []; }

    const existing = cart.find((i: any) => i.id === product.id && !i.size);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        size: "Free Size",
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    window.dispatchEvent(new Event("openCart"));

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1800);
  };

  if (mode === "wholesale") {
    return (
      <div className="relative flex flex-col group border rounded-2xl overflow-hidden shadow-sm transition-transform duration-300 hover:-translate-y-1" style={{ borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)", background: isDark ? "#111" : "#fff" }}>
        {/* Product Image */}
        <Link href={`/${locale}/product/${product.id}`} className="block">
          <div className="relative aspect-[4/5] w-full bg-gray-100">
            <Image src={product.image} alt={product.title} fill className="object-cover" unoptimized loading="eager" />
            <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm text-white text-[9px] uppercase tracking-wider px-2.5 py-1.5 rounded-full border border-white/20">
              MOQ: 5 pcs
            </div>
          </div>
        </Link>

        {/* Wholesale Info */}
        <div className="p-5 flex flex-col gap-4">
          <div>
            <Link href={`/${locale}/product/${product.id}`} className="block overflow-hidden" title={product.title}>
              <h2 className={`text-sm font-semibold truncate font-[family-name:var(--font-playfair)] tracking-wide hover:text-[#d4af37] transition-colors ${isDark ? "text-white" : "text-black"}`}>{product.title}</h2>
            </Link>
            <p className="text-[11px] text-gray-500 font-mono mt-1 tracking-widest">SKU: SDH-{product.id.toString().padStart(3, '0')}</p>
          </div>

          <div className="flex justify-between items-center text-xs mt-1">
            <span className="text-base font-bold tracking-tight text-[#b59536] dark:text-[#d4af37]">{formatPrice(product.priceNum)}</span>
          </div>

          <div className="flex gap-3 mt-2">
            <button
              onClick={() => onOpenModal?.(`${product.title} (${product.price})`, "quote")}
              className="flex-1 py-3 text-[10px] uppercase tracking-widest font-semibold border rounded-lg transition-colors hover:bg-black/5 dark:hover:bg-white/5"
              style={{ borderColor: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)", color: isDark ? "#fff" : "#000" }}
            >
              Request Quote
            </button>
            <button
              onClick={() => onOpenModal?.(`${product.title} (${product.price})`, "bulk")}
              className="flex-1 py-3 text-[10px] uppercase tracking-widest font-semibold rounded-lg text-white bg-[#b59536] hover:bg-[#d4af37] transition-colors shadow-lg shadow-yellow-900/20"
            >
              Bulk Order
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative flex flex-col group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Product Image ── */}
      <Link href={`/${locale}/product/${product.id}`} className="block">
        <div
          className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl mb-4 border transition-all duration-500"
          style={{
            background: isDark ? "#111" : "#f3f4f6",
            borderColor: hovered
              ? "rgba(212, 175, 55, 0.5)"
              : isDark
                ? "rgba(255, 255, 255, 0.06)"
                : "rgba(0, 0, 0, 0.08)",
            boxShadow: hovered
              ? "0 8px 32px rgba(181, 149, 54, 0.18)"
              : "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <Image
            src={product.image}
            alt={product.title}
            fill
            className={`object-cover transition-transform duration-700 ${hovered ? "scale-105" : "scale-100"
              }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            unoptimized
            loading="eager"
          />
          {/* Subtle gradient overlay on hover */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent transition-opacity duration-500 ${hovered ? "opacity-100" : "opacity-0"
              }`}
          />
          {/* Quick-view tag */}
          <div
            className={`absolute top-3 left-3 bg-[#b59536] text-white text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full transition-all duration-500 ${hovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
              }`}
          >
            Quick View
          </div>
        </div>
      </Link>

      {/* ── Product Info ── */}
      <div className="flex flex-col gap-1.5 px-1">
        {/* Name */}
        <Link href={`/${locale}/product/${product.id}`} className="block overflow-hidden" title={product.title}>
          <h2
            className={`text-sm font-semibold truncate leading-tight transition-colors duration-300 font-[family-name:var(--font-playfair)] ${hovered
                ? "text-[#d4af37]"
                : isDark
                  ? "text-white"
                  : "text-gray-900"
              }`}
          >
            {product.title}
          </h2>
        </Link>

        {/* Price */}
        <div className="flex items-center justify-between">
          <span
            className={`text-base font-bold tracking-tight ${isDark ? "text-white" : "text-gray-900"
              }`}
          >
            {formatPrice(parseInt(product.price.replace(/\D/g, "")))}
          </span>
        </div>

        {/* Rating row */}
        {/* <div className="flex items-center gap-2">
          <StarRating rating={product.rating} />
          <span
            className={`text-xs font-medium ${isDark ? "text-white/60" : "text-gray-500"
              }`}
          >
            {product.rating.toFixed(1)}
          </span>
          <span
            className={`text-[10px] ${isDark ? "text-white/40" : "text-gray-400"
              }`}
          >
            ({product.reviews})
          </span>
        </div> */}

        {/* Add to Cart button */}
        <button
          onClick={handleAddToCart}
          className="mt-2 w-full py-2.5 rounded-xl text-xs font-semibold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2"
          style={{
            background: addedToCart
              ? "#b59536"
              : hovered
                ? "#b59536"
                : isDark
                  ? "rgba(255,255,255,0.06)"
                  : "rgba(0,0,0,0.05)",
            color: addedToCart
              ? "#fff"
              : hovered
                ? "#fff"
                : isDark
                  ? "rgba(255,255,255,0.8)"
                  : "rgba(0,0,0,0.7)",
            border: addedToCart
              ? "1.5px solid #b59536"
              : hovered
                ? "1.5px solid #b59536"
                : isDark
                  ? "1.5px solid rgba(255,255,255,0.1)"
                  : "1.5px solid rgba(0,0,0,0.1)",
          }}
        >
          {addedToCart ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Added!
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export function DigitalShowroom({ mode }: DigitalShowroomProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState("");
  const [modalType, setModalType] = useState<"quote" | "bulk">("quote");

  const handleOpenModal = (productTitle: string, type: "quote" | "bulk") => {
    setModalProduct(productTitle);
    setModalType(type);
    setModalOpen(true);
  };
  const locale = useParams().lang as string;
  const searchParams = useSearchParams();
  const { resolvedTheme } = useTheme();
  // Avoid hydration mismatch: use a stable default until client mounts
  const isDark = mounted && resolvedTheme === "dark";

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) setSearchQuery(q);
  }, [searchParams]);

  // Shuffle product ordering for wholesale so both pages show different positions ("aage peeche")
  const modeProducts = mode === "wholesale"
    ? [...PRODUCTS].sort((a, b) => ((a.id * 37) % 76) - ((b.id * 37) % 76))
    : PRODUCTS;

  const filteredProducts = modeProducts.filter((p) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      p.title.toLowerCase().includes(q) ||
      p.code.toLowerCase().includes(q) ||
      p.fabric.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  });

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
          <p className="text-[10px] tracking-[0.5em] uppercase mb-5 font-light" style={{ color: "#d4af37" }}>
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} mode={mode} onOpenModal={mode === "wholesale" ? handleOpenModal : undefined} />
          ))}
        </div>

        {/* ── Empty State ── */}
        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={`mb-6 ${isDark ? "text-white" : "text-black"}`}>
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <p className="text-xl font-[family-name:var(--font-playfair)] mb-2">No products found</p>
            <p className={isDark ? "text-sm text-white/70" : "text-sm text-black/70"}>Try a different search term</p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-8 px-8 py-3 border rounded-full text-xs uppercase tracking-widest transition-all duration-300"
              style={{
                borderColor: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)",
                color: isDark ? "#fff" : "#000",
              }}
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {/* WhatsApp Inquiry Modal */}
      <WhatsAppModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        productTitle={modalProduct}
        type={modalType}
      />
    </div>
  );
}
