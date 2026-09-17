import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="w-full bg-[#ffffff] text-black/70 py-24 px-6 border-t border-black/5 mt-auto">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">

          {/* Brand Column */}
          <div className="flex flex-col items-start space-y-6 md:col-span-1">
            <Link href="/" className="inline-block">
              <Image
                src="/Untitled-design-18.webp"
                alt="SIDHANT Logo"
                width={140}
                height={50}
                className="object-contain drop-shadow-md brightness-0 opacity-90"
              />
            </Link>
            <p className="text-sm tracking-wide leading-relaxed font-[family-name:var(--font-inter)] opacity-80">
              {t("brandDesc")}
            </p>
          </div>

          {/* Collections */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-black text-xs tracking-[0.2em] uppercase font-semibold mb-4">{t("collections")}</h4>
            <Link href="#festive" className="text-sm hover:text-black transition-colors duration-300">{t("festive")}</Link>
            <Link href="#wedding" className="text-sm hover:text-black transition-colors duration-300">{t("wedding")}</Link>
            <Link href="#everyday" className="text-sm hover:text-black transition-colors duration-300">{t("everyday")}</Link>
            <Link href="#bespoke" className="text-sm hover:text-black transition-colors duration-300">{t("bespoke")}</Link>
          </div>

          {/* Atelier */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-black text-xs tracking-[0.2em] uppercase font-semibold mb-4">{t("atelier")}</h4>
            <Link href="#about" className="text-sm hover:text-black transition-colors duration-300">{t("ourStory")}</Link>
            <Link href="#craftsmanship" className="text-sm hover:text-black transition-colors duration-300">{t("craftsmanship")}</Link>
            <Link href="#care" className="text-sm hover:text-black transition-colors duration-300">{t("garmentCare")}</Link>
            <Link href="/en/contact" className="text-sm hover:text-black transition-colors duration-300">{t("contactUs")}</Link>
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
              <button type="button" className="text-xs uppercase tracking-[0.2em] text-black hover:text-black/90 transition-colors">
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
