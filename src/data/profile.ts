import type { ContactChannel, SpokenLanguage } from '../types';

/** Email address, kept in one place because the hero and the contact section both use it. */
export const EMAIL = 'guto.mart@hotmail.com';

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
