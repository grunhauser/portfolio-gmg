import type { Project } from '../types';

/**
 * Portfolio projects, most relevant first.
 * To add a project: append an entry here and add its `title`/`description`
 * keys under `projects.<id>` in en.json, it.json and pt.json.
 */
export const projects: Project[] = [
  {
    id: 'portfolio',
    titleKey: 'projects.portfolio.title',
    descriptionKey: 'projects.portfolio.description',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'i18next', 'GitHub Actions'],
    githubUrl: 'https://github.com/grunhauser/portfolio-gmg',
    liveUrl: 'https://grunhauser.github.io/portfolio-gmg/',
  },
  {
    id: 'linxChallenge',
    titleKey: 'projects.linxChallenge.title',
    descriptionKey: 'projects.linxChallenge.description',
    tags: ['JavaScript', 'HTML5', 'CSS3', 'REST API'],
    githubUrl: 'https://github.com/grunhauser/linx-challenger',
  },
];
