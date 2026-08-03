import type { EssentialVariableKey, InSituNetwork } from '../types/inSituNetworks'

/** Stable display order for filter chips (subset shown = used by at least one network). */
export const ESSENTIAL_VARIABLE_ORDER: EssentialVariableKey[] = [
  'temperature',
  'salinity',
  'pressure',
  'chlorophyll',
  'ph',
  'oxygen',
  'carbonDioxide',
  'seaLevel',
  'currents',
  'waves',
  'wind',
  'nutrients',
  'humidity',
  'seaIce',
  'biodiversity',
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
