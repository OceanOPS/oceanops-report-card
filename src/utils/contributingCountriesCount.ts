import type { PartnerCountry } from '../data/partnerCountries'

/**
 * GeoJSON `country_name` values eligible for the globe country filter.
 * Keep in sync with oceanops-simple-map/src/countryFilters.ts (ALL_COUNTRIES).
 */
export const FILTERABLE_GEO_COUNTRIES = [
  'ARGENTINA',
  'AUSTRALIA',
  'BAHAMAS',
  'BANGLADESH',
  'BELGIUM',
  'BERMUDA',
  'BRAZIL',
  'BULGARIA',
  'CANADA',
  'CHILE',
  'CHINA',
  'COLOMBIA',
  'COOK ISLANDS',
  'CROATIA',
  'CUBA',
  'DENMARK',
  'EUROPE',
  'FAROE IS.',
  'FIJI',
  'FINLAND',
  'FRANCE',
  'GERMANY',
  'GREECE',
  'GUINEA-BISSAU',
  'ICELAND',
  'INDIA',
  'INDONESIA',
  'IRELAND',
  'ISRAEL',
  'ITALY',
  'JAPAN',
  'JORDAN',
  'KIRIBATI',
  'MALTA',
  'MARSHALL IS.',
  'MAURITIUS',
  'MEXICO',
  'MICRONESIA',
  'NAURU',
  'NETHERLANDS',
  'NEW ZEALAND',
  'NORWAY',
  'PANAMA',
  'PERU',
  'PHILIPPINES',
  'PNG',
  'POLAND',
  'PORTUGAL',
  'PUERTO RICO',
  'RUSSIA',
  'SINGAPORE',
  'SLOVENIA',
  'SOUTH AFRICA',
  'SOUTH KOREA',
  'SPAIN',
  'SWEDEN',
  'TANZANIA',
  'THAILAND',
  'TONGA',
  'TUVALU',
  'UAE',
  'UK',
  'UKRAINE',
  'URUGUAY',
  'USA',
  'VANUATU',
  'VIET NAM',
  'WALLIS/FUTUNA',
] as const

/**
 * ISO → GeoJSON names. Keep in sync with oceanops-data-exports/geoCountryNames.mjs.
 */
const GEO_COUNTRY_NAMES_BY_ISO: Record<string, readonly string[]> = {
  AR: ['ARGENTINA'],
  AU: ['AUSTRALIA'],
  BS: ['BAHAMAS'],
  BD: ['BANGLADESH'],
  BE: ['BELGIUM'],
  BM: ['BERMUDA'],
  BR: ['BRAZIL'],
  BG: ['BULGARIA'],
  CA: ['CANADA'],
  CL: ['CHILE'],
  CN: ['CHINA', 'HONG KONG'],
  CO: ['COLOMBIA'],
  CK: ['COOK ISLANDS'],
  HR: ['CROATIA'],
  CU: ['CUBA'],
  DK: ['DENMARK'],
  EU: ['EUMETNET', 'EUROPE'],
  FJ: ['FIJI'],
  FI: ['FINLAND'],
  FO: ['FAROE IS.'],
  FR: ['FRANCE'],
  DE: ['GERMANY'],
  GR: ['GREECE'],
  GW: ['GUINEA-BISSAU'],
  IS: ['ICELAND'],
  IN: ['INDIA'],
  ID: ['INDONESIA'],
  IE: ['IRELAND'],
  IL: ['ISRAEL'],
  IT: ['ITALY'],
  JP: ['JAPAN'],
  JO: ['JORDAN'],
  KI: ['KIRIBATI'],
  KR: ['SOUTH KOREA'],
  MT: ['MALTA'],
  MH: ['MARSHALL IS.'],
  MU: ['MAURITIUS'],
  MX: ['MEXICO'],
  FM: ['MICRONESIA'],
  NR: ['NAURU'],
  NL: ['NETHERLANDS'],
  NZ: ['NEW ZEALAND'],
  NO: ['NORWAY'],
  PA: ['PANAMA'],
  PG: ['PNG'],
  PE: ['PERU'],
  PH: ['PHILIPPINES'],
  PL: ['POLAND'],
  PT: ['PORTUGAL'],
  PR: ['PUERTO RICO'],
  RU: ['RUSSIA'],
  SG: ['SINGAPORE'],
  SI: ['SLOVENIA'],
  ZA: ['SOUTH AFRICA'],
  ES: ['SPAIN'],
  SE: ['SWEDEN'],
  TH: ['THAILAND'],
  TZ: ['TANZANIA'],
  TO: ['TONGA'],
  TV: ['TUVALU'],
  UA: ['UKRAINE'],
  AE: ['UAE'],
  GB: ['UK'],
  US: ['USA'],
  UY: ['URUGUAY'],
  VU: ['VANUATU'],
  VN: ['VIET NAM'],
  WF: ['WALLIS/FUTUNA'],
}

/** Same roll-up / exclusion rules as oceanops-data-exports/partner-export/countryRollup.mjs */
const EXCLUDED_PARTNER_ISO = new Set(['AQ', 'UN', 'UNKNOWN', 'U-'])
const PARTNER_ISO_ROLLUP: Record<string, string> = { HK: 'CN', EN: 'EU' }

function normalizePartnerIso(code: string | undefined): string | null {
  const iso = String(code ?? '').trim().toUpperCase()
  if (!iso || iso === 'NULL' || iso === 'UNDEFINED') return null
  const rolled = PARTNER_ISO_ROLLUP[iso] ?? iso
  if (EXCLUDED_PARTNER_ISO.has(rolled) || EXCLUDED_PARTNER_ISO.has(iso)) return null
  return rolled
}

function partnerCountryTotal(networks: PartnerCountry['networks']): number {
  return Object.values(networks).reduce((sum, n) => sum + (n > 0 ? n : 0), 0)
}

function buildByGeoCountryName(countries: PartnerCountry[]): Record<string, string> {
  const byGeo: Record<string, string> = {}
  for (const country of countries) {
    const iso = normalizePartnerIso(country.countryCode ?? country.name)
    if (!iso) continue
    const geoNames = GEO_COUNTRY_NAMES_BY_ISO[iso] ?? []
    for (const geo of geoNames) {
      byGeo[geo] = iso
    }
  }
  return byGeo
}

function totalsByIso(countries: PartnerCountry[]): Map<string, number> {
  const totals = new Map<string, number>()
  for (const country of countries) {
    const iso = normalizePartnerIso(country.countryCode ?? country.name)
    if (!iso) continue
    totals.set(iso, (totals.get(iso) ?? 0) + partnerCountryTotal(country.networks))
  }
  return totals
}

/**
 * Contributing countries for the report card headline — same rules as the map
 * country filter (ALL_COUNTRIES whitelist + partner total > 0 + roll-ups/exclusions).
 */
export function countContributingCountries(countries: PartnerCountry[]): number {
  const byGeo = buildByGeoCountryName(countries)
  const totals = totalsByIso(countries)

  let count = 0
  for (const geo of FILTERABLE_GEO_COUNTRIES) {
    const iso = byGeo[geo]
    if (!iso) continue
    if ((totals.get(iso) ?? 0) > 0) count += 1
  }
  return count
}
