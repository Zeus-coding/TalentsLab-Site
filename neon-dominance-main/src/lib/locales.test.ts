import { describe, expect, it } from "vitest";

import en from "../locales/en.json";
import es from "../locales/es.json";
import fr from "../locales/fr.json";
import itLocale from "../locales/it.json";
import { NEWS_ARTICLES } from "./news";

// Elenca tutte le chiavi di un file di traduzione, es. "nav.home".
function keys(value: unknown, prefix = ""): string[] {
  if (value === null || typeof value !== "object") return [prefix];
  return Object.entries(value).flatMap(([key, child]) =>
    keys(child, prefix ? `${prefix}.${key}` : key),
  );
}

const reference = keys(en).sort();

describe("traduzioni", () => {
  it.each([
    ["it", itLocale],
    ["es", es],
    ["fr", fr],
  ])("%s.json ha esattamente le stesse chiavi di en.json", (_lang, file) => {
    const current = keys(file).sort();
    expect(
      current.filter((key) => !reference.includes(key)),
      "chiavi in più",
    ).toEqual([]);
    expect(
      reference.filter((key) => !current.includes(key)),
      "chiavi mancanti",
    ).toEqual([]);
  });

  it.each([
    ["en", en],
    ["it", itLocale],
    ["es", es],
    ["fr", fr],
  ])("%s.json ha un testo per ogni news", (_lang, file) => {
    expect(file.newsPage.articles).toHaveLength(NEWS_ARTICLES.length);
  });
});
