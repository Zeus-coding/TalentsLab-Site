import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ShoppingBag, Loader2 } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { LogoWatermark } from "@/components/site/LogoWatermark";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { useNewsletterForm } from "@/hooks/use-newsletter-form";
import { socialMeta } from "@/lib/seo";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: socialMeta({
      title: "Shop — TALENTS LAB Esports",
      description: "TALENTS LAB official merchandise — Collection 2026. Jerseys and team gear.",
      path: "/shop",
    }),
  }),
  component: ShopPage,
});

// ─── PRODOTTI IN ANTEPRIMA (solo informativi, nessun e-commerce attivo) ───────
// Sono mostrati SOLO due prodotti. I nomi sono tradotti dai file in src/locales/
// (chiavi shopPage.previewCards.0/1.name); le immagini sono percorsi locali.
//
// 📁 FOTO DA INSERIRE: crea la cartella "public/shop/" nella root del progetto
//    e incolla lì le due foto rinominandole ESATTAMENTE come indicato:
//      • Maglietta ufficiale (Jersey) → public/shop/jersey.webp
//      • Finger sleeves              → public/shop/finger-sleeves.webp
const PREVIEW_PRODUCTS = [
  { nameKey: "shopPage.previewCards.0.name", image: "/shop/jersey.webp" },
  { nameKey: "shopPage.previewCards.1.name", image: "/shop/finger-sleeves.webp" },
];

function ShopPage() {
  const { t } = useTranslation();
  const { email, setEmail, status, message, handleSubscribe } = useNewsletterForm("shop");

  const previewCards = PREVIEW_PRODUCTS.map((product) => ({
    name: t(product.nameKey),
    image: product.image,
  }));

  const infoCards = Array.from({ length: 2 }, (_, index) => ({
    title: t(`shopPage.infoCards.${index}.title`),
    desc: t(`shopPage.infoCards.${index}.desc`),
  }));

  return (
    <SiteLayout>
      {/* HERO + BADGE */}
      {/* overflow-hidden è OBBLIGATORIO qui: <LogoWatermark /> è larga il 200%
          dello schermo (w-[200%]) e centrata, quindi sporge di ~195px per lato
          su un telefono. Senza questo, la pagina diventa scrollabile in
          orizzontale e tutto sembra "troppo largo" e tagliato.
          Le altre pagine (about, news, partner, teams) lo hanno già. */}
      <section className="relative flex items-center justify-center bg-background overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 from-background to-primary/5" />
        </div>
        <LogoWatermark />

        {/* FLOATING BADGE - FIXED
            MOBILE: carattere e padding ridotti al minimo. max-w-[calc(100vw-2rem)]
            è la rete di sicurezza: qualunque sia la lunghezza della scritta
            tradotta, il badge non può mai superare la larghezza dello schermo
            (2rem = i 16px di margine a destra + 16px di respiro a sinistra).
            DA md IN SU: torna alle dimensioni originali. */}
        <div className="fixed top-24 right-4 sm:right-8 z-40 pointer-events-none max-w-[calc(100vw-2rem)]">
          <div className="relative animate-pulse">
            <div className="absolute inset-0 bg-primary/20 blur-lg" />
            <div className="relative px-3 py-1 md:px-6 md:py-3 bg-primary border-2 border-primary/50 text-primary-foreground text-[10px] md:text-sm uppercase tracking-widest font-bold text-center leading-tight">
              ★ {t("shopPage.heroBadge")} ★
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        {/* pt-16 su mobile: il badge "Coming Soon" è fixed a top-24 (96px) e
            senza questo spazio finiva esattamente sopra l'icona della borsa.
            Su PC il badge sta di lato e lo spazio extra non serve. */}
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 pt-16 md:pt-0 text-center">
          <ScrollReveal>
            <div className="inline-block p-6 bg-primary/10 border border-primary/30 rounded-lg mb-8">
              <ShoppingBag size={48} className="text-primary" />
            </div>

            <h1 className="font-display font-bold text-5xl sm:text-7xl md:text-8xl uppercase leading-tight">
              TALENTS LAB{" "}
              <span className="text-primary text-glow-red">{t("shopPage.heroTitleAccent")}</span>
            </h1>

            <p className="mt-8 text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t("shopPage.heroDescription")}
            </p>
          </ScrollReveal>

          {/* PREVIEW CARDS — solo anteprima, nessun prezzo o acquisto.
              Ogni card compare con un piccolo ritardo crescente (effetto a cascata). */}
          <div className="mt-16 grid sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {previewCards.map((item, index) => (
              <ScrollReveal
                key={item.name}
                delay={index * 0.1}
                className="group overflow-hidden border border-border hover:border-primary/50 transition"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-card/50">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  {/* Badge elegante "Presto Disponibile" */}
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 bg-primary/90 backdrop-blur-sm text-primary-foreground text-[10px] uppercase tracking-[0.25em] font-bold">
                    ★ {t("shopPage.previewCardBadge")}
                  </span>
                </div>
                <div className="p-6 bg-background border-t border-border/50 text-center h-28 flex flex-col justify-center items-center">
                  <p className="font-display font-bold text-xl uppercase">{item.name}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* CTA SECTION — avvisa quando il drop è disponibile.
              Le email finiscono su MailerLite (source: "shop"), così sai quali
              iscritti arrivano dallo shop e quali dal footer. */}
          <ScrollReveal>
            {/* p-6 su mobile: con p-12 il riquadro rubava 96px di larghezza al
                testo, schiacciandolo contro i bordi del telefono. */}
            <div className="mt-20 p-6 md:p-12 border border-primary/50 bg-primary/5">
              <h2 className="font-display font-bold text-3xl sm:text-4xl mb-4">
                {t("shopPage.ctaTitle")}{" "}
                <span className="text-primary">{t("shopPage.ctaTitleAccent")}</span>
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                {t("shopPage.ctaDescription")}
              </p>
              {/* Campo e pulsante uno sopra l'altro fino a 768px, affiancati da PC. */}
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col md:flex-row gap-3 w-full max-w-sm mx-auto"
              >
                {/* Campo trappola anti-bot: nascosto alle persone e ai lettori di schermo, i bot lo compilano */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute -left-[9999px] h-px w-px opacity-0"
                />
                <input
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  disabled={status === "loading"}
                  placeholder={t("shopPage.emailPlaceholder")}
                  className="flex-1 bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-neon px-6 py-3 text-sm font-semibold whitespace-nowrap disabled:opacity-60 inline-flex items-center justify-center gap-2"
                >
                  {status === "loading" && <Loader2 size={14} className="animate-spin" />}
                  {t("shopPage.notifyButton")}
                </button>
              </form>
              {message && (
                <p
                  aria-live="polite"
                  className={`mt-4 text-sm ${
                    status === "success"
                      ? "text-emerald-400"
                      : status === "error"
                        ? "text-red-400"
                        : "text-muted-foreground"
                  }`}
                >
                  {message}
                </p>
              )}
            </div>
          </ScrollReveal>

          {/* INFO CARDS */}
          <div className="mt-16 grid md:grid-cols-2 gap-6">
            {infoCards.map((card, index) => (
              <ScrollReveal
                key={card.title}
                delay={index * 0.1}
                className="p-6 border border-border text-left"
              >
                <h3 className="font-display font-bold text-lg text-primary mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground">{card.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
