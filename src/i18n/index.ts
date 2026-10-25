import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import it from './locales/it.json';
import pt from './locales/pt.json';
import type { Locale } from '../types';

/** The English file is the reference: the other locales must have the same keys. */
type MessageSchema = typeof en;

/** Locales in the order they appear in the language switcher. */
export const LOCALES: readonly Locale[] = ['en', 'it', 'pt'];

/** Locale used when nothing else matches. */
export const DEFAULT_LOCALE: Locale = 'en';

/** localStorage key that remembers the visitor's choice. */
const STORAGE_KEY = 'portfolio-gmg.locale';

/**
 * Type guard for supported locale codes.
 * @param value - Any value, e.g. something read from storage.
 */
export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}

/**
 * Picks the starting locale: the saved choice first, then the browser
 * languages (`it-IT` → `it`), then {@link DEFAULT_LOCALE}.
 */
function detectLocale(): Locale {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(saved)) return saved;
  } catch {
    // Storage can be blocked (private mode, strict settings). Fall through.
  }

  for (const tag of navigator.languages ?? [navigator.language]) {
    const base = tag.toLowerCase().split('-')[0];
    if (isLocale(base)) return base;
  }
  return DEFAULT_LOCALE;
}

export const i18n = createI18n<[MessageSchema], Locale, false>({
  legacy: false,
  locale: detectLocale(),
  fallbackLocale: DEFAULT_LOCALE,
  messages: { en, it, pt },
});

/**
 * Switches the site language, saves the choice and keeps `<html lang>`
 * and the page title in sync (screen readers and search engines read both).
 * @param locale - Locale to activate.
 */
export function setLocale(locale: Locale): void {
  i18n.global.locale.value = locale;
  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // Saving is a convenience only; ignore storage errors.
  }
  syncDocument();
}

/** Copies the active locale to `<html lang>` and translates the page title. */
function syncDocument(): void {
  document.documentElement.lang = i18n.global.locale.value;
  document.title = i18n.global.t('meta.title');
}

syncDocument();
