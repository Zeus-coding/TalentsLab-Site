import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Il sito è in SSR: serve un vero server, non solo file statici.
  // Senza questo, la build produce dist/client + dist/server ma nessun
  // index.html né funzione serverless, e Vercel non ha niente da servire.
  // Il preset "vercel" fa generare a nitro la cartella .vercel/output.
  nitro: {
    preset: "vercel",
  },

  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper)
    // nitro/vite builds from this
    server: {
      entry: "server",
    },
  },

  vite: {
    server: {
      port: 8080,
      // Necessario per aprire il sito in sviluppo tramite ngrok.
      allowedHosts: [".ngrok-free.dev", "rumbling-cusp-jockey.ngrok-free.dev"],
    },
  },
});
