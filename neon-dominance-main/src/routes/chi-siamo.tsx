import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { SiteLayout } from "@/components/site/SiteLayout";
import { LogoWatermark } from "@/components/site/LogoWatermark";
import { ScrollReveal } from "@/components/site/ScrollReveal";

export const Route = createFileRoute("/chi-siamo")({
  head: () => ({
    meta: [
      { title: "Chi Siamo — TALENTS LAB Esports" },
      { name: "description", content: "La storia e la visione dietro TALENTS LAB Esports" },
    ],
  }),
  component: ChiSiamoPage,
});

function ChiSiamoPage() {
  const { t } = useTranslation();

  const values = Array.from({ length: 6 }, (_, index) => ({
    title: t(`aboutPage.values.${index}.title`),
    description: t(`aboutPage.values.${index}.description`),
  }));

  const storyParagraphs = Array.from({ length: 4 }, (_, index) =>
    t(`aboutPage.storyParagraphs.${index}`),
  );
  const futureItems = Array.from({ length: 7 }, (_, index) => t(`aboutPage.futureItems.${index}`));

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
              {t("aboutPage.heroLabel")}
            </p>
            <h1 className="font-display font-bold text-5xl sm:text-7xl md:text-8xl uppercase leading-tight">
              {t("aboutPage.title")} <br className="hidden sm:block" />
              <span className="text-primary text-glow-red">TALENTS LAB</span>
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="space-y-12">
            {/* MISSION */}
            <ScrollReveal className="border-l-4 border-primary pl-8">
              <h2 className="font-display font-bold text-3xl sm:text-4xl mb-4">
                {t("aboutPage.missionTitle")}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t("aboutPage.missionText")}
              </p>
            </ScrollReveal>

            {/* VISION */}
            <ScrollReveal className="border-l-4 border-primary pl-8">
              <h2 className="font-display font-bold text-3xl sm:text-4xl mb-4">
                {t("aboutPage.visionTitle")}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t("aboutPage.visionText")}
              </p>
            </ScrollReveal>

            {/* VALUES */}
            <div>
              <ScrollReveal>
                <h2 className="font-display font-bold text-3xl sm:text-4xl mb-8">
                  {t("aboutPage.valuesTitle")}
                </h2>
              </ScrollReveal>
              <div className="grid md:grid-cols-2 gap-8">
                {values.map((value, index) => (
                  <ScrollReveal
                    key={value.title}
                    delay={index * 0.1}
                    className="p-6 border border-border hover:border-primary/50 transition"
                  >
                    <h3 className="font-display font-bold text-xl text-primary mb-3">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* STORY */}
            <ScrollReveal className="py-12 border-y border-border">
              <h2 className="font-display font-bold text-3xl sm:text-4xl mb-6">
                {t("aboutPage.storyTitle")}{" "}
                <span className="text-primary">{t("aboutPage.storyTitleAccent")}</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                {storyParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </ScrollReveal>

            {/* FUTURE */}
            <ScrollReveal>
              <h2 className="font-display font-bold text-3xl sm:text-4xl mb-6">
                {t("aboutPage.futureTitle")}{" "}
                <span className="text-primary">{t("aboutPage.futureTitleAccent")}</span>
              </h2>
              <ul className="space-y-4 text-muted-foreground">
                {futureItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-lg leading-relaxed">
                    <span className="text-primary mt-1">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            {/* CLOSING */}
            <ScrollReveal className="py-12 bg-card/50 border border-border p-8 text-center">
              <p className="text-lg leading-relaxed text-foreground mb-4">
                {t("aboutPage.closingTitle")}
              </p>
              <p className="text-muted-foreground">{t("aboutPage.closingText")}</p>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
