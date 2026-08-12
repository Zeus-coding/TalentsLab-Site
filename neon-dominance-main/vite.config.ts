
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
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