import { getRequestConfig } from "next-intl/server";

const locales = ["en", "fr", "es", "hi", "ar", "de", "it", "ja", "zh", "pt"];

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Validate locale, fall back to English
  if (!locale || !locales.includes(locale)) {
    locale = "en";
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
