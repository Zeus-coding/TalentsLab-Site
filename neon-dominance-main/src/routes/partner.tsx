import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ArrowRight, Users, TrendingUp, Heart } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { LogoWatermark } from "@/components/site/LogoWatermark";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { socialMeta } from "@/lib/seo";

export const Route = createFileRoute("/partner")({
  head: () => ({
    meta: socialMeta({
      title: "Partner & Sponsorship — TALENTS LAB Esports",
      description:
        "Partner with TALENTS LAB Esports and reach an engaged, fast-growing competitive gaming community.",
      path: "/partner",
    }),
  }),
  component: PartnerPage,
});

const METRICS = [
  {
    valueKey: "partnerPage.metrics.0.value",
    labelKey: "partnerPage.metrics.0.label",
    icon: TrendingUp,
  },
  { valueKey: "partnerPage.metrics.1.value", labelKey: "partnerPage.metrics.1.label", icon: Heart },
  { valueKey: "partnerPage.metrics.2.value", labelKey: "partnerPage.metrics.2.label", icon: Users },
];

const BENEFITS = [
  {
    titleKey: "partnerPage.benefits.0.title",
    descriptionKey: "partnerPage.benefits.0.description",
  },
  {
    titleKey: "partnerPage.benefits.1.title",
    descriptionKey: "partnerPage.benefits.1.description",
  },
  {
    titleKey: "partnerPage.benefits.2.title",
    descriptionKey: "partnerPage.benefits.2.description",
  },
  {
    titleKey: "partnerPage.benefits.3.title",
    descriptionKey: "partnerPage.benefits.3.description",
  },
];

function PartnerPage() {
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
              {t("partnerPage.heroLabel")}
            </p>
            <h1 className="font-display font-bold text-5xl sm:text-7xl md:text-8xl uppercase leading-tight">
              {t("partnerPage.heroTitle")} <br className="hidden sm:block" />
              <span className="text-primary text-glow-red">{t("partnerPage.heroTitleAccent")}</span>
            </h1>
            <p className="mt-8 text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("partnerPage.heroDescription")}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* METRICS */}
      <section className="py-20 sm:py-28 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {METRICS.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <ScrollReveal key={metric.valueKey} delay={index * 0.1} className="text-center">
                  <div className="inline-block p-4 bg-primary/10 border border-primary/30 rounded mb-4">
                    <Icon size={32} className="text-primary" />
                  </div>
                  <div className="font-display font-bold text-5xl sm:text-6xl text-primary mb-2">
                    {t(metric.valueKey)}
                  </div>
                  <p className="text-muted-foreground uppercase tracking-wider text-sm">
                    {t(metric.labelKey)}
                  </p>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY PARTNER */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <ScrollReveal className="mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">
              {t("partnerPage.opportunitiesLabel")}
            </p>
            <h2 className="font-display font-bold text-4xl sm:text-5xl uppercase">
              {t("partnerPage.opportunitiesTitle")}{" "}
              <span className="text-primary">TALENTS LAB</span>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {BENEFITS.map((benefit, index) => (
              <ScrollReveal
                key={benefit.titleKey}
                delay={index * 0.1}
                className="p-8 border border-border hover:border-primary/50 transition"
              >
                <h3 className="font-display font-bold text-xl mb-3">{t(benefit.titleKey)}</h3>
                <p className="text-muted-foreground leading-relaxed">{t(benefit.descriptionKey)}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <ScrollReveal className="border border-border p-12 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">
              {t("partnerPage.ctaLabel")}
            </p>
            <h2 className="font-display font-bold text-4xl sm:text-5xl uppercase mb-6">
              <span className="text-primary">{t("partnerPage.ctaTitle")}</span>{" "}
              {t("partnerPage.ctaTitleSuffix")}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">{t("partnerPage.ctaDescription")}</p>
            <a
              href="mailto:Partnerships@talentslab.gg?subject=Proposta di Partnership - TALENTS LAB"
              className="btn-neon inline-flex items-center gap-2 px-8 py-4 text-sm"
            >
              {t("partnerPage.ctaButton")} <ArrowRight size={16} />
            </a>
          </ScrollReveal>
        </div>
      </section>
    </SiteLayout>
  );
}
