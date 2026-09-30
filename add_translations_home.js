const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'app/components/EditorialHome.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Add import
if (!content.includes('useTranslation')) {
  content = content.replace('import { ScrollTrigger } from "gsap/ScrollTrigger";', 'import { ScrollTrigger } from "gsap/ScrollTrigger";\nimport { useTranslation } from "../i18n/client";');
}

// Add t function to LuxuryExperience
content = content.replace(
  'export function LuxuryExperience() {\n  const locale = useParams().lang as string;',
  'export function LuxuryExperience() {\n  const locale = useParams().lang as string;\n  const { t } = useTranslation(locale, "translation");'
);

// Add t function to JaliPartnerSection
content = content.replace(
  'function JaliPartnerSection({ locale }: { locale: string }) {\n  const sectionRef = useRef<HTMLElement>(null);',
  'function JaliPartnerSection({ locale }: { locale: string }) {\n  const { t } = useTranslation(locale, "translation");\n  const sectionRef = useRef<HTMLElement>(null);'
);

// Replace strings in JaliPartnerSection
content = content.replace('Atelier Sync: Active', '{t("editorial.atelierSync", { defaultValue: "Atelier Sync: Active" })}');
content = content.replace('Craftsmanship Status: Seamless', '{t("editorial.craftsmanshipStatus", { defaultValue: "Craftsmanship Status: Seamless" })}');
content = content.replace('Curated Retail', '{t("editorial.curatedRetail", { defaultValue: "Curated Retail" })}');
content = content.replace('>Heritage Partners<', '>{t("editorial.heritagePartners", { defaultValue: "Heritage Partners" })}<');
content = content.replace('>Couture Access<', '>{t("editorial.coutureAccess", { defaultValue: "Couture Access" })}<');
content = content.replace('Exclusive access to our handcrafted collections. Designed for boutique retailers who appreciate meticulous attention to detail and traditional artistry.', '{t("editorial.coutureAccessDesc", { defaultValue: "Exclusive access to our handcrafted collections. Designed for boutique retailers who appreciate meticulous attention to detail and traditional artistry." })}');
content = content.replace('>Explore Partnership<', '>{t("editorial.explorePartnership", { defaultValue: "Explore Partnership" })}<');
content = content.replace('Enterprise Partners', '{t("editorial.enterprisePartners", { defaultValue: "Enterprise Partners" })}');
content = content.replace('>Artisanal Wholesale<', '>{t("editorial.artisanalWholesale", { defaultValue: "Artisanal Wholesale" })}<');
content = content.replace('>Global Access<', '>{t("editorial.globalAccess", { defaultValue: "Global Access" })}<');
content = content.replace('Scale your offerings with our high-volume production capabilities. Maintaining uncompromising quality and heritage craftsmanship for global distribution.', '{t("editorial.globalAccessDesc", { defaultValue: "Scale your offerings with our high-volume production capabilities. Maintaining uncompromising quality and heritage craftsmanship for global distribution." })}');
content = content.replace('>Join Global Network<', '>{t("editorial.joinNetwork", { defaultValue: "Join Global Network" })}<');


// Replace strings in LuxuryExperience
content = content.replace('SS 2025 — Suits & Ethnic Luxury', '{t("editorial.heroMeta", { defaultValue: "SS 2025 — Suits & Ethnic Luxury" })}');
content = content.replace('SIDHANT', '{t("editorial.heroTitle1", { defaultValue: "SIDHANT" })}');
content = content.replace('Heritage & Modernity', '{t("editorial.heroTitle2", { defaultValue: "Heritage & Modernity" })}');
content = content.replace('A legacy of craftsmanship meets contemporary tailoring. Redefining men\'s luxury occasion wear with impeccable precision and regal elegance.', '{t("editorial.heroSubtitle", { defaultValue: "A legacy of craftsmanship meets contemporary tailoring. Redefining men\'s luxury occasion wear with impeccable precision and regal elegance." })}');
content = content.replace('>Signature<', '>{t("editorial.signature", { defaultValue: "Signature" })}<');
content = content.replace('>Collection<', '>{t("editorial.collection", { defaultValue: "Collection" })}<');
content = content.replace('>Festive 2025<', '>{t("editorial.festive", { defaultValue: "Festive 2025" })}<');
content = content.replace('>View Complete Collection<', '>{t("editorial.viewCollection", { defaultValue: "View Complete Collection" })}<');

content = content.replace('Golden Bridal Lehenga', '{t("editorial.products.goldenBridal", { defaultValue: "Golden Bridal Lehenga" })}');
content = content.replace('Bridal Heirloom', '{t("editorial.products.goldenBridalLabel", { defaultValue: "Bridal Heirloom" })}');
content = content.replace('Heritage Royal Sherwani', '{t("editorial.products.royalSherwani", { defaultValue: "Heritage Royal Sherwani" })}');
content = content.replace('The Nawab', '{t("editorial.products.royalSherwaniLabel", { defaultValue: "The Nawab" })}');
content = content.replace('Artisan Embroidered Lehenga', '{t("editorial.products.artisanLehenga", { defaultValue: "Artisan Embroidered Lehenga" })}');
content = content.replace('The Rosette', '{t("editorial.products.artisanLehengaLabel", { defaultValue: "The Rosette" })}');
content = content.replace('Classic Kurta', '{t("editorial.products.classicKurta", { defaultValue: "Classic Kurta" })}');
content = content.replace('Everyday Elegance', '{t("editorial.products.classicKurtaLabel", { defaultValue: "Everyday Elegance" })}');
content = content.replace('Emerald Suit', '{t("editorial.products.emeraldSuit", { defaultValue: "Emerald Suit" })}');
content = content.replace('Modern Classic', '{t("editorial.products.emeraldSuitLabel", { defaultValue: "Modern Classic" })}');


fs.writeFileSync(filePath, content);
console.log('Updated EditorialHome.tsx with translations');
