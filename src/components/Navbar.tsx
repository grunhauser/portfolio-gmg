import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from './LanguageSelector';

/** In-page anchors shown in the navigation, in display order. */
const NAV_ITEMS = ['about', 'techStack', 'experience', 'projects', 'contact'] as const;

/** Maps nav keys to section element ids. */
const SECTION_IDS: Readonly<Record<(typeof NAV_ITEMS)[number], string>> = {
  about: 'about',
  techStack: 'tech-stack',
  experience: 'experience',
  projects: 'projects',
  contact: 'contact',
};

/** Sticky top bar with section links, mobile menu and the flag language selector. */
export function Navbar() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-4 border-border bg-bg/90 backdrop-blur-sm">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:bg-panel focus:px-3 focus:py-2"
      >
        {t('nav.skipToContent')}
      </a>
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <a href="#top" className="font-pixel text-xs text-gold hover:text-ice sm:text-sm">
          GMG<span className="animate-blink text-ice">_</span>
        </a>

        <ul className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item}>
              <a
                href={`#${SECTION_IDS[item]}`}
                className="group font-pixel text-[0.6rem] uppercase text-text/80 hover:text-ice"
              >
                <span className="mr-1 text-gold opacity-0 group-hover:opacity-100">▶</span>
                {t(`nav.${item}`)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <LanguageSelector />
          <button
            type="button"
            className="pixel-slot flex h-8 w-8 items-center justify-center font-pixel text-xs text-ice md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? '✕' : '≡'}
          </button>
        </div>
      </nav>

      {open && (
        <ul id="mobile-menu" className="border-t-4 border-border bg-panel px-4 py-2 md:hidden">
          {NAV_ITEMS.map((item) => (
            <li key={item}>
              <a
                href={`#${SECTION_IDS[item]}`}
                onClick={() => setOpen(false)}
                className="block py-3 font-pixel text-[0.65rem] uppercase text-text hover:text-gold"
              >
                <span className="mr-2 text-gold">▶</span>
                {t(`nav.${item}`)}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
