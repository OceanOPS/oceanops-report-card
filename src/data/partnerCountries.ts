/**
 * Partner Countries Data
 *
 * Complete list of partner countries with their ocean observing platform counts
 * across 14 fixed network types.
 *
 * Data source: OceanOPS partner database
 *
 * Note: goShip can be:
 * - A number (0 or positive): actual platform count
 * - -1: represents "X" (participates but count not tracked)
 */

interface CountryNetworks {
  driftingBuoys: number
  argo: number
  oceanGliders: number
  aniBOS: number
  fvon: number
  sotVos: number
  sotAsap: number
  sot: number
  goShip: number // -1 represents "X" (participates but not counted)
  gloss: number
  oceanSites: number
  mooredBuoys: number
  tsunamiBuoys: number
  hfRadars: number
}

export interface PartnerCountry {
  name: string
  countryCode?: string // ISO 3166-1 alpha-2 code for flag display
  description?: string // Optional description specific to this country
  networks: CountryNetworks
}

export const partnerCountries: PartnerCountry[] = [
  {
    name: "Argentina",
    countryCode: "AR",
    networks: { driftingBuoys: 0, argo: 0, oceanGliders: 0, aniBOS: 0, fvon: 0, sotVos: 0, sotAsap: 0, sot: 0, goShip: 0, gloss: 4, oceanSites: 0, mooredBuoys: 0, tsunamiBuoys: 0, hfRadars: 0 }
  },
  {
    name: "Australia",
    countryCode: "AU",
    networks: { driftingBuoys: 49, argo: 292, oceanGliders: 37, aniBOS: 57, fvon: 68, sotVos: 29, sotAsap: 0, sot: 6, goShip: -1, gloss: 15, oceanSites: 2, mooredBuoys: 33, tsunamiBuoys: 4, hfRadars: 12 }
  },
  {
    name: "Bahamas",
    countryCode: "BS",
    networks: { driftingBuoys: 0, argo: 0, oceanGliders: 0, aniBOS: 0, fvon: 1, sotVos: 0, sotAsap: 0, sot: 0, goShip: 0, gloss: 0, oceanSites: 0, mooredBuoys: 0, tsunamiBuoys: 0, hfRadars: 0 }
  },
  {
    name: "Bangladesh",
    countryCode: "BD",
    networks: { driftingBuoys: 0, argo: 0, oceanGliders: 0, aniBOS: 0, fvon: 4, sotVos: 0, sotAsap: 0, sot: 0, goShip: 0, gloss: 0, oceanSites: 0, mooredBuoys: 0, tsunamiBuoys: 0, hfRadars: 0 }
  },
  {
    name: "Belgium",
    countryCode: "BE",
    networks: { driftingBuoys: 0, argo: 0, oceanGliders: 1, aniBOS: 0, fvon: 0, sotVos: 0, sotAsap: 0, sot: 0, goShip: 0, gloss: 0, oceanSites: 0, mooredBuoys: 0, tsunamiBuoys: 0, hfRadars: 0 }
  },
  {
    name: "Bermuda",
    countryCode: "BM",
    networks: { driftingBuoys: 0, argo: 0, oceanGliders: 1, aniBOS: 0, fvon: 0, sotVos: 0, sotAsap: 0, sot: 0, goShip: 0, gloss: 1, oceanSites: 0, mooredBuoys: 0, tsunamiBuoys: 0, hfRadars: 0 }
  },
  {
    name: "Brazil",
    countryCode: "BR",
    networks: { driftingBuoys: 0, argo: 5, oceanGliders: 0, aniBOS: 0, fvon: 0, sotVos: 0, sotAsap: 0, sot: 0, goShip: 0, gloss: 1, oceanSites: 1, mooredBuoys: 0, tsunamiBuoys: 0, hfRadars: 2 }
  },
  {
    name: "Bulgaria",
    countryCode: "BG",
    networks: { driftingBuoys: 0, argo: 11, oceanGliders: 0, aniBOS: 0, fvon: 0, sotVos: 0, sotAsap: 0, sot: 0, goShip: 0, gloss: 0, oceanSites: 0, mooredBuoys: 0, tsunamiBuoys: 0, hfRadars: 0 }
  },
  {
    name: "Canada",
    countryCode: "CA",
    networks: { driftingBuoys: 3, argo: 204, oceanGliders: 70, aniBOS: 0, fvon: 0, sotVos: 33, sotAsap: 0, sot: 0, goShip: -1, gloss: 5, oceanSites: 5, mooredBuoys: 34, tsunamiBuoys: 0, hfRadars: 13 }
  },
  {
    name: "Chile",
    countryCode: "CL",
    networks: { driftingBuoys: 0, argo: 0, oceanGliders: 0, aniBOS: 0, fvon: 0, sotVos: 2, sotAsap: 0, sot: 0, goShip: 0, gloss: 6, oceanSites: 0, mooredBuoys: 0, tsunamiBuoys: 2, hfRadars: 0 }
  },
  {
    name: "China",
    countryCode: "CN",
    networks: { driftingBuoys: 4, argo: 83, oceanGliders: 0, aniBOS: 0, fvon: 0, sotVos: 55, sotAsap: 0, sot: 0, goShip: 0, gloss: 5, oceanSites: 7, mooredBuoys: 0, tsunamiBuoys: 0, hfRadars: 19 }
  },
  {
    name: "Colombia",
    countryCode: "CO",
    networks: { driftingBuoys: 0, argo: 1, oceanGliders: 0, aniBOS: 0, fvon: 0, sotVos: 0, sotAsap: 0, sot: 0, goShip: 0, gloss: 0, oceanSites: 0, mooredBuoys: 0, tsunamiBuoys: 0, hfRadars: 0 }
  },
  {
    name: "Croatia",
    countryCode: "HR",
    networks: { driftingBuoys: 0, argo: 0, oceanGliders: 0, aniBOS: 0, fvon: 0, sotVos: 0, sotAsap: 0, sot: 0, goShip: 0, gloss: 0, oceanSites: 0, mooredBuoys: 0, tsunamiBuoys: 0, hfRadars: 6 }
  },
  {
    name: "Cuba",
    countryCode: "CU",
    networks: { driftingBuoys: 0, argo: 0, oceanGliders: 0, aniBOS: 0, fvon: 0, sotVos: 0, sotAsap: 0, sot: 0, goShip: 0, gloss: 3, oceanSites: 0, mooredBuoys: 0, tsunamiBuoys: 0, hfRadars: 0 }
  },
  {
    name: "Cyprus",
    countryCode: "CY",
    networks: { driftingBuoys: 0, argo: 0, oceanGliders: 0, aniBOS: 0, fvon: 0, sotVos: 0, sotAsap: 0, sot: 0, goShip: 0, gloss: 0, oceanSites: 0, mooredBuoys: 0, tsunamiBuoys: 0, hfRadars: 0 }
  },
  {
    name: "Denmark",
    countryCode: "DK",
    networks: { driftingBuoys: 0, argo: 7, oceanGliders: 0, aniBOS: 0, fvon: 0, sotVos: 0, sotAsap: 0, sot: 0, goShip: 0, gloss: 3, oceanSites: 4, mooredBuoys: 0, tsunamiBuoys: 0, hfRadars: 0 }
  },
  {
    name: "Estonia",
    countryCode: "EE",
    networks: { driftingBuoys: 0, argo: 0, oceanGliders: 0, aniBOS: 0, fvon: 0, sotVos: 0, sotAsap: 0, sot: 0, goShip: 0, gloss: 0, oceanSites: 0, mooredBuoys: 0, tsunamiBuoys: 0, hfRadars: 0 }
  },
  {
    name: "European Union",
    countryCode: "EU",
    description: "Platforms operated by Euro-Argo ERIC, EMSO ERIC, EUMETNET, EUMETSAT.",
    networks: { driftingBuoys: 89, argo: 33, oceanGliders: 0, aniBOS: 0, fvon: 0, sotVos: 1, sotAsap: 12, sot: 0, goShip: 0, gloss: 0, oceanSites: 3, mooredBuoys: 0, tsunamiBuoys: 0, hfRadars: 0 }
  },
  {
    name: "Finland",
    countryCode: "FI",
    networks: { driftingBuoys: 0, argo: 3, oceanGliders: 0, aniBOS: 0, fvon: 0, sotVos: 0, sotAsap: 0, sot: 0, goShip: 0, gloss: 0, oceanSites: 0, mooredBuoys: 0, tsunamiBuoys: 0, hfRadars: 0 }
  },
  {
    name: "France",
    countryCode: "FR",
    description: "France plays a leading role in global ocean observation through its extensive network of platforms. The country's commitment to GOOS includes significant contributions to Argo floats, ocean gliders, and ship-based observations across multiple ocean basins.",
    networks: { driftingBuoys: 2, argo: 289, oceanGliders: 58, aniBOS: 2, fvon: 0, sotVos: 56, sotAsap: 0, sot: 0, goShip: -1, gloss: 12, oceanSites: 6, mooredBuoys: 33, tsunamiBuoys: 0, hfRadars: 9 }
  },
  {
    name: "Germany",
    countryCode: "DE",
    networks: { driftingBuoys: 0, argo: 282, oceanGliders: 10, aniBOS: 0, fvon: 0, sotVos: 323, sotAsap: 0, sot: 0, goShip: -1, gloss: 1, oceanSites: 43, mooredBuoys: 7, tsunamiBuoys: 0, hfRadars: 3 }
  },
  {
    name: "Greece",
    countryCode: "GR",
    networks: { driftingBuoys: 0, argo: 6, oceanGliders: 0, aniBOS: 0, fvon: 0, sotVos: 1, sotAsap: 0, sot: 0, goShip: 0, gloss: 0, oceanSites: 1, mooredBuoys: 0, tsunamiBuoys: 0, hfRadars: 2 }
  },
  {
    name: "Iceland",
    countryCode: "IS",
    networks: { driftingBuoys: 0, argo: 0, oceanGliders: 0, aniBOS: 0, fvon: 0, sotVos: 0, sotAsap: 0, sot: 0, goShip: 0, gloss: 1, oceanSites: 1, mooredBuoys: 0, tsunamiBuoys: 0, hfRadars: 0 }
  },
  {
    name: "India",
    countryCode: "IN",
    networks: { driftingBuoys: 3, argo: 97, oceanGliders: 0, aniBOS: 0, fvon: 0, sotVos: 0, sotAsap: 0, sot: 0, goShip: 0, gloss: 5, oceanSites: 12, mooredBuoys: 12, tsunamiBuoys: 1, hfRadars: 10 }
  },
  {
    name: "Indonesia",
    countryCode: "ID",
    networks: { driftingBuoys: 0, argo: 1, oceanGliders: 0, aniBOS: 0, fvon: 0, sotVos: 0, sotAsap: 0, sot: 0, goShip: 0, gloss: 0, oceanSites: 0, mooredBuoys: 0, tsunamiBuoys: 0, hfRadars: 2 }
  },
  {
    name: "Ireland",
    countryCode: "IE",
    networks: { driftingBuoys: 0, argo: 9, oceanGliders: 0, aniBOS: 0, fvon: 0, sotVos: 0, sotAsap: 0, sot: 0, goShip: -1, gloss: 0, oceanSites: 0, mooredBuoys: 5, tsunamiBuoys: 0, hfRadars: 4 }
  },
  {
    name: "Israel",
    countryCode: "IL",
    networks: { driftingBuoys: 0, argo: 0, oceanGliders: 0, aniBOS: 0, fvon: 0, sotVos: 0, sotAsap: 0, sot: 0, goShip: 0, gloss: 1, oceanSites: 0, mooredBuoys: 0, tsunamiBuoys: 0, hfRadars: 4 }
  },
  {
    name: "Italy",
    countryCode: "IT",
    networks: { driftingBuoys: 23, argo: 93, oceanGliders: 5, aniBOS: 0, fvon: 0, sotVos: 0, sotAsap: 0, sot: 0, goShip: 0, gloss: 1, oceanSites: 2, mooredBuoys: 0, tsunamiBuoys: 0, hfRadars: 27 }
  },
  {
    name: "Japan",
    countryCode: "JP",
    networks: { driftingBuoys: 21, argo: 157, oceanGliders: 0, aniBOS: 0, fvon: 0, sotVos: 142, sotAsap: 1, sot: 2, goShip: -1, gloss: 14, oceanSites: 5, mooredBuoys: 0, tsunamiBuoys: 0, hfRadars: 22 }
  },
  {
    name: "Jordan",
    countryCode: "JO",
    networks: { driftingBuoys: 0, argo: 0, oceanGliders: 0, aniBOS: 0, fvon: 0, sotVos: 0, sotAsap: 0, sot: 0, goShip: 0, gloss: 0, oceanSites: 0, mooredBuoys: 0, tsunamiBuoys: 0, hfRadars: 1 }
  },
  {
    name: "Kiribati",
    countryCode: "KI",
    networks: { driftingBuoys: 0, argo: 0, oceanGliders: 0, aniBOS: 0, fvon: 0, sotVos: 0, sotAsap: 0, sot: 0, goShip: 0, gloss: 1, oceanSites: 0, mooredBuoys: 0, tsunamiBuoys: 0, hfRadars: 0 }
  },
  {
    name: "Korea (Republic Of)",
    countryCode: "KR",
    networks: { driftingBuoys: 9, argo: 10, oceanGliders: 0, aniBOS: 0, fvon: 0, sotVos: 16, sotAsap: 0, sot: 0, goShip: 0, gloss: 1, oceanSites: 27, mooredBuoys: 30, tsunamiBuoys: 0, hfRadars: 25 }
  },
  {
    name: "Malta",
    countryCode: "MT",
    networks: { driftingBuoys: 0, argo: 0, oceanGliders: 0, aniBOS: 0, fvon: 0, sotVos: 0, sotAsap: 0, sot: 0, goShip: 0, gloss: 0, oceanSites: 0, mooredBuoys: 0, tsunamiBuoys: 0, hfRadars: 4 }
  },
  {
    name: "Marshall Islands",
    countryCode: "MH",
    networks: { driftingBuoys: 0, argo: 0, oceanGliders: 0, aniBOS: 0, fvon: 0, sotVos: 0, sotAsap: 0, sot: 0, goShip: 0, gloss: 3, oceanSites: 0, mooredBuoys: 0, tsunamiBuoys: 0, hfRadars: 0 }
  },
  {
    name: "Mauritius",
    countryCode: "MU",
    networks: { driftingBuoys: 0, argo: 0, oceanGliders: 0, aniBOS: 0, fvon: 0, sotVos: 0, sotAsap: 0, sot: 0, goShip: 0, gloss: 3, oceanSites: 0, mooredBuoys: 0, tsunamiBuoys: 0, hfRadars: 0 }
  },
  {
    name: "Mexico",
    countryCode: "MX",
    networks: { driftingBuoys: 0, argo: 0, oceanGliders: 4, aniBOS: 0, fvon: 0, sotVos: 0, sotAsap: 0, sot: 0, goShip: 0, gloss: 0, oceanSites: 0, mooredBuoys: 0, tsunamiBuoys: 0, hfRadars: 1 }
  },
  {
    name: "Micronesia, Federated States Of",
    countryCode: "FM",
    networks: { driftingBuoys: 0, argo: 0, oceanGliders: 0, aniBOS: 0, fvon: 0, sotVos: 0, sotAsap: 0, sot: 0, goShip: 0, gloss: 1, oceanSites: 0, mooredBuoys: 0, tsunamiBuoys: 0, hfRadars: 0 }
  },
  {
    name: "Nauru",
    countryCode: "NR",
    networks: { driftingBuoys: 0, argo: 0, oceanGliders: 0, aniBOS: 0, fvon: 0, sotVos: 0, sotAsap: 0, sot: 0, goShip: 0, gloss: 1, oceanSites: 0, mooredBuoys: 0, tsunamiBuoys: 0, hfRadars: 0 }
  },
  {
    name: "Netherlands",
    countryCode: "NL",
    networks: { driftingBuoys: 0, argo: 31, oceanGliders: 0, aniBOS: 0, fvon: 0, sotVos: 12, sotAsap: 0, sot: 0, goShip: 0, gloss: 0, oceanSites: 8, mooredBuoys: 0, tsunamiBuoys: 0, hfRadars: 2 }
  },
  {
    name: "New Zealand",
    countryCode: "NZ",
    networks: { driftingBuoys: 2, argo: 17, oceanGliders: 0, aniBOS: 0, fvon: 0, sotVos: 0, sotAsap: 0, sot: 0, goShip: 0, gloss: 3, oceanSites: 0, mooredBuoys: 0, tsunamiBuoys: 10, hfRadars: 0 }
  },
  {
    name: "Norway",
    countryCode: "NO",
    networks: { driftingBuoys: 0, argo: 32, oceanGliders: 3, aniBOS: 0, fvon: 0, sotVos: 2, sotAsap: 0, sot: 0, goShip: -1, gloss: 6, oceanSites: 3, mooredBuoys: 0, tsunamiBuoys: 0, hfRadars: 8 }
  },
  {
    name: "Panama",
    countryCode: "PA",
    networks: { driftingBuoys: 0, argo: 0, oceanGliders: 0, aniBOS: 0, fvon: 0, sotVos: 0, sotAsap: 0, sot: 0, goShip: 0, gloss: 1, oceanSites: 0, mooredBuoys: 0, tsunamiBuoys: 0, hfRadars: 0 }
  },
  {
    name: "Papua New Guinea",
    countryCode: "PG",
    networks: { driftingBuoys: 0, argo: 0, oceanGliders: 0, aniBOS: 0, fvon: 0, sotVos: 0, sotAsap: 0, sot: 0, goShip: 0, gloss: 1, oceanSites: 0, mooredBuoys: 0, tsunamiBuoys: 0, hfRadars: 0 }
  },
  {
    name: "Peru",
    countryCode: "PE",
    networks: { driftingBuoys: 0, argo: 0, oceanGliders: 4, aniBOS: 0, fvon: 0, sotVos: 0, sotAsap: 0, sot: 0, goShip: 0, gloss: 0, oceanSites: 2, mooredBuoys: 0, tsunamiBuoys: 0, hfRadars: 0 }
  },
  {
    name: "Philippines",
    countryCode: "PH",
    networks: { driftingBuoys: 0, argo: 0, oceanGliders: 0, aniBOS: 0, fvon: 0, sotVos: 0, sotAsap: 0, sot: 0, goShip: 0, gloss: 3, oceanSites: 0, mooredBuoys: 0, tsunamiBuoys: 0, hfRadars: 0 }
  },
  {
    name: "Poland",
    countryCode: "PL",
    networks: { driftingBuoys: 0, argo: 11, oceanGliders: 0, aniBOS: 0, fvon: 0, sotVos: 0, sotAsap: 0, sot: 0, goShip: 0, gloss: 0, oceanSites: 0, mooredBuoys: 0, tsunamiBuoys: 0, hfRadars: 0 }
  },
  {
    name: "Portugal",
    countryCode: "PT",
    networks: { driftingBuoys: 0, argo: 1, oceanGliders: 0, aniBOS: 0, fvon: 0, sotVos: 1, sotAsap: 0, sot: 0, goShip: 0, gloss: 0, oceanSites: 0, mooredBuoys: 6, tsunamiBuoys: 0, hfRadars: 10 }
  },
  {
    name: "Puerto Rico",
    countryCode: "PR",
    networks: { driftingBuoys: 0, argo: 0, oceanGliders: 0, aniBOS: 0, fvon: 0, sotVos: 0, sotAsap: 0, sot: 0, goShip: 0, gloss: 1, oceanSites: 0, mooredBuoys: 0, tsunamiBuoys: 0, hfRadars: 0 }
  },
  {
    name: "Russian Federation",
    countryCode: "RU",
    networks: { driftingBuoys: 0, argo: 0, oceanGliders: 0, aniBOS: 0, fvon: 0, sotVos: 10, sotAsap: 0, sot: 0, goShip: 0, gloss: 5, oceanSites: 0, mooredBuoys: 0, tsunamiBuoys: 0, hfRadars: 1 }
  },
  {
    name: "Singapore",
    countryCode: "SG",
    networks: { driftingBuoys: 0, argo: 0, oceanGliders: 0, aniBOS: 0, fvon: 0, sotVos: 0, sotAsap: 0, sot: 0, goShip: 0, gloss: 1, oceanSites: 0, mooredBuoys: 0, tsunamiBuoys: 0, hfRadars: 0 }
  },
  {
    name: "Slovenia",
    countryCode: "SI",
    networks: { driftingBuoys: 0, argo: 0, oceanGliders: 0, aniBOS: 0, fvon: 0, sotVos: 0, sotAsap: 0, sot: 0, goShip: 0, gloss: 0, oceanSites: 0, mooredBuoys: 0, tsunamiBuoys: 0, hfRadars: 2 }
  },
  {
    name: "South Africa",
    countryCode: "ZA",
    networks: { driftingBuoys: 0, argo: 0, oceanGliders: 0, aniBOS: 0, fvon: 0, sotVos: 1, sotAsap: 1, sot: 0, goShip: 0, gloss: 2, oceanSites: 0, mooredBuoys: 0, tsunamiBuoys: 0, hfRadars: 0 }
  },
  {
    name: "Spain",
    countryCode: "ES",
    networks: { driftingBuoys: 0, argo: 31, oceanGliders: 39, aniBOS: 0, fvon: 0, sotVos: 1, sotAsap: 0, sot: 0, goShip: -1, gloss: 2, oceanSites: 2, mooredBuoys: 14, tsunamiBuoys: 0, hfRadars: 32 }
  },
  {
    name: "Sweden",
    countryCode: "SE",
    networks: { driftingBuoys: 0, argo: 0, oceanGliders: 123, aniBOS: 0, fvon: 0, sotVos: 6, sotAsap: 0, sot: 0, goShip: 0, gloss: 2, oceanSites: 0, mooredBuoys: 0, tsunamiBuoys: 0, hfRadars: 2 }
  },
  {
    name: "Thailand",
    countryCode: "TH",
    networks: { driftingBuoys: 0, argo: 0, oceanGliders: 0, aniBOS: 0, fvon: 0, sotVos: 0, sotAsap: 0, sot: 0, goShip: 0, gloss: 2, oceanSites: 0, mooredBuoys: 0, tsunamiBuoys: 1, hfRadars: 6 }
  },
  {
    name: "Tonga",
    countryCode: "TO",
    networks: { driftingBuoys: 0, argo: 0, oceanGliders: 0, aniBOS: 0, fvon: 0, sotVos: 0, sotAsap: 0, sot: 0, goShip: 0, gloss: 1, oceanSites: 0, mooredBuoys: 0, tsunamiBuoys: 0, hfRadars: 0 }
  },
  {
    name: "Tuvalu",
    countryCode: "TV",
    networks: { driftingBuoys: 0, argo: 0, oceanGliders: 0, aniBOS: 0, fvon: 0, sotVos: 0, sotAsap: 0, sot: 0, goShip: 0, gloss: 1, oceanSites: 0, mooredBuoys: 0, tsunamiBuoys: 0, hfRadars: 0 }
  },
  {
    name: "Ukraine",
    countryCode: "UA",
    networks: { driftingBuoys: 0, argo: 6, oceanGliders: 0, aniBOS: 0, fvon: 0, sotVos: 0, sotAsap: 0, sot: 0, goShip: 0, gloss: 0, oceanSites: 0, mooredBuoys: 0, tsunamiBuoys: 0, hfRadars: 0 }
  },
  {
    name: "United Arab Emirates",
    countryCode: "AE",
    networks: { driftingBuoys: 0, argo: 0, oceanGliders: 0, aniBOS: 0, fvon: 0, sotVos: 0, sotAsap: 0, sot: 0, goShip: 0, gloss: 0, oceanSites: 0, mooredBuoys: 0, tsunamiBuoys: 0, hfRadars: 2 }
  },
  {
    name: "United Kingdom",
    countryCode: "GB",
    networks: { driftingBuoys: 0, argo: 118, oceanGliders: 20, aniBOS: 0, fvon: 0, sotVos: 178, sotAsap: 0, sot: 0, goShip: 0, gloss: 3, oceanSites: 41, mooredBuoys: 81, tsunamiBuoys: 0, hfRadars: 4 }
  },
  {
    name: "United States",
    countryCode: "US",
    networks: { driftingBuoys: 1049, argo: 2311, oceanGliders: 223, aniBOS: 10, fvon: 109, sotVos: 732, sotAsap: 0, sot: 3, goShip: 0, gloss: 24, oceanSites: 181, mooredBuoys: 226, tsunamiBuoys: 29, hfRadars: 172 }
  },
  {
    name: "Uruguay",
    countryCode: "UY",
    networks: { driftingBuoys: 0, argo: 0, oceanGliders: 0, aniBOS: 0, fvon: 0, sotVos: 0, sotAsap: 0, sot: 0, goShip: 0, gloss: 1, oceanSites: 0, mooredBuoys: 0, tsunamiBuoys: 0, hfRadars: 0 }
  },
  {
    name: "Vanuatu",
    countryCode: "VU",
    networks: { driftingBuoys: 0, argo: 0, oceanGliders: 0, aniBOS: 0, fvon: 0, sotVos: 0, sotAsap: 0, sot: 0, goShip: 0, gloss: 1, oceanSites: 0, mooredBuoys: 0, tsunamiBuoys: 0, hfRadars: 0 }
  },
  {
    name: "Viet Nam",
    countryCode: "VN",
    networks: { driftingBuoys: 0, argo: 0, oceanGliders: 0, aniBOS: 0, fvon: 0, sotVos: 0, sotAsap: 0, sot: 0, goShip: 0, gloss: 0, oceanSites: 0, mooredBuoys: 0, tsunamiBuoys: 0, hfRadars: 3 }
  },
  {
    name: "Wallis And Futuna Islands",
    countryCode: "WF",
    networks: { driftingBuoys: 0, argo: 0, oceanGliders: 0, aniBOS: 0, fvon: 0, sotVos: 0, sotAsap: 0, sot: 0, goShip: 0, gloss: 1, oceanSites: 0, mooredBuoys: 0, tsunamiBuoys: 0, hfRadars: 0 }
  }
]
