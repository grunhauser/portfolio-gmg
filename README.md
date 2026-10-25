# portfolio-gmg

Personal portfolio of **Gustavo Martins Grunhauser**, front-end developer
(Vue.js, JavaScript) focused on e-commerce and API integration.

Live: <https://grunhauser.github.io/portfolio-gmg/>

Available in **English**, **Italian** and **Portuguese**.

## Tech stack

- [Vue 3](https://vuejs.org/) with `<script setup>` and the Composition API
- TypeScript (strict), type-checked with `vue-tsc`
- [vue-i18n](https://vue-i18n.intlify.dev/) for translations
- [Vite](https://vite.dev/) for development and builds
- Plain CSS with design tokens (CSS custom properties) and scoped component styles
- ESLint (flat config) + Prettier
- GitHub Actions → GitHub Pages

No UI library: every component is written by hand, so each one can be explained.

## Getting started

Requirements: Node.js 22+ and npm.

```bash
npm install          # install dependencies
npm run dev          # dev server at http://localhost:5173/portfolio-gmg/
npm run build        # type-check and build to ./dist
npm run preview      # serve the production build locally
npm run typecheck    # type-check only
npm run lint         # ESLint
npm run format       # format with Prettier
```

## Folder structure

```
src/
├── App.vue                 # Page layout; owns the command-menu state
├── main.ts                 # Entry point: creates the app, installs i18n, loads global CSS
├── components/             # Reusable UI (header, footer, language switcher, command menu, GitHub list)
├── composables/            # Reusable logic (clipboard, keyboard shortcut, GitHub API, in-view)
├── data/                   # Typed content that is not translated (jobs, skills, projects, links)
├── i18n/                   # vue-i18n setup + locales/en.json, it.json, pt.json
├── sections/               # One component per page section
├── styles/                 # tokens.css (colors, spacing, fonts) and base.css (global rules)
├── types/                  # Shared TypeScript types
└── utils/                  # Pure helpers (date formatting, JSON highlighting)
```

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for how the main pieces work and why.

## Editing content

- **Text** lives in `src/i18n/locales/*.json`. `en.json` is the reference: the
  other files must have the same keys, or the type check fails.
- **Structure** (companies, dates, links, technologies) lives in `src/data/`.
- To add a project: add an entry to `src/data/projects.ts`, then a
  `projects.items.<id>` block with `title` and `description` in each locale file.

## License

© Gustavo Martins Grunhauser. All rights reserved.
