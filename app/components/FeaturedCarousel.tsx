'use client';
import { useRef } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

const items = [
  {
    id: 1,
    type: 'video',
    src: '/WhatsApp%20Video%202026-09-17%20at%2010.04.09%20AM.mp4',
    title: 'PERSISTANCE OF TIME KURTI',
    subtitle: 'HAND BLOCK PRINT'
  },
  {
    id: 2,
    type: 'image',
    src: '/33-1-scaled.webp',
    title: 'CROW THEORY SUIT SET',
    subtitle: 'ZARI EMBROIDERY'
  },
  {
    id: 3,
    type: 'video',
    src: '/WhatsApp%20Video%202026-09-17%20at%2010.05.41%20AM.mp4',
    title: 'MANGO ANARKALI',
    subtitle: 'FESTIVE COLLECTION'
  },
  {
    id: 4,
    type: 'image',
    src: '/34-1-scaled.webp',
    title: 'GAMBLER SHARARA SET',
    subtitle: 'SILK BLEND'
  }
];

export function FeaturedCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();

  return (
    <section className="w-full bg-[#ffffff] text-black py-12 px-6 md:px-16 border-b border-black/5">
      <div className="mb-8">
        <h2 className="text-sm font-sans tracking-widest uppercase text-black/60">Limited Edition Kurtis & Suits</h2>
      </div>
      
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-4 md:gap-6 pb-8 snap-x snap-mandatory w-full"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style dangerouslySetInnerHTML={{__html: `
          ::-webkit-scrollbar { display: none; }
        `}} />
        
        {items.map((item) => (
          <Link
            href={`/${locale}/product/${item.id}`}
            key={item.id} 
            className="relative flex-none w-[75vw] sm:w-[50vw] md:w-[35vw] lg:w-[22vw] snap-center group cursor-pointer block"
          >
            <div className="w-full relative overflow-hidden bg-gray-50 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] aspect-[4/5]">
              {item.type === 'video' ? (
                <video 
                  src={item.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                />
              ) : (
                <img 
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                />
              )}
              
              {/* Plus Button */}
              <button className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-black text-xl shadow-xl hover:scale-110 transition-transform duration-300 z-10 font-light">
                +
              </button>
            </div>
            
            <div className="mt-6 text-center px-2">
              <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase mb-1">{item.title}</h3>
              <p className="text-[8px] text-black/40 tracking-[0.25em] uppercase">{item.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
