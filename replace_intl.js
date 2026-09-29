const fs = require('fs');
const files = [
  'app/components/ContactForm.tsx',
  'app/components/HeroVideo.tsx',
  'app/components/ProductShowcase.tsx',
  'app/components/RoyalGateway.tsx',
  'app/components/ShopTheLook.tsx',
  'app/components/ProductDetails.tsx',
  'app/components/FeaturedCarousel.tsx',
  'app/components/DigitalShowroom.tsx',
  'app/components/EditorialHome.tsx',
  'app/components/CheckoutClient.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  if (content.includes('import { useLocale } from "next-intl";') || content.includes("import { useLocale } from 'next-intl';")) {
    content = content.replace(/import \{ useLocale \} from ["']next-intl["'];/, 'import { useParams } from "next/navigation";');
    content = content.replace(/const locale = useLocale\(\);/g, 'const locale = useParams().lang as string;');
  }

  if (content.includes('import { useTranslations, useLocale } from "next-intl";')) {
    content = content.replace('import { useTranslations, useLocale } from "next-intl";', 'import { useParams } from "next/navigation";\nimport { useTranslation } from "../i18n/client";');
    content = content.replace(/const locale = useLocale\(\);/g, 'const locale = useParams().lang as string;');
    content = content.replace(/const t = useTranslations\((.*?)\);/g, 'const { t } = useTranslation(locale, $1);');
  }

  if (content.includes('import { useTranslations } from "next-intl";')) {
    content = content.replace('import { useTranslations } from "next-intl";', 'import { useParams } from "next/navigation";\nimport { useTranslation } from "../i18n/client";');
    content = content.replace(/const t = useTranslations\((.*?)\);/g, 'const locale = useParams().lang as string;\n  const { t } = useTranslation(locale, $1);');
  }

  fs.writeFileSync(file, content);
});
console.log('Replaced in components');
