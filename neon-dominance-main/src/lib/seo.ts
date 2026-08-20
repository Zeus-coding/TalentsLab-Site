// Dominio canonico. Serve a costruire URL assoluti: WhatsApp, X e LinkedIn
// scartano og:image con path relativi, quindi non basta "/logo.png".
export const SITE_URL = "https://talentslab.gg";
export const SITE_NAME = "TALENTS LAB";

// Inglese come lingua predefinita del server (vedi DEFAULT_LANGUAGE in
// src/lib/i18n.ts). Crawler e bot delle chat non eseguono il cambio lingua
// lato client, quindi i meta devono essere nella lingua del primo render.
export const DEFAULT_TITLE = "TALENTS LAB — Brawl Stars Esports Team & Talent Incubator";
export const DEFAULT_DESCRIPTION =
  "TALENTS LAB is a forward-thinking global esports organization, built to reshape the international competitive scene by scouting and developing top talent.";

// Google ignora <meta keywords> dal 2009: resta qui perché altri crawler e
// alcuni tool di audit interni lo leggono ancora. Non aspettarsi effetti sul
// ranking Google.
export const KEYWORDS =
  "talents lab, brawl stars, brawl stars esports, bsc emea, esports team, talentslab.gg, yei yei, agachi";

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

/** Logo del sito, usato come favicon e come `logo` nei dati strutturati. */
export const LOGO_PATH = "/logo.png";

// Profili ufficiali in forma canonica, senza parametri di tracciamento: i
// dati strutturati vogliono URL di identità stabili, diversi dai link della
// UI in components/site/social-links.ts (che portano gli utm di condivisione).
// Se un profilo cambia, va aggiornato in entrambi i posti.
const ORGANIZATION_SAME_AS = [
  "https://www.instagram.com/talentslab_bs",
  "https://www.tiktok.com/@talents_lab",
  "https://www.youtube.com/channel/UCB6GBHoJ7Quboi0xaMhLxAQ",
];

/**
 * Dati strutturati schema.org che qualificano il sito come organizzazione
 * esports. `logo` deve puntare a un file immagine: con l'URL del sito Google
 * scarta la proprietà e il rich result non viene generato.
 */
/**
 * Lo schema serializzato, pronto da mettere dentro un tag script. `<` viene
 * neutralizzato: una stringa che contenesse `</script>` chiuderebbe il tag in
 * anticipo, con il resto del JSON riversato nella pagina.
 */
export function organizationJsonLd(): string {
  return JSON.stringify(organizationSchema()).replace(/</g, "\\u003c");
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SportsOrganization",
    name: SITE_NAME,
    alternateName: "TLB",
    url: SITE_URL,
    logo: absoluteUrl(LOGO_PATH),
    description: DEFAULT_DESCRIPTION,
    sport: "Esports",
    sameAs: ORGANIZATION_SAME_AS,
  };
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
