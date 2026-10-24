# portfolio-gmg

Personal developer portfolio of **Gustavo Martins Grunhauser** — Software Developer
(Vue.js, JavaScript, Python, PHP, Docker, GitHub Actions).

A pixel-art, retro-RPG themed single page available in
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
├── public/                        # Static files copied as-is (favicon)
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

## License

© Gustavo Martins Grunhauser. All rights reserved.
