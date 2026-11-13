// ─── LOGICA DELL'ISCRIZIONE ALLA NEWSLETTER (testabile) ──────────────────────
//
// Funzione "pura": riceve i dati, la configurazione e la funzione fetch da usare.
// Non sa nulla di TanStack Start né di process.env, quindi i test possono
// chiamarla con un fetch finto e verificare ogni esito senza contattare MailerLite.
// La server function in newsletter.functions.ts si limita a richiamarla.

export const MAILERLITE_ENDPOINT = "https://connect.mailerlite.com/api/subscribers";

// Esiti possibili, gestiti dai form per mostrare il messaggio giusto:
//   subscribed    → email nuova, salvata su MailerLite
//   already       → email già presente in lista (per l'utente è un successo)
//   invalid_email → MailerLite ha rifiutato l'indirizzo
//   not_configured→ manca MAILERLITE_API_KEY nel file .env
//   error         → problema di rete o errore lato MailerLite
export type NewsletterStatus =
  "subscribed" | "already" | "invalid_email" | "not_configured" | "error";
export type NewsletterResult = { status: NewsletterStatus };

export type SubscribeInput = {
  email: string;
  source: "footer" | "shop";
  /** Campo trappola anti-bot: le persone non lo vedono, i bot lo compilano. */
  website?: string;
};

export type SubscribeConfig = {
  apiKey?: string;
  groupId?: string;
  fetchImpl?: typeof fetch;
  log?: (message: string, detail?: unknown) => void;
};

export async function subscribe(
  input: SubscribeInput,
  { apiKey, groupId, fetchImpl = fetch, log = console.error }: SubscribeConfig,
): Promise<NewsletterResult> {
  // Un bot ha compilato il campo nascosto: rispondiamo "fatto" (così non capisce
  // di essere stato scoperto e non riprova) ma non salviamo niente.
  if (input.website?.trim()) {
    log("[newsletter] iscrizione scartata: campo anti-bot compilato");
    return { status: "subscribed" };
  }

  if (!apiKey || apiKey.startsWith("INCOLLA_QUI")) {
    log(
      "[newsletter] MAILERLITE_API_KEY non configurata: incolla il token nel file .env alla root del progetto.",
    );
    return { status: "not_configured" };
  }

  try {
    const response = await fetchImpl(MAILERLITE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email: input.email,
        // Da dove arriva l'iscrizione: in MailerLite si vede quale form converte di più.
        fields: { source: input.source },
        ...(groupId ? { groups: [groupId] } : {}),
      }),
    });

    // MailerLite risponde 201 per un iscritto nuovo e 200 se l'email era già
    // in lista (fa un aggiornamento). Entrambi i casi sono un successo.
    if (response.status === 201) return { status: "subscribed" };
    if (response.status === 200) return { status: "already" };

    // 422 = email scartata dalla validazione di MailerLite.
    if (response.status === 422) return { status: "invalid_email" };

    log(`[newsletter] MailerLite ha risposto ${response.status}`, await response.text());
    return { status: "error" };
  } catch (cause) {
    log("[newsletter] Chiamata a MailerLite fallita:", cause);
    return { status: "error" };
  }
}
