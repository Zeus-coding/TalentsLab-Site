import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { LogoWatermark } from "@/components/site/LogoWatermark";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { socialMeta } from "@/lib/seo";

export const Route = createFileRoute("/teams/")({
  head: () => ({
    meta: socialMeta({
      title: "Teams — TALENTS LAB",
      description:
        "The competitive rosters of TALENTS LAB: the main Brawl Stars team and the Academy squad.",
      path: "/teams",
    }),
  }),
  component: TeamsPage,
});

// --- Icone social (SVG puliti, monocromatici) ---------------------------------
function YouTubeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
    </svg>
  );
}

function KickIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" aria-hidden>
      <path d="M4 4h7v9l8-9h9L18 16l10 12h-9l-8-9v9H4z" />
    </svg>
  );
}

function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.66a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.09Z" />
    </svg>
  );
}

// --- Sagoma anonima (profilo utente nero, privacy) ----------------------------
function UserSilhouette({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <circle cx="12" cy="8.5" r="4.2" />
      <path d="M3.5 21c0-4.5 3.8-7.5 8.5-7.5s8.5 3 8.5 7.5z" />
    </svg>
  );
}

// --- Segnaposto della card teaser ---------------------------------------------
// Sagoma anonima con punto interrogativo al centro della testa. Il gradiente
// cyberpunk arriva dalla card che lo contiene, la stessa delle altre schede.
function RevealPlaceholder() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 24 24" className="w-32 h-32 sm:w-36 sm:h-36" aria-hidden="true">
        <g fill="currentColor" className="text-primary/20">
          <circle cx="12" cy="8.5" r="4.2" />
          <path d="M3.5 21c0-4.5 3.8-7.5 8.5-7.5s8.5 3 8.5 7.5z" />
        </g>
        {/* Il "?" è dentro l'SVG per restare allineato alla testa a ogni
            dimensione, invece di essere posizionato a occhio con un offset. */}
        <text
          x="12"
          y="8.5"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="6"
          fontWeight="700"
          fill="currentColor"
          className="text-primary text-glow-red"
        >
          ?
        </text>
      </svg>
    </div>
  );
}

type Social = "youtube" | "kick" | "tiktok";

const SOCIAL_ICONS: Record<Social, ({ size }: { size?: number }) => ReactElement> = {
  youtube: YouTubeIcon,
  kick: KickIcon,
  tiktok: TikTokIcon,
};

const SOCIAL_LABELS: Record<Social, string> = {
  youtube: "YouTube",
  kick: "Kick",
  tiktok: "TikTok",
};

type MainTeamCard =
  | {
      kind: "player";
      id: string;
      img: string;
      flag: string;
      /** URL per rete: vengono mostrate solo le voci presenti qui. */
      socials: Partial<Record<Social, string>>;
    }
  // Posto libero nel roster: annunciato come teaser invece di mostrare una
  // formazione incompleta. Non ha foto, bandiera né social.
  | { kind: "reveal"; id: string };

const MAIN_TEAM: MainTeamCard[] = [
  {
    kind: "player",
    id: "yeiyei",
    img: "/yeiyei.webp",
    flag: "🇷🇴",
    socials: { youtube: "https://youtube.com/@yeiyeibs?si=rRpC3e7b4JkytwpA" },
  },
  {
    kind: "player",
    id: "agachi",
    img: "/agachi.webp",
    flag: "🇷🇴",
    socials: { kick: "https://kick.com/agachi6969" },
  },
  { kind: "reveal", id: "reveal" },
];

// L'Academy non mostra le nazionalità: solo nome e ruolo.
const ACADEMY_TEAM: { id: string; roleKey: string }[] = [
  { id: "flow", roleKey: "player" },
  { id: "spocki", roleKey: "player" },
  { id: "movess", roleKey: "player" },
  { id: "moude", roleKey: "drafter" },
];

// Gli URL stanno nella stessa struttura dell'elenco delle reti, così non è
// possibile dichiarare un social senza link: prima le due informazioni erano
// separate e indicizzate per NOME TRADOTTO del giocatore, quindi una lingua
// che avesse tradotto il nome produceva un <a href={undefined}>.
function SocialLinks({ socials }: { socials: Partial<Record<Social, string>> }) {
  const links = (Object.keys(SOCIAL_ICONS) as Social[])
    .map((network) => ({ network, href: socials[network] }))
    .filter((link): link is { network: Social; href: string } => Boolean(link.href));

  if (links.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-3 mt-3 text-muted-foreground">
      {links.map(({ network, href }) => {
        const Icon = SOCIAL_ICONS[network];
        return (
          <a
            key={network}
            href={href}
            aria-label={SOCIAL_LABELS[network]}
            className="hover:text-primary transition"
            target="_blank"
            rel="noreferrer"
          >
            <Icon />
          </a>
        );
      })}
    </div>
  );
}

// Foto giocatore con fallback alla sagoma geometrica se il file non esiste.
function PlayerPhoto({ src, flag }: { src: string; flag: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-2">{flag}</div>
          <div className="w-16 h-16 rounded-full border-2 border-primary/40 mx-auto opacity-40" />
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt=""
      onError={() => setFailed(true)}
      loading="lazy"
      decoding="async"
      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
    />
  );
}

function TeamsPage() {
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
              {t("teamsPage.hero.label")}
            </p>
            <h1 className="font-display font-bold text-5xl sm:text-7xl md:text-8xl uppercase leading-tight">
              {t("teamsPage.hero.titleLine1")} <br className="hidden sm:block" />
              <span className="text-primary text-glow-red">{t("teamsPage.hero.titleLine2")}</span>
            </h1>
            <p className="mt-8 text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("teamsPage.hero.description")}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* MAIN TEAM */}
      <section id="roster-principale" className="py-20 sm:py-28 bg-background scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <ScrollReveal className="mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">
              {t("teamsPage.mainTeam.label")}
            </p>
            <h2 className="font-display font-bold text-4xl sm:text-5xl uppercase">
              {t("teamsPage.mainTeam.title")}
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {MAIN_TEAM.map((card, index) => (
              <ScrollReveal key={card.id} delay={index * 0.1} className="group relative">
                {/* Stesso contenitore per entrambi i tipi di card: l'aspect
                    ratio fisso mantiene la griglia simmetrica anche con il
                    segnaposto al posto della foto. */}
                <div className="relative w-full aspect-[3/4] bg-gradient-to-br from-primary/20 to-background border border-border/50 overflow-hidden flex items-center justify-center mb-4">
                  {card.kind === "player" ? (
                    <PlayerPhoto src={card.img} flag={card.flag} />
                  ) : (
                    <RevealPlaceholder />
                  )}
                </div>
                {/* min-h-14 = due righe di text-xl: "Reveal Coming Soon" va a
                    capo mentre "Agachi" no, e senza altezza riservata ruolo e
                    social della terza card si disallineerebbero dagli altri.
                    Vale in tutte le lingue, incluse quelle con nomi più lunghi. */}
                <div className="flex items-start gap-2 min-h-14">
                  <h3 className="font-display font-bold text-xl uppercase">
                    {card.kind === "player"
                      ? t(`teamsPage.mainTeam.players.${card.id}.name`)
                      : t("teamsPage.mainTeam.reveal.name")}
                  </h3>
                  <span className="text-lg leading-none">
                    {card.kind === "player" ? card.flag : "?"}
                  </span>
                </div>
                <p className="text-xs text-primary uppercase tracking-wider font-semibold mt-1">
                  {card.kind === "player"
                    ? t("teamsPage.mainTeam.playerLabel")
                    : t("teamsPage.mainTeam.reveal.role")}
                </p>
                {card.kind === "player" ? (
                  <SocialLinks socials={card.socials} />
                ) : (
                  // Nessun link social per la card teaser: solo l'indicazione
                  // testuale, che occupa la stessa riga delle icone.
                  <p className="flex items-center gap-3 mt-3 text-xs uppercase tracking-wider text-muted-foreground">
                    {t("teamsPage.mainTeam.reveal.socialsSoon")}
                  </p>
                )}
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ACADEMY TEAM */}
      <section id="academy" className="py-20 sm:py-28 bg-card/20 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <ScrollReveal className="mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">
              {t("teamsPage.academyTeam.label")}
            </p>
            <h2 className="font-display font-bold text-4xl sm:text-5xl uppercase">
              {t("teamsPage.academyTeam.title")}
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl">
              {t("teamsPage.academyTeam.description")}
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ACADEMY_TEAM.map((member, index) => (
              <ScrollReveal key={member.id} delay={index * 0.1} className="group relative">
                <div className="relative aspect-square bg-gradient-to-b from-neutral-900 to-black border border-border/50 overflow-hidden flex items-center justify-center mb-4 shadow-lg">
                  <UserSilhouette className="w-24 h-24 text-neutral-700" />
                </div>
                {/* Nessuna nazionalità nell'Academy: solo nome e ruolo. */}
                <h3 className="font-display font-bold text-lg uppercase">
                  {t(`teamsPage.academyTeam.players.${member.id}.name`)}
                </h3>
                <p className="text-xs text-primary uppercase tracking-wider font-semibold mt-1">
                  {t(`teamsPage.academyTeam.roles.${member.roleKey}`)}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* JOIN THE TEAM */}
      <section className="py-20 sm:py-28 bg-background border-border">
        <ScrollReveal className="mx-auto max-w-7xl px-4 sm:px-6 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-6">
            {t("teamsPage.recruitment.label")}
          </p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl uppercase leading-tight mb-8">
            {t("teamsPage.recruitment.titleLine1")} <br /> {t("teamsPage.recruitment.titleLine2")}{" "}
            <span className="text-primary text-glow-red">
              {t("teamsPage.recruitment.titleStrong")}
            </span>
            ?
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mb-8">
            {t("teamsPage.recruitment.description")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:bstalentslab@gmail.com?subject=Invia la tua candidatura - TALENTS LAB"
              className="btn-neon inline-flex items-center gap-2 px-8 py-4 text-sm"
            >
              {t("teamsPage.recruitment.button")} <ArrowRight size={16} />
            </a>

            <a
              href="/about"
              className="btn-outline-neon px-8 py-4 text-sm uppercase tracking-wider font-semibold"
            >
              {t("teamsPage.recruitment.secondaryButton")}
            </a>
          </div>
        </ScrollReveal>
      </section>
    </SiteLayout>
  );
}
