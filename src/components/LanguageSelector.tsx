import { useTranslation } from 'react-i18next';
import brFlag from '../assets/flags/br.svg';
import itFlag from '../assets/flags/it.svg';
import gbFlag from '../assets/flags/gb.svg';
import { SUPPORTED_LANGUAGES, setLanguage } from '../i18n';
import type { Language } from '../types';

const FLAGS: Readonly<Record<Language, string>> = {
  pt: brFlag,
  it: itFlag,
  en: gbFlag,
};

/**
 * Flag-based language switcher (Brazil → pt, Italy → it, UK → en).
 * The selection is persisted and `<html lang>` is updated by the i18n module.
 */
export function LanguageSelector() {
  const { t, i18n } = useTranslation();
  const current = i18n.resolvedLanguage ?? i18n.language;

  return (
    <div role="group" aria-label={t('nav.language')} className="flex items-center gap-2">
      {SUPPORTED_LANGUAGES.map((language) => {
        const active = current === language;
        return (
          <button
            key={language}
            type="button"
            onClick={() => void setLanguage(language)}
            aria-pressed={active}
            aria-label={t(`languageNames.${language}`)}
            title={t(`languageNames.${language}`)}
            className={`pixel-slot flex h-7 w-10 items-center justify-center p-0.5 transition-transform duration-100 hover:-translate-y-0.5 ${
              active ? 'opacity-100 ring-2 ring-gold' : 'opacity-60 hover:opacity-100'
            }`}
          >
            <img
              src={FLAGS[language]}
              alt=""
              width={36}
              height={24}
              className="h-full w-full object-cover"
            />
          </button>
        );
      })}
    </div>
  );
}
