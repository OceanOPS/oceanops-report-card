import { useEffect, useState } from 'react'

export type NetworkYoyPeriodStats = {
  avgPerDay: number
  daysWithData?: number
  total?: number
}

export type NetworkYoyRow = {
  id: string
  label: string
  current?: NetworkYoyPeriodStats
  previous?: NetworkYoyPeriodStats
  deltaAvg: number | null
  deltaPct: number | null
  pendingProdExport?: boolean
}

export type ObservationsNetworkYoy = {
  exportedAt: string
  previousYear: number
  networks: NetworkYoyRow[]
}

export type CountryYoyEntry = {
  iso: string
  name: string
}

export type ContributingCountriesYoy = {
  exportedAt: string
  previousYear: string
  baselineMissing?: boolean
  appeared: CountryYoyEntry[]
  disappeared: CountryYoyEntry[]
}

const EMPTY_NETWORK_YOY: ObservationsNetworkYoy = {
  exportedAt: '',
  previousYear: 2025,
  networks: [],
}

const EMPTY_COUNTRIES_YOY: ContributingCountriesYoy = {
  exportedAt: '',
  previousYear: '2025',
  appeared: [],
  disappeared: [],
}

let cachedNetworkYoy: ObservationsNetworkYoy | null = null
let cachedCountriesYoy: ContributingCountriesYoy | null = null

async function fetchEditionJson<T>(filename: string): Promise<T | null> {
  try {
    const base = import.meta.env.BASE_URL
    const response = await fetch(`${base}edition/${filename}`, { cache: 'no-cache' })
    if (!response.ok) return null
    return (await response.json()) as T
  } catch {
    return null
  }
}

export async function loadObservationsNetworkYoy(): Promise<ObservationsNetworkYoy> {
  if (cachedNetworkYoy) return cachedNetworkYoy
  const data = await fetchEditionJson<ObservationsNetworkYoy>('observations-network-yoy.json')
  cachedNetworkYoy = data ?? EMPTY_NETWORK_YOY
  return cachedNetworkYoy
}

export async function loadContributingCountriesYoy(): Promise<ContributingCountriesYoy> {
  if (cachedCountriesYoy) return cachedCountriesYoy
  const data = await fetchEditionJson<ContributingCountriesYoy>('contributing-countries-yoy.json')
  cachedCountriesYoy = data ?? EMPTY_COUNTRIES_YOY
  return cachedCountriesYoy
}

export function useEditionYoy() {
  const [networkYoy, setNetworkYoy] = useState<ObservationsNetworkYoy>(EMPTY_NETWORK_YOY)
  const [countriesYoy, setCountriesYoy] = useState<ContributingCountriesYoy>(EMPTY_COUNTRIES_YOY)

  useEffect(() => {
    void loadObservationsNetworkYoy().then(setNetworkYoy)
    void loadContributingCountriesYoy().then(setCountriesYoy)
  }, [])

  return { networkYoy, countriesYoy }
}

export function networksWithYoy(networks: NetworkYoyRow[]): NetworkYoyRow[] {
  return networks
    .filter((row) => !row.pendingProdExport && row.deltaPct != null)
    .sort((a, b) => Math.abs(b.deltaPct ?? 0) - Math.abs(a.deltaPct ?? 0))
}
