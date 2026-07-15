/**
 * GO-SHIP line export (re-exports lineProgramCounts for backward compatibility).
 */

import { GO_SHIP_SELECTED_LINE_NAMES } from './exportConfig.mjs'
import {
  fetchLineNetworkCountsFromDatabase,
  LINE_NETWORK_FAMILIES,
} from './lineProgramCounts.mjs'

export const GO_SHIP_LINE_FAMILY = LINE_NETWORK_FAMILIES.goShip
export { GO_SHIP_SELECTED_LINE_NAMES }

export const ARCGIS_DESIGN_LINES_URL =
  'https://www.ocean-ops.org/arcgis/rest/services/OceanOPS/DesignLines/MapServer/0'

/** @param {string} url */
async function fetchJson(url, init) {
  const res = await fetch(url, init)
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`${res.status} ${res.statusText}: ${body.slice(0, 200)}`)
  }
  return res.json()
}

/** @returns {Promise<number>} */
export async function fetchGoShipGlobalCountFromArcgis() {
  const params = new URLSearchParams({
    where: `line_family='${GO_SHIP_LINE_FAMILY}'`,
    returnCountOnly: 'true',
    f: 'json',
  })

  const payload = await fetchJson(`${ARCGIS_DESIGN_LINES_URL}/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  })

  if (payload.error) {
    throw new Error(payload.error.message || JSON.stringify(payload.error))
  }

  return payload.count ?? 0
}

/** @returns {Promise<Record<string, number>>} */
export async function fetchGoShipCountsByCountry(selectedLineNames = GO_SHIP_SELECTED_LINE_NAMES) {
  const dbCounts = fetchLineNetworkCountsFromDatabase('goShip', selectedLineNames)
  if (dbCounts && Object.keys(dbCounts).length > 0) {
    return dbCounts
  }

  const lineCount = selectedLineNames?.length ?? 0
  const selectionNote =
    lineCount > 0 ?
      `${lineCount} selected line names configured`
    : 'all GO-SHIP Line rows with line_program'

  if (dbCounts) {
    process.stderr.write(`  goShip: no line_program rows (${selectionNote}) — trying ArcGIS… `)
  } else {
    process.stderr.write(`  goShip: database unavailable — trying ArcGIS… `)
  }

  try {
    const total = await fetchGoShipGlobalCountFromArcgis()
    process.stderr.write(`${total} lines (no per-country attribution)\n`)
    if (total > 0) {
      process.stderr.write(
        '  goShip: set OCEANOPS_DATABASE_URL to export per-country GO-SHIP line counts\n',
      )
    }
  } catch (err) {
    process.stderr.write(`failed (${err.message})\n`)
  }

  return {}
}
