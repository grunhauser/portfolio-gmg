import { useTranslation } from 'react-i18next';
import { PixelPanel } from '../components/PixelPanel';
import { SectionTitle } from '../components/SectionTitle';
import { spokenLanguages } from '../data/languages';
import { useTypewriter } from '../hooks/useTypewriter';
import { useInView } from '../hooks/useInView';

/** "About me" narrative shown in an RPG dialog box, plus spoken language badges. */
export function About() {
  const { t } = useTranslation();
  const [ref, inView] = useInView<HTMLDivElement>();
  const text = t('about.text');
  const { output } = useTypewriter(inView ? text : '', 18, 200);

  return (
    <section id="about" className="px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <SectionTitle title={t('about.title')} icon="✦" />
        <div ref={ref}>
          <PixelPanel speaker={t('about.speaker')} className="p-6 pt-9 sm:p-8 sm:pt-10">
            {/* Invisible full text reserves the final height so layout doesn't jump. */}
            <div className="relative text-2xl leading-snug">
              <p className="invisible" aria-hidden="true">
                {text}
              </p>
              <p className="absolute inset-0">
                <span className="sr-only">{text}</span>
                <span aria-hidden="true">{output}</span>
              </p>
            </div>
            <p aria-hidden="true" className="mt-3 text-right text-gold animate-blink">
              ▼
            </p>
          </PixelPanel>
        </div>

        <h3 className="mb-4 mt-10 text-xs text-teal sm:text-sm">{t('about.languagesTitle')}</h3>
        <ul className="flex flex-wrap gap-4">
          {spokenLanguages.map(({ key, levelKey }) => (
            <li key={key} className="pixel-slot flex items-baseline gap-2 px-4 py-2">
              <span className="text-xl text-text">{t(`about.languages.${key}`)}</span>
              <span className="font-pixel text-[0.55rem] text-gold">
                {t(`about.levels.${levelKey}`)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
