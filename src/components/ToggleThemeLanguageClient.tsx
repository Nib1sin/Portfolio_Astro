import { useEffect, useMemo, useRef, useState } from "preact/hooks";

type ThemePreference = "light" | "dark" | "system";

type Props = {
  locale: string;
  locales: readonly string[];
  defaultLocale: string;
  prefixDefaultLocale?: boolean; // en tu astro.config es false
  chooseThemeLabel: string; // i18n (sr-only)
  defaultThemeByLocale?: Partial<Record<string, ThemePreference>>;
};

const THEME_OPTIONS: { label: string; value: ThemePreference }[] = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "System", value: "system" },
];

function getStoredTheme(): ThemePreference | null {
  const v = localStorage.getItem("theme");
  return v === "light" || v === "dark" || v === "system" ? v : null;
}

function isSystemDark() {
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
}

function applyTheme(pref: ThemePreference) {
  const dark = pref === "dark" || (pref === "system" && isSystemDark());
  document.documentElement.classList.toggle("dark", dark);
  localStorage.setItem("theme", pref);
}

function stripLocale(pathname: string, locales: readonly string[]) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] && locales.includes(parts[0])) parts.shift();
  return "/" + parts.join("/");
}

function buildLocalePath(
  nextLocale: string,
  basePath: string,
  defaultLocale: string,
  prefixDefaultLocale: boolean,
) {
  if (!basePath.startsWith("/")) basePath = `/${basePath}`;
  const isDefault = nextLocale === defaultLocale;
  if (isDefault && !prefixDefaultLocale) return basePath === "/" ? "/" : basePath;
  return basePath === "/" ? `/${nextLocale}` : `/${nextLocale}${basePath}`;
}

export default function ToggleThemeLanguageClient({
  locale,
  locales,
  defaultLocale,
  prefixDefaultLocale = false,
  chooseThemeLabel,
  defaultThemeByLocale = { es: "dark", en: "dark", it: "dark", pr: "dark" },
}: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  const [langOpen, setLangOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);

  const [themePref, setThemePref] = useState<ThemePreference>("system");

  // init theme + reactive system changes
  useEffect(() => {
    const initial = getStoredTheme() ?? "system";
    setThemePref(initial);
    applyTheme(initial);

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      // solo re-aplica si estás en "system"
      const stored = getStoredTheme() ?? "system";
      if (stored === "system") applyTheme("system");
    };

    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    applyTheme(themePref);
  }, [themePref]);

  // close on outside click / escape
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const root = rootRef.current;
      if (!root) return;
      if (!root.contains(e.target as Node)) {
        setLangOpen(false);
        setThemeOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLangOpen(false);
        setThemeOpen(false);
      }
    };

    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const otherLocales = useMemo(
    () => locales.filter((l) => l !== locale),
    [locales, locale],
  );

  const onSelectLocale = (nextLocale: string) => {
    // Regla tuya: al cambiar idioma => tema por defecto del idioma
    const nextTheme = defaultThemeByLocale[nextLocale] ?? "system";
    setThemePref(nextTheme);

    const { pathname, search, hash } = window.location;
    const basePath = stripLocale(pathname, locales);
    const nextPath = buildLocalePath(
      nextLocale,
      basePath,
      defaultLocale,
      prefixDefaultLocale,
    );

    window.location.assign(`${nextPath}${search}${hash}`);
  };

  return (
    <div ref={rootRef} class="flex items-center gap-2">
      {/* Language */}
      <div class="relative inline-block text-left">
        <button
          type="button"
          class="text-white rounded-md text-xs font-semibold bg-black/10 hover:bg-black/70 transition-all
            inline-flex justify-start items-center w-full gap-x-2 px-3 py-2"
          aria-haspopup="true"
          aria-expanded={langOpen ? "true" : "false"}
          onClick={(e) => {
            e.stopPropagation();
            setThemeOpen(false);
            setLangOpen((v) => !v);
          }}
        >
          <span class="min-w-6 text-center">{locale.toUpperCase()}</span>
          <span aria-hidden="true">▾</span>
        </button>

        <ul
          class={`absolute left-0 mt-1 w-full rounded-md overflow-hidden
            border border-white/10 bg-black/60 backdrop-blur-md
            ${langOpen ? "block" : "hidden"}`}
        >
          {otherLocales.map((l) => (
            <li>
              <button
                type="button"
                class="w-full text-left text-white text-xs font-semibold px-3 py-2 hover:bg-white/10"
                onClick={() => onSelectLocale(l)}
              >
                {l.toUpperCase()}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Theme */}
      <div class="relative">
        <button
          type="button"
          class="appearance-none border-none flex items-center gap-2"
          aria-haspopup="true"
          aria-expanded={themeOpen ? "true" : "false"}
          onClick={(e) => {
            e.stopPropagation();
            setLangOpen(false);
            setThemeOpen((v) => !v);
          }}
        >
          <span class="sr-only">{chooseThemeLabel}</span>
          <span class="text-xs font-semibold text-white bg-black/10 hover:bg-black/70 transition-all rounded-md px-3 py-2">
            {themePref.toUpperCase()}
          </span>
        </button>

        <div
          class={`absolute right-0 mt-1 text-sm p-1 min-w-32 rounded-md
            border border-gray-100/30 bg-white/70 dark:bg-gray-900/70 dark:border-gray-500/20
            shadow-[0_3px_10px_rgb(0,0,0,0.2)] backdrop-blur-md
            ${themeOpen ? "block" : "hidden"}`}
        >
          <ul>
            {THEME_OPTIONS.map((opt) => (
              <li>
                <button
                  type="button"
                  class={`w-full text-left px-2 py-1.5 rounded-sm
                    hover:bg-neutral-400/40 dark:hover:bg-gray-500/50
                    ${themePref === opt.value ? "font-semibold" : ""}`}
                  onClick={() => {
                    // Regla tuya: al cambiar tema => mantener idioma (no navegamos)
                    setThemePref(opt.value);
                    setThemeOpen(false);
                  }}
                >
                  {opt.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}