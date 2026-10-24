import { useTranslation } from 'react-i18next';
import { PixelPanel } from '../components/PixelPanel';
import { SectionTitle } from '../components/SectionTitle';
import { projects } from '../data/projects';

/** Project showcase rendered as RPG inventory item cards. */
export function Projects() {
  const { t } = useTranslation();

  return (
    <section id="projects" className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionTitle title={t('projects.title')} subtitle={t('projects.subtitle')} icon="❖" />

        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <li key={project.id} className="pixel-card h-full">
              <PixelPanel as="article" className="flex h-full flex-col p-5 sm:p-6">
                <div
                  aria-hidden="true"
                  className="pixel-slot mb-4 flex aspect-video items-center justify-center bg-bg font-pixel text-2xl text-border"
                >
                  ?
                </div>
                <h3 className="text-xs text-ice sm:text-sm">{t(project.titleKey)}</h3>
                <p className="mt-3 flex-1 text-xl leading-snug text-text/80">
                  {t(project.descriptionKey)}
                </p>
                <ul className="mt-4 flex flex-wrap gap-3">
                  {project.tags.map((tag) => (
                    <li key={tag} className="pixel-slot px-2 py-0.5 text-lg text-teal">
                      {tag}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex gap-4 font-pixel text-[0.6rem]">
                  {project.githubUrl && (
                    <ProjectLink url={project.githubUrl} label={t('projects.code')} />
                  )}
                  {project.liveUrl && (
                    <ProjectLink url={project.liveUrl} label={t('projects.live')} />
                  )}
                </div>
              </PixelPanel>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** External link to a project's code or live demo. */
function ProjectLink({ url, label }: { url: string; label: string }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="text-gold hover:text-ice">
      ▶ {label}
    </a>
  );
}
