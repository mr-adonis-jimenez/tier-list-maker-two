// 翻译类型定义
export type LanguageType = "en" | "zh" | "fr" | "es" | "ru" | "de" | "ja";

export type TranslationValue = string;

export interface LanguageTranslations {
  [key: string]: TranslationValue;
}

export interface Translations {
  [key: string]: LanguageTranslations;
}

// 导入各语言翻译文件
import translations_de from "./de";
import translations_en from "./en";
import translations_es from "./es";
import translations_fr from "./fr";
import translations_ja from "./ja";
import translations_ru from "./ru";
import translations_zh from "./zh";

// 统一的翻译对象
export const translations: Record<LanguageType, LanguageTranslations> = {
  en: translations_en,
  zh: translations_zh,
  fr: translations_fr,
  es: translations_es,
  ru: translations_ru,
  de: translations_de,
  ja: translations_ja,
};

// 翻译函数
export function t(key: string, lang: LanguageType): string {
  const langTranslations = translations[lang];
  return langTranslations?.[key] || key;
}
