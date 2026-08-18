import { partnerCountries, type PartnerCountry } from '../data/partnerCountries'
import { countContributingCountries } from './contributingCountriesCount'

function platforms(networks: PartnerCountry['networks']): number {
  return Object.values(networks).reduce((sum, n) => sum + (n > 0 ? n : 0), 0)
}

let totalPlatforms = 0

for (const { networks } of partnerCountries) {
  totalPlatforms += platforms(networks)
}

const contributingCountries = countContributingCountries(partnerCountries)

export { contributingCountries, totalPlatforms }

/** Previous GOOS Status Report edition used as baseline (update when a new report is published). */
export const LAST_REPORT_YEAR = '2025'

/** Previous report operational platform total (same methodology family). */
export const PLATFORMS_LAST_YEAR = 9389

export const platformsDeltaVsLastYear = totalPlatforms - PLATFORMS_LAST_YEAR

/** Previous report contributing countries count (same methodology family). */
export const CONTRIBUTING_COUNTRIES_LAST_YEAR = 64

export const countriesDeltaVsLastYear = contributingCountries - CONTRIBUTING_COUNTRIES_LAST_YEAR
