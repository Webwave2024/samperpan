import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // Supported locales
  locales: ["en", "fr", "es", "hi", "ar", "de", "it", "ja", "zh", "pt"],
  // Default locale
  defaultLocale: "en",
  // Don't add locale prefix for default locale (optional: remove to always show /en/)
  localePrefix: "always",
});

export const config = {
  // Match all paths except static files, api routes, and next internals
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
