/** Align with simple-map countryFilters (partner export roll-up). */
const GEO_COUNTRY_ALIAS_TO_CANONICAL: Record<string, string> = {
  'HONG KONG': 'CHINA',
  EUMETNET: 'EUROPE',
}

const IGNORED_GEO_COUNTRIES = new Set([
  'UNKNOWN',
  'ANTARCTICA',
  'UN',
  'UNITED NATIONS',
])

const COUNTRY_LABELS: Record<string, string> = {
  USA: 'United States',
  UK: 'United Kingdom',
  UAE: 'United Arab Emirates',
  'SOUTH KOREA': 'South Korea',
  PNG: 'Papua New Guinea',
  EUROPE: 'European Union',
  CHINA: 'China',
  'MARSHALL IS.': 'Marshall Islands',
  'COOK ISLANDS': 'Cook Islands',
  'NEW ZEALAND': 'New Zealand',
  'SOUTH AFRICA': 'South Africa',
  'PUERTO RICO': 'Puerto Rico',
  'VIET NAM': 'Viet Nam',
  'WALLIS/FUTUNA': 'Wallis and Futuna',
}

function titleCaseWords(value: string): string {
  return value
    .split(/(\s+|\/)/)
    .map((part) => {
      if (!part.trim() || part === '/') return part
      const lower = part.toLowerCase()
      return lower.charAt(0).toUpperCase() + lower.slice(1)
    })
    .join('')
}

/** Normalize a raw GeoJSON `country_name`; null when ignored. */
export function normalizeGeoCountryKey(geoName: string): string | null {
  const upper = geoName.trim().toUpperCase()
  if (!upper || IGNORED_GEO_COUNTRIES.has(upper)) return null

  const canonical = GEO_COUNTRY_ALIAS_TO_CANONICAL[upper] ?? upper
  if (IGNORED_GEO_COUNTRIES.has(canonical)) return null
  return canonical
}

export function getGeoCountryLabel(name: string): string {
  const canonical = normalizeGeoCountryKey(name)
  const key = canonical ?? name.trim().toUpperCase()
  return COUNTRY_LABELS[key] ?? titleCaseWords(key)
}
