import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { SiteLayout } from "@/components/site/SiteLayout";
import { LogoWatermark } from "@/components/site/LogoWatermark";

export const Route = createFileRoute("/termini")({
  head: () => ({
    meta: [
      { title: "Termini e Condizioni — TALENTS LAB" },
      {
        name: "description",
        content: "Termini di utilizzo del sito TALENTS LAB e condizioni generali di vendita per il futuro e-commerce.",
      },
    ],
  }),
  component: TerminiPage,
});

function TerminiPage() {
  const { t } = useTranslation();
  const sections = t("legal.terms.sections", { returnObjects: true }) as Array<{ heading: string; paragraphs: string[] }>;

  return (
    <SiteLayout>
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background" />
        <LogoWatermark />
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">{t("footer.terms")}</p>
            <h1 className="font-display font-bold text-4xl sm:text-6xl uppercase">{t("legal.terms.pageTitle")}</h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              {t("legal.terms.pageDescription")}
            </p>
          </div>

          <div className="space-y-10 text-sm text-muted-foreground leading-relaxed">
            {sections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h2 className="font-semibold text-2xl text-foreground mb-4">{section.heading}</h2>
                {section.paragraphs.map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex}>{paragraph}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
