import { getGeoCountryLabel } from './geoCountryLabels'

/** Point/image platform layers with program + ship country (matches simple-map filter set). */
export const MATRIX_LAYER_IDS = [
  'vos',
  'asap',
  'fvon',
  'gloss',
  'oceansites',
  'moored_buoys',
  'tsunami_buoys',
  'hf_radars',
  'drifting_buoys',
  'argo',
  'oceangliders',
  'anibos',
] as const

export type ProgramShipPair = {
  program: string
  ship: string
  count: number
}

export type ProgramShipMatrix = {
  programCountries: string[]
  shipCountries: string[]
  pairs: ProgramShipPair[]
  totalPlatforms: number
  mismatchCount: number
  getCount: (program: string, ship: string) => number
  getProgramTotal: (program: string) => number
  getShipTotal: (ship: string) => number
}

type GeoFeature = {
  properties?: {
    country_name?: string | null
    country_ship?: string | null
  }
}

function normalizeMapBaseUrl(mapSrc: string): string {
  return mapSrc.endsWith('/') ? mapSrc : `${mapSrc}/`
}

function sortCountryNames(names: string[]): string[] {
  return [...names].sort((a, b) =>
    getGeoCountryLabel(a).localeCompare(getGeoCountryLabel(b)),
  )
}

async function fetchLayerFeatures(
  mapBaseUrl: string,
  layerId: string,
): Promise<GeoFeature[]> {
  const url = `${normalizeMapBaseUrl(mapBaseUrl)}geojson/${layerId}.geojson`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to load ${layerId}.geojson (${response.status})`)
  }
  const data = (await response.json()) as { features?: GeoFeature[] }
  return data.features ?? []
}

export async function buildProgramShipMatrixFromGeojson(
  mapBaseUrl: string,
): Promise<ProgramShipMatrix> {
  const counts = new Map<string, number>()

  const results = await Promise.allSettled(
    MATRIX_LAYER_IDS.map((layerId) => fetchLayerFeatures(mapBaseUrl, layerId)),
  )

  for (const result of results) {
    if (result.status !== 'fulfilled') continue

    for (const feature of result.value) {
      const program = feature.properties?.country_name?.trim()
      const ship = feature.properties?.country_ship?.trim()
      if (!program || !ship || ship === 'UNKNOWN') continue

      const key = `${program}\0${ship}`
      counts.set(key, (counts.get(key) ?? 0) + 1)
    }
  }

  const programSet = new Set<string>()
  const shipSet = new Set<string>()
  const pairs: ProgramShipPair[] = []

  for (const [key, count] of counts) {
    const [program, ship] = key.split('\0')
    programSet.add(program)
    shipSet.add(ship)
    pairs.push({ program, ship, count })
  }

  pairs.sort((a, b) => b.count - a.count)

  const programTotals = new Map<string, number>()
  const shipTotals = new Map<string, number>()
  let mismatchCount = 0

  for (const { program, ship, count } of pairs) {
    programTotals.set(program, (programTotals.get(program) ?? 0) + count)
    shipTotals.set(ship, (shipTotals.get(ship) ?? 0) + count)
    if (program !== ship) mismatchCount += count
  }

  const programCountries = sortCountryNames(
    [...programSet].filter((program) => (programTotals.get(program) ?? 0) > 0),
  )
  const shipCountries = sortCountryNames(
    [...shipSet].filter((ship) => (shipTotals.get(ship) ?? 0) > 0),
  )

  return {
    programCountries,
    shipCountries,
    pairs,
    totalPlatforms: pairs.reduce((sum, pair) => sum + pair.count, 0),
    mismatchCount,
    getCount: (program, ship) => counts.get(`${program}\0${ship}`) ?? 0,
    getProgramTotal: (program) => programTotals.get(program) ?? 0,
    getShipTotal: (ship) => shipTotals.get(ship) ?? 0,
  }
}

export function filterProgramShipPairs(
  matrix: ProgramShipMatrix,
  mismatchesOnly: boolean,
): ProgramShipPair[] {
  if (!mismatchesOnly) return matrix.pairs
  return matrix.pairs.filter(({ program, ship }) => program !== ship)
}
