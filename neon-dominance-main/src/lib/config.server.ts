import { readFileSync } from "node:fs";
import { join } from "node:path";
import process from "node:process";

// Server-only config. The .server.ts suffix prevents Vite from bundling
// this file into the client — values here never reach the browser.
//
// On Cloudflare Workers, env binds at REQUEST time. Module-scope reads
// (e.g. `const x = process.env.X`) resolve to undefined — always read
// process.env INSIDE a function or handler.
//
// When to use which env-access pattern:
//   - .server.ts module (this file): server-only helpers reused across
//     handlers. Wrap reads in a function so they run per-request.
//   - inline process.env inside a createServerFn handler: one-off reads
//     not reused elsewhere.
//   - import.meta.env.VITE_FOO: PUBLIC config readable from both client
//     and server (analytics IDs, public URLs). Define in .env with the
//     VITE_ prefix. Never put secrets here — they ship to the browser.

// In sviluppo (`npm run dev`) Vite carica dal file .env SOLO le variabili che
// iniziano con VITE_. I segreti come MAILERLITE_API_KEY non hanno quel prefisso
// (altrimenti finirebbero nel browser), quindi li leggiamo qui dal file .env
// usando la funzione nativa di Node. In produzione le variabili arrivano già
// pronte dal pannello dell'hosting e questo blocco non fa nulla.
let envFileChecked = false;

function loadEnvFileOnce() {
  if (envFileChecked) return;
  envFileChecked = true;

  // Non esiste sui Cloudflare Workers: là le variabili sono già in process.env.
  if (typeof process.loadEnvFile === "function") {
    try {
      process.loadEnvFile();
    } catch {
      // Nessun file .env presente: normale in produzione.
    }
  }

  // ATTENZIONE — perché serve anche il blocco qui sotto:
  // process.loadEnvFile() NON sovrascrive una variabile già presente in memoria.
  // Se avvii `npm run dev` e POI modifichi il token nel file .env, il server
  // continuerebbe a usare il valore vecchio: Vite ricarica i suoi moduli quando
  // cambi .env, ma il processo Node resta lo stesso e con esso i vecchi valori.
  // In sviluppo, quindi, il file .env ha sempre l'ultima parola.
  // In produzione no: là devono vincere le variabili dell'hosting.
  if (process.env.NODE_ENV === "production") return;

  try {
    // Stessa posizione usata da process.loadEnvFile(): il file .env nella
    // cartella da cui è stato lanciato il progetto (la root).
    const envFile = readFileSync(join(process.cwd(), ".env"), "utf8");
    for (const line of envFile.split("\n")) {
      const match = /^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/.exec(line);
      if (!match) continue; // salta righe vuote e commenti (#)
      // Toglie le virgolette che racchiudono il valore, se presenti.
      process.env[match[1]] = match[2].trim().replace(/^(["'])(.*)\1$/, "$2");
    }
  } catch {
    // Nessun file .env in sviluppo: i form mostreranno "newsletter non attiva".
  }
}

export function getServerConfig() {
  loadEnvFileOnce();

  return {
    nodeEnv: process.env.NODE_ENV,
    // Newsletter MailerLite — il token NON deve mai avere il prefisso VITE_,
    // altrimenti finirebbe nel bundle scaricato dal browser (vedi nota sopra).
    // Definito in .env alla root del progetto.
    mailerliteApiKey: process.env.MAILERLITE_API_KEY,
    mailerliteGroupId: process.env.MAILERLITE_GROUP_ID,
    // Add server-only values here, e.g.:
    //   databaseUrl: process.env.DATABASE_URL,
    //   stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  };
}
