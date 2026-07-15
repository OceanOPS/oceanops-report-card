/**
 * Platform counts with layer-table status + latest location date filters.
 *
 * Used when Postgres has observation data to apply latest_loc_date cutoffs.
 * Falls back to API (status-only) when DB returns no rows — common on dev dumps.
 */

import {
  ANIBOS_MIN_LAST_LOC_DATE,
  FVON_MIN_LAST_LOC_DATE,
  OCEAN_GLIDERS_MIN_LAST_LOC_DATE,
} from './exportConfig.mjs'
import { queryCountryCounts } from './lineProgramCounts.mjs'
import { LAYER_TABLE_PTF_STATUS_IN } from './ptfStatus.mjs'

/** Networks that support optional Postgres date filtering. */
export const PLATFORM_LOCATION_NETWORK_KEYS = ['oceanGliders', 'aniBOS', 'fvon']

/** @type {Record<string, { minLastLocDate: string, extraJoins: string, networkPredicate: string }>} */
export const PLATFORM_LOCATION_NETWORK_SQL = {
  oceanGliders: {
    minLastLocDate: OCEAN_GLIDERS_MIN_LAST_LOC_DATE,
    extraJoins: `
JOIN network_ptf np ON np.ptf_id = p.id
JOIN network n ON n.id = np.network_id`,
    networkPredicate: "n.name = 'OceanGliders'",
  },
  aniBOS: {
    minLastLocDate: ANIBOS_MIN_LAST_LOC_DATE,
    extraJoins: `
JOIN network_ptf np ON np.ptf_id = p.id
JOIN network n ON n.id = np.network_id`,
    networkPredicate: "n.name = 'AniBOS'",
  },
  fvon: {
    minLastLocDate: FVON_MIN_LAST_LOC_DATE,
    extraJoins: `
JOIN network_ptf np ON np.ptf_id = p.id
JOIN network n ON n.id = np.network_id`,
    networkPredicate: "(n.name_short = 'FVON' OR n.name ILIKE '%FVON%')",
  },
}

/**
 * @param {string} networkKey
 * @returns {string}
 */
function buildPlatformLocationCountsSql(networkKey) {
  const config = PLATFORM_LOCATION_NETWORK_SQL[networkKey]
  if (!config) {
    throw new Error(`Unknown platform location network: ${networkKey}`)
  }

  return `
SET search_path TO oceanops, public;
SELECT c.code2, COUNT(DISTINCT p.id)::int AS platform_count
FROM ptf p
JOIN ptf_status ps ON ps.id = p.ptf_status_id
JOIN program pr ON pr.id = p.program_id
JOIN country c ON c.id = pr.country_id
${config.extraJoins}
WHERE COALESCE(p.delete_tag, 0) = 0
  AND ps.id IN (${LAYER_TABLE_PTF_STATUS_IN})
  AND ${config.networkPredicate}
  AND EXISTS (
    SELECT 1
    FROM obs o
    WHERE o.ptf_id = p.id
      AND o.obs_date = (SELECT MAX(o2.obs_date) FROM obs o2 WHERE o2.ptf_id = p.id)
      AND o.obs_date >= TIMESTAMP '${config.minLastLocDate} 00:00:00'
  )
GROUP BY c.code2
ORDER BY c.code2;
`.trim()
}

/** @param {string} networkKey @returns {Record<string, number> | null} */
export function fetchPlatformLocationCountsFromDatabase(networkKey) {
  if (!PLATFORM_LOCATION_NETWORK_SQL[networkKey]) return null
  return queryCountryCounts(buildPlatformLocationCountsSql(networkKey))
}

/** @param {Record<string, number> | null} counts */
export function totalCountryCounts(counts) {
  return Object.values(counts ?? {}).reduce((sum, count) => sum + count, 0)
}
