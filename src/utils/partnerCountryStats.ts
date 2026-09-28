import {
  partnerCountries,
  CONTRIBUTING_COUNTRIES,
  type PartnerCountry,
} from '../data/partnerCountries'

/** Same reference networks as the map country modal (issue #109). */
const REFERENCE_OBSERVATORY_NETWORK_KEYS: (keyof PartnerCountry['networks'])[] = [
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

function sumNetworkKeys(
  networks: PartnerCountry['networks'],
  keys: readonly (keyof PartnerCountry['networks'])[]
): number {
  return keys.reduce((sum, key) => sum + networkContribution(networks[key]), 0)
}

function platforms(networks: PartnerCountry['networks']): number {
  return Object.values(networks).reduce(
    (sum, n) => sum + networkContribution(n),
    0
  )
}

let totalPlatforms = 0
let totalReferenceObservatories = 0
let totalObservingPlatforms = 0

for (const { networks } of partnerCountries) {
  const countryTotal = platforms(networks)
  const countryRef = sumNetworkKeys(networks, REFERENCE_OBSERVATORY_NETWORK_KEYS)
  totalPlatforms += countryTotal
  totalReferenceObservatories += countryRef
  totalObservingPlatforms += countryTotal - countryRef
}

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
