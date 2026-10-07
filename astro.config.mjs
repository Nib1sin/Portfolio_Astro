import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import robotsTxt from "astro-robots-txt";
import sitemap from "@astrojs/sitemap";
import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  devToolbar: { enabled: false },
  integrations: [
    robotsTxt(),
    sitemap({
      i18n: {
        defaultLocale: "es",
        locales: { es: "es-ES", en: "en-US", it: "it-IT", de: "de-DE" },
      },
    }),
    preact(),
  ],
  site: "https://pedro-develop.netlify.app",
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en', 'it', 'de'],
    routing: {
      prefixDefaultLocale: false
    }
  }
});
