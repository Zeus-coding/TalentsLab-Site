import i18next, { type i18n as I18nInstance } from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../locales/en.json";
import es from "../locales/es.json";
import fr from "../locales/fr.json";
import it from "../locales/it.json";

// Le traduzioni sono importate staticamente, NON lette dal disco a runtime:
// finiscono dentro il bundle e restano identiche in dev, in SSR e nella
// function serverless su Vercel, dove la cartella `src/locales` non esiste.
// Non sostituire questi import con i18next-fs-backend o con un fetch: nel
// runtime serverless non c'è un filesystem su cui appoggiarsi.
const resources = {
  en: { translation: en },
  it: { translation: it },
  es: { translation: es },
  fr: { translation: fr },
};

export const DEFAULT_LANGUAGE = "en";
export const SUPPORTED_LANGUAGES = Object.keys(resources);

const LANGUAGE_STORAGE_KEY = "i18nextLng";

function isSupportedLanguage(value: string | null): value is string {
  return value !== null && SUPPORTED_LANGUAGES.includes(value);
}

function readStoredLanguage(): string | null {
  try {
    return window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  } catch {
    // Storage negato (Safari in navigazione privata, cookie bloccati): si
    // resta sulla lingua di default invece di far esplodere il render.
    return null;
  }
}

/**
 * Inizializza l'istanza condivisa di i18next e la restituisce.
 *
 * Va chiamata usandone il valore di ritorno (vedi `__root.tsx`): un import
 * fatto solo per l'effetto collaterale — `import "../lib/i18n"` — viene
 * eliminato dal tree-shaking in build di produzione, perché il package.json
 * dichiara `sideEffects: false`. Era esattamente la causa delle chiavi grezze
 * ("NAVBAR.HOME") viste su Vercel: il modulo non arrivava mai nel bundle.
 *
 * È idempotente: la stessa function serverless serve più richieste riusando i
 * moduli già in memoria, e un secondo init() azzererebbe la lingua corrente.
 */
export function initI18n(): I18nInstance {
  if (i18next.isInitialized) {
    return i18next;
  }

  void i18next.use(initReactI18next).init({
    resources,
    // Sempre la lingua di default: server e primo render del client devono
    // produrre lo stesso HTML, altrimenti l'hydration di React va in mismatch.
    // La preferenza salvata viene riapplicata da syncLanguageWithBrowser().
    lng: DEFAULT_LANGUAGE,
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: SUPPORTED_LANGUAGES,
    ns: ["translation"],
    defaultNS: "translation",
    // Una stringa vuota non conta come traduzione valida: meglio ricadere
    // sulla lingua di default che lasciare un buco nella pagina.
    returnEmptyString: false,
    // Ultima rete di sicurezza. Se una chiave manca in tutte le lingue,
    // i18next mostrerebbe la chiave stessa ("navbar.home"), che con il
    // `uppercase` della UI diventa "NAVBAR.HOME". Mostriamo solo il segmento
    // finale, così una traduzione mancante resta comunque leggibile.
    parseMissingKeyHandler: (key: string) => key.split(".").pop() ?? key,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

  return i18next;
}

/**
 * Allinea l'istanza al browser: applica la lingua salvata e tiene aggiornato
 * `<html lang>` a ogni cambio. Da chiamare dentro un effect, quindi solo lato
 * client. Restituisce la funzione di cleanup per il listener.
 */
export function syncLanguageWithBrowser(instance: I18nInstance): () => void {
  const applyLanguage = (language: string) => {
    document.documentElement.lang = language;
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch {
      // Storage negato: la scelta vale comunque per questa sessione.
    }
  };

  const storedLanguage = readStoredLanguage();
  if (isSupportedLanguage(storedLanguage) && storedLanguage !== instance.language) {
    void instance.changeLanguage(storedLanguage);
  } else {
    document.documentElement.lang = instance.language;
  }

  instance.on("languageChanged", applyLanguage);
  return () => {
    instance.off("languageChanged", applyLanguage);
  };
}

export default i18next;
