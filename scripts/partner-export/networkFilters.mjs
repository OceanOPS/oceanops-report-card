/**
 * Network filter definitions for partner country export.
 *
 * API filters use AgRest exp syntax against /data/platform/.
 * ArcGIS filters use SQL against OceanOPS/PtfLocations MapServer layer 1.
 *
 * Platform status codes (ptf_status / ptfStatus.name): see ptfStatus.mjs
 *
 * Line-based networks (goShip, sot) use line_program in PostgreSQL.
 * OceanGliders / AniBOS / FVON: layer-table statuses via API; Postgres+date when available.
 */

import {
  ANIBOS_MIN_LAST_LOC_DATE,
  FVON_MIN_LAST_LOC_DATE,
  OCEAN_GLIDERS_MIN_LAST_LOC_DATE,
} from './exportConfig.mjs'
import { LAYER_TABLE_PTF_STATUS_IN, LAYER_TABLE_STATUS_NAMES, PTF_STATUS } from './ptfStatus.mjs'

/**
 * @param {string} networkExpr e.g. networkPtfs.network.name='AniBOS'
 * @returns {string[]}
 */
function layerTableStatusFilters(networkExpr) {
  return LAYER_TABLE_STATUS_NAMES.map(
    (status) => `ptfStatus.name='${status}' and ${networkExpr}`,
  )
}

export const NETWORK_KEYS = [
  'driftingBuoys',
  'argo',
  'oceanGliders',
  'aniBOS',
  'fvon',
  'sotVos',
  'sotAsap',
  'sot',
  'goShip',
  'gloss',
  'oceanSites',
  'mooredBuoys',
  'tsunamiBuoys',
  'hfRadars',
]

/** Line-based networks exported via line_program (see lineProgramCounts.mjs). */
export const LINE_NETWORK_KEYS = ['goShip', 'sot']

/** Standard platform export keys (excludes line-based networks). */
export const PLATFORM_NETWORK_KEYS = NETWORK_KEYS.filter(
  (key) => !LINE_NETWORK_KEYS.includes(key),
)

/** @type {Record<string, string>} */
export const API_NETWORK_FILTERS = {
  driftingBuoys:
    "ptfStatus.name='OPERATIONAL' and ptfModel.ptfType.ptfFamily.name='Drifting Buoy'",
  argo: "ptfStatus.name='OPERATIONAL' and networkPtfs.network.name='Argo'",
  sotVos: "ptfStatus.name='OPERATIONAL' and networkPtfs.network.nameShort='VOS'",
  sotAsap: "ptfStatus.name='OPERATIONAL' and networkPtfs.network.nameShort='ASAP'",
  gloss: "ptfStatus.name='OPERATIONAL' and networkPtfs.network.name='GLOSS'",
  mooredBuoys:
    "ptfStatus.name='OPERATIONAL' and ptfModel.ptfType.ptfFamily.name='Moored Buoy'",
  tsunamiBuoys:
    "ptfStatus.name='OPERATIONAL' and ptfModel.ptfType.name='Tsunameter Buoy'",
  hfRadars: "ptfModel.ptfType.name='HF Radar'",
}

/**
 * Networks whose API counts are merged from multiple filters (summed per country).
 * @type {Record<string, string[]>}
 */
export const API_MERGED_NETWORK_FILTERS = {
  oceanSites: [
    "ptfStatus.name='OPERATIONAL' and networkPtfs.network.name='OceanSITES'",
    "ptfStatus.name='INACTIVE' and networkPtfs.network.name='OceanSITES'",
  ],
  oceanGliders: layerTableStatusFilters("networkPtfs.network.name='OceanGliders'"),
  aniBOS: layerTableStatusFilters("networkPtfs.network.name='AniBOS'"),
  fvon: layerTableStatusFilters("networkPtfs.network.nameShort='FVON'"),
}

/**
 * Mirrors oceanops-PTF_LOC_N-DEFAULT symbology on the integrated latest-locations layer.
 * @type {Record<string, string>}
 */
export const ARCGIS_NETWORK_FILTERS = {
  driftingBuoys: "ptf_status=6 AND ptf_family='DB'",
  argo: "ptf_status=6 AND (master_program='Argo' OR network LIKE '%Argo%')",
  // REGISTERED (2) + INACTIVE (4) + CLOSED (5) + OPERATIONAL (6) — see ptfStatus.mjs
  oceanGliders: `ptf_status IN (${LAYER_TABLE_PTF_STATUS_IN}) AND master_program='OceanGliders' AND latest_loc_date >= DATE '${OCEAN_GLIDERS_MIN_LAST_LOC_DATE}'`,
  aniBOS: `ptf_status IN (${LAYER_TABLE_PTF_STATUS_IN}) AND ptf_family='ANIMAL' AND latest_loc_date >= DATE '${ANIBOS_MIN_LAST_LOC_DATE}'`,
  fvon: `network LIKE '%FVON%' AND ptf_status IN (${LAYER_TABLE_PTF_STATUS_IN}) AND latest_loc_date >= DATE '${FVON_MIN_LAST_LOC_DATE}'`,
  sotVos:
    "ptf_status=6 AND network LIKE '%VOS%' AND (ptf_type='VOS_MWS' OR ptf_type='VOS_AWS')",
  sotAsap: "ptf_status=6 AND network LIKE '%ASAP%'",
  gloss: "ptf_status=6 AND network LIKE '%GLOSS%'",
  // INACTIVE (4) + OPERATIONAL (6) — see ptfStatus.mjs
  oceanSites: `ptf_status IN (${PTF_STATUS.INACTIVE},${PTF_STATUS.OPERATIONAL}) AND network LIKE '%OceanSITES%'`,
  mooredBuoys:
    "ptf_status=6 AND ptf_family='MB' AND network NOT LIKE '%OceanSITES%'",
  tsunamiBuoys: "ptf_status=6 AND ptf_type='TSUNAMETER'",
  hfRadars: "ptf_type='HF_RADAR'",
}

export const ARCGIS_LAYER_URL =
  'https://www.ocean-ops.org/arcgis/rest/services/OceanOPS/PtfLocations/MapServer/1'
