import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { getServerConfig } from "../config.server";

// ─── ISCRIZIONE NEWSLETTER — MAILERLITE ──────────────────────────────────────
//
// Questa funzione gira SOLO sul server (il corpo di .handler non viene mai
// spedito al browser). È il motivo per cui il token MailerLite resta segreto:
// il browser chiama questa funzione, e il server chiama MailerLite.
//
//   browser  ──►  subscribeToNewsletter()  ──►  connect.mailerlite.com
//                 (server, token al sicuro)
//
// Usata da:
//   • src/components/site/Footer.tsx  (newsletter del footer, tutte le pagine)
//   • src/routes/shop.tsx            ("Notificami" del drop merchandising)

const MAILERLITE_ENDPOINT = "https://connect.mailerlite.com/api/subscribers";

// Esiti possibili, gestiti dai form per mostrare il messaggio giusto:
//   subscribed    → email nuova, salvata su MailerLite
//   already       → email già presente in lista (per l'utente è un successo)
//   invalid_email → MailerLite ha rifiutato l'indirizzo
//   not_configured→ manca MAILERLITE_API_KEY nel file .env
//   error         → problema di rete o errore lato MailerLite
export type NewsletterResult = {
  status: "subscribed" | "already" | "invalid_email" | "not_configured" | "error";
};

export const subscribeToNewsletter = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      email: z.string().trim().email(),
      // Da dove arriva l'iscrizione: utile in MailerLite per capire quale form
      // converte di più (viene salvato come campo personalizzato "source").
      source: z.enum(["footer", "shop"]).default("footer"),
    }),
  )
  .handler(async ({ data }): Promise<NewsletterResult> => {
    const { mailerliteApiKey, mailerliteGroupId } = getServerConfig();

    if (!mailerliteApiKey || mailerliteApiKey.startsWith("INCOLLA_QUI")) {
      console.error(
        "[newsletter] MAILERLITE_API_KEY non configurata: incolla il token nel file .env alla root del progetto.",
      );
      return { status: "not_configured" };
    }

    try {
      const response = await fetch(MAILERLITE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${mailerliteApiKey}`,
        },
        body: JSON.stringify({
          email: data.email,
          fields: { source: data.source },
          ...(mailerliteGroupId ? { groups: [mailerliteGroupId] } : {}),
        }),
      });

      // MailerLite risponde 201 per un iscritto nuovo e 200 se l'email era già
      // in lista (fa un aggiornamento). Entrambi i casi sono un successo.
      if (response.status === 201) return { status: "subscribed" };
      if (response.status === 200) return { status: "already" };

      // 422 = email scartata dalla validazione di MailerLite.
      if (response.status === 422) return { status: "invalid_email" };

      const detail = await response.text();
      console.error(`[newsletter] MailerLite ha risposto ${response.status}: ${detail}`);
      return { status: "error" };
    } catch (cause) {
      console.error("[newsletter] Chiamata a MailerLite fallita:", cause);
      return { status: "error" };
    }
  });
