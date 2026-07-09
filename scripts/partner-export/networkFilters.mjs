/**
 * Network filter definitions for partner country export.
 *
 * API filters use AgRest exp syntax against /data/platform/.
 * ArcGIS filters use SQL against OceanOPS/PtfLocations MapServer layer 1.
 *
 * Operational status: ptfStatus.name='OPERATIONAL' (API) / ptf_status=6 (ArcGIS).
 *
 * Line-based networks (goShip, sot) use line_program in PostgreSQL.
 * FVON / AniBOS / OceanGliders use PROBABLE-related statuses (not only OPERATIONAL).
 */

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
  oceanSites:
    "ptfStatus.name='OPERATIONAL' and networkPtfs.network.name='OceanSITES'",
  mooredBuoys:
    "ptfStatus.name='OPERATIONAL' and ptfModel.ptfType.ptfFamily.name='Moored Buoy'",
  tsunamiBuoys:
    "ptfStatus.name='OPERATIONAL' and ptfModel.ptfType.name='Tsunameter Buoy'",
  hfRadars: "ptfStatus.name='OPERATIONAL' and ptfModel.ptfType.name='HF Radar'",
}

/**
 * Networks whose API counts are merged from multiple filters (summed per country).
 * @type {Record<string, string[]>}
 */
export const API_MERGED_NETWORK_FILTERS = {
  oceanGliders: [
    "ptfStatus.name='OPERATIONAL' and networkPtfs.network.name='OceanGliders'",
    "ptfStatus.name='PROBABLE' and networkPtfs.network.name='OceanGliders'",
    "ptfStatus.name='CONFIRMED' and networkPtfs.network.name='OceanGliders'",
  ],
  aniBOS: ["ptfStatus.name='PROBABLE' and networkPtfs.network.name='AniBOS'"],
  fvon: [
    "ptfStatus.name='CONFIRMED' and networkPtfs.network.nameShort='FVON'",
    "ptfStatus.name='PROBABLE' and networkPtfs.network.nameShort='FVON'",
  ],
}

/**
 * Mirrors oceanops-PTF_LOC_N-DEFAULT symbology on the integrated latest-locations layer.
 * @type {Record<string, string>}
 */
export const ARCGIS_NETWORK_FILTERS = {
  driftingBuoys: "ptf_status=6 AND ptf_family='DB'",
  argo: "ptf_status=6 AND (master_program='Argo' OR network LIKE '%Argo%')",
  oceanGliders: "ptf_status IN (0,1,6) AND master_program='OceanGliders'",
  aniBOS: "ptf_status IN (0,1) AND ptf_family='ANIMAL'",
  fvon: "network LIKE '%FVON%' AND ptf_status IN (0,1)",
  sotVos:
    "ptf_status=6 AND network LIKE '%VOS%' AND (ptf_type='VOS_MWS' OR ptf_type='VOS_AWS')",
  sotAsap: "ptf_status=6 AND network LIKE '%ASAP%'",
  gloss: "ptf_status=6 AND network LIKE '%GLOSS%'",
  oceanSites: "ptf_status=6 AND network LIKE '%OceanSITES%'",
  mooredBuoys:
    "ptf_status=6 AND ptf_family='MB' AND network NOT LIKE '%OceanSITES%'",
  tsunamiBuoys: "ptf_status=6 AND ptf_type='TSUNAMETER'",
  hfRadars: "ptf_status=6 AND ptf_type='HF_RADAR'",
}

export const ARCGIS_LAYER_URL =
  'https://www.ocean-ops.org/arcgis/rest/services/OceanOPS/PtfLocations/MapServer/1'
