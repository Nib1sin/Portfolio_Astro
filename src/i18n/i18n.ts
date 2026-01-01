import es from "@/i18n/es.json";
import en from "@/i18n/en.json";
import it from "@/i18n/it.json";

export const DEFAULT_LOCALE = "es" as const;
export const LOCALES = ["es", "en", "it"] as const;
export type Locale = (typeof LOCALES)[number];
export type Dict = { [key: string]: string | Dict };
const DICTS: Record<Locale, Dict> = { es, en, it };

export function getLocaleFromPathname(pathname: string): Locale {
  const seg = pathname.split("/").filter(Boolean)[0];
  if (seg && (LOCALES as readonly string[]).includes(seg))
    return seg as Locale;

  return DEFAULT_LOCALE;
}

export function t(locale: Locale, key: string): string {
  const value = key
    .split(".")
    .reduce<unknown>((acc, part) => (acc && typeof acc === "object" ? (acc as any)[part] : undefined), DICTS[locale]);

  return typeof value === "string" ? value : key; // fallback
}