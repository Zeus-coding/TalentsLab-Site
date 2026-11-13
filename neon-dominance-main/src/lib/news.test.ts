import { describe, expect, it } from "vitest";

import { NEWS_ARTICLES, getLatestNews } from "./news";

describe("news", () => {
  it("sono ordinate dalla più recente alla più vecchia", () => {
    const dates = NEWS_ARTICLES.map((article) => article.publishedAt);
    expect(dates).toEqual([...dates].sort().reverse());
  });

  it("hanno date valide nel formato AAAA-MM-GG e id tutti diversi", () => {
    for (const article of NEWS_ARTICLES) {
      expect(article.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(Date.parse(article.publishedAt))).toBe(false);
    }
    const ids = NEWS_ARTICLES.map((article) => article.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("getLatestNews restituisce solo le N più recenti", () => {
    expect(getLatestNews(2)).toEqual(NEWS_ARTICLES.slice(0, 2));
    expect(getLatestNews(0)).toEqual([]);
  });
});
