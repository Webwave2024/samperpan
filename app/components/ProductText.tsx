export function ProductText() {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden text-black flex flex-col justify-center items-center">
      
      {/* Main Title - initially hidden */}
      <div id="title-container" className="opacity-0 translate-y-10 flex flex-col items-center">
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-[0.04em] mb-4">
          NOIR COLLECTION
        </h1>
        <p className="font-sans text-xs md:text-sm tracking-[0.18em] uppercase text-black/70">
          Cinematic Realism in Three.js
        </p>
      </div>

      {/* Detail / Fabric text for the macro shot */}
      <div id="macro-text" className="absolute left-[10%] top-[40%] opacity-0 -translate-x-10 max-w-xs">
        <h2 className="font-serif text-3xl mb-2">Woven Perfection</h2>
        <p className="font-sans text-xs tracking-widest leading-loose text-black/70">
          Every thread calculated. A masterpiece of digital tailoring and realistic PBR rendering.
        </p>
      </div>

      {/* CTA / End state */}
      <div id="cta-container" className="absolute bottom-[10%] opacity-0 translate-y-5">
        <button className="pointer-events-auto px-8 py-4 bg-black text-white font-sans text-xs tracking-[0.2em] uppercase hover:bg-gray-200 transition-colors">
          Explore the Details
        </button>
      </div>
    </div>
  );
}
