# Architecture notes

Short explanations of how the site works and why it is built this way.
Useful for maintenance and for explaining technical decisions in interviews.

## Content vs. text

Data that does not depend on the language (company names, dates, URLs,
technology names) is in `src/data/*.ts`, typed with the interfaces in
`src/types`. Everything a visitor reads is in `src/i18n/locales/*.json`.
Components join the two using ids as keys, e.g. `experience.items.linx.role`.

`createI18n` receives `typeof en` as its message schema, so if `it.json` or
`pt.json` is missing a key that exists in `en.json`, `npm run typecheck` fails.

Lists of strings (job highlights, workflow items) are arrays in the JSON. They
are read with `tm()` (returns the raw messages) and `rt()` (resolves each one).

## Language selection

`src/i18n/index.ts` picks the first locale with this priority:
1. the visitor's previous choice (localStorage),
2. the browser languages (`it-IT` → `it`),
3. English.

`setLocale()` also updates `<html lang>` and the page title, because screen
readers and search engines read them. localStorage access is wrapped in
`try/catch` because some browsers block it (private mode).

## Command menu (Ctrl/⌘ + K)

`CommandPalette.vue` uses the native `<dialog>` element with `showModal()`.
That gives focus trapping, Esc to close and an inert background without
extra code. The search input follows the ARIA combobox pattern: focus stays
in the input and `aria-activedescendant` points at the highlighted option.
Search ignores case and accents (`normalize('NFD')`).

The `open` state lives in `App.vue` because two things open the menu:
the header button and the global shortcut (`useKeyboardShortcut`).

## Live GitHub repositories

`useGithubRepos` calls the public GitHub REST API:

- The request starts only when the section is near the viewport
  (`useInViewOnce`, built on `IntersectionObserver`).
- `fetch` only rejects on network errors, so `response.ok` is checked to catch
  HTTP errors such as 403 (rate limit).
- `AbortSignal.timeout()` stops a hanging request after 8 seconds.
- Results are cached in sessionStorage for 10 minutes, because anonymous
  requests are limited to 60 per hour per IP.
- The API's snake_case fields are mapped to a smaller camelCase type, so the
  rest of the app does not depend on the API shape.
- The UI has a state for each case: loading (skeleton), error (with retry),
  empty and success.

## Experience tabs

`ExperienceSection.vue` follows the WAI-ARIA tabs pattern: only the selected
tab is reachable with Tab (roving `tabindex`), arrow keys and Home/End move
between tabs, and the panel is linked with `aria-controls`/`aria-labelledby`.

## Styling

- `styles/tokens.css` holds every color, font size, spacing step and radius
  as CSS custom properties. Components never use raw values.
- Spacing uses a 4px scale (`--space-1` = 4px … `--space-24` = 96px).
- Component styles are `scoped`, so class names cannot leak between components.
- `prefers-reduced-motion` turns off smooth scrolling and animations.
- The section titles look like HTTP requests (`GET /experience 200`): a visual
  signature that points to API integration work. They are `aria-hidden`, so
  screen readers only hear the real heading.

## JSON panel in the hero

`utils/highlightJson.ts` splits `JSON.stringify` output into tokens (key,
string, punctuation) with one regular expression, and the template renders
each token as a `<span>`. No `v-html`, so there is no risk of injecting HTML.

## Deploy

`.github/workflows/deploy.yml` runs on every push to `main`: `npm ci`,
`npm run build` (which type-checks first) and publishes `dist/` to GitHub
Pages. `base: '/portfolio-gmg/'` in `vite.config.ts` matches the Pages URL.
