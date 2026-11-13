import { fileURLToPath, URL } from "node:url";

import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ command }) => ({
  plugins: [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      // Entry server personalizzato: src/server.ts avvolge l'handler di
      // TanStack Start e trasforma i crash SSR in una pagina di errore HTML.
      server: { entry: "server" },
      // Blocca in build qualsiasi import di codice server dentro il bundle
      // del browser (cartelle server/ e il pacchetto "server-only").
      importProtection: {
        behavior: "error",
        client: {
          files: ["**/server/**"],
          specifiers: ["server-only"],
        },
      },
    }),
    // Il sito è in SSR: serve un vero server, non solo file statici.
    // Il preset "vercel" fa generare a Nitro la cartella .vercel/output
    // (Build Output API): file statici sulla CDN + funzione serverless SSR.
    // Solo in build: in sviluppo il server SSR è quello di Vite.
    ...(command === "build" ? [nitro({ preset: "vercel" })] : []),
    viteReact(),
  ],

  // Stessa pipeline CSS in dev e in build: senza questa riga Vite usa PostCSS
  // in sviluppo e Lightning CSS solo in build, e l'anteprima locale potrebbe
  // differire dal sito pubblicato.
  css: { transformer: "lightningcss" },

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    // Una sola copia di React e React Query nel grafo dei moduli: due copie
    // romperebbero hook e context durante SSR e hydration.
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },

  server: {
    host: "::",
    port: 8080,
    // Necessario per aprire il sito in sviluppo tramite ngrok.
    allowedHosts: [".ngrok-free.dev", "rumbling-cusp-jockey.ngrok-free.dev"],
  },
}));
