import {
  partnerCountries,
  CONTRIBUTING_COUNTRIES,
  NETWORK_GLOBAL_TOTALS,
  type PartnerCountry,
} from '../data/partnerCountries'

type NetworkKey = keyof PartnerCountry['networks']

/** Same reference networks as the map country modal (issue #109). */
const REFERENCE_OBSERVATORY_NETWORK_KEYS: readonly NetworkKey[] = [
  'oceanSites',
  'gloss',
  'goShip',
  'soconet',
  'soconetMoorings',
  'oceantrax',
]

function networkContribution(value: number): number {
  return value > 0 ? value : 0
}

const totalsByNetwork = {} as Record<NetworkKey, number>
for (const { networks } of partnerCountries) {
  for (const key of Object.keys(networks) as NetworkKey[]) {
    totalsByNetwork[key] = (totalsByNetwork[key] ?? 0) + networkContribution(networks[key])
  }
}
for (const [key, total] of Object.entries(NETWORK_GLOBAL_TOTALS) as [NetworkKey, number][]) {
  totalsByNetwork[key] = total
}

function sumNetworks(keys: readonly NetworkKey[]): number {
  return keys.reduce((sum, key) => sum + (totalsByNetwork[key] ?? 0), 0)
}

const totalPlatforms = sumNetworks(Object.keys(totalsByNetwork) as NetworkKey[])
const totalReferenceObservatories = sumNetworks(REFERENCE_OBSERVATORY_NETWORK_KEYS)
const totalObservingPlatforms = totalPlatforms - totalReferenceObservatories

export const contributingCountries = CONTRIBUTING_COUNTRIES

export { totalPlatforms, totalReferenceObservatories, totalObservingPlatforms }

/** Previous GOOS Status Report edition used as baseline (update when a new report is published). */
export const LAST_REPORT_YEAR = '2025'

/** Previous report combined platform total (same methodology family). */
export const PLATFORMS_LAST_YEAR = 9389

/** Previous report reference observatory total (issue #109 split). */
export const REFERENCE_OBSERVATORIES_LAST_YEAR = 1578

/** Previous report observing platform total (excludes reference observatories). */
export const OBSERVING_PLATFORMS_LAST_YEAR =
  PLATFORMS_LAST_YEAR - REFERENCE_OBSERVATORIES_LAST_YEAR

export const platformsDeltaVsLastYear = totalPlatforms - PLATFORMS_LAST_YEAR

export const observingPlatformsDeltaVsLastYear =
  totalObservingPlatforms - OBSERVING_PLATFORMS_LAST_YEAR

export const referenceObservatoriesDeltaVsLastYear =
  totalReferenceObservatories - REFERENCE_OBSERVATORIES_LAST_YEAR

/** Previous report contributing countries count (same methodology family). */
export const CONTRIBUTING_COUNTRIES_LAST_YEAR = 64

export const countriesDeltaVsLastYear = contributingCountries - CONTRIBUTING_COUNTRIES_LAST_YEAR
