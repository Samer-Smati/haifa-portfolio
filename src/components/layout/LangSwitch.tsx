"use client";

import { localeLabels, type Locale } from "@/i18n";
import { useLocale } from "@/context/LocaleProvider";

export function LangSwitch() {
  const { locale, setLocale } = useLocale();

  return (
    <div
      className="flex items-center rounded-full border border-white/10 bg-white/5 p-0.5"
      role="group"
      aria-label="Language"
    >
      {(["en", "fr"] as Locale[]).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
            locale === code
              ? "bg-blue-600 text-white shadow-sm"
              : "text-zinc-400 hover:text-white"
          }`}
          aria-pressed={locale === code}
        >
          {localeLabels[code]}
        </button>
      ))}
    </div>
  );
}
