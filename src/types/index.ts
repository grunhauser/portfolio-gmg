/** Locales the site is translated into. */
export type Locale = 'en' | 'it' | 'pt';

/** Ids of the page sections, used both as anchors and as i18n keys under `nav`. */
export type SectionId = 'about' | 'experience' | 'skills' | 'projects' | 'workflow' | 'contact';

/** A job in the experience timeline. Translated text lives under `experience.items.<id>`. */
export interface Job {
  /** Key under `experience.items` in the locale files. */
  id: 'linx' | 'lancert' | 'logycware';
  company: string;
  /** Product or division inside the company, when relevant. */
  team?: string;
  /** Start month as `YYYY-MM`. */
  start: string;
  /** End month as `YYYY-MM`. */
  end: string;
}

/** A row of the skills list. The label lives under `skills.groups.<id>`. */
export interface SkillGroup {
  id: 'frontend' | 'integration' | 'data' | 'tooling' | 'updating';
  /** Technology names. They are proper nouns, so they are not translated. */
  items: string[];
}

/** A portfolio project. Title and description live under `projects.items.<id>`. */
export interface Project {
  id: 'virgit' | 'hubLife' | 'portfolio' | 'linxChallenge';
  /** Year the project was made, shown next to the title. */
  year: number;
  stack: string[];
  /** Public repository. Omit when the code is not public. */
  repoUrl?: string;
  /** Live version. Omit when nothing is online. */
  liveUrl?: string;
  /** True when the source code is private; the card says so instead of linking to it. */
  privateCode?: boolean;
  /** Screenshots, first one is the cover. Captions live under `projects.screens.<id>`. */
  screens?: ProjectScreen[];
}

/** One screenshot of a project, stored in `public/work/`. */
export interface ProjectScreen {
  id: string;
  /** File name inside `public/work/`. */
  file: string;
  /** Phone-sized image, shown narrower so it is not blown up. */
  mobile?: boolean;
}

/** A spoken language. Name and level live under `about.languages.<id>`. */
export interface SpokenLanguage {
  id: 'portuguese' | 'italian' | 'english' | 'spanish';
}

/** A way to reach me, shown in the contact section. */
export interface ContactChannel {
  /** Key under `contact.channels` for the visible label. */
  id: 'email' | 'linkedin' | 'github';
  href: string;
  /** Human-readable form of the link. */
  display: string;
}
