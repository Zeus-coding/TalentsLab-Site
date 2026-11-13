/**
 * FONTE UNICA DELLE NEWS DEL SITO.
 *
 * Sia la pagina /news (src/routes/news.tsx) sia la sezione "Latest News" della
 * home (src/routes/index.tsx) leggono da questo file: così i due elenchi non
 * possono più divergere.
 *
 * ⚠️ L'ORDINE di `ARTICLE_SOURCES` deve combaciare ESATTAMENTE con l'ordine
 * dell'array `newsPage.articles` nei file di traduzione (src/locales/*.json),
 * perché le chiavi i18n vengono generate a partire dall'indice.
 * L'ordinamento cronologico visibile è invece calcolato da `publishedAt`.
 */

export type NewsArticle = {
  /** Slug stabile, usato come key React. */
  id: string;
  /** Data ISO (YYYY-MM-DD) usata SOLO per ordinare: il testo mostrato a schermo
   *  arriva sempre dalle traduzioni (`dateKey`), lingua per lingua. */
  publishedAt: string;
  /** Copertina dell'articolo (file in "public/news/"). */
  image: string;
  tagKey: string;
  titleKey: string;
  dateKey: string;
  categoryKey: string;
  contentKey: string;
  excerptKey: string;
};

/*
  📁 COPERTINE DELLE NEWS
  Incolla le immagini nella cartella "public/news/" alla root del progetto
  rinominandole ESATTAMENTE come indicato qui sotto.
  Formato consigliato: WebP (pesa circa il 90% in meno di un PNG; si converte
  gratis con squoosh.app). Anche JPEG va bene.
  Finché un file non è presente, la card mostra automaticamente un placeholder
  con il logo (nessuna immagine rotta a schermo).
*/
const ARTICLE_SOURCES = [
  {
    id: "site-launch",
    publishedAt: "2026-08-12",
    // → public/news/site-launch.jpeg
    image: "/news/site-launch.jpeg",
  },
  {
    id: "august-monthly-finals-podium",
    publishedAt: "2026-08-10",
    // → public/news/monthly-finals-podium.jpeg
    image: "/news/monthly-finals-podium.jpeg",
  },
  {
    id: "monthly-qualifier",
    publishedAt: "2026-08-02",
    // → public/news/monthly-qualifier.jpeg
    image: "/news/monthly-qualifier.jpeg",
  },
  {
    id: "brawl-ball-league-pass",
    publishedAt: "2026-06-29",
    // → public/news/brawl-ball-league.jpeg
    image: "/news/brawl-ball-league.jpeg",
  },
  {
    id: "brawl-stars-roster",
    publishedAt: "2026-06-28",
    // → public/news/roster.webp (già presente)
    image: "/news/roster.webp",
  },
];

/** Tutti gli articoli, dal più recente al più vecchio. */
export const NEWS_ARTICLES: NewsArticle[] = ARTICLE_SOURCES.map((source, index) => ({
  ...source,
  tagKey: `newsPage.articles.${index}.tag`,
  titleKey: `newsPage.articles.${index}.title`,
  dateKey: `newsPage.articles.${index}.date`,
  categoryKey: `newsPage.articles.${index}.category`,
  contentKey: `newsPage.articles.${index}.content`,
  excerptKey: `newsPage.articles.${index}.excerpt`,
})).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

/**
 * Le N news più recenti in ordine cronologico (dalla più nuova).
 * La home usa `getLatestNews(2)`: mostra ESCLUSIVAMENTE le due più recenti,
 * qualunque sia l'ordine in cui gli articoli vengono aggiunti sopra.
 */
export function getLatestNews(count: number): NewsArticle[] {
  return NEWS_ARTICLES.slice(0, count);
}
