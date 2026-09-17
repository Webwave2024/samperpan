"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 1,
    image: "/35-1-scaled.webp",
    title: "Heritage Velvet Kurta",
    price: "₹ 12,499",
    position: { x: "-120%", y: "20%", rotation: -15 },
  },
  {
    id: 2,
    image: "/2026-08-07-12-53-15-1.pdf-45-scaled.webp",
    title: "Silk Embroidered Dupatta",
    price: "₹ 4,999",
    position: { x: "-70%", y: "-30%", rotation: -8 },
  },
  {
    id: 3,
    image: "/41-scaled.webp",
    title: "Gold Zari Trousers",
    price: "₹ 3,299",
    position: { x: "80%", y: "-20%", rotation: 10 },
  },
  {
    id: 4,
    image: "/38-1-scaled.webp",
    title: "Royal Emerald Necklace",
    price: "₹ 8,999",
    position: { x: "130%", y: "30%", rotation: 18 },
  }
];

export function ShopTheLook() {
  const locale = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const productRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state: hide products behind main image
      productRefs.current.forEach((el) => {
        if (el) {
          gsap.set(el, { x: 0, y: 0, rotation: 0, scale: 0.8, opacity: 0 });
        }
      });

      // Spread animation on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom bottom",
          scrub: 1, // Smooth scrubbing effect
        },
      });

      productRefs.current.forEach((el, index) => {
        if (el) {
          tl.to(
            el,
            {
              x: products[index].position.x,
              y: products[index].position.y,
              rotation: products[index].position.rotation,
              scale: 1,
              opacity: 1,
              ease: "power2.out",
            },
            0 // Start all animations at the same time
          );
        }
      });

      // Animate main image downwards to reveal products behind it
      if (mainImageRef.current) {
        tl.to(
          mainImageRef.current,
          {
            y: "40%",
            ease: "power2.out",
          },
          0
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = (index: number) => {
    const el = productRefs.current[index];
    if (el) {
      // Bring to front and scale up slightly
      gsap.to(el, { scale: 1.1, zIndex: 50, duration: 0.4, ease: "back.out(1.5)" });
      // Show details
      gsap.to(el.querySelector('.product-details'), { opacity: 1, y: 0, duration: 0.3 });
    }
  };

  const handleMouseLeave = (index: number) => {
    const el = productRefs.current[index];
    if (el) {
      // Return to normal size and z-index
      gsap.to(el, { scale: 1, zIndex: 10 + index, duration: 0.4, ease: "power2.out" });
      // Hide details
      gsap.to(el.querySelector('.product-details'), { opacity: 0, y: 10, duration: 0.3 });
    }
  };

  return (
    <section ref={containerRef} className="relative w-full h-[120vh] bg-[#ffffff] text-black overflow-hidden py-16 border-t border-black/5">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
        
        <h2 className="text-4xl md:text-6xl font-light tracking-wide mb-16 font-[family-name:var(--font-inter)]">
          Shop The Look
        </h2>

        <div className="relative w-full max-w-5xl flex items-center justify-center">
          
          {/* Product Images (Behind) */}
          {products.map((product, index) => (
            <Link
              key={product.id}
              href={`/${locale}/product/${product.id}`}
              ref={(el) => { productRefs.current[index] = el as HTMLDivElement | null; }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              className="absolute w-48 md:w-64 aspect-[3/4] bg-black shadow-2xl p-3 pb-16 cursor-pointer"
              style={{ zIndex: 10 + index }}
            >
              <div className="relative w-full h-full bg-gray-100 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              
              {/* Product Details (Hidden by default, shown on hover) */}
              <div className="product-details absolute bottom-0 left-0 w-full p-4 text-center opacity-0 translate-y-2 bg-gradient-to-t from-black via-black to-transparent">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-800 mb-1 line-clamp-1">{product.title}</p>
                <p className="text-sm font-bold text-white">{product.price}</p>
              </div>
            </Link>
          ))}

          {/* Main Central Image (Front) */}
          <div ref={mainImageRef} className="relative z-40 w-full max-w-md aspect-[3/4] shadow-2xl pointer-events-none">
            <Image
              src="/2026-08-07-12-53-15-1.pdf-49-scaled.webp"
              alt="Main Look"
              fill
              className="object-cover"
              unoptimized
            />
          </div>

        </div>
      </div>
    </section>
  );
}
