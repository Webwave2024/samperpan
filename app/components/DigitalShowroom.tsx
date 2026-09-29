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

// ── WhatsApp Inquiry Modal ──────────────────────────────────────────────────────
const WHATSAPP_NUMBER = "919588922752"; // Replace with actual WhatsApp number

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
        <div className="h-1 w-full" style={{ background: "linear-gradient(90deg,#0d6b3e,#2e8b57)" }} />

        {/* Header */}
        <div className="px-6 pt-6 pb-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#2e8b57] font-semibold mb-1">
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
                  ? "bg-white/5 border-white/10 text-white placeholder-white/30 focus:border-[#2e8b57]"
                  : "bg-black/5 border-black/10 text-black placeholder-black/30 focus:border-[#2e8b57]"
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
                  ? "bg-white/5 border-white/10 text-white placeholder-white/30 focus:border-[#2e8b57]"
                  : "bg-black/5 border-black/10 text-black placeholder-black/30 focus:border-[#2e8b57]"
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
                  ? "bg-white/5 border-white/10 text-white placeholder-white/30 focus:border-[#2e8b57]"
                  : "bg-black/5 border-black/10 text-black placeholder-black/30 focus:border-[#2e8b57]"
                }`}
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full py-3.5 rounded-xl text-sm font-semibold uppercase tracking-widest text-white flex items-center justify-center gap-2.5 transition-all duration-300 hover:opacity-90 active:scale-95"
            style={{ background: "linear-gradient(135deg,#0d6b3e,#2e8b57)" }}
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

// ── Product catalogue — all 99 unique images from public/products/ ────────────
const PRODUCTS = [
  { id: 1, title: "The Ruby Flagship Set", price: "₹18,999", rating: 4.5, reviews: 128, image: "/products/WhatsApp Image 2026-09-28 at 9.06.37 PM.jpeg" },
  { id: 2, title: "Midnight Zari Kurta", price: "₹14,999", rating: 4.2, reviews: 94, image: "/products/WhatsApp Image 2026-09-28 at 9.06.37 PM (1).jpeg" },
  { id: 3, title: "Ivory Silk Ensemble", price: "₹16,499", rating: 4.7, reviews: 211, image: "/products/WhatsApp Image 2026-09-28 at 9.06.37 PM (2).jpeg" },
  { id: 4, title: "Royal Emerald Kurti", price: "₹8,499", rating: 4.3, reviews: 76, image: "/products/WhatsApp Image 2026-09-28 at 9.06.37 PM (3).jpeg" },
  { id: 5, title: "Golden Thread Sharara", price: "₹9,299", rating: 4.6, reviews: 153, image: "/products/WhatsApp Image 2026-09-28 at 9.06.38 PM.jpeg" },
  { id: 6, title: "Organza Handloom Dupatta", price: "₹24,999", rating: 4.8, reviews: 307, image: "/products/WhatsApp Image 2026-09-28 at 9.06.38 PM (1).jpeg" },
  { id: 7, title: "Crimson Velvet Anarkali", price: "₹21,999", rating: 4.1, reviews: 88, image: "/products/WhatsApp Image 2026-09-28 at 9.06.38 PM (2).jpeg" },
  { id: 8, title: "Sapphire Silk Kurti", price: "₹7,999", rating: 4.4, reviews: 142, image: "/products/WhatsApp Image 2026-09-28 at 9.06.39 PM.jpeg" },
  { id: 9, title: "Blush Pink Anarkali", price: "₹12,499", rating: 4.6, reviews: 179, image: "/products/WhatsApp Image 2026-09-28 at 9.06.39 PM (1).jpeg" },
  { id: 10, title: "Deep Navy Sherwani", price: "₹19,999", rating: 4.9, reviews: 264, image: "/products/WhatsApp Image 2026-09-28 at 9.06.40 PM.jpeg" },
  { id: 11, title: "Mustard Chanderi Suit", price: "₹11,499", rating: 4.3, reviews: 97, image: "/products/WhatsApp Image 2026-09-28 at 9.06.40 PM (1).jpeg" },
  { id: 12, title: "Teal Banarasi Lehenga", price: "₹32,999", rating: 4.7, reviews: 193, image: "/products/WhatsApp Image 2026-09-28 at 9.06.40 PM (2).jpeg" },
  { id: 13, title: "Coral Georgette Kurta", price: "₹6,999", rating: 4.2, reviews: 61, image: "/products/WhatsApp Image 2026-09-28 at 9.06.40 PM (3).jpeg" },
  { id: 14, title: "Jade Silk Sherwani", price: "₹22,999", rating: 4.5, reviews: 118, image: "/products/WhatsApp Image 2026-09-28 at 9.06.41 PM.jpeg" },
  { id: 15, title: "Lavender Chikankari Set", price: "₹13,499", rating: 4.6, reviews: 204, image: "/products/WhatsApp Image 2026-09-28 at 9.06.41 PM (1).jpeg" },
  { id: 16, title: "Maroon Brocade Jacket", price: "₹17,999", rating: 4.3, reviews: 89, image: "/products/WhatsApp Image 2026-09-28 at 9.06.41 PM (2).jpeg" },
  { id: 17, title: "Peach Embroidered Lehenga", price: "₹28,999", rating: 4.8, reviews: 312, image: "/products/WhatsApp Image 2026-09-28 at 9.06.42 PM.jpeg" },
  { id: 18, title: "Forest Green Kurta Pajama", price: "₹10,499", rating: 4.4, reviews: 137, image: "/products/WhatsApp Image 2026-09-28 at 9.06.42 PM (1).jpeg" },
  { id: 19, title: "Wine Velvet Anarkali", price: "₹23,499", rating: 4.7, reviews: 186, image: "/products/WhatsApp Image 2026-09-28 at 9.06.43 PM.jpeg" },
  { id: 20, title: "Butter Yellow Salwar Suit", price: "₹8,999", rating: 4.1, reviews: 72, image: "/products/WhatsApp Image 2026-09-28 at 9.06.43 PM (1).jpeg" },
  { id: 21, title: "Steel Blue Bandhgala", price: "₹15,999", rating: 4.5, reviews: 145, image: "/products/WhatsApp Image 2026-09-28 at 9.06.43 PM (2).jpeg" },
  { id: 22, title: "Rose Gold Sharara Set", price: "₹19,499", rating: 4.6, reviews: 231, image: "/products/WhatsApp Image 2026-09-28 at 9.06.43 PM (3).jpeg" },
  { id: 23, title: "Indigo Block Print Kurta", price: "₹7,499", rating: 4.3, reviews: 108, image: "/products/WhatsApp Image 2026-09-28 at 9.06.44 PM.jpeg" },
  { id: 24, title: "Champagne Silk Dupatta", price: "₹5,999", rating: 4.4, reviews: 83, image: "/products/WhatsApp Image 2026-09-28 at 9.06.44 PM (1).jpeg" },
  { id: 25, title: "Olive Khadi Jacket Kurta", price: "₹12,999", rating: 4.2, reviews: 67, image: "/products/WhatsApp Image 2026-09-28 at 9.06.44 PM (2).jpeg" },
  { id: 26, title: "Fuchsia Lehenga Choli", price: "₹26,499", rating: 4.9, reviews: 278, image: "/products/WhatsApp Image 2026-09-28 at 9.06.45 PM.jpeg" },
  { id: 27, title: "Turquoise Zardosi Kurta", price: "₹16,999", rating: 4.5, reviews: 159, image: "/products/WhatsApp Image 2026-09-28 at 9.06.45 PM (1).jpeg" },
  { id: 28, title: "Rust Angrakha Suit", price: "₹11,999", rating: 4.3, reviews: 91, image: "/products/WhatsApp Image 2026-09-28 at 9.06.45 PM (2).jpeg" },
  { id: 29, title: "Pearl White Sherwani", price: "₹29,999", rating: 4.8, reviews: 322, image: "/products/WhatsApp Image 2026-09-28 at 9.06.46 PM.jpeg" },
  { id: 30, title: "Mauve Crepe Anarkali", price: "₹13,999", rating: 4.4, reviews: 126, image: "/products/WhatsApp Image 2026-09-28 at 9.06.46 PM (1).jpeg" },
  { id: 31, title: "Cobalt Kota Doria Kurta", price: "₹9,499", rating: 4.2, reviews: 79, image: "/products/WhatsApp Image 2026-09-28 at 9.06.46 PM (2).jpeg" },
  { id: 32, title: "Mint Chanderi Saree", price: "₹18,499", rating: 4.6, reviews: 198, image: "/products/WhatsApp Image 2026-09-28 at 9.06.46 PM (3).jpeg" },
  { id: 33, title: "Bronze Embroidered Sherwani", price: "₹27,999", rating: 4.7, reviews: 241, image: "/products/WhatsApp Image 2026-09-28 at 9.06.47 PM.jpeg" },
  { id: 34, title: "Dusty Rose Kurti", price: "₹6,499", rating: 4.3, reviews: 84, image: "/products/WhatsApp Image 2026-09-28 at 9.06.47 PM (1).jpeg" },
  { id: 35, title: "Tangerine Patola Suit", price: "₹20,999", rating: 4.5, reviews: 167, image: "/products/WhatsApp Image 2026-09-28 at 9.06.47 PM (2).jpeg" },
  { id: 36, title: "Slate Grey Bandhgala Set", price: "₹24,499", rating: 4.4, reviews: 113, image: "/products/WhatsApp Image 2026-09-28 at 9.06.48 PM.jpeg" },
  { id: 37, title: "Lilac Net Lehenga", price: "₹31,999", rating: 4.8, reviews: 289, image: "/products/WhatsApp Image 2026-09-28 at 9.06.48 PM (1).jpeg" },
  { id: 38, title: "Saffron Mirror Work Kurta", price: "₹10,999", rating: 4.6, reviews: 172, image: "/products/WhatsApp Image 2026-09-28 at 9.06.48 PM (2).jpeg" },
  { id: 39, title: "Black Zari Sherwani", price: "₹34,999", rating: 4.9, reviews: 341, image: "/products/WhatsApp Image 2026-09-28 at 9.06.49 PM.jpeg" },
  { id: 40, title: "Peacock Blue Suit", price: "₹14,499", rating: 4.5, reviews: 148, image: "/products/WhatsApp Image 2026-09-28 at 9.06.49 PM (1).jpeg" },
  { id: 41, title: "Cream Banarasi Dupatta", price: "₹7,999", rating: 4.2, reviews: 59, image: "/products/WhatsApp Image 2026-09-28 at 9.06.49 PM (2).jpeg" },
  { id: 42, title: "Magenta Silk Lehenga", price: "₹29,499", rating: 4.7, reviews: 217, image: "/products/WhatsApp Image 2026-09-28 at 9.06.49 PM (3).jpeg" },
  { id: 43, title: "Amber Linen Kurta", price: "₹8,999", rating: 4.3, reviews: 95, image: "/products/WhatsApp Image 2026-09-28 at 9.06.50 PM.jpeg" },
  { id: 44, title: "Aqua Chikankari Kurti", price: "₹9,999", rating: 4.4, reviews: 132, image: "/products/WhatsApp Image 2026-09-28 at 9.06.50 PM (1).jpeg" },
  { id: 45, title: "Beige Embroidered Sherwani", price: "₹23,999", rating: 4.6, reviews: 188, image: "/products/WhatsApp Image 2026-09-28 at 9.06.50 PM (2).jpeg" },
  { id: 46, title: "Burgundy Velvet Lehenga", price: "₹36,999", rating: 4.8, reviews: 334, image: "/products/WhatsApp Image 2026-09-28 at 9.06.51 PM.jpeg" },
  { id: 47, title: "Sea Green Georgette Suit", price: "₹11,999", rating: 4.3, reviews: 101, image: "/products/WhatsApp Image 2026-09-28 at 9.06.51 PM (1).jpeg" },
  { id: 48, title: "Gold Tissue Sharara", price: "₹22,499", rating: 4.7, reviews: 209, image: "/products/WhatsApp Image 2026-09-28 at 9.06.51 PM (2).jpeg" },
  { id: 49, title: "Charcoal Nehru Jacket", price: "₹12,999", rating: 4.4, reviews: 116, image: "/products/WhatsApp Image 2026-09-28 at 9.06.52 PM.jpeg" },
  { id: 50, title: "Pistachio Kalamkari Kurta", price: "₹10,499", rating: 4.2, reviews: 74, image: "/products/WhatsApp Image 2026-09-28 at 9.06.52 PM (1).jpeg" },
  { id: 51, title: "Crimson Bridal Lehenga", price: "₹44,999", rating: 4.9, reviews: 398, image: "/products/WhatsApp Image 2026-09-28 at 9.06.52 PM (2).jpeg" },
  { id: 52, title: "Sky Blue Lucknowi Kurta", price: "₹13,499", rating: 4.5, reviews: 162, image: "/products/WhatsApp Image 2026-09-28 at 9.06.53 PM.jpeg" },
  { id: 53, title: "Dark Teal Bandhgala", price: "₹18,999", rating: 4.6, reviews: 201, image: "/products/WhatsApp Image 2026-09-28 at 9.06.53 PM (1).jpeg" },
  { id: 54, title: "Flamingo Pink Anarkali", price: "₹17,499", rating: 4.4, reviews: 138, image: "/products/WhatsApp Image 2026-09-28 at 9.06.53 PM (2).jpeg" },
  { id: 55, title: "Mocha Linen Suit Set", price: "₹15,999", rating: 4.3, reviews: 93, image: "/products/WhatsApp Image 2026-09-28 at 9.06.54 PM.jpeg" },
  { id: 56, title: "Emerald Zari Kurta Pajama", price: "₹20,499", rating: 4.7, reviews: 224, image: "/products/WhatsApp Image 2026-09-28 at 9.06.54 PM (1).jpeg" },
  { id: 57, title: "Silver Tissue Lehenga", price: "₹38,999", rating: 4.8, reviews: 287, image: "/products/WhatsApp Image 2026-09-28 at 9.06.54 PM (2).jpeg" },
  { id: 58, title: "Copper Brocade Jacket", price: "₹16,499", rating: 4.5, reviews: 144, image: "/products/WhatsApp Image 2026-09-28 at 9.06.55 PM.jpeg" },
  { id: 59, title: "Plum Silk Saree", price: "₹21,999", rating: 4.6, reviews: 176, image: "/products/WhatsApp Image 2026-09-28 at 9.06.55 PM (1).jpeg" },
  { id: 60, title: "Neon Lime Sharara", price: "₹9,999", rating: 4.1, reviews: 65, image: "/products/WhatsApp Image 2026-09-28 at 9.06.56 PM.jpeg" },
  { id: 61, title: "Nude Georgette Anarkali", price: "₹14,999", rating: 4.5, reviews: 157, image: "/products/WhatsApp Image 2026-09-28 at 9.06.56 PM (1).jpeg" },
  { id: 62, title: "Khaki Handloom Kurta", price: "₹8,499", rating: 4.3, reviews: 87, image: "/products/WhatsApp Image 2026-09-28 at 9.06.56 PM (2).jpeg" },
  { id: 63, title: "Cobalt Sherwani Set", price: "₹25,999", rating: 4.7, reviews: 232, image: "/products/WhatsApp Image 2026-09-28 at 9.06.57 PM.jpeg" },
  { id: 64, title: "Blush Embroidered Kurti", price: "₹7,499", rating: 4.4, reviews: 109, image: "/products/WhatsApp Image 2026-09-28 at 9.06.57 PM (1).jpeg" },
  { id: 65, title: "Taupe Kota Silk Suit", price: "₹13,999", rating: 4.2, reviews: 78, image: "/products/WhatsApp Image 2026-09-28 at 9.06.58 PM.jpeg" },
  { id: 66, title: "Violet Net Lehenga", price: "₹33,999", rating: 4.8, reviews: 301, image: "/products/WhatsApp Image 2026-09-28 at 9.06.58 PM (1).jpeg" },
  { id: 67, title: "Orange Patola Kurta", price: "₹11,499", rating: 4.5, reviews: 143, image: "/products/WhatsApp Image 2026-09-28 at 9.06.58 PM (2).jpeg" },
  { id: 68, title: "Pink Embroidered Sherwani", price: "₹28,999", rating: 4.6, reviews: 197, image: "/products/WhatsApp Image 2026-09-28 at 9.06.59 PM.jpeg" },
  { id: 69, title: "Grey Block Print Kurta Set", price: "₹10,999", rating: 4.3, reviews: 96, image: "/products/WhatsApp Image 2026-09-28 at 9.06.59 PM (1).jpeg" },
  { id: 70, title: "Cerise Banarasi Lehenga", price: "₹39,999", rating: 4.9, reviews: 356, image: "/products/WhatsApp Image 2026-09-28 at 9.06.59 PM (2).jpeg" },
  { id: 71, title: "Denim Blue Kurta Pajama", price: "₹12,499", rating: 4.4, reviews: 121, image: "/products/WhatsApp Image 2026-09-28 at 9.07.00 PM.jpeg" },
  { id: 72, title: "Poppy Red Anarkali Suit", price: "₹15,499", rating: 4.5, reviews: 155, image: "/products/WhatsApp Image 2026-09-28 at 9.07.00 PM (1).jpeg" },
  { id: 73, title: "Forest Zari Sherwani", price: "₹31,999", rating: 4.7, reviews: 218, image: "/products/WhatsApp Image 2026-09-28 at 9.07.01 PM.jpeg" },
  { id: 74, title: "Honey Chikankari Kurta", price: "₹9,499", rating: 4.3, reviews: 86, image: "/products/WhatsApp Image 2026-09-28 at 9.07.01 PM (1).jpeg" },
  { id: 75, title: "Lilac Embroidered Lehenga", price: "₹27,999", rating: 4.6, reviews: 241, image: "/products/WhatsApp Image 2026-09-28 at 9.07.01 PM (2).jpeg" },
  { id: 76, title: "Ivory Bandhgala Jacket", price: "₹19,499", rating: 4.4, reviews: 134, image: "/products/WhatsApp Image 2026-09-28 at 9.07.02 PM.jpeg" },
  { id: 77, title: "Teal Mirror Work Kurti", price: "₹8,999", rating: 4.2, reviews: 69, image: "/products/WhatsApp Image 2026-09-28 at 9.07.02 PM (1).jpeg" },
  { id: 78, title: "Brick Red Silk Suit", price: "₹17,999", rating: 4.7, reviews: 203, image: "/products/WhatsApp Image 2026-09-28 at 9.07.02 PM (2).jpeg" },
  { id: 79, title: "Aqua Embroidered Sharara", price: "₹21,499", rating: 4.5, reviews: 168, image: "/products/WhatsApp Image 2026-09-28 at 9.07.03 PM.jpeg" },
  { id: 80, title: "Caramel Linen Sherwani", price: "₹26,999", rating: 4.6, reviews: 189, image: "/products/WhatsApp Image 2026-09-28 at 9.07.03 PM (1).jpeg" },
  { id: 81, title: "Lavender Palazzo Suit", price: "₹11,999", rating: 4.3, reviews: 102, image: "/products/WhatsApp Image 2026-09-28 at 9.07.03 PM (2).jpeg" },
  { id: 82, title: "Jet Black Velvet Kurta", price: "₹18,499", rating: 4.8, reviews: 276, image: "/products/WhatsApp Image 2026-09-28 at 9.07.04 PM.jpeg" },
  { id: 83, title: "Sunset Orange Lehenga", price: "₹35,999", rating: 4.9, reviews: 319, image: "/products/WhatsApp Image 2026-09-28 at 9.07.04 PM (1).jpeg" },
  { id: 84, title: "Sage Green Handloom Suit", price: "₹14,999", rating: 4.4, reviews: 127, image: "/products/WhatsApp Image 2026-09-28 at 9.07.05 PM.jpeg" },
  { id: 85, title: "Rose Red Bridal Sherwani", price: "₹42,999", rating: 4.9, reviews: 387, image: "/products/WhatsApp Image 2026-09-28 at 9.07.05 PM (1).jpeg" },
  { id: 86, title: "Topaz Embroidered Kurti", price: "₹7,999", rating: 4.3, reviews: 91, image: "/products/WhatsApp Image 2026-09-28 at 9.07.05 PM (2).jpeg" },
  { id: 87, title: "Marigold Silk Sharara", price: "₹20,999", rating: 4.5, reviews: 161, image: "/products/WhatsApp Image 2026-09-28 at 9.07.06 PM.jpeg" },
  { id: 88, title: "Electric Blue Bandhgala", price: "₹23,499", rating: 4.7, reviews: 214, image: "/products/WhatsApp Image 2026-09-28 at 9.07.06 PM (1).jpeg" },
  { id: 89, title: "Snow White Anarkali", price: "₹16,499", rating: 4.6, reviews: 188, image: "/products/WhatsApp Image 2026-09-28 at 9.07.07 PM.jpeg" },
  { id: 90, title: "Mulberry Net Lehenga", price: "₹37,999", rating: 4.8, reviews: 293, image: "/products/WhatsApp Image 2026-09-28 at 9.07.07 PM (1).jpeg" },
  { id: 91, title: "Persimmon Kantha Kurta", price: "₹10,999", rating: 4.3, reviews: 99, image: "/products/WhatsApp Image 2026-09-28 at 9.07.07 PM (2).jpeg" },
  { id: 92, title: "Sepia Brocade Sherwani", price: "₹30,999", rating: 4.7, reviews: 237, image: "/products/WhatsApp Image 2026-09-28 at 9.07.08 PM.jpeg" },
  { id: 93, title: "Pearl Embroidered Suit", price: "₹22,999", rating: 4.5, reviews: 173, image: "/products/WhatsApp Image 2026-09-28 at 9.07.08 PM (1).jpeg" },
  { id: 94, title: "Claret Velvet Lehenga", price: "₹41,999", rating: 4.9, reviews: 364, image: "/products/WhatsApp Image 2026-09-28 at 9.07.09 PM.jpeg" },
  { id: 95, title: "Turquoise Festive Kurta", price: "₹13,499", rating: 4.4, reviews: 131, image: "/products/WhatsApp Image 2026-09-28 at 9.07.09 PM (1).jpeg" },
  { id: 96, title: "Cantaloupe Chanderi Suit", price: "₹15,999", rating: 4.2, reviews: 82, image: "/products/WhatsApp Image 2026-09-28 at 9.07.09 PM (2).jpeg" },
  { id: 97, title: "Midnight Blue Zari Sherwani", price: "₹33,999", rating: 4.8, reviews: 308, image: "/products/WhatsApp Image 2026-09-28 at 9.07.10 PM.jpeg" },
  { id: 98, title: "Flamingo Silk Anarkali", price: "₹19,999", rating: 4.6, reviews: 196, image: "/products/WhatsApp Image 2026-09-28 at 9.07.10 PM (1).jpeg" },
  { id: 99, title: "Golden Bridal Lehenga", price: "₹49,999", rating: 5.0, reviews: 421, image: "/products/WhatsApp Image 2026-09-28 at 9.07.11 PM.jpeg" },
  { id: 100, title: "Heritage Royal Sherwani", price: "₹38,499", rating: 4.8, reviews: 156, image: "/33-1-scaled.webp" },
 
];

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
  product: (typeof PRODUCTS)[0];
  locale: string;
  mode?: "retail" | "wholesale" | "digital";
  onOpenModal?: (productTitle: string, type: "quote" | "bulk") => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  // Avoid hydration mismatch: use a stable default until client mounts
  const isDark = mounted && resolvedTheme === "dark";

  useEffect(() => { setMounted(true); }, []);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1800);
  };

  if (mode === "wholesale") {
    const stock = 2500 + (product.id * 17) % 500;

    return (
      <div className="relative flex flex-col group border rounded-2xl overflow-hidden shadow-sm transition-transform duration-300 hover:-translate-y-1" style={{ borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)", background: isDark ? "#111" : "#fff" }}>
        {/* Product Image */}
        <div className="relative aspect-[4/5] w-full bg-gray-100">
          <Image src={product.image} alt={product.title} fill className="object-cover" unoptimized />
          <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm text-white text-[9px] uppercase tracking-wider px-2.5 py-1.5 rounded-full border border-white/20">
            MOQ: 50 pcs
          </div>
        </div>

        {/* Wholesale Info */}
        <div className="p-5 flex flex-col gap-4">
          <div>
            <h2 className={`text-sm font-semibold truncate font-[family-name:var(--font-playfair)] tracking-wide ${isDark ? "text-white" : "text-black"}`}>{product.title}</h2>
            <p className="text-[11px] text-gray-500 font-mono mt-1 tracking-widest">SKU: PROD-{product.id.toString().padStart(3, '0')}</p>
          </div>


          <div className="flex justify-between items-center text-xs mt-1">
            <span className={isDark ? "text-gray-400" : "text-gray-500"}>Stock: <span className={`font-semibold ${isDark ? "text-white" : "text-black"}`}>{stock.toLocaleString()}</span></span>
          </div>

          <div className="flex gap-3 mt-2">
            <button
              onClick={() => onOpenModal?.(product.title, "quote")}
              className="flex-1 py-3 text-[10px] uppercase tracking-widest font-semibold border rounded-lg transition-colors hover:bg-black/5 dark:hover:bg-white/5"
              style={{ borderColor: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)", color: isDark ? "#fff" : "#000" }}
            >
              Request Quote
            </button>
            <button
              onClick={() => onOpenModal?.(product.title, "bulk")}
              className="flex-1 py-3 text-[10px] uppercase tracking-widest font-semibold rounded-lg text-white bg-[#0d6b3e] hover:bg-[#2e8b57] transition-colors shadow-lg shadow-green-900/20"
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
              ? "rgba(46, 139, 87, 0.5)"
              : isDark
                ? "rgba(255, 255, 255, 0.06)"
                : "rgba(0, 0, 0, 0.08)",
            boxShadow: hovered
              ? "0 8px 32px rgba(13, 107, 62, 0.18)"
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
          />
          {/* Subtle gradient overlay on hover */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent transition-opacity duration-500 ${hovered ? "opacity-100" : "opacity-0"
              }`}
          />
          {/* Quick-view tag */}
          <div
            className={`absolute top-3 left-3 bg-[#0d6b3e] text-white text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full transition-all duration-500 ${hovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
              }`}
          >
            Quick View
          </div>
        </div>
      </Link>

      {/* ── Product Info ── */}
      <div className="flex flex-col gap-1.5 px-1">
        {/* Name */}
        <Link href={`/${locale}/product/${product.id}`}>
          <h2
            className={`text-sm font-semibold leading-tight transition-colors duration-300 font-[family-name:var(--font-playfair)] ${hovered
                ? "text-[#2e8b57]"
                : isDark
                  ? "text-white"
                  : "text-gray-900"
              }`}
          >
            {product.title}
          </h2>
        </Link>

        {/* Price */}
        <span
          className={`text-base font-bold tracking-tight ${isDark ? "text-white" : "text-gray-900"
            }`}
        >
          {product.price}
        </span>

        {/* Rating row */}
        <div className="flex items-center gap-2">
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
        </div>

        {/* Add to Cart button */}
        <button
          onClick={handleAddToCart}
          className="mt-2 w-full py-2.5 rounded-xl text-xs font-semibold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2"
          style={{
            background: addedToCart
              ? "#0d6b3e"
              : hovered
                ? "#0d6b3e"
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
              ? "1.5px solid #0d6b3e"
              : hovered
                ? "1.5px solid #0d6b3e"
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
  const locale = useLocale();
  const searchParams = useSearchParams();
  const { resolvedTheme } = useTheme();
  // Avoid hydration mismatch: use a stable default until client mounts
  const isDark = mounted && resolvedTheme === "dark";

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) setSearchQuery(q);
  }, [searchParams]);

  const filteredProducts = PRODUCTS.filter((p) =>
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
