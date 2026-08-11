const COUNTRY_LABELS: Record<string, string> = {
  USA: 'United States',
  UK: 'United Kingdom',
  UAE: 'United Arab Emirates',
  'SOUTH KOREA': 'South Korea',
  PNG: 'Papua New Guinea',
  EUMETNET: 'EUMETNET',
  EUROPE: 'Europe',
  'MARSHALL IS.': 'Marshall Islands',
  'COOK ISLANDS': 'Cook Islands',
  'NEW ZEALAND': 'New Zealand',
  'SOUTH AFRICA': 'South Africa',
  'PUERTO RICO': 'Puerto Rico',
  'HONG KONG': 'Hong Kong',
  'VIET NAM': 'Viet Nam',
  'WALLIS/FUTUNA': 'Wallis and Futuna',
  UN: 'United Nations',
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

export function getGeoCountryLabel(name: string): string {
  return COUNTRY_LABELS[name] ?? titleCaseWords(name)
}
