"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "next-themes";

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
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/`;
  // On product/collection/retail/wholesale pages the background is white so icons must be black
  const isLightPage = !isHomePage;

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

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
      if (e.key === "Escape") {
        setSearchOpen(false);
        setCartOpen(false);
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    const loadCart = () => {
      try {
        const stored = localStorage.getItem('cart');
        if (stored) {
          const parsed = JSON.parse(stored);
          setCartItems(Array.isArray(parsed) ? parsed : []);
        }
      } catch (e) {
        setCartItems([]);
      }
    };
    loadCart();
    
    const handleOpenCart = () => setCartOpen(true);
    
    window.addEventListener('cartUpdated', loadCart);
    window.addEventListener('openCart', handleOpenCart);
    
    return () => {
      window.removeEventListener('cartUpdated', loadCart);
      window.removeEventListener('openCart', handleOpenCart);
    };
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
        className={`fixed top-0 w-full z-40 transition-all duration-700 ease-in-out ${
          scrolled
            ? "bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-black/5 dark:border-white/5 py-3"
            : "bg-transparent py-6 border-b border-transparent"
        }`}
      >
        <div className="container mx-auto px-6 grid grid-cols-3 items-center">
          
          {/* Left: Menu & Search */}
          <div className={`flex items-center gap-6 transition-colors duration-300 ${
            scrolled ? "text-black dark:text-white dark:text-white" : isHomePage ? "text-black dark:text-white" : "text-black dark:text-white dark:text-white"
          }`}>
            <button onClick={() => setMenuOpen(true)} className="hover:text-amber-500 transition-colors" aria-label="Menu">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <button onClick={() => setSearchOpen(true)} className="hover:text-amber-500 transition-colors hidden sm:block" aria-label="Search">
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
                className={`object-contain drop-shadow-md transition-all duration-300 opacity-90 hover:opacity-100 ${
                  !mounted
                    ? "brightness-0 invert sepia hue-rotate-180 saturate-200"
                    : scrolled || theme === "dark" || isHomePage
                    ? "brightness-0 invert sepia hue-rotate-180 saturate-200"
                    : "brightness-0 sepia hue-rotate-[80deg] saturate-200"
                }`}
                style={{ width: "auto", height: "auto", filter: "invert(34%) sepia(85%) saturate(417%) hue-rotate(99deg) brightness(91%) contrast(89%)" }}
              />
            </Link>
          </div>

          {/* Right: Language, User, Bag */}
          <div className={`flex items-center justify-end gap-5 transition-colors duration-300 ${
            scrolled ? "text-black dark:text-white dark:text-white" : isHomePage ? "text-black dark:text-white" : "text-black dark:text-white dark:text-white"
          }`}>
            
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
                <div className="absolute top-full right-0 mt-4 w-40 bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-2xl rounded-sm overflow-hidden">
                  {LOCALES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => changeLanguage(l.code)}
                      className={`w-full text-left px-4 py-2.5 flex items-center gap-3 hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-xs tracking-wider ${
                        locale === l.code ? "text-amber-400 bg-black/5 dark:bg-white/5" : "text-black dark:text-white dark:text-white"
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

            {/* Theme Switcher */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="hover:text-amber-400 transition-colors"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                )}
              </button>
            )}
            
            <button onClick={() => setCartOpen(true)} className="hover:text-amber-400 transition-colors relative group" aria-label="Cart">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              {cartItems.length > 0 ? (
                <span className="absolute -top-2 -right-2 w-[18px] h-[18px] bg-[#0d6b3e] rounded-full text-white text-[10px] flex items-center justify-center font-bold">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              ) : (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full border border-white hidden group-hover:block transition-all"></span>
              )}
            </button>

          </div>
        </div>
      </header>

      {/* Slide-out Sidebar Menu */}
       {/* Slide-out Sidebar Menu */}
      <div 
        className={`fixed inset-0 z-[100] flex transition-opacity duration-500 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 dark:bg-white/10 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
        
        {/* Sidebar — dark theme with royal green accents */}
        <div 
          className={`relative w-80 max-w-[80vw] h-full backdrop-blur-3xl border-r p-8 flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-[10px_0_60px_rgba(0,0,0,0.8)] bg-white dark:bg-[#080808] ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{ borderColor: "rgba(46,139,87,0.25)" }}
        >
          {/* Green accent line at top */}
          <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, #0d6b3e, #2e8b57, transparent)" }} />

          {/* Close Button */}
          <button 
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 transition-colors"
            style={{ color: "rgba(46,139,87,0.6)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#2e8b57")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(46,139,87,0.6)")}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Logo area */}
          <div className="mt-2 mb-10">
            <span className="text-[9px] tracking-[0.5em] uppercase" style={{ color: "#2e8b57" }}>SIDHANT</span>
          </div>

          {/* Menu Items */}
          <nav className="flex flex-col gap-8">
            <Link href={`/${locale}`} onClick={() => setMenuOpen(false)} className="group flex items-center justify-between transition-colors text-black/75 dark:text-white/75 hover:text-black dark:hover:text-white">
              <span className="text-lg font-[family-name:var(--font-inter)] font-light tracking-wide">Home</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </Link>

            <Link href={`/${locale}/about`} onClick={() => setMenuOpen(false)} className="group flex items-center justify-between transition-colors text-black/75 dark:text-white/75 hover:text-black dark:hover:text-white">
              <span className="text-lg font-[family-name:var(--font-inter)] font-light tracking-wide">About Us</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </Link>

            <Link href={`/${locale}/collections`} onClick={() => setMenuOpen(false)} className="group flex items-center justify-between transition-colors text-black/75 dark:text-white/75 hover:text-black dark:hover:text-white">
              <span className="text-lg font-[family-name:var(--font-inter)] font-light tracking-wide">Collections</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </Link>

            <Link href={`/${locale}/contact`} onClick={() => setMenuOpen(false)} className="group flex items-center justify-between transition-colors text-black/75 dark:text-white/75 hover:text-black dark:hover:text-white">
              <span className="text-lg font-[family-name:var(--font-inter)] font-light tracking-wide">Contact</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </Link>

            {/* ── Atelier Experience — 360° Virtual Tour ── */}
            <div className="border-t mt-2 pt-8" style={{ borderColor: "rgba(46,139,87,0.2)" }}>
              <p className="text-[9px] tracking-[0.4em] uppercase mb-4" style={{ color: "rgba(46,139,87,0.6)" }}>Virtual Experience</p>
              <a
                href="https://tourmkr.com/F1cqhLlGg3/47874105p&251.09h&78.25t"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="group flex items-center justify-between transition-colors"
                style={{ color: "#2e8b57" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#5cb87a")}
                onMouseLeave={e => (e.currentTarget.style.color = "#2e8b57")}
              >
                <div className="flex flex-col">
                  <span className="text-base font-[family-name:var(--font-inter)] font-light tracking-wide">The Atelier Experience</span>
                  <span className="text-[9px] tracking-[0.25em] uppercase mt-1" style={{ color: "rgba(46,139,87,0.5)" }}>360° Virtual Tour ↗</span>
                </div>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </a>
            </div>
          </nav>
        </div>
      </div>

      {/* Search Overlay — only render when open */}
      {searchOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col">
          {/* Search Panel */}
          <div className="relative bg-white dark:bg-[#000] w-full shadow-2xl px-6 py-8 md:py-12 transition-colors duration-300">
            <p className="text-xs tracking-[0.3em] uppercase text-black dark:text-white dark:text-white mb-6 font-[family-name:var(--font-inter)]">Search Products</p>
            <form onSubmit={handleSearch} className="flex items-center gap-3 border-b-2 border-black dark:border-white pb-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-black dark:text-white dark:text-white shrink-0">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search kurtis, suits, anarkalis..."
                className="flex-1 text-xl md:text-3xl font-[family-name:var(--font-playfair)] bg-transparent border-none outline-none placeholder-black/20 dark:placeholder-white/20 text-black dark:text-white"
              />
              {searchQuery && (
                <button type="button" onClick={() => setSearchQuery("")} className="text-black dark:text-white dark:text-white hover:text-black dark:hover:text-white transition-colors p-1">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              )}
              <button type="submit" className="shrink-0 px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black text-xs uppercase tracking-widest rounded-full hover:bg-black/80 dark:hover:bg-white/80 transition-colors font-[family-name:var(--font-inter)]">
                Go
              </button>
            </form>
            {/* Quick Tags */}
            <div className="mt-6 flex gap-3 flex-wrap">
              <span className="text-xs text-black dark:text-white dark:text-white mr-2 font-[family-name:var(--font-inter)] self-center">Popular:</span>
              {["KURTIS", "SUIT SETS", "ANARKALIS", "SHARARAS", "DUPATTAS"].map(tag => (
                <button
                  key={tag}
                  onClick={() => { router.push(`/${locale}/collections?q=${tag}`); setSearchOpen(false); setSearchQuery(""); }}
                  className="px-4 py-1.5 border border-black/20 dark:border-white/20 rounded-full text-xs tracking-widest text-black dark:text-white dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all font-[family-name:var(--font-inter)]"
                >
                  {tag}
                </button>
              ))}
            </div>
            {/* Close Button */}
            <button onClick={() => setSearchOpen(false)} className="absolute top-5 right-6 text-black dark:text-white dark:text-white hover:text-black dark:hover:text-white transition-colors p-2">
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

      {/* Cart Sidebar */}
      <div 
        className={`fixed inset-0 z-[100] flex justify-end transition-opacity duration-500 ${
          cartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
        
        <div 
          className={`relative w-[400px] max-w-[90vw] h-full backdrop-blur-3xl border-l p-6 md:p-8 flex flex-col transition-transform duration-500 shadow-2xl bg-white dark:bg-[#080808] ${
            cartOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ borderColor: "rgba(46,139,87,0.25)" }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-[family-name:var(--font-playfair)]">Your Bag</h2>
            <button onClick={() => setCartOpen(false)} className="hover:text-amber-500 transition-colors p-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto pr-2">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-black/50 dark:text-white/50">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mb-4 opacity-50"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                <p className="text-xs font-[family-name:var(--font-inter)] tracking-[0.2em] uppercase">Your bag is empty</p>
                <button onClick={() => setCartOpen(false)} className="mt-6 text-[10px] tracking-widest text-[#2e8b57] uppercase underline">Continue Shopping</button>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="relative w-20 h-28 shrink-0 rounded-md overflow-hidden bg-black/5 dark:bg-white/5">
                      <Image src={item.image} alt={item.title} fill className="object-cover" unoptimized />
                    </div>
                    <div className="flex flex-col flex-1 py-1">
                      <div className="flex justify-between items-start">
                        <h3 className="text-sm font-semibold font-[family-name:var(--font-inter)] pr-2">{item.title}</h3>
                        <button 
                          onClick={() => {
                            const newCart = cartItems.filter((_, i) => i !== idx);
                            setCartItems(newCart);
                            localStorage.setItem('cart', JSON.stringify(newCart));
                            window.dispatchEvent(new Event('cartUpdated'));
                          }}
                          className="p-1 text-black/40 dark:text-white/40 hover:text-red-500 transition-colors"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                      </div>
                      <p className="text-xs text-black/60 dark:text-white/60 mb-3 uppercase tracking-wider font-[family-name:var(--font-inter)]">Size: {item.size}</p>
                      
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-3 border border-black/10 dark:border-white/10 rounded-full px-2 py-1">
                          <button 
                            className="w-5 h-5 flex items-center justify-center text-xs hover:bg-black/5 dark:hover:bg-white/5 rounded-full"
                            onClick={() => {
                              const newCart = [...cartItems];
                              if (newCart[idx].quantity > 1) {
                                newCart[idx].quantity -= 1;
                                setCartItems(newCart);
                                localStorage.setItem('cart', JSON.stringify(newCart));
                                window.dispatchEvent(new Event('cartUpdated'));
                              }
                            }}
                          >-</button>
                          <span className="text-xs font-semibold w-4 text-center">{item.quantity}</span>
                          <button 
                            className="w-5 h-5 flex items-center justify-center text-xs hover:bg-black/5 dark:hover:bg-white/5 rounded-full"
                            onClick={() => {
                              const newCart = [...cartItems];
                              newCart[idx].quantity += 1;
                              setCartItems(newCart);
                              localStorage.setItem('cart', JSON.stringify(newCart));
                              window.dispatchEvent(new Event('cartUpdated'));
                            }}
                          >+</button>
                        </div>
                        <span className="text-sm font-semibold">{item.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="pt-6 mt-6 border-t border-black/10 dark:border-white/10">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-semibold uppercase tracking-widest text-black/60 dark:text-white/60">Subtotal</span>
                <span className="text-xl font-bold font-[family-name:var(--font-inter)]">
                  ₹{cartItems.reduce((acc, item) => acc + (parseInt(item.price.replace(/\D/g, '')) * item.quantity), 0).toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-[10px] text-black/50 dark:text-white/50 mb-4 text-center">Shipping & taxes calculated at checkout.</p>
              <button className="w-full py-4 bg-[#0d6b3e] text-white text-[11px] tracking-[0.2em] font-semibold uppercase rounded-xl hover:bg-[#2e8b57] transition-all shadow-lg shadow-[#0d6b3e]/20 hover:shadow-[#2e8b57]/40">
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}