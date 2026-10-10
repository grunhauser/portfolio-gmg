import type { Project } from '../types';

/**
 * Portfolio projects (placeholder data).
 * To add a project: append an entry here and add its `title`/`description`
 * keys under `projects.<id>` in en.json, it.json and pt.json.
 */
export const projects: Project[] = [
  {
    id: 'p1',
    titleKey: 'projects.p1.title',
    descriptionKey: 'projects.p1.description',
    tags: ['Vue.js', 'JavaScript'],
    githubUrl: '#',
    liveUrl: '#',
  },
  {
    id: 'p2',
    titleKey: 'projects.p2.title',
    descriptionKey: 'projects.p2.description',
    tags: ['PHP', 'MySQL'],
    githubUrl: '#',
    liveUrl: '#',
  },
  {
    id: 'p3',
    titleKey: 'projects.p3.title',
    descriptionKey: 'projects.p3.description',
    tags: ['Python', 'Docker'],
    githubUrl: '#',
    liveUrl: '#',
  },
];
