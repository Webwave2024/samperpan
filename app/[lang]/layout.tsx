import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "../globals.css";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { SmoothScroll } from "../components/SmoothScroll";
import { ThemeProvider } from "../components/ThemeProvider";
import { CurrencyProvider } from "../context/CurrencyContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Premium Suits, Kurtis & Ethnic Luxury Wear | Sidhant",
  description: "Discover Sidhant’s handcrafted suits, kurtis and ethnic luxury wear, crafted with fine fabrics, intricate detailing and timeless Indian artistry.",
  icons: "/Untitled-design-18.webp",
};

export default async function RootLayout(props: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { children } = props;
  const { lang } = await props.params;

  return (
    <html
      lang={lang}
      dir={lang === "ar" ? "rtl" : "ltr"}
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-[#ffffff] text-black dark:bg-[#0d0d0d] dark:text-white overflow-x-hidden overflow-y-auto transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <CurrencyProvider>
              <SmoothScroll>
                <Header lang={lang} />
                <main className="flex-grow">
                  {children}
                </main>
                <Footer lang={lang} />
              </SmoothScroll>
          </CurrencyProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
