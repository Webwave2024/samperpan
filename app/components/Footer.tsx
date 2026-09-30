"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "../i18n/client";

export function Footer({ lang = 'en' }: { lang?: string }) {
  const { t } = useTranslation(lang, "footer");
  const locale = lang;

  return (
    <footer className="w-full bg-[#ffffff] text-black dark:text-white pt-16 pb-6 px-6 border-t border-black/5 mt-auto dark:bg-[#0a0a0a] dark:text-white dark:border-white/5 transition-colors duration-300">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">

          {/* Brand Column */}
          <div className="flex flex-col items-start space-y-6 md:col-span-1">
            <Link href={`/${locale}`} className="inline-block">
              <Image
                src="/Untitled-design-18.webp"
                alt="SIDHANT Logo"
                width={140}
                height={50}
                className="object-contain drop-shadow-md brightness-0 opacity-90 dark:invert transition-all duration-300"
              />
            </Link>
            <p className="text-sm tracking-wide leading-relaxed font-[family-name:var(--font-inter)] opacity-80">
              {t("brandDesc")}
            </p>

            <div className="text-sm tracking-wide leading-relaxed font-[family-name:var(--font-inter)] opacity-80 pt-2">
              <p className="font-semibold mb-1">Headquarters</p>
              C-97, 4th Floor, Sumel Business Park-2, <br /> Kankaria Road, Behind Vanijya Bhavan, <br />Sherkotda, Ahmedabad, Gujarat, <br />380002, India
            </div>
          </div>

          {/* Collections */}
          <div className="flex flex-col space-y-4 opacity-80">
            <h4 className="text-black dark:text-white text-xs tracking-[0.2em] uppercase font-semibold mb-4 transition-colors duration-300 opacity-100">{t("collections")}</h4>
            <Link href={`/${locale}/retail`} className="text-sm hover:text-black dark:hover:text-white transition-colors duration-300">Retail Collection</Link>
            <Link href={`/${locale}/wholesale`} className="text-sm hover:text-black dark:hover:text-white transition-colors duration-300">Wholesale Collection</Link>
            <Link href={`/${locale}/collections`} className="text-sm hover:text-black dark:hover:text-white transition-colors duration-300">View All Collections</Link>
          </div>

          {/* Atelier */}
          <div className="flex flex-col space-y-4 opacity-80">
            <h4 className="text-black dark:text-white text-xs tracking-[0.2em] uppercase font-semibold mb-4 transition-colors duration-300 opacity-100">{t("atelier")}</h4>
            <Link href={`/${locale}/about`} className="text-sm hover:text-black dark:hover:text-white transition-colors duration-300">{t("ourStory")}</Link>
            <Link href={`/${locale}/contact`} className="text-sm hover:text-black dark:hover:text-white transition-colors duration-300">{t("contactUs")}</Link>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-black dark:text-white text-xs tracking-[0.2em] uppercase font-semibold mb-4 transition-colors duration-300">{t("insider")}</h4>
            <p className="text-sm tracking-wide font-[family-name:var(--font-inter)] opacity-80">{t("subscribeDesc")}</p>
            <form className="mt-4 flex border-b border-black/20 dark:border-white/20 pb-2 focus-within:border-black/60 dark:focus-within:border-white/60 transition-colors">
              <input
                type="email"
                placeholder={t("emailPlaceholder")}
                className="bg-transparent border-none outline-none w-full text-sm text-black dark:text-white placeholder-black/50 dark:placeholder-white/50 tracking-wider font-[family-name:var(--font-inter)]"
              />
              <button type="button" className="text-xs uppercase tracking-[0.2em] text-black dark:text-white hover:opacity-70 transition-opacity">
                {t("join")}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-black/5 dark:border-white/5 flex justify-center items-center text-xs tracking-[0.1em] uppercase opacity-50 font-[family-name:var(--font-inter)] text-center">
          <p>&copy; {new Date().getFullYear()} SIDHANT. {t("rights")}</p>
        </div>
      </div>
    </footer>
  );
}
