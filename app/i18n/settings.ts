export const fallbackLng = 'en';
export const languages = ["en", "fr", "es", "hi", "ar", "de", "it", "ja", "zh", "pt"];
export const defaultNS = 'translation';

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns
  };
}
