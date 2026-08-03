import type { EssentialVariableKey } from '../types/inSituNetworks'

/** Editorial list per network — refine with GOOS / network leads for 2026. */
export const NETWORK_ESSENTIAL_VARIABLES: Record<string, EssentialVariableKey[]> = {
  argo: ['temperature', 'salinity', 'pressure', 'oxygen', 'chlorophyll', 'ph', 'nutrients'],
  dbcpMoored: ['temperature', 'salinity', 'pressure', 'wind', 'waves', 'currents'],
  goShip: ['temperature', 'salinity', 'oxygen', 'nutrients', 'carbonDioxide', 'chlorophyll', 'ph'],
  dbcpTsunami: ['seaLevel', 'pressure'],
  hfRadar: ['currents', 'waves'],
  dbcpDrifting: ['temperature', 'salinity', 'pressure', 'currents'],
  gloss: ['seaLevel'],
  oceanSites: ['temperature', 'salinity', 'currents', 'oxygen', 'carbonDioxide', 'chlorophyll', 'ph'],
  gliders: ['temperature', 'salinity', 'chlorophyll', 'oxygen', 'ph'],
  anibos: ['temperature', 'salinity', 'chlorophyll', 'biodiversity'],
  sotVos: ['temperature', 'salinity', 'pressure', 'wind', 'humidity'],
  sotXbt: ['temperature', 'salinity'],
  sotAsap: ['temperature', 'pressure', 'wind', 'humidity'],
  fvon: ['temperature', 'salinity', 'chlorophyll', 'ph', 'oxygen'],
  smartCables: ['temperature', 'pressure', 'seaLevel'],
  soconet: ['carbonDioxide', 'ph', 'temperature', 'salinity'],
  sunFleet: ['temperature', 'salinity', 'chlorophyll', 'oxygen', 'wind', 'waves'],
}
