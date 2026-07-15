#!/usr/bin/env node
/**
 * Export partner country platform counts from OceanOPS into src/data/partnerCountries.ts
 *
 * Usage:
 *   node scripts/export-partner-countries.mjs [--source=api|arcgis|auto] [--dry-run]
 *
 * Environment:
 *   OCEANOPS_API_URL       Base API URL (default: http://localhost:8080/data)
 *   OCEANOPS_DATABASE_URL       Postgres URL for line-based networks (goShip, sot)
 *   PARTNER_EXPORT_EDITION      Label shown in criteria summary (default: report-card)
 *
 * Edit scripts/partner-export/exportConfig.mjs before each edition (GO-SHIP line list, criteria notes).
 *                            Defaults to postgresql://oceanops:oceanops@127.0.0.1:5432/oceanops
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  API_MERGED_NETWORK_FILTERS,
  API_NETWORK_FILTERS,
  ARCGIS_LAYER_URL,
  ARCGIS_NETWORK_FILTERS,
  LINE_NETWORK_KEYS,
  NETWORK_KEYS,
  PLATFORM_NETWORK_KEYS,
} from './partner-export/networkFilters.mjs'
import { fetchGoShipCountsByCountry } from './partner-export/goShipLines.mjs'
import { fetchLineNetworkCountsFromDatabase } from './partner-export/lineProgramCounts.mjs'
import {
  fetchPlatformLocationCountsFromDatabase,
  PLATFORM_LOCATION_NETWORK_KEYS,
  totalCountryCounts,
} from './partner-export/platformLocationCounts.mjs'
import {
  EXPORT_EDITION_LABEL,
  GO_SHIP_SELECTED_LINE_NAMES,
  SOT_SELECTED_LINE_NAMES,
  printExportCriteriaSummary,
} from './partner-export/exportConfig.mjs'
import {
  COUNTRY_META_OVERRIDES,
  ISO_COUNTRY_NAMES,
} from './partner-export/countryMeta.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OUTPUT = path.join(ROOT, 'src/data/partnerCountries.ts')

const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const sourceArg = args.find((a) => a.startsWith('--source='))?.split('=')[1] ?? 'auto'

/** @param {Record<string, Record<string, number>>} byNetwork */
function mergeCountryCounts(byNetwork) {
  /** @type {Map<string, Record<string, number>>} */
  const countries = new Map()

  for (const networkKey of NETWORK_KEYS) {
    const byCountry = byNetwork[networkKey] ?? {}
    for (const [code, count] of Object.entries(byCountry)) {
      if (!code || code === 'null' || code === 'undefined') continue
      if (!countries.has(code)) {
        countries.set(code, Object.fromEntries(NETWORK_KEYS.map((k) => [k, 0])))
      }
      countries.get(code)[networkKey] = count
    }
  }

  return countries
}

/** @param {string} url */
async function fetchJson(url, init) {
  const res = await fetch(url, init)
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`${res.status} ${res.statusText}: ${body.slice(0, 200)}`)
  }
  return res.json()
}

/** @param {string} baseUrl @param {string} exp */
async function fetchApiCountsByCountryMapBy(baseUrl, exp) {
  try {
    const params = new URLSearchParams({
      exp: JSON.stringify([exp]),
      include: JSON.stringify(['ref', 'program.country.code2']),
      mapBy: 'program.country.code2',
      limit: '0',
    })

    const payload = await fetchJson(`${baseUrl.replace(/\/$/, '')}/platform/?${params}`)
    if (payload.message?.includes('Null mapBy value')) {
      return null
    }

    /** @type {Record<string, number>} */
    const counts = {}
    for (const [code, platforms] of Object.entries(payload.data ?? {})) {
      if (!code || code === 'null') continue
      counts[code] = Array.isArray(platforms) ? platforms.length : 0
    }
    return counts
  } catch (err) {
    if (String(err).includes('Null mapBy value')) return null
    throw err
  }
}

/** @param {string} baseUrl @param {string} exp */
async function fetchApiCountsByCountryPaginated(baseUrl, exp) {
  /** @type {Record<string, number>} */
  const counts = {}
  /** @type {Set<string>} */
  const seen = new Set()
  const limit = 500
  let offset = 0
  let total = Infinity

  while (offset < total) {
    const params = new URLSearchParams({
      exp: JSON.stringify([exp]),
      include: JSON.stringify(['ref', 'program.country.code2']),
      limit: String(limit),
      offset: String(offset),
    })

    const payload = await fetchJson(`${baseUrl.replace(/\/$/, '')}/platform/?${params}`)
    total = payload.total ?? 0

    for (const platform of payload.data ?? []) {
      const ref = platform.ref
      if (!ref || seen.has(ref)) continue
      seen.add(ref)

      const code = platform.program?.country?.code2
      if (!code) continue
      counts[code] = (counts[code] ?? 0) + 1
    }

    if (!payload.data?.length) break
    offset += payload.data.length
  }

  return counts
}

/** @param {string} baseUrl @param {string} exp */
async function fetchApiCountsByCountry(baseUrl, exp) {
  const mapByCounts = await fetchApiCountsByCountryMapBy(baseUrl, exp)
  if (mapByCounts) return mapByCounts
  return fetchApiCountsByCountryPaginated(baseUrl, exp)
}

/** @param {string} where */
async function fetchArcgisCountsByCountry(where) {
  const params = new URLSearchParams({
    where,
    groupByFieldsForStatistics: 'country_iso_code2',
    outStatistics: JSON.stringify([
      {
        statisticType: 'count',
        onStatisticField: 'objectid',
        outStatisticFieldName: 'platform_count',
      },
    ]),
    f: 'json',
  })

  const payload = await fetchJson(`${ARCGIS_LAYER_URL}/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  })

  if (payload.error) {
    throw new Error(payload.error.message || JSON.stringify(payload.error))
  }

  /** @type {Record<string, number>} */
  const counts = {}
  for (const feature of payload.features ?? []) {
    const code = feature.attributes?.country_iso_code2
    const count = feature.attributes?.platform_count ?? 0
    if (!code) continue
    counts[code] = count
  }
  return counts
}

/** @param {string} baseUrl @param {string[]} exps */
async function fetchApiCountsByCountryMerged(baseUrl, exps) {
  /** @type {Record<string, number>} */
  const counts = {}

  for (const exp of exps) {
    const batch = await fetchApiCountsByCountry(baseUrl, exp)
    for (const [code, count] of Object.entries(batch)) {
      counts[code] = (counts[code] ?? 0) + count
    }
  }

  return counts
}

/** @param {string} networkKey @returns {Promise<Record<string, number>>} */
async function fetchLineNetworkCounts(networkKey) {
  if (networkKey === 'goShip') {
    return fetchGoShipCountsByCountry()
  }

  process.stderr.write(`  ${networkKey}… `)
  const dbCounts = fetchLineNetworkCountsFromDatabase(networkKey)
  if (dbCounts && Object.keys(dbCounts).length > 0) {
    const total = Object.values(dbCounts).reduce((a, b) => a + b, 0)
    process.stderr.write(`${total}\n`)
    return dbCounts
  }

  process.stderr.write(
    dbCounts
      ? '0 (no line_program rows — set OCEANOPS_DATABASE_URL)\n'
      : '0 (database unavailable)\n',
  )
  return {}
}

/** @param {'api'|'arcgis'} source */
async function exportCounts(source) {
  /** @type {Record<string, Record<string, number>>} */
  const byNetwork = {}
  const apiUrl = process.env.OCEANOPS_API_URL ?? 'http://localhost:8080/data'

  for (const networkKey of PLATFORM_NETWORK_KEYS) {
    process.stderr.write(`  ${networkKey}… `)

    if (source === 'api') {
      if (PLATFORM_LOCATION_NETWORK_KEYS.includes(networkKey)) {
        const dbCounts = fetchPlatformLocationCountsFromDatabase(networkKey)
        const dbTotal = totalCountryCounts(dbCounts)
        if (dbCounts !== null && dbTotal > 0) {
          byNetwork[networkKey] = dbCounts
          process.stderr.write('postgres+date ')
        } else {
          if (dbCounts !== null && dbTotal === 0) {
            process.stderr.write('no DB date rows — API status-only ')
          }
          const mergedFilters = API_MERGED_NETWORK_FILTERS[networkKey]
          byNetwork[networkKey] = await fetchApiCountsByCountryMerged(apiUrl, mergedFilters)
        }
      } else {
        const mergedFilters = API_MERGED_NETWORK_FILTERS[networkKey]
        if (mergedFilters) {
          byNetwork[networkKey] = await fetchApiCountsByCountryMerged(apiUrl, mergedFilters)
        } else {
          const exp = API_NETWORK_FILTERS[networkKey]
          byNetwork[networkKey] = await fetchApiCountsByCountry(apiUrl, exp)
        }
      }
    } else {
      const where = ARCGIS_NETWORK_FILTERS[networkKey]
      byNetwork[networkKey] = await fetchArcgisCountsByCountry(where)
    }

    const total = Object.values(byNetwork[networkKey]).reduce((a, b) => a + b, 0)
    process.stderr.write(`${total}\n`)
  }

  for (const networkKey of LINE_NETWORK_KEYS) {
    if (networkKey === 'goShip') {
      process.stderr.write('  goShip… ')
      byNetwork.goShip = await fetchGoShipCountsByCountry()
      const goShipTotal = Object.values(byNetwork.goShip).reduce((a, b) => a + b, 0)
      if (goShipTotal > 0) {
        process.stderr.write(`${goShipTotal}\n`)
      }
      continue
    }

    byNetwork[networkKey] = await fetchLineNetworkCounts(networkKey)
  }

  return byNetwork
}

/** @param {string} filePath */
function readExistingMetadata(filePath) {
  /** @type {Record<string, { name?: string, countryCode?: string, description?: string }>} */
  const meta = { ...COUNTRY_META_OVERRIDES }

  if (!fs.existsSync(filePath)) return meta

  const content = fs.readFileSync(filePath, 'utf8')
  const entryRe =
    /name:\s*"([^"]+)"[\s\S]*?countryCode:\s*"([^"]+)"([\s\S]*?)?networks:/g

  let match
  while ((match = entryRe.exec(content)) !== null) {
    const [, name, countryCode, middle = ''] = match
    const descMatch = middle.match(/description:\s*"([^"]+)"/)
    meta[countryCode] = {
      name,
      countryCode,
      ...(descMatch ? { description: descMatch[1] } : {}),
    }
  }

  return meta
}

/** @param {Map<string, Record<string, number>>} countries @param {Record<string, { name?: string, countryCode?: string, description?: string }>} meta */
function renderPartnerCountries(countries, meta) {
  const generatedAt = new Date().toISOString().slice(0, 10)

  const sortedCodes = [...countries.keys()].sort((a, b) => {
    const nameA = meta[a]?.name ?? ISO_COUNTRY_NAMES[a] ?? a
    const nameB = meta[b]?.name ?? ISO_COUNTRY_NAMES[b] ?? b
    return nameA.localeCompare(nameB)
  })

  const entries = sortedCodes.map((code) => {
    const networks = countries.get(code)
    const info = meta[code] ?? {
      name: ISO_COUNTRY_NAMES[code] ?? code,
      countryCode: code,
    }

    const networkLiteral = NETWORK_KEYS.map((k) => `${k}: ${networks[k] ?? 0}`).join(', ')

    const lines = [
      '  {',
      `    name: ${JSON.stringify(info.name)},`,
      `    countryCode: ${JSON.stringify(info.countryCode ?? code)},`,
    ]

    if (info.description) {
      lines.push(`    description: ${JSON.stringify(info.description)},`)
    }

    lines.push(`    networks: { ${networkLiteral} }`, '  }')
    return lines.join('\n')
  })

  return `/**
 * Partner Countries Data
 *
 * AUTO-GENERATED by scripts/export-partner-countries.mjs — do not edit counts by hand.
 * Regenerate: npm run export:partners
 *
 * Data source: OceanOPS operational platform metadata (program country attribution)
 * GO-SHIP / SOT: design lines via line_program → program.country (not platforms)
 * FVON / AniBOS / OceanGliders: monitored platforms include PROBABLE status (not only OPERATIONAL)
 * Last updated: ${generatedAt}
 *
 * Note: goShip can be:
 * - A number (0 or positive): GO-SHIP design line count for the country
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
${entries.join(',\n')}
]
`
}

async function detectSource(requested) {
  if (requested === 'api' || requested === 'arcgis') return requested

  const apiUrl = process.env.OCEANOPS_API_URL ?? 'http://localhost:8080/data'
  try {
    const payload = await fetchJson(`${apiUrl.replace(/\/$/, '')}/platform/?limit=1`)
    if (payload?.data) {
      process.stderr.write(`Using OceanOPS API at ${apiUrl}\n`)
      return 'api'
    }
  } catch {
    // fall through
  }

  process.stderr.write('OceanOPS API unavailable — using public ArcGIS REST services\n')
  return 'arcgis'
}

async function main() {
  const source = await detectSource(sourceArg)
  process.stderr.write(`Exporting partner counts via ${source}…\n`)

  const byNetwork = await exportCounts(source)
  const countries = mergeCountryCounts(byNetwork)

  // Keep editorial entries that may not appear in live export (e.g. EU)
  const meta = readExistingMetadata(OUTPUT)
  for (const [code, info] of Object.entries(COUNTRY_META_OVERRIDES)) {
    if (!countries.has(code)) {
      countries.set(code, Object.fromEntries(NETWORK_KEYS.map((k) => [k, 0])))
    }
    meta[code] = { ...meta[code], ...info }
  }

  const output = renderPartnerCountries(countries, meta)

  if (dryRun) {
    process.stdout.write(output)
    printExportCriteriaSummary(byNetwork, {
      GO_SHIP_SELECTED_LINE_NAMES,
      SOT_SELECTED_LINE_NAMES,
      EXPORT_EDITION_LABEL,
    })
    return
  }

  fs.writeFileSync(OUTPUT, output, 'utf8')
  process.stderr.write(`Wrote ${OUTPUT} (${countries.size} countries)\n`)

  printExportCriteriaSummary(byNetwork, {
    GO_SHIP_SELECTED_LINE_NAMES,
    SOT_SELECTED_LINE_NAMES,
    EXPORT_EDITION_LABEL,
  })
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
