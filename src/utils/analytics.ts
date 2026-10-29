/**
 * Tiny wrapper around GoatCounter (loaded in index.html). GoatCounter has no
 * cookies and stores no personal data, so the site needs no consent banner.
 * If the script is blocked (ad blocker, offline), events are just skipped.
 */
declare global {
  interface Window {
    goatcounter?: { count: (vars: { path: string; title?: string; event?: boolean }) => void };
  }
}

/** Counts a named event, e.g. a click on the CV download button. */
export function countEvent(name: string): void {
  window.goatcounter?.count({ path: name, title: name, event: true });
}
