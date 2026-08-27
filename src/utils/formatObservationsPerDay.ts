import {
  OBSERVATIONS_PERIOD_END,
  OBSERVATIONS_PERIOD_START,
  OBSERVATIONS_PER_DAY_AVG,
  OBSERVATIONS_PER_DAY_AVG_LAST_YEAR,
} from '../data/editionStats'

/** Headline format for stat4 (rounded daily average). */
export function formatObservationsPerDay(
  avg = OBSERVATIONS_PER_DAY_AVG,
  locale = 'en-US',
): string {
  return `${avg.toLocaleString(locale)}+`
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

/** YoY delta as percentage for stat4 badge (e.g. -14%). */
export function formatObservationsDeltaPct(
  delta: number,
  baseline = OBSERVATIONS_PER_DAY_AVG_LAST_YEAR,
): string {
  if (!baseline) return formatObservationsDelta(delta)
  const pct = (delta / baseline) * 100
  const rounded = Math.round(pct)
  const sign = rounded >= 0 ? '+' : ''
  return `${sign}${rounded}%`
}

/** Daily average for network YoY popup (full number so small changes stay visible). */
export function formatNetworkAvgPerDay(value: number, locale = 'en-US'): string {
  return Math.round(value).toLocaleString(locale)
}

/** Localized period label for stat4 (edition observation window). */
export function formatObservationsPeriod(locale = 'en-US') {
  const dateOpts: Intl.DateTimeFormatOptions = {
    month: 'short',
    year: 'numeric',
  }
  const start = new Date(`${OBSERVATIONS_PERIOD_START}T12:00:00`)
  const end = new Date(`${OBSERVATIONS_PERIOD_END}T12:00:00`)
  return {
    start: start.toLocaleDateString(locale, dateOpts),
    end: end.toLocaleDateString(locale, dateOpts),
  }
}
