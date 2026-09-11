/** GOOS Status Report — satellite adequacy timeline (1990–2034). */

export const SATELLITE_TIMELINE_START = 1990
export const SATELLITE_TIMELINE_END = 2034
export const SATELLITE_EDITION_YEAR = 2026

export const SATELLITE_ADEQUATE_COLOR = '#F48B25'
export const SATELLITE_MARGINAL_COLOR = '#F9BF86'
export const SATELLITE_INADEQUATE_COLOR = '#FEF2E7'

/** Map calendar year to horizontal position on the 1990–2034 bar (0–100%). */
function yearPercent(year: number): number {
  return (
    ((year - SATELLITE_TIMELINE_START) /
      (SATELLITE_TIMELINE_END - SATELLITE_TIMELINE_START)) *
    100
  )
}

export const SATELLITE_YEAR_LABELS = [
  '90',
  '92',
  '94',
  '96',
  '98',
  '00',
  '02',
  '04',
  '06',
  '08',
  '10',
  '12',
  '14',
  '16',
  '18',
  '20',
  '22',
  '24',
  '26',
  '28',
  '30',
  '32',
] as const

/** Two-digit tick label → calendar year (e.g. "90" → 1990, "26" → 2026). */
export function satelliteYearLabelToYear(label: string): number {
  const n = Number(label)
  return n >= 90 ? 1900 + n : 2000 + n
}

/** Horizontal position for a year tick label on the 1990–2034 axis. */
export function satelliteYearLabelLeftPercent(label: string): number {
  return yearPercent(satelliteYearLabelToYear(label))
}

/** Dashed edition marker on the 1990–2034 axis. */
export function satelliteEditionMarkerLeftPercent(
  year = SATELLITE_EDITION_YEAR,
): number {
  return yearPercent(year)
}

/** Two-digit axis labels after the edition year are shown faded. */
export function isSatelliteFutureYearLabel(label: string): boolean {
  return Number(label) > SATELLITE_EDITION_YEAR % 100
}

export type SatelliteVariableId =
  | 'seaIce'
  | 'oceanColor'
  | 'seaLevel'
  | 'seaSurfaceTemperature'
  | 'seaSurfaceSalinity'
  | 'seaState'
  | 'wind'

export type SatelliteVariableRow = {
  id: SatelliteVariableId
  /** CSS linear-gradient for the timeline bar (2026 edition, orange palette). */
  gradient: string
}

/** Gradients from the 2026 satellite table (PPT), on the 1990–2034 axis. */
export const SATELLITE_VARIABLE_ROWS: SatelliteVariableRow[] = [
  {
    id: 'seaIce',
    gradient: `linear-gradient(to right, ${SATELLITE_ADEQUATE_COLOR} 0%, ${SATELLITE_ADEQUATE_COLOR} ${yearPercent(2027)}%, ${SATELLITE_MARGINAL_COLOR} ${yearPercent(2029)}%, ${SATELLITE_MARGINAL_COLOR} 100%)`,
  },
  {
    id: 'oceanColor',
    gradient: `linear-gradient(to right, transparent 0%, transparent ${yearPercent(1996)}%, ${SATELLITE_MARGINAL_COLOR} ${yearPercent(1996)}%, ${SATELLITE_MARGINAL_COLOR} ${yearPercent(2001)}%, ${SATELLITE_ADEQUATE_COLOR} ${yearPercent(2001)}%, ${SATELLITE_ADEQUATE_COLOR} ${yearPercent(2017)}%, ${SATELLITE_MARGINAL_COLOR} ${yearPercent(2017)}%, ${SATELLITE_MARGINAL_COLOR} ${yearPercent(2023)}%, ${SATELLITE_ADEQUATE_COLOR} ${yearPercent(2023)}%, ${SATELLITE_ADEQUATE_COLOR} 100%)`,
  },
  {
    id: 'seaLevel',
    gradient: `linear-gradient(to right, transparent 0%, transparent ${yearPercent(1992)}%, ${SATELLITE_ADEQUATE_COLOR} ${yearPercent(1992)}%, ${SATELLITE_ADEQUATE_COLOR} ${yearPercent(2028)}%, ${SATELLITE_MARGINAL_COLOR} 100%)`,
  },
  {
    id: 'seaSurfaceTemperature',
    gradient: `linear-gradient(to right, ${SATELLITE_ADEQUATE_COLOR} 0%, ${SATELLITE_ADEQUATE_COLOR} ${yearPercent(2025)}%, ${SATELLITE_MARGINAL_COLOR} ${yearPercent(2027)}%, ${SATELLITE_MARGINAL_COLOR} 100%)`,
  },
  {
    id: 'seaSurfaceSalinity',
    gradient: `linear-gradient(to right, transparent 0%, transparent ${yearPercent(2010)}%, ${SATELLITE_MARGINAL_COLOR} ${yearPercent(2010)}%, ${SATELLITE_MARGINAL_COLOR} ${yearPercent(2026)}%, ${SATELLITE_INADEQUATE_COLOR} ${yearPercent(2027)}%, ${SATELLITE_INADEQUATE_COLOR} ${yearPercent(2028)}%, ${SATELLITE_MARGINAL_COLOR} ${yearPercent(2029)}%, ${SATELLITE_MARGINAL_COLOR} 100%)`,
  },
  {
    id: 'seaState',
    gradient: `linear-gradient(to right, transparent 0%, transparent ${yearPercent(1992)}%, ${SATELLITE_MARGINAL_COLOR} ${yearPercent(1992)}%, ${SATELLITE_MARGINAL_COLOR} 100%)`,
  },
  {
    id: 'wind',
    gradient: `linear-gradient(to right, ${SATELLITE_INADEQUATE_COLOR} 0%, ${SATELLITE_INADEQUATE_COLOR} ${yearPercent(2000)}%, ${SATELLITE_MARGINAL_COLOR} ${yearPercent(2003)}%, ${SATELLITE_MARGINAL_COLOR} 100%)`,
  },
]
