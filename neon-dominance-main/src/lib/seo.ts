// Dominio canonico. Serve a costruire URL assoluti: WhatsApp, X e LinkedIn
// scartano og:image con path relativi, quindi non basta "/logo.png".
export const SITE_URL = "https://talentslab.gg";
export const SITE_NAME = "TALENTS LAB";

// Inglese come lingua predefinita del server (vedi DEFAULT_LANGUAGE in
// src/lib/i18n.ts). Crawler e bot delle chat non eseguono il cambio lingua
// lato client, quindi i meta devono essere nella lingua del primo render.
export const DEFAULT_TITLE = "TALENTS LAB — The Competitive Esports Talent Incubator";
export const DEFAULT_DESCRIPTION =
  "TALENTS LAB is a forward-thinking global esports organization, built to reshape the international competitive scene by scouting and developing top talent.";

// Anteprima social. logo.png (594x420, 29 KB) sta sotto la soglia oltre la
// quale WhatsApp rinuncia a scaricare l'immagine — team-hero.png pesa 2 MB e
// verrebbe spesso ignorato. Per una card a larghezza piena esporta un
// 1200x630 in public/ e aggiorna solo queste tre costanti (poi passa
// twitter:card a "summary_large_image" qui sotto).
const OG_IMAGE_PATH = "/logo.png";
const OG_IMAGE_WIDTH = "594";
const OG_IMAGE_HEIGHT = "420";

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).href;
}

type SocialMetaOptions = {
  title?: string;
  description?: string;
  /** Path della pagina, es. "/about": diventa og:url assoluto. */
  path?: string;
};

/**
 * Costruisce title, description e il set completo Open Graph + Twitter per una
 * pagina. Tenerlo in un solo posto evita che i tag divergano fra le rotte:
 * basta che una pagina dimentichi og:image perché la card sparisca.
 */
export function socialMeta({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path = "/",
}: SocialMetaOptions = {}) {
  const image = absoluteUrl(OG_IMAGE_PATH);

  return [
    { title },
    { name: "description", content: description },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: "en_US" },
    { property: "og:url", content: absoluteUrl(path) },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: image },
    { property: "og:image:secure_url", content: image },
    { property: "og:image:type", content: "image/png" },
    { property: "og:image:width", content: OG_IMAGE_WIDTH },
    { property: "og:image:height", content: OG_IMAGE_HEIGHT },
    { property: "og:image:alt", content: `${SITE_NAME} — esports talent incubator` },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:site", content: "@TalentsLab" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
  ];
}
