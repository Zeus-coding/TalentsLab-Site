import { Link } from "@tanstack/react-router";
import { Mail, Send, Instagram, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

import { useNewsletterForm } from "@/hooks/use-newsletter-form";

function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.66a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.09Z" />
    </svg>
  );
}
function YouTubeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z" />
    </svg>
  );
}
function DiscordIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.298 12.298 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z" />
    </svg>
  );
}

export function Footer() {
  const { t } = useTranslation();
  const { email, setEmail, status, message, handleSubscribe } = useNewsletterForm("footer");

  return (
    <footer className="border-t border-border bg-card/30 mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <img src="/logo.png" alt="TALENTS LAB" className="h-16 w-auto mb-4" />
          <p className="text-sm text-muted-foreground">{t("footer.description")}</p>
        </div>
        <div className="md:col-span-2">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">
            {t("footer.newsletterLabel")}
          </p>
          <p className="text-sm text-muted-foreground mb-4">{t("footer.newsletterText")}</p>
          {/* NEWSLETTER — le email vengono salvate su MailerLite tramite la
              funzione server subscribeToNewsletter (token al sicuro sul server). */}
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input
              type="email"
              name="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={status === "loading"}
              placeholder={t("footer.placeholder")}
              className="flex-1 bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-neon px-5 py-3 disabled:opacity-60"
              aria-label={t("footer.submitAriaLabel")}
            >
              {status === "loading" ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Send size={16} />
              )}
            </button>
          </form>
          {/* Messaggio di conferma o di errore. aria-live avvisa anche gli
              screen reader quando il testo cambia. */}
          {message && (
            <p
              aria-live="polite"
              className={`mt-3 text-sm ${
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
          <a
            href="mailto:bstalentslab@gmail.com"
            className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition"
          >
            <Mail size={14} /> bstalentslab@gmail.com
          </a>
        </div>
        <div className="md:col-span-1">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">
            {t("footer.followLabel")}
          </p>
          <div className="flex items-center gap-4 text-muted-foreground">
            <a
              href="https://www.tiktok.com/@talents_lab?_r=1&_t=ZN-97D8veqs2Pm"
              aria-label="TikTok"
              className="hover:text-primary transition"
              target="_blank"
              rel="noreferrer"
            >
              <TikTokIcon />
            </a>
            <a
              href="https://www.instagram.com/talentslab_bs?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              aria-label="Instagram"
              className="hover:text-primary transition"
              target="_blank"
              rel="noreferrer"
            >
              <Instagram size={18} />
            </a>
            {/* CANALE YOUTUBE UFFICIALE DEL TEAM (ID: UCB6GBHoJ7Quboi0xaMhLxAQ) */}
            <a
              href="https://www.youtube.com/channel/UCB6GBHoJ7Quboi0xaMhLxAQ"
              aria-label="YouTube"
              className="hover:text-primary transition"
              target="_blank"
              rel="noreferrer"
            >
              <YouTubeIcon size={18} />
            </a>
            <a
              href="https://discord.com/invite/RCs7mczSN5?fbclid=PAT01DUASb1i5leHRuA2FlbQIxMABzcnRjBmFwcF9pZA81NjcwNjczNDMzNTI0MjcAAadKyI1p1cUJjOFrSm_HtyqyDPAA9nD1x8g3MbqBIRtnKTdxGwU7OCoXcMt-Lg_aem_MamZ6uQRbuQpGw-jX7xWGA"
              aria-label="Discord"
              className="hover:text-primary transition"
              target="_blank"
              rel="noreferrer"
            >
              <DiscordIcon size={18} />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          {/* Copyright + credito allo sviluppatore: in colonna su mobile,
              affiancati con separatore da sm in su. */}
          <div className="flex flex-col items-center gap-1 text-center sm:flex-row sm:gap-2 sm:text-left">
            <p>{t("footer.copyright")}</p>
            <span aria-hidden className="hidden sm:inline opacity-40">
              •
            </span>
            <p>{t("footer.credit")}</p>
          </div>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-primary transition">
              {t("footer.privacyPolicy")}
            </Link>
            <Link to="/cookie-policy" className="hover:text-primary transition">
              {t("footer.cookiePolicy")}
            </Link>
            <Link to="/termini" className="hover:text-primary transition">
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
