/**
 * Partner counts for line-based networks (design lines, not platforms).
 *
 * Uses line_program → program.country, same pattern as internal OceanOPS stats
 * for SOOP XBT and GO-SHIP transects.
 */

import { spawnSync } from 'node:child_process'
import { GO_SHIP_SELECTED_LINE_NAMES, SOT_SELECTED_LINE_NAMES } from './exportConfig.mjs'

/** @type {Record<string, string>} */
export const LINE_NETWORK_FAMILIES = {
  goShip: 'GO-SHIP Line',
  sot: 'SOOP XBT Line',
}

/**
 * @param {string} lineFamily
 * @param {string[] | null | undefined} selectedLineNames
 */
function buildLineCountsSql(lineFamily, selectedLineNames) {
  const escapedFamily = lineFamily.replace(/'/g, "''")
  const nameFilter =
    selectedLineNames?.length ?
      `AND l.name IN (${selectedLineNames.map((n) => `'${n.replace(/'/g, "''")}'`).join(', ')})`
    : ''

  return `
SET search_path TO oceanops, public;
SELECT c.code2, COUNT(DISTINCT lp.line_id)::int AS line_count
FROM line_program lp
JOIN program p ON p.id = lp.program_id
JOIN country c ON c.id = p.country_id
JOIN line l ON l.id = lp.line_id
JOIN line_family lf ON lf.id = l.line_family_id
WHERE lf.name = '${escapedFamily}'
${nameFilter}
GROUP BY c.code2
ORDER BY c.code2;
`.trim()
}

/** @returns {{ host: string, port: string, user: string, password: string, database: string } | null} */
function parseDatabaseUrl(url) {
  try {
    const parsed = new URL(url)
    if (parsed.protocol !== 'postgresql:' && parsed.protocol !== 'postgres:') return null
    return {
      host: parsed.hostname,
      port: parsed.port || '5432',
      user: decodeURIComponent(parsed.username),
      password: decodeURIComponent(parsed.password),
      database: parsed.pathname.replace(/^\//, ''),
    }
  } catch {
    return null
  }
}

/** @returns {string} */
export function resolveDatabaseUrl() {
  if (process.env.OCEANOPS_DATABASE_URL) return process.env.OCEANOPS_DATABASE_URL
  if (process.env.OCEANOPS_DB_URL) return process.env.OCEANOPS_DB_URL

  const host = process.env.OCEANOPS_DB_HOST ?? '127.0.0.1'
  const port = process.env.OCEANOPS_DB_PORT ?? '5432'
  const user = process.env.OCEANOPS_DB_USER ?? 'oceanops'
  const password = process.env.OCEANOPS_DB_PASS ?? 'oceanops'
  const database = process.env.OCEANOPS_DB_NAME ?? 'oceanops'

  return `postgresql://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${host}:${port}/${database}`
}

/** @param {string} sql @returns {Record<string, number> | null} */
export function queryCountryCounts(sql) {
  const config = parseDatabaseUrl(resolveDatabaseUrl())
  if (!config) return null

  const result = spawnSync(
    'psql',
    [
      '-h',
      config.host,
      '-p',
      config.port,
      '-U',
      config.user,
      '-d',
      config.database,
      '-t',
      '-A',
      '-F',
      ',',
      '-c',
      sql,
    ],
    {
      encoding: 'utf8',
      env: { ...process.env, PGPASSWORD: config.password },
    },
  )

  if (result.error || result.status !== 0) return null

  /** @type {Record<string, number>} */
  const counts = {}
  for (const line of result.stdout.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed) continue
    const [code, countRaw] = trimmed.split(',')
    if (!code || code === 'null') continue
    const count = Number.parseInt(countRaw, 10)
    if (Number.isFinite(count) && count > 0) counts[code] = count
  }

  return counts
}

/** @param {string} lineFamily @param {string[] | null | undefined} [selectedLineNames] @returns {Record<string, number> | null} */
export function fetchLineProgramCountsFromDatabase(lineFamily, selectedLineNames) {
  return queryCountryCounts(buildLineCountsSql(lineFamily, selectedLineNames))
}

/** @param {string} networkKey @param {string[] | null | undefined} [selectedLineNames] @returns {Record<string, number> | null} */
export function fetchLineNetworkCountsFromDatabase(networkKey, selectedLineNames) {
  const lineFamily = LINE_NETWORK_FAMILIES[networkKey]
  if (!lineFamily) return null

  const names =
    networkKey === 'goShip' ?
      selectedLineNames !== undefined ?
        selectedLineNames
      : GO_SHIP_SELECTED_LINE_NAMES
    : networkKey === 'sot' ?
      selectedLineNames !== undefined ?
        selectedLineNames
      : SOT_SELECTED_LINE_NAMES
    : selectedLineNames

  return fetchLineProgramCountsFromDatabase(lineFamily, names)
}
