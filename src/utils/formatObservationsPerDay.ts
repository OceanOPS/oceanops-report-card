import { OBSERVATIONS_PER_DAY_AVG } from '../data/editionStats'

/** Headline format for stat4 (rounded average with "+" suffix). */
export function formatObservationsPerDay(
  avg = OBSERVATIONS_PER_DAY_AVG,
  locale = 'en-US',
): string {
  return `${avg.toLocaleString(locale)}+`
}
