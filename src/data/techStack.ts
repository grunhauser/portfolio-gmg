import type { TechCategory } from '../types';

/** Skills grouped by category, rendered as RPG inventory tabs. */
export const techStack: TechCategory[] = [
  { category: 'Frontend', skills: ['Vue.js', 'JavaScript', 'HTML5', 'CSS3', 'SASS', 'Bootstrap'] },
  { category: 'Backend', skills: ['PHP', 'Python', 'REST API', 'Webhooks'] },
  { category: 'Database', skills: ['SQL', 'NoSQL'] },
  { category: 'DevOps & Tools', skills: ['Docker', 'GitHub Actions', 'Git', 'NPM', 'Linux'] },
];
