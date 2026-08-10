import { partnerCountries, type PartnerCountry } from '../data/partnerCountries'

function platforms(networks: PartnerCountry['networks']): number {
  return Object.values(networks).reduce((sum, n) => sum + (n > 0 ? n : 0), 0)
}

let contributingCountries = 0
let totalPlatforms = 0

for (const { networks } of partnerCountries) {
  const n = platforms(networks)
  totalPlatforms += n
  if (n > 0) contributingCountries += 1
}

export { contributingCountries, totalPlatforms }

/** 2024 GOOS Report Card operational platform total (same methodology family). */
export const PLATFORMS_2024 = 9389

export const platformsDeltaVs2024 = totalPlatforms - PLATFORMS_2024
