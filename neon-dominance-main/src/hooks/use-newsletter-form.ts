import { useState } from "react";
import type { FormEvent } from "react";
import { useTranslation } from "react-i18next";

import { subscribeToNewsletter } from "@/lib/api/newsletter.functions";

// ─── LOGICA CONDIVISA DEI FORM NEWSLETTER ────────────────────────────────────
//
// Usato dal footer (presente su tutte le pagine) e dal form "Notificami" dello
// shop, così i due form si comportano esattamente nello stesso modo e i
// messaggi vanno cambiati in un solo posto.
//
//   const { email, setEmail, status, message, handleSubscribe } =
//     useNewsletterForm("footer");
//
// Il token MailerLite NON è qui: la chiamata passa da subscribeToNewsletter(),
// che gira sul server. Vedi src/lib/api/newsletter.functions.ts.

type Status = "idle" | "loading" | "success" | "error";

// Controllo minimo prima di disturbare il server (il browser lo fa già con
// input type="email" required, questo copre i casi limite).
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function useNewsletterForm(source: "footer" | "shop") {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubscribe(event: FormEvent<HTMLFormElement>) {
    // Evita il ricaricamento della pagina: gestiamo tutto in JavaScript.
    event.preventDefault();
    if (status === "loading") return;

    const trimmedEmail = email.trim();

    if (!EMAIL_PATTERN.test(trimmedEmail)) {
      setStatus("error");
      setMessage(t("newsletter.invalidEmail"));
      return;
    }

    setStatus("loading");
    setMessage(t("newsletter.loading"));

    try {
      const result = await subscribeToNewsletter({
        data: { email: trimmedEmail, source },
      });

      switch (result.status) {
        // Email nuova salvata, oppure già in lista: per chi si iscrive è
        // comunque un successo. In entrambi i casi svuotiamo il campo.
        case "subscribed":
          setStatus("success");
          setMessage(t("newsletter.success"));
          setEmail("");
          break;
        case "already":
          setStatus("success");
          setMessage(t("newsletter.already"));
          setEmail("");
          break;
        case "invalid_email":
          setStatus("error");
          setMessage(t("newsletter.invalidEmail"));
          break;
        // Manca il token nel file .env: l'email NON è stata salvata, quindi
        // non diciamo all'utente che l'iscrizione è andata a buon fine.
        case "not_configured":
          setStatus("error");
          setMessage(t("newsletter.notConfigured"));
          break;
        default:
          setStatus("error");
          setMessage(t("newsletter.error"));
      }
    } catch {
      // Connessione assente o server non raggiungibile.
      setStatus("error");
      setMessage(t("newsletter.error"));
    }
  }

  return { email, setEmail, status, message, handleSubscribe };
}
