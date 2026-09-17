"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

const LOCALES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "hi", label: "हिन्दी", flag: "🇮🇳" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "pt", label: "Português", flag: "🇵🇹" },
];

export function Header() {
  const t = useTranslations("header");
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/`;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const close = () => setLangOpen(false);
    if (langOpen) document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [langOpen]);

  // Close search on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const changeLanguage = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
    setLangOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/${locale}/collections?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const currentLocale = LOCALES.find((l) => l.code === locale);

  return (
    <>
      <header
        className={`fixed top-0 w-full z-40 transition-all duration-500 ease-in-out ${
          !isHomePage || scrolled
            ? "bg-white/95 backdrop-blur-lg border-b border-black/10 py-3 shadow-sm"
            : "bg-transparent py-5 border-b border-transparent"
        }`}
      >
        <div className="container mx-auto px-6 grid grid-cols-3 items-center">
          
          {/* Left: Menu & Search */}
          <div className={`flex items-center gap-6 ${!isHomePage || scrolled ? "text-black/90" : "text-white/90"}`}>
            <button onClick={() => setMenuOpen(true)} className="hover:text-amber-400 transition-colors" aria-label="Menu">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <button onClick={() => setSearchOpen(true)} className="hover:text-amber-400 transition-colors hidden sm:block" aria-label="Search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>

          {/* Center: Logo */}
          <div className="flex justify-center">
            <Link href={`/${locale}`} className="flex items-center justify-center">
              <Image
                src="/Untitled-design-18.webp"
                alt="Logo"
                width={120}
                height={35}
                className={`object-contain drop-shadow-md brightness-0 opacity-95 hover:opacity-100 transition-opacity ${!isHomePage || scrolled ? "" : "invert"}`}
              />
            </Link>
          </div>

          {/* Right: Language, User, Bag */}
          <div className={`flex items-center justify-end gap-5 ${!isHomePage || scrolled ? "text-black/90" : "text-white/90"}`}>
            
            {/* Language Switcher */}
            <div className="relative hidden md:block" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setLangOpen((prev) => !prev)}
                className="flex items-center gap-1 hover:text-amber-400 transition-colors"
              >
                <span className="text-[11px] font-medium tracking-[0.15em] uppercase">{locale}</span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </button>

              {langOpen && (
                <div className="absolute top-full right-0 mt-4 w-40 bg-white/80 backdrop-blur-xl border border-black/10 shadow-2xl rounded-sm overflow-hidden">
                  {LOCALES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => changeLanguage(l.code)}
                      className={`w-full text-left px-4 py-2.5 flex items-center gap-3 hover:bg-black/10 transition-colors text-xs tracking-wider ${
                        locale === l.code ? "text-amber-400 bg-black/5" : "text-black/80"
                      }`}
                    >
                      <span className="text-base">{l.flag}</span>
                      <span>{l.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="hover:text-amber-400 transition-colors" aria-label="Account">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </button>
            
            <button className="hover:text-amber-400 transition-colors relative group" aria-label="Cart">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              {/* Elegant Cart Indicator Dot */}
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full border border-white hidden group-hover:block transition-all"></span>
            </button>

          </div>
        </div>
      </header>

      {/* Slide-out Sidebar Menu */}
      <div 
        className={`fixed inset-0 z-[100] flex transition-opacity duration-500 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-white/50 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
        
        {/* Sidebar */}
        <div 
          className={`relative w-80 max-w-[80vw] h-full bg-[#ffffff]/90 backdrop-blur-3xl border-r border-amber-900/30 p-8 flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-[10px_0_50px_rgba(0,0,0,0.5)] ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Close Button */}
          <button 
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 text-amber-500/70 hover:text-amber-400 transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Menu Items */}
          <nav className="mt-20 flex flex-col gap-10">
            <Link href={`/${locale}`} onClick={() => setMenuOpen(false)} className="group flex items-center justify-between text-black hover:text-black/60 transition-colors">
              <span className="text-lg font-[family-name:var(--font-inter)] font-light tracking-wide">Home</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </Link>

            <Link href={`/${locale}/about`} onClick={() => setMenuOpen(false)} className="group flex items-center justify-between text-black hover:text-black/60 transition-colors">
              <span className="text-lg font-[family-name:var(--font-inter)] font-light tracking-wide">About Us</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </Link>

            <Link href={`/${locale}/collections`} onClick={() => setMenuOpen(false)} className="group flex items-center justify-between text-black hover:text-black/60 transition-colors">
              <span className="text-lg font-[family-name:var(--font-inter)] font-light tracking-wide">Collections</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </Link>

            <Link href={`/${locale}/contact`} onClick={() => setMenuOpen(false)} className="group flex items-center justify-between text-black hover:text-black/60 transition-colors">
              <span className="text-lg font-[family-name:var(--font-inter)] font-light tracking-wide">Contact</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </Link>
          </nav>
        </div>
      </div>

      {/* Search Overlay — only render when open */}
      {searchOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col">
          {/* Search Panel */}
          <div className="relative bg-white w-full shadow-2xl px-6 py-8 md:py-12">
            <p className="text-xs tracking-[0.3em] uppercase text-black/40 mb-6 font-[family-name:var(--font-inter)]">Search Products</p>
            <form onSubmit={handleSearch} className="flex items-center gap-3 border-b-2 border-black pb-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-black/40 shrink-0">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search kurtis, suits, anarkalis..."
                className="flex-1 text-xl md:text-3xl font-[family-name:var(--font-playfair)] bg-transparent border-none outline-none placeholder-black/20 text-black"
              />
              {searchQuery && (
                <button type="button" onClick={() => setSearchQuery("")} className="text-black/30 hover:text-black transition-colors p-1">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              )}
              <button type="submit" className="shrink-0 px-6 py-2.5 bg-black text-white text-xs uppercase tracking-widest rounded-full hover:bg-black/80 transition-colors font-[family-name:var(--font-inter)]">
                Go
              </button>
            </form>
            {/* Quick Tags */}
            <div className="mt-6 flex gap-3 flex-wrap">
              <span className="text-xs text-black/40 mr-2 font-[family-name:var(--font-inter)] self-center">Popular:</span>
              {["KURTIS", "SUIT SETS", "ANARKALIS", "SHARARAS", "DUPATTAS"].map(tag => (
                <button
                  key={tag}
                  onClick={() => { router.push(`/${locale}/collections?q=${tag}`); setSearchOpen(false); setSearchQuery(""); }}
                  className="px-4 py-1.5 border border-black/20 rounded-full text-xs tracking-widest text-black/60 hover:bg-black hover:text-white hover:border-black transition-all font-[family-name:var(--font-inter)]"
                >
                  {tag}
                </button>
              ))}
            </div>
            {/* Close Button */}
            <button onClick={() => setSearchOpen(false)} className="absolute top-5 right-6 text-black/40 hover:text-black transition-colors p-2">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          {/* Backdrop — click to close */}
          <div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={() => setSearchOpen(false)} />
        </div>
      )}
    </>
  );
}
