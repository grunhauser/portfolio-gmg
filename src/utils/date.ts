/**
 * Formats a `YYYY-MM` string as a short month and year in the given locale,
 * e.g. `2021-05` → "May 2021" (en) or "mag 2021" (it).
 *
 * The day is fixed to the 1st and the time zone to UTC, so the result never
 * shifts to the previous month because of the visitor's time zone.
 *
 * @param yearMonth - Month in `YYYY-MM` format.
 * @param locale - BCP 47 locale code, e.g. `en` or `it`.
 */
export function formatMonthYear(yearMonth: string, locale: string): string {
  const [year, month] = yearMonth.split('-').map(Number);
  if (!year || !month) return yearMonth;

  const date = new Date(Date.UTC(year, month - 1, 1));
  return new Intl.DateTimeFormat(locale, {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}
