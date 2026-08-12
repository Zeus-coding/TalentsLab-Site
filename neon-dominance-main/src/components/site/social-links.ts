import { Instagram } from "lucide-react";
import type { ComponentType } from "react";

import { DiscordIcon, TikTokIcon, YouTubeIcon, type SocialIconProps } from "./social-icons";

export type SocialLink = {
  /** Usato come aria-label e come key React: deve restare univoco. */
  label: string;
  href: string;
  Icon: ComponentType<SocialIconProps>;
};

// Unica fonte per i profili ufficiali del team: la leggono sia la Navbar sia
// il Footer, così un URL cambiato va aggiornato in un solo posto.
export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@talents_lab?_r=1&_t=ZN-97D8veqs2Pm",
    Icon: TikTokIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/talentslab_bs?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    Icon: Instagram,
  },
  {
    // CANALE YOUTUBE UFFICIALE DEL TEAM (ID: UCB6GBHoJ7Quboi0xaMhLxAQ)
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCB6GBHoJ7Quboi0xaMhLxAQ",
    Icon: YouTubeIcon,
  },
  {
    label: "Discord",
    href: "https://discord.com/invite/RCs7mczSN5?fbclid=PAT01DUASb1i5leHRuA2FlbQIxMABzcnRjBmFwcF9pZA81NjcwNjczNDMzNTI0MjcAAadKyI1p1cUJjOFrSm_HtyqyDPAA9nD1x8g3MbqBIRtnKTdxGwU7OCoXcMt-Lg_aem_MamZ6uQRbuQpGw-jX7xWGA",
    Icon: DiscordIcon,
  },
];
