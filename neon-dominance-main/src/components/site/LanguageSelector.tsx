import { useTranslation } from "react-i18next";

const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "it", label: "IT" },
  { code: "es", label: "ES" },
  { code: "fr", label: "FR" },
];

export function LanguageSelector() {
  const { i18n, t } = useTranslation();
  const currentLanguage = (i18n.language ?? "en").split("-")[0];

  const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLanguage = event.target.value;
    await i18n.changeLanguage(nextLanguage);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("i18nextLng", nextLanguage);
    }
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
