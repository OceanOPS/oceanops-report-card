export type GlossaryCategory = 'goos' | 'metrics' | 'platforms' | 'networks' | 'delivery' | 'data'

export interface GlossaryTermEntry {
  id: string
  category: GlossaryCategory
}

/** Terms used in this report — definitions in `glossary.terms.*` locales. */
export const GLOSSARY_TERMS: GlossaryTermEntry[] = [
  { id: 'goos', category: 'goos' },
  { id: 'oceanops', category: 'goos' },
  { id: 'inSitu', category: 'goos' },
  { id: 'eov', category: 'goos' },
  { id: 'goosPassport', category: 'goos' },
  { id: 'contributingCountry', category: 'goos' },
  { id: 'operationalPlatform', category: 'platforms' },
  { id: 'referenceObservatory', category: 'platforms' },
  { id: 'activePlatform', category: 'platforms' },
  { id: 'matureNetwork', category: 'networks' },
  { id: 'emergingNetwork', category: 'networks' },
  { id: 'implementationStatus', category: 'metrics' },
  { id: 'realTimeData', category: 'metrics' },
  { id: 'archivedDelayedMode', category: 'metrics' },
  { id: 'metadataCompleteness', category: 'metrics' },
  { id: 'bestPractices', category: 'metrics' },
  { id: 'deliveryClimate', category: 'delivery' },
  { id: 'deliveryOperational', category: 'delivery' },
  { id: 'deliveryOceanHealth', category: 'delivery' },
  { id: 'gts', category: 'data' },
  { id: 'argo', category: 'networks' },
  { id: 'vos', category: 'networks' },
  { id: 'oceantrax', category: 'networks' },
  { id: 'goship', category: 'networks' },
  { id: 'gloss', category: 'networks' },
  { id: 'oceansites', category: 'networks' },
  { id: 'mbn', category: 'networks' },
  { id: 'gda', category: 'networks' },
  { id: 'soconet', category: 'networks' },
]

export const GLOSSARY_CATEGORIES: GlossaryCategory[] = [
  'goos',
  'platforms',
  'networks',
  'metrics',
  'delivery',
  'data',
]
