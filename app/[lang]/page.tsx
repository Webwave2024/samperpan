import { useTranslations } from "next-intl";
import { HeroVideo } from "../components/HeroVideo";
import { FeaturedCarousel } from "../components/FeaturedCarousel";
import { ProductShowcase } from "../components/ProductShowcase";
import { ShopTheLook } from "../components/ShopTheLook";
import { HomePageClient } from "../components/HomePageClient";

export default function Home() {
  const t = useTranslations("hero");

  return (
    <div className="w-full min-h-screen bg-[#ffffff]">
      {/* 0. Hero Video */}
      <HeroVideo />

      {/* 1. Featured Carousel */}
      <FeaturedCarousel />

      {/* 2. Shop The Look */}
      <ShopTheLook />

      {/* 3. Products */}
      <ProductShowcase />

      {/* Main Content with State */}
      <HomePageClient />
    </div>
  );
}
