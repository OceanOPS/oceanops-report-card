import type { CountryYoyNetwork } from './editionYoy'

/** Partner network keys — same order as export (`NETWORK_KEYS`). */
export const PARTNER_NETWORK_KEYS = [
  'driftingBuoys',
  'argo',
  'oceanGliders',
  'aniBOS',
  'fvon',
  'sotVos',
  'sotAsap',
  'oceantrax',
  'goShip',
  'gloss',
  'oceanSites',
  'mooredBuoys',
  'tsunamiBuoys',
  'hfRadars',
] as const

export type PartnerNetworkKey = (typeof PARTNER_NETWORK_KEYS)[number]

export function partnerNetworkLabelKey(id: string): string {
  return `partners.networks.${id}`
}

export function sortCountryYoyNetworks(
  networks: CountryYoyNetwork[],
): CountryYoyNetwork[] {
  const order = new Map<string, number>(
    PARTNER_NETWORK_KEYS.map((key, index) => [key, index]),
  )
  return [...networks].sort(
    (a, b) => (order.get(a.id) ?? Number.MAX_SAFE_INTEGER) - (order.get(b.id) ?? Number.MAX_SAFE_INTEGER),
  )
}
