/** Supported UI languages. */
export type Language = 'en' | 'it' | 'pt';

/** A group of skills displayed as one inventory tab. */
export interface TechCategory {
  /** Category label (also used as i18n key suffix under `techStack.categories`). */
  category: string;
  /** Skill names shown in the inventory slots. */
  skills: string[];
}

/** A professional experience entry rendered in the quest log. */
export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  /** i18n key of the translated location string. */
  locationKey: string;
  /** i18n key of the translated description string. */
  descriptionKey: string;
}

/** A portfolio project rendered as an inventory card. */
export interface Project {
  id: string;
  /** i18n key of the translated title. */
  titleKey: string;
  /** i18n key of the translated description. */
  descriptionKey: string;
  tags: string[];
  /** Repository URL. Omit when the code is not public. */
  githubUrl?: string;
  /** Live demo URL. Omit when there is no demo online. */
  liveUrl?: string;
}

/** A spoken language badge in the About section. */
export interface SpokenLanguage {
  /** i18n key under `about.languages`. */
  key: string;
  /** i18n key under `about.levels`. */
  levelKey: string;
}
