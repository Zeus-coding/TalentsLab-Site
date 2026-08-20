import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowRight, ChevronUp } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { LogoWatermark } from "@/components/site/LogoWatermark";
import { NewsCover } from "@/components/site/NewsCover";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { NEWS_ARTICLES, type NewsArticle } from "@/lib/news";
import { socialMeta } from "@/lib/seo";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: socialMeta({
      title: "News — TALENTS LAB Esports",
      description: "The latest updates, results and announcements from the TALENTS LAB roster.",
      path: "/news",
    }),
  }),
  component: NewsPage,
});

// L'elenco degli articoli (e le relative copertine) vive in src/lib/news.ts,
// condiviso con la sezione news della home: qui arrivano già ordinati dal più
// recente al più vecchio.
const ARTICLES = NEWS_ARTICLES;

// Testo "pulito" per l'anteprima troncata (rimuove markdown e spazi multipli).
function previewText(content: string) {
  return content.replace(/\*\*/g, "").replace(/\s+/g, " ").trim();
}

function renderContent(content: string) {
  return content.split("\n").map((line, i) => {
    if (line.trim().startsWith("**"))
      return (
        <p key={i} className="font-semibold text-foreground my-3">
          {line.replace(/\*\*/g, "")}
        </p>
      );
    if (line.trim().startsWith("-"))
      return (
        <p key={i} className="ml-4 my-1">
          {line.trim()}
        </p>
      );
    if (line.trim())
      return (
        <p key={i} className="my-3 whitespace-normal break-words text-justify leading-relaxed">
          {line.trim()}
        </p>
      );
    return null;
  });
}

function ArticleCard({ article, divider }: { article: NewsArticle; divider: boolean }) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const content = t(article.contentKey);

  return (
    <article className={`pb-16 ${divider ? "border-b border-border" : ""}`}>
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-2 py-1 text-[10px] uppercase tracking-widest bg-primary text-primary-foreground font-bold">
              {t(article.tagKey)}
            </span>
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              {t(article.dateKey)}
            </span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl mb-4 leading-tight">
            {t(article.titleKey)}
          </h2>
          <p className="text-sm text-muted-foreground uppercase tracking-wider mb-6">
            {t("newsPage.categoryPrefix")} {t(article.categoryKey)}
          </p>

          {open ? (
            <>
              <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed">
                {renderContent(content)}
              </div>
              <button
                onClick={() => setOpen(false)}
                className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-bold hover:gap-3 transition-all"
              >
                {t("newsPage.close")} <ChevronUp size={14} />
              </button>
            </>
          ) : (
            <>
              <p className="text-muted-foreground leading-relaxed line-clamp-3 whitespace-normal break-words text-justify">
                {previewText(content)}
              </p>
              <button
                onClick={() => setOpen(true)}
                className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-bold hover:gap-3 transition-all"
              >
                {t("newsPage.readMore")} <ArrowRight size={14} />
              </button>
            </>
          )}
        </div>
        <div className="lg:col-span-1">
          <NewsCover
            src={article.image}
            alt={t(article.titleKey)}
            className="aspect-[3/4] border border-border"
          />
        </div>
      </div>
    </article>
  );
}

function NewsPage() {
  const { t } = useTranslation();

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative py-24 sm:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
        </div>
        <LogoWatermark />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <ScrollReveal className="text-center max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">
              {t("newsPage.heroLabel")}
            </p>
            <h1 className="font-display font-bold text-5xl sm:text-7xl md:text-8xl uppercase leading-tight">
              {t("newsPage.heroTitle")} <br className="hidden sm:block" />
              <span className="text-primary text-glow-red">{t("newsPage.heroTitleAccent")}</span>
            </h1>
            <p className="mt-8 text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("newsPage.heroDescription")}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ARTICLES */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="space-y-16">
            {ARTICLES.map((article, idx) => (
              <ScrollReveal key={article.id} delay={idx * 0.1}>
                <ArticleCard article={article} divider={idx < ARTICLES.length - 1} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
