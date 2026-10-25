import type { Project } from '../types';

/**
 * Projects, most relevant first.
 * To add one: append an entry here and add `title` and `description`
 * under `projects.items.<id>` in every locale file. Screenshots go in
 * `public/work/`, with a caption under `projects.screens.<screenId>`.
 */
export const projects: Project[] = [
  {
    id: 'virgit',
    year: 2026,
    stack: ['React', 'TypeScript', 'Supabase', 'LLM API', 'Netlify'],
    privateCode: true,
    screens: [
      { id: 'virgitCalendar', file: 'virgit-calendar.webp' },
      { id: 'virgitAssistant', file: 'virgit-assistant.webp' },
      { id: 'virgitMobile', file: 'virgit-mobile.webp', mobile: true },
    ],
  },
  {
    id: 'hubLife',
    year: 2026,
    stack: ['React', 'TypeScript', 'Supabase', 'Gemini API', 'Vercel'],
    privateCode: true,
    screens: [
      { id: 'hubLifeHome', file: 'hublife-home.webp', mobile: true },
      { id: 'hubLifeFood', file: 'hublife-food.webp', mobile: true },
      { id: 'hubLifeAssistant', file: 'hublife-assistant.webp', mobile: true },
    ],
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
