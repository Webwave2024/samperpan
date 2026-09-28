import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  return (
    <footer className="w-full bg-[#ffffff] text-black dark:text-white py-24 px-6 border-t border-black/5 mt-auto dark:bg-[#0a0a0a] dark:text-white dark:border-white/5 transition-colors duration-300">
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
          </div>

          {/* Collections */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-black dark:text-white text-xs tracking-[0.2em] uppercase font-semibold mb-4 transition-colors duration-300">{t("collections")}</h4>
            <Link href={`/${locale}/collections`} className="text-sm hover:text-black dark:hover:text-white transition-colors duration-300">View All Collections</Link>
          </div>

          {/* Atelier */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-black dark:text-white text-xs tracking-[0.2em] uppercase font-semibold mb-4 transition-colors duration-300">{t("atelier")}</h4>
            <Link href={`/${locale}/about`} className="text-sm hover:text-black dark:hover:text-white transition-colors duration-300">{t("ourStory")}</Link>
            <Link href={`/${locale}/contact`} className="text-sm hover:text-black dark:hover:text-white transition-colors duration-300">{t("contactUs")}</Link>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-black text-xs tracking-[0.2em] uppercase font-semibold mb-4">{t("insider")}</h4>
            <p className="text-sm tracking-wide font-[family-name:var(--font-inter)] opacity-80">{t("subscribeDesc")}</p>
            <form className="mt-4 flex border-b border-black/20 pb-2 focus-within:border-black/60 transition-colors">
              <input
                type="email"
                placeholder={t("emailPlaceholder")}
                className="bg-transparent border-none outline-none w-full text-sm text-black placeholder-black/50 tracking-wider font-[family-name:var(--font-inter)]"
              />
              <button type="button" className="text-xs uppercase tracking-[0.2em] text-black hover:text-black dark:text-white transition-colors">
                {t("join")}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center text-xs tracking-[0.1em] uppercase opacity-50 font-[family-name:var(--font-inter)]">
          <p>&copy; {new Date().getFullYear()} SIDHANT. {t("rights")}</p>
          <div className="flex space-x-8 mt-6 md:mt-0">
            <Link href="#privacy" className="hover:text-black transition-colors">{t("privacy")}</Link>
            <Link href="#terms" className="hover:text-black transition-colors">{t("terms")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
