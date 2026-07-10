/**
 * Platform status codes (`oceanops.ptf_status.id`), mirrored in ArcGIS `ptf_loc_n.ptf_status`
 * and the API field `ptfStatus.name`.
 *
 * | id | API name    | code       |
 * |----|-------------|------------|
 * |  0 | PROBABLE    | probable   |
 * |  1 | CONFIRMED   | confirmed  |
 * |  2 | REGISTERED  | registered |
 * |  4 | INACTIVE    | inactive   |
 * |  5 | CLOSED      | closed     |
 * |  6 | OPERATIONAL | operational|
 *
 * (id 3 is unused in the current schema.)
 */
export const PTF_STATUS = {
  PROBABLE: 0,
  CONFIRMED: 1,
  REGISTERED: 2,
  INACTIVE: 4,
  CLOSED: 5,
  OPERATIONAL: 6,
}

/** Statuses used in the 2025/2026 report-card layer selection table. */
export const LAYER_TABLE_STATUS_NAMES = [
  'REGISTERED',
  'OPERATIONAL',
  'INACTIVE',
  'CLOSED',
]

/** Same set as LAYER_TABLE_STATUS_NAMES — for ArcGIS `ptf_status IN (...)`. */
export const LAYER_TABLE_PTF_STATUS_IDS = [
  PTF_STATUS.REGISTERED,
  PTF_STATUS.OPERATIONAL,
  PTF_STATUS.INACTIVE,
  PTF_STATUS.CLOSED,
]

export const LAYER_TABLE_PTF_STATUS_IN = LAYER_TABLE_PTF_STATUS_IDS.join(',')

/** @param {string[]} names */
export function layerTableStatusInClause(names = LAYER_TABLE_STATUS_NAMES) {
  return names.map((name) => `'${name}'`).join(',')
}
