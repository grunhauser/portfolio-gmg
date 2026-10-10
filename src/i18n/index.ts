import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import it from './it.json';
import pt from './pt.json';
import type { Language } from '../types';

/** localStorage key used to persist the selected language. */
export const LANGUAGE_STORAGE_KEY = 'portfolio-gmg.language';

/** Languages supported by the site, in selector order. */
export const SUPPORTED_LANGUAGES: readonly Language[] = ['pt', 'it', 'en'] as const;

/** Fallback language when nothing else matches. */
export const DEFAULT_LANGUAGE: Language = 'en';

/**
 * Type guard that checks whether a string is a supported language code.
 * @param value - Candidate language code.
 */
export function isLanguage(value: unknown): value is Language {
  return typeof value === 'string' && (SUPPORTED_LANGUAGES as readonly string[]).includes(value);
}

/** Safely reads from localStorage (it may be unavailable, e.g. in private mode). */
function readStoredLanguage(): Language | null {
  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return isLanguage(stored) ? stored : null;
  } catch {
    return null;
  }
}

/**
 * Resolves the initial language: stored choice first, then the browser
 * language (e.g. `it-IT` → `it`), then {@link DEFAULT_LANGUAGE}.
 */
export function detectInitialLanguage(): Language {
  const stored = readStoredLanguage();
  if (stored) return stored;

  const candidates = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const candidate of candidates) {
    const base = candidate?.toLowerCase().split('-')[0];
    if (isLanguage(base)) return base;
  }
  return DEFAULT_LANGUAGE;
}

/**
 * Applies a language: switches i18next, persists the choice and updates
 * the `<html lang>` attribute and document title.
 * @param language - Language to activate.
 */
export async function setLanguage(language: Language): Promise<void> {
  await i18n.changeLanguage(language);
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {
    // Persisting is best-effort; ignore storage errors.
  }
}

/** Keeps `<html lang>` and the document title in sync with i18next. */
function syncDocument(language: string): void {
  document.documentElement.lang = language;
  document.title = i18n.t('meta.title');
}

i18n.on('languageChanged', syncDocument);

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    it: { translation: it },
    pt: { translation: pt },
  },
  lng: detectInitialLanguage(),
  fallbackLng: DEFAULT_LANGUAGE,
  supportedLngs: [...SUPPORTED_LANGUAGES],
  interpolation: { escapeValue: false },
  returnNull: false,
});

syncDocument(i18n.language);

export default i18n;
