import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ArrowRight, Users } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { NewsCover } from "@/components/site/NewsCover";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { getLatestNews } from "@/lib/news";
import { socialMeta } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: socialMeta({
      description:
        "TALENTS LAB is a forward-thinking global esports organization. Discover our rosters, the latest news and partnership opportunities.",
      path: "/",
    }),
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600;700&display=swap",
      },
      // PRELOAD DELL'IMMAGINE LCP DELLA HOME.
      // Le due `media` devono rispecchiare esattamente il breakpoint del
      // <picture> nella hero: senza di esse il browser scaricherebbe TUTTE
      // E DUE le immagini (circa 2 MB ciascuna), peggiorando proprio la
      // metrica che stiamo cercando di migliorare.
      {
        rel: "preload",
        as: "image",
        href: "/hero-mobile.webp",
        media: "(max-width: 767px)",
        fetchPriority: "high",
      },
      {
        rel: "preload",
        as: "image",
        href: "/team-hero.webp",
        media: "(min-width: 768px)",
        fetchPriority: "high",
      },
    ],
  }),
  component: Home,
});

// SEZIONE NEWS DELLA HOME — REGOLA RIGIDA:
// mostra ESCLUSIVAMENTE le 2 news più recenti in ordine cronologico, prese
// dall'elenco unico di src/lib/news.ts (ordinato per data di pubblicazione).
// Oggi corrispondono a: 1) lancio del sito (12 agosto 2026)
//                       2) 3° posto alle Finali Mensili (10 agosto 2026)
// Aggiungendo una news più recente in src/lib/news.ts, la home si aggiorna da
// sola: nessuna lista da mantenere a mano qui.
const HOME_NEWS_COUNT = 2;
const NEWS = getLatestNews(HOME_NEWS_COUNT);

// Card grande di roster: mostra una foto (con fallback) e porta alla sezione
// corrispondente nella pagina /teams.
function RosterCard({
  hash,
  eyebrow,
  title,
  img,
  icon,
}: {
  hash: string;
  eyebrow: string;
  title: string;
  img?: string;
  icon?: React.ReactNode;
}) {
  const [imgOk, setImgOk] = useState(true);
  const { t } = useTranslation();

  return (
    <Link
      to="/teams"
      hash={hash}
      className="group relative h-80 sm:h-96 overflow-hidden border border-border/50 hover:border-primary/50 transition"
    >
      {img && imgOk ? (
        <img
          src={img}
          alt=""
          onError={() => setImgOk(false)}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-background to-background flex items-center justify-center">
          {icon}
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      <div className="relative z-10 h-full flex flex-col justify-end p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-primary mb-2">{eyebrow}</p>
        <h3 className="font-display font-bold text-3xl sm:text-4xl uppercase group-hover:text-primary transition">
          {title}
        </h3>
        <span className="mt-3 inline-flex items-center gap-2 text-sm uppercase tracking-widest text-primary font-bold group-hover:gap-3 transition-all">
          {t("rosters.viewRoster")} <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  );
}

function Home() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [heroImgOk, setHeroImgOk] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => setShowPreloader(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* PRELOADER / SPLASH */}
      {showPreloader && (
        <div className="preloader">
          <img src="/logo.png" alt="TALENTS LAB" className="preloader-logo h-44 sm:h-64 w-auto" />
        </div>
      )}

      <SiteLayout>
        {/* HERO — foto del team protagonista in alto, testi e pulsanti sotto */}
        <section className="relative bg-black overflow-hidden">
          {/*
            FOTO UFFICIALE DEL TEAM
            📁 DOVE SALVARE IL FILE:
               Incolla la foto nella cartella "public/" alla root del progetto
               rinominandola ESATTAMENTE: team-hero.webp
               → Percorso finale atteso dal codice: public/team-hero.webp
            💡 Consiglio: immagine PANORAMICA/orizzontale ad alta risoluzione, con
               i piedi/base già sfumati verso il nero. Viene usata come banner a
               tutta larghezza (object-cover): riempie lo schermo tagliando lo
               sfondo in eccesso, SENZA mai deformare/allungare i ragazzi.
          */}
          {/* Contenitore principale a tutta larghezza: la foto è un banner panoramico edge-to-edge */}
          <div className="relative w-full">
            {heroImgOk ? (
              <picture className="w-full h-full">
                {/* Se lo schermo è da PC o iPad (minimo 768px di larghezza), usa la foto desktop */}
                <source media="(min-width: 768px)" srcSet="/team-hero.webp" />

                {/* Se lo schermo è piccolo (telefono), usa la foto verticale */}
                {/* Immagine LCP: mai loading="lazy" qui, rinvierebbe proprio
                    il caricamento che stiamo anticipando col preload. */}
                <img
                  src="/hero-mobile.webp"
                  alt="TALENTS LAB - Team ufficiale"
                  onError={() => setHeroImgOk(false)}
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-auto min-h-[550px] md:h-[85vh] lg:h-[90vh] object-cover object-top"
                />
              </picture>
            ) : (
              // Fallback mostrato finché la foto non è presente in public/team-hero.webp
              <div className="w-full min-h-[550px] md:h-[85vh] lg:h-[90vh] bg-gradient-to-b from-primary/10 via-background to-black flex items-center justify-center">
                <img src="/logo.png" alt="TALENTS LAB" className="h-28 sm:h-44 w-auto opacity-30" />
              </div>
            )}

            {/* TESTO E PULSANTI — ancorati sul fondo scuro della foto.
                MOBILE: il blocco è compattato (font più piccolo e margini
                verticali ridotti) e spinto in basso con pb-2, così le scritte
                si appoggiano sulla sfumatura nera di hero-mobile.webp e lasciano
                liberi i volti e le maglie bianche dei ragazzi.
                DA md IN SU: dimensioni e spazi originali. */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] text-center z-10 pb-2 md:pb-6 px-4">
              <div className="inline-flex items-center gap-2 px-2 py-0.5 md:px-3 md:py-1 mb-2 md:mb-4 border border-primary/40 text-primary text-[10px] md:text-xs uppercase tracking-[0.3em]">
                <span className="w-1.5 h-1.5 bg-primary rounded-full live-pulse" />
                {t("hero.season")}
              </div>
              <h1 className="font-display font-bold text-3xl sm:text-6xl md:text-7xl leading-[0.9] uppercase">
                {t("hero.titleLine1")} <br />
                <span className="text-primary text-glow-red">{t("hero.titleLine2")}</span>
              </h1>
              <p className="mt-2 md:mt-4 max-w-2xl mx-auto text-sm sm:text-base text-muted-foreground">
                {t("hero.description")}
              </p>
              <div className="mt-4 md:mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="#rosters"
                  className="btn-neon inline-flex items-center gap-2 px-8 py-4 text-sm"
                >
                  {t("hero.rosters")} <ArrowRight size={16} />
                </a>
                <Link
                  to="/about"
                  className="btn-outline-neon px-8 py-4 text-sm uppercase tracking-wider font-semibold"
                >
                  {t("hero.about")}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* LATEST NEWS */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <ScrollReveal>
              <div className="flex items-end justify-between mb-10">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">
                    {t("news.sectionLabel")}
                  </p>
                  <h2 className="font-display font-bold text-3xl sm:text-5xl uppercase">
                    {t("news.sectionTitle")}
                  </h2>
                </div>
                <Link
                  to="/news"
                  className="hidden sm:inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition"
                >
                  {t("news.allNews")} <ArrowRight size={14} />
                </Link>
              </div>
            </ScrollReveal>
            {/* Griglia simmetrica: 1 colonna su mobile, 2 colonne affiancate da
                md in su. `items-stretch` + `h-full` tengono le due card della
                stessa altezza anche con titoli di lunghezza diversa. */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
              {NEWS.map((n, index) => (
                <ScrollReveal key={n.id} delay={index * 0.1} className="h-full">
                  <article className="news-card group flex h-full flex-col bg-card border border-border">
                    <div className="relative">
                      <NewsCover
                        src={n.image}
                        alt={t(n.titleKey)}
                        className="aspect-[4/3]"
                        imgClassName="opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                      <span className="absolute top-4 left-4 px-2 py-1 text-[10px] uppercase tracking-widest bg-primary text-primary-foreground font-bold">
                        {t(n.tagKey)}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                        {t(n.dateKey)}
                      </p>
                      <h3 className="font-display font-bold text-lg leading-snug line-clamp-2 group-hover:text-primary transition">
                        {t(n.titleKey)}
                      </h3>
                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3 whitespace-normal break-words text-justify">
                        {t(n.excerptKey)}
                      </p>
                      {/* mt-auto: il link resta allineato in fondo in entrambe le card */}
                      <Link
                        to="/news"
                        className="mt-auto pt-4 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-bold hover:gap-3 transition-all"
                      >
                        {t("news.readArticle")} <ArrowRight size={14} />
                      </Link>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* I NOSTRI ROSTER */}
        <section id="rosters" className="py-20 sm:py-28 border-y border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <ScrollReveal>
              <div className="mb-10">
                <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">
                  {t("rosters.sectionLabel")}
                </p>
                <h2 className="font-display font-bold text-4xl sm:text-6xl uppercase leading-none">
                  {t("rosters.sectionTitle")}
                </h2>
                <p className="mt-4 max-w-xl text-muted-foreground">{t("rosters.description")}</p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RosterCard
                hash="roster-principale"
                eyebrow={t("rosters.teamMain")}
                title="Brawl Stars"
                img="/brawl.webp"
              />

              <RosterCard
                hash="academy"
                eyebrow={t("rosters.academy")}
                title="Academy"
                icon={<Users className="text-primary/30" size={120} strokeWidth={1.2} />}
              />
            </div>
          </div>
        </section>

        {/* CRESCI INSIEME A NOI */}
        <section className="py-20 sm:py-28">
          <ScrollReveal className="mx-auto max-w-7xl px-4 sm:px-6 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-6">
              {t("partnership.sectionLabel")}
            </p>
            <h2 className="font-display font-bold text-4xl sm:text-5xl uppercase leading-tight mb-6">
              {t("partnership.sectionTitle")}
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground mb-10">
              {t("partnership.description")}
            </p>
            <Link
              to="/partner"
              className="btn-neon inline-flex items-center gap-2 px-8 py-4 text-sm"
            >
              {t("partnership.cta")} <ArrowRight size={16} />
            </Link>
          </ScrollReveal>
        </section>
      </SiteLayout>
    </>
  );
}
