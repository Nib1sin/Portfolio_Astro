# Pedro Jaime — Portfolio

Sitio personal construido con [Astro](https://astro.build), con secciones de sobre mí, experiencia, proyectos, skills y contacto. Soporte multi-idioma (ES/EN/IT).

🔗 [pedro-develop.netlify.app](https://pedro-develop.netlify.app/)

## Stack

- **Astro** — SSG
- **Preact** + **Svelte** — componentes interactivos
- **Tailwind CSS v4**
- **pnpm** — gestor de paquetes
- i18n nativo de Astro (`es` default, `en`, `it`)

## Estructura

```
src/
├── components/       # componentes por sección (about_me, experience, projects, skills, contact)
├── icons/            # iconos SVG (tech stack, redes, UI)
├── i18n/             # traducciones (en.json, es.json, it.json)
├── layouts/          # Layout.astro
├── pages/            # index.astro + /en, /es, /it
└── styles/           # global.css
```

## Comandos

Todos los comandos se ejecutan desde la raíz del proyecto con pnpm:

| Comando          | Acción                                      |
| :--------------- | :------------------------------------------- |
| `pnpm install`   | Instala dependencias                         |
| `pnpm dev`       | Levanta el servidor local en `localhost:4321`|
| `pnpm build`     | `astro check` + build a `./dist/`            |
| `pnpm preview`   | Preview del build localmente                 |
| `pnpm astro ...` | Comandos de la CLI de Astro                  |

## Deploy

Build genera la carpeta `dist/`, desplegada en Netlify.
