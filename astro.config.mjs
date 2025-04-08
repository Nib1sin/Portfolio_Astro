import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import astroI18next from "astro-i18next";
import robotsTxt from "astro-robots-txt";
import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  integrations: [astroI18next(), robotsTxt(), preact()],
  site: "https://pedro-develop.netlify.app/",
  vite: {
    plugins: [tailwindcss()],
  },
});
