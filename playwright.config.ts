import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "e2e",
  use: { baseURL: "http://localhost:4321", channel: "chrome" },
  webServer: {
    command: "pnpm build && pnpm preview",
    url: "http://localhost:4321",
    reuseExistingServer: true,
    timeout: 180_000,
  },
});
