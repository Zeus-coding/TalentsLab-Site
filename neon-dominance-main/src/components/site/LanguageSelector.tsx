import type { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

import { DEFAULT_LANGUAGE } from "@/lib/i18n";

const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "it", label: "IT" },
  { code: "es", label: "ES" },
  { code: "fr", label: "FR" },
];

export function LanguageSelector() {
  const { i18n, t } = useTranslation();
  // i18n.language può arrivare come "it-IT": il <select> confronta i codici
  // brevi, quindi si tiene solo la sottotag di lingua.
  const currentLanguage = (i18n.language ?? DEFAULT_LANGUAGE).split("-")[0];

  // La persistenza su localStorage e l'aggiornamento di <html lang> sono
  // gestiti dal listener "languageChanged" registrato in i18n.ts: qui basta
  // cambiare lingua.
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    void i18n.changeLanguage(event.target.value);
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="language-select" className="sr-only">
        {t("navbar.language")}
      </label>
      <select
        id="language-select"
        value={currentLanguage}
        onChange={handleChange}
        className="rounded-full border border-border bg-card/90 px-3 py-2 text-xs uppercase tracking-[0.3em] text-foreground transition hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
      >
        {LANGUAGES.map((language) => (
          <option key={language.code} value={language.code}>
            {language.label}
          </option>
        ))}
      </select>
    </div>
  );
}
