import { useTranslation } from 'react-i18next';
import { PixelKnight } from '../components/PixelKnight';
import { PixelPanel } from '../components/PixelPanel';
import { useTypewriter } from '../hooks/useTypewriter';

/** Landing section: sprite, name, typewriter class label and call-to-action buttons. */
export function Hero() {
  const { t } = useTranslation();
  const { output, done } = useTypewriter(t('hero.className'), 70, 500);

  const scrollToProjects = (): void => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center px-4 pb-16 pt-28 sm:pt-32"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-[auto_1fr] md:gap-16">
        <div className="mx-auto flex flex-col items-center gap-4">
          <PixelKnight
            label={t('hero.spriteAlt')}
            className="h-52 w-44 drop-shadow-[0_0_24px_rgb(var(--color-ice)/0.25)] sm:h-72 sm:w-60"
          />
          <span className="pixel-slot px-3 py-1 font-pixel text-[0.6rem] text-gold">
            {t('hero.level')}
          </span>
        </div>

        <PixelPanel speaker={t('hero.greeting')} className="p-6 pt-8 sm:p-10 sm:pt-12">
          <h1 className="text-lg leading-relaxed text-text [text-shadow:4px_4px_0_rgb(0_0_0/0.6)] sm:text-2xl lg:text-3xl">
            Gustavo Martins
            <br />
            <span className="text-ice">Grunhauser</span>
          </h1>

          <p className="mt-6 font-pixel text-[0.65rem] text-teal sm:text-xs">
            {t('hero.classLabel')}:
          </p>
          <p className="mt-2 min-h-[2.5rem] text-3xl text-violet sm:text-4xl" aria-live="polite">
            <span className="sr-only">{t('hero.className')}</span>
            <span aria-hidden="true">
              {output}
              <span className={`text-gold ${done ? 'animate-blink' : ''}`}>▌</span>
            </span>
          </p>
          <p className="mt-2 text-xl text-text/70">{t('hero.stats')}</p>

          <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:flex-wrap">
            <button type="button" className="pixel-btn group" onClick={scrollToProjects}>
              <span className="text-gold group-hover:animate-blink">▶</span>
              {t('hero.start')}
            </button>
          </div>
        </PixelPanel>
      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 animate-bob font-pixel text-[0.55rem] text-text/50 hover:text-gold sm:block"
      >
        {t('hero.scrollHint')}
        <span aria-hidden="true" className="mt-1 block text-center font-body text-xl text-gold">
          ▼
        </span>
      </a>
    </section>
  );
}
