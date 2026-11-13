import { Link } from "@tanstack/react-router";
import { Loader2, Mail, Send } from "lucide-react";
import { useTranslation } from "react-i18next";

import { useNewsletterForm } from "@/hooks/use-newsletter-form";
import { SOCIAL_LINKS } from "./social-links";

export function Footer() {
  const { t } = useTranslation();
  const { email, setEmail, status, message, handleSubscribe } = useNewsletterForm("footer");

  return (
    <footer className="border-t border-border bg-card/30 mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <img
            src="/logo.png"
            alt="TALENTS LAB"
            loading="lazy"
            decoding="async"
            className="h-16 w-auto mb-4"
          />
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
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="hover:text-primary transition"
                target="_blank"
                rel="noreferrer"
              >
                <Icon size={18} />
              </a>
            ))}
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
