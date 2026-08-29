# Pedro Jaime — Portfolio

Sitio personal construido con [Astro](https://astro.build), con secciones de sobre mí, experiencia, proyectos, skills y contacto. Multi-idioma (ES/EN/IT/DE).

🔗 [pedro-develop.netlify.app](https://pedro-develop.netlify.app/)

## Stack

- **Astro 7** — sitio estático (SSG)
- **Preact** — única isla interactiva (el header)
- **Tailwind CSS v4** — vía `@tailwindcss/vite`, sin `tailwind.config`
- **sharp** — optimización de imágenes en build
- **pnpm** — gestor de paquetes
- i18n nativo de Astro (`es` por defecto, `en`, `it`, `de`)

## Comandos

Todos desde la raíz del proyecto:

| Comando          | Acción                                       |
| :--------------- | :------------------------------------------- |
| `pnpm install`   | Instala dependencias                         |
| `pnpm dev`       | Servidor local en `localhost:4321`           |
| `pnpm build`     | `astro check` + build a `./dist/`            |
| `pnpm preview`   | Preview del build localmente                 |
| `pnpm astro ...` | CLI de Astro                                 |

## Estructura

```
src/
├── assets/           # imágenes procesadas por astro:assets (NO usar public/)
├── components/       # una carpeta por sección + Header/Footer/SectionContainer
│   ├── about_me/     # AboutMe, Study, LanguagesTable
│   ├── contact/      # Me (hero), Badge
│   ├── experience/   # Experience, ExperienceItem
│   ├── projects/     # Projects (carrusel), TagList, LinkButton
│   └── skills/       # SkillsCarousel
├── i18n/             # i18n.ts + es/en/it/de.json
├── icons/            # ~125 iconos SVG (stack, redes, UI)
├── layouts/          # Layout.astro — <head>, SEO, tema, estilos base
├── pages/
│   └── [...locale]/  # index.astro — una sola página para los 4 idiomas
└── styles/           # global.css
```

## Arquitectura

### Rutas e i18n

Hay **una sola página** (`src/pages/[...locale]/index.astro`). Su `getStaticPaths()` recorre `LOCALES` y genera las 4 rutas estáticas:

| params            | ruta generada |
| :---------------- | :------------ |
| `locale: undefined` | `/`         |
| `locale: "en"`      | `/en/`      |
| `locale: "it"`      | `/it/`      |
| `locale: "de"`      | `/de/`      |

El locale por defecto (`es`) va sin prefijo porque `astro.config.mjs` usa `routing.prefixDefaultLocale: false`. Por eso su `params.locale` es `undefined`, no `"es"`.

Los componentes **no reciben el locale por props**: cada uno lo deduce con `getLocaleFromPathname(Astro.url.pathname)` y traduce con `t(locale, "clave.anidada")`, ambos de `src/i18n/i18n.ts`. Las traducciones viven en un JSON por idioma; `t()` devuelve la clave literal si no encuentra la traducción, así que una clave rota se ve en pantalla en vez de romper el build.

> Al añadir una sección, hay que añadir su clave a **los cuatro** JSON.

### Renderizado e hidratación

El sitio es estático salvo **una isla**: `HeaderClient.tsx` (Preact, `client:load`), que necesita JS para el selector de tema y el de idioma. Todo lo demás es HTML:

- Los desplegables de experiencia y estudios usan `<details>/<summary>` nativo, sin JS.
- El carrusel de proyectos y la tabla de idiomas usan scripts `is:inline` que se ejecutan directamente al parsearse (van después de su markup).

> No hay view transitions. `ClientRouter` se quitó porque no había navegación entre páginas que interceptar — todos los enlaces del nav son anclas `#seccion`. Si alguna vez se reintroduce, ojo: los scripts `is:inline` tendrían que volver a colgarse de `astro:page-load`.

### Tema claro/oscuro

Estrategia de **clase**, no de media query:

1. `src/styles/global.css` define la variante con `@custom-variant dark (&:where(.dark, .dark *))`.
2. Un script `is:inline` en el `<head>` del Layout lee `localStorage.theme` y aplica la clase `dark` en el `<html>` **antes** de pintar, para que no haya flash.
3. `HeaderClient.tsx` cambia la preferencia y la persiste.

> El color del texto sale de `text-black dark:text-white` en el `<body>`. No poner reglas `@media (prefers-color-scheme: dark)` para el tema: ganan sobre las utilities de Tailwind y hacen que el sistema operativo anule la elección del usuario.

### SEO

Todo se genera en `Layout.astro` a partir del locale:

- `<title>` y `<meta description>` desde las claves `seo.*` de cada JSON
- `<link rel="canonical">` + `hreflang` para los 4 idiomas + `x-default`
- Open Graph y Twitter Card
- JSON-LD de tipo `Person`
- `sitemap-index.xml` (`@astrojs/sitemap`, con alternates i18n) y `robots.txt` (`astro-robots-txt`)

`astro.config.mjs` debe tener `site` bien puesto: de ahí salen todas las URLs absolutas.

### Imágenes

Van en `src/assets/`, **no** en `public/`. Se usan con `<Image>` de `astro:assets`, que redimensiona y genera el hash en build vía sharp. Lo que se deja en `public/` se sirve tal cual, sin optimizar.

El `og:image` es la excepción deliberada: importa el asset y usa `imageMe.src` sin `<Image>`, para que las redes sociales reciban el original a tamaño completo mientras la página carga la versión pequeña.

## Deploy

`pnpm build` genera `dist/`, que se despliega en Netlify.
