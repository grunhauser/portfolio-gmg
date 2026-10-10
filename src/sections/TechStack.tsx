import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PixelPanel } from '../components/PixelPanel';
import { SectionTitle } from '../components/SectionTitle';
import { techStack } from '../data/techStack';

/** Accent color per inventory tab, cycling through the palette. */
const TAB_ACCENTS = ['text-ice', 'text-teal', 'text-violet', 'text-plum'] as const;

/** Tech stack rendered as an RPG inventory with category tabs and item slots. */
export function TechStack() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const active = techStack[activeIndex] ?? techStack[0];

  return (
    <section id="tech-stack" className="px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <SectionTitle title={t('techStack.title')} subtitle={t('techStack.subtitle')} icon="⚔" />

        {/* Tabs */}
        <div role="tablist" aria-label={t('techStack.title')} className="flex flex-wrap gap-2">
          {techStack.map((group, index) => {
            const selected = index === activeIndex;
            return (
              <button
                key={group.category}
                type="button"
                role="tab"
                id={`tab-${index}`}
                aria-selected={selected}
                aria-controls="inventory-panel"
                onClick={() => setActiveIndex(index)}
                className={`pixel-slot px-3 py-2 font-pixel text-[0.55rem] uppercase transition-colors sm:text-[0.65rem] ${
                  selected
                    ? `bg-panel ${TAB_ACCENTS[index % TAB_ACCENTS.length]}`
                    : 'text-text/60 hover:text-text'
                }`}
              >
                {t(`techStack.categories.${group.category}`)}
              </button>
            );
          })}
        </div>

        <div className="mt-4">
          <PixelPanel className="p-5 sm:p-8">
            <div id="inventory-panel" role="tabpanel" aria-labelledby={`tab-${activeIndex}`}>
              <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
                {active?.skills.map((skill) => (
                  <li
                    key={skill}
                    className="pixel-slot group flex aspect-[4/3] flex-col items-center justify-center gap-2 p-2 text-center transition-transform duration-100 hover:-translate-y-1 hover:bg-panel"
                  >
                    <span
                      aria-hidden="true"
                      className={`font-pixel text-base ${TAB_ACCENTS[activeIndex % TAB_ACCENTS.length]} group-hover:text-gold`}
                    >
                      {skill.charAt(0)}
                    </span>
                    <span className="text-xl leading-tight text-text">{skill}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-right font-pixel text-[0.55rem] text-text/40">
                {active?.skills.length ?? 0} / 12
              </p>
            </div>
          </PixelPanel>
        </div>

        {/* Full overview for quick scanning by recruiters */}
        <dl className="mt-10 grid gap-4 sm:grid-cols-2">
          {techStack.map((group, index) => (
            <div key={group.category} className="pixel-slot px-4 py-3">
              <dt className={`font-pixel text-[0.6rem] ${TAB_ACCENTS[index % TAB_ACCENTS.length]}`}>
                {t(`techStack.categories.${group.category}`)}
              </dt>
              <dd className="mt-1 text-lg text-text/80">{group.skills.join(' · ')}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
