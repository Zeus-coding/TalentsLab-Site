import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { LogoWatermark } from "@/components/site/LogoWatermark";
import { ScrollReveal } from "@/components/site/ScrollReveal";

export const Route = createFileRoute("/teams/")({
  head: () => ({
    meta: [
      { title: "Teams — TALENTS LAB" },
      {
        name: "description",
        content: "I roster competitivi di TALENTS LAB. Team principale e Academy di Brawl Stars.",
      },
    ],
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

type Social = "youtube" | "kick" | "tiktok";

const MAIN_TEAM: {
  id: string;
  img: string;
  flag: string;
  socials: Social[];
}[] = [
  { id: "yeiyei", img: "/yeiyei.png", flag: "🇷🇴", socials: ["youtube"] },
  // ── CAMBIO FORMAZIONE: Tomzy sostituisce Stas ──────────────────────────────
  // Social: SOLO TikTok (rimossi YouTube e Kick che appartenevano a Stas).
  // FOTO DA INSERIRE: crea la cartella "public/images/roster/" nella root del
  // progetto (c:\Users\paolo\Desktop\neon-dominance-main\neon-dominance-main\public\images\roster\)
  // e incolla lì la foto del giocatore rinominandola ESATTAMENTE "tomzy.png".
  // Percorso finale atteso dal codice: public/images/roster/tomzy.png
  { id: "tomzy", img: "/tomzy.png", flag: "🇬🇧", socials: ["tiktok"] },
  { id: "agachi", img: "/agachi.png", flag: "🇷🇴", socials: ["kick"] },
];

const ACADEMY_TEAM: { id: string; roleKey: string; flag: string }[] = [
  { id: "flow", roleKey: "player", flag: "🇮🇹" },
  { id: "spocki", roleKey: "player", flag: "🇮🇹" },
  { id: "movess", roleKey: "player", flag: "🇮🇹" },
  { id: "moude", roleKey: "drafter", flag: "🇮🇹" },
];

function SocialLinks({ socials, playerName }: { socials: Social[]; playerName: string }) {
  const hrefsByPlayer: Record<string, Partial<Record<Social, string>>> = {
    Tomzy: {
      tiktok: "https://www.tiktok.com/@tomzybs?is_from_webapp=1&sender_device=pc",
    },
    "Yei Yei": {
      youtube: "https://youtube.com/@yeiyeibs?si=rRpC3e7b4JkytwpA",
    },
    Agachi: {
      kick: "https://kick.com/agachi6969",
    },
  };

  // Default (viene sovrascritto per Tomzy/Yei Yei/Agachi sotto)
  const hrefs = {
    youtube: hrefsByPlayer[playerName]?.youtube,
    kick: hrefsByPlayer[playerName]?.kick,
    tiktok: hrefsByPlayer[playerName]?.tiktok,
  };

  return (
    <div className="flex items-center gap-3 mt-3 text-muted-foreground">
      {socials.includes("youtube") && (
        <a
          href={hrefs.youtube}
          aria-label="YouTube"
          className="hover:text-primary transition"
          target="_blank"
          rel="noreferrer"
        >
          <YouTubeIcon />
        </a>
      )}
      {socials.includes("kick") && (
        <a
          href={hrefs.kick}
          aria-label="Kick"
          className="hover:text-primary transition"
          target="_blank"
          rel="noreferrer"
        >
          <KickIcon />
        </a>
      )}
      {socials.includes("tiktok") && (
        <a
          href={hrefs.tiktok}
          aria-label="TikTok"
          className="hover:text-primary transition"
          target="_blank"
          rel="noreferrer"
        >
          <TikTokIcon />
        </a>
      )}
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
            {MAIN_TEAM.map((player, index) => (
              <ScrollReveal key={player.id} delay={index * 0.1} className="group relative">
                <div className="relative w-full aspect-[3/4] bg-gradient-to-br from-primary/20 to-background border border-border/50 overflow-hidden flex items-center justify-center mb-4">
                  <PlayerPhoto src={player.img} flag={player.flag} />
                </div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold text-xl uppercase">
                    {t(`teamsPage.mainTeam.players.${player.id}.name`)}
                  </h3>
                  <span className="text-lg leading-none">{player.flag}</span>
                </div>
                <p className="text-xs text-primary uppercase tracking-wider font-semibold mt-1">
                  {t("teamsPage.mainTeam.playerLabel")}
                </p>
                <SocialLinks
                  socials={player.socials}
                  playerName={t(`teamsPage.mainTeam.players.${player.id}.name`)}
                />
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
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold text-lg uppercase">
                    {t(`teamsPage.academyTeam.players.${member.id}.name`)}
                  </h3>
                  <span className="text-base leading-none">{member.flag}</span>
                </div>
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
              href="/chi-siamo"
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
