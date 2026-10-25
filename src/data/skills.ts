import type { SkillGroup } from '../types';

/** Skills grouped by area, in the order a recruiter should read them. */
export const skillGroups: SkillGroup[] = [
  { id: 'frontend', items: ['Vue.js', 'JavaScript', 'HTML5', 'CSS3', 'SASS', 'Bootstrap'] },
  {
    id: 'integration',
    items: [
      'REST APIs',
      'SOAP',
      'Webhooks',
      'JWT authentication',
      'Google Maps API',
      'Node.js + Express (basic)',
    ],
  },
  { id: 'data', items: ['SQL (MySQL, Firebird)', 'MongoDB'] },
  {
    id: 'tooling',
    items: ['Git', 'GitHub Actions', 'Docker', 'npm', 'Linux', 'Python (scripting)'],
  },
  { id: 'updating', items: ['TypeScript', 'Vue 3 Composition API', 'React'] },
];
