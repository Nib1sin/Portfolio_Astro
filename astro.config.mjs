import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import robotsTxt from "astro-robots-txt";
import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  integrations: [robotsTxt(), preact()],
  site: "https://pedro-develop.netlify.app/",
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en', 'pr', 'it'],
    routing: {
      prefixDefaultLocale: false
    }
  }
});
