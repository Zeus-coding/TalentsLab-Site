import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { getServerConfig } from "../config.server";
import { subscribe } from "./newsletter.core";

export type { NewsletterResult } from "./newsletter.core";

// ─── ISCRIZIONE NEWSLETTER — MAILERLITE ──────────────────────────────────────
//
// Questa funzione gira SOLO sul server (il corpo di .handler non viene mai
// spedito al browser). È il motivo per cui il token MailerLite resta segreto:
// il browser chiama questa funzione, e il server chiama MailerLite.
//
//   browser  ──►  subscribeToNewsletter()  ──►  connect.mailerlite.com
//                 (server, token al sicuro)
//
// La logica vera (anti-bot, chiamata, esiti) è in newsletter.core.ts, così è
// coperta dai test senza dover avviare il server.
//
// Usata da:
//   • src/components/site/Footer.tsx  (newsletter del footer, tutte le pagine)
//   • src/routes/shop.tsx            ("Notificami" del drop merchandising)

export const subscribeToNewsletter = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      email: z.string().trim().email(),
      source: z.enum(["footer", "shop"]).default("footer"),
      // Campo trappola anti-bot (vuoto per le persone).
      website: z.string().max(200).optional().default(""),
    }),
  )
  .handler(async ({ data }) => {
    const { mailerliteApiKey, mailerliteGroupId } = getServerConfig();
    return subscribe(data, { apiKey: mailerliteApiKey, groupId: mailerliteGroupId });
  });
