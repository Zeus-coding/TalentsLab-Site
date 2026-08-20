import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Menu, ShoppingBag, X } from "lucide-react";

import { LanguageSelector } from "./LanguageSelector";
import { SOCIAL_LINKS } from "./social-links";

const NAV = [
  { key: "home", to: "/" },
  { key: "teams", to: "/teams" },
  { key: "news", to: "/news" },
  { key: "partner", to: "/partner" },
  { key: "about", to: "/about" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/60 border-b border-border/60">
      {/* `gap-6 lg:gap-10` oltre a justify-between: garantisce uno spazio
          minimo tra logo, menu e azioni. Senza di esso, quando le etichette
          sono più lunghe del previsto, i tre blocchi si toccano e il testo
          finisce sopra il logo. */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-20 flex items-center justify-between gap-6 lg:gap-10">
        {/* shrink-0 protegge il lockup logo + wordmark dalla compressione. */}
        <Link to="/" className="group flex shrink-0 items-center gap-3">
          <img
            src="/logo.png"
            alt="TALENTS LAB"
            className="h-12 sm:h-14 w-auto transition-opacity group-hover:opacity-80"
          />
          <span className="font-display font-bold text-lg sm:text-xl uppercase tracking-wider leading-none">
            TALENTS<span className="text-primary">LAB</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium uppercase tracking-wider">
          {NAV.map((item) => (
            <Link
              key={item.key}
              to={item.to}
              className="nav-link whitespace-nowrap text-muted-foreground hover:text-foreground"
              activeProps={{ className: "nav-link active text-foreground" }}
              activeOptions={{ exact: true }}
            >
              {t(`navbar.${item.key}`)}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <div className="hidden md:flex items-center gap-3">
            <LanguageSelector />
          </div>
          <div className="hidden md:flex items-center gap-3 text-muted-foreground">
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
          <Link
            to="/shop"
            className="btn-neon hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs clip-slash whitespace-nowrap"
          >
            <ShoppingBag size={14} /> {t("navbar.shop")}
          </Link>
          <button
            className="lg:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden border-t border-border/60 bg-background/95 backdrop-blur-md">
          <div className="px-4 py-4 flex flex-col gap-3">
            {NAV.map((item) => (
              <Link
                key={item.key}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className="py-2 text-sm uppercase tracking-wider text-muted-foreground hover:text-primary"
              >
                {t(`navbar.${item.key}`)}
              </Link>
            ))}
            <div className="flex items-center justify-between">
              <LanguageSelector />
              <Link
                to="/shop"
                onClick={() => setMenuOpen(false)}
                className="py-2 text-sm uppercase tracking-wider text-primary inline-flex items-center gap-2"
              >
                <ShoppingBag size={14} /> {t("navbar.shop")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
