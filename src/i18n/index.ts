import { en } from "./en";
import { fr } from "./fr";
import type { Locale, SiteContent } from "./types";

export type { Locale, SiteContent };

export const locales: Locale[] = ["en", "fr"];

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  fr: "FR",
};

const contentByLocale: Record<Locale, SiteContent> = {
  en,
  fr,
};

export function getContent(locale: Locale): SiteContent {
  return contentByLocale[locale];
}

export const defaultLocale: Locale = "en";

export const LOCALE_STORAGE_KEY = "haifa-portfolio-locale";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
