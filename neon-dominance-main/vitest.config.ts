import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Configurazione separata da vite.config.ts: i test non hanno bisogno dei
// plugin di TanStack Start e Nitro, solo dell'alias "@" → src.
export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    include: ["src/**/*.test.ts"],
    environment: "node",
  },
});
