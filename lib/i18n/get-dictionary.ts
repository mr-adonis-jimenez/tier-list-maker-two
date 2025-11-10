import { defaultLocale, type Locale, translations } from "./translations";

export function getDictionary(locale: string) {
  if (locale in translations) {
    return translations[locale as Locale];
  }
  return translations[defaultLocale];
}
