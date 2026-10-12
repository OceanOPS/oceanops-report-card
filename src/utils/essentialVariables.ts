import type { EssentialVariableKey, InSituNetwork } from '../types/inSituNetworks'

/** Stable display order for filter chips (subset shown = used by at least one network). */
export const ESSENTIAL_VARIABLE_ORDER: EssentialVariableKey[] = [
  'seaSurfaceTemperature',
  'subsurfaceTemperature',
  'seaSurfaceSalinity',
  'subsurfaceSalinity',
  'surfaceCurrents',
  'subsurfaceCurrents',
  'seaState',
  'seaSurfaceHeight',
  'heatFlux',
  'seaIce',
  'surfaceStress',
  'oceanBottomPressure',
  'inorganicCarbon',
  'oxygen',
  'nutrients',
  'nitrousOxide',
  'particulateMatter',
  'transientTracers',
  'oceanColour',
  'surfaceWind',
  'surfaceWaterVapour',
  'surfaceAirTemperature',
  'airPressure',
  'upperAirWind',
  'upperAirWaterVapour',
  'upperAirTemperature',
]

export function collectEssentialVariableOptions(
  networks: InSituNetwork[],
): EssentialVariableKey[] {
  const used = new Set<EssentialVariableKey>()
  for (const network of networks) {
    for (const key of network.essentialVariables) {
      used.add(key)
    }
  }
  return ESSENTIAL_VARIABLE_ORDER.filter((key) => used.has(key))
}

export function essentialVariableLabelKey(key: EssentialVariableKey): string {
  return `networks.essentialVariables.${key}`
}
