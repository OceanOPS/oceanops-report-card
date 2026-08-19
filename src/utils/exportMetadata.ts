import { useEffect, useState } from 'react'

/** ISO dates from edition.values.json — regenerated on GeoJSON export. Do not hand-edit. */
export type ExportMetadata = {
  exportedAt: string
  OCEAN_GLIDERS_MIN_LOC_DATE: string
  ANIBOS_MIN_LOC_DATE: string
  FVON_MIN_LOC_DATE: string
  SOOP_XBT_SAMPLED_SINCE: string
  GOSHIP_SAMPLED_SINCE: string
  OBS_DAYS_WINDOW?: string
  OBSERVATIONS_PER_DAY_AVG?: number
  OBSERVATIONS_DAYS_WINDOW?: number
  OBSERVATIONS_DAYS_WITH_DATA?: number
  OBSERVATIONS_TOTAL?: number
}

/** Fallback when export-metadata.json is missing (matches edition.values.json). */
export const DEFAULT_EXPORT_METADATA: ExportMetadata = {
  exportedAt: '2025-10-01',
  OCEAN_GLIDERS_MIN_LOC_DATE: '2024-01-01',
  ANIBOS_MIN_LOC_DATE: '2025-01-01',
  FVON_MIN_LOC_DATE: '2025-01-01',
  SOOP_XBT_SAMPLED_SINCE: '2024-01-01',
  GOSHIP_SAMPLED_SINCE: '2015-01-01',
  OBS_DAYS_WINDOW: '365',
}

let cached: ExportMetadata | null = null

export function yearFromIso(isoDate: string): string {
  return isoDate.slice(0, 4)
}

export function formatDeploymentDate(isoDate: string, locale: string): string {
  const date = new Date(`${isoDate}T12:00:00Z`)
  return date.toLocaleString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export async function loadExportMetadata(): Promise<ExportMetadata> {
  if (cached) return cached

  try {
    const base = import.meta.env.BASE_URL
    const response = await fetch(`${base}edition/export-metadata.json`, { cache: 'no-cache' })
    if (!response.ok) return DEFAULT_EXPORT_METADATA
    cached = (await response.json()) as ExportMetadata
    return cached
  } catch {
    return DEFAULT_EXPORT_METADATA
  }
}

export function useExportMetadata(): ExportMetadata {
  const [metadata, setMetadata] = useState<ExportMetadata>(DEFAULT_EXPORT_METADATA)

  useEffect(() => {
    void loadExportMetadata().then(setMetadata)
  }, [])

  return metadata
}
