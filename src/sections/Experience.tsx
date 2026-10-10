import { useTranslation } from 'react-i18next';
import { PixelPanel } from '../components/PixelPanel';
import { SectionTitle } from '../components/SectionTitle';
import { experience } from '../data/experience';

/** Small pixel-art scroll icon used as a timeline marker. */
function ScrollIcon() {
  return (
    <svg
      viewBox="0 0 10 10"
      className="pixelated h-8 w-8"
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <rect x="1" y="1" width="8" height="2" fill="#b8975a" />
      <rect x="2" y="3" width="6" height="5" fill="#dbe6ee" />
      <rect x="3" y="4" width="4" height="1" fill="#2a4560" />
      <rect x="3" y="6" width="3" height="1" fill="#2a4560" />
      <rect x="1" y="7" width="8" height="2" fill="#b8975a" />
      <rect x="0" y="1" width="1" height="2" fill="#8a6d3b" />
      <rect x="9" y="7" width="1" height="2" fill="#8a6d3b" />
    </svg>
  );
}

/** Work experience shown as a vertical RPG quest log. */
export function Experience() {
  const { t } = useTranslation();

  return (
    <section id="experience" className="px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <SectionTitle title={t('experience.title')} icon="✠" />

        <ol className="relative ml-4 border-l-4 border-dashed border-border sm:ml-6">
          {experience.map((entry, index) => (
            <li key={entry.id} className="relative mb-10 pl-8 last:mb-0 sm:pl-12">
              <span className="absolute -left-[22px] top-4 bg-bg p-0.5">
                <ScrollIcon />
              </span>
              <div className="pixel-card">
                <PixelPanel className="p-5 sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-pixel text-[0.6rem] text-gold">{entry.period}</span>
                    <span
                      className={`pixel-slot px-2 py-0.5 font-pixel text-[0.5rem] ${
                        index === 0 ? 'text-teal' : 'text-text/50'
                      }`}
                    >
                      {index === 0 ? t('experience.current') : `✓ ${t('experience.completed')}`}
                    </span>
                  </div>
                  <h3 className="mt-3 text-xs leading-relaxed text-ice sm:text-sm">{entry.role}</h3>
                  <p className="mt-1 text-2xl text-violet">{entry.company}</p>
                  <p className="text-lg text-text/60">⌖ {t(entry.locationKey)}</p>
                  <p className="mt-3 text-xl leading-snug text-text/90">
                    {t(entry.descriptionKey)}
                  </p>
                </PixelPanel>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
