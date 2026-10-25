import type { Project } from '../types';

/**
 * Projects, most relevant first.
 * To add one: append an entry here and add `title` and `description`
 * under `projects.items.<id>` in every locale file.
 */
export const projects: Project[] = [
  {
    id: 'virgit',
    year: 2026,
    stack: ['React', 'TypeScript', 'Supabase', 'LLM API', 'Netlify'],
    liveUrl: 'https://virgit.netlify.app/',
    privateCode: true,
  },
  {
    id: 'hubLife',
    year: 2026,
    stack: ['React', 'TypeScript', 'Supabase', 'Gemini API', 'Vercel'],
    privateCode: true,
  },
  {
    id: 'portfolio',
    year: 2026,
    stack: ['Vue 3', 'TypeScript', 'vue-i18n', 'Vite', 'GitHub Actions'],
    repoUrl: 'https://github.com/grunhauser/portfolio-gmg',
    liveUrl: 'https://grunhauser.github.io/portfolio-gmg/',
  },
  {
    id: 'linxChallenge',
    year: 2021,
    stack: ['JavaScript', 'HTML', 'CSS', 'REST API'],
    repoUrl: 'https://github.com/grunhauser/linx-challenger',
  },
];
