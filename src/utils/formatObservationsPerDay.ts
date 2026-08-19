import {
  OBSERVATIONS_DAYS_WINDOW,
  OBSERVATIONS_PERIOD_END,
  OBSERVATIONS_PERIOD_START,
  OBSERVATIONS_PER_DAY_AVG,
} from '../data/editionStats'

/** Headline format for stat4 (rounded daily average). */
export function formatObservationsPerDay(
  avg = OBSERVATIONS_PER_DAY_AVG,
  locale = 'en-US',
): string {
  return avg.toLocaleString(locale)
}

/** Compact delta for stat4 badge (e.g. -17k) when values are large. */
export function formatObservationsDelta(delta: number): string {
  const abs = Math.abs(delta)
  if (abs >= 1000) {
    const k = Math.round(abs / 1000)
    return `${delta >= 0 ? '+' : '-'}${k}k`
  }
  return `${delta >= 0 ? '+' : ''}${delta.toLocaleString('en-US')}`
}

/** Localized period label for stat4 (rolling window dates). */
export function formatObservationsPeriod(locale = 'en-US') {
  const dateOpts: Intl.DateTimeFormatOptions = {
    month: 'short',
    year: 'numeric',
  }
  const start = new Date(`${OBSERVATIONS_PERIOD_START}T12:00:00`)
  const end = new Date(`${OBSERVATIONS_PERIOD_END}T12:00:00`)
  return {
    days: OBSERVATIONS_DAYS_WINDOW,
    start: start.toLocaleDateString(locale, dateOpts),
    end: end.toLocaleDateString(locale, dateOpts),
  }
}
