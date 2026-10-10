import type { Experience } from '../types';

/** Work history, most recent first. Text content lives in the i18n files. */
export const experience: Experience[] = [
  {
    id: 'linx',
    company: 'Linx Sistemas e Consultoria',
    role: 'Junior → Mid-Level Software Engineer',
    period: '2021 – 2026',
    locationKey: 'experience.linx.location',
    descriptionKey: 'experience.linx.description',
  },
  {
    id: 'lancert',
    company: 'Lancert Infraestrutura e Serviços em TI',
    role: 'IT Field Technician & Software Developer',
    period: '2018 – 2021',
    locationKey: 'experience.lancert.location',
    descriptionKey: 'experience.lancert.description',
  },
  {
    id: 'logycware',
    company: 'Logycware',
    role: 'Full Stack Developer (Internship)',
    period: '2016 – 2017',
    locationKey: 'experience.logycware.location',
    descriptionKey: 'experience.logycware.description',
  },
];
