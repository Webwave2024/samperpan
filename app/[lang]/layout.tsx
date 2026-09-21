import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "../globals.css";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { SmoothScroll } from "../components/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SIDHANT — Premium Kurtis & Suits",
  description: "Elegant ethnic wear for every occasion",
};

export default async function RootLayout(props: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { children } = props;
  const { lang } = await props.params;

  // Providing all messages to the client side
  const messages = await getMessages();

  return (
    <html
      lang={lang}
      dir={lang === "ar" ? "rtl" : "ltr"}
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0d0d0d] text-white overflow-x-hidden">
        <NextIntlClientProvider messages={messages}>
          <SmoothScroll>
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
