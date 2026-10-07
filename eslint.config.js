import js from "@eslint/js";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";

export default [
  { ignores: ["dist/", ".astro/", "node_modules/", "playwright-report/", "test-results/"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  { files: ["src/env.d.ts"], rules: { "@typescript-eslint/triple-slash-reference": "off" } },
  { files: ["src/components/projects/TagList.astro"], rules: { "astro/no-exports-from-components": "off" } },
  { files: ["src/components/skills/SkillsCarouselItem.astro"], rules: { "@typescript-eslint/no-explicit-any": "off" } },
];
