/**
 * Partner export criteria — edit this file each edition before running export:partners.
 *
 * Mirrors the workflow used for map GeoJSON layers (oceanops_gis.ptf_loc_n, goship_design_goship_1):
 * - Most networks: operational platforms (ptf_status = 6 / OPERATIONAL)
 * - GO-SHIP: manually selected design line names, then country via line_program
 *
 * Platform status codes (ptf_status): see partner-export/ptfStatus.mjs
 *   0 PROBABLE | 1 CONFIRMED | 2 REGISTERED | 4 INACTIVE | 5 CLOSED | 6 OPERATIONAL
 *
 * Override path: PARTNER_EXPORT_CONFIG=/path/to/custom.mjs
 */

/** @typedef {'platform_operational' | 'platform_merged' | 'line_program' | 'go_ship_selected_lines'} ExportCriteriaType */

/**
 * GO-SHIP lines included in the report (manual selection).
 * Same list as the GeoJSON export against oceanops_gis.goship_design_goship_1.
 * Set to null to count all GO-SHIP Line entries with line_program attribution.
 */
export const GO_SHIP_SELECTED_LINE_NAMES = [
  '40N',
  'A02',
  'A05',
  'A10',
  'A12',
  'A13.5',
  'A16N',
  'A17',
  'A20',
  'A22',
  'A23',
  'A25',
  'A29',
  'AR07W',
  'AR28',
  'ARC01',
  'ARC02',
  'Davis',
  'I05',
  'I06S',
  'I07N',
  'I07S',
  'I08N',
  'I08S',
  'I09N',
  'I09S',
  'I10',
  'MED01',
  'P01',
  'P02',
  'P03W',
  'P04W',
  'P06',
  'P09',
  'P11',
  'P13',
  'P14N',
  'P15S',
  'P16N',
  'P17x',
  'P18',
  'S04I',
  'S04P',
  'SR01',
  'SR03',
  'SR04',
]

/**
 * SOOP XBT-SOOP lines included in the report (manual selection, 2025 layer table).
 * Set to null to count all SOOP XBT Line entries with line_program attribution.
 */
export const SOT_SELECTED_LINE_NAMES = [
  'AX07',
  'AX08',
  'AX10',
  'AX97',
  'AX32',
  'AX22',
  'AX25',
  'IX01',
  'IX21',
  'PX09',
  'PX11',
  'PX13',
  'IX22',
  'PX02',
  'PX06',
  'PX30',
  'PX31',
  'PX34',
  'PX37',
  'PX40',
  'PX39',
  'IX28',
  'PX36',
]

/** Minimum latest location date (2025 layer table). Edit per edition. */
export const OCEAN_GLIDERS_MIN_LAST_LOC_DATE = '2024-01-01'
export const ANIBOS_MIN_LAST_LOC_DATE = '2025-01-01'
export const FVON_MIN_LAST_LOC_DATE = '2025-01-01'

/** Label shown in the end-of-run summary (e.g. report card edition). */
export const EXPORT_EDITION_LABEL = process.env.PARTNER_EXPORT_EDITION ?? 'report-card'

/**
 * Human-readable criteria per network key (for the export summary).
 * @type {Record<string, { type: ExportCriteriaType, summary: string, sqlHint?: string }>}
 */
export const NETWORK_CRITERIA = {
  driftingBuoys: {
    type: 'platform_operational',
    summary: 'OPERATIONAL drifting buoys (ptf_family DB)',
    sqlHint: "ptf_loc_n: ptf_status=6 AND ptf_family='DB'",
  },
  argo: {
    type: 'platform_operational',
    summary: 'OPERATIONAL Argo floats',
    sqlHint: "ptf_loc_n: upper(network) LIKE '%ARGO%' AND ptf_status=6",
  },
  oceanGliders: {
    type: 'platform_merged',
    summary:
      'OceanGliders — REGISTERED + OPERATIONAL + INACTIVE + CLOSED, latest_loc_date >= 2024-01-01',
    sqlHint:
      "ptf_loc_n: master_program='OceanGliders', ptf_status IN (2,6,4,5), latest_loc_date >= '2024-01-01'",
  },
  aniBOS: {
    type: 'platform_merged',
    summary:
      'AniBOS — REGISTERED + OPERATIONAL + INACTIVE + CLOSED, latest_loc_date >= 2025-01-01',
    sqlHint:
      "ptf_loc_n: ptf_family='ANIMAL', ptf_status IN (2,6,4,5), latest_loc_date >= '2025-01-01'",
  },
  fvon: {
    type: 'platform_merged',
    summary:
      'FVON — REGISTERED + OPERATIONAL + INACTIVE + CLOSED, latest_loc_date >= 2025-01-01',
    sqlHint:
      "ptf_loc_n: network LIKE '%FVON%', ptf_status IN (2,6,4,5), latest_loc_date >= '2025-01-01'",
  },
  sotVos: {
    type: 'platform_operational',
    summary: 'OPERATIONAL SOT/VOS ships',
    sqlHint: "ptf_loc_n: network LIKE '%VOS%', ptf_status=6",
  },
  sotAsap: {
    type: 'platform_operational',
    summary: 'OPERATIONAL ASAP ships',
    sqlHint: "ptf_loc_n: network LIKE '%ASAP%', ptf_status=6",
  },
  sot: {
    type: 'line_program',
    summary: 'SOOP XBT design lines — manual name list, then line_program → program.country',
    sqlHint: "line + line_program WHERE line_family='SOOP XBT Line' AND name IN (...selected lines...)",
  },
  goShip: {
    type: 'go_ship_selected_lines',
    summary: 'GO-SHIP design lines — manual name list, then line_program → program.country',
    sqlHint: 'goship_design_goship_1 WHERE name IN (...selected lines...)',
  },
  gloss: {
    type: 'platform_operational',
    summary: 'OPERATIONAL GLOSS sea-level gauges',
    sqlHint: "ptf_loc_n: network LIKE '%GLOSS%', ptf_status=6",
  },
  oceanSites: {
    type: 'platform_merged',
    summary: 'OceanSITES moorings — OPERATIONAL or INACTIVE',
    sqlHint: 'ptf_loc_n: network LIKE \'%OceanSITES%\', ptf_status IN (4=INACTIVE, 6=OPERATIONAL)',
  },
  mooredBuoys: {
    type: 'platform_operational',
    summary: 'OPERATIONAL moored buoys (excl. OceanSITES)',
    sqlHint: "ptf_loc_n: ptf_family='MB', ptf_status=6",
  },
  tsunamiBuoys: {
    type: 'platform_operational',
    summary: 'OPERATIONAL tsunameter buoys',
    sqlHint: "ptf_loc_n: ptf_type='TSUNAMETER', ptf_status=6",
  },
  hfRadars: {
    type: 'platform_operational',
    summary: 'All HF radars (no status filter)',
    sqlHint: "ptf_loc_n: ptf_type='HF_RADAR'",
  },
}

/**
 * @param {Record<string, Record<string, number>>} byNetwork
 * @param {{ GO_SHIP_SELECTED_LINE_NAMES?: string[] | null, SOT_SELECTED_LINE_NAMES?: string[] | null, EXPORT_EDITION_LABEL?: string }} [config]
 */
export function printExportCriteriaSummary(byNetwork, config = {}) {
  const selectedGoShipLines = config.GO_SHIP_SELECTED_LINE_NAMES ?? GO_SHIP_SELECTED_LINE_NAMES
  const selectedSotLines = config.SOT_SELECTED_LINE_NAMES ?? SOT_SELECTED_LINE_NAMES
  const edition = config.EXPORT_EDITION_LABEL ?? EXPORT_EDITION_LABEL

  process.stderr.write('\n── Export criteria summary ──\n')
  process.stderr.write(`Edition: ${edition}\n\n`)

  for (const [key, criteria] of Object.entries(NETWORK_CRITERIA)) {
    const total = Object.values(byNetwork[key] ?? {}).reduce((a, b) => a + b, 0)
    process.stderr.write(`${key} (${total})\n`)
    process.stderr.write(`  ${criteria.summary}\n`)
    if (criteria.sqlHint) {
      process.stderr.write(`  SQL hint: ${criteria.sqlHint}\n`)
    }
  }

  process.stderr.write('\ngoShip — selected lines\n')
  if (selectedGoShipLines?.length) {
    process.stderr.write(`  Count: ${selectedGoShipLines.length} lines\n`)
    process.stderr.write(`  Names: ${selectedGoShipLines.join(', ')}\n`)
  } else {
    process.stderr.write('  Count: all GO-SHIP Line rows with line_program (no name filter)\n')
  }

  process.stderr.write('\nsot — selected lines\n')
  if (selectedSotLines?.length) {
    process.stderr.write(`  Count: ${selectedSotLines.length} lines\n`)
    process.stderr.write(`  Names: ${selectedSotLines.join(', ')}\n`)
  } else {
    process.stderr.write('  Count: all SOOP XBT Line rows with line_program (no name filter)\n')
  }

  process.stderr.write('\n')
}
