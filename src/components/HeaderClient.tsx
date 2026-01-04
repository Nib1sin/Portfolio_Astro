import { useEffect, useRef, useState } from "preact/hooks";
import SpainFlag from "@/icons/SpainFlag.tsx";
import ItalianFlag from "@/icons/ItalianFlag.tsx";
import UKFlag from "@/icons/UKFlag";

export type NavItem = { title: string; label: string; url: string };
type Theme = "light" | "dark";

const FLAG_BY_LOCALE = {
  es: SpainFlag,
  en: UKFlag,
  it: ItalianFlag,
} as const;

type Props = {
  navItems: NavItem[];
  locale: string;
  locales: readonly string[];
  defaultLocale: string;
  defaultThemeByLocale?: Partial<Record<string, Theme>>;
};

function getSavedTheme(): Theme | null {
  const v = localStorage.getItem("theme");
  return v === "light" || v === "dark" ? v : null;
}

function getSystemTheme(): Theme {
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  localStorage.setItem("theme", theme);
}

function stripLeadingLocale(pathname: string, locales: readonly string[]) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] && locales.includes(parts[0]))
    parts.shift();

  return "/" + parts.join("/");
}

function buildLocalePath(nextLocale: string, basePath: string, defaultLocale: string) {
  if (!basePath.startsWith("/"))
    basePath = `/${basePath}`;
  if (nextLocale === defaultLocale)
    return basePath === "/" ? "/" : basePath;

  return basePath === "/" ? `/${nextLocale}` : `/${nextLocale}${basePath}`;
}

export default function HeaderClient({
  navItems,
  locale,
  locales,
  defaultLocale,
  defaultThemeByLocale = { es: "dark", en: "dark", it: "dark", pr: "dark" },
}: Props) {

  const CurrentFlag = FLAG_BY_LOCALE[locale as keyof typeof FLAG_BY_LOCALE];
  const headerRef = useRef<HTMLElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const [theme, setTheme] = useState<Theme>(() => "dark");

  // Theme init/apply
  useEffect(() => {
    const t = getSavedTheme() ?? getSystemTheme();
    setTheme(t);
    applyTheme(t);
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Close on outside click / Escape
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const header = headerRef.current;
      if (!header) return;
      if (!header.contains(e.target as Node)) {
        setMenuOpen(false);
        setPanelOpen(false);
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setPanelOpen(false);
      }
    };

    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // Active section observer
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("section[id]"));
    if (!sections.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      {
        root: null,
        // Ajusta si tu header tapa contenido
        rootMargin: "-10% 0px -70% 0px",
        threshold: [0.2, 0.35, 0.5, 0.75],
      },
    );

    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const onSelectLocale = (nextLocale: string) => {
    // regla: al cambiar idioma => aplicar tema por defecto del idioma
    const nextTheme = defaultThemeByLocale[nextLocale] ?? "dark";
    setTheme(nextTheme);

    const { pathname, search, hash } = window.location;
    const basePath = stripLeadingLocale(pathname, locales);
    const nextPath = buildLocalePath(nextLocale, basePath, defaultLocale);

    // Mantiene hash (secciones) y query
    window.location.assign(`${nextPath}${search}${hash}`);
  };

  const onToggleTheme = () => {
    // regla: al cambiar tema => mantener idioma (no tocar locale)
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  const ariaExpandedMenu = menuOpen ? "true" : "false";
  const ariaExpandedPanel = panelOpen ? "true" : "false";

  return (
    <header ref={headerRef} class="sticky top-0 z-50 w-full pt-2">
      <nav
        class="mx-auto w-[min(100%-1.5rem,48rem)]
          border-2 border-gray-500 rounded-2xl
          bg-neutral-200/50 dark:bg-black/10 backdrop-blur-2xl
          px-3 py-2 md:px-6
          flex flex-col md:flex-row md:items-center md:justify-between gap-2"
      >
        {/* Top row (mobile) */}
        <div class="flex items-center justify-between md:justify-start gap-2">
          <button
            type="button"
            class="md:hidden inline-flex items-center justify-center p-2 rounded-md
              focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-controls="menu"
            aria-expanded={ariaExpandedMenu}
            onClick={() => {
              setPanelOpen(false);
              setMenuOpen((v) => !v);
            }}
          >
            <span class="sr-only">Menu</span>
            {/* SVG simple (sin depender de .astro icons) */}
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
          </button>

          <button
            type="button"
            class="md:hidden inline-flex items-center justify-center p-2 rounded-md
              focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-controls="panel"
            aria-expanded={ariaExpandedPanel}
            onClick={() => {
              setMenuOpen(false);
              setPanelOpen((v) => !v);
            }}
          >
            <span class="sr-only">Options</span>
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M4 7h10M18 7h2M4 17h2M10 17h10M14 7v0M8 17v0"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </button>

          {/* Desktop links */}
          <div class="hidden md:flex md:flex-row md:items-center md:justify-center gap-1">
            {navItems.map((link) => (
              <a
                class={`hover:bg-white/10 rounded-full px-3 py-1 transition text-sm sm:text-base capitalize ${
                  activeId === link.label ? "bg-black/10 dark:bg-white/10" : ""
                }`}
                aria-label={link.label}
                href={link.url}
              >
                {link.title}
              </a>
            ))}
          </div>
        </div>

        {/* Desktop controls */}
        <div class="hidden md:flex items-center gap-2">
          <div class="inline-flex items-center gap-2 rounded-full border border-gray-500 px-3 py-1">
            {CurrentFlag ? <CurrentFlag class="h-4 w-4" /> : null}
            <select
              class="bg-transparent text-sm outline-none"
              value={locale}
              onChange={(e) =>
                onSelectLocale((e.currentTarget as HTMLSelectElement).value)
              }
              aria-label="Language"
            >
              {locales.map((l) => (
                <option value={l}>{l.toUpperCase()}</option>
              ))}
            </select>
          </div>

          <button
            type="button"
            class="rounded-full border border-gray-500 px-3 py-1 text-sm hover:bg-white/10 transition"
            onClick={onToggleTheme}
          >
            Theme: {theme}
          </button>
        </div>

        {/* Mobile menu dropdown */}
        <div id="menu" class={`${menuOpen ? "flex" : "hidden"} md:hidden w-full flex-col gap-1 pt-1`}>
          {navItems.map((link) => (
            <a
              class={`hover:bg-white/10 rounded-xl px-3 py-2 transition text-sm capitalize ${
                activeId === link.label ? "bg-black/10 dark:bg-white/10" : ""
              }`}
              aria-label={link.label}
              href={link.url}
              onClick={() => setMenuOpen(false)}
            >
              {link.title}
            </a>
          ))}
        </div>

        {/* Mobile panel dropdown */}
        <div id="panel" class={`${panelOpen ? "flex" : "hidden"} md:hidden w-full flex-col gap-2 pt-1`}>
          <div class="flex items-center gap-2">
            <label class="text-sm">Language</label>
            <select
              class="flex-1 rounded-xl border border-gray-500 bg-transparent px-3 py-2 text-sm"
              value={locale}
              onChange={(e) => onSelectLocale((e.currentTarget as HTMLSelectElement).value)}
            >
              {locales.map((l) => (
                <option value={l}>{l.toUpperCase()}</option>
              ))}
            </select>
          </div>

          <button
            type="button"
            class="rounded-xl border border-gray-500 px-3 py-2 text-sm hover:bg-white/10 transition"
            onClick={onToggleTheme}
          >
            Theme: {theme}
          </button>
        </div>
      </nav>
    </header>
  );
}