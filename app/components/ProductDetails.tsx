"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";

interface ProductProps {
  id: string;
}

// Mock database for products
const getProductData = (id: string) => {
  return {
    id,
    name: `SIDHANT Collection Piece ${id}`,
    price: "₹14,500",
    description: "An exquisite piece crafted with precision, blending timeless heritage with modern elegance. Featuring delicate embroidery and luxurious fabric, it's designed to make a statement at any occasion.",
    details: [
      "Hand-embroidered details",
      "Premium Silk Blend",
      "Dry clean only",
      "Made in India"
    ],
    images: [
      "/35-1-scaled.webp",
      "/39-1-scaled.webp",
      "/33-1-scaled.webp",
      "/34-1-scaled.webp"
    ]
  };
};

export function ProductDetails({ id }: ProductProps) {
  const locale = useLocale();
  const product = getProductData(id);
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="w-full min-h-screen bg-[#ffffff] pt-32 pb-24 text-black">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Breadcrumb */}
        <div className="text-xs tracking-[0.2em] uppercase text-black/50 mb-12 font-[family-name:var(--font-inter)]">
          <Link href={`/${locale}`} className="hover:text-black transition-colors">Home</Link>
          <span className="mx-3">/</span>
          <Link href={`/${locale}#collections`} className="hover:text-black transition-colors">Collections</Link>
          <span className="mx-3">/</span>
          <span className="text-black">Product {id}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Image Gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative w-full aspect-[3/4] bg-gray-50 rounded-lg overflow-hidden border border-black/5">
              <Image 
                src={product.images[activeImage]} 
                alt={product.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative aspect-[3/4] rounded-md overflow-hidden border ${activeImage === idx ? 'border-black' : 'border-transparent opacity-60 hover:opacity-100'} transition-all`}
                >
                  <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" unoptimized />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col pt-4 sticky top-32">
            <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-playfair)] mb-4 leading-tight">
              {product.name}
            </h1>
            <p className="text-xl font-[family-name:var(--font-inter)] font-light mb-8 text-black/80">
              {product.price}
            </p>
            
            <p className="text-sm text-black/70 leading-relaxed font-[family-name:var(--font-inter)] mb-10 max-w-lg">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs tracking-[0.1em] uppercase font-semibold">Select Size</span>
                <button className="text-xs text-black/50 hover:text-black transition-colors underline underline-offset-4">Size Guide</button>
              </div>
              <div className="flex gap-4">
                {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                  <button key={size} className="w-12 h-12 border border-black/20 rounded-full flex items-center justify-center text-sm font-medium hover:border-black hover:bg-black hover:text-white transition-colors">
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4 mb-12">
              <button className="w-full py-5 bg-black text-white rounded-full text-xs tracking-[0.2em] uppercase font-bold hover:bg-black/80 transition-colors">
                Add to Bag
              </button>
              <button className="w-full py-5 bg-transparent border border-black rounded-full text-xs tracking-[0.2em] uppercase font-bold text-black hover:bg-gray-50 transition-colors">
                Buy it Now
              </button>
            </div>

            {/* Details Accordion (Static) */}
            <div className="border-t border-black/10">
              <div className="py-6 border-b border-black/10">
                <h3 className="text-sm tracking-[0.1em] uppercase font-semibold mb-4">Product Details</h3>
                <ul className="list-disc pl-5 text-sm text-black/70 space-y-2">
                  {product.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              </div>
              <div className="py-6 border-b border-black/10 flex justify-between items-center cursor-pointer group">
                <span className="text-sm tracking-[0.1em] uppercase font-semibold">Shipping & Returns</span>
                <span className="text-xl group-hover:rotate-90 transition-transform">+</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
