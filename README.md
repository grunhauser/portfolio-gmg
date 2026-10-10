# portfolio-gmg

Personal developer portfolio of **Gustavo Martins Grunhauser** — Software Developer
(Vue.js, JavaScript, Python, PHP, Docker, GitHub Actions).

A pixel-art, retro-RPG themed single page (inspired by _Stoneshard_) available in
**English** (default), **Italian** and **Portuguese**.

Live: <https://grunhauser.github.io/portfolio-gmg/>

## Tech stack

- [Vite](https://vitejs.dev/) + [React 18](https://react.dev/) + TypeScript (strict mode)
- [Tailwind CSS v3](https://tailwindcss.com/) with custom "Frozen Keep" theme tokens
- [react-i18next](https://react.i18next.com/) for translations
- ESLint (with `react-hooks`) + Prettier
- GitHub Actions → GitHub Pages

## Getting started

Requirements: Node.js 20+ and npm.

```bash
npm install       # install dependencies
npm run dev       # start the dev server (http://localhost:5173/portfolio-gmg/)
npm run build     # type-check and build to ./dist
npm run preview   # serve the production build locally
npm run lint      # run ESLint
npm run format    # format sources with Prettier
```

## Folder structure

```
portfolio-gmg/
├── .github/workflows/deploy.yml   # CI: build and publish to GitHub Pages
├── public/                        # Static files copied as-is (favicon, cv.pdf)
├── src/
│   ├── assets/flags/              # SVG flags used by the language selector
│   ├── components/                # Shared UI (Navbar, PixelPanel, PixelKnight, Starfield…)
│   ├── data/                      # Typed content: experience, projects, tech stack, languages
│   ├── hooks/                     # Reusable hooks (typewriter, reduced motion, in-view)
│   ├── i18n/                      # i18next setup + en.json / it.json / pt.json
│   ├── sections/                  # Page sections: Hero, About, TechStack, Experience, Projects, Contact
│   ├── types/                     # Shared TypeScript interfaces
│   ├── App.tsx                    # Page composition
│   ├── main.tsx                   # Entry point
│   └── index.css                  # Tailwind directives, palette variables, pixel-art utilities
├── tailwind.config.ts             # Theme tokens (colors, fonts, animations)
└── vite.config.ts                 # Vite config (base: '/portfolio-gmg/')
```

## Editing content

| What                      | Where                                                  |
| ------------------------- | ------------------------------------------------------ |
| Any visible text          | `src/i18n/en.json`, `it.json`, `pt.json` (same keys)   |
| Work experience           | `src/data/experience.ts` + `experience.<id>` i18n keys |
| Skills / inventory        | `src/data/techStack.ts`                                |
| Spoken languages          | `src/data/languages.ts`                                |
| Projects                  | `src/data/projects.ts` + `projects.<id>` i18n keys     |
| Contact links (LinkedIn…) | `CONTACT_LINKS` in `src/sections/Contact.tsx`          |
| CV file                   | Replace `public/cv.pdf` (currently a placeholder)      |
| Colors                    | CSS variables in `src/index.css` (`:root`)             |

> Keep the three JSON files in sync: every key must exist in all of them.
> Do not put a phone number or home address in the public CV.

### Adding a project

1. Append an entry to `src/data/projects.ts`:

   ```ts
   {
     id: 'p4',
     titleKey: 'projects.p4.title',
     descriptionKey: 'projects.p4.description',
     tags: ['Vue.js', 'Docker'],
     githubUrl: 'https://github.com/grunhauser/my-project',
     liveUrl: '#', // '#' renders the link as "coming soon"
   }
   ```

2. Add `projects.p4.title` and `projects.p4.description` to `en.json`, `it.json` and `pt.json`.

### Changing the palette

Colors are defined once as RGB channels in `src/index.css` and exposed as Tailwind tokens
(`bg`, `panel`, `border`, `ice`, `teal`, `violet`, `plum`, `gold`, `text`) in
`tailwind.config.ts`, so classes like `bg-panel` or `text-gold/50` keep working.

## Internationalization

- Language is chosen with the flag selector (Brazil → `pt`, Italy → `it`, UK → `en`).
- The choice is stored in `localStorage` (`portfolio-gmg.language`).
- On the first visit the browser language is detected; anything else falls back to English.
- `<html lang>` and the document title are updated on every change.

## Accessibility & motion

All animations (idle sprite, drifting stars/clouds, typewriter text, hover lifts) are disabled
when the user has `prefers-reduced-motion: reduce` enabled; the typewriter shows the full text
immediately. Screen readers always receive the full text.

## Deployment

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes
`dist/` to the `gh-pages` branch using `peaceiris/actions-gh-pages`.

One-time setup on GitHub:

1. Create the repository `grunhauser/portfolio-gmg` and push this project to `main`.
2. Wait for the first workflow run to finish (it creates the `gh-pages` branch).
3. Go to **Settings → Pages** and set **Source: Deploy from a branch**, branch `gh-pages`, folder `/ (root)`.

If you rename the repository, update `base` in `vite.config.ts` and the favicon paths in `index.html`.

## License

© Gustavo Martins Grunhauser. All rights reserved.
