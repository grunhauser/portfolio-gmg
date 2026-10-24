import { useTranslation } from 'react-i18next';
import { PixelPanel } from '../components/PixelPanel';
import { SectionTitle } from '../components/SectionTitle';

interface ContactLink {
  key: 'email' | 'github' | 'linkedin';
  href: string;
  display: string;
}

/** Contact channels. */
const CONTACT_LINKS: ContactLink[] = [
  {
    key: 'email',
    href: 'mailto:guto.mart@hotmail.com',
    display: 'guto.mart@hotmail.com',
  },
  {
    key: 'github',
    href: 'https://github.com/grunhauser',
    display: 'github.com/grunhauser',
  },
  {
    key: 'linkedin',
    href: 'https://www.linkedin.com/in/gustavo-grunhauser/',
    display: 'linkedin.com/in/gustavo-grunhauser',
  },
];

/** Contact section styled as a final RPG dialog with selectable options. */
export function Contact() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="px-4 pb-24 pt-20">
      <div className="mx-auto max-w-3xl">
        <SectionTitle title={t('contact.title')} icon="✉" />
        <PixelPanel speaker={t('contact.speaker')} className="p-6 pt-9 sm:p-8 sm:pt-10">
          <p className="text-2xl leading-snug">{t('contact.note')}</p>
          <ul className="mt-6 space-y-3">
            {CONTACT_LINKS.map(({ key, href, display }) => (
              <li key={key}>
                <a
                  href={href}
                  target={key === 'email' ? undefined : '_blank'}
                  rel={key === 'email' ? undefined : 'noopener noreferrer'}
                  className="group flex flex-wrap items-center gap-x-3 text-xl hover:text-gold"
                >
                  <span className="text-gold opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100">
                    ▶
                  </span>
                  <span className="font-pixel text-[0.6rem] text-teal">{t(`contact.${key}`)}</span>
                  <span className="break-all text-ice group-hover:text-gold">{display}</span>
                </a>
              </li>
            ))}
          </ul>
        </PixelPanel>
      </div>
    </section>
  );
}
