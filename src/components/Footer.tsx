import { useTranslation } from 'react-i18next';

/** Page footer with credits. */
export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-4 border-border bg-bg/80 px-4 py-6 text-center text-lg text-text/60">
      <p>
        © {year} Gustavo Martins Grunhauser. {t('footer.rights')}
      </p>
      <p className="text-base text-text/40">{t('footer.builtWith')}</p>
    </footer>
  );
}
