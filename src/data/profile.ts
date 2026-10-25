import type { ContactChannel, SpokenLanguage } from '../types';

/** Email address, kept in one place because the hero and the contact section both use it. */
export const EMAIL = 'guto.mart@hotmail.com';

/**
 * Public CV (Italian, front-end version). It is the same CV sent to companies,
 * minus the phone number, because this file is public. BASE_URL keeps the path
 * right under the GitHub Pages sub-folder.
 */
export const CV_URL = `${import.meta.env.BASE_URL}cv-gustavo-grunhauser-it.pdf`;

/** Contact channels, primary first. */
export const contactChannels: ContactChannel[] = [
  { id: 'email', href: `mailto:${EMAIL}`, display: EMAIL },
  {
    id: 'linkedin',
    href: 'https://www.linkedin.com/in/gustavo-grunhauser/',
    display: 'linkedin.com/in/gustavo-grunhauser',
  },
  { id: 'github', href: 'https://github.com/grunhauser', display: 'github.com/grunhauser' },
];

/** Spoken languages, strongest first. */
export const spokenLanguages: SpokenLanguage[] = [
  { id: 'portuguese' },
  { id: 'italian' },
  { id: 'english' },
  { id: 'spanish' },
];
