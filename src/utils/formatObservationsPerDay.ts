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

function shiftIsoYear(isoDate: string, deltaYears: number): string {
  const date = new Date(`${isoDate}T12:00:00`)
  date.setFullYear(date.getFullYear() + deltaYears)
  return date.toISOString().slice(0, 10)
}

/** Localized date range, e.g. "Jan 2026 – Aug 2026". */
export function formatPeriodRange(
  startIso: string,
  endIso: string,
  locale = 'en-US',
): string {
  const dateOpts: Intl.DateTimeFormatOptions = {
    month: 'short',
    year: 'numeric',
  }
  const start = new Date(`${startIso}T12:00:00`)
  const end = new Date(`${endIso}T12:00:00`)
  return `${start.toLocaleDateString(locale, dateOpts)} – ${end.toLocaleDateString(locale, dateOpts)}`
}

/** Parse export label "2026-01-01 → 2026-08-31" for display. */
export function formatExportPeriodRange(period: string, locale = 'en-US'): string {
  const parts = period.split('→').map((part) => part.trim())
  if (parts.length !== 2) return period
  return formatPeriodRange(parts[0], parts[1], locale)
}

/** Localized current edition observation window, e.g. "Jan 2026 – Aug 2026". */
export function formatObservationsPeriodRange(locale = 'en-US'): string {
  return formatPeriodRange(
    OBSERVATIONS_PERIOD_START,
    OBSERVATIONS_PERIOD_END,
    locale,
  )
}

/** Current vs previous-year aligned window (same month span). */
export function formatAlignedYoyPeriods(locale = 'en-US') {
  const currentRange = formatPeriodRange(
    OBSERVATIONS_PERIOD_START,
    OBSERVATIONS_PERIOD_END,
    locale,
  )
  const previousRange = formatPeriodRange(
    shiftIsoYear(OBSERVATIONS_PERIOD_START, -1),
    shiftIsoYear(OBSERVATIONS_PERIOD_END, -1),
    locale,
  )
  return { currentRange, previousRange }
}
